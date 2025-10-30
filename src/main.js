// --- 🌟 Zoomzy Masonry Layout (Likes & Comments Below Images) ---

const app = document.querySelector("#app");
let page = 1;
const limit = 9;

// 📸 Fetch photos from API
async function fetchPhotos(page) {
  const res = await fetch(`https://image-feed-api.vercel.app/?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load photos 😔");
  return res.json();
}


// 🖼️ Create photo card
function renderPhotoCard(photo) {
  const card = document.createElement("div");
  card.className = "photo-card";
  card.dataset.id = photo.id;

  // Random height for asymmetric layout
  const randomHeight = Math.floor(Math.random() * 300) + 300;

  card.innerHTML = `
    <img src="https://picsum.photos/id/${photo.id}/500/${randomHeight}" alt="${photo.author}" />
    <p class="author">${photo.author}</p>

    <div class="photo-actions">
      <button class="like-btn" data-id="${photo.id}">
        ❤️ <span class="like-count">${getLikeCount(photo.id)}</span>
      </button>
      <button class="comment-btn-toggle">
        💬 <span class="comment-count">${getCommentCount(photo.id)}</span>
      </button>
    </div>

    <div class="comment-section" style="display:none;">
      <ul class="comment-list"></ul>
      <div class="comment-input">
        <input type="text" placeholder="Add a comment..." />
        <button class="comment-btn">Post</button>
      </div>
    </div>
  `;

  setupLike(card);
  setupComments(card);
  return card;
}

// ❤️ Get like count from localStorage
function getLikeCount(id) {
  const likes = JSON.parse(localStorage.getItem("likes")) || {};
  return likes[id] || 0;
}

// ❤️ Save like count to localStorage
function saveLikeCount(id, count) {
  const likes = JSON.parse(localStorage.getItem("likes")) || {};
  likes[id] = count;
  localStorage.setItem("likes", JSON.stringify(likes));
}

// 💬 Get comment count from localStorage
function getCommentCount(id) {
  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  return comments[id] ? comments[id].length : 0;
}

// ❤️ Like functionality
function setupLike(card) {
  const btn = card.querySelector(".like-btn");
  const countSpan = card.querySelector(".like-count");
  const id = card.dataset.id;

  btn.addEventListener("click", () => {
    const currentCount = parseInt(countSpan.textContent);
    const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || [];

    if (btn.classList.toggle("liked")) {
      countSpan.textContent = currentCount + 1;
      saveLikeCount(id, currentCount + 1);
      likedPhotos.push(id);
    } else {
      countSpan.textContent = currentCount - 1;
      saveLikeCount(id, currentCount - 1);
      const index = likedPhotos.indexOf(id);
      if (index !== -1) likedPhotos.splice(index, 1);
    }

    localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
  });
}

// 💬 Comment functionality
function setupComments(card) {
  const section = card.querySelector(".comment-section");
  const input = card.querySelector(".comment-input input");
  const postBtn = card.querySelector(".comment-btn");
  const list = card.querySelector(".comment-list");
  const id = card.dataset.id;
  const toggleBtn = card.querySelector(".comment-btn-toggle");

  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  if (comments[id]) comments[id].forEach((c) => renderComment(list, c));

  toggleBtn.addEventListener("click", () => {
    section.style.display = section.style.display === "none" ? "block" : "none";
  });

  postBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    renderComment(list, text);
    input.value = "";

    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    if (!comments[id]) comments[id] = [];
    comments[id].push(text);
    localStorage.setItem("comments", JSON.stringify(comments));

    card.querySelector(".comment-count").textContent = comments[id].length;
  });
}

// 💬 Render comment in DOM
function renderComment(list, text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

// 🧩 Load photos to the gallery
async function loadPhotos() {
  const photos = await fetchPhotos(page);
  photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));
}

// 🔁 Setup Load More button
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

// 🚀 Initialize app
async function init() {
  await loadPhotos();
  setupLoadMore();
}

init();
