const GDB_CONFIG = {
  supabase: {
    url: window.__SUPABASE_URL__ || '',
    anonKey: window.__SUPABASE_ANON_KEY__ || '',
    buckets: {
      portfolio: 'portfolio-images',
      gallery: 'gallery-media',
      avatars: 'avatars',
      logos: 'logos',
      resources: 'resources',
    },
  },
  redis: {
    url: window.__REDIS_URL__ || '',
    token: window.__REDIS_TOKEN__ || '',
    ttl: 300,
  },
  enabled: Boolean(window.__SUPABASE_URL__ && window.__SUPABASE_ANON_KEY__),
};

const BASE_DEFAULTS = {
  galaxy_admin_password: 'admin123',
  galaxy_services: [
    { id: 1, icon: 'graphic', title: 'Graphic Design', desc: 'Stunning visuals that communicate your brand story with impact and clarity.', order: 1 },
    { id: 2, icon: 'ad', title: 'Advertisement Design', desc: 'Creative advertisement designs for digital and print that grab attention.', order: 2 },
    { id: 3, icon: 'logo', title: 'Logo & Branding Design', desc: 'Memorable brand identities that capture your essence.', order: 3 },
    { id: 4, icon: 'video', title: 'Video Editing', desc: 'Professional video editing that transforms raw footage into compelling content.', order: 4 },
    { id: 5, icon: 'animation3d', title: '3D Animation', desc: 'Breathtaking 3D visuals and animations that bring ideas to life.', order: 5 },
    { id: 6, icon: 'avatar', title: 'AdAvatar', desc: '3D animated Pixar-style avatar that talks and promotes your product.', order: 6, signature: true },
    { id: 7, icon: 'uiux', title: 'UI/UX Design', desc: 'User-centered interface design that creates intuitive digital experiences.', order: 7 },
    { id: 8, icon: 'web', title: 'Web Design & Development', desc: 'Custom websites for schools, brands, and small businesses built with clean modern front-end experiences.', order: 8 },
    { id: 9, icon: 'cad', title: 'CAD Design & 3D Modeling', desc: 'Precision-engineered technical drawings and 3D CAD models.', order: 9 },
    { id: 10, icon: 'promotion', title: 'Digital Promotion Content', desc: 'All-round creative and digital services to promote your business.', order: 10 },
  ],
  galaxy_portfolio: [
    
  ],
  galaxy_gallery: [
    
  ],
  galaxy_adavatar: [
    
  ],
  galaxy_testimonials: [
    
  ],
  galaxy_team: [],
  galaxy_messages: [],
  galaxy_notifications: [],
  galaxy_blog_posts: [
    {
      id: 1,
      title: 'Inside the Galaxy Studio Creative Process',
      slug: 'inside-the-galaxy-studio-creative-process',
      excerpt: 'A lighter look at how Galaxy Studio shapes ideas, motion, and visual polish into a premium final experience.',
      body: `Galaxy Studio pages work best when movement supports clarity instead of fighting it.

## Start with rhythm
Spacing is part of the story. When cards, copy blocks, and calls to action breathe, the experience feels more premium.

## Build scroll moments
Use featured sections, layered backgrounds, and a few intentional reveal animations to make each section feel like a chapter.

## Keep interaction tactile
Hover states, sticky controls, progress indicators, and card depth help users feel in control of the page.

\`\`\`css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px hsl(250 80% 65% / 0.12);
}
\`\`\`

The result is a website that feels confident, modern, and intentionally crafted.`,
      category: 'Design Systems',
      tags: ['UX', 'Motion', 'Creative Direction'],
      authorName: 'Galaxy Studio',
      authorRole: 'Creative Tech Team',
      featured: true,
      pinned: true,
      status: 'published',
      publishDate: '2026-05-01T09:30:00.000Z',
      scheduledFor: '',
      banner: '',
      bannerStoragePath: '',
      gallery: [],
      videoUrl: '',
      commentsEnabled: true,
      likes: 18,
      views: 126,
      bookmarks: 9,
      seoTitle: 'Inside the Galaxy Studio Creative Process | Galaxy Studio',
      seoDescription: 'See how Galaxy Studio shapes creative direction, motion, and visual polish into premium digital work.',
      newsletterCta: 'Get new Galaxy Studio breakdowns, templates, and launch notes in your inbox.',
    },
    {
      id: 2,
      title: 'How We Package Brand Assets for Fast Client Handoffs',
      slug: 'how-we-package-brand-assets-for-fast-client-handoffs',
      excerpt: 'Inside our resource delivery workflow for logos, social kits, mockups, and reusable files that clients can actually use.',
      body: `A beautiful brand system loses value if the handoff is messy.

## Deliver in layers
We separate master assets, social exports, quick-edit templates, and usage notes so clients know exactly where to start.

## Reduce friction
- Keep filenames clean
- Group assets by platform
- Include preview boards
- Add simple usage guidance

[gallery:https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80,https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80]

When the delivery feels organized, the brand feels more premium too.`,
      category: 'Workflow',
      tags: ['Branding', 'Resources', 'Delivery'],
      authorName: 'Galaxy Studio',
      authorRole: 'Brand Operations',
      featured: false,
      pinned: false,
      status: 'published',
      publishDate: '2026-04-24T14:00:00.000Z',
      scheduledFor: '',
      banner: '',
      bannerStoragePath: '',
      gallery: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
      ],
      videoUrl: '',
      commentsEnabled: true,
      likes: 11,
      views: 84,
      bookmarks: 6,
      seoTitle: 'Brand Asset Delivery Workflow | Galaxy Studio',
      seoDescription: 'See how Galaxy Studio packages logos, templates, and brand assets for fast and clean client handoffs.',
      newsletterCta: 'Subscribe for more process notes, templates, and creative workflow resources.',
    }
  ],
  galaxy_blog_comments: [
    {
      id: 1,
      postId: 1,
      parentId: 0,
      authorName: 'Ama Mensah',
      authorEmail: 'ama@example.com',
      content: 'The point about motion rewarding curiosity is excellent. This is exactly what makes premium sites feel easier to explore.',
      ownerId: 'seed-user-1',
      status: 'approved',
      pinned: true,
      likes: 4,
      reports: 0,
      createdAt: '2026-05-02T10:15:00.000Z',
      updatedAt: '',
    }
  ],
  galaxy_resources: [
    {
      id: 1,
      order: 1,
      title: 'Launch Week Social Kit',
      slug: 'launch-week-social-kit',
      excerpt: 'A fast-moving social template pack for product launches, promos, and announcement campaigns.',
      description: 'Includes story cards, feed layouts, CTA slides, promo headers, and layered social graphics for launch campaigns.',
      category: 'Social Media',
      fileType: 'PSD / PNG',
      fileSize: '48 MB',
      downloadUrl: '#',
      downloadStoragePath: '',
      previewImages: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      ],
      previewStoragePaths: [],
      tags: ['Instagram', 'Marketing', 'Promo'],
      featured: true,
      premium: false,
      downloads: 32,
      uploadDate: '2026-04-19T09:00:00.000Z',
      relatedSlugs: ['brand-pitch-deck-system'],
      links: [
        { label: 'WhatsApp', url: 'https://wa.me/233556881003', kind: 'whatsapp' },
      ],
    },
    {
      id: 2,
      order: 2,
      title: 'Brand Pitch Deck System',
      slug: 'brand-pitch-deck-system',
      excerpt: 'Presentation slides built for strategy decks, proposals, and brand storytelling.',
      description: 'A premium slide system with section dividers, metrics pages, case study layouts, and polished visual storytelling components.',
      category: 'Presentations',
      fileType: 'PPTX / PDF',
      fileSize: '22 MB',
      downloadUrl: '#',
      downloadStoragePath: '',
      previewImages: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
      ],
      previewStoragePaths: [],
      tags: ['Pitch', 'Slides', 'Brand'],
      featured: true,
      premium: true,
      downloads: 19,
      uploadDate: '2026-04-27T15:00:00.000Z',
      relatedSlugs: ['launch-week-social-kit'],
      links: [
        { label: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61562678010128', kind: 'facebook' },
      ],
    },
    {
      id: 3,
      order: 3,
      title: 'Logo Reveal Mockup Pack',
      slug: 'logo-reveal-mockup-pack',
      excerpt: 'Clean mockup scenes for presenting logo systems and identity applications.',
      description: 'Preview logos on signage, packaging, stationery, device screens, and campaign mockups with a polished presentation style.',
      category: 'Mockups',
      fileType: 'PSD',
      fileSize: '61 MB',
      downloadUrl: '#',
      downloadStoragePath: '',
      previewImages: [
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80'
      ],
      previewStoragePaths: [],
      tags: ['Branding', 'Mockup', 'Presentation'],
      featured: false,
      premium: false,
      downloads: 14,
      uploadDate: '2026-03-30T11:40:00.000Z',
      relatedSlugs: [],
      links: [],
    }
  ],
  galaxy_users: [
    {
      id: 1,
      deviceId: 'seed-user-1',
      name: 'Ama Mensah',
      email: 'ama@example.com',
      role: 'reader',
      status: 'active',
      origin: 'comment',
      lastSeen: '2026-05-02T10:15:00.000Z',
      commentsCount: 1,
      bookmarks: ['inside-the-galaxy-studio-creative-process'],
      history: ['inside-the-galaxy-studio-creative-process'],
      likedPosts: [1],
      likedComments: [1],
      newsletter: true,
    }
  ],
  galaxy_subscribers: [
    {
      id: 1,
      email: 'hello@galaxystudio.example',
      name: 'Launch List',
      source: 'seed',
      subscribedAt: '2026-05-01T09:35:00.000Z',
      status: 'active',
    }
  ],
  galaxy_settings: {
    studioName: 'Galaxy Studio',
    tagline: 'Creative, Design & Development Studio',
    email: 'galaxydesignstudio4@gmail.com',
    phone: '055-688-1003',
    location: 'Tema, Accra, Ghana',
    facebook: 'https://web.facebook.com/profile.php?id=61562678010128',
    whatsapp: '233556881003',
    novatech: '#',
    partners: [],
    resourcesBlock: {
      eyebrow: 'Digital Downloads',
      title: 'Downloadable Resources',
      subtitle: 'Simple resource cards with a title, a short note, an image, and a download button.',
      primaryLabel: '',
      primaryUrl: '',
      secondaryLabel: '',
      secondaryUrl: '',
    },
    qrUrl: '',
    logo: 'logo-512.png',
    logoStoragePath: '',
  },
  galaxy_about: {
    name: 'Emmanuel Yirenkyi-Amoyaw',
    role: 'Owner & Creative Director · Galaxy Studio',
    bio: 'Emmanuel is a creative and digital advertisement specialist providing graphic design, video editing, 3D animation, CAD & UI/UX design, avatar-style ads, Pixar-style animations, logo and branding, and digital promotion content.',
    facebook: 'https://web.facebook.com/profile.php?id=61562678010128',
    youtube1: 'https://youtube.com/@epictales-q6n',
    youtube2: 'https://youtube.com/@biblesparksbs',
    showHomeBranches: true,
    homeBranchLabel: 'Studio Branches',
    homeBranchTitle: 'One parent studio. Two focused branches.',
    homeBranchIntro: 'Galaxy Studio leads the vision, then each branch takes a clear path so clients immediately know where design work lives and where technical delivery lives.',
    aboutBranchLabel: 'Branch Structure',
    aboutBranchTitle: 'The Galaxy Studio Tree',
    aboutBranchIntro: 'Galaxy Studio is the parent brand. Under it, we are building focused branches so clients can clearly see where creative design work lives and where development and technical delivery live.',
    parentBadge: 'Parent Studio',
    parentName: 'Galaxy Studio',
    parentShort: 'G',
    parentFocus: 'Main brand umbrella',
    parentDescription: 'The central identity connecting our creative, design, development, and future specialist branches.',
    designBadge: 'Branch 01',
    designName: 'Galaxy Design Studio',
    designShort: 'D',
    designFocus: 'Design and visual communication',
    designDescription: 'Graphic design, branding, logo systems, ads, video editing, motion work, 3D visuals, and creative campaign assets.',
    designLogo: '',
    designLogoStoragePath: '',
    techBadge: 'Branch 02',
    techName: 'Galaxy Tech Studio',
    techShort: 'T',
    techFocus: 'Development and technical solutions',
    techDescription: 'Websites, digital product development, technical builds, and architectural work that need structured planning and execution.',
    techLogo: '',
    techLogoStoragePath: '',
    avatar: '',
    avatarStoragePath: '',
  },
};

