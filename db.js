/* ═══════════════════════════════════════════════════════════════
   GALAXY DESIGN STUDIO — Database & Storage Layer
   Supabase (primary DB + file storage) + Redis (cache/memory)
   Falls back gracefully to localStorage if not configured.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   CONFIGURATION — Set your credentials here
   ───────────────────────────────────────────── */
const GDB_CONFIG = {
  supabase: {
    url:    window.__SUPABASE_URL__    || 'https://YOUR_PROJECT.supabase.co',
    anonKey:window.__SUPABASE_ANON_KEY__|| 'YOUR_SUPABASE_ANON_KEY',
    // Storage bucket names
    buckets: {
      portfolio: 'portfolio-images',
      gallery:   'gallery-media',
      avatars:   'avatars',
      logos:     'logos',
    },
  },
  redis: {
    // Upstash Redis REST (browser-compatible)
    url:   window.__REDIS_URL__   || 'https://YOUR_UPSTASH_ENDPOINT.upstash.io',
    token: window.__REDIS_TOKEN__ || 'YOUR_UPSTASH_TOKEN',
    ttl:   300, // seconds — cache TTL (5 min)
  },
  // Set to true once credentials are added
  enabled: !!(window.__SUPABASE_URL__ && window.__SUPABASE_ANON_KEY__),
};

/* ─────────────────────────────────────────────
   SUPABASE CLIENT (inline — no npm needed)
   ───────────────────────────────────────────── */
class SupabaseClient {
  constructor(url, key) {
    this.url = url.replace(/\/$/, '');
    this.key = key;
    this.headers = {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    };
  }

