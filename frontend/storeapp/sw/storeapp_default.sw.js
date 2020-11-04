self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('storeapp').then((cache) => {
            return cache.addAll(
                [
                    '/assets/DE/default/js/storeapp_default.app.js',
                    '/assets/DE/default/js/storeapp_default.vendor.js',
                    '/assets/DE/default/css/storeapp_default.app.css',
                    '/assets/DE/default/fonts/ALDISUEDOT-Bold.woff',
                    '/assets/DE/default/fonts/ALDISUEDOT-Bold.woff2',
                    '/assets/DE/default/fonts/ALDISUEDOT-Condensed.woff',
                    '/assets/DE/default/fonts/ALDISUEDOT-Condensed.woff2',
                    '/assets/DE/default/fonts/ALDISUEDOffice-Regular.woff',
                    '/assets/DE/default/fonts/ALDISUEDOffice-Regular.woff2',
                    '/assets/DE/default/fonts/ALDISUEDOffice-Bold.woff',
                    '/assets/DE/default/fonts/ALDISUEDOffice-Bold.woff2',
                    '/assets/DE/default/fonts/ALDISUEDOT-Regular.woff',
                    '/assets/DE/default/fonts/ALDISUEDOT-Regular.woff2',
                    '/assets/DE/default/images/pfand.jpg'
                ]
            );
        })
    );
});

function clearCachedPages(cache, event) {
    cache.keys().then((keys) => {
        const isNewDrop = event.request.url.search('current-order') > 0 ||
            event.request.url.search('list') > 0;

        if (isNewDrop) {
            keys.forEach((cachedPage) => {
                if(cachedPage.url.search('list') < 0) {
                    cache.delete(cachedPage);
                }
            });
        }
    });
}

self.addEventListener('fetch', (event) => {
    if (event.request.url.search('assets') >= 0) {
        event.respondWith(
            caches.open('storeapp').then((cache) => {
                return cache.match(event.request).then((response) => {
                    return response || fetch(event.request).then((response) => {
                        cache.put(event.request, response.clone());

                        return response;
                    });
                });
            })
        );
    } else if (
        event.request.url.search('_profiler') === -1 &&
        event.request.method !== 'POST'
    ) {
        event.respondWith(
            caches.open('pages').then((cache) => {
                return cache.match(event.request).then((cacheResponse) => {
                    clearCachedPages(cache, event);

                    return fetch(event.request).then((response) => {
                        cache.put(event.request, response.clone());

                        return response;
                    }).catch((error) => cacheResponse);
                });
            })
        );
    }
});
