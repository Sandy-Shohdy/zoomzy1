// src/features/likes.js
export function setupLike(card) {
  const btn = card.querySelector(".like-btn");
  const countSpan = card.querySelector(".like-count");
  const id = card.dataset.id;

  if (!btn || !id) return;

  btn.addEventListener("click", async () => {
    try {
      btn.disabled = true; // prevent double-clicks

      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Like request failed");
      const data = await res.json();
      console.log("API response:", data);

      if (data.success) {
        countSpan.textContent = data.likes_count ?? 0;
        btn.classList.add("liked");

        // ✨ Floating heart animation (1–3 random hearts)
        const heartCount = Math.floor(Math.random() * 3) + 1; // 1–3 hearts
        for (let i = 0; i < heartCount; i++) {
          const heart = document.createElement("span");
          heart.classList.add("floating-heart");
          heart.textContent = "❤️";
          card.appendChild(heart);

          // random position and delay for natural effect
          heart.style.left = `${btn.offsetLeft + Math.random() * 40 - 10}px`;
          heart.style.top = `${btn.offsetTop - 10}px`;
          heart.style.animationDelay = `${Math.random() * 0.2}s`;
          heart.style.transform = `scale(${1 + Math.random() * 0.4})`;

          setTimeout(() => heart.remove(), 1200);
        }
      }
    } catch (err) {
      console.error("Error while liking image:", err);
    } finally {
      btn.disabled = false;
    }
  });
}
