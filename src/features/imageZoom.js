export function setupImageZoom(container) {
  const images = container.querySelectorAll("img");
  let currentIndex = -1;

  // Add a click event to every image to trigger the zoom view
  images.forEach((img, index) => {
    img.addEventListener("click", () => openImage(img, index));
  });

  // Opens the clicked image in a full-screen overlay
  function openImage(img, index) {
    currentIndex = index;

    // Create the overlay background (dark transparent layer)
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    // Create a zoomed version of the clicked image
    const zoomed = document.createElement("img");
    zoomed.src = img.src;
    zoomed.classList.add("zoomed-image");

    // Create the close (X) button
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "×";

    // Append all elements to the overlay
    overlay.appendChild(zoomed);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Use requestAnimationFrame to start the visibility animation
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      zoomed.classList.add("visible");
    });

    // Remove overlay when close button is clicked
    closeBtn.addEventListener("click", () => overlay.remove());

    // Remove overlay when user clicks outside the image
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }
}
