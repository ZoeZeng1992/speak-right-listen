
const CACHE_KEY="sr_listen_pack_cache";
const PREF_KEY="sr_fav_listen_prefs";
const SYNC_KEY="sr_fav_sync_id";
const JSONBIN_KEY="sr_jsonbin_key";
const APP_BUILD="20260731-homescreen6";
const JSONBIN_API="https://api.jsonbin.io/v3/b";
const JSONBLOB_API="https://jsonblob.com/api/jsonBlob";

const $ = id => document.getElementById(id);
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
    if(p.sort==="recent" || p.sort==="fails") state.sort=p.sort;
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
    if(!userWantsPlay) return;
    try{ if(speechSynthesis.paused) speechSynthesis.resume(); }catch(e){}
  }, 8000);
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
function sortItems(keepCurrent){
  const cur=typeof keepCurrent==="string"
    ? keepCurrent
    : (keepCurrent ? (state.items[state.idx]&&state.items[state.idx].en) : "");
  const arr=state.items.slice();
  const hasTime=arr.some(x=>(x.addedAt||0)>0);
  if(state.sort==="recent"){
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
  }else if(prevEn){
    const i=(state.playOrder||[]).indexOf(prevEn);
    state.idx = i>=0 ? i : 0;
  }else{
    state.idx=Math.min(Math.max(0, state.idx), Math.max(0,(state.playOrder||state.items).length-1));
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
  if($("playMsg")){
    $("playMsg").textContent="";
    $("playMsg").className="msg playMsg";
  }
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
  const orderSnap=state.items.slice();
  const curEn=(current()&&current().en)||state.currentEn||"";
  try{
    let pack=null;
    try{ pack=await fetchCloud(id); }catch(e){ pack=null; }
    if(!pack || !Array.isArray(pack.items)) pack=buildLocalPack();
    else{
      // 上传包也按手机当前听练顺序，避免写回云端后再拉下来顺序乱
      pack.items=mergeKeepingOrder(orderSnap, pack.items);
      pack.v=4;
      pack.updatedAt=Date.now();
    }
    await putCloud(pack, id);
    // 只就地更新次数，绝不替换列表顺序
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
    if(curEn){
      const i=(state.playOrder||[]).indexOf(curEn);
      if(i>=0) state.idx=i;
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

function stopLoop(opts){
  const keepWant=!!(opts&&opts.keepWant);
  loopToken++;
  loopPlaying=false;
  loopCount=0;
  if(!keepWant){
    userWantsPlay=false;
    stopKeepAlives();
    releaseWakeLock();
  }
  try{ speechSynthesis.cancel(); }catch(e){}
  updatePlayUI();
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
function updatePlayUI(){
  const lim=state.loop;
  $("status").textContent = loopPlaying
    ? (lim>0 ? `第 ${loopCount}/${lim} 遍` : `第 ${loopCount} 遍 · ∞`)
    : "";
  $("playBtn").textContent = loopPlaying ? "暂停" : "播放";
  $("playBtn").classList.toggle("primary", true);
  $("playBtn").classList.toggle("is-playing", !!loopPlaying);
  document.querySelectorAll("#loopSeg button").forEach(b=>{
    b.classList.toggle("on", +b.dataset.loop===state.loop);
  });
  document.querySelectorAll("#sortSeg button").forEach(b=>{
    b.classList.toggle("on", b.dataset.sort===state.sort);
  });
  $("showCnBtn").classList.toggle("on", state.showCn);
  $("showNoteBtn").classList.toggle("on", state.showNote);
}
function startLoop(rate){
  if(!window.speechSynthesis){
    $("playMsg").textContent="当前浏览器不支持朗读";
    $("playMsg").className="msg err";
    return;
  }
  if(!current()||!current().en){
    $("playMsg").textContent="没有可播放的句子";
    $("playMsg").className="msg err";
    return;
  }
  stopLoop({ keepWant:true });
  const token=++loopToken;
  userWantsPlay=true;
  loopPlaying=true;
  loopCount=0;
  const lim=state.loop;
  const playRate = rate ?? playRateNow ?? 1;
  playRateNow=playRate;
  acquireWakeLock();
  startKeepAlives();
  updatePlayUI();
  $("playMsg").textContent="";
  $("playMsg").className="msg";
  savePrefs();
  render();
  const s=current();
  if(!s||!s.en){ stopLoop(); return; }

  const finishOrNext=()=>{
    if(token!==loopToken) return;
    loopPlaying=false;
    if(lim>0 && state.idx < state.items.length-1){
      updatePlayUI();
      setTimeout(()=>{
        if(token!==loopToken) return;
        state.idx++;
        savePrefs();
        render();
        startLoop(playRate);
      }, 500);
      return;
    }
    userWantsPlay=false;
    stopKeepAlives();
    releaseWakeLock();
    updatePlayUI();
    if(lim>0 && state.idx >= state.items.length-1) $("status").textContent="已到最后一句";
  };

  const playOnce=()=>{
    if(token!==loopToken) return;
    if(lim>0 && loopCount>=lim){ finishOrNext(); return; }
    loopCount++;
    updatePlayUI();
    try{ speechSynthesis.resume(); }catch(e){}
    const u=new SpeechSynthesisUtterance(s.en);
    const v=pickVoice();
    if(v){ u.voice=v; u.lang=v.lang||"en-US"; }
    else { u.lang="en-US"; }
    u.rate=playRate;
    u.pitch=1;
    u.onend=()=>{ if(token!==loopToken) return; setTimeout(playOnce, 450); };
    u.onerror=()=>{
      if(token!==loopToken) return;
      // 息屏/切走时常见 interrupted，保留进度；回来再续播
      loopPlaying=false;
      updatePlayUI();
    };
    speechSynthesis.speak(u);
  };
  playOnce();
}

function render(){
  const has=state.items.length>0;
  $("player").style.display=has?"block":"none";
  $("empty").style.display=has?"none":"block";
  if($("setup")) $("setup").style.display = has ? "none" : "block";
  if(!has){ stopLoop(); return; }
  if(state.idx>=state.items.length) state.idx=state.items.length-1;
  if(state.idx<0) state.idx=0;
  const s=current();
  const sortLabel=state.sort==="recent"?"最新收藏":"易错优先";
  $("counter").textContent = `${state.idx+1} / ${state.items.length}` + (s.mode?` · ${String(s.mode).toUpperCase()}`:"") + ` · ${sortLabel}`;
  if(state.sort==="recent" && state._sortHasTime===false && $("playMsg")){
    $("playMsg").textContent="缺少收藏时间：请电脑重新「生成 / 更新云同步」后，手机点刷新。";
    $("playMsg").className="msg err";
  }else if($("playMsg") && /缺少收藏时间/.test($("playMsg").textContent||"")){
    $("playMsg").textContent="";
    $("playMsg").className="msg";
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
      setFeedback("已刷新 "+state.items.length+" 句 · 已按「"+(state.sort==="recent"?"收藏时间":"错误次数")+"」重排", false);
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
  const next=b.dataset.sort==="recent"?"recent":"fails";
  if(next===state.sort) return;
  const wasPlaying=loopPlaying;
  const rate=playRateNow||1;
  state.sort=next;
  // 切换排序时回到第 1 句，才能明显看到新顺序
  sortItems(false);
  state.idx=0;
  savePrefs();
  render();
  if(wasPlaying) startLoop(rate);
};
$("playBtn").onclick=()=>{ if(loopPlaying) stopLoop(); else startLoop(); };
if($("slowBtn")) $("slowBtn").onclick=()=>{ if(loopPlaying) stopLoop(); startLoop(0.65); };
$("prevBtn").onclick=()=>{
  const wasPlaying=loopPlaying;
  const rate=playRateNow||1;
  if(state.idx>0) state.idx--;
  savePrefs();
  if(wasPlaying) startLoop(rate);
  else { stopLoop(); render(); }
};
$("nextBtn").onclick=()=>{
  const wasPlaying=loopPlaying;
  const rate=playRateNow||1;
  if(state.idx<state.items.length-1) state.idx++;
  savePrefs();
  if(wasPlaying) startLoop(rate);
  else { stopLoop(); render(); }
};
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
    const res=await fetch("version.json?v="+Date.now(), { cache:"no-store" });
    if(!res.ok) return;
    const j=await res.json();
    if(j && j.build && j.build!==APP_BUILD){
      const bar=document.getElementById("updateBar");
      if(bar) bar.classList.add("show");
      toast("发现新版本，请删掉桌面图标后重新添加", true);
    }else if(isStandalone){
      const tag=document.getElementById("buildTag");
      if(tag) tag.textContent="版本 "+APP_BUILD+" · 桌面";
    }
  }catch(e){}
})();

