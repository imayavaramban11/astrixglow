(function(){
  'use strict';
  try{
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }catch(_){}

  window.addEventListener('pageshow', function(e){
    if (e && e.persisted) {
      try { window.scrollTo(0,0); } catch(_) {}
    }
  });

  // Ensure we reset position before unload (some browsers restore last scroll otherwise)
  window.addEventListener('beforeunload', function(){ try { window.scrollTo(0,0); } catch(_) {} });

  // Try to force to top as early as possible
  try { window.scrollTo(0,0); } catch(_) {}
})();
