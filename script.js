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
     THEME
     ======================================================= */

  const THEME_KEY = "ARS_THEME";

  function getTheme() {

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

    const button =
      $("#themeToggle");

    if (!button) return;

    button.textContent =
      theme === "dark"
        ? "☀️"
        : "🌙";

    button.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    button.title =
      theme === "dark"
        ? "Light Mode"
        : "Dark Mode";
  }


  function initTheme() {

    applyTheme(getTheme());

    const button =
      $("#themeToggle");

    if (!button) return;

    button.addEventListener(
      "click",
      function () {

        const current =
          document.documentElement.dataset.theme ||
          "light";

        applyTheme(
          current === "dark"
            ? "light"
            : "dark"
        );

      }
    );
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  function initMobileNavigation() {

    const toggle =
      $("#navToggle");

    const links =
      $("#navLinks");

    if (!toggle || !links) return;


    toggle.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        const opened =
          links.classList.toggle("open");

        toggle.setAttribute(
          "aria-expanded",
          String(opened)
        );

        toggle.textContent =
          opened
            ? "✕"
            : "☰";

      }
    );


    $$("a", links).forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            if (window.innerWidth <= 780) {

              links.classList.remove("open");

              toggle.setAttribute(
                "aria-expanded",
                "false"
              );

              toggle.textContent = "☰";
            }

          }
        );

      }
    );


    document.addEventListener(
      "click",
      function (event) {

        if (
          window.innerWidth <= 780 &&
          !links.contains(event.target) &&
          !toggle.contains(event.target)
        ) {

          links.classList.remove("open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

          toggle.textContent = "☰";
        }

      }
    );

  }


  /* =======================================================
     MORE MENU
     ======================================================= */

  function initMoreMenu() {

    const button =
      $("#navMoreButton");

    const menu =
      $("#navMoreMenu");

    const wrapper =
      $(".nav-more");

    if (!button || !menu || !wrapper) return;


    button.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        const opened =
          wrapper.classList.toggle("open");

        button.setAttribute(
          "aria-expanded",
          String(opened)
        );

      }
    );


    document.addEventListener(
      "click",
      function (event) {

        if (!wrapper.contains(event.target)) {

          wrapper.classList.remove("open");

          button.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      }
    );

  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  function updateScrollProgress() {

    const progress =
      $("#progressBar");

    if (!progress) return;

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width =
      `${Math.min(
        100,
        Math.max(0, percentage)
      )}%`;
  }


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  function initBackToTop() {

    let button =
      $("#backToTop");

    if (!button) return;


    button.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );


    function update() {

      button.classList.toggle(
        "show",
        window.scrollY > 350
      );

    }


    update();

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  function initActiveNavigation() {

    const current =
      (
        window.location.pathname
          .split("/")
          .pop()
          .toLowerCase()
      ) || "index.html";


    $$(".nav-links > a").forEach(
      function (link) {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href.startsWith("#")
        ) {
          return;
        }

        const file =
          href
            .split("/")
            .pop()
            .toLowerCase();

        link.classList.toggle(
          "active",
          file === current
        );

      }
    );

  }


  /* =======================================================
     INTERNAL ANCHOR LINKS
     ======================================================= */

  function initSmoothLinks() {

    $$('a[href^="#"]').forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            const id =
              link.getAttribute("href");

            if (
              !id ||
              id === "#"
            ) {
              return;
            }

            const target =
              document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }
        );

      }
    );

  }


  /* =======================================================
     COPY
     ======================================================= */

  async function copyText(text) {

    if (!text) return false;


    try {

      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        await navigator.clipboard.writeText(
          text
        );

        return true;
      }

    } catch (_) {}


    try {

      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(
        textarea
      );

      textarea.select();

      const copied =
        document.execCommand("copy");

      textarea.remove();

      return copied;

    } catch (_) {

      return false;
    }

  }


  function initCopyButtons() {

    $$("[data-copy]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          async function () {

            let text = "";

            const selector =
              button.dataset.copy;

            if (selector) {

              const target =
                document.querySelector(
                  selector
                );

              if (target) {

                text =
                  target.value ??
                  target.textContent ??
                  "";
              }

            }


            if (!text) {

              text =
                button.dataset.copyText ||
                "";

            }


            const success =
              await copyText(text);


            const original =
              button.textContent;


            button.textContent =
              success
                ? "✓ Copied"
                : "Copy Failed";


            setTimeout(
              function () {

                button.textContent =
                  original;

              },
              1600
            );

          }
        );

      }
    );

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

        if (
          error &&
          error.name === "AbortError"
        ) {
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


  function initShareButtons() {

    $$("[data-share]").forEach(
      function (button) {

        button.addEventListener(
          "click",
          async function () {

            await shareContent({

              title:
                button.dataset.title ||
                document.title,

              text:
                button.dataset.text ||
                "",

              url:
                button.dataset.url ||
                window.location.href

            });

          }
        );

      }
    );

  }


  /* =======================================================
     TOAST
     ======================================================= */

  function showToast(message) {

    let toast =
      $("#arsToast");

    if (!toast) return;

    toast.textContent =
      message;

    toast.style.opacity =
      "1";

    toast.style.transform =
      "translateX(-50%) translateY(0)";


    clearTimeout(
      toast._timer
    );


    toast._timer =
      setTimeout(
        function () {

          toast.style.opacity =
            "0";

          toast.style.transform =
            "translateX(-50%) translateY(20px)";

        },
        1800
      );

  }


  /* =======================================================
     FAVORITES / LIKES
     ======================================================= */

  const FAVORITE_KEY =
    "ARS_FAVORITES";

  const LIKE_KEY =
    "ARS_LIKES";


  function readArray(key) {

    try {

      const value =
        JSON.parse(
          localStorage.getItem(key) ||
          "[]"
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


  function toggleStoredItem(
    key,
    id
  ) {

    if (!id) return false;

    const list =
      readArray(key);

    const index =
      list.indexOf(id);


    if (index === -1) {

      list.push(id);

      writeArray(
        key,
        list
      );

      return true;
    }


    list.splice(
      index,
      1
    );

    writeArray(
      key,
      list
    );

    return false;
  }


  function initReactionButtons() {

    $$("[data-reaction]").forEach(
      function (button) {

        const type =
          button.dataset.reaction;

        const id =
          button.dataset.id;

        if (!type || !id) return;


        const key =
          type === "favorite"
            ? FAVORITE_KEY
            : LIKE_KEY;


        const active =
          readArray(key)
            .includes(id);


        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          String(active)
        );


        button.addEventListener(
          "click",
          function () {

            const nowActive =
              toggleStoredItem(
                key,
                id
              );


            button.classList.toggle(
              "active",
              nowActive
            );

            button.setAttribute(
              "aria-pressed",
              String(nowActive)
            );


            if (type === "favorite") {

              showToast(
                nowActive
                  ? "Added to Favorites ❤️"
                  : "Removed from Favorites"
              );

            } else {

              showToast(
                nowActive
                  ? "Liked 👍"
                  : "Unliked"
              );

            }

          }
        );

      }
    );

  }


  /* =======================================================
     YEAR
     ======================================================= */

  function setYear() {

    const year =
      $("#currentYear");

    if (!year) return;

    year.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.ARS =
    window.ARS || {};

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
     INITIALIZATION
     ======================================================= */

  function init() {

    initTheme();

    initMobileNavigation();

    initMoreMenu();

    initBackToTop();

    initActiveNavigation();

    initSmoothLinks();

    initCopyButtons();

    initShareButtons();

    initReactionButtons();

    setYear();

    updateScrollProgress();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
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
