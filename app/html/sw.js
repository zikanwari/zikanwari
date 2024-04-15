const CACHE_NAME = `zikanwari-v1.6.4`;

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
          const fetchResponse = await fetch(event.request);

          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
        }
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheKeys = await caches.keys();

    const oldCacheKeys = cacheKeys.filter(key => key.indexOf('zikanwari-') === 0 && key !== CACHE_NAME);
    console.log("New version!!! Yeahhhhh!!!")

    // Delete the old caches.
    await Promise.all(oldCacheKeys.map(key => caches.delete(key)));
  })());
});

self.addEventListener('push', event => {
  console.log("push notification received");
  self.registration.showNotification(event.data.json().title, {
    icon: event.data.json().icon,
    body: event.data.json().body
  })
})