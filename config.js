/* =========================================================
   ARS OFFICIAL — CONFIGURATION
   Central Website Settings
   ========================================================= */

"use strict";

(function (window) {

  const ARS_CONFIG = {

    /* -------------------------------------------------------
       WEBSITE
    ------------------------------------------------------- */

    site: {
      name: "ARS Official",
      fullName: "Adarsh Raj Shayar",
      tagline: "Official Website of Adarsh Raj",
      publisher: "Adarsh Raj",
      founder: "Adarsh Raj"
    },


    /* -------------------------------------------------------
       SOCIAL MEDIA
       ------------------------------------------------------- */

    social: {
      instagram: "https://instagram.com/",
      facebook: "",
      youtube: "",
      github: ""
    },


    /* -------------------------------------------------------
       WEBSITE ASSETS
       Keep these filenames exactly as your files are named.
       ------------------------------------------------------- */

    assets: {
      logo: "logo.png",
      banner: "banner.png",
      founderPhoto: "photo.jpg1.jpeg"
      signature: "signature.jpg"
    },


    /* -------------------------------------------------------
       CERTIFICATE
       ------------------------------------------------------- */

    certificate: {

      idPrefix: "ARS-CERT",

      issuer: "Adarsh Raj",

      issuerTitle: "Founder & Publisher, ARS Official",

      organization: "ARS Official",

      verificationPage: "verify.html",

      logo: "logo.png",

      signature: "signature.jpg",

      defaultType: "Professional",

      types: [
        "Professional",
        "Business",
        "Achievement",
        "Participation"
      ]

    },


    /* -------------------------------------------------------
       PUBLISHER / ADMIN
       ------------------------------------------------------- */

    publisher: {

      name: "Adarsh Raj",

      role: "Founder & Publisher",

      /* Change this password only if you want another one. */
      password: "ARS@2026"

    },


    /* -------------------------------------------------------
       ADMIN
       ------------------------------------------------------- */

    admin: {

      name: "Adarsh Raj",

      role: "Administrator",

      password: "ARS@2026"

    },


    /* -------------------------------------------------------
       STORAGE
       ------------------------------------------------------- */

    storage: {

      shayari: "ARS_SHAYARI_DATA",

      stories: "ARS_STORY_DATA",

      likes: "ARS_LIKES",

      favorites: "ARS_FAVORITES",

      certificates: "ARS_CERTIFICATES",

      joinRequests: "ARS_JOIN_REQUESTS",

      messages: "ARS_CONTACT_MESSAGES"

    },


    /* -------------------------------------------------------
       BRAND
       ------------------------------------------------------- */

    brand: {

      primary: "#8b1e3f",

      primaryDark: "#64132d",

      gold: "#b88932",

      white: "#ffffff",

      dark: "#171717"

    },


    /* -------------------------------------------------------
       COPYRIGHT
       ------------------------------------------------------- */

    copyright: {
      text: "© 2026 ARS Official — Adarsh Raj. All Rights Reserved."
    }

  };


  /* ---------------------------------------------------------
     PUBLIC CONFIG
     --------------------------------------------------------- */

  window.ARS_CONFIG = Object.freeze(ARS_CONFIG);


  console.log("⚙️ ARS Configuration Loaded");

})(window);
