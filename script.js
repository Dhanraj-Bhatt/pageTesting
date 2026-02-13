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
