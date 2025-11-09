// main.js
import { fetchPhotos } from "./fetch.js";
import { renderPhotoCard } from "./renderPhotoCard.js";
import { setupLoadMore } from "./features/loadmore.js";

// 🌗 THEME TOGGLE (Sandy's feature)
const toggle = document.getElementById("toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  toggle.classList.add("light");
}

toggle.onclick = () => {
  const isLight = body.classList.toggle("light");
  toggle.classList.toggle("light", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

<<<<<<< HEAD
=======
// 🖼️ GALLERY & LOAD MORE
>>>>>>> feature/comments
const app = document.querySelector("#app");

<<<<<<< HEAD
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
  loading.textContent = "";

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
=======
>>>>>>> feature/comments
async function init() {
  const photos = await fetchPhotos(1);
  photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));
  setupLoadMore(app);
}

init();

// 🔝 SCROLL TO TOP BUTTON (Simman's feature)
let myButton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

myButton.addEventListener("click", topFunction);
