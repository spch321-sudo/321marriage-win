/* 321 婚姻得勝者 Service Worker */
var CACHE = "cw321-v26";
var ASSETS = ["./","./index.html","./manifest.webmanifest","./icon-192-v2.png","./icon-512-v2.png","./icon-512-maskable-v2.png","./icon-180-v2.png","./favicon-32-v2.png"];
self.addEventListener("install", function(e){ self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); })); });
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){ return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); })); }));
  self.clients.claim(); });
self.addEventListener("fetch", function(e){ if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(function(cached){
    var net=fetch(e.request).then(function(res){ if(res&&res.status===200){ var cp=res.clone(); caches.open(CACHE).then(function(c){ c.put(e.request,cp); }); } return res; })["catch"](function(){ return cached; });
    return cached||net; })); });
