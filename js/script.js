// ================================
// ARS — Adarsh Ke Alfaz
// Main Website JavaScript
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // Mobile Menu
  // -------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      mobileMenu.classList.toggle("active");

      const isOpen = mobileMenu.classList.contains("active");

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });


    // Close mobile menu after clicking a link

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );
      });

    });

  }


  // -------------------------------
  // Light / Dark Mode
  // -------------------------------

  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("ars-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  function updateThemeButton() {

    if (!themeToggle) return;

    const isDark =
      document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  updateThemeButton();


  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("dark-mode");

      const isDark =
        document.body.classList.contains("dark-mode");

      localStorage.setItem(
        "ars-theme",
        isDark ? "dark" : "light"
      );

      updateThemeButton();
    });

  }


  // -------------------------------
  // Back To Top
  // -------------------------------

  const backToTop =
    document.getElementById("backToTop");

  if (backToTop) {

    const checkScroll = () => {

      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }

    };

    window.addEventListener(
      "scroll",
      checkScroll,
      { passive: true }
    );

    checkScroll();


    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // -------------------------------
  // Current Year
  // -------------------------------

  const yearElements =
    document.querySelectorAll("[data-current-year]");

  const currentYear =
    new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });


  // -------------------------------
  // External Social Links
  // -------------------------------

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  });

});
