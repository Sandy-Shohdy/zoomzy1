export function setupLike(card) {
  const btn = card.querySelector(".like-btn");
  const countSpan = card.querySelector(".like-count");
  const id = card.dataset.id;

  console.log("❤️ Like setup for:", id); // ✅ doğru yer

  btn.addEventListener("click", async () => {
    try {
      const res = await fetch(
        `https://image-feed-api.vercel.app/api/images/${id}/like`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (data.success) countSpan.textContent = data.likes_count;
      btn.classList.add("liked");
    } catch (err) {
      console.error("Like failed:", err);
    }
  });
}
