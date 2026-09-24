/* =========================================================
   ARS OFFICIAL
   GLOBAL CONFIGURATION
   ========================================================= */

(() => {

  "use strict";


  const CONFIG = {

    /* ===============================
       BRAND
       =============================== */

    brand: {

      name: "ARS Official",

      shortName: "ARS",

      founder:
        "Adarsh Raj Shayar",

      title:
        "ARS Official | Adarsh Raj Shayar",

      tagline:
        "शब्दों से सपनों तक एक नई उड़ान।",

      language: "hi",

      version: "6.0.0"

    },


    /* ===============================
       WEBSITE
       =============================== */

    website: {

      url:
        "https://adarshrajshyar.github.io/",

      canonical:
        "https://adarshrajshyar.github.io/",

      frontendUrl:
        "https://adarshrajshyar.github.io"

    },


    /* ===============================
       BACKEND
       =============================== */

    backend: {

      /*
       * Backend URL is public API base URL.
       * Secrets must NEVER be placed here.
       */

      url:
        "https://ars-backend-hbbk.onrender.com",

      apiPrefix:
        "/api"

    },


    /* ===============================
       ASSETS
       =============================== */

    assets: {

      logo:
        "logo.png",

      founderPhoto:
        "photo.jpg1.jpeg",

      banner:
        "banner.png",

      signature:
        "signature.jpeg",

      websitePreview:
        "website.jpeg"

    },


    /* ===============================
       SOCIAL
       =============================== */

    social: {

      whatsappChannel:
        "https://whatsapp.com/channel/0029VbDYBoZHFxPB8BmjHq3e"

    },


    /* ===============================
       NAVIGATION
       =============================== */

    navigation: [

      {
        label: "Home",
        url: "index.html"
      },

      {
        label: "Founder",
        url: "founder.html"
      },

      {
        label: "Shayari",
        url: "shayari.html"
      },

      {
        label: "Stories",
        url: "stories.html"
      },

      {
        label: "Education",
        url: "education.html"
      },

      {
        label: "First Flight",
        url: "first-flight.html"
      },

      {
        label: "ARS AI",
        url: "ars-ai.html"
      },

      {
        label: "ARS Book",
        url: "ars-book.html"
      },

      {
        label: "Dictionary",
        url: "dictionary.html"
      },

      {
        label: "ARS Exam",
        url: "ars-exam.html"
      },

      {
        label: "SCAT Preparation",
        url: "scat.html"
      },

      {
        label: "Join ARS",
        url: "join.html"
      },

      {
        label: "Certificate",
        url: "certificate.html"
      },

      {
        label: "Verify",
        url: "verify.html"
      },

      {
        label: "Contact",
        url: "contact.html"
      }

    ],


    /* ===============================
       AUTHENTICATION
       =============================== */

    auth: {

      loginMethod:
        "email",

      registrationFields: [

        "name",
        "email",
        "password"

      ],

      dashboard:
        "dashboard.html",

      loginPage:
        "login.html",

      registerPage:
        "register.html",

      profilePage:
        "profile.html"

    },


    /* ===============================
       SHAYARI
       =============================== */

    shayari: {

      categories: [

        "Love",
        "Sad",
        "Motivational",
        "Friendship",
        "Attitude"

      ],

      teacherCategories: [

        "General Teacher",
        "Favourite Teacher",
        "Maths Teacher",
        "English Teacher",
        "Hindi Teacher",
        "Science Teacher",
        "Social Science Teacher",
        "Class Teacher",
        "Teacher Appreciation",
        "Teacher's Day"

      ],

      actions: [

        "like",
        "favorite",
        "save",
        "copy",
        "share"

      ]

    },


    /* ===============================
       STORIES
       =============================== */

    stories: {

      types: [

        "Story",
        "Poetry"

      ],

      categories: [

        "Mystery",
        "Horror",
        "Biography",
        "Life",
        "Inspiration",
        "Motivation",
        "Friendship",
        "Dream",
        "Education",
        "General"

      ]

    },


    /* ===============================
       EDUCATION
       =============================== */

    education: {

      classes: [

        5,
        6,
        7,
        8

      ],

      flow: [

        "Class",
        "Subject",
        "Book",
        "Chapter",
        "Explanation",
        "Notes",
        "MCQ",
        "Practice",
        "Revision"

      ],

      ncertUrl:
        "https://ncert.nic.in/textbook.php"

    },


    /* ===============================
       ARS AI
       =============================== */

    ai: {

      page:
        "ars-ai.html",

      enabled:
        true,

      apiKeyLocation:
        "server-only",

      fields: [

        "name",
        "forWhom",
        "category",
        "mood",
        "style",
        "length",
        "language"

      ],

      lengths: [

        2,
        4,
        6

      ],

      languages: [

        "Hindi",
        "English"

      ]

    },


    /* ===============================
       BOOK
       =============================== */

    book: {

      title:
        "मेरी पहली उड़ान",

      author:
        "Adarsh Raj Shayar",

      page:
        "ars-book.html"

    },


    /* ===============================
       DICTIONARY
       =============================== */

    dictionary: {

      page:
        "dictionary.html",

      fields: [

        "word",
        "meaning",
        "pronunciation",
        "partOfSpeech",
        "example",
        "synonym",
        "antonym",
        "relatedWords"

      ]

    },


    /* ===============================
       ARS EXAM
       =============================== */

    exam: {

      name:
        "ARS Education & Talent Exam",

      targetClasses: [

        5,
        6,
        7,
        8

      ],

      status:
        "planned",

      proposedPattern: {

        questions: 60,

        marks: 60,

        durationMinutes: 60,

        sections: {

          mathematics: 15,

          science: 15,

          language: 10,

          generalAwareness: 10,

          mentalAbility: 10

        }

      },

      flow: [

        "Registration",
        "Verification",
        "Exam ID",
        "Admit Card",
        "Mock Test",
        "Live Exam",
        "Submission",
        "Evaluation",
        "Result",
        "Certificate",
        "Verification"

      ]

    },


    /* ===============================
       JOIN ARS
       =============================== */

    joining: {

      page:
        "join.html",

      statuses: [

        "Pending",
        "Under Review",
        "Approved",
        "Rejected"

      ],

      flow: [

        "Application",
        "Admin Review",
        "Approval",
        "Joining Certificate",
        "Certificate ID",
        "QR Verification"

      ]

    },


    /* ===============================
       CERTIFICATES
       =============================== */

    certificates: {

      normal:
        "certificate.html",

      verify:
        "verify.html",

      joining:
        "joining-certificate.html",

      verification:

        [

          "certificateId",
          "name",
          "type",
          "issueDate",
          "status"

        ]

    },


    /* ===============================
       USER DASHBOARD
       =============================== */

    dashboard: {

      page:
        "dashboard.html",

      sections: [

        "My Profile",
        "Education",
        "My Certificates",
        "My Exams",
        "My Results",
        "My Joining",
        "Saved Shayari",
        "Favorites",
        "Notifications",
        "Activity"

      ]

    },


    /* ===============================
       ADMIN
       =============================== */

    admin: {

      page:
        "admin.html",

      sections: [

        "Dashboard",
        "Users",
        "Students",
        "Joining Applications",
        "Certificates",
        "Education Manager",
        "Dictionary Manager",
        "Exam Manager",
        "Content Management",
        "Publisher Management",
        "Reports",
        "Security Logs",
        "Website Management"

      ]

    },


    /* ===============================
       PUBLISHER
       =============================== */

    publisher: {

      page:
        "publisher.html",

      types: [

        "Shayari",
        "Stories",
        "Poetry",
        "Education"

      ],

      actions: [

        "Add",
        "Edit",
        "Delete",
        "Draft",
        "Publish",
        "Unpublish",
        "Search"

      ]

    },


    /* ===============================
       SUPPORT
       =============================== */

    support: {

      page:
        "support.html",

      categories: [

        "Login",
        "Registration",
        "Profile",
        "Education",
        "Exam",
        "Certificate",
        "Joining",
        "Technical"

      ]

    },


    /* ===============================
       SECURITY
       =============================== */

    security: {

      passwordHashing:
        true,

      rateLimiting:
        true,

      inputValidation:
        true,

      helmet:
        true,

      cors:
        true,

      auditLogs:
        true,

      serverSideSecrets:
        true

    },


    /* ===============================
       LOCAL STORAGE
       =============================== */

    storage: {

      prefix:
        "ARS_",

      keys: {

        liked:
          "liked",

        favorites:
          "favorites",

        saved:
          "saved",

        user:
          "user",

        session:
          "session",

        settings:
          "settings",

        history:
          "history"

      }

    },


    /* ===============================
       MESSAGES
       =============================== */

    messages: {

      welcome:
        "Welcome to ARS Official ❤️",

      loginRequired:
        "Please login to continue.",

      saved:
        "Saved successfully.",

      error:
        "Something went wrong. Please try again."

    }

  };


  /* =======================================================
     GLOBAL HELPERS
     ======================================================= */

  CONFIG.getBackendApi = function () {

    return (
      CONFIG.backend.url +
      CONFIG.backend.apiPrefix
    );

  };


  CONFIG.getAsset = function (name) {

    return (
      CONFIG.assets[name] || ""
    );

  };


  /* =======================================================
     GLOBAL EXPORT
     ======================================================= */

  window.CONFIG = CONFIG;

  window.ARS = CONFIG;


})();
