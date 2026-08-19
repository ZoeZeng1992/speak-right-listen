
const CACHE_KEY="sr_listen_pack_cache";
const PREF_KEY="sr_fav_listen_prefs";
const SYNC_KEY="sr_fav_sync_id";
const JSONBIN_KEY="sr_jsonbin_key";
const APP_BUILD="20260817-sweep1";
window.APP_BUILD=APP_BUILD;
const JSONBIN_API="https://api.jsonbin.io/v3/b";
const JSONBLOB_API="https://jsonblob.com/api/jsonBlob";
const AUDIO_PROFILE="kokoro-82m-v1.0-q8f16|af_heart|en-us|1.00";
const AUDIO_WINDOW_BEHIND=1;
const AUDIO_WINDOW_AHEAD=2;

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
let _mediaHold=false; // 记住听练会话；暂停时只保留逻辑状态，不播放静音轨占用系统音频
let wakeLock=null, wakeKeepAlive=null, speechKeepAlive=null;
let voices=[];
let _pushTimer=null, _pushBusy=false;
let _voiceAudio=null, _activeVoiceEn="";
let _voiceAttemptSeq=0, _voiceRetryTimer=null, _voiceWatchdogTimer=null;
let _loopRecoveryTimer=null, _loopRecoveryCount=0;
const VOICE_STALL_MS=1800;
const VOICE_WATCHDOG_TICK_MS=500;
const VOICE_RETRY_BASE_MS=120;
const VOICE_RETRY_MAX_MS=1200;
const VOICE_MAX_RESUME_TRIES=8;
const _audioSlots=new Map();
let _fallbackNoticeEn="";

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
    // 仅在真正朗读时维持媒体会话；暂停/播完必须让出系统音频给其他 App。
    if(userWantsPlay || loopPlaying){
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
  "The assets are ready to export.": { cn:"这些素材可以导出了。" },
  "I'm just going to **scroll on my phone** to unwind": { cn:"我就刷刷手机放松一下。" },
  "I'm just going to scroll on my phone to unwind": { cn:"我就刷刷手机放松一下。" },
  "I'm just going to scroll on my phone to unwind.": { cn:"我就刷刷手机放松一下。" },
  "s** it a bit messy with sketches and notes?": { en:"Is it a bit messy with sketches and notes?", cn:"是不是有点乱，到处是草图和笔记？" },
  "Is it a bit messy with sketches and notes?": { cn:"是不是有点乱，到处是草图和笔记？" },
  "The radius is too round.": { en:"The radius is too big.", cn:"圆角太大了。" },
  "The radius is too big.": { cn:"圆角太大了。" },
  "The bill is included.": { en:"The service charge is included.", cn:"服务费已包含在内。" },
  "The service charge is included.": { cn:"服务费已包含在内。" },
  "Our team meets the team on Mondays.": { en:"Our team meets every Monday.", cn:"我们团队每周一开会。" },
  "Our team meets every Monday.": { cn:"我们团队每周一开会。" },
  "She has done the research talks.": { en:"She has done the user interviews." },
  "I lost my ticket briefly.": { en:"I lost my ticket at the station.", cn:"我在车站把票弄丢了。" },
  "I lost my ticket at the station.": { cn:"我在车站把票弄丢了。" },
  "I have lost my password.": { en:"I have forgotten my password." },
  "I have got feedback from my manager.": { en:"I have received feedback from my manager." },
  "You are checking my email.": { en:"You are checking your email." },
  "You are charging my phone.": { en:"You are charging your phone." },
  "We are checking my email.": { en:"We are checking our email." },
  "We are charging my phone.": { en:"We are charging our phones." },
  "They are checking my email.": { en:"They are checking their email." },
  "They are charging my phone.": { en:"They are charging their phones." },
  "He is checking my email.": { en:"He is checking his email." },
  "He is charging my phone.": { en:"He is charging his phone." },
  "She is checking my email.": { en:"She is checking her email." },
  "She is charging my phone.": { en:"She is charging her phone." },
  "Our team cooks simple dinners.": { en:"Our team keeps designs simple.", cn:"我们团队让设计保持简单。" },
  "Our team keeps designs simple.": { cn:"我们团队让设计保持简单。" },
  "Our team leaves home at eight.": { en:"Our team finishes at six.", cn:"我们团队六点收工。" },
  "Our team finishes at six.": { cn:"我们团队六点收工。" },
  "Our team takes the metro to work.": { en:"Our team works from home on Fridays.", cn:"我们团队周五在家办公。" },
  "Our team works from home on Fridays.": { cn:"我们团队周五在家办公。" },
  "I don't like this icon.": { cn:"我不喜欢这个图标。" },
  "I don't like this layout.": { cn:"我不喜欢这个布局。" },
  "I don't like this button.": { cn:"我不喜欢这个按钮。" },
  "I don't like this menu.": { cn:"我不喜欢这个菜单。" },
  "They are walking to the station.": { cn:"他们正走去车站。" },
  "The tent is waterproof.": { cn:"这顶帐篷是防水的。" },
  "He has chosen a new color.": { cn:"他已经选了一个新颜色。" },
  "She has chosen a new color.": { cn:"她已经选了一个新颜色。" },
  "She has picked a new color.": { cn:"她已经选好一个新颜色了。" },
  "He has booked a taxi.": { cn:"他已经叫了一辆出租车。" },
  "We have moved to a new tool.": { cn:"我们已经换了一个新工具。" },
  "She has tried a darker background.": { cn:"她试过一种更深的背景。" },
  "They have moved to a new flat.": { cn:"他们搬到一套新公寓了。" },
  "I have set an alarm.": { cn:"我定了一个闹钟。" },
  "I have not booked a hotel yet.": { cn:"我还没订一家酒店。" },
  "We have never stayed in a hostel.": { cn:"我们从没住过一家青旅。" },
  "They have joined a walking tour.": { cn:"他们参加了一个步行游览团。" },
  "I have booked a rental car.": { cn:"我租好了一辆车。" },
  "He has reviewed my work.": { cn:"他已经评审过我的稿子了。" },
  "He has checked the contrast.": { cn:"他已经检查过对比度了。" },
  "I have checked the weather.": { cn:"我查过天气预报了。" },
  "She has finished her research.": { cn:"她已经做完她那部分调研了。" },
  "They have flown home.": { cn:"他们已经飞回家了。" },
  "We have met the deadline.": { cn:"我们赶上截止时间了。" },
  "She has joined a gym.": { cn:"她加入了一家健身房。" },
  "He has already left home.": { cn:"他已经离开家了。" },
  "She has felt the same way.": { cn:"她也有同样的感觉。" },
  "She has taken good notes.": { cn:"她笔记记得很好。" },
  "We have finished our meal.": { cn:"我们把这顿饭吃完了。" },
  "We have improved the onboarding.": { cn:"我们已经把新手引导改进了。" },
  "We have agreed on the layout.": { cn:"布局我们已经达成一致了。" },
  "He has talked to the users.": { cn:"他已经和这些用户聊过了。" },
  "She has finished the icons.": { cn:"她已经做完这些图标了。" },
  "She has read your notes.": { cn:"她已经看了你那些备注。" },
  "I have finished the wireframes.": { cn:"我已经画完这些线框图了。" },
  "I have exported the assets.": { cn:"我已经把这些素材导出来了。" },
  "I have renamed the layers.": { cn:"我已经把这些图层重新命名了。" },
  "Have you finished the icons?": { cn:"这些图标你做完了吗？" },
  "I have uploaded the screenshots.": { cn:"我已经把这些截图传上去了。" },
  "He has prepared the slides.": { cn:"他已经把这些演示稿准备好了。" },
  "She has reduced the steps.": { cn:"她已经把这些步骤减少了。" },
  "She has put the icons in a folder.": { cn:"她把这些图标放进一个文件夹了。" },
  "I have marked the changes.": { cn:"我已经把这些改动标出来了。" },
  "I have sorted the layers.": { cn:"我把这些图层整理好了。" },
  "He has forgotten his keys.": { cn:"他把那几把钥匙忘了。" },
  "Have you seen my keys?": { cn:"你看见我那几把钥匙了吗？" },
  "She has turned off the lights.": { cn:"她把灯都关了。" },
  "I have understood the rules.": { cn:"这些规则我明白了。" },
  "Have you booked the tickets?": { cn:"那几张票你订了吗？" },
  "He has made a simpler version.": { cn:"他已经做了一个更简单的版本。" },
  "She has never missed a deadline.": { cn:"她从没错过一次截止时间。" },
  "We have booked a table.": { cn:"我们订好一个位子了。" },
  "I have booked a table.": { cn:"我已经订好一个位子了。" },
  "I have made a decision.": { cn:"我已经做了一个决定。" },
  "He has read your notes.": { cn:"他已经看了你那些备注。" },
  "She had left a comment before I opened the file.": { cn:"我打开文件之前，她就留了一条评论。" },
  "They had hired a designer before I applied.": { cn:"我投简历之前，他们就招到一位设计师了。" },
  "They had moved to a new tool before last year.": { cn:"去年之前，他们就换了一个新工具。" },
  "They had found a restaurant before we asked.": { cn:"我们问之前，他们就找到一家餐厅了。" },
  "We had agreed on the layout before the call.": { cn:"开会之前，我们就对布局达成一致了。" },
  "He had grown vegetables before he had a garden.": { en:"He had grown some vegetables before he moved.", cn:"他搬家之前，种过一些菜。" },
  "He had grown some vegetables before he moved.": { cn:"他搬家之前，种过一些菜。" }
};
function fixPackItem(x){
  if(!x||!x.en) return x;
  // 旧中文兜底（英文可能已是新句，但 cn 仍停在「已导出」）
  if(/这些素材已导出/.test(String(x.cn||""))){
    return Object.assign({}, x, {
      en:"The assets are ready to export.",
      cn:"这些素材可以导出了。"
    });
  }
  if(/我只想刷刷手机/.test(String(x.cn||"")) && /scroll on my phone/i.test(x.en) && /unwind/i.test(x.en)){
    return Object.assign({}, x, { cn:"我就刷刷手机放松一下。" });
  }
  if((/画了草图/.test(String(x.cn||"")) || /s\*\* it a bit messy/i.test(x.en)) && /messy/i.test(x.en) && /sketches/i.test(x.en)){
    return Object.assign({}, x, {
      en:"Is it a bit messy with sketches and notes?",
      cn:"是不是有点乱，到处是草图和笔记？"
    });
  }
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
  if(!v){
    el.innerHTML="正常播放固定使用<b>声音 A（美国女声）</b>。当前设备没有系统备用英语语音；只有声音 A 缺失或网络失败时才会受影响。";
    return;
  }
  el.innerHTML="正常播放固定使用<b>声音 A（美国女声）</b>。上方的 <b>"+esc(v.name)+"</b> 只在声音 A 尚未生成或网络失败时备用。";
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
  // 已知改正句：强制用修正后的中文（不能让本地旧 cn 盖住）
  const fixedEn = (PACK_SENTENCE_FIXES[x.en]&&PACK_SENTENCE_FIXES[x.en].en) || x.en;
  const forcedCn = (PACK_SENTENCE_FIXES[x.en]&&PACK_SENTENCE_FIXES[x.en].cn)
    || (PACK_SENTENCE_FIXES[fixedEn]&&PACK_SENTENCE_FIXES[fixedEn].cn)
    || (PACK_SENTENCE_FIXES[o.en]&&PACK_SENTENCE_FIXES[o.en].cn);
  return fixPackItem({
    en:x.en,
    cn: forcedCn || x.cn || o.cn || "",
    note:x.note||o.note||"",
    mode:x.mode||o.mode||"",
    fails:Math.max(+(x.fails||0)||0, +(o.fails||0)||0),
    gots:Math.max(+(x.gots||0)||0, +(o.gots||0)||0),
    addedAt:Math.max(+(x.addedAt||0)||0, +(o.addedAt||0)||0)
  });
}
/** 保留 orderItems 的顺序，只合并次数/文案；other 里多出来的句追加在末尾 */
function mergeKeepingOrder(orderItems, otherItems){
  // 先两边都做旧→新改写，避免「exported」和「ready to export」各留一句
  const a=fixPackItems(orderItems);
  const b=fixPackItems(otherItems);
  const other=new Map();
  b.forEach(x=>{ if(x&&x.en) other.set(x.en, x); });
  const seen=new Set();
  const out=[];
  a.forEach(x=>{
    if(!x||!x.en||seen.has(x.en)) return;
    seen.add(x.en);
    out.push(itemFrom(x, other.get(x.en)));
  });
  b.forEach(x=>{
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
      state.items=fixPackItems(pack.items.filter(x=>x&&x.en));
      state.updatedAt=pack.updatedAt||0;
      // 把改正写回缓存，避免下次又读到旧中文
      try{
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          v:4, updatedAt:state.updatedAt, items:state.items, source:pack.source||"cache-fix", build:APP_BUILD
        }));
      }catch(e){}
      sortItems(false);
      if(state.currentEn){
        const fixedCur=(PACK_SENTENCE_FIXES[state.currentEn]&&PACK_SENTENCE_FIXES[state.currentEn].en)||state.currentEn;
        state.currentEn=fixedCur;
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
function applyLocalSentenceFixes(opts){
  if(!state.items||!state.items.length) return false;
  const before=state.items.map(x=>(x.en||"")+"\t"+(x.cn||"")).join("\n");
  state.items=fixPackItems(state.items);
  if(state.playOrder&&state.playOrder.length){
    const seen=new Set();
    state.playOrder=state.playOrder.map(en=>{
      const f=PACK_SENTENCE_FIXES[en];
      return (f&&f.en)||en;
    }).filter(en=>{
      if(!en||seen.has(en)) return false;
      seen.add(en);
      return state.items.some(x=>x&&x.en===en);
    });
    state.items.forEach(x=>{
      if(x&&x.en && !seen.has(x.en)){ seen.add(x.en); state.playOrder.push(x.en); }
    });
  }
  if(state.currentEn && PACK_SENTENCE_FIXES[state.currentEn]&&PACK_SENTENCE_FIXES[state.currentEn].en){
    state.currentEn=PACK_SENTENCE_FIXES[state.currentEn].en;
  }
  const after=state.items.map(x=>(x.en||"")+"\t"+(x.cn||"")).join("\n");
  if(before===after) return false;
  try{
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      v:4, updatedAt:state.updatedAt||Date.now(), items:state.items, source:"local-fix", build:APP_BUILD
    }));
  }catch(e){}
  savePrefs();
  if(!(opts&&opts.silent)) render();
  return true;
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
    return await decodeFavPack(j.record || j);
  }
  const res=await fetchWithTimeout(JSONBLOB_API+"/"+encodeURIComponent(parsed.id), {
    headers:{ "Accept":"application/json" }
  }, 8000);
  if(!res.ok) throw new Error("云拉取失败 ("+res.status+")");
  return await decodeFavPack(await res.json());
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
/* ---- 云同步包压缩，必须与电脑端 english-trainer.html 保持一致 ----
   Jsonbin 免费版单个 record 上限 100KB，明文包已超；gzip+base64 后约 45%。
   读取时自动识别：带 enc:"gzip-b64" 的解压，v4 明文包原样返回。          */
