/* =====================================================
   ARS OFFICIAL WEBSITE
   MASTER SCRIPT
===================================================== */

(function () {

  "use strict";


  /* =====================================================
     ARS CONFIG
     IMPORTANT:
     Do NOT declare ARS_CONFIG again in this file if
     config.js already contains it.
  ===================================================== */

  const CONFIG = window.ARS_CONFIG || {
    name: "ARS Official Website",
    founder: "Adarsh Raj",
    emailjs: {
      serviceId: "service_3h6mmz4",
      templateId: "template_2kzi4j8",
      publicKey: "kEJqwQlbZ03jFbMFC"
    }
  };


  /* =====================================================
     DOM READY
  ===================================================== */

  document.addEventListener("DOMContentLoaded", function () {

    initLoader();

    initMobileMenu();

    initBackToTop();

    initSmoothNavigation();

    initSearch();

    initShayariCategories();

    initStoryCategories();

    initContactForm();

    initLikeFavourite();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🌹 ARS OFFICIAL WEBSITE");
    console.log("👤 Founder: Adarsh Raj");
    console.log("📚 Shayari System:",
      window.ARS_SHAYARI_DATA ? "CONNECTED" : "CHECK FILE");
    console.log("📖 Story System:",
      window.ARS_STORY_DATA ? "CONNECTED" : "CHECK FILE");
    console.log("🏆 Certificate System:",
      window.ARS_CERTIFICATE_SYSTEM ? "CONNECTED" : "CHECK FILE");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  });


  /* =====================================================
     LOADER
  ===================================================== */

  function initLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    const hideLoader = function () {

      loader.classList.add("hide");

      setTimeout(function () {

        if (loader.parentNode) {
          loader.style.display = "none";
        }

      }, 500);

    };


    window.addEventListener("load", hideLoader);


    /* Safety fallback.
       External files should never keep the website
       loading forever.
    */

    setTimeout(hideLoader, 3000);

  }


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  function initMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("mainNav");

    if (!menuBtn || !nav) return;


    menuBtn.addEventListener("click", function () {

      nav.classList.toggle("open");

      const opened = nav.classList.contains("open");

      menuBtn.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );

    });


    nav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });

    });

  }


  /* =====================================================
     BACK TO TOP
  ===================================================== */

  function initBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;


    window.addEventListener("scroll", function () {

      if (window.scrollY > 500) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }

    });


    button.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =====================================================
     SMOOTH NAVIGATION
  ===================================================== */

  function initSmoothNavigation() {

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

      link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

  }


  /* =====================================================
     SEARCH
  ===================================================== */

  function initSearch() {

    const input = document.getElementById("globalSearch");
    const button = document.getElementById("searchBtn");
    const results = document.getElementById("searchResults");

    if (!input || !results) return;


    function performSearch() {

      const query = input.value.trim().toLowerCase();

      results.innerHTML = "";


      if (!query) {
        return;
      }


      const items = getAllSearchItems();


      const matches = items.filter(function (item) {

        return [

          item.title,
          item.text,
          item.category,
          item.author,
          item.type

        ].some(function (value) {

          return String(value || "")
            .toLowerCase()
            .includes(query);

        });

      });


      if (!matches.length) {

        results.innerHTML = `
          <div class="empty-state">
            <div>🔎</div>
            <h3>No Result Found</h3>
            <p>Try another keyword.</p>
          </div>
        `;

        return;
      }


      matches.forEach(function (item) {

        results.appendChild(
          createContentCard(item)
        );

      });

    }


    if (button) {
      button.addEventListener("click", performSearch);
    }


    input.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
      }

    });


    input.addEventListener("input", function () {

      if (!input.value.trim()) {
        results.innerHTML = "";
      }

    });

  }


  function getAllSearchItems() {

    const all = [];


    /* Shayari */

    const shayariData =
      window.ARS_SHAYARI_DATA ||
      window.shayariData ||
      window.shayaris ||
      [];


    if (Array.isArray(shayariData)) {

      shayariData.forEach(function (item) {

        all.push(normalizeItem(
          item,
          "Shayari"
        ));

      });

    }


    /* Stories */

    const storyData =
      window.ARS_STORY_DATA ||
      window.storyData ||
      window.stories ||
      [];


    if (Array.isArray(storyData)) {

      storyData.forEach(function (item) {

        all.push(normalizeItem(
          item,
          item.type || "Story"
        ));

      });

    }


    return all;

  }


  function normalizeItem(item, defaultType) {

    return {

      id:
        item.id ||
        item._id ||
        createSafeId(
          item.title ||
          item.text ||
          Math.random()
        ),

      title:
        item.title ||
        item.heading ||
        defaultType,

      text:
        item.text ||
        item.content ||
        item.shayari ||
        item.description ||
        "",

      category:
        item.category ||
        item.type ||
        "General",

      author:
        item.author ||
        "Adarsh Raj",

      type:
        item.type ||
        defaultType

    };

  }


  function createSafeId(value) {

    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 60);

  }


  /* =====================================================
     CONTENT CARD
  ===================================================== */

  function createContentCard(item) {

    const card = document.createElement("article");

    card.className = "content-card";

    const id = item.id;


    card.innerHTML = `

      <div class="content-card-top">

        <span class="content-type">
          ${escapeHTML(item.type)}
        </span>

        <span class="content-category">
          ${escapeHTML(item.category)}
        </span>

      </div>

      <h3>
        ${escapeHTML(item.title)}
      </h3>

      <p class="content-text">
        ${escapeHTML(item.text)}
      </p>

      <div class="content-author">
        ✍️ ${escapeHTML(item.author)}
      </div>

      <div class="content-actions">

        <button
          type="button"
          class="like-btn"
          data-like-id="${escapeHTML(id)}"
        >
          👍 <span class="like-label">Like</span>
          <span class="like-count">
            ${getLikeCount(id)}
          </span>
        </button>

        <button
          type="button"
          class="favorite-btn"
          data-favorite-id="${escapeHTML(id)}"
        >
          ⭐ <span class="favorite-label">
            ${isFavorite(id) ? "Saved" : "Favourite"}
          </span>
        </button>

      </div>

    `;


    return card;

  }


  /* =====================================================
     SHAYARI CATEGORY
  ===================================================== */

  function initShayariCategories() {

    const container =
      document.getElementById("shayariCategories");

    const output =
      document.getElementById("shayariContainer");

    if (!container || !output) return;


    container.addEventListener("click", function (event) {

      const button =
        event.target.closest("button[data-category]");

      if (!button) return;


      container
        .querySelectorAll("button")
        .forEach(function (btn) {
          btn.classList.remove("active");
        });


      button.classList.add("active");


      renderShayari(
        button.dataset.category,
        output
      );

    });


    renderShayari("all", output);

  }


  function renderShayari(category, output) {

    output.innerHTML = "";


    const data =
      window.ARS_SHAYARI_DATA ||
      window.shayariData ||
      window.shayaris ||
      [];


    if (!Array.isArray(data) || !data.length) {

      output.innerHTML = `
        <div class="empty-state">
          <div>🌹</div>
          <h3>Shayari Coming Soon</h3>
          <p>No Shayari available.</p>
        </div>
      `;

      return;
    }


    const filtered = data.filter(function (item) {

      if (category === "all") return true;

      return String(
        item.category ||
        item.type ||
        ""
      ).toLowerCase() === category.toLowerCase();

    });


    if (!filtered.length) {

      output.innerHTML = `
        <div class="empty-state">
          <div>🌹</div>
          <h3>No Shayari Found</h3>
          <p>This category is currently empty.</p>
        </div>
      `;

      return;
    }


    filtered.forEach(function (item) {

      output.appendChild(
        createContentCard(
          normalizeItem(item, "Shayari")
        )
      );

    });

  }


  /* =====================================================
     STORY CATEGORY
  ===================================================== */

  function initStoryCategories() {

    const container =
      document.getElementById("storyCategories");

    const output =
      document.getElementById("storyContainer");

    if (!container || !output) return;


    container.addEventListener("click", function (event) {

      const button =
        event.target.closest("button[data-category]");

      if (!button) return;


      container
        .querySelectorAll("button")
        .forEach(function (btn) {
          btn.classList.remove("active");
        });


      button.classList.add("active");


      renderStories(
        button.dataset.category,
        output
      );

    });


    renderStories("all", output);

  }


  function renderStories(category, output) {

    output.innerHTML = "";


    const data =
      window.ARS_STORY_DATA ||
      window.storyData ||
      window.stories ||
      [];


    if (!Array.isArray(data) || !data.length) {

      output.innerHTML = `
        <div class="empty-state">
          <div>📖</div>
          <h3>Stories Coming Soon</h3>
          <p>No stories available.</p>
        </div>
      `;

      return;
    }


    const filtered = data.filter(function (item) {

      if (category === "all") return true;

      const value = String(
        item.category ||
        item.type ||
        ""
      ).toLowerCase();

      return value === category.toLowerCase();

    });


    if (!filtered.length) {

      output.innerHTML = `
        <div class="empty-state">
          <div>📖</div>
          <h3>No Content Found</h3>
          <p>This category is currently empty.</p>
        </div>
      `;

      return;
    }


    filtered.forEach(function (item) {

      output.appendChild(
        createContentCard(
          normalizeItem(
            item,
            item.type || "Story"
          )
        )
      );

    });

  }


  /* =====================================================
     LIKE / FAVOURITE
  ===================================================== */

  function initLikeFavourite() {

    document.addEventListener("click", function (event) {

      const likeButton =
        event.target.closest("[data-like-id]");

      const favoriteButton =
        event.target.closest("[data-favorite-id]");


      if (likeButton) {

        const id =
          likeButton.dataset.likeId;

        toggleLike(id, likeButton);

      }


      if (favoriteButton) {

        const id =
          favoriteButton.dataset.favoriteId;

        toggleFavorite(
          id,
          favoriteButton
        );

      }

    });

  }


  function getLikeCount(id) {

    const key = "ARS_LIKE_COUNT_" + id;

    return Number(
      localStorage.getItem(key) || 0
    );

  }


  function toggleLike(id, button) {

    const likedKey = "ARS_LIKED_" + id;
    const countKey = "ARS_LIKE_COUNT_" + id;

    const liked =
      localStorage.getItem(likedKey) === "true";


    let count =
      Number(localStorage.getItem(countKey) || 0);


    if (liked) {

      localStorage.setItem(
        likedKey,
        "false"
      );

      count = Math.max(0, count - 1);

    } else {

      localStorage.setItem(
        likedKey,
        "true"
      );

      count++;

    }


    localStorage.setItem(
      countKey,
      String(count)
    );


    updateLikeButton(
      button,
      !liked,
      count
    );

  }


  function updateLikeButton(button, liked, count) {

    if (!button) return;


    const label =
      button.querySelector(".like-label");

    const counter =
      button.querySelector(".like-count");


    if (label) {
      label.textContent =
        liked ? "Unlike" : "Like";
    }


    if (counter) {
      counter.textContent = count;
    }


    button.classList.toggle(
      "active",
      liked
    );

  }


  function isFavorite(id) {

    return localStorage.getItem(
      "ARS_FAV_" + id
    ) === "true";

  }


  function toggleFavorite(id, button) {

    const key = "ARS_FAV_" + id;

    const saved =
      localStorage.getItem(key) === "true";


    localStorage.setItem(
      key,
      saved ? "false" : "true"
    );


    const label =
      button.querySelector(".favorite-label");


    if (label) {

      label.textContent =
        saved ? "Favourite" : "Saved";

    }


    button.classList.toggle(
      "active",
      !saved
    );

  }


  /* =====================================================
     CONTACT — EMAILJS
  ===================================================== */

  function initContactForm() {

    const form =
      document.getElementById("contactForm");

    const status =
      document.getElementById("contactStatus");

    const submit =
      document.getElementById("contactSubmit");


    if (!form) return;


    /* Initialize EmailJS */

    if (
      window.emailjs &&
      CONFIG.emailjs &&
      CONFIG.emailjs.publicKey
    ) {

      try {

        emailjs.init({
          publicKey: CONFIG.emailjs.publicKey
        });

      } catch (error) {

        console.error(
          "EmailJS initialization error:",
          error
        );

      }

    }


    form.addEventListener("submit", async function (event) {

      event.preventDefault();


      if (!window.emailjs) {

        showContactStatus(
          "Email service is not loaded. Please try again.",
          "error"
        );

        return;

      }


      const serviceId =
        CONFIG.emailjs.serviceId;

      const templateId =
        CONFIG.emailjs.templateId;


      if (!serviceId || !templateId) {

        showContactStatus(
          "Contact service is not configured.",
          "error"
        );

        return;

      }


      const name =
        document.getElementById("contactName")?.value.trim();

      const email =
        document.getElementById("contactEmail")?.value.trim();

      const message =
        document.getElementById("contactMessage")?.value.trim();


      if (!name || !email || !message) {

        showContactStatus(
          "Please fill all fields.",
          "error"
        );

        return;

      }


      if (submit) {

        submit.disabled = true;
        submit.textContent = "Sending...";

      }


      try {

        await emailjs.sendForm(
          serviceId,
          templateId,
          form
        );


        showContactStatus(
          "✅ Message sent successfully!",
          "success"
        );


        form.reset();


      } catch (error) {

        console.error(
          "EmailJS send error:",
          error
        );


        showContactStatus(
          "❌ Message could not be sent. Please try again.",
          "error"
        );


      } finally {

        if (submit) {

          submit.disabled = false;
          submit.textContent = "Send Message";

        }

      }

    });

  }


  function showContactStatus(message, type) {

    const status =
      document.getElementById("contactStatus");

    if (!status) return;


    status.textContent = message;

    status.className =
      "contact-status " + type;


    setTimeout(function () {

      status.className = "contact-status";

    }, 6000);

  }


  /* =====================================================
     HTML ESCAPE
  ===================================================== */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =====================================================
     GLOBAL HELPERS
  ===================================================== */

  window.ARSWebsite = {

    search: function (query) {

      const input =
        document.getElementById("globalSearch");

      if (!input) return;

      input.value = query;

      input.dispatchEvent(
        new Event("input")
      );

      const button =
        document.getElementById("searchBtn");

      if (button) button.click();

    },

    top: function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  };


})();
