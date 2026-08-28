/* =========================================================
  ADARSH RAJ SHAYAR
  ARS OFFICIAL WEBSITE
   MAIN SCRIPT
   Version 3.0
   script.js — FINAL CORE VERSION
  ========================================================= */

"use strict";


/* =========================================================
   GLOBAL HELPERS
   GLOBAL ARS OBJECT
  ========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];
window.ARS = window.ARS || {};

const escapeHTML = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
const CONFIG = window.ARS_CONFIG || {};

const safeText = (value = "") =>
  String(value).trim();

function showToast(message, type = "info") {
  let toast = $("#arsToast");
/* =========================================================
   DOM READY
   ========================================================= */

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "arsToast";
    toast.className = "ars-toast";
    document.body.appendChild(toast);
  }
document.addEventListener("DOMContentLoaded", () => {

  toast.textContent = message;
  toast.dataset.type = type;
  toast.classList.add("show");
  initLoader();
  initHeader();
  initMobileMenu();
  initTheme();
  initProgressBar();
  initBackToTop();
  initWelcomePopup();
  initCounters();
  initScrollReveal();
  initNavigation();
  initSearch();
  initContentSections();
  initCertificateLinks();
  initJoiningLinks();
  initContactForm();

  clearTimeout(window.__arsToastTimer);
  console.log("🌹 ARS Official Website Loaded");

  window.__arsToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
});


/* =========================================================
   WEBSITE LOADER
   LOADER
  ========================================================= */

function initLoader() {
  const loader =
    $("#loader") ||
    $(".loader") ||
    $(".loading-screen");

  const loader = document.getElementById("loader");

if (!loader) return;

window.addEventListener("load", () => {

setTimeout(() => {
      loader.classList.add("hide");

      loader.classList.add("hidden");

setTimeout(() => {
loader.style.display = "none";
}, 500);

}, 500);

});

}


/* =========================================================
   HEADER
   ========================================================= */

function initHeader() {

  const header = document.querySelector("header");

  if (!header) return;

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  });

}


@@ -79,118 +98,75 @@ function initLoader() {
  ========================================================= */

function initMobileMenu() {

const menuButton =
    $("#menuToggle") ||
    $(".menu-toggle") ||
    $("[data-menu-toggle]");
    document.querySelector(
      "#menuToggle, .menu-toggle, .hamburger"
    );

const nav =
    $("#mainNav") ||
    $(".main-nav") ||
    $("nav");
    document.querySelector(
      "#mainNav, .main-nav, nav"
    );

if (!menuButton || !nav) return;

menuButton.addEventListener("click", () => {

nav.classList.toggle("active");
menuButton.classList.toggle("active");
  });

  $$(".nav-link, nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuButton.classList.remove("active");
    });
});
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {
  $$("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = $(id);
  nav.querySelectorAll("a").forEach(link => {

      if (!target) return;
    link.addEventListener("click", () => {

      event.preventDefault();
      nav.classList.remove("active");
      menuButton.classList.remove("active");

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
});

});

}


/* =========================================================
   ACTIVE NAVIGATION
   THEME
  ========================================================= */

function initActiveNavigation() {
  const sections = $$("section[id], main [id]");
  const links = $$("nav a[href^='#']");
function initTheme() {

  if (!sections.length || !links.length) return;
  const button =
    document.getElementById("themeToggle");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
  if (!button) return;

        links.forEach(link => {
          link.classList.remove("active");
  const savedTheme =
    localStorage.getItem("ARS_THEME");

          if (
            link.getAttribute("href") ===
            `#${entry.target.id}`
          ) {
            link.classList.add("active");
          }
        });
      });
    },
    {
      threshold: 0.25
    }
  );
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  sections.forEach(section => observer.observe(section));
}
  button.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

/* =========================================================
   BACK TO TOP
   ========================================================= */
    const dark =
      document.body.classList.contains("dark-mode");

