/* =========================================================
   ARS OFFICIAL — CONFIG.JS
   Central Website Configuration
   ========================================================= */

"use strict";

(function (window) {

  const ARS_CONFIG = Object.freeze({

    /* ---------------- BRAND ---------------- */

    siteName: "Adarsh Raj Shayar",
    shortName: "ARS Official",

    founderName: "Adarsh Raj",
    publisherName: "Adarsh Raj",

    logo: "logo.png",
    signature: "signature.jpg",

    /* ---------------- SOCIAL ---------------- */

    /*
      Instagram ID:
      इसे पूरे website में इसी एक जगह से control किया जाएगा.
    */
    instagramId: "adarshrajshyar",
    instagramUrl: "https://www.instagram.com/adarshrajshyar/",

    /* ---------------- CERTIFICATE ---------------- */

    certificatePrefix: "ARS-CERT",

    certificateIssuer:
      "Adarsh Raj — Founder, ARS Official",

    certificateVerificationPage:
      "verify.html",

    /* ---------------- PUBLISHER ---------------- */

    publisher: {
      name: "Adarsh Raj",
      role: "Founder & Publisher",
      organization: "ARS Official"
    },

    /* ---------------- ASSETS ---------------- */

    assets: {
      logo: "logo.png",
      signature: "signature.jpg",
      banner: "banner.png"
    }

  });

  window.ARS_CONFIG = ARS_CONFIG;

  console.log("⚙️ ARS Configuration Loaded");

})(window);
