/* ═══════════════════════════════════════════════════
   Galaxy Studio — Admin JS v2
   ═══════════════════════════════════════════════════ */

window.DEFAULTS = {
  ...(window.DEFAULTS || {}),
  galaxy_admin_password: 'admin123',
  galaxy_services: [
    {id:1,icon:'🎨',title:'Graphic Design',desc:'Stunning visuals that communicate your brand story with impact and clarity.',order:1},
    {id:2,icon:'📣',title:'Advertisement Design',desc:'Creative advertisement designs for digital and print that grab attention.',order:2},
    {id:3,icon:'🏷️',title:'Logo & Branding Design',desc:'Memorable brand identities that capture your essence.',order:3},
    {id:4,icon:'🎬',title:'Video Editing',desc:'Professional video editing that transforms raw footage into compelling content.',order:4},
    {id:5,icon:'📦',title:'3D Animation',desc:'Breathtaking 3D visuals and animations that bring ideas to life.',order:5},
    {id:6,icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`,title:'AdAvatar',desc:'3D animated Pixar-style avatar that talks and promotes your product.',order:6,signature:true},
    {id:7,icon:'🖥️',title:'UI/UX Design',desc:'User-centered interface design that creates intuitive digital experiences.',order:7},
    {id:8,icon:'✏️',title:'CAD Design & 3D Modeling',desc:'Precision-engineered technical drawings and 3D CAD models.',order:8},
    {id:9,icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,title:'Digital Promotion Content',desc:'All-round creative and digital services to promote your business.',order:9},
  ],
  galaxy_portfolio: [],
  galaxy_gallery: [],
  galaxy_adavatar: [],
  galaxy_testimonials: [],
  galaxy_team: [],
  galaxy_messages: [],
  galaxy_notifications: [],
  galaxy_settings: {
    studioName:'Galaxy Studio',tagline:'Creative, Design & Development Studio',
    email:'galaxydesignstudio4@gmail.com',phone:'055-688-1003',
    location:'Tema, Accra, Ghana',facebook:'https://web.facebook.com/profile.php?id=61562678010128',
    whatsapp:'233556881003',novatech:'#',qrUrl:'',logo:'logo-512.png',
  },
  galaxy_about: {
    name:'Emmanuel Yirenkyi-Amoyaw',
    role:'Owner & Creative Director · Galaxy Studio',
    bio:'Emmanuel is a creative and digital advertisement specialist providing graphic design, video editing, 3D animation, CAD & UI/UX design, avatar-style ads, Pixar-style animations, logo and branding, and digital promotion content. Special creator of AdAvatar — 3D animated avatar advertisements for modern business promotion.',
    facebook:'https://web.facebook.com/profile.php?id=61562678010128',
    youtube1:'https://youtube.com/@epictales-q6n',youtube2:'https://youtube.com/@biblesparksbs',
    homeBranchLabel:'Studio Branches',
    homeBranchTitle:'One parent studio. Two focused branches.',
    homeBranchIntro:'Galaxy Studio leads the vision, then each branch takes a clear path so clients immediately know where design work lives and where technical delivery lives.',
    aboutBranchLabel:'Branch Structure',
    aboutBranchTitle:'The Galaxy Studio Tree',
    aboutBranchIntro:'Galaxy Studio is the parent brand. Under it, we are building focused branches so clients can clearly see where creative design work lives and where development and technical delivery live.',
    parentBadge:'Parent Studio',
    parentName:'Galaxy Studio',
    parentShort:'G',
    parentFocus:'Main brand umbrella',
    parentDescription:'The central identity connecting our creative, design, development, and future specialist branches.',
    designBadge:'Branch 01',
    designName:'Galaxy Design Studio',
    designShort:'D',
    designFocus:'Design and visual communication',
    designDescription:'Graphic design, branding, logo systems, ads, video editing, motion work, 3D visuals, and creative campaign assets.',
    techBadge:'Branch 02',
    techName:'Galaxy Tech Studio',
    techShort:'T',
    techFocus:'Development and technical solutions',
    techDescription:'Websites, digital product development, technical builds, and architectural work that need structured planning and execution.',
    avatar:'',
  },
};
const DEFAULTS = window.DEFAULTS;

/* ─── Storage ─── */
function getData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch(e){}
  const d = DEFAULTS[key];
  return d !== undefined ? (Array.isArray(d) ? [...d] : (typeof d==='object' ? {...d} : d)) : null;
}
function setData(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); }
  catch(e){ showToast('Storage error — data may not have saved.','error'); }
}
function nextId(arr) {
  return Array.isArray(arr)&&arr.length>0 ? Math.max(...arr.map(i=>i.id||0))+1 : 1;
}
function initDefaults() {
  Object.entries(DEFAULTS).forEach(([k,v]) => {
    if(localStorage.getItem(k)===null) localStorage.setItem(k,JSON.stringify(v));
  });
  if (localStorage.getItem('galaxy_admin_password') !== null) {
    try {
      const current = JSON.parse(localStorage.getItem('galaxy_admin_password'));
      if (current === 'galaxy2024') localStorage.setItem('galaxy_admin_password', JSON.stringify('admin123'));
    } catch {}
  }
}

if (typeof window.__GALAXY_GET_DATA__ === 'function') {
  getData = window.getData = window.__GALAXY_GET_DATA__;
}
if (typeof window.__GALAXY_SET_DATA__ === 'function') {
  setData = window.setData = window.__GALAXY_SET_DATA__;
}
if (typeof window.__GALAXY_NEXT_ID__ === 'function') {
  nextId = window.nextId = window.__GALAXY_NEXT_ID__;
}
if (typeof window.__GALAXY_INIT_DEFAULTS__ === 'function') {
  initDefaults = window.initDefaults = window.__GALAXY_INIT_DEFAULTS__;
}

async function uploadAsset(file, bucket) {
  if (typeof window.uploadMedia === 'function') {
    return window.uploadMedia(file, bucket);
  }
  return { url: await fileToBase64(file), path: '' };
}

async function removeAsset(bucket, path) {
  if (typeof window.deleteStoredMedia === 'function' && path) {
    await window.deleteStoredMedia(bucket, path);
  }
}

/* ─── Auth ─── */
function getStudioSettings() {
  return getData('galaxy_settings') || DEFAULTS.galaxy_settings || {};
}

function getPreferredLogoUrl() {
  const settings = getStudioSettings();
  const rawLogo = settings.logo || DEFAULTS.galaxy_settings.logo || 'logo-512.png';
  const normalized = rawLogo === 'logo.png' ? 'logo-512.png' : rawLogo;
  return typeof window.__resolveAssetUrl__ === 'function' ? window.__resolveAssetUrl__(normalized) : normalized;
}

function getAuthorizedAdminEmail() {
  const settings = getStudioSettings();
  return String(settings.email || DEFAULTS.galaxy_settings.email || '').trim().toLowerCase();
}

function applyAdminBranding() {
  const logoUrl = getPreferredLogoUrl();
  if (!logoUrl) return;

  const safeLogo = escHtml(logoUrl);
  document.querySelectorAll('.auth-logo, .sidebar-logo-icon').forEach((el) => {
    el.innerHTML = `<img src="${safeLogo}" alt="Galaxy Studio logo" loading="eager" decoding="async">`;
  });
}

function setAdminAuthenticated(gate, panel) {
  localStorage.setItem('galaxy_admin_session', 'authenticated');
  document.documentElement.classList.add('is-auth');
  gate.style.display = 'none';
  panel.classList.add('visible');
}

function clearAdminAuthenticated() {
  localStorage.removeItem('galaxy_admin_session');
  document.documentElement.classList.remove('is-auth');
}

function getAdminHomeUrl() {
  try {
    return new URL('../index.html', window.location.href).toString();
  } catch {
    return '../index.html';
  }
}

function setPasswordStepState({ enabled = false, email = '' } = {}) {
  const authCard = document.querySelector('.auth-card');
  const sub = authCard?.querySelector('.auth-sub');
  const input = document.getElementById('authPassword');
  const btn = document.getElementById('authBtn');
  const googleBtn = document.getElementById('authGoogleBtn');
  if (sub) {
    sub.textContent = enabled
      ? `Google verified for ${email || 'the admin account'}. Enter the admin password to continue.`
      : 'Continue with Google using the admin email, then enter your admin password.';
  }
  if (input) {
    input.disabled = !enabled;
    input.placeholder = enabled ? 'Admin password' : 'Continue with Google first';
  }
  if (btn) {
    btn.disabled = !enabled;
    btn.textContent = enabled ? 'Enter Admin Panel →' : 'Verify Google First';
  }
  if (googleBtn) {
    googleBtn.disabled = enabled;
    googleBtn.innerHTML = enabled
      ? 'Google Verified'
      : `
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.8 2.9l3 2.3c1.8-1.7 2.8-4.2 2.8-7.1 0-.7-.1-1.3-.2-2H12z"/>
          <path fill="#34A853" d="M12 22c2.7 0 4.9-.9 6.6-2.5l-3-2.3c-.8.6-1.9 1-3.6 1-2.7 0-5-1.8-5.8-4.3l-3.1 2.4C4.8 19.8 8.1 22 12 22z"/>
          <path fill="#4A90E2" d="M6.2 13.9c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9l-3.1-2.4C2.4 9 2 10.5 2 12s.4 3 1.1 4.3l3.1-2.4z"/>
          <path fill="#FBBC05" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2 8.1 2 4.8 4.2 3.1 7.7l3.1 2.4C7 7.6 9.3 5.8 12 5.8z"/>
        </svg>
        Continue with Google
      `;
  }
}

async function trySupabasePasswordSession(password) {
  const auth = window.GalaxyAuth;
  const email = getAuthorizedAdminEmail();
  if (!window.GDB_CONFIG?.enabled || !auth?.signInWithPassword || !email || !password) {
    return { ok: false, reason: 'unavailable' };
  }

  try {
    await auth.signInWithPassword(email, password);
    return { ok: true, email };
  } catch (error) {
    return {
      ok: false,
      reason: 'failed',
      email,
      message: error?.message || 'Supabase sign-in failed.',
    };
  }
}

function showAuthMessage(message, type = 'error') {
  const err = document.getElementById('authError');
  if (!err) return;
  err.textContent = message;
  err.style.display = 'block';
  err.style.color = type === 'success' ? 'hsl(145,60%,62%)' : '';
  if (type === 'success') {
    setTimeout(() => { err.style.display = 'none'; }, 3200);
  } else {
    setTimeout(() => {
      err.style.display = 'none';
      err.style.color = '';
    }, 4200);
  }
}

function ensureGoogleAuthOption() {
  const authBtn = document.getElementById('authBtn');
  const authCard = authBtn?.closest('.auth-card');
  if (!authBtn || !authCard || authCard.querySelector('#authGoogleBtn')) return;

  const divider = document.createElement('div');
  divider.className = 'auth-divider';
  divider.innerHTML = '<span>or</span>';

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'authGoogleBtn';
  button.className = 'auth-google-btn';
  button.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.8 2.9l3 2.3c1.8-1.7 2.8-4.2 2.8-7.1 0-.7-.1-1.3-.2-2H12z"/>
      <path fill="#34A853" d="M12 22c2.7 0 4.9-.9 6.6-2.5l-3-2.3c-.8.6-1.9 1-3.6 1-2.7 0-5-1.8-5.8-4.3l-3.1 2.4C4.8 19.8 8.1 22 12 22z"/>
      <path fill="#4A90E2" d="M6.2 13.9c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9l-3.1-2.4C2.4 9 2 10.5 2 12s.4 3 1.1 4.3l3.1-2.4z"/>
      <path fill="#FBBC05" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2 8.1 2 4.8 4.2 3.1 7.7l3.1 2.4C7 7.6 9.3 5.8 12 5.8z"/>
    </svg>
    Continue with Google
  `;

  authBtn.insertAdjacentElement('afterend', divider);
  divider.insertAdjacentElement('afterend', button);
}

async function authorizeGoogleSession(result) {
  const auth = window.GalaxyAuth;
  const session = result?.session || auth?.peekSession?.() || auth?.getSession?.();
  if (!session || !auth?.getUser) return { ok: false };

  let user = session.user || null;
  if (!user) {
    try {
      user = await auth.getUser();
    } catch {}
  }

  const allowedEmail = getAuthorizedAdminEmail();
  const userEmail = String(user?.email || '').trim().toLowerCase();
  if (!userEmail) return { ok: false, message: 'Google sign-in did not return an email address.' };
  if (allowedEmail && userEmail !== allowedEmail) {
    try { await auth.signOut(); } catch {}
    clearAdminAuthenticated();
    return {
      ok: false,
      message: `Only ${allowedEmail} can access this admin panel with Google.`,
    };
  }

  return { ok: true, email: userEmail };
}

async function setupAuth() {
  initDefaults();
  const gate  = document.getElementById('authGate');
  const panel = document.getElementById('adminPanel');
  if (!gate||!panel) return;
  applyAdminBranding();
  ensureGoogleAuthOption();
  setPasswordStepState({ enabled: false });

  const auth = window.GalaxyAuth;
  if (auth?.consumeOAuthCallback) {
    try {
      const callback = await auth.consumeOAuthCallback();
      if (callback?.status === 'success') {
        const googleAuth = await authorizeGoogleSession(callback);
        if (googleAuth.ok) {
          setPasswordStepState({ enabled: true, email: googleAuth.email });
          showAuthMessage(`Google verified as ${googleAuth.email}. Enter the admin password to continue.`, 'success');
          document.getElementById('authPassword')?.focus();
          return;
        }
        if (googleAuth.message) {
          showAuthMessage(googleAuth.message);
          window.location.href = getAdminHomeUrl();
          return;
        }
      } else if (callback?.status === 'error' && callback.message) {
        showAuthMessage(callback.message);
      }
    } catch (error) {
      showAuthMessage(error?.message || 'Google sign-in could not be completed.');
    }
  }

  if (auth?.peekSession?.() && auth?.getUser) {
    try {
      const googleAuth = await authorizeGoogleSession({ session: auth.peekSession() });
      if (googleAuth.ok) {
        setPasswordStepState({ enabled: true, email: googleAuth.email });
        if (localStorage.getItem('galaxy_admin_session')==='authenticated') {
          setAdminAuthenticated(gate, panel);
          return;
        }
        document.getElementById('authPassword')?.focus();
        return;
      }
      if (googleAuth.message) {
        showAuthMessage(googleAuth.message);
        window.location.href = getAdminHomeUrl();
        return;
      }
    } catch {}
  }

  if (localStorage.getItem('galaxy_admin_session')==='authenticated') {
    clearAdminAuthenticated();
  }

  const input = document.getElementById('authPassword');
  const btn   = document.getElementById('authBtn');
  const err   = document.getElementById('authError');
  const googleBtn = document.getElementById('authGoogleBtn');

  const tryLogin = async () => {
    const googleAuth = await authorizeGoogleSession({ session: window.GalaxyAuth?.peekSession?.() });
    if (!googleAuth.ok) {
      const message = googleAuth.message || 'Continue with Google using galaxydesignstudio4@gmail.com before entering the admin password.';
      showAuthMessage(message);
      if (googleAuth.message) {
        window.location.href = getAdminHomeUrl();
      }
      return;
    }
    setPasswordStepState({ enabled: true, email: googleAuth.email });
    const stored = getData('galaxy_admin_password') || DEFAULTS.galaxy_admin_password;
    if (input.value===stored) {
      if (err) err.style.display = 'none';
      setAdminAuthenticated(gate, panel);
    } else {
      if (err) {
        err.style.display='block';
        err.textContent = 'Incorrect password. Please try again.';
      }
      input.value=''; input.focus();
      setTimeout(()=>{ if (err) err.style.display='none'; },3000);
    }
  };
  btn?.addEventListener('click', () => { if (!btn.disabled) tryLogin(); });
  input?.addEventListener('keydown', e=>{ if (e.key==='Enter' && !input.disabled) tryLogin(); });
  googleBtn?.addEventListener('click', () => {
    const liveAuth = window.GalaxyAuth;
    if (!window.GDB_CONFIG?.enabled) {
      showAuthMessage('Supabase config is missing in config.js. Add the project URL and anon key first.');
      return;
    }
    if (!liveAuth?.signInWithGoogle) {
      showAuthMessage('Google login is not available because the auth module did not load correctly.');
      return;
    }
    try {
      setPasswordStepState({ enabled: false });
      googleBtn.disabled = true;
      googleBtn.textContent = 'Redirecting to Google...';
      liveAuth.signInWithGoogle({ redirectTo: new URL('index.html', window.location.href).toString() });
    } catch (error) {
      googleBtn.disabled = false;
      googleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.8 2.9l3 2.3c1.8-1.7 2.8-4.2 2.8-7.1 0-.7-.1-1.3-.2-2H12z"/>
          <path fill="#34A853" d="M12 22c2.7 0 4.9-.9 6.6-2.5l-3-2.3c-.8.6-1.9 1-3.6 1-2.7 0-5-1.8-5.8-4.3l-3.1 2.4C4.8 19.8 8.1 22 12 22z"/>
          <path fill="#4A90E2" d="M6.2 13.9c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9l-3.1-2.4C2.4 9 2 10.5 2 12s.4 3 1.1 4.3l3.1-2.4z"/>
          <path fill="#FBBC05" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2 8.1 2 4.8 4.2 3.1 7.7l3.1 2.4C7 7.6 9.3 5.8 12 5.8z"/>
        </svg>
        Continue with Google
      `;
      showAuthMessage(error?.message || 'Google login could not start.');
    }
  });
}

/* ─── Sidebar ─── */
function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebarToggle');
  const logout  = document.getElementById('logoutBtn');
  if (!sidebar) return;
  applyAdminBranding();

  if (localStorage.getItem('sidebar_collapsed')==='1') {
    sidebar.classList.add('collapsed');
    if(toggle) toggle.textContent='▶';
  }
  toggle?.addEventListener('click', () => {
    const col = sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebar_collapsed', col?'1':'0');
    toggle.textContent = col?'▶':'◀';
  });
  logout?.addEventListener('click', async () => {
    if(confirm('Log out of Admin Panel?')) {
      localStorage.removeItem('galaxy_admin_session');
      document.documentElement.classList.remove('is-auth');
      if (window.GalaxyAuth?.signOut) {
        try { await window.GalaxyAuth.signOut(); } catch {}
      }
      window.location.reload();
    }
  });

  // Active link
  const page = window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-item[href],.tab-item[href]').forEach(el=>{
    if((el.getAttribute('href')||'').split('/').pop()===page) el.classList.add('active');
  });

  // Unread messages badge
  const unread = getUnreadCount();
  if (unread>0) {
    document.querySelectorAll('.nav-item[href="messages.html"] .nav-label').forEach(el=>{
      el.insertAdjacentHTML('beforeend',`<span style="background:var(--primary);color:#fff;font-size:10px;padding:1px 6px;border-radius:999px;margin-left:6px;">${unread}</span>`);
    });
  }
}

/* ─── Utils ─── */
function getUnreadCount() {
  const m = getData('galaxy_messages');
  return Array.isArray(m) ? m.filter(x=>!x.read).length : 0;
}
function fmtDate(iso) {
  if(!iso) return '—';
  try { return new Date(iso).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
  catch{return iso;}
}
function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.className=`toast ${type}`; t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity 0.3s';setTimeout(()=>t.remove(),300);},3200);
}
function openModal(html) {
  const ov = document.createElement('div');
  ov.className='modal-overlay'; ov.innerHTML=html;
  document.body.appendChild(ov); document.body.style.overflow='hidden';
  ov.querySelector('.modal-close')?.addEventListener('click',()=>closeModal(ov));
  ov.addEventListener('click', e=>{ if(e.target===ov) closeModal(ov); });
  const esc=e=>{ if(e.key==='Escape'){closeModal(ov);document.removeEventListener('keydown',esc);} };
  document.addEventListener('keydown',esc);
  return ov;
}
function closeModal(ov) {
  if(!ov) return;
  ov.style.opacity='0'; ov.style.transition='opacity 0.18s';
  setTimeout(()=>{ov.remove();document.body.style.overflow='';},180);
}
function confirmDelete(msg, cb) {
  if(confirm(msg||'Delete this item? This cannot be undone.')) cb();
}
function fileToBase64(file) {
  return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=e=>res(e.target.result); r.onerror=rej; r.readAsDataURL(file); });
}
function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function splitMediaSourceMeta(value='') {
  const tokens = String(value || '')
    .split('|')
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
  const base = tokens.find((token) => token === 'manual' || token === 'auto' || token === 'ai') || 'manual';
  return { base, tokens: new Set(tokens) };
}
function getMediaSourceBase(value='') {
  return splitMediaSourceMeta(value).base;
}
function buildMediaSourceMeta(base='manual', options={}) {
  const tokens = new Set([base === 'auto' || base === 'ai' ? base : 'manual']);
  if (options.pinned) tokens.add('pinned');
  if (options.premium) tokens.add('premium');
  return [...tokens].join('|');
}
function mediaHasMeta(item, token) {
  return splitMediaSourceMeta(item?.titleSource || '').tokens.has(String(token || '').toLowerCase());
}
function isPinnedMedia(item) {
  return mediaHasMeta(item, 'pinned');
}
function isPremiumMedia(item) {
  return mediaHasMeta(item, 'premium');
}
function describeMediaAccent(item) {
  if (isPremiumMedia(item)) return 'Premium';
  if (isPinnedMedia(item)) return 'Pinned';
  return '';
}
function comparePrioritizedMedia(a, b, getTimestamp) {
  const aPinned = isPinnedMedia(a) ? 1 : 0;
  const bPinned = isPinnedMedia(b) ? 1 : 0;
  if (aPinned !== bPinned) return bPinned - aPinned;
  const aPremium = isPremiumMedia(a) ? 1 : 0;
  const bPremium = isPremiumMedia(b) ? 1 : 0;
  if (aPremium !== bPremium) return bPremium - aPremium;
  const byDate = (typeof getTimestamp === 'function' ? getTimestamp(b) - getTimestamp(a) : 0);
  if (byDate) return byDate;
  return Number(b?.id || 0) - Number(a?.id || 0);
}
function smartTitleCase(value='') {
  return String(value || '')
    .toLowerCase()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase())
    .replace(/\bUi\b/g, 'UI')
    .replace(/\bUx\b/g, 'UX')
    .replace(/\bAi\b/g, 'AI')
    .replace(/\b3d\b/g, '3D')
    .replace(/\bAdavatar\b/g, 'AdAvatar');
}
function cleanMediaNameCandidate(value='') {
  return String(value || '')
    .replace(/\.[^/.]+$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/[|/\\]+/g, ' ')
    .replace(/\b(copy|edited|final|new|draft|design|upload|file|image|img|photo|picture|screenshot|video|vid|clip)\b/gi, ' ')
    .replace(/\b(whatsapp|telegram|signal|pixellab|canva)\b/gi, ' ')
    .replace(/\b\d{5,}\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function isWeakMediaTitle(value='') {
  const normalized = cleanMediaNameCandidate(value).toLowerCase();
  if (!normalized) return true;
  return /^(img|image|photo|picture|video|clip|gallery item|untitled|file)$/i.test(normalized)
    || /^dsc\s*\d+/i.test(normalized)
    || /^pxl\s*\d+/i.test(normalized)
    || normalized.length < 3;
}
function fallbackMediaTitle({ fileName = '', url = '', type = 'image', context = 'gallery' } = {}) {
  let candidate = cleanMediaNameCandidate(fileName);
  if (!candidate && url) {
    try {
      const parsed = new URL(url, window.location.href);
      candidate = cleanMediaNameCandidate(decodeURIComponent(parsed.pathname.split('/').filter(Boolean).pop() || parsed.hostname.replace(/^www\./i, '')));
    } catch {
      candidate = cleanMediaNameCandidate(url);
    }
  }
  if (candidate) {
    const contextual = inferMediaTitleFromKeywords(`${candidate} ${url}`, { type, context });
    if (contextual && !isWeakMediaTitle(contextual)) return contextual.slice(0, 72);
    return smartTitleCase(candidate).slice(0, 72);
  }
  if (context === 'adavatar') return type === 'video' ? 'AdAvatar Video' : 'AdAvatar Portrait';
  if (type === 'link') return 'Featured Project';
  return type === 'video' ? 'Promo Video' : 'Gallery Feature';
}
async function smartMediaTitle({ file = null, url = '', thumbUrl = '', type = 'image', currentTitle = '', detectedTitle = '', context = 'gallery' } = {}) {
  const existing = String(currentTitle || '').trim();
  if (existing && !isWeakMediaTitle(existing)) return existing;

  if (typeof window.__GDS_SMART_TITLE__ === 'function') {
    try {
      const aiTitle = await window.__GDS_SMART_TITLE__({ file, url, thumbUrl, type, currentTitle: existing, detectedTitle, context });
      const cleanedAiTitle = smartTitleCase(cleanMediaNameCandidate(aiTitle));
      if (cleanedAiTitle && !isWeakMediaTitle(cleanedAiTitle)) return cleanedAiTitle.slice(0, 72);
    } catch (error) {
      console.warn('[Admin] Smart title hook failed:', error?.message || error);
    }
  }

  const candidates = [
    detectedTitle,
    file?.name || '',
    url,
    thumbUrl,
    existing,
  ];
  const detectedTextTitle = inferTitleFromDetectedText(detectedTitle, candidates.join(' '), { type, context });
  if (detectedTextTitle && !isWeakMediaTitle(detectedTextTitle)) return detectedTextTitle.slice(0, 72);
  const keywordTitle = inferMediaTitleFromKeywords(candidates.join(' '), { type, context });
  if (keywordTitle && !isWeakMediaTitle(keywordTitle)) return keywordTitle.slice(0, 72);
  for (const candidate of candidates) {
    const cleaned = smartTitleCase(cleanMediaNameCandidate(candidate));
    if (cleaned && !isWeakMediaTitle(cleaned)) return cleaned.slice(0, 72);
  }
  return fallbackMediaTitle({ fileName: file?.name || '', url: url || thumbUrl, type, context });
}

function appendTitleDescriptor(base = '', descriptor = '') {
  const cleanBase = smartTitleCase(cleanMediaNameCandidate(base)).replace(new RegExp(`\\b${descriptor}\\b$`, 'i'), '').trim();
  if (!cleanBase) return '';
  if (!descriptor) return cleanBase.slice(0, 72);
  return `${cleanBase} ${descriptor}`.trim().slice(0, 72);
}

function inferTitleFromDetectedText(detectedText = '', hintSource = '', { type = 'image', context = 'gallery' } = {}) {
  const raw = String(detectedText || '').trim();
  if (!raw) return '';
  const parts = raw
    .split(/\r?\n/)
    .map((part) => smartTitleCase(cleanMediaNameCandidate(part)))
    .filter((part) => part && !isWeakMediaTitle(part));
  const best = parts.find((part) => /\s/.test(part)) || parts[0] || '';
  if (!best) return '';

  const combinedHint = `${raw} ${hintSource}`;
  if (/\blogo\b/i.test(combinedHint)) return appendTitleDescriptor(best, 'Logo');
  if (type === 'image') return appendTitleDescriptor(best, context === 'adavatar' ? 'Portrait' : 'Design');
  if (type === 'video') return appendTitleDescriptor(best, context === 'adavatar' ? 'Promo' : 'Video');
  return best.slice(0, 72);
}

function inferMediaTitleFromKeywords(source = '', { type = 'image', context = 'gallery' } = {}) {
  const haystack = cleanMediaNameCandidate(source).toLowerCase();
  if (!haystack) return '';

  const matches = [
    ['skincare', 'Skincare Campaign'],
    ['cosmetic', 'Beauty Campaign'],
    ['beauty', 'Beauty Campaign'],
    ['restaurant', 'Restaurant Promo'],
    ['food', 'Food Campaign'],
    ['fashion', 'Fashion Campaign'],
    ['real estate', 'Real Estate Campaign'],
    ['property', 'Property Campaign'],
    ['launch', 'Product Launch'],
    ['product', 'Product Campaign'],
    ['brand kit', 'Brand Kit'],
    ['branding', 'Brand Identity'],
    ['logo', 'Logo Design'],
    ['flyer', 'Flyer Design'],
    ['poster', 'Poster Design'],
    ['banner', 'Banner Campaign'],
    ['social', 'Social Media Campaign'],
    ['instagram', 'Social Media Campaign'],
    ['youtube', type === 'video' ? 'YouTube Promo' : 'YouTube Cover'],
    ['reel', 'Promo Reel'],
    ['commercial', 'Commercial Edit'],
    ['interior', 'Interior Visual'],
    ['cad', 'CAD Design'],
    ['ui', 'UI Design'],
    ['ux', 'UX Design'],
    ['website', 'Website Showcase'],
    ['avatar', context === 'adavatar' ? (type === 'video' ? 'AdAvatar Promo' : 'AdAvatar Portrait') : 'Avatar Campaign'],
    ['adavatar', context === 'adavatar' ? (type === 'video' ? 'AdAvatar Promo' : 'AdAvatar Portrait') : 'AdAvatar Feature'],
  ].filter(([needle]) => haystack.includes(needle));

  const uniqueLabels = [];
  matches.forEach(([, label]) => {
    if (!uniqueLabels.includes(label)) uniqueLabels.push(label);
  });
  if (!uniqueLabels.length) return '';
  if (uniqueLabels.length === 1) return uniqueLabels[0];

  const primary = uniqueLabels[0];
  const secondary = uniqueLabels[1]
    .replace(/\s+(Campaign|Design|Promo|Portrait|Showcase|Feature|Edit|Visual)$/i, '')
    .trim();
  const combined = `${primary} ${secondary}`.trim();
  return smartTitleCase(combined).slice(0, 72);
}

window.getMediaSourceBase = getMediaSourceBase;
window.buildMediaSourceMeta = buildMediaSourceMeta;
window.isPinnedMedia = isPinnedMedia;
window.isPremiumMedia = isPremiumMedia;
window.describeMediaAccent = describeMediaAccent;
window.comparePrioritizedMedia = comparePrioritizedMedia;
window.isWeakMediaTitle = isWeakMediaTitle;
window.smartMediaTitle = smartMediaTitle;
window.fallbackMediaTitle = fallbackMediaTitle;

/* ─── Sidebar nav shared HTML ─── */
function sidebarHTML(activePage) {
  const pages=[
    {href:'index.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,label:'Dashboard'},
    {href:'services.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,label:'Services'},
    {href:'portfolio.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,label:'Portfolio'},
    {href:'gallery.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,label:'Gallery'},
    {href:'testimonials.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,label:'Testimonials'},
    {href:'about.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,label:'About / Owner'},
    {href:'team.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`,label:'Team Members'},
    {href:'adavatar.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,label:'AdAvatar Gallery'},
    {href:'notifications.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,label:'Notifications'},
    {href:'messages.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,label:'Messages'},
    {href:'settings.html',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,label:'Settings'},
  ];
  return pages.map(p=>`<a class="nav-item${p.href===activePage?' active':''}" href="${p.href}"><span class="nav-icon">${p.icon}</span><span class="nav-label">${p.label}</span></a>`).join('');
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', async ()=>{ await setupAuth(); setupSidebar(); });

