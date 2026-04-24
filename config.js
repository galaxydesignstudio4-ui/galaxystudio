/* ═══════════════════════════════════════════════════════════════
   GALAXY DESIGN STUDIO — Configuration
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

// Prevent admin panel flicker by checking local storage before rendering
if (window.location.pathname.includes('/admin/') && localStorage.getItem('galaxy_admin_session') === 'authenticated') {
    document.documentElement.classList.add('is-auth');
}

// Show the saved public logo as early as possible on non-admin pages.
if (!window.location.pathname.includes('/admin/')) {
    let bootSettings = {};
    try {
        bootSettings = JSON.parse(localStorage.getItem('galaxy_settings') || '{}') || {};
    } catch {}

    const studioName = bootSettings.studioName || 'Galaxy Design Studio';
    const rawLogoUrl = bootSettings.logo || 'logo-512.png';
    const logoUrl = rawLogoUrl === 'logo.png' ? 'logo-512.png' : rawLogoUrl;
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
window.__APP_VERSION__ = '1.0.0';
window.__SITE_NAME__   = 'Galaxy Design Studio';

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
