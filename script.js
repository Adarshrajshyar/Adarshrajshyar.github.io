/* =========================================================
   ADARSH RAJ SHAYAR — MASTER SCRIPT
   Clean single-source script
   Matching index.html + style.css
========================================================= */

"use strict";

const ARS = {
  name: "Adarsh Raj Shayar",
  version: "14.0",
  author: "Adarsh Raj",
  adminPassword: "ARS2026"
};

const STORE = {
  theme: "ars_theme",
  visited: "ars_visited",
  likes: "ars_likes",
  favourites: "ars_favourites",
  shayari: "ars_custom_shayari",
  stories: "ars_stories",
  shayariDraft: "ars_draft_shayari",
  storyDraft: "ars_draft_story",
  visitorSeen: "ars_visitor_seen",
  visitorCount: "ars_visitor_count"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const escapeHTML = (value = "") => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const textHTML = (value = "") => escapeHTML(value).replace(/\r?\n/g, "<br>");

const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
};

let likedShayari = storage.get(STORE.likes, []);
let favouriteShayari = storage.get(STORE.favourites, []);
let customShayari = storage.get(STORE.shayari, []);
let stories = storage.get(STORE.stories, []);

let editingShayariId = null;
let editingStoryId = null;

if (!Array.isArray(likedShayari)) likedShayari = [];
if (!Array.isArray(favouriteShayari)) favouriteShayari = [];
if (!Array.isArray(customShayari)) customShayari = [];
if (!Array.isArray(stories)) stories = [];

function saveAll() {
  storage.set(STORE.likes, likedShayari);
  storage.set(STORE.favourites, favouriteShayari);
  storage.set(STORE.shayari, customShayari);
  storage.set(STORE.stories, stories);
}

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(
    () => toast.classList.remove("show"),
    2400
  );
}

/* =========================================================
   CONFIG — compatible with existing config.js
========================================================= */

function externalConfig() {
  let cfg = {};

  try {
    if (typeof CONFIG !== "undefined" && CONFIG) {
      cfg = CONFIG;
    }
  } catch (_) {}

  return {
    adminPassword:
      cfg.ADMIN_PASSWORD ||
      cfg.adminPassword ||
      ARS.adminPassword,

    emailPublicKey:
      cfg.EMAILJS_PUBLIC_KEY ||
      cfg.emailjsPublicKey ||
      cfg.PUBLIC_KEY ||
      "",

    emailServiceId:
      cfg.EMAILJS_SERVICE_ID ||
      cfg.emailjsServiceId ||
      cfg.SERVICE_ID ||
      "",

    emailTemplateId:
      cfg.EMAILJS_TEMPLATE_ID ||
      cfg.emailjsTemplateId ||
      cfg.TEMPLATE_ID ||
      ""
  };
}

/* =========================================================
   BASIC UI
========================================================= */

function initLoader() {
  const loader = $("#loader");

  if (!loader) return;

  const hide = () =>
    setTimeout(
      () => loader.classList.add("loader-hide"),
      450
    );

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
  }
}

function initYear() {
  const year = $("#currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function initPopup() {
  const popup = $("#welcomePopup");
  const enter = $("#enterBtn");
  const close = $("#closeWelcomeBtn");

  if (!popup) return;

  if (localStorage.getItem(STORE.visited) === "true") {
    popup.hidden = true;
    return;
  }

  const closePopup = () => {
    popup.hidden = true;

    localStorage.setItem(
      STORE.visited,
      "true"
    );

    showToast(
      "🌹 Welcome to Adarsh Raj Shayar"
    );
  };

  enter?.addEventListener(
    "click",
    closePopup
  );

  close?.addEventListener(
    "click",
    closePopup
  );
}

function initTheme() {
  const saved = storage.get(
    STORE.theme,
    "dark"
  );

  if (saved === "light") {
    document.body.classList.add(
      "light-mode"
    );
  }

  updateThemeIcon();

  $("#darkModeBtn")?.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-mode"
      );

      storage.set(
        STORE.theme,
        document.body.classList.contains(
          "light-mode"
        )
          ? "light"
          : "dark"
      );

      updateThemeIcon();

      showToast(
        document.body.classList.contains(
          "light-mode"
        )
          ? "☀️ Light Mode Enabled"
          : "🌙 Dark Mode Enabled"
      );

    }
  );
}

function updateThemeIcon() {
  const btn = $("#darkModeBtn");

  if (btn) {
    btn.textContent =
      document.body.classList.contains(
        "light-mode"
      )
        ? "🌙"
        : "☀️";
  }
}

function initMenu() {
  const menu = $("#menuBtn");
  const nav = $("#mainNav");
  const overlay = $("#overlay");

  if (!menu || !nav || !overlay) return;

  const open = () => {

    nav.classList.add("active");

    overlay.classList.add("active");

    document.body.classList.add(
      "menu-open"
    );

  };

  const close = () => {

    nav.classList.remove("active");

    overlay.classList.remove("active");

    document.body.classList.remove(
      "menu-open"
    );

  };

  menu.addEventListener(
    "click",
    () =>
      nav.classList.contains("active")
        ? close()
        : open()
  );

  overlay.addEventListener(
    "click",
    close
  );

  $$("#mainNav a").forEach(
    a =>
      a.addEventListener(
        "click",
        close
      )
  );
}

function initSmoothScroll() {
  $$("a[href^='#']").forEach(
    link => {

      link.addEventListener(
        "click",
        e => {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") return;

          const target = $(id);

          if (!target) return;

          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );
}

function initActiveNav() {
  const sections =
    $$("main section[id]");

  const links =
    $$("#mainNav a");

  if (!sections.length) return;

  const update = () => {

    let current = "home";

    sections.forEach(
      section => {

        if (
          window.scrollY >=
          section.offsetTop - 180
        ) {
          current = section.id;
        }

      }
    );

    links.forEach(
      link =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") ===
          `#${current}`
        )
    );

  };

  window.addEventListener(
    "scroll",
    update,
    { passive: true }
  );

  update();
}

function initBackToTop() {
  const btn = $("#topBtn");

  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {

      btn.style.display =
        window.scrollY > 450
          ? "block"
          : "none";

    },
    { passive: true }
  );

  btn.addEventListener(
    "click",
    () =>
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
  );
}

function initProgress() {
  const bar = $("#progressBar");

  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {

      const doc =
        document.documentElement;

      const max =
        doc.scrollHeight -
        doc.clientHeight;

      bar.style.width =
        max > 0
          ? `${(doc.scrollTop / max) * 100}%`
          : "0%";

    },
    { passive: true }
  );
}
/* =========================================================
   PART 2 — SHAYARI ENGINE
========================================================= */

/* =========================================================
   GET ALL SHAYARI
========================================================= */

function getBuiltInShayari() {

  try {

    return typeof shayariData !== "undefined" &&
           Array.isArray(shayariData)
      ? shayariData
      : [];

  } catch (_) {

    return [];

  }

}

function getAllShayari() {

  return [
    ...getBuiltInShayari(),
    ...customShayari
  ];

}

/* =========================================================
   SHAYARI CARD
========================================================= */

function createShayariCard(item, options = {}) {

  const title =
    escapeHTML(item.title || "Untitled Shayari");

  const text =
    textHTML(item.text || "");

  const author =
    escapeHTML(item.author || "Adarsh Raj");

  const date =
    escapeHTML(item.date || "");

  const id =
    escapeHTML(
      String(
        item.id ??
        `${item.title || ""}-${item.text || ""}`
      )
    );

  const liked =
    likedShayari.includes(
      item.text
    );

  const favourite =
    favouriteShayari.includes(
      item.text
    );

  const adminButtons =
    options.admin
      ? `
        <button
          type="button"
          class="editShayariBtn"
          data-id="${id}"
        >
          ✏️ Edit
        </button>

        <button
          type="button"
          class="deleteShayariBtn"
          data-id="${id}"
        >
          🗑️ Delete
        </button>
      `
      : "";

  return `
    <article
      class="card shayari-card"
      data-shayari-id="${id}"
    >

      <h3>${title}</h3>

      <p class="shayariText">
        ${text}
      </p>

      <div class="meta">

        <span>
          ✍️ ${author}
        </span>

        ${
          date
            ? `<span>📅 ${date}</span>`
            : ""
        }

      </div>

      <div class="actionButtons">

        <button
          type="button"
          class="copyBtn"
        >
          📋 Copy
        </button>

        <button
          type="button"
          class="shareBtn"
        >
          📤 Share
        </button>

        <button
          type="button"
          class="likeBtn ${liked ? "active" : ""}"
        >
          ${liked ? "💖 Liked" : "❤️ Like"}
        </button>

        <button
          type="button"
          class="favBtn ${favourite ? "active" : ""}"
        >
          ${favourite ? "🌟 Saved" : "⭐ Favourite"}
        </button>

        ${adminButtons}

      </div>

    </article>
  `;

}

