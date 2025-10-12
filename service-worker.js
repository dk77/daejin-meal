//캐시 이름 업데이트할 때마다 버전 바꿔주기@!!
const CACHE_NAME = "dadigo-cache-v1";

//캐싱할 파일 목록
const FILES_TO_CACHE = [
  "/", 
  "/index.html", 
  "/style.css", 
  "/script.js", 
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-1024.png",
  "/img.png"        
];

//캐시 저장
self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching app shell...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

//이전 캐시 삭제
self.addEventListener("activate", event => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
