(function(){
  if(!window.srRefresh) window.srRefresh=function(){ return false; };
  var s=document.createElement("script");
  s.src="app-h15.js?t="+Date.now();
  s.async=false;
  document.head.appendChild(s);
})();
