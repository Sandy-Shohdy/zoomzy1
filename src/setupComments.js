// Comments handling (local + API)
export function setupComments(card) {
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
      const res = await fetch(
        `https://image-feed-api.vercel.app/api/images/${id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commenter_name: "User", comment: text }),
        }
      );
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