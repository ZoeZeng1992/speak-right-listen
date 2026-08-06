
const CACHE_KEY="sr_listen_pack_cache";
const PREF_KEY="sr_fav_listen_prefs";
const SYNC_KEY="sr_fav_sync_id";
const JSONBIN_KEY="sr_jsonbin_key";
const APP_BUILD="20260806-speak10";
window.APP_BUILD=APP_BUILD;
const JSONBIN_API="https://api.jsonbin.io/v3/b";
const JSONBLOB_API="https://jsonblob.com/api/jsonBlob";

const $ = id => document.getElementById(id);
function setPlayMsg(text, cls){
  const el=$("playMsg");
  if(!el) return;
  el.textContent=text==null?"":String(text);
  if(cls!=null) el.className=cls;
}
const state = {
  items: [],
  idx: 0,
  playOrder: [], // 听练播放顺序（与 items 统计分离，点「不会」绝不改它）
  currentEn: "",
  showCn: false,
  showNote: false,
  loop: 3,
  sort: "fails",
  voiceURI: "",
  updatedAt: 0,
  jsonbinKey: ""
};

let loopToken=0, loopPlaying=false, loopCount=0, playRateNow=1;
let userWantsPlay=false;
let _mediaHold=false; // 听练会话中（含暂停）：保住 Now Playing，供耳机单击恢复播放
let wakeLock=null, wakeKeepAlive=null, speechKeepAlive=null;
let voices=[];
let _pushTimer=null, _pushBusy=false;

// 美式年轻女声优先
const US_YOUNG_FEMALE = [
  "ava","nicky","zoe","allison","joelle","samantha","susan","stephanie",
  "google us english","us english female"
];
const BAD_VOICE = /bahh|albert|whisper|zarvox|evil|fred|junior|bells|boing|bubbles|cellos|good news|jester|organ|pipe|ralph|trinoids|princess|superstar|deranged|hysterical|bad news|wobble|daniel|arthur|gordon|rishi|oliver|james|aaron|eddy|reed|rocko|grandma|grandpa|\bmale\b|ting-ting|mei-jia|sin-ji|yu-shu|tian-tian|liyue/i;

function parseFavSyncId(raw){
  const s=String(raw||"").trim();
  if(!s) return { provider:"", id:"" };
  if(/^bin:/i.test(s)) return { provider:"jsonbin", id:s.slice(4).trim() };
  if(/^blob:/i.test(s)) return { provider:"jsonblob", id:s.slice(5).trim() };
  if(/^[a-f0-9]{24}$/i.test(s)) return { provider:"jsonbin", id:s };
  return { provider:"jsonblob", id:s };
}

