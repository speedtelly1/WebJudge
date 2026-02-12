// service-worker.js
// Автоматическое определение версии на основе даты сборки
const CACHE_NAME = `sitereview-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-v${Date.now()}`;

// Функция для получения списка файлов для кэширования
async function getCacheUrls() {
  // Базовые файлы, которые всегда должны быть в кэше
  const baseUrls = [
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

  try {
    // Пытаемся получить актуальный список файлов из сети
    const response = await fetch('/sitereview.github.io/cache-manifest.json', {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const manifest = await response.json();
      return [...new Set([...baseUrls, ...manifest.files])];
    }
  } catch (e) {
    console.log('Cache manifest not found, using fallback list');
  }

  // Fallback - статический список
  return [
    ...baseUrls,
    '/sitereview.github.io/main.css',
    '/sitereview.github.io/main.js',
    '/sitereview.github.io/data.js',
    '/sitereview.github.io/banner.js',
    '/sitereview.github.io/reviews-seo.html',
    '/sitereview.github.io/sitemap.xml'
  ];
}

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const urlsToCache = await getCacheUrls();
      
      console.log('Caching files:', urlsToCache);
      
      // Кэшируем файлы с обработкой ошибок
      await Promise.all(
        urlsToCache.map(url => 
          cache.add(url).catch(err => 
            console.warn(`Failed to cache ${url}:`, err)
          )
        )
      );
      
      // Принудительная активация нового SW
      await self.skipWaiting();
    })()
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Удаляем все старые кэши
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name.startsWith('sitereview-') && name !== CACHE_NAME
      );
      
      await Promise.all(
        oldCaches.map(name => caches.delete(name))
      );
      
      console.log('Activated new SW, cache:', CACHE_NAME);
      console.log('Removed old caches:', oldCaches.length);
      
      // Немедленно захватываем контроль над страницами
      await self.clients.claim();
    })()
  );
});

// Стратегия кэширования: Stale-while-revalidate
self.addEventListener('fetch', event => {
  // Игнорируем запросы не к нашему сайту
  if (!event.request.url.includes('/sitereview.github.io/')) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Пробуем получить из кэша
      const cachedResponse = await cache.match(event.request);
      
      // Параллельно загружаем новую версию
      const networkPromise = fetch(event.request)
        .then(networkResponse => {
          // Обновляем кэш
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => null);
      
      // Возвращаем кэш, если есть, иначе ждём сеть
      return cachedResponse || networkPromise;
    })()
  );
});

// Обработка сообщений от клиента
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'update') {
    self.skipWaiting().then(() => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage('reload'));
      });
    });
  }
});

// Периодическая проверка обновлений (если поддерживается)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-cache') {
      event.waitUntil(updateCache());
    }
  });
}

// Функция обновления кэша
async function updateCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const urlsToUpdate = await getCacheUrls();
    
    await Promise.all(
      urlsToUpdate.map(url => 
        fetch(url, { cache: 'no-store' })
          .then(response => {
            if (response.ok) {
              return cache.put(url, response);
            }
          })
          .catch(err => console.warn(`Failed to update ${url}:`, err))
      )
    );
    
    console.log('Cache updated at:', new Date().toISOString());
  } catch (error) {
    console.error('Cache update failed:', error);
  }
}
