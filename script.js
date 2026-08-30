/* =========================================================
   ARS OFFICIAL — MASTER SCRIPT
   Adarsh Raj Shayar
   Main website controller
========================================================= */

"use strict";

/* =========================================================
   GLOBAL ARS CONFIG
========================================================= */

window.ARS_CONFIG = window.ARS_CONFIG || {

  instagram:
    "https://www.instagram.com/adarshrajshyar/",

  website:
    window.location.origin,

  brand:
    "ARS Official",

  founder:
    "Adarsh Raj Shayar"

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initLoader();
  initNavigation();
  initBackToTop();
  initInstagram();
  initSearch();
  initCategories();
  initInteractions();
  initContactForm();
  initYear();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

  const loader =
    document.querySelector(".page-loader");

  if (!loader) return;

  const hideLoader = () => {

    setTimeout(() => {
      loader.classList.add("hide");
    }, 350);

  };

  if (document.readyState === "complete") {

    hideLoader();

  } else {

    window.addEventListener(
      "load",
      hideLoader,
      { once: true }
    );

  }

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

  const toggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".nav-links");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {

    const isOpen =
      nav.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    toggle.textContent =
      isOpen ? "✕" : "☰";

  });


  /* Close menu after clicking a link */

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.textContent = "☰";

    });

  });


  /* Close menu when clicking outside */

  document.addEventListener("click", event => {

    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {

      nav.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.textContent = "☰";

    }

  });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

  const button =
    document.querySelector(".back-top");

  if (!button) return;

  const update =
    () => {

      button.classList.toggle(
        "show",
        window.scrollY > 450
      );

    };

  window.addEventListener(
    "scroll",
    update,
    { passive: true }
  );

  update();


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
   INSTAGRAM
========================================================= */

function initInstagram() {

  const link =
    document.getElementById(
      "instagramLink"
    );

  if (!link) return;

  link.href =
    window.ARS_CONFIG.instagram;

  link.target = "_blank";

  link.rel =
    "noopener noreferrer";

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

  const searchInput =
    document.querySelector(
      ".search-box input"
    );

  if (!searchInput) return;

  const cards =
    Array.from(
      document.querySelectorAll(
        ".content-card"
      )
    );

  if (!cards.length) return;

  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();

      let visible = 0;

      cards.forEach(card => {

        const text =
          card.textContent
            .toLowerCase();

        const matched =
          !query ||
          text.includes(query);

        card.style.display =
          matched ? "" : "none";

        if (matched) {
          visible++;
        }

      });

      showSearchEmpty(
        visible === 0 && query
      );

    }
  );

}


/* =========================================================
   SEARCH EMPTY STATE
========================================================= */

function showSearchEmpty(show) {

  let empty =
    document.getElementById(
      "searchEmptyState"
    );

  if (show) {

    if (empty) return;

    const grid =
      document.querySelector(
        ".content-grid"
      );

    if (!grid) return;

    empty =
      document.createElement("div");

    empty.id =
      "searchEmptyState";

    empty.className =
      "empty-state";

    empty.innerHTML = `
      <div>🔎</div>
      <h3>कोई परिणाम नहीं मिला</h3>
      <p>अपनी खोज बदलकर फिर कोशिश करें।</p>
    `;

    grid.parentNode.insertBefore(
      empty,
      grid.nextSibling
    );

  } else if (empty) {

    empty.remove();

  }

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function initCategories() {

  const buttons =
    document.querySelectorAll(
      ".category-btn"
    );

  if (!buttons.length) return;

  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        buttons.forEach(btn =>
          btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
          (
            button.dataset.category ||
            button.textContent ||
            "all"
          )
          .trim()
          .toLowerCase();

        filterCards(category);

      }
    );

  });

}


/* =========================================================
   FILTER CARDS
========================================================= */

