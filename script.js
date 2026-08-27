# script.js — ARS Official Website

```javascript
/* =========================================================
   ADARSH RAJ SHAYAR
   ARS OFFICIAL WEBSITE
   MAIN WEBSITE SCRIPT
   Version 3.0
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
   ========================================================= */

const ARS_APP = {

  initialized: false,

  currentSection: "home",

  currentShayariCategory: "All",

  currentStoryCategory: "All",

  searchQuery: "",

  favourites: [],

  likes: {},

  views: {},

  theme:
    localStorage.getItem("ARS_THEME") ||
    (window.ARS_CONFIG?.ui?.defaultTheme || "light")

};


/* =========================================================
   DOM HELPER
   ========================================================= */

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function $$(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   TOAST SYSTEM
   ========================================================= */

function showToast(message, type = "success") {

  let toast = document.getElementById("arsToast");

  if (!toast) {

    toast = document.createElement("div");

    toast.id = "arsToast";

    toast.className = "ars-toast";

    document.body.appendChild(toast);

  }

  toast.className =
    `ars-toast ars-toast-${type}`;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toast._timer);

  toast._timer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* =========================================================
   THEME
   ========================================================= */

function applyTheme(theme = ARS_APP.theme) {

  ARS_APP.theme = theme;

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  localStorage.setItem(
    "ARS_THEME",
    theme
  );

  const buttons =
    $$("[data-theme-toggle]");

  buttons.forEach(button => {

    button.textContent =
      theme === "dark"
        ? "☀️"
        : "🌙";

  });

}


function toggleTheme() {

  applyTheme(
    ARS_APP.theme === "dark"
      ? "light"
      : "dark"
  );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showSection(sectionId) {

  const sections =
    $$("main section, .page-section, [data-section]");

  sections.forEach(section => {

    const id =
      section.dataset.section ||
      section.id;

    if (id === sectionId) {

      section.classList.add("active");

      section.removeAttribute("hidden");

    } else {

      section.classList.remove("active");

    }

  });

  ARS_APP.currentSection =
    sectionId;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMobileMenu();

}


function setupNavigation() {

  $$("[data-section-link]").forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      const target =
        link.dataset.sectionLink;

      if (target) {

        showSection(target);

      }

    });

  });


  $$("a[href^='#']").forEach(link => {

    link.addEventListener("click", event => {

      const id =
        link.getAttribute("href")
          .substring(1);

      if (!id) return;

      const target =
        document.getElementById(id);

      if (target) {

        event.preventDefault();

        showSection(id);

      }

    });

  });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

  const nav =
    $(".main-nav, .navbar-menu, #mainNav");

  if (!nav) return;

  nav.classList.toggle("open");

}


function closeMobileMenu() {

  const nav =
    $(".main-nav, .navbar-menu, #mainNav");

  if (!nav) return;

  nav.classList.remove("open");

}


/* =========================================================
   SHAYARI DATABASE
   ========================================================= */

function getShayariData() {

  if (
    window.ARS_SHAYARI &&
    Array.isArray(window.ARS_SHAYARI.data)
  ) {

    return window.ARS_SHAYARI.data;

  }

  return [];

}


/* =========================================================
   SHAYARI CARD
   ========================================================= */

function createShayariCard(item) {

  const liked =
    ARS_APP.likes[item.id] > 0;

  const favourite =
    ARS_APP.favourites.includes(item.id);

  return `
    <article
      class="shayari-card"
      data-id="${escapeHTML(item.id)}"
    >

      <div class="shayari-card-top">

        <span class="category-badge">
          ${escapeHTML(item.category)}
        </span>

        <button
          class="icon-btn favourite-btn ${favourite ? "active" : ""}"
          data-favourite="${escapeHTML(item.id)}"
          title="Favourite"
        >
          ${favourite ? "❤️" : "🤍"}
        </button>

      </div>

      <h3>
        ${escapeHTML(item.title)}
      </h3>

      <p class="shayari-text">
        ${escapeHTML(item.text).replace(/\n/g, "<br>")}
      </p>

      <div class="shayari-card-bottom">

        <span>
          ✍️ ${escapeHTML(item.author)}
        </span>

        <button
          class="like-btn ${liked ? "liked" : ""}"
          data-like="${escapeHTML(item.id)}"
        >
          ${liked ? "❤️" : "🤍"} Like
        </button>

      </div>

    </article>
  `;

}


/* =========================================================
   RENDER SHAYARI
   ========================================================= */

function renderShayari(
  data = getShayariData()
) {

  const container =
    $("#shayariContainer") ||
    $("[data-shayari-container]");

  if (!container) return;

  if (!data.length) {

    container.innerHTML = `
      <div class="empty-state">
        <h3>कोई शायरी नहीं मिली</h3>
        <p>कृपया दूसरी category या search करें।</p>
      </div>
    `;

    return;

  }

  container.innerHTML =
    data.map(createShayariCard).join("");

}


/* =========================================================
   SHAYARI CATEGORY FILTER
   ========================================================= */

function filterShayari(category) {

  ARS_APP.currentShayariCategory =
    category || "All";

  let data =
    getShayariData();

  if (
    category &&
    category !== "All"
  ) {

    data =
      data.filter(item =>
        String(item.category)
          .toLowerCase() ===
        String(category)
          .toLowerCase()
      );

  }

  renderShayari(data);

}


/* =========================================================
   SHAYARI SEARCH
   ========================================================= */

function searchShayari(query) {

  ARS_APP.searchQuery =
    String(query || "").trim();

  const data =
    getShayariData();

  if (!ARS_APP.searchQuery) {

    filterShayari(
      ARS_APP.currentShayariCategory
    );

    return;

  }

  const q =
    ARS_APP.searchQuery.toLowerCase();

  const results =
    data.filter(item => {

      const text =
        `${item.title} ${item.text} ${item.author} ${item.category}`
          .toLowerCase();

      return text.includes(q);

    });

  renderShayari(results);

}


/* =========================================================
   STORY DATABASE
   ========================================================= */

function getStoryData() {

  if (
    window.ARS_STORIES &&
    Array.isArray(window.ARS_STORIES.data)
  ) {

    return window.ARS_STORIES.data;

  }

  return [];

}


/* =========================================================
   STORY CARD
   ========================================================= */

function createStoryCard(item) {

  return `
    <article
      class="story-card"
      data-story-id="${escapeHTML(item.id)}"
    >

      <div class="story-card-top">

        <span class="category-badge">
          ${escapeHTML(item.category)}
        </span>

        <span class="story-type">
          ${escapeHTML(item.type)}
        </span>

      </div>

      <h3>
        ${escapeHTML(item.title)}
      </h3>

      <p class="story-preview">
        ${escapeHTML(item.text)
          .replace(/\n/g, "<br>")}
      </p>

      <div class="story-card-bottom">

        <span>
          ✍️ ${escapeHTML(item.author)}
        </span>

        <button
          class="read-story-btn"
          data-read-story="${escapeHTML(item.id)}"
        >
          पढ़ें →
        </button>

      </div>

    </article>
  `;

}


/* =========================================================
   RENDER STORIES
   ========================================================= */

function renderStories(
  data = getStoryData()
) {

  const container =
    $("#storyContainer") ||
    $("[data-story-container]");

  if (!container) return;

  if (!data.length) {

    container.innerHTML = `
      <div class="empty-state">
        <h3>कोई कहानी नहीं मिली</h3>
        <p>दूसरी category चुनकर देखें।</p>
      </div>
    `;

    return;

  }

  container.innerHTML =
    data.map(createStoryCard).join("");

}


/* =========================================================
   STORY CATEGORY FILTER
   ========================================================= */

function filterStories(category) {

  ARS_APP.currentStoryCategory =
    category || "All";

  let data =
    getStoryData();

  if (
    category &&
    category !== "All"
  ) {

    data =
      data.filter(item =>
        String(item.category)
          .toLowerCase() ===
        String(category)
          .toLowerCase()
      );

  }

  renderStories(data);

}


/* =========================================================
   STORY MODAL
   ========================================================= */

function openStory(id) {

  const story =
    window.ARS_STORIES?.getById
      ? window.ARS_STORIES.getById(id)
      : getStoryData().find(
          item => item.id === id
        );

  if (!story) {

    showToast(
      "कहानी नहीं मिली।",
      "error"
    );

    return;

  }

  let modal =
    document.getElementById("storyModal");

  if (!modal) {

    modal =
      document.createElement("div");

    modal.id =
      "storyModal";

    modal.className =
      "ars-modal";

    document.body.appendChild(modal);

  }

  modal.innerHTML = `
    <div class="ars-modal-overlay"
         data-close-story-modal></div>

    <div class="ars-modal-content">

      <button
        class="modal-close"
        data-close-story-modal
      >
        ×
      </button>

      <span class="category-badge">
        ${escapeHTML(story.category)}
      </span>

      <h2>
        ${escapeHTML(story.title)}
      </h2>

      <p class="story-full-text">
        ${escapeHTML(story.text)
          .replace(/\n/g, "<br>")}
      </p>

      <div class="story-author">
        ✍️ ${escapeHTML(story.author)}
      </div>

    </div>
  `;

  modal.classList.add("show");

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeStoryModal() {

  const modal =
    document.getElementById("storyModal");

  if (!modal) return;

  modal.classList.remove("show");

}


/* =========================================================
   FAVOURITES
   ========================================================= */

function loadFavourites() {

  try {

    const saved =
      localStorage.getItem(
        window.ARS_CONFIG?.storage?.favourites ||
        "ARS_FAVOURITES"
      );

    const data =
      saved ? JSON.parse(saved) : [];

    ARS_APP.favourites =
      Array.isArray(data)
        ? data
        : [];

  } catch {

    ARS_APP.favourites = [];

  }

}


function saveFavourites() {

  localStorage.setItem(
    window.ARS_CONFIG?.storage?.favourites ||
    "ARS_FAVOURITES",
    JSON.stringify(
      ARS_APP.favourites
    )
  );

}


function toggleFavourite(id) {

  const index =
    ARS_APP.favourites.indexOf(id);

  if (index === -1) {

    ARS_APP.favourites.push(id);

    showToast(
      "❤️ Favourite में जोड़ दिया गया।"
    );

  } else {

    ARS_APP.favourites.splice(
      index,
      1
    );

    showToast(
      "Favourite से हटा दिया गया।"
    );

  }

  saveFavourites();

  renderShayari(
    getFilteredCurrentShayari()
  );

}


function getFilteredCurrentShayari() {

  let data =
    getShayariData();

  const category =
    ARS_APP.currentShayariCategory;

  if (
    category &&
    category !== "All"
  ) {

    data =
      data.filter(item =>
        String(item.category)
          .toLowerCase() ===
        category.toLowerCase()
      );

  }

  if (ARS_APP.searchQuery) {

    const q =
      ARS_APP.searchQuery.toLowerCase();

    data =
      data.filter(item =>
        `${item.title} ${item.text} ${item.author} ${item.category}`
          .toLowerCase()
          .includes(q)
      );

  }

  return data;

}


/* =========================================================
   LIKES
   ========================================================= */

function loadLikes() {

  try {

    const saved =
      localStorage.getItem(
        window.ARS_CONFIG?.storage?.likes ||
        "ARS_LIKES"
      );

    ARS_APP.likes =
      saved ? JSON.parse(saved) : {};

  } catch {

    ARS_APP.likes = {};

  }

}


function saveLikes() {

  localStorage.setItem(
    window.ARS_CONFIG?.storage?.likes ||
    "ARS_LIKES",
    JSON.stringify(
      ARS_APP.likes
    )
  );

}


function toggleLike(id) {

  ARS_APP.likes[id] =
    ARS_APP.likes[id]
      ? 0
      : 1;

  saveLikes();

  renderShayari(
    getFilteredCurrentShayari()
  );

}


/* =========================================================
   COPY SHAYARI
   ========================================================= */

async function copyShayari(id) {

  const item =
    getShayariData().find(
      shayari => shayari.id === id
    );

  if (!item) return;

  try {

    await navigator.clipboard.writeText(
      item.text
    );

    showToast(
      "📋 शायरी कॉपी हो गई।"
    );

  } catch {

    showToast(
      "कॉपी नहीं हो सकी।",
      "error"
    );

  }

}


/* =========================================================
   SHARE CONTENT
   ========================================================= */

async function shareContent({
  title = "Adarsh Raj Shayar",
  text = "",
  url = window.location.href
} = {}) {

  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title,
        text,
        url
      });

    } catch {

      /* User cancelled share */

    }

    return;

  }

  try {

    await navigator.clipboard.writeText(
      `${text}\n${url}`
    );

    showToast(
      "🔗 Link कॉपी हो गया।"
    );

  } catch {

    showToast(
      "Share नहीं हो सका।",
      "error"
    );

  }

}


/* =========================================================
   CERTIFICATE SYSTEM
   ========================================================= */

function createCertificateFromForm(form) {

  if (
    !window.ARS_CERTIFICATES
  ) {

    showToast(
      "Certificate system load नहीं हुआ।",
      "error"
    );

    return;

  }

  const formData =
    new FormData(form);

  const data = {

    name:
      formData.get("name") ||
      $("#certificateName")?.value ||
      "",

    type:
      formData.get("type") ||
      $("#certificateType")?.value ||
      "",

    businessName:
      formData.get("businessName") || "",

    ownerName:
      formData.get("ownerName") || ""

  };

  try {

    const certificate =
      window.ARS_CERTIFICATES.create(
        data
      );

    displayGeneratedCertificate(
      certificate
    );

    showToast(
      "🏆 Certificate successfully generated!"
    );

  } catch (error) {

    showToast(
      error.message ||
      "Certificate generate नहीं हुआ।",
      "error"
    );

  }

}


/* =========================================================
   DISPLAY CERTIFICATE
   ========================================================= */

function displayGeneratedCertificate(
  certificate
) {

  const container =
    $("#generatedCertificate") ||
    $("[data-generated-certificate]");

  if (!container) return;

  container.innerHTML = `

    <div class="certificate-preview">

      <div class="certificate-header">
        <span>🏆</span>
        <h2>Adarsh Raj Shayar</h2>
      </div>

      <p class="certificate-label">
        CERTIFICATE OF ${escapeHTML(
          certificate.type
        ).toUpperCase()}
      </p>

      <p>This certificate is proudly presented to</p>

      <h1>
        ${escapeHTML(certificate.name)}
      </h1>

      <p>
        In recognition of achievement and contribution.
      </p>

      <div class="certificate-details">

        <span>
          Certificate No:
          <strong>
            ${escapeHTML(
              certificate.certificateNo
            )}
          </strong>
        </span>

        <span>
          Issue Date:
          <strong>
            ${escapeHTML(
              certificate.issueDate
            )}
          </strong>
        </span>

      </div>

      <div class="certificate-footer">

        <span>
          Adarsh Raj<br>
          Founder & Author
        </span>

        <span>
          Status:<br>
          <strong>
            ${escapeHTML(
              certificate.status
            )}
          </strong>
        </span>

      </div>

      <button
        class="primary-btn"
        onclick="window.print()"
      >
        🖨️ Print Certificate
      </button>

    </div>

  `;

}


/* =========================================================
   CERTIFICATE VERIFICATION
   ========================================================= */

function verifyCertificate(value) {

  if (
    !window.ARS_CERTIFICATES
  ) {

    showToast(
      "Certificate system उपलब्ध नहीं है।",
      "error"
    );

    return;

  }

  const result =
    window.ARS_CERTIFICATES.verify(
      value
    );

  const container =
    $("#verificationResult") ||
    $("[data-verification-result]");

  if (!container) return;

  if (!result.certificate) {

    container.innerHTML = `
      <div class="verification-result invalid">
        ❌ Certificate Not Found
      </div>
    `;

    return;

  }

  const certificate =
    result.certificate;

  container.innerHTML = `

    <div class="verification-result ${
      result.verified
        ? "valid"
        : "invalid"
    }">

      <h3>
        ${
          result.verified
            ? "✅ Certificate Verified"
            : "❌ Certificate Invalid"
        }
      </h3>

      <p>
        Certificate No:
        <strong>
          ${escapeHTML(
            certificate.certificateNo
          )}
        </strong>
      </p>

      <p>
        Name:
        <strong>
          ${escapeHTML(
            certificate.name
          )}
        </strong>
      </p>

      <p>
        Type:
        <strong>
          ${escapeHTML(
            certificate.type
          )}
        </strong>
      </p>

      <p>
        Status:
        <strong>
          ${escapeHTML(
            certificate.status
          )}
        </strong>
      </p>

      <p>
        Issue Date:
        <strong>
          ${escapeHTML(
            certificate.issueDate
          )}
        </strong>
      </p>

    </div>

  `;

}


/* =========================================================
   CERTIFICATE FORM SETUP
   ========================================================= */

function setupCertificateSystem() {

  const form =
    $("#certificateForm") ||
    $("[data-certificate-form]");

  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        createCertificateFromForm(
          form
        );

      }
    );

  }


  const verifyForm =
    $("#verificationForm") ||
    $("[data-verification-form]");

  if (verifyForm) {

    verifyForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const input =
          verifyForm.querySelector(
            "input"
          );

        verifyCertificate(
          input?.value || ""
        );

      }
    );

  }

}


/* =========================================================
   ADMIN SESSION
   ========================================================= */

function isAdminLoggedIn() {

  const key =
    window.ARS_CONFIG?.admin?.sessionKey ||
    "ARS_ADMIN_SESSION";

  const session =
    localStorage.getItem(key);

  if (!session) return false;

  try {

    const data =
      JSON.parse(session);

    if (
      Date.now() >
      Number(data.expiresAt)
    ) {

      localStorage.removeItem(key);

      return false;

    }

    return data.loggedIn === true;

  } catch {

    return false;

  }

}


function adminLogin(password) {

  const correctPassword =
    window.ARS_CONFIG?.admin?.demoPassword;

  if (
    !correctPassword ||
    correctPassword ===
      "CHANGE_THIS_PASSWORD"
  ) {

    showToast(
      "पहले config.js में admin password सेट करें।",
      "error"
    );

    return false;

  }

  if (
    password !== correctPassword
  ) {

    showToast(
      "❌ गलत password।",
      "error"
    );

    return false;

  }

  const key =
    window.ARS_CONFIG.admin.sessionKey;

  const duration =
    window.ARS_CONFIG.admin.sessionDuration;

  localStorage.setItem(
    key,
    JSON.stringify({
      loggedIn: true,
      expiresAt:
        Date.now() + duration
    })
  );

  showToast(
    "✅ Admin login successful."
  );

  return true;

}


function adminLogout() {

  const key =
    window.ARS_CONFIG?.admin?.sessionKey ||
    "ARS_ADMIN_SESSION";

  localStorage.removeItem(key);

  showToast(
    "Admin logout हो गया।"
  );

}


/* =========================================================
   JOINING APPLICATION
   ========================================================= */

function submitJoiningApplication(form) {

  const storageKey =
    window.ARS_CONFIG?.storage
      ?.joiningApplications ||
    "ARS_JOINING_APPLICATIONS";

  const formData =
    new FormData(form);

  const application = {

    id:
      `${window.ARS_CONFIG?.joining?.applicationPrefix || "ARS-JOIN-"}${Date.now()}`,

    name:
      String(
        formData.get("name") || ""
      ).trim(),

    email:
      String(
        formData.get("email") || ""
      ).trim(),

    mobile:
      String(
        formData.get("mobile") || ""
      ).trim(),

    role:
      String(
        formData.get("role") || ""
      ).trim(),

    message:
      String(
        formData.get("message") || ""
      ).trim(),

    status:
      "Pending",

    submittedAt:
      new Date().toISOString()

  };


  if (!application.name) {

    showToast(
      "नाम दर्ज करें।",
      "error"
    );

    return;

  }


  let applications = [];

  try {

    applications =
      JSON.parse(
        localStorage.getItem(
          storageKey
        ) || "[]"
      );

  } catch {

    applications = [];

  }


  applications.push(
    application
  );

  localStorage.setItem(
    storageKey,
    JSON.stringify(applications)
  );


  showToast(
    "🤝 Joining Application भेज दी गई।"
  );

  form.reset();

}


/* =========================================================
   VISITOR COUNTER
   ========================================================= */

function updateVisitorCount() {

  const key =
    window.ARS_CONFIG?.storage
      ?.visitorCount ||
    "ARS_VISITOR_COUNT";

  let count =
    Number(
      localStorage.getItem(key) || 0
    );

  count++;

  localStorage.setItem(
    key,
    String(count)
  );

  $$("[data-visitor-count]")
    .forEach(element => {

      element.textContent =
        count.toLocaleString("en-IN");

    });

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function setCurrentYear() {

  const year =
    new Date().getFullYear();

  $$("[data-current-year]")
    .forEach(element => {

      element.textContent =
        year;

    });

}


/* =========================================================
   STATS
   ========================================================= */

function renderStats() {

  if (window.ARS_SHAYARI?.stats) {

    const stats =
      window.ARS_SHAYARI.stats;

    $$("[data-shayari-total]")
      .forEach(el =>
        el.textContent = stats.total
      );

  }


  if (window.ARS_STORIES?.stats) {

    const stats =
      window.ARS_STORIES.stats;

    $$("[data-story-total]")
      .forEach(el =>
        el.textContent = stats.total
      );

    $$("[data-poem-total]")
      .forEach(el =>
        el.textContent = stats.poems
      );

  }


  if (window.ARS_CERTIFICATES) {

    const stats =
      window.ARS_CERTIFICATES.stats();

    $$("[data-certificate-total]")
      .forEach(el =>
        el.textContent = stats.total
      );

  }

}


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function setupProgressBar() {

  const progress =
    $("#progressBar");

  if (!progress) return;

  window.addEventListener(
    "scroll",
    () => {

      const scrollTop =
        window.scrollY;

      const height =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const percentage =
        height > 0
          ? (scrollTop / height) * 100
          : 0;

      progress.style.width =
        `${percentage}%`;

    }
  );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {

  const button =
    $("#backToTop") ||
    $("[data-back-to-top]");

  if (!button) return;

  window.addEventListener(
    "scroll",
    () => {

      button.classList.toggle(
        "show",
        window.scrollY > 400
      );

    }
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


/* =========================================================
   EVENT DELEGATION
   ========================================================= */

function setupGlobalEvents() {

  document.addEventListener(
    "click",
    event => {

      const favourite =
        event.target.closest(
          "[data-favourite]"
        );

      if (favourite) {

        toggleFavourite(
          favourite.dataset.favourite
        );

        return;

      }


      const like =
        event.target.closest(
          "[data-like]"
        );

      if (like) {

        toggleLike(
          like.dataset.like
        );

        return;

      }


      const story =
        event.target.closest(
          "[data-read-story]"
        );

      if (story) {

        openStory(
          story.dataset.readStory
        );

        return;

      }


      if (
        event.target.closest(
          "[data-close-story-modal]"
        )
      ) {

        closeStoryModal();

        return;

      }


      const copy =
        event.target.closest(
          "[data-copy-shayari]"
        );

      if (copy) {

        copyShayari(
          copy.dataset.copyShayari
        );

        return;

      }


      const share =
        event.target.closest(
          "[data-share-shayari]"
        );

      if (share) {

        const item =
          getShayariData().find(
            x =>
              x.id ===
              share.dataset.shareShayari
          );

        if (item) {

          shareContent({
            title:
              item.title,

            text:
              item.text
          });

        }

        return;

      }


      if (
        event.target.closest(
          "[data-theme-toggle]"
        )
      ) {

        toggleTheme();

        return;

      }


      if (
        event.target.closest(
          "[data-mobile-menu]"
        )
      ) {

        toggleMobileMenu();

      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeStoryModal();

        closeMobileMenu();

      }

    }
  );

}


/* =========================================================
   SEARCH EVENTS
   ========================================================= */

function setupSearch() {

  const inputs =
    $$(
      "#shayariSearch, [data-shayari-search]"
    );

  inputs.forEach(input => {

    input.addEventListener(
      "input",
      event => {

        searchShayari(
          event.target.value
        );

      }
    );

  });


  const storyInputs =
    $$(
      "#storySearch, [data-story-search]"
    );

  storyInputs.forEach(input => {

    input.addEventListener(
      "input",
      event => {

        const query =
          event.target.value
            .trim()
            .toLowerCase();

        let data =
          getStoryData();

        if (query) {

          data =
            data.filter(item =>
              `${item.title} ${item.text} ${item.author} ${item.category}`
                .toLowerCase()
                .includes(query)
            );

        }

        renderStories(data);

      }
    );

  });

}


/* =========================================================
   CATEGORY BUTTONS
   ========================================================= */

function setupCategoryButtons() {

  $$("[data-shayari-category]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          filterShayari(
            button.dataset
              .shayariCategory
          );

        }
      );

    });


  $$("[data-story-category]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          filterStories(
            button.dataset
              .storyCategory
          );

        }
      );

    });

}


/* =========================================================
   JOINING FORM SETUP
   ========================================================= */

function setupJoiningForm() {

  const form =
    $("#joiningForm") ||
    $("[data-joining-form]");

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      submitJoiningApplication(
        form
      );

    }
  );

}


/* =========================================================
   ADMIN FORM
   ========================================================= */

function setupAdminLogin() {

  const form =
    $("#adminLoginForm") ||
    $("[data-admin-login]");

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const input =
        form.querySelector(
          'input[type="password"]'
        );

      if (
        adminLogin(
          input?.value || ""
        )
      ) {

        form.reset();

      }

    }
  );

}


/* =========================================================
   LOADER
   ========================================================= */

function hideLoader() {

  const loader =
    $("#loader") ||
    $(".page-loader");

  if (!loader) return;

  loader.classList.add(
    "hidden"
  );

  setTimeout(() => {

    loader.style.display =
      "none";

  }, 500);

}


/* =========================================================
   WELCOME POPUP
   ========================================================= */

function setupWelcomePopup() {

  if (
    !window.ARS_CONFIG?.ui
      ?.enableWelcomePopup
  ) return;

  const popup =
    $("#welcomePopup");

  if (!popup) return;

  const seen =
    sessionStorage.getItem(
      "ARS_WELCOME_SHOWN"
    );

  if (seen) return;

  popup.classList.add(
    "show"
  );

  sessionStorage.setItem(
    "ARS_WELCOME_SHOWN",
    "true"
  );


  popup.addEventListener(
    "click",
    event => {

      if (
        event.target.closest(
          "[data-close-welcome]"
        )
      ) {

        popup.classList.remove(
          "show"
        );

      }

    }
  );

}


/* =========================================================
   SEO / WEBSITE TITLE
   ========================================================= */

function setupWebsiteInfo() {

  const config =
    window.ARS_CONFIG?.website;

  if (!config) return;

  document.title =
    config.name;

  $$("[data-website-name]")
    .forEach(el => {

      el.textContent =
        config.name;

    });

  $$("[data-founder-name]")
    .forEach(el => {

      el.textContent =
        config.author;

    });

  $$("[data-tagline]")
    .forEach(el => {

      el.textContent =
        config.tagline;

    });

}


/* =========================================================
   INITIAL DATA RENDER
   ========================================================= */

function renderInitialData() {

  renderShayari();

  renderStories();

  renderStats();

}


/* =========================================================
   MAIN INITIALIZATION
   ========================================================= */

function initializeARSWebsite() {

  if (ARS_APP.initialized) return;

  ARS_APP.initialized =
    true;


  loadFavourites();

  loadLikes();

  applyTheme();

  setupWebsiteInfo();

  setupNavigation();

  setupGlobalEvents();

  setupSearch();

  setupCategoryButtons();

  setupCertificateSystem();

  setupJoiningForm();

  setupAdminLogin();

  setupProgressBar();

  setupBackToTop();

  renderInitialData();

  updateVisitorCount();

  setCurrentYear();

  setupWelcomePopup();

  hideLoader();


  console.log(
    "🌹 ARS Official Website initialized successfully."
  );

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeARSWebsite
  );

} else {

  initializeARSWebsite();

}


/* =========================================================
   GLOBAL ARS APP API
   ========================================================= */

window.ARS_APP = {

  state:
    ARS_APP,

  showSection,

  toggleTheme,

  filterShayari,

  searchShayari,

  filterStories,

  openStory,

  closeStoryModal,

  toggleFavourite,

  toggleLike,

  copyShayari,

  shareContent,

  verifyCertificate,

  adminLogin,

  adminLogout,

  isAdminLoggedIn,

  showToast

};


/* =========================================================
   END
   ========================================================= */
```
