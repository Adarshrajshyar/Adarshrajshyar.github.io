/* =========================================================
   ARS WEBSITE CONFIGURATION
   File: config.js

   IMPORTANT:
   - यहां कोई password, API secret या private key मत डालना।
   - Public frontend में केवल safe configuration रखें।
   - Real AI/API/database keys बाद में secure backend में रहेंगी।
   ========================================================= */

const ARS_CONFIG = {

  /* -----------------------------
     Website
  ----------------------------- */

  site: {
    name: "ARS",
    fullName: "ARS Education",
    founder: "Adarsh Raj",
    website:
      "https://adarshrajshyar.github.io/",

    email: "",

    language: "hi",

    defaultTheme: "system"
  },


  /* -----------------------------
     Education
  ----------------------------- */

  education: {

    classes: [
      5,
      6,
      7,
      8
    ],

    subjects: [
      "Mathematics",
      "Science",
      "Hindi",
      "English",
      "Social Science",
      "GK"
    ],

    sections: [
      "NCERT",
      "Maths",
      "GK",
      "Notes",
      "MCQ",
      "Practice",
      "Exam Tips",
      "Navodaya",
      "Sainik School",
      "RMS",
      "Resources"
    ],

    entranceExams: [
      "Navodaya Class 6",
      "Sainik School Class 6",
      "RMS Class 6"
    ]

  },


  /* -----------------------------
     ARS Education limits
  ----------------------------- */

  contentRules: {

    ncertClasses: [
      5,
      6,
      7,
      8
    ],

    entrancePreparationClass: 6,

    firstFlightBookEnabled: false

  },


  /* -----------------------------
     Certificate
  ----------------------------- */

  certificate: {

    enabled: true,

    types: [
      "education",
      "achievement",
      "participation"
    ],

    prefix: "ARS-CERT-",

    joiningPrefix: "ARS-JOIN-",

    approvalRequired: true,

    joiningCertificateAfterApproval: true,

    verificationPage:
      "verify.html"

  },


  /* -----------------------------
     ARS AI
  ----------------------------- */

  ai: {

    enabled: true,

    name: "ARS AI",

    mode: "education",

    supportedClasses: [
      5,
      6,
      7,
      8
    ],

    topics: [
      "NCERT",
      "Mathematics",
      "Science",
      "GK",
      "MCQ",
      "Practice",
      "Exam Tips",
      "Navodaya",
      "Sainik School",
      "RMS"
    ],

    /*
      अभी frontend demo/local mode.
      Production AI API बाद में backend से connect होगी.
    */

    useBackend: false,

    apiEndpoint: "/api/ai"

  },


  /* -----------------------------
     Backend
  ----------------------------- */

  backend: {

    enabled: false,

    baseURL: "",

    apiVersion: "v1",

    endpoints: {

      health:
        "/api/health",

      ai:
        "/api/ai",

      certificates:
        "/api/certificates",

      certificateVerify:
        "/api/certificates/verify",

      joiningCertificates:
        "/api/joining-certificates",

      stories:
        "/api/stories",

      education:
        "/api/education",

      resources:
        "/api/resources"

    }

  },


  /* -----------------------------
     Database
  ----------------------------- */

  database: {

    enabled: false,

    mode: "local",

    /*
      localStorage अभी development/testing के लिए है.

      Final production website में database credentials
      frontend में नहीं रखे जाएंगे.
    */

    storageKeyPrefix:
      "ARS_"

  },


  /* -----------------------------
     Publisher
  ----------------------------- */

  publisher: {

    enabled: true,

    features: [
      "create",
      "edit",
      "delete",
      "publish",
      "unpublish",
      "draft",
      "search"
    ],

    contentTypes: [
      "stories",
      "education",
      "notes",
      "mcq",
      "practice",
      "resources"
    ]

  },


  /* -----------------------------
     Admin
  ----------------------------- */

  admin: {

    enabled: true,

    approvalFeatures: [
      "certificate",
      "joining_certificate",
      "publisher_content"
    ],

    /*
      Admin password यहां कभी भी hard-code नहीं करना.
      Authentication backend पर होगी.
    */

    authentication:
      "backend"

  },


  /* -----------------------------
     Navigation
  ----------------------------- */

  navigation: {

    main: [
      {
        name: "Home",
        page: "index.html"
      },

      {
        name: "ARS Education",
        page: "ncert.html"
      },

      {
        name: "ARS AI",
        page: "ars-ai.html"
      },

      {
        name: "Stories",
        page: "stories.html"
      },

      {
        name: "Certificates",
        page: "certificate.html"
      },

      {
        name: "About",
        page: "founder.html"
      },

      {
        name: "Contact",
        page: "contact.html"
      }
    ]

  },


  /* -----------------------------
     First Flight
  ----------------------------- */

  firstFlight: {

    enabled: true,

    title: "मेरी पहली उड़ान",

    page:
      "first-flight.html",

    status:
      "coming-soon",

    /*
      Book पूरा होने के बाद इसे true किया जा सकता है.
    */

    published: false

  },


  /* -----------------------------
     Social / External Links
  ----------------------------- */

  social: {

    whatsapp: "",

    youtube: "",

    instagram: "",

    facebook: "",

    telegram: ""

  },


  /* -----------------------------
     Feature flags
  ----------------------------- */

  features: {

    darkMode: true,

    favorites: true,

    save: true,

    share: true,

    copy: true,

    search: true,

    bookmarks: true,

    notifications: false,

    offlineMode: true

  }

};


/* =========================================================
   Safe global access
   ========================================================= */

window.ARS_CONFIG = ARS_CONFIG;


/* =========================================================
   Helper functions
   ========================================================= */

window.ARS_CONFIG_HELPER = {

  getSiteName: function () {
    return ARS_CONFIG.site.fullName;
  },


  getClasses: function () {
    return ARS_CONFIG.education.classes;
  },


  getSubjects: function () {
    return ARS_CONFIG.education.subjects;
  },


  isFeatureEnabled: function (feature) {
    return Boolean(
      ARS_CONFIG.features[feature]
    );
  },


  isCertificateApprovalRequired: function () {
    return Boolean(
      ARS_CONFIG.certificate.approvalRequired
    );
  },


  isJoiningCertificateAllowed: function () {
    return Boolean(
      ARS_CONFIG.certificate.approvalRequired &&
      ARS_CONFIG.certificate.joiningCertificateAfterApproval
    );
  },


  getAPI: function (name) {

    if (
      !ARS_CONFIG.backend ||
      !ARS_CONFIG.backend.endpoints
    ) {
      return "";
    }

    return (
      ARS_CONFIG.backend.baseURL +
      ARS_CONFIG.backend.endpoints[name]
    );

  }

};