function filterCards(category) {

  const cards =
    document.querySelectorAll(
      ".content-card"
    );

  if (!cards.length) return;

  const isAll =
    category === "all" ||
    category === "सभी" ||
    category === "*";

  let visible = 0;

  cards.forEach(card => {

    const cardCategory =
      (
        card.dataset.category ||
        card.getAttribute("data-category") ||
        card.querySelector(".tag")?.textContent ||
        ""
      )
      .trim()
      .toLowerCase();

    const match =
      isAll ||
      cardCategory === category ||
      cardCategory.includes(category) ||
      category.includes(cardCategory);

    card.style.display =
      match ? "" : "none";

    if (match) visible++;

  });

  const empty =
    document.getElementById(
      "categoryEmptyState"
    );

  if (visible === 0 && !empty) {

    const grid =
      document.querySelector(
        ".content-grid"
      );

    if (!grid) return;

    const state =
      document.createElement("div");

    state.id =
      "categoryEmptyState";

    state.className =
      "empty-state";

    state.innerHTML = `
      <div>📚</div>
      <h3>इस category में अभी content नहीं है</h3>
      <p>दूसरी category चुनें।</p>
    `;

    grid.parentNode.insertBefore(
      state,
      grid.nextSibling
    );

  } else if (
    visible > 0 &&
    empty
  ) {

    empty.remove();

  }

}


/* =========================================================
   LIKE / FAVORITE / SAVE / SHARE
========================================================= */

function initInteractions() {

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".card-action"
        );

      if (!button) return;

      const action =
        (
          button.dataset.action ||
          button.textContent
        )
        .trim()
        .toLowerCase();

      const card =
        button.closest(
          ".content-card"
        );

      if (
        action.includes("like") ||
        action.includes("लाइक")
      ) {

        toggleLike(
          button,
          card
        );

        return;

      }


      if (
        action.includes("favorite") ||
        action.includes("fav") ||
        action.includes("फेवरेट")
      ) {

        toggleFavorite(
          button,
          card
        );

        return;

      }


      if (
        action.includes("save") ||
        action.includes("सेव")
      ) {

        toggleSave(
          button,
          card
        );

        return;

      }


      if (
        action.includes("share") ||
        action.includes("शेयर")
      ) {

        shareCard(card);

      }

    }
  );

}


/* =========================================================
   UNIQUE CONTENT KEY
========================================================= */

function getContentKey(card) {

  if (!card) return "";

  if (card.dataset.id) {

    return card.dataset.id;

  }

  const title =
    card.querySelector("h3")
      ?.textContent
      ?.trim() || "";

  const text =
    card.querySelector(".content-text")
      ?.textContent
      ?.trim() || "";

  return (
    title + "|" + text
  )
    .toLowerCase()
    .replace(/\s+/g, " ")
    .slice(0, 180);

}


/* =========================================================
   LIKE
========================================================= */

function toggleLike(button, card) {

  if (!card) return;

  const key =
    "ARS_LIKE_" +
    getContentKey(card);

  const liked =
    localStorage.getItem(key) === "true";

  localStorage.setItem(
    key,
    String(!liked)
  );

  button.classList.toggle(
    "favorite-active",
    !liked
  );

  button.setAttribute(
    "aria-pressed",
    String(!liked)
  );

  button.textContent =
    !liked ? "❤️ Liked" : "♡ Like";

  showToast(
    !liked
      ? "❤️ Like किया गया"
      : "Like हटाया गया"
  );

}


/* =========================================================
   FAVORITE
========================================================= */

function toggleFavorite(button, card) {

  if (!card) return;

  const key =
    "ARS_FAVORITE_" +
    getContentKey(card);

  const active =
    localStorage.getItem(key) === "true";

  localStorage.setItem(
    key,
    String(!active)
  );

  button.classList.toggle(
    "favorite-active",
    !active
  );

  button.textContent =
    !active
      ? "⭐ Favorite"
      : "☆ Favorite";

  showToast(
    !active
      ? "⭐ Favorite में जोड़ा गया"
      : "Favorite से हटाया गया"
  );

}


/* =========================================================
   SAVE
========================================================= */

function toggleSave(button, card) {

  if (!card) return;

  const key =
    "ARS_SAVED_ITEMS";

  let saved = [];

  try {

    saved =
      JSON.parse(
        localStorage.getItem(key) ||
        "[]"
      );

  } catch {

    saved = [];

  }

  const id =
    getContentKey(card);

  const index =
    saved.indexOf(id);

  if (index === -1) {

    saved.push(id);

    localStorage.setItem(
      key,
      JSON.stringify(saved)
    );

    button.classList.add(
      "favorite-active"
    );

    button.textContent =
      "💾 Saved";

    showToast(
      "💾 Content save किया गया"
    );

  } else {

    saved.splice(index, 1);

    localStorage.setItem(
      key,
      JSON.stringify(saved)
    );

    button.classList.remove(
      "favorite-active"
    );

    button.textContent =
      "💾 Save";

    showToast(
      "Save हटाया गया"
    );

  }

}


/* =========================================================
   SHARE
========================================================= */

async function shareCard(card) {

  if (!card) return;

  const title =
    card.querySelector("h3")
      ?.textContent
      ?.trim() ||
    "ARS Official";

  const text =
    card.querySelector(".content-text")
      ?.textContent
      ?.trim() ||
    "ARS Official";

  const shareData = {

    title:
      title,

    text:
      text +
      "\n\n— ARS Official",

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

      return;

    } catch (error) {

      if (
        error?.name ===
        "AbortError"
      ) {

        return;

      }

    }

  }


  try {

    await navigator.clipboard.writeText(
      shareData.url
    );

    showToast(
      "🔗 Link copy हो गया"
    );

  } catch {

    showToast(
      "🔗 Share करने के लिए browser menu इस्तेमाल करें"
    );

  }

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {

  let toast =
    document.querySelector(".toast");

  if (!toast) {

    toast =
      document.createElement("div");

    toast.className =
      "toast";

    document.body.appendChild(
      toast
    );

  }

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2200
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

  const form =
    document.querySelector(
      "#contactForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const name =
        form.querySelector(
          '[name="name"]'
        )?.value.trim() || "";

      const email =
        form.querySelector(
          '[name="email"]'
        )?.value.trim() || "";

      const message =
        form.querySelector(
          '[name="message"]'
        )?.value.trim() || "";

      if (
        !name ||
        !email ||
        !message
      ) {

        showToast(
          "कृपया सभी जरूरी जानकारी भरें।"
        );

        return;

      }

      /*
        Front-end demo only.

        वास्तविक email delivery के लिए
        backend / Formspree / EmailJS /
        अपना server आदि जोड़ना होगा।
      */

      showToast(
        "✅ आपका संदेश तैयार है।"
      );

      form.reset();

    }
  );

}


/* =========================================================
   FOOTER YEAR
========================================================= */

function initYear() {

  document
    .querySelectorAll(
      "[data-year]"
    )
    .forEach(element => {

      element.textContent =
        new Date()
          .getFullYear();

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

(function markActiveNavigation() {

  const current =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase() ||
    "index.html";

  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(link => {

      const href =
        link.getAttribute("href");

      if (!href) return;

      const page =
        href
          .split("/")
          .pop()
          .split("?")[0]
          .toLowerCase();

      if (
        page === current
      ) {

        link.classList.add(
          "active"
        );

      }

    });

})();


/* =========================================================
   INITIAL CARD STATES
========================================================= */

(function restoreStates() {

  document
    .querySelectorAll(
      ".content-card"
    )
    .forEach(card => {

      const key =
        getContentKey(card);

      const likeButton =
        card.querySelector(
          '[data-action="like"]'
        );

      const favoriteButton =
        card.querySelector(
          '[data-action="favorite"]'
        );

      const saveButton =
        card.querySelector(
          '[data-action="save"]'
        );


      if (
        likeButton &&
        localStorage.getItem(
          "ARS_LIKE_" + key
        ) === "true"
      ) {

        likeButton.classList.add(
          "favorite-active"
        );

        likeButton.textContent =
          "❤️ Liked";

      }


      if (
        favoriteButton &&
        localStorage.getItem(
          "ARS_FAVORITE_" + key
        ) === "true"
      ) {

        favoriteButton.classList.add(
          "favorite-active"
        );

        favoriteButton.textContent =
          "⭐ Favorite";

      }


      if (saveButton) {

        let saved = [];

        try {

          saved =
            JSON.parse(
              localStorage.getItem(
                "ARS_SAVED_ITEMS"
              ) || "[]"
            );

        } catch {

          saved = [];

        }

        if (
          saved.includes(key)
        ) {

          saveButton.classList.add(
            "favorite-active"
          );

          saveButton.textContent =
            "💾 Saved";

        }

      }

    });

})();


/* =========================================================
   GLOBAL HELPERS
========================================================= */

window.ARS = {

  toast:
    showToast,

  share:
    shareCard,

  filter:
    filterCards,

  version:
    "ARS Official Master Script"

};