function loadPrefs(){
  try{
    const p=JSON.parse(localStorage.getItem(PREF_KEY)||"{}");
    if(typeof p.loop==="number") state.loop=p.loop;
    state.showCn=!!p.showCn;
    state.showNote=!!p.showNote;
    if(typeof p.idx==="number") state.idx=p.idx;
    if(typeof p.currentEn==="string") state.currentEn=p.currentEn;
    if(p.sort==="recent" || p.sort==="fails" || p.sort==="random") state.sort=p.sort;
    if(typeof p.voiceURI==="string") state.voiceURI=p.voiceURI;
  }catch(e){}
  try{ state.jsonbinKey=(localStorage.getItem(JSONBIN_KEY)||"").trim(); }catch(e){}
}
function savePrefs(){
  const cur=current();
  if(cur&&cur.en) state.currentEn=cur.en;
  localStorage.setItem(PREF_KEY, JSON.stringify({
    loop: state.loop, showCn: state.showCn, showNote: state.showNote,
    idx: state.idx, currentEn: state.currentEn||"",
    sort: state.sort, voiceURI: state.voiceURI
  }));
}
function saveJsonbinKey(key){
  state.jsonbinKey=String(key||"").trim();
  try{ localStorage.setItem(JSONBIN_KEY, state.jsonbinKey); }catch(e){}
}
async function acquireWakeLock(){
  try{
    if(!("wakeLock" in navigator)) return;
    if(wakeLock) return;
    wakeLock=await navigator.wakeLock.request("screen");
    wakeLock.addEventListener("release", ()=>{ wakeLock=null; });
  }catch(e){ wakeLock=null; }
}
function releaseWakeLock(){
  try{ if(wakeLock) wakeLock.release(); }catch(e){}
  wakeLock=null;
}
function startKeepAlives(){
  stopKeepAlives();
  // 部分机型 TTS 会自己暂停；定期 resume 续播
  speechKeepAlive=setInterval(()=>{
    if(userWantsPlay){
      try{ if(speechSynthesis.paused) speechSynthesis.resume(); }catch(e){}
    }
    // 朗读中或软暂停都要续播静音轨：一停 iOS 就可能丢掉 Now Playing，耳机再按没反应
    if(userWantsPlay || loopPlaying || _mediaHold){
      nudgeMediaAudio();
      setupMediaSession(true);
      updateMediaSession();
    }
  }, 2500);
  // 息屏后 Wake Lock 会丢，可见时再要一次
  wakeKeepAlive=setInterval(()=>{
    if(userWantsPlay && document.visibilityState==="visible") acquireWakeLock();
  }, 15000);
}
function stopKeepAlives(){
  if(speechKeepAlive){ clearInterval(speechKeepAlive); speechKeepAlive=null; }
  if(wakeKeepAlive){ clearInterval(wakeKeepAlive); wakeKeepAlive=null; }
}
function esc(s){
  return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
/** 电脑句库改正后，云端/本地缓存可能仍是旧句——听练端兜底改写 */
const PACK_SENTENCE_FIXES = {
  "The assets are exported.": { en:"The assets are ready to export.", cn:"这些素材可以导出了。" },
  "The assets are ready to export.": { cn:"这些素材可以导出了。" }
};
function fixPackItem(x){
  if(!x||!x.en) return x;
  const fix=PACK_SENTENCE_FIXES[x.en];
  if(!fix) return x;
  return Object.assign({}, x, {
    en: fix.en || x.en,
    cn: (fix.cn!=null && fix.cn!=="") ? fix.cn : x.cn
  });
}
function fixPackItems(items){
  const out=[], seen=new Set();
  (items||[]).forEach(raw=>{
    const x=fixPackItem(raw);
    if(!x||!x.en) return;
    const n=String(x.en).toLowerCase().replace(/[^a-z0-9\s]+/g," ").replace(/\s+/g," ").trim();
    if(seen.has(x.en) || (n&&seen.has(n))){
      // 旧句与新句并存时，合并次数到已有项
      const hit=out.find(it=>it.en===x.en || (n&&String(it.en).toLowerCase().replace(/[^a-z0-9\s]+/g," ").replace(/\s+/g," ").trim()===n));
      if(hit){
        hit.fails=Math.max(+(hit.fails||0)||0, +(x.fails||0)||0);
        hit.gots=Math.max(+(hit.gots||0)||0, +(x.gots||0)||0);
        hit.addedAt=Math.max(+(hit.addedAt||0)||0, +(x.addedAt||0)||0);
        if(fixPackItem({en:hit.en}).cn) hit.cn=fixPackItem({en:hit.en}).cn;
        else if(x.cn) hit.cn=x.cn;
      }
      return;
    }
    seen.add(x.en); if(n) seen.add(n);
    out.push(x);
  });
  return out;
}
function cleanName(n){ return String(n||"").replace(/\s*\(.*\)\s*/g,"").trim(); }
function isUs(v){ return /en(-|_)US/i.test(v.lang||""); }
function isEn(v){ return /^en/i.test(v.lang||""); }
function voiceScore(v){
  const n=(v.name||"").toLowerCase();
  let s=0;
  if(BAD_VOICE.test(n)) return -9999;
  if(/premium/.test(n)) s+=1000;
  else if(/enhanced|compact|neural|natural/.test(n)) s+=700;
  if(/google/.test(n)) s+=450;
  const idx=US_YOUNG_FEMALE.findIndex(f=>n.includes(f));
  if(idx>=0) s+=400-idx*12;
  if(/female/.test(n)) s+=80;
  if(isUs(v)) s+=120;
  else if(isEn(v)) s+=20;
  if(/^samantha$/i.test(cleanName(v.name)) && !/premium|enhanced/i.test(n)) s-=40;
  return s;
}
function candidateVoices(){
  const all=(voices||[]).filter(v=>isEn(v) && voiceScore(v)>-1000);
  const us=all.filter(isUs).sort((a,b)=>voiceScore(b)-voiceScore(a));
  if(us.length) return us;
  return all.sort((a,b)=>voiceScore(b)-voiceScore(a));
}
function allEnVoices(){
  // 下拉显示 Safari 能用的全部英语声（系统 Premium 常不出现在这里）
  return (voices||[]).filter(isEn).slice().sort((a,b)=>{
    const ds=voiceScore(b)-voiceScore(a);
    if(ds) return ds;
    return String(a.name||"").localeCompare(String(b.name||""));
  });
}
function pickVoice(){
  const list=candidateVoices();
  if(state.voiceURI){
    const chosen=(voices||[]).find(v=>v.voiceURI===state.voiceURI);
    if(chosen && isEn(chosen)) return chosen;
  }
  return list[0] || (voices||[]).find(isUs) || (voices||[]).find(isEn) || null;
}
function buildVoiceSelect(){
  const sel=$("voiceSel");
  if(!sel) return;
  const list=allEnVoices();
  sel.innerHTML = list.length
    ? list.map(v=>`<option value="${v.voiceURI}">${v.name} · ${v.lang}</option>`).join("")
    : `<option value="">系统默认</option>`;
  const preferred = (state.voiceURI && list.find(v=>v.voiceURI===state.voiceURI))
    ? state.voiceURI
    : (candidateVoices()[0] && candidateVoices()[0].voiceURI) || (list[0] && list[0].voiceURI) || "";
  if(preferred){
    sel.value=preferred;
    state.voiceURI=preferred;
  }
  updateVoiceHint();
}
function updateVoiceHint(){
  const el=$("voiceHint");
  if(!el) return;
  const v=pickVoice();
  const hasAva=(voices||[]).some(x=>/ava/i.test(x.name||""));
  if(!v){
    el.textContent="未找到英语语音。";
    return;
  }
  if(hasAva){
    el.innerHTML="当前：<b>"+esc(v.name)+"</b>。可在上方切换。";
  }else{
    el.innerHTML="当前：<b>"+esc(v.name)+"</b>。<span style='color:#b45309'>说明：系统里的 Ava Premium 通常不会开放给 Safari 网页</span>，网页只能用浏览器列出的声音。可选列表里最自然的美式女声；或用电脑 Chrome 听。";
  }
}
function loadVoices(){
  voices = window.speechSynthesis ? (speechSynthesis.getVoices()||[]) : [];
  const best=candidateVoices()[0];
  if(best && (!state.voiceURI || !(voices||[]).some(v=>v.voiceURI===state.voiceURI))){
    state.voiceURI=best.voiceURI;
    savePrefs();
  }
  buildVoiceSelect();
}
function shuffleItems(arr){
  const a=arr||[];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    const t=a[i]; a[i]=a[j]; a[j]=t;
  }
  return a;
}
function sortItems(keepCurrent){
  const cur=typeof keepCurrent==="string"
    ? keepCurrent
    : (keepCurrent ? (state.items[state.idx]&&state.items[state.idx].en) : "");
  const arr=state.items.slice();
  const hasTime=arr.some(x=>(x.addedAt||0)>0);
  if(state.sort==="random"){
    shuffleItems(arr);
  }else if(state.sort==="recent"){
    // 最新收藏在前；无时间戳时退回按 fails，避免“两种排序看起来一样却说不清”
    if(hasTime){
      arr.sort((a,b)=>((b.addedAt||0)-(a.addedAt||0)) || ((b.fails||0)-(a.fails||0)) || String(a.en).localeCompare(String(b.en)));
    }else{
      arr.sort((a,b)=>((b.fails||0)-(a.fails||0)) || ((a.gots||0)-(b.gots||0)) || String(a.en).localeCompare(String(b.en)));
    }
  }else{
    arr.sort((a,b)=>((b.fails||0)-(a.fails||0)) || ((a.gots||0)-(b.gots||0)) || ((b.addedAt||0)-(a.addedAt||0)) || String(a.en).localeCompare(String(b.en)));
  }
  state.items=arr;
  state._sortHasTime=hasTime;
  state.playOrder = arr.map(x=>x&&x.en).filter(Boolean);
  if(cur){
    const i=state.playOrder.indexOf(cur);
    state.idx=i>=0 ? i : 0;
  }
}
function itemFrom(x, other){
  const o=other||{};
  return {
    en:x.en,
    cn:x.cn||o.cn||"",
    note:x.note||o.note||"",
    mode:x.mode||o.mode||"",
    fails:Math.max(+(x.fails||0)||0, +(o.fails||0)||0),
    gots:Math.max(+(x.gots||0)||0, +(o.gots||0)||0),
    addedAt:Math.max(+(x.addedAt||0)||0, +(o.addedAt||0)||0)
  };
}
/** 保留 orderItems 的顺序，只合并次数/文案；other 里多出来的句追加在末尾 */
function mergeKeepingOrder(orderItems, otherItems){
  const other=new Map();
  (otherItems||[]).forEach(x=>{ if(x&&x.en) other.set(x.en, x); });
  const seen=new Set();
  const out=[];
  (orderItems||[]).forEach(x=>{
    if(!x||!x.en||seen.has(x.en)) return;
    seen.add(x.en);
    out.push(itemFrom(x, other.get(x.en)));
  });
  (otherItems||[]).forEach(x=>{
    if(!x||!x.en||seen.has(x.en)) return;
    seen.add(x.en);
    out.push(itemFrom(x, null));
  });
  return out;
}
function applyPack(pack, source, opts){
  if(!pack || !Array.isArray(pack.items)) throw new Error("听练包格式不对");
  pack={ ...pack, items: fixPackItems(pack.items) };
  const resetIdx=!!(opts&&opts.resetIdx);
  // 手动刷新 / 首次载入：按当前排序重排；后台静默同步：只合并次数、不打乱听练顺序
  const forceResort=!!(opts&&opts.resort);
  const prevEn = resetIdx ? "" : (
    (current()&&current().en) || state.currentEn || ""
  );
  const prevItems=state.items.slice();
  if(prevItems.length && !forceResort){
    state.items=mergeKeepingOrder(prevItems, pack.items);
    // 保留既有 playOrder；去掉已不存在的句子，新句子追加末尾
    const have=new Set(state.items.map(x=>x.en));
    const kept=(state.playOrder||[]).filter(en=>have.has(en));
    state.items.forEach(x=>{ if(x&&x.en && !kept.includes(x.en)) kept.push(x.en); });
    state.playOrder=kept;
  }else{
    state.items=mergeKeepingOrder(pack.items, prevItems);
    sortItems(prevEn && !resetIdx ? prevEn : false); // sortItems 会重建 playOrder
  }
  state.updatedAt=pack.updatedAt||Date.now();
  if(resetIdx){
    state.idx=0;
  }else{
    // 优先用此刻正在看的句子（避免拉取期间点了下一句又被拽回）
    const liveEn=(state.currentEn||"") || prevEn;
    const i=liveEn ? (state.playOrder||[]).indexOf(liveEn) : -1;
    if(i>=0) state.idx=i;
    else state.idx=Math.min(Math.max(0, state.idx), Math.max(0,(state.playOrder||state.items).length-1));
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    v:4, updatedAt:state.updatedAt, items:state.items, source:source||"", build:APP_BUILD
  }));
  savePrefs();
  render();
  const timed=state.items.filter(x=>(x.addedAt||0)>1).length;
  let msg="已载入 "+state.items.length+" 句"+(source?" · "+source:"");
  if(timed<Math.min(3, state.items.length)){
    msg+="。收藏时间数据不足，请电脑重新点「生成 / 更新云同步」后再刷新。";
  }
  setFeedback(msg, false);
  return msg;
}
function setFeedback(text, isErr, opts){
  const t=String(text||"");
  const wantToast=!!(opts&&opts.toast);
  if($("setupMsg")){
    $("setupMsg").textContent=t;
    $("setupMsg").className=isErr?"msg err":"msg ok";
  }
  // 主界面只显示一处，避免 syncTip + playMsg 各写一句
  if($("syncTip")){
    $("syncTip").textContent=t;
    $("syncTip").style.color=isErr?"var(--bad)":(t?"var(--good)":"");
  }
  setPlayMsg("", "msg playMsg");
  if(wantToast && t) toast(t, !!isErr);
}
function loadCache(){
  try{
    const pack=JSON.parse(localStorage.getItem(CACHE_KEY)||"null");
    if(pack && Array.isArray(pack.items) && pack.items.length){
      state.items=pack.items.filter(x=>x&&x.en);
      state.updatedAt=pack.updatedAt||0;
      sortItems(false);
      if(state.currentEn){
        const i=state.items.findIndex(x=>x.en===state.currentEn);
        if(i>=0) state.idx=i;
        else state.idx=Math.min(Math.max(0, state.idx), state.items.length-1);
      }else{
        state.idx=Math.min(Math.max(0, state.idx), state.items.length-1);
      }
      return true;
    }
  }catch(e){}
  return false;
}