/* =========================================================
   RENDER CATEGORY
========================================================= */

function renderCategory(
  category,
  containerId
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  const builtIn =
    getBuiltInShayari()
      .filter(
        item =>
          String(item.category)
            .toLowerCase() ===
          String(category)
            .toLowerCase()
      );

  const custom =
    customShayari
      .filter(
        item =>
          String(item.category)
            .toLowerCase() ===
          String(category)
            .toLowerCase()
      );

  const list = [
    ...builtIn,
    ...custom
  ];

  if (!list.length) {

    container.innerHTML = `
      <div class="card empty-card">
        <h3>📖 No Shayari Available</h3>
        <p>
          इस category में अभी कोई Shayari प्रकाशित नहीं हुई है।
        </p>
      </div>
    `;

    return;

  }

  container.innerHTML =
    list
      .map(item =>
        createShayariCard(item)
      )
      .join("");

}

/* =========================================================
   LOAD ALL CATEGORIES
========================================================= */

function loadAllShayari() {

  renderCategory(
    "Love",
    "loveContainer"
  );

  renderCategory(
    "Sad",
    "sadContainer"
  );

  renderCategory(
    "Attitude",
    "attitudeContainer"
  );

  renderCategory(
    "Friendship",
    "friendshipContainer"
  );

  renderCategory(
    "Motivation",
    "motivationContainer"
  );

}

/* =========================================================
   COPY TEXT
========================================================= */

async function copyText(text) {

  if (!text) return;

  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        text
      );

    } else {

      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position =
        "fixed";

      textarea.style.opacity = "0";

      document.body.appendChild(
        textarea
      );

      textarea.select();

      document.execCommand("copy");

      textarea.remove();

    }

    showToast(
      "📋 Copied Successfully"
    );

  } catch (error) {

    console.error(
      "Copy Error:",
      error
    );

    showToast(
      "❌ Copy Failed"
    );

  }

}

/* =========================================================
   SHARE TEXT
========================================================= */

async function shareText(
  text,
  title = ARS.name
) {

  if (!text) return;

  const shareData = {

    title,

    text,

    url:
      window.location.href

  };

  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        shareData
      );

    } catch (error) {

      /*
       User cancelled share.
       No error message needed.
      */

      if (
        error &&
        error.name !==
        "AbortError"
      ) {

        console.error(
          "Share Error:",
          error
        );

      }

    }

    return;

  }

  await copyText(text);

  showToast(
    "📋 Share unavailable — Text copied"
  );

}

/* =========================================================
   LIKE
========================================================= */

function toggleLike(text) {

  if (!text) return;

  const index =
    likedShayari.indexOf(text);

  if (index === -1) {

    likedShayari.push(text);

    showToast(
      "❤️ Liked"
    );

  } else {

    likedShayari.splice(
      index,
      1
    );

    showToast(
      "💔 Like Removed"
    );

  }

  saveAll();

}

/* =========================================================
   FAVOURITE
========================================================= */

function toggleFavourite(text) {

  if (!text) return;

  const index =
    favouriteShayari.indexOf(text);

  if (index === -1) {

    favouriteShayari.push(text);

    showToast(
      "⭐ Added to Favourite"
    );

  } else {

    favouriteShayari.splice(
      index,
      1
    );

    showToast(
      "❌ Favourite Removed"
    );

  }

  saveAll();

  loadFavourite();

}

/* =========================================================
   RESTORE LIKE / FAVOURITE BUTTONS
========================================================= */

function restoreButtons() {

  $$(".shayari-card").forEach(
    card => {

      const text =
        $(".shayariText", card)
          ?.innerText
          ?.trim();

      if (!text) return;

      const likeBtn =
        $(".likeBtn", card);

      const favBtn =
        $(".favBtn", card);

      if (likeBtn) {

        const liked =
          likedShayari.includes(text);

        likeBtn.classList.toggle(
          "active",
          liked
        );

        likeBtn.textContent =
          liked
            ? "💖 Liked"
            : "❤️ Like";

      }

      if (favBtn) {

        const favourite =
          favouriteShayari.includes(text);

        favBtn.classList.toggle(
          "active",
          favourite
        );

        favBtn.textContent =
          favourite
            ? "🌟 Saved"
            : "⭐ Favourite";

      }

    }
  );

}

/* =========================================================
   FAVOURITE SECTION
========================================================= */

function loadFavourite() {

  const container =
    document.getElementById(
      "favoriteList"
    );

  if (!container) return;

  if (!favouriteShayari.length) {

    container.innerHTML = `
      <div class="card empty-card">
        <h3>⭐ No Favourite Shayari</h3>
        <p>
          किसी Shayari को Favourite करने पर
          वह यहाँ दिखाई देगी।
        </p>
      </div>
    `;

    return;

  }

  container.innerHTML =
    favouriteShayari
      .map(
        text => `
          <article class="card shayari-card">

            <p class="shayariText">
              ${textHTML(text)}
            </p>

            <div class="actionButtons">

              <button
                type="button"
                class="copyBtn"
              >
                📋 Copy
              </button>

              <button
                type="button"
                class="shareBtn"
              >
                📤 Share
              </button>

              <button
                type="button"
                class="favBtn active"
              >
                🌟 Saved
              </button>

            </div>

          </article>
        `
      )
      .join("");

}

/* =========================================================
   SHAYARI CARD EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const card =
      event.target.closest(
        ".shayari-card"
      );

    if (!card) return;

    const text =
      $(".shayariText", card)
        ?.innerText
        ?.trim();

    if (!text) return;

    if (
      event.target.closest(
        ".copyBtn"
      )
    ) {

      copyText(text);

      return;

    }

    if (
      event.target.closest(
        ".shareBtn"
      )
    ) {

      shareText(text);

      return;

    }

    if (
      event.target.closest(
        ".likeBtn"
      )
    ) {

      toggleLike(text);

      const button =
        event.target.closest(
          ".likeBtn"
        );

      const liked =
        likedShayari.includes(text);

      button.classList.toggle(
        "active",
        liked
      );

      button.textContent =
        liked
          ? "💖 Liked"
          : "❤️ Like";

      return;

    }

    if (
      event.target.closest(
        ".favBtn"
      )
    ) {

      toggleFavourite(text);

      const button =
        event.target.closest(
          ".favBtn"
        );

      const favourite =
        favouriteShayari.includes(
          text
        );

      button.classList.toggle(
        "active",
        favourite
      );

      button.textContent =
        favourite
          ? "🌟 Saved"
          : "⭐ Favourite";

    }

  }
);

/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

  const input =
    $("#search");

  if (!input) return;

  const keyword =
    input.value
      .toLowerCase()
      .trim();

  $$(".card").forEach(
    card => {

      const content =
        card.innerText
          .toLowerCase();

      card.style.display =
        content.includes(keyword)
          ? ""
          : "none";

    }
  );

}

function initSearch() {

  const input =
    $("#search");

  if (!input) return;

  input.addEventListener(
    "input",
    performSearch
  );

}

/* =========================================================
   RANDOM SHAYARI
========================================================= */

function getRandomShayari() {

  const all =
    getAllShayari();

  if (!all.length) return null;

  return all[
    Math.floor(
      Math.random() *
      all.length
    )
  ];

}

/* =========================================================
   TODAY SHAYARI
========================================================= */

function getTodayShayari() {

  const all =
    getAllShayari();

  if (!all.length) return null;

  const day =
    new Date().getDate();

  return all[
    day % all.length
  ];

}

/* =========================================================
   PRELOAD IMAGES
========================================================= */

function preloadImages() {

  [
    "logo.png",
    "banner.png"
  ].forEach(
    src => {

      const image =
        new Image();

      image.src = src;

    }
  );

}

/* =========================================================
   SHAYARI ENGINE READY
========================================================= */

console.log(
  "✅ Part 2 — Shayari Engine Loaded"
);
/* =========================================================
   PART 3 — ADMIN LOGIN & SHAYARI PUBLISHER
========================================================= */

const ADMIN_SESSION_KEY = "ARS_ADMIN_SESSION";

/* =========================================================
   ADMIN SESSION
========================================================= */

