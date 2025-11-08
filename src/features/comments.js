// src/features/comments.js
export function setupComments(card) {
  const toggleBtn = card.querySelector(".comment-btn-toggle");
  const section = card.querySelector(".comment-section");
  const input = card.querySelector(".comment-input input");
  const postBtn = card.querySelector(".comment-input button");
  const list = card.querySelector(".comment-list");
  const commentCount = card.querySelector(".comment-count");

  if (!toggleBtn || !section) return;

  // Toggle comment visibility
  toggleBtn.addEventListener("click", () => {
    const isVisible = section.style.display === "block";
    section.style.display = isVisible ? "none" : "block";
  });

  // Handle new comment submission + multiple 💭 animations
  postBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    // Add comment to list
    const li = document.createElement("li");
    li.innerHTML = `<strong>You:</strong> ${text}`;
    list.appendChild(li);

    // Update visible comment count
    const count = parseInt(commentCount.textContent) || 0;
    commentCount.textContent = count + 1;
    input.value = "";

    // 💭 Create multiple floating bubbles
    for (let i = 0; i < 3; i++) {
      const bubble = document.createElement("span");
      bubble.classList.add("floating-bubble");
      bubble.textContent = "💭";
      card.appendChild(bubble);

      // Random starting position near the post button
      const randomX = postBtn.offsetLeft + Math.random() * 40 - 10;
      const randomY = postBtn.offsetTop - 10 - Math.random() * 10;
      bubble.style.left = `${randomX}px`;
      bubble.style.top = `${randomY}px`;

      // Slight random delay for a natural feel
      bubble.style.animationDelay = `${i * 0.1}s`;

      // Remove after animation ends
      setTimeout(() => bubble.remove(), 1200);
    }
  });
}