const OBJECT_KEYS = new Set(['galaxy_settings', 'galaxy_about']);
const TABLES = {
  galaxy_services: 'services',
  galaxy_portfolio: 'portfolio',
  galaxy_gallery: 'gallery',
  galaxy_adavatar: 'adavatar',
  galaxy_testimonials: 'testimonials',
  galaxy_team: 'team',
  galaxy_messages: 'messages',
  galaxy_notifications: 'notifications',
  galaxy_blog_posts: 'blog_posts',
  galaxy_blog_comments: 'blog_comments',
  galaxy_resources: 'resources',
  galaxy_users: 'users',
  galaxy_subscribers: 'subscribers',
  galaxy_settings: 'settings',
  galaxy_about: 'about',
};

const AUTH_STORAGE_KEY = 'galaxy_supabase_session';
const AUTH_MARKER_KEY = 'galaxy_admin_session';
const AUTH_EMAIL_KEY = 'galaxy_admin_user_email';
const SYNC_ERROR_PREFIX = 'galaxy_sync_error_';
const SYNC_PENDING_PREFIX = 'galaxy_sync_pending_';
const UNSUPPORTED_COLUMN_CACHE = {};
const NOTIFICATION_TTL_MS = 1000 * 60 * 60 * 12;

function cloneValue(value) {
  if (value === null || value === undefined) return value;
  return JSON.parse(JSON.stringify(value));
}

function notificationExpiryFor(createdAt = '') {
  const created = Date.parse(createdAt || '');
  const base = Number.isFinite(created) ? created : Date.now();
  return new Date(base + NOTIFICATION_TTL_MS).toISOString();
}

function isNotificationExpired(item = {}, now = Date.now()) {
  const expires = Date.parse(item?.expiresAt || item?.expires_at || '');
  if (Number.isFinite(expires)) return expires <= now;
  const created = Date.parse(item?.createdAt || item?.created_at || '');
  return Number.isFinite(created) && now - created >= NOTIFICATION_TTL_MS;
}

function pruneExpiredNotifications(list = []) {
  const now = Date.now();
  return (Array.isArray(list) ? list : []).filter((item) => !isNotificationExpired(item, now));
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

function normalizePartnerColor(value = '', fallback = '#7a5cff') {
  const raw = String(value || '').trim();
  if (!raw) return fallback;
  if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(raw)) return raw;
  return fallback;
}

function normalizePartnerEntry(entry = {}, index = 0) {
  const name = String(entry?.name || '').trim();
  const url = String(entry?.url || '').trim();
  const kind = String(entry?.kind || entry?.type || 'partner').trim().toLowerCase() === 'collaborator'
    ? 'collaborator'
    : 'partner';
  return {
    id: Number(entry?.id) || Date.now() + index,
    name,
    url,
    kind,
    premium: Boolean(entry?.premium),
    color: normalizePartnerColor(entry?.color),
  };
}

function normalizePartnerList(value) {
  const parsed = Array.isArray(value)
    ? value
    : (() => {
        if (!value) return [];
        try {
          const list = JSON.parse(value);
          return Array.isArray(list) ? list : [];
        } catch {
          return [];
        }
      })();
  return parsed
    .map((entry, index) => normalizePartnerEntry(entry, index))
    .filter((entry) => entry.name && entry.url);
}

function isPinnedMedia(item) {
  return mediaHasMeta(item, 'pinned');
}

function isPremiumMedia(item) {
  return mediaHasMeta(item, 'premium');
}

function comparePrioritizedMedia(a, b, getTimestamp) {
  const aPinned = isPinnedMedia(a) ? 1 : 0;
  const bPinned = isPinnedMedia(b) ? 1 : 0;
  if (aPinned !== bPinned) return bPinned - aPinned;
  const aPremium = isPremiumMedia(a) ? 1 : 0;
  const bPremium = isPremiumMedia(b) ? 1 : 0;
  if (aPremium !== bPremium) return bPremium - aPremium;
  const byDate = typeof getTimestamp === 'function' ? getTimestamp(b) - getTimestamp(a) : 0;
  if (byDate) return byDate;
  return Number(b?.id || 0) - Number(a?.id || 0);
}

function normalizeQrSetting(raw) {
  if (!raw) return { mode: 'generated', targetUrl: '', imageUrl: '', storagePath: '' };
  if (typeof raw === 'object') {
    return {
      mode: raw.mode || (raw.imageUrl ? 'upload' : 'generated'),
      targetUrl: raw.targetUrl || raw.url || '',
      imageUrl: raw.imageUrl || raw.image || '',
      storagePath: raw.storagePath || '',
    };
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        mode: parsed.mode || (parsed.imageUrl ? 'upload' : 'generated'),
        targetUrl: parsed.targetUrl || parsed.url || '',
        imageUrl: parsed.imageUrl || parsed.image || '',
        storagePath: parsed.storagePath || '',
      };
    }
  } catch {}
  return {
    mode: 'generated',
    targetUrl: String(raw || ''),
    imageUrl: '',
    storagePath: '',
  };
}

function serializeQrSetting(value) {
  const normalized = normalizeQrSetting(value);
  if (!normalized.targetUrl && !normalized.imageUrl && !normalized.storagePath) return '';
  return JSON.stringify(normalized);
}

function getDefaultValue(key) {
  return cloneValue(
    (typeof window.DEFAULTS !== 'undefined' && window.DEFAULTS[key] !== undefined)
      ? window.DEFAULTS[key]
      : BASE_DEFAULTS[key]
  );
}

function mergeDefaults() {
  const existing = typeof window.DEFAULTS === 'object' && window.DEFAULTS ? window.DEFAULTS : {};
  window.DEFAULTS = { ...cloneValue(BASE_DEFAULTS), ...existing };
}

