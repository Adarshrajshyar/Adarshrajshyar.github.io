/* =========================================================
   ARS OFFICIAL — CONFIGURATION
   Adarsh Raj Shayar
   ========================================================= */

"use strict";

(function (window) {

  const ARS_CONFIG = Object.freeze({

    /* -------------------------------------------------------
       WEBSITE IDENTITY
    ------------------------------------------------------- */

    site: {
      name: "ARS Official",
      fullName: "Adarsh Raj Shayar",
      shortName: "ARS",
      tagline: "Words • Stories • Poetry • Creativity",
      language: "hi"
    },


    /* -------------------------------------------------------
       PUBLISHER / FOUNDER
       ------------------------------------------------------- */

    publisher: {
      name: "Adarsh Raj",
      title: "Founder & Publisher",
      organization: "ARS Official"
    },


    /* -------------------------------------------------------
       SOCIAL
       ------------------------------------------------------- */

    social: {
      instagram: "@adarshrajshyar",
      instagramUrl: "https://www.instagram.com/adarshrajshyar/"
    },


    /* -------------------------------------------------------
       WEBSITE ASSETS
       ------------------------------------------------------- */

    assets: {
      logo: "logo.png",
      banner: "banner.png",
      signature: "signature.jpg",
      founderPhoto: "founder.jpg"
    },


    /* -------------------------------------------------------
       CERTIFICATE
       ------------------------------------------------------- */

    certificate: {

      enabled: true,

      idPrefix: "ARS-CERT",

      verificationPage: "verify.html",

      publisherName: "Adarsh Raj",

      publisherTitle: "Founder & Publisher, ARS Official",

      signature: "signature.jpg",

      logo: "logo.png",

      qrEnabled: true,

      types: [
        "Professional",
        "Business",
        "Achievement",
        "Participation"
      ]

    },


    /* -------------------------------------------------------
       NAVIGATION
       ------------------------------------------------------- */

    navigation: [

      {
        label: "Home",
        href: "index.html"
      },

      {
        label: "Shayari",
        href: "index.html#shayari"
      },

      {
        label: "Stories",
        href: "index.html#stories"
      },

      {
        label: "Favorites",
        href: "index.html#favorites"
      },

      {
        label: "Join ARS",
        href: "joining.html"
      },

      {
        label: "Certificate",
        href: "certificate.html"
      },

      {
        label: "Verify",
        href: "verify.html"
      },

      {
        label: "Founder",
        href: "founder.html"
      },

      {
        label: "Admin",
        href: "admin.html"
      }

    ],


    /* -------------------------------------------------------
       STORAGE PREFIX
       ------------------------------------------------------- */

    storagePrefix: "ARS_",


    /* -------------------------------------------------------
       WEBSITE SETTINGS
       ------------------------------------------------------- */

    settings: {

      defaultAuthor: "Adarsh Raj",

      defaultCategory: "life",

      itemsPerPage: 9,

      enableLikes: true,

      enableFavorites: true,

      enableSearch: true,

      enableCertificates: true,

      enableJoinRequests: true,

      enableContactMessages: true

    }

  });


  /* ---------------------------------------------------------
     PUBLIC API
     --------------------------------------------------------- */

  window.ARS_CONFIG = ARS_CONFIG;


  console.log("⚙️ ARS Configuration Loaded");

})(window);