async function fetchWithTimeout(url, init, ms){
  const ctrl=new AbortController();
  const t=setTimeout(()=>ctrl.abort(), ms||8000);
  try{
    return await fetch(url, Object.assign({}, init||{}, { signal:ctrl.signal }));
  }finally{
    clearTimeout(t);
  }
}
async function fetchCloud(id){
  const parsed=parseFavSyncId(id);
  if(!parsed.id) throw new Error("同步码无效");
  if(parsed.provider==="jsonbin"){
    const res=await fetchWithTimeout(JSONBIN_API+"/"+encodeURIComponent(parsed.id)+"/latest", {
      headers:{ "Accept":"application/json" }
    }, 8000);
    if(!res.ok) throw new Error("Jsonbin 拉取失败 ("+res.status+")");
    const j=await res.json();
    return j.record || j;
  }
  const res=await fetchWithTimeout(JSONBLOB_API+"/"+encodeURIComponent(parsed.id), {
    headers:{ "Accept":"application/json" }
  }, 8000);
  if(!res.ok) throw new Error("云拉取失败 ("+res.status+")");
  return res.json();
}
function buildLocalPack(){
  return {
    v:4,
    updatedAt:Date.now(),
    items: state.items.map(x=>({
      en:x.en, cn:x.cn||"", note:x.note||"", mode:x.mode||"",
      fails:+(x.fails||0)||0, gots:+(x.gots||0)||0, addedAt:+(x.addedAt||0)||0
    }))
  };
}
async function putCloud(pack, rawId){
  const parsed=parseFavSyncId(rawId);
  if(!parsed.id) throw new Error("同步码无效");
  const body=JSON.stringify(pack);
  if(parsed.provider==="jsonbin"){
    const key=(state.jsonbinKey||"").trim();
    if(!key) throw new Error("请先在设置里填写 Jsonbin Master Key（与电脑相同）");
    const res=await fetchWithTimeout(JSONBIN_API+"/"+encodeURIComponent(parsed.id), {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "X-Master-Key":key,
        "X-Bin-Private":"false"
      },
      body
    }, 10000);
    if(!res.ok){
      let tip="回写失败 "+res.status;
      try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
      throw new Error(tip);
    }
    return;
  }
  const res=await fetchWithTimeout(JSONBLOB_API+"/"+encodeURIComponent(parsed.id), {
    method:"PUT",
    headers:{ "Content-Type":"application/json", "Accept":"application/json" },
    body
  }, 10000);
  if(!res.ok) throw new Error("回写失败 "+res.status);
}
function playLen(){
  const n=(state.playOrder&&state.playOrder.length)||state.items.length||0;
  return n;
}
async function pushStatsToCloud(opts){
  const quiet=!!(opts&&opts.quiet);
  const id=(localStorage.getItem(SYNC_KEY)||"").trim() || (new URLSearchParams(location.search).get("id")||"").trim();
  if(!id){
    if(!quiet && $("syncTip")) $("syncTip").textContent="本地已记次数；保存同步码后可回写电脑";
    return false;
  }
  if(_pushBusy) return false;
  _pushBusy=true;
  if(!quiet && $("syncTip")) $("syncTip").textContent="正在同步到电脑…";
  // 按 playOrder 导出，且异步回来后绝不改 idx（否则点下一句会被拽回去）
  const orderSnap=(state.playOrder&&state.playOrder.length)
    ? state.playOrder.map(en=>state.items.find(x=>x&&x.en===en)).filter(Boolean)
    : state.items.slice();
  const keptIdx=state.idx;
  const keptEn=(current()&&current().en)||state.currentEn||"";
  try{
    let pack=null;
    try{ pack=await fetchCloud(id); }catch(e){ pack=null; }
    if(!pack || !Array.isArray(pack.items)) pack=buildLocalPack();
    else{
      pack.items=mergeKeepingOrder(orderSnap, pack.items);
      pack.v=4;
      pack.updatedAt=Date.now();
    }
    await putCloud(pack, id);
    const byEn=new Map((pack.items||[]).filter(x=>x&&x.en).map(x=>[x.en,x]));
    state.items.forEach(it=>{
      const c=byEn.get(it.en);
      if(!c) return;
      it.fails=Math.max(+(it.fails||0)||0, +(c.fails||0)||0);
      it.gots=Math.max(+(it.gots||0)||0, +(c.gots||0)||0);
      if(!it.cn && c.cn) it.cn=c.cn;
      if(!it.note && c.note) it.note=c.note;
      if((c.addedAt||0)>(it.addedAt||0)) it.addedAt=c.addedAt;
    });
    // 保留用户同步期间点到的句子；不要用开始时的 curEn 覆写 idx
    const liveEn=(current()&&current().en)||state.currentEn||keptEn;
    if(liveEn && state.playOrder&&state.playOrder.length){
      const i=state.playOrder.indexOf(liveEn);
      if(i>=0) state.idx=i;
      else state.idx=Math.min(Math.max(0, keptIdx), Math.max(0, playLen()-1));
    }else{
      state.idx=Math.min(Math.max(0, keptIdx), Math.max(0, playLen()-1));
    }
    state.updatedAt=pack.updatedAt||Date.now();
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      v:4, updatedAt:state.updatedAt, items:state.items, source:"回写"
    }));
    savePrefs();
    if($("syncTip")) $("syncTip").textContent="已同步到电脑 · "+new Date().toLocaleTimeString();
    render();
    return true;
  }catch(e){
    const tip=(e&&e.message)||"同步失败";
    if($("syncTip")) $("syncTip").textContent=tip+"（次数已保存在手机）";
    return false;
  }finally{
    _pushBusy=false;
  }
}
function schedulePushStats(){
  clearTimeout(_pushTimer);
  _pushTimer=setTimeout(()=>pushStatsToCloud({ quiet:false }), 900);
}
function recordPractice(){
  const s=current();
  if(!s||!s.en) return;
  s.fails=(+(s.fails||0)||0)+1;
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    v:4, updatedAt:Date.now(), items:state.items, source:"local"
  }));
  savePrefs();
  // 听练中途不重排：只更新次数，避免点「不会」后顺序乱跳
  render();
  schedulePushStats();
}
async function fetchLocalFile(){
  const res=await fetchWithTimeout("fav-listen-data.json?ts="+Date.now(), { cache:"no-store" }, 3000);
  if(!res.ok) throw new Error("本地文件不存在");
  return res.json();
}

