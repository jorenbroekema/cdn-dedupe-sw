import semver from "./semver.js";

// hardcoded for now
const versions = ["0.1.3", "0.1.4", "0.1.5"];

self.addEventListener("fetch", (event) => {
  // If we are dealing with a CDN request, grab the pkg and version
  const matches = event.request.url.match(
    /https:\/\/cdn\.jsdelivr\.net\/npm\/(?<pkg>.+?)@(?<version>.+?)\/.+?\+esm$/
  );

  if (matches && matches.groups.pkg === "@lion/ui") {
    const { version } = matches.groups;

    // Check what the maximum version is that satisfies the current version with caret ^ prefix
    const caretedVersion = `^${version}`;
    const resolvedVersion = semver.maxSatisfying(versions, caretedVersion); // 0.1.3 & 0.1.4 becomes 0.1.5

    // Replace the URL with the maximum version that satisfies and serve that instead, deduping dependencies
    const newUrl = event.request.url.replace(version, resolvedVersion);
    event.respondWith(fetch(newUrl).then((response) => response));
  } else {
    event.respondWith(
      // We call .clone() on the request since we might use it in a call to cache.put() later on.
      // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
      // (see https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
      fetch(event.request.clone()).then((response) => response)
    );
  }
});
