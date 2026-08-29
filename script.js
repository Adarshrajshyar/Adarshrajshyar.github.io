/* =========================================================
   ARS OFFICIAL — MAIN APPLICATION
   Version 5.0
========================================================= */

(function (window, document) {

  "use strict";

  /* -------------------------------------------------------
     SAFETY
  ------------------------------------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* -------------------------------------------------------
     HTML ESCAPE
  ------------------------------------------------------- */

  function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
  }

  /* -------------------------------------------------------
     TOAST
  ------------------------------------------------------- */

  function showToast(message, type = "success") {

    const toast = $("#arsToast");

    if (!toast) return;

    toast.textContent = message;

    toast.className = "ars-toast show " + type;

    clearTimeout(window.__arsToastTimer);

    window.__arsToastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);
  }

  /* -------------------------------------------------------
     LOADER
  ------------------------------------------------------- */

  function hideLoader() {

    const loader = $("#pageLoader");

    if (!loader) return;

    setTimeout(() => {

      loader.classList.add("hide");

    }, 350);

  }

  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */

  function initMenu() {

    const toggle = $("#menuToggle");
    const nav = $("#navLinks");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {

      nav.classList.toggle("open");

      toggle.textContent =
        nav.classList.contains("open") ? "✕" : "☰";

    });

    $$("#navLinks a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        toggle.textContent = "☰";

      });

    });

  }

  /* -------------------------------------------------------
     SHAYARI
  ------------------------------------------------------- */

  function getShayari() {

    if (
      window.ARS_SHAYARI &&
      typeof window.ARS_SHAYARI.all === "function"
    ) {
      return window.ARS_SHAYARI.all();
    }

    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.getShayari === "function"
    ) {
      return window.ARS_STORAGE.getShayari();
    }

    return [];

  }

  function renderShayari(list = getShayari()) {

    const grid = $("#shayariGrid");
    const empty = $("#shayariEmpty");

    if (!grid) return;

    if (!Array.isArray(list) || list.length === 0) {

      grid.innerHTML = "";

      if (empty) empty.classList.remove("hidden");

      return;

    }

    if (empty) empty.classList.add("hidden");

    grid.innerHTML = list.map((item, index) => {

      const id = item.id || `shayari-${index}`;

      const liked =
        window.ARS_STORAGE?.hasLiked?.(id) || false;

      const favorite =
        window.ARS_STORAGE?.isFavorite?.(id) || false;

      const text = escapeHTML(item.text || "")
        .replace(/\n/g, "<br>");

      return `

        <article class="content-card shayari-card">

          <div class="card-top">

            <span class="content-tag">
              ${escapeHTML(item.category || "General")}
            </span>

            <span class="card-number">
              #${index + 1}
            </span>

          </div>

          <div class="quote-mark">“</div>

          <p class="shayari-text">
            ${text}
          </p>

          <div class="card-author">
            — ${escapeHTML(item.author || "Adarsh Raj")}
          </div>

          <div class="card-actions">

            <button
              type="button"
              class="action-btn ${liked ? "active" : ""}"
              data-like="${escapeHTML(id)}"
            >
              ${liked ? "❤️ Liked" : "🤍 Like"}
            </button>

            <button
              type="button"
              class="action-btn ${favorite ? "active" : ""}"
              data-fav="${escapeHTML(id)}"
            >
              ${favorite ? "⭐ Saved" : "☆ Favorite"}
            </button>

          </div>

        </article>

      `;

    }).join("");

  }

  /* -------------------------------------------------------
     STORIES
  ------------------------------------------------------- */

  function getStories() {

    if (
      window.ARS_STORY &&
      typeof window.ARS_STORY.all === "function"
    ) {
      return window.ARS_STORY.all();
    }

    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.getStories === "function"
    ) {
      return window.ARS_STORAGE.getStories();
    }

    return [];

  }

  function renderStories(list = getStories()) {

    const grid = $("#storyGrid");
    const empty = $("#storyEmpty");

    if (!grid) return;

    if (!Array.isArray(list) || list.length === 0) {

      grid.innerHTML = "";

      if (empty) empty.classList.remove("hidden");

      return;

    }

    if (empty) empty.classList.add("hidden");

    grid.innerHTML = list.map((item, index) => {

      const id = item.id || `story-${index}`;

      const liked =
        window.ARS_STORAGE?.hasLiked?.(id) || false;

      const favorite =
        window.ARS_STORAGE?.isFavorite?.(id) || false;

      return `

        <article class="content-card story-card">

          <div class="card-top">

            <span class="content-tag">
              ${escapeHTML(item.category || "General")}
            </span>

            <span class="type-tag">
              ${escapeHTML(item.type || "Story")}
            </span>

          </div>

          <h3>
            ${escapeHTML(item.title || "Untitled")}
          </h3>

          <p>
            ${escapeHTML(item.content || "")
              .replace(/\n/g, "<br>")}
          </p>

          <div class="card-author">
            — ${escapeHTML(item.author || "Adarsh Raj")}
          </div>

          <div class="card-actions">

            <button
              type="button"
              class="action-btn ${liked ? "active" : ""}"
              data-like="${escapeHTML(id)}"
            >
              ${liked ? "❤️ Liked" : "🤍 Like"}
            </button>

            <button
              type="button"
              class="action-btn ${favorite ? "active" : ""}"
              data-fav="${escapeHTML(id)}"
            >
              ${favorite ? "⭐ Saved" : "☆ Favorite"}
            </button>

          </div>

        </article>

      `;

    }).join("");

  }

  /* -------------------------------------------------------
     SEARCH + CATEGORY
  ------------------------------------------------------- */

  function applyFilters() {

    const search =
      ($("#siteSearch")?.value || "")
        .trim()
        .toLowerCase();

    const category =
      $("#categoryFilter")?.value || "all";

    const shayari = getShayari();

    const stories = getStories();

    const filteredShayari = shayari.filter(item => {

      const searchable = [

        item.text,
        item.author,
        item.category

      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const categoryMatch =
        category === "all" ||
        String(item.category || "").toLowerCase() === category;

      const searchMatch =
        !search ||
        searchable.includes(search);

      return categoryMatch && searchMatch;

    });

    const filteredStories = stories.filter(item => {

      const searchable = [

        item.title,
        item.content,
        item.author,
        item.category,
        item.type

      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const categoryMatch =
        category === "all" ||
        String(item.category || "").toLowerCase() === category;

      const searchMatch =
        !search ||
        searchable.includes(search);

      return categoryMatch && searchMatch;

    });

    renderShayari(filteredShayari);

    renderStories(filteredStories);

  }

  /* -------------------------------------------------------
     LIKE / FAVORITE
  ------------------------------------------------------- */

  function initActions() {

    document.addEventListener("click", event => {

      const likeButton =
        event.target.closest("[data-like]");

      const favoriteButton =
        event.target.closest("[data-fav]");

      if (likeButton) {

        const id = likeButton.dataset.like;

        if (
          window.ARS_STORAGE &&
          typeof window.ARS_STORAGE.toggleLike === "function"
        ) {

          const liked =
            window.ARS_STORAGE.toggleLike(id);

          showToast(
            liked
              ? "❤️ Added to Likes"
              : "💔 Like removed"
          );

          applyFilters();

        }

      }

      if (favoriteButton) {

        const id = favoriteButton.dataset.fav;

        if (
          window.ARS_STORAGE &&
          typeof window.ARS_STORAGE.toggleFavorite === "function"
        ) {

          const saved =
            window.ARS_STORAGE.toggleFavorite(id);

          showToast(
            saved
              ? "⭐ Added to Favorites"
              : "☆ Removed from Favorites"
          );

          applyFilters();

        }

      }

    });

  }

  /* -------------------------------------------------------
     CONTACT FORM
  ------------------------------------------------------- */

  async function handleContactForm(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const data = Object.fromEntries(
      new FormData(form).entries()
    );

    if (!data.name || !data.email || !data.message) {

      showToast(
        "Please fill all required fields.",
        "error"
      );

      return;

    }

    const submitButton =
      form.querySelector('button[type="submit"]');

    const oldText =
      submitButton?.textContent || "Send Message";

    if (submitButton) {

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

    }

    /*
      Always save locally first.
      This prevents losing the message if EmailJS
      temporarily fails.
    */

    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.saveMessage === "function"
      ) {

        window.ARS_STORAGE.saveMessage({

          name: data.name,
          email: data.email,
          subject: data.subject || "",
          message: data.message

        });

      }

    } catch (error) {

      console.error(
        "ARS local message storage error:",
        error
      );

    }

    /* ---------------------------------------------------
       EMAILJS
    --------------------------------------------------- */

    try {

      const emailConfig =
        window.ARS_CONFIG?.EMAILJS;

      if (
        window.emailjs &&
        emailConfig &&
        emailConfig.SERVICE_ID &&
        emailConfig.TEMPLATE_ID &&
        emailConfig.PUBLIC_KEY
      ) {

        if (typeof emailjs.init === "function") {

          /*
            EmailJS v4 initialization.
            Re-initializing is harmless if already initialized.
          */

          emailjs.init({
            publicKey: emailConfig.PUBLIC_KEY
          });

        }

        await emailjs.send(

          emailConfig.SERVICE_ID,
          emailConfig.TEMPLATE_ID,

          {

            name: data.name,
            from_name: data.name,

            email: data.email,
            reply_to: data.email,

            subject: data.subject || "ARS Contact Message",

            message: data.message,

            website:
              window.location.origin,

            source:
              "ARS Official Website"

          }

        );

        showToast(
          "📩 Message sent successfully!"
        );

      } else {

        showToast(
          "📩 Message saved successfully."
        );

      }

      form.reset();

    } catch (error) {

      console.error(
        "ARS EmailJS Error:",
        error
      );

      /*
        Message has already been saved locally.
      */

      showToast(
        "📩 Message saved. Email delivery needs checking.",
        "warning"
      );

    } finally {

      if (submitButton) {

        submitButton.disabled = false;
        submitButton.textContent = oldText;

      }

    }

  }

  /* -------------------------------------------------------
     BACK TO TOP
  ------------------------------------------------------- */

  function initBackTop() {

    const button = $("#backTop");

    if (!button) return;

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > 450) {

          button.classList.add("show");

        } else {

          button.classList.remove("show");

        }

      },
      { passive: true }
    );

    button.addEventListener(
      "click",
      () => {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }

  /* -------------------------------------------------------
     SMOOTH INTERNAL LINKS
  ------------------------------------------------------- */

  function initSmoothLinks() {

    $$('a[href^="#"]').forEach(link => {

      link.addEventListener("click", event => {

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

  /* -------------------------------------------------------
     YEAR
  ------------------------------------------------------- */

  function setYear() {

    const year = $("#currentYear");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

  }

  /* -------------------------------------------------------
     EMAILJS INITIALIZATION
  ------------------------------------------------------- */

  function initEmailJS() {

    const config =
      window.ARS_CONFIG?.EMAILJS;

    if (
      !window.emailjs ||
      !config ||
      !config.PUBLIC_KEY
    ) {
      return;
    }

    try {

      emailjs.init({

        publicKey: config.PUBLIC_KEY

      });

      console.log(
        "📩 ARS EmailJS initialized"
      );

    } catch (error) {

      console.error(
        "EmailJS initialization failed:",
        error
      );

    }

  }

  /* -------------------------------------------------------
     APP INIT
  ------------------------------------------------------- */

  function init() {

    console.log(
      "🌹 ARS Official Website Initializing..."
    );

    initMenu();

    initActions();

    initBackTop();

    initSmoothLinks();

    initEmailJS();

    setYear();

    renderShayari();

    renderStories();

    const search =
      $("#siteSearch");

    const category =
      $("#categoryFilter");

    if (search) {

      search.addEventListener(
        "input",
        applyFilters
      );

    }

    if (category) {

      category.addEventListener(
        "change",
        applyFilters
      );

    }

    const contactForm =
      $("#contactForm");

    if (contactForm) {

      contactForm.addEventListener(
        "submit",
        handleContactForm
      );

    }

    hideLoader();

    console.log(
      "✅ ARS Official Website Ready"
    );

  }

  /* -------------------------------------------------------
     PUBLIC API
  ------------------------------------------------------- */

  window.ARS_APP = {

    renderShayari,
    renderStories,
    applyFilters,
    showToast

  };

  /* -------------------------------------------------------
     START
  ------------------------------------------------------- */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})(window, document);
