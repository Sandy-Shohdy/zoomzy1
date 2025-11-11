// src/renderPhotoCard.js
import { setupLike } from "./features/likes.js";
import { setupComments } from "./features/comments.js";

// Random author list
const randomAuthors = [
  "Luna Rivera", "Kai Nakamura", "Mila Novak", "Omar Hassan", "Sophie Laurent",
  "Ethan Kim", "Ava Rossi", "Leo Carter", "Zara Ali", "Nina Johansson",
  "Felix Moreau", "Isla Becker", "Theo Martins", "Maya Chen", "Noah Patel",
  "Elena Garcia", "Jonas Weber", "Aria Silva", "Mateo Cruz", "Yuna Takahashi",
  "Gabriel Sousa", "Clara Müller", "Ravi Sharma", "Layla Haddad", "Sebastian Torres"
];

// Create a photo card element dynamically
export function renderPhotoCard(photo) {
  console.log("Card rendered:", photo.id); //just for debugging purposes

  const card = document.createElement("div");
  card.className = "photo-card"; //CSS class for styling
  card.dataset.id = photo.id; // Stores photo ID for inside the card, easy access for likes/comments

  // Pick a random author
  const authorName =
    randomAuthors[Math.floor(Math.random() * randomAuthors.length)];// Use that number as an index to pick a name from the array with randomAuthors.

  // Inner HTML structure for each photo card
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

  // Add a visual variation in photo height
  card.querySelector("img").style.height = `${200 + Math.random() * 150}px`;

  // ✅ Activate like & comment features for this card
  setupLike(card);
  setupComments(card);

  // Setup image zoom here

  return card;
}
