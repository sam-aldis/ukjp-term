"use strict";
const urls = [
    '/packages/dom/lib/dom.js',
    '/packages/dom/lib/style.js',
    '/packages/fs/lib/fs.js',
    '/packages/commands/lib/commands.js',
    '/packages/service/lib/sw.js',
    '/packages/service/lib/urls.js',
    '/packages/term/lib/term.js',
    '/index.html'
];
class SW {
    static load() {
        addEventListener("install", SW.onInstall);
        addEventListener("fetch", SW.onFetch);
    }
    static onInstall(ev) {
        ev.waitUntil(caches.open('v0.1')
            .then((cache) => {
            return cache.addAll(urls);
        }));
    }
    static onFetch(ev) {
        ev.respondWith(caches.match(ev.request).then((matchResponse) => {
            return matchResponse || fetch(ev.request).then((fetchResponse) => {
                return caches.open('v0.1').then((cache) => {
                    cache.put(ev.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }));
    }
}
SW.load();
