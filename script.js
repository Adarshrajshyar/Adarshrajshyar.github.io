/* =========================================================
   ARS OFFICIAL — MAIN APPLICATION SCRIPT
   ========================================================= */

(() => {
  "use strict";

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


  /* =======================================================
     SAFE STORAGE
     ======================================================= */

  const storage = {

    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);

        return value === null
          ? fallback
          : JSON.parse(value);

      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );

        return true;

      } catch {
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {}
    }

  };


  /* =======================================================
     TOAST
     ======================================================= */

  let toastTimer = null;

  function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }


  /* =======================================================
     THEME
     ======================================================= */

  function getTheme() {

    const saved = storage.get("ARS_THEME");

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  }


  function applyTheme(theme) {

    document.documentElement.dataset.theme = theme;

    storage.set("ARS_THEME", theme);

    const button = $("#themeToggle");

    if (button) {

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

    }
  }


  function initTheme() {

    applyTheme(getTheme());

    const button = $("#themeToggle");

    if (!button) return;

    button.addEventListener("click", () => {

      const current =
        document.documentElement.dataset.theme;

      applyTheme(
        current === "dark"
          ? "light"
          : "dark"
      );

    });

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function initMenu() {

    const button = $("#menuToggle");
    const nav = $("#mainNav");

    if (!button || !nav) return;

    button.addEventListener("click", () => {

      const open =
        nav.classList.toggle("open");

      button.setAttribute(
        "aria-expanded",
        String(open)
      );

      button.textContent =
        open ? "✕" : "☰";

    });


    $$("#mainNav a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        button.textContent = "☰";

      });

    });

  }


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  function initScrollTop() {

    const button = $("#scrollTopBtn");

    if (!button) return;


    function update() {

      if (window.scrollY > 450) {

        button.classList.add("visible");

      } else {

        button.classList.remove("visible");

      }

    }


    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );


    button.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });


    update();

  }


  /* =======================================================
     YEAR
     ======================================================= */

  function initYear() {

    const year = $("#currentYear");

    if (year) {
      year.textContent =
        new Date().getFullYear();
    }

  }


  /* =======================================================
     FAVORITES
     ======================================================= */

  const FAVORITES_KEY = "ARS_FAVORITES";


  function getFavorites() {

    const data =
      storage.get(FAVORITES_KEY, []);

    return Array.isArray(data)
      ? data
      : [];

  }


  function isFavorite(id) {

    return getFavorites()
      .some(item => item.id === id);

  }


  function toggleFavorite(item) {

    if (!item || !item.id) return false;

    let favorites = getFavorites();

    const index =
      favorites.findIndex(
        entry => entry.id === item.id
      );


    if (index >= 0) {

      favorites.splice(index, 1);

      storage.set(
        FAVORITES_KEY,
        favorites
      );

      showToast("Removed from Favorites");

      return false;

    }


    favorites.push({
      id: String(item.id),
      type: item.type || "content",
      category: item.category || "all",
      title: item.title || "",
      text: item.text || "",
      createdAt:
        item.createdAt ||
        new Date().toISOString()
    });


    storage.set(
      FAVORITES_KEY,
      favorites
    );

    showToast("Added to Favorites ⭐");

    return true;

  }


  /* =======================================================
     LIKE
     ======================================================= */

  function getLikes() {

    const likes =
      storage.get("ARS_LIKES", []);

    return Array.isArray(likes)
      ? likes
      : [];

  }


  function isLiked(id) {

    return getLikes().includes(String(id));

  }


  function toggleLike(id) {

    const normalized =
      String(id);

    let likes =
      getLikes();


    if (likes.includes(normalized)) {

      likes =
        likes.filter(
          item => item !== normalized
        );

      storage.set(
        "ARS_LIKES",
        likes
      );

      showToast("Unliked");

      return false;

    }


    likes.push(normalized);

    storage.set(
      "ARS_LIKES",
      likes
    );

    showToast("Liked ❤️");

    return true;

  }


  /* =======================================================
     COPY
     ======================================================= */

  async function copyText(text) {

    if (!text) {
      showToast("Nothing to copy");
      return;
    }


    try {

      await navigator.clipboard.writeText(text);

      showToast("Copied ✓");

    } catch {

      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      try {
        document.execCommand("copy");
        showToast("Copied ✓");
      } catch {
        showToast("Copy failed");
      }

      textarea.remove();

    }

  }


  /* =======================================================
     SHARE
     ======================================================= */

  async function shareContent(item) {

    if (!item) return;


    const title =
      item.title ||
      "ARS Official";


    const text =
      item.text ||
      "";


    const url =
      item.url ||
      window.location.href;


    if (navigator.share) {

      try {

        await navigator.share({
          title,
          text,
          url
        });

        return;

      } catch (error) {

        if (
          error &&
          error.name === "AbortError"
        ) {
          return;
        }

      }

    }


    await copyText(
      `${title}\n\n${text}\n\n${url}`
    );

    showToast(
      "Share unavailable — content copied instead"
    );

  }


  /* =======================================================
     NORMALIZE CONTENT
     ======================================================= */

  function normalizeContent(item, type, index) {

    if (!item) return null;


    const title =
      item.title ||
      item.name ||
      `${type === "shayari" ? "Shayari" : "Story"} ${index + 1}`;


    const text =
      item.text ||
      item.content ||
      item.body ||
      item.description ||
      "";


    const category =
      String(
        item.category ||
        item.type ||
        "all"
      ).toLowerCase();


    const id =
      String(
        item.id ||
        item._id ||
        `${type}-${index}-${title}`
      );


    return {
      id,
      title,
      text,
      category,
      type,
      createdAt:
        item.createdAt ||
        null
    };

  }


  /* =======================================================
     GET GLOBAL DATA
     ======================================================= */

  function getGlobalArray(names) {

    for (const name of names) {

      if (
        Array.isArray(window[name])
      ) {
        return window[name];
      }

    }

    return [];

  }


  /* =======================================================
     RENDER CARD
     ======================================================= */

  function createContentCard(item) {

    const article =
      document.createElement("article");

    article.className =
      "content-card";


    const safeText =
      escapeHtml(item.text);


    const safeTitle =
      escapeHtml(item.title);


    const safeCategory =
      escapeHtml(item.category);


    article.innerHTML = `

      <div class="content-card-body">

        <span class="content-card-category">
          ${safeCategory}
        </span>

        <h3>
          ${safeTitle}
        </h3>

        <p>
          ${safeText}
        </p>

        <div class="content-actions">

          <button
            type="button"
            class="content-action js-like"
            data-id="${escapeAttr(item.id)}"
          >
            ${isLiked(item.id) ? "💖 Liked" : "❤️ Like"}
          </button>

          <button
            type="button"
            class="content-action js-favorite"
            data-id="${escapeAttr(item.id)}"
          >
            ${isFavorite(item.id) ? "⭐ Favorited" : "☆ Favorite"}
          </button>

          <button
            type="button"
            class="content-action js-copy"
          >
            📋 Copy
          </button>

          <button
            type="button"
            class="content-action js-share"
          >
            ↗ Share
          </button>

        </div>

      </div>

    `;


    const likeButton =
      $(".js-like", article);

    const favoriteButton =
      $(".js-favorite", article);

    const copyButton =
      $(".js-copy", article);

    const shareButton =
      $(".js-share", article);


    likeButton?.addEventListener(
      "click",
      () => {

        const liked =
          toggleLike(item.id);

        likeButton.textContent =
          liked
            ? "💖 Liked"
            : "❤️ Like";

      }
    );


    favoriteButton?.addEventListener(
      "click",
      () => {

        const favorite =
          toggleFavorite(item);

        favoriteButton.textContent =
          favorite
            ? "⭐ Favorited"
            : "☆ Favorite";

      }
    );


    copyButton?.addEventListener(
      "click",
      () => {

        copyText(
          `${item.title}\n\n${item.text}`
        );

      }
    );


    shareButton?.addEventListener(
      "click",
      () => {

        shareContent({
          ...item,
          url:
            `${window.location.origin}${window.location.pathname}#${item.id}`
        });

      }
    );


    return article;

  }


  /* =======================================================
     ESCAPE HTML
     ======================================================= */

  function escapeHtml(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function escapeAttr(value) {

    return escapeHtml(value)
      .replaceAll("`", "&#096;");

  }


  /* =======================================================
     SHAYARI DATA
     ======================================================= */

  function getShayariData() {

    const data =
      getGlobalArray([
        "shayariData",
        "shayaris",
        "shayari",
        "ARS_SHAYARI"
      ]);


    return data
      .map(
        (item, index) =>
          normalizeContent(
            item,
            "shayari",
            index
          )
      )
      .filter(Boolean);

  }


  /* =======================================================
     STORY DATA
     ======================================================= */

  function getStoryData() {

    const data =
      getGlobalArray([
        "storyData",
        "stories",
        "story",
        "ARS_STORIES"
      ]);


    return data
      .map(
        (item, index) =>
          normalizeContent(
            item,
            "story",
            index
          )
      )
      .filter(Boolean);

  }


  /* =======================================================
     RENDER COLLECTION
     ======================================================= */

  function renderCollection(
    container,
    items,
    category = "all"
  ) {

    if (!container) return;


    const normalizedCategory =
      String(category)
        .toLowerCase()
        .trim();


    const filtered =
      normalizedCategory === "all"
        ? items
        : items.filter(
            item =>
              String(item.category)
                .toLowerCase()
                .trim() ===
              normalizedCategory
          );


    container.innerHTML = "";


    if (!filtered.length) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            🔎
          </div>

          <h3>No content found</h3>

          <p>
            इस category में अभी content उपलब्ध नहीं है।
          </p>

        </div>

      `;

      return;

    }


    const fragment =
      document.createDocumentFragment();


    filtered.forEach(item => {

      fragment.appendChild(
        createContentCard(item)
      );

    });


    container.appendChild(fragment);

  }


  /* =======================================================
     CATEGORY FILTER
     ======================================================= */

  function initCategoryFilter({
    buttonsSelector,
    containerSelector,
    dataGetter
  }) {

    const buttons =
      $$(buttonsSelector);

    const container =
      $(containerSelector);


    if (!buttons.length || !container) {
      return;
    }


    const data =
      dataGetter();


    function activate(button) {

      buttons.forEach(btn => {

        btn.classList.toggle(
          "active",
          btn === button
        );

      });


      renderCollection(
        container,
        data,
        button.dataset.category || "all"
      );

    }


    buttons.forEach(button => {

      button.addEventListener(
        "click",
        () => activate(button)
      );

    });


    const initial =
      buttons.find(
        button =>
          button.classList.contains("active")
      ) ||
      buttons[0];


    activate(initial);

  }


  /* =======================================================
     FAVORITES PAGE/SECTION
     ======================================================= */

  function renderFavorites() {

    const container =
      $("#favoritesContainer");

    if (!container) return;


    const favorites =
      getFavorites();


    if (!favorites.length) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">⭐</div>

          <h3>No Favorites Yet</h3>

          <p>
            Favorite button दबाने पर content यहाँ आएगा।
          </p>

        </div>

      `;

      return;

    }


    container.innerHTML = "";


    const fragment =
      document.createDocumentFragment();


    favorites.forEach(item => {

      fragment.appendChild(
        createContentCard(item)
      );

    });


    container.appendChild(fragment);

  }


  /* =======================================================
     STORAGE EVENT
     ======================================================= */

  window.addEventListener(
    "storage",
    event => {

      if (
        event.key === FAVORITES_KEY ||
        event.key === "ARS_LIKES"
      ) {

        renderFavorites();

        const shayariContainer =
          $("#shayariContainer");

        const storyContainer =
          $("#storyContainer");


        if (shayariContainer) {

          renderCollection(
            shayariContainer,
            getShayariData(),
            "all"
          );

        }


        if (storyContainer) {

          renderCollection(
            storyContainer,
            getStoryData(),
            "all"
          );

        }

      }

    }
  );


  /* =======================================================
     INIT
     ======================================================= */

  function init() {

    initTheme();

    initMenu();

    initScrollTop();

    initYear();


    initCategoryFilter({
      buttonsSelector:
        "#shayariCategories .category-btn",

      containerSelector:
        "#shayariContainer",

      dataGetter:
        getShayariData
    });


    initCategoryFilter({
      buttonsSelector:
        "#storyCategories .category-btn",

      containerSelector:
        "#storyContainer",

      dataGetter:
        getStoryData
    });


    renderFavorites();

  }


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

})();