function lsGetRaw(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function lsGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function lsRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function mergeObjectWithLocalFallback(localValue, cloudValue, preferLocal = false) {
  const localObject = localValue && typeof localValue === 'object' ? localValue : {};
  const cloudObject = cloudValue && typeof cloudValue === 'object' ? cloudValue : {};
  const merged = preferLocal ? { ...cloudObject, ...localObject } : { ...localObject, ...cloudObject };
  Object.keys(localObject).forEach((key) => {
    const localField = localObject[key];
    const cloudField = cloudObject[key];
    const cloudMissing = cloudField === undefined || cloudField === null || cloudField === '';
    const localHasValue = !(localField === undefined || localField === null || localField === '');
    if (cloudMissing && localHasValue) {
      merged[key] = localField;
      return;
    }
    if (preferLocal && localField && typeof localField === 'object' && !Array.isArray(localField) && cloudField && typeof cloudField === 'object' && !Array.isArray(cloudField)) {
      merged[key] = mergeObjectWithLocalFallback(localField, cloudField, true);
    }
  });
  return merged;
}

function mergeCollectionWithLocalFallback(localValue, cloudValue, key = '', preferLocal = false) {
  const localList = Array.isArray(localValue) ? localValue : [];
  const cloudList = Array.isArray(cloudValue) ? cloudValue : [];
  if (!localList.length) return sortValue(key, cloudList);
  if (!cloudList.length) return sortValue(key, localList);

  const mergedMap = new Map();
  cloudList.forEach((item) => {
    const id = Number(item?.id);
    if (Number.isFinite(id)) {
      mergedMap.set(id, item);
    }
  });

  localList.forEach((item) => {
    const id = Number(item?.id);
    if (Number.isFinite(id)) {
      if (!mergedMap.has(id) || preferLocal) {
        mergedMap.set(id, item);
      }
    }
  });

  const merged = [...cloudList];
  const seenIds = new Set();
  const upsertMerged = [];

  merged.forEach((item) => {
    const id = Number(item?.id);
    if (Number.isFinite(id) && mergedMap.has(id)) {
      upsertMerged.push(mergedMap.get(id));
      seenIds.add(id);
      return;
    }
    upsertMerged.push(item);
  });

  mergedMap.forEach((item, id) => {
    if (!seenIds.has(id)) upsertMerged.push(item);
  });

  return sortValue(key, upsertMerged);
}

function syncErrorKey(key) {
  return `${SYNC_ERROR_PREFIX}${key}`;
}

function syncPendingKey(key) {
  return `${SYNC_PENDING_PREFIX}${key}`;
}

function hasSyncError(key) {
  return !!lsGetRaw(syncErrorKey(key));
}

function hasSyncPending(key) {
  return !!lsGetRaw(syncPendingKey(key));
}

function isAdminRoute() {
  try {
    return String(window.location.pathname || '').includes('/admin/');
  } catch {
    return false;
  }
}

async function ensureCloudAdminWriteAccess() {
  if (!GDB_CONFIG.enabled || !isAdminRoute()) return;
  const session = await GalaxyAuth.getSession();
  if (session?.access_token) return;
  throw new Error('Cloud admin sign-in is required. Use Continue with Google for galaxydesignstudio4@gmail.com or sign in with the matching Supabase password.');
}

function ensureLocalDefaults() {
  mergeDefaults();
  Object.keys(window.DEFAULTS).forEach((key) => {
    if (lsGetRaw(key) === null) {
      lsSet(key, getDefaultValue(key));
    }
  });
  if (lsGetRaw('galaxy_admin_password') !== null) {
    const currentPassword = lsGet('galaxy_admin_password');
    if (currentPassword === 'galaxy2024') {
      lsSet('galaxy_admin_password', 'admin123');
    }
  }
  // Backfill logo default for older local settings snapshots.
  try {
    const currentSettings = lsGet('galaxy_settings');
    if (currentSettings && !currentSettings.logo) {
      lsSet('galaxy_settings', { ...currentSettings, logo: BASE_DEFAULTS.galaxy_settings.logo });
    }
  } catch {}
}


function resolveBucket(bucket) {
  if (GDB_CONFIG.supabase.buckets[bucket]) return GDB_CONFIG.supabase.buckets[bucket];
  return bucket;
}

function normalizeIcon(icon) {
  if (!icon) return 'graphic';
  const trimmed = String(icon).trim();
  const map = {
    '🎨': 'graphic',
    '📣': 'ad',
    '🏷️': 'logo',
    '🎬': 'video',
    '📦': 'animation3d',
    '🖥️': 'uiux',
    '✏️': 'cad',
    '✨': 'promotion',
    '🌌': 'promotion',
  };
  if (map[trimmed]) return map[trimmed];
  if (trimmed.startsWith('<svg') && trimmed.includes('circle cx="12" cy="8" r="4"')) return 'avatar';
  return trimmed;
}

function fromRow(key, row) {
  if (!row) return null;
  switch (key) {
    case 'galaxy_services':
      return {
        id: row.id,
        icon: normalizeIcon(row.icon),
        title: row.title || '',
        desc: row.description || row.desc || '',
        order: row.ord ?? row.order ?? row.id ?? 0,
        signature: Boolean(row.signature),
      };
    case 'galaxy_portfolio':
      return {
        id: row.id,
        title: row.title || '',
        desc: row.description || row.desc || '',
        category: row.category || '',
        client: row.client || '',
        websiteUrl: row.website_url || row.websiteUrl || '',
        featured: Boolean(row.featured),
        premium: Boolean(row.premium),
        thumb: row.thumb_url || row.thumb || '',
        storagePath: row.storage_path || row.storagePath || '',
      };
    case 'galaxy_gallery':
    case 'galaxy_adavatar':
      return {
        id: row.id,
        type: row.type || 'image',
        title: row.title || '',
        desc: row.description || row.desc || '',
        url: row.url || '',
        thumb: row.thumb_url || row.thumb || '',
        icon: normalizeIcon(row.icon || ''),
        storagePath: row.storage_path || row.storagePath || '',
        thumbStoragePath: row.thumb_storage_path || row.thumbStoragePath || '',
        createdAt: row.created_at || row.createdAt || '',
        titleSource: row.title_source || row.titleSource || '',
      };
    case 'galaxy_testimonials':
      return {
        id: row.id,
        name: row.name || '',
        company: row.company || '',
        quote: row.quote || '',
        rating: Number(row.rating || 5),
        avatarUrl: row.avatar_url || row.avatarUrl || '',
      };
    case 'galaxy_team':
      return {
        id: row.id,
        name: row.name || '',
        role: row.role || '',
        bio: row.bio || '',
        order: row.ord ?? row.order ?? row.id ?? 0,
        avatar: row.avatar_url || row.avatar || '',
        storagePath: row.storage_path || row.storagePath || '',
      };
    case 'galaxy_messages':
      return {
        id: row.id,
        name: row.name || '',
        email: row.email || '',
        phone: row.phone || '',
        preferredContact: row.preferred_contact || row.preferredContact || '',
        service: row.service || '',
        message: row.message || '',
        read: Boolean(row.read),
        date: row.created_at || row.date || '',
      };
    case 'galaxy_notifications':
      return {
        id: row.id,
        title: row.title || '',
        message: row.message || '',
        type: row.type || 'Info',
        active: row.active !== false,
        audience: row.audience || 'both',
        source: row.source || 'system',
        createdAt: row.created_at || row.createdAt || '',
        expiresAt: row.expires_at || row.expiresAt || notificationExpiryFor(row.created_at || row.createdAt),
      };
    case 'galaxy_blog_posts':
      return {
        id: row.id,
        title: row.title || '',
        slug: row.slug || '',
        excerpt: row.excerpt || '',
        body: row.body || '',
        category: row.category || '',
        tags: Array.isArray(row.tags) ? row.tags : (() => {
          try { return JSON.parse(row.tags_json || '[]'); } catch { return []; }
        })(),
        authorName: row.author_name || row.authorName || '',
        authorRole: row.author_role || row.authorRole || '',
        featured: Boolean(row.featured),
        pinned: Boolean(row.pinned),
        status: row.status || 'draft',
        publishDate: row.publish_date || row.publishDate || '',
        scheduledFor: row.scheduled_for || row.scheduledFor || '',
        banner: row.banner_url || row.banner || '',
        bannerStoragePath: row.banner_storage_path || row.bannerStoragePath || '',
        gallery: Array.isArray(row.gallery) ? row.gallery : (() => {
          try { return JSON.parse(row.gallery_json || '[]'); } catch { return []; }
        })(),
        videoUrl: row.video_url || row.videoUrl || '',
        commentsEnabled: row.comments_enabled !== false,
        likes: Number(row.likes || 0),
        views: Number(row.views || 0),
        bookmarks: Number(row.bookmarks || 0),
        seoTitle: row.seo_title || row.seoTitle || '',
        seoDescription: row.seo_description || row.seoDescription || '',
        newsletterCta: row.newsletter_cta || row.newsletterCta || '',
      };
    case 'galaxy_blog_comments':
      return {
        id: row.id,
        postId: Number(row.post_id || row.postId || 0),
        parentId: Number(row.parent_id || row.parentId || 0),
        authorName: row.author_name || row.authorName || '',
        authorEmail: row.author_email || row.authorEmail || '',
        content: row.content || '',
        ownerId: row.owner_id || row.ownerId || '',
        status: row.status || 'pending',
        pinned: Boolean(row.pinned),
        likes: Number(row.likes || 0),
        reports: Number(row.reports || 0),
        createdAt: row.created_at || row.createdAt || '',
        updatedAt: row.updated_at || row.updatedAt || '',
      };
    case 'galaxy_resources':
      return {
        id: row.id,
        order: Number(row.ord || row.order || 0),
        title: row.title || '',
        slug: row.slug || '',
        excerpt: row.excerpt || '',
        description: row.description || '',
        category: row.category || '',
        fileType: row.file_type || row.fileType || '',
        fileSize: row.file_size || row.fileSize || '',
        downloadUrl: row.download_url || row.downloadUrl || '#',
        downloadStoragePath: row.download_storage_path || row.downloadStoragePath || '',
        previewImages: Array.isArray(row.previewImages) ? row.previewImages : (() => {
          try { return JSON.parse(row.preview_images_json || '[]'); } catch { return []; }
        })(),
        previewStoragePaths: Array.isArray(row.previewStoragePaths) ? row.previewStoragePaths : (() => {
          try { return JSON.parse(row.preview_storage_paths_json || '[]'); } catch { return []; }
        })(),
        tags: Array.isArray(row.tags) ? row.tags : (() => {
          try { return JSON.parse(row.tags_json || '[]'); } catch { return []; }
        })(),
        featured: Boolean(row.featured),
        premium: Boolean(row.premium),
        downloads: Number(row.downloads || 0),
        uploadDate: row.upload_date || row.uploadDate || '',
        relatedSlugs: Array.isArray(row.relatedSlugs) ? row.relatedSlugs : (() => {
          try { return JSON.parse(row.related_slugs_json || '[]'); } catch { return []; }
        })(),
        links: Array.isArray(row.links) ? row.links : (() => {
          try { return JSON.parse(row.links_json || '[]'); } catch { return []; }
        })(),
      };
    case 'galaxy_users':
      return {
        id: row.id,
        deviceId: row.device_id || row.deviceId || '',
        name: row.name || '',
        email: row.email || '',
        role: row.role || 'reader',
        status: row.status || 'active',
        origin: row.origin || 'reader',
        lastSeen: row.last_seen || row.lastSeen || '',
        commentsCount: Number(row.comments_count || row.commentsCount || 0),
        bookmarks: (() => { try { return JSON.parse(row.bookmarks_json || '[]'); } catch { return []; } })(),
        history: (() => { try { return JSON.parse(row.history_json || '[]'); } catch { return []; } })(),
        likedPosts: (() => { try { return JSON.parse(row.liked_posts_json || '[]'); } catch { return []; } })(),
        likedComments: (() => { try { return JSON.parse(row.liked_comments_json || '[]'); } catch { return []; } })(),
        newsletter: Boolean(row.newsletter),
      };
    case 'galaxy_subscribers':
      return {
        id: row.id,
        email: row.email || '',
        name: row.name || '',
        source: row.source || 'website',
        subscribedAt: row.subscribed_at || row.subscribedAt || '',
        status: row.status || 'active',
      };
    case 'galaxy_settings':
      return {
        studioName: row.studio_name || row.studioName || BASE_DEFAULTS.galaxy_settings.studioName,
        tagline: row.tagline || '',
        email: row.email || '',
        phone: row.phone || '',
        location: row.location || '',
        facebook: row.facebook || '',
        whatsapp: row.whatsapp || '',
        novatech: row.novatech || '',
        partners: normalizePartnerList(row.partners_json || row.partnersJson || row.partners || []),
        resourcesBlock: (() => {
          try {
            const parsed = JSON.parse(row.resources_block_json || row.resourcesBlockJson || 'null');
            return parsed && typeof parsed === 'object'
              ? { ...BASE_DEFAULTS.galaxy_settings.resourcesBlock, ...parsed }
              : cloneValue(BASE_DEFAULTS.galaxy_settings.resourcesBlock);
          } catch {
            return cloneValue(BASE_DEFAULTS.galaxy_settings.resourcesBlock);
          }
        })(),
        qrUrl: row.qr_url || row.qrUrl || '',
        logo: row.logo_url || row.logo || '',
        logoStoragePath: row.logo_storage_path || row.logoStoragePath || '',
      };
    case 'galaxy_about':
      return {
        name: row.name || '',
        role: row.role || '',
        bio: row.bio || '',
        facebook: row.facebook || '',
        youtube1: row.youtube1 || '',
        youtube2: row.youtube2 || '',
        showHomeBranches: row.show_home_branches !== undefined ? Boolean(row.show_home_branches) : (row.showHomeBranches !== undefined ? Boolean(row.showHomeBranches) : true),
        homeBranchLabel: row.home_branch_label || row.homeBranchLabel || '',
        homeBranchTitle: row.home_branch_title || row.homeBranchTitle || '',
        homeBranchIntro: row.home_branch_intro || row.homeBranchIntro || '',
        aboutBranchLabel: row.about_branch_label || row.aboutBranchLabel || '',
        aboutBranchTitle: row.about_branch_title || row.aboutBranchTitle || '',
        aboutBranchIntro: row.about_branch_intro || row.aboutBranchIntro || '',
        parentBadge: row.parent_badge || row.parentBadge || '',
        parentName: row.parent_name || row.parentName || '',
        parentShort: row.parent_short || row.parentShort || '',
        parentFocus: row.parent_focus || row.parentFocus || '',
        parentDescription: row.parent_description || row.parentDescription || '',
        designBadge: row.design_badge || row.designBadge || '',
        designName: row.design_name || row.designName || '',
        designShort: row.design_short || row.designShort || '',
        designFocus: row.design_focus || row.designFocus || '',
        designDescription: row.design_description || row.designDescription || '',
        designLogo: row.design_logo_url || row.designLogo || '',
        designLogoStoragePath: row.design_logo_storage_path || row.designLogoStoragePath || '',
        techBadge: row.tech_badge || row.techBadge || '',
        techName: row.tech_name || row.techName || '',
        techShort: row.tech_short || row.techShort || '',
        techFocus: row.tech_focus || row.techFocus || '',
        techDescription: row.tech_description || row.techDescription || '',
        techLogo: row.tech_logo_url || row.techLogo || '',
        techLogoStoragePath: row.tech_logo_storage_path || row.techLogoStoragePath || '',
        avatar: row.avatar_url || row.avatar || '',
        avatarStoragePath: row.avatar_storage_path || row.avatarStoragePath || '',
      };
    default:
      return cloneValue(row);
  }
}

function toRow(key, value) {
  if (!value) return null;
  switch (key) {
    case 'galaxy_services':
      return {
        id: value.id,
        icon: normalizeIcon(value.icon),
        title: value.title || '',
        description: value.desc || value.description || '',
        ord: Number(value.order || 0),
        signature: Boolean(value.signature),
      };
    case 'galaxy_portfolio':
      return {
        id: value.id,
        title: value.title || '',
        description: value.desc || value.description || '',
        category: value.category || '',
        client: value.client || '',
        website_url: value.websiteUrl || value.website_url || '',
        featured: Boolean(value.featured),
        premium: Boolean(value.premium),
        thumb_url: value.thumb || value.thumb_url || '',
        storage_path: value.storagePath || value.storage_path || '',
      };
    case 'galaxy_gallery':
    case 'galaxy_adavatar':
      return {
        id: value.id,
        type: value.type || 'image',
        title: value.title || '',
        description: value.desc || value.description || '',
        url: value.url || '',
        thumb_url: value.thumb || value.thumb_url || '',
        icon: normalizeIcon(value.icon),
        storage_path: value.storagePath || value.storage_path || '',
        thumb_storage_path: value.thumbStoragePath || value.thumb_storage_path || '',
        created_at: value.createdAt || value.created_at || new Date().toISOString(),
        title_source: value.titleSource || value.title_source || '',
      };
    case 'galaxy_testimonials':
      return {
        id: value.id,
        name: value.name || '',
        company: value.company || '',
        quote: value.quote || '',
        rating: Number(value.rating || 5),
        avatar_url: value.avatarUrl || value.avatar_url || '',
      };
    case 'galaxy_team':
      return {
        id: value.id,
        name: value.name || '',
        role: value.role || '',
        bio: value.bio || '',
        avatar_url: value.avatar || value.avatar_url || '',
        storage_path: value.storagePath || value.storage_path || '',
        ord: Number(value.order || 0),
      };
    case 'galaxy_messages':
      return {
        id: value.id,
        name: value.name || '',
        email: value.email || '',
        phone: value.phone || '',
        preferred_contact: value.preferredContact || '',
        service: value.service || '',
        message: value.message || '',
        read: Boolean(value.read),
        created_at: value.date || value.created_at || new Date().toISOString(),
      };
    case 'galaxy_notifications':
      return {
        id: value.id,
        title: value.title || '',
        message: value.message || '',
        type: value.type || 'Info',
        active: value.active !== false,
        audience: value.audience || 'both',
        source: value.source || 'system',
        created_at: value.createdAt || value.created_at || new Date().toISOString(),
        expires_at: value.expiresAt || value.expires_at || notificationExpiryFor(value.createdAt || value.created_at),
      };
    case 'galaxy_blog_posts':
      return {
        id: value.id,
        title: value.title || '',
        slug: value.slug || '',
        excerpt: value.excerpt || '',
        body: value.body || '',
        category: value.category || '',
        tags_json: JSON.stringify(Array.isArray(value.tags) ? value.tags : []),
        author_name: value.authorName || '',
        author_role: value.authorRole || '',
        featured: Boolean(value.featured),
        pinned: Boolean(value.pinned),
        status: value.status || 'draft',
        publish_date: value.publishDate || value.publish_date || '',
        scheduled_for: value.scheduledFor || value.scheduled_for || '',
        banner_url: value.banner || value.banner_url || '',
        banner_storage_path: value.bannerStoragePath || value.banner_storage_path || '',
        gallery_json: JSON.stringify(Array.isArray(value.gallery) ? value.gallery : []),
        video_url: value.videoUrl || value.video_url || '',
        comments_enabled: value.commentsEnabled !== false,
        likes: Number(value.likes || 0),
        views: Number(value.views || 0),
        bookmarks: Number(value.bookmarks || 0),
        seo_title: value.seoTitle || '',
        seo_description: value.seoDescription || '',
        newsletter_cta: value.newsletterCta || '',
      };
    case 'galaxy_blog_comments':
      return {
        id: value.id,
        post_id: Number(value.postId || 0),
        parent_id: Number(value.parentId || 0),
        author_name: value.authorName || '',
        author_email: value.authorEmail || '',
        content: value.content || '',
        owner_id: value.ownerId || '',
        status: value.status || 'pending',
        pinned: Boolean(value.pinned),
        likes: Number(value.likes || 0),
        reports: Number(value.reports || 0),
        created_at: value.createdAt || value.created_at || new Date().toISOString(),
        updated_at: value.updatedAt || value.updated_at || '',
      };
    case 'galaxy_resources':
      return {
        id: value.id,
        ord: Number(value.order || 0),
        title: value.title || '',
        slug: value.slug || '',
        excerpt: value.excerpt || '',
        description: value.description || '',
        category: value.category || '',
        file_type: value.fileType || '',
        file_size: value.fileSize || '',
        download_url: value.downloadUrl || '#',
        download_storage_path: value.downloadStoragePath || '',
        preview_images_json: JSON.stringify(Array.isArray(value.previewImages) ? value.previewImages : []),
        preview_storage_paths_json: JSON.stringify(Array.isArray(value.previewStoragePaths) ? value.previewStoragePaths : []),
        tags_json: JSON.stringify(Array.isArray(value.tags) ? value.tags : []),
        featured: Boolean(value.featured),
        premium: Boolean(value.premium),
        downloads: Number(value.downloads || 0),
        upload_date: value.uploadDate || value.upload_date || new Date().toISOString(),
        related_slugs_json: JSON.stringify(Array.isArray(value.relatedSlugs) ? value.relatedSlugs : []),
        links_json: JSON.stringify(Array.isArray(value.links) ? value.links : []),
      };
    case 'galaxy_users':
      return {
        id: value.id,
        device_id: value.deviceId || '',
        name: value.name || '',
        email: value.email || '',
        role: value.role || 'reader',
        status: value.status || 'active',
        origin: value.origin || 'reader',
        last_seen: value.lastSeen || value.last_seen || new Date().toISOString(),
        comments_count: Number(value.commentsCount || 0),
        bookmarks_json: JSON.stringify(Array.isArray(value.bookmarks) ? value.bookmarks : []),
        history_json: JSON.stringify(Array.isArray(value.history) ? value.history : []),
        liked_posts_json: JSON.stringify(Array.isArray(value.likedPosts) ? value.likedPosts : []),
        liked_comments_json: JSON.stringify(Array.isArray(value.likedComments) ? value.likedComments : []),
        newsletter: Boolean(value.newsletter),
      };
    case 'galaxy_subscribers':
      return {
        id: value.id,
        email: value.email || '',
        name: value.name || '',
        source: value.source || 'website',
        subscribed_at: value.subscribedAt || value.subscribed_at || new Date().toISOString(),
        status: value.status || 'active',
      };
    case 'galaxy_settings':
      return {
        id: 1,
        studio_name: value.studioName || '',
        tagline: value.tagline || '',
        email: value.email || '',
        phone: value.phone || '',
        location: value.location || '',
        facebook: value.facebook || '',
        whatsapp: value.whatsapp || '',
        novatech: value.novatech || '',
        partners_json: JSON.stringify(normalizePartnerList(value.partners || [])),
        resources_block_json: JSON.stringify({ ...(BASE_DEFAULTS.galaxy_settings.resourcesBlock || {}), ...((value && value.resourcesBlock) || {}) }),
        qr_url: value.qrUrl || '',
        logo_url: value.logo || '',
        logo_storage_path: value.logoStoragePath || '',
      };
    case 'galaxy_about':
      return {
        id: 1,
        name: value.name || '',
        role: value.role || '',
        bio: value.bio || '',
        facebook: value.facebook || '',
        youtube1: value.youtube1 || '',
        youtube2: value.youtube2 || '',
        show_home_branches: value.showHomeBranches !== false,
        home_branch_label: value.homeBranchLabel || '',
        home_branch_title: value.homeBranchTitle || '',
        home_branch_intro: value.homeBranchIntro || '',
        about_branch_label: value.aboutBranchLabel || '',
        about_branch_title: value.aboutBranchTitle || '',
        about_branch_intro: value.aboutBranchIntro || '',
        parent_badge: value.parentBadge || '',
        parent_name: value.parentName || '',
        parent_short: value.parentShort || '',
        parent_focus: value.parentFocus || '',
        parent_description: value.parentDescription || '',
        design_badge: value.designBadge || '',
        design_name: value.designName || '',
        design_short: value.designShort || '',
        design_focus: value.designFocus || '',
        design_description: value.designDescription || '',
        design_logo_url: value.designLogo || '',
        design_logo_storage_path: value.designLogoStoragePath || '',
        tech_badge: value.techBadge || '',
        tech_name: value.techName || '',
        tech_short: value.techShort || '',
        tech_focus: value.techFocus || '',
        tech_description: value.techDescription || '',
        tech_logo_url: value.techLogo || '',
        tech_logo_storage_path: value.techLogoStoragePath || '',
        avatar_url: value.avatar || '',
        avatar_storage_path: value.avatarStoragePath || '',
      };
    default:
      return cloneValue(value);
  }
}

function sortValue(key, value) {
  if (!Array.isArray(value)) return value;
  const sorted = key === 'galaxy_notifications' ? pruneExpiredNotifications(value) : [...value];
  if (key === 'galaxy_services' || key === 'galaxy_team') {
    sorted.sort((a, b) => (a.order || 999) - (b.order || 999) || (a.id || 0) - (b.id || 0));
  } else if (key === 'galaxy_blog_posts') {
    sorted.sort((a, b) => {
      const aPinned = a.pinned ? 1 : 0;
      const bPinned = b.pinned ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      return new Date(b.publishDate || b.scheduledFor || 0) - new Date(a.publishDate || a.scheduledFor || 0) || (b.id || 0) - (a.id || 0);
    });
  } else if (key === 'galaxy_blog_comments') {
    sorted.sort((a, b) => {
      const aPinned = a.pinned ? 1 : 0;
      const bPinned = b.pinned ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0) || (a.id || 0) - (b.id || 0);
    });
  } else if (key === 'galaxy_resources') {
    sorted.sort((a, b) => {
      const byOrder = (a.order || 999) - (b.order || 999);
      if (byOrder) return byOrder;
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
      return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0) || (b.downloads || 0) - (a.downloads || 0);
    });
  } else if (key === 'galaxy_users') {
    sorted.sort((a, b) => new Date(b.lastSeen || 0) - new Date(a.lastSeen || 0) || (b.id || 0) - (a.id || 0));
  } else if (key === 'galaxy_subscribers') {
    sorted.sort((a, b) => new Date(b.subscribedAt || 0) - new Date(a.subscribedAt || 0) || (b.id || 0) - (a.id || 0));
  } else if (key === 'galaxy_messages') {
    sorted.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } else if (key === 'galaxy_notifications') {
    sorted.sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0) || (b.id || 0) - (a.id || 0));
  } else {
    sorted.sort((a, b) => (a.id || 0) - (b.id || 0));
  }
  return sorted;
}

