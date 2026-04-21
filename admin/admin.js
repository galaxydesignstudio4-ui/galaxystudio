/* ═══════════════════════════════════════════════════
   GALAXY DESIGN STUDIO — Admin JS v2
   ═══════════════════════════════════════════════════ */

const DEFAULTS = {
  galaxy_admin_password: 'galaxy2024',
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
  galaxy_portfolio: [
    {id:1,title:'AdAvatar — Brand Promo',category:'adavatar',client:'Premium Client',desc:'3D Pixar-style avatar ad for social media.',premium:true,featured:true,thumb:''},
    {id:2,title:'Modern Logo Suite',category:'logos',client:'StartSmart Ghana',desc:'Complete logo package with multiple variations.',premium:false,featured:true,thumb:''},
    {id:3,title:'Product 3D Visualization',category:'3d',client:'Kwame Industries',desc:'Photorealistic 3D product renders.',premium:false,featured:false,thumb:''},
    {id:4,title:'E-Commerce UI Redesign',category:'uiux',client:'Serwaa Online Store',desc:'Full UI/UX overhaul.',premium:true,featured:true,thumb:''},
  ],
  galaxy_gallery: [
    {id:1,type:'image',title:'Vibrant Poster Design',desc:'Music festival poster.',thumb:'',icon:'🎨'},
    {id:2,type:'video',title:'TV Commercial Edit',desc:'30-second brand commercial.',url:'https://youtube.com/watch?v=example',thumb:'',icon:'🎬'},
    {id:3,type:'image',title:'Minimalist Logo Collection',desc:'Tech startup logos.',thumb:'',icon:'🏷️'},
    {id:4,type:'link',title:'UI Design Showcase',desc:'Live redesign project.',url:'https://example.com',thumb:'',icon:'🖥️'},
  ],
  galaxy_adavatar: [
    {id:1,type:'image',title:'Avatar — Skincare Brand',desc:'Pixar-style character.',thumb:'',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`},
    {id:2,type:'video',title:'Product Launch Ad',desc:'Talking avatar demo.',url:'https://youtube.com/watch?v=example3',thumb:'',icon:'🎬'},
    {id:3,type:'image',title:'Fashion Brand Avatar',desc:'Branded character.',thumb:'',icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`},
  ],
  galaxy_testimonials: [
    {id:1,name:'Kofi Asante',company:'Asante Tech Solutions',quote:'Galaxy Design Studio transformed our brand completely. Emmanuel is a creative genius!',rating:5,avatarUrl:''},
    {id:2,name:'Ama Mensah',company:'StartSmart Ghana',quote:'The AdAvatar service is incredible. Our engagement went up 300%!',rating:5,avatarUrl:''},
    {id:3,name:'Ernest Kwame',company:'Kwame Industries',quote:'The 3D animation was breathtaking. Top-tier work.',rating:5,avatarUrl:''},
  ],
  galaxy_team: [],
  galaxy_messages: [],
  galaxy_notifications: [
    {id:1,title:'New AdAvatar Service',message:'We now offer Pixar-style 3D avatar ads for your brand!',type:'New Service',active:true},
    {id:2,title:'Affordable Pricing',message:'All services are very affordable. Contact us for a free quote!',type:'Promotion',active:true},
  ],
  galaxy_settings: {
    studioName:'Galaxy Design Studio',tagline:'Creative & Digital Advertisement Studio',
    email:'galaxydesignstudio4@gmail.com',phone:'055-688-1003',
    location:'Tema, Accra, Ghana',facebook:'https://web.facebook.com/profile.php?id=61562678010128',
    whatsapp:'233556881003',novatech:'#',qrUrl:'',logo:'',
  },
  galaxy_about: {
    name:'Emmanuel Yirenkyi-Amoyaw',
    role:'Owner & Creative Director · Galaxy Design Studio',
    bio:'Emmanuel is a creative and digital advertisement specialist providing graphic design, video editing, 3D animation, CAD & UI/UX design, avatar-style ads, Pixar-style animations, logo and branding, and digital promotion content. Special creator of AdAvatar — 3D animated avatar advertisements for modern business promotion.',
    facebook:'https://web.facebook.com/profile.php?id=61562678010128',
    youtube1:'https://youtube.com/@epictales-q6n',youtube2:'https://youtube.com/@biblesparksbs',avatar:'',
  },
};

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
}

/* ─── Auth ─── */
function setupAuth() {
  initDefaults();
  const gate  = document.getElementById('authGate');
  const panel = document.getElementById('adminPanel');
  if (!gate||!panel) return;

  if (localStorage.getItem('galaxy_admin_session')==='authenticated') {
    gate.style.display='none'; panel.classList.add('visible'); return;
  }

  const input = document.getElementById('authPassword');
  const btn   = document.getElementById('authBtn');
  const err   = document.getElementById('authError');

  const tryLogin = () => {
    const stored = getData('galaxy_admin_password') || DEFAULTS.galaxy_admin_password;
    if (input.value===stored) {
      localStorage.setItem('galaxy_admin_session','authenticated');
      gate.style.display='none'; panel.classList.add('visible');
    } else {
      err.style.display='block'; input.value=''; input.focus();
      setTimeout(()=>err.style.display='none',3000);
    }
  };
  btn?.addEventListener('click', tryLogin);
  input?.addEventListener('keydown', e=>e.key==='Enter'&&tryLogin());
}

/* ─── Sidebar ─── */
function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebarToggle');
  const logout  = document.getElementById('logoutBtn');
  if (!sidebar) return;

  if (localStorage.getItem('sidebar_collapsed')==='1') {
    sidebar.classList.add('collapsed');
    if(toggle) toggle.textContent='▶';
  }
  toggle?.addEventListener('click', () => {
    const col = sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebar_collapsed', col?'1':'0');
    toggle.textContent = col?'▶':'◀';
  });
  logout?.addEventListener('click', () => {
    if(confirm('Log out of Admin Panel?')) {
      localStorage.removeItem('galaxy_admin_session');
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
document.addEventListener('DOMContentLoaded', ()=>{ setupAuth(); setupSidebar(); });
