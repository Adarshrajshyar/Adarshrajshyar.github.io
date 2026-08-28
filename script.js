/* =========================================================
   ADARSH RAJ SHAYAR
   ARS OFFICIAL WEBSITE
   script.js — FINAL CORE VERSION
   ========================================================= */

"use strict";


/* =========================================================
   GLOBAL ARS OBJECT
   ========================================================= */

window.ARS = window.ARS || {};

const CONFIG = window.ARS_CONFIG || {};


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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

  console.log("🌹 ARS Official Website Loaded");

});


/* =========================================================
   LOADER
   ========================================================= */

function initLoader() {

  const loader = document.getElementById("loader");

  if (!loader) return;

  window.addEventListener("load", () => {

    setTimeout(() => {

      loader.classList.add("hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);

    }, 500);

  });

}
/* =========================================================
   🚀 ARS PAGE LOADER - FIXED
========================================================= */

(function () {

  function hidePageLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(function () {
      loader.style.display = "none";
    }, 600);
  }


  /* Normal loading */
  window.addEventListener("load", function () {

    setTimeout(function () {
      hidePageLoader();
    }, 700);

  });


  /* Safety fallback
     Loader 5 seconds से ज्यादा नहीं रहेगा */
  setTimeout(function () {
    hidePageLoader();
  }, 5000);

})();

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


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

  const menuButton =
    document.querySelector(
      "#menuToggle, .menu-toggle, .hamburger"
    );

  const nav =
    document.querySelector(
      "#mainNav, .main-nav, nav"
    );

  if (!menuButton || !nav) return;

  menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");
    menuButton.classList.toggle("active");

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");
      menuButton.classList.remove("active");

    });

  });

}


/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

  const button =
    document.getElementById("themeToggle");

  if (!button) return;

  const savedTheme =
    localStorage.getItem("ARS_THEME");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  button.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const dark =
      document.body.classList.contains("dark-mode");

    localStorage.setItem(
      "ARS_THEME",
      dark ? "dark" : "light"
    );

    button.innerHTML =
      dark ? "☀️" : "🌙";

  });

}


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function initProgressBar() {

  let bar =
    document.getElementById("progressBar");

  if (!bar) return;

  window.addEventListener("scroll", () => {

    const scrollTop =
      window.scrollY;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percentage =
      height > 0
        ? (scrollTop / height) * 100
        : 0;

    bar.style.width =
      percentage + "%";

  });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

  const button =
    document.getElementById("backToTop");

  if (!button) return;

  window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }

  });

  button.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   WELCOME POPUP
   ========================================================= */

function initWelcomePopup() {

  const popup =
    document.getElementById("welcomePopup");

  if (!popup) return;

  const close =
    popup.querySelector(
      ".popup-close, #closePopup"
    );

  const seen =
    sessionStorage.getItem(
      "ARS_WELCOME_SHOWN"
    );

  if (!seen) {

    setTimeout(() => {

      popup.classList.add("show");

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

}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

function initNavigation() {

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

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

}


/* =========================================================
   COUNTERS
   ========================================================= */

function initCounters() {

  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );

  if (!counters.length) return;

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const element =
            entry.target;

          const target =
            Number(
              element.dataset.counter
            ) || 0;

          animateCounter(
            element,
            target
          );

          observer.unobserve(element);

        });

      },
      { threshold: 0.5 }
    );

  counters.forEach(counter => {
    observer.observe(counter);
  });

}


function animateCounter(element, target) {

  let current = 0;

  const duration = 1200;
  const start = performance.now();

  function update(time) {

    const progress =
      Math.min(
        (time - start) / duration,
        1
      );

    current =
      Math.floor(
        progress * target
      );

    element.textContent =
      current.toLocaleString("en-IN");

    if (progress < 1) {
      requestAnimationFrame(update);
    }

  }

  requestAnimationFrame(update);

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal, .animate-on-scroll"
    );

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

  elements.forEach(element => {
    observer.observe(element);
  });

}


/* =========================================================
   SEARCH SYSTEM
   ========================================================= */