function isAdminLoggedIn() {

  return sessionStorage.getItem(
    ADMIN_SESSION_KEY
  ) === "true";

}

function setAdminSession(status) {

  sessionStorage.setItem(
    ADMIN_SESSION_KEY,
    status ? "true" : "false"
  );

}

function checkAdmin() {

  if (!isAdminLoggedIn()) {

    showToast(
      "🔒 Admin Login Required"
    );

    return false;

  }

  return true;

}

/* =========================================================
   ADMIN LOGIN UI
========================================================= */

function updateAdminUI() {

  const loginBox =
    $("#adminLogin");

  const publisherPanel =
    $("#publisherPanel");

  const adminPanel =
    $("#adminPanel");

  const loggedIn =
    isAdminLoggedIn();

  if (loginBox) {

    loginBox.style.display =
      loggedIn
        ? "none"
        : "block";

  }

  if (publisherPanel) {

    publisherPanel.style.display =
      loggedIn
        ? "block"
        : "none";

  }

  /*
     Admin Panel is kept hidden from normal visitors.
     It becomes visible only after successful login.
  */

  if (adminPanel) {

    adminPanel.style.display =
      loggedIn
        ? "block"
        : "none";

  }

}

/* =========================================================
   ADMIN LOGIN
========================================================= */

function initAdminLogin() {

  const loginBtn =
    $("#loginBtn");

  const passwordInput =
    $("#adminPassword");

  if (!loginBtn) return;

  updateAdminUI();

  loginBtn.addEventListener(
    "click",
    () => {

      const password =
        passwordInput?.value.trim() || "";

      const cfg =
        externalConfig();

      const correctPassword =
        cfg.adminPassword;

      if (
        !password ||
        password !== correctPassword
      ) {

        showToast(
          "❌ Wrong Password"
        );

        passwordInput?.focus();

        return;

      }

      setAdminSession(true);

      if (passwordInput) {
        passwordInput.value = "";
      }

      updateAdminUI();

      showToast(
        "✅ Admin Login Successful"
      );

    }
  );

  passwordInput?.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        loginBtn.click();

      }

    }
  );

}

/* =========================================================
   LOGOUT
========================================================= */

function logoutAdmin() {

  setAdminSession(false);

  editingShayariId = null;
  editingStoryId = null;

  updateAdminUI();

  clearShayariForm();
  clearStoryForm();

  showToast(
    "👋 Admin Logged Out"
  );

}

function initLogout() {

  const logoutBtn =
    $("#logoutBtn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener(
    "click",
    logoutAdmin
  );

}

/* =========================================================
   SHAYARI FORM HELPERS
========================================================= */

function getShayariFormData() {

  const title =
    $("#pubTitle")?.value.trim() || "";

  const category =
    $("#pubCategory")?.value || "Love";

  const text =
    $("#pubText")?.value.trim() || "";

  const author =
    $("#pubAuthor")?.value.trim() ||
    "Adarsh Raj";

  const publisher =
    $("#pubPublisher")?.value.trim() ||
    "Adarsh Raj";

  return {
    title,
    category,
    text,
    author,
    publisher
  };

}

function clearShayariForm() {

  const ids = [
    "pubTitle",
    "pubText",
    "pubAuthor",
    "pubPublisher"
  ];

  ids.forEach(
    id => {

      const input =
        document.getElementById(id);

      if (!input) return;

      if (
        id === "pubPublisher"
      ) {

        input.value =
          "Adarsh Raj";

      } else {

        input.value = "";

      }

    }
  );

  editingShayariId = null;

  const btn =
    $("#publishBtn");

  if (btn) {

    btn.textContent =
      "🚀 Publish Shayari";

  }

}

/* =========================================================
   SHAYARI DRAFT
========================================================= */

function saveShayariDraft() {

  const data =
    getShayariFormData();

  storage.set(
    STORE.shayariDraft,
    data
  );

}

function loadShayariDraft() {

  const draft =
    storage.get(
      STORE.shayariDraft,
      null
    );

  if (!draft) return;

  const title =
    $("#pubTitle");

  const category =
    $("#pubCategory");

  const text =
    $("#pubText");

  const author =
    $("#pubAuthor");

  const publisher =
    $("#pubPublisher");

  if (title)
    title.value =
      draft.title || "";

  if (category)
    category.value =
      draft.category || "Love";

  if (text)
    text.value =
      draft.text || "";

  if (author)
    author.value =
      draft.author || "";

  if (publisher)
    publisher.value =
      draft.publisher ||
      "Adarsh Raj";

}

function clearShayariDraft() {

  storage.remove(
    STORE.shayariDraft
  );

}

/* =========================================================
   PUBLISH / UPDATE SHAYARI
========================================================= */

function publishShayari() {

  if (!checkAdmin()) return;

  const data =
    getShayariFormData();

  if (
    data.title.length < 3
  ) {

    showToast(
      "⚠️ Shayari Title Too Short"
    );

    $("#pubTitle")?.focus();

    return;

  }

  if (
    data.text.length < 10
  ) {

    showToast(
      "⚠️ Shayari Too Short"
    );

    $("#pubText")?.focus();

    return;

  }

  /*
     EDIT EXISTING SHAYARI
  */

  if (
    editingShayariId !== null
  ) {

    const index =
      customShayari.findIndex(
        item =>
          String(item.id) ===
          String(editingShayariId)
      );

    if (index !== -1) {

      customShayari[index] = {

        ...customShayari[index],

        title: data.title,

        category: data.category,

        text: data.text,

        author: data.author,

        publisher: data.publisher,

        updatedAt:
          new Date().toLocaleString(
            "en-IN"
          )

      };

      saveAll();

      clearShayariDraft();

      clearShayariForm();

      refreshContent();

      showToast(
        "✅ Shayari Updated Successfully"
      );

      return;

    }

  }

  /*
     CREATE NEW SHAYARI
  */

  const item = {

    id:
      Date.now() +
      Math.random()
        .toString(16)
        .slice(2),

    title:
      data.title,

    category:
      data.category,

    text:
      data.text,

    author:
      data.author,

    publisher:
      data.publisher,

    date:
      new Date().toLocaleString(
        "en-IN"
      )

  };

  customShayari.unshift(
    item
  );

  saveAll();

  clearShayariDraft();

  clearShayariForm();

  refreshContent();

  showToast(
    "📢 Shayari Published Successfully"
  );

}

/* =========================================================
   INIT SHAYARI PUBLISHER
========================================================= */

function initShayariPublisher() {

  const publishBtn =
    $("#publishBtn");

  if (!publishBtn) return;

  loadShayariDraft();

  [
    "pubTitle",
    "pubCategory",
    "pubText",
    "pubAuthor",
    "pubPublisher"
  ].forEach(
    id => {

      const input =
        document.getElementById(id);

      if (!input) return;

      input.addEventListener(
        "input",
        saveShayariDraft
      );

      input.addEventListener(
        "change",
        saveShayariDraft
      );

    }
  );

  publishBtn.addEventListener(
    "click",
    publishShayari
  );

}

/* =========================================================
   LOAD PUBLISHED SHAYARI
========================================================= */

function loadPublishedShayari() {

  const container =
    $("#publishedContainer");

  if (!container) return;

  if (!customShayari.length) {

    container.innerHTML = `
      <div class="card empty-card">

        <h3>
          📝 No Shayari Published Yet
        </h3>

        <p>
          Admin Panel से पहली Shayari publish करें।
        </p>

      </div>
    `;

    return;

  }

  container.innerHTML =
    customShayari
      .map(
        item =>
          createShayariCard(
            item,
            {
              admin:
                isAdminLoggedIn()
            }
          )
      )
      .join("");

}

/* =========================================================
   EDIT SHAYARI
========================================================= */

function editShayari(id) {

  if (!checkAdmin()) return;

  const item =
    customShayari.find(
      shayari =>
        String(shayari.id) ===
        String(id)
    );

  if (!item) {

    showToast(
      "❌ Shayari Not Found"
    );

    return;

  }

  const title =
    $("#pubTitle");

  const category =
    $("#pubCategory");

  const text =
    $("#pubText");

  const author =
    $("#pubAuthor");

  const publisher =
    $("#pubPublisher");

  if (title)
    title.value =
      item.title || "";

  if (category)
    category.value =
      item.category || "Love";

  if (text)
    text.value =
      item.text || "";

  if (author)
    author.value =
      item.author || "";

  if (publisher)
    publisher.value =
      item.publisher ||
      "Adarsh Raj";

  editingShayariId =
    item.id;

  const btn =
    $("#publishBtn");

  if (btn) {

    btn.textContent =
      "💾 Update Shayari";

  }

  document
    .getElementById(
      "publisher"
    )
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  showToast(
    "✏️ Edit Mode Enabled"
  );

}

