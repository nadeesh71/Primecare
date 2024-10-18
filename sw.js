 self.addEventListener('install',event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/Primecare/', // Update this path
                '/Primecare/index.html', // Update this path
                '/Primecare/styles/Stylehos1.css', // Update this path 
                '/Primecare/scripts/script.js', // Update this path           
                '/Primecare/icons/favicon/favicon-32x32.png', // Update this path
                '/Primecare/icons/favicon/favicon-16x16.png', // Update this path

            ])
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);

        })
    );
});