const { registerRoute } = require('workbox-routing');
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);
registerRoute(({ request }) => request.destination === 'script', assetCache);
registerRoute(({ request }) => request.destination === 'style', assetCache);
registerRoute(({ request }) => request.destination === 'image', assetCache);