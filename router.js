/**
 * ViaDecide SPA Router — v2
 * Implements: navigate, go, openOverlay, prefetch, resolve, on/emit, routes, init
 * All methods previously called by index.html but never implemented are now live.
 */
const AppRouter = (function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────
     1. ROUTE MAP  (clean URL → file)
  ───────────────────────────────────────────────────────────────── */
  const ROUTES = {
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
    '/why-small-businesses-dont-need-saas': '/why-small-businesses-dont-need-saas/index.html',
  };

  /* ─────────────────────────────────────────────────────────────────
     2. ROUTE METADATA  (slug → {icon, name})
     Used by go() to auto-populate the modal header.
  ───────────────────────────────────────────────────────────────── */
  const META = {
    '404':                                { icon: 'warning',  name: 'Page Not Found' },
    'AshokVerma':                         { icon: 'person',   name: 'Ashok Verma - 1:1 Sessions' },
    'CustomSwipeEngineForm':              { icon: 'form',     name: 'Custom Swipe Engine Form' },
    'engine-activation-request':          { icon: 'key',      name: 'Engine Activation Request' },
    'HexWars':                            { icon: 'game',     name: 'HexWars - ViaDecide Arena' },
    'HivaLand':                           { icon: 'tv',       name: 'ViaTV Game - Universal Remote' },
    'Jalaram-food-court-rajkot':          { icon: 'food',     name: 'Jalaram Food Court (Rajkot)' },
    'ONDC-demo':                          { icon: 'cart',     name: 'ONDC Live Demo' },
    'ondc-demo':                          { icon: 'cart',     name: 'ONDC Live Demo' },
    'StudyOS':                            { icon: 'study',    name: 'StudyOS - Swipe Daily Progress' },
    'SwipeOS':                            { icon: 'swipe',    name: 'Swipe OS - Decision Engine' },
    'the-decision-stack':                 { icon: 'stack',    name: 'The Decision Stack' },
    'ViaGuide':                           { icon: 'guide',    name: 'ViaGuide' },
    'Viadecide-blogs':                    { icon: 'blog',     name: 'Blog & Content' },
    'alchemist':                          { icon: 'alch',     name: 'Alchemist Quiz' },
    'app-generator':                      { icon: 'wrench',   name: 'App Generator' },
    'brief':                              { icon: 'brief',    name: 'Decision Brief' },
    'cashback-claim':                     { icon: 'cash',     name: 'Cashback Claim' },
    'cashback-rules':                     { icon: 'rules',    name: 'Cashback Rules' },
    'cohort-apply-here':                  { icon: 'cohort',   name: 'Cohort - Apply Here' },
    'contact':                            { icon: 'mail',     name: 'Contact Us' },
    'decide-foodrajkot':                  { icon: 'food',     name: 'Decide Food Rajkot' },
    'decide-service':                     { icon: 'service',  name: 'Decide Service' },
    'decision-brief-guide':               { icon: 'guide',    name: 'Decision Brief Guide' },
    'decision-brief':                     { icon: 'brain',    name: 'ViaDecide - Decision Architecture' },
    'decision-infrastructure-india':      { icon: 'india',    name: 'Why India Needs Decision Infrastructure' },
    'discounts':                          { icon: 'tag',      name: 'Discounts Are Not Strategy' },
    'engine-deals':                       { icon: 'deals',    name: 'Engine Deals' },
    'engine-license':                     { icon: 'license',  name: 'Engine License' },
    'finance-dashboard-msme':             { icon: 'finance',  name: 'FinTrack - Finance Dashboard' },
    'founder':                            { icon: 'founder',  name: 'Founder' },
    'indiaai-mission-2025':               { icon: 'ai',       name: 'IndiaAI Mission 2025' },
    'interview-prep':                     { icon: 'mic',      name: 'Interview Simulator' },
    'laptops-under-50000':                { icon: 'gift',     name: 'Gifts That Mean More' },
    'mars-rover-simulator-game':          { icon: 'mars',     name: 'Mars Survival Decision Lab' },
    'memory':                             { icon: 'memory',   name: 'Decision Memory' },
    'multi-source-research-explained':    { icon: 'research', name: 'Multi-Source Research Explained' },
    'ondc-for-bharat':                    { icon: 'ondc',     name: 'ONDC - Open Commerce for Every Indian' },
    'payment-register':                   { icon: 'payroll',  name: 'India Payroll Register' },
    'pricing':                            { icon: 'pricing',  name: 'Pricing Infrastructure' },
    'privacy':                            { icon: 'lock',     name: 'Privacy Policy' },
    'prompt-alchemy':                     { icon: 'prompt',   name: 'PromptAlchemy' },
    'sales-dashboard':                    { icon: 'chart',    name: 'MSME Sales Register' },
    'student-research':                   { icon: 'research', name: 'Decision Research' },
    'terms':                              { icon: 'doc',      name: 'Terms of Service' },
    'viadecide-decision-matrix':          { icon: 'matrix',   name: 'Decision Matrix' },
    'viadecide-opportunity-radar':        { icon: 'radar',    name: 'Opportunity Radar' },
    'viadecide-public-beta':              { icon: 'beta',     name: 'ViaDecide Public Beta' },
    'viadecide-reality-check':            { icon: 'check',    name: 'Reality Check Calculator' },
    'why-small-businesses-dont-need-saas':{ icon: 'insight',  name: "Why Small Businesses Don't Need SaaS" },
    'numberplate':                        { icon: 'plate',    name: 'Custom Numberplates' },
    'keychain':                           { icon: 'key',      name: 'NFC Keychains' },
    'gifts-that-mean-more':               { icon: 'gift',     name: 'Gifts That Mean More' },
  };

  /* ─────────────────────────────────────────────────────────────────
     3. EVENT EMITTER
  ───────────────────────────────────────────────────────────────── */
  const _handlers = {};

  function on(event, handler) {
    if (typeof handler !== 'function') return;
    (_handlers[event] = _handlers[event] || []).push(handler);
  }

  function emit(event, data) {
    (_handlers[event] || []).forEach(function(fn) {
      try { fn(data); } catch(e) { console.warn('[VDRouter] handler error:', e); }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     4. RESOLVE  slug → canonical file path
  ───────────────────────────────────────────────────────────────── */
  function resolve(slugOrPath) {
    if (!slugOrPath) return '/index.html';
    var clean = String(slugOrPath)
      .replace(/\.html?$/i, '')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '');
    var key = clean === '' ? '/' : '/' + clean;
    return ROUTES[key] || (key + '/index.html');
  }

  /* ─────────────────────────────────────────────────────────────────
     5. PREFETCH  — warms browser cache on hover / touchstart
  ───────────────────────────────────────────────────────────────── */
  var _prefetched = {};

  function prefetch(slugOrPath) {
    if (!slugOrPath) return;
    var file = resolve(slugOrPath);
    if (_prefetched[file]) return;
    _prefetched[file] = true;
    try {
      var link = document.createElement('link');
      link.rel  = 'prefetch';
      link.as   = 'document';
      link.href = file;
      document.head.appendChild(link);
    } catch(e) {}
  }

  /* ─────────────────────────────────────────────────────────────────
     6. OPEN OVERLAY
     Connects to the existing #modal / #modal-frame in index.html.
     Called by openModal() on the homepage (preferred code path).
  ───────────────────────────────────────────────────────────────── */
  function openOverlay(fileOrSlug, opts) {
    opts = opts || {};

    // Resolve to a file path
    var file = /\.html?$/i.test(String(fileOrSlug))
      ? fileOrSlug
      : resolve(fileOrSlug);

    // Derive slug for META lookup
    var slug = String(file)
      .replace(/^\/+/, '')
      .replace(/\/index\.html?$/i, '')
      .replace(/\.html?$/i, '');
    var meta = META[slug] || {};

    // Icon + name: META takes priority, then parse opts.title, then fallback
    var icon = meta.icon || '';
    var name = meta.name || '';

    // If opts.title was passed (e.g. "emoji Name") and no META, parse it
    if (opts.title && !meta.name) {
      name = String(opts.title);
      icon = '';
    } else if (opts.title && !icon) {
      // Extract leading emoji from opts.title as icon hint
      var tm = String(opts.title).match(/^([^\s\w]{1,4})\s*(.*)/);
      if (tm) { icon = tm[1]; name = tm[2] || meta.name || slug; }
    }

    // Final fallbacks
    if (!name) name = slug;
    if (!icon) icon = 'tool';

    // DOM elements
    var modal    = document.getElementById('modal');
    var frame    = document.getElementById('modal-frame');
    var mIcon    = document.getElementById('m-icon');
    var mName    = document.getElementById('m-name');
    var mTab     = document.getElementById('m-tab');
    var errLink  = document.getElementById('err-open-link');
    var modalErr = document.getElementById('modal-err');

    if (!modal || !frame) {
      window.location.href = file;
      return;
    }

    if (mIcon)    mIcon.textContent  = icon;
    if (mName)    mName.textContent  = name;
    if (mTab)     mTab.href          = file;
    if (errLink)  errLink.href       = file;
    if (modalErr) modalErr.classList.remove('show');

    frame.style.display = 'block';
    frame.src = '';
    setTimeout(function() { frame.src = file; }, 10);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    emit('overlayopen', { file: file, slug: slug, name: name });
  }

  /* ─────────────────────────────────────────────────────────────────
     7. GO  — primary public method called from onclick handlers
     go('contact', {overlay:true})  -> open in modal overlay
     go('alchemist')                -> SPA navigate
  ───────────────────────────────────────────────────────────────── */
  function go(slugOrPath, opts) {
    opts = opts || {};
    var slug = String(slugOrPath || '')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\.html?$/i, '');
    var path = '/' + slug;

    if (opts.overlay) {
      openOverlay(slug, opts);
      return;
    }

    // If route not registered → direct full-page navigate (e.g. printbydd-store sub-routes)
    if (!ROUTES[path]) {
      window.location.href = path;
      return;
    }

    navigate(path);
  }

  /* ─────────────────────────────────────────────────────────────────
     8. NAVIGATE  — SPA fetch-and-swap
  ───────────────────────────────────────────────────────────────── */
  var MOUNT = '#app';

  function navigate(path, isPopState) {
    if (!isPopState) {
      window.history.pushState({}, '', path);
    }

    var cleanPath = String(path).split('?')[0].replace(/\/$/, '');
    if (cleanPath === '') cleanPath = '/';

    if (/\.html?$/i.test(cleanPath)) {
      cleanPath = cleanPath.replace(/\.html?$/i, '');
      window.history.replaceState({}, '', cleanPath);
    }

    // 404 → restore from sessionStorage then home
    if (cleanPath === '/404') {
      try {
        var stored = sessionStorage.getItem('__vd_redirect__');
        if (stored) {
          sessionStorage.removeItem('__vd_redirect__');
          navigate(stored, true);
          return;
        }
      } catch(e) {}
      navigate('/', true);
      return;
    }

    var fileToFetch = ROUTES[cleanPath] || (cleanPath + '/index.html');

    fetch(fileToFetch).then(function(res) {
      if (!res.ok) throw new Error('Fetch failed ' + fileToFetch + ' (' + res.status + ')');
      return res.text();
    }).then(function(html) {
      var parser  = new DOMParser();
      var doc     = parser.parseFromString(html, 'text/html');
      var newApp  = doc.querySelector(MOUNT);
      var curApp  = document.querySelector(MOUNT);

      if (newApp && curApp) {
        // Inject new styles, skip already-present ones
        doc.querySelectorAll('link[rel="stylesheet"], style').forEach(function(node) {
          if (node.tagName === 'LINK') {
            var href = node.getAttribute('href');
            if (href && !document.querySelector('link[href="' + href + '"]')) {
              document.head.appendChild(node.cloneNode(true));
            }
          } else {
            document.head.appendChild(node.cloneNode(true));
          }
        });

        curApp.innerHTML = newApp.innerHTML;
        if (doc.title) document.title = doc.title;
        window.scrollTo(0, 0);
        _execScripts(curApp);
        emit('routechange', { path: cleanPath, file: fileToFetch });
      } else {
        // Target page has no #app mount — full page load
        window.location.assign(path);
      }
    }).catch(function(err) {
      console.error('[VDRouter] navigate error:', err);
      var m = document.querySelector(MOUNT);
      if (m) {
        m.innerHTML = [
          '<div style="padding:5rem 2rem;font-family:Outfit,sans-serif;text-align:center;color:#f0ede6">',
          '<h2 style="font-family:Cormorant Garamond,serif;font-size:3rem;font-weight:300;margin-bottom:1rem">Page not found</h2>',
          '<p style="color:#8a8fa8;margin-bottom:2rem">The route <code style="color:#22b4a0;background:rgba(34,180,160,.1);padding:.2rem .5rem;border-radius:4px">',
          cleanPath,
          '</code> doesn\'t exist.</p>',
          '<a href="/" style="color:#22b4a0;font-weight:600;font-size:.9rem">← Back to Home</a>',
          '</div>',
        ].join('');
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     9. SCRIPT EXECUTION ENGINE
     Re-create <script> nodes so browsers execute them after innerHTML swap
  ───────────────────────────────────────────────────────────────── */
  function _execScripts(container) {
    container.querySelectorAll('script').forEach(function(old) {
      var neo = document.createElement('script');
      Array.from(old.attributes).forEach(function(a) { neo.setAttribute(a.name, a.value); });
      neo.textContent = old.textContent;
      old.parentNode.replaceChild(neo, old);
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     10. BIND LINKS  — intercept same-origin <a> clicks
  ───────────────────────────────────────────────────────────────── */
  function bindLinks() {
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a');
      if (!a || !a.href) return;

      var url;
      try { url = new URL(a.href); } catch(err) { return; }

      if (url.origin !== window.location.origin) return;
      if (url.hash && url.pathname === window.location.pathname) return;
      if (/\.(pdf|png|jpg|jpeg|gif|svg|css|js|glb|stl|zip|mp4|webp|ico|woff2?)$/i.test(url.pathname)) return;
      if (/^(mailto|tel):/.test(a.href)) return;

      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     11. INIT
  ───────────────────────────────────────────────────────────────── */
  function init() {
    bindLinks();

    window.addEventListener('popstate', function() {
      navigate(window.location.pathname + window.location.search + window.location.hash, true);
    });

    // Restore 404 redirect target
    try {
      var stored = sessionStorage.getItem('__vd_redirect__');
      if (stored) {
        sessionStorage.removeItem('__vd_redirect__');
        navigate(stored, true);
        return;
      }
    } catch(e) {}

    // Handle direct URL load (user visits /pricing directly)
    var cleanInit = window.location.pathname.replace(/\/$/, '') || '/';
    if (cleanInit !== '/') {
      navigate(window.location.pathname + window.location.search + window.location.hash, true);
    }
  }

  /* ─────────────────────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────────────────── */
  return {
    init:        init,
    navigate:    navigate,
    go:          go,
    openOverlay: openOverlay,
    prefetch:    prefetch,
    resolve:     resolve,
    on:          on,
    bindLinks:   bindLinks,
    routes:      function() { return ROUTES; },
    meta:        function() { return META; },
  };
})();

window.VDRouter  = AppRouter;
window.AppRouter = AppRouter;

document.addEventListener('DOMContentLoaded', function() { AppRouter.init(); });
