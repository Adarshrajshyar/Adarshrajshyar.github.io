/* =========================================================
   ARS OFFICIAL
   CENTRAL CONFIGURATION
   ========================================================= */

(function () {

  "use strict";


  window.ARS_CONFIG = {

    /* -----------------------------------------------------
       WEBSITE
       ----------------------------------------------------- */

    siteName: "ARS Official",

    founderName: "Adarsh Raj Shayar",

    websiteURL:
      "https://adarshrajshyar.github.io/",


    /* -----------------------------------------------------
       SOCIAL
       ----------------------------------------------------- */

    instagram:
      "https://www.instagram.com/adarshrajshyar/",


    /* -----------------------------------------------------
       IMAGE FILES
       ----------------------------------------------------- */

    assets: {

      logo:
        "logo.png",

      banner:
        "banner.png",

      founderPhoto:
        "photo.jpg1.jpeg",

      signature:
        "signature.jpg"

    },


    /* -----------------------------------------------------
       SHAYARI CATEGORIES
       ----------------------------------------------------- */

    shayariCategories: [

      {
        id: "sad",
        name: "Sad",
        icon: "😔"
      },

      {
        id: "love",
        name: "Love",
        icon: "❤️"
      },

      {
        id: "attitude",
        name: "Attitude",
        icon: "😎"
      },

      {
        id: "friendship",
        name: "Friendship",
        icon: "🤝"
      },

      {
        id: "motivation",
        name: "Motivation",
        icon: "🔥"
      }

    ],


    /* -----------------------------------------------------
       STORY CATEGORIES
       ----------------------------------------------------- */

    storyCategories: [

      {
        id: "poem",
        name: "Poem"
      },

      {
        id: "horror",
        name: "Horror"
      },

      {
        id: "friendship",
        name: "Friendship"
      },

      {
        id: "emotional",
        name: "Emotional"
      },

      {
        id: "story",
        name: "Story"
      },

      {
        id: "moral",
        name: "Moral"
      },

      {
        id: "mystery",
        name: "Mystery"
      },

      {
        id: "biography",
        name: "Biography"
      },

      {
        id: "motivation",
        name: "Motivation"
      }

    ],


    /* -----------------------------------------------------
       CERTIFICATE TYPES
       ----------------------------------------------------- */

    certificateTypes: [

      "Professional",

      "Achievement",

      "Participation",

      "Business"

    ],


    /* -----------------------------------------------------
       ARS JOINING ROLES
       ----------------------------------------------------- */

    joiningRoles: [

      "Writer",

      "Creator",

      "Supporter",

      "Shayar",

      "Instagram Related",

      "YouTube Related"

    ],


    /* -----------------------------------------------------
       STORAGE KEYS
       ----------------------------------------------------- */

    storageKeys: {

      certificates:
        "ARS_CERTIFICATES",

      joining:
        "ARS_JOINING_REQUESTS",

      shayari:
        "ARS_SHAYARI",

      stories:
        "ARS_STORIES",

      favorites:
        "ARS_FAVORITES",

      likes:
        "ARS_LIKES",

      saved:
        "ARS_SAVED"

    },


    /* -----------------------------------------------------
       DEFAULT WEBSITE SETTINGS
       ----------------------------------------------------- */

    settings: {

      enableLikes: true,

      enableFavorites: true,

      enableSave: true,

      enableShare: true,

      enableCertificateVerification: true,

      enableJoining: true,

      enablePublisher: true,

      enableAdmin: true

    }

  };


  /* -------------------------------------------------------
     MAKE CONFIG EASY TO USE
     ------------------------------------------------------- */

  window.ARS_CONFIG.getAsset =
    function (name) {

      return (
        this.assets[name] || ""
      );

    };


  window.ARS_CONFIG.getInstagram =
    function () {

      return this.instagram;

    };


  /* -------------------------------------------------------
     APPLY CENTRAL SETTINGS
     ------------------------------------------------------- */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      const instagram =
        document.getElementById(
          "instagramLink"
        );

      if (instagram) {

        instagram.href =
          window.ARS_CONFIG.instagram;

      }


      const year =
        document.getElementById(
          "currentYear"
        );

      if (year) {

        year.textContent =
          new Date().getFullYear();

      }

    }
  );


})();
