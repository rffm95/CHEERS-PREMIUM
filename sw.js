'use strict';
// Pages, scripts and the menu come from the network first so price changes appear immediately; the cache is the offline fallback.
const CACHE='cheers-v3';
const SHELL=['./','index.html','style.css','app.js','i18n.js','menu.json','manifest.webmanifest','icons/cheers-192.png'];
const BASE=new URL('./',self.location).pathname;
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;
if(url.pathname.startsWith(BASE+'images/')||url.pathname.startsWith(BASE+'icons/')){e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;})));return;}
e.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req,{ignoreSearch:true}).then(hit=>hit||(req.mode==='navigate'?caches.match('index.html'):Response.error()))));});
