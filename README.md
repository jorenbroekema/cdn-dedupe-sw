# Dedupe CDN Service Worker

TODO:

- [x] Verify that only 0.1.5 is loaded, and 0.1.3 and 0.1.4 are deduped to it
- [ ] Put requests into cache API, serve from cache API after rewriting URL's version, if possible. Right now, 3 separate modules are loaded for the same LionButton 0.1.5.
- [ ] Properly activate the service worker
- [ ] Properly update the service worker when appropriate
- [ ] Allow passing a snapshot versions manifest file in order to dedupe not to latest, but to latest at the time the snapshot was generated. This way, dependencies breaking consumer apps without their knowledge can be prevented.
