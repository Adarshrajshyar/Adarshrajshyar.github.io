/* =========================================================
   ARS OFFICIAL — GLOBAL FRONTEND SCRIPT
   ========================================================= */

(function () {
  "use strict";

  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);


  /* =======================================================
     PAGE LOADER
     ======================================================= */

  function hidePageLoader() {
    const loader = $("#pageLoader");

    if (!loader) return;

    setTimeout(() => {
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 400);
    }, 250);
  }


  /* =======================================================
     FOOTER YEAR
     ======================================================= */

  function setFooterYear() {
    const yearElement = $("#footerYear");

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  function initMobileNav() {
    const menuToggle = $("#menuToggle");
    const mainNav = $("#mainNav");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    $$("#mainNav a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =======================================================
     ACTIVE NAV LINK
     ======================================================= */

  function initActiveNav() {
    const currentPage =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    $$("#mainNav a").forEach(link => {
      const href = link.getAttribute("href");

      if (!href) return;

      const cleanHref = href
        .split("#")[0]
        .split("?")[0]
        .toLowerCase();

      if (
        cleanHref === currentPage ||
        (currentPage === "" && cleanHref === "index.html")
      ) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  function initBackToTop() {
    const button = $("#backToTop");

    if (!button) return;

    function updateButton() {
      if (window.scrollY > 400) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }
    }

    window.addEventListener(
      "scroll",
      updateButton,
      { passive: true }
    );

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    updateButton();
  }


  /* =======================================================
     TOAST
     ======================================================= */

  let toastTimer = null;

  function showToast(message, type = "info") {
    const toast = $("#arsToast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.remove(
      "show",
      "success",
      "error",
      "warning",
      "info"
    );

    toast.classList.add(type);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }


  /* =======================================================
     COPY TEXT
     ======================================================= */

  async function copyText(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      showToast(
        CONFIG?.messages?.copied || "कॉपी हो गया।",
        "success"
      );
      return true;
    } catch (error) {
      console.error("Copy Error:", error);

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      let success = false;

      try {
        success = document.execCommand("copy");
      } catch (fallbackError) {
        console.error("Fallback Copy Error:", fallbackError);
      }

      textarea.remove();

      if (success) {
        showToast(
          CONFIG?.messages?.copied || "कॉपी हो गया।",
          "success"
        );
      } else {
        showToast(
          "कॉपी नहीं हो पाया।",
          "error"
        );
      }

      return success;
    }
  }


  /* =======================================================
     SHARE
     ======================================================= */

  async function shareContent({
    title = "ARS Official",
    text = "",
    url = window.location.href
  } = {}) {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url
        });

        return true;
      }

      const shareText =
        `${text ? `${text}\n` : ""}${url}`;

      return await copyText(shareText);
    } catch (error) {
      if (error?.name === "AbortError") {
        return false;
      }

      console.error("Share Error:", error);
      return false;
    }
  }


  /* =======================================================
     REVEAL ANIMATION
     ======================================================= */

  function initReveal() {
    const elements = $$(".reveal");

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => {
        element.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });
  }


  /* =======================================================
     LIKE BUTTONS
     ======================================================= */

  function initLikeButtons() {
    if (
      typeof ARS_STORAGE === "undefined" ||
      !ARS_STORAGE.toggleLike
    ) {
      return;
    }

    $$("[data-like-id]").forEach(button => {
      const id = button.dataset.likeId;

      if (!id) return;

      updateLikeButton(button, id);

      button.addEventListener("click", () => {
        const result = ARS_STORAGE.toggleLike(id);

        updateLikeButton(button, id);

        showToast(
          result.active
            ? "पसंद में जोड़ दिया गया।"
            : "पसंद से हटा दिया गया।",
          "success"
        );
      });
    });
  }

  function updateLikeButton(button, id) {
    const active = ARS_STORAGE.hasLiked(id);

    button.classList.toggle("active", active);
    button.setAttribute(
      "aria-pressed",
      String(active)
    );

    const label =
      button.querySelector("[data-action-label]");

    if (label) {
      label.textContent = active
        ? "Liked"
        : "Like";
    }
  }


  /* =======================================================
     FAVORITE BUTTONS
     ======================================================= */

  function initFavoriteButtons() {
    if (
      typeof ARS_STORAGE === "undefined" ||
      !ARS_STORAGE.toggleFavorite
    ) {
      return;
    }

    $$("[data-favorite-id]").forEach(button => {
      const id = button.dataset.favoriteId;

      if (!id) return;

      updateFavoriteButton(button, id);

      button.addEventListener("click", () => {
        const result =
          ARS_STORAGE.toggleFavorite(id);

        updateFavoriteButton(button, id);

        showToast(
          result.active
            ? "Favorite में जोड़ दिया गया।"
            : "Favorite से हटा दिया गया।",
          "success"
        );
      });
    });
  }

  function updateFavoriteButton(button, id) {
    const active =
      ARS_STORAGE.isFavorite(id);

    button.classList.toggle("active", active);
    button.setAttribute(
      "aria-pressed",
      String(active)
    );
  }


  /* =======================================================
     SAVE BUTTONS
     ======================================================= */

  function initSaveButtons() {
    if (
      typeof ARS_STORAGE === "undefined" ||
      !ARS_STORAGE.toggleSaved
    ) {
      return;
    }

    $$("[data-save-id]").forEach(button => {
      const id = button.dataset.saveId;

      if (!id) return;

      updateSaveButton(button, id);

      button.addEventListener("click", () => {
        const result =
          ARS_STORAGE.toggleSaved(id);

        updateSaveButton(button, id);

        showToast(
          result.active
            ? "सेव कर लिया गया।"
            : "सेव से हटा दिया गया।",
          "success"
        );
      });
    });
  }

  function updateSaveButton(button, id) {
    const active =
      ARS_STORAGE.isSaved(id);

    button.classList.toggle("active", active);
    button.setAttribute(
      "aria-pressed",
      String(active)
    );
  }


  /* =======================================================
     COPY BUTTONS
     ======================================================= */

  function initCopyButtons() {
    $$("[data-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        const selector =
          button.dataset.copy;

        let text = selector;

        if (
          selector &&
          selector.startsWith("#")
        ) {
          const element =
            document.querySelector(selector);

          text = element?.textContent || "";
        }

        await copyText(text);
      });
    });
  }


  /* =======================================================
     SHARE BUTTONS
     ======================================================= */

  function initShareButtons() {
    $$("[data-share]").forEach(button => {
      button.addEventListener("click", async () => {
        const selector =
          button.dataset.share;

        let text = "";

        if (
          selector &&
          selector.startsWith("#")
        ) {
          text =
            document.querySelector(selector)
              ?.textContent || "";
        } else {
          text = selector || "";
        }

        await shareContent({
          title:
            document.title ||
            "ARS Official",
          text
        });
      });
    });
  }


  /* =======================================================
     EXTERNAL LINKS
     ======================================================= */

  function initExternalLinks() {
    $$('a[href^="http"]').forEach(link => {
      const url = link.href;

      if (
        url.startsWith(
          window.location.origin
        )
      ) {
        return;
      }

      link.setAttribute(
        "target",
        "_blank"
      );

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });
  }


  /* =======================================================
     GLOBAL ERROR HANDLING
     ======================================================= */

  window.addEventListener(
    "error",
    event => {
      console.error(
        "ARS Frontend Error:",
        event.error || event.message
      );
    }
  );

  window.addEventListener(
    "unhandledrejection",
    event => {
      console.error(
        "ARS Promise Error:",
        event.reason
      );
    }
  );


  /* =======================================================
     PUBLIC ARS API
     ======================================================= */

  window.ARS_APP = {
    showToast,
    copyText,
    shareContent,
    getConfig:
      typeof getConfig === "function"
        ? getConfig
        : null
  };


  /* =======================================================
     INITIALIZATION
     ======================================================= */

  function initARS() {
    setFooterYear();
    initMobileNav();
    initActiveNav();
    initBackToTop();
    initReveal();

    initLikeButtons();
    initFavoriteButtons();
    initSaveButtons();

    initCopyButtons();
    initShareButtons();
    initExternalLinks();

    hidePageLoader();
  }


  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initARS
    );
  } else {
    initARS();
  }

})();
