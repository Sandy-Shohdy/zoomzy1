// src/features/imageZoom.js
export function setupImageZoom(container) {
  const images = container.querySelectorAll("img");
  let currentIndex = -1;

  images.forEach((img, index) => {
    img.addEventListener("click", () => openImage(img, index));
  });

  function openImage(img, index) {
    currentIndex = index;

    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const zoomed = document.createElement("img");
    zoomed.src = img.src;
    zoomed.classList.add("zoomed-image");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "×";

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("nav-arrow", "prev");
    prevBtn.textContent = "‹";

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("nav-arrow", "next");
    nextBtn.textContent = "›";

    overlay.appendChild(zoomed);
    overlay.appendChild(closeBtn);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    document.body.appendChild(overlay);

    // Görünürlük animasyonunu başlat
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      zoomed.classList.add("visible");
    });

    function showImage(index) {
      zoomed.src = images[index].src;
    }

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    closeBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }
}
