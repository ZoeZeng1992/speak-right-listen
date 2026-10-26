/* 收藏听：豆包里收藏的单词和句子，手机上循环听；解析平时收着，点开才看。
 *
 * 播放内核（声音 A、iOS 保活、耳机/锁屏键、看门狗）整段搬自 Speak Right 的
 * english02/new/app-h17.js —— 那边在 iPhone 上踩过的坑见 english02/docs/HANDOFF.md
 * 「手机听练行为约定」，改播放相关代码前先读那一节。
 *
 * index.html 会被 iOS 主屏幕图标长期缓存，所以界面和样式全部在这里生成。
 */
(function(){
"use strict";

const APP_BUILD="20261026-1";
window.APP_BUILD=APP_BUILD;
const AUDIO_PROFILE="kokoro-82m-v1.0-q8f16|af_heart|en-us|1.00";
const AUDIO_BASE="../audio/";       // 和 Speak Right 共用同一套声音 A 音频
const SILENCE_SRC="../silence.wav";
const DATA_KEY="dbx_data_v1";
const PREFS_KEY="dbx_prefs_v1";
const DUNNO_KEY="dbx_dunno_v1";   // 每条点过几次「不会」：{收藏id: 次数}，只存在这台手机上
const AUDIO_WINDOW_BEHIND=1;
const AUDIO_WINDOW_AHEAD=2;
const VOICE_STALL_MS=1800;
const VOICE_WATCHDOG_TICK_MS=500;
const VOICE_RETRY_BASE_MS=120;
const VOICE_RETRY_MAX_MS=1200;
const VOICE_MAX_RESUME_TRIES=8;
const LOOP_OPTIONS=[1,2,3,5,0];
const KIND_LABEL={word:"单词",phrase:"短语",sentence:"句子"};

const state={
  items:[], byId:new Map(), list:[], idx:0,
  filter:"all",          // all | word（单词+短语）| sentence
  order:"new",           // new | random | dunno（只放点过「不会」的，次数多的在前）
  loop:1,
  dunno:{},
  round:{order:[],heard:[]},  // 随机这一轮：顺序 + 这一轮出现过谁（见 RANDOM-ROUND）
  curIds:{new:"",random:"",dunno:""},  // 每种顺序各记各的位置，来回切不会把随机这一轮作废
  updatedAt:"",
};
let loopToken=0, loopPlaying=false, loopCount=0, playRateNow=1;
let userWantsPlay=false;
let _mediaHold=false;
let wakeLock=null, wakeKeepAlive=null, speechKeepAlive=null;
let voices=[];
let _voiceAudio=null, _activeVoiceEn="";
let _voiceAttemptSeq=0, _voiceRetryTimer=null, _voiceWatchdogTimer=null;
let _loopRecoveryTimer=null, _loopRecoveryCount=0;
let _fallbackNoticeEn="";
let _mediaAudio=null, _mediaSessionBound=false;
let _remoteToggleAt=0;
let _voiceStalled=false;     // 声音被系统停了、正在重试：这时按钮不能显示「暂停」
let _resumeOnReturn=false;   // 在后台被别的应用打断，回到前台要自动接着播
let _runningLoop=1;          // 正在播的这一条按几遍播（播放中途改「每条重复」，下一条才生效）
const _audioSlots=new Map();

const $=id=>document.getElementById(id);
function esc(s){
  return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* ───────── 样式和骨架 ───────── */
const CSS=`
:root{
  --bg:#f6f4ef; --surface:#fffdf9; --ink:#1c1917; --muted:#78716c; --faint:#a8a29e;
  --line:rgba(28,25,23,.09); --accent:#0f766e; --accent-ink:#fff; --accent-soft:rgba(15,118,110,.1);
  --chip:#efece5; --warn:#b45309;
}
@media (prefers-color-scheme:dark){
  :root{
    --bg:#151413; --surface:#1f1d1b; --ink:#ece8e1; --muted:#a8a29e; --faint:#78716c;
    --line:rgba(236,232,225,.1); --accent:#2dd4bf; --accent-ink:#0b1f1c; --accent-soft:rgba(45,212,191,.13);
    --chip:#2a2724; --warn:#f59e0b;
  }
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;background:var(--bg);color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",sans-serif;
  -webkit-text-size-adjust:100%}
button{font:inherit;color:inherit;touch-action:manipulation;cursor:pointer}
.wrap{max-width:560px;margin:0 auto;
  padding:calc(env(safe-area-inset-top) + 14px) 16px calc(env(safe-area-inset-bottom) + 24px)}
.top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.top h1{margin:0;font-size:22px;font-weight:700;letter-spacing:.5px}
.top .sub{margin-top:3px;font-size:13px;color:var(--muted)}
.ghost{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 14px;font-size:14px}
.bar{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.seg{display:inline-flex;background:var(--chip);border-radius:999px;padding:3px}
.seg button{border:0;background:transparent;border-radius:999px;padding:7px 12px;font-size:14px;color:var(--muted)}
.seg button.on{background:var(--surface);color:var(--ink);font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.card{margin-top:14px;background:var(--surface);border:1px solid var(--line);border-radius:22px;
  padding:18px 20px 20px;min-height:250px;display:flex;flex-direction:column}
.card-head{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted)}
.badge{font-size:12px;padding:3px 9px;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-weight:600}
.en{margin:18px 0 0;font-size:27px;line-height:1.32;font-weight:650;word-break:break-word;letter-spacing:.1px}
.en.short{font-size:34px}
.ipa{margin-top:8px;font-size:15px;color:var(--muted)}
.cn{margin-top:16px;font-size:17px;line-height:1.55}
.card-foot{margin-top:auto;padding-top:18px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.dunno-btn{border:1px solid var(--line);background:var(--surface);color:var(--warn);border-radius:999px;padding:8px 16px;font-size:15px;font-weight:600}
.dunno-btn.marked{background:rgba(180,83,9,.1);border-color:transparent}
.note-btn{border:0;background:var(--accent-soft);color:var(--accent);border-radius:999px;padding:9px 16px;font-size:15px;font-weight:600}
.transport{margin-top:18px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px}
.transport .side{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:14px 0;font-size:15px}
.play{width:84px;height:84px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-ink);
  font-size:17px;font-weight:700;box-shadow:0 6px 18px rgba(15,118,110,.28)}
.play.is-playing{background:var(--ink);color:var(--bg);box-shadow:none}
.status{min-height:20px;margin-top:10px;text-align:center;font-size:13px;color:var(--muted)}
.row{margin-top:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.row .label{font-size:13px;color:var(--muted)}
.tools{display:flex;gap:8px}
.tools .ghost.on{background:var(--accent-soft);color:var(--accent);border-color:transparent;font-weight:600}
.foot{margin-top:26px;text-align:center;font-size:12px;color:var(--faint);line-height:1.7}
.banner{margin-top:12px;background:var(--accent);color:var(--accent-ink);border-radius:14px;padding:11px 14px;font-size:14px;text-align:center}
.empty{margin-top:30vh;text-align:center;color:var(--muted);font-size:15px;line-height:1.7}
.toast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom) + 28px);transform:translateX(-50%);
  background:rgba(28,25,23,.9);color:#fff;font-size:14px;padding:10px 16px;border-radius:12px;max-width:86vw;
  opacity:0;transition:opacity .2s;pointer-events:none;z-index:50;text-align:center}
.toast.show{opacity:1}
.toast.warn{background:rgba(180,83,9,.95)}
.sheet{position:fixed;inset:0;z-index:40;display:none}
.sheet.open{display:block}
.sheet .mask{position:absolute;inset:0;background:rgba(0,0,0,.35)}
.sheet .panel{position:absolute;left:0;right:0;bottom:0;max-width:560px;margin:0 auto;background:var(--surface);
  border-radius:22px 22px 0 0;max-height:90vh;display:flex;flex-direction:column;
  padding-bottom:env(safe-area-inset-bottom)}
.sheet .panel-head{padding:16px 18px 12px;border-bottom:1px solid var(--line);display:flex;gap:10px;align-items:flex-start}
.sheet .panel-head .t{flex:1;min-width:0}
.sheet .panel-head .t .en2{font-size:19px;font-weight:650;line-height:1.35;word-break:break-word}
.sheet .panel-head .t .ipa2{font-size:13px;color:var(--muted);margin-top:4px}
.sheet .panel-head .t .cn2{font-size:15px;margin-top:6px}
.x{border:0;background:var(--chip);border-radius:50%;width:34px;height:34px;font-size:18px;line-height:34px;flex:none}
.sheet .panel-body{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:6px 18px 24px}
.note{font-size:15px;line-height:1.7}
.note .h{font-weight:700;margin:16px 0 4px;font-size:15px}
.note .h1{font-size:16px}
.note .p{margin:2px 0}
.note .li{margin:2px 0;padding-left:16px;position:relative}
.note .li:before{content:"·";position:absolute;left:4px;color:var(--muted)}
.note .ol{margin:2px 0}
.note .q{margin:4px 0;padding:2px 0 2px 10px;border-left:3px solid var(--line);color:var(--muted)}
.note .gap{height:8px}
.note hr{border:0;border-top:1px dashed var(--line);margin:18px 0 6px}
.note code{font-family:ui-monospace,Menlo,monospace;font-size:13px;background:var(--chip);padding:1px 5px;border-radius:5px}
.note table{border-collapse:collapse;margin:6px 0;font-size:14px;width:100%}
.note td,.note th{border:1px solid var(--line);padding:5px 7px;text-align:left;vertical-align:top}
.search{margin:12px 18px 6px;border:1px solid var(--line);background:var(--bg);border-radius:12px;padding:10px 12px;font-size:15px;color:var(--ink);width:calc(100% - 36px)}
.items{list-style:none;margin:0;padding:0 8px 20px}
.items li{display:flex;gap:10px;padding:11px 10px;border-bottom:1px solid var(--line);align-items:flex-start}
.items li.cur{background:var(--accent-soft);border-radius:12px}
.items .n{font-size:12px;color:var(--faint);width:28px;flex:none;padding-top:3px;text-align:right}
.items .b{flex:1;min-width:0}
.items .e{font-size:16px;font-weight:600;line-height:1.35;word-break:break-word}
.items .c{font-size:13px;color:var(--muted);margin-top:2px}
.items .k{font-size:11px;color:var(--accent);flex:none;padding-top:4px}
body.locked{overflow:hidden}
`;

function buildShell(){
  const style=document.createElement("style");
  style.textContent=CSS;
  document.head.appendChild(style);
  $("app").innerHTML=`
  <div class="wrap">
    <div class="top">
      <div><h1>收藏听</h1><div class="sub" id="counts"></div></div>
      <button class="ghost" id="listBtn">列表</button>
    </div>
    <div id="bannerSlot"></div>
    <div class="bar">
      <div class="seg" id="filterSeg">
        <button data-f="all">全部</button><button data-f="word">单词</button><button data-f="sentence">句子</button>
      </div>
      <div class="seg" id="orderSeg">
        <button data-o="new">最新</button><button data-o="random">随机</button><button data-o="dunno">常不会</button>
      </div>
    </div>
    <div class="card" id="card">
      <div class="card-head"><span class="badge" id="kind"></span><span id="pos"></span></div>
      <div class="en" id="en"></div>
      <div class="ipa" id="ipa"></div>
      <div class="cn" id="cn"></div>
      <div class="card-foot"><button class="dunno-btn" id="dunnoBtn">不会</button><button class="note-btn" id="noteBtn">看解析</button></div>
    </div>
    <div class="transport">
      <button class="side" id="prevBtn">上一个</button>
      <button class="play" id="playBtn">播放</button>
      <button class="side" id="nextBtn">下一个</button>
    </div>
    <div class="status" id="status"></div>
    <div class="row">
      <div class="tools">
        <button class="ghost" id="slowBtn">慢速</button>
        <button class="ghost" id="firstBtn">从头</button>
      </div>
    </div>
    <div class="row">
      <span class="label">每条重复</span>
      <div class="seg" id="loopSeg">${LOOP_OPTIONS.map(n=>`<button data-loop="${n}">${n||"∞"}</button>`).join("")}</div>
    </div>
    <div class="foot" id="foot"></div>
  </div>
  <div class="sheet" id="noteSheet">
    <div class="mask" data-close="noteSheet"></div>
    <div class="panel">
      <div class="panel-head">
        <div class="t"><div class="en2" id="nEn"></div><div class="ipa2" id="nIpa"></div><div class="cn2" id="nCn"></div></div>
        <button class="x" data-close="noteSheet" aria-label="关闭">×</button>
      </div>
      <div class="panel-body"><div class="note" id="nBody"></div></div>
    </div>
  </div>
  <div class="sheet" id="listSheet">
    <div class="mask" data-close="listSheet"></div>
    <div class="panel">
      <div class="panel-head">
        <div class="t"><div class="en2" id="lTitle">全部收藏</div></div>
        <button class="x" data-close="listSheet" aria-label="关闭">×</button>
      </div>
      <input class="search" id="search" type="search" placeholder="搜英文或中文" autocomplete="off" />
      <div class="panel-body" style="padding:0"><ul class="items" id="items"></ul></div>
    </div>
  </div>
  <div class="toast" id="toast"></div>`;
}

/* ───────── 偏好 / 数据 ───────── */
function loadPrefs(){
  try{
    const p=JSON.parse(localStorage.getItem(PREFS_KEY)||"null");
    if(!p) return;
    if(["all","word","sentence"].includes(p.filter)) state.filter=p.filter;
    if(["new","random","dunno"].includes(p.order)) state.order=p.order;
    if(LOOP_OPTIONS.includes(p.loop)) state.loop=p.loop;
    if(p.round&&Array.isArray(p.round.order)) state.round={order:p.round.order, heard:Array.isArray(p.round.heard)?p.round.heard:[]};
    if(p.curIds) state.curIds={new:p.curIds.new||"",random:p.curIds.random||"",dunno:p.curIds.dunno||""};
  }catch(e){}
  try{
    const d=JSON.parse(localStorage.getItem(DUNNO_KEY)||"null");
    if(d&&typeof d==="object") state.dunno=d;
  }catch(e){}
}
function savePrefs(){
  const cur=current();
  if(cur) state.curIds[state.order]=cur.id;
  try{
    localStorage.setItem(PREFS_KEY, JSON.stringify({
      filter:state.filter, order:state.order, loop:state.loop,
      round:state.round, curIds:state.curIds,
    }));
  }catch(e){}
}
async function fetchPack(){
  try{
    const r=await fetch("data.json?ts="+Date.now(),{cache:"no-store"});
    if(r.ok){
      const pack=await r.json();
      if(pack&&Array.isArray(pack.items)){
        try{ localStorage.setItem(DATA_KEY, JSON.stringify(pack)); }catch(e){}
        return {pack, cached:false};
      }
    }
  }catch(e){}
  try{
    const c=JSON.parse(localStorage.getItem(DATA_KEY)||"null");
    if(c&&Array.isArray(c.items)) return {pack:c, cached:true};
  }catch(e){}
  return {pack:null, cached:false};
}
function applyPack(pack){
  const items=(pack.items||[]).filter(x=>x&&x.id&&x.en);
  items.sort((a,b)=>(b.at||0)-(a.at||0));
  state.items=items;
  state.byId=new Map(items.map(x=>[x.id,x]));
  state.updatedAt=pack.updatedAt||"";
  state.round=Round.sync(state.round, items.map(x=>x.id), state.curIds.random);
}

/* ===== RANDOM-ROUND BEGIN（tests/random-round.test.js 会把这一段单独抠出来跑）=====
   随机这一轮的规矩：当前筛选下每一条都「出现」过一次，才重洗开始下一轮。
   「出现」= 成为当前这一条（播放或者翻到都算）。
   判断用「这一轮谁出现过」(heard)，不用「指针走到哪」：中途换筛选、切到最新再切回、
   从列表跳、按上一个、关掉重开、同步进新收藏，都只是换个位置，漏不掉、也不作废这一轮。
   Speak Right 同一个毛病修过三次（english02/docs/HANDOFF.md「手机听练行为约定」），
   每次都只堵了一个入口；这里只有 step() 过完一轮时会重洗。 */
const Round={
  shuffle(arr, rnd){
    rnd=rnd||Math.random;
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(rnd()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  },
  // 收藏增删后修正这一轮：删掉的拿掉；新来的插到当前位置后面（很快轮到），不重洗
  sync(r, ids, curId, rnd){
    rnd=rnd||Math.random;
    const have=new Set(ids);
    const order=((r&&r.order)||[]).filter(id=>have.has(id));
    const heard=((r&&r.heard)||[]).filter(id=>have.has(id));
    if(!order.length) return {order:Round.shuffle(ids.slice(), rnd), heard:[]};
    const inOrder=new Set(order);
    const from=order.indexOf(curId)+1;
    ids.filter(id=>!inOrder.has(id)).forEach(id=>{
      order.splice(from+Math.floor(rnd()*(order.length-from+1)), 0, id);
    });
    return {order, heard};
  },
  arrive(r, id){
    if(!id || r.heard.indexOf(id)>=0) return false;
    r.heard.push(id);
    return true;
  },
  // 下一条还没出现过的：先从当前位置往后找，到底了再从头找（补上中途被跳过的）
  next(r, pass, curId){
    const n=r.order.length, pos=r.order.indexOf(curId);
    for(let k=1;k<=n;k++){
      const id=r.order[(pos+k+n)%n];
      if(pass(id) && r.heard.indexOf(id)<0) return id;
    }
    return null;
  },
  left(r, pass){
    return r.order.filter(id=>pass(id) && r.heard.indexOf(id)<0).length;
  },
  // 「下一个」（手动）：当前筛选下全都出现过了才重洗；别的筛选里还没出现的照样留着
  step(r, pass, curId, rnd){
    Round.arrive(r, curId);
    const id=Round.next(r, pass, curId);
    if(id) return {id, renewed:false};
    r.order=Round.shuffle(r.order.slice(), rnd);
    r.heard=r.heard.filter(id=>!pass(id));
    // 新一轮第一条正好是刚听完那条，就把它挪到这一轮最后，免得同一条连着出现两次
    if(curId && Round.next(r, pass, null)===curId && Round.left(r, pass)>1){
      r.order.splice(r.order.indexOf(curId), 1);
      r.order.push(curId);
    }
    return {id:Round.next(r, pass, null), renewed:true};
  },
  // 换筛选：当前这条还符合就留着，不符合就去下一条没出现过的
  keep(r, pass, curId){
    if(curId && r.order.indexOf(curId)>=0 && pass(curId)) return curId;
    return Round.next(r, pass, curId) || r.order.find(pass) || null;
  },
};
/* ===== RANDOM-ROUND END ===== */

function passFilter(it){
  if(state.filter==="word") return it.kind!=="sentence";
  if(state.filter==="sentence") return it.kind==="sentence";
  return true;
}
function passId(id){
  const it=state.byId.get(id);
  return !!it && passFilter(it);
}
function dunnoCount(id){ return +state.dunno[id]||0; }
/* 「常不会」的顺序只在进这个模式 / 换筛选 / 打开时排一次；在里面点「不会」只加次数，不重排，
   不然当前位置会跟着跳，下一个就会漏掉或重复。 */
function baseOrder(){
  if(state.order==="random") return state.round.order.map(id=>state.byId.get(id)).filter(Boolean);
  if(state.order==="dunno") return state.items.filter(x=>dunnoCount(x.id)>0)
    .sort((a,b)=>dunnoCount(b.id)-dunnoCount(a.id));   // 次数一样的，sort 稳定 → 保持最新在前
  return state.items;
}
/* 重建当前列表并停在 targetId。最新模式下 targetId 被筛掉了，就停在它后面最近的一条；
   随机模式下由 Round.keep 决定去哪（不会跳过还没出现的）。 */
function rebuildList(targetId){
  const src=baseOrder();
  state.list=src.filter(passFilter);
  if(state.order==="random") targetId=Round.keep(state.round, passId, targetId);
  let i=targetId ? state.list.findIndex(x=>x.id===targetId) : -1;
  if(i<0 && targetId){
    const pos=src.findIndex(x=>x.id===targetId);
    if(pos>=0){
      const after=src.slice(pos).find(passFilter);
      if(after) i=state.list.indexOf(after);
    }
  }
  state.idx=i>=0 ? i : 0;
}
function setCurrentId(id){
  const i=state.list.findIndex(x=>x.id===id);
  if(i>=0) state.idx=i;
}
function current(){ return state.list[state.idx]||null; }
function playLen(){ return state.list.length; }

/* ───────── 声音 A 音频（和 generate_audio.py 同一套哈希） ───────── */
function canonicalAudioText(text){
  let value=String(text||"");
  try{ value=value.normalize("NFC"); }catch(e){}
  value=value.replace(/\*/g,"").replace(/`/g,"");
  const han=/[㐀-䶿一-鿿豈-﫿]/;
  if(han.test(value)){
    value=value.replace(/[㐀-䶿一-鿿豈-﫿]/g," ");
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
/* 与 generate_audio.py 的 PRON_OVERRIDES 必须列出同样的键（见 app-h17.js 同名常量）。 */
const PRON_OVERRIDE_TEXTS=new Set(["wind down"]);
async function audioPathForEn(en){
  const canonical=canonicalAudioText(en);
  let raw=AUDIO_PROFILE+"\n"+canonical;
  if(PRON_OVERRIDE_TEXTS.has(canonical)) raw+="\npron";
  const digest=await sha256Hex(raw);
  return AUDIO_BASE+digest.slice(0,2)+"/"+digest+".mp3";
}
function audioWindowEns(){
  const out=[];
  const from=Math.max(0,state.idx-AUDIO_WINDOW_BEHIND);
  const to=Math.min(state.list.length-1,state.idx+AUDIO_WINDOW_AHEAD);
  for(let i=from;i<=to;i++){
    const en=state.list[i]&&state.list[i].en;
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
function markPlaybackHealthy(){ clearLoopRecovery(true); }
function stopVoiceAudio(reset){
  clearVoiceRecovery(true);
  if(!_voiceAudio) return;
  try{
    _voiceAudio.onended=null; _voiceAudio.onerror=null; _voiceAudio.onpause=null;
    _voiceAudio.onplaying=null; _voiceAudio.ontimeupdate=null; _voiceAudio.onwaiting=null; _voiceAudio.onstalled=null;
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
  toast("声音 A "+(reason||"暂不可用")+"，这条先用系统发音",true);
}

/* ───────── 系统备用朗读 ───────── */
const BAD_VOICE=/albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/;
const US_YOUNG_FEMALE=["ava","samantha","allison","susan","zoe","nicky","joelle","evan"];
function isUs(v){ return /en(-|_)US/i.test(v.lang||""); }
function isEn(v){ return /^en/i.test(v.lang||""); }
function voiceScore(v){
  const n=(v.name||"").toLowerCase();
  if(BAD_VOICE.test(n)) return -9999;
  let s=0;
  if(/premium/.test(n)) s+=1000;
  else if(/enhanced|compact|neural|natural/.test(n)) s+=700;
  if(/google/.test(n)) s+=450;
  const i=US_YOUNG_FEMALE.findIndex(f=>n.includes(f));
  if(i>=0) s+=400-i*12;
  if(isUs(v)) s+=120; else if(isEn(v)) s+=20;
  return s;
}
function pickVoice(){
  const list=(voices||[]).filter(v=>isEn(v)&&voiceScore(v)>-1000).sort((a,b)=>voiceScore(b)-voiceScore(a));
  return list[0]||(voices||[]).find(isEn)||null;
}
function loadVoices(){ voices=window.speechSynthesis ? (speechSynthesis.getVoices()||[]) : []; }
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

/* ───────── 保活 / 媒体会话（锁屏、耳机键） ───────── */
async function acquireWakeLock(){
  try{
    if(!("wakeLock" in navigator) || wakeLock) return;
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
  speechKeepAlive=setInterval(()=>{
    if(userWantsPlay){ try{ if(speechSynthesis.paused) speechSynthesis.resume(); }catch(e){} }
    // 只在真正朗读时维持媒体会话；暂停/播完必须让出系统音频给其他 App。
    if(userWantsPlay || loopPlaying){
      nudgeMediaAudio();
      setupMediaSession(true);
      updateMediaSession();
    }
  }, 2500);
  wakeKeepAlive=setInterval(()=>{
    if(userWantsPlay && document.visibilityState==="visible") acquireWakeLock();
  }, 15000);
}
function stopKeepAlives(){
  if(speechKeepAlive){ clearInterval(speechKeepAlive); speechKeepAlive=null; }
  if(wakeKeepAlive){ clearInterval(wakeKeepAlive); wakeKeepAlive=null; }
}
function ensureMediaAudio(){
  if(_mediaAudio) return _mediaAudio;
  const a=document.createElement("audio");
  a.id="mediaKeeper";
  a.setAttribute("playsinline","");
  a.setAttribute("webkit-playsinline","");
  a.preload="auto";
  a.style.display="none";
  a.loop=true;
  a.muted=false;          // muted=true 时 iOS 不会进锁屏/耳机媒体会话
  a.volume=0.12;
  a.src=SILENCE_SRC;
  try{ a.load(); }catch(e){}
  document.body.appendChild(a);
  // 取下耳机 / 系统打断会 pause；只有正在朗读时才续上。
  a.addEventListener("pause", ()=>{
    if(!userWantsPlay && !loopPlaying) return;
    setTimeout(()=>{
      if(!userWantsPlay && !loopPlaying) return;
      nudgeMediaAudio();
      setupMediaSession(true);
      updateMediaSession();
    }, 400);
  });
  _mediaAudio=a;
  return a;
}
function yieldMediaKeeperToVoice(){
  try{ if(_mediaAudio&&!_mediaAudio.paused) _mediaAudio.pause(); }catch(e){}
}
function nudgeMediaAudio(){
  try{
    // 声音 A 一次连续循环会话由真正的播放器持有音频通道；不要反复切到静音轨。
    if(_activeVoiceEn && userWantsPlay && loopPlaying) return;
    const a=ensureMediaAudio();
    if(a.paused){
      const p=a.play();
      if(p&&p.catch) p.catch(()=>{});
    }
  }catch(e){}
}
function startMediaAudio(){
  try{
    _mediaHold=true;
    const a=ensureMediaAudio();
    const p=a.play();
    if(p&&p.then) p.then(()=>{ setupMediaSession(true); updateMediaSession(); }).catch(()=>{});
  }catch(e){}
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
  const title=(s&&s.en)||"收藏听";
  const len=playLen();
  try{
    navigator.mediaSession.metadata=new MediaMetadata({
      title: title.length>80 ? title.slice(0,77)+"…" : title,
      artist: "收藏听",
      album: len ? ((state.idx+1)+" / "+len) : "收藏听",
    });
    navigator.mediaSession.playbackState=(loopPlaying||userWantsPlay) ? "playing" : "paused";
  }catch(e){}
}
function setupMediaSession(force){
  if(!("mediaSession" in navigator)) return;
  if(_mediaSessionBound && !force) return;
  _mediaSessionBound=true;
  const bind=(action, fn)=>{ try{ navigator.mediaSession.setActionHandler(action, fn); }catch(e){} };
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
  bind("pause", ()=>onRemotePauseOrToggle());
  bind("stop", ()=>stopLoop());
}

/* ───────── 播放控制 ───────── */
function stopLoop(opts){
  const keepWant=!!(opts&&opts.keepWant);
  const soft=!!(opts&&opts.soft);
  if(soft && !keepWant){ pausePlayback(!!(opts&&opts.fromRemote)); return; }
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
/* 在后台被别的应用（TikTok / 抖音 / 电话）打断：不跟它抢声音，停干净，回到前台再接着播。
   以前这里会在后台无限重试（每 8 秒一次），按钮一直显示「暂停」，回来也不出声。 */
function interruptForReturn(){
  pausePlayback(false);
  _resumeOnReturn=true;
  updatePlayUI();
}
/* 回到前台：用户没按过暂停、但现在没在出声，就从当前这一条接着播。
   连看 1 秒，currentTime 动过就说明在正常播，不打断。 */
function resumeIfSilent(){
  if(!(_resumeOnReturn||userWantsPlay)) return;
  // 连看 1 秒（每 0.1 秒一次）：两遍之间有 0.4 秒空档，只看一眼会把正常播放误判成没声音
  let heard=false, last=_voiceAudio ? _voiceAudio.currentTime : -1, ticks=0;
  const timer=setInterval(()=>{
    const a=_voiceAudio;
    if(a && !a.paused && a.currentTime!==last) heard=true;
    if(window.speechSynthesis && speechSynthesis.speaking) heard=true;
    last=a ? a.currentTime : -1;
    if(++ticks<10 && !heard) return;
    clearInterval(timer);
    if(heard || document.visibilityState!=="visible") return;
    if(!(_resumeOnReturn||userWantsPlay)) return;   // 这期间用户点了暂停
    _resumeOnReturn=false;
    toast("接着播");
    startLoop(playRateNow||1);
  }, 100);
}
function pausePlayback(fromRemote){
  _resumeOnReturn=false;
  _voiceStalled=false;
  loopToken++;
  clearLoopRecovery(true);
  loopPlaying=false;
  loopCount=0;
  userWantsPlay=false;
  releaseWakeLock();
  stopVoiceAudio(false);
  try{ speechSynthesis.cancel(); }catch(e){}
  _mediaHold=true;
  // 暂停/播完后不能留静音轨在后台，否则 iOS 会把其他 App（抖音 / TikTok）的视频暂停。
  stopKeepAlives();
  stopMediaAudio();
  setupMediaSession(true);
  updatePlayUI();
  try{ if("mediaSession" in navigator) navigator.mediaSession.playbackState="paused"; }catch(e){}
  if(fromRemote) toast("耳机 · 暂停");
}
function isSoftPaused(){ return !!(_mediaHold && !loopPlaying && !userWantsPlay); }
function resumeFromRemote(){
  toast("耳机 · 播放");
  _mediaHold=true;
  try{ ensureMediaAudio().play(); }catch(e){}
  setupMediaSession(true);
  if(!loopPlaying) startLoop(playRateNow||1);
  updateMediaSession();
}
function onRemotePauseOrToggle(){
  const now=Date.now();
  if(now-_remoteToggleAt<450) return;
  _remoteToggleAt=now;
  if(isSoftPaused()) resumeFromRemote();
  else pausePlayback(true);
}
function afterMove(wasPlaying, rate){
  savePrefs();
  updateMediaSession();
  if(wasPlaying) startLoop(rate);
  else{
    stopVoiceAudio(true);
    try{ speechSynthesis.cancel(); }catch(e){}
    render();
    updateMediaSession();
  }
}
function goPrev(fromRemote){
  const wasPlaying=loopPlaying||userWantsPlay;
  const rate=playRateNow||1;
  if(state.idx>0) state.idx--;
  else if(playLen()>1){ state.idx=playLen()-1; toast("已回到最后一条"); }
  else if(fromRemote){ toast("已经是第一条"); return; }
  if(fromRemote) toast("耳机 · 上一个");
  afterMove(wasPlaying, rate);
}
function goNext(fromRemote){
  const wasPlaying=loopPlaying||userWantsPlay;
  const rate=playRateNow||1;
  if(state.order==="random"){
    // 随机：去下一条这一轮还没出现过的；全出现过了才重洗（只有这一处会重洗）
    const cur=current();
    const res=Round.step(state.round, passId, cur&&cur.id);
    if(res.renewed){
      rebuildList(res.id);
      toast("这一轮都听过了 · 重新打乱，开始新一轮");
    }else setCurrentId(res.id);
  }
  else if(state.idx<playLen()-1) state.idx++;
  else if(playLen()>1){ state.idx=0; toast("已过完一轮 · 回到第一条"); }
  else if(fromRemote){ toast("已经是最后一条"); return; }
  if(fromRemote) toast("耳机 · 下一个");
  afterMove(wasPlaying, rate);
}
function goTo(id){
  const wasPlaying=loopPlaying||userWantsPlay;
  const i=state.list.findIndex(x=>x.id===id);
  if(i<0) return;
  state.idx=i;
  afterMove(wasPlaying, playRateNow||1);
}

function startLoop(rate, opts){
  const recovering=!!(opts&&opts.recovering);
  _resumeOnReturn=false;
  _voiceStalled=false;
  clearLoopRecovery(!recovering);
  const s0=current();
  if(!s0||!s0.en){ toast("没有可以播放的内容", true); return; }
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
    notifySystemFallback(text, slot&&slot.status==="loading" ? "还在加载" : "还没生成或网络失败");
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
  _runningLoop=lim;
  const playRate=rate ?? playRateNow ?? 1;
  playRateNow=playRate;
  acquireWakeLock();
  startKeepAlives();
  savePrefs();
  updateMediaSession();

  const finishOrNext=()=>{
    if(token!==loopToken) return;
    loopPlaying=false;
    // 自动播下一条：随机模式找这一轮还没出现过的；没有了就停，不自动重洗
    let nextId=null;
    if(lim>0){
      if(state.order==="random"){
        Round.arrive(state.round, s0.id);
        nextId=Round.next(state.round, passId, s0.id);
      }else if(state.idx < playLen()-1) nextId=state.list[state.idx+1].id;
    }
    if(nextId){
      updatePlayUI();
      setTimeout(()=>{
        if(token!==loopToken) return;
        setCurrentId(nextId);
        savePrefs();
        render();
        startLoop(playRate);
      }, 350);
      return;
    }
    // 播完后记住当前这条，但停掉全部音频，让出系统音频通道。
    pausePlayback(false);
    if(lim>0) $("status").textContent = state.order==="random"
      ? "这一轮都听过了 · 点「下一个」开始新一轮"
      : "已过完一轮 · 点「下一个」从头再来";
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
    if(userWantsPlay && document.hidden){ interruptForReturn(); return; }
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
      updatePlayUI();   // 等计时器设上再刷新，按钮才会如实显示「播放」
      return;
    }
    toast(message||"朗读失败，请重试",true);
  };
  const playSystemOnce=isFirst=>{
    if(!window.speechSynthesis){ failPlayback("声音 A 播放失败，且当前浏览器没有备用朗读"); return; }
    const u=new SpeechSynthesisUtterance(text);
    const v=pickVoice();
    if(v){ u.voice=v; u.lang=v.lang||"en-US"; } else { u.lang="en-US"; }
    u.rate=playRate; u.pitch=1; u.volume=1;
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
      // 在后台重试不回来，多半是别的应用占了声音：不换系统朗读跟它抢，回到前台再接着播
      if(document.hidden){ interruptForReturn(); return; }
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
        // iOS 息屏时可能少发 timeupdate；直接读 currentTime，避免把正常播放误判为卡住。
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
      if(!_voiceStalled){ _voiceStalled=true; updatePlayUI(); }
      if(a.paused) nudgeMediaAudio();
      if(_voiceWatchdogTimer){ clearTimeout(_voiceWatchdogTimer); _voiceWatchdogTimer=null; }
      const delay=Math.min(VOICE_RETRY_MAX_MS,VOICE_RETRY_BASE_MS*Math.pow(2,Math.min(resumeTries,4)));
      _voiceRetryTimer=setTimeout(()=>{
        _voiceRetryTimer=null;
        if(!isActive()){ resumePending=false; return; }
        resumeTries++;
        try{
          if(restart&&resumeTries>=3){
            // 解码器连续无进度时重新挂载本地 Blob；只重播当前这条，不联网。
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
            if(_voiceStalled){ _voiceStalled=false; updatePlayUI(); }
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
        if(_voiceStalled){ _voiceStalled=false; updatePlayUI(); }
        lastTime=a.currentTime||0;
        lastProgressAt=Date.now();
        markPlaybackHealthy();
        armWatchdog();
      };
      a.ontimeupdate=()=>{ if(isActive()) recordCurrentProgress(); };
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
  const playOnce=isFirst=>{
    if(token!==loopToken) return;
    if(lim>0 && loopCount>=lim){ finishOrNext(); return; }
    loopCount++;
    updatePlayUI();
    if(useFixedAudio) playVoiceAOnce();
    else playSystemOnce(isFirst);
  };
  // 第一遍在点击调用栈内启动；之后 1/2/3/5/∞ 都复用同一个 Blob，不再联网。
  playOnce(true);
  render();
}

/* ───────── 界面 ───────── */
let _toastTimer=null;
function toast(msg, warn){
  const t=$("toast");
  if(!t) return;
  t.textContent=msg;
  t.classList.toggle("warn",!!warn);
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove("show"), warn?3200:1800);
}
/* 真的在出声（或者在两遍之间那 0.4 秒空档）才算「在播」。
   声音被系统停了还在重试时，按钮显示「播放」：点一下就是用户手势，iOS 一定放行。 */
function isAudible(){
  // 两条之间那 0.35 秒 loopPlaying 是 false，但用户要播、也没在重试，照样算在播
  return userWantsPlay && !_voiceStalled && !_loopRecoveryTimer;
}
function updatePlayUI(){
  const active=isAudible();
  const lim=active ? _runningLoop : state.loop;
  $("status").textContent = active
    ? (lim>0 ? `第 ${loopCount}/${lim} 遍` : `第 ${loopCount} 遍 · ∞`)
    : _resumeOnReturn ? "被别的应用打断了 · 回到这里会接着播"
    : userWantsPlay ? "声音被打断了，正在恢复… 等不及就点「播放」"
    : "";
  $("playBtn").textContent = active ? "暂停" : "播放";
  $("playBtn").classList.toggle("is-playing", !!active);
  document.querySelectorAll("#loopSeg button").forEach(b=>b.classList.toggle("on", +b.dataset.loop===state.loop));
  document.querySelectorAll("#filterSeg button").forEach(b=>b.classList.toggle("on", b.dataset.f===state.filter));
  document.querySelectorAll("#orderSeg button").forEach(b=>b.classList.toggle("on", b.dataset.o===state.order));
  // 随机模式没有「从头」：回到这一轮开头会让前面几条反复出现、后面的一直轮不到
  $("firstBtn").style.display = state.order==="random" ? "none" : "";
  updateMediaSession();
}
function render(){
  const total=state.items.length;
  const words=state.items.filter(x=>x.kind!=="sentence").length;
  $("counts").textContent = total ? `${total} 条 · 单词 ${words} · 句子 ${total-words}` : "";
  const s=current();
  if(!s){
    $("en").textContent = !total ? "还没有收藏"
      : state.order==="dunno" ? "还没有点过「不会」的" : "这个筛选下没有内容";
    ["kind","pos","ipa","cn"].forEach(id=>{ $(id).textContent=""; });
    $("noteBtn").style.visibility="hidden";
    $("dunnoBtn").style.visibility="hidden";
    updatePlayUI();
    return;
  }
  $("noteBtn").style.visibility = s.note ? "visible" : "hidden";
  renderDunno(s);
  $("kind").textContent=KIND_LABEL[s.kind]||"";
  if(state.order==="random"){
    // 成为当前这一条 = 这一轮出现过了；马上存，免得关掉重开又算没出现
    if(Round.arrive(state.round, s.id)) savePrefs();
    $("pos").textContent=`这一轮 ${playLen()-Round.left(state.round, passId)} / ${playLen()}`;
  }else{
    $("pos").textContent=`${state.idx+1} / ${playLen()}`;
  }
  $("en").textContent=s.en;
  $("en").classList.toggle("short", s.en.length<=18);
  $("ipa").textContent = s.kind!=="sentence" && s.ipa ? s.ipa : "";
  $("cn").textContent=s.cn||"";
  refreshAudioWindow();
  updatePlayUI();
}
function renderDunno(s){
  const b=$("dunnoBtn"), n=dunnoCount(s.id);
  b.style.visibility="visible";
  b.textContent = n ? `不会 ×${n}` : "不会";
  b.classList.toggle("marked", n>0);
}

/* 豆包解析是 Markdown：先整体转义，再按行认标题 / 列表 / 引用 / 表格，最后处理行内粗体。 */
function inlineMd(s){
  return s.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*/g,"");
}
function renderNote(md){
  const lines=String(md||"").split("\n");
  const out=[];
  let table=null;
  const flushTable=()=>{
    if(!table) return;
    const rows=table.filter(r=>!/^\s*\|?\s*:?-{2,}/.test(r));
    out.push("<table>"+rows.map((r,i)=>{
      const cells=r.trim().replace(/^\||\|$/g,"").split("|");
      const tag=i===0?"th":"td";
      return "<tr>"+cells.map(c=>`<${tag}>${inlineMd(esc(c.trim()))}</${tag}>`).join("")+"</tr>";
    }).join("")+"</table>");
    table=null;
  };
  for(const raw of lines){
    const line=raw.replace(/\s+$/,"");
    if(/^\s*\|.*\|\s*$/.test(line)){ (table=table||[]).push(line); continue; }
    flushTable();
    const t=line.trim();
    if(!t){ out.push('<div class="gap"></div>'); continue; }
    if(/^-{3,}$/.test(t)){ out.push("<hr>"); continue; }
    let m;
    if((m=t.match(/^(#{1,6})\s*(.*)$/))){
      out.push(`<div class="h${m[1].length<=2?" h1":""}">${inlineMd(esc(m[2]))}</div>`); continue;
    }
    if((m=t.match(/^>\s?(.*)$/))){ out.push(`<div class="q">${inlineMd(esc(m[1]))}</div>`); continue; }
    if((m=t.match(/^[-*•]\s+(.*)$/))){ out.push(`<div class="li">${inlineMd(esc(m[1]))}</div>`); continue; }
    out.push(`<div class="p">${inlineMd(esc(t))}</div>`);
  }
  flushTable();
  return out.join("").replace(/(<div class="gap"><\/div>)+/g,'<div class="gap"></div>');
}
function lockBody(on){ document.body.classList.toggle("locked", !!on); }
function openNote(){
  const s=current();
  if(!s) return;
  $("nEn").textContent=s.en;
  $("nIpa").textContent=s.ipa||"";
  $("nCn").textContent=s.cn||"";
  $("nBody").innerHTML=renderNote(s.note);
  $("noteSheet").classList.add("open");
  $("noteSheet").querySelector(".panel-body").scrollTop=0;
  lockBody(true);
}
function renderList(){
  const q=($("search").value||"").trim().toLowerCase();
  const cur=current();
  const rows=state.list.map((it,i)=>({it,i})).filter(({it})=>
    !q || it.en.toLowerCase().includes(q) || (it.cn||"").toLowerCase().includes(q));
  $("lTitle").textContent = q ? `找到 ${rows.length} 条` : `当前顺序 · ${state.list.length} 条`;
  $("items").innerHTML = rows.map(({it,i})=>`
    <li data-id="${esc(it.id)}" class="${cur&&cur.id===it.id?"cur":""}">
      <span class="n">${i+1}</span>
      <div class="b"><div class="e">${esc(it.en)}</div>${it.cn?`<div class="c">${esc(it.cn)}</div>`:""}</div>
      <span class="k">${KIND_LABEL[it.kind]||""}</span>
    </li>`).join("") || `<li><div class="b"><div class="c">没有匹配的</div></div></li>`;
}
function openList(){
  $("search").value="";
  renderList();
  $("listSheet").classList.add("open");
  lockBody(true);
  const cur=$("items").querySelector("li.cur");
  if(cur) cur.scrollIntoView({block:"center"});
}
function closeSheet(id){
  $(id).classList.remove("open");
  if(!document.querySelector(".sheet.open")) lockBody(false);
}

function bindUi(){
  // iOS 只认点击调用栈里同步开始的播放：播放键必须同步调 startLoop。
  $("playBtn").addEventListener("click", ev=>{
    ev.preventDefault();
    if(isAudible()) stopLoop({soft:true});
    else startLoop(1);
  });
  $("slowBtn").addEventListener("click", ev=>{
    ev.preventDefault();
    if(loopPlaying) stopLoop({soft:true});
    startLoop(0.7);
  });
  $("prevBtn").addEventListener("click", ()=>goPrev(false));
  $("nextBtn").addEventListener("click", ()=>goNext(false));
  $("firstBtn").addEventListener("click", ()=>{
    if(state.order==="random") return;   // 随机模式下按钮是藏起来的，这里再挡一道
    const wasPlaying=loopPlaying||userWantsPlay;
    state.idx=0;
    afterMove(wasPlaying, playRateNow||1);
  });
  // 「不会」只记次数，不打断播放、不换位置
  $("dunnoBtn").addEventListener("click", ()=>{
    const s=current();
    if(!s) return;
    state.dunno[s.id]=dunnoCount(s.id)+1;
    try{ localStorage.setItem(DUNNO_KEY, JSON.stringify(state.dunno)); }catch(e){}
    renderDunno(s);
    toast(`记了一次不会 · 共 ${state.dunno[s.id]} 次`);
  });
  $("noteBtn").addEventListener("click", openNote);
  $("listBtn").addEventListener("click", openList);
  $("search").addEventListener("input", renderList);
  $("items").addEventListener("click", ev=>{
    const li=ev.target.closest("li[data-id]");
    if(!li) return;
    closeSheet("listSheet");
    goTo(li.dataset.id);
  });
  document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click", ()=>closeSheet(el.dataset.close)));
  $("filterSeg").addEventListener("click", ev=>{
    const b=ev.target.closest("button[data-f]");
    if(!b||b.dataset.f===state.filter) return;
    const keep=current()&&current().id;
    state.filter=b.dataset.f;
    rebuildList(keep);
    afterMove(loopPlaying||userWantsPlay, playRateNow||1);
  });
  $("orderSeg").addEventListener("click", ev=>{
    const b=ev.target.closest("button[data-o]");
    if(!b||b.dataset.o===state.order) return;   // 再点一次「随机」不重洗
    savePrefs();                                // 先记下当前顺序里的位置
    state.order=b.dataset.o;
    rebuildList(state.curIds[state.order]);
    afterMove(loopPlaying||userWantsPlay, playRateNow||1);
  });
  $("loopSeg").addEventListener("click", ev=>{
    const b=ev.target.closest("button[data-loop]");
    if(!b) return;
    state.loop=+b.dataset.loop;
    savePrefs();
    updatePlayUI();
  });
  if(window.speechSynthesis){
    loadVoices();
    try{ speechSynthesis.onvoiceschanged=loadVoices; }catch(e){}
  }
  document.addEventListener("visibilitychange", ()=>{
    if(document.visibilityState!=="visible") return;
    refreshAudioWindow({retryErrors:true});
    resumeIfSilent();
  });
}

function renderFoot(fromCache){
  let when="";
  if(state.updatedAt){
    const d=new Date(state.updatedAt);
    if(!isNaN(d)) when=`${d.getMonth()+1}月${d.getDate()}日更新`;
  }
  $("foot").innerHTML=`${when}${fromCache?" · 离线缓存":""}<br>版本 ${esc(APP_BUILD)}`;
}
async function checkVersion(){
  try{
    const r=await fetch("version.json?ts="+Date.now(),{cache:"no-store"});
    if(!r.ok) return;
    const j=await r.json();
    if(j&&j.build&&j.build!==APP_BUILD){
      $("bannerSlot").innerHTML=`<div class="banner" id="newBuild">有新版本，点这里更新</div>`;
      $("newBuild").addEventListener("click", ()=>{ location.replace(location.pathname+"?v="+encodeURIComponent(j.build)); });
    }
  }catch(e){}
}

async function boot(){
  buildShell();
  window.__appBooted=true;
  loadPrefs();
  bindUi();
  const {pack, cached}=await fetchPack();
  if(!pack){
    $("app").querySelector(".wrap").innerHTML=`<div class="empty">收藏还没加载出来<br>连上网络后关掉重开</div>`;
    return;
  }
  applyPack(pack);
  rebuildList(state.curIds[state.order]);
  savePrefs();
  render();
  renderFoot(cached);
  setupMediaSession();
  checkVersion();
}
boot();
})();
