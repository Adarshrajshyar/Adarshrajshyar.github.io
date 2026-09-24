/* =========================================================
   ARS OFFICIAL
   Global Frontend Controller
   ========================================================= */

(function () {
  "use strict";

  const ARS = window.ARS || window.CONFIG || {};

  /* =========================================================
     Helpers
     ========================================================= */

  function $(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  function getCurrentYear() {
    return new Date().getFullYear();
  }

  /* =========================================================
     Toast
     ========================================================= */

  function arsToast(message, type = "info") {

    let toast = getElement("arsToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "arsToast";
      toast.className = "ars-toast";

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.dataset.type = type;

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    clearTimeout(window.__arsToastTimer);

    window.__arsToastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  window.arsToast = arsToast;

  /* =========================================================
     Page Loader
     ========================================================= */

  function hidePageLoader() {

    const loader =
      getElement("pageLoader") ||
      $(".page-loader");

    if (!loader) {
      return;
    }

    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  /* =========================================================
     Footer Year
     ========================================================= */

  function updateFooterYear() {

    $$("[data-current-year], #footerYear, .footer-year")
      .forEach(element => {
        element.textContent = getCurrentYear();
      });
  }

  /* =========================================================
     Mobile Navigation
     ========================================================= */

  function setupMobileNavigation() {

    const header = $(".site-header");

    if (!header) {
      return;
    }

    const nav = $(".main-nav", header);

    if (!nav) {
      return;
    }

    let menuButton = $(".mobile-menu-button", header);

    if (!menuButton) {

      menuButton = document.createElement("button");

      menuButton.type = "button";
      menuButton.className = "mobile-menu-button";
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = "☰";

      const actions = $(".header-actions", header);

      if (actions) {
        header.querySelector(".header-inner")?.insertBefore(
          menuButton,
          actions
        );
      } else {
        header.querySelector(".header-inner")?.appendChild(
          menuButton
        );
      }
    }

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("mobile-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.innerHTML = isOpen ? "✕" : "☰";

    });

    $$(".main-nav a", header).forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("mobile-open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.innerHTML = "☰";

      });

    });

  }

  /* =========================================================
     Active Navigation
     ========================================================= */

  function setupActiveNavigation() {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    $$(".main-nav a").forEach(link => {

      const href =
        link.getAttribute("href") || "";

      const targetPage =
        href.split("/").pop().split("#")[0].toLowerCase();

      if (
        targetPage === currentPage ||
        (currentPage === "" && targetPage === "index.html")
      ) {
        link.classList.add("active");
      }

    });

  }

  /* =========================================================
     Back To Top
     ========================================================= */

  function setupBackToTop() {

    let button = getElement("backToTop");

    if (!button) {

      button = document.createElement("button");

      button.id = "backToTop";
      button.type = "button";
      button.className = "back-to-top";
      button.setAttribute("aria-label", "Back to top");
      button.innerHTML = "↑";

      document.body.appendChild(button);
    }

    const updateVisibility = () => {

      if (window.scrollY > 450) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }

    };

    window.addEventListener(
      "scroll",
      updateVisibility,
      { passive: true }
    );

    button.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

    updateVisibility();

  }

  /* =========================================================
     Smooth Internal Links
     ========================================================= */

  function setupSmoothAnchors() {

    $$('a[href^="#"]').forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

  }

  /* =========================================================
     External Links
     ========================================================= */

  function setupExternalLinks() {

    $$("a[href^='http://'], a[href^='https://']")
      .forEach(link => {

        try {

          const url =
            new URL(link.href);

          if (url.hostname !== window.location.hostname) {

            link.target = "_blank";
            link.rel = "noopener noreferrer";

          }

        } catch (error) {
          console.warn(
            "Invalid external link:",
            link.href
          );
        }

      });

  }

  /* =========================================================
     Storage Integration
     ========================================================= */

  function setupRecentPageTracking() {

    if (!window.ARS_STORAGE) {
      return;
    }

    const page =
      window.location.pathname
        .split("/")
        .pop() || "index.html";

    window.ARS_STORAGE.addRecentPage(page);

  }

  /* =========================================================
     Favorite Buttons
     ========================================================= */

  function setupFavoriteButtons() {

    if (!window.ARS_STORAGE) {
      return;
    }

    $$("[data-favorite-id]").forEach(button => {

      const id =
        button.dataset.favoriteId;

      updateFavoriteButton(button, id);

      button.addEventListener("click", () => {

        const result =
          window.ARS_STORAGE.toggleFavorite(id);

        updateFavoriteButton(button, id);

        arsToast(
          result.active
            ? "Favorite में जोड़ दिया गया ❤️"
            : "Favorite से हटा दिया गया",
          result.active ? "success" : "info"
        );

      });

    });

  }

  function updateFavoriteButton(button, id) {

    if (!window.ARS_STORAGE) {
      return;
    }

    const active =
      window.ARS_STORAGE.isFavorite(id);

    button.classList.toggle("active", active);

    button.setAttribute(
      "aria-pressed",
      String(active)
    );

    const text =
      button.querySelector("[data-action-text]");

    if (text) {
      text.textContent =
        active ? "Favorited" : "Favorite";
    }

  }

  /* =========================================================
     Like Buttons
     ========================================================= */

  function setupLikeButtons() {

    if (!window.ARS_STORAGE) {
      return;
    }

    $$("[data-like-id]").forEach(button => {

      const id =
        button.dataset.likeId;

      updateLikeButton(button, id);

      button.addEventListener("click", () => {

        const result =
          window.ARS_STORAGE.toggleLike(id);

        updateLikeButton(button, id);

        arsToast(
          result.active
            ? "Like added ❤️"
            : "Like removed",
          result.active ? "success" : "info"
        );

      });

    });

  }

  function updateLikeButton(button, id) {

    if (!window.ARS_STORAGE) {
      return;
    }

    const active =
      window.ARS_STORAGE.hasLiked(id);

    button.classList.toggle("active", active);

    button.setAttribute(
      "aria-pressed",
      String(active)
    );

  }

  /* =========================================================
     Copy Buttons
     ========================================================= */

  function setupCopyButtons() {

    $$("[data-copy-text]").forEach(button => {

      button.addEventListener("click", async () => {

        const text =
          button.dataset.copyText || "";

        if (!text) {
          return;
        }

        try {

          await navigator.clipboard.writeText(text);

          arsToast(
            "Text copied successfully.",
            "success"
          );

        } catch (error) {

          console.error(
            "Copy failed:",
            error
          );

          arsToast(
            "Copy नहीं हो पाया।",
            "error"
          );

        }

      });

    });

  }

  /* =========================================================
     Search History
     ========================================================= */

  function setupSearchHistory() {

    if (!window.ARS_STORAGE) {
      return;
    }

    $$("form[data-search-form]").forEach(form => {

      form.addEventListener("submit", () => {

        const input =
          $("input[name='q']", form) ||
          $("input[type='search']", form);

        if (!input) {
          return;
        }

        const query =
          input.value.trim();

        if (query) {
          window.ARS_STORAGE.addSearch(query);
        }

      });

    });

  }

  /* =========================================================
     Lazy Images
     ========================================================= */

  function setupLazyImages() {

    $$("img[data-src]").forEach(image => {

      const loadImage = () => {

        const source =
          image.dataset.src;

        if (!source) {
          return;
        }

        image.src = source;
        image.removeAttribute("data-src");

      };

      if ("IntersectionObserver" in window) {

        const observer =
          new IntersectionObserver(entries => {

            entries.forEach(entry => {

              if (entry.isIntersecting) {

                loadImage();
                observer.unobserve(image);

              }

            });

          });

        observer.observe(image);

      } else {

        loadImage();

      }

    });

  }

  /* =========================================================
     Global Error Handling
     ========================================================= */

  window.addEventListener(
    "error",
    event => {

      console.error(
        "ARS frontend error:",
        event.error || event.message
      );

    }
  );

  window.addEventListener(
    "unhandledrejection",
    event => {

      console.error(
        "ARS promise error:",
        event.reason
      );

    }
  );

  /* =========================================================
     Initialization
     ========================================================= */

  function initializeARS() {

    updateFooterYear();

    setupMobileNavigation();
    setupActiveNavigation();
    setupBackToTop();
    setupSmoothAnchors();
    setupExternalLinks();

    setupRecentPageTracking();

    setupFavoriteButtons();
    setupLikeButtons();

    setupCopyButtons();
    setupSearchHistory();

    setupLazyImages();

    setTimeout(
      hidePageLoader,
      150
    );

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initializeARS
    );

  } else {

    initializeARS();

  }

  window.ARS_APP = {
    initialize: initializeARS,
    toast: arsToast
  };

})();
