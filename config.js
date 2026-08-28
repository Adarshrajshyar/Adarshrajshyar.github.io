/* =========================================================
   ARS CONFIGURATION
   ========================================================= */

"use strict";

window.ARS_CONFIG = {

    siteName: "ARS Official Website",

    founder: "Adarsh Raj",

    version: "3.0.0",

    assets: {
        logo: "logo.png",
        banner: "banner.png",
        founderPhoto: "photo.jpg1.jpeg"
    },

    pages: {
        home: "index.html",
        certificate: "certificate.html",
        joining: "joining.html",
        joiningCertificate: "joining-certificate.html",
        admin: "admin.html"
    },

    social: {
        instagram: "https://www.instagram.com/"
    },

    storage: {
        theme: "ARS_THEME",
        likes: "ARS_LIKES",
        favorites: "ARS_FAVORITES",
        joiningApplications: "ARS_JOINING_APPLICATIONS",
        certificates: "ARS_CERTIFICATES"
    }

};

console.log(
    "🌹 ARS Official Website Configuration Loaded",
    ARS_CONFIG.version
);
