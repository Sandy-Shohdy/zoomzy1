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
  photos.forEach(async (photo) => {
    try {
      const res = await fetch(
        `https://image-feed-api.vercel.app/api/images/${photo.id}/like`, //likes it once to get updated count
        {
          method: "POST", //HTPP method
        }
      );
      const data = await res.json();
      if (data.success) photo.likes_count = data.likes_count; //makes current photo like === API real like number
    } catch (err) {
      console.error("Number of likes could not be fetched: ", err);
    }

    app.appendChild(renderPhotoCard(photo));
  });

  setupLoadMore(app);

  setTimeout(() => {
    console.log("Setup listeners");
    setupImageZoom(app); // ✅ added here
  }, 1000);
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
