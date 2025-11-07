// renderPhotoCard.js
import { setupLike } from "./setupLike.js";
import { setupComments } from "./setupComments.js";

const randomAuthors = [
  "Luna Rivera", "Kai Nakamur", "Mila Novak", "Omar Hassan", "Sophie Laurent",
  "Ethan Kim", "Ava Rossi", "Leo Carter", "Zara Ali", "Nina Johansson",
  "Felix Moreau", "Isla Becker", "Theo Martins", "Maya Chen", "Noah Patel",
  "Elena Garcia", "Jonas Weber", "Aria Silva", "Mateo Cruz", "Yuna Takahashi",
  "Gabriel Sousa", "Clara Müller", "Ravi Sharma", "Layla Haddad", "Sebastian Torres"
];

export function renderPhotoCard(photo) {
  const card = document.createElement("div");
  card.className = "photo-card";
  card.dataset.id = photo.id;

  const authorName =
    photo.author || randomAuthors[Math.floor(Math.random() * randomAuthors.length)];

  card.innerHTML = `
    <img src="${photo.image_url}" alt="Photo ${photo.id}" />
    <p class="author">${authorName}</p>

    <div class="photo-actions">
      <button class="like-btn" data-id="${photo.id}">
        <span class="like-count">${photo.likes_count || 0}</span>
      </button>
      <button class="comment-btn-toggle">
        <span class="comment-count">${photo.comments?.length || 0}</span>
      </button>
    </div>

    <div class="comment-section" style="display:none;">
      <ul class="comment-list">
        ${(photo.comments || [])
          .map(
            (c) => `<li><strong>${c.commenter_name}:</strong> ${c.comment}</li>`
          )
          .join("")}
      </ul>
      <div class="comment-input">
        <input type="text" placeholder="Add a comment..." />
        <button class="comment-btn">Post</button>
      </div>
    </div>
  `;

  card.querySelector("img").style.height = `${200 + Math.random() * 150}px`;

  setupLike(card);
  setupComments(card);
  return card;
}
