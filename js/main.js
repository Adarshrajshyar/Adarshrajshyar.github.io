
/* ARS — Adarsh Ke Alfaz
   Main site interactions
*/

(function () {
  "use strict";

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    const body = document.body;
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const year = document.getElementById("currentYear");

    // Automatically update the footer year.
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    // Mobile navigation menu.
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
      });

      mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mainNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
          menuToggle.textContent = "☰";
        });
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          mainNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.textContent = "☰";
        }
      });
    }

    // Saved light/dark theme preference.
    const themeKey = "ars-theme";

    function applyTheme(theme) {
      const dark = theme === "dark";
      body.classList.toggle("dark-theme", dark);

      if (themeToggle) {
        themeToggle.textContent = dark ? "☀" : "◐";
        themeToggle.setAttribute(
          "aria-label",
          dark ? "लाइट थीम चुनें" : "डार्क थीम चुनें"
        );
        themeToggle.setAttribute("aria-pressed", String(dark));
      }
    }

    let savedTheme = "light";

    try {
      savedTheme = localStorage.getItem(themeKey) || "light";
    } catch (error) {
      // The site still works if browser storage is unavailable.
    }

    applyTheme(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const newTheme = body.classList.contains("dark-theme")
          ? "light"
          : "dark";

        applyTheme(newTheme);

        try {
          localStorage.setItem(themeKey, newTheme);
        } catch (error) {
          // Theme changes still apply to the current page.
        }
      });
    }

    // Highlight the navigation link for the current page.
    const currentFile = (
      window.location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();

    document.querySelectorAll(".main-nav a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href) return;

      const linkFile = href.split("/").pop().toLowerCase();

      if (linkFile === currentFile) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });

    // Back-to-top button.
    function updateBackToTop() {
      if (!backToTop) return;
      backToTop.classList.toggle("visible", window.scrollY > 350);
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    if (backToTop) {
      backToTop.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    // Reusable filtering for pages with data attributes.
    // Supported attributes:
    // data-filter-search, data-filter-class, data-filter-subject,
    // data-filter-category, data-searchable, data-class,
    // data-subject and data-category.
    const filterSearch = document.querySelector("[data-filter-search]");
    const classFilter = document.querySelector("[data-filter-class]");
    const subjectFilter = document.querySelector("[data-filter-subject]");
    const categoryFilter = document.querySelector("[data-filter-category]");
    const filterItems = Array.from(
      document.querySelectorAll("[data-searchable]")
    );
    const emptyMessage = document.querySelector("[data-filter-empty]");

    function applyFilters() {
      if (!filterItems.length) return;

      const query = filterSearch
        ? filterSearch.value.trim().toLocaleLowerCase()
        : "";

      const selectedClass = classFilter ? classFilter.value : "";
      const selectedSubject = subjectFilter ? subjectFilter.value : "";
      const selectedCategory = categoryFilter ? categoryFilter.value : "";

      let visibleCount = 0;

      filterItems.forEach(function (item) {
        const text = (item.textContent || "").toLocaleLowerCase();
        const itemClass = item.dataset.class || "";
        const itemSubject = item.dataset.subject || "";
        const itemCategory = item.dataset.category || "";

        const matchesQuery = !query || text.includes(query);
        const matchesClass = !selectedClass || itemClass === selectedClass;
        const matchesSubject =
          !selectedSubject || itemSubject === selectedSubject;
        const matchesCategory =
          !selectedCategory || itemCategory === selectedCategory;

        const visible =
          matchesQuery && matchesClass && matchesSubject && matchesCategory;

        item.hidden = !visible;
        if (visible) visibleCount++;
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    }

    [filterSearch, classFilter, subjectFilter, categoryFilter].forEach(
      function (control) {
        if (!control) return;
        control.addEventListener("input", applyFilters);
        control.addEventListener("change", applyFilters);
      }
    );

    applyFilters();

    // Optional expandable FAQ sections.
    document.querySelectorAll("[data-faq-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        const panelId = button.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        const willOpen = panel.hidden;
        panel.hidden = !willOpen;
        button.setAttribute("aria-expanded", String(willOpen));
      });
    });

    // Keep external links opening safely in a new tab protected.
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
      const rel = new Set((link.getAttribute("rel") || "").split(/\s+/));
      rel.add("noopener");
      rel.add("noreferrer");
      link.setAttribute("rel", Array.from(rel).join(" ").trim());
    });
  });

  // Shared namespace for any future ARS page scripts.
  window.ARS = window.ARS || {};
  window.ARS.version = "1.0.0";
})();
