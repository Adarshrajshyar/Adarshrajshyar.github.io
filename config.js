/* =========================================================
   ARS OFFICIAL
   CENTRAL CONFIGURATION FILE

   बाकी pages इस file से common settings ले सकते हैं।
   ========================================================= */

window.ARS_CONFIG = {

  /* Website */

  siteName: "ARS Official",

  siteShortName: "ARS",

  founderName: "Adarsh Raj",

  siteUrl:
    window.location.origin,


  /* Social */

  instagram:
    "https://www.instagram.com/adarshrajshyar/",


  whatsappGK:
    "https://whatsapp.com/channel/0029VbDYBoZHFxPB8BmjHq3e",


  whatsappShayari:
    "https://whatsapp.com/channel/0029Vb8vRP4DZ4LgW27mNc3A",


  /* Future */

  futureApp: true,

  futureEducationalChannel: true,

  arsAI: true,


  /* Storage */

  storageKeys: {

    certificates:
      "ARS_CERTIFICATES",

    joining:
      "ARS_JOINING_CERTIFICATES",

    published:
      "ARS_PUBLISHED_CONTENT",

    favorites:
      "ARS_FAVORITES",

    likes:
      "ARS_LIKES",

    saves:
      "ARS_SAVES"

  },


  /* Certificate */

  certificatePrefix:
    "ARS-CERT-",


  joiningPrefix:
    "ARS-JOIN-",


  /* Shayari */

  shayariCategories: [
    "All",
    "Love",
    "Sad",
    "Attitude",
    "Friendship",
    "Motivation"
  ],


  /* Story */

  storyCategories: [
    "All",
    "Poem",
    "Horror",
    "Friendship",
    "Emotional",
    "Story",
    "Moral",
    "Mystery",
    "Biography",
    "Motivation",
    "Inspirational"
  ],


  /* Certificate types */

  certificateTypes: [
    "Professional",
    "Achievement",
    "Business",
    "Participation"
  ],


  /* Theme */

  defaultTheme:
    "light",


  /* Navigation */

  pages: {

    home:
      "index.html",

    shayari:
      "shayari.html",

    story:
      "story.html",

    ai:
      "ars-ai.html",

    joining:
      "joining.html",

    joiningCertificate:
      "joining-certificate.html",

    certificate:
      "certificate.html",

    verify:
      "verify.html",

    founder:
      "founder.html",

    contact:
      "contact.html",

    admin:
      "admin.html",

    publisher:
      

    policy:
   

  }

};


/*
   Safe helper:
   अगर किसी दूसरे JS को config की जरूरत हो,
   तो वह ARS_CONFIG से values ले सकता है।
*/

window.ARS_CONFIG.getPage =
  function (name) {

    return (
      window.ARS_CONFIG.pages[name] ||
      "index.html"
    );

  };
