/* =========================================================
   ARS OFFICIAL WEBSITE — CONFIGURATION
   Version: 3.0.0
   Founder / Author: Adarsh Raj
   ========================================================= */

(function (window) {
  "use strict";

  /*
   * IMPORTANT:
   * This file intentionally uses ONE global object: window.ARS_CONFIG
   * so it does not cause:
   * "Identifier 'ARS_CONFIG' has already been declared"
   */

  window.ARS_CONFIG = {
    version: "3.0.0",

    site: {
      name: "ARS Official Website",
      shortName: "ARS",
      founder: "Adarsh Raj",
      author: "Adarsh Raj",
      description:
        "ARS Official Website — Shayari, Stories, Certificates and more.",
      logo: "logo.png",
      favicon: "logo.png"
    },

    /* =========================
       NAVIGATION
       ========================= */
    navigation: {
      home: "index.html",
      shayari: "index.html#shayari",
      stories: "index.html#stories",
      certificates: "index.html#certificates",
      joining: "joining.html",
      verify: "verify.html",
      publisher: "admin.html",
      contact: "index.html#contact"
    },

    /* =========================
       SOCIAL MEDIA
       ========================= */
    social: {
      instagram: {
        username: "Adarshrajshyar",
        url: "https://www.instagram.com/Adarshrajshyar/"
      }
    },

    /* =========================
       CONTACT / EMAILJS
       ========================= */
    emailJS: {
      enabled: true,

      serviceID: "service_3h6mmz4",

      templateID: "template_2kzi4j8",

      publicKey: "kEJqwQlbZ03jFbMFC",

      /*
       * These names should match the variables
       * used inside your EmailJS template.
       */
      templateParams: {
        name: "name",
        email: "email",
        subject: "subject",
        message: "message",
        replyTo: "email"
      }
    },

    /* =========================
       STORAGE KEYS
       ========================= */
    storage: {
      prefix: "ARS_",

      likes: "ARS_LIKES",

      favorites: "ARS_FAVORITES",

      shayari: "ARS_SHAYARI",

      stories: "ARS_STORIES",

      certificates: "ARS_CERTIFICATES",

      joiningRequests: "ARS_JOINING_REQUESTS",

      publishedPosts: "ARS_PUBLISHED_POSTS",

      publisherSession: "ARS_PUBLISHER_SESSION",

      theme: "ARS_THEME"
    },

    /* =========================
       SHAYARI CATEGORIES
       ========================= */
    shayariCategories: [
      {
        id: "love",
        name: "Love",
        icon: "❤️"
      },
      {
        id: "sad",
        name: "Sad",
        icon: "💔"
      },
      {
        id: "attitude",
        name: "Attitude",
        icon: "🔥"
      },
      {
        id: "friendship",
        name: "Friendship",
        icon: "🤝"
      },
      {
        id: "motivation",
        name: "Motivation",
        icon: "💪"
      }
    ],

    /* =========================
       STORY CATEGORIES
       ========================= */
    storyCategories: [
      {
        id: "all",
        name: "All",
        icon: "📚"
      },
      {
        id: "story",
        name: "Stories",
        icon: "📖"
      },
      {
        id: "poem",
        name: "Poems",
        icon: "✍️"
      }
    ],

    /* =========================
       CERTIFICATE SETTINGS
       ========================= */
    certificate: {
      normal: {
        enabled: true,
        prefix: "ARS-CERT-"
      },

      joining: {
        enabled: true,
        prefix: "ARS-JOIN-",

        /*
         * Joining certificate requires approval.
         */
        approvalRequired: true
      },

      verification: {
        enabled: true,
        page: "verify.html"
      },

      logo: "logo.png",

      signature: "Adarsh Raj"
    },

    /* =========================
       PUBLISHER SETTINGS
       ========================= */
    publisher: {
      enabled: true,

      loginPage: "admin.html",

      /*
       * Do NOT put a real secret/admin password
       * inside frontend JavaScript.
       *
       * This is only a development placeholder.
       * For a real secure publisher system,
       * authentication must be handled by a backend.
       */
      sessionDuration: 24 * 60 * 60 * 1000,

      allowedContent: [
        "shayari",
        "story",
        "poem"
      ],

      categories: [
        "love",
        "sad",
        "attitude",
        "friendship",
        "motivation",
        "story",
        "poem"
      ]
    },

    /* =========================
       LIKE / FAVORITE
       ========================= */
    engagement: {
      likesEnabled: true,

      favoritesEnabled: true,

      /*
       * Clicking Like again removes the Like.
       */
      likeToggle: true,

      /*
       * Clicking Favorite again removes Favorite.
       */
      favoriteToggle: true
    },

    /* =========================
       SEARCH
       ========================= */
    search: {
      enabled: true,

      minimumCharacters: 1,

      searchFields: [
        "title",
        "text",
        "content",
        "author",
        "category",
        "tags"
      ],

      noResultMessage: "कोई परिणाम नहीं मिला।"
    },

    /* =========================
       PAGE LOADER
       ========================= */
    loader: {
      enabled: true,

      elementID: "pageLoader",

      minimumDisplayTime: 300,

      maximumWaitTime: 5000
    },

    /* =========================
       POPUPS
       ========================= */
    popup: {
      enabled: true,

      duration: 3000,

      position: "top-right"
    },

    /* =========================
       SCROLL / NAVIGATION
       ========================= */
    navigationBehavior: {
      smoothScroll: true,

      scrollToTop: true,

      backToTopButton: true,

      mobileMenu: true
    },

    /* =========================
       APP INFORMATION
       ========================= */
    app: {
      name: "Adarsh Raj Shayar",

      shortName: "ARS Shayar",

      description:
        "ARS Official Website and Shayari Platform",

      startURL: "index.html",

      display: "standalone",

      themeColor: "#111827",

      backgroundColor: "#ffffff"
    },

    /* =========================
       SECURITY / VALIDATION
       ========================= */
    security: {
      sanitizeUserInput: true,

      preventEmptyPosts: true,

      minimumPostLength: 1,

      maximumPostLength: 5000
    },

    /* =========================
       FEATURE FLAGS
       ========================= */
    features: {
      shayari: true,

      stories: true,

      poems: true,

      search: true,

      likes: true,

      favorites: true,

      normalCertificate: true,

      joiningCertificate: true,

      certificateVerification: true,

      publisherPanel: true,

      contactForm: true,

      instagram: true,

      pwa: true
    }
  };

  /* =========================================================
     SAFE HELPER FUNCTIONS
     ========================================================= */

  window.ARS_CONFIG.getStorageKey = function (key) {
    if (!key) return null;

    var value = this.storage[key];

    if (!value) {
      value = this.storage.prefix + String(key).toUpperCase();
    }

    return value;
  };

  window.ARS_CONFIG.getCategory = function (categoryID) {
    var all = this.shayariCategories.concat(this.storyCategories);

    return all.find(function (category) {
      return category.id === categoryID;
    }) || null;
  };

  window.ARS_CONFIG.isFeatureEnabled = function (feature) {
    return Boolean(
      this.features &&
      this.features[feature] === true
    );
  };

  /* =========================================================
     CONSOLE INFORMATION
     ========================================================= */

  console.log(
    "🌹 ARS Official Website Configuration Loaded",
    window.ARS_CONFIG.version
  );

})(window);
