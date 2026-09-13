/* =========================================================
   ARS OFFICIAL — MASTER CONFIGURATION
   Founder: Adarsh Raj
   Website: Adarsh Raj Shayar
   ========================================================= */

const ARS_CONFIG = {
  VERSION: "6.0.0",

  BRAND: {
    NAME: "ARS Official",
    SHORT_NAME: "ARS",
    FOUNDER: "Adarsh Raj",
    TITLE: "Adarsh Raj Shayar",
    TAGLINE: "शब्दों से पहचान, ज्ञान से उड़ान।",
    DESCRIPTION:
      "ARS Official — Shayari, Stories, Poetry, Education, Certificates and more.",
  },

  WEBSITE: {
    NAME: "ARS Official",
    URL: "https://adarshrajshyar.github.io/",
    LANGUAGE: "hi",
    TIMEZONE: "Asia/Kolkata",
  },

  FOUNDER: {
    NAME: "Adarsh Raj",
    ROLE: "Founder of ARS Official",
    PHOTO: "photo.jpg1.jpeg",
    SIGNATURE: "signature.jpg",
  },

  SOCIAL: {
    WHATSAPP_GK:
      "https://whatsapp.com/channel/0029VbDYBoZHFxPB8BmjHq3e",
  },

  STORAGE: {
    PREFIX: "ARS_",
    VERSION: "1",
  },

  NAVIGATION: {
    HOME: "index.html",
    FOUNDER: "founder.html",
    SHAYARI: "shayari.html",
    STORIES: "stories.html",
    EDUCATION: "education.html",
    FIRST_FLIGHT: "first-flight.html",
    ARS_AI: "ars-ai.html",
    JOINING: "joining.html",
    JOINING_CERTIFICATE: "joining-certificate.html",
    CERTIFICATE: "certificate.html",
    VERIFY: "verify.html",
    CONTACT: "contact.html",
    PUBLISHER: "publisher.html",
    EDUCATION_PUBLISHER: "education-publisher.html",
    ADMIN: "admin.html",
    POLICY: "policy.html",
  },

  SHAYARI: {
    CATEGORIES: [
      {
        id: "love",
        name: "Love",
        hindi: "प्रेम",
      },
      {
        id: "sad",
        name: "Sad",
        hindi: "दर्द",
      },
      {
        id: "motivational",
        name: "Motivational",
        hindi: "प्रेरणादायक",
      },
      {
        id: "friendship",
        name: "Friendship",
        hindi: "दोस्ती",
      },
      {
        id: "attitude",
        name: "Attitude",
        hindi: "एटीट्यूड",
      },
    ],
  },

  STORIES: {
    CATEGORIES: [
      {
        id: "mystery",
        name: "Mystery",
        hindi: "रहस्य",
      },
      {
        id: "horror",
        name: "Horror",
        hindi: "हॉरर",
      },
      {
        id: "biography",
        name: "Biography",
        hindi: "जीवनी",
      },
      {
        id: "life",
        name: "Life",
        hindi: "जीवन",
      },
      {
        id: "inspiration",
        name: "Inspiration",
        hindi: "प्रेरणा",
      },
      {
        id: "motivation",
        name: "Motivation",
        hindi: "प्रेरक",
      },
      {
        id: "friendship",
        name: "Friendship",
        hindi: "दोस्ती",
      },
      {
        id: "dream",
        name: "Dream",
        hindi: "सपने",
      },
      {
        id: "education",
        name: "Education",
        hindi: "शिक्षा",
      },
      {
        id: "general",
        name: "General",
        hindi: "सामान्य",
      },
    ],
  },

  EDUCATION: {
    CLASSES: [5, 6, 7, 8],

    ENTRANCE_EXAMS: [
      {
        id: "navodaya",
        name: "Jawahar Navodaya Vidyalaya",
        shortName: "Navodaya",
        classLevel: 6,
        page: "navodaya.html",
      },
      {
        id: "sainik-school",
        name: "Sainik School",
        shortName: "Sainik School",
        classLevel: 6,
        page: "sainik-school.html",
      },
      {
        id: "rms",
        name: "Rashtriya Military Schools",
        shortName: "RMS",
        classLevel: 6,
        page: "rms.html",
      },
    ],
  },

  CERTIFICATE: {
    TYPES: [
      {
        id: "education",
        name: "Education Certificate",
      },
      {
        id: "achievement",
        name: "Achievement Certificate",
      },
      {
        id: "participation",
        name: "Participation Certificate",
      },
      {
        id: "appreciation",
        name: "Appreciation Certificate",
      },
      {
        id: "other",
        name: "Other",
      },
    ],

    ID_PREFIX: "ARS-CERT",
    JOINING_ID_PREFIX: "ARS-JOIN",
  },

  JOINING: {
    STATUS: {
      PENDING: "pending",
      APPROVED: "approved",
      REJECTED: "rejected",
    },
  },

  PUBLISHER: {
    CONTENT_TYPES: [
      "shayari",
      "story",
      "poetry",
      "education",
    ],

    STATUS: [
      "draft",
      "published",
      "unpublished",
    ],
  },

  FEATURES: {
    LIKES: true,
    FAVORITES: true,
    COPY: true,
    SHARE: true,
    SEARCH: true,
    DARK_MODE: true,
    CERTIFICATE_QR: true,
    CERTIFICATE_VERIFY: true,
    JOINING_APPROVAL: true,
    EDUCATION_PORTAL: true,
    ARS_AI: true,
  },

  MESSAGES: {
    WELCOME: "ARS Official में आपका स्वागत है।",
    SAVED: "सफलतापूर्वक सेव किया गया।",
    COPIED: "कॉपी हो गया।",
    SHARED: "शेयर किया जा रहा है।",
    ERROR: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
  },
};


/* ---------------------------------------------------------
   Backward-compatible global aliases
   --------------------------------------------------------- */

const CONFIG = ARS_CONFIG;

const ARS = ARS_CONFIG;


/* ---------------------------------------------------------
   Safe global access
   --------------------------------------------------------- */

if (typeof window !== "undefined") {
  window.ARS_CONFIG = ARS_CONFIG;
  window.CONFIG = ARS_CONFIG;
  window.ARS = ARS_CONFIG;
}


/* ---------------------------------------------------------
   Utility helpers
   --------------------------------------------------------- */

function arsGetConfig(path, fallback = null) {
  try {
    if (!path) return ARS_CONFIG;

    const parts = path.split(".");
    let value = ARS_CONFIG;

    for (const part of parts) {
      if (value == null || !(part in value)) {
        return fallback;
      }

      value = value[part];
    }

    return value;
  } catch (error) {
    console.error("ARS Config Error:", error);
    return fallback;
  }
}


function arsGetYear() {
  return new Date().getFullYear();
}


function arsGetFounderName() {
  return ARS_CONFIG.FOUNDER.NAME;
}


function arsGetWebsiteUrl() {
  return ARS_CONFIG.WEBSITE.URL;
}


/* ---------------------------------------------------------
   Export helpers
   --------------------------------------------------------- */

if (typeof window !== "undefined") {
  window.arsGetConfig = arsGetConfig;
  window.arsGetYear = arsGetYear;
  window.arsGetFounderName = arsGetFounderName;
  window.arsGetWebsiteUrl = arsGetWebsiteUrl;
}
