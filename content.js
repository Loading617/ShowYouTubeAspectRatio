(function () {
  function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }

  function ratioString(width, height) {
    if (!width || !height) return '';
    const g = gcd(width, height);
    const rw = Math.round(width / g);
    const rh = Math.round(height / g);
    return `${rw}:${rh}`;
  }

  function injectWatchPage() {
    const viewsEl = document.querySelector('#info ytd-video-view-count-renderer span, span.view-count');
    const videoEl = document.querySelector('video.html5-main-video');

    if (!viewsEl || !videoEl) return;
    if (viewsEl.dataset.aspectInjected) return;

    viewsEl.dataset.aspectInjected = "true";

    const ratio = ratioString(videoEl.videoWidth, videoEl.videoHeight);
    if (ratio) {
      const span = document.createElement('span');
      span.style.marginLeft = "8px";
      span.style.fontWeight = "bold";
      span.style.color = "#666";
      span.textContent = `[${ratio}]`;
      viewsEl.insertAdjacentElement('afterend', span);
    }
  }

  function injectSearchResults() {
    const items = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-grid-media');
    for (const item of items) {
      const meta = item.querySelector('#metadata-line span');
      const thumb = item.querySelector('img#img');
      if (!meta || !thumb) continue;

      if (meta.dataset.aspectInjected) continue;
      meta.dataset.aspectInjected = "true";

      const width = thumb.naturalWidth || thumb.width;
      const height = thumb.naturalHeight || thumb.height;
      const ratio = ratioString(width, height);

      if (ratio) {
        const span = document.createElement('span');
        span.style.marginLeft = "6px";
        span.style.color = "#666";
        span.textContent = `[${ratio}]`;
        meta.insertAdjacentElement('afterend', span);
      }
    }
  }

  function injectShorts() {
    const shorts = document.querySelectorAll('ytd-reel-video-renderer');
    for (const item of shorts) {
      const meta = item.querySelector('#metadata-line span, span.inline-metadata-item');
      const thumb = item.querySelector('img#thumbnail');
      if (!meta || !thumb) continue;

      if (meta.dataset.aspectInjected) continue;
      meta.dataset.aspectInjected = "true";

      const width = thumb.naturalWidth || thumb.width;
      const height = thumb.naturalHeight || thumb.height;
      const ratio = ratioString(width, height);

      if (ratio) {
        const span = document.createElement('span');
        span.style.marginLeft = "6px";
        span.style.color = "#666";
        span.textContent = `[${ratio}]`;
        meta.insertAdjacentElement('afterend', span);
      }
    }
  }

  function run() {
    injectWatchPage();
    injectSearchResults();
    injectShorts();
  }

  run();
  const obs = new MutationObserver(run);
  obs.observe(document.body, { childList: true, subtree: true });

  setInterval(run, 2000);
})();
