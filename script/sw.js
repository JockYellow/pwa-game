const CACHE_NAME = 'pwa-posts-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    fetch('cache-list.json')
      .then(res => res.json())
      .then(files => {
        return caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(files);
        });
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
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
