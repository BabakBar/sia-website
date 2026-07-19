// Kill switch for the removed PWA service worker. Visitors who installed the
// old worker fetch this file on their next visit; it clears all caches,
// unregisters itself, and reloads open tabs so they get live content again.
// Keep this file deployed at /sw.js for several months before deleting it.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