/** soft：只停朗读，保住媒体会话（暂停后取下再戴上耳机，单击还能继续播）
 *  hard/默认：彻底结束听练会话，耳机键不再指向本页 */
function stopLoop(opts){
  const keepWant=!!(opts&&opts.keepWant);
  const soft=!!(opts&&opts.soft);
  if(soft && !keepWant){
    pausePlayback(!!(opts&&opts.fromRemote));
    return;
  }
  loopToken++;
  loopPlaying=false;
  loopCount=0;
  if(!keepWant){
    userWantsPlay=false;
    _mediaHold=false;
    stopKeepAlives();
    releaseWakeLock();
    stopMediaAudio();
  }
  try{ speechSynthesis.cancel(); }catch(e){}
  updatePlayUI();
  updateMediaSession();
}
function pausePlayback(fromRemote){
  loopToken++;
  loopPlaying=false;
  loopCount=0;
  userWantsPlay=false;
  releaseWakeLock();
  try{ speechSynthesis.cancel(); }catch(e){}
  _mediaHold=true;
  // 软暂停仍继续播静音轨，保住 Now Playing。
  // 若 pause 静音轨，iOS 常丢掉会话 → 再按耳机完全没反应，只能点屏幕。
  // 恢复靠 pause 事件切换：已软暂停时再收到 pause = 继续播放。
  nudgeMediaAudio();
  startKeepAlives();
  setupMediaSession(true);
  updatePlayUI();
  try{
    if("mediaSession" in navigator) navigator.mediaSession.playbackState="paused";
  }catch(e){}
  if(fromRemote) toast("耳机 · 暂停", false);
}
function isSoftPaused(){
  return !!(_mediaHold && !loopPlaying && !userWantsPlay);
}
let _remoteToggleAt=0;
function resumeFromRemote(){
  toast("耳机 · 播放", false);
  _mediaHold=true;
  // 必须在同一手势栈里同步 speak；不要等 audio.play() 的 Promise
  try{ ensureMediaAudio().play(); }catch(e){}
  setupMediaSession(true);
  if(!loopPlaying) startLoop(playRateNow||1);
  updateMediaSession();
}
function onRemotePauseOrToggle(){
  const now=Date.now();
  if(now-_remoteToggleAt<450) return;
  _remoteToggleAt=now;
  // 静音轨仍在播时，单击几乎总是 pause；已软暂停则当作继续播放
  if(isSoftPaused()) resumeFromRemote();
  else pausePlayback(true);
}
function rebuildPlayOrder(keepEn){
  const en = keepEn || (currentSafeEn()) || state.currentEn || "";
  state.playOrder = state.items.map(x=>x&&x.en).filter(Boolean);
  if(en){
    const i=state.playOrder.indexOf(en);
    state.idx = i>=0 ? i : 0;
  }else{
    state.idx=Math.min(Math.max(0,state.idx), Math.max(0,state.playOrder.length-1));
  }
}
function currentSafeEn(){
  if(state.playOrder && state.playOrder.length){
    return state.playOrder[state.idx] || "";
  }
  const s=state.items[state.idx];
  return (s&&s.en)||"";
}
function current(){
  if(!state.items.length) return null;
  if(!state.playOrder || !state.playOrder.length){
    state.playOrder = state.items.map(x=>x&&x.en).filter(Boolean);
  }
  const en = state.playOrder[state.idx];
  if(en){
    const hit = state.items.find(x=>x&&x.en===en);
    if(hit) return hit;
  }
  return state.items[Math.min(state.idx, state.items.length-1)]||null;
}
function toast(msg, isErr){
  let el=document.getElementById("toast");
  if(!el){
    el=document.createElement("div");
    el.id="toast";
    el.className="toast";
    document.body.appendChild(el);
  }
  el.textContent=String(msg||"");
  el.classList.toggle("err", !!isErr);
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t=setTimeout(()=>el.classList.remove("show"), 2800);
}
function setRefreshBtn(stateName, text){
  const btn=document.getElementById("refreshBtn");
  if(!btn) return;
  btn.classList.remove("is-busy","is-ok","is-err");
  if(stateName) btn.classList.add(stateName);
  if(text!=null) btn.textContent=text;
  btn.disabled = stateName==="is-busy";
}

