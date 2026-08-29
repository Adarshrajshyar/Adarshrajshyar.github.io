/* =========================================================
   ARS OFFICIAL WEBSITE
   CONFIGURATION
   ========================================================= */

"use strict";

window.ARS_CONFIG = Object.freeze({

  VERSION: "5.0.0",

  SITE_NAME: "Adarsh Raj Shayar",

  SITE_SHORT_NAME: "ARS",

  FOUNDER: "Adarsh Raj",

  LANGUAGE: "hi",

  WEBSITE_URL: "https://adarshrajshyar.github.io/",

  INSTAGRAM_URL:
    "https://www.instagram.com/adarshrajshyar/",

  EMAIL: "",


  /* -------------------------------------------------------
     ADMIN / PUBLISHER
     ------------------------------------------------------- */

  ADMIN_PASSWORD: "ARS2026",

  PUBLISHER_PASSWORD: "Adarsh2026",


  /* -------------------------------------------------------
     ASSETS
     ------------------------------------------------------- */

  ASSETS: Object.freeze({

    LOGO: "logo.png",

    BANNER: "banner.png",

    FOUNDER_PHOTO: "photo.jpg1.jpeg",

    SIGNATURE: "signature.jpeg",

    WEBSITE_IMAGE: "website.jpeg"

  }),


  /* -------------------------------------------------------
     CERTIFICATE
     ------------------------------------------------------- */

  CERTIFICATE: Object.freeze({

    PREFIX: "ARS-CERT",

    MEMBER_PREFIX: "ARS-MEMBER",

    ORGANIZATION:
      "Adarsh Raj Shayar",

    FOUNDER:
      "Adarsh Raj",

    TITLE:
      "ARS OFFICIAL",

    WEBSITE:
      "https://adarshrajshyar.github.io/"

  }),


  /* -------------------------------------------------------
     SHAYARI CATEGORIES
     ------------------------------------------------------- */

  SHAYARI_CATEGORIES: Object.freeze([

    {
      id: "love",
      hi: "लव शायरी",
      en: "Love Shayari"
    },

    {
      id: "sad",
      hi: "सैड शायरी",
      en: "Sad Shayari"
    },

    {
      id: "motivational",
      hi: "मोटिवेशनल शायरी",
      en: "Motivational Shayari"
    },

    {
      id: "friendship",
      hi: "दोस्ती शायरी",
      en: "Friendship Shayari"
    },

    {
      id: "attitude",
      hi: "एटीट्यूड शायरी",
      en: "Attitude Shayari"
    }

  ]),


  /* -------------------------------------------------------
     STORY CATEGORIES
     ------------------------------------------------------- */

  STORY_CATEGORIES: Object.freeze([

    {
      id: "mystery",
      hi: "रहस्य",
      en: "Mystery"
    },

    {
      id: "horror",
      hi: "हॉरर",
      en: "Horror"
    },

    {
      id: "biography",
      hi: "जीवनी",
      en: "Biography"
    },

    {
      id: "inspiration",
      hi: "प्रेरणादायक",
      en: "Inspiration"
    },

    {
      id: "life",
      hi: "जीवन",
      en: "Life"
    },

    {
      id: "adventure",
      hi: "रोमांच",
      en: "Adventure"
    }

  ]),


  /* -------------------------------------------------------
     STORY TYPES
     ------------------------------------------------------- */

  STORY_TYPES: Object.freeze([

    "story",

    "poem"

  ]),


  /* -------------------------------------------------------
     CERTIFICATE TYPES
     ------------------------------------------------------- */

  CERTIFICATE_TYPES: Object.freeze([

    "Achievement",

    "Participation",

    "Professional",

    "Business",

    "Membership"

  ]),


  /* -------------------------------------------------------
     EMAILJS
     ------------------------------------------------------- */

  EMAILJS: Object.freeze({

    SERVICE_ID: "service_3h6mmz4",

    TEMPLATE_ID: "template_2kzi4j8",

    PUBLIC_KEY: "kEJqwQlbZ03jFbMFC"

  })

});


console.log(
  "🌹 ARS Configuration Loaded:",
  window.ARS_CONFIG.VERSION
);