function toAppValue(key, data) {
  if (OBJECT_KEYS.has(key)) {
    return fromRow(key, Array.isArray(data) ? data[0] : data) || getDefaultValue(key);
  }
  const rows = Array.isArray(data) ? data : [];
  const mapped = rows.map((row) => fromRow(key, row)).filter(Boolean);
  return sortValue(key, mapped.length ? mapped : getDefaultValue(key));
}

function toDbValue(key, value) {
  if (OBJECT_KEYS.has(key)) return toRow(key, value || {});
  const list = Array.isArray(value) ? value : [];
  return list.map((item) => toRow(key, item)).filter(Boolean);
}

function unsupportedColumnsForTable(table) {
  if (!UNSUPPORTED_COLUMN_CACHE[table]) {
    UNSUPPORTED_COLUMN_CACHE[table] = new Set();
  }
  return UNSUPPORTED_COLUMN_CACHE[table];
}

function sanitizeDbValueForTable(table, dbValue) {
  const blocked = unsupportedColumnsForTable(table);
  if (!blocked.size) return dbValue;

  const strip = (row) => {
    if (!row || typeof row !== 'object' || Array.isArray(row)) return row;
    const cleaned = { ...row };
    blocked.forEach((column) => {
      delete cleaned[column];
    });
    return cleaned;
  };

  return Array.isArray(dbValue) ? dbValue.map(strip) : strip(dbValue);
}