/** 极低音量循环音频：让 iOS 把网页登记为「正在播放」，耳机键才能进 Media Session。
 *  纯 speechSynthesis 在 Safari 上通常拿不到 AirPods 下一曲（网易云是原生 AVPlayer）。 */
let _mediaAudio=null, _mediaSessionBound=false, _mediaAudioOk=false;
function ensureMediaAudio(){
  if(_mediaAudio) return _mediaAudio;
  let a=$("mediaKeeper");
  if(!a){
    a=document.createElement("audio");
    a.id="mediaKeeper";
    a.setAttribute("playsinline","");
    a.setAttribute("webkit-playsinline","");
    a.preload="auto";
    a.style.display="none";
    document.body.appendChild(a);
  }
  a.loop=true;
  a.muted=false;          // muted=true 时 iOS 不会进锁屏/耳机媒体会话
  a.volume=0.12;          // 文件本身已是极轻正弦；再压一点
  if(!a.src || !/silence\.wav/i.test(a.getAttribute("src")||a.src||"")){
    a.src="silence.wav";
    try{ a.load(); }catch(e){}
  }
  bindMediaAudioEvents(a);
  _mediaAudio=a;
  return a;
}
function bindMediaAudioEvents(a){
  if(!a || a._srBound) return;
  a._srBound=true;
  // 取下耳机 / 系统打断会 pause；会话未结束则续上，避免丢掉 Now Playing
  a.addEventListener("pause", ()=>{
    if(!_mediaHold && !userWantsPlay && !loopPlaying) return;
    setTimeout(()=>{
      if(!_mediaHold && !userWantsPlay && !loopPlaying) return;
      nudgeMediaAudio();
      setupMediaSession(true);
      updateMediaSession();
    }, 400);
  });
}
function nudgeMediaAudio(){
  try{
    const a=ensureMediaAudio();
    if(a.paused){
      const p=a.play();
      if(p&&p.then) p.then(()=>{ _mediaAudioOk=true; }).catch(()=>{});
    }
  }catch(e){}
}
function startMediaAudio(){
  try{
    _mediaHold=true;
    const a=ensureMediaAudio();
    // 同一用户手势里启动；之后靠 nudge 续播
    const p=a.play();
    if(p&&p.then){
      p.then(()=>{ _mediaAudioOk=true; setupMediaSession(true); updateMediaSession(); })
       .catch(()=>{ _mediaAudioOk=false; });
    }else{
      _mediaAudioOk=true;
    }
  }catch(e){ _mediaAudioOk=false; }
}
function stopMediaAudio(){
  try{
    if(!_mediaAudio) return;
    _mediaAudio.pause();
    try{ _mediaAudio.currentTime=0; }catch(e){}
  }catch(e){}
}
function updateMediaSession(){
  if(!("mediaSession" in navigator)) return;
  if(!_mediaHold && !loopPlaying && !userWantsPlay) return;
  const s=current();
  const title=(s&&s.en)||"Speak Right";
  const len=playLen();
  try{
    navigator.mediaSession.metadata=new MediaMetadata({
      title: title.length>80 ? title.slice(0,77)+"…" : title,
      artist: "Speak Right 听练",
      album: (len? ((state.idx+1)+" / "+len) : "听练")
    });
    navigator.mediaSession.playbackState = (loopPlaying||userWantsPlay) ? "playing" : "paused";
    if(navigator.mediaSession.setPositionState){
      try{
        navigator.mediaSession.setPositionState({
          duration: Math.max(1, len||1),
          playbackRate: 1,
          position: Math.min(Math.max(0, state.idx), Math.max(0,(len||1)-1))
        });
      }catch(e){}
    }
  }catch(e){}
}
function goPrev(fromRemote){
  const wasPlaying=loopPlaying||userWantsPlay;
  const rate=playRateNow||1;
  if(state.idx>0) state.idx--;
  else if(fromRemote){ toast("已经是第一句", false); return; }
  if(fromRemote) toast("耳机 · 上一句", false);
  savePrefs();
  updateMediaSession();
  if(wasPlaying) startLoop(rate);
  else {
    try{ speechSynthesis.cancel(); }catch(e){}
    if(_mediaHold) nudgeMediaAudio();
    else if(loopPlaying || userWantsPlay) nudgeMediaAudio();
    render();
    updateMediaSession();
  }
}
function goNext(fromRemote){
  const wasPlaying=loopPlaying||userWantsPlay;
  const rate=playRateNow||1;
  if(state.idx<playLen()-1) state.idx++;
  else if(fromRemote){ toast("已经是最后一句", false); return; }
  if(fromRemote) toast("耳机 · 下一句", false);
  savePrefs();
  updateMediaSession();
  if(wasPlaying) startLoop(rate);
  else {
    try{ speechSynthesis.cancel(); }catch(e){}
    if(_mediaHold) nudgeMediaAudio();
    render();
    updateMediaSession();
  }
}
function setupMediaSession(force){
  if(!("mediaSession" in navigator)) return;
  if(_mediaSessionBound && !force) return;
  _mediaSessionBound=true;
  const bind=(action, fn)=>{
    try{ navigator.mediaSession.setActionHandler(action, fn); }catch(e){}
  };
  bind("nexttrack", ()=>goNext(true));
  bind("previoustrack", ()=>goPrev(true));
  bind("seekforward", ()=>goNext(true));
  bind("seekbackward", ()=>goPrev(true));
  bind("play", ()=>{
    const now=Date.now();
    if(now-_remoteToggleAt<450) return;
    _remoteToggleAt=now;
    resumeFromRemote();
  });
  bind("pause", ()=>{
    onRemotePauseOrToggle();
  });
  bind("stop", ()=>{
    stopLoop(); // hard：结束会话
  });
}
function updatePlayUI(){
  const lim=state.loop;
  if($("status")){
    $("status").textContent = loopPlaying
      ? (lim>0 ? `第 ${loopCount}/${lim} 遍` : `第 ${loopCount} 遍 · ∞`)
      : "";
  }
  if($("playBtn")){
    $("playBtn").textContent = loopPlaying ? "暂停" : "播放";
    $("playBtn").classList.toggle("primary", true);
    $("playBtn").classList.toggle("is-playing", !!loopPlaying);
  }
  document.querySelectorAll("#loopSeg button").forEach(b=>{
    b.classList.toggle("on", +b.dataset.loop===state.loop);
  });
  document.querySelectorAll("#sortSeg button").forEach(b=>{
    b.classList.toggle("on", b.dataset.sort===state.sort);
  });
  if($("showCnBtn")) $("showCnBtn").classList.toggle("on", state.showCn);
  if($("showNoteBtn")) $("showNoteBtn").classList.toggle("on", state.showNote);
  updateMediaSession();
}
function unlockSpeech(){
  if(!window.speechSynthesis || unlockSpeech.done) return;
  try{
    const warm=new SpeechSynthesisUtterance("");
    warm.volume=0; warm.rate=1;
    speechSynthesis.speak(warm);
    speechSynthesis.cancel();
    unlockSpeech.done=true;
  }catch(e){}
}
function startLoop(rate){
  if(!window.speechSynthesis){
    toast("当前浏览器不支持朗读", true);
    return;
  }
  const s0=current();
  if(!s0||!s0.en){
    toast("没有可播放的句子", true);
    return;
  }
  unlockSpeech();
  // 先抢媒体会话（同一点击手势），再朗读；否则耳机键不会进网页
  setupMediaSession(true);
  startMediaAudio();
  // 点击手势内同步 speak；不要 setTimeout，否则 iOS 会静音失败
  const token=++loopToken;
  try{ speechSynthesis.cancel(); }catch(e){}
  try{ speechSynthesis.resume(); }catch(e){}
  userWantsPlay=true;
  loopPlaying=true;
  loopCount=0;
  const lim=state.loop;
  const playRate = rate ?? playRateNow ?? 1;
  playRateNow=playRate;
  const text=s0.en;
  acquireWakeLock();
  startKeepAlives();
  savePrefs();
  updateMediaSession();

  const finishOrNext=()=>{
    if(token!==loopToken) return;
    loopPlaying=false;
    if(lim>0 && state.idx < playLen()-1){
      updatePlayUI();
      setTimeout(()=>{
        if(token!==loopToken) return;
        state.idx++;
        savePrefs();
        render();
        startLoop(playRate);
      }, 350);
      return;
    }
    // 播完后仍挂起会话，耳机单击可再播当前句
    pausePlayback(false);
    if($("status") && lim>0 && state.idx >= playLen()-1) $("status").textContent="已到最后一句";
  };

  const playOnce=(isFirst)=>{
    if(token!==loopToken) return;
    if(lim>0 && loopCount>=lim){ finishOrNext(); return; }
    loopCount++;
    updatePlayUI();
    const u=new SpeechSynthesisUtterance(text);
    const v=pickVoice();
    if(v){ u.voice=v; u.lang=v.lang||"en-US"; }
    else { u.lang="en-US"; }
    u.rate=playRate;
    u.pitch=1;
    u.volume=1;
    u.onstart=()=>{ nudgeMediaAudio(); updateMediaSession(); };
    u.onend=()=>{
      if(token!==loopToken) return;
      nudgeMediaAudio();
      updateMediaSession();
      setTimeout(()=>playOnce(false), 400);
    };
    u.onerror=ev=>{
      if(token!==loopToken) return;
      const err=(ev&&ev.error)||"";
      if(err==="interrupted" || err==="canceled" || err==="cancelled"){
        // 本轮主动 cancel 时忽略
        return;
      }
      loopPlaying=false;
      updatePlayUI();
      toast("朗读失败"+(err?("："+err):"")+"。请关闭静音拨片后重试", true);
    };
    try{
      if(!isFirst){ try{ speechSynthesis.resume(); }catch(e){} }
      speechSynthesis.speak(u);
      nudgeMediaAudio();
    }catch(e){
      toast("朗读启动失败", true);
      loopPlaying=false;
      updatePlayUI();
    }
  };
  // 先更新「第 1 遍」，再在同一个点击调用栈里 speak
  playOnce(true);
  render();
}
window.srPlay = function srPlay(ev){
  if(ev&&ev.preventDefault) ev.preventDefault();
  if(loopPlaying) stopLoop({ soft:true });
  else startLoop();
  return false;
};
window.srSlow = function srSlow(ev){
  if(ev&&ev.preventDefault) ev.preventDefault();
  if(loopPlaying) stopLoop({ soft:true });
  startLoop(0.65);
  return false;
};

