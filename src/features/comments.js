// comments.js
export function setupComments(card) {
  const toggleBtn = card.querySelector(".comment-btn-toggle");
  const section = card.querySelector(".comment-section");
  const input = card.querySelector(".comment-input input");
  const postBtn = card.querySelector(".comment-input button");
  const list = card.querySelector(".comment-list");
  const commentCount = card.querySelector(".comment-count");

  // Toggle visibility of comment section
  toggleBtn.addEventListener("click", () => {
    const isVisible = section.style.display === "block";
    section.style.display = isVisible ? "none" : "block";
  });

  // Handle new comment submission
  postBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.innerHTML = `<strong>You:</strong> ${text}`;
    list.appendChild(li);

    // Increase the comment count
    const count = parseInt(commentCount.textContent) || 0;
    commentCount.textContent = count + 1;

    input.value = "";
  });
}
