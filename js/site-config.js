/*
 * =========================================================
 * ARS — Adarsh Ke Alfaz
 * Site Configuration
 * =========================================================
 *
 * This file contains only PUBLIC frontend configuration.
 *
 * NEVER store:
 * - passwords
 * - admin credentials
 * - publisher credentials
 * - service-role keys
 * - private API secrets
 *
 * Real authentication and database security must be handled
 * by the backend with proper access policies.
 * =========================================================
 */

window.ARS_CONFIG = Object.freeze({

    /* Brand */
    siteName: "ARS — Adarsh Ke Alfaz",
    founderName: "Adarsh Raj Shayar",

    /* Public website */
    siteUrl: "https://adarshrajshyar.github.io",

    /* Public social links */
   instagram:
    "https://www.instagram.com/adarshkealfaaz_/",
    
    youtube:
        "https://www.youtube.com/@Adarshshyari",

    /* Public assets */
    assets: {
        logo: "assets/logo.png",
        banner: "assets/banner.png",
        founder: "assets/founder.jpg",
        signature: "assets/signature.png"
    },

    /* Default UI settings */
    theme: {
        defaultMode: "light",
        primaryStyle: "blue-green"
    },

    /* Feature flags */
    features: {
        pwa: true,
        search: true,
        studentDashboard: true,
        certificates: true,
        sponsorEnquiry: true,
        joinARS: true,
        aiAssistant: true
    },

    /*
     * Backend is intentionally not enabled here yet.
     *
     * When the real backend is connected, this section can
     * contain PUBLIC client configuration only.
     */
    backend: {
        enabled: false,
        provider: "",
        publicUrl: ""
    }

});