function render(){
  const has=state.items.length>0;
  $("player").style.display=has?"block":"none";
  $("empty").style.display=has?"none":"block";
  if($("setup")) $("setup").style.display = has ? "none" : "block";
  if(!has){ stopLoop(); _mediaHold=false; return; }
  const len=playLen();
  if(state.idx>=len) state.idx=Math.max(0, len-1);
  if(state.idx<0) state.idx=0;
  const s=current();
  const sortLabel=state.sort==="recent"?"最新收藏":state.sort==="random"?"随机":"易错优先";
  $("counter").textContent = `${state.idx+1} / ${len}` + (s&&s.mode?` · ${String(s.mode).toUpperCase()}`:"") + ` · ${sortLabel}`;
  if(state.sort==="recent" && state._sortHasTime===false){
    setPlayMsg("缺少收藏时间：请电脑重新「生成 / 更新云同步」后，手机点刷新。", "msg err");
  }
  $("en").textContent = s.en||"";
  const fill=$("progressFill");
  if(fill){
    const pct = state.items.length ? ((state.idx+1)/state.items.length)*100 : 0;
    fill.style.width = pct.toFixed(2)+"%";
  }
  if($("statsLine")){
    $("statsLine").innerHTML = `<span class="fail">错 ${+(s.fails||0)||0}</span>`;
  }
  $("cnPanel").innerHTML = esc(s.cn||"（暂无中文）");
  $("cnPanel").classList.toggle("show", state.showCn);
  const note=(s.note||"").trim();
  $("notePanel").innerHTML = note ? esc(note) : "这句还没有备注";
  $("notePanel").classList.toggle("show", state.showNote);
  if(state.updatedAt){
    $("updated").textContent = "已同步 · "+new Date(state.updatedAt).toLocaleString();
  }else{
    $("updated").textContent = "听练 · "+APP_BUILD;
  }
  updatePlayUI();
}

