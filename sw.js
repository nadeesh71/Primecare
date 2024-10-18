// Name of the cache
const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    '/Primecare/', // Update this path
    '/Primecare/index.html', // Update this path
    '/Primecare/Stylehos1.css', // Update this path 
    '/Primecare/script.js', // Update this path           
    '/Primecare/icons/favicon-32x32.png', // Update this path
    '/Primecare/icons/favicon-16x16.png', // Update this path
];

// Install event - caching the specified assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching app shell');
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('Removing old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch event - serving cached assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
});
