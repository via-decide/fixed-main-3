/**
 * ViaDecide SPA Router  v3.0
 *
 * Fixes vs previous versions:
 *  - No HEAD-check fallback (useless: Vercel rewrites everything → index.html, HEAD always 200)
 *  - Pages without <main id="app"> get full document.write() instead of broken redirect loop
 *  - Dynamic slug convention: any unknown /slug → /slug/index.html automatically
 *  - .html extension in URL silently stripped + clean URL replaceState
 *  - Inline 404 error UI instead of hard redirect loop
 */
const AppRouter = (function () {
    "use strict";

    const ROUTES = {
        "/": "/index.html",
        "/404": "/404/index.html",
        "/AshokVerma": "/AshokVerma/index.html",
        "/CustomSwipeEngineForm": "/CustomSwipeEngineForm/index.html",
        "/engine-activation-request": "/engine-activation-request/index.html",
        "/HexWars": "/HexWars/index.html",
        "/HivaLand": "/HivaLand/index.html",
        "/Jalaram-food-court-rajkot": "/Jalaram-food-court-rajkot/index.html",
        "/ONDC-demo": "/ONDC-demo/index.html",
        "/StudyOS": "/StudyOS/index.html",
        "/SwipeOS": "/SwipeOS/index.html",
        "/the-decision-stack": "/the-decision-stack/index.html",
        "/ViaGuide": "/ViaGuide/index.html",
        "/Viadecide-blogs": "/Viadecide-blogs/index.html",
        "/alchemist": "/alchemist/index.html",
        "/app-generator": "/app-generator/index.html",
        "/brief": "/brief/index.html",
        "/cashback-claim": "/cashback-claim/index.html",
        "/cashback-rules": "/cashback-rules/index.html",
        "/cohort-apply-here": "/cohort-apply-here/index.html",
        "/contact": "/contact/index.html",
        "/decide-foodrajkot": "/decide-foodrajkot/index.html",
        "/decide-service": "/decide-service/index.html",
        "/decision-brief-guide": "/decision-brief-guide/index.html",
        "/decision-brief": "/decision-brief/index.html",
        "/decision-infrastructure-india": "/decision-infrastructure-india/index.html",
        "/discounts": "/discounts/index.html",
        "/engine-deals": "/engine-deals/index.html",
        "/engine-license": "/engine-license/index.html",
        "/finance-dashboard-msme": "/finance-dashboard-msme/index.html",
        "/founder": "/founder/index.html",
        "/indiaai-mission-2025": "/indiaai-mission-2025/index.html",
        "/interview-prep": "/interview-prep/index.html",
        "/laptops-under-50000": "/laptops-under-50000/index.html",
        "/mars-rover-simulator-game": "/mars-rover-simulator-game/index.html",
        "/memory": "/memory/index.html",
        "/multi-source-research-explained": "/multi-source-research-explained/index.html",
        "/ondc-for-bharat": "/ondc-for-bharat/index.html",
        "/payment-register": "/payment-register/index.html",
        "/pricing": "/pricing/index.html",
        "/privacy": "/privacy/index.html",
        "/prompt-alchemy": "/prompt-alchemy/index.html",
        "/sales-dashboard": "/sales-dashboard/index.html",
        "/student-research": "/student-research/index.html",
        "/terms": "/terms/index.html",
        "/viadecide-decision-matrix": "/viadecide-decision-matrix/index.html",
        "/viadecide-opportunity-radar": "/viadecide-opportunity-radar/index.html",
        "/viadecide-public-beta": "/viadecide-public-beta/index.html",
        "/viadecide-reality-check": "/viadecide-reality-check/index.html",
        "/why-small-businesses-dont-need-saas": "/why-small-businesses-dont-need-saas/index.html",
        "/custom-calculator": "/custom-calculator/index.html"
    };

    const MOUNT_POINT = "#app";

    // ── Resolve clean path → file URL to fetch ───────────────────
    // No async HEAD checks — Vercel rewrites 404s to index.html so
    // HEAD always returns 200 and can't tell us if a file exists.
    function resolveFile(cleanPath) {
        // 1. Explicit map hit
        if (ROUTES[cleanPath]) return ROUTES[cleanPath];

        // 2. Strip .html extension and retry map
        const noExt = cleanPath.replace(/\.html?$/i, "");
        if (noExt !== cleanPath && ROUTES[noExt]) return ROUTES[noExt];

        // 3. Dynamic convention: /any-slug → /any-slug/index.html
        //    Works for any new folder-based page without editing ROUTES
        return (noExt || cleanPath) + "/index.html";
    }

    // ── Intercept same-origin link clicks ────────────────────────
    function bindLinks() {
        document.addEventListener("click", e => {
            const a = e.target.closest("a");
            if (!a || !a.href) return;
            const url = new URL(a.href);
            if (url.origin !== window.location.origin) return;
            if (url.hash && url.pathname === window.location.pathname) return;
            if (/\.(pdf|png|jpg|jpeg|svg|css|js|glb|stl|zip|mp4|webp)$/i.test(url.pathname)) return;
            e.preventDefault();
            navigate(url.pathname + url.search + url.hash);
        });
    }

    // ── Core navigate ─────────────────────────────────────────────
    async function navigate(path, isPopState = false) {
        if (!isPopState) window.history.pushState({}, "", path);

        // Normalise: strip trailing slash
        let cleanPath = path.split("?")[0].replace(/\/$/, "");
        if (cleanPath === "") cleanPath = "/";

        // Strip .html extension → replace URL with clean version
        if (/\.html?$/i.test(cleanPath)) {
            const clean = cleanPath.replace(/\.html?$/i, "");
            const qs    = path.includes("?") ? "?" + path.split("?")[1] : "";
            window.history.replaceState({}, "", clean + qs);
            cleanPath = clean;
        }

        const fileToFetch = resolveFile(cleanPath);

        // Loading state
        const mount = document.querySelector(MOUNT_POINT);
        if (mount) mount.innerHTML = '<div style="padding:3rem;text-align:center;opacity:.35;font-family:Outfit,sans-serif;font-size:.9rem">Loading…</div>';

        try {
            const response = await fetch(fileToFetch);
            const html     = await response.text();

            if (!response.ok) throw new Error("HTTP " + response.status + " — " + fileToFetch);

            const parser = new DOMParser();
            const doc    = parser.parseFromString(html, "text/html");

            const newContent   = doc.querySelector(MOUNT_POINT);
            const currentMount = document.querySelector(MOUNT_POINT);

            // ── No #app in fetched page → full document replace ───
            // Handles games, special UX pages, and any standalone page
            // that manages its own layout (no shell wrapper needed)
            if (!newContent || !currentMount) {
                document.open("text/html", "replace");
                document.write(html);
                document.close();
                return;
            }

            // ── SPA inject: stylesheets ───────────────────────────
            doc.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
                if (node.tagName === "LINK") {
                    const href = node.getAttribute("href");
                    if (href && !document.querySelector(`link[href="${href}"]`)) {
                        document.head.appendChild(node.cloneNode(true));
                    }
                } else {
                    document.head.appendChild(node.cloneNode(true));
                }
            });

            // ── SPA inject: content + scripts ────────────────────
            currentMount.innerHTML = newContent.innerHTML;
            if (doc.title) document.title = doc.title;
            window.scrollTo(0, 0);
            executeScripts(currentMount);

        } catch (err) {
            console.error("[VDRouter]", err);
            // Inline error — avoids hard redirect loop on Vercel
            const m = document.querySelector(MOUNT_POINT);
            if (m) m.innerHTML = [
                '<div style="padding:4rem 2rem;text-align:center;font-family:Outfit,sans-serif">',
                '<div style="font-size:2.5rem;margin-bottom:1rem">🔍</div>',
                '<h2 style="font-size:1.4rem;color:#f0ede6;margin-bottom:.6rem">Page not found</h2>',
                '<p style="color:#8a8fa8;font-size:.875rem;margin-bottom:1.5rem">Could not load <code style="background:rgba(255,255,255,.07);padding:.15rem .45rem;border-radius:5px;font-size:.8rem">' + cleanPath + '</code></p>',
                '<a href="/" style="display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1.4rem;background:#1a8c7d;color:#fff;border-radius:10px;font-weight:600;font-size:.875rem;text-decoration:none">← Go Home</a>',
                '</div>'
            ].join("");
        }
    }

    // ── Re-execute scripts after innerHTML swap ───────────────────
    function executeScripts(container) {
        container.querySelectorAll("script").forEach(old => {
            const s = document.createElement("script");
            Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
            s.textContent = old.textContent;
            old.parentNode.replaceChild(s, old);
        });
    }

    function routes() { return { ...ROUTES }; }

    function init() {
        bindLinks();
        window.addEventListener("popstate", () => navigate(window.location.pathname, true));
        const cleanInit = window.location.pathname.replace(/\/$/, "") || "/";
        if (cleanInit !== "/") navigate(window.location.pathname, true);
    }

    return { init, navigate, routes };
})();

window.VDRouter  = AppRouter;
window.AppRouter = AppRouter;
document.addEventListener("DOMContentLoaded", () => AppRouter.init());
