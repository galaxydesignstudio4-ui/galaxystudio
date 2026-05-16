/* ═══════════════════════════════════════════════════════════════
   Galaxy Studio — Configuration
   ───────────────────────────────────────────────────────────────
   SETUP INSTRUCTIONS:
   ─────────────────────────────────────────────────────────────
   1. SUPABASE SETUP:
      a) Go to https://supabase.com and create a free project
      b) In your project: Settings → API
      c) Copy "Project URL" → paste as SUPABASE_URL below
      d) Copy "anon public" key → paste as SUPABASE_ANON_KEY below
      e) Run the SQL schema from db.js in: Supabase → SQL Editor
      f) Create storage buckets in: Supabase → Storage:
         • portfolio-images (public)
         • gallery-media    (public)
         • avatars          (public)
         • logos            (public)
         • resources        (public)

   2. REDIS SETUP (Upstash — free tier, browser-compatible):
      a) Go to https://upstash.com and create a free Redis database
      b) Choose "REST API" mode (required for browser use)
      c) Copy "UPSTASH_REDIS_REST_URL" → paste as REDIS_URL below
      d) Copy "UPSTASH_REDIS_REST_TOKEN" → paste as REDIS_TOKEN below

   3. DEPLOY:
      • Replace the placeholder values below with your real credentials
      • If you skip Redis, the system still works (just no caching)
      • If you skip Supabase, the system falls back to localStorage

   ─────────────────────────────────────────────────────────────
   SECURITY NOTE:
   • The anon key is safe to expose in client-side code
   • Row Level Security (RLS) in Supabase controls data access
   • Never put your service_role key here
   ═══════════════════════════════════════════════════════════════ */

// ── Supabase ──────────────────────────────────────────────────
window.__SUPABASE_URL__      = 'https://jpkuzhlcjxqoitalpgnr.supabase.co'; 
window.__SUPABASE_ANON_KEY__ = 'sb_publishable_3HHRJ-C40zzQ1WJj4NC7zQ_zDhsGvQ6'; 

window.__resolveAssetUrl__ = function resolveAssetUrl(rawPath) {
    const value = String(rawPath || '').trim();
    if (!value) return '';
    if (/^(https?:|data:|blob:|\/\/)/i.test(value)) return value;
    if (value.startsWith('/')) return value;
    const normalized = value.replace(/^\.\//, '');
    const depth = window.location.pathname.includes('/admin/') ? '../' : '';
    return `${depth}${normalized}`;
};

// Prevent admin panel flicker by checking local storage before rendering
if (window.location.pathname.includes('/admin/') && localStorage.getItem('galaxy_admin_session') === 'authenticated') {
    document.documentElement.classList.add('is-auth');
}

// Normalize older saved branding so the parent studio name stays consistent.
(() => {
    try {
        const rawSettings = localStorage.getItem('galaxy_settings');
        if (rawSettings) {
            const settings = JSON.parse(rawSettings) || {};
            let changed = false;
            if (settings.studioName === 'Galaxy Design Studio') {
                settings.studioName = 'Galaxy Studio';
                changed = true;
            }
            if (settings.tagline === 'Creative & Digital Advertisement Studio') {
                settings.tagline = 'Creative, Design & Development Studio';
                changed = true;
            }
            if (changed) localStorage.setItem('galaxy_settings', JSON.stringify(settings));
        }

        const rawAbout = localStorage.getItem('galaxy_about');
        if (rawAbout) {
            const about = JSON.parse(rawAbout) || {};
            let changed = false;
            if (about.role === 'Owner & Creative Director · Galaxy Design Studio') {
                about.role = 'Owner & Creative Director · Galaxy Studio';
                changed = true;
            }
            if (changed) localStorage.setItem('galaxy_about', JSON.stringify(about));
        }
    } catch {}
})();

// Always prioritize the studio logo for browser/tab icons.
(() => {
    let bootSettings = {};
    try {
        bootSettings = JSON.parse(localStorage.getItem('galaxy_settings') || '{}') || {};
    } catch {}

    const rawLogoUrl = bootSettings.logo || 'logo-512.png';
    const logoUrl = window.__resolveAssetUrl__(rawLogoUrl === 'logo.png' ? 'logo-512.png' : rawLogoUrl);
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head || !logoUrl) return;

    [
        ['icon', 'image/png'],
        ['shortcut icon', 'image/png'],
        ['apple-touch-icon', 'image/png'],
    ].forEach(([rel, type]) => {
        const link = document.createElement('link');
        link.rel = rel;
        link.type = type;
        link.href = logoUrl;
        head.appendChild(link);
    });
})();

