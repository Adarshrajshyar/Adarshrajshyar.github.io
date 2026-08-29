/* =========================================================
   ARS OFFICIAL WEBSITE — CONFIGURATION
   Version: 5.0.0
   ========================================================= */

(function (window) {
  "use strict";

  window.ARS_CONFIG = Object.freeze({

    VERSION: "5.0.0",

    SITE_NAME: "Adarsh Raj Shayar",
    SHORT_NAME: "ARS",
    FOUNDER: "Adarsh Raj",

    INSTAGRAM_URL:
      "https://www.instagram.com/adarshrajshyar/",

    ASSETS: {
      LOGO: "logo.png",
      BANNER: "banner.png",
      PROFILE: "photo.jpg1.jpeg",
      SIGNATURE: "signature.jpeg",
      WEBSITE_IMAGE: "website.jpeg"
    },

    EMAILJS: {
      SERVICE_ID: "service_3h6mmz4",
      TEMPLATE_ID: "template_2kzi4j8",
      PUBLIC_KEY: "kEJqwQlbZ03jFbMFC"
    },

    /* Change these before public deployment */
    ADMIN_PASSWORD: "CHANGE_THIS_ADMIN_PASSWORD",
    PUBLISHER_PASSWORD: "CHANGE_THIS_PUBLISHER_PASSWORD",

    CERTIFICATE: {
      PREFIX: "ARS-CERT-",
      JOINING_PREFIX: "ARS-MEMBER-",
      ORGANIZATION: "ARS Official",
      FOUNDER_TITLE: "Founder, ARS",
      WEBSITE: "Adarsh Raj Shayar"
    },

    CATEGORIES: [
      "love",
      "sad",
      "attitude",
      "friendship",
      "motivation",
      "life",
      "education",
      "inspiration",
      "general"
    ],

    FEATURES: {
      LIKE: true,
      FAVORITE: true,
      SEARCH: true,
      CONTACT: true,
      CERTIFICATE: true,
      JOINING: true,
      VERIFICATION: true,
      PUBLISHER: true,
      ADMIN: true
    }

  });

  console.log(
    "🌹 ARS Official Configuration Loaded",
    window.ARS_CONFIG.VERSION
  );

})(window);
