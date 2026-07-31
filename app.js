/* cache trampoline — do not put app logic here */
(function(){
  var s=document.createElement("script");
  s.src="app-h7.js?t="+Date.now();
  s.onerror=function(){
    var t=document.getElementById("toast");
    if(t){ t.textContent="更新脚本加载失败，请用 Safari 打开并重新添加到主屏幕"; t.className="toast err show"; }
  };
  document.head.appendChild(s);
})();