// Show the saved public logo as early as possible on non-admin pages.
if (!window.location.pathname.includes('/admin/')) {
    document.documentElement.classList.add('gds-loading');
    let bootSettings = {};
    try {
        bootSettings = JSON.parse(localStorage.getItem('galaxy_settings') || '{}') || {};
    } catch {}

    const studioName = bootSettings.studioName || 'Galaxy Studio';
    const rawLogoUrl = bootSettings.logo || 'logo-512.png';
    const logoUrl = window.__resolveAssetUrl__(rawLogoUrl === 'logo.png' ? 'logo-512.png' : rawLogoUrl);
    window.__GDS_BOOT_SETTINGS__ = { studioName, logo: logoUrl };

    if (logoUrl) {
        document.documentElement.classList.add('gds-has-boot-logo');

        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'image';
        preload.href = logoUrl;
        preload.fetchPriority = 'high';
        document.head.appendChild(preload);

        const style = document.createElement('style');
        style.textContent = `
html.gds-loading #homeBranchFlow,
html.gds-loading #services .adavatar-card,
html.gds-loading #services .services-grid,
html.gds-loading #portfolio .projects-grid,
html.gds-loading #testimonials .testimonials-grid,
html.gds-loading .services-list,
html.gds-loading #portfolioGrid {
  visibility: hidden !important;
}
html.gds-has-boot-logo .nav-logo .logo-icon,
html.gds-has-boot-logo .footer-logo .logo-icon {
  background-color: transparent !important;
  background-image: url(${JSON.stringify(String(logoUrl))}) !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  overflow: visible !important;
  padding: 0 !important;
}
html.gds-has-boot-logo .nav-logo .logo-icon {
  width: 38px !important;
  height: 38px !important;
}
html.gds-has-boot-logo .footer-logo .logo-icon {
  width: 34px !important;
  height: 34px !important;
}
html.gds-has-boot-logo .nav-logo .logo-icon svg,
html.gds-has-boot-logo .footer-logo .logo-icon svg {
  opacity: 0 !important;
}
`;
        document.head.appendChild(style);
    }
}

// ── Upstash Redis (REST API) ──────────────────────────────────
window.__REDIS_URL__   = 'https://adequate-seahorse-103818.upstash.io'; 
window.__REDIS_TOKEN__ = 'gQAAAAAAAZWKAAIocDE4ODA2NWUyMTNjODY0NTdjYjQwNGY0NzliYjBjZmI2OXAxMTAzODE4'; 

// ── App settings ──────────────────────────────────────────────
window.__APP_VERSION__ = '1.0.1';
window.__SITE_NAME__   = 'Galaxy Studio';

window.__PWA_THEME_COLOR__ = '#12091d';

(() => {
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    const ensureMeta = (name, content, attr = 'name') => {
        let node = head.querySelector(`meta[${attr}="${name}"]`);
        if (!node) {
            node = document.createElement('meta');
            node.setAttribute(attr, name);
            head.appendChild(node);
        }
        node.setAttribute('content', content);
    };

    const ensureLink = (rel, href) => {
        let node = head.querySelector(`link[rel="${rel}"]`);
        if (!node) {
            node = document.createElement('link');
            node.rel = rel;
            head.appendChild(node);
        }
        node.href = href;
    };

    const manifestHref = window.__resolveAssetUrl__('manifest.webmanifest');
    ensureLink('manifest', manifestHref);
    ensureMeta('theme-color', window.__PWA_THEME_COLOR__);
    ensureMeta('mobile-web-app-capable', 'yes');
    ensureMeta('apple-mobile-web-app-capable', 'yes');
    ensureMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
    ensureMeta('apple-mobile-web-app-title', window.__SITE_NAME__);
})();

