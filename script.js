/* =========================================================
   ARS OFFICIAL — MAIN APPLICATION
   Adarsh Raj Shayar
========================================================= */

(function (window, document) {

  "use strict";


  /* =======================================================
     SHORTCUTS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


  /* =======================================================
     SAFE HTML
  ======================================================= */

  function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent =
      value === null || value === undefined
        ? ""
        : String(value);

    return div.innerHTML;
  }


  function safeText(value) {

    return value === null || value === undefined
      ? ""
      : String(value);

  }


  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer = null;

  function toast(message) {

    let box = $("#arsToast");

    if (!box) {

      box = document.createElement("div");

      box.id = "arsToast";

      box.className = "toast";

      document.body.appendChild(box);

    }

    box.textContent = message;

    box.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      box.classList.remove("show");

    }, 2300);

  }


  /* =======================================================
     LOADER
  ======================================================= */

  function hideLoader() {

    const loader = $("#pageLoader");

    if (!loader) return;

    setTimeout(() => {

      loader.classList.add("hide");

    }, 350);

  }


  /* =======================================================
     STORAGE SAFETY
  ======================================================= */

  function getStorage() {

    return window.ARS_STORAGE || null;

  }


  function isLiked(id) {

    const storage = getStorage();

    if (!storage || typeof storage.hasLiked !== "function") {

      return false;

    }

    try {

      return Boolean(storage.hasLiked(String(id)));

    } catch (error) {

      console.warn("ARS Like check failed:", error);

      return false;

    }

  }


  function isFavorite(id) {

    const storage = getStorage();

    if (!storage || typeof storage.isFavorite !== "function") {

      return false;

    }

    try {

      return Boolean(storage.isFavorite(String(id)));

    } catch (error) {

      console.warn("ARS Favorite check failed:", error);

      return false;

    }

  }


  function toggleLike(id) {

    const storage = getStorage();

    if (!storage || typeof storage.toggleLike !== "function") {

      toast("Like system अभी उपलब्ध नहीं है।");

      return false;

    }

    try {

      return storage.toggleLike(String(id));

    } catch (error) {

      console.error("ARS Like error:", error);

      toast("Like update नहीं हो पाया।");

      return false;

    }

  }


  function toggleFavorite(id) {

    const storage = getStorage();

    if (!storage || typeof storage.toggleFavorite !== "function") {

      toast("Favorite system अभी उपलब्ध नहीं है।");

      return false;

    }

    try {

      return storage.toggleFavorite(String(id));

    } catch (error) {

      console.error("ARS Favorite error:", error);

      toast("Favorite update नहीं हो पाया।");

      return false;

    }

  }


  /* =======================================================
     SHAYARI DATA
  ======================================================= */

  function getShayari() {

    if (
      window.ARS_SHAYARI &&
      typeof window.ARS_SHAYARI.all === "function"
    ) {

      try {

        const data = window.ARS_SHAYARI.all();

        return Array.isArray(data) ? data : [];

      } catch (error) {

        console.error("Shayari database error:", error);

      }

    }

    return [];

  }


  /* =======================================================
     STORY DATA
  ======================================================= */

  function getStories() {

    if (
      window.ARS_STORY &&
      typeof window.ARS_STORY.all === "function"
    ) {

      try {

        const data = window.ARS_STORY.all();

        return Array.isArray(data) ? data : [];

      } catch (error) {

        console.error("Story database error:", error);

      }

    }

    return [];

  }


  /* =======================================================
     NORMALIZE CATEGORY
  ======================================================= */

  function normalizeCategory(category) {

    return safeText(category)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

  }


  /* =======================================================
     SHAYARI CARD
  ======================================================= */

  function shayariCard(item) {

    const id = safeText(item.id);

    const category =
      normalizeCategory(item.category) || "general";

    const liked = isLiked(id);

    const favorite = isFavorite(id);

    const text =
      escapeHTML(item.text || item.content || "")
        .replace(/\n/g, "<br>");

    const author =
      escapeHTML(item.author || "Adarsh Raj");

    const categoryName = {

      love: "❤️ Love",

      sad: "💙 Sad",

      motivational: "🔥 Motivational",

      motivation: "🔥 Motivational",

      friendship: "🤝 Friendship",

      attitude: "😎 Attitude",

      general: "🌹 Shayari"

    }[category] || category;

    return `
      <article
        class="content-card"
        data-content-id="${escapeHTML(id)}"
        data-content-type="shayari">

        <span class="tag">
          ${escapeHTML(categoryName)}
        </span>

        <p class="content-text">
          ${text}
        </p>

        <small class="author">
          — ${author}
        </small>

        <div class="card-actions">

          <button
            type="button"
            class="card-action ${liked ? "like-active" : ""}"
            data-action="like"
            data-id="${escapeHTML(id)}"
            data-type="shayari">

            ${liked ? "💔 Unlike" : "❤️ Like"}

          </button>

          <button
            type="button"
            class="card-action ${favorite ? "favorite-active" : ""}"
            data-action="favorite"
            data-id="${escapeHTML(id)}"
            data-type="shayari">

            ${favorite ? "⭐ Saved" : "☆ Favorite"}

          </button>

        </div>

      </article>
    `;

  }


  /* =======================================================
     STORY CARD
  ======================================================= */

  function storyCard(item) {

    const id = safeText(item.id);

    const category =
      normalizeCategory(item.category) || "general";

    const type =
      normalizeCategory(item.type) || "story";

    const liked = isLiked(id);

    const favorite = isFavorite(id);

    const title =
      escapeHTML(item.title || "Untitled");

    const content =
      escapeHTML(item.content || item.text || "")
        .replace(/\n/g, "<br>");

    const author =
      escapeHTML(item.author || "Adarsh Raj");

    const categoryName = {

      mystery: "🕵️ Mystery",

      horror: "👻 Horror",

      biography: "👤 Biography",

      life: "🌱 Life",

      inspiration: "✨ Inspiration",

      motivation: "🔥 Motivation",

      friendship: "🤝 Friendship",

      dream: "🌙 Dream",

      education: "📚 Education",

      general: "📖 General"

    }[category] || category;

    const typeName =
      type === "poem"
        ? "कविता / Poem"
        : "कहानी / Story";


    return `
      <article
        class="content-card"
        data-content-id="${escapeHTML(id)}"
        data-content-type="story">

        <span class="tag">
          ${escapeHTML(categoryName)}
          ·
          ${escapeHTML(typeName)}
        </span>

        <h3>
          ${title}
        </h3>

        <p class="content-text">
          ${content}
        </p>

        <small class="author">
          — ${author}
        </small>

        <div class="card-actions">

          <button
            type="button"
            class="card-action ${liked ? "like-active" : ""}"
            data-action="like"
            data-id="${escapeHTML(id)}"
            data-type="story">

            ${liked ? "💔 Unlike" : "❤️ Like"}

          </button>

          <button
            type="button"
            class="card-action ${favorite ? "favorite-active" : ""}"
            data-action="favorite"
            data-id="${escapeHTML(id)}"
            data-type="story">

            ${favorite ? "⭐ Saved" : "☆ Favorite"}

          </button>

        </div>

      </article>
    `;

  }


  /* =======================================================
     RENDER SHAYARI
  ======================================================= */

  let currentShayariCategory = "all";

  function renderShayari() {

    const grid = $("#shayariGrid");

    if (!grid) return;

    const search =
      ($("#siteSearch")?.value || "")
        .trim()
        .toLowerCase();

    const data = getShayari();

    const filtered = data.filter(item => {

      const category =
        normalizeCategory(item.category);

      const searchable = [
        item.text,
        item.content,
        item.author,
        item.category
      ]
        .map(safeText)
        .join(" ")
        .toLowerCase();

      const categoryMatch =
        currentShayariCategory === "all" ||
        category === currentShayariCategory ||
        (
          currentShayariCategory === "motivational" &&
          category === "motivation"
        );

      const searchMatch =
        !search ||
        searchable.includes(search);

      return categoryMatch && searchMatch;

    });


    grid.innerHTML =
      filtered.length
        ? filtered.map(shayariCard).join("")
        : "";


    const empty = $("#shayariEmpty");

    if (empty) {

      empty.classList.toggle(
        "hidden",
        filtered.length !== 0
      );

    }

  }


  /* =======================================================
     RENDER STORIES
  ======================================================= */

  let currentStoryCategory = "all";

  function renderStories() {

    const grid = $("#storyGrid");

    if (!grid) return;

    const search =
      ($("#siteSearch")?.value || "")
        .trim()
        .toLowerCase();

    const data = getStories();

    const filtered = data.filter(item => {

      const category =
        normalizeCategory(item.category);

      const searchable = [
        item.title,
        item.content,
        item.author,
        item.category,
        item.type
      ]
        .map(safeText)
        .join(" ")
        .toLowerCase();

      const categoryMatch =
        currentStoryCategory === "all" ||
        category === currentStoryCategory;

      const searchMatch =
        !search ||
        searchable.includes(search);

      return categoryMatch && searchMatch;

    });


    grid.innerHTML =
      filtered.length
        ? filtered.map(storyCard).join("")
        : "";


    const empty = $("#storyEmpty");

    if (empty) {

      empty.classList.toggle(
        "hidden",
        filtered.length !== 0
      );

    }

  }


  /* =======================================================
     FAVORITES
  ======================================================= */

  function getFavoriteItems() {

    const shayari = getShayari();

    const stories = getStories();

    const all = [
      ...shayari.map(item => ({
        ...item,
        _arsType: "shayari"
      })),

      ...stories.map(item => ({
        ...item,
        _arsType: "story"
      }))
    ];

    return all.filter(item =>
      isFavorite(item.id)
    );

  }


  function renderFavorites() {

    const grid = $("#favoritesGrid");

    if (!grid) return;

    const favorites =
      getFavoriteItems();


    grid.innerHTML =
      favorites.length
        ? favorites.map(item => {

            if (item._arsType === "story") {

              return storyCard(item);

            }

            return shayariCard(item);

          }).join("")
        : "";


    const empty = $("#favoritesEmpty");

    if (empty) {

      empty.classList.toggle(
        "hidden",
        favorites.length !== 0
      );

    }

  }


  /* =======================================================
     UPDATE ALL CONTENT
  ======================================================= */

  function refreshContent() {

    renderShayari();

    renderStories();

    renderFavorites();

  }


  /* =======================================================
     CATEGORY BUTTONS
  ======================================================= */

  function setupCategories() {

    $$("#shayariCategories [data-shayari-category]")
      .forEach(button => {

        button.addEventListener("click", () => {

          currentShayariCategory =
            normalizeCategory(
              button.dataset.shayariCategory
            );

          $$("#shayariCategories .category-btn")
            .forEach(btn =>
              btn.classList.remove("active")
            );

          button.classList.add("active");

          renderShayari();

        });

      });


    $$("#storyCategories [data-story-category]")
      .forEach(button => {

        button.addEventListener("click", () => {

          currentStoryCategory =
            normalizeCategory(
              button.dataset.storyCategory
            );

          $$("#storyCategories .category-btn")
            .forEach(btn =>
              btn.classList.remove("active")
            );

          button.classList.add("active");

          renderStories();

        });

      });

  }


  /* =======================================================
     GLOBAL CARD ACTIONS
  ======================================================= */

  function setupCardActions() {

    document.addEventListener("click", event => {

      const button =
        event.target.closest(
          "[data-action][data-id]"
        );

      if (!button) return;

      const action =
        button.dataset.action;

      const id =
        button.dataset.id;


      if (action === "like") {

        const liked =
          toggleLike(id);

        toast(
          liked
            ? "❤️ Like किया गया"
            : "Like हटा दिया गया"
        );

        refreshContent();

        return;

      }


      if (action === "favorite") {

        const saved =
          toggleFavorite(id);

        toast(
          saved
            ? "⭐ Favorite में save किया गया"
            : "Favorite से हटा दिया गया"
        );

        refreshContent();

      }

    });

  }


  /* =======================================================
     SEARCH
  ======================================================= */

  function setupSearch() {

    const search =
      $("#siteSearch");

    if (!search) return;

    let timer = null;

    search.addEventListener(
      "input",
      () => {

        clearTimeout(timer);

        timer = setTimeout(() => {

          renderShayari();

          renderStories();

        }, 120);

      }
    );

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function setupMenu() {

    const toggle =
      $("#menuToggle");

    const nav =
      $("#navLinks");

    if (!toggle || !nav) return;


    toggle.addEventListener("click", () => {

      const open =
        nav.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      toggle.textContent =
        open ? "✕" : "☰";

    });


    $$("#navLinks a")
      .forEach(link => {

        link.addEventListener("click", () => {

          nav.classList.remove("open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

          toggle.textContent = "☰";

        });

      });

  }


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  function setupBackTop() {

    const button =
      $("#backTop");

    if (!button) return;


    window.addEventListener(
      "scroll",
      () => {

        button.classList.toggle(
          "show",
          window.scrollY > 450
        );

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


  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  function setupYear() {

    const year =
      $("#currentYear");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

  }


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  async function handleContactSubmit(event) {

    event.preventDefault();

    const form =
      event.currentTarget;

    if (!form.checkValidity()) {

      form.reportValidity();

      return;

    }


    const formData =
      new FormData(form);

    const data =
      Object.fromEntries(
        formData.entries()
      );


    const storage =
      getStorage();


    /* Save message locally */

    try {

      if (
        storage &&
        typeof storage.saveMessage === "function"
      ) {

        storage.saveMessage({

          name: safeText(data.name),

          email: safeText(data.email),

          subject: safeText(data.subject),

          message: safeText(data.message)

        });

      }

    } catch (error) {

      console.error(
        "ARS local contact save failed:",
        error
      );

    }


    /* EmailJS */

    let emailSent = false;

    try {

      if (
        window.emailjs &&
        window.ARS_CONFIG &&
        window.ARS_CONFIG.EMAILJS &&
        window.ARS_CONFIG.EMAILJS.SERVICE_ID &&
        window.ARS_CONFIG.EMAILJS.TEMPLATE_ID &&
        window.ARS_CONFIG.EMAILJS.PUBLIC_KEY
      ) {

        await window.emailjs.send(

          window.ARS_CONFIG.EMAILJS.SERVICE_ID,

          window.ARS_CONFIG.EMAILJS.TEMPLATE_ID,

          {

            name: safeText(data.name),

            from_name: safeText(data.name),

            email: safeText(data.email),

            reply_to: safeText(data.email),

            subject: safeText(data.subject),

            message: safeText(data.message)

          }

        );

        emailSent = true;

      }

    } catch (error) {

      console.warn(
        "ARS EmailJS delivery failed:",
        error
      );

    }


    if (emailSent) {

      toast(
        "✅ आपका संदेश सफलतापूर्वक भेज दिया गया।"
      );

    } else {

      toast(
        "✅ संदेश सुरक्षित रूप से save हो गया।"
      );

    }


    form.reset();

  }


  function setupContact() {

    const form =
      $("#contactForm");

    if (!form) return;

    form.addEventListener(
      "submit",
      handleContactSubmit
    );

  }


  /* =======================================================
     EMAILJS INITIALIZATION
  ======================================================= */

  function setupEmailJS() {

    if (
      !window.emailjs ||
      !window.ARS_CONFIG ||
      !window.ARS_CONFIG.EMAILJS
    ) {

      return;

    }


    const publicKey =
      window.ARS_CONFIG.EMAILJS.PUBLIC_KEY;


    if (!publicKey) return;


    try {

      window.emailjs.init({
        publicKey
      });

    } catch (error) {

      console.warn(
        "ARS EmailJS initialization failed:",
        error
      );

    }

  }


  /* =======================================================
     HASH NAVIGATION
  ======================================================= */

  function handleInitialHash() {

    if (!window.location.hash) return;

    setTimeout(() => {

      const target =
        document.querySelector(
          window.location.hash
        );

      if (target) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }, 250);

  }


  /* =======================================================
     APPLICATION INITIALIZATION
  ======================================================= */

  function init() {

    try {

      setupEmailJS();

      setupMenu();

      setupCategories();

      setupSearch();

      setupCardActions();

      setupBackTop();

      setupContact();

      setupYear();

      renderShayari();

      renderStories();

      renderFavorites();

      handleInitialHash();

    } catch (error) {

      console.error(
        "ARS initialization error:",
        error
      );

      /*
        Important:
        एक feature में error आने पर पूरी website
        बंद नहीं होगी।
      */

      toast(
        "ARS Website loaded with limited features."
      );

    }


    hideLoader();

  }


  /* =======================================================
     PUBLIC API
  ======================================================= */

  window.ARS_APP = {

    init,

    refresh: refreshContent,

    renderShayari,

    renderStories,

    renderFavorites,

    toast

  };


  /* =======================================================
     DOM READY
  ======================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );

  } else {

    init();

  }


})(window, document);
