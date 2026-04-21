/* ═══════════════════════════════════════════════════
   GALAXY DESIGN STUDIO — Shared JS v3
   Includes: Nav, Animations, Lightbox, Toast,
             Ctrl+Shift+A Admin Shortcut, SVG icons
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar     = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
      scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ── Mobile menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
      if (navbar && !navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  /* ── Scroll to top ── */
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Intersection Observer ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--delay') || '0ms';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

  /* ── Active nav link ── */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href') || '';
    const page = href.split('/').pop();
    const curr = path.split('/').pop() || 'index.html';
    if (page === curr || (page === 'index.html' && (curr === '' || curr === '/'))) {
      link.classList.add('active');
    }
  });

  /* ── Emoji → SVG upgrade for service icons ──
     Replaces any remaining emoji text with matching SVG
     for cross-platform consistency (matches homepage style) */
  const emojiMap = {
    '🎨': 'graphic', '📣': 'ad', '🏷️': 'logo', '🎬': 'video',
    '📦': 'animation3d', '👤': 'avatar', '🖥️': 'uiux',
    '✏️': 'cad', '✨': 'sparkle', '🌌': 'sparkle',
  };
  if (typeof ICONS !== 'undefined') {
    document.querySelectorAll('.service-icon-emoji').forEach(el => {
      const emoji = el.textContent.trim();
      const name  = emojiMap[emoji];
      if (name && ICONS[name]) el.innerHTML = ICONS[name];
    });
  }

  /* ══════════════════════════════════════════
     🔐 CTRL + SHIFT + A  →  Admin Panel
     Works on every public page
  ══════════════════════════════════════════ */
  let _adminKeys = { ctrl: false, shift: false };
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      // Already authenticated? Jump straight in
      if (localStorage.getItem('galaxy_admin_session') === 'authenticated') {
        const loc = window.location.pathname;
        window.location.href = loc.includes('/admin/') ? 'index.html' : 'admin/index.html';
      } else {
        showAdminPrompt();
      }
    }
  });

  function showAdminPrompt() {
    // Remove any existing prompt
    document.getElementById('_adminPrompt')?.remove();

    const overlay = document.createElement('div');
    overlay.id = '_adminPrompt';
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:99999;
      display:flex;align-items:center;justify-content:center;padding:24px;
      animation:fadeInUp 0.25s ease;
    `;
    overlay.innerHTML = `
      <div style="
        background:hsl(260,15%,8%);border:1px solid hsl(260,15%,18%);
        border-radius:20px;padding:44px 40px;width:100%;max-width:380px;
        text-align:center;position:relative;
        box-shadow:0 0 80px hsl(250 80% 65% / 0.15),0 32px 64px rgba(0,0,0,0.5);
      ">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,hsl(250 80% 65% / 0.5),transparent);border-radius:20px 20px 0 0;"></div>
        <div style="
          width:56px;height:56px;border-radius:14px;margin:0 auto 18px;
          background:linear-gradient(135deg,hsl(250,80%,65%),hsl(200,100%,60%));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 28px hsl(250 80% 65% / 0.5);
        ">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;margin-bottom:6px;color:hsl(0,0%,95%);">Admin Access</h2>
        <p style="font-size:13px;color:hsl(260,5%,55%);margin-bottom:28px;">Enter your password to access the admin panel.</p>
        <input id="_adminPwInput" type="password" placeholder="••••••••"
          style="
            width:100%;background:hsl(260,20%,5%);border:1px solid hsl(260,15%,16%);
            border-radius:10px;padding:12px 16px;color:hsl(0,0%,95%);font-size:16px;
            outline:none;text-align:center;letter-spacing:6px;margin-bottom:14px;
            transition:border-color 0.2s,box-shadow 0.2s;font-family:inherit;
          "
        >
        <button id="_adminPwBtn" style="
          width:100%;padding:13px;background:hsl(250,80%,65%);color:#fff;border:none;
          border-radius:999px;font-family:'Space Grotesk',sans-serif;font-weight:700;
          font-size:15px;cursor:pointer;transition:filter 0.2s;
          box-shadow:0 0 24px hsl(250 80% 65% / 0.4);
        ">Enter Admin Panel →</button>
        <p id="_adminPwErr" style="
          display:none;margin-top:12px;color:hsl(0,70%,65%);font-size:13px;
          padding:8px 12px;background:hsl(0 70% 55% / 0.1);
          border:1px solid hsl(0 70% 55% / 0.25);border-radius:8px;
        ">Incorrect password. Please try again.</p>
        <button id="_adminClose" style="
          position:absolute;top:14px;right:14px;width:30px;height:30px;
          border-radius:8px;background:transparent;border:1px solid hsl(260,15%,18%);
          color:hsl(260,5%,55%);cursor:pointer;font-size:16px;display:flex;
          align-items:center;justify-content:center;transition:background 0.2s;
        ">✕</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const input  = overlay.querySelector('#_adminPwInput');
    const btn    = overlay.querySelector('#_adminPwBtn');
    const err    = overlay.querySelector('#_adminPwErr');
    const closeB = overlay.querySelector('#_adminClose');

    // Focus & style
    setTimeout(() => input.focus(), 80);
    input.addEventListener('focus', () => {
      input.style.borderColor = 'hsl(250,80%,65%)';
      input.style.boxShadow   = '0 0 0 3px hsl(250 80% 65% / 0.12)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = 'hsl(260,15%,16%)';
      input.style.boxShadow   = 'none';
    });
    btn.addEventListener('mouseenter', () => btn.style.filter = 'brightness(1.15)');
    btn.addEventListener('mouseleave', () => btn.style.filter = '');

    const tryLogin = () => {
      const stored = localStorage.getItem('galaxy_admin_password') || 'galaxy2024';
      if (input.value === stored) {
        localStorage.setItem('galaxy_admin_session', 'authenticated');
        const loc = window.location.pathname;
        window.location.href = loc.includes('/admin/') ? 'index.html' : 'admin/index.html';
      } else {
        err.style.display = 'block';
        input.value = '';
        input.focus();
        input.style.borderColor = 'hsl(0,70%,55%)';
        setTimeout(() => { err.style.display = 'none'; input.style.borderColor = 'hsl(260,15%,16%)'; }, 3000);
      }
    };

    btn.addEventListener('click', tryLogin);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

    const close = () => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.2s';
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 200);
    };
    closeB.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  }

  /* ── Toast ── */
  window.showToast = (msg, type = 'success') => {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 3200);
  };

  /* ── Lightbox ── */
  window.openLightbox = (items, index = 0) => {
    let current = index;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const render = (i) => {
      const item = items[i];
      const isVideo = item.type === 'video';
      const videoEmbed = item.url
        ? (item.url.includes('youtube') || item.url.includes('youtu.be')
            ? `<iframe src="${item.url.replace('watch?v=','embed/')}" width="800" height="450" frameborder="0" allowfullscreen style="border-radius:12px;max-width:90vw;max-height:70vh;"></iframe>`
            : `<video src="${item.url}" controls style="max-width:90vw;max-height:70vh;border-radius:12px;"></video>`)
        : '';

      overlay.innerHTML = `
        <button class="lightbox-close" id="lbClose">✕</button>
        ${items.length > 1 ? `<button class="lightbox-nav lightbox-prev" id="lbPrev">&#8592;</button>` : ''}
        <div class="lightbox-content">
          ${isVideo ? videoEmbed : `<img src="${item.src||item.url||''}" alt="${item.title||''}">`}
          <div class="lightbox-info">
            ${item.title ? `<strong>${item.title}</strong>` : ''}
            ${item.desc ? `<span>${item.desc}</span>` : ''}
            ${items.length > 1 ? `<span style="color:hsl(260,5%,40%);font-size:12px;">${i+1} / ${items.length}</span>` : ''}
          </div>
        </div>
        ${items.length > 1 ? `<button class="lightbox-nav lightbox-next" id="lbNext">&#8594;</button>` : ''}
      `;
    };

    render(current);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.id === 'lbClose') close();
      if (e.target.id === 'lbPrev') { current = (current - 1 + items.length) % items.length; render(current); }
      if (e.target.id === 'lbNext') { current = (current + 1) % items.length; render(current); }
    });

    function keyHandler(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft')  { current = (current - 1 + items.length) % items.length; render(current); }
      if (e.key === 'ArrowRight') { current = (current + 1) % items.length; render(current); }
    }
    document.addEventListener('keydown', keyHandler);

    function close() {
      overlay.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', keyHandler);
    }
  };



});
