const links = document.querySelectorAll("[data-scroll]");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const reviewsContainer = document.querySelector(".reviews");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

if (reviewsContainer && leftBtn && rightBtn) {
  const scrollAmount = 320; // Width of one review card + gap

  leftBtn.addEventListener("click", () => {
    reviewsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    reviewsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  reviewsContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    reviewsContainer.classList.add("active");
    startX = e.pageX - reviewsContainer.offsetLeft;
    scrollLeft = reviewsContainer.scrollLeft;
  });

  reviewsContainer.addEventListener("mouseleave", () => {
    isDown = false;
    reviewsContainer.classList.remove("active");
  });

  reviewsContainer.addEventListener("mouseup", () => {
    isDown = false;
    reviewsContainer.classList.remove("active");
  });

  reviewsContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - reviewsContainer.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    reviewsContainer.scrollLeft = scrollLeft - walk;
  });
}
