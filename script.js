// Richa Singh resume website interactions
document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("printResume");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // Open the browser's print dialog; choose "Save as PDF" to create a PDF copy.
  printButton?.addEventListener("click", () => window.print());

  // Toggle navigation on small screens.
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after choosing a section.
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });
});
