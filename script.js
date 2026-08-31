/* =========================================================
   ARS OFFICIAL — MAIN WEBSITE SCRIPT
   Version: Final Website System
   ========================================================= */

(function () {
  "use strict";

  /* =========================
     HELPERS
     ========================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


  /* =========================
     DOM READY
     ========================= */

  document.addEventListener("DOMContentLoaded", init);


  function init() {

    setupMobileMenu();

    setupTheme();

    setupBackToTop();

    setupYear();

    setupSmoothLinks();

    setupShayariCategories();

    setupStoryCategories();

  }


  /* =========================
     MOBILE MENU
     ========================= */

  function setupMobileMenu() {

    const menuButton = $("#mobileMenuBtn");
    const nav = $("#mainNav");

    if (!menuButton || !nav) return;

    menuButton.addEventListener("click", function () {

      nav.classList.toggle("open");

      const opened = nav.classList.contains("open");

      menuButton.textContent = opened ? "✕" : "☰";

    });


    $$(".nav-link", nav).forEach(link => {

      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuButton.textContent = "☰";
      });

    });


    document.addEventListener("click", function (event) {

      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        nav.classList.remove("open");
        menuButton.textContent = "☰";

      }

    });

  }


  /* =========================
     DARK / LIGHT MODE
     ========================= */

  function setupTheme() {

    const button = $("#themeToggle");

    if (!button) return;


    let savedTheme = null;

    try {
      savedTheme = localStorage.getItem("ars-theme");
    } catch (error) {
      savedTheme = null;
    }


    if (
      savedTheme === "dark" ||
      savedTheme === "light"
    ) {

      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );

    } else {

      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      document.documentElement.classList.toggle(
        "dark",
        prefersDark
      );

    }


    updateThemeButton();


    button.addEventListener("click", function () {

      const dark =
        document.documentElement.classList.toggle("dark");

      try {
        localStorage.setItem(
          "ars-theme",
          dark ? "dark" : "light"
        );
      } catch (error) {
        /* localStorage unavailable */
      }

      updateThemeButton();

    });


    function updateThemeButton() {

      const dark =
        document.documentElement.classList.contains("dark");

      button.textContent = dark ? "☀️" : "🌙";

      button.setAttribute(
        "aria-label",
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      );

    }

  }


  /* =========================
     BACK TO TOP
     ========================= */

  function setupBackToTop() {

    const button = $("#backToTop");

    if (!button) return;


    window.addEventListener(
      "scroll",
      function () {

        if (window.scrollY > 450) {
          button.classList.add("show");
        } else {
          button.classList.remove("show");
        }

      },
      { passive: true }
    );


    button.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =========================
     YEAR
     ========================= */

  function setupYear() {

    const year = $("#currentYear");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

  }


  /* =========================
     SMOOTH INTERNAL LINKS
     ========================= */

  function setupSmoothLinks() {

    $$('a[href^="#"]').forEach(link => {

      link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = $(targetId);

        if (!target) return;

        event.preventDefault();

        const header = $(".site-header");

        const offset =
          header ? header.offsetHeight + 15 : 15;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      });

    });

  }


  /* =========================
     SHAYARI CATEGORY
     ========================= */

  function setupShayariCategories() {

    const buttons = $$("#shayariCategories .category-btn");

    const container = $("#shayariContainer");

    if (!buttons.length || !container) return;


    buttons.forEach(button => {

      button.addEventListener("click", function () {

        buttons.forEach(btn =>
          btn.classList.remove("active")
        );

        this.classList.add("active");

        const category =
          this.dataset.category || "all";

        filterCards(
          container,
          category
        );

      });

    });

  }


  /* =========================
     STORY CATEGORY
     ========================= */

  function setupStoryCategories() {

    const buttons = $$("#storyCategories .category-btn");

    const container = $("#storyContainer");

    if (!buttons.length || !container) return;


    buttons.forEach(button => {

      button.addEventListener("click", function () {

        buttons.forEach(btn =>
          btn.classList.remove("active")
        );

        this.classList.add("active");

        const category =
          this.dataset.category || "all";

        filterCards(
          container,
          category
        );

      });

    });

  }


  /* =========================
     GENERIC CARD FILTER
     ========================= */

  function filterCards(container, category) {

    const cards =
      $$(".content-card, [data-category]", container);

    if (!cards.length) return;


    cards.forEach(card => {

      if (category === "all") {

        card.hidden = false;
        return;

      }


      const cardCategories =
        String(card.dataset.category || "")
          .toLowerCase()
          .split(",")
          .map(value => value.trim())
          .filter(Boolean);


      card.hidden =
        !cardCategories.includes(
          String(category).toLowerCase()
        );

    });

  }


  /* =========================
     GLOBAL TOAST
     ========================= */

  window.ARS = window.ARS || {};


  window.ARS.toast = function (message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.ARS.toastTimer);

    window.ARS.toastTimer =
      setTimeout(function () {
        toast.classList.remove("show");
      }, 2200);

  };


  /* =========================
     COPY TEXT
     ========================= */

  window.ARS.copyText = async function (text) {

    if (!text) return false;


    try {

      await navigator.clipboard.writeText(text);

      window.ARS.toast("कॉपी हो गया ✓");

      return true;

    } catch (error) {

      try {

        const textarea =
          document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();

        window.ARS.toast("कॉपी हो गया ✓");

        return true;

      } catch (fallbackError) {

        window.ARS.toast("Copy नहीं हो पाया");

        return false;

      }

    }

  };


  /* =========================
     SHARE
     ========================= */

  window.ARS.share = async function (data = {}) {

    const shareData = {

      title:
        data.title ||
        document.title,

      text:
        data.text ||
        "ARS Official",

      url:
        data.url ||
        window.location.href

    };


    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {

      try {

        await navigator.share(shareData);

        return true;

      } catch (error) {

        if (error.name === "AbortError") {
          return false;
        }

      }

    }


    return window.ARS.copyText(
      shareData.url
    );

  };


  /* =========================
     LIKE SYSTEM
     First click = Like
     Second click = Unlike
     ========================= */

  window.ARS.toggleLike = function (
    id,
    button,
    counter = null
  ) {

    if (!id || !button) return;


    const key = "ars-like-" + id;

    let liked = false;

    try {
      liked =
        localStorage.getItem(key) === "1";
    } catch (error) {}


    liked = !liked;


    try {

      localStorage.setItem(
        key,
        liked ? "1" : "0"
      );

    } catch (error) {}


    button.classList.toggle(
      "liked",
      liked
    );

    button.setAttribute(
      "aria-pressed",
      String(liked)
    );


    if (counter) {

      const current =
        Number(counter.textContent) || 0;

      const next =
        Math.max(
          0,
          liked
            ? current + 1
            : current - 1
        );

      counter.textContent = next;

    }


    window.ARS.toast(
      liked
        ? "Liked ❤️"
        : "Unliked"
    );

  };


  /* =========================
     FAVORITE SYSTEM
     First click = Favorite
     Second click = Unfavorite
     ========================= */

  window.ARS.toggleFavorite = function (
    id,
    button
  ) {

    if (!id || !button) return;


    const key =
      "ars-favorite-" + id;

    let favorite = false;

    try {

      favorite =
        localStorage.getItem(key) === "1";

    } catch (error) {}


    favorite = !favorite;


    try {

      localStorage.setItem(
        key,
        favorite ? "1" : "0"
      );

    } catch (error) {}


    button.classList.toggle(
      "favorited",
      favorite
    );

    button.setAttribute(
      "aria-pressed",
      String(favorite)
    );


    window.ARS.toast(
      favorite
        ? "Favorite में जोड़ दिया ⭐"
        : "Favorite से हटा दिया"
    );

  };


  /* =========================
     SAVE SYSTEM
     ========================= */

  window.ARS.toggleSave = function (
    id,
    button
  ) {

    if (!id || !button) return;


    const key =
      "ars-save-" + id;

    let saved = false;

    try {

      saved =
        localStorage.getItem(key) === "1";

    } catch (error) {}


    saved = !saved;


    try {

      localStorage.setItem(
        key,
        saved ? "1" : "0"
      );

    } catch (error) {}


    button.classList.toggle(
      "saved",
      saved
    );


    window.ARS.toast(
      saved
        ? "Saved ✓"
        : "Save हटाया गया"
    );

  };


  /* =========================
     EXPORT HELPERS
     ========================= */

  window.ARS.getState = function (id) {

    return {

      liked:
        localStorage.getItem(
          "ars-like-" + id
        ) === "1",

      favorite:
        localStorage.getItem(
          "ars-favorite-" + id
        ) === "1",

      saved:
        localStorage.getItem(
          "ars-save-" + id
        ) === "1"

    };

  };


  /* =========================
     ERROR PROTECTION
     ========================= */

  window.addEventListener(
    "error",
    function (event) {

      console.warn(
        "ARS website warning:",
        event.message
      );

    }
  );


})();
