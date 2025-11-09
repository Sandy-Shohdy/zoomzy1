// ===============================
// 📸 Zoomzy Main Script
// ===============================

import { fetchPhotos } from "./fetch.js";
import { renderPhotoCard } from "./renderPhotoCard.js";
import { setupLoadMore } from "./features/loadmore.js";
import { setupImageZoom } from "./features/imageZoom.js"; // ✅ new import

// ===============================
// 🌗 THEME TOGGLE
// ===============================
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

// ===============================
// 🖼️ GALLERY INITIALIZATION
// ===============================
const app = document.querySelector("#app");

async function init() {
  const photos = await fetchPhotos(1);
  photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));
  setupLoadMore(app);
  setupImageZoom(app); // ✅ added here
}

init();

// ===============================
// 🔝 SCROLL TO TOP BUTTON
// ===============================
const myButton = document.getElementById("myBtn");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
});

myButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
