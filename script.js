
// Richa Singh Resume Website Interactions

document.addEventListener("DOMContentLoaded", () => {
    const printButton = document.getElementById("printResume");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const currentYear = document.getElementById("currentYear");

    // Open the browser print dialog.
    // Choose "Save as PDF" to save a PDF copy.
    printButton?.addEventListener("click", () => {
        window.print();
    });

    // Toggle navigation on small screens.
    menuToggle?.addEventListener("click", () => {
        if (!navLinks) return;

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    // Close the mobile menu after choosing a section.
    navLinks?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            menuToggle?.setAttribute("aria-expanded", "false");
            menuToggle?.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            if (menuToggle) {
                menuToggle.textContent = "☰";
            }
        });
    });

    // Update the copyright year automatically.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