function initBackToTop() {
  const button =
    $("#backToTop") ||
    $(".back-to-top");
    localStorage.setItem(
      "ARS_THEME",
      dark ? "dark" : "light"
    );

  if (!button) return;
    button.innerHTML =
      dark ? "☀️" : "🌙";

  window.addEventListener("scroll", () => {
    button.classList.toggle(
      "show",
      window.scrollY > 400
    );
});

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


@@ -199,61 +175,64 @@ function initBackToTop() {
  ========================================================= */

function initProgressBar() {
  const bar =
    $("#progressBar") ||
    $(".progress-bar");

  let bar =
    document.getElementById("progressBar");

if (!bar) return;

window.addEventListener("scroll", () => {

    const scrollTop =
      window.scrollY;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

    const progress =
    const percentage =
height > 0
        ? (window.scrollY / height) * 100
        ? (scrollTop / height) * 100
: 0;

    bar.style.width = `${progress}%`;
    bar.style.width =
      percentage + "%";

});

}


/* =========================================================
   DARK MODE
   BACK TO TOP
  ========================================================= */

function initTheme() {
function initBackToTop() {

const button =
    $("#themeToggle") ||
    $(".theme-toggle") ||
    $("[data-theme-toggle]");
    document.getElementById("backToTop");

  const saved =
    localStorage.getItem("ARS_THEME");
  if (!button) return;

  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
  window.addEventListener("scroll", () => {

  if (!button) return;
    if (window.scrollY > 400) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }

  });

button.addEventListener("click", () => {
    const dark =
      document.body.classList.toggle("dark-mode");

    localStorage.setItem(
      "ARS_THEME",
      dark ? "dark" : "light"
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    showToast(
      dark
        ? "🌙 Dark Mode ON"
        : "☀️ Light Mode ON"
    );
});

}


@@ -262,1262 +241,1184 @@ function initTheme() {
  ========================================================= */

function initWelcomePopup() {

const popup =
    $("#welcomePopup") ||
    $(".welcome-popup");
    document.getElementById("welcomePopup");

if (!popup) return;

const close =
    popup.querySelector(".popup-close") ||
    popup.querySelector("[data-close]");
    popup.querySelector(
      ".popup-close, #closePopup"
    );

  const alreadyShown =
  const seen =
sessionStorage.getItem(
"ARS_WELCOME_SHOWN"
);

  if (!alreadyShown) {
  if (!seen) {

setTimeout(() => {

popup.classList.add("show");
    }, 1200);

    }, 1000);

}

if (close) {

close.addEventListener("click", () => {

popup.classList.remove("show");

sessionStorage.setItem(
"ARS_WELCOME_SHOWN",
"true"
);

});

}

  popup.addEventListener("click", event => {
    if (event.target === popup) {
      popup.classList.remove("show");
    }
  });
}


/* =========================================================
   SHAYARI DATABASE
   SMOOTH NAVIGATION
  ========================================================= */

function getShayariDatabase() {
  if (
    window.ARS_SHAYARI &&
    Array.isArray(window.ARS_SHAYARI.data)
  ) {
    return window.ARS_SHAYARI.data;
  }
function initNavigation() {

  return [];
}
  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener("click", function (event) {

/* =========================================================
   STORY DATABASE
   ========================================================= */
      const targetId =
        this.getAttribute("href");

function getStoryDatabase() {
  if (
    window.ARS_STORIES &&
    Array.isArray(window.ARS_STORIES.data)
  ) {
    return window.ARS_STORIES.data;
  }
      if (
        !targetId ||
        targetId === "#"
      ) return;

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

  return [];
}


/* =========================================================
   SHAYARI CARD
   COUNTERS
  ========================================================= */

function createShayariCard(item) {
  return `
    <article class="shayari-card"
      data-id="${escapeHTML(item.id)}">

      <span class="content-category">
        ${escapeHTML(item.category || "Shayari")}
      </span>

      <h3>${escapeHTML(item.title)}</h3>
function initCounters() {

      <p class="shayari-text">
        ${escapeHTML(item.text).replace(/\n/g, "<br>")}
      </p>
  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );

      <div class="content-footer">
        <span>✍️ ${escapeHTML(item.author)}</span>
  if (!counters.length) return;

        <button
          class="copy-btn"
          data-copy="${escapeHTML(item.text)}">
          📋 Copy
        </button>
      </div>
  const observer =
    new IntersectionObserver(
      entries => {

    </article>
  `;
}
        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

/* =========================================================
   STORY CARD
   ========================================================= */
          const element =
            entry.target;

function createStoryCard(item) {
  return `
    <article class="story-card"
      data-id="${escapeHTML(item.id)}">
          const target =
            Number(
              element.dataset.counter
            ) || 0;

      <span class="content-category">
        ${escapeHTML(item.category || "Story")}
      </span>
          animateCounter(
            element,
            target
          );

      <h3>${escapeHTML(item.title)}</h3>
          observer.unobserve(element);

      <p>
        ${escapeHTML(item.text)
          .substring(0, 180)
          .replace(/\n/g, " ")}
        ${item.text.length > 180 ? "..." : ""}
      </p>
        });

      <div class="content-footer">
        <span>✍️ ${escapeHTML(item.author)}</span>
      },
      { threshold: 0.5 }
    );

        <button
          class="read-story-btn"
          data-story-id="${escapeHTML(item.id)}">
          Read More →
        </button>
      </div>
  counters.forEach(counter => {
    observer.observe(counter);
  });

    </article>
  `;
}


/* =========================================================
   RENDER SHAYARI
   ========================================================= */
function animateCounter(element, target) {

function renderShayari(list, container) {
  if (!container) return;
  let current = 0;

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div>🌹</div>
        <h3>कोई Shayari नहीं मिली</h3>
        <p>कृपया दूसरी category या search करें।</p>
      </div>
    `;
    return;
  }
  const duration = 1200;
  const start = performance.now();

  container.innerHTML =
    list.map(createShayariCard).join("");
  function update(time) {

  bindCopyButtons();
}
    const progress =
      Math.min(
        (time - start) / duration,
        1
      );

    current =
      Math.floor(
        progress * target
      );

/* =========================================================
   RENDER STORIES
   ========================================================= */
    element.textContent =
      current.toLocaleString("en-IN");

function renderStories(list, container) {
  if (!container) return;
    if (progress < 1) {
      requestAnimationFrame(update);
    }

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div>📚</div>
        <h3>कोई Story नहीं मिली</h3>
      </div>
    `;
    return;
}

  container.innerHTML =
    list.map(createStoryCard).join("");
  requestAnimationFrame(update);

  bindStoryButtons();
}


/* =========================================================
   SHAYARI SECTION
   SCROLL REVEAL
  ========================================================= */

function initShayariSection() {
  const database = getShayariDatabase();

  const container =
    $("#shayariContainer") ||
    $("#shayariGrid") ||
    $(".shayari-grid");
function initScrollReveal() {

  if (!container) return;
  const elements =
    document.querySelectorAll(
      ".reveal, .animate-on-scroll"
    );

  const search =
    $("#shayariSearch") ||
    "[data-shayari-search]";
  if (!elements.length) return;

  const category =
    $("#shayariCategory") ||
    "[data-shayari-category]";
  const observer =
    new IntersectionObserver(
      entries => {

  const searchInput =
    typeof search === "string"
      ? $(search)
      : search;
        entries.forEach(entry => {

  const categorySelect =
    typeof category === "string"
      ? $(category)
      : category;
          if (entry.isIntersecting) {

  function update() {
    let result = [...database];
            entry.target.classList.add(
              "visible"
            );

    const query =
      searchInput?.value
        ?.trim()
        .toLowerCase() || "";

    const selected =
      categorySelect?.value || "All";

    if (selected !== "All") {
      result = result.filter(
        item =>
          String(item.category)
            .toLowerCase() ===
          selected.toLowerCase()
      );
    }
            observer.unobserve(
              entry.target
            );

    if (query) {
      result = result.filter(item =>
        `${item.title} ${item.text} ${item.author} ${item.category}`
          .toLowerCase()
          .includes(query)
      );
    }
          }

    renderShayari(result, container);
  }
        });

  searchInput?.addEventListener(
    "input",
    update
  );
      },
      {
        threshold: 0.12
      }
    );

  categorySelect?.addEventListener(
    "change",
    update
  );
  elements.forEach(element => {
    observer.observe(element);
  });

  update();
}


/* =========================================================
   STORY SECTION
   SEARCH SYSTEM
  ========================================================= */

function initStorySection() {
  const database = getStoryDatabase();
function initSearch() {

  const container =
    $("#storyContainer") ||
    $("#storiesContainer") ||
    $("#storyGrid") ||
    $(".story-grid");
  const input =
    document.getElementById("searchInput");

  if (!container) return;
  const button =
    document.getElementById("searchButton");

  const search =
    $("#storySearch") ||
    "[data-story-search]";
  if (!input) return;

  const category =
    $("#storyCategory") ||
    "[data-story-category]";
  function performSearch() {

  const searchInput =
    typeof search === "string"
      ? $(search)
      : search;
    const query =
      input.value.trim();

    if (!query) {

  const categorySelect =
    typeof category === "string"
      ? $(category)
      : category;
      showToast(
        "कृपया कुछ खोजें।",
        "warning"
      );

  function update() {
    let result = [...database];
      return;

    const query =
      searchInput?.value
        ?.trim()
        .toLowerCase() || "";

    const selected =
      categorySelect?.value || "All";

    if (selected !== "All") {
      result = result.filter(
        item =>
          String(item.category)
            .toLowerCase() ===
          selected.toLowerCase()
    }

    let results = [];

    if (
      window.ARS_SHAYARI &&
      typeof window.ARS_SHAYARI.search ===
        "function"
    ) {

      results.push(
        ...window.ARS_SHAYARI.search(query)
);

}

    if (query) {
      result = result.filter(item =>
        `${item.title} ${item.text} ${item.author} ${item.category}`
          .toLowerCase()
          .includes(query)
    if (
      window.ARS_STORIES &&
      typeof window.ARS_STORIES.search ===
        "function"
    ) {

      results.push(
        ...window.ARS_STORIES.search(query)
);

}

    renderStories(result, container);
    renderSearchResults(
      results,
      query
    );

}

  searchInput?.addEventListener(
    "input",
    update
  );
  if (button) {
    button.addEventListener(
      "click",
      performSearch
    );
  }

  categorySelect?.addEventListener(
    "change",
    update
  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        performSearch();
      }

    }
);

  update();
}


/* =========================================================
   COPY SHAYARI
   SEARCH RESULTS
  ========================================================= */

function bindCopyButtons() {
  $$(".copy-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const text =
        button.dataset.copy || "";
function renderSearchResults(
  results,
  query
) {

      try {
        await navigator.clipboard.writeText(text);
  const container =
    document.getElementById(
      "searchResults"
    );

        showToast(
          "📋 Shayari copied!",
          "success"
        );
      } catch {
        showToast(
          "Copy नहीं हो पाया।",
          "error"
        );
      }
    });
  });
}
  if (!container) {

    showToast(
      `${results.length} परिणाम मिले।`,
      "success"
    );

    return;

/* =========================================================
   STORY MODAL
   ========================================================= */
  }

  container.innerHTML = "";

function openStoryModal(story) {
  if (!story) return;
  if (!results.length) {

  let modal = $("#storyModal");
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔎</div>
        <h3>कोई परिणाम नहीं मिला</h3>
        <p>"${escapeHTML(query)}" के लिए
        कोई सामग्री नहीं मिली।</p>
      </div>
    `;

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "storyModal";
    modal.className = "content-modal";
    return;

    document.body.appendChild(modal);
}

  modal.innerHTML = `
    <div class="content-modal-box">
  results.forEach(item => {

    const card =
      document.createElement("article");

      <button class="modal-close"
        aria-label="Close">
        ×
      </button>
    card.className =
      "content-card search-result-card";

    card.innerHTML = `
     <span class="content-category">
        ${escapeHTML(story.category)}
        ${escapeHTML(
          item.category || "Content"
        )}
     </span>

      <h2>${escapeHTML(story.title)}</h2>

      <div class="modal-content-text">
        ${escapeHTML(story.text)
          .replace(/\n/g, "<br>")}
      </div>
      <h3>
        ${escapeHTML(
          item.title || "Untitled"
        )}
      </h3>

      <div class="modal-author">
        ✍️ ${escapeHTML(story.author)}
      </div>
      <p>
        ${escapeHTML(
          item.text || ""
        ).replace(/\n/g, "<br>")}
      </p>

    </div>
  `;
      <small>
        ✍️ ${escapeHTML(
          item.author || "Adarsh Raj"
        )}
      </small>
    `;

  modal.classList.add("show");
    container.appendChild(card);

  modal
    .querySelector(".modal-close")
    ?.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });

  modal.addEventListener(
    "click",
    event => {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    },
    { once: true }
  );
}


function bindStoryButtons() {
  $$(".read-story-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id =
        button.dataset.storyId;
/* =========================================================
   CONTENT SECTIONS
   ========================================================= */

      const story =
        window.ARS_STORIES?.getById
          ? window.ARS_STORIES.getById(id)
          : getStoryDatabase().find(
              item => item.id === id
            );
function initContentSections() {

  renderShayariCategories();
  renderStoryCategories();
  renderHomeContent();

      openStoryModal(story);
    });
  });
}


/* =========================================================
   CONTENT STATISTICS
   SHAYARI CATEGORY RENDER
  ========================================================= */

function initStatistics() {
  const shayari =
    getShayariDatabase();

  const stories =
    getStoryDatabase();

  const stats = {
    shayari: shayari.length,
    stories: stories.filter(
      item => item.type !== "Poem"
    ).length,
    poems: stories.filter(
      item => item.type === "Poem"
    ).length,
    total:
      shayari.length + stories.length
  };
function renderShayariCategories() {

  const mappings = {
    shayariCount: stats.shayari,
    storyCount: stats.stories,
    poemCount: stats.poems,
    totalContent: stats.total
  };
  const container =
    document.getElementById(
      "shayariContainer"
    );

  Object.entries(mappings).forEach(
    ([id, value]) => {
      const element = $(`#${id}`);
  if (!container) return;

      if (element) {
        element.textContent = value;
      }
    }
  );
  if (
    !window.ARS_SHAYARI ||
    !Array.isArray(
      window.ARS_SHAYARI.data
    )
  ) {

  $$("[data-stat]").forEach(element => {
    const key = element.dataset.stat;
    container.innerHTML =
      emptyContent("Shayari");

    return;

  }

  renderCards(
    container,
    window.ARS_SHAYARI.data
  );

    if (key in stats) {
      element.textContent = stats[key];
    }
  });
}


/* =========================================================
   FAVOURITES
   STORY CATEGORY RENDER
  ========================================================= */

function getFavourites() {
  try {
    return JSON.parse(
      localStorage.getItem(
        "ARS_FAVOURITES"
      ) || "[]"
function renderStoryCategories() {

  const container =
    document.getElementById(
      "storyContainer"
);
  } catch {
    return [];
  }
}

  if (!container) return;

function saveFavourites(list) {
  localStorage.setItem(
    "ARS_FAVOURITES",
    JSON.stringify(list)
  if (
    !window.ARS_STORIES ||
    !Array.isArray(
      window.ARS_STORIES.data
    )
  ) {

    container.innerHTML =
      emptyContent("Stories");

    return;

  }

  renderCards(
    container,
    window.ARS_STORIES.data
);

}


function toggleFavourite(id) {
  let list = getFavourites();
/* =========================================================
   HOME CONTENT
   ========================================================= */

  if (list.includes(id)) {
    list = list.filter(item => item !== id);
function renderHomeContent() {

    showToast(
      "💔 Favourite से हटाया गया।"
  const container =
    document.getElementById(
      "featuredContent"
);
  } else {
    list.push(id);

    showToast(
      "❤️ Favourite में जोड़ा गया।",
      "success"
  if (!container) return;

  let content = [];

  if (
    window.ARS_SHAYARI &&
    Array.isArray(
      window.ARS_SHAYARI.data
    )
  ) {

    content.push(
      ...window.ARS_SHAYARI.data.slice(0, 3)
);
  }

  saveFavourites(list);
  }

  return list;
}
  if (
    window.ARS_STORIES &&
    Array.isArray(
      window.ARS_STORIES.data
    )
  ) {

    content.push(
      ...window.ARS_STORIES.data.slice(0, 3)
    );

function initFavouriteButtons() {
  $$("[data-favourite]").forEach(button => {
    button.addEventListener("click", () => {
      const id =
        button.dataset.favourite;
  }

      const list =
        toggleFavourite(id);
  renderCards(
    container,
    content
  );

      button.classList.toggle(
        "active",
        list.includes(id)
      );
    });
  });
}


/* =========================================================
   JOIN ARS NAVIGATION
   GENERIC CARD RENDER
  ========================================================= */

function initJoiningButtons() {
  $$(
    "[data-join-ars], #joinARS, .join-ars-btn"
  ).forEach(button => {
    button.addEventListener("click", () => {
      const page =
        button.dataset.page ||
        "joining.html";
function renderCards(
  container,
  items
) {

      window.location.href = page;
    });
  });
}
  container.innerHTML = "";

  if (!items.length) {

/* =========================================================
   CERTIFICATE NAVIGATION
   ========================================================= */
    container.innerHTML =
      emptyContent();

function initCertificateButtons() {
    return;

  $$(
    "[data-certificate], .certificate-btn"
  ).forEach(button => {
    button.addEventListener("click", () => {
  }

      const page =
        button.dataset.page ||
        "certificate.html";
  items.forEach(item => {

      window.location.href = page;
    const card =
      document.createElement("article");

    });
  });
    card.className =
      "content-card";

    card.innerHTML = `

  $$(
    "[data-certificate-verify], .verify-certificate-btn"
  ).forEach(button => {
    button.addEventListener("click", () => {
      <div class="card-top">

        <span class="content-category">
          ${escapeHTML(
            item.category || "Content"
          )}
        </span>

      const page =
        button.dataset.page ||
        "verify.html";
      </div>

      window.location.href = page;
      <h3>
        ${escapeHTML(
          item.title || "Untitled"
        )}
      </h3>

      <p>
        ${escapeHTML(
          item.text || ""
        ).replace(/\n/g, "<br>")}
      </p>

      <div class="card-footer">

        <span>
          ✍️ ${escapeHTML(
            item.author || "Adarsh Raj"
          )}
        </span>

        <button
          type="button"
          class="copy-content"
          data-copy="${escapeAttribute(
            item.text || ""
          )}"
        >
          📋 Copy
        </button>

      </div>

    `;

    container.appendChild(card);

    });
});

  initCopyButtons();

}


/* =========================================================
   CERTIFICATE STATUS DISPLAY
   COPY CONTENT
  ========================================================= */

function checkCertificateFromURL() {
  if (!window.ARS_CERTIFICATES) return;
function initCopyButtons() {

  const params =
    new URLSearchParams(
      window.location.search
    );
  document
    .querySelectorAll(".copy-content")
    .forEach(button => {

  const certificate =
    params.get("certificate") ||
    params.get("id") ||
    params.get("verify");
      if (button.dataset.ready === "true") {
        return;
      }

  if (!certificate) return;
      button.dataset.ready = "true";

  const result =
    window.ARS_CERTIFICATES.verify(
      certificate
    );
      button.addEventListener(
        "click",
        async () => {

  const box =
    $("#certificateResult");
          const text =
            button.dataset.copy || "";

  if (!box) return;
          try {

  if (!result.verified) {
    box.innerHTML = `
      <div class="verification-error">
        <h3>❌ Certificate Verified नहीं है</h3>
        <p>
          यह certificate अभी Valid नहीं है
          या database में नहीं मिला।
        </p>
      </div>
    `;
            await navigator.clipboard.writeText(
              text
            );

    return;
  }
            showToast(
              "सामग्री कॉपी हो गई।",
              "success"
            );

  const data =
    result.certificate;
          } catch {

  box.innerHTML = `
    <div class="verification-success">
            showToast(
              "कॉपी नहीं हो सकी।",
              "error"
            );

      <div class="verify-icon">✓</div>
          }

      <h3>Certificate Verified</h3>
        }
      );

      <p><strong>Name:</strong>
        ${escapeHTML(data.name)}
      </p>
    });

      <p><strong>Certificate No:</strong>
        ${escapeHTML(data.certificateNo)}
      </p>
}

      <p><strong>Type:</strong>
        ${escapeHTML(data.type)}
      </p>

      <p><strong>Issue Date:</strong>
        ${escapeHTML(data.issueDate)}
      </p>
/* =========================================================
   CERTIFICATE LINKS
   ========================================================= */

      <p><strong>Status:</strong>
        ${escapeHTML(data.status)}
      </p>
function initCertificateLinks() {

  document.querySelectorAll(
    "[data-certificate-link]"
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const page =
          button.dataset.certificateLink ||
          "certificate.html";

        window.location.href = page;

      }
    );

  });

    </div>
  `;
}


/* =========================================================
   CERTIFICATE VERIFY FORM
   JOIN ARS LINKS
  ========================================================= */

function initCertificateVerification() {
  const form =
    $("#certificateVerifyForm") ||
    $("#verifyCertificateForm");
function initJoiningLinks() {

  if (!form) return;
  document.querySelectorAll(
    "[data-joining-link]"
  ).forEach(button => {

  const input =
    $("#certificateNumber", form) ||
    $("#verifyInput", form) ||
    $("input", form);
    button.addEventListener(
      "click",
      () => {

  const result =
    $("#certificateResult");
        const page =
          button.dataset.joiningLink ||
          "joining.html";

  form.addEventListener("submit", event => {
    event.preventDefault();
        window.location.href = page;

    if (!input) return;
      }
    );

    const value =
      safeText(input.value);
  });

    if (!value) {
      showToast(
        "Certificate Number या ID डालें।",
        "error"
      );
      return;
    }
}

    if (!window.ARS_CERTIFICATES) {
      showToast(
        "Certificate system load नहीं हुआ।",
        "error"
      );
      return;
    }

    const verification =
      window.ARS_CERTIFICATES.verify(
        value
      );
/* =========================================================
   JOINING APPLICATION STORAGE
   ========================================================= */

    if (!result) return;
function saveJoiningApplication(
  application
) {

    if (!verification.verified) {
      result.innerHTML = `
        <div class="verification-error">
          <div class="verify-icon">✕</div>
          <h3>Certificate Not Found</h3>
          <p>
            यह certificate अभी तक approved/valid नहीं है
            या Certificate ID गलत है।
          </p>
        </div>
      `;
  const key =
    "ARS_JOINING_APPLICATIONS";

      return;
    }
  let applications = [];

    const data =
      verification.certificate;
  try {

    result.innerHTML = `
      <div class="verification-success">
    applications =
      JSON.parse(
        localStorage.getItem(key)
      ) || [];

        <div class="verify-icon">✓</div>
  } catch {

        <h3>Certificate Verified Successfully</h3>
    applications = [];

        <div class="certificate-details">
  }

          <p>
            <strong>Certificate No:</strong>
            ${escapeHTML(data.certificateNo)}
          </p>
  const id =
    "ARS-JOIN-" +
    Date.now().toString(36).toUpperCase();

          <p>
            <strong>Certificate ID:</strong>
            ${escapeHTML(data.uniqueId)}
          </p>
  const record = {

          <p>
            <strong>Name:</strong>
            ${escapeHTML(data.name)}
          </p>
    id,

          <p>
            <strong>Type:</strong>
            ${escapeHTML(data.type)}
          </p>
    name:
      String(
        application.name || ""
      ).trim(),

          <p>
            <strong>Issue Date:</strong>
            ${escapeHTML(data.issueDate)}
          </p>
    email:
      String(
        application.email || ""
      ).trim(),

          <p>
            <strong>Status:</strong>
            ${escapeHTML(data.status)}
          </p>
    mobile:
      String(
        application.mobile || ""
      ).trim(),

        </div>
    role:
      String(
        application.role || ""
      ).trim(),

    message:
      String(
        application.message || ""
      ).trim(),

    status:
      "Pending",

    createdAt:
      new Date().toISOString()

  };

  applications.push(record);

  localStorage.setItem(
    key,
    JSON.stringify(applications)
  );

  return record;

      </div>
    `;
  });
}


/* =========================================================
   CERTIFICATE GENERATION
   JOINING FORM
  ========================================================= */

function initCertificateGeneration() {
function initJoiningForm() {

const form =
    $("#certificateForm") ||
    $("#generateCertificateForm");
    document.getElementById(
      "joiningForm"
    );

if (!form) return;

  form.addEventListener("submit", event => {
  form.addEventListener(
    "submit",
    event => {

    event.preventDefault();
      event.preventDefault();

    if (!window.ARS_CERTIFICATES) {
      showToast(
        "Certificate system load नहीं हुआ।",
        "error"
      );
      return;
    }
      const formData =
        new FormData(form);

    const name =
      safeText(
        form.querySelector(
          "[name='name']"
        )?.value
      );
      const application =
        saveJoiningApplication({

    const type =
      safeText(
        form.querySelector(
          "[name='type']"
        )?.value
      );
          name:
            formData.get("name"),

    if (!name) {
      showToast(
        "Name डालना जरूरी है।",
        "error"
      );
      return;
    }
          email:
            formData.get("email"),

    if (!type) {
      showToast(
        "Certificate Type चुनें।",
        "error"
      );
      return;
    }
          mobile:
            formData.get("mobile"),

          role:
            formData.get("role"),

    try {
          message:
            formData.get("message")

      const certificate =
        window.ARS_CERTIFICATES.create({
          name,
          type
});

showToast(
        "🏆 Certificate successfully generated!",
        `Application submitted: ${application.id}`,
"success"
);

      displayGeneratedCertificate(
        certificate
      );
      form.reset();

    } catch (error) {
    }
  );

      showToast(
        error.message ||
        "Certificate generate नहीं हुआ।",
        "error"
      );
}

    }

  });
/* =========================================================
   CONTACT FORM
   ========================================================= */

}
function initContactForm() {

  const form =
    document.getElementById(
      "contactForm"
    );

function displayGeneratedCertificate(
  certificate
) {
  if (!form) return;

  const box =
    $("#generatedCertificate") ||
    $("#certificatePreview");
  form.addEventListener(
    "submit",
    event => {

  if (!box) return;
      event.preventDefault();

  box.innerHTML = `
      const name =
        form.querySelector(
          '[name="name"]'
        )?.value.trim();

    <div class="certificate-preview-card">
      const email =
        form.querySelector(
          '[name="email"]'
        )?.value.trim();

      <div class="certificate-border">
      const message =
        form.querySelector(
          '[name="message"]'
        )?.value.trim();

        <img
          src="logo.png"
          alt="ARS Logo"
          class="certificate-logo"
          onerror="this.style.display='none'"
        >
      if (!name || !email || !message) {

        <p class="certificate-small">
          ADARSH RAJ SHAYAR
        </p>
        showToast(
          "कृपया सभी आवश्यक जानकारी भरें।",
          "warning"
        );

        <h1>CERTIFICATE</h1>
        return;

        <p class="certificate-subtitle">
          ${escapeHTML(certificate.type)}
        </p>
      }

        <p>This certificate is proudly presented to</p>
      /*
       * EmailJS configured होने पर
       * यहाँ EmailJS भेजा जा सकता है।
       */

        <h2>
          ${escapeHTML(certificate.name)}
        </h2>
      if (
        typeof emailjs !== "undefined" &&
        CONFIG.email &&
        CONFIG.email.enabled &&
        !String(
          CONFIG.email.publicKey || ""
        ).startsWith("YOUR_")
      ) {

        <p>
          Certificate No:
          <strong>
            ${escapeHTML(
              certificate.certificateNo
            )}
          </strong>
        </p>
        try {

          emailjs.send(
            CONFIG.email.serviceId,
            CONFIG.email.templateId,
            {
              name,
              email,
              message
            }
          ).then(() => {

            showToast(
              "आपका संदेश भेज दिया गया।",
              "success"
            );

        <p>
          Certificate ID:
          <strong>
            ${escapeHTML(
              certificate.uniqueId
            )}
          </strong>
        </p>
            form.reset();

        <p>
          Issue Date:
          ${escapeHTML(
            certificate.issueDate
          )}
        </p>
          }).catch(() => {

        <div class="certificate-signature">
          <span>Adarsh Raj</span>
          <small>Founder & Author</small>
        </div>
            showToast(
              "संदेश भेजने में समस्या हुई।",
              "error"
            );

        <div class="certificate-actions">
          });

          <button
            type="button"
            onclick="window.print()">
            🖨️ Print Certificate
          </button>
          return;

          <button
            type="button"
            onclick="window.location.href='verify.html?id=${encodeURIComponent(
              certificate.uniqueId
            )}'">
            🔎 Verify Certificate
          </button>
        } catch {

        </div>
          // fallback below

      </div>
        }

    </div>
      }

  `;
      showToast(
        "संदेश तैयार है। EmailJS configuration जोड़ने के बाद यह सीधे भेजा जा सकता है।",
        "info"
      );

      form.reset();

    }
  );

  box.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================================
   BUSINESS CERTIFICATE FIELDS
   FAVOURITE SYSTEM
  ========================================================= */

function initCertificateTypeFields() {

  const type =
    $("#certificateType") ||
    $("select[name='type']");

  if (!type) return;
function getFavourites() {

  const businessFields =
    $("#businessFields");
  try {

  function update() {
    return JSON.parse(
      localStorage.getItem(
        "ARS_FAVOURITES"
      )
    ) || [];

    if (!businessFields) return;
  } catch {

    businessFields.style.display =
      type.value === "Business"
        ? "block"
        : "none";
    return [];

}

  type.addEventListener(
    "change",
    update
  );

  update();
}


/* =========================================================
   ARS JOINING FORM
   ========================================================= */
function toggleFavourite(id) {

function initJoiningForm() {
  if (!id) return false;

  const form =
    $("#joiningForm") ||
    $("#arsJoiningForm");
  let favourites =
    getFavourites();

  if (!form) return;
  if (favourites.includes(id)) {

  form.addEventListener(
    "submit",
    event => {
    favourites =
      favourites.filter(
        item => item !== id
      );

      event.preventDefault();
    localStorage.setItem(
      "ARS_FAVOURITES",
      JSON.stringify(favourites)
    );

    return false;

  }

      const formData =
        new FormData(form);
  favourites.push(id);

      const application = {
  localStorage.setItem(
    "ARS_FAVOURITES",
    JSON.stringify(favourites)
  );

        id:
          `ARS-JOIN-${Date.now()}`,
  return true;

        name:
          safeText(
            formData.get("name")
          ),
}

        email:
          safeText(
            formData.get("email")
          ),

        mobile:
          safeText(
            formData.get("mobile")
          ),
/* =========================================================
   LIKE SYSTEM
   ========================================================= */

        role:
          safeText(
            formData.get("role")
          ),
function toggleLike(id) {

        message:
          safeText(
            formData.get("message")
          ),
  if (!id) return false;

        status:
          "Pending",
  let likes = {};

        createdAt:
          new Date().toISOString()
  try {

      };
    likes =
      JSON.parse(
        localStorage.getItem(
          "ARS_LIKES"
        )
      ) || {};

      if (!application.name) {
        showToast(
          "Name डालना जरूरी है।",
          "error"
        );
        return;
      }
  } catch {

      if (!application.email) {
        showToast(
          "Email डालना जरूरी है।",
          "error"
        );
        return;
      }
    likes = {};

      let applications = [];
  }

      try {
  likes[id] =
    !Boolean(likes[id]);

        applications =
          JSON.parse(
            localStorage.getItem(
              "ARS_JOINING_APPLICATIONS"
            ) || "[]"
          );
  localStorage.setItem(
    "ARS_LIKES",
    JSON.stringify(likes)
  );

      } catch {
        applications = [];
      }
  return likes[id];

      applications.push(application);
}

      localStorage.setItem(
        "ARS_JOINING_APPLICATIONS",
        JSON.stringify(applications)
      );

      form.reset();
/* =========================================================
   VIEW COUNTER
   ========================================================= */

      showToast(
        "✅ ARS Joining Application भेज दी गई।",
        "success"
      );
function addView(id) {

      const result =
        $("#joiningResult");
  if (!id) return 0;

      if (result) {
  let views = {};

        result.innerHTML = `
          <div class="success-message">
            <h3>Application Submitted 🎉</h3>
  try {

            <p>
              आपका ARS Joining Application
              successfully submit हो गया है।
            </p>
    views =
      JSON.parse(
        localStorage.getItem(
          "ARS_VIEWS"
        )
      ) || {};

            <p>
              <strong>Application ID:</strong>
              ${escapeHTML(application.id)}
            </p>
  } catch {

            <p>
              Status:
              <strong>Pending</strong>
            </p>
    views = {};

            <p>
              Approval के बाद आपको
              आगे की जानकारी दी जाएगी।
            </p>
          </div>
        `;
  }

      }
  views[id] =
    Number(views[id] || 0) + 1;

    }
  localStorage.setItem(
    "ARS_VIEWS",
    JSON.stringify(views)
);

  return views[id];

}


/* =========================================================
   JOINING CERTIFICATE
   CERTIFICATE QUICK VERIFY
  ========================================================= */

function initJoiningCertificate() {

  const button =
    $("#joiningCertificateBtn") ||
    $("[data-joining-certificate]");

  if (!button) return;
function quickVerifyCertificate(value) {

  button.addEventListener("click", () => {
  if (
    !window.ARS_CERTIFICATES ||
    typeof window.ARS_CERTIFICATES.verify !==
      "function"
  ) {

    const id =
      button.dataset.id ||
      $("#certificateId")?.value ||
      "";
    showToast(
      "Certificate system उपलब्ध नहीं है।",
      "error"
    );

    if (!id) {
    return null;

      showToast(
        "Certificate ID डालें।",
        "error"
      );
  }

      return;
    }
  const result =
    window.ARS_CERTIFICATES.verify(
      value
    );

    if (!window.ARS_CERTIFICATES) {
  const resultBox =
    document.getElementById(
      "certificateVerifyResult"
    );

      showToast(
        "Certificate system unavailable।",
        "error"
      );
  if (resultBox) {

      return;
    }
    if (result.verified) {

    const result =
      window.ARS_CERTIFICATES.verify(id);
      resultBox.innerHTML = `
        <div class="verify-success">
          <strong>✅ Certificate Verified</strong>
          <p>
            Certificate No:
            ${escapeHTML(
              result.certificate.certificateNo
            )}
          </p>
          <p>
            Name:
            ${escapeHTML(
              result.certificate.name
            )}
          </p>
          <p>
            Type:
            ${escapeHTML(
              result.certificate.type
            )}
          </p>
          <p>
            Status:
            ${escapeHTML(
              result.status
            )}
          </p>
        </div>
      `;

    if (!result.verified) {
    } else {

      showToast(
        "आपका certificate अभी approve नहीं किया गया है।",
        "error"
      );
      resultBox.innerHTML = `
        <div class="verify-error">
          <strong>❌ Certificate Not Verified</strong>
          <p>
            ${
              result.status === "Not Found"
                ? "Certificate नहीं मिला।"
                : "यह Certificate अभी Valid नहीं है।"
            }
          </p>
        </div>
      `;

      return;
}

    window.location.href =
      `certificate.html?id=${encodeURIComponent(id)}`;
  }

  });
  return result;

}


/* =========================================================
   CONTACT FORM
   CERTIFICATE VERIFY FORM
  ========================================================= */

function initContactForm() {
function initCertificateVerifyForm() {

const form =
    $("#contactForm");
    document.getElementById(
      "certificateVerifyForm"
    );

if (!form) return;

@@ -1527,84 +1428,14 @@ function initContactForm() {

event.preventDefault();

      const name =
        safeText(
          form.querySelector(
            "[name='name']"
          )?.value
        );

      const email =
        safeText(
          form.querySelector(
            "[name='email']"
          )?.value
        );

      const message =
        safeText(
          form.querySelector(
            "[name='message']"
          )?.value
        );

      if (!name || !email || !message) {

        showToast(
          "कृपया सभी जरूरी fields भरें।",
          "error"
        );

        return;
      }

      /*
       * EmailJS details config.js में रखी जाएंगी।
       * Credentials मौजूद होने पर EmailJS इस्तेमाल होगा।
       */

      if (
        window.emailjs &&
        window.ARS_CONFIG?.email?.enabled &&
        window.ARS_CONFIG.email.publicKey &&
        !window.ARS_CONFIG.email.publicKey.startsWith("YOUR_")
      ) {

        emailjs.send(
          window.ARS_CONFIG.email.serviceId,
          window.ARS_CONFIG.email.templateId,
          {
            name,
            email,
            message
          }
        )
        .then(() => {

          form.reset();

          showToast(
            "📩 Message successfully sent!",
            "success"
          );

        })
        .catch(() => {

          showToast(
            "Message send नहीं हो पाया।",
            "error"
          );

        });

      } else {

        showToast(
          "📩 Message तैयार है। EmailJS configuration अभी बाकी है।"
      const input =
        form.querySelector(
          '[name="certificate"]'
);

      }
      quickVerifyCertificate(
        input?.value || ""
      );

}
);
@@ -1613,290 +1444,280 @@ function initContactForm() {


/* =========================================================
   VISITOR COUNTER
   CERTIFICATE JOINING CHECK
  ========================================================= */

function initVisitorCounter() {
function checkJoiningCertificate(
  joiningId
) {

  const elements =
    $$("[data-visitor-count], #visitorCount");
  if (!joiningId) {

  if (!elements.length) return;
    return {
      approved: false,
      certificate: null
    };

  let count =
    parseInt(
      localStorage.getItem(
        "ARS_VISITOR_COUNT"
      ) || "0",
      10
    );
  }

  count++;
  if (
    !window.ARS_CERTIFICATES ||
    typeof window.ARS_CERTIFICATES.getAll !==
      "function"
  ) {

  localStorage.setItem(
    "ARS_VISITOR_COUNT",
    String(count)
  );
    return {
      approved: false,
      certificate: null
    };

  elements.forEach(
    element => {
      element.textContent =
        count.toLocaleString("en-IN");
    }
  );
  }

}
  const certificates =
    window.ARS_CERTIFICATES.getAll();

  const certificate =
    certificates.find(
      item =>
        item.joiningId === joiningId &&
        item.status === "Valid"
    );

/* =========================================================
   CURRENT YEAR
   ========================================================= */
  return {

function initCurrentYear() {
    approved:
      Boolean(certificate),

  $$(
    "#currentYear, [data-current-year]"
  ).forEach(element => {
    element.textContent =
      new Date().getFullYear();
  });
    certificate:
      certificate || null

  };

}


/* =========================================================
   IMAGE FALLBACK
   INIT CERTIFICATE VERIFY
  ========================================================= */

function initImageFallback() {
document.addEventListener(
  "DOMContentLoaded",
  () => {

  $$("img").forEach(image => {
    initCertificateVerifyForm();
    initJoiningForm();

    image.addEventListener(
      "error",
      () => {
  }
);

        if (
          image.dataset.fallbackApplied
        ) return;

        image.dataset.fallbackApplied =
          "true";
/* =========================================================
   TOAST SYSTEM
   ========================================================= */

        if (
          image.classList.contains(
            "profile-image"
          )
        ) {
          image.style.display = "none";
        }
function showToast(
  message,
  type = "info"
) {

      }
  let container =
    document.getElementById(
      "toastContainer"
);

  });

}

  if (!container) {

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
    container =
      document.createElement("div");

function initScrollReveal() {
    container.id =
      "toastContainer";

  const elements =
    $$(".reveal, .animate-on-scroll");
    container.className =
      "toast-container";

  if (!elements.length) return;
    document.body.appendChild(
      container
    );

  const observer =
    new IntersectionObserver(
      entries => {
  }

        entries.forEach(entry => {
  const toast =
    document.createElement("div");

          if (entry.isIntersecting) {
  toast.className =
    `toast toast-${type}`;

            entry.target.classList.add(
              "visible"
            );
  toast.textContent =
    message;

            observer.unobserve(
              entry.target
            );
  container.appendChild(
    toast
  );

          }
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

        });
  setTimeout(() => {

      },
      {
        threshold: 0.12
      }
    toast.classList.remove(
      "show"
);

  elements.forEach(
    element =>
      observer.observe(element)
  );
    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 3500);

}


/* =========================================================
   GLOBAL ESC KEY
   EMPTY CONTENT
  ========================================================= */

function initEscapeKey() {

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") return;

      $$(".show").forEach(element => {

        if (
          element.classList.contains(
            "content-modal"
          ) ||
          element.classList.contains(
            "welcome-popup"
          )
        ) {
          element.classList.remove(
            "show"
          );
        }

      });
function emptyContent(
  name = "Content"
) {

    }
  );
  return `
    <div class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>अभी कोई ${escapeHTML(name)} उपलब्ध नहीं है</h3>
      <p>जल्द ही नई सामग्री जोड़ी जाएगी।</p>
    </div>
  `;

}


/* =========================================================
   ARS GLOBAL WEBSITE API
   HTML SECURITY
  ========================================================= */

window.ARS_WEBSITE = {

  version: "3.0",

  toast:
    showToast,
function escapeHTML(value) {

  getShayari:
    getShayariDatabase,
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  getStories:
    getStoryDatabase,
}

  openStory:
    openStoryModal,

  toggleFavourite:
    toggleFavourite,
function escapeAttribute(value) {

  certificate:
    window.ARS_CERTIFICATES || null
  return escapeHTML(value)
    .replace(/\n/g, "&#10;")
    .replace(/\r/g, "&#13;");

};
}


/* =========================================================
   INITIALIZE WEBSITE
   GLOBAL ARS API
  ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initLoader();

    initMobileMenu();
window.ARS = {

    initSmoothScroll();
  config:
    CONFIG,

    initActiveNavigation();
  toast:
    showToast,

    initBackToTop();
  favourites: {

    initProgressBar();
    get:
      getFavourites,

    initTheme();
    toggle:
      toggleFavourite

    initWelcomePopup();
  },

    initShayariSection();
  likes: {

    initStorySection();
    toggle:
      toggleLike

    initStatistics();
  },

    initFavouriteButtons();
  views: {

    initJoiningButtons();
    add:
      addView

    initCertificateButtons();
  },

    initCertificateVerification();
  certificate: {

    initCertificateGeneration();
    verify:
      quickVerifyCertificate,

    initCertificateTypeFields();
    checkJoining:
      checkJoiningCertificate

    initJoiningForm();
  },

    initJoiningCertificate();
  joining: {

    initContactForm();
    save:
      saveJoiningApplication

    initVisitorCounter();
  },

    initCurrentYear();
  search: {

    initImageFallback();
    run:
      renderSearchResults

    initScrollReveal();
  }

    initEscapeKey();
};

    checkCertificateFromURL();

    console.log(
      "🌹 ARS Official Website Loaded Successfully"
    );
/* =========================================================
   CONSOLE STATUS
   ========================================================= */

  }
console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);

console.log(
  "🌹 ARS OFFICIAL WEBSITE"
);

/* =========================================================
   FINAL STATUS
   ========================================================= */

window.addEventListener(
  "load",
  () => {
console.log(
  "👤 Founder: Adarsh Raj"
);

    console.log(
      "✅ ARS Website Ready"
    );
console.log(
  "📚 Shayari System:",
  window.ARS_SHAYARI
    ? "CONNECTED"
    : "NOT FOUND"
);

    console.log(
      "📚 Shayari:",
      getShayariDatabase().length
    );
console.log(
  "📖 Story System:",
  window.ARS_STORIES
    ? "CONNECTED"
    : "NOT FOUND"
);

    console.log(
      "📖 Stories:",
      getStoryDatabase().length
    );
console.log(
  "🏆 Certificate System:",
  window.ARS_CERTIFICATES
    ? "CONNECTED"
    : "NOT FOUND"
);

  }
console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);
