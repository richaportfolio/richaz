
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

(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  function readNumber(id) {
    const element = $(id);
    const value = element.valueAsNumber;

    if (
      !element.checkValidity() ||
      !Number.isFinite(value)
    ) {
      element.reportValidity();
      throw new Error("Please enter valid values in all fields.");
    }

    return value;
  }

  function money(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function show(id, text) {
    $(id).textContent = text;
  }

  // 1. House Price Prediction
  $("houseDemo").addEventListener("submit", event => {
    event.preventDefault();

    try {
      const area = readNumber("houseArea");
      const bedrooms = readNumber("houseBedrooms");
      const age = readNumber("houseAge");

      // Illustrative formula only; not a trained model.
      const estimate =
        area * 4500 *
        (1 + bedrooms * 0.04) *
        Math.max(0.55, 1 - age * 0.004);

      show(
        "houseOutput",
        "SIMULATED ESTIMATE\n" +
        "Illustrative property value: " + money(estimate) +
        "\n\nThis is a formula-based example, not a market valuation or a trained ML prediction."
      );
    } catch (error) {
      show("houseOutput", error.message);
    }
  });

  // Shared educational score formula.
  function calculateScore(hours, attendance, previous) {
    return Math.max(0, Math.min(100,
      0.45 * previous +
      2.5 * hours +
      0.25 * attendance
    ));
  }

  // 2. Student Performance
  $("studentDemo").addEventListener("submit", event => {
    event.preventDefault();

    try {
      const hours = readNumber("studyHours");
      const attendance = readNumber("attendance");
      const previous = readNumber("previousScore");

      const score = calculateScore(
        hours, attendance, previous
      );

      show(
        "studentOutput",
        "SIMULATED SCORE\n" +
        "Illustrative score: " + score.toFixed(1) + "/100" +
        "\n\nThis educational formula is not trained or validated on student records. It should not be used to evaluate real students."
      );
    } catch (error) {
      show("studentOutput", error.message);
    }
  });

  // 3. Explainable AI: illustrative contributions, NOT SHAP.
  $("explainDemo").addEventListener("submit", event => {
    event.preventDefault();

    try {
      const hours = readNumber("explainHours");
      const attendance = readNumber("explainAttendance");
      const previous = readNumber("explainPrevious");

      const score = calculateScore(
        hours, attendance, previous
      );

      const contributions = [
        {
          name: "Previous score",
          value: 0.45 * (previous - 50)
        },
        {
          name: "Study hours",
          value: 2.5 * (hours - 2)
        },
        {
          name: "Attendance",
          value: 0.25 * (attendance - 70)
        }
      ];

      const output = $("explainOutput");
      output.replaceChildren();

      const heading = document.createElement("strong");
      heading.textContent =
        "Illustrative score: " + score.toFixed(1) + "/100";
      output.appendChild(heading);

      const note = document.createElement("p");
      note.textContent =
        "Hand-designed feature contributions relative to example reference values. These are NOT SHAP values.";
      output.appendChild(note);

      const maxAbs = Math.max(
        1,
        ...contributions.map(item => Math.abs(item.value))
      );

      contributions.forEach(item => {
        const row = document.createElement("div");
        row.className = "contribution-row";

        const label = document.createElement("div");
        label.className = "contribution-label";

        const name = document.createElement("span");
        name.textContent = item.name;

        const amount = document.createElement("strong");
        amount.textContent =
          (item.value >= 0 ? "+" : "") +
          item.value.toFixed(1);

        label.append(name, amount);

        const track = document.createElement("div");
        track.className = "contribution-track";

        const bar = document.createElement("div");
        bar.className =
          "contribution-bar " +
          (item.value >= 0 ? "positive" : "negative");

        bar.style.width =
          (Math.abs(item.value) / maxAbs * 100) + "%";

        track.appendChild(bar);
        row.append(label, track);
        output.appendChild(row);
      });

      const legend = document.createElement("p");
      legend.textContent =
        "Green = positive illustrative contribution. Red = negative illustrative contribution. This is not a genuine SHAP explanation of a trained model.";
      output.appendChild(legend);

    } catch (error) {
      show("explainOutput", error.message);
    }
  });
})();