  async _fetch(path, opts = {}) {
    const res = await fetch(`${this.url}${path}`, {
      ...opts,
      headers: { ...this.headers, ...(opts.headers || {}) },
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Supabase error ${res.status}: ${err}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  // ── REST API helpers ──
  from(table) {
    return new SupabaseQuery(this, table);
  }

  // ── Storage helpers ──
  storage = {
    _client: this,
    from: (bucket) => ({
      upload: async (path, file, opts = {}) => {
        const form = new FormData();
        form.append('', file);
        const res = await fetch(`${GDB_CONFIG.supabase.url}/storage/v1/object/${bucket}/${path}`, {
          method: 'POST',
          headers: {
            'apikey': GDB_CONFIG.supabase.anonKey,
            'Authorization': `Bearer ${GDB_CONFIG.supabase.anonKey}`,
            ...(opts.upsert ? { 'x-upsert': 'true' } : {}),
          },
          body: form,
        });
        if (!res.ok) throw new Error(`Upload failed: ${await res.text()}`);
        return await res.json();
      },
      getPublicUrl: (path) => ({
        data: { publicUrl: `${GDB_CONFIG.supabase.url}/storage/v1/object/public/${bucket}/${path}` }
      }),
      remove: async (paths) => {
        return await fetch(`${GDB_CONFIG.supabase.url}/storage/v1/object/${bucket}`, {
          method: 'DELETE',
          headers: {
            'apikey': GDB_CONFIG.supabase.anonKey,
            'Authorization': `Bearer ${GDB_CONFIG.supabase.anonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prefixes: paths }),
        });
      },
    }),
  };
}

class SupabaseQuery {
  constructor(client, table) {
    this._client = client;
    this._table  = table;
    this._params = [];
    this._body   = null;
    this._method = 'GET';
    this._single = false;
  }
  select(cols = '*') { this._select = cols; return this; }
  eq(col, val)  { this._params.push(`${col}=eq.${encodeURIComponent(val)}`); return this; }
  neq(col, val) { this._params.push(`${col}=neq.${encodeURIComponent(val)}`); return this; }
  order(col, { ascending = true } = {}) { this._params.push(`order=${col}.${ascending?'asc':'desc'}`); return this; }
  limit(n)      { this._params.push(`limit=${n}`); return this; }
  single()      { this._single = true; return this; }

  insert(data) { this._method = 'POST'; this._body = data; return this; }
  update(data) { this._method = 'PATCH'; this._body = data; return this; }
  upsert(data) { this._method = 'POST'; this._body = data; this._upsert = true; return this; }
  delete()     { this._method = 'DELETE'; return this; }

  async _exec() {
    const qs = this._params.length ? '?' + this._params.join('&') : '';
    const path = `/rest/v1/${this._table}${qs}`;
    const opts = { method: this._method };
    if (this._body) opts.body = JSON.stringify(this._body);
    if (this._upsert) opts.headers = { 'Prefer': 'resolution=merge-duplicates,return=representation' };
    const data = await this._client._fetch(path, opts);
    if (this._single) return { data: Array.isArray(data) ? data[0] : data, error: null };
    return { data, error: null };
  }

  then(resolve, reject) { return this._exec().then(resolve, reject); }
}

/* ─────────────────────────────────────────────
   REDIS CLIENT (Upstash REST API — browser OK)
   ───────────────────────────────────────────── */
class RedisClient {
  constructor(url, token) {
    this.url   = url.replace(/\/$/, '');
    this.token = token;
  }

  async _cmd(...args) {
    try {
      const res = await fetch(`${this.url}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });
      const json = await res.json();
      return json.result;
    } catch (e) {
      console.warn('[Redis] command failed:', e.message);
      return null;
    }
  }

  async get(key)              { return this._cmd('GET', key); }
  async set(key, val, ttl)    {
    if (ttl) return this._cmd('SET', key, val, 'EX', ttl);
    return this._cmd('SET', key, val);
  }
  async del(key)              { return this._cmd('DEL', key); }
  async exists(key)           { return this._cmd('EXISTS', key); }
  async hget(hash, field)     { return this._cmd('HGET', hash, field); }
  async hset(hash, field, v)  { return this._cmd('HSET', hash, field, v); }
  async hgetall(hash)         { return this._cmd('HGETALL', hash); }
  async keys(pattern)         { return this._cmd('KEYS', pattern); }
  async flushPattern(pattern) {
    const keys = await this.keys(pattern);
    if (keys && keys.length) {
      for (const k of keys) await this.del(k);
    }
  }

  // JSON helpers
  async getJSON(key)          { const v = await this.get(key); return v ? JSON.parse(v) : null; }
  async setJSON(key, val, ttl){ return this.set(key, JSON.stringify(val), ttl || GDB_CONFIG.redis.ttl); }
}

/* ─────────────────────────────────────────────
   GALAXY DB — Unified data access layer
   Priority: Redis cache → Supabase → localStorage
   ───────────────────────────────────────────── */
const GalaxyDB = (() => {
  let _sb   = null;
  let _redis = null;
  let _ready = false;
  let _mode  = 'local'; // 'supabase' | 'local'

  // Table name mapping
  const TABLES = {
    galaxy_services:      'services',
    galaxy_portfolio:     'portfolio',
    galaxy_gallery:       'gallery',
    galaxy_adavatar:      'adavatar',
    galaxy_testimonials:  'testimonials',
    galaxy_team:          'team',
    galaxy_messages:      'messages',
    galaxy_notifications: 'notifications',
    galaxy_settings:      'settings',
    galaxy_about:         'about',
  };

  function _ls_get(key) {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; }
    catch { return null; }
  }
  function _ls_set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  async function init() {
    if (_ready) return;

    if (GDB_CONFIG.enabled) {
      try {
        _sb    = new SupabaseClient(GDB_CONFIG.supabase.url, GDB_CONFIG.supabase.anonKey);
        _redis = new RedisClient(GDB_CONFIG.redis.url, GDB_CONFIG.redis.token);
        // Test connection
        await _sb._fetch('/rest/v1/services?limit=1');
        _mode  = 'supabase';
        console.info('[GalaxyDB] ✅ Connected to Supabase + Redis');
      } catch (e) {
        console.warn('[GalaxyDB] Supabase connection failed, falling back to localStorage:', e.message);
        _mode = 'local';
      }
    } else {
      console.info('[GalaxyDB] Running in localStorage mode. Add Supabase credentials to enable cloud sync.');
    }
    _ready = true;
  }

  // ── READ ──
  async function getAll(key) {
    await init();
    if (_mode === 'local') return _ls_get(key);

    const table     = TABLES[key] || key;
    const cacheKey  = `gds:${table}:all`;

    // 1. Try Redis cache
    try {
      const cached = await _redis.getJSON(cacheKey);
      if (cached) {
        console.debug(`[Redis] cache hit: ${cacheKey}`);
        return cached;
      }
    } catch {}

    // 2. Fetch from Supabase
    try {
      const { data } = await _sb.from(table).select('*').order('id', { ascending: true });
      // 3. Write to Redis cache
      try { await _redis.setJSON(cacheKey, data); } catch {}
      // 4. Mirror to localStorage
      _ls_set(key, data);
      return data;
    } catch (e) {
      console.warn(`[Supabase] getAll(${table}) failed:`, e.message);
      return _ls_get(key);
    }
  }

  // ── WRITE / UPSERT ──
  async function setAll(key, val) {
    await init();
    // Always save to localStorage
    _ls_set(key, val);

    if (_mode === 'local') return val;

    const table    = TABLES[key] || key;
    const cacheKey = `gds:${table}:all`;

    // Invalidate Redis cache
    try { await _redis.del(cacheKey); } catch {}

    // Sync to Supabase (upsert entire collection)
    // For settings/about (objects), store as single row with id=1
    if (typeof val === 'object' && !Array.isArray(val)) {
      try {
        await _sb.from(table).upsert({ id: 1, ...val });
      } catch (e) {
        console.warn(`[Supabase] setAll(${table}) failed:`, e.message);
      }
    } else {
      // For arrays, delete-all + re-insert (simple approach for small datasets)
      try {
        await _sb._fetch(`/rest/v1/${table}`, { method: 'DELETE', body: JSON.stringify({}) });
        if (val && val.length) {
          await _sb.from(table).insert(val);
        }
        // Update cache
        try { await _redis.setJSON(cacheKey, val); } catch {}
      } catch (e) {
        console.warn(`[Supabase] setAll(${table}) batch write failed:`, e.message);
      }
    }
    return val;
  }

  // ── UPLOAD FILE to Supabase Storage ──
  async function uploadFile(bucket, path, file) {
    await init();
    if (_mode === 'local') {
      // Fall back: return base64 data URL
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = e => res({ url: e.target.result, path: null });
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    }
    try {
      await _sb.storage.from(bucket).upload(path, file, { upsert: true });
      const { data } = _sb.storage.from(bucket).getPublicUrl(path);
      // Cache the URL in Redis
      try { await _redis.set(`gds:file:${bucket}:${path}`, data.publicUrl, 86400); } catch {}
      return { url: data.publicUrl, path };
    } catch (e) {
      console.warn(`[Storage] upload failed, using base64 fallback:`, e.message);
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = e => res({ url: e.target.result, path: null });
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    }
  }

  // ── DELETE FILE ──
  async function deleteFile(bucket, path) {
    await init();
    if (_mode !== 'local' && path) {
      try {
        await _sb.storage.from(bucket).remove([path]);
        try { await _redis.del(`gds:file:${bucket}:${path}`); } catch {}
      } catch (e) {
        console.warn(`[Storage] delete failed:`, e.message);
      }
    }
  }

  // ── INVALIDATE CACHE ──
  async function invalidate(key) {
    if (_mode !== 'local') {
      const table = TABLES[key] || key;
      try { await _redis.del(`gds:${table}:all`); } catch {}
    }
  }

  // ── STATUS ──
  function status() {
    return {
      mode:    _mode,
      ready:   _ready,
      supabase: GDB_CONFIG.enabled,
    };
  }

  return { init, getAll, setAll, uploadFile, deleteFile, invalidate, status };
})();

/* ─────────────────────────────────────────────
   COMPATIBILITY SHIMS — keep existing getData/setData working
   These replace the old localStorage-only versions
   ───────────────────────────────────────────── */

// Synchronous shim (reads from localStorage mirror, syncs to cloud async)
function getData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch {}
  const d = DEFAULTS[key];
  return d !== undefined ? (Array.isArray(d) ? [...d] : (typeof d === 'object' ? { ...d } : d)) : null;
}

function setData(key, val) {
  // Sync write to localStorage immediately (for snappy UI)
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  // Async write to Supabase + Redis in background
  GalaxyDB.setAll(key, val).catch(e => console.warn('[GalaxyDB] background sync failed:', e));
}

function nextId(arr) {
  return Array.isArray(arr) && arr.length > 0 ? Math.max(...arr.map(i => i.id || 0)) + 1 : 1;
}

function initDefaults() {
  if (typeof DEFAULTS === 'undefined') return;
  Object.entries(DEFAULTS).forEach(([k, v]) => {
    if (localStorage.getItem(k) === null) localStorage.setItem(k, JSON.stringify(v));
  });
  // Kick off Supabase init in background
  GalaxyDB.init().catch(() => {});
}

/* ─────────────────────────────────────────────
   ASYNC DATA LOAD — use this to populate UI
   from Supabase on first load (bypasses cache)
   ───────────────────────────────────────────── */
async function loadFromCloud(key) {
  return GalaxyDB.getAll(key);
}

/* ─────────────────────────────────────────────
   FILE UPLOAD HELPER — wraps storage upload
   Returns { url, path } — url is always usable
   ───────────────────────────────────────────── */
async function uploadMedia(file, bucket = 'gallery') {
  const ext  = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  return GalaxyDB.uploadFile(bucket, path, file);
}

/* ─────────────────────────────────────────────
   SUPABASE SQL SCHEMA — run this in Supabase
   SQL editor to create all required tables.
   ─────────────────────────────────────────────
   Copy and paste into Supabase > SQL Editor:

   create table if not exists services      (id serial primary key, icon text, title text not null, description text, ord integer, signature boolean default false, created_at timestamptz default now());
   create table if not exists portfolio     (id serial primary key, title text not null, description text, category text, client text, featured boolean default false, premium boolean default false, thumb_url text, storage_path text, created_at timestamptz default now());
   create table if not exists gallery       (id serial primary key, type text default 'image', title text, description text, url text, thumb_url text, storage_path text, icon text, created_at timestamptz default now());
   create table if not exists adavatar      (id serial primary key, type text default 'image', title text, description text, url text, thumb_url text, storage_path text, icon text, created_at timestamptz default now());
   create table if not exists testimonials  (id serial primary key, name text not null, company text, quote text not null, rating integer default 5, avatar_url text, created_at timestamptz default now());
   create table if not exists team          (id serial primary key, name text not null, role text, bio text, avatar_url text, storage_path text, ord integer, created_at timestamptz default now());
   create table if not exists messages      (id serial primary key, name text, email text, service text, message text, read boolean default false, created_at timestamptz default now());
   create table if not exists notifications (id serial primary key, title text not null, message text not null, type text default 'Info', active boolean default true, created_at timestamptz default now());
   create table if not exists settings      (id integer primary key default 1, studio_name text, tagline text, email text, phone text, location text, facebook text, whatsapp text, novatech text, qr_url text, logo_url text);
   create table if not exists about         (id integer primary key default 1, name text, role text, bio text, facebook text, youtube1 text, youtube2 text, avatar_url text);

   -- Storage buckets (create in Supabase > Storage):
   -- portfolio-images  (public)
   -- gallery-media     (public)
   -- avatars           (public)
   -- logos             (public)

   -- RLS policies — enable public read, authenticated write:
   alter table services      enable row level security;
   alter table portfolio     enable row level security;
   alter table gallery       enable row level security;
   alter table adavatar      enable row level security;
   alter table testimonials  enable row level security;
   alter table team          enable row level security;
   alter table notifications enable row level security;
   alter table settings      enable row level security;
   alter table about         enable row level security;
   -- Messages — private write only:
   alter table messages      enable row level security;

   create policy "public read" on services      for select using (true);
   create policy "public read" on portfolio     for select using (true);
   create policy "public read" on gallery       for select using (true);
   create policy "public read" on adavatar      for select using (true);
   create policy "public read" on testimonials  for select using (true);
   create policy "public read" on team          for select using (true);
   create policy "public read" on notifications for select using (true);
   create policy "public read" on settings      for select using (true);
   create policy "public read" on about         for select using (true);
   create policy "public insert messages" on messages for insert with check (true);
   ─────────────────────────────────────────────── */

console.info('[GalaxyDB] Database layer loaded. Mode:', GDB_CONFIG.enabled ? 'Supabase + Redis' : 'localStorage (offline)');