function initSearch() {

  const input =
    document.getElementById("searchInput");

  const button =
    document.getElementById("searchButton");

  if (!input) return;

  function performSearch() {

    const query =
      input.value.trim();

    if (!query) {

      showToast(
        "कृपया कुछ खोजें।",
        "warning"
      );

      return;

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

    if (
      window.ARS_STORIES &&
      typeof window.ARS_STORIES.search ===
        "function"
    ) {

      results.push(
        ...window.ARS_STORIES.search(query)
      );

    }

    renderSearchResults(
      results,
      query
    );

  }

  if (button) {
    button.addEventListener(
      "click",
      performSearch
    );
  }

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        performSearch();
      }

    }
  );

}


/* =========================================================
   SEARCH RESULTS
   ========================================================= */

function renderSearchResults(
  results,
  query
) {

  const container =
    document.getElementById(
      "searchResults"
    );

  if (!container) {

    showToast(
      `${results.length} परिणाम मिले।`,
      "success"
    );

    return;

  }

  container.innerHTML = "";

  if (!results.length) {

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔎</div>
        <h3>कोई परिणाम नहीं मिला</h3>
        <p>"${escapeHTML(query)}" के लिए
        कोई सामग्री नहीं मिली।</p>
      </div>
    `;

    return;

  }

  results.forEach(item => {

    const card =
      document.createElement("article");

    card.className =
      "content-card search-result-card";

    card.innerHTML = `
      <span class="content-category">
        ${escapeHTML(
          item.category || "Content"
        )}
      </span>

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

      <small>
        ✍️ ${escapeHTML(
          item.author || "Adarsh Raj"
        )}
      </small>
    `;

    container.appendChild(card);

  });

}


/* =========================================================
   CONTENT SECTIONS
   ========================================================= */

function initContentSections() {

  renderShayariCategories();
  renderStoryCategories();
  renderHomeContent();

}


/* =========================================================
   SHAYARI CATEGORY RENDER
   ========================================================= */

function renderShayariCategories() {

  const container =
    document.getElementById(
      "shayariContainer"
    );

  if (!container) return;

  if (
    !window.ARS_SHAYARI ||
    !Array.isArray(
      window.ARS_SHAYARI.data
    )
  ) {

    container.innerHTML =
      emptyContent("Shayari");

    return;

  }

  renderCards(
    container,
    window.ARS_SHAYARI.data
  );

}


/* =========================================================
   STORY CATEGORY RENDER
   ========================================================= */

function renderStoryCategories() {

  const container =
    document.getElementById(
      "storyContainer"
    );

  if (!container) return;

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


/* =========================================================
   HOME CONTENT
   ========================================================= */

function renderHomeContent() {

  const container =
    document.getElementById(
      "featuredContent"
    );

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

  if (
    window.ARS_STORIES &&
    Array.isArray(
      window.ARS_STORIES.data
    )
  ) {

    content.push(
      ...window.ARS_STORIES.data.slice(0, 3)
    );

  }

  renderCards(
    container,
    content
  );

}


/* =========================================================
   GENERIC CARD RENDER
   ========================================================= */

function renderCards(
  container,
  items
) {

  container.innerHTML = "";

  if (!items.length) {

    container.innerHTML =
      emptyContent();

    return;

  }

  items.forEach(item => {

    const card =
      document.createElement("article");

    card.className =
      "content-card";

    card.innerHTML = `

      <div class="card-top">

        <span class="content-category">
          ${escapeHTML(
            item.category || "Content"
          )}
        </span>

      </div>

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

  initCopyButtons();

}


/* =========================================================
   COPY CONTENT
   ========================================================= */

function initCopyButtons() {

  document
    .querySelectorAll(".copy-content")
    .forEach(button => {

      if (button.dataset.ready === "true") {
        return;
      }

      button.dataset.ready = "true";

      button.addEventListener(
        "click",
        async () => {

          const text =
            button.dataset.copy || "";

          try {

            await navigator.clipboard.writeText(
              text
            );

            showToast(
              "सामग्री कॉपी हो गई।",
              "success"
            );

          } catch {

            showToast(
              "कॉपी नहीं हो सकी।",
              "error"
            );

          }

        }
      );

    });

}


/* =========================================================
   CERTIFICATE LINKS
   ========================================================= */

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

}


/* =========================================================
   JOIN ARS LINKS
   ========================================================= */