async function refreshAll(opts){
  const quiet=!!(opts&&opts.quiet);
  // 手动点刷新：重新按排序规则排；后台静默：只合并次数
  const resort=opts&&Object.prototype.hasOwnProperty.call(opts,"resort") ? !!opts.resort : !quiet;
  if(!quiet) setFeedback("正在刷新…", false);
  const id=(localStorage.getItem(SYNC_KEY)||"").trim() || (new URLSearchParams(location.search).get("id")||"").trim();
  if(id){
    localStorage.setItem(SYNC_KEY, id);
    if($("syncIdInput")) $("syncIdInput").value=id;
    try{
      const pack=await fetchCloud(id);
      const msg=applyPack(pack, "云同步", { resort });
      if(!quiet) setFeedback((msg||("已刷新 "+state.items.length+" 句"))+" · "+new Date().toLocaleTimeString(), false);
      return true;
    }catch(e){
      const tip=(e&&e.name==="AbortError")?"云同步超时":((e&&e.message)||"云同步失败");
      if(loadCache()){
        render();
        setFeedback(tip+"，已用缓存（"+state.items.length+" 句）", true);
        return false;
      }
      setFeedback(tip+"（国内网络可能需代理）", true);
      return false;
    }
  }
  try{
    const pack=await fetchLocalFile();
    applyPack(pack, "局域网文件", { resort });
    if(!quiet) setFeedback("已从局域网刷新 · "+new Date().toLocaleTimeString(), false);
    return true;
  }catch(e){}
  if(loadCache()){
    render();
    setFeedback("已加载缓存。保存同步码后可联网自动更新。", !quiet);
    return false;
  }
  setFeedback("请先粘贴并保存电脑上的同步码", true);
  return false;
}

function saveSyncAndPull(){
  const raw=($("syncIdInput").value||"").trim();
  if(!raw){
    $("setupMsg").textContent="请填写同步码";
    $("setupMsg").className="msg err";
    return;
  }
  if($("jsonbinKeyInput")) saveJsonbinKey($("jsonbinKeyInput").value);
  if(raw.startsWith("{")){
    try{ applyPack(JSON.parse(raw), "粘贴导入"); }catch(e){
      $("setupMsg").textContent="JSON 解析失败"; $("setupMsg").className="msg err";
    }
    return;
  }
  localStorage.setItem(SYNC_KEY, raw);
  const u=new URL(location.href);
  u.searchParams.set("id", raw);
  history.replaceState(null, "", u.pathname+u.search+u.hash);
  refreshAll();
}

function importPasteJson(){
  const raw=($("pasteInput")&&$("pasteInput").value||"").trim();
  if(!raw){
    $("setupMsg").textContent="请粘贴听练包 JSON";
    $("setupMsg").className="msg err";
    return;
  }
  try{ applyPack(JSON.parse(raw), "粘贴导入"); }
  catch(e){ $("setupMsg").textContent="JSON 解析失败"; $("setupMsg").className="msg err"; }
}

