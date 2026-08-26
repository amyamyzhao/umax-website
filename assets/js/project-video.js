(() => {
  "use strict";

  document.querySelectorAll("[data-video-shell]").forEach((shell) => {
    const button = shell.querySelector("[data-video-src]");
    if (!button) return;

    button.addEventListener("click", async () => {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "none";
      video.poster = button.dataset.poster || "";
      video.setAttribute("aria-label", button.dataset.videoLabel || "Project video");

      const source = document.createElement("source");
      source.src = button.dataset.videoSrc;
      source.type = "video/mp4";
      video.append(source);

      shell.replaceChildren(video);
      video.load();
      try {
        await video.play();
      } catch {
        // Browser autoplay policy may still require a second tap on the native control.
      }
    }, { once: true });
  });
})();
