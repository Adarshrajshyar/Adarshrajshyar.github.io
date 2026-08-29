/* =========================================================
   ARS OFFICIAL CONFIGURATION
   ========================================================= */

window.ARS_CONFIG = Object.freeze({

  VERSION: "5.0.0",

  SITE_NAME: "Adarsh Raj Shayar",

  FOUNDER: "Adarsh Raj",

  WEBSITE_URL:
    "https://adarshrajshyar.github.io/",

  INSTAGRAM_URL:
    "https://www.instagram.com/adarshrajshyar/",

  /* -----------------------------------------
     EMAILJS
     ----------------------------------------- */
  EMAILJS: Object.freeze({
    SERVICE_ID: "service_3h6mmz4",
    TEMPLATE_ID: "template_2kzi4j8",
    PUBLIC_KEY: "kEJqwQlbZ03jFbMFC"
  }),

  /* -----------------------------------------
     PANEL PASSWORDS
     
     NOTE:
     Static frontend passwords are NOT secure
     for a real production admin system.
     These are only for the current frontend
     version.
     ----------------------------------------- */

  ADMIN_PASSWORD: "ARS2026",

  PUBLISHER_PASSWORD: "Adarsh2026",

  /* -----------------------------------------
     CERTIFICATE
     ----------------------------------------- */
  CERTIFICATE: Object.freeze({
    PREFIX: "ARS-CERT",
    JOINING_PREFIX: "ARS-MEMBER",
    VERIFY_PAGE: "verify.html"
  }),

  /* -----------------------------------------
     STORAGE VERSION
     ----------------------------------------- */
  STORAGE_VERSION: "5.0"

});

console.log(
  "🌹 ARS Configuration Loaded:",
  window.ARS_CONFIG.VERSION
);
