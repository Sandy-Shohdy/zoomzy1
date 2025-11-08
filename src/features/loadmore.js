// src/features/loadmore.js
import { fetchPhotos } from "../fetch.js";
import { renderPhotoCard } from "../renderPhotoCard.js";

let page = 1;
const totalPages = 20;
let isLoading = false;

export async function setupLoadMore(app) {
  const btn = document.createElement("button");
  btn.id = "load-more";
  btn.textContent = "Load more";

  const loader = document.createElement("div");
  loader.id = "loading-spinner";
  loader.innerHTML = `<div class="spinner"></div>`;
  loader.style.display = "none";

  const main = document.querySelector("main");
  main.appendChild(btn);
  main.appendChild(loader);

  btn.addEventListener("click", async () => {
    if (isLoading || page >= totalPages) return;
    isLoading = true;
    btn.disabled = true;
    loader.style.display = "block";

    page++;
    try {
      const photos = await fetchPhotos(page);
      photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));
    } catch (err) {
      console.error("Error loading more photos:", err);
    } finally {
      loader.style.display = "none";
      btn.disabled = false;
      isLoading = false;
    }
  });
}
