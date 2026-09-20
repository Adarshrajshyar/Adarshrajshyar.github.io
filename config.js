/* =========================================================
   ARS OFFICIAL — GLOBAL CONFIGURATION
   Founder: Adarsh Raj
   Version: 5.0.0
   ========================================================= */

const CONFIG = {
  brand: {
    name: "ARS Official",
    shortName: "ARS",
    founder: "Adarsh Raj",
    authorName: "Adarsh Raj Shayar",
    title: "Adarsh Raj Shayar",
    tagline: "शब्दों से सपनों तक की एक नई उड़ान।",
    description:
      "ARS Official — Adarsh Raj द्वारा शुरू किया गया एक creative, educational और literary platform.",
    website: "https://adarshrajshyar.github.io/",
    language: "hi",
    version: "5.0.0"
  },

  assets: {
    logo: "logo.png",
    banner: "banner.png",
    founderPhoto: "photo.jpg1.jpeg",
    signature: "signature.jpg",
    websiteImage: "website.jpeg"
  },

  social: {
    whatsappGK:
      "https://whatsapp.com/channel/0029VbDYBoZHFxPB8BmjHq3e",
    instagram: "https://www.instagram.com/adarshrajshyar/"
  },

  navigation: [
    { label: "Home", href: "index.html" },
    { label: "Founder", href: "founder.html" },
    { label: "Shayari", href: "shayari.html" },
    { label: "Stories", href: "stories.html" },
    { label: "ARS Education", href: "education.html" },
    { label: "First Flight", href: "first-flight.html" },
    { label: "ARS AI", href: "ars-ai.html" },
    { label: "ARS Book", href: "book.html" },
    { label: "Join ARS", href: "joining.html" },
    { label: "Certificate", href: "certificate.html" },
    { label: "Verify", href: "verify.html" }
  ],

  shayari: {
    categories: [
      { id: "love", name: "Love", hindi: "प्रेम" },
      { id: "sad", name: "Sad", hindi: "दर्द / उदासी" },
      { id: "motivational", name: "Motivational", hindi: "प्रेरणादायक" },
      { id: "friendship", name: "Friendship", hindi: "दोस्ती" },
      { id: "attitude", name: "Attitude", hindi: "एटीट्यूड" },
      { id: "teacher", name: "Teachers Shayari", hindi: "शिक्षक शायरी" }
    ],

    teacherCategories: [
      { id: "general-teacher", name: "General Teacher", hindi: "सामान्य शिक्षक" },
      { id: "favourite-teacher", name: "Favourite Teacher", hindi: "प्रिय शिक्षक" },
      { id: "maths-teacher", name: "Maths Teacher", hindi: "गणित शिक्षक" },
      { id: "english-teacher", name: "English Teacher", hindi: "अंग्रेज़ी शिक्षक" },
      { id: "hindi-teacher", name: "Hindi Teacher", hindi: "हिंदी शिक्षक" },
      { id: "science-teacher", name: "Science Teacher", hindi: "विज्ञान शिक्षक" },
      { id: "social-science-teacher", name: "Social Science Teacher", hindi: "सामाजिक विज्ञान शिक्षक" },
      { id: "class-teacher", name: "Class Teacher", hindi: "कक्षा शिक्षक" },
      { id: "teacher-appreciation", name: "Teacher Appreciation", hindi: "शिक्षक सम्मान" },
      { id: "teachers-day", name: "Teacher's Day", hindi: "शिक्षक दिवस" }
    ],

    actions: [
      "like",
      "favorite",
      "save",
      "copy",
      "share"
    ]
  },

  stories: {
    categories: [
      { id: "mystery", name: "Mystery", hindi: "रहस्य" },
      { id: "horror", name: "Horror", hindi: "हॉरर" },
      { id: "biography", name: "Biography", hindi: "जीवनी" },
      { id: "life", name: "Life", hindi: "जीवन" },
      { id: "inspiration", name: "Inspiration", hindi: "प्रेरणा" },
      { id: "motivation", name: "Motivation", hindi: "प्रेरणादायक" },
      { id: "friendship", name: "Friendship", hindi: "दोस्ती" },
      { id: "dream", name: "Dream", hindi: "सपने" },
      { id: "education", name: "Education", hindi: "शिक्षा" },
      { id: "general", name: "General", hindi: "सामान्य" }
    ],

    types: [
      { id: "story", name: "Story", hindi: "कहानी" },
      { id: "poem", name: "Poem", hindi: "कविता" }
    ]
  },

  education: {
    classes: [
      {
        id: 5,
        name: "Class 5",
        hindi: "कक्षा 5"
      },
      {
        id: 6,
        name: "Class 6",
        hindi: "कक्षा 6"
      },
      {
        id: 7,
        name: "Class 7",
        hindi: "कक्षा 7"
      },
      {
        id: 8,
        name: "Class 8",
        hindi: "कक्षा 8"
      }
    ],

    flow: [
      "class",
      "subject",
      "book",
      "chapter",
      "explanation",
      "notes",
      "mcq",
      "practice",
      "revision"
    ],

    officialResources: {
      ncert: "https://ncert.nic.in/textbook.php"
    }
  },

  entranceExams: [
    {
      id: "navodaya",
      name: "Jawahar Navodaya Vidyalaya",
      shortName: "Navodaya",
      url: "https://navodaya.gov.in/"
    },
    {
      id: "sainik-school",
      name: "Sainik School / AISSEE",
      shortName: "Sainik School",
      url: "https://exams.nta.ac.in/AISSEE/"
    },
    {
      id: "rms",
      name: "Rashtriya Military Schools",
      shortName: "RMS",
      url: "https://www.rashtriyamilitaryschools.edu.in/"
    }
  ],

  firstFlight: {
    title: "First Flight",
    description:
      "ARS का शुरुआती learning और guidance section."
  },

  book: {
    title: "Meri Pehli Udaan",
    hindiTitle: "मेरी पहली उड़ान",
    author: "Adarsh Raj",
    type: "ARS Book",
    description:
      "शायरी, कविता, कहानी और जीवन से जुड़े रचनात्मक लेखन का ARS संग्रह."
  },

  ai: {
    name: "ARS AI",
    enabled: true,

    features: [
      "personalized-shayari",
      "chapter-help",
      "copy",
      "save",
      "share",
      "regenerate"
    ],

    shayariFields: [
      "name",
      "forWhom",
      "category",
      "mood",
      "style",
      "length",
      "language"
    ],

    lengths: [2, 4, 6],

    languages: [
      { id: "hi", name: "Hindi", label: "हिंदी" },
      { id: "en", name: "English", label: "English" }
    ],

    api: {
      enabled: false,
      endpoint: "",
      key: ""
    },

    securityNote:
      "AI API keys must remain on the secure backend and must never be stored in frontend code."
  },

  dictionary: {
    title: "ARS Dictionary",
    flow: [
      "alphabet",
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

  exam: {
    name: "ARS Education & Talent Exam",
    shortName: "ARS Exam",
    targetYear: 2027,

    targetClasses: [5, 6, 7, 8],

    status: "planned",

    pattern: {
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
      "registration",
      "verification",
      "exam-id",
      "admit-card",
      "mock-test",
      "live-exam",
      "submission",
      "evaluation",
      "result",
      "certificate",
      "verification"
    ],

    certificateTypes: [
      "qualified",
      "participation",
      "achievement"
    ],

    aiDuringLiveExam: false
  },

  certificates: {
    types: [
      {
        id: "joining",
        name: "ARS Joining Certificate",
        prefix: "ARS-JOIN"
      },
      {
        id: "participation",
        name: "Participation Certificate",
        prefix: "ARS-PART"
      },
      {
        id: "achievement",
        name: "Achievement Certificate",
        prefix: "ARS-ACH"
      },
      {
        id: "qualified",
        name: "Qualified Certificate",
        prefix: "ARS-QUAL"
      }
    ],

    verificationPage: "verify.html",
    qrEnabled: true
  },

  joining: {
    statuses: [
      "pending",
      "under-review",
      "approved",
      "rejected"
    ],

    flow: [
      "application",
      "pending",
      "admin-review",
      "approve-or-reject",
      "joining-certificate",
      "certificate-id",
      "qr",
      "verification"
    ]
  },

  publisher: {
    types: [
      "shayari",
      "stories",
      "poetry",
      "education"
    ],

    statuses: [
      "draft",
      "published",
      "unpublished",
      "archived"
    ]
  },

  admin: {
    sections: [
      "dashboard",
      "users",
      "joining",
      "certificates",
      "education",
      "dictionary",
      "exams",
      "content",
      "publishers",
      "reports",
      "security",
      "website"
    ]
  },

  user: {
    profileFields: [
      "name",
      "interests",
      "email",
      "mobile"
    ],

    dashboardSections: [
      "profile",
      "education",
      "certificates",
      "exams",
      "results",
      "joining",
      "saved-shayari",
      "favorites",
      "notifications",
      "activity"
    ]
  },

  support: {
    ticketTypes: [
      "login",
      "registration",
      "exam",
      "certificate",
      "profile-correction",
      "technical"
    ]
  },

  features: {
    shayari: true,
    stories: true,
    education: true,
    firstFlight: true,
    ai: true,
    book: true,
    dictionary: true,
    exam: true,
    joining: true,
    certificates: true,
    verification: true,
    publisher: true,
    admin: true,
    globalSearch: true,
    notifications: true,
    support: true
  },

  messages: {
    loading: "कृपया प्रतीक्षा करें...",
    success: "कार्य सफलतापूर्वक पूरा हुआ।",
    error: "कुछ समस्या हुई। कृपया पुनः प्रयास करें।",
    noData: "अभी कोई जानकारी उपलब्ध नहीं है।",
    copied: "कॉपी हो गया।",
    saved: "सेव हो गया।",
    removed: "हटा दिया गया।",
    loginRequired: "इस सुविधा के लिए लॉगिन आवश्यक है।",
    comingSoon: "यह सुविधा जल्द उपलब्ध होगी।"
  },

  app: {
    timezone: "Asia/Kolkata",
    currency: "INR",
    defaultLanguage: "hi",
    supportedLanguages: ["hi", "en"],

    backend: {
      enabled: false,
      baseURL: "https://ars-backend-hbbk.onrender.com"
    },

    security: {
      frontendNeverStoresSecrets: true,
      authenticationHandledByBackend: true,
      sensitiveDataHandledByBackend: true
    }
  }
};


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getByPath(object, path, fallback = undefined) {
  if (!object || !path) return fallback;

  const parts = String(path).split(".");
  let value = object;

  for (const part of parts) {
    if (
      value === null ||
      value === undefined ||
      !Object.prototype.hasOwnProperty.call(value, part)
    ) {
      return fallback;
    }

    value = value[part];
  }

  return value;
}

function get(path, fallback = undefined) {
  return getByPath(CONFIG, path, fallback);
}

function getNav() {
  return CONFIG.navigation;
}

function getShayariCategories() {
  return CONFIG.shayari.categories;
}

function getTeacherCategories() {
  return CONFIG.shayari.teacherCategories;
}

function getStoryCategories() {
  return CONFIG.stories.categories;
}

function getEducationClass(classNumber) {
  return CONFIG.education.classes.find(
    item => Number(item.id) === Number(classNumber)
  ) || null;
}

function getCertificateType(typeId) {
  return CONFIG.certificates.types.find(
    item => item.id === typeId
  ) || null;
}

function getEntranceExam(examId) {
  return CONFIG.entranceExams.find(
    item => item.id === examId
  ) || null;
}

function safeString(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value).trim();
}

function makeId(prefix = "ARS") {
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `${prefix}-${time}-${random}`;
}


/* =========================================================
   COMPATIBILITY HELPERS
   ========================================================= */

CONFIG.helpers = {
  getByPath,
  get,
  getNav,
  getShayariCategories,
  getTeacherCategories,
  getStoryCategories,
  getEducationClass,
  getCertificateType,
  getEntranceExam,
  safeString,
  makeId
};


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
  window.ARS = CONFIG;

  window.getByPath = getByPath;
  window.getConfig = get;
  window.getNav = getNav;
  window.getShayariCategories = getShayariCategories;
  window.getTeacherCategories = getTeacherCategories;
  window.getStoryCategories = getStoryCategories;
  window.getEducationClass = getEducationClass;
  window.getCertificateType = getCertificateType;
  window.getEntranceExam = getEntranceExam;
  window.safeString = safeString;
  window.makeARSId = makeId;
}
