/**
 * ViaDecide Router v3 — clean, complete, tested
 * Exports: go, openOverlay, navigate, prefetch, resolve, on, routes, init, bindLinks
 */
window.VDRouter = window.AppRouter = (function () {
  'use strict';

  /* ── 1. ROUTES ────────────────────────────────────────────────── */
  var ROUTES = {
    '/':                                    '/index.html',
    '/404':                                 '/404/index.html',
    '/AshokVerma':                          '/AshokVerma/index.html',
    '/CustomSwipeEngineForm':               '/CustomSwipeEngineForm/index.html',
    '/engine-activation-request':           '/engine-activation-request/index.html',
    '/HexWars':                             '/HexWars/index.html',
    '/HivaLand':                            '/HivaLand/index.html',
    '/Jalaram-food-court-rajkot':           '/Jalaram-food-court-rajkot/index.html',
    '/ONDC-demo':                           '/ONDC-demo/index.html',
    '/ondc-demo':                           '/ONDC-demo/index.html',
    '/StudyOS':                             '/StudyOS/index.html',
    '/SwipeOS':                             '/SwipeOS/index.html',
    '/the-decision-stack':                  '/the-decision-stack/index.html',
    '/ViaGuide':                            '/ViaGuide/index.html',
    '/Viadecide-blogs':                     '/Viadecide-blogs/index.html',
    '/alchemist':                           '/alchemist/index.html',
    '/app-generator':                       '/app-generator/index.html',
    '/brief':                               '/brief/index.html',
    '/cashback-claim':                      '/cashback-claim/index.html',
    '/cashback-rules':                      '/cashback-rules/index.html',
    '/cohort-apply-here':                   '/cohort-apply-here/index.html',
    '/contact':                             '/contact/index.html',
    '/decide-foodrajkot':                   '/decide-foodrajkot/index.html',
    '/decide-service':                      '/decide-service/index.html',
    '/decision-brief-guide':                '/decision-brief-guide/index.html',
    '/decision-brief':                      '/decision-brief/index.html',
    '/decision-infrastructure-india':       '/decision-infrastructure-india/index.html',
    '/discounts':                           '/discounts/index.html',
    '/engine-deals':                        '/engine-deals/index.html',
    '/engine-license':                      '/engine-license/index.html',
    '/finance-dashboard-msme':              '/finance-dashboard-msme/index.html',
    '/founder':                             '/founder/index.html',
    '/indiaai-mission-2025':                '/indiaai-mission-2025/index.html',
    '/interview-prep':                      '/interview-prep/index.html',
    '/laptops-under-50000':                 '/laptops-under-50000/index.html',
    '/mars-rover-simulator-game':           '/mars-rover-simulator-game/index.html',
    '/memory':                              '/memory/index.html',
    '/multi-source-research-explained':     '/multi-source-research-explained/index.html',
    '/ondc-for-bharat':                     '/ondc-for-bharat/index.html',
    '/payment-register':                    '/payment-register/index.html',
    '/pricing':                             '/pricing/index.html',
    '/privacy':                             '/privacy/index.html',
    '/prompt-alchemy':                      '/prompt-alchemy/index.html',
    '/sales-dashboard':                     '/sales-dashboard/index.html',
    '/student-research':                    '/student-research/index.html',
    '/terms':                               '/terms/index.html',
    '/viadecide-decision-matrix':           '/viadecide-decision-matrix/index.html',
    '/viadecide-opportunity-radar':         '/viadecide-opportunity-radar/index.html',
    '/viadecide-public-beta':               '/viadecide-public-beta/index.html',
    '/viadecide-reality-check':             '/viadecide-reality-check/index.html',
    '/why-small-businesses-dont-need-saas': '/why-small-businesses-dont-need-saas/index.html'
  };

  /* ── 2. META (icon + name for modal header) ───────────────────── */
  var META = {
    '404':                                { icon: '⚠️',  name: 'Page Not Found' },
    'AshokVerma':                         { icon: '👤',  name: 'Ashok Verma • 1:1 Sessions' },
    'CustomSwipeEngineForm':              { icon: '📝',  name: 'Custom Swipe Engine Form' },
    'engine-activation-request':          { icon: '🔑',  name: 'Engine Activation Request' },
    'HexWars':                            { icon: '🎮',  name: 'HexWars — ViaDecide Arena' },
    'HivaLand':                           { icon: '📺',  name: 'ViaTV Game — Universal Remote' },
    'Jalaram-food-court-rajkot':          { icon: '🍽️', name: 'Jalaram Food Court (Rajkot)' },
    'ONDC-demo':                          { icon: '🛒',  name: 'ONDC Live Demo' },
    'ondc-demo':                          { icon: '🛒',  name: 'ONDC Live Demo' },
    'StudyOS':                            { icon: '📚',  name: 'StudyOS — Swipe Daily Progress' },
    'SwipeOS':                            { icon: '🔄',  name: 'Swipe OS — Decision Engine' },
    'the-decision-stack':                 { icon: '🧱',  name: 'The Decision Stack' },
    'ViaGuide':                           { icon: '🗺️', name: 'ViaGuide — PDF to Guided Steps' },
    'Viadecide-blogs':                    { icon: '✍️', name: 'Blog & Content' },
    'alchemist':                          { icon: '✨',  name: 'Alchemist Quiz' },
    'app-generator':                      { icon: '🔧',  name: 'App Generator' },
    'brief':                              { icon: '📋',  name: 'Decision Brief' },
    'cashback-claim':                     { icon: '💸',  name: 'Cashback Claim' },
    'cashback-rules':                     { icon: '📜',  name: 'Cashback Rules' },
    'cohort-apply-here':                  { icon: '🎓',  name: 'Cohort — Apply Here' },
    'contact':                            { icon: '📬',  name: 'Contact Us' },
    'decide-foodrajkot':                  { icon: '🍱',  name: 'Decide Food Rajkot' },
    'decide-service':                     { icon: '🎯',  name: 'Decide Service' },
    'decision-brief-guide':               { icon: '📋',  name: 'Decision Brief Guide' },
    'decision-brief':                     { icon: '🧠',  name: 'Decision Architecture' },
    'decision-infrastructure-india':      { icon: '🏗️', name: 'Why India Needs Decision Infrastructure' },
    'discounts':                          { icon: '🏷️', name: 'Discounts Are Not Strategy' },
    'engine-deals':                       { icon: '⚡',  name: 'Engine Deals' },
    'engine-license':                     { icon: '📄',  name: 'Engine License' },
    'finance-dashboard-msme':             { icon: '💰',  name: 'FinTrack — Finance Dashboard' },
    'founder':                            { icon: '👤',  name: 'Founder' },
    'indiaai-mission-2025':               { icon: '🇮🇳', name: 'IndiaAI Mission 2025' },
    'interview-prep':                     { icon: '🎤',  name: 'Interview Simulator' },
    'laptops-under-50000':                { icon: '🎁',  name: 'Gifts That Mean More' },
    'mars-rover-simulator-game':          { icon: '🚀',  name: 'Mars Survival Decision Lab' },
    'memory':                             { icon: '🧠',  name: 'Decision Memory' },
    'multi-source-research-explained':    { icon: '🔍',  name: 'Multi-Source Research Explained' },
    'ondc-for-bharat':                    { icon: '🛒',  name: 'ONDC — Open Commerce for Every Indian' },
    'payment-register':                   { icon: '👥',  name: 'India Payroll Register' },
    'pricing':                            { icon: '💲',  name: 'Pricing Infrastructure' },
    'privacy':                            { icon: '🔒',  name: 'Privacy Policy' },
    'prompt-alchemy':                     { icon: '⚗️', name: 'PromptAlchemy' },
    'sales-dashboard':                    { icon: '📊',  name: 'MSME Sales Register' },
    'student-research':                   { icon: '📖',  name: 'Decision Research' },
    'terms':                              { icon: '📜',  name: 'Terms of Service' },
    'viadecide-decision-matrix':          { icon: '⊞',   name: 'Decision Matrix' },
    'viadecide-opportunity-radar':        { icon: '📡',  name: 'Opportunity Radar' },
    'viadecide-public-beta':              { icon: '🚀',  name: 'ViaDecide Public Beta Is Live' },
    'viadecide-reality-check':            { icon: '✅',  name: 'Reality Check Calculator' },
    'why-small-businesses-dont-need-saas':{ icon: '💡',  name: "Why Small Businesses Don't Need SaaS" },
    'numberplate':                        { icon: '🚗',  name: 'Custom Numberplates' },
    'keychain':                           { icon: '🔑',  name: 'NFC Keychains' },
    'gifts-that-mean-more':               { icon: '🎁',  name: 'Gifts That Mean More' }
  };

  /* ── 3. EVENT EMITTER ─────────────────────────────────────────── */
  var _h = {};
  function on(ev, fn) { (_h[ev] = _h[ev] || []).push(fn); }
  function emit(ev, d) { (_h[ev] || []).forEach(function(fn){ try{fn(d);}catch(e){} }); }

  /* ── 4. RESOLVE slug → file path ──────────────────────────────── */
  function resolve(s) {
    var clean = String(s||'').replace(/\.html?$/i,'').replace(/^\/+/,'').replace(/\/+$/,'');
    var key = clean ? '/'+clean : '/';
    return ROUTES[key] || key+'/index.html';
  }

  /* ── 5. PREFETCH ─────────────────────────────────────────────── */
  var _pf = {};
  function prefetch(s) {
    var f = resolve(s);
    if (_pf[f]) return;
    _pf[f] = 1;
    try {
      var l = document.createElement('link');
      l.rel='prefetch'; l.as='document'; l.href=f;
      document.head.appendChild(l);
    } catch(e){}
  }

  /* ── 6. OPEN OVERLAY (modal) ──────────────────────────────────── */
  function openOverlay(fileOrSlug, opts) {
    opts = opts || {};

    // Normalise to a file path
    var file = /\.html?$/i.test(String(fileOrSlug))
      ? fileOrSlug
      : resolve(fileOrSlug);

    // Derive slug for META lookup
    var slug = String(file)
      .replace(/^\/+/,'')
      .replace(/\/index\.html?$/i,'')
      .replace(/\.html?$/i,'');

    var meta = META[slug] || {};

    // icon + name priority: META → parse opts.title → raw slug
    var icon = meta.icon || '';
    var name = meta.name || '';

    if (!name && opts.title) {
      // opts.title format from index.html: "🛒\u2009ONDC Live Demo"
      var t = String(opts.title).trim();
      // Split on first space/thin-space after emoji
      var m = t.match(/^([\S\u200A\u2009]+?)\s+([\s\S]+)$/);
      if (m) { icon = icon || m[1]; name = m[2]; }
      else   { name = t; }
    }

    if (!name) name = slug.replace(/-/g,' ');
    if (!icon) icon = '🔬';

    // Wire up DOM
    var modal = document.getElementById('modal');
    var frame = document.getElementById('modal-frame');
    if (!modal || !frame) { window.location.href = file; return; }

    var el = function(id){ return document.getElementById(id); };
    if (el('m-icon'))    el('m-icon').textContent  = icon;
    if (el('m-name'))    el('m-name').textContent  = name;
    if (el('m-tab'))     el('m-tab').href           = file;
    if (el('err-open-link')) el('err-open-link').href = file;
    if (el('modal-err')) el('modal-err').classList.remove('show');
    if (el('modal-loading')) el('modal-loading').classList.add('active');

    frame.style.display = 'block';
    frame.src = '';
    setTimeout(function(){ frame.src = file; }, 10);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    emit('overlayopen', { file:file, slug:slug, icon:icon, name:name });
  }

  /* ── 7. GO ───────────────────────────────────────────────────── */
  function go(slugOrPath, opts) {
    opts = opts || {};
    var slug = String(slugOrPath||'')
      .replace(/^\/+/,'').replace(/\/+$/,'').replace(/\.html?$/i,'');
    var path = '/'+slug;

    if (opts.overlay) { openOverlay(slug, opts); return; }
    if (!ROUTES[path]) { window.location.href = path; return; }
    navigate(path);
  }

  /* ── 8. NAVIGATE (SPA fetch → #app swap) ────────────────────── */
  function navigate(path, isPopState) {
    if (!isPopState) history.pushState({}, '', path);

    var clean = String(path).split('?')[0].replace(/\/$/,'') || '/';
    if (/\.html?$/i.test(clean)) {
      clean = clean.replace(/\.html?$/i,'');
      history.replaceState({}, '', clean);
    }

    // 404 page → restore sessionStorage redirect then go home
    if (clean === '/404') {
      try {
        var redir = sessionStorage.getItem('__vd_redirect__');
        if (redir) { sessionStorage.removeItem('__vd_redirect__'); navigate(redir, true); return; }
      } catch(e){}
      navigate('/', true);
      return;
    }

    var file = ROUTES[clean] || clean+'/index.html';

    fetch(file)
      .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
      .then(function(html){
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var newApp = doc.querySelector('#app');
        var curApp = document.querySelector('#app');

        if (newApp && curApp) {
          // Inject styles from fetched page (skip duplicates)
          doc.querySelectorAll('link[rel="stylesheet"],style').forEach(function(n){
            if (n.tagName==='LINK') {
              var h = n.getAttribute('href');
              if (h && !document.querySelector('link[href="'+h+'"]'))
                document.head.appendChild(n.cloneNode(true));
            } else {
              document.head.appendChild(n.cloneNode(true));
            }
          });
          curApp.innerHTML = newApp.innerHTML;
          if (doc.title) document.title = doc.title;
          window.scrollTo(0,0);
          execScripts(curApp);
          emit('routechange', { path:clean, file:file });
        } else {
          // Page has no #app — full reload
          window.location.assign(path);
        }
      })
      .catch(function(e){
        console.error('[VDRouter] navigate failed:', e);
        var app = document.querySelector('#app');
        if (app) app.innerHTML =
          '<div style="padding:5rem 2rem;text-align:center;font-family:Outfit,sans-serif">'
          +'<h2 style="font-family:Cormorant Garamond,serif;font-size:3rem;font-weight:300;color:#f0ede6;margin-bottom:1rem">Page not found</h2>'
          +'<p style="color:#8a8fa8;margin-bottom:2rem"><code style="color:#22b4a0;background:rgba(34,180,160,.1);padding:.2rem .6rem">'+clean+'</code></p>'
          +'<a href="/" style="color:#22b4a0;font-weight:600">← Home</a></div>';
      });
  }

  /* ── 9. EXEC SCRIPTS after innerHTML swap ────────────────────── */
  function execScripts(container) {
    container.querySelectorAll('script').forEach(function(old){
      var neo = document.createElement('script');
      Array.from(old.attributes).forEach(function(a){ neo.setAttribute(a.name,a.value); });
      neo.textContent = old.textContent;
      old.parentNode.replaceChild(neo, old);
    });
  }

  /* ── 10. BIND LINKS ──────────────────────────────────────────── */
  function bindLinks() {
    document.addEventListener('click', function(e){
      var a = e.target.closest('a');
      if (!a || !a.href) return;
      var url; try { url = new URL(a.href); } catch(ex){ return; }
      if (url.origin !== location.origin) return;
      if (url.hash && url.pathname === location.pathname) return;
      if (/\.(pdf|png|jpg|jpeg|gif|svg|css|js|glb|stl|zip|mp4|webp|ico|woff2?)$/i.test(url.pathname)) return;
      if (/^(mailto|tel):/.test(a.href)) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    });
  }

  /* ── 11. INIT ─────────────────────────────────────────────────── */
  function init() {
    bindLinks();
    window.addEventListener('popstate', function(){
      navigate(location.pathname + location.search + location.hash, true);
    });
    // Restore 404 redirect
    try {
      var r = sessionStorage.getItem('__vd_redirect__');
      if (r) { sessionStorage.removeItem('__vd_redirect__'); navigate(r, true); return; }
    } catch(e){}
    // Handle direct URL visit (e.g. user visits /pricing)
    var p = location.pathname.replace(/\/$/,'') || '/';
    if (p !== '/') navigate(location.pathname + location.search + location.hash, true);
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    go: go,
    navigate: navigate,
    openOverlay: openOverlay,
    prefetch: prefetch,
    resolve: resolve,
    on: on,
    bindLinks: bindLinks,
    routes: function(){ return ROUTES; },
    meta: function(){ return META; }
  };
})();
