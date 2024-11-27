// service-worker.js

const CACHE_NAME = 'pwa-lista-tarefas-cache-v1';
const URLS_TO_CACHE = [
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Arquivos em cache");
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Cache antigo removido");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de busca (fetch) para capturar as requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