function getMissingColumnFromError(error) {
  const message = String(error?.message || '');
  const code = String(error?.code || '');
  const detail = String(error?.details || '');
  const combined = `${message} ${detail}`;
  if (code !== 'PGRST204' && !/schema cache/i.test(combined)) return '';
  const match = combined.match(/"([^"]+)"\s+column/i) || combined.match(/column\s+'([^']+)'/i);
  return match?.[1] || '';
}

function normalizeAuthSession(payload) {
  if (!payload) return null;
  const session = payload.session || payload;
  if (!session || !session.access_token || !session.refresh_token) return null;
  const expiresAt = session.expires_at || (session.expires_in ? Math.floor(Date.now() / 1000) + Number(session.expires_in) : 0);
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: expiresAt,
    expires_in: session.expires_in || Math.max(0, expiresAt - Math.floor(Date.now() / 1000)),
    token_type: session.token_type || 'bearer',
    user: payload.user || session.user || null,
  };
}

function storeAuthSession(session) {
  lsSet(AUTH_STORAGE_KEY, session);
  try {
    localStorage.setItem(AUTH_MARKER_KEY, 'authenticated');
    localStorage.setItem(AUTH_EMAIL_KEY, session?.user?.email || '');
  } catch {}
}

function clearAuthSession() {
  lsRemove(AUTH_STORAGE_KEY);
  try {
    localStorage.removeItem(AUTH_MARKER_KEY);
    localStorage.removeItem(AUTH_EMAIL_KEY);
  } catch {}
}

