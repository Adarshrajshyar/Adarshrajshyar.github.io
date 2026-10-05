/* =========================================================
   ARS — ADARSH KE ALFAZ
   MAIN WEBSITE JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

const ARS = {

  $: function (selector, parent = document) {
    return parent.querySelector(selector);
  },

  $$: function (selector, parent = document) {
    return Array.from(
      parent.querySelectorAll(selector)
    );
  },

  showToast: function (message) {

    const toast =
      this.$("#arsToast");

    if (!toast) {
      return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    window.clearTimeout(
      toast._hideTimer
    );

    toast._hideTimer =
      window.setTimeout(
        function () {
          toast.classList.remove("show");
        },
        2600
      );

  }

};


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    initYear();

    initMobileMenu();

    initTheme();

    initBackToTop();

    initActiveNavigation();

    initAssetFallbacks();

    initSmoothInternalLinks();

  }
);


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initYear() {

  const year =
    document.getElementById("currentYear");

  if (!year) {
    return;
  }

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  if (!menuToggle || !mainNav) {
    return;
  }


  menuToggle.addEventListener(
    "click",
    function () {

      const isOpen =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  /* Close after navigation */

  mainNav
    .querySelectorAll("a")
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );


  /* Close when clicked outside */

  document.addEventListener(
    "click",
    function (event) {

      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

}


/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

  const themeToggle =
    document.getElementById("themeToggle");

  if (!themeToggle) {
    return;
  }


  const savedTheme =
    localStorage.getItem("ARS_THEME");


  if (savedTheme === "dark") {

    document.body.classList.add(
      "dark-theme"
    );

    themeToggle.textContent = "☀️";

  }


  themeToggle.addEventListener(
    "click",
    function () {

      const isDark =
        document.body.classList.toggle(
          "dark-theme"
        );


      localStorage.setItem(
        "ARS_THEME",
        isDark ? "dark" : "light"
      );


      themeToggle.textContent =
        isDark
          ? "☀️"
          : "🌙";

    }
  );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

  const backTop =
    document.getElementById("backTop");

  if (!backTop) {
    return;
  }


  window.addEventListener(
    "scroll",
    function () {

      if (window.scrollY > 500) {

        backTop.classList.add(
          "visible"
        );

      } else {

        backTop.classList.remove(
          "visible"
        );

      }

    },
    {
      passive: true
    }
  );


  backTop.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

  const links =
    ARS.$$(".main-nav a");

  if (!links.length) {
    return;
  }

  const currentPath =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  links.forEach(
    function (link) {

      const href =
        link.getAttribute("href");

      if (!href) {
        return;
      }


      const cleanHref =
        href
          .split("?")[0]
          .split("#")[0]
          .toLowerCase();


      if (
        cleanHref === currentPath ||
        (
          currentPath === "" &&
          cleanHref === "index.html"
        )
      ) {

        link.classList.add("active");

      }

    }
  );

}


/* =========================================================
   ASSET FALLBACKS
   ========================================================= */

function initAssetFallbacks() {

  const images =
    ARS.$$("img");

  images.forEach(
    function (image) {

      image.addEventListener(
        "error",
        function () {

          image.style.display =
            "none";

        }
      );

    }
  );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

function initSmoothInternalLinks() {

  const links =
    ARS.$$(
      'a[href^="#"]'
    );

  links.forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const href =
            link.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(href);

          if (!target) {
            return;
          }


          event.preventDefault();


          const header =
            document.getElementById(
              "siteHeader"
            );

          const offset =
            header
              ? header.offsetHeight + 15
              : 15;


          const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;


          window.scrollTo({
            top: targetTop,
            behavior: "smooth"
          });

        }
      );

    }
  );

}


/* =========================================================
   PUBLIC GLOBAL API
   ========================================================= */

window.ARS = ARS;

/* =========================================================
   ARS — CENTRAL JAVASCRIPT MODULE LOADER
   ========================================================= */

(function loadARSModules() {

  "use strict";

  const modules = [
    "site-config.js",
    "page-loader.js",
    "pwa-register.js"
  ];

  modules.forEach(function (file) {

    const script =
      document.createElement("script");

    script.src =
      "js/" + file;

    script.defer = true;

    document.head.appendChild(script);

  });

})();