function _u8ToB64(bytes){
  let bin="";
  const CH=0x8000;
  for(let i=0;i<bytes.length;i+=CH) bin+=String.fromCharCode.apply(null, bytes.subarray(i, i+CH));
  return btoa(bin);
}
function _b64ToU8(b64){
  const bin=atob(b64), out=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i);
  return out;
}
async function encodeFavPack(pack){
  try{
    if(typeof CompressionStream!=="function") return pack;
    const src=new Blob([new TextEncoder().encode(JSON.stringify(pack))]);
    const buf=await new Response(src.stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer();
    return { v:5, enc:"gzip-b64", updatedAt:pack.updatedAt||Date.now(),
             n:(pack.items||[]).length, data:_u8ToB64(new Uint8Array(buf)) };
  }catch(e){ return pack; }
}
async function decodeFavPack(raw){
  if(!raw || typeof raw!=="object") return raw;
  if(raw.enc!=="gzip-b64" || !raw.data) return raw;
  if(typeof DecompressionStream!=="function")
    throw new Error("此设备不支持解压同步包（需 iOS 16.4+）");
  const src=new Blob([_b64ToU8(raw.data)]);
  const buf=await new Response(src.stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  return JSON.parse(new TextDecoder().decode(buf));
}
/** 回写给电脑的小包：只有 en -> [fails, gots]。416 句约 8KB，永远撞不到 Jsonbin 的 100KB。 */
function buildStatsPack(){
  const stats={};
  state.items.forEach(x=>{
    if(!x||!x.en) return;
    stats[x.en]=[+(x.fails||0)||0, +(x.gots||0)||0];
  });
  return { v:6, updatedAt:Date.now(), stats };
}
/** 读云端次数，兼容 v6 小包和旧的 v4 整包 */
function readStatsPack(pack){
  if(!pack || typeof pack!=="object") return null;
  if(pack.stats && typeof pack.stats==="object" && !Array.isArray(pack.items)) return pack.stats;
  if(Array.isArray(pack.items)){
    const out={};
    pack.items.forEach(x=>{
      if(!x||!x.en) return;
      out[x.en]=[+(x.fails||0)||0, +(x.gots||0)||0];
    });
    return out;
  }
  return null;
}
async function putCloud(pack, rawId){
  const parsed=parseFavSyncId(rawId);
  if(!parsed.id) throw new Error("同步码无效");
  const body=JSON.stringify(await encodeFavPack(pack));
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
  // 异步回来后绝不改 idx（否则用户中途点「下一句」会被拽回上一句）
  const keptIdx=state.idx;
  const keptEn=(current()&&current().en)||state.currentEn||"";
  try{
    // 只回传次数：整包已改走 GitHub，这条通道永远只有几 KB
    let remote=null;
    try{ remote=await fetchCloud(id); }catch(e){ remote=null; }
    const rs=readStatsPack(remote);
    if(rs){
      state.items.forEach(it=>{
        const v=rs[it.en];
        if(!Array.isArray(v)) return;
        it.fails=Math.max(+(it.fails||0)||0, +(v[0]||0)||0);
        it.gots=Math.max(+(it.gots||0)||0, +(v[1]||0)||0);
      });
    }
    const pack=buildStatsPack();
    await putCloud(pack, id);
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
  // 同目录文件：GitHub Pages 上是电脑推的压缩包，局域网上是 serve.py 写的明文包。
  // decodeFavPack 会自动识别两种格式。?ts= 用来穿透 Pages 的 CDN 缓存（max-age=600）。
  const res=await fetchWithTimeout("fav-listen-data.json?ts="+Date.now(), { cache:"no-store" }, 8000);
  if(!res.ok) throw new Error("本地文件不存在");
  return await decodeFavPack(await res.json());
}

/* ---- 声音 A 的四句滑动窗口：上一句 + 当前句 + 后两句 ----
   fetch(cache:no-store) 后只把压缩 MP3 Blob 留在内存；不写 Cache Storage，
   也不为预加载句创建解码播放器。真正播放始终复用一个 Audio 元素。 */
function canonicalAudioText(text){
  let value=String(text||"");
  try{ value=value.normalize("NFC"); }catch(e){}
  // Chat 里的 Markdown 星号会被 en-US 引擎读成 "asterisk"。
  // 混入中文说明时只朗读英文部分；屏幕原文和句库本身保持不变。
  value=value.replace(/\*/g,"").replace(/`/g,"");
  const han=/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
  if(han.test(value)){
    value=value.replace(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g," ");
    value=value.replace(/[，。！？：；、“”《》【】（）…·\/\\|]+/g," ");
  }
  return value.trim().replace(/\s+/g," ");
}
async function sha256Hex(text){
  if(!(window.crypto&&crypto.subtle&&window.TextEncoder)) throw new Error("浏览器不支持音频索引");
  const data=new TextEncoder().encode(text);
  const digest=await crypto.subtle.digest("SHA-256",data);
  return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
}
async function audioPathForEn(en){
  const digest=await sha256Hex(AUDIO_PROFILE+"\n"+canonicalAudioText(en));
  return "audio/"+digest.slice(0,2)+"/"+digest+".mp3";
}
function audioWindowEns(){
  const out=[];
  const order=state.playOrder||[];
  const from=Math.max(0,state.idx-AUDIO_WINDOW_BEHIND);
  const to=Math.min(order.length-1,state.idx+AUDIO_WINDOW_AHEAD);
  for(let i=from;i<=to;i++){
    const en=order[i];
    if(en&&!out.includes(en)) out.push(en);
  }
  return out;
}
function ensureVoiceAudio(){
  if(_voiceAudio) return _voiceAudio;
  const a=document.createElement("audio");
  a.id="voiceAPlayer";
  a.preload="auto";
  a.setAttribute("playsinline","");
  a.setAttribute("webkit-playsinline","");
  a.style.display="none";
  document.body.appendChild(a);
  _voiceAudio=a;
  return a;
}
function clearVoiceRecovery(invalidate){
  if(_voiceRetryTimer){ clearTimeout(_voiceRetryTimer); _voiceRetryTimer=null; }
  if(_voiceWatchdogTimer){ clearTimeout(_voiceWatchdogTimer); _voiceWatchdogTimer=null; }
  if(invalidate) _voiceAttemptSeq++;
}
function clearLoopRecovery(resetCount){
  if(_loopRecoveryTimer){ clearTimeout(_loopRecoveryTimer); _loopRecoveryTimer=null; }
  if(resetCount) _loopRecoveryCount=0;
}
function markPlaybackHealthy(){
  clearLoopRecovery(true);
}
function stopVoiceAudio(reset){
  clearVoiceRecovery(true);
  if(!_voiceAudio) return;
  try{
    _voiceAudio.onended=null;
    _voiceAudio.onerror=null;
    _voiceAudio.onpause=null;
    _voiceAudio.onplaying=null;
    _voiceAudio.ontimeupdate=null;
    _voiceAudio.onwaiting=null;
    _voiceAudio.onstalled=null;
    _voiceAudio.pause();
    if(reset!==false) _voiceAudio.currentTime=0;
  }catch(e){}
  _activeVoiceEn="";
}
function releaseAudioSlot(en){
  const slot=_audioSlots.get(en);
  if(!slot) return;
  try{ if(slot.controller) slot.controller.abort(); }catch(e){}
  if(_voiceAudio&&_voiceAudio.dataset.en===en){
    stopVoiceAudio(true);
    try{ _voiceAudio.removeAttribute("src"); _voiceAudio.load(); }catch(e){}
    if(_voiceAudio.dataset) delete _voiceAudio.dataset.en;
  }
  try{ if(slot.url) URL.revokeObjectURL(slot.url); }catch(e){}
  _audioSlots.delete(en);
}
function releaseAllAudioSlots(){
  Array.from(_audioSlots.keys()).forEach(releaseAudioSlot);
}
async function preloadVoiceAudio(en){
  if(!en||_audioSlots.has(en)) return;
  const controller=new AbortController();
  const slot={en,status:"loading",controller,url:"",bytes:0,failedAt:0};
  _audioSlots.set(en,slot);
  try{
    const path=await audioPathForEn(en);
    if(_audioSlots.get(en)!==slot) return;
    slot.path=path;
    const res=await fetch(path,{cache:"no-store",credentials:"same-origin",signal:controller.signal});
    if(!res.ok) throw new Error(res.status===404?"尚未生成":"下载失败 "+res.status);
    const blob=await res.blob();
    if(!blob.size) throw new Error("音频为空");
    if(_audioSlots.get(en)!==slot) return;
    slot.url=URL.createObjectURL(blob);
    slot.bytes=blob.size;
    slot.status="ready";
    slot.controller=null;
  }catch(e){
    if(e&&e.name==="AbortError") return;
    if(_audioSlots.get(en)!==slot) return;
    slot.status="error";
    slot.error=(e&&e.message)||String(e);
    slot.failedAt=Date.now();
    slot.controller=null;
  }
}
function refreshAudioWindow(opts){
  const wanted=new Set(audioWindowEns());
  const retryErrors=!!(opts&&opts.retryErrors);
  for(const en of Array.from(_audioSlots.keys())){
    const slot=_audioSlots.get(en);
    const retry=slot&&slot.status==="error"&&(retryErrors||Date.now()-(slot.failedAt||0)>30000);
    if(!wanted.has(en)||retry) releaseAudioSlot(en);
  }
  wanted.forEach(en=>{ if(!_audioSlots.has(en)) preloadVoiceAudio(en); });
}
function readyVoiceSlot(en){
  const slot=_audioSlots.get(en);
  return slot&&slot.status==="ready"&&slot.url ? slot : null;
}
function notifySystemFallback(en, reason){
  if(_fallbackNoticeEn===en) return;
  _fallbackNoticeEn=en;
  toast("声音 A "+(reason||"暂不可用")+"，本句暂用系统备用发音",true);
}

/** soft：只停朗读并记住会话，停止所有音频以让出系统音频通道
 *  hard/默认：彻底结束听练会话，耳机键不再指向本页 */
function stopLoop(opts){
  const keepWant=!!(opts&&opts.keepWant);
  const soft=!!(opts&&opts.soft);
  if(soft && !keepWant){
    pausePlayback(!!(opts&&opts.fromRemote));
    return;
  }
  loopToken++;
  clearLoopRecovery(true);
  loopPlaying=false;
  loopCount=0;
  if(!keepWant){
    userWantsPlay=false;
    _mediaHold=false;
    stopKeepAlives();
    releaseWakeLock();
    stopMediaAudio();
  }
  stopVoiceAudio(true);
  try{ speechSynthesis.cancel(); }catch(e){}
  updatePlayUI();
  updateMediaSession();
}
function pausePlayback(fromRemote){
  loopToken++;
  clearLoopRecovery(true);
  loopPlaying=false;
  loopCount=0;
  userWantsPlay=false;
  releaseWakeLock();
  stopVoiceAudio(false);
  try{ speechSynthesis.cancel(); }catch(e){}
  _mediaHold=true;
  // 暂停/播完后不能留静音轨在后台，否则 iOS 会把其他 App 的视频暂停。
  stopKeepAlives();
  stopMediaAudio();
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
  // 已软暂停时收到远程 pause 仍按“继续”处理，兼容部分耳机的切换事件。
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
  // 取下耳机 / 系统打断会 pause；只有正在朗读时才续上。
  // 逻辑软暂停（_mediaHold）不能单独触发续播，否则会抢其他 App 的音频焦点。
  a.addEventListener("pause", ()=>{
    if(!userWantsPlay && !loopPlaying) return;
    setTimeout(()=>{
      if(!userWantsPlay && !loopPlaying) return;
      nudgeMediaAudio();
      setupMediaSession(true);
      updateMediaSession();
    }, 400);
  });
}
function yieldMediaKeeperToVoice(){
  try{
    if(_mediaAudio&&!_mediaAudio.paused) _mediaAudio.pause();
  }catch(e){}
}
function nudgeMediaAudio(){
  try{
    // 声音 A 的一次连续循环会话（包括每遍之间的 400ms 间隔和意外暂停）
    // 始终由真正的播放器持有音频通道；不要反复切到静音轨再切回来。
    if(_activeVoiceEn && userWantsPlay && loopPlaying) return;
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
    stopVoiceAudio(true);
    try{ speechSynthesis.cancel(); }catch(e){}
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
    stopVoiceAudio(true);
    try{ speechSynthesis.cancel(); }catch(e){}
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
  const active=loopPlaying||userWantsPlay;
  if($("status")){
    $("status").textContent = loopPlaying
      ? (lim>0 ? `第 ${loopCount}/${lim} 遍` : `第 ${loopCount} 遍 · ∞`)
      : (userWantsPlay ? "音频被系统中断，正在自动恢复…" : "");
  }
  if($("playBtn")){
    $("playBtn").textContent = active ? "暂停" : "播放";
    $("playBtn").classList.toggle("primary", true);
    $("playBtn").classList.toggle("is-playing", !!active);
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
function startLoop(rate, opts){
  const recovering=!!(opts&&opts.recovering);
  clearLoopRecovery(!recovering);
  const s0=current();
  if(!s0||!s0.en){
    toast("没有可播放的句子", true);
    return;
  }
  const text=s0.en;
  refreshAudioWindow();
  let useFixedAudio=!!readyVoiceSlot(text);
  if(!useFixedAudio && !window.speechSynthesis){
    toast("声音 A 还没加载好，当前浏览器也没有备用朗读",true);
    return;
  }
  if(!useFixedAudio){
    unlockSpeech();
    const slot=_audioSlots.get(text);
    notifySystemFallback(text,slot&&slot.status==="loading"?"还在加载":"尚未生成或网络失败");
  }
  // 同一点击手势内启动媒体会话和真正的声音 A；失败时同步启用系统备用朗读。
  setupMediaSession(true);
  startMediaAudio();
  const token=++loopToken;
  stopVoiceAudio(true);
  try{ speechSynthesis.cancel(); }catch(e){}
  try{ speechSynthesis.resume(); }catch(e){}
  userWantsPlay=true;
  loopPlaying=true;
  loopCount=0;
  const lim=state.loop;
  const playRate = rate ?? playRateNow ?? 1;
  playRateNow=playRate;
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
    // 播完后记住当前句，但停止全部音频并让出系统音频通道。
    pausePlayback(false);
    if($("status") && lim>0 && state.idx >= playLen()-1) $("status").textContent="已到最后一句";
  };

  const afterOne=()=>{
    if(token!==loopToken) return;
    nudgeMediaAudio();
    updateMediaSession();
    setTimeout(()=>playOnce(false),400);
  };

  const failPlayback=message=>{
    if(token!==loopToken) return;
    loopPlaying=false;
    updatePlayUI();
    if(userWantsPlay){
      clearLoopRecovery(false);
      const retryNo=++_loopRecoveryCount;
      const delay=Math.min(8000,500*Math.pow(2,Math.min(retryNo-1,4)));
      if(retryNo===1) toast((message||"朗读被中断")+"，正在自动恢复",true);
      _loopRecoveryTimer=setTimeout(()=>{
        _loopRecoveryTimer=null;
        if(token!==loopToken||!userWantsPlay||loopPlaying) return;
        startLoop(playRate,{recovering:true});
      },delay);
      return;
    }
    toast(message||"朗读失败，请重试",true);
  };

  const playSystemOnce=isFirst=>{
    if(!window.speechSynthesis){ failPlayback("声音 A 播放失败，且当前浏览器没有备用朗读"); return; }
    const u=new SpeechSynthesisUtterance(text);
    const v=pickVoice();
    if(v){ u.voice=v; u.lang=v.lang||"en-US"; }
    else { u.lang="en-US"; }
    u.rate=playRate;
    u.pitch=1;
    u.volume=1;
    u.onstart=()=>{ markPlaybackHealthy(); nudgeMediaAudio(); updateMediaSession(); };
    u.onend=afterOne;
    u.onerror=ev=>{
      if(token!==loopToken) return;
      const err=(ev&&ev.error)||"";
      if(err==="interrupted"||err==="canceled"||err==="cancelled") return;
      failPlayback("备用朗读失败"+(err?("："+err):""));
    };
    try{
      if(!isFirst){ try{ speechSynthesis.resume(); }catch(e){} }
      speechSynthesis.speak(u);
      nudgeMediaAudio();
    }catch(e){ failPlayback("备用朗读启动失败"); }
  };

  const playVoiceAOnce=()=>{
    const slot=readyVoiceSlot(text);
    if(!slot){
      useFixedAudio=false;
      notifySystemFallback(text,"暂不可用");
      playSystemOnce(false);
      return;
    }
    const a=ensureVoiceAudio();
    clearVoiceRecovery(true);
    const attempt=_voiceAttemptSeq;
    let failed=false, finished=false, resumePending=false, resumeTries=0;
    let lastTime=-1, lastProgressAt=Date.now();
    const isActive=()=>!failed&&!finished&&attempt===_voiceAttemptSeq&&token===loopToken&&userWantsPlay;
    const nearEnd=()=>Number.isFinite(a.duration)&&a.duration>0&&a.currentTime>=Math.max(0,a.duration-.12);
    const detach=()=>{
      a.onended=null; a.onerror=null; a.onpause=null; a.onplaying=null;
      a.ontimeupdate=null; a.onwaiting=null; a.onstalled=null;
    };
    const complete=()=>{
      if(!isActive()) return;
      finished=true;
      detach();
      clearVoiceRecovery(true);
      afterOne();
    };
    const fallback=reason=>{
      if(!isActive()) return;
      failed=true;
      detach();
      clearVoiceRecovery(true);
      useFixedAudio=false;
      stopVoiceAudio(true);
      notifySystemFallback(text,reason||"播放失败");
      playSystemOnce(false);
    };
    const recordCurrentProgress=()=>{
      const nowTime=a.currentTime||0;
      if(lastTime<0||nowTime>lastTime+.02||nowTime<lastTime){
        lastTime=nowTime;
        lastProgressAt=Date.now();
        resumeTries=0;
        return true;
      }
      return false;
    };
    let armWatchdog, scheduleResume;
    armWatchdog=()=>{
      if(_voiceWatchdogTimer) clearTimeout(_voiceWatchdogTimer);
      _voiceWatchdogTimer=setTimeout(()=>{
        _voiceWatchdogTimer=null;
        if(!isActive()) return;
        if(a.ended||nearEnd()){ complete(); return; }
        // iOS 息屏时可能少发 timeupdate；直接读取 currentTime，避免把正常播放误判为卡住。
        if(!a.paused&&recordCurrentProgress()){ armWatchdog(); return; }
        if(a.paused){ scheduleResume("被系统暂停",false); return; }
        if(Date.now()-lastProgressAt>VOICE_STALL_MS){ scheduleResume("播放卡住",true); return; }
        armWatchdog();
      },VOICE_WATCHDOG_TICK_MS);
    };
    scheduleResume=(reason,restart)=>{
      if(!isActive()||resumePending) return;
      if(a.ended||nearEnd()){ complete(); return; }
      if(resumeTries>=VOICE_MAX_RESUME_TRIES){ fallback(reason); return; }
      resumePending=true;
      if(a.paused) nudgeMediaAudio();
      if(_voiceWatchdogTimer){ clearTimeout(_voiceWatchdogTimer); _voiceWatchdogTimer=null; }
      const delay=Math.min(VOICE_RETRY_MAX_MS,VOICE_RETRY_BASE_MS*Math.pow(2,Math.min(resumeTries,4)));
      _voiceRetryTimer=setTimeout(()=>{
        _voiceRetryTimer=null;
        if(!isActive()){ resumePending=false; return; }
        resumeTries++;
        try{
          if(restart&&resumeTries>=3){
            // 解码器连续无进度时重新挂载本地 Blob；只重播当前句，不联网。
            a.pause();
            a.src=slot.url;
            a.dataset.en=text;
            a.load();
            a.currentTime=0;
          }else if(restart){
            a.currentTime=Math.max(0,(a.currentTime||0)-.15);
          }
          const onStarted=()=>{
            if(!isActive()) return;
            resumePending=false;
            lastTime=a.currentTime||0;
            lastProgressAt=Date.now();
            nudgeMediaAudio();
            updateMediaSession();
            armWatchdog();
          };
          const onRejected=()=>{
            resumePending=false;
            if(isActive()) scheduleResume(reason,restart);
          };
          yieldMediaKeeperToVoice();
          const promise=a.play();
          if(promise&&promise.then) promise.then(onStarted).catch(onRejected);
          else onStarted();
        }catch(e){
          resumePending=false;
          if(isActive()) scheduleResume(reason,restart);
        }
      },delay);
    };
    try{
      if(a.dataset.en!==text){
        a.src=slot.url;
        a.dataset.en=text;
        a.load();
      }
      a.playbackRate=playRate;
      try{ a.preservesPitch=true; a.webkitPreservesPitch=true; }catch(e){}
      a.onended=complete;
      a.onerror=()=>scheduleResume("文件播放失败",true);
      a.onpause=()=>{
        if(!isActive()||a.ended) return;
        if(nearEnd()) complete();
        else scheduleResume("被系统暂停",false);
      };
      a.onplaying=()=>{
        if(!isActive()) return;
        resumePending=false;
        lastTime=a.currentTime||0;
        lastProgressAt=Date.now();
        markPlaybackHealthy();
        armWatchdog();
      };
      a.ontimeupdate=()=>{
        if(!isActive()) return;
        recordCurrentProgress();
      };
      a.onwaiting=armWatchdog;
      a.onstalled=()=>scheduleResume("播放卡住",true);
      a.currentTime=0;
      _activeVoiceEn=text;
      yieldMediaKeeperToVoice();
      const promise=a.play();
      if(promise&&promise.catch) promise.catch(()=>scheduleResume("未能启动",false));
      nudgeMediaAudio();
      updateMediaSession();
      armWatchdog();
    }catch(e){ fallback("未能启动"); }
  };

  const playOnce=(isFirst)=>{
    if(token!==loopToken) return;
    if(lim>0 && loopCount>=lim){ finishOrNext(); return; }
    loopCount++;
    updatePlayUI();
    if(useFixedAudio) playVoiceAOnce();
    else playSystemOnce(isFirst);
  };
  // 第一遍在点击调用栈内启动；当前句之后不再联网，1/2/3/5/∞ 都复用同一 Blob。
  playOnce(true);
  render();
}
window.srPlay = function srPlay(ev){
  if(ev&&ev.preventDefault) ev.preventDefault();
  if(loopPlaying||userWantsPlay) stopLoop({ soft:true });
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
  if(!has){ stopLoop(); _mediaHold=false; releaseAllAudioSlots(); return; }
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
  refreshAudioWindow();
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
  }
  // 优先读同目录的 fav-listen-data.json：在 GitHub Pages 上是电脑推上来的大包，
  // 在局域网上是 serve.py 写的本机文件。两边都不受 Jsonbin 100KB 限制，也不用 token。
  try{
    const pack=await fetchLocalFile();
    if(pack && Array.isArray(pack.items) && pack.items.length){
      const msg=applyPack(pack, "云同步", { resort });
      if(!quiet) setFeedback((msg||("已刷新 "+state.items.length+" 句"))+" · "+new Date().toLocaleTimeString(), false);
      return true;
    }
  }catch(e){}
  if(id){
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
      refreshAudioWindow({retryErrors:true});
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
window.addEventListener("pagehide", ()=>{ savePrefs(); releaseAllAudioSlots(); });
window.addEventListener("pageshow", ()=>{
  refreshAudioWindow({retryErrors:true});
  if(userWantsPlay) setTimeout(()=>startLoop(playRateNow||1),0);
});
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
  applyLocalSentenceFixes({ silent:true });
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
