// Имя кэша
const CACHE_NAME = 'sitereview-v1.2';

// Файлы для кэширования
const urlsToCache = [
  '/sitereview.github.io/',
  '/sitereview.github.io/index.html',
  '/sitereview.github.io/main.css',
  '/sitereview.github.io/main.js',
  '/sitereview.github.io/data.js',
  '/sitereview.github.io/banner.js',
  '/sitereview.github.io/iconi.png',
  '/sitereview.github.io/manifest.json',
  '/sitereview.github.io/reviews-seo.html',
  '/sitereview.github.io/sitemap.xml'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Обработка запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если есть в кэше - возвращаем
        if (response) {
          return response;
        }

        // Иначе загружаем из сети
        return fetch(event.request).then(
          response => {
            // Проверяем, валидный ли ответ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонируем ответ
            const responseToCache = response.clone();

            // Сохраняем в кэш
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(() => {
          // Если офлайн и запрос HTML - показываем offline страницу
          if (event.request.mode === 'navigate') {
            return caches.match('/sitereview.github.io/index.html');
          }
        });
      })
  );
});