const GalaxyAuth = (() => {
  let session = lsGet(AUTH_STORAGE_KEY);

  function hasSession() {
    return !!(session && session.access_token && session.refresh_token);
  }

  function isExpiringSoon(target = session) {
    if (!target?.expires_at) return true;
    return target.expires_at * 1000 <= Date.now() + 60 * 1000;
  }

  async function request(path, options = {}) {
    const response = await fetch(`${GDB_CONFIG.supabase.url}${path}`, {
      ...options,
      headers: {
        apikey: GDB_CONFIG.supabase.anonKey,
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    if (!response.ok) {
      const message = data?.msg || data?.message || text || `Auth ${response.status}`;
      throw new Error(message);
    }
    return data;
  }

  async function refreshSession(force = false) {
    if (!hasSession()) return null;
    if (!force && !isExpiringSoon()) return session;
    const data = await request('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    session = normalizeAuthSession(data);
    if (!session) {
      clearAuthSession();
      return null;
    }
    storeAuthSession(session);
    return session;
  }

  async function init() {
    if (!GDB_CONFIG.enabled || !hasSession()) return session;
    try {
      await refreshSession();
    } catch {
      clearAuthSession();
      session = null;
    }
    return session;
  }

  async function getSession() {
    if (!session) return null;
    if (isExpiringSoon(session)) {
      try {
        await refreshSession(true);
      } catch {
        clearAuthSession();
        session = null;
      }
    }
    return session;
  }

  async function getUser() {
    const active = await getSession();
    if (!active?.access_token) return null;
    return request('/auth/v1/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${active.access_token}`,
      },
    });
  }

  async function signInWithPassword(email, password) {
    const data = await request('/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    session = normalizeAuthSession(data);
    if (!session) throw new Error('No session returned from Supabase Auth.');
    storeAuthSession(session);
    return session;
  }

  function getRedirectUrl(redirectTo) {
    if (redirectTo) return redirectTo;
    try {
      if (String(window.location.pathname || '').includes('/admin/')) {
        return new URL('index.html', window.location.href).toString();
      }
      const current = new URL(window.location.href);
      current.hash = '';
      current.searchParams.delete('code');
      current.searchParams.delete('state');
      current.searchParams.delete('error');
      current.searchParams.delete('error_code');
      current.searchParams.delete('error_description');
      return current.toString();
    } catch {
      return window.location.href.split('#')[0];
    }
  }

  function signInWithGoogle({ redirectTo } = {}) {
    if (!GDB_CONFIG.enabled) {
      throw new Error('Supabase Auth is not enabled in config.js.');
    }
    const target = getRedirectUrl(redirectTo);
    const authUrl = new URL(`${GDB_CONFIG.supabase.url}/auth/v1/authorize`);
    authUrl.searchParams.set('provider', 'google');
    authUrl.searchParams.set('redirect_to', target);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    window.location.href = authUrl.toString();
  }

  async function consumeOAuthCallback() {
    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
    const hashParams = new URLSearchParams(hash);
    const searchParams = new URLSearchParams(window.location.search);
    const errorMessage = hashParams.get('error_description') || searchParams.get('error_description') || hashParams.get('error') || searchParams.get('error');

    if (errorMessage) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search.replace(/[?&](error|error_code|error_description)=[^&]*/g, '').replace(/[?&]$/, '')}`);
      return { status: 'error', message: decodeURIComponent(errorMessage.replace(/\+/g, ' ')) };
    }

    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    if (!accessToken || !refreshToken) {
      return { status: 'none' };
    }

    const payload = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Number(hashParams.get('expires_at') || 0),
      expires_in: Number(hashParams.get('expires_in') || 0),
      token_type: hashParams.get('token_type') || 'bearer',
    };

    session = normalizeAuthSession(payload);
    if (!session) {
      return { status: 'error', message: 'Could not read the Google sign-in session.' };
    }
    storeAuthSession(session);
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);

    try {
      const user = await getUser();
      if (user) {
        session = { ...session, user };
        storeAuthSession(session);
      }
    } catch {}

    return { status: 'success', session };
  }

  async function signOut() {
    const active = session;
    clearAuthSession();
    session = null;
    if (!active?.access_token) return;
    try {
      await request('/auth/v1/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${active.access_token}`,
        },
      });
    } catch {}
  }

  function peekSession() {
    return session;
  }

  return {
    init,
    getSession,
    getUser,
    signInWithPassword,
    signInWithGoogle,
    consumeOAuthCallback,
    signOut,
    peekSession,
    isAuthenticatedSync: () => hasSession() && !isExpiringSoon(session),
  };
})();

class SupabaseClient {
  constructor(url, key) {
    this.url = url.replace(/\/$/, '');
    this.key = key;
    this.timeoutMs = 30000;
    this.headers = {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    };
  }

  async _authHeaders() {
    let authHeader = `Bearer ${this.key}`;
    try {
      const session = await GalaxyAuth.getSession();
      if (session?.access_token) {
        authHeader = `Bearer ${session.access_token}`;
      }
    } catch {}
    return {
      apikey: this.key,
      Authorization: authHeader,
    };
  }

