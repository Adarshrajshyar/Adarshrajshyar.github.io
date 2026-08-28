/* =========================================================
   ADARSH RAJ SHAYAR
   ARS OFFICIAL WEBSITE
   MAIN SCRIPT
   Version 3.0
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const escapeHTML = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const safeText = (value = "") =>
  String(value).trim();

function showToast(message, type = "info") {
  let toast = $("#arsToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "arsToast";
    toast.className = "ars-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.dataset.type = type;
  toast.classList.add("show");

  clearTimeout(window.__arsToastTimer);

  window.__arsToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* =========================================================
   WEBSITE LOADER
   ========================================================= */

function initLoader() {
  const loader =
    $("#loader") ||
    $(".loader") ||
    $(".loading-screen");

  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 500);
  });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {
  const menuButton =
    $("#menuToggle") ||
    $(".menu-toggle") ||
    $("[data-menu-toggle]");

  const nav =
    $("#mainNav") ||
    $(".main-nav") ||
    $("nav");

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

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
  const sections = $$("section[id], main [id]");
  const links = $$("nav a[href^='#']");

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        links.forEach(link => {
          link.classList.remove("active");

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

  sections.forEach(section => observer.observe(section));
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {
  const button =
    $("#backToTop") ||
    $(".back-to-top");

  if (!button) return;

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


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function initProgressBar() {
  const bar =
    $("#progressBar") ||
    $(".progress-bar");

  if (!bar) return;

  window.addEventListener("scroll", () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      height > 0
        ? (window.scrollY / height) * 100
        : 0;

    bar.style.width = `${progress}%`;
  });
}


/* =========================================================
   DARK MODE
   ========================================================= */

function initTheme() {
  const button =
    $("#themeToggle") ||
    $(".theme-toggle") ||
    $("[data-theme-toggle]");

  const saved =
    localStorage.getItem("ARS_THEME");

  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (!button) return;

  button.addEventListener("click", () => {
    const dark =
      document.body.classList.toggle("dark-mode");

    localStorage.setItem(
      "ARS_THEME",
      dark ? "dark" : "light"
    );

    showToast(
      dark
        ? "🌙 Dark Mode ON"
        : "☀️ Light Mode ON"
    );
  });
}


/* =========================================================
   WELCOME POPUP
   ========================================================= */

function initWelcomePopup() {
  const popup =
    $("#welcomePopup") ||
    $(".welcome-popup");

  if (!popup) return;

  const close =
    popup.querySelector(".popup-close") ||
    popup.querySelector("[data-close]");

  const alreadyShown =
    sessionStorage.getItem(
      "ARS_WELCOME_SHOWN"
    );

  if (!alreadyShown) {
    setTimeout(() => {
      popup.classList.add("show");
    }, 1200);
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
   ========================================================= */

function getShayariDatabase() {
  if (
    window.ARS_SHAYARI &&
    Array.isArray(window.ARS_SHAYARI.data)
  ) {
    return window.ARS_SHAYARI.data;
  }

  return [];
}


/* =========================================================
   STORY DATABASE
   ========================================================= */

function getStoryDatabase() {
  if (
    window.ARS_STORIES &&
    Array.isArray(window.ARS_STORIES.data)
  ) {
    return window.ARS_STORIES.data;
  }

  return [];
}


/* =========================================================
   SHAYARI CARD
   ========================================================= */

function createShayariCard(item) {
  return `
    <article class="shayari-card"
      data-id="${escapeHTML(item.id)}">

      <span class="content-category">
        ${escapeHTML(item.category || "Shayari")}
      </span>

      <h3>${escapeHTML(item.title)}</h3>

      <p class="shayari-text">
        ${escapeHTML(item.text).replace(/\n/g, "<br>")}
      </p>

      <div class="content-footer">
        <span>✍️ ${escapeHTML(item.author)}</span>

        <button
          class="copy-btn"
          data-copy="${escapeHTML(item.text)}">
          📋 Copy
        </button>
      </div>

    </article>
  `;
}


/* =========================================================
   STORY CARD
   ========================================================= */

function createStoryCard(item) {
  return `
    <article class="story-card"
      data-id="${escapeHTML(item.id)}">

      <span class="content-category">
        ${escapeHTML(item.category || "Story")}
      </span>

      <h3>${escapeHTML(item.title)}</h3>

      <p>
        ${escapeHTML(item.text)
          .substring(0, 180)
          .replace(/\n/g, " ")}
        ${item.text.length > 180 ? "..." : ""}
      </p>

      <div class="content-footer">
        <span>✍️ ${escapeHTML(item.author)}</span>

        <button
          class="read-story-btn"
          data-story-id="${escapeHTML(item.id)}">
          Read More →
        </button>
      </div>

    </article>
  `;
}


/* =========================================================
   RENDER SHAYARI
   ========================================================= */

function renderShayari(list, container) {
  if (!container) return;

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

  container.innerHTML =
    list.map(createShayariCard).join("");

  bindCopyButtons();
}


/* =========================================================
   RENDER STORIES
   ========================================================= */

function renderStories(list, container) {
  if (!container) return;

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

  bindStoryButtons();
}


/* =========================================================
   SHAYARI SECTION
   ========================================================= */

function initShayariSection() {
  const database = getShayariDatabase();

  const container =
    $("#shayariContainer") ||
    $("#shayariGrid") ||
    $(".shayari-grid");

  if (!container) return;

  const search =
    $("#shayariSearch") ||
    "[data-shayari-search]";

  const category =
    $("#shayariCategory") ||
    "[data-shayari-category]";

  const searchInput =
    typeof search === "string"
      ? $(search)
      : search;

  const categorySelect =
    typeof category === "string"
      ? $(category)
      : category;

  function update() {
    let result = [...database];

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

    if (query) {
      result = result.filter(item =>
        `${item.title} ${item.text} ${item.author} ${item.category}`
          .toLowerCase()
          .includes(query)
      );
    }

    renderShayari(result, container);
  }

  searchInput?.addEventListener(
    "input",
    update
  );

  categorySelect?.addEventListener(
    "change",
    update
  );

  update();
}


/* =========================================================
   STORY SECTION
   ========================================================= */

function initStorySection() {
  const database = getStoryDatabase();

  const container =
    $("#storyContainer") ||
    $("#storiesContainer") ||
    $("#storyGrid") ||
    $(".story-grid");

  if (!container) return;

  const search =
    $("#storySearch") ||
    "[data-story-search]";

  const category =
    $("#storyCategory") ||
    "[data-story-category]";

  const searchInput =
    typeof search === "string"
      ? $(search)
      : search;

  const categorySelect =
    typeof category === "string"
      ? $(category)
      : category;

  function update() {
    let result = [...database];

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

    if (query) {
      result = result.filter(item =>
        `${item.title} ${item.text} ${item.author} ${item.category}`
          .toLowerCase()
          .includes(query)
      );
    }

    renderStories(result, container);
  }

  searchInput?.addEventListener(
    "input",
    update
  );

  categorySelect?.addEventListener(
    "change",
    update
  );

  update();
}


/* =========================================================
   COPY SHAYARI
   ========================================================= */

function bindCopyButtons() {
  $$(".copy-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const text =
        button.dataset.copy || "";

      try {
        await navigator.clipboard.writeText(text);

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


/* =========================================================
   STORY MODAL
   ========================================================= */

function openStoryModal(story) {
  if (!story) return;

  let modal = $("#storyModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "storyModal";
    modal.className = "content-modal";

    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="content-modal-box">

      <button class="modal-close"
        aria-label="Close">
        ×
      </button>

      <span class="content-category">
        ${escapeHTML(story.category)}
      </span>

      <h2>${escapeHTML(story.title)}</h2>

      <div class="modal-content-text">
        ${escapeHTML(story.text)
          .replace(/\n/g, "<br>")}
      </div>

      <div class="modal-author">
        ✍️ ${escapeHTML(story.author)}
      </div>

    </div>
  `;

  modal.classList.add("show");

  modal
    .querySelector(".modal-close")
    ?.addEventListener("click", () => {
      modal.classList.remove("show");
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

      const story =
        window.ARS_STORIES?.getById
          ? window.ARS_STORIES.getById(id)
          : getStoryDatabase().find(
              item => item.id === id
            );

      openStoryModal(story);
    });
  });
}


/* =========================================================
   CONTENT STATISTICS
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

  const mappings = {
    shayariCount: stats.shayari,
    storyCount: stats.stories,
    poemCount: stats.poems,
    totalContent: stats.total
  };

  Object.entries(mappings).forEach(
    ([id, value]) => {
      const element = $(`#${id}`);

      if (element) {
        element.textContent = value;
      }
    }
  );

  $$("[data-stat]").forEach(element => {
    const key = element.dataset.stat;

    if (key in stats) {
      element.textContent = stats[key];
    }
  });
}


/* =========================================================
   FAVOURITES
   ========================================================= */

function getFavourites() {
  try {
    return JSON.parse(
      localStorage.getItem(
        "ARS_FAVOURITES"
      ) || "[]"
    );
  } catch {
    return [];
  }
}


function saveFavourites(list) {
  localStorage.setItem(
    "ARS_FAVOURITES",
    JSON.stringify(list)
  );
}


function toggleFavourite(id) {
  let list = getFavourites();

  if (list.includes(id)) {
    list = list.filter(item => item !== id);

    showToast(
      "💔 Favourite से हटाया गया।"
    );
  } else {
    list.push(id);

    showToast(
      "❤️ Favourite में जोड़ा गया।",
      "success"
    );
  }

  saveFavourites(list);

  return list;
}


function initFavouriteButtons() {
  $$("[data-favourite]").forEach(button => {
    button.addEventListener("click", () => {
      const id =
        button.dataset.favourite;

      const list =
        toggleFavourite(id);

      button.classList.toggle(
        "active",
        list.includes(id)
      );
    });
  });
}


/* =========================================================
   JOIN ARS NAVIGATION
   ========================================================= */

function initJoiningButtons() {
  $$(
    "[data-join-ars], #joinARS, .join-ars-btn"
  ).forEach(button => {
    button.addEventListener("click", () => {
      const page =
        button.dataset.page ||
        "joining.html";

      window.location.href = page;
    });
  });
}


/* =========================================================
   CERTIFICATE NAVIGATION
   ========================================================= */

function initCertificateButtons() {

  $$(
    "[data-certificate], .certificate-btn"
  ).forEach(button => {
    button.addEventListener("click", () => {

      const page =
        button.dataset.page ||
        "certificate.html";

      window.location.href = page;

    });
  });


  $$(
    "[data-certificate-verify], .verify-certificate-btn"
  ).forEach(button => {
    button.addEventListener("click", () => {

      const page =
        button.dataset.page ||
        "verify.html";

      window.location.href = page;

    });
  });

}


/* =========================================================
   CERTIFICATE STATUS DISPLAY
   ========================================================= */

function checkCertificateFromURL() {
  if (!window.ARS_CERTIFICATES) return;

  const params =
    new URLSearchParams(
      window.location.search
    );

  const certificate =
    params.get("certificate") ||
    params.get("id") ||
    params.get("verify");

  if (!certificate) return;

  const result =
    window.ARS_CERTIFICATES.verify(
      certificate
    );

  const box =
    $("#certificateResult");

  if (!box) return;

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

    return;
  }

  const data =
    result.certificate;

  box.innerHTML = `
    <div class="verification-success">

      <div class="verify-icon">✓</div>

      <h3>Certificate Verified</h3>

      <p><strong>Name:</strong>
        ${escapeHTML(data.name)}
      </p>

      <p><strong>Certificate No:</strong>
        ${escapeHTML(data.certificateNo)}
      </p>

      <p><strong>Type:</strong>
        ${escapeHTML(data.type)}
      </p>

      <p><strong>Issue Date:</strong>
        ${escapeHTML(data.issueDate)}
      </p>

      <p><strong>Status:</strong>
        ${escapeHTML(data.status)}
      </p>

    </div>
  `;
}


/* =========================================================
   CERTIFICATE VERIFY FORM
   ========================================================= */

function initCertificateVerification() {
  const form =
    $("#certificateVerifyForm") ||
    $("#verifyCertificateForm");

  if (!form) return;

  const input =
    $("#certificateNumber", form) ||
    $("#verifyInput", form) ||
    $("input", form);

  const result =
    $("#certificateResult");

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!input) return;

    const value =
      safeText(input.value);

    if (!value) {
      showToast(
        "Certificate Number या ID डालें।",
        "error"
      );
      return;
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

    if (!result) return;

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

      return;
    }

    const data =
      verification.certificate;

    result.innerHTML = `
      <div class="verification-success">

        <div class="verify-icon">✓</div>

        <h3>Certificate Verified Successfully</h3>

        <div class="certificate-details">

          <p>
            <strong>Certificate No:</strong>
            ${escapeHTML(data.certificateNo)}
          </p>

          <p>
            <strong>Certificate ID:</strong>
            ${escapeHTML(data.uniqueId)}
          </p>

          <p>
            <strong>Name:</strong>
            ${escapeHTML(data.name)}
          </p>

          <p>
            <strong>Type:</strong>
            ${escapeHTML(data.type)}
          </p>

          <p>
            <strong>Issue Date:</strong>
            ${escapeHTML(data.issueDate)}
          </p>

          <p>
            <strong>Status:</strong>
            ${escapeHTML(data.status)}
          </p>

        </div>

      </div>
    `;
  });
}


/* =========================================================
   CERTIFICATE GENERATION
   ========================================================= */

function initCertificateGeneration() {

  const form =
    $("#certificateForm") ||
    $("#generateCertificateForm");

  if (!form) return;

  form.addEventListener("submit", event => {

    event.preventDefault();

    if (!window.ARS_CERTIFICATES) {
      showToast(
        "Certificate system load नहीं हुआ।",
        "error"
      );
      return;
    }

    const name =
      safeText(
        form.querySelector(
          "[name='name']"
        )?.value
      );

    const type =
      safeText(
        form.querySelector(
          "[name='type']"
        )?.value
      );

    if (!name) {
      showToast(
        "Name डालना जरूरी है।",
        "error"
      );
      return;
    }

    if (!type) {
      showToast(
        "Certificate Type चुनें।",
        "error"
      );
      return;
    }

    try {

      const certificate =
        window.ARS_CERTIFICATES.create({
          name,
          type
        });

      showToast(
        "🏆 Certificate successfully generated!",
        "success"
      );

      displayGeneratedCertificate(
        certificate
      );

    } catch (error) {

      showToast(
        error.message ||
        "Certificate generate नहीं हुआ।",
        "error"
      );

    }

  });

}


function displayGeneratedCertificate(
  certificate
) {

  const box =
    $("#generatedCertificate") ||
    $("#certificatePreview");

  if (!box) return;

  box.innerHTML = `

    <div class="certificate-preview-card">

      <div class="certificate-border">

        <img
          src="logo.png"
          alt="ARS Logo"
          class="certificate-logo"
          onerror="this.style.display='none'"
        >

        <p class="certificate-small">
          ADARSH RAJ SHAYAR
        </p>

        <h1>CERTIFICATE</h1>

        <p class="certificate-subtitle">
          ${escapeHTML(certificate.type)}
        </p>

        <p>This certificate is proudly presented to</p>

        <h2>
          ${escapeHTML(certificate.name)}
        </h2>

        <p>
          Certificate No:
          <strong>
            ${escapeHTML(
              certificate.certificateNo
            )}
          </strong>
        </p>

        <p>
          Certificate ID:
          <strong>
            ${escapeHTML(
              certificate.uniqueId
            )}
          </strong>
        </p>

        <p>
          Issue Date:
          ${escapeHTML(
            certificate.issueDate
          )}
        </p>

        <div class="certificate-signature">
          <span>Adarsh Raj</span>
          <small>Founder & Author</small>
        </div>

        <div class="certificate-actions">

          <button
            type="button"
            onclick="window.print()">
            🖨️ Print Certificate
          </button>

          <button
            type="button"
            onclick="window.location.href='verify.html?id=${encodeURIComponent(
              certificate.uniqueId
            )}'">
            🔎 Verify Certificate
          </button>

        </div>

      </div>

    </div>

  `;

  box.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================================
   BUSINESS CERTIFICATE FIELDS
   ========================================================= */

function initCertificateTypeFields() {

  const type =
    $("#certificateType") ||
    $("select[name='type']");

  if (!type) return;

  const businessFields =
    $("#businessFields");

  function update() {

    if (!businessFields) return;

    businessFields.style.display =
      type.value === "Business"
        ? "block"
        : "none";

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

function initJoiningForm() {

  const form =
    $("#joiningForm") ||
    $("#arsJoiningForm");

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const formData =
        new FormData(form);

      const application = {

        id:
          `ARS-JOIN-${Date.now()}`,

        name:
          safeText(
            formData.get("name")
          ),

        email:
          safeText(
            formData.get("email")
          ),

        mobile:
          safeText(
            formData.get("mobile")
          ),

        role:
          safeText(
            formData.get("role")
          ),

        message:
          safeText(
            formData.get("message")
          ),

        status:
          "Pending",

        createdAt:
          new Date().toISOString()

      };

      if (!application.name) {
        showToast(
          "Name डालना जरूरी है।",
          "error"
        );
        return;
      }

      if (!application.email) {
        showToast(
          "Email डालना जरूरी है।",
          "error"
        );
        return;
      }

      let applications = [];

      try {

        applications =
          JSON.parse(
            localStorage.getItem(
              "ARS_JOINING_APPLICATIONS"
            ) || "[]"
          );

      } catch {
        applications = [];
      }

      applications.push(application);

      localStorage.setItem(
        "ARS_JOINING_APPLICATIONS",
        JSON.stringify(applications)
      );

      form.reset();

      showToast(
        "✅ ARS Joining Application भेज दी गई।",
        "success"
      );

      const result =
        $("#joiningResult");

      if (result) {

        result.innerHTML = `
          <div class="success-message">
            <h3>Application Submitted 🎉</h3>

            <p>
              आपका ARS Joining Application
              successfully submit हो गया है।
            </p>

            <p>
              <strong>Application ID:</strong>
              ${escapeHTML(application.id)}
            </p>

            <p>
              Status:
              <strong>Pending</strong>
            </p>

            <p>
              Approval के बाद आपको
              आगे की जानकारी दी जाएगी।
            </p>
          </div>
        `;

      }

    }
  );

}


/* =========================================================
   JOINING CERTIFICATE
   ========================================================= */

function initJoiningCertificate() {

  const button =
    $("#joiningCertificateBtn") ||
    $("[data-joining-certificate]");

  if (!button) return;

  button.addEventListener("click", () => {

    const id =
      button.dataset.id ||
      $("#certificateId")?.value ||
      "";

    if (!id) {

      showToast(
        "Certificate ID डालें।",
        "error"
      );

      return;
    }

    if (!window.ARS_CERTIFICATES) {

      showToast(
        "Certificate system unavailable।",
        "error"
      );

      return;
    }

    const result =
      window.ARS_CERTIFICATES.verify(id);

    if (!result.verified) {

      showToast(
        "आपका certificate अभी approve नहीं किया गया है।",
        "error"
      );

      return;
    }

    window.location.href =
      `certificate.html?id=${encodeURIComponent(id)}`;

  });

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initContactForm() {

  const form =
    $("#contactForm");

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

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
        );

      }

    }
  );

}


/* =========================================================
   VISITOR COUNTER
   ========================================================= */

function initVisitorCounter() {

  const elements =
    $$("[data-visitor-count], #visitorCount");

  if (!elements.length) return;

  let count =
    parseInt(
      localStorage.getItem(
        "ARS_VISITOR_COUNT"
      ) || "0",
      10
    );

  count++;

  localStorage.setItem(
    "ARS_VISITOR_COUNT",
    String(count)
  );

  elements.forEach(
    element => {
      element.textContent =
        count.toLocaleString("en-IN");
    }
  );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

  $$(
    "#currentYear, [data-current-year]"
  ).forEach(element => {
    element.textContent =
      new Date().getFullYear();
  });

}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function initImageFallback() {

  $$("img").forEach(image => {

    image.addEventListener(
      "error",
      () => {

        if (
          image.dataset.fallbackApplied
        ) return;

        image.dataset.fallbackApplied =
          "true";

        if (
          image.classList.contains(
            "profile-image"
          )
        ) {
          image.style.display = "none";
        }

      }
    );

  });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

  const elements =
    $$(".reveal, .animate-on-scroll");

  if (!elements.length) return;

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  elements.forEach(
    element =>
      observer.observe(element)
  );

}


/* =========================================================
   GLOBAL ESC KEY
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

    }
  );

}


/* =========================================================
   ARS GLOBAL WEBSITE API
   ========================================================= */

window.ARS_WEBSITE = {

  version: "3.0",

  toast:
    showToast,

  getShayari:
    getShayariDatabase,

  getStories:
    getStoryDatabase,

  openStory:
    openStoryModal,

  toggleFavourite:
    toggleFavourite,

  certificate:
    window.ARS_CERTIFICATES || null

};


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initLoader();

    initMobileMenu();

    initSmoothScroll();

    initActiveNavigation();

    initBackToTop();

    initProgressBar();

    initTheme();

    initWelcomePopup();

    initShayariSection();

    initStorySection();

    initStatistics();

    initFavouriteButtons();

    initJoiningButtons();

    initCertificateButtons();

    initCertificateVerification();

    initCertificateGeneration();

    initCertificateTypeFields();

    initJoiningForm();

    initJoiningCertificate();

    initContactForm();

    initVisitorCounter();

    initCurrentYear();

    initImageFallback();

    initScrollReveal();

    initEscapeKey();

    checkCertificateFromURL();

    console.log(
      "🌹 ARS Official Website Loaded Successfully"
    );

  }
);


/* =========================================================
   FINAL STATUS
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    console.log(
      "✅ ARS Website Ready"
    );

    console.log(
      "📚 Shayari:",
      getShayariDatabase().length
    );

    console.log(
      "📖 Stories:",
      getStoryDatabase().length
    );

  }
);
