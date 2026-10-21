/* СПЕКТР: нужен только для установки на экран как приложение. Ничего не кэширует - сайт всегда свежий. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
