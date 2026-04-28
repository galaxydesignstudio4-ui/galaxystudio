/* ═══════════════════════════════════════════════════
   Galaxy Studio — Shared JS v3
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
      let stored = 'admin123';
      try {
        const raw = localStorage.getItem('galaxy_admin_password');
        if (raw !== null) {
          stored = JSON.parse(raw);
        }
      } catch {}
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

  /* ── Lightbox / Carousel ── */
  function defaultLightboxMedia(item) {
    if (!item) return '';
    if (item.type === 'video' && item.url) {
      if (item.url.includes('youtube') || item.url.includes('youtu.be')) {
        return `<div class="lightbox-media-frame"><iframe src="${item.url.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen title="${escHtml(item.title || 'Video')}"></iframe></div>`;
      }
      return `<video src="${escHtml(item.url)}" controls playsinline controlslist="nodownload noplaybackrate noremoteplayback" disablepictureinpicture disableremoteplayback data-protected-media="true"></video>`;
    }
    return `<img src="${escHtml(item.src || item.url || '')}" alt="${escHtml(item.title || '')}" draggable="false" data-protected-media="true">`;
  }

  function applyDynamicLightboxState(scope) {
    scope.querySelectorAll('img, video').forEach((media) => {
      media.setAttribute('draggable', 'false');
      media.setAttribute('data-protected-media', 'true');
      media.addEventListener('contextmenu', (event) => event.preventDefault());
      media.addEventListener('dragstart', (event) => event.preventDefault());
    });
    scope.querySelectorAll('video').forEach((video) => {
      video.setAttribute('controlslist', 'nodownload noplaybackrate noremoteplayback');
      video.setAttribute('disablepictureinpicture', '');
      video.setAttribute('disableremoteplayback', '');
    });

    const videoEl = scope.querySelector('.lightbox-video');
    const videoWrap = scope.querySelector('[data-lightbox-video-wrap]');
    if (!videoEl || !videoWrap) return;

    const syncOrientation = () => {
      if (videoEl.videoWidth && videoEl.videoHeight && videoEl.videoHeight > videoEl.videoWidth) {
        videoWrap.classList.add('portrait');
      } else {
        videoWrap.classList.remove('portrait');
      }
    };

    videoEl.addEventListener('loadedmetadata', syncOrientation, { once: true });
    syncOrientation();
  }

  window.openCarouselLightbox = ({
    items = [],
    index = 0,
    getMediaHtml = defaultLightboxMedia,
    getTitle = (item) => item?.title || '',
    getDesc = (item) => item?.desc || '',
    getActionHtml = () => '',
    swipeHint = 'Swipe or use arrows'
  } = {}) => {
    if (!Array.isArray(items) || !items.length) return;

    let current = Math.max(0, Math.min(index, items.length - 1));
    let touchStartX = 0;
    let touchDeltaX = 0;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const render = (i) => {
      const item = items[i] || {};
      const mediaHtml = getMediaHtml(item, i) || defaultLightboxMedia(item);
      const title = escHtml(getTitle(item, i) || '');
      const desc = escHtml(getDesc(item, i) || '');
      const actionHtml = getActionHtml(item, i) || '';

      overlay.innerHTML = `
        <button class="lightbox-close" type="button" data-lightbox-close aria-label="Close viewer">✕</button>
        ${items.length > 1 ? '<button class="lightbox-nav lightbox-prev" type="button" data-lightbox-prev aria-label="Previous item">&#8592;</button>' : ''}
        <div class="lightbox-content">
          <div class="lightbox-panel">
            <div class="lightbox-media-shell">
              <div class="lightbox-media">${mediaHtml}</div>
            </div>
            <div class="lightbox-meta">
              <div class="lightbox-copy">
                ${title ? `<strong>${title}</strong>` : ''}
                ${desc ? `<span>${desc}</span>` : ''}
              </div>
              <div class="lightbox-side">
                ${items.length > 1 ? `<div class="lightbox-counter">${i + 1} / ${items.length}</div>` : ''}
                <div class="lightbox-hint">${escHtml(items.length > 1 ? swipeHint : 'Tap outside or press Escape')}</div>
              </div>
            </div>
            ${actionHtml ? `<div class="lightbox-actions">${actionHtml}</div>` : ''}
          </div>
        </div>
        ${items.length > 1 ? '<button class="lightbox-nav lightbox-next" type="button" data-lightbox-next aria-label="Next item">&#8594;</button>' : ''}
      `;

      applyDynamicLightboxState(overlay);
    };

    const navigate = (step) => {
      if (items.length < 2) return;
      current = (current + step + items.length) % items.length;
      render(current);
    };

    const keyHandler = (e) => {
      const lowerKey = String(e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (lowerKey === 's' || lowerKey === 'p')) {
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1 || items.length < 2) return;
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
    };

    const handleTouchMove = (e) => {
      if (!touchStartX || e.touches.length !== 1) return;
      touchDeltaX = e.touches[0].clientX - touchStartX;
    };

    const handleTouchEnd = () => {
      if (Math.abs(touchDeltaX) > 52) {
        navigate(touchDeltaX > 0 ? -1 : 1);
      }
      touchStartX = 0;
      touchDeltaX = 0;
    };

    const close = () => {
      overlay.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', keyHandler);
      overlay.removeEventListener('touchstart', handleTouchStart);
      overlay.removeEventListener('touchmove', handleTouchMove);
      overlay.removeEventListener('touchend', handleTouchEnd);
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-lightbox-close]')) {
        close();
        return;
      }
      if (e.target.closest('[data-lightbox-prev]')) {
        navigate(-1);
        return;
      }
      if (e.target.closest('[data-lightbox-next]')) {
        navigate(1);
      }
    });

    overlay.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.lightbox-media, img, video, iframe')) e.preventDefault();
    });

    overlay.addEventListener('dragstart', (e) => {
      if (e.target.closest('img, video')) e.preventDefault();
    });

    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchmove', handleTouchMove, { passive: true });
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true });

    render(current);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', keyHandler);
  };

  window.openLightbox = (items, index = 0) => {
    window.openCarouselLightbox({ items, index });
  };

  const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function normalizeExternalUrl(value = '') {
    const raw = String(value || '').trim();
    if (!raw || raw === '#') return '#';
    if (/^(https?:|mailto:|tel:|whatsapp:)/i.test(raw)) return raw;
    if (/^\/\//.test(raw)) return `https:${raw}`;
    return `https://${raw.replace(/^\/+/, '')}`;
  }

  function escHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function studioMarkup(name) {
    const parts = String(name || 'Galaxy Studio').trim().split(/\s+/).filter(Boolean);
    if (parts.length <= 1) return escHtml(parts[0] || 'Galaxy Studio');
    return `${escHtml(parts[0])} <span class="gradient-text">${escHtml(parts.slice(1).join(' '))}</span>`;
  }

  function initials(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] || 'G') + (parts[1]?.[0] || '');
  }

  function normalizeServiceIconName(name = '') {
    const rawValue = String(name || '').trim();
    const value = rawValue
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&amp;/gi, '&');
    if (!value) return '';
    const lower = value.toLowerCase();
    const emojiMap = {
      '🎨': 'graphic',
      '📣': 'ad',
      '🏷️': 'logo',
      '🎬': 'video',
      '📦': 'animation3d',
      '👤': 'avatar',
      '🖥️': 'uiux',
      '✏️': 'cad',
      '✨': 'promotion',
      '⚙️': 'promotion',
    };
    if (emojiMap[value]) return emojiMap[value];
    if (typeof ICONS !== 'undefined' && ICONS[value]) return value;
    if (lower.startsWith('<svg') && lower.includes('circle cx="12" cy="8" r="4"')) return 'avatar';
    if (lower.startsWith('<svg') && lower.includes('rect x="2" y="3"')) return 'uiux';
    if (lower.startsWith('<svg') && lower.includes('m2 3h6a4')) return 'cad';
    if (lower.startsWith('<svg') && lower.includes('polygon points="12 2 15.09 8.26')) return 'promotion';
    return value;
  }

  function renderIcon(name) {
    const normalized = normalizeServiceIconName(name);
    if (typeof ICONS !== 'undefined' && ICONS[normalized]) return ICONS[normalized];
    if (String(normalized).trim().toLowerCase().startsWith('<svg')) return normalized;
    return `<span>${escHtml(normalized || '✦')}</span>`;
  }

  function applyStandardLogoChrome() {
    document.querySelectorAll('.nav-logo .logo-icon, .footer-logo .logo-icon').forEach((el) => {
      const isFooterLogo = Boolean(el.closest('.footer-logo'));
      const hasCustomLogo = el.classList.contains('has-custom-logo');
      el.style.width = isFooterLogo ? '34px' : '38px';
      el.style.height = isFooterLogo ? '34px' : '38px';
      el.style.borderRadius = hasCustomLogo ? '0' : '10px';
      el.style.background = hasCustomLogo
        ? 'transparent'
        : 'linear-gradient(135deg, hsl(250,80%,65%), hsl(220,80%,55%), hsl(200,100%,60%))';
      el.style.border = hasCustomLogo ? 'none' : '1px solid hsl(250 80% 72% / 0.34)';
      el.style.boxShadow = hasCustomLogo ? 'none' : '0 0 16px hsl(250 80% 65% / 0.5)';
      el.style.boxSizing = 'border-box';
      el.style.flexShrink = '0';
      el.style.overflow = hasCustomLogo ? 'visible' : 'hidden';
      el.style.padding = '0';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
    });
    document.querySelectorAll('.nav-logo .logo-icon img, .footer-logo .logo-icon img').forEach((img) => {
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.style.padding = '0';
      img.style.borderRadius = '0';
      img.loading = 'eager';
      img.decoding = 'async';
      img.fetchPriority = 'high';
    });
  }

  function featureListForService(service) {
    const iconName = normalizeServiceIconName(service.icon);
    const map = {
      graphic: ['Poster & Flyer Design', 'Social Media Graphics', 'Print & Digital Assets', 'Brand Consistency'],
      ad: ['Digital Ads', 'Campaign Visuals', 'Promo Materials', 'Audience-Focused Concepts'],
      logo: ['Logo Concepts', 'Brand Identity', 'Merch Design', 'Brand Guidelines'],
      video: ['Commercial Editing', 'Social Media Cuts', 'Color Grading', 'Motion Graphics'],
      animation3d: ['3D Product Renders', 'Animated Ads', 'Visual Effects', 'Presentation Visuals'],
      avatar: ['Talking Avatar Ads', 'Product Promotion', 'Social Media Ready', 'Premium Storytelling'],
      uiux: ['Web Interfaces', 'App Design', 'User Flows', 'Conversion-Focused Layouts'],
      cad: ['2D Drafting', '3D Modeling', 'Technical Drawings', 'Production-Ready Files'],
      promotion: ['Social Media Content', 'Digital Marketing Assets', 'Creative Campaign Support', 'Brand Promotion'],
    };
    return map[iconName] || ['Custom Concepts', 'Professional Delivery', 'Affordable Pricing', 'Brand-Focused Execution'];
  }

  function categoryLabel(category) {
    const map = {
      logos: 'Logos & Branding',
      videos: 'Videos',
      '3d': '3D Animation',
      uiux: 'UI/UX Design',
      graphic: 'Graphic Design',
      cad: 'CAD Design',
      branding: 'Branding',
      adavatar: 'AdAvatar',
      ad: 'Advertisement',
    };
    return map[category] || category || 'Project';
  }

  function categoryIcon(category) {
    const map = {
      logos: 'logo',
      videos: 'video',
      '3d': 'animation3d',
      uiux: 'uiux',
      graphic: 'graphic',
      cad: 'cad',
      branding: 'promotion',
      adavatar: 'avatar',
      ad: 'ad',
    };
    return map[category] || 'graphic';
  }

  function normalizePartnerColor(value = '', fallback = '#7a5cff') {
    const raw = String(value || '').trim();
    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(raw) ? raw : fallback;
  }

  function normalizePartners(settings = {}) {
    const source = Array.isArray(settings?.partners) ? settings.partners : [];
    const partners = source
      .map((entry, index) => {
        const name = String(entry?.name || '').trim();
        const href = normalizeExternalUrl(entry?.url || '');
        if (!name || href === '#') return null;
        return {
          id: Number(entry?.id) || index + 1,
          name,
          url: href,
          kind: String(entry?.kind || 'partner').toLowerCase() === 'collaborator' ? 'collaborator' : 'partner',
          premium: Boolean(entry?.premium),
          color: normalizePartnerColor(entry?.color),
        };
      })
      .filter(Boolean);

    if (!partners.length) {
      const legacyHref = normalizeExternalUrl(settings?.novatech || '#');
      if (legacyHref !== '#') {
        partners.push({
          id: 1,
          name: 'Nova Tech',
          url: legacyHref,
          kind: 'partner',
          premium: false,
          color: '#7a5cff',
        });
      }
    }

    return partners;
  }

  function renderFooterPartners(settings = {}) {
    const partners = normalizePartners(settings);
    const footerBottom = document.querySelector('footer .footer-bottom');
    if (!footerBottom) return;

    let partnerLine = footerBottom.querySelector('[data-footer-partners]') || [...footerBottom.querySelectorAll('p')].find((item) => /collaboration|partner/i.test(item.textContent || ''));
    if (!partnerLine) {
      partnerLine = document.createElement('p');
      footerBottom.appendChild(partnerLine);
    }
    partnerLine.setAttribute('data-footer-partners', 'true');

    if (!partners.length) {
      partnerLine.innerHTML = '';
      partnerLine.style.display = 'none';
      return;
    }

    partnerLine.style.display = '';
    partnerLine.innerHTML = partners.map((entry) => `
      <a href="${escHtml(entry.url)}" target="_blank" rel="noopener noreferrer" class="footer-partner-link" style="--partner-accent:${escHtml(entry.color)};">
        ${escHtml(entry.name)}
      </a>
    `).join('<span class="footer-partner-sep">•</span>');

    if (!footerBottom.querySelector('.footer-partners-label')) {
      partnerLine.insertAdjacentHTML('afterbegin', '<span class="footer-partners-label">Partners &amp; collaborators: </span>');
    }
  }

  function applyPublicBranding(settings, about) {
    const bootSettings = window.__GDS_BOOT_SETTINGS__ || {};
    const studioName = settings?.studioName || bootSettings.studioName || 'Galaxy Studio';
    const rawLogoUrl = settings?.logo || bootSettings.logo || '';
    const normalizedLogo = rawLogoUrl === 'logo.png' ? 'logo-512.png' : rawLogoUrl;
    const logoUrl = typeof window.__resolveAssetUrl__ === 'function'
      ? window.__resolveAssetUrl__(normalizedLogo)
      : normalizedLogo;
    document.querySelectorAll('.logo-text').forEach((el) => {
      el.innerHTML = studioMarkup(studioName);
    });
    document.querySelectorAll('.footer-logo span').forEach((el) => {
      if (el.querySelector('.gradient-text')) el.innerHTML = studioMarkup(studioName);
    });

    document.querySelectorAll('.nav-logo .logo-icon, .footer-logo .logo-icon').forEach((el) => {
      if (logoUrl) {
        el.classList.add('has-custom-logo');
        el.innerHTML = `<img src="${escHtml(logoUrl)}" alt="${escHtml(studioName)} logo">`;
      } else {
        el.classList.remove('has-custom-logo');
      }
    });
    applyStandardLogoChrome();

    document.querySelectorAll('footer .footer-desc').forEach((el) => {
      el.textContent = settings?.tagline || `${studioName} by ${about?.name || 'Emmanuel Yirenkyi-Amoyaw'}.`;
    });
    document.querySelectorAll('footer a[href^="mailto:"]').forEach((el) => {
      const email = settings?.email || 'galaxydesignstudio4@gmail.com';
      el.href = `mailto:${email}`;
      el.textContent = email;
    });
    document.querySelectorAll('footer a[href^="tel:"]').forEach((el) => {
      const phone = settings?.phone || '055-688-1003';
      el.href = `tel:${phone.replace(/\s+/g, '')}`;
      el.textContent = phone;
    });
    document.querySelectorAll('footer .footer-contact-item > span:last-child').forEach((el) => {
      if (!el.closest('a')) el.textContent = settings?.location || 'Tema, Accra, Ghana';
    });
    document.querySelectorAll('footer a[href*="wa.me/"]').forEach((el) => {
      el.href = `https://wa.me/${settings?.whatsapp || '233556881003'}`;
    });
    document.querySelectorAll('.footer-socials').forEach((group) => {
      const links = group.querySelectorAll('a');
      if (links[0] && about?.facebook) links[0].href = about.facebook;
      if (links[1] && about?.youtube1) links[1].href = about.youtube1;
      if (links[2] && about?.youtube2) links[2].href = about.youtube2;
    });
    renderFooterPartners(settings);
    applyStandardLogoChrome();
  }

  function renderPublicNotifications(items = []) {
    const section = document.getElementById('homeUpdates');
    const grid = document.getElementById('homeUpdatesGrid');
    if (!section || !grid) return;
    const visible = (Array.isArray(items) ? items : [])
      .filter((item) => item && item.active !== false)
      .filter((item) => {
        const audience = String(item.audience || 'both').toLowerCase();
        return audience === 'public' || audience === 'both';
      })
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6);
    if (!visible.length) {
      section.style.display = 'none';
      grid.innerHTML = '';
      return;
    }
    section.style.display = '';
    grid.innerHTML = visible.map((item) => `
      <article class="home-update-card animate-in visible">
        <div class="home-update-type">${escHtml(item.type || 'Update')}</div>
        <h3>${escHtml(item.title || 'Update')}</h3>
        <p>${escHtml(item.message || '')}</p>
      </article>
    `).join('');
  }

  function normalizeBranchContent(about = {}, settings = {}) {
    const rawParentLogo = settings?.logo || '';
    const parentLogo = rawParentLogo
      ? (typeof window.__resolveAssetUrl__ === 'function' ? window.__resolveAssetUrl__(rawParentLogo) : rawParentLogo)
      : '';
    return {
      homeLabel: about.homeBranchLabel || 'Studio Branches',
      homeTitle: about.homeBranchTitle || 'One parent studio. Two focused branches.',
      homeIntro: about.homeBranchIntro || 'Galaxy Studio leads the vision, then each branch takes a clear path so clients immediately know where design work lives and where technical delivery lives.',
      aboutLabel: about.aboutBranchLabel || 'Branch Structure',
      aboutTitle: about.aboutBranchTitle || 'The Galaxy Studio Tree',
      aboutIntro: about.aboutBranchIntro || 'Galaxy Studio is the parent brand. Under it, we are building focused branches so clients can clearly see where creative design work lives and where development and technical delivery live.',
      parent: {
        badge: about.parentBadge || 'Parent Studio',
        name: about.parentName || 'Galaxy Studio',
        short: about.parentShort || 'G',
        focus: about.parentFocus || 'Main brand umbrella',
        description: about.parentDescription || 'The central identity connecting our creative, design, development, and future specialist branches.',
        logo: parentLogo,
      },
      design: {
        badge: about.designBadge || 'Branch 01',
        name: about.designName || 'Galaxy Design Studio',
        short: about.designShort || 'D',
        focus: about.designFocus || 'Design and visual communication',
        description: about.designDescription || 'Graphic design, branding, logo systems, ads, video editing, motion work, 3D visuals, and creative campaign assets.',
        logo: about.designLogo || '',
      },
      tech: {
        badge: about.techBadge || 'Branch 02',
        name: about.techName || 'Galaxy Tech Studio',
        short: about.techShort || 'T',
        focus: about.techFocus || 'Development and technical solutions',
        description: about.techDescription || 'Websites, digital product development, technical builds, and architectural work that need structured planning and execution.',
        logo: about.techLogo || '',
      },
    };
  }

  function branchMediaMarkup(logo = '', short = '', className = '') {
    if (logo) {
      return `<span class="home-branch-mark ${className} has-image"><img src="${escHtml(logo)}" alt="${escHtml(short || 'Branch logo')}"></span>`;
    }
    return `<span class="home-branch-mark ${className}">${escHtml(short)}</span>`;
  }

  function renderBranchSections(about = {}, settings = {}) {
    const content = normalizeBranchContent(about, settings);
    const homeRoot = document.getElementById('homeBranchFlow');
    if (homeRoot) {
      homeRoot.innerHTML = `
        <div class="section-header animate-in visible home-branch-copy">
          <span class="section-label">${escHtml(content.homeLabel)}</span>
          <h2 class="section-title">${escHtml(content.homeTitle)}</h2>
          <p class="section-sub">${escHtml(content.homeIntro)}</p>
        </div>
        <div class="home-branch-tree animate-in visible">
          <article class="home-branch-root">
            <span class="home-branch-badge">${escHtml(content.parent.badge)}</span>
            ${branchMediaMarkup(content.parent.logo, content.parent.short, 'parent')}
            <h3>${escHtml(content.parent.name)}</h3>
            <p>${escHtml(content.parent.description)}</p>
          </article>
          <div class="home-branch-lanes" aria-label="Galaxy Studio branches">
            <article class="home-branch-leaf">
              <div class="home-branch-arrow" aria-hidden="true">↓</div>
              <span class="home-branch-badge">${escHtml(content.design.badge)}</span>
              ${branchMediaMarkup(content.design.logo, content.design.short, 'child')}
              <h3>${escHtml(content.design.name)}</h3>
              <strong>${escHtml(content.design.focus)}</strong>
              <p>${escHtml(content.design.description)}</p>
            </article>
            <article class="home-branch-leaf">
              <div class="home-branch-arrow" aria-hidden="true">↓</div>
              <span class="home-branch-badge">${escHtml(content.tech.badge)}</span>
              ${branchMediaMarkup(content.tech.logo, content.tech.short, 'child tech')}
              <h3>${escHtml(content.tech.name)}</h3>
              <strong>${escHtml(content.tech.focus)}</strong>
              <p>${escHtml(content.tech.description)}</p>
            </article>
          </div>
        </div>
      `;
    }

    const aboutRoot = document.getElementById('aboutBranchTree');
    if (aboutRoot) {
      aboutRoot.innerHTML = `
        <div class="section-header" style="margin-bottom:20px;">
          <span class="section-label">${escHtml(content.aboutLabel)}</span>
          <h2 class="section-title">${escHtml(content.aboutTitle)}</h2>
        </div>
        <div class="branch-tree-card">
          <p class="branch-tree-intro">${escHtml(content.aboutIntro)}</p>
          <div class="branch-tree-stack" aria-label="Galaxy Studio branch tree">
            <article class="branch-tree-root">
              <div class="branch-tree-chip">${escHtml(content.parent.badge)}</div>
              <div class="branch-tree-head">
                <span class="branch-node">${escHtml(content.parent.short)}</span>
                <div>
                  <h3>${escHtml(content.parent.name)}</h3>
                  <p>${escHtml(content.parent.focus)}</p>
                </div>
              </div>
              <div class="branch-tree-body">${escHtml(content.parent.description)}</div>
            </article>
            <div class="branch-tree-children">
              <article class="branch-tree-child">
                <div class="branch-tree-line" aria-hidden="true"></div>
                <div class="branch-tree-chip">${escHtml(content.design.badge)}</div>
                <div class="branch-tree-head">
                  <span class="branch-node child">${escHtml(content.design.short)}</span>
                  <div>
                    <h3>${escHtml(content.design.name)}</h3>
                    <p>${escHtml(content.design.focus)}</p>
                  </div>
                </div>
                <div class="branch-tree-body">${escHtml(content.design.description)}</div>
              </article>
              <article class="branch-tree-child">
                <div class="branch-tree-line" aria-hidden="true"></div>
                <div class="branch-tree-chip">${escHtml(content.tech.badge)}</div>
                <div class="branch-tree-head">
                  <span class="branch-node child tech">${escHtml(content.tech.short)}</span>
                  <div>
                    <h3>${escHtml(content.tech.name)}</h3>
                    <p>${escHtml(content.tech.focus)}</p>
                  </div>
                </div>
                <div class="branch-tree-body">${escHtml(content.tech.description)}</div>
              </article>
            </div>
          </div>
        </div>
      `;
    }
  }

  window.renderGalaxyBranchSections = renderBranchSections;

  function renderHomePage(data) {
    const services = data.galaxy_services || [];
    const portfolio = data.galaxy_portfolio || [];
    const testimonials = data.galaxy_testimonials || [];
    const about = data.galaxy_about || {};
    const notifications = data.galaxy_notifications || [];
    const partners = normalizePartners(data.galaxy_settings || {}).filter((entry) => entry.premium);

    renderBranchSections(about, data.galaxy_settings || {});
    renderPublicNotifications(notifications);

    const adavatar = services.find((item) => item.signature) || services.find((item) => item.icon === 'avatar');
    const adavatarCard = document.querySelector('#services .adavatar-card');
    if (adavatarCard) {
      adavatarCard.innerHTML = `
        <div class="adavatar-inner">
          <div class="adavatar-icon-wrap">${renderIcon(adavatar?.icon || 'avatar')}</div>
          <div class="adavatar-body">
            <div class="adavatar-badge">New · Premium Service</div>
            <h2 class="adavatar-title gold-gradient-text">${escHtml(adavatar?.title || 'AdAvatar')}</h2>
            <p class="adavatar-desc">${escHtml(adavatar?.desc || 'Our signature service — a 3D animated Pixar-style avatar that talks and promotes your product or business.')}</p>
            <div class="adavatar-btns">
              <a class="btn btn-gold" href="contact.html">Get Your AdAvatar →</a>
              <a class="btn btn-gold-outline" href="adavatar.html">View Samples & Gallery</a>
            </div>
          </div>
        </div>
      `;
    }

    const servicesGrid = document.querySelector('#services .services-grid');
    if (servicesGrid && services.length) {
      const palette = [
        ['hsl(250 80% 65% / 0.12)', 'hsl(250,80%,75%)'],
        ['hsl(210 80% 65% / 0.12)', 'hsl(210,80%,75%)'],
        ['hsl(320 70% 60% / 0.12)', 'hsl(320,70%,75%)'],
        ['hsl(200 100% 60% / 0.12)', 'hsl(200,100%,70%)'],
        ['hsl(230 80% 65% / 0.12)', 'hsl(230,80%,80%)'],
        ['hsl(270 70% 65% / 0.12)', 'hsl(270,70%,80%)'],
      ];
      const display = services.filter((item) => item.id !== adavatar?.id).slice(0, 6);
      servicesGrid.innerHTML = display.map((service, index) => {
        const [bg, color] = palette[index % palette.length];
        return `
          <div class="service-card animate-in visible" style="--delay:${index * 60}ms">
            <div class="service-icon" style="background:${bg};color:${color};">${renderIcon(service.icon)}</div>
            <h3 style="color:${color}">${escHtml(service.title || 'Service')}</h3>
            <p>${escHtml(service.desc || '')}</p>
          </div>
        `;
      }).join('');
    }

    const projectGrid = document.querySelector('#portfolio .projects-grid');
    if (projectGrid && portfolio.length) {
      const featured = portfolio.filter((item) => item.featured).slice(0, 6);
      const display = featured.length ? featured : portfolio.slice(0, 6);
      projectGrid.innerHTML = display.map((project, index) => `
        <a class="project-card${project.premium ? ' premium' : ''} animate-in visible" href="portfolio.html" style="--delay:${index * 60}ms">
          ${project.premium ? '<div class="premium-badge">Premium</div>' : ''}
          <div class="project-thumb">
            ${project.thumb
              ? `<img src="${escHtml(project.thumb)}" alt="${escHtml(project.title || 'Project')}">`
              : `<div class="project-thumb-placeholder">${renderIcon(categoryIcon(project.category || 'graphic'))}</div>`
            }
          </div>
          <div class="project-info">
            <h3>${escHtml(project.title || 'Untitled')}</h3>
            <span class="category-badge"${project.category === 'adavatar' ? ' style="background:rgba(245,158,11,0.12);color:#fcd34d;border-color:rgba(245,158,11,0.3);"' : ''}>${escHtml(categoryLabel(project.category))}</span>
          </div>
        </a>
      `).join('');
    }
    if (projectGrid) {
      if (!portfolio.length) projectGrid.innerHTML = '';
      projectGrid.style.visibility = 'visible';
    }

    const testimonialGrid = document.querySelector('#testimonials .testimonials-grid');
    if (testimonialGrid && testimonials.length) {
      testimonialGrid.innerHTML = testimonials.slice(0, 6).map((item, index) => `
        <div class="testimonial-card animate-in visible" style="--delay:${index * 80}ms">
          <div class="quote-icon">"</div>
          <p class="testimonial-text">${escHtml(item.quote || '')}</p>
          <div class="stars">${'★ '.repeat(Number(item.rating || 5)).trim()}</div>
          <div class="testimonial-author">
            <div class="avatar-circle">${escHtml(initials(item.name || 'Client'))}</div>
            <div>
              <div class="author-name">${escHtml(item.name || 'Client')}</div>
              <div class="author-company">${escHtml(item.company || '')}</div>
            </div>
          </div>
        </div>
      `).join('');
    }
    if (testimonialGrid) {
      if (!testimonials.length) testimonialGrid.innerHTML = '';
      testimonialGrid.style.visibility = 'visible';
    }

    const partnersGrid = document.querySelector('#partners-home .partners-home-grid');
    const partnersSection = document.getElementById('partners-home');
    if (partnersGrid && partnersSection) {
      if (partners.length) {
        partnersSection.style.display = '';
        partnersGrid.innerHTML = partners.map((entry, index) => `
          <a class="partner-home-card animate-in visible" href="${escHtml(entry.url)}" target="_blank" rel="noopener noreferrer" style="--partner-accent:${escHtml(entry.color)};--delay:${index * 70}ms;">
            <div class="partner-home-badge">${escHtml(entry.kind === 'collaborator' ? 'Premium Collaborator' : 'Premium Partner')}</div>
            <h3>${escHtml(entry.name)}</h3>
            <p>Featured collaboration on the Galaxy Studio homepage.</p>
            <span class="partner-home-link">Visit website</span>
          </a>
        `).join('');
      } else {
        partnersSection.style.display = 'none';
        partnersGrid.innerHTML = '';
      }
    }
  }

  function renderServicesPage(services) {
    const listEl = document.querySelector('.services-list');
    if (!listEl || !services.length) return;
    listEl.innerHTML = services.slice().sort((a, b) => (a.order || 999) - (b.order || 999)).map((service, index) => `
      <div class="service-row${service.signature ? ' adavatar-row' : ''} animate-in visible" style="--delay:${index * 60}ms">
        <div class="service-row-icon" style="background:${service.signature ? 'rgba(245,158,11,0.12)' : 'hsl(250 80% 65% / 0.12)'};color:${service.signature ? '#f59e0b' : 'var(--primary)'};">${renderIcon(service.icon)}</div>
        <div class="service-row-body">
          <div class="service-row-header">
            <h3 class="service-row-title${service.signature ? ' gold-gradient-text' : ''}">${escHtml(service.title || 'Service')}</h3>
            ${service.signature ? '<span class="service-sig-badge" style="background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#fcd34d;">★ Signature Service</span>' : ''}
          </div>
          <p class="service-row-desc">${escHtml(service.desc || '')}</p>
          <div class="service-features">
            ${featureListForService(service).map((feature) => `<div class="feature-item"><div class="feature-check"${service.signature ? ' style="background:rgba(245,158,11,0.15);color:#f59e0b;"' : ''}>✓</div>${escHtml(feature)}</div>`).join('')}
          </div>
          ${service.signature ? '<div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;"><a class="btn btn-gold" href="contact.html" style="font-size:14px;padding:10px 22px;">Get Your AdAvatar →</a><a class="btn btn-gold-outline" href="adavatar.html" style="font-size:14px;padding:10px 22px;">View Samples</a></div>' : ''}
        </div>
      </div>
    `).join('');
  }

  function renderAboutPage(about) {
    if (!about) return;
    const card = document.querySelector('.owner-card');
    if (!card) return;
    const avatarMarkup = about.avatar
      ? `<img src="${escHtml(about.avatar)}" alt="${escHtml(about.name || 'Owner')}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`
      : escHtml(initials(about.name || 'Emmanuel'));
    card.innerHTML = `
      <div class="owner-avatar">${avatarMarkup}</div>
      <div class="owner-body">
        <h2 class="owner-name">${escHtml(about.name || 'Emmanuel Yirenkyi-Amoyaw')}</h2>
        <p class="owner-role">${escHtml(about.role || 'Owner & Creative Director')}</p>
        <p class="owner-bio">${escHtml(about.bio || '')}</p>
        <div class="owner-socials">
          ${about.facebook ? `<a class="owner-social" href="${escHtml(about.facebook)}" target="_blank" rel="noopener">Facebook</a>` : ''}
          ${about.youtube1 ? `<a class="owner-social" href="${escHtml(about.youtube1)}" target="_blank" rel="noopener">Epic Tales</a>` : ''}
          ${about.youtube2 ? `<a class="owner-social" href="${escHtml(about.youtube2)}" target="_blank" rel="noopener">Bible Sparks</a>` : ''}
        </div>
      </div>
    `;
    renderBranchSections(about, window.getData ? (window.getData('galaxy_settings') || {}) : {});
  }

  async function hydratePublicSite() {
    if (window.location.pathname.includes('/admin/')) return;
    if (typeof window.getData !== 'function') return;

    const keys = new Set(['galaxy_settings', 'galaxy_about']);
    if (pageName === 'index.html' || pageName === '') {
      ['galaxy_services', 'galaxy_portfolio', 'galaxy_testimonials', 'galaxy_notifications'].forEach((key) => keys.add(key));
    }
    if (pageName === 'services.html') keys.add('galaxy_services');

    const data = {};
    for (const key of keys) {
      if (typeof window.loadFromCloud === 'function') {
        try {
          data[key] = await window.loadFromCloud(key);
          continue;
        } catch {}
      }
      data[key] = window.getData(key);
    }

    applyPublicBranding(data.galaxy_settings || window.__GDS_BOOT_SETTINGS__ || {}, data.galaxy_about || {});
    if (pageName === 'index.html' || pageName === '') renderHomePage(data);
    if (pageName === 'services.html') renderServicesPage(data.galaxy_services || []);
    if (pageName === 'about.html') renderAboutPage(data.galaxy_about || {});
    document.documentElement.classList.remove('gds-loading');
    document.documentElement.classList.add('gds-ready');
  }

  hydratePublicSite().catch((error) => {
    console.warn('[Shared] Public hydration failed:', error.message);
  });

});

