/*
 * When a new version of the Service Worker activates, reload pages that are still running the old version.
 * Old pages never refresh on their own, so the Service Worker does it and the user doesn't have to do anything.
 * Nothing is reloaded on the very first install (there is no old version yet).
 * This file is copied into the public build as-is (not minified), so keep its comments in English.
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