function initJoiningLinks() {

  document.querySelectorAll(
    "[data-joining-link]"
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const page =
          button.dataset.joiningLink ||
          "joining.html";

        window.location.href = page;

      }
    );

  });

}


/* =========================================================
   JOINING APPLICATION STORAGE
   ========================================================= */

function saveJoiningApplication(
  application
) {

  const key =
    "ARS_JOINING_APPLICATIONS";

  let applications = [];

  try {

    applications =
      JSON.parse(
        localStorage.getItem(key)
      ) || [];

  } catch {

    applications = [];

  }

  const id =
    "ARS-JOIN-" +
    Date.now().toString(36).toUpperCase();

  const record = {

    id,

    name:
      String(
        application.name || ""
      ).trim(),

    email:
      String(
        application.email || ""
      ).trim(),

    mobile:
      String(
        application.mobile || ""
      ).trim(),

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

}


/* =========================================================
   JOINING FORM
   ========================================================= */

function initJoiningForm() {

  const form =
    document.getElementById(
      "joiningForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const formData =
        new FormData(form);

      const application =
        saveJoiningApplication({

          name:
            formData.get("name"),

          email:
            formData.get("email"),

          mobile:
            formData.get("mobile"),

          role:
            formData.get("role"),

          message:
            formData.get("message")

        });

      showToast(
        `Application submitted: ${application.id}`,
        "success"
      );

      form.reset();

    }
  );

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initContactForm() {

  const form =
    document.getElementById(
      "contactForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const name =
        form.querySelector(
          '[name="name"]'
        )?.value.trim();

      const email =
        form.querySelector(
          '[name="email"]'
        )?.value.trim();

      const message =
        form.querySelector(
          '[name="message"]'
        )?.value.trim();

      if (!name || !email || !message) {

        showToast(
          "कृपया सभी आवश्यक जानकारी भरें।",
          "warning"
        );

        return;

      }

      /*
       * EmailJS configured होने पर
       * यहाँ EmailJS भेजा जा सकता है।
       */

      if (
        typeof emailjs !== "undefined" &&
        CONFIG.email &&
        CONFIG.email.enabled &&
        !String(
          CONFIG.email.publicKey || ""
        ).startsWith("YOUR_")
      ) {

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

            form.reset();

          }).catch(() => {

            showToast(
              "संदेश भेजने में समस्या हुई।",
              "error"
            );

          });

          return;

        } catch {

          // fallback below

        }

      }

      showToast(
        "संदेश तैयार है। EmailJS configuration जोड़ने के बाद यह सीधे भेजा जा सकता है।",
        "info"
      );

      form.reset();

    }
  );

}


/* =========================================================
   FAVOURITE SYSTEM
   ========================================================= */

function getFavourites() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "ARS_FAVOURITES"
      )
    ) || [];

  } catch {

    return [];

  }

}


function toggleFavourite(id) {

  if (!id) return false;

  let favourites =
    getFavourites();

  if (favourites.includes(id)) {

    favourites =
      favourites.filter(
        item => item !== id
      );

    localStorage.setItem(
      "ARS_FAVOURITES",
      JSON.stringify(favourites)
    );

    return false;

  }

  favourites.push(id);

  localStorage.setItem(
    "ARS_FAVOURITES",
    JSON.stringify(favourites)
  );

  return true;

}


/* =========================================================
   LIKE SYSTEM
   ========================================================= */

function toggleLike(id) {

  if (!id) return false;

  let likes = {};

  try {

    likes =
      JSON.parse(
        localStorage.getItem(
          "ARS_LIKES"
        )
      ) || {};

  } catch {

    likes = {};

  }

  likes[id] =
    !Boolean(likes[id]);

  localStorage.setItem(
    "ARS_LIKES",
    JSON.stringify(likes)
  );

  return likes[id];

}


/* =========================================================
   VIEW COUNTER
   ========================================================= */

function addView(id) {

  if (!id) return 0;

  let views = {};

  try {

    views =
      JSON.parse(
        localStorage.getItem(
          "ARS_VIEWS"
        )
      ) || {};

  } catch {

    views = {};

  }

  views[id] =
    Number(views[id] || 0) + 1;

  localStorage.setItem(
    "ARS_VIEWS",
    JSON.stringify(views)
  );

  return views[id];

}


