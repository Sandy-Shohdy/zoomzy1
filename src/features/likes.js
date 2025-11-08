// likes.js
export function setupLike(card) {
  // Select the like button and count inside the given photo card
  const likeBtn = card.querySelector(".like-btn");
  const likeCountEl = likeBtn.querySelector(".like-count");

  let count = parseInt(likeCountEl.textContent) || 0;
  let liked = false;

  likeBtn.addEventListener("click", () => {
    liked = !liked;
    likeBtn.classList.toggle("liked", liked);

    count += liked ? 1 : -1;
    likeCountEl.textContent = count;
  });
}
