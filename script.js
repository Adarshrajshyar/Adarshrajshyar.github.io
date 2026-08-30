/* =========================================================
   ARS OFFICIAL — MASTER SCRIPT
   Main Website Controller
========================================================= */

"use strict";

(function (window, document) {

  /* =======================================================
     SHORTCUTS
  ======================================================== */

  const $ = function (selector) {
    return document.querySelector(selector);
  };

  const $$ = function (selector) {
    return Array.from(document.querySelectorAll(selector));
  };


  /* =======================================================
     STATE
  ======================================================== */

  const state = {

    shayari: [],

    stories: [],

    shayariSearch: "",

    storySearch: "",

    shayariCategory: "all",

    storyCategory: "all"

  };


  /* =======================================================
     TOAST
  ======================================================== */

  let toastTimer = null;

  function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = String(message || "");

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);

  }


  /* =======================================================
     SAFE HTML
  ======================================================== */

  function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value == null ? "" : String(value);

    return div.innerHTML;

  }


  /* =======================================================
     CONFIG
  ======================================================== */

  function getConfigValue(key, fallback) {

    try {

      if (
        window.ARS_CONFIG &&
        Object.prototype.hasOwnProperty.call(
          window.ARS_CONFIG,
          key
        )
      ) {

        return window.ARS_CONFIG[key];

      }

    } catch (error) {

      console.warn("ARS Config Error:", error);

    }

    return fallback;

  }


  function applyConfig() {

    const instagram = getConfigValue(
      "INSTAGRAM_URL",
      ""
    );

    const instagramLink = $("#instagramLink");

    if (instagramLink && instagram) {

      instagramLink.href = instagram;

    }

  }


  /* =======================================================
     SHAYARI DATA
  ======================================================== */

  function getShayariData() {

    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.getShayari === "function"
      ) {

        const data =
          window.ARS_STORAGE.getShayari();

        return Array.isArray(data)
          ? data
          : [];

      }

    } catch (error) {

      console.error(
        "ARS Shayari Load Error:",
        error
      );

    }

    return [];

  }


  /* =======================================================
     DEFAULT SHAYARI
  ======================================================== */

  function initializeShayari() {

    const existing = getShayariData();

    if (existing.length > 0) {

      state.shayari = existing;

      return;

    }


    const defaults = [

      {
        id: "SH-M01",
        title: "एक छोटी सी बात",
        category: "life",
        author: "Adarsh Raj",
        content:
          "ज़िंदगी में आगे बढ़ते रहो, छोटे कदम भी एक दिन बड़ी मंज़िल तक ले जाते हैं।"
      },

      {
        id: "SH-I01",
        title: "उम्मीद",
        category: "motivation",
        author: "Adarsh Raj",
        content:
          "उम्मीद का दिया जलाए रखना, रास्ता कठिन हो तो भी मुस्कुराते रहना।"
      },

      {
        id: "SH-F01",
        title: "दोस्ती",
        category: "friendship",
        author: "Adarsh Raj",
        content:
          "दोस्ती विश्वास से बनती है और सम्मान से हमेशा मजबूत रहती है।"
      },

      {
        id: "SH-L01",
        title: "ज़िंदगी",
        category: "life",
        author: "Adarsh Raj",
        content:
          "हर दिन कुछ नया सिखाता है, हर अनुभव हमें थोड़ा और बेहतर बनाता है।"
      }

    ];


    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.saveShayari === "function"
      ) {

        window.ARS_STORAGE.saveShayari(defaults);

      }

    } catch (error) {

      console.error(
        "ARS Shayari Save Error:",
        error
      );

    }


    state.shayari = defaults;

  }


  /* =======================================================
     STORY DATA
  ======================================================== */

  function loadStories() {

    try {

      if (
        window.ARS_STORY &&
        typeof window.ARS_STORY.all === "function"
      ) {

        const data =
          window.ARS_STORY.all();

        state.stories =
          Array.isArray(data)
            ? data
            : [];

        return;

      }


      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.getStories === "function"
      ) {

        const data =
          window.ARS_STORAGE.getStories();

        state.stories =
          Array.isArray(data)
            ? data
            : [];

      }

    } catch (error) {

      console.error(
        "ARS Story Load Error:",
        error
      );

      state.stories = [];

    }

  }


  /* =======================================================
     LIKE
  ======================================================== */

  function isLiked(id) {

    try {

      return Boolean(
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.hasLiked === "function" &&
        window.ARS_STORAGE.hasLiked(id)
      );

    } catch (error) {

      return false;

    }

  }


  function toggleLike(id) {

    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.toggleLike === "function"
      ) {

        const liked =
          window.ARS_STORAGE.toggleLike(id);

        showToast(
          liked
            ? "❤️ Like किया गया"
            : "Like हटाया गया"
        );

        renderAll();

      }

    } catch (error) {

      console.error(
        "ARS Like Error:",
        error
      );

    }

  }


  /* =======================================================
     FAVORITE
  ======================================================== */

  function isFavorite(id) {

    try {

      return Boolean(
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.isFavorite === "function" &&
        window.ARS_STORAGE.isFavorite(id)
      );

    } catch (error) {

      return false;

    }

  }


  function toggleFavorite(id) {

    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.toggleFavorite === "function"
      ) {

        const favorite =
          window.ARS_STORAGE.toggleFavorite(id);

        showToast(
          favorite
            ? "⭐ Favorite में जोड़ा गया"
            : "Favorite से हटाया गया"
        );

        renderAll();

      }

    } catch (error) {

      console.error(
        "ARS Favorite Error:",
        error
      );

    }

  }


  /* =======================================================
     CARD
  ======================================================== */

  function createCard(item, options) {

    options = options || {};

    const id =
      String(item.id || "");

    const title =
      escapeHTML(item.title || "Untitled");

    const content =
      escapeHTML(item.content || "");

    const author =
      escapeHTML(item.author || "Adarsh Raj");

    const category =
      escapeHTML(item.category || "general");

    const liked =
      isLiked(id);

    const favorite =
      isFavorite(id);


    const card =
      document.createElement("article");

    card.className =
      "content-card";


    const tag =
      document.createElement("span");

    tag.className = "tag";

    tag.textContent =
      category;


    const heading =
      document.createElement("h3");

    heading.textContent =
      item.title || "Untitled";


    const text =
      document.createElement("p");

    text.className =
      "content-text";

    text.textContent =
      item.content || "";


    const authorEl =
      document.createElement("div");

    authorEl.className =
      "author";

    authorEl.textContent =
      "✍️ " + (item.author || "Adarsh Raj");


    const actions =
      document.createElement("div");

    actions.className =
      "card-actions";


    const likeButton =
      document.createElement("button");

    likeButton.type =
      "button";

    likeButton.className =
      "card-action";

    likeButton.innerHTML =
      liked ? "❤️ Liked" : "♡ Like";

    likeButton.setAttribute(
      "aria-label",
      liked
        ? "Unlike"
        : "Like"
    );

    likeButton.addEventListener(
      "click",
      function () {
        toggleLike(id);
      }
    );


    const favoriteButton =
      document.createElement("button");

    favoriteButton.type =
      "button";

    favoriteButton.className =
      "card-action" +
      (favorite
        ? " favorite-active"
        : "");

    favoriteButton.innerHTML =
      favorite
        ? "⭐ Saved"
        : "☆ Favorite";

    favoriteButton.addEventListener(
      "click",
      function () {
        toggleFavorite(id);
      }
    );


    actions.appendChild(likeButton);

    actions.appendChild(favoriteButton);


    card.appendChild(tag);

    card.appendChild(heading);

    card.appendChild(text);

    card.appendChild(authorEl);

    card.appendChild(actions);


    return card;

  }


  /* =======================================================
     EMPTY STATE
  ======================================================== */

  function emptyState(
    icon,
    title,
    message
  ) {

    const wrapper =
      document.createElement("div");

    wrapper.className =
      "empty-state";

    wrapper.innerHTML = `
      <div>${escapeHTML(icon)}</div>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(message)}</p>
    `;

    return wrapper;

  }


  /* =======================================================
     SHAYARI FILTER
  ======================================================== */

  function filteredShayari() {

    const search =
      state.shayariSearch
        .trim()
        .toLowerCase();


    return state.shayari.filter(
      function (item) {

        const category =
          String(
            item.category || ""
          ).toLowerCase();


        const searchable =
          [
            item.title,
            item.content,
            item.author,
            item.category
          ]
            .join(" ")
            .toLowerCase();


        const categoryMatch =
          state.shayariCategory === "all" ||
          category ===
            state.shayariCategory;


        const searchMatch =
          !search ||
          searchable.includes(search);


        return (
          categoryMatch &&
          searchMatch
        );

      }
    );

  }


  /* =======================================================
     STORY FILTER
  ======================================================== */

  function filteredStories() {

    const search =
      state.storySearch
        .trim()
        .toLowerCase();


    return state.stories.filter(
      function (item) {

        const category =
          String(
            item.category || ""
          ).toLowerCase();

        const type =
          String(
            item.type || ""
          ).toLowerCase();


        const searchable =
          [
            item.title,
            item.content,
            item.author,
            item.category,
            item.type
          ]
            .join(" ")
            .toLowerCase();


        let categoryMatch = true;


        if (
          state.storyCategory !== "all"
        ) {

          if (
            state.storyCategory === "story"
          ) {

            categoryMatch =
              type === "story";

          } else if (
            state.storyCategory === "poetry"
          ) {

            categoryMatch =
              type === "poem" ||
              category === "poetry";

          } else {

            categoryMatch =
              category ===
              state.storyCategory;

          }

        }


        const searchMatch =
          !search ||
          searchable.includes(search);


        return (
          categoryMatch &&
          searchMatch
        );

      }
    );

  }


  /* =======================================================
     RENDER SHAYARI
  ======================================================== */

  function renderShayari() {

    const grid =
      $("#shayariGrid");

    if (!grid) return;

    grid.innerHTML = "";


    const items =
      filteredShayari();


    if (!items.length) {

      grid.appendChild(
        emptyState(
          "✍️",
          "कोई Shayari नहीं मिली",
          "Search या category बदलकर फिर कोशिश करें।"
        )
      );

      return;

    }


    items.forEach(
      function (item) {

        grid.appendChild(
          createCard(item)
        );

      }
    );

  }


  /* =======================================================
     RENDER STORIES
  ======================================================== */

  function renderStories() {

    const grid =
      $("#storyGrid");

    if (!grid) return;

    grid.innerHTML = "";


    const items =
      filteredStories();


    if (!items.length) {

      grid.appendChild(
        emptyState(
          "📖",
          "कोई Story नहीं मिली",
          "Search या category बदलकर फिर कोशिश करें।"
        )
      );

      return;

    }


    items.forEach(
      function (item) {

        grid.appendChild(
          createCard(item)
        );

      }
    );

  }


  /* =======================================================
     FAVORITES
  ======================================================== */

  function renderFavorites() {

    const grid =
      $("#favoritesGrid");

    if (!grid) return;

    grid.innerHTML = "";


    let favoriteIDs = [];


    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.favorites === "function"
      ) {

        favoriteIDs =
          window.ARS_STORAGE.favorites();

      }

    } catch (error) {

      favoriteIDs = [];

    }


    if (!Array.isArray(favoriteIDs)) {

      favoriteIDs = [];

    }


    const allItems =
      state.shayari.concat(
        state.stories
      );


    const favorites =
      allItems.filter(
        function (item) {

          return favoriteIDs.includes(
            String(item.id)
          );

        }
      );


    if (!favorites.length) {

      grid.appendChild(
        emptyState(
          "⭐",
          "Favorites खाली हैं",
          "किसी Shayari या Story पर Favorite दबाएँ।"
        )
      );

      return;

    }


    favorites.forEach(
      function (item) {

        grid.appendChild(
          createCard(item)
        );

      }
    );

  }


  /* =======================================================
     RENDER ALL
  ======================================================== */

  function renderAll() {

    loadStories();

    renderShayari();

    renderStories();

    renderFavorites();

  }


  /* =======================================================
     CATEGORY BUTTONS
  ======================================================== */

  function setupCategoryButtons() {

    $$("#shayariCategories .category-btn")
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              $$("#shayariCategories .category-btn")
                .forEach(
                  function (item) {
                    item.classList.remove("active");
                  }
                );


              button.classList.add(
                "active"
              );


              state.shayariCategory =
                button.dataset.category ||
                "all";


              renderShayari();

            }
          );

        }
      );


    $$("#storyCategories .category-btn")
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              $$("#storyCategories .category-btn")
                .forEach(
                  function (item) {
                    item.classList.remove("active");
                  }
                );


              button.classList.add(
                "active"
              );


              state.storyCategory =
                button.dataset.category ||
                "all";


              renderStories();

            }
          );

        }
      );

  }


  /* =======================================================
     SEARCH
  ======================================================== */

  function setupSearch() {

    const shayariSearch =
      $("#shayariSearch");

    if (shayariSearch) {

      shayariSearch.addEventListener(
        "input",
        function () {

          state.shayariSearch =
            shayariSearch.value || "";

          renderShayari();

        }
      );

    }


    const storySearch =
      $("#storySearch");

    if (storySearch) {

      storySearch.addEventListener(
        "input",
        function () {

          state.storySearch =
            storySearch.value || "";

          renderStories();

        }
      );

    }

  }


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================== */

  function setupNavigation() {

    const toggle =
      $("#menuToggle");

    const nav =
      $("#navLinks");

    if (!toggle || !nav) return;


    toggle.addEventListener(
      "click",
      function () {

        const open =
          nav.classList.toggle("open");


        toggle.setAttribute(
          "aria-expanded",
          String(open)
        );


        toggle.textContent =
          open ? "✕" : "☰";

      }
    );


    $$("#navLinks a")
      .forEach(
        function (link) {

          link.addEventListener(
            "click",
            function () {

              nav.classList.remove(
                "open"
              );

              toggle.setAttribute(
                "aria-expanded",
                "false"
              );

              toggle.textContent =
                "☰";

            }
          );

        }
      );

  }


  /* =======================================================
     CONTACT FORM
  ======================================================== */

  function setupContactForm() {

    const form =
      $("#contactForm");

    if (!form) return;


    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const name =
          $("#contactName")?.value.trim();

        const email =
          $("#contactEmail")?.value.trim();

        const subject =
          $("#contactSubject")?.value.trim();

        const message =
          $("#contactMessage")?.value.trim();


        if (
          !name ||
          !email ||
          !subject ||
          !message
        ) {

          showToast(
            "कृपया सभी fields भरें।"
          );

          return;

        }


        try {

          if (
            window.ARS_STORAGE &&
            typeof window.ARS_STORAGE.saveMessage ===
              "function"
          ) {

            window.ARS_STORAGE.saveMessage({

              name: name,

              email: email,

              subject: subject,

              message: message

            });

          }


          form.reset();


          showToast(
            "✅ आपका message सुरक्षित रूप से save हो गया।"
          );


        } catch (error) {

          console.error(
            "ARS Contact Error:",
            error
          );

          showToast(
            "Message save नहीं हो पाया।"
          );

        }

      }
    );

  }


  /* =======================================================
     BACK TO TOP
  ======================================================== */

  function setupBackTop() {

    const button =
      $("#backTop");

    if (!button) return;


    window.addEventListener(
      "scroll",
      function () {

        if (
          window.scrollY > 450
        ) {

          button.classList.add(
            "show"
          );

        } else {

          button.classList.remove(
            "show"
          );

        }

      },
      {
        passive: true
      }
    );


    button.addEventListener(
      "click",
      function () {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }


  /* =======================================================
     YEAR
  ======================================================== */

  function setupYear() {

    const year =
      $("#currentYear");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

  }


  /* =======================================================
     LOADER
  ======================================================== */

  function hideLoader() {

    const loader =
      $("#pageLoader");

    if (!loader) return;


    setTimeout(
      function () {

        loader.classList.add(
          "hide"
        );

      },
      400
    );

  }


  /* =======================================================
     INIT
  ======================================================== */

  function init() {

    initializeShayari();

    loadStories();

    applyConfig();

    setupNavigation();

    setupCategoryButtons();

    setupSearch();

    setupContactForm();

    setupBackTop();

    setupYear();

    renderAll();

    hideLoader();

    console.log(
      "✅ ARS Master Script Loaded"
    );

  }


  /* =======================================================
     DOM READY
  ======================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }


  /* =======================================================
     PUBLIC API
  ======================================================== */

  window.ARS_APP = {

    refresh: renderAll,

    toast: showToast

  };


})(window, document);
