/* =========================================================
   ARS OFFICIAL WEBSITE
   config.js
   Central Website Configuration
   ========================================================= */

const ARS_CONFIG = {

  website: {
    name: "Adarsh Raj Shayar",
    shortName: "ARS",
    tagline: "Official Hindi Shayari Website",
    url: "https://adarshrajshyar.github.io/",
    author: "Adarsh Raj",
    language: "hi",
    country: "India"
  },

  founder: {
    name: "Adarsh Raj",
    role: "Founder & Author",
    brand: "Adarsh Raj Shayar"
  },

  admin: {
    enabled: true,
    demoPassword: "CHANGE_THIS_PASSWORD",
    sessionKey: "ARS_ADMIN_SESSION",
    sessionDuration: 60 * 60 * 1000
  },

  shayariCategories: [
    "Love",
    "Sad",
    "Attitude",
    "Friendship",
    "Motivation"
  ],

  storyCategories: [
    "Motivation",
    "Friendship",
    "Horror",
    "Funny",
    "Biography",
    "Reallife",
    "Moral",
    "Mystery",
    "Poem"
  ],

  content: {
    maxShayariTitleLength: 150,
    maxShayariLength: 5000,
    maxStoryTitleLength: 200,
    maxStoryLength: 20000,
    defaultAuthor: "Adarsh Raj",
    defaultPublisher: "Adarsh Raj"
  },

  storage: {
    shayari: "ARS_SHAYARI_DATA",
    stories: "ARS_STORY_DATA",
    favourites: "ARS_FAVOURITES",
    likes: "ARS_LIKES",
    views: "ARS_VIEWS",
    visitorCount: "ARS_VISITOR_COUNT",
    adminSession: "ARS_ADMIN_SESSION",
    settings: "ARS_SETTINGS",
    joiningApplications: "ARS_JOINING_APPLICATIONS",
    certificates: "ARS_CERTIFICATES"
  },

  joining: {
    enabled: true,
    brandName: "ARS Joining",
    title: "ARS Joining",
    description:
      "Adarsh Raj Shayar के साथ जुड़ने के लिए Joining Application भेजें।",

    applicationPrefix: "ARS-JOIN-",

    status: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected"
    },

    roles: [
      "Writer",
      "Author",
      "Poet",
      "Content Creator",
      "Volunteer",
      "Team Member"
    ],

    fields: [
      "name",
      "email",
      "mobile",
      "role",
      "message"
    ]
  },

  certificate: {
    enabled: true,
    prefix: "ARS-CERT-",

    types: [
      "Professional",
      "Business",
      "Achievement",
      "Participation"
    ],

    verificationPage: "verify.html",
    generationPage: "certificate.html",
    storagePrefix: "ARS_CERT_"
  },

  qr: {
    enabled: true,
    defaultUrl: "https://adarshrajshyar.github.io/",
    size: 220,
    correctLevel: "H"
  },

  email: {
    enabled: true,
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID"
  },

  social: {
    website: "https://adarshrajshyar.github.io/",
    instagram: "",
    youtube: "",
    facebook: "",
    telegram: "",
    whatsapp: ""
  },

  ui: {
    defaultTheme: "light",
    enableDarkMode: true,
    enableWelcomePopup: true,
    enableLoader: true,
    enableProgressBar: true,
    enableBackToTop: true,
    enableToast: true
  },

  security: {
    maxLoginAttempts: 5,
    loginLockTime: 5 * 60 * 1000,
    sanitizeContent: true,
    allowHtmlInContent: false
  },

  version: "2.0.0",
  build: "ARS-2026"
};


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.ARS_CONFIG = ARS_CONFIG;


/* =========================================================
   CONFIG STATUS
   ========================================================= */

console.log(
  "🌹 ARS Official Website Configuration Loaded",
  ARS_CONFIG.version
);
