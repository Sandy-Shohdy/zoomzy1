// main.js
import { fetchPhotos } from "./fetch.js";
import { renderPhotoCard } from "./renderPhotoCard.js";
import { setupLoadMore } from "./features/loadmore.js";
import { setupImageZoom } from "./features/imageZoom.js";
import "./styles/features/imageZoom.css";

// 🌗 THEME TOGGLE (Sandy's feature)
const toggle = document.getElementById("toggle");
const body = document.body;

// Apply saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  toggle.classList.add("light");
}

// Toggle dark/light mode
toggle.onclick = () => {
  const isLight = body.classList.toggle("light");
  toggle.classList.toggle("light", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

// 🖼️ GALLERY & LOAD MORE
const app = document.querySelector("#app");

async function init() {
  const photos = await fetchPhotos(1);
  photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));

  // Enable features after rendering
  setupLoadMore(app);
  setupImageZoom(app); // ✅ Move inside init for proper timing
}

init();

// 🔝 SCROLL TO TOP BUTTON (Simman's feature)
const myButton = document.getElementById("myBtn");

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
