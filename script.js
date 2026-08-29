/* =========================================================
   ARS OFFICIAL — MAIN APPLICATION
   Version 5.0.0
   ========================================================= */

(function (window, document) {

  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const escapeHTML = (value) => {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  };

  /* ================= LOADER ================= */

  function hideLoader() {

    const loader = $("#pageLoader");

    if (!loader) return;

    loader.classList.add("loaded");

    setTimeout(() => {
      loader.remove();
    }, 500);
  }

  /* ================= TOAST ================= */

  let toastTimer;

  function toast(message, type = "normal") {

    let box = $("#arsToast");

    if (!box) {
      box = document.createElement("div");
      box.id = "arsToast";
      box.className = "toast";
      document.body.appendChild(box);
    }

    clearTimeout(toastTimer);

    box.className = "toast " + type;
    box.textContent = message;

    requestAnimationFrame(() => {
      box.classList.add("show");
    });

    toastTimer = setTimeout(() => {
      box.classList.remove("show");
    }, 2600);
  }

  /* ================= MOBILE MENU ================= */

  function initMenu() {

    const toggle = $("#menuToggle");
    const nav = $("#navLinks");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("open")
      );
    });

    $$("#navLinks a").forEach(link => {

      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });

    });
  }

  /* ================= SHAYARI ================= */

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

      if (empty) {
        empty.classList.remove("hidden");
      }

      return;
    }

    if (empty) {
      empty.classList.add("hidden");
    }

    grid.innerHTML = list.map((item, index) => {

      const id = escapeHTML(item.id || `shayari-${index}`);
      const text = escapeHTML(item.text || item.content || "");
      const category = escapeHTML(item.category || "general");
      const author = escapeHTML(item.author || "Adarsh Raj");

      const liked =
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.hasLiked === "function" &&
        window.ARS_STORAGE.hasLiked(item.id);

      const favorite =
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.isFavorite === "function" &&
        window.ARS_STORAGE.isFavorite(item.id);

      return `
        <article class="content-card shayari-card">

          <div class="card-top">
            <span class="tag">${category}</span>
            <span class="card-number">#${index + 1}</span>
          </div>

          <div class="shayari-text">
            ${text.replace(/\n/g, "<br>")}
          </div>

          <div class="card-author">
            — ${author}
          </div>

          <div class="card-actions">

            <button
              type="button"
              class="action-btn ${liked ? "active" : ""}"
              data-like="${id}"
            >
              ${liked ? "💔 Unlike" : "❤️ Like"}
            </button>

            <button
              type="button"
              class="action-btn ${favorite ? "active" : ""}"
              data-fav="${id}"
            >
              ${favorite ? "★ Saved" : "☆ Save"}
            </button>

          </div>

        </article>
      `;

    }).join("");
  }

  /* ================= STORIES ================= */

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

      if (empty) {
        empty.classList.remove("hidden");
      }

      return;
    }

    if (empty) {
      empty.classList.add("hidden");
    }

    grid.innerHTML = list.map((item, index) => {

      const id = escapeHTML(item.id || `story-${index}`);
      const title = escapeHTML(item.title || "Untitled");
      const content = escapeHTML(item.content || "");
      const category = escapeHTML(item.category || "general");
      const type = escapeHTML(item.type || "story");
      const author = escapeHTML(item.author || "Adarsh Raj");

      const liked =
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.hasLiked === "function" &&
        window.ARS_STORAGE.hasLiked(item.id);

      const favorite =
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.isFavorite === "function" &&
        window.ARS_STORAGE.isFavorite(item.id);

      return `
        <article class="content-card story-card">

          <div class="card-top">
            <span class="tag">${category}</span>
            <span class="type-tag">${type}</span>
          </div>

          <h3>${title}</h3>

          <div class="story-text">
            ${content.replace(/\n/g, "<br>")}
          </div>

          <div class="card-author">
            — ${author}
          </div>

          <div class="card-actions">

            <button
              type="button"
              class="action-btn ${liked ? "active" : ""}"
              data-like="${id}"
            >
              ${liked ? "💔 Unlike" : "❤️ Like"}
            </button>

            <button
              type="button"
              class="action-btn ${favorite ? "active" : ""}"
              data-fav="${id}"
            >
              ${favorite ? "★ Saved" : "☆ Save"}
            </button>

          </div>

        </article>
      `;

    }).join("");
  }

  /* ================= SEARCH / FILTER ================= */

  function filterContent() {

    const searchInput = $("#siteSearch");
    const categorySelect = $("#categoryFilter");

    const query =
      (searchInput?.value || "")
        .trim()
        .toLowerCase();

    const category =
      categorySelect?.value || "all";

    const shayari = getShayari().filter(item => {

      const itemCategory =
        String(item.category || "general").toLowerCase();

      const searchable = [
        item.text,
        item.content,
        item.author,
        item.category
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const categoryMatch =
        category === "all" ||
        itemCategory === category;

      const searchMatch =
        !query ||
        searchable.includes(query);

      return categoryMatch && searchMatch;
    });

    const stories = getStories().filter(item => {

      const itemCategory =
        String(item.category || "general").toLowerCase();

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
        itemCategory === category;

      const searchMatch =
        !query ||
        searchable.includes(query);

      return categoryMatch && searchMatch;
    });

    renderShayari(shayari);
    renderStories(stories);
  }

  /* ================= LIKE / FAVORITE ================= */

  function handleLike(id) {

    if (
      !window.ARS_STORAGE ||
      typeof window.ARS_STORAGE.toggleLike !== "function"
    ) {
      toast("Like system is unavailable.", "error");
      return;
    }

    const liked =
      window.ARS_STORAGE.toggleLike(id);

    filterContent();

    toast(
      liked
        ? "❤️ Added Like"
        : "💔 Like removed"
    );
  }

  function handleFavorite(id) {

    if (
      !window.ARS_STORAGE ||
      typeof window.ARS_STORAGE.toggleFavorite !== "function"
    ) {
      toast("Favorite system is unavailable.", "error");
      return;
    }

    const saved =
      window.ARS_STORAGE.toggleFavorite(id);

    filterContent();

    toast(
      saved
        ? "⭐ Saved to Favorites"
        : "☆ Removed from Favorites"
    );
  }

  /* ================= CONTACT ================= */

  async function sendContactForm(form) {

    const status = $("#contactStatus");
    const button = $("#contactSubmit");

    const formData =
      new FormData(form);

    const data =
      Object.fromEntries(formData.entries());

    const name =
      String(data.name || "").trim();

    const email =
      String(data.email || "").trim();

    const subject =
      String(data.subject || "").trim();

    const message =
      String(data.message || "").trim();

    if (!name || !email || !message) {

      if (status) {
        status.textContent =
          "Please fill all required fields.";
        status.className =
          "form-status error";
      }

      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }

    /*
      Always save locally first.
      This prevents losing the visitor's message
      even if EmailJS temporarily fails.
    */

    try {

      if (
        window.ARS_STORAGE &&
        typeof window.ARS_STORAGE.saveMessage === "function"
      ) {

        window.ARS_STORAGE.saveMessage({
          name,
          email,
          subject,
          message
        });

      }

    } catch (error) {
      console.error("Local message save error:", error);
    }

    try {

      if (
        !window.emailjs ||
        !window.ARS_CONFIG ||
        !window.ARS_CONFIG.EMAILJS
      ) {
        throw new Error("EmailJS configuration unavailable.");
      }

      const cfg =
        window.ARS_CONFIG.EMAILJS;

      if (
        !cfg.SERVICE_ID ||
        !cfg.TEMPLATE_ID ||
        !cfg.PUBLIC_KEY
      ) {
        throw new Error("EmailJS configuration incomplete.");
      }

      await emailjs.send(
        cfg.SERVICE_ID,
        cfg.TEMPLATE_ID,
        {
          name,
          from_name: name,
          email,
          reply_to: email,
          subject,
          message,
          website: window.location.origin
        }
      );

      if (status) {
        status.textContent =
          "Message sent successfully. Thank you!";
        status.className =
          "form-status success";
      }

      toast("📩 Message sent successfully", "success");

      form.reset();

    } catch (error) {

      console.error("EmailJS Error:", error);

      /*
        Since message was saved locally,
        tell the visitor clearly instead of pretending
        email delivery succeeded.
      */

      if (status) {
        status.textContent =
          "Your message was saved, but email delivery needs a configuration check.";
        status.className =
          "form-status warning";
      }

      toast(
        "Message saved. Email delivery needs checking.",
        "warning"
      );

    } finally {

      if (button) {
        button.disabled = false;
        button.textContent = "📩 Send Message";
      }

    }
  }

  /* ================= SMOOTH NAVIGATION ================= */

  function initSmoothNavigation() {

    $$('a[href^="#"]').forEach(link => {

      link.addEventListener("click", function (event) {

        const id =
          this.getAttribute("href");

        if (!id || id === "#") return;

        const target = $(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(
          null,
          "",
          id
        );

      });

    });
  }

  /* ================= BACK TO TOP ================= */

  function initBackTop() {

    const button = $("#backTop");

    if (!button) return;

    window.addEventListener(
      "scroll",
      () => {

        button.classList.toggle(
          "visible",
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

  /* ================= GLOBAL CLICK HANDLER ================= */

  document.addEventListener("click", event => {

    const likeButton =
      event.target.closest("[data-like]");

    const favoriteButton =
      event.target.closest("[data-fav]");

    if (likeButton) {

      handleLike(
        likeButton.dataset.like
      );

      return;
    }

    if (favoriteButton) {

      handleFavorite(
        favoriteButton.dataset.fav
      );

    }

  });

  /* ================= INIT ================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      try {

        renderShayari();
        renderStories();

        const search =
          $("#siteSearch");

        const category =
          $("#categoryFilter");

        search?.addEventListener(
          "input",
          filterContent
        );

        category?.addEventListener(
          "change",
          filterContent
        );

        $("#contactForm")?.addEventListener(
          "submit",
          event => {

            event.preventDefault();

            sendContactForm(
              event.currentTarget
            );

          }
        );

        $("#footerYear").textContent =
          new Date().getFullYear();

        initMenu();
        initSmoothNavigation();
        initBackTop();

      } catch (error) {

        console.error(
          "ARS initialization error:",
          error
        );

        toast(
          "Some website content could not be loaded.",
          "error"
        );

      } finally {

        setTimeout(
          hideLoader,
          350
        );

      }

    }
  );

  /* ================= PUBLIC API ================= */

  window.ARS_APP = Object.freeze({

    renderShayari,
    renderStories,
    filterContent,
    toast,
    hideLoader

  });

})(window, document);
