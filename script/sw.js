const CACHE_NAME = 'pwa-posts-v1';

const urlsToCache = [
"cache-list.json" 
, "index.html" 
, "manifest.json" 
, "posts.json" 
, "seen.html" 
, "view.html" 
, "avatars/love.png" 
, "avatars/m.png" 
, "avatars/mountain.png" 
, "avatars/s.png" 
, "script/core.js" 
, "script/seen.js" 
, "script/sw-register.js" 
, "script/sw.js" 
, "script/view.js" 
, "style/main.css" 
];

// 安裝階段：快取所有資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 抓取階段：優先從快取取，用不到才從網路抓
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // 離線又沒快取就自動跳過，避免 crash
      return new Response("離線狀態，且沒有找到快取資源", {
        status: 503,
        statusText: "Service Unavailable"
      });
    })
  );
});

// 啟用階段：刪除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