  async _fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  async _fetch(path, options = {}) {
    const authHeaders = await this._authHeaders();
    const anonAuth = `Bearer ${this.key}`;
    const usedSessionAuth = authHeaders.Authorization && authHeaders.Authorization !== anonAuth;
    let response;
    try {
      response = await this._fetchWithTimeout(`${this.url}${path}`, {
        ...options,
        headers: {
          ...this.headers,
          ...authHeaders,
          ...(options.headers || {}),
        },
      });
    } catch (error) {
      if (error?.name === 'AbortError') {
        throw new Error('Supabase request timed out. Please try again.');
      }
      throw error;
    }

    if (!response.ok && usedSessionAuth && (response.status === 401 || response.status === 403)) {
      response = await this._fetchWithTimeout(`${this.url}${path}`, {
        ...options,
        headers: {
          ...this.headers,
          apikey: this.key,
          Authorization: anonAuth,
          ...(options.headers || {}),
        },
      });
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase ${response.status}: ${text}`);
    }

    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  from(table) {
    return new SupabaseQuery(this, table);
  }

  storage = {
    from: (bucket) => ({
      upload: async (path, file, options = {}) => {
        const form = new FormData();
        form.append('file', file);
        const authHeaders = await this._authHeaders();
        const anonAuth = `Bearer ${this.key}`;
        const usedSessionAuth = authHeaders.Authorization && authHeaders.Authorization !== anonAuth;
        let response;
        try {
          response = await this._fetchWithTimeout(`${this.url}/storage/v1/object/${bucket}/${path}`, {
            method: 'POST',
            headers: {
              ...authHeaders,
              ...(options.upsert ? { 'x-upsert': 'true' } : {}),
            },
            body: form,
          });
        } catch (error) {
          if (error?.name === 'AbortError') {
            throw new Error('Upload timed out. Please try again.');
          }
          throw error;
        }
        if (!response.ok && usedSessionAuth && (response.status === 401 || response.status === 403)) {
          response = await this._fetchWithTimeout(`${this.url}/storage/v1/object/${bucket}/${path}`, {
            method: 'POST',
            headers: {
              apikey: this.key,
              Authorization: anonAuth,
              ...(options.upsert ? { 'x-upsert': 'true' } : {}),
            },
            body: form,
          });
        }
        if (!response.ok) {
          throw new Error(`Upload failed: ${await response.text()}`);
        }
        return response.json();
      },
      getPublicUrl: (path) => ({
        data: {
          publicUrl: `${this.url}/storage/v1/object/public/${bucket}/${path}`,
        },
      }),
      remove: async (paths) => {
        const authHeaders = await this._authHeaders();
        const anonAuth = `Bearer ${this.key}`;
        const usedSessionAuth = authHeaders.Authorization && authHeaders.Authorization !== anonAuth;
        let response;
        try {
          response = await this._fetchWithTimeout(`${this.url}/storage/v1/object/${bucket}`, {
            method: 'DELETE',
            headers: {
              ...authHeaders,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paths),
          });
        } catch (error) {
          if (error?.name === 'AbortError') {
            throw new Error('Delete timed out. Please try again.');
          }
          throw error;
        }
        if (!response.ok && usedSessionAuth && (response.status === 401 || response.status === 403)) {
          response = await this._fetchWithTimeout(`${this.url}/storage/v1/object/${bucket}`, {
            method: 'DELETE',
            headers: {
              apikey: this.key,
              Authorization: anonAuth,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paths),
          });
        }
        if (!response.ok) {
          throw new Error(`Delete failed: ${await response.text()}`);
        }
        return response.text();
      },
    }),
  };
}

class SupabaseQuery {
  constructor(client, table) {
    this.client = client;
    this.table = table;
    this.params = [];
    this.method = 'GET';
    this.body = null;
    this.singleResult = false;
    this.extraHeaders = {};
  }

  select(columns = '*') {
    this.params.push(`select=${encodeURIComponent(columns)}`);
    return this;
  }

  eq(column, value) {
    this.params.push(`${column}=eq.${encodeURIComponent(value)}`);
    return this;
  }

  order(column, options = {}) {
    const direction = options.ascending === false ? 'desc' : 'asc';
    this.params.push(`order=${column}.${direction}`);
    return this;
  }

  limit(value) {
    this.params.push(`limit=${value}`);
    return this;
  }

  single() {
    this.singleResult = true;
    return this;
  }

  insert(value) {
    this.method = 'POST';
    this.body = value;
    return this;
  }

  upsert(value) {
    this.method = 'POST';
    this.body = value;
    this.extraHeaders.Prefer = 'resolution=merge-duplicates,return=representation';
    return this;
  }

  update(value) {
    this.method = 'PATCH';
    this.body = value;
    return this;
  }

  delete() {
    this.method = 'DELETE';
    return this;
  }

  async execute() {
    const query = this.params.length ? `?${this.params.join('&')}` : '';
    const data = await this.client._fetch(`/rest/v1/${this.table}${query}`, {
      method: this.method,
      headers: this.extraHeaders,
      body: this.body ? JSON.stringify(this.body) : undefined,
    });
    if (this.singleResult) {
      return { data: Array.isArray(data) ? data[0] : data, error: null };
    }
    return { data, error: null };
  }

  then(resolve, reject) {
    return this.execute().then(resolve, reject);
  }
}

class RedisClient {
  constructor(url, token) {
    this.url = url.replace(/\/$/, '');
    this.token = token;
  }

  get enabled() {
    return Boolean(this.url && this.token);
  }

  async command(...args) {
    if (!this.enabled) return null;
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });
      if (!response.ok) {
        throw new Error(`Redis ${response.status}`);
      }
      const json = await response.json();
      return json.result;
    } catch (error) {
      console.warn('[GalaxyDB] Redis command failed:', error.message);
      return null;
    }
  }

  async get(key) {
    return this.command('GET', key);
  }

  async set(key, value, ttlSeconds) {
    if (ttlSeconds) return this.command('SET', key, value, 'EX', ttlSeconds);
    return this.command('SET', key, value);
  }

  async del(key) {
    return this.command('DEL', key);
  }

  async getJSON(key) {
    const value = await this.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  async setJSON(key, value, ttlSeconds) {
    return this.set(key, JSON.stringify(value), ttlSeconds || GDB_CONFIG.redis.ttl);
  }
}

const GalaxyDB = (() => {
  let supabase = null;
  let redis = null;
  let mode = 'local';
  let ready = false;

  async function verifySupabaseConnection(client) {
    try {
      await client._fetch('/auth/v1/settings', {
        headers: {
          apikey: GDB_CONFIG.supabase.anonKey,
        },
      });
      return true;
    } catch (authError) {
      try {
        await client._fetch('/rest/v1/', {
          headers: {
            apikey: GDB_CONFIG.supabase.anonKey,
            Accept: 'application/openapi+json',
          },
        });
        return true;
      } catch (restError) {
        throw authError?.message ? authError : restError;
      }
    }
  }

  async function init() {
    if (ready) return;
    ensureLocalDefaults();

    if (!GDB_CONFIG.enabled) {
      ready = true;
      console.info('[GalaxyDB] Using localStorage only.');
      return;
    }

    try {
      supabase = new SupabaseClient(GDB_CONFIG.supabase.url, GDB_CONFIG.supabase.anonKey);
      redis = new RedisClient(GDB_CONFIG.redis.url, GDB_CONFIG.redis.token);
      await verifySupabaseConnection(supabase);
      mode = 'supabase';
      console.info('[GalaxyDB] Connected to Supabase.');
    } catch (error) {
      mode = 'local';
      console.warn('[GalaxyDB] Supabase unavailable, using localStorage:', error.message);
    }

    ready = true;
  }

  function getTable(key) {
    return TABLES[key] || key;
  }

  function getCacheKey(key) {
    return `gds:${getTable(key)}:all`;
  }

  async function getAll(key, options = {}) {
    const forceCloud = Boolean(options && options.forceCloud);
    await init();
    if (mode === 'local' || (!forceCloud && (hasSyncError(key) || hasSyncPending(key)))) {
      return sortValue(key, lsGet(key) ?? getDefaultValue(key));
    }

    const cacheKey = getCacheKey(key);
    if (!forceCloud) {
      try {
        const cached = await redis.getJSON(cacheKey);
        if (cached) {
          const appValue = toAppValue(key, cached);
          lsSet(key, appValue);
          return appValue;
        }
      } catch {}
    }

    try {
      let query = supabase.from(getTable(key)).select('*');
      if (!OBJECT_KEYS.has(key)) {
        query = query.order('id', { ascending: true });
      }
      const { data } = await query;
      const appValue = toAppValue(key, data);
      lsSet(key, appValue);
      try {
        await redis.setJSON(cacheKey, data || []);
      } catch {}
      return appValue;
    } catch (error) {
      console.warn(`[GalaxyDB] Read failed for ${key}:`, error.message);
      return sortValue(key, lsGet(key) ?? getDefaultValue(key));
    }
  }

  async function setAll(key, value, options = {}) {
    const throwOnError = Boolean(options && options.throwOnError);
    await init();
    const appValue = OBJECT_KEYS.has(key) ? { ...getDefaultValue(key), ...(value || {}) } : sortValue(key, Array.isArray(value) ? value : []);
    lsSet(key, appValue);

    if (mode === 'local') {
      lsRemove(syncErrorKey(key));
      lsRemove(syncPendingKey(key));
      return appValue;
    }

    const table = getTable(key);
    const cacheKey = getCacheKey(key);
    const rawDbValue = toDbValue(key, appValue);

    if (key !== 'galaxy_messages') {
      await ensureCloudAdminWriteAccess();
    }

    try {
      await redis.del(cacheKey);
    } catch {}

    try {
      if (key === 'galaxy_messages') {
        try {
          await redis.setJSON(cacheKey, toDbValue(key, appValue));
        } catch {}
        lsRemove(syncErrorKey(key));
        lsRemove(syncPendingKey(key));
        return appValue;
      }
      let dbValue = sanitizeDbValueForTable(table, rawDbValue);
      while (true) {
        try {
          if (OBJECT_KEYS.has(key)) {
            await supabase.from(table).upsert(dbValue);
          } else {
            const { data: existingRows } = await supabase.from(table).select('id');
            const previousIds = new Set(collectionIds(existingRows));
            const nextIds = new Set(collectionIds(dbValue));

            if (dbValue.length) {
              await supabase.from(table).upsert(dbValue);
            }

            const removedIds = [...previousIds].filter((id) => !nextIds.has(id));
            for (const id of removedIds) {
              await supabase.from(table).delete().eq('id', id);
            }
          }
          break;
        } catch (error) {
          const missingColumn = getMissingColumnFromError(error);
          if (!missingColumn) throw error;
          unsupportedColumnsForTable(table).add(missingColumn);
          dbValue = sanitizeDbValueForTable(table, rawDbValue);
        }
      }
      try {
        await redis.setJSON(cacheKey, OBJECT_KEYS.has(key) ? [dbValue] : dbValue);
      } catch {}
      lsRemove(syncErrorKey(key));
      lsRemove(syncPendingKey(key));
    } catch (error) {
      lsRemove(syncPendingKey(key));
      lsSet(syncErrorKey(key), {
        failedAt: new Date().toISOString(),
        message: error.message || 'Cloud write failed',
      });
      console.warn(`[GalaxyDB] Write failed for ${key}:`, error.message);
      if (throwOnError) throw error;
    }

    return appValue;
  }

  async function createMessage(message) {
    await init();
    const existing = getData('galaxy_messages') || [];
    const nextMessage = {
      id: message.id || Date.now(),
      name: message.name || '',
      email: message.email || '',
      phone: message.phone || '',
      preferredContact: message.preferredContact || '',
      service: message.service || '',
      message: message.message || '',
      read: false,
      date: message.date || new Date().toISOString(),
    };
    const updated = sortValue('galaxy_messages', [nextMessage, ...existing]);
    lsSet('galaxy_messages', updated);

    if (mode !== 'supabase') return nextMessage;

    try {
      let row = {
        name: nextMessage.name,
        email: nextMessage.email,
        phone: nextMessage.phone,
        preferred_contact: nextMessage.preferredContact,
        service: nextMessage.service,
        message: nextMessage.message,
        read: false,
        created_at: nextMessage.date,
      };
      while (true) {
        try {
          await supabase.from('messages').insert(row);
          break;
        } catch (error) {
          const missingColumn = getMissingColumnFromError(error);
          if (!missingColumn) throw error;
          unsupportedColumnsForTable('messages').add(missingColumn);
          row = sanitizeDbValueForTable('messages', row);
        }
      }
      try {
        await redis.del(getCacheKey('galaxy_messages'));
      } catch {}
    } catch (error) {
      console.warn('[GalaxyDB] Message insert failed:', error.message);
    }

    return nextMessage;
  }

  async function uploadFile(bucket, path, file) {
    await init();
    if (mode !== 'supabase') {
      return fileToDataUrl(file).then((url) => ({ url, path: '' }));
    }

    try {
      await ensureCloudAdminWriteAccess();
      const bucketName = resolveBucket(bucket);
      await supabase.storage.from(bucketName).upload(path, file, { upsert: true });
      const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
      return { url: data.publicUrl, path };
    } catch (error) {
      // Do not fall back to base64 when Supabase is configured.
      // Silent base64 fallback can overflow localStorage and make refresh appear to "lose" uploads.
      console.warn('[GalaxyDB] Upload failed:', error.message);
      throw error;
    }
  }

  async function deleteFile(bucket, path) {
    await init();
    if (mode !== 'supabase' || !path) return;
    try {
      await ensureCloudAdminWriteAccess();
      await supabase.storage.from(resolveBucket(bucket)).remove([path]);
    } catch (error) {
      console.warn('[GalaxyDB] Delete file failed:', error.message);
    }
  }

  async function invalidate(key) {
    await init();
    if (mode !== 'supabase') return;
    try {
      await redis.del(getCacheKey(key));
    } catch {}
  }

  function status() {
    return {
      ready,
      mode,
      supabaseEnabled: GDB_CONFIG.enabled,
      redisEnabled: Boolean(GDB_CONFIG.redis.url && GDB_CONFIG.redis.token),
    };
  }

  async function listStorageFiles(bucket, options = {}) {
    await init();
    if (mode !== 'supabase') return [];
    const bucketName = resolveBucket(bucket);
    const payload = {
      prefix: options.prefix || '',
      limit: Number(options.limit || 500),
      offset: Number(options.offset || 0),
      sortBy: { column: 'created_at', order: 'desc' },
    };
    try {
      const data = await supabase._fetch(`/storage/v1/object/list/${bucketName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn('[GalaxyDB] Storage list failed:', error.message);
      return [];
    }
  }

  return { init, getAll, setAll, createMessage, uploadFile, deleteFile, invalidate, status, listStorageFiles };
})();

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getData(key) {
  ensureLocalDefaults();
  const stored = lsGet(key);
  if (stored !== null) return sortValue(key, stored);
  return getDefaultValue(key);
}