/* =========================================================
   CERTIFICATE QUICK VERIFY
   ========================================================= */

function quickVerifyCertificate(value) {

  if (
    !window.ARS_CERTIFICATES ||
    typeof window.ARS_CERTIFICATES.verify !==
      "function"
  ) {

    showToast(
      "Certificate system उपलब्ध नहीं है।",
      "error"
    );

    return null;

  }

  const result =
    window.ARS_CERTIFICATES.verify(
      value
    );

  const resultBox =
    document.getElementById(
      "certificateVerifyResult"
    );

  if (resultBox) {

    if (result.verified) {

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

    } else {

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

    }

  }

  return result;

}


/* =========================================================
   CERTIFICATE VERIFY FORM
   ========================================================= */

function initCertificateVerifyForm() {

  const form =
    document.getElementById(
      "certificateVerifyForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const input =
        form.querySelector(
          '[name="certificate"]'
        );

      quickVerifyCertificate(
        input?.value || ""
      );

    }
  );

}


/* =========================================================
   CERTIFICATE JOINING CHECK
   ========================================================= */

function checkJoiningCertificate(
  joiningId
) {

  if (!joiningId) {

    return {
      approved: false,
      certificate: null
    };

  }

  if (
    !window.ARS_CERTIFICATES ||
    typeof window.ARS_CERTIFICATES.getAll !==
      "function"
  ) {

    return {
      approved: false,
      certificate: null
    };

  }

  const certificates =
    window.ARS_CERTIFICATES.getAll();

  const certificate =
    certificates.find(
      item =>
        item.joiningId === joiningId &&
        item.status === "Valid"
    );

  return {

    approved:
      Boolean(certificate),

    certificate:
      certificate || null

  };

}


/* =========================================================
   INIT CERTIFICATE VERIFY
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initCertificateVerifyForm();
    initJoiningForm();

  }
);


/* =========================================================
   TOAST SYSTEM
   ========================================================= */

function showToast(
  message,
  type = "info"
) {

  let container =
    document.getElementById(
      "toastContainer"
    );

  if (!container) {

    container =
      document.createElement("div");

    container.id =
      "toastContainer";

    container.className =
      "toast-container";

    document.body.appendChild(
      container
    );

  }

  const toast =
    document.createElement("div");

  toast.className =
    `toast toast-${type}`;

  toast.textContent =
    message;

  container.appendChild(
    toast
  );

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 3500);

}


/* =========================================================
   EMPTY CONTENT
   ========================================================= */

function emptyContent(
  name = "Content"
) {

  return `
    <div class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>अभी कोई ${escapeHTML(name)} उपलब्ध नहीं है</h3>
      <p>जल्द ही नई सामग्री जोड़ी जाएगी।</p>
    </div>
  `;

}


/* =========================================================
   HTML SECURITY
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

  return escapeHTML(value)
    .replace(/\n/g, "&#10;")
    .replace(/\r/g, "&#13;");

}


/* =========================================================
   GLOBAL ARS API
   ========================================================= */

window.ARS = {

  config:
    CONFIG,

  toast:
    showToast,

  favourites: {

    get:
      getFavourites,

    toggle:
      toggleFavourite

  },

  likes: {

    toggle:
      toggleLike

  },

  views: {

    add:
      addView

  },

  certificate: {

    verify:
      quickVerifyCertificate,

    checkJoining:
      checkJoiningCertificate

  },

  joining: {

    save:
      saveJoiningApplication

  },

  search: {

    run:
      renderSearchResults

  }

};


/* =========================================================
   CONSOLE STATUS
   ========================================================= */

console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);

console.log(
  "🌹 ARS OFFICIAL WEBSITE"
);

console.log(
  "👤 Founder: Adarsh Raj"
);

console.log(
  "📚 Shayari System:",
  window.ARS_SHAYARI
    ? "CONNECTED"
    : "NOT FOUND"
);

console.log(
  "📖 Story System:",
  window.ARS_STORIES
    ? "CONNECTED"
    : "NOT FOUND"
);

console.log(
  "🏆 Certificate System:",
  window.ARS_CERTIFICATES
    ? "CONNECTED"
    : "NOT FOUND"
);

console.log(
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);
