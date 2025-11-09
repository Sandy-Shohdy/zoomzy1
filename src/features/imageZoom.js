// src/features/imageZoom.js
export function setupImageZoom(container) {
  container.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const wrapper = document.createElement("div");
    wrapper.classList.add("zoom-wrapper");

    const zoomedImg = img.cloneNode();
    zoomedImg.classList.add("zoomed-image");
    wrapper.appendChild(zoomedImg);

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "✕";
    wrapper.appendChild(closeBtn);

    overlay.appendChild(wrapper);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      zoomedImg.classList.add("visible");
    });

    const closeZoom = () => overlay.remove();
    closeBtn.addEventListener("click", closeZoom);
    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay) closeZoom();
    });
    document.addEventListener(
      "keydown",
      (ev) => {
        if (ev.key === "Escape") closeZoom();
      },
      { once: true }
    );
  });
}
