import { fetchPhotos } from "./fetch.js";
import { renderPhotoCard } from "./renderPhotoCard.js";

const toggle = document.getElementById("toggle");
const body = document.body;

// 1. Check and apply saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  toggle.classList.add("light");
}

// 2. Toggle on click
toggle.onclick = () => {
  const isLight = body.classList.toggle("light");
  toggle.classList.toggle("light", isLight);

  // 3. Save the current theme
  localStorage.setItem("theme", isLight ? "light" : "dark");
};



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

// scroll to top button //
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
