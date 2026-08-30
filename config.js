/* =========================================================
   ARS OFFICIAL — CONFIGURATION
   Adarsh Raj Shayar
   ========================================================= */

(function (window) {

  "use strict";

  const CONFIG = Object.freeze({

    /* -----------------------------------------------------
       WEBSITE
    ----------------------------------------------------- */

    SITE_NAME:
      "ARS Official",

    SITE_TITLE:
      "Adarsh Raj Shayar",

    SITE_URL:
      "https://adarshrajshyar.github.io/",


    /* -----------------------------------------------------
       FOUNDER / PUBLISHER
    ----------------------------------------------------- */

    FOUNDER_NAME:
      "Adarsh Raj",

    PUBLISHER_NAME:
      "Adarsh Raj",

    ORGANIZATION:
      "ARS Official",

    FOUNDER_ROLE:
      "Founder & Creator",

    PUBLISHER_ROLE:
      "Founder, ARS Official",


    /* -----------------------------------------------------
       SOCIAL
    ----------------------------------------------------- */

    INSTAGRAM_USERNAME:
      "@adarshrajshyar",

    INSTAGRAM_URL:
      "https://www.instagram.com/adarshrajshyar/",


    /* -----------------------------------------------------
       BRAND ASSETS
    ----------------------------------------------------- */

    LOGO:
      "logo.png",

    BANNER:
      "banner.png",

    FOUNDER_PHOTO:
      "photo.jpg1.jpeg",

    SIGNATURE:
      "signature.jpg",


    /* -----------------------------------------------------
       CERTIFICATE
    ----------------------------------------------------- */

    CERTIFICATE_PREFIX:
      "ARS-CERT",

    MEMBER_PREFIX:
      "ARS-MEMBER",

    JOIN_PREFIX:
      "ARS-JOIN",

    MESSAGE_PREFIX:
      "ARS-MSG",


    /* -----------------------------------------------------
       CERTIFICATE TYPES
    ----------------------------------------------------- */

    CERTIFICATE_TYPES: Object.freeze([
      "Achievement",
      "Participation",
      "Professional",
      "Business"
    ]),


    /* -----------------------------------------------------
       DEFAULT PUBLISHER
    ----------------------------------------------------- */

    DEFAULT_ISSUER:
      "Adarsh Raj",

    DEFAULT_ORGANIZATION:
      "ARS Official"


  });


  window.ARS_CONFIG = CONFIG;


  console.log(
    "⚙️ ARS Configuration Loaded"
  );


})(window);
