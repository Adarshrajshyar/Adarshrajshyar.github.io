
/*
 * ARS — Adarsh Ke Alfaz
 * Shared website configuration.
 *
 * Asset paths:
 * assets/logo.png
 * assets/banner.png
 * assets/education-banner.png
 * assets/signature.png
 * assets/founder.jpg
 */

window.ARS_CONFIG = {
  brand: {
    name: "ARS — Adarsh Ke Alfaz",
    shortName: "ARS",
    founder: "Adarsh Raj Shayar",
    description:
      "शिक्षा, ज्ञान, साहित्य और विद्यार्थियों के विकास का मंच।"
  },

  assets: {
    logo: "assets/logo.png",
    banner: "assets/banner.png",
    educationBanner: "assets/education-banner.png",
    signature: "assets/signature.png",
    founderPhoto: "assets/founder.jpg"
  },

  social: {
    instagram: "https://www.instagram.com/adarshkealfaaz_/",
    youtube: "https://www.youtube.com/@Adarshshyari"
  },

  navigation: [
    { label: "Home", href: "index.html" },
    { label: "Education", href: "education.html" },
    { label: "Knowledge Power", href: "knowledge-power.html" },
    { label: "Exams", href: "exams.html" },
    { label: "Shayari", href: "shayari.html" },
    { label: "Stories", href: "stories.html" },
    { label: "Poetry", href: "poetry.html" },
    { label: "Biography", href: "biography.html" },
    { label: "Founder", href: "founder.html" },
    { label: "ARS Book", href: "ars-book.html" },
    { label: "Updates", href: "updates.html" },
    { label: "Join ARS", href: "join-ars.html" },
    { label: "Certificate", href: "certificate.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
    { label: "Sponsor", href: "sponsor.html" }
  ],

  education: {
    classes: [5, 6, 7, 8],
    subjects: [
      "Hindi",
      "English",
      "Mathematics",
      "Science",
      "Social Science",
      "Reasoning"
    ],
    features: [
      "Chapter-wise notes",
      "Easy explanations",
      "Important questions",
      "MCQ practice",
      "Answer explanations",
      "Revision material"
    ]
  },

  knowledgeCategories: [
    {
      title: "Science",
      slug: "science",
      description: "विज्ञान, प्रयोग और प्राकृतिक घटनाएँ।"
    },
    {
      title: "Bihar",
      slug: "bihar",
      description: "बिहार का इतिहास, भूगोल और सामान्य ज्ञान।"
    },
    {
      title: "India",
      slug: "india",
      description: "भारत, संविधान, राष्ट्रीय प्रतीक और इतिहास।"
    },
    {
      title: "World",
      slug: "world",
      description: "देश, महाद्वीप और विश्व की जानकारी।"
    },
    {
      title: "Technology",
      slug: "technology",
      description: "कंप्यूटर, इंटरनेट और नई तकनीक।"
    },
    {
      title: "Environment",
      slug: "environment",
      description: "प्रकृति, प्रदूषण और पर्यावरण संरक्षण।"
    },
    {
      title: "History",
      slug: "history",
      description: "ऐतिहासिक घटनाएँ और महत्वपूर्ण व्यक्तित्व।"
    },
    {
      title: "Geography",
      slug: "geography",
      description: "पृथ्वी, जलवायु, नदियाँ और मानचित्र।"
    },
    {
      title: "Interesting Facts",
      slug: "facts",
      description: "रोचक और ज्ञानवर्धक तथ्य।"
    }
  ],

  storyCategories: [
    "Moral Stories",
    "Motivational Stories",
    "Mystery Stories",
    "Horror Stories",
    "Educational Stories",
    "Inspirational Stories"
  ],

  shayariCategories: [
    "Love",
    "Attitude",
    "Motivation",
    "Sad",
    "Emotional",
    "Life"
  ],

  exam: {
    name: "ARS Education Talent Research Examination",
    stage: "Stage 1",
    classes: "5–8",
    mode: "Online",
    date: "13 December 2026",
    duration: "1 hour",
    notice:
      "अंतिम परीक्षा समय, पंजीकरण तिथि, पात्रता और नियम आधिकारिक सूचना से सत्यापित करें।"
  },

  policies: {
    privacy: "privacy.html",
    terms: "terms.html",
    examRules: "exam-rules.html"
  }
};

/* Do not put passwords, secret keys, or private student records here.
   This file is public when the website is hosted on GitHub Pages. */
