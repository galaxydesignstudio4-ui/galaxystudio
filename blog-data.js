document.addEventListener('DOMContentLoaded', () => {
  const page = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (!['blog.html', 'post.html', 'resources.html'].includes(page)) return;

  const POSTS_KEY = 'galaxy_blog_posts';
  const COMMENTS_KEY = 'galaxy_blog_comments';
  const RESOURCES_KEY = 'galaxy_resources';
  const SETTINGS_KEY = 'galaxy_settings';
  const USERS_KEY = 'galaxy_users';
  const SUBSCRIBERS_KEY = 'galaxy_subscribers';
  const OWNER_KEY = 'galaxy_reader_owner_id';
  const COMMENT_COOLDOWN_MS = 45000;
  const bannedTerms = ['casino', 'crypto giveaway', 'loan offer', 'adult'];

  const qs = new URLSearchParams(window.location.search);
  const now = Date.now();
  const ownerId = getOrCreateOwnerId();
  let posts = normalizePosts(getDataSafe(POSTS_KEY));
  let comments = normalizeComments(getDataSafe(COMMENTS_KEY));
  let resources = normalizeResources(getDataSafe(RESOURCES_KEY));
  let settings = normalizeSettings(getDataSafe(SETTINGS_KEY));
  let users = normalizeUsers(getDataSafe(USERS_KEY));

  hydrateCloudData().then(() => {
    posts = normalizePosts(getDataSafe(POSTS_KEY));
    comments = normalizeComments(getDataSafe(COMMENTS_KEY));
    resources = normalizeResources(getDataSafe(RESOURCES_KEY));
    settings = normalizeSettings(getDataSafe(SETTINGS_KEY));
    users = normalizeUsers(getDataSafe(USERS_KEY));
    route();
  });

  route();

  function route() {
    if (page === 'blog.html') renderBlogHome();
    if (page === 'post.html') renderPostPage();
    if (page === 'resources.html') renderResourcesPage();
  }

  async function hydrateCloudData() {
    if (typeof window.loadFromCloud !== 'function') return;
    await Promise.all([
      window.loadFromCloud(POSTS_KEY).catch(() => {}),
      window.loadFromCloud(COMMENTS_KEY).catch(() => {}),
      window.loadFromCloud(RESOURCES_KEY).catch(() => {}),
      window.loadFromCloud(SETTINGS_KEY).catch(() => {}),
      window.loadFromCloud(USERS_KEY).catch(() => {}),
      window.loadFromCloud(SUBSCRIBERS_KEY).catch(() => {}),
    ]);
  }

  function getDataSafe(key) {
    return typeof window.getData === 'function' ? window.getData(key) || [] : [];
  }

  function setDataSafe(key, value) {
    if (typeof window.setData === 'function') {
      window.setData(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  function escHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugify(value = '') {
    return String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `item-${Date.now()}`;
  }

  function formatDate(value) {
    const ts = Date.parse(value || '');
    if (!Number.isFinite(ts)) return 'Draft';
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function relativeTime(value) {
    const ts = Date.parse(value || '');
    if (!Number.isFinite(ts)) return '';
    const diff = Date.now() - ts;
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    if (diff < hour) return `${Math.max(1, Math.round(diff / (1000 * 60)))}m ago`;
    if (diff < day) return `${Math.max(1, Math.round(diff / hour))}h ago`;
    if (diff < day * 7) return `${Math.max(1, Math.round(diff / day))}d ago`;
    return formatDate(value);
  }

  function calcReadTime(text = '') {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(3, Math.ceil(words / 190));
  }

  function normalizePosts(list = []) {
    return (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      slug: item.slug || slugify(item.title || 'post'),
      tags: Array.isArray(item.tags) ? item.tags : [],
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      readTime: calcReadTime(item.body || ''),
      publishDate: item.publishDate || item.scheduledFor || '',
    }));
  }

  function normalizeComments(list = []) {
    return (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      postId: Number(item.postId || 0),
      parentId: Number(item.parentId || 0),
      likes: Number(item.likes || 0),
      reports: Number(item.reports || 0),
    }));
  }

  function normalizeExternalUrl(value = '') {
    const raw = String(value || '').trim();
    if (!raw || raw === '#') return '';
    if (/^(https?:|mailto:|tel:|whatsapp:)/i.test(raw)) return raw;
    if (/^\/\//.test(raw)) return `https:${raw}`;
    return `https://${raw.replace(/^\/+/, '')}`;
  }

  function normalizeSettings(value = {}) {
    const source = value && typeof value === 'object' ? value : {};
    const defaults = ((window.DEFAULTS || {}).galaxy_settings || {}).resourcesBlock || {};
    return {
      ...source,
      resourcesBlock: {
        eyebrow: 'Digital Downloads',
        title: 'Featured Resources',
        subtitle: 'Preview and download Galaxy Studio assets without extra clutter.',
        primaryLabel: '',
        primaryUrl: '',
        secondaryLabel: '',
        secondaryUrl: '',
        ...defaults,
        ...((source && source.resourcesBlock) || {}),
      },
    };
  }

  function normalizeResourceLink(entry = {}) {
    return {
      label: String(entry?.label || '').trim(),
      url: normalizeExternalUrl(entry?.url || ''),
      kind: String(entry?.kind || 'custom').trim().toLowerCase(),
    };
  }

  function normalizeResources(list = []) {
    return (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      order: Number(item.order || 0),
      slug: item.slug || slugify(item.title || 'resource'),
      previewImages: Array.isArray(item.previewImages) ? item.previewImages : [],
      previewStoragePaths: Array.isArray(item.previewStoragePaths) ? item.previewStoragePaths : [],
      tags: Array.isArray(item.tags) ? item.tags : [],
      relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : [],
      links: (Array.isArray(item.links) ? item.links : []).map((entry) => normalizeResourceLink(entry)).filter((entry) => entry.label && entry.url),
      downloads: Number(item.downloads || 0),
    })).sort((a, b) => (a.order || 999) - (b.order || 999) || (a.id || 0) - (b.id || 0));
  }

  function normalizeUsers(list = []) {
    return (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      bookmarks: Array.isArray(item.bookmarks) ? item.bookmarks : [],
      history: Array.isArray(item.history) ? item.history : [],
      likedPosts: Array.isArray(item.likedPosts) ? item.likedPosts : [],
      likedComments: Array.isArray(item.likedComments) ? item.likedComments : [],
      commentsCount: Number(item.commentsCount || 0),
    }));
  }

  function publishedPosts() {
    return posts.filter((post) => {
      if (post.status !== 'published') return false;
      const publishAt = Date.parse(post.publishDate || post.scheduledFor || '');
      return !Number.isFinite(publishAt) || publishAt <= now;
    });
  }

  function visibleComments(postId) {
    return comments.filter((item) => item.postId === postId && item.status === 'approved');
  }

  function postStats(post) {
    const commentCount = visibleComments(post.id).length;
    const score = Number(post.views || 0) + Number(post.likes || 0) * 3 + Number(post.bookmarks || 0) * 4 + commentCount * 6;
    return { commentCount, score };
  }

  function coverFor(item) {
    if (item.banner) return item.banner;
    if (Array.isArray(item.gallery) && item.gallery[0]) return item.gallery[0];
    if (Array.isArray(item.previewImages) && item.previewImages[0]) return item.previewImages[0];
    return '';
  }

  function renderResourceActions(item, { includeDownload = true } = {}) {
    const links = (item.links || []).slice(0, 3);
    const buttons = [];
    if (includeDownload) {
      buttons.push(`<button class="btn btn-outline" type="button" data-download-resource="${item.slug}">Download</button>`);
    }
    links.forEach((entry) => {
      buttons.push(`<a class="btn btn-outline" href="${escHtml(entry.url)}" target="_blank" rel="noopener">${escHtml(entry.label)}</a>`);
    });
    return buttons.join('');
  }

  function getOrCreateOwnerId() {
    const stored = localStorage.getItem(OWNER_KEY);
    if (stored) return stored;
    const created = `reader-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(OWNER_KEY, created);
    return created;
  }

  function currentUserProfile() {
    let profile = users.find((item) => item.deviceId === ownerId);
    if (!profile) {
      profile = {
        id: nextId(users),
        deviceId: ownerId,
        name: 'Guest Reader',
        email: '',
        role: 'reader',
        status: 'active',
        origin: 'reader',
        lastSeen: new Date().toISOString(),
        commentsCount: 0,
        bookmarks: [],
        history: [],
        likedPosts: [],
        likedComments: [],
        newsletter: false,
      };
      users = [...users, profile];
      setDataSafe(USERS_KEY, users);
    }
    return profile;
  }

  function updateUserProfile(patch) {
    const profile = { ...currentUserProfile(), ...patch, lastSeen: new Date().toISOString() };
    users = users.map((item) => item.deviceId === ownerId ? profile : item);
    setDataSafe(USERS_KEY, users);
    return profile;
  }

  function nextId(list) {
    return list.length ? Math.max(...list.map((item) => Number(item.id || 0))) + 1 : 1;
  }

  function renderBlogHome() {
    const livePosts = publishedPosts();
    const featured = livePosts.find((post) => post.featured) || livePosts[0];
    const latest = livePosts.slice().sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0));
    const categories = [...new Set(livePosts.map((post) => post.category).filter(Boolean))];
    const hero = document.getElementById('blogHero');
    const latestGrid = document.getElementById('latestPosts');
    const filters = document.getElementById('blogFilters');
    const search = document.getElementById('blogSearch');
    const count = document.getElementById('blogCount');
    let activeCategory = 'All';
    let activeTag = qs.get('tag') || '';

    if (hero && featured) {
      hero.innerHTML = `
        <div class="content-hero-card animate-in visible" style="min-height:320px;">
          ${coverFor(featured) ? `<img class="hero-image" src="${escHtml(coverFor(featured))}" alt="${escHtml(featured.title)}" loading="eager" decoding="async">` : ''}
          <div class="hero-glow"></div>
          <div class="hero-content">
            <div class="eyebrow">Featured Post</div>
            <h1 class="hero-title">${escHtml(featured.title)}</h1>
            <p class="hero-sub" style="max-width:540px;">${escHtml(featured.excerpt)}</p>
            <div class="meta-row">
              <span class="meta-pill">${escHtml(featured.category || 'Galaxy Journal')}</span>
              <span class="meta-pill">${formatDate(featured.publishDate)}</span>
              <span class="meta-pill">${featured.readTime} min read</span>
            </div>
            <div class="article-actions" style="margin-top:24px;"><a class="btn btn-primary" href="post.html?slug=${encodeURIComponent(featured.slug)}">Read Post</a></div>
          </div>
        </div>
      `;
    }

    if (filters) {
      filters.innerHTML = ['All', ...categories].map((item) => `<button class="filter-chip${item === 'All' ? ' active' : ''}" type="button" data-category="${escHtml(item)}">${escHtml(item)}</button>`).join('');
    }

    const renderFiltered = () => {
      const query = String(search?.value || activeTag || '').trim().toLowerCase();
      const filtered = latest.filter((post) => {
        const categoryPass = activeCategory === 'All' || post.category === activeCategory;
        const tagPass = !activeTag || (post.tags || []).includes(activeTag);
        const queryPass = !query || [post.title, post.excerpt, post.category, ...(post.tags || [])].join(' ').toLowerCase().includes(query);
        return categoryPass && tagPass && queryPass;
      });
      if (count) count.textContent = `${filtered.length} article${filtered.length === 1 ? '' : 's'} available`;
      if (latestGrid) {
        latestGrid.innerHTML = filtered.length ? filtered.map(renderPostCard).join('') : `<div class="surface-card empty-panel">No posts match this filter yet.</div>`;
      }
      bindFilterInteractions();
    };

    filters?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.getAttribute('data-category') || 'All';
      filters.querySelectorAll('[data-category]').forEach((chip) => chip.classList.toggle('active', chip === button));
      renderFiltered();
    });

    if (search && activeTag) search.value = activeTag;
    search?.addEventListener('input', () => {
      activeTag = String(search.value || '').trim();
      renderFiltered();
    });
    renderFiltered();
  }

  function renderPostCard(post) {
    const stats = postStats(post);
    return `
      <article class="surface-card post-card animate-in visible">
        <a class="card-media" href="post.html?slug=${encodeURIComponent(post.slug)}">
          ${coverFor(post) ? `<img src="${escHtml(coverFor(post))}" alt="${escHtml(post.title)}" loading="lazy" decoding="async">` : ''}
        </a>
        <div class="card-body">
          <div class="tag-row">
            <span class="meta-pill">${escHtml(post.category || 'Story')}</span>
            ${post.featured ? '<span class="meta-pill">Featured</span>' : ''}
          </div>
          <h3 style="font-size:26px;margin-top:14px;">${escHtml(post.title)}</h3>
          <p class="card-copy">${escHtml(post.excerpt)}</p>
          <div class="card-row">
            <div class="inline-stats">
              <span class="stat-pill">${formatDate(post.publishDate)}</span>
              <span class="stat-pill">${post.readTime} min</span>
              <span class="stat-pill">${stats.commentCount} comments</span>
            </div>
            <a class="btn btn-outline" href="post.html?slug=${encodeURIComponent(post.slug)}">Read More</a>
          </div>
        </div>
      </article>
    `;
  }

  function bindFilterInteractions() {
    document.querySelectorAll('[data-tag-filter]').forEach((button) => {
      button.onclick = () => {
        const search = document.getElementById('blogSearch');
        if (search) search.value = button.getAttribute('data-tag-filter') || '';
        search?.dispatchEvent(new Event('input'));
      };
    });
  }

  function renderPostPage() {
    const slug = qs.get('slug') || '';
    const post = publishedPosts().find((item) => item.slug === slug) || publishedPosts()[0];
    const main = document.getElementById('postArticle');
    const side = document.getElementById('postSidebar');
    const commentsWrap = document.getElementById('postComments');
    const relatedWrap = document.getElementById('relatedPosts');
    const progress = document.getElementById('readingProgress');
    if (!post || !main || !side || !commentsWrap || !relatedWrap) return;

    incrementView(post.slug);
    applySeo(post);
    trackHistory(post.slug);

    main.innerHTML = `
      <div class="article-banner">
        ${coverFor(post) ? `<img src="${escHtml(coverFor(post))}" alt="${escHtml(post.title)}" loading="eager" decoding="async">` : ''}
      </div>
      <div class="eyebrow">${escHtml(post.category || 'Galaxy Story')}</div>
      <h1 class="hero-title" style="font-size:clamp(34px, 4.8vw, 56px);margin-bottom:12px;">${escHtml(post.title)}</h1>
      <p class="hero-sub" style="margin-bottom:18px;">${escHtml(post.excerpt)}</p>
      <div class="meta-row" style="margin-bottom:24px;">
        <span class="meta-pill">${escHtml(post.authorName || 'Galaxy Studio')}</span>
        <span class="meta-pill">${formatDate(post.publishDate)}</span>
        <span class="meta-pill">${post.readTime} min read</span>
      </div>
      <div class="article-actions" style="margin-bottom:22px;">
        <button class="action-chip" id="likePostBtn" type="button">${isPostLiked(post.id) ? 'Liked' : 'Like'} • ${Number(post.likes || 0)}</button>
        <button class="action-chip" id="bookmarkPostBtn" type="button">${isBookmarked(post.slug) ? 'Saved' : 'Save post'}</button>
        <button class="action-chip" id="sharePostBtn" type="button">Copy link</button>
      </div>
      <div class="article-copy">${renderArticleBody(post)}</div>
    `;

    side.innerHTML = `
      <div class="surface-card controls-card">
        <div class="controls-block">
          <label class="controls-label">Reading insights</label>
          <div class="insight-grid">
            <div class="insight-row"><span>Views</span><strong>${Number(post.views || 0)}</strong></div>
            <div class="insight-row"><span>Likes</span><strong>${Number(post.likes || 0)}</strong></div>
            <div class="insight-row"><span>Bookmarks</span><strong>${Number(post.bookmarks || 0)}</strong></div>
            <div class="insight-row"><span>Comments</span><strong>${visibleComments(post.id).length}</strong></div>
          </div>
        </div>
        <div class="controls-block">
          <label class="controls-label">Tags</label>
          <div class="filter-wrap">
            ${(post.tags || []).map((tag) => `<a class="tag-chip" href="blog.html?tag=${encodeURIComponent(tag)}">${escHtml(tag)}</a>`).join('')}
          </div>
        </div>
        <div class="controls-block">
          <label class="controls-label">Share</label>
          <div class="share-grid">
            <a class="btn btn-outline" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}">Twitter</a>
            <a class="btn btn-outline" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}">Facebook</a>
          </div>
        </div>
      </div>
    `;

    commentsWrap.innerHTML = renderCommentsSection(post);
    relatedWrap.innerHTML = relatedPosts(post).map((item) => `
      <a class="surface-card related-card" href="post.html?slug=${encodeURIComponent(item.slug)}">
        <div class="card-media">${coverFor(item) ? `<img src="${escHtml(coverFor(item))}" alt="${escHtml(item.title)}" loading="lazy">` : ''}</div>
        <div class="card-body">
          <div class="meta-row"><span class="meta-pill">${escHtml(item.category)}</span></div>
          <h3 style="font-size:22px;margin-top:12px;">${escHtml(item.title)}</h3>
          <p class="card-copy">${escHtml(item.excerpt)}</p>
        </div>
      </a>
    `).join('');

    main.querySelector('#likePostBtn')?.addEventListener('click', () => togglePostLike(post.id));
    main.querySelector('#bookmarkPostBtn')?.addEventListener('click', () => toggleBookmark(post.slug));
    main.querySelector('#sharePostBtn')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showFeedback('Link copied to clipboard.');
      } catch {
        showFeedback('Unable to copy the link right now.', true);
      }
    });

    bindCommentEvents(post);
    bindGalleryEvents();

    if (!window.__galaxyReadingProgressBound) {
      window.__galaxyReadingProgressBound = true;
      window.addEventListener('scroll', () => {
        const bar = document.getElementById('readingProgress');
        if (!bar) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const next = max > 0 ? (window.scrollY / max) * 100 : 0;
        bar.style.width = `${Math.max(0, Math.min(100, next))}%`;
      }, { passive: true });
    }
  }

  function renderArticleBody(post) {
    const lines = String(post.body || '').split('\n');
    const parts = [];
    let inCode = false;
    let codeBuffer = [];
    let listBuffer = [];

    const flushList = () => {
      if (!listBuffer.length) return;
      parts.push(`<ul>${listBuffer.map((item) => `<li>${escHtml(item)}</li>`).join('')}</ul>`);
      listBuffer = [];
    };

    const flushCode = () => {
      if (!codeBuffer.length) return;
      parts.push(`<pre><code>${escHtml(codeBuffer.join('\n'))}</code></pre>`);
      codeBuffer = [];
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trimEnd();
      if (line.startsWith('```')) {
        if (inCode) flushCode();
        inCode = !inCode;
        return;
      }
      if (inCode) {
        codeBuffer.push(line);
        return;
      }
      if (!line.trim()) {
        flushList();
        return;
      }
      if (line.startsWith('- ')) {
        listBuffer.push(line.replace(/^- /, ''));
        return;
      }
      flushList();
      if (line.startsWith('## ')) {
        parts.push(`<h2>${escHtml(line.slice(3))}</h2>`);
        return;
      }
      if (line.startsWith('### ')) {
        parts.push(`<h3>${escHtml(line.slice(4))}</h3>`);
        return;
      }
      if (line.startsWith('> ')) {
        parts.push(`<blockquote>${escHtml(line.slice(2))}</blockquote>`);
        return;
      }
      if (/^\[video\]\((.+)\)$/.test(line)) {
        const url = line.match(/^\[video\]\((.+)\)$/)?.[1] || '';
        parts.push(`<div class="lightbox-media-frame" style="margin:18px 0;"><iframe src="${escHtml(url.replace('watch?v=', 'embed/'))}" title="Embedded video" allowfullscreen></iframe></div>`);
        return;
      }
      if (/^\[gallery:(.+)\]$/.test(line)) {
        const images = (line.match(/^\[gallery:(.+)\]$/)?.[1] || '').split(',').map((item) => item.trim()).filter(Boolean);
        parts.push(`<div class="article-gallery">${images.map((src, index) => `<button type="button" data-gallery-src="${escHtml(src)}" data-gallery-index="${index}"><img src="${escHtml(src)}" alt="Gallery image ${index + 1}" loading="lazy"></button>`).join('')}</div>`);
        return;
      }
      parts.push(`<p>${escHtml(line)}</p>`);
    });
    flushList();
    flushCode();
    if (Array.isArray(post.gallery) && post.gallery.length) {
      parts.push(`<div class="article-gallery">${post.gallery.map((src, index) => `<button type="button" data-gallery-src="${escHtml(src)}" data-gallery-index="${index}"><img src="${escHtml(src)}" alt="Post gallery ${index + 1}" loading="lazy"></button>`).join('')}</div>`);
    }
    return parts.join('');
  }

  function relatedPosts(post) {
    return publishedPosts()
      .filter((item) => item.id !== post.id)
      .filter((item) => item.category === post.category || item.tags.some((tag) => (post.tags || []).includes(tag)))
      .slice(0, 3);
  }

  function renderCommentsSection(post) {
    const postComments = visibleComments(post.id);
    const commentsDisabled = post.commentsEnabled === false;
    return `
      <div class="surface-card comments-wrap">
        <div class="section-head">
          <div>
            <h2>Comments</h2>
            <p>${commentsDisabled ? 'Comments are disabled for this post.' : 'Join the discussion, reply to other readers, and share your take.'}</p>
          </div>
        </div>
        ${commentsDisabled ? '' : `
          <div class="surface-card" style="padding:18px;background:hsl(260 16% 10%);border-radius:22px;">
            <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <input class="comment-input" id="commentName" type="text" placeholder="Your name">
              <input class="comment-input" id="commentEmail" type="email" placeholder="Email (optional)">
            </div>
            <textarea class="comment-textarea" id="commentBody" placeholder="Write something thoughtful..." style="margin-top:12px;"></textarea>
            <div class="article-actions" style="margin-top:12px;">
              <button class="btn btn-primary" id="postCommentBtn" type="button">Publish comment</button>
              <span style="color:var(--muted);font-size:12px;">Suspicious comments go to moderation automatically.</span>
            </div>
          </div>
        `}
        <div class="comment-list">
          ${postComments.length ? buildCommentTree(postComments, 0) : `<div class="surface-card empty-panel">No comments yet. Be the first to start the conversation.</div>`}
        </div>
      </div>
      <div class="surface-card newsletter-card" style="margin-top:20px;">
        <div class="section-head" style="margin-bottom:0;">
          <div>
            <h2>Stay in the Galaxy loop</h2>
            <p>${escHtml(post.newsletterCta || 'Subscribe for new stories, templates, and launches from Galaxy Studio.')}</p>
          </div>
        </div>
        <div class="newsletter-form">
          <input class="newsletter-input" id="newsletterEmail" type="email" placeholder="Email address">
          <button class="btn btn-primary" id="newsletterBtn" type="button">Subscribe</button>
        </div>
      </div>
    `;
  }

  function buildCommentTree(postComments, parentId) {
    return postComments
      .filter((item) => item.parentId === parentId)
      .map((comment) => {
        const own = comment.ownerId === ownerId;
        const replies = buildCommentTree(postComments, comment.id);
        return `
          <div class="comment-card">
            <div class="comment-head">
              <div class="comment-meta">
                <strong>${escHtml(comment.authorName || 'Reader')}</strong>
                ${comment.pinned ? '<span class="meta-pill">Pinned</span>' : ''}
                ${comment.updatedAt ? '<span class="meta-pill">Edited</span>' : ''}
                <span style="color:var(--muted);font-size:12px;">${relativeTime(comment.createdAt)}</span>
              </div>
            </div>
            <div class="comment-content">${escHtml(comment.content)}</div>
            <div class="comment-actions" style="margin-top:12px;">
              <div class="article-actions">
                <button class="action-chip" type="button" data-comment-like="${comment.id}">${isCommentLiked(comment.id) ? 'Liked' : 'Like'} • ${comment.likes}</button>
                <button class="action-chip" type="button" data-comment-reply="${comment.id}">Reply</button>
                ${own ? `<button class="action-chip" type="button" data-comment-edit="${comment.id}">Edit</button><button class="action-chip" type="button" data-comment-delete="${comment.id}">Delete</button>` : ''}
                <button class="action-chip" type="button" data-comment-report="${comment.id}">Report</button>
              </div>
            </div>
            <div class="hidden" data-reply-box="${comment.id}" style="margin-top:12px;">
              <textarea class="comment-textarea" placeholder="Write a reply"></textarea>
              <div class="article-actions" style="margin-top:10px;">
                <button class="btn btn-primary" type="button" data-submit-reply="${comment.id}">Post reply</button>
              </div>
            </div>
            ${replies ? `<div class="comment-replies">${replies}</div>` : ''}
          </div>
        `;
      }).join('');
  }

  function bindCommentEvents(post) {
    document.getElementById('postCommentBtn')?.addEventListener('click', () => submitComment(post.id, 0));
    document.getElementById('newsletterBtn')?.addEventListener('click', subscribeNewsletter);
    document.querySelectorAll('[data-comment-like]').forEach((button) => button.addEventListener('click', () => toggleCommentLike(Number(button.getAttribute('data-comment-like')))));
    document.querySelectorAll('[data-comment-reply]').forEach((button) => button.addEventListener('click', () => {
      const box = document.querySelector(`[data-reply-box="${button.getAttribute('data-comment-reply')}"]`);
      if (box) box.classList.toggle('hidden');
    }));
    document.querySelectorAll('[data-submit-reply]').forEach((button) => button.addEventListener('click', () => submitComment(post.id, Number(button.getAttribute('data-submit-reply')))));
    document.querySelectorAll('[data-comment-delete]').forEach((button) => button.addEventListener('click', () => deleteOwnComment(Number(button.getAttribute('data-comment-delete')))));
    document.querySelectorAll('[data-comment-edit]').forEach((button) => button.addEventListener('click', () => editOwnComment(Number(button.getAttribute('data-comment-edit')))));
    document.querySelectorAll('[data-comment-report]').forEach((button) => button.addEventListener('click', () => reportComment(Number(button.getAttribute('data-comment-report')))));
  }

  function submitComment(postId, parentId) {
    const nameInput = document.getElementById('commentName');
    const emailInput = document.getElementById('commentEmail');
    const rootBody = document.getElementById('commentBody');
    const replyBox = parentId ? document.querySelector(`[data-reply-box="${parentId}"] textarea`) : null;
    const bodyInput = parentId ? replyBox : rootBody;
    const name = String(nameInput?.value || currentUserProfile().name || '').trim();
    const email = String(emailInput?.value || currentUserProfile().email || '').trim();
    const content = String(bodyInput?.value || '').trim();
    const lastPosted = Number(localStorage.getItem('galaxy_last_comment_at') || 0);
    if (!name || !content) {
      showFeedback('Name and comment are required.', true);
      return;
    }
    if (Date.now() - lastPosted < COMMENT_COOLDOWN_MS) {
      showFeedback('Please wait a little before posting again.', true);
      return;
    }
    if (content.length < 6 || content.length > 1500) {
      showFeedback('Comments should be between 6 and 1500 characters.', true);
      return;
    }
    const lowered = content.toLowerCase();
    const hasManyLinks = (content.match(/https?:\/\//gi) || []).length > 2;
    const flagged = bannedTerms.some((term) => lowered.includes(term)) || hasManyLinks;
    const comment = {
      id: nextId(comments),
      postId,
      parentId,
      authorName: name,
      authorEmail: email,
      content,
      ownerId,
      status: flagged ? 'pending' : 'approved',
      pinned: false,
      likes: 0,
      reports: 0,
      createdAt: new Date().toISOString(),
      updatedAt: '',
    };
    comments = [...comments, comment];
    setDataSafe(COMMENTS_KEY, comments);
    updateUserProfile({
      name,
      email,
      origin: 'comment',
      commentsCount: Number(currentUserProfile().commentsCount || 0) + 1,
    });
    localStorage.setItem('galaxy_last_comment_at', String(Date.now()));
    if (bodyInput) bodyInput.value = '';
    if (parentId && replyBox?.closest('[data-reply-box]')) replyBox.closest('[data-reply-box]').classList.add('hidden');
    showFeedback(flagged ? 'Comment sent for moderation.' : 'Comment published.');
    renderPostPage();
  }

  function togglePostLike(postId) {
    const profile = currentUserProfile();
    const liked = new Set(profile.likedPosts || []);
    const already = liked.has(postId);
    if (already) liked.delete(postId); else liked.add(postId);
    posts = posts.map((post) => post.id === postId ? { ...post, likes: Math.max(0, Number(post.likes || 0) + (already ? -1 : 1)) } : post);
    setDataSafe(POSTS_KEY, posts);
    updateUserProfile({ likedPosts: [...liked] });
    renderPostPage();
  }

  function toggleCommentLike(commentId) {
    const profile = currentUserProfile();
    const liked = new Set(profile.likedComments || []);
    const already = liked.has(commentId);
    if (already) liked.delete(commentId); else liked.add(commentId);
    comments = comments.map((comment) => comment.id === commentId ? { ...comment, likes: Math.max(0, Number(comment.likes || 0) + (already ? -1 : 1)) } : comment);
    setDataSafe(COMMENTS_KEY, comments);
    updateUserProfile({ likedComments: [...liked] });
    renderPostPage();
  }

  function toggleBookmark(slug) {
    const profile = currentUserProfile();
    const bookmarks = new Set(profile.bookmarks || []);
    const post = posts.find((item) => item.slug === slug);
    const already = bookmarks.has(slug);
    if (already) bookmarks.delete(slug); else bookmarks.add(slug);
    if (post) {
      posts = posts.map((item) => item.slug === slug ? { ...item, bookmarks: Math.max(0, Number(item.bookmarks || 0) + (already ? -1 : 1)) } : item);
      setDataSafe(POSTS_KEY, posts);
    }
    updateUserProfile({ bookmarks: [...bookmarks] });
    renderPostPage();
  }

  function isBookmarked(slug) {
    return (currentUserProfile().bookmarks || []).includes(slug);
  }

  function isPostLiked(postId) {
    return (currentUserProfile().likedPosts || []).includes(postId);
  }

  function isCommentLiked(commentId) {
    return (currentUserProfile().likedComments || []).includes(commentId);
  }

  function trackHistory(slug) {
    const history = [slug, ...(currentUserProfile().history || []).filter((item) => item !== slug)].slice(0, 8);
    updateUserProfile({ history });
  }

  function incrementView(slug) {
    const viewedKey = `galaxy_viewed_${slug}`;
    if (sessionStorage.getItem(viewedKey)) return;
    sessionStorage.setItem(viewedKey, '1');
    posts = posts.map((post) => post.slug === slug ? { ...post, views: Number(post.views || 0) + 1 } : post);
    setDataSafe(POSTS_KEY, posts);
  }

  function subscribeNewsletter() {
    const input = document.getElementById('newsletterEmail');
    const email = String(input?.value || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFeedback('Enter a valid email address.', true);
      return;
    }
    const subscribers = getDataSafe(SUBSCRIBERS_KEY);
    if (subscribers.some((item) => String(item.email || '').toLowerCase() === email)) {
      showFeedback('This email is already subscribed.');
      return;
    }
    const next = [
      ...subscribers,
      {
        id: nextId(subscribers),
        email,
        name: currentUserProfile().name || 'Website reader',
        source: 'blog-newsletter',
        subscribedAt: new Date().toISOString(),
        status: 'active',
      }
    ];
    setDataSafe(SUBSCRIBERS_KEY, next);
    updateUserProfile({ newsletter: true, email });
    if (input) input.value = '';
    showFeedback('Subscription saved.');
  }

  function deleteOwnComment(commentId) {
    const item = comments.find((comment) => comment.id === commentId);
    if (!item || item.ownerId !== ownerId) return;
    comments = comments.filter((comment) => comment.id !== commentId && comment.parentId !== commentId);
    setDataSafe(COMMENTS_KEY, comments);
    renderPostPage();
    showFeedback('Comment deleted.');
  }

  function editOwnComment(commentId) {
    const item = comments.find((comment) => comment.id === commentId);
    if (!item || item.ownerId !== ownerId) return;
    const nextContent = window.prompt('Edit your comment', item.content || '');
    if (!nextContent) return;
    comments = comments.map((comment) => comment.id === commentId ? { ...comment, content: nextContent.trim(), updatedAt: new Date().toISOString() } : comment);
    setDataSafe(COMMENTS_KEY, comments);
    renderPostPage();
    showFeedback('Comment updated.');
  }

  function reportComment(commentId) {
    comments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;
      const reports = Number(comment.reports || 0) + 1;
      return { ...comment, reports, status: reports >= 2 ? 'pending' : comment.status };
    });
    setDataSafe(COMMENTS_KEY, comments);
    renderPostPage();
    showFeedback('Comment reported. Thank you.');
  }

  function bindGalleryEvents() {
    document.querySelectorAll('[data-gallery-src]').forEach((button) => {
      button.addEventListener('click', () => {
        const items = [...document.querySelectorAll('[data-gallery-src]')].map((node) => ({ type: 'image', url: node.getAttribute('data-gallery-src') || '', title: 'Gallery image' }));
        const index = Number(button.getAttribute('data-gallery-index') || 0);
        if (typeof window.openLightbox === 'function') window.openLightbox(items, index);
      });
    });
  }

  function renderResourcesPage() {
    const resourceGrid = document.getElementById('resourceGrid');
    const resourceFilters = document.getElementById('resourceFilters');
    const resourceSearch = document.getElementById('resourceSearch');
    const resourceFeatured = document.getElementById('resourceFeatured');
    const resourceCount = document.getElementById('resourceCount');
    const blockEyebrow = document.getElementById('resourceBlockEyebrow');
    const blockTitle = document.getElementById('resourceBlockTitle');
    const blockSubtitle = document.getElementById('resourceBlockSubtitle');
    const blockActions = document.getElementById('resourceBlockActions');
    const resourceBlock = settings.resourcesBlock || {};
    const featured = resources.filter((item) => item.featured).slice(0, 2);
    const categories = [...new Set(resources.map((item) => item.category).filter(Boolean))];
    let activeCategory = 'All';

    if (blockEyebrow) blockEyebrow.textContent = resourceBlock.eyebrow || 'Digital Downloads';
    if (blockTitle) blockTitle.textContent = resourceBlock.title || 'Featured Resources';
    if (blockSubtitle) blockSubtitle.textContent = resourceBlock.subtitle || 'Preview and download Galaxy Studio assets without extra clutter.';
    if (blockActions) {
      const actions = [];
      if (resourceBlock.primaryLabel && resourceBlock.primaryUrl) actions.push(`<a class="btn btn-primary" href="${escHtml(normalizeExternalUrl(resourceBlock.primaryUrl))}" target="_blank" rel="noopener">${escHtml(resourceBlock.primaryLabel)}</a>`);
      if (resourceBlock.secondaryLabel && resourceBlock.secondaryUrl) actions.push(`<a class="btn btn-outline" href="${escHtml(normalizeExternalUrl(resourceBlock.secondaryUrl))}" target="_blank" rel="noopener">${escHtml(resourceBlock.secondaryLabel)}</a>`);
      blockActions.innerHTML = actions.join('');
    }

    if (resourceFeatured) {
      resourceFeatured.innerHTML = featured.map((item) => `
        <article class="surface-card resource-card animate-in visible">
          <div class="card-media">${coverFor(item) ? `<img src="${escHtml(coverFor(item))}" alt="${escHtml(item.title)}" loading="lazy">` : ''}</div>
          <div class="card-body">
            <div class="tag-row">
              <span class="meta-pill">${escHtml(item.category)}</span>
              ${item.premium ? '<span class="meta-pill">Premium</span>' : ''}
            </div>
            <h3 style="font-size:28px;margin-top:12px;">${escHtml(item.title)}</h3>
            <p class="card-copy">${escHtml(item.description)}</p>
            <div class="card-row">
              <div class="inline-stats">
                <span class="stat-pill">${escHtml(item.fileType)}</span>
                <span class="stat-pill">${escHtml(item.fileSize || 'Digital asset')}</span>
              </div>
              <div class="article-actions">
                <button class="btn btn-primary" type="button" data-open-resource="${item.slug}">Preview</button>
                ${renderResourceActions(item, { includeDownload: true })}
              </div>
            </div>
          </div>
        </article>
      `).join('');
    }

    if (resourceFilters) {
      resourceFilters.innerHTML = ['All', ...categories].map((item) => `<button class="filter-chip${item === 'All' ? ' active' : ''}" type="button" data-resource-category="${escHtml(item)}">${escHtml(item)}</button>`).join('');
    }

    const renderFiltered = () => {
      const query = String(resourceSearch?.value || '').trim().toLowerCase();
      const filtered = resources.filter((item) => {
        const categoryPass = activeCategory === 'All' || item.category === activeCategory;
        const queryPass = !query || [item.title, item.excerpt, item.description, item.category, ...(item.tags || [])].join(' ').toLowerCase().includes(query);
        return categoryPass && queryPass;
      });
      if (resourceCount) resourceCount.textContent = `${filtered.length} resource${filtered.length === 1 ? '' : 's'} available`;
      if (resourceGrid) {
        resourceGrid.innerHTML = filtered.map((item) => `
          <article class="surface-card resource-card animate-in visible">
            <div class="card-media">${coverFor(item) ? `<img src="${escHtml(coverFor(item))}" alt="${escHtml(item.title)}" loading="lazy">` : ''}</div>
            <div class="card-body">
              <div class="tag-row">
                <span class="meta-pill">${escHtml(item.category)}</span>
                <span class="meta-pill">${escHtml(item.fileType)}</span>
              </div>
              <h3 style="font-size:24px;margin-top:12px;">${escHtml(item.title)}</h3>
              <p class="card-copy">${escHtml(item.excerpt)}</p>
              <div class="inline-stats" style="margin-bottom:16px;">
                <span class="stat-pill">${item.downloads} downloads</span>
                <span class="stat-pill">${formatDate(item.uploadDate)}</span>
              </div>
              <div class="card-row">
                <button class="btn btn-primary" type="button" data-open-resource="${item.slug}">Preview</button>
                <div class="article-actions">${renderResourceActions(item, { includeDownload: true })}</div>
              </div>
            </div>
          </article>
        `).join('');
      }
      bindResourceEvents();
    };

    resourceFilters?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-resource-category]');
      if (!button) return;
      activeCategory = button.getAttribute('data-resource-category') || 'All';
      resourceFilters.querySelectorAll('[data-resource-category]').forEach((chip) => chip.classList.toggle('active', chip === button));
      renderFiltered();
    });
    resourceSearch?.addEventListener('input', renderFiltered);
    renderFiltered();
  }

  function bindResourceEvents() {
    document.querySelectorAll('[data-open-resource]').forEach((button) => {
      button.addEventListener('click', () => openResourcePreview(button.getAttribute('data-open-resource') || ''));
    });
    document.querySelectorAll('[data-download-resource]').forEach((button) => {
      button.addEventListener('click', () => downloadResource(button.getAttribute('data-download-resource') || ''));
    });
  }

  function openResourcePreview(slug) {
    const item = resources.find((entry) => entry.slug === slug);
    if (!item) return;
    const previewItems = (item.previewImages || []).map((src) => ({ type: 'image', url: src, title: item.title }));
    if (previewItems.length && typeof window.openLightbox === 'function') {
      window.openLightbox(previewItems, 0);
      showFeedback(`${item.title} preview opened.`);
      return;
    }
    if (item.downloadUrl && item.downloadUrl !== '#') {
      window.open(item.downloadUrl, '_blank', 'noopener');
      showFeedback(`${item.title} file opened.`);
      return;
    }
    showFeedback('No preview is attached yet. Add one from the admin dashboard.', true);
  }

  function downloadResource(slug) {
    const item = resources.find((entry) => entry.slug === slug);
    if (!item) return;
    resources = resources.map((entry) => entry.slug === slug ? { ...entry, downloads: Number(entry.downloads || 0) + 1 } : entry);
    setDataSafe(RESOURCES_KEY, resources);
    if (item.downloadUrl && item.downloadUrl !== '#') {
      window.open(item.downloadUrl, '_blank', 'noopener');
    } else {
      showFeedback('No download file is attached yet. Add one from the admin dashboard.', true);
    }
    renderResourcesPage();
  }

  function applySeo(post) {
    document.title = `${post.title} | Galaxy Studio`;
    setMeta('description', post.seoDescription || post.excerpt);
    setMeta('og:title', post.seoTitle || post.title, 'property');
    setMeta('og:description', post.seoDescription || post.excerpt, 'property');
    setMeta('og:type', 'article', 'property');
    setMeta('og:image', coverFor(post), 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', post.seoTitle || post.title);
    setMeta('twitter:description', post.seoDescription || post.excerpt);
    setMeta('twitter:image', coverFor(post));
    let script = document.getElementById('articleSchema');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'articleSchema';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      image: coverFor(post) || undefined,
      author: { '@type': 'Organization', name: post.authorName || 'Galaxy Studio' },
      publisher: { '@type': 'Organization', name: 'Galaxy Studio' },
      datePublished: post.publishDate,
      dateModified: post.updatedAt || post.publishDate,
    });
  }

  function setMeta(name, content, attr = 'name') {
    if (!content) return;
    let node = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attr, name);
      document.head.appendChild(node);
    }
    node.setAttribute('content', content);
  }

  function showFeedback(message, isError = false) {
    if (typeof window.showToast === 'function') {
      window.showToast(message, isError ? 'error' : 'success');
      return;
    }
    const existing = document.getElementById('blogFeedback');
    if (existing) existing.remove();
    const node = document.createElement('div');
    node.id = 'blogFeedback';
    node.className = 'toast ' + (isError ? 'error' : 'success');
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2800);
  }
});
