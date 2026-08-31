"use strict";

/*
 * ============================================================
 * ARS OFFICIAL — GLOBAL CONFIGURATION
 * ============================================================
 *
 * इस file में website की common settings रखी गई हैं।
 * बाकी JavaScript files इन्हीं settings को use कर सकती हैं।
 *
 * IMPORTANT:
 * GitHub Pages जैसी frontend-only website में कोई भी secret
 * password/API secret इस file में सुरक्षित नहीं रखा जा सकता।
 * ============================================================
 */

window.ARS_CONFIG = {

  /* Website identity */
  site: {
    name: "ARS Official",
    shortName: "ARS",
    founder: "Adarsh Raj",
    description:
      "ARS Official — Shayari, Stories, Joining, Certificates and more.",
    logo: "logo.png",
    signature: "signature.jpg"
  },


  /* Main website links */
  links: {

    home: "index.html",

    ai: "ars-ai.html",

    joining: "joining.html",

    joiningCertificate:
      "joining-certificate.html",

    certificate:
      "certificate.html",

    verify:
      "verify.html",

    shayari:
      "shayari.html",

    story:
      "story.html",

    founder:
      "founder.html",

    contact:
      "contact.html",

    publisher:
      "publisher.html",

    policy:
      "policy.html",

    admin:
      "admin.html"

  },


  /* Social / ARS joining links */
  social: {

    instagram:
      "https://www.instagram.com/reel/DcTV9wBJQ6D/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",

    whatsappChannel1:
      "https://whatsapp.com/channel/0029VbDYBoZHFxPB8BmjHq3e",

    whatsappChannel2:
      "https://whatsapp.com/channel/0029Vb8vRP4DZ4LgW27mNc3A"

  },


  /* Content categories */
  categories: {

    shayari: [
      "All",
      "Love",
      "Sad",
      "Motivation",
      "Attitude",
      "Friendship"
    ],

    story: [
      "All",
      "Motivational",
      "Inspirational",
      "Life",
      "Friendship",
      "Success",
      "Emotional",
      "Knowledge"
    ]

  },


  /* Storage names */
  storage: {

    certificates:
      "ARS_CERTIFICATES",

    joiningCertificates:
      "ARS_JOINING_CERTIFICATES",

    favorites:
      "ARS_FAVORITES",

    likes:
      "ARS_LIKES",

    saved:
      "ARS_SAVED",

    copied:
      "ARS_COPIED",

    theme:
      "ARS_THEME",

    adminAuth:
      "ARS_ADMIN_AUTH"

  },


  /* Certificate configuration */
  certificate: {

    prefix:
      "ARS-CERT-",

    organization:
      "ARS Official",

    issuer:
      "Adarsh Raj",

    types: [
      "Professional",
      "Business",
      "Achievement",
      "Participation"
    ]

  },


  /* Joining configuration */
  joining: {

    idBasedOn:
      "applicationNumber",

    organization:
      "ARS Official"

  },


  /* Verification */
  verification: {

    certificatePrefix:
      "ARS-CERT-",

    modes: [
      "certificate",
      "joining"
    ]

  },


  /* UI defaults */
  ui: {

    defaultTheme:
      "light",

    scrollTopButton:
      true,

    smoothScroll:
      true,

    mobileNavigation:
      true

  },


  /* App version */
  version:
    "1.0.0"

};


/*
 * Freeze only the top-level configuration object.
 * Individual modules can still read the settings safely.
 */
try {
  Object.freeze(window.ARS_CONFIG);
} catch (_) {
  /* Older browsers can safely ignore this. */
}