(() => {
    const isStandalone = () => window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true;
    const isIos = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent || '');
    const isSafari = () => {
        const ua = window.navigator.userAgent || '';
        return /safari/i.test(ua) && !/chrome|crios|android|edg/i.test(ua);
    };

    let deferredPrompt = null;
    let installButton = null;
    let installHint = null;

    const hideInstallUi = () => {
        installButton?.classList.remove('visible');
        installHint?.remove();
        installHint = null;
    };

    const showInstallUi = (label = 'Install App') => {
        if (isStandalone()) return;
        if (!installButton) return;
        installButton.textContent = label;
        installButton.classList.add('visible');
    };

    const showIosHint = () => {
        if (installHint) {
            installHint.classList.add('visible');
            return;
        }
        installHint = document.createElement('div');
        installHint.className = 'gds-install-hint visible';
        installHint.innerHTML = `
          <div class="gds-install-hint-card">
            <button type="button" class="gds-install-hint-close" aria-label="Close install help">x</button>
            <strong>Add Galaxy to your home screen</strong>
            <p>On iPhone or iPad, tap Share in Safari, then choose Add to Home Screen.</p>
          </div>
        `;
        document.body.appendChild(installHint);
        installHint.querySelector('.gds-install-hint-close')?.addEventListener('click', () => {
            installHint?.remove();
            installHint = null;
        });
    };

    const registerServiceWorker = async () => {
        if (!('serviceWorker' in navigator) || window.location.protocol === 'file:') return;
        try {
            const swUrl = `${window.__resolveAssetUrl__('sw.js')}?v=${encodeURIComponent(window.__APP_VERSION__ || '1.0.1')}`;
            const registration = await navigator.serviceWorker.register(swUrl);
            if (typeof registration.update === 'function') {
                registration.update().catch(() => {});
            }
        } catch (error) {
            console.warn('[PWA] Service worker registration failed:', error?.message || error);
        }
    };

    const mountInstallUi = () => {
        if (document.getElementById('gdsInstallAppBtn')) return;

        const style = document.createElement('style');
        style.textContent = `
.gds-install-app-btn{
  position:fixed;
  right:18px;
  bottom:18px;
  z-index:9999;
  border:none;
  border-radius:999px;
  padding:12px 18px;
  background:linear-gradient(135deg,hsl(250,80%,65%),hsl(200,100%,60%));
  color:#fff;
  font:600 14px/1.1 "Space Grotesk","Inter",sans-serif;
  box-shadow:0 18px 40px rgba(0,0,0,0.3);
  cursor:pointer;
  opacity:0;
  transform:translateY(18px);
  pointer-events:none;
  transition:opacity .25s ease,transform .25s ease,filter .2s ease;
}
.gds-install-app-btn.visible{
  opacity:1;
  transform:translateY(0);
  pointer-events:auto;
}
.gds-install-app-btn:hover{filter:brightness(1.08);}
.gds-install-hint{
  position:fixed;
  inset:0;
  background:rgba(5,6,12,0.68);
  z-index:10000;
  display:flex;
  align-items:flex-end;
  justify-content:center;
  padding:20px;
}
.gds-install-hint-card{
  width:min(420px,100%);
  background:hsl(260,15%,10%);
  color:hsl(0,0%,95%);
  border:1px solid hsl(250 80% 65% / 0.22);
  border-radius:24px;
  padding:22px 22px 18px;
  box-shadow:0 24px 64px rgba(0,0,0,0.4);
  position:relative;
}
.gds-install-hint-card strong{
  display:block;
  margin-bottom:8px;
  font:700 18px/1.2 "Space Grotesk","Inter",sans-serif;
}
.gds-install-hint-card p{
  margin:0;
  color:hsl(260,5%,72%);
  font:400 14px/1.55 "Inter",sans-serif;
}
.gds-install-hint-close{
  position:absolute;
  top:10px;
  right:10px;
  width:32px;
  height:32px;
  border-radius:10px;
  border:1px solid hsl(260 10% 22%);
  background:transparent;
  color:hsl(0,0%,90%);
  cursor:pointer;
}
@media (max-width:700px){
  .gds-install-app-btn{
    right:14px;
    left:14px;
    bottom:14px;
    text-align:center;
    justify-content:center;
  }
}
`;
        document.head.appendChild(style);

        installButton = document.createElement('button');
        installButton.id = 'gdsInstallAppBtn';
        installButton.className = 'gds-install-app-btn';
        installButton.type = 'button';
        installButton.textContent = 'Install App';
        installButton.setAttribute('aria-label', 'Install app');
        document.body.appendChild(installButton);

        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                try {
                    await deferredPrompt.userChoice;
                } catch {}
                deferredPrompt = null;
                hideInstallUi();
                return;
            }

            if (isIos() && isSafari() && !isStandalone()) {
                showIosHint();
            }
        });

        if (isIos() && isSafari() && !isStandalone()) {
            showInstallUi('Add to Home Screen');
        }
    };

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        showInstallUi('Install App');
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        hideInstallUi();
    });

    document.addEventListener('DOMContentLoaded', () => {
        mountInstallUi();
        registerServiceWorker();
        if (isStandalone()) hideInstallUi();
    });
})();

// Optional smart-title hook for Gallery / AdAvatar auto naming.
// Leave this as `null` in the browser unless you later connect it to a secure backend.
// Example shape:
// window.__GDS_SMART_TITLE__ = async ({ file, url, thumbUrl, type, currentTitle, detectedTitle, context }) => 'Luxury Product Poster';
window.__GDS_SMART_TITLE__ = window.__GDS_SMART_TITLE__ || null;

/*
 * ─────────────────────────────────────────────────────────────
 * HOW THE DATA FLOW WORKS:
 * ─────────────────────────────────────────────────────────────
 *
 *  Browser Request
 *       │
 *       ▼
 *  1. Redis Cache ──── HIT? ──► Return cached data (fast, ~5ms)
 *       │ MISS
 *       ▼
 *  2. Supabase DB ──► Fetch fresh data (~50–200ms)
 *       │
 *       ├──► Store in Redis (TTL: 5 minutes)
 *       │
 *       └──► Mirror to localStorage (offline fallback)
 *
 *  Write Operations:
 *  Admin saves data
 *       │
 *       ├──► localStorage (instant, UI stays snappy)
 *       ├──► Redis cache invalidated
 *       └──► Supabase DB updated (background async)
 *
 * ─────────────────────────────────────────────────────────────
 * FILE UPLOADS:
 * ─────────────────────────────────────────────────────────────
 *  Image/video uploads go directly to Supabase Storage
 *  and return a permanent public CDN URL.
 *  Falls back to base64 data URL if Supabase is not configured.
 * ─────────────────────────────────────────────────────────────
 */

