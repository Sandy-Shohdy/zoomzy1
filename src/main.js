import { fetchPhotos } from "./fetch.js";
import { renderPhotoCard } from "./renderPhotoCard.js";

const toggle = document.getElementById("toggle");
const body = document.body;

toggle.addEventListener("click", () => {
  const isLight = body.classList.toggle("light");
  toggle.classList.toggle("light", isLight);
});

const app = document.querySelector("#app");
let page = 1; // start from page 1
const totalPages = 20; // we know there are 20 pages total

// Load and display photos
async function loadPhotos() {
  const photos = await fetchPhotos(page);
  photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));
  setTimeout(() => {
    app.style.display = "none";
    app.offsetHeight; // triggers reflow
    app.style.display = "block";
  }, 200);
}

// Load more button
async function setupLoadMore() {
  const btn = document.createElement("button");
  btn.id = "load-more";
  btn.textContent = "Load more pictures";

  const loading = document.createElement("div");
  loading.id = "loading";
  loading.textContent = "Loading...";

  const main = document.querySelector("main");
  main.appendChild(btn);
  main.appendChild(loading);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    loading.style.display = "block";
    page++;
    await loadPhotos();
    loading.style.display = "none";
    btn.disabled = false;
  });
}

// 🚀 Initialize
async function init() {
  await loadPhotos();
  setupLoadMore();
}

init();
