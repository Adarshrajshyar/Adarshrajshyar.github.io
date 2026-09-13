/* =========================================================
   ARS OFFICIAL — MASTER SCRIPT
   Version: 6.0.0
   ========================================================= */

(function () {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const storage =
    window.ARS_STORAGE ||
    window.ARSStorage ||
    null;

  /* -------------------------------------------------------
     Toast
     ------------------------------------------------------- */

  function toast(message, type = "info") {
    let box = $("#arsToast");

    if (!box) {
      box = document.createElement("div");
      box.id = "arsToast";
      box.className = "ars-toast";
      document.body.appendChild(box);
    }

    box.textContent = message;
    box.dataset.type = type;
    box.classList.add("show");

    clearTimeout(box._timer);

    box._timer = setTimeout(() => {
      box.classList.remove("show");
    }, 2600);
  }

  window.arsToast = toast;

  /* -------------------------------------------------------
     Page Loader
     ------------------------------------------------------- */

  function hideLoader() {
    const loader = $("#pageLoader");

    if (!loader) return;

    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  /* -------------------------------------------------------
     Mobile Navigation
     ------------------------------------------------------- */

  function initNavigation() {
    const toggle = $(".menu-toggle");
    const nav = $(".main-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );
    });

    $$(".main-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------
     Active Navigation
     ------------------------------------------------------- */

  function initActiveNavigation() {
    const current =
      location.pathname.split("/").pop() || "index.html";

    $$(".main-nav a, .mobile-nav a").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const cleanHref = href.split("#")[0];

      if (
        cleanHref === current ||
        (current === "" && cleanHref === "index.html")
      ) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* -------------------------------------------------------
     Theme
     ------------------------------------------------------- */

  function initTheme() {
    const saved =
      localStorage.getItem("ARS_THEME") ||
      storage?.getPreferences?.().theme;

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }

    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    }

    $$("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const dark =
          document.documentElement.classList.toggle("dark");

        const theme = dark ? "dark" : "light";

        localStorage.setItem("ARS_THEME", theme);

        storage?.savePreferences?.({
          theme,
        });

        toast(
          dark
            ? "Dark mode चालू हो गया।"
            : "Light mode चालू हो गया।"
        );
      });
    });
  }

  /* -------------------------------------------------------
     Smooth Scroll
     ------------------------------------------------------- */

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");

        if (!id || id === "#") return;

        const target = $(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  /* -------------------------------------------------------
     Back To Top
     ------------------------------------------------------- */

  function initBackToTop() {
    const button = $("#backToTop");

    if (!button) return;

    window.addEventListener(
      "scroll",
      () => {
        button.classList.toggle(
          "show",
          window.scrollY > 500
        );
      },
      { passive: true }
    );

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* -------------------------------------------------------
     Reveal Animation
     ------------------------------------------------------- */

  function initReveal() {
    const elements = $$(".reveal");

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) =>
        el.classList.add("visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* -------------------------------------------------------
     Footer Year
     ------------------------------------------------------- */

  function setYear() {
    const year =
      window.arsGetYear?.() ||
      new Date().getFullYear();

    $$("[data-year]").forEach((element) => {
      element.textContent = year;
    });
  }

  /* -------------------------------------------------------
     Copy Button
     ------------------------------------------------------- */

  async function copyText(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      toast("कॉपी हो गया।", "success");
      return true;
    } catch (error) {
      const area = document.createElement("textarea");

      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";

      document.body.appendChild(area);
      area.select();

      try {
        document.execCommand("copy");
        toast("कॉपी हो गया।", "success");
      } catch {
        toast("कॉपी नहीं हो पाया।", "error");
      }

      area.remove();

      return true;
    }
  }

  window.arsCopy = copyText;

  function initCopyButtons() {
    $$("[data-copy]").forEach((button) => {
      button.addEventListener("click", () => {
        let text = button.dataset.copy;

        if (!text && button.dataset.copyTarget) {
          const target = $(
            button.dataset.copyTarget
          );

          text = target?.textContent || "";
        }

        copyText(text);
      });
    });
  }

  /* -------------------------------------------------------
     Share
     ------------------------------------------------------- */

  async function shareContent(data = {}) {
    const title =
      data.title ||
      document.title ||
      "ARS Official";

    const text =
      data.text ||
      "ARS Official";

    const url =
      data.url ||
      location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });

        return true;
      } catch (error) {
        return false;
      }
    }

    return copyText(url);
  }

  window.arsShare = shareContent;

  function initShareButtons() {
    $$("[data-share]").forEach((button) => {
      button.addEventListener("click", () => {
        const target =
          button.dataset.shareTarget
            ? $(button.dataset.shareTarget)
            : null;

        shareContent({
          title:
            button.dataset.shareTitle ||
            document.title,

          text:
            button.dataset.shareText ||
            target?.textContent ||
            document.title,

          url:
            button.dataset.shareUrl ||
            location.href,
        });
      });
    });
  }

  /* -------------------------------------------------------
     Like / Favorite / Save
     ------------------------------------------------------- */

  function refreshActionButton(
    button,
    active,
    activeText,
    normalText
  ) {
    button.classList.toggle("active", active);

    if (activeText || normalText) {
      button.textContent =
        active ? activeText : normalText;
    }

    button.setAttribute(
      "aria-pressed",
      active ? "true" : "false"
    );
  }

  function initContentActions() {
    if (!storage) return;

    $$("[data-like-id]").forEach((button) => {
      const id = button.dataset.likeId;

      const active = storage.hasLiked?.(id);

      refreshActionButton(
        button,
        active,
        button.dataset.activeText || "Liked",
        button.dataset.normalText || "Like"
      );

      button.addEventListener("click", () => {
        const result =
          storage.toggleLike?.(
            id,
            button.dataset.contentType || "content"
          );

        refreshActionButton(
          button,
          result,
          button.dataset.activeText || "Liked",
          button.dataset.normalText || "Like"
        );
      });
    });

    $$("[data-favorite-id]").forEach((button) => {
      const id = button.dataset.favoriteId;

      const active =
        storage.isFavorite?.(id);

      refreshActionButton(
        button,
        active,
        button.dataset.activeText || "Favorited",
        button.dataset.normalText || "Favorite"
      );

      button.addEventListener("click", () => {
        const result =
          storage.toggleFavorite?.(
            id,
            button.dataset.contentType || "content"
          );

        refreshActionButton(
          button,
          result,
          button.dataset.activeText || "Favorited",
          button.dataset.normalText || "Favorite"
        );
      });
    });

    $$("[data-save-id]").forEach((button) => {
      const id = button.dataset.saveId;

      const active =
        storage.isSaved?.(id);

      refreshActionButton(
        button,
        active,
        button.dataset.activeText || "Saved",
        button.dataset.normalText || "Save"
      );

      button.addEventListener("click", () => {
        const result =
          storage.toggleSaved?.(
            id,
            button.dataset.contentType || "content"
          );

        refreshActionButton(
          button,
          result,
          button.dataset.activeText || "Saved",
          button.dataset.normalText || "Save"
        );
      });
    });
  }

  /* -------------------------------------------------------
     Search
     ------------------------------------------------------- */

  function initSearch() {
    $$("[data-search-input]").forEach((input) => {
      const targetSelector =
        input.dataset.searchTarget;

      if (!targetSelector) return;

      const items = $$(targetSelector);

      input.addEventListener("input", () => {
        const query =
          input.value.trim().toLowerCase();

        items.forEach((item) => {
          const text =
            item.textContent.toLowerCase();

          item.style.display =
            !query || text.includes(query)
              ? ""
              : "none";
        });
      });
    });
  }

  /* -------------------------------------------------------
     Category Filters
     ------------------------------------------------------- */

  function initFilters() {
    $$("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value =
          button.dataset.filter;

        const target =
          button.dataset.filterTarget ||
          "[data-category-item]";

        $$(target).forEach((item) => {
          const category =
            item.dataset.category;

          item.style.display =
            value === "all" ||
            value === category
              ? ""
              : "none";
        });

        const parent =
          button.parentElement;

        if (parent) {
          $$("[data-filter]", parent).forEach(
            (item) => {
              item.classList.remove("active");
            }
          );
        }

        button.classList.add("active");
      });
    });
  }

  /* -------------------------------------------------------
     Form Validation
     ------------------------------------------------------- */

  function initForms() {
    $$("form[data-ars-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        const required = $$(
          "[required]",
          form
        );

        let valid = true;

        required.forEach((field) => {
          if (!field.value.trim()) {
            field.classList.add("error");
            valid = false;
          } else {
            field.classList.remove("error");
          }
        });

        if (!valid) {
          event.preventDefault();

          toast(
            "कृपया सभी जरूरी जानकारी भरें।",
            "error"
          );
        }
      });

      $$("input, textarea, select", form).forEach(
        (field) => {
          field.addEventListener("input", () => {
            if (field.value.trim()) {
              field.classList.remove("error");
            }
          });
        }
      );
    });
  }

  /* -------------------------------------------------------
     Joining Application
     ------------------------------------------------------- */

  function initJoiningForm() {
    const form = $("#joiningForm");

    if (!form || !storage) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData =
        new FormData(form);

      const application = {
        name:
          formData.get("name")?.trim() || "",

        email:
          formData.get("email")?.trim() || "",

        phone:
          formData.get("phone")?.trim() || "",

        city:
          formData.get("city")?.trim() || "",

        state:
          formData.get("state")?.trim() || "",

        message:
          formData.get("message")?.trim() || "",
      };

      if (!application.name) {
        toast("नाम दर्ज करें।", "error");
        return;
      }

      const saved =
        storage.saveJoiningApplication(
          application
        );

      if (!saved) {
        toast(
          "Application save नहीं हो पाया।",
          "error"
        );
        return;
      }

      toast(
        "Joining application submit हो गया।",
        "success"
      );

      form.reset();

      setTimeout(() => {
        if (
          location.pathname.includes(
            "joining.html"
          )
        ) {
          location.href =
            "joining-certificate.html";
        }
      }, 700);
    });
  }

  /* -------------------------------------------------------
     URL Parameters
     ------------------------------------------------------- */

  function getParam(name) {
    return new URLSearchParams(
      location.search
    ).get(name);
  }

  window.arsGetParam = getParam;

  function applyUrlParams() {
    const params =
      new URLSearchParams(location.search);

    params.forEach((value, key) => {
      $$(`[data-param="${key}"]`).forEach(
        (element) => {
          if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA" ||
            element.tagName === "SELECT"
          ) {
            element.value = value;
          } else {
            element.textContent = value;
          }
        }
      );
    });
  }

  /* -------------------------------------------------------
     External Links
     ------------------------------------------------------- */

  function initExternalLinks() {
    $$("a[href^='http']").forEach((link) => {
      try {
        const url = new URL(
          link.href,
          location.href
        );

        if (url.origin !== location.origin) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
      } catch {
        // Ignore malformed links.
      }
    });
  }

  /* -------------------------------------------------------
     Image Error Handling
     ------------------------------------------------------- */

  function initImages() {
    $$("img").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("image-error");
      });
    });
  }

  /* -------------------------------------------------------
     Print
     ------------------------------------------------------- */

  function initPrint() {
    $$("[data-print]").forEach((button) => {
      button.addEventListener("click", () => {
        window.print();
      });
    });
  }

  /* -------------------------------------------------------
     Certificate Verify Shortcut
     ------------------------------------------------------- */

  function initCertificateLinks() {
    $$("[data-certificate-id]").forEach(
      (element) => {
        element.addEventListener("click", () => {
          const id =
            element.dataset.certificateId;

          if (!id) return;

          location.href =
            `verify.html?id=${encodeURIComponent(id)}`;
        });
      }
    );
  }

  /* -------------------------------------------------------
     First Flight
     ------------------------------------------------------- */

  function initFirstFlight() {
    const form = $("#firstFlightForm");

    if (!form || !storage) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data =
        Object.fromEntries(
          new FormData(form).entries()
        );

      storage.set("FIRST_FLIGHT_PROGRESS", {
        ...data,
        updatedAt: new Date().toISOString(),
      });

      toast(
        "आपकी progress सेव हो गई।",
        "success"
      );
    });
  }

  /* -------------------------------------------------------
     Accessibility
     ------------------------------------------------------- */

  function initAccessibility() {
    $$("button").forEach((button) => {
      if (
        !button.getAttribute("aria-label") &&
        !button.textContent.trim()
      ) {
        button.setAttribute(
          "aria-label",
          "Button"
        );
      }
    });
  }

  /* -------------------------------------------------------
     Global Error Handling
     ------------------------------------------------------- */

  window.addEventListener(
    "error",
    (event) => {
      console.error(
        "ARS Runtime Error:",
        event.error || event.message
      );
    }
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      console.error(
        "ARS Promise Error:",
        event.reason
      );
    }
  );

  /* -------------------------------------------------------
     Initialize
     ------------------------------------------------------- */

  function init() {
    initNavigation();
    initActiveNavigation();
    initTheme();
    initSmoothScroll();
    initBackToTop();
    initReveal();
    initCopyButtons();
    initShareButtons();
    initContentActions();
    initSearch();
    initFilters();
    initForms();
    initJoiningForm();
    initImages();
    initExternalLinks();
    initPrint();
    initCertificateLinks();
    initFirstFlight();
    initAccessibility();

    applyUrlParams();
    setYear();

    setTimeout(hideLoader, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

  /* -------------------------------------------------------
     Public API
     ------------------------------------------------------- */

  window.ARS_APP = {
    version: "6.0.0",
    toast,
    copy: copyText,
    share: shareContent,
    getParam,
  };
})();
