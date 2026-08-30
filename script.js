/* =========================================================
   ARS OFFICIAL — MAIN SCRIPT
   Adarsh Raj Shayar
   ========================================================= */

(function (window, document) {

  "use strict";


  /* =======================================================
     SHORTCUTS
  ======================================================= */

  const $ = function (selector, parent) {

    return (parent || document)
      .querySelector(selector);

  };


  const $$ = function (selector, parent) {

    return Array.from(
      (parent || document)
        .querySelectorAll(selector)
    );

  };


  /* =======================================================
     TOAST
  ======================================================= */

  function showToast(message) {

    const toast =
      document.getElementById("arsToast");

    if (!toast) return;

    toast.textContent =
      String(message || "");

    toast.classList.add("show");

    clearTimeout(
      showToast.timer
    );

    showToast.timer =
      setTimeout(function () {

        toast.classList.remove("show");

      }, 2600);

  }


  /* =======================================================
     SAFE HTML
  ======================================================= */

  function escapeHTML(value) {

    const div =
      document.createElement("div");

    div.textContent =
      value ?? "";

    return div.innerHTML;

  }


  /* =======================================================
     FORMAT DATE
  ======================================================= */

  function formatDate(value) {

    if (!value) return "";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function initMenu() {

    const toggle =
      document.getElementById(
        "menuToggle"
      );

    const links =
      document.getElementById(
        "navLinks"
      );

    if (!toggle || !links) {
      return;
    }


    toggle.addEventListener(
      "click",
      function () {

        const opened =
          links.classList.toggle(
            "open"
          );

        toggle.setAttribute(
          "aria-expanded",
          String(opened)
        );

      }
    );


    $$("#navLinks a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            links.classList.remove(
              "open"
            );

            toggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  function initNavigation() {

    const links =
      $$(".nav-links a");

    if (!links.length) return;


    function updateActive() {

      const current =
        window.location.pathname
          .split("/")
          .pop()
          .toLowerCase();


      links.forEach(function (link) {

        const href =
          link.getAttribute("href") || "";

        link.classList.remove(
          "active"
        );


        if (
          href === current ||
          (
            current === "" &&
            href === "index.html"
          )
        ) {

          link.classList.add(
            "active"
          );

        }

      });

    }


    updateActive();

  }


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  function initLoader() {

    const loader =
      document.getElementById(
        "pageLoader"
      );

    if (!loader) return;


    window.addEventListener(
      "load",
      function () {

        setTimeout(
          function () {

            loader.classList.add(
              "hide"
            );

          },
          250
        );

      }
    );

  }


  /* =======================================================
     SHAYARI CARD
  ======================================================= */

  function createShayariCard(item) {

    const liked =
      window.ARS_STORAGE &&
      window.ARS_STORAGE.hasLiked
        ? window.ARS_STORAGE.hasLiked(
            item.id
          )
        : false;


    const favorite =
      window.ARS_STORAGE &&
      window.ARS_STORAGE.isFavorite
        ? window.ARS_STORAGE.isFavorite(
            item.id
          )
        : false;


    const text =
      escapeHTML(item.text)
        .replace(/\n/g, "<br>");


    return `

      <article
        class="content-card shayari-card"
        data-id="${escapeHTML(item.id)}"
      >

        <span class="tag">
          ${escapeHTML(item.category)}
        </span>


        <h3>
          🌹 Shayari
        </h3>


        <p class="content-text">
          ${text}
        </p>


        <div class="author">
          — ${escapeHTML(item.author)}
        </div>


        <div class="card-actions">

          <button
            type="button"
            class="card-action like-action"
            data-action="like"
            data-id="${escapeHTML(item.id)}"
          >
            ${liked ? "❤️ Liked" : "♡ Like"}
          </button>


          <button
            type="button"
            class="card-action ${
              favorite
                ? "favorite-active"
                : ""
            }"
            data-action="favorite"
            data-id="${escapeHTML(item.id)}"
          >
            ${favorite ? "⭐ Saved" : "☆ Favorite"}
          </button>

        </div>

      </article>

    `;

  }


  /* =======================================================
     STORY CARD
  ======================================================= */

  function createStoryCard(item) {

    const favorite =
      window.ARS_STORAGE &&
      window.ARS_STORAGE.isFavorite
        ? window.ARS_STORAGE.isFavorite(
            item.id
          )
        : false;


    const type =
      String(
        item.type || "story"
      ).toLowerCase();


    const icon =
      type === "poem"
        ? "📝"
        : type === "biography"
          ? "👤"
          : "📖";


    const content =
      escapeHTML(item.content)
        .replace(/\n/g, "<br>");


    return `

      <article
        class="content-card story-card"
        data-id="${escapeHTML(item.id)}"
      >

        <span class="tag">
          ${escapeHTML(item.category)}
        </span>


        <h3>
          ${icon}
          ${escapeHTML(item.title)}
        </h3>


        <p class="content-text">
          ${content}
        </p>


        <div class="author">
          — ${escapeHTML(item.author)}
        </div>


        <div class="card-actions">

          <button
            type="button"
            class="card-action ${
              favorite
                ? "favorite-active"
                : ""
            }"
            data-action="favorite"
            data-id="${escapeHTML(item.id)}"
          >
            ${favorite ? "⭐ Saved" : "☆ Favorite"}
          </button>

        </div>

      </article>

    `;

  }


  /* =======================================================
     EMPTY STATE
  ======================================================= */

  function toggleEmpty(
    element,
    show
  ) {

    if (!element) return;

    element.classList.toggle(
      "hidden",
      !show
    );

  }


  /* =======================================================
     RENDER SHAYARI
  ======================================================= */

  function renderShayari(
    list
  ) {

    const grid =
      document.getElementById(
        "shayariGrid"
      );

    const empty =
      document.getElementById(
        "shayariEmpty"
      );


    if (!grid) return;


    const data =
      Array.isArray(list)
        ? list
        : [];


    grid.innerHTML =
      data.map(
        createShayariCard
      ).join("");


    toggleEmpty(
      empty,
      data.length === 0
    );

  }


  /* =======================================================
     SHAYARI FILTER
  ======================================================= */

  let currentShayariCategory =
    "all";

  let currentShayariSearch =
    "";


  function applyShayariFilter() {

    if (
      !window.ARS_SHAYARI
    ) {
      return;
    }


    let data =
      window.ARS_SHAYARI.all();


    if (
      currentShayariCategory !==
      "all"
    ) {

      data =
        data.filter(
          function (item) {

            return String(
              item.category || ""
            ).toLowerCase() ===
              currentShayariCategory
                .toLowerCase();

          }
        );

    }


    const query =
      currentShayariSearch
        .trim()
        .toLowerCase();


    if (query) {

      data =
        data.filter(
          function (item) {

            return (

              String(
                item.text || ""
              )
              .toLowerCase()
              .includes(query)

              ||

              String(
                item.author || ""
              )
              .toLowerCase()
              .includes(query)

              ||

              String(
                item.category || ""
              )
              .toLowerCase()
              .includes(query)

            );

          }
        );

    }


    renderShayari(data);

  }


  /* =======================================================
     SHAYARI CONTROLS
  ======================================================= */

  function initShayari() {

    if (
      !window.ARS_SHAYARI
    ) {
      return;
    }


    window.ARS_SHAYARI.initialize();


    const searchInput =
      document.getElementById(
        "shayariSearch"
      );


    if (searchInput) {

      searchInput.addEventListener(
        "input",
        function () {

          currentShayariSearch =
            this.value;

          applyShayariFilter();

        }
      );

    }


    $$("#shayariCategories .category-btn")
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            $$("#shayariCategories .category-btn")
              .forEach(
                function (item) {

                  item.classList.remove(
                    "active"
                  );

                }
              );


            this.classList.add(
              "active"
            );


            currentShayariCategory =
              this.dataset
                .shayariCategory ||
              "all";


            applyShayariFilter();

          }
        );

      });


    applyShayariFilter();

  }


  /* =======================================================
     RENDER STORIES
  ======================================================= */

  let currentStoryCategory =
    "all";


  function renderStories(
    list
  ) {

    const grid =
      document.getElementById(
        "storyGrid"
      );

    const empty =
      document.getElementById(
        "storyEmpty"
      );


    if (!grid) return;


    const data =
      Array.isArray(list)
        ? list
        : [];


    grid.innerHTML =
      data.map(
        createStoryCard
      ).join("");


    toggleEmpty(
      empty,
      data.length === 0
    );

  }


  function applyStoryFilter() {

    if (!window.ARS_STORY) {
      return;
    }


    let data =
      window.ARS_STORY.all();


    if (
      currentStoryCategory !==
      "all"
    ) {

      data =
        data.filter(
          function (item) {

            const category =
              String(
                item.category || ""
              ).toLowerCase();


            const type =
              String(
                item.type || ""
              ).toLowerCase();


            const selected =
              currentStoryCategory
                .toLowerCase();


            return (
              category === selected ||
              type === selected
            );

          }
        );

    }


    renderStories(data);

  }


  /* =======================================================
     STORY CONTROLS
  ======================================================= */

  function initStories() {

    if (!window.ARS_STORY) {
      return;
    }


    const categories =
      $$("#storyCategories .category-btn");


    categories.forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            categories.forEach(
              function (item) {

                item.classList.remove(
                  "active"
                );

              }
            );


            this.classList.add(
              "active"
            );


            currentStoryCategory =
              this.dataset
                .storyCategory ||
              "all";


            applyStoryFilter();

          }
        );

      }
    );


    applyStoryFilter();

  }


  /* =======================================================
     FAVORITES
  ======================================================= */

  function getFavoriteItems() {

    if (
      !window.ARS_STORAGE
    ) {
      return [];
    }


    const ids =
      window.ARS_STORAGE.favorites
        ? window.ARS_STORAGE.favorites()
        : [];


    if (!Array.isArray(ids)) {
      return [];
    }


    const shayari =
      window.ARS_SHAYARI
        ? window.ARS_SHAYARI.all()
        : [];


    const stories =
      window.ARS_STORY
        ? window.ARS_STORY.all()
        : [];


    const all =
      shayari.concat(
        stories
      );


    return all.filter(
      function (item) {

        return ids.includes(
          String(item.id)
        );

      }
    );

  }


  function renderFavorites() {

    const grid =
      document.getElementById(
        "favoritesGrid"
      );

    const empty =
      document.getElementById(
        "favoritesEmpty"
      );


    if (!grid) return;


    const data =
      getFavoriteItems();


    grid.innerHTML =
      data.map(
        function (item) {

          return item.text
            ? createShayariCard(item)
            : createStoryCard(item);

        }
      ).join("");


    toggleEmpty(
      empty,
      data.length === 0
    );

  }


  /* =======================================================
     CARD ACTIONS
  ======================================================= */

  function handleCardAction(
    button
  ) {

    if (
      !window.ARS_STORAGE
    ) {
      return;
    }


    const id =
      button.dataset.id;


    const action =
      button.dataset.action;


    if (!id || !action) {
      return;
    }


    if (
      action === "like" &&
      typeof window.ARS_STORAGE
        .toggleLike === "function"
    ) {

      const active =
        window.ARS_STORAGE
          .toggleLike(id);


      button.textContent =
        active
          ? "❤️ Liked"
          : "♡ Like";


      showToast(
        active
          ? "❤️ Shayari liked"
          : "Like removed"
      );


      return;

    }


    if (
      action === "favorite" &&
      typeof window.ARS_STORAGE
        .toggleFavorite === "function"
    ) {

      const active =
        window.ARS_STORAGE
          .toggleFavorite(id);


      button.classList.toggle(
        "favorite-active",
        active
      );


      button.textContent =
        active
          ? "⭐ Saved"
          : "☆ Favorite";


      renderFavorites();


      showToast(
        active
          ? "⭐ Favorite में save किया गया"
          : "Favorite से हटाया गया"
      );

    }

  }


  function initCardActions() {

    document.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            "[data-action]"
          );


        if (!button) {
          return;
        }


        handleCardAction(
          button
        );

      }
    );

  }


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  function initContactForm() {

    const form =
      document.getElementById(
        "contactForm"
      );


    if (!form) return;


    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const formData =
          new FormData(form);


        const name =
          String(
            formData.get("name") || ""
          ).trim();


        const email =
          String(
            formData.get("email") || ""
          ).trim();


        const subject =
          String(
            formData.get("subject") || ""
          ).trim();


        const message =
          String(
            formData.get("message") || ""
          ).trim();


        if (
          !name ||
          !email ||
          !message
        ) {

          showToast(
            "कृपया आवश्यक जानकारी भरें।"
          );

          return;

        }


        if (
          !window.ARS_STORAGE ||
          typeof window.ARS_STORAGE
            .saveMessage !== "function"
        ) {

          showToast(
            "Contact system उपलब्ध नहीं है।"
          );

          return;

        }


        window.ARS_STORAGE
          .saveMessage({

            name,
            email,
            subject,
            message

          });


        form.reset();


        showToast(
          "✅ आपका संदेश ARS को भेज दिया गया।"
        );

      }
    );

  }


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  function initBackTop() {

    const button =
      document.getElementById(
        "backTop"
      );


    if (!button) return;


    function update() {

      button.classList.toggle(
        "show",
        window.scrollY > 500
      );

    }


    window.addEventListener(
      "scroll",
      update,
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


    update();

  }


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  function initYear() {

    const element =
      document.getElementById(
        "currentYear"
      );


    if (element) {

      element.textContent =
        new Date()
          .getFullYear();

    }

  }


  /* =======================================================
     HASH SCROLL
  ======================================================= */

  function initHashNavigation() {

    $$(`
      a[href^="#"]
    `).forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            const href =
              this.getAttribute(
                "href"
              );


            if (
              !href ||
              href === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(
                href
              );


            if (!target) {
              return;
            }


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
     INITIALIZE
  ======================================================= */

  function init() {

    initMenu();

    initNavigation();

    initLoader();

    initShayari();

    initStories();

    initCardActions();

    renderFavorites();

    initContactForm();

    initBackTop();

    initYear();

    initHashNavigation();


    console.log(
      "🚀 ARS Main Script Loaded"
    );

  }


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


})(window, document);
