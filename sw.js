const CACHE_NAME = 'galaxy-pwa-v1';
const APP_SHELL = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './portfolio.html',
  './gallery.html',
  './adavatar.html',
  './contact.html',
  './config.js',
  './shared.js',
  './shared.css',
  './db.js',
  './icons.js',
  './logo.png',
  './logo-192.png',
  './logo-512.png',
  './manifest.webmanifest',
  './admin/index.html',
  './admin/about.html',
  './admin/services.html',
  './admin/portfolio.html',
  './admin/gallery.html',
  './admin/testimonials.html',
  './admin/team.html',
  './admin/adavatar.html',
  './admin/notifications.html',
  './admin/messages.html',
  './admin/settings.html',
  './admin/admin.js',
  './admin/admin.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match('./index.html');
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
    })
  );
});
