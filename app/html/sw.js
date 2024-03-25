const CACHE_NAME = `zikanwari-v1.5.1`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/'
    ]);
  })());
});

self.addEventListener('fetch', event => {
    // 外部のリソースかどうかを判定する
  if (event.request.url.startsWith('https://api.launchpencil.f5.si')) {
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

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Get all the cache keys (cache names)
    const cacheKeys = await caches.keys();

    // Filter out the old cache keys that have the app name in them.
    const oldCacheKeys = cacheKeys.filter(key => key.indexOf('zikanwari-') === 0 && key !== CACHE_NAME);
    console.log("New version!!! Yeahhhhh!!!")

    // Delete the old caches.
    await Promise.all(oldCacheKeys.map(key => caches.delete(key)));
  })());
});

self.addEventListener('push', event => {
  console.log("push notification received");
  self.registration.showNotification("通知が届きました", {
    body: event.data.text()
  })
})