/* =========================================================
   DELETE SHAYARI
========================================================= */

function deleteShayari(id) {

  if (!checkAdmin()) return;

  const index =
    customShayari.findIndex(
      item =>
        String(item.id) ===
        String(id)
    );

  if (index === -1) {

    showToast(
      "❌ Shayari Not Found"
    );

    return;

  }

  const item =
    customShayari[index];

  const confirmed =
    window.confirm(
      `क्या आप "${item.title}" को delete करना चाहते हैं?`
    );

  if (!confirmed) return;

  customShayari.splice(
    index,
    1
  );

  saveAll();

  refreshContent();

  showToast(
    "🗑️ Shayari Deleted"
  );

}

/* =========================================================
   ADMIN SHAYARI EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const editBtn =
      event.target.closest(
        ".editShayariBtn"
      );

    if (editBtn) {

      editShayari(
        editBtn.dataset.id
      );

      return;

    }

    const deleteBtn =
      event.target.closest(
        ".deleteShayariBtn"
      );

    if (deleteBtn) {

      deleteShayari(
        deleteBtn.dataset.id
      );

    }

  }
);

/* =========================================================
   PART 3 READY
========================================================= */

console.log(
  "✅ Part 3 — Admin & Shayari Publisher Loaded"
);
"use strict";

/* ==========================================================
   ADARSH RAJ SHAYAR
   CLEAN PROFESSIONAL SCRIPT
   Version 13.0
   ========================================================== */

/* ==========================================================
   1. CONFIG
========================================================== */

const ARS_CONFIG = {

    WEBSITE_NAME: "Adarsh Raj Shayar",

    VERSION: "13.0",

    AUTHOR: "Adarsh Raj",

    ADMIN_PASSWORD: "ARS2026",

    STORAGE: {
        THEME: "ars_theme",
        VISITED: "ars_visited",
        LIKES: "ars_likes",
        FAVOURITES: "ars_favourites",
        SHAYARI: "ars_custom_shayari",
        STORIES: "ars_stories"
    },

    ADMIN_SESSION: "ARS_ADMIN_SESSION"

};


/* ==========================================================
   2. DOM SHORTCUTS
========================================================== */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);


/* ==========================================================
   3. STORAGE SYSTEM
========================================================== */

const ARSStorage = {

    get(key, fallback = null) {

        try {

            const value =
                localStorage.getItem(key);

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {

            console.error(
                "Storage Read Error:",
                error
            );

            return fallback;

        }

    },


    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

        } catch (error) {

            console.error(
                "Storage Save Error:",
                error
            );

        }

    },


    remove(key) {

        try {

            localStorage.removeItem(key);

        } catch (error) {

            console.error(
                "Storage Remove Error:",
                error
            );

        }

    }

};


/* ==========================================================
   4. GLOBAL DATA
========================================================== */

let likedShayari =
    ARSStorage.get(
        ARS_CONFIG.STORAGE.LIKES,
        []
    );

let favouriteShayari =
    ARSStorage.get(
        ARS_CONFIG.STORAGE.FAVOURITES,
        []
    );

let customShayari =
    ARSStorage.get(
        ARS_CONFIG.STORAGE.SHAYARI,
        []
    );

let stories =
    ARSStorage.get(
        ARS_CONFIG.STORAGE.STORIES,
        []
    );


/* ==========================================================
   5. TOAST
========================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        showToast.timer
    );

    showToast.timer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* ==========================================================
   6. SAVE DATA
========================================================== */

function saveAllData() {

    ARSStorage.set(
        ARS_CONFIG.STORAGE.LIKES,
        likedShayari
    );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.FAVOURITES,
        favouriteShayari
    );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.SHAYARI,
        customShayari
    );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.STORIES,
        stories
    );

}


/* ==========================================================
   7. CURRENT YEAR
========================================================== */

function initCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* ==========================================================
   8. LOADER
========================================================== */

function initLoader() {

    const loader =
        document.getElementById(
            "loader"
        );

    if (!loader) return;

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                loader.classList.add(
                    "loader-hide"
                );

            }, 600);

        }
    );

}


/* ==========================================================
   9. WELCOME POPUP
========================================================== */

function initWelcomePopup() {

    const popup =
        document.getElementById(
            "welcomePopup"
        );

    const enterBtn =
        document.getElementById(
            "enterBtn"
        );

    if (!popup || !enterBtn) return;

    if (
        localStorage.getItem(
            ARS_CONFIG.STORAGE.VISITED
        )
    ) {

        popup.style.display = "none";

        return;

    }

    enterBtn.addEventListener(
        "click",
        () => {

            popup.style.display =
                "none";

            localStorage.setItem(
                ARS_CONFIG.STORAGE.VISITED,
                "true"
            );

            showToast(
                "🌹 Welcome to Adarsh Raj Shayar"
            );

        }
    );

}


/* ==========================================================
   10. DARK / LIGHT MODE
========================================================== */

function initTheme() {

    const savedTheme =
        ARSStorage.get(
            ARS_CONFIG.STORAGE.THEME,
            "dark"
        );

    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-mode"
        );

    }

    updateThemeIcon();

    const darkBtn =
        document.getElementById(
            "darkModeBtn"
        );

    if (darkBtn) {

        darkBtn.addEventListener(
            "click",
            toggleTheme
        );

    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    const light =
        document.body.classList.contains(
            "light-mode"
        );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.THEME,
        light ? "light" : "dark"
    );

    updateThemeIcon();

    showToast(
        light
            ? "☀️ Light Mode Enabled"
            : "🌙 Dark Mode Enabled"
    );

}


function updateThemeIcon() {

    const btn =
        document.getElementById(
            "darkModeBtn"
        );

    if (!btn) return;

    btn.innerHTML =
        document.body.classList.contains(
            "light-mode"
        )
            ? "🌙"
            : "☀️";

}


/* ==========================================================
   11. MOBILE MENU
========================================================== */

function initMobileMenu() {

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );

    const nav =
        document.querySelector(
            "nav"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "active"
            );

            if (overlay) {

                overlay.classList.toggle(
                    "active"
                );

            }

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }

}


function closeMobileMenu() {

    const nav =
        document.querySelector(
            "nav"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );

    if (nav) {

        nav.classList.remove(
            "active"
        );

    }

    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

    document.body.classList.remove(
        "menu-open"
    );

}


/* ==========================================================
   12. SMOOTH NAVIGATION
========================================================== */

function initSmoothNavigation() {

    $$(
        'nav a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    closeMobileMenu();

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                closeMobileMenu();

            }
        );

    });

}


/* ==========================================================
   13. SEARCH
========================================================== */

function initSearch() {

    const search =
        document.getElementById(
            "search"
        );

    if (!search) return;

    search.addEventListener(
        "input",
        () => {

            const keyword =
                search.value
                    .toLowerCase()
                    .trim();

            document
                .querySelectorAll(
                    ".card"
                )
                .forEach(card => {

                    const text =
                        card.innerText
                            .toLowerCase();

                    card.style.display =
                        text.includes(keyword)
                            ? ""
                            : "none";

                });

        }
    );

}


/* ==========================================================
   14. PROGRESS BAR
========================================================== */

function initProgressBar() {

    const bar =
        document.getElementById(
            "progressBar"
        );

    if (!bar) return;

    window.addEventListener(
        "scroll",
        () => {

            const documentHeight =
                document.documentElement
                    .scrollHeight;

            const windowHeight =
                document.documentElement
                    .clientHeight;

            const scrollTop =
                document.documentElement
                    .scrollTop;

            const total =
                documentHeight -
                windowHeight;

            const percent =
                total > 0
                    ? (scrollTop / total) * 100
                    : 0;

            bar.style.width =
                percent + "%";

        }
    );

}


/* ==========================================================
   15. BACK TO TOP
========================================================== */

