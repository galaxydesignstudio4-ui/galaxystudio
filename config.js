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
window.__SUPABASE_URL__      = ''; // e.g. 'https://abcdefgh.supabase.co'
window.__SUPABASE_ANON_KEY__ = ''; // e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// Prevent admin panel flicker by checking local storage before rendering
if (window.location.pathname.includes('/admin/') && localStorage.getItem('galaxy_admin_session') === 'authenticated') {
    document.documentElement.classList.add('is-auth');
}

// ── Upstash Redis (REST API) ──────────────────────────────────
window.__REDIS_URL__   = ''; // e.g. 'https://us1-caring-fox-12345.upstash.io'
window.__REDIS_TOKEN__ = ''; // e.g. 'AXXXaGFsYWN0aWMtZ...'

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
