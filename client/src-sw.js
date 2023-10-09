const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute, setDefaultHandler, setCatchHandler } = require('workbox-routing');
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
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    }),
  ],
});


registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
const fallbackHtml = '/index.html';
const fallbackImg = '/assets/images/logo.png';

warmStrategyCache({
  urls: [fallbackHtml, fallbackImg],
  strategy: pageCache,
});

setDefaultHandler(new StaleWhileRevalidate());

setCatchHandler(async ({ request }) => {
switch (request.destination) {
  case 'document':
    return caches.match(fallbackHtml);
  case 'image':
    return caches.match(fallbackImg);
  default:
    return Response.error();
  }
});

registerRoute();