function initBackToTop() {

    const btn =
        document.getElementById(
            "topBtn"
        );

    if (!btn) return;

    window.addEventListener(
        "scroll",
        () => {

            btn.style.display =
                window.scrollY > 350
                    ? "block"
                    : "none";

        }
    );

    btn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ==========================================================
   16. ACTIVE NAVIGATION
========================================================== */

function initActiveNavigation() {

    const sections =
        $$("section[id]");

    const links =
        $$("nav a");

    if (
        !sections.length ||
        !links.length
    ) return;

    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(
                section => {

                    if (
                        window.scrollY >=
                        section.offsetTop - 180
                    ) {

                        current =
                            section.id;

                    }

                }
            );

            links.forEach(
                link => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) === "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}


/* ==========================================================
   17. SHAYARI HELPERS
========================================================== */

function getBuiltInShayari() {

    return typeof shayariData !==
        "undefined"
        ? shayariData
        : [];

}


function getAllShayari() {

    return [
        ...getBuiltInShayari(),
        ...customShayari
    ];

}


/* ==========================================================
   18. ESCAPE HTML
========================================================== */

function escapeHTML(value) {

    if (value === undefined ||
        value === null) {

        return "";

    }

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function formatText(value) {

    return escapeHTML(value)
        .replace(
            /\n/g,
            "<br>"
        );

}


/* ==========================================================
   19. SHAYARI CARD
========================================================== */

function createShayariCard(item) {

    const text =
        item.text || "";

    const title =
        item.title ||
        "Untitled Shayari";

    const author =
        item.author ||
        "Adarsh Raj";

    const date =
        item.date ||
        "";

    return `

        <div
            class="card shayari-card"
            data-shayari-text="${escapeHTML(text)}"
        >

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p class="shayariText">
                ${formatText(text)}
            </p>

            <div class="meta">

                <span>
                    ✍️ ${escapeHTML(author)}
                </span>

                ${
                    date
                    ? `
                    <span>
                        📅 ${escapeHTML(date)}
                    </span>
                    `
                    : ""
                }

            </div>

            <div class="actionButtons">

                <button
                    type="button"
                    class="copyBtn"
                >
                    📋 Copy
                </button>

                <button
                    type="button"
                    class="shareBtn"
                >
                    📤 Share
                </button>

                <button
                    type="button"
                    class="likeBtn"
                >
                    ❤️ Like
                </button>

                <button
                    type="button"
                    class="favBtn"
                >
                    ⭐ Favourite
                </button>

            </div>

        </div>

    `;

}


/* ==========================================================
   20. RENDER SHAYARI CATEGORY
========================================================== */

function renderCategory(
    category,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );

    if (!container) return;

    const list = [
        ...getBuiltInShayari()
            .filter(
                item =>
                    item.category ===
                    category
            ),

        ...customShayari
            .filter(
                item =>
                    item.category ===
                    category
            )
    ];

    container.innerHTML = "";

    if (!list.length) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    📖 No Shayari Available
                </h3>

            </div>

        `;

        return;

    }

    list.forEach(item => {

        container.insertAdjacentHTML(
            "beforeend",
            createShayariCard(item)
        );

    });

}


function loadAllShayari() {

    renderCategory(
        "Love",
        "loveContainer"
    );

    renderCategory(
        "Sad",
        "sadContainer"
    );

    renderCategory(
        "Attitude",
        "attitudeContainer"
    );

    renderCategory(
        "Friendship",
        "friendshipContainer"
    );

    renderCategory(
        "Motivation",
        "motivationContainer"
    );

    restoreShayariButtons();

}


/* ==========================================================
   21. COPY
========================================================== */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(
            text
        );

        showToast(
            "📋 Copied Successfully"
        );

    } catch {

        showToast(
            "❌ Copy Failed"
        );

    }

}


/* ==========================================================
   22. SHARE
========================================================== */

async function shareText(text) {

    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    ARS_CONFIG.WEBSITE_NAME,

                text: text,

                url:
                    window.location.href

            });

        } catch {

            /* User cancelled share */

        }

    } else {

        copyText(text);

    }

}


/* ==========================================================
   23. LIKE
========================================================== */

function toggleLike(text) {

    const index =
        likedShayari.indexOf(
            text
        );

    if (index === -1) {

        likedShayari.push(text);

        showToast(
            "❤️ Liked"
        );

    } else {

        likedShayari.splice(
            index,
            1
        );

        showToast(
            "💔 Like Removed"
        );

    }

    ARSStorage.set(
        ARS_CONFIG.STORAGE.LIKES,
        likedShayari
    );

    updateStatistics();

}


/* ==========================================================
   24. FAVOURITE
========================================================== */

function toggleFavourite(text) {

    const index =
        favouriteShayari.indexOf(
            text
        );

    if (index === -1) {

        favouriteShayari.push(text);

        showToast(
            "⭐ Added to Favourite"
        );

    } else {

        favouriteShayari.splice(
            index,
            1
        );

        showToast(
            "❌ Favourite Removed"
        );

    }

    ARSStorage.set(
        ARS_CONFIG.STORAGE.FAVOURITES,
        favouriteShayari
    );

    loadFavourite();

    updateStatistics();

}


/* ==========================================================
   25. RESTORE BUTTONS
========================================================== */

function restoreShayariButtons() {

    document
        .querySelectorAll(
            ".shayari-card"
        )
        .forEach(card => {

            const text =
                card.querySelector(
                    ".shayariText"
                )?.innerText;

            if (!text) return;

            const likeBtn =
                card.querySelector(
                    ".likeBtn"
                );

            const favBtn =
                card.querySelector(
                    ".favBtn"
                );

            if (
                likeBtn &&
                likedShayari.includes(text)
            ) {

                likeBtn.classList.add(
                    "active"
                );

                likeBtn.innerHTML =
                    "💖 Liked";

            }

            if (
                favBtn &&
                favouriteShayari.includes(text)
            ) {

                favBtn.classList.add(
                    "active"
                );

                favBtn.innerHTML =
                    "🌟 Saved";

            }

        });

}


/* ==========================================================
   26. FAVOURITE LIST
========================================================== */

function loadFavourite() {

    const container =
        document.getElementById(
            "favoriteList"
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        favouriteShayari.length === 0
    ) {

        container.innerHTML = `

            <div class="card">

                <p>
                    अभी कोई Favourite Shayari नहीं है।
                </p>

            </div>

        `;

        return;

    }

    favouriteShayari.forEach(
        text => {

            container.insertAdjacentHTML(
                "beforeend",
                `
                <div class="card">

                    <p class="shayariText">
                        ${formatText(text)}
                    </p>

                </div>
                `
            );

        }
    );

}


/* ==========================================================
   27. PUBLISHED SHAYARI
========================================================== */

function loadPublishedShayari() {

    const container =
        document.getElementById(
            "publishedContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        customShayari.length === 0
    ) {

        container.innerHTML = `

            <div class="card">

                <p>
                    अभी कोई Shayari Published नहीं है।
                </p>

            </div>

        `;

        return;

    }

    customShayari.forEach(
        (item, index) => {

            container.insertAdjacentHTML(
                "beforeend",

                `

                <div class="card">

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <p class="shayariText">
                        ${formatText(item.text)}
                    </p>

                    <div class="meta">

                        <span>
                            ✍️ ${escapeHTML(
                                item.author ||
                                "Unknown"
                            )}
                        </span>

                        <span>
                            📅 ${escapeHTML(
                                item.date ||
                                ""
                            )}
                        </span>

                    </div>

                    <div class="actionButtons">

                        <button
                            type="button"
                            class="editShayariBtn"
                            data-id="${index}"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            type="button"
                            class="deleteShayariBtn"
                            data-id="${index}"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

                `

            );

        }
    );

}


/* ==========================================================
   28. ADMIN LOGIN
========================================================== */

function isAdminLoggedIn() {

    return (
        sessionStorage.getItem(
            ARS_CONFIG.ADMIN_SESSION
        ) === "true"
    );

}


function setAdminSession(status) {

    sessionStorage.setItem(
        ARS_CONFIG.ADMIN_SESSION,
        status
            ? "true"
            : "false"
    );

}


function initAdmin() {

    const loginBox =
        document.getElementById(
            "adminLogin"
        );

    const panel =
        document.getElementById(
            "publisherPanel"
        );

    const password =
        document.getElementById(
            "adminPassword"
        );

    const loginBtn =
        document.getElementById(
            "loginBtn"
        );

    if (
        !loginBtn
    ) return;

    updateAdminUI();

    loginBtn.addEventListener(
        "click",
        () => {

            const entered =
                password
                    ? password.value.trim()
                    : "";

            if (
                entered !==
                ARS_CONFIG.ADMIN_PASSWORD
            ) {

                showToast(
                    "❌ Wrong Password"
                );

                if (password) {
                    password.focus();
                }

                return;

            }

            setAdminSession(true);

            updateAdminUI();

            if (password) {
                password.value = "";
            }

            showToast(
                "✅ Admin Login Success"
            );

        }
    );

}


function updateAdminUI() {

    const loginBox =
        document.getElementById(
            "adminLogin"
        );

    const panel =
        document.getElementById(
            "publisherPanel"
        );

    if (
        isAdminLoggedIn()
    ) {

        if (loginBox) {
            loginBox.style.display =
                "none";
        }

        if (panel) {
            panel.style.display =
                "block";
        }

    } else {

        if (loginBox) {
            loginBox.style.display =
                "block";
        }

        if (panel) {
            panel.style.display =
                "none";
        }

    }

}


function checkAdmin() {

    if (
        !isAdminLoggedIn()
    ) {

        showToast(
            "🔒 Admin Login Required"
        );

        return false;

    }

    return true;

}


function logoutAdmin() {

    setAdminSession(false);

    updateAdminUI();

    showToast(
        "👋 Admin Logged Out"
    );

}


/* ==========================================================
   29. ADMIN INPUT HELPER
   IMPORTANT:
   Uses the MAIN #adminPanel first.
========================================================== */

function getAdminElement(id) {

    const adminPanel =
        document.getElementById(
            "adminPanel"
        );

    if (adminPanel) {

        const element =
            adminPanel.querySelector(
                "#" + id
            );

        if (element) {
            return element;
        }

    }

    return document.getElementById(id);

}


/* ==========================================================
   30. PUBLISH SHAYARI
========================================================== */

function publishShayari() {

    if (!checkAdmin()) return;

    const titleInput =
        getAdminElement(
            "publisherTitle"
        );

    const categoryInput =
        getAdminElement(
            "publisherCategory"
        );

    const textInput =
        getAdminElement(
            "publisherText"
        );

    const authorInput =
        getAdminElement(
            "publisherAuthor"
        );

    if (
        !titleInput ||
        !categoryInput ||
        !textInput ||
        !authorInput
    ) {

        showToast(
            "❌ Shayari Publisher Form Not Found"
        );

        return;

    }

    const title =
        titleInput.value.trim();

    const category =
        categoryInput.value;

    const text =
        textInput.value.trim();

    const author =
        authorInput.value.trim() ||
        "Adarsh Raj";

    if (
        title.length < 3
    ) {

        showToast(
            "⚠️ Title Too Short"
        );

        return;

    }

    if (
        text.length < 10
    ) {

        showToast(
            "⚠️ Shayari Too Short"
        );

        return;

    }

    const item = {

        id: Date.now(),

        title,

        category,

        text,

        author,

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };

    customShayari.unshift(
        item
    );

    saveAllData();

    loadAllShayari();

    loadPublishedShayari();

    updateStatistics();

    titleInput.value = "";
    textInput.value = "";

    if (
        authorInput
    ) {

        authorInput.value =
            "Adarsh Raj";

    }

    showToast(
        "✅ Shayari Published Successfully"
    );

}


/* ==========================================================
   31. EDIT SHAYARI
========================================================== */

function editShayari(index) {

    if (!checkAdmin()) return;

    const item =
        customShayari[index];

    if (!item) return;

    const title =
        getAdminElement(
            "publisherTitle"
        );

    const category =
        getAdminElement(
            "publisherCategory"
        );

    const text =
        getAdminElement(
            "publisherText"
        );

    const author =
        getAdminElement(
            "publisherAuthor"
        );

    if (
        title &&
        category &&
        text &&
        author
    ) {

        title.value =
            item.title;

        category.value =
            item.category;

        text.value =
            item.text;

        author.value =
            item.author ||
            "Adarsh Raj";

    }

    customShayari.splice(
        index,
        1
    );

    saveAllData();

    loadPublishedShayari();

    loadAllShayari();

    showToast(
        "✏️ Shayari Edit Mode"
    );

}


/* ==========================================================
   32. DELETE SHAYARI
========================================================== */

function deleteShayari(index) {

    if (!checkAdmin()) return;

    if (
        !confirm(
            "क्या आप इस Shayari को Delete करना चाहते हैं?"
        )
    ) return;

    customShayari.splice(
        index,
        1
    );

    saveAllData();

    loadPublishedShayari();

    loadAllShayari();

    updateStatistics();

    showToast(
        "🗑️ Shayari Deleted"
    );

}


/* ==========================================================
   33. STORY SYSTEM
========================================================== */

/*
   STORY IMPORTANT DESIGN:

   Main website:
   Story Category Cards

   User clicks a card
   ↓
   Story Reader opens
   ↓
   Full story appears

   इसलिए पूरी story homepage पर एक साथ नहीं दिखाई जाएगी।
*/


function createStoryCard(story) {

    return `

        <div
            class="card story-card"
            data-story-id="${story.id}"
        >

            <h3>
                📖 ${escapeHTML(
                    story.title
                )}
            </h3>

            <p>
                📚 ${escapeHTML(
                    story.category ||
                    "Story"
                )}
            </p>

            <div class="meta">

                <span>
                    ✍️ ${escapeHTML(
                        story.author ||
                        "Unknown"
                    )}
                </span>

                ${
                    story.date
                    ? `
                    <span>
                        📅 ${escapeHTML(
                            story.date
                        )}
                    </span>
                    `
                    : ""
                }

            </div>

            <button
                type="button"
                class="storyOpenBtn"
                data-story-id="${story.id}"
            >
                📖 Read Full Story
            </button>

        </div>

    `;

}


/* ==========================================================
   34. STORY READER
========================================================== */

function createStoryReader() {

    if (
        document.getElementById(
            "storyReader"
        )
    ) return;

    const reader =
        document.createElement(
            "div"
        );

    reader.id =
        "storyReader";

    reader.style.display =
        "none";

    reader.innerHTML = `

        <div class="story-reader-box">

            <button
                type="button"
                id="closeStoryReader"
            >
                ✕ Close
            </button>

            <h2 id="readerStoryTitle">
            </h2>

            <p id="readerStoryMeta">
            </p>

            <div
                id="readerStoryText"
                class="story-reader-text"
            >
            </div>

        </div>

    `;

    document.body.appendChild(
        reader
    );

    const closeBtn =
        document.getElementById(
            "closeStoryReader"
        );

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeStoryReader
        );

    }

}


function openStoryReader(id) {

    const story =
        stories.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!story) {

        showToast(
            "❌ Story Not Found"
        );

        return;

    }

    createStoryReader();

    const reader =
        document.getElementById(
            "storyReader"
        );

    const title =
        document.getElementById(
            "readerStoryTitle"
        );

    const meta =
        document.getElementById(
            "readerStoryMeta"
        );

    const text =
        document.getElementById(
            "readerStoryText"
        );

    if (
        !reader ||
        !title ||
        !meta ||
        !text
    ) return;

    title.textContent =
        story.title;

    meta.textContent =
        `✍️ ${story.author || "Unknown"}  •  📚 ${
            story.category || "Story"
        }`;

    text.innerHTML =
        formatText(
            story.text
        );

    reader.style.display =
        "flex";

    document.body.classList.add(
        "story-reader-open"
    );

}


function closeStoryReader() {

    const reader =
        document.getElementById(
            "storyReader"
        );

    if (!reader) return;

    reader.style.display =
        "none";

    document.body.classList.remove(
        "story-reader-open"
    );

}


/* ==========================================================
   35. LOAD STORIES
========================================================== */

function loadStories() {

    const container =
        document.getElementById(
            "storyContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        stories.length === 0
    ) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    📚 जल्द आ रहा है...
                </h3>

                <p>
                    यहाँ Original Stories और Poems प्रकाशित होंगी।
                </p>

            </div>

        `;

        return;

    }

    stories.forEach(
        story => {

            container.insertAdjacentHTML(
                "beforeend",
                createStoryCard(story)
            );

        }
    );

}


/* ==========================================================
   36. PUBLISH STORY
========================================================== */

function publishStory() {

    if (!checkAdmin()) return;

    /*
       MAIN ADMIN PANEL के inputs पहले खोजे जाएंगे।
    */

    const titleInput =
        getAdminElement(
            "storyTitle"
        );

    const textInput =
        getAdminElement(
            "storyText"
        );

    const authorInput =
        getAdminElement(
            "storyAuthor"
        );

    const categoryInput =
        getAdminElement(
            "storyCategory"
        );

    const typeInput =
        getAdminElement(
            "storyType"
        );

    if (
        !titleInput ||
        !textInput
    ) {

        showToast(
            "❌ Story Publisher Form Not Found"
        );

        return;

    }

    const title =
        titleInput.value.trim();

    const text =
        textInput.value.trim();

    const author =
        authorInput
            ? (
                authorInput.value.trim() ||
                "Adarsh Raj"
            )
            : "Adarsh Raj";

    let category =
        categoryInput
            ? categoryInput.value
            : "Story";

    if (
        typeInput &&
        typeInput.value
    ) {

        category =
            typeInput.value;

    }

    if (
        title.length < 3
    ) {

        showToast(
            "⚠️ Story Title Too Short"
        );

        return;

    }

    if (
        text.length < 20
    ) {

        showToast(
            "⚠️ Story बहुत छोटी है"
        );

        return;

    }

    const story = {

        id: Date.now(),

        title,

        category,

        text,

        author,

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };

    stories.unshift(
        story
    );

    saveAllData();

    loadStories();

    updateStatistics();

    titleInput.value = "";

    textInput.value = "";

    if (authorInput) {

        authorInput.value =
            "Adarsh Raj";

    }

    showToast(
        "📖 Story Published Successfully"
    );

}


/* ==========================================================
   37. DELETE STORY
========================================================== */

function deleteStory(index) {

    if (!checkAdmin()) return;

    if (
        !confirm(
            "क्या आप इस Story को Delete करना चाहते हैं?"
        )
    ) return;

    stories.splice(
        index,
        1
    );

    saveAllData();

    loadStories();

    updateStatistics();

    showToast(
        "🗑️ Story Deleted"
    );

}


/* ==========================================================
   38. STORY CATEGORY FILTER
========================================================== */

function filterStories(category) {

    const container =
        document.getElementById(
            "storyContainer"
        );

    if (!container) return;

    let filtered =
        stories;

    if (
        category &&
        category !== "All"
    ) {

        filtered =
            stories.filter(
                story =>
                    story.category ===
                    category
            );

    }

    container.innerHTML = "";

    if (!filtered.length) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    📖 No Story Found
                </h3>

            </div>

        `;

        return;

    }

    filtered.forEach(
        story => {

            container.insertAdjacentHTML(
                "beforeend",
                createStoryCard(story)
            );

        }
    );

}


/* ==========================================================
   39. STORY BUTTON EVENTS
========================================================== */

function initStoryEvents() {

    document.addEventListener(
        "click",
        event => {

            const openBtn =
                event.target.closest(
                    ".storyOpenBtn"
                );

            if (openBtn) {

                openStoryReader(
                    openBtn.dataset.storyId
                );

                return;

            }

            const deleteBtn =
                event.target.closest(
                    ".storyDeleteBtn"
                );

            if (deleteBtn) {

                deleteStory(
                    Number(
                        deleteBtn.dataset.id
                    )
                );

            }

        }
    );

}


/* ==========================================================
   40. STORY PUBLISH BUTTON
========================================================== */

function initStoryPublishButton() {

    /*
       HTML में duplicate IDs मौजूद होने के कारण
       केवल addEventListener पर निर्भर नहीं करेंगे।
    */

    const buttons =
        document.querySelectorAll(
            "#storyPublishBtn"
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    publishStory();

                }
            );

        }
    );

}


/* ==========================================================
   41. SHAYARI PUBLISH BUTTON
========================================================== */

function initShayariPublishButtons() {

    const buttons =
        document.querySelectorAll(
            "#publishBtn"
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    /*
                       अगर यह पुराने publisher का button है
                       तो legacy form से publish करने की कोशिश।
                    */

                    if (
                        button.closest(
                            "#adminPanel"
                        )
                    ) {

                        publishShayari();

                    } else {

                        publishLegacyShayari();

                    }

                }
            );

        }
    );

}


/* ==========================================================
   42. LEGACY SHAYARI PUBLISHER
========================================================== */

function publishLegacyShayari() {

    if (!checkAdmin()) return;

    const title =
        document.getElementById(
            "pubTitle"
        );

    const category =
        document.getElementById(
            "pubCategory"
        );

    const text =
        document.getElementById(
            "pubText"
        );

    const author =
        document.getElementById(
            "pubAuthor"
        );

    if (
        !title ||
        !category ||
        !text
    ) {

        showToast(
            "❌ Shayari Form Not Found"
        );

        return;

    }

    const item = {

        id: Date.now(),

        title:
            title.value.trim(),

        category:
            category.value,

        text:
            text.value.trim(),

        author:
            author?.value.trim() ||
            "Adarsh Raj",

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };

    if (
        item.title.length < 3
    ) {

        showToast(
            "⚠️ Title Too Short"
        );

        return;

    }

    if (
        item.text.length < 10
    ) {

        showToast(
            "⚠️ Shayari Too Short"
        );

        return;

    }

    customShayari.unshift(
        item
    );

    saveAllData();

    loadAllShayari();

    loadPublishedShayari();

    updateStatistics();

    title.value = "";
    text.value = "";

    if (author) {
        author.value = "";
    }

    showToast(
        "✅ Shayari Published Successfully"
    );

}


/* ==========================================================
   43. GLOBAL CARD BUTTON EVENTS
========================================================== */

function initCardActions() {

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".shayari-card"
                );

            if (!card) return;

            const text =
                card.querySelector(
                    ".shayariText"
                )?.innerText;

            if (!text) return;


            if (
                event.target.closest(
                    ".copyBtn"
                )
            ) {

                copyText(text);

            }


            if (
                event.target.closest(
                    ".shareBtn"
                )
            ) {

                shareText(text);

            }


            if (
                event.target.closest(
                    ".likeBtn"
                )
            ) {

                toggleLike(text);

                const btn =
                    event.target.closest(
                        ".likeBtn"
                    );

                btn.classList.toggle(
                    "active",
                    likedShayari.includes(
                        text
                    )
                );

                btn.innerHTML =
                    likedShayari.includes(
                        text
                    )
                        ? "💖 Liked"
                        : "❤️ Like";

            }


            if (
                event.target.closest(
                    ".favBtn"
                )
            ) {

                toggleFavourite(text);

                const btn =
                    event.target.closest(
                        ".favBtn"
                    );

                btn.classList.toggle(
                    "active",
                    favouriteShayari.includes(
                        text
                    )
                );

                btn.innerHTML =
                    favouriteShayari.includes(
                        text
                    )
                        ? "🌟 Saved"
                        : "⭐ Favourite";

            }

        }
    );

}


/* ==========================================================
   44. EDIT / DELETE EVENTS
========================================================== */

function initAdminContentEvents() {

    document.addEventListener(
        "click",
        event => {

            const editBtn =
                event.target.closest(
                    ".editShayariBtn"
                );

            if (editBtn) {

                editShayari(
                    Number(
                        editBtn.dataset.id
                    )
                );

                return;

            }


            const deleteBtn =
                event.target.closest(
                    ".deleteShayariBtn"
                );

            if (deleteBtn) {

                deleteShayari(
                    Number(
                        deleteBtn.dataset.id
                    )
                );

                return;

            }


            const logoutBtn =
                event.target.closest(
                    "#logoutBtn"
                );

            if (logoutBtn) {

                logoutAdmin();

            }

        }
    );

}


/* ==========================================================
   45. STATISTICS
========================================================== */

function updateStatistics() {

    const totalShayari =
        document.getElementById(
            "totalShayari"
        );

    const totalStories =
        document.getElementById(
            "totalStories"
        );

    const totalFavourite =
        document.getElementById(
            "totalFavourite"
        );

    const totalLikes =
        document.getElementById(
            "totalLikes"
        );

    const total =
        getAllShayari().length;

    if (totalShayari) {

        totalShayari.textContent =
            total;

    }

    if (totalStories) {

        totalStories.textContent =
            stories.length;

    }

    if (totalFavourite) {

        totalFavourite.textContent =
            favouriteShayari.length;

    }

    if (totalLikes) {

        totalLikes.textContent =
            likedShayari.length;

    }

}


/* ==========================================================
   46. RANDOM SHAYARI
========================================================== */

function getRandomShayari() {

    const list =
        getAllShayari();

    if (!list.length) {
        return null;
    }

    return list[
        Math.floor(
            Math.random() *
            list.length
        )
    ];

}


/* ==========================================================
   47. RANDOM STORY
========================================================== */

function getRandomStory() {

    if (!stories.length) {
        return null;
    }

    return stories[
        Math.floor(
            Math.random() *
            stories.length
        )
    ];

}


/* ==========================================================
   48. CONTACT FORM
========================================================== */

function initContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) return;

    /*
       EmailJS config.js से values लेने की कोशिश।
    */

    const publicKey =
        window.EMAILJS_PUBLIC_KEY ||
        window.emailjsPublicKey ||
        "";

    const serviceId =
        window.EMAILJS_SERVICE_ID ||
        window.emailjsServiceId ||
        "";

    const templateId =
        window.EMAILJS_TEMPLATE_ID ||
        window.emailjsTemplateId ||
        "";

    /*
       अगर config.js ने global CONFIG दिया है,
       तो उससे भी values लेने की कोशिश।
    */

    let finalPublicKey =
        publicKey;

    let finalServiceId =
        serviceId;

    let finalTemplateId =
        templateId;

    try {

        if (
            window.CONFIG &&
            typeof window.CONFIG ===
            "object"
        ) {

            finalPublicKey =
                finalPublicKey ||
                window.CONFIG.EMAILJS_PUBLIC_KEY ||
                "";

            finalServiceId =
                finalServiceId ||
                window.CONFIG.EMAILJS_SERVICE_ID ||
                "";

            finalTemplateId =
                finalTemplateId ||
                window.CONFIG.EMAILJS_TEMPLATE_ID ||
                "";

        }

    } catch {

        /* ignore */

    }


    if (
        typeof emailjs ===
        "undefined"
    ) {

        console.error(
            "EmailJS library not loaded."
        );

        return;

    }


    if (
        !finalPublicKey ||
        !finalServiceId ||
        !finalTemplateId
    ) {

        console.error(
            "EmailJS configuration missing."
        );

        return;

    }


    try {

        emailjs.init({
            publicKey:
                finalPublicKey
        });

    } catch {

        try {

            emailjs.init(
                finalPublicKey
            );

        } catch {

            console.error(
                "EmailJS initialization failed."
            );

            return;

        }

    }


    if (
        form.dataset.emailReady ===
        "true"
    ) return;

    form.dataset.emailReady =
        "true";


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const button =
                form.querySelector(
                    "button[type='submit']"
                );

            if (button) {

                button.disabled =
                    true;

                button.innerHTML =
                    "📤 Sending...";

            }


            emailjs.sendForm(
                finalServiceId,
                finalTemplateId,
                form
            )
            .then(() => {

                showToast(
                    "✅ Message Sent Successfully"
                );

                form.reset();

            })
            .catch(error => {

                console.error(
                    "EmailJS Error:",
                    error
                );

                showToast(
                    "❌ Message Send Failed"
                );

            })
            .finally(() => {

                if (button) {

                    button.disabled =
                        false;

                    button.innerHTML =
                        "📨 Send Message";

                }

            });

        }
    );

}


/* ==========================================================
   49. QR CODE
========================================================== */

function generateWebsiteQR() {

    const qrBox =
        document.getElementById(
            "qrCode"
        );

    if (!qrBox) return;

    if (
        typeof QRCode ===
        "undefined"
    ) {

        showToast(
            "❌ QR Code Library Not Loaded"
        );

        return;

    }

    qrBox.innerHTML = "";

    new QRCode(
        qrBox,
        {

            text:
                window.location.href,

            width: 220,

            height: 220,

            colorDark:
                "#000000",

            colorLight:
                "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H

        }
    );

}


function downloadQRCode() {

    const qrBox =
        document.getElementById(
            "qrCode"
        );

    if (!qrBox) return;

    const canvas =
        qrBox.querySelector(
            "canvas"
        );

    const image =
        qrBox.querySelector(
            "img"
        );

    let url = "";

    if (canvas) {

        try {

            url =
                canvas.toDataURL(
                    "image/png"
                );

        } catch {

            showToast(
                "❌ QR Download Failed"
            );

            return;

        }

    } else if (image) {

        url =
            image.src;

    }

    if (!url) {

        showToast(
            "⚠️ Generate QR First"
        );

        return;

    }

    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        "Adarsh-Raj-Shayar-QR.png";

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

    showToast(
        "✅ QR Downloaded"
    );

}


function initQR() {

    const generate =
        document.getElementById(
            "generateQRBtn"
        );

    const download =
        document.getElementById(
            "downloadQRBtn"
        );

    if (generate) {

        generate.addEventListener(
            "click",
            generateWebsiteQR
        );

    }

    if (download) {

        download.addEventListener(
            "click",
            downloadQRCode
        );

    }

}


/* ==========================================================
   50. COPY WEBSITE LINK
========================================================== */

function initCopyWebsiteLink() {

    const button =
        document.getElementById(
            "copyWebsiteBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                showToast(
                    "🔗 Website Link Copied"
                );

            } catch {

                showToast(
                    "❌ Unable to Copy Link"
                );

            }

        }
    );

}


/* ==========================================================
   51. VISITOR COUNTER
========================================================== */

function initVisitorCounter() {

    const counter =
        document.getElementById(
            "visitor-count"
        );

    if (!counter) return;

    const COUNT_KEY =
        "ars_visitor_count";

    const SEEN_KEY =
        "ars_visitor_seen";

    let count =
        Number(
            localStorage.getItem(
                COUNT_KEY
            )
        );

    if (
        !Number.isFinite(count) ||
        count < 0
    ) {

        count = 0;

    }

    if (
        !localStorage.getItem(
            SEEN_KEY
        )
    ) {

        count++;

        localStorage.setItem(
            COUNT_KEY,
            String(count)
        );

        localStorage.setItem(
            SEEN_KEY,
            "true"
        );

    }

    counter.textContent =
        count.toLocaleString(
            "en-IN"
        );

}


/* ==========================================================
   52. SEO
========================================================== */

function initSEO() {

    document.title =
        "Adarsh Raj Shayar | Official";

    const description =
        document.querySelector(
            "meta[name='description']"
        );

    if (description) {

        description.content =
            "Official Hindi Shayari Website by Adarsh Raj";

    }

}


/* ==========================================================
   53. IMAGE SETTINGS
========================================================== */

function initImages() {

    document
        .querySelectorAll(
            "img"
        )
        .forEach(img => {

            img.draggable =
                false;

        });

}


/* ==========================================================
   54. BASIC WEBSITE PROTECTION
========================================================== */

function initBasicProtection() {

    document.addEventListener(
        "dragstart",
        event => {

            if (
                event.target.tagName ===
                "IMG"
            ) {

                event.preventDefault();

            }

        }
    );

}


/* ==========================================================
   55. KEYBOARD ESC
========================================================== */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMobileMenu();

                closeStoryReader();

            }

        }
    );

}


/* ==========================================================
   56. ERROR LOGGER
========================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "❌ Website JS Error:",
            event.message
        );

    }
);


/* ==========================================================
   57. MAIN INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🌹 Adarsh Raj Shayar Starting..."
        );

        /* CORE */

        initLoader();

        initCurrentYear();

        initWelcomePopup();

        initTheme();

        initMobileMenu();

        initSmoothNavigation();

        initSearch();

        initProgressBar();

        initBackToTop();

        initActiveNavigation();


        /* CONTENT */

        loadAllShayari();

        loadPublishedShayari();

        loadStories();

        loadFavourite();


        /* ADMIN */

        initAdmin();

        initShayariPublishButtons();

        initStoryPublishButton();

        initStoryEvents();

        initAdminContentEvents();


        /* ACTIONS */

        initCardActions();


        /* CONTACT */

        initContactForm();


        /* QR */

        initQR();


        /* OTHER */

        initCopyWebsiteLink();

        initVisitorCounter();

        initSEO();

        initImages();

        initBasicProtection();

        initEscapeKey();

        createStoryReader();

        updateStatistics();


        console.log(
            "================================"
        );

        console.log(
            "🌹 Adarsh Raj Shayar"
        );

        console.log(
            "🚀 Version:",
            ARS_CONFIG.VERSION
        );

        console.log(
            "👨‍💻 Author:",
            ARS_CONFIG.AUTHOR
        );

        console.log(
            "📖 Stories:",
            stories.length
        );

        console.log(
            "📚 Shayari:",
            getAllShayari().length
        );

        console.log(
            "================================"
        );

    }
);


/* ==========================================================
   58. PAGE SHOW
========================================================== */

window.addEventListener(
    "pageshow",
    () => {

        loadAllShayari();

        loadPublishedShayari();

        loadStories();

        loadFavourite();

        restoreShayariButtons();

        updateStatistics();

    }
);


/* ==========================================================
   END
========================================================== */

console.log(
    "✅ Clean Professional script.js Loaded"
);

