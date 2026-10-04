/* Database Pathshala service worker — offline support */
const CACHE = 'dbp-v2';
const SHELL = [
  './', './index.html', './manifest.webmanifest', './css/style.css',
  './js/firebase-config.js', './js/sync.js', './js/visuals.js', './js/app.js',
  './js/data/ch1.js', './js/data/ch2.js', './js/data/ch3.js', './js/data/ch4.js', './js/data/ch5.js', './js/data/ch6.js', './js/data/cq1.js', './js/data/cq2.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/favicon.png', './icons/apple-touch-icon.png', './README.md'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never cache Firebase traffic (auth / firestore); only the SDK files and fonts.
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const isSdk = url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');
  if (url.origin === location.origin) {
    // stale-while-revalidate for the app itself
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
  } else if (isFont || isSdk) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const r = await fetch(req);
      c.put(req, r.clone());
      return r;
    }));
  }
});