if($("fileInput")) $("fileInput").onchange=async e=>{
  const f=e.target.files&&e.target.files[0];
  if(!f) return;
  try{
    const text=await f.text();
    applyPack(JSON.parse(text), "文件导入");
  }catch(err){
    $("setupMsg").textContent="文件读取失败";
    $("setupMsg").className="msg err";
  }
};
if($("importBtn")) $("importBtn").onclick=()=>importPasteJson();
if($("saveSyncBtn")) $("saveSyncBtn").onclick=()=>saveSyncAndPull();
if($("openSetupBtn")) $("openSetupBtn").onclick=()=>{
  if($("setup")){
    $("setup").style.display="block";
    $("setup").scrollIntoView({ behavior:"smooth", block:"start" });
  }
};
window.srRefresh = async function srRefresh(ev){
  if(ev&&ev.preventDefault) ev.preventDefault();
  const btn=$("refreshBtn");
  if(btn && btn.disabled) return false;
  const label=(btn&&btn.textContent)||"刷新";
  setRefreshBtn("is-busy", "刷新中…");
  toast("正在刷新…", false);
  setFeedback("正在刷新云端句子…", false);
  try{
    const ok=await refreshAll({ quiet:false, resort:true });
    setRefreshBtn(ok?"is-ok":"is-err", ok?"已更新":"失败");
    if(ok){
      const sortName=state.sort==="recent"?"收藏时间":state.sort==="random"?"随机":"错误次数";
      setFeedback("已刷新 "+state.items.length+" 句 · 已按「"+sortName+"」重排", false);
      toast("刷新成功 · "+state.items.length+" 句", false);
    }else{
      toast("刷新失败，请看下方说明", true);
    }
  }catch(e){
    setRefreshBtn("is-err", "失败");
    const tip=(e&&e.message)||"刷新失败";
    setFeedback(tip, true);
    toast(tip, true);
  }
  setTimeout(()=>setRefreshBtn("", label), 1800);
  return false;
};
if($("refreshBtn")) $("refreshBtn").onclick=window.srRefresh;
$("showCnBtn").onclick=()=>{ state.showCn=!state.showCn; savePrefs(); render(); };
$("showNoteBtn").onclick=()=>{ state.showNote=!state.showNote; savePrefs(); render(); };
$("loopSeg").onclick=e=>{
  const b=e.target.closest("button[data-loop]");
  if(!b) return;
  state.loop=+b.dataset.loop;
  savePrefs();
  updatePlayUI();
  if(loopPlaying) startLoop();
};
if($("sortSeg")) $("sortSeg").onclick=e=>{
  const b=e.target.closest("button[data-sort]");
  if(!b) return;
  const raw=b.dataset.sort;
  const next=raw==="recent"?"recent":raw==="random"?"random":"fails";
  const wasPlaying=loopPlaying;
  const rate=playRateNow||1;
  if(next===state.sort){
    if(next==="random"){
      sortItems(false);
      state.idx=0;
      savePrefs();
      render();
      toast("已重新随机", false);
      if(wasPlaying) startLoop(rate);
    }
    return;
  }
  state.sort=next;
  // 切换排序时回到第 1 句，才能明显看到新顺序
  sortItems(false);
  state.idx=0;
  savePrefs();
  render();
  if(wasPlaying) startLoop(rate);
};
if($("playBtn")) $("playBtn").onclick=window.srPlay;
if($("slowBtn")) $("slowBtn").onclick=window.srSlow;
if($("prevBtn")) $("prevBtn").onclick=()=>goPrev(false);
if($("nextBtn")) $("nextBtn").onclick=()=>goNext(false);
if($("restartBtn")) $("restartBtn").onclick=()=>{
  if(!confirm("确定从头开始？将回到第 1 句。")) return;
  stopLoop();
  state.idx=0;
  savePrefs();
  render();
};
if($("missBtn")) $("missBtn").onclick=()=>recordPractice();
if($("jsonbinKeyInput")){
  $("jsonbinKeyInput").value=state.jsonbinKey||"";
  $("jsonbinKeyInput").onchange=e=>saveJsonbinKey(e.target.value);
  $("jsonbinKeyInput").onblur=e=>saveJsonbinKey(e.target.value);
}
if($("voiceSel")) $("voiceSel").onchange=e=>{
  state.voiceURI=e.target.value||"";
  savePrefs();
  updateVoiceHint();
  if(loopPlaying) startLoop();
};

document.addEventListener("visibilitychange", async ()=>{
  if(document.visibilityState!=="visible") return;
  savePrefs();
  const wasWant=userWantsPlay;
  if(navigator.onLine){
    try{ await refreshAll({ quiet:true }); }catch(e){}
  }
  if(wasWant && document.visibilityState==="visible"){
    acquireWakeLock();
    startLoop(playRateNow||1);
  }
});
window.addEventListener("online", ()=>refreshAll({ quiet:true }));
window.addEventListener("pagehide", ()=>savePrefs());
window.addEventListener("beforeunload", ()=>savePrefs());

loadPrefs();
setupMediaSession();
if($("jsonbinKeyInput")) $("jsonbinKeyInput").value=state.jsonbinKey||"";
if(window.speechSynthesis){
  loadVoices();
  speechSynthesis.onvoiceschanged=loadVoices;
  // iOS 有时首次 getVoices 为空，稍后再拉一次
  setTimeout(loadVoices, 400);
  setTimeout(loadVoices, 1200);
}
const bootId=(new URLSearchParams(location.search).get("id")||localStorage.getItem(SYNC_KEY)||"").trim();
if($("syncIdInput") && bootId) $("syncIdInput").value=bootId;
if($("buildTag")) $("buildTag").textContent = "版本 "+APP_BUILD;
if(loadCache()){
  if(!state.playOrder||!state.playOrder.length) state.playOrder=state.items.map(x=>x.en);
  render();
}else render();
refreshAll({ quiet:true, resort:false });
toast("听练页已加载 · "+APP_BUILD, false);

(async function checkHomescreenFreshness(){
  try{
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || !!window.navigator.standalone;
    const bar=document.getElementById("updateBar");
    const res=await fetch("version.json?v="+Date.now(), { cache:"no-store" });
    if(!res.ok) return;
    const j=await res.json();
    if(j && j.build && j.build!==APP_BUILD){
      if(bar) bar.classList.add("show");
      toast("发现新版本 "+j.build+"，当前 "+APP_BUILD+"。请删掉桌面图标后重新添加", true);
    }else{
      // 版本已对齐：清掉误报黄条（旧 HTML + trampoline 竞态会误亮）
      if(bar) bar.classList.remove("show");
      const tag=document.getElementById("buildTag");
      if(tag) tag.textContent="版本 "+APP_BUILD+(isStandalone?" · 桌面":"");
    }
  }catch(e){}
})();

