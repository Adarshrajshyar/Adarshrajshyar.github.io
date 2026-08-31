/* =========================================================
   ARS OFFICIAL — MASTER SCRIPT
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     SHORTCUTS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  function initMobileNavigation() {
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const opened = links.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(opened)
      );

      toggle.textContent = opened ? "✕" : "☰";
    });


    /* Close navigation after clicking a normal link */
    $$("a", links).forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 780) {
          links.classList.remove("open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

          toggle.textContent = "☰";
        }
      });
    });


    /* Close on outside click */
    document.addEventListener("click", (event) => {
      if (
        !links.contains(event.target) &&
        !toggle.contains(event.target) &&
        window.innerWidth <= 780
      ) {
        links.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.textContent = "☰";
      }
    });
  }


  /* =======================================================
     MORE MENU
     ======================================================= */

  function initMoreMenu() {
    const button = $("#navMoreButton");
    const menu = $("#navMoreMenu");
    const wrapper = $(".nav-more");

    if (!button || !menu || !wrapper) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const opened =
        wrapper.classList.toggle("open");

      button.setAttribute(
        "aria-expanded",
        String(opened)
      );
    });


    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) {
        wrapper.classList.remove("open");

        button.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  }


  /* =======================================================
     DARK / LIGHT MODE
     ======================================================= */

  const THEME_KEY = "ARS_THEME";

  function getSavedTheme() {
    const saved =
      localStorage.getItem(THEME_KEY);

    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      ? "dark"
      : "light";
  }


  function applyTheme(theme) {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      THEME_KEY,
      theme
    );

    const button = $("#themeToggle");

    if (!button) return;

    button.textContent =
      theme === "dark" ? "☀️" : "🌙";

    button.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    button.setAttribute(
      "title",
      theme === "dark"
        ? "Light Mode"
        : "Dark Mode"
    );
  }


  function initTheme() {
    applyTheme(getSavedTheme());

    const button = $("#themeToggle");

    if (!button) return;

    button.addEventListener("click", () => {

      const current =
        document.documentElement.dataset.theme ||
        "light";

      applyTheme(
        current === "dark"
          ? "light"
          : "dark"
      );
    });
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  function updateScrollProgress() {
    const progress = $("#progressBar");

    if (!progress) return;

    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width =
      `${Math.min(100, Math.max(0, percentage))}%`;
  }


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  function createBackToTop() {
    let button = $("#backToTop");

    if (!button) {
      button = document.createElement("button");

      button.id = "backToTop";
      button.type = "button";
      button.innerHTML = "↑";

      button.setAttribute(
        "aria-label",
        "Back to top"
      );

      document.body.appendChild(button);
    }

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });


    function toggleBackToTop() {
      button.classList.toggle(
        "show",
        window.scrollY > 350
      );
    }

    toggleBackToTop();

    window.addEventListener(
      "scroll",
      toggleBackToTop,
      { passive: true }
    );
  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  function setActiveNavigation() {
    const current =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    $$(".nav-links > a").forEach((link) => {

      const href =
        link.getAttribute("href");

      if (!href || href.startsWith("#")) return;

      const file =
        href.split("/").pop().toLowerCase();

      link.classList.toggle(
        "active",
        file === current
      );
    });
  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  function initSmoothLinks() {
    $$('a[href^="#"]').forEach((link) => {

      link.addEventListener("click", (event) => {

        const id =
          link.getAttribute("href");

        if (!id || id === "#") return;

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });

    });
  }


  /* =======================================================
     COPY TEXT
     ======================================================= */

  async function copyText(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {

      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      let copied = false;

      try {
        copied =
          document.execCommand("copy");
      } catch (_) {
        copied = false;
      }

      textarea.remove();

      return copied;
    }
  }


  /* =======================================================
     COPY BUTTONS
     ======================================================= */

  function initCopyButtons() {

    $$("[data-copy]").forEach((button) => {

      button.addEventListener("click", async () => {

        const selector =
          button.dataset.copy;

        let text = "";

        if (selector) {
          const target =
            document.querySelector(selector);

          if (target) {
            text =
              target.value ??
              target.textContent ??
              "";
          }
        }

        if (!text) {
          text =
            button.dataset.copyText || "";
        }

        const success =
          await copyText(text);

        const original =
          button.textContent;

        button.textContent =
          success
            ? "✓ Copied"
            : "Copy Failed";

        setTimeout(() => {
          button.textContent = original;
        }, 1600);

      });

    });
  }


  /* =======================================================
     SHARE
     ======================================================= */

  async function shareContent({
    title = "ARS Official",
    text = "",
    url = window.location.href
  } = {}) {

    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {

      try {
        await navigator.share({
          title,
          text,
          url
        });

        return true;

      } catch (error) {

        if (error.name === "AbortError") {
          return false;
        }

      }
    }


    const copied =
      await copyText(url);

    if (copied) {
      showToast(
        "Share link copied!"
      );
    }

    return copied;
  }


  /* =======================================================
     SHARE BUTTONS
     ======================================================= */

  function initShareButtons() {

    $$("[data-share]").forEach((button) => {

      button.addEventListener("click", async () => {

        const title =
          button.dataset.title ||
          document.title;

        const text =
          button.dataset.text || "";

        const url =
          button.dataset.url ||
          window.location.href;

        await shareContent({
          title,
          text,
          url
        });

      });

    });
  }


  /* =======================================================
     TOAST
     ======================================================= */

  function showToast(message) {

    let toast =
      $("#arsToast");

    if (!toast) {

      toast =
        document.createElement("div");

      toast.id = "arsToast";

      Object.assign(
        toast.style,
        {
          position: "fixed",
          left: "50%",
          bottom: "30px",
          transform:
            "translateX(-50%) translateY(20px)",
          zIndex: "100000",
          padding: "11px 17px",
          borderRadius: "999px",
          background: "#111827",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "700",
          opacity: "0",
          pointerEvents: "none",
          transition:
            "opacity .25s ease, transform .25s ease"
        }
      );

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";
    toast.style.transform =
      "translateX(-50%) translateY(0)";

    clearTimeout(
      toast._timer
    );

    toast._timer =
      setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
          "translateX(-50%) translateY(20px)";

      }, 1800);
  }


  /* =======================================================
     FAVORITE / LIKE HELPERS
     ======================================================= */

  const FAVORITE_KEY =
    "ARS_FAVORITES";

  const LIKE_KEY =
    "ARS_LIKES";


  function readArray(key) {

    try {

      const value =
        JSON.parse(
          localStorage.getItem(key) || "[]"
        );

      return Array.isArray(value)
        ? value
        : [];

    } catch (_) {

      return [];

    }
  }


  function writeArray(key, value) {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }


  function toggleStoredItem(key, id) {

    if (!id) return false;

    const list =
      readArray(key);

    const index =
      list.indexOf(id);

    if (index === -1) {

      list.push(id);

      writeArray(key, list);

      return true;

    }

    list.splice(index, 1);

    writeArray(key, list);

    return false;
  }


  /* =======================================================
     LIKE / FAVORITE BUTTONS
     ======================================================= */

  function initReactionButtons() {

    $$("[data-reaction]").forEach((button) => {

      const type =
        button.dataset.reaction;

      const id =
        button.dataset.id;

      if (!type || !id) return;


      const key =
        type === "favorite"
          ? FAVORITE_KEY
          : LIKE_KEY;


      const list =
        readArray(key);


      if (list.includes(id)) {
        button.classList.add("active");
      }


      button.addEventListener(
        "click",
        () => {

          const active =
            toggleStoredItem(
              key,
              id
            );

          button.classList.toggle(
            "active",
            active
          );


          if (type === "favorite") {

            button.setAttribute(
              "aria-pressed",
              String(active)
            );

            showToast(
              active
                ? "Added to Favorites ❤️"
                : "Removed from Favorites"
            );

          } else {

            button.setAttribute(
              "aria-pressed",
              String(active)
            );

            showToast(
              active
                ? "Liked 👍"
                : "Unliked"
            );

          }

        }
      );

    });
  }


  /* =======================================================
     EXPOSE GLOBAL HELPERS
     ======================================================= */

  window.ARS = window.ARS || {};

  window.ARS.copyText =
    copyText;

  window.ARS.shareContent =
    shareContent;

  window.ARS.showToast =
    showToast;

  window.ARS.readArray =
    readArray;

  window.ARS.writeArray =
    writeArray;

  window.ARS.toggleStoredItem =
    toggleStoredItem;


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function init() {

    initMobileNavigation();

    initMoreMenu();

    initTheme();

    createBackToTop();

    setActiveNavigation();

    initSmoothLinks();

    initCopyButtons();

    initShareButtons();

    initReactionButtons();

    updateScrollProgress();

  }


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

})();