function setData(key, value) {
  const normalized = OBJECT_KEYS.has(key)
    ? { ...getDefaultValue(key), ...(value || {}) }
    : sortValue(key, Array.isArray(value) ? value : []);
  lsSet(key, normalized);
  lsSet(syncPendingKey(key), { startedAt: new Date().toISOString() });
  lsRemove(syncErrorKey(key));
  GalaxyDB.setAll(key, normalized).catch((error) => {
    console.warn(`[GalaxyDB] Background sync failed for ${key}:`, error.message);
  });
}

function getSyncState(key) {
  return {
    hasPending: hasSyncPending(key),
    hasError: hasSyncError(key),
    pending: lsGet(syncPendingKey(key)),
    error: lsGet(syncErrorKey(key)),
  };
}

function nextId(list) {
  return Array.isArray(list) && list.length
    ? Math.max(...list.map((item) => Number(item.id || 0))) + 1
    : 1;
}

function initDefaults() {
  ensureLocalDefaults();
  GalaxyDB.init().catch(() => {});
}

async function loadFromCloud(key) {
  const localValue = lsGet(key);
  const cloudValue = await GalaxyDB.getAll(key, { forceCloud: true });
  const shouldPreferLocalFallback = hasSyncPending(key) || hasSyncError(key);
  const nextValue = OBJECT_KEYS.has(key)
    ? shouldPreferLocalFallback
      ? mergeObjectWithLocalFallback(localValue, cloudValue, true)
      : mergeObjectWithLocalFallback(localValue, cloudValue, false)
    : shouldPreferLocalFallback
      ? mergeCollectionWithLocalFallback(localValue, cloudValue, key, true)
      : cloudValue;
  lsSet(key, nextValue);
  return nextValue;
}

async function saveDataNow(key, value) {
  const normalized = OBJECT_KEYS.has(key)
    ? { ...getDefaultValue(key), ...(value || {}) }
    : sortValue(key, Array.isArray(value) ? value : []);
  lsSet(key, normalized);
  lsSet(syncPendingKey(key), { startedAt: new Date().toISOString() });
  lsRemove(syncErrorKey(key));
  return GalaxyDB.setAll(key, normalized, { throwOnError: true });
}

function collectionIds(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => Number(row?.id))
    .filter((id) => Number.isFinite(id));
}

async function uploadMedia(file, bucket = 'gallery') {
  const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'bin';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  return GalaxyDB.uploadFile(bucket, path, file);
}

async function deleteStoredMedia(bucket, path) {
  return GalaxyDB.deleteFile(bucket, path);
}

async function saveContactMessage(message) {
  const result = await GalaxyDB.createMessage(message);
  createSystemNotification({
    title: 'New customer message',
    message: `${message?.name || 'A visitor'} sent a new ${message?.service ? `${message.service} ` : ''}message.`,
    type: 'Message',
    audience: 'admin',
    source: 'messages',
  });
  return result;
}

function createSystemNotification(entry = {}) {
  const list = pruneExpiredNotifications(getData('galaxy_notifications') || []);
  const createdAt = entry.createdAt || new Date().toISOString();
  const item = {
    id: nextId(list),
    title: String(entry.title || '').trim() || 'Update',
    message: String(entry.message || '').trim() || 'A new update is available.',
    type: String(entry.type || 'Info').trim() || 'Info',
    active: entry.active !== false,
    audience: ['public', 'admin', 'both'].includes(String(entry.audience || '').toLowerCase())
      ? String(entry.audience || '').toLowerCase()
      : 'both',
    source: String(entry.source || 'system').trim() || 'system',
    createdAt,
    expiresAt: entry.expiresAt || notificationExpiryFor(createdAt),
  };
  const next = [item, ...list].slice(0, 80);
  setData('galaxy_notifications', next);
  return item;
}

function getNotificationsForAudience(audience = 'public') {
  const target = String(audience || 'public').toLowerCase();
  return pruneExpiredNotifications(getData('galaxy_notifications') || [])
    .filter((item) => item && item.active !== false)
    .filter((item) => {
      const scope = String(item.audience || 'both').toLowerCase();
      return scope === 'both' || scope === target;
    })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function mediaTypeFromName(name = '') {
  const lower = String(name).toLowerCase();
  if (/\.(mp4|webm|ogg|mov|m4v)$/.test(lower)) return 'video';
  if (/\.(png|jpg|jpeg|gif|webp|bmp|svg)$/.test(lower)) return 'image';
  return 'other';
}

function titleFromFilename(name = '') {
  return String(name).replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'Recovered upload';
}

async function recoverGalleryFromStorage() {
  await GalaxyDB.init();
  const files = await GalaxyDB.listStorageFiles('gallery', { limit: 500 });
  const recovered = files
    .filter((file) => file?.name && !file.id?.endsWith('/'))
    .map((file, index) => {
      const type = mediaTypeFromName(file.name);
      if (type === 'other') return null;
      const bucketName = resolveBucket('gallery');
      const publicUrl = `${GDB_CONFIG.supabase.url}/storage/v1/object/public/${bucketName}/${file.name}`;
      return {
        id: Date.now() + index,
        type,
        title: titleFromFilename(file.name),
        desc: '',
        url: type === 'video' ? publicUrl : publicUrl,
        thumb: type === 'image' ? publicUrl : '',
        icon: type === 'video' ? 'video' : 'graphic',
        storagePath: file.name,
        thumbStoragePath: '',
        createdAt: file.created_at || new Date().toISOString(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (recovered.length) {
    await GalaxyDB.setAll('galaxy_gallery', recovered);
    lsSet('galaxy_gallery', recovered);
  }
  return recovered;
}

async function recoverAboutAvatarFromStorage() {
  await GalaxyDB.init();
  const about = getData('galaxy_about') || {};
  if (about.avatar) return about;
  const files = await GalaxyDB.listStorageFiles('avatars', { limit: 200 });
  const image = files.find((file) => mediaTypeFromName(file?.name) === 'image');
  if (!image?.name) return about;
  const bucketName = resolveBucket('avatars');
  const avatarUrl = `${GDB_CONFIG.supabase.url}/storage/v1/object/public/${bucketName}/${image.name}`;
  const next = {
    ...about,
    avatar: avatarUrl,
    avatarStoragePath: image.name,
  };
  await GalaxyDB.setAll('galaxy_about', next);
  lsSet('galaxy_about', next);
  return next;
}

async function recoverMediaFromStorageNow() {
  const [gallery, about] = await Promise.all([
    recoverGalleryFromStorage(),
    recoverAboutAvatarFromStorage(),
  ]);
  return { galleryCount: gallery.length, aboutRecovered: Boolean(about?.avatar) };
}

window.GDB_CONFIG = GDB_CONFIG;
window.GalaxyDB = GalaxyDB;
window.GalaxyAuth = GalaxyAuth;
window.getData = getData;
window.setData = setData;
window.getSyncState = getSyncState;
window.nextId = nextId;
window.initDefaults = initDefaults;
window.loadFromCloud = loadFromCloud;
window.saveDataNow = saveDataNow;
window.uploadMedia = uploadMedia;
window.deleteStoredMedia = deleteStoredMedia;
window.saveContactMessage = saveContactMessage;
window.createSystemNotification = createSystemNotification;
window.getNotificationsForAudience = getNotificationsForAudience;
window.pruneExpiredNotifications = pruneExpiredNotifications;
window.NOTIFICATION_TTL_MS = NOTIFICATION_TTL_MS;
window.recoverGalleryFromStorage = recoverGalleryFromStorage;
window.recoverAboutAvatarFromStorage = recoverAboutAvatarFromStorage;
window.recoverMediaFromStorageNow = recoverMediaFromStorageNow;
window.BASE_DEFAULTS = BASE_DEFAULTS;
window.normalizeQrSetting = normalizeQrSetting;
window.serializeQrSetting = serializeQrSetting;
window.getMediaSourceBase = window.getMediaSourceBase || getMediaSourceBase;
window.buildMediaSourceMeta = window.buildMediaSourceMeta || buildMediaSourceMeta;
window.isPinnedMedia = window.isPinnedMedia || isPinnedMedia;
window.isPremiumMedia = window.isPremiumMedia || isPremiumMedia;
window.comparePrioritizedMedia = window.comparePrioritizedMedia || comparePrioritizedMedia;
window.__GALAXY_GET_DATA__ = getData;
window.__GALAXY_SET_DATA__ = setData;
window.__GALAXY_NEXT_ID__ = nextId;
window.__GALAXY_INIT_DEFAULTS__ = initDefaults;

ensureLocalDefaults();
GalaxyDB.init().catch(() => {});

console.info('[GalaxyDB] Storage layer ready.', GalaxyDB.status());

