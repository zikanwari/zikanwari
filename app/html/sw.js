const CACHE_NAME = `zikanwari-v0.8`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      { url: '/zikanwari/', cache: "no-cache" }
    ]);
  })());
});

self.addEventListener('fetch', event => {
    // 外部のリソースかどうかを判定する
  if (event.request.url.startsWith('http')) {
    // 外部のリソースの場合は、キャッシュに追加しない
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});