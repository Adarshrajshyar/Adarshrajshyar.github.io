/* =========================================================
   ARS OFFICIAL
   Main Website JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initMobileNavigation();

  initCurrentYear();

  initComingSoonButtons();

  initActiveNavigation();

  initExternalLinks();

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  if (!menuToggle || !mainNav) {
    return;
  }


  menuToggle.addEventListener("click", () => {

    const isOpen =
      mainNav.classList.toggle("open");

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  const navLinks =
    mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      mainNav.classList.contains("open")
    ) {

      mainNav.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

  const yearElement =
    document.getElementById("currentYear");

  if (!yearElement) {
    return;
  }

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   COMING SOON
========================================================= */

function initComingSoonButtons() {

  const elements =
    document.querySelectorAll(
      "[data-coming-soon]"
    );

  elements.forEach((element) => {

    element.addEventListener("click", (event) => {

      event.preventDefault();

      const feature =
        element.dataset.comingSoon ||
        "This feature";

      showToast(
        `${feature} — Coming Soon`
      );

    });

  });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  window.clearTimeout(toastTimer);

  toastTimer =
    window.setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

  const navLinks =
    document.querySelectorAll(
      ".main-nav .nav-link"
    );

  if (!navLinks.length) {
    return;
  }

  const currentPage =
    getCurrentPageName();

  navLinks.forEach((link) => {

    const href =
      link.getAttribute("href");

    if (!href) {
      return;
    }

    const linkPage =
      href.split("/").pop().split("#")[0];

    link.classList.remove("active");

    if (
      linkPage === currentPage ||
      (
        currentPage === "" &&
        linkPage === "index.html"
      )
    ) {

      link.classList.add("active");

    }

  });

}


/* =========================================================
   CURRENT PAGE
========================================================= */

function getCurrentPageName() {

  const pathname =
    window.location.pathname;

  const filename =
    pathname.split("/").pop();

  return filename || "index.html";

}


/* =========================================================
   EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {

    link.addEventListener("click", () => {

      /*
       * External links intentionally open in a new tab.
       * rel="noopener noreferrer" is already present
       * in the HTML for security.
       */

    });

  });

}


/* =========================================================
   GLOBAL SAFE HELPERS
   Other ARS pages can reuse these functions.
========================================================= */

window.ARS = {

  showToast,

  getCurrentPageName

};
