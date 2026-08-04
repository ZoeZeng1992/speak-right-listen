(function(){
  // stub so cached index.html onload won't flash false "旧页面" while real app loads
  if(!window.srRefresh) window.srRefresh=function(){ return false; };
  var s=document.createElement("script");
  s.src="app-h13.js?t="+Date.now();
  s.async=false;
  document.head.appendChild(s);
})();
