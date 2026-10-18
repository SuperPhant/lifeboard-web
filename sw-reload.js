/*
 * 新版本的 Service Worker 激活时，把还在运行旧版本的页面重新载入成新版本。
 * 旧版本的页面不会自己刷新（它们等用户点“立即更新”），所以由 Service Worker 来做，用户不需要任何操作。
 * 第一次安装（之前没有旧版本）时不刷新。
 */
let replacingOldVersion = false;

self.addEventListener('install', () => {
  replacingOldVersion = !!self.registration.active;
});

self.addEventListener('activate', () => {
  if (!replacingOldVersion) return;
  self.clients.matchAll({ type: 'window' }).then((pages) => {
    for (const page of pages) {
      if ('navigate' in page) page.navigate(page.url).catch(() => {});
    }
  });
});
