// --- 🌟 Zoomzy Final Version with Image Feed API ---

const app = document.querySelector("#app");
let page = 1; // start from page 1
const totalPages = 20; // we know there are 20 pages total

// Fetch photos from the API
function fetchPhotos(page){
  return fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load photos"); //more info about how .ok works on: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
      return res.json();
    })
    .then(json => json.data)
    .catch(error => {      console.error("There was a problem fetching images:", error); //in the browser console we will see this message if there is an error.
    
    app.innerHTML = `<p style="color:red;">Failed to load photos</p>`; //display message in the app area
});
    
}


const randomAuthors = [
  "Luna Rivera",
  "Kai Nakamura",
  "Mila Novak",
  "Omar Hassan",
  "Sophie Laurent",
  "Ethan Kim",
  "Ava Rossi",
  "Leo Carter",
  "Zara Ali",
  "Nina Johansson",
  "Felix Moreau",
  "Isla Becker",
  "Theo Martins",
  "Maya Chen",
  "Noah Patel"
]; // Random author names

// 🖼️ Render each photo card
function renderPhotoCard(photo) {
  const card = document.createElement("div");
  card.className = "photo-card";
  card.dataset.id = photo.id;

  const authorName =
    photo.author || randomAuthors[Math.floor(Math.random() * randomAuthors.length)]; // Use random author, because none is provided by the API

  card.innerHTML = `
    <img src="${photo.image_url}" alt="Photo ${photo.id}" />
    <p class="author">${authorName}</p>


    <div class="photo-actions">
      <button class="like-btn" data-id="${photo.id}">
        ❤️ <span class="like-count">${photo.likes_count || 0}</span>
      </button>
      <button class="comment-btn-toggle">
        💬 <span class="comment-count">${photo.comments?.length || 0}</span>
      </button>
    </div>

    <div class="comment-section" style="display:none;">
      <ul class="comment-list">
        ${(photo.comments || [])
          .map(
            (c) =>
              `<li><strong>${c.commenter_name}:</strong> ${c.comment}</li>`
          )
          .join("")}
      </ul>
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

// ❤️ Like handling (local + API)
function setupLike(card) {
  const btn = card.querySelector(".like-btn");
  const countSpan = card.querySelector(".like-count");
  const id = card.dataset.id;

  btn.addEventListener("click", async () => {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) countSpan.textContent = data.likes_count;
      btn.classList.add("liked");
    } catch (err) {
      console.error("Like failed:", err);
    }
  });
}

// 💬 Comments handling (local + API)
function setupComments(card) {
  const section = card.querySelector(".comment-section");
  const input = card.querySelector(".comment-input input");
  const postBtn = card.querySelector(".comment-btn");
  const list = card.querySelector(".comment-list");
  const id = card.dataset.id;
  const toggleBtn = card.querySelector(".comment-btn-toggle");

  toggleBtn.addEventListener("click", () => {
    section.style.display = section.style.display === "none" ? "block" : "none";
  });

  postBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commenter_name: "User", comment: text }),
      });
      const data = await res.json();
      if (data.success) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${data.comment.commenter_name}:</strong> ${data.comment.comment}`;
        list.appendChild(li);
        input.value = "";
        card.querySelector(".comment-count").textContent = list.children.length;
      }
    } catch (err) {
      console.error("Comment failed:", err);
    }
  });
}

// 🧩 Load and display photos
async function loadPhotos() {
  const photos = await fetchPhotos(page);
  photos.forEach((photo) => app.appendChild(renderPhotoCard(photo)));
}

// 🔁 Load more button
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
