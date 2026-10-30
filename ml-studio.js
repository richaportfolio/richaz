// ML Studio page navigation: accessible mobile menu.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("#studio-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    links.classList.toggle("is-open", !isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
    });
  });
});
