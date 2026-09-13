/* =========================================================
   ARS OFFICIAL — STORAGE ENGINE
   Local data management for development/frontend
   ========================================================= */

(function (window) {
  "use strict";

  const PREFIX =
    (window.ARS_CONFIG &&
      window.ARS_CONFIG.STORAGE &&
      window.ARS_CONFIG.STORAGE.PREFIX) ||
    "ARS_";

  const VERSION =
    (window.ARS_CONFIG &&
      window.ARS_CONFIG.STORAGE &&
      window.ARS_CONFIG.STORAGE.VERSION) ||
    "1";

  const STORAGE_VERSION_KEY = `${PREFIX}STORAGE_VERSION`;

  /* -------------------------------------------------------
     Internal helpers
     ------------------------------------------------------- */

  function makeKey(key) {
    return `${PREFIX}${key}`;
  }

  function isStorageAvailable() {
    try {
      const testKey = `${PREFIX}__TEST__`;
      localStorage.setItem(testKey, "1");
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.warn("ARS Storage unavailable:", error);
      return false;
    }
  }

  function safeParse(value, fallback = null) {
    if (value === null || value === undefined) {
      return fallback;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function safeStringify(value) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.error("ARS Storage stringify error:", error);
      return null;
    }
  }

  function generateId(prefix = "ARS") {
    const now = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `${prefix}-${now}-${random}`;
  }

  function timestamp() {
    return new Date().toISOString();
  }

  /* -------------------------------------------------------
     Basic storage API
     ------------------------------------------------------- */

  function set(key, value) {
    if (!isStorageAvailable()) return false;

    const serialized = safeStringify(value);

    if (serialized === null) return false;

    try {
      localStorage.setItem(makeKey(key), serialized);
      return true;
    } catch (error) {
      console.error("ARS Storage set error:", error);
      return false;
    }
  }

  function get(key, fallback = null) {
    if (!isStorageAvailable()) return fallback;

    try {
      const value = localStorage.getItem(makeKey(key));
      return safeParse(value, fallback);
    } catch (error) {
      console.error("ARS Storage get error:", error);
      return fallback;
    }
  }

  function remove(key) {
    if (!isStorageAvailable()) return false;

    try {
      localStorage.removeItem(makeKey(key));
      return true;
    } catch (error) {
      console.error("ARS Storage remove error:", error);
      return false;
    }
  }

  function has(key) {
    if (!isStorageAvailable()) return false;

    return localStorage.getItem(makeKey(key)) !== null;
  }

  function clear() {
    if (!isStorageAvailable()) return false;

    try {
      const keys = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.startsWith(PREFIX)) {
          keys.push(key);
        }
      }

      keys.forEach((key) => localStorage.removeItem(key));

      return true;
    } catch (error) {
      console.error("ARS Storage clear error:", error);
      return false;
    }
  }

  /* -------------------------------------------------------
     Array helpers
     ------------------------------------------------------- */

  function getArray(key) {
    const value = get(key, []);
    return Array.isArray(value) ? value : [];
  }

  function saveArray(key, array) {
    return set(key, Array.isArray(array) ? array : []);
  }

  function addToArray(key, item) {
    const array = getArray(key);
    array.push(item);
    return saveArray(key, array);
  }

  function removeFromArray(key, predicate) {
    const array = getArray(key);
    const filtered = array.filter((item, index) => {
      return !predicate(item, index);
    });

    return saveArray(key, filtered);
  }

  /* -------------------------------------------------------
     Likes
     ------------------------------------------------------- */

  function getLikes() {
    return getArray("LIKES");
  }

  function hasLiked(id) {
    return getLikes().some((item) => {
      return String(item.id) === String(id);
    });
  }

  function toggleLike(id, type = "content") {
    if (!id) return false;

    const likes = getLikes();
    const index = likes.findIndex((item) => {
      return String(item.id) === String(id);
    });

    if (index >= 0) {
      likes.splice(index, 1);
      saveArray("LIKES", likes);
      return false;
    }

    likes.push({
      id: String(id),
      type,
      createdAt: timestamp(),
    });

    saveArray("LIKES", likes);

    return true;
  }

  /* -------------------------------------------------------
     Favorites
     ------------------------------------------------------- */

  function getFavorites() {
    return getArray("FAVORITES");
  }

  function isFavorite(id) {
    return getFavorites().some((item) => {
      return String(item.id) === String(id);
    });
  }

  function toggleFavorite(id, type = "content") {
    if (!id) return false;

    const favorites = getFavorites();

    const index = favorites.findIndex((item) => {
      return String(item.id) === String(id);
    });

    if (index >= 0) {
      favorites.splice(index, 1);
      saveArray("FAVORITES", favorites);
      return false;
    }

    favorites.push({
      id: String(id),
      type,
      createdAt: timestamp(),
    });

    saveArray("FAVORITES", favorites);

    return true;
  }

  /* -------------------------------------------------------
     Saved content
     ------------------------------------------------------- */

  function getSaved() {
    return getArray("SAVED");
  }

  function isSaved(id) {
    return getSaved().some((item) => {
      return String(item.id) === String(id);
    });
  }

  function toggleSaved(id, type = "content") {
    if (!id) return false;

    const saved = getSaved();

    const index = saved.findIndex((item) => {
      return String(item.id) === String(id);
    });

    if (index >= 0) {
      saved.splice(index, 1);
      saveArray("SAVED", saved);
      return false;
    }

    saved.push({
      id: String(id),
      type,
      createdAt: timestamp(),
    });

    saveArray("SAVED", saved);

    return true;
  }

  /* -------------------------------------------------------
     Shayari data
     ------------------------------------------------------- */

  function getShayari() {
    return getArray("SHAYARI");
  }

  function saveShayari(item) {
    if (!item) return false;

    const data = getShayari();

    const newItem = {
      id: item.id || generateId("ARS-SHY"),
      title: item.title || "",
      text: item.text || "",
      category: item.category || "general",
      author: item.author || "Adarsh Raj Shayar",
      status: item.status || "published",
      createdAt: item.createdAt || timestamp(),
      updatedAt: timestamp(),
    };

    const index = data.findIndex((x) => x.id === newItem.id);

    if (index >= 0) {
      data[index] = {
        ...data[index],
        ...newItem,
      };
    } else {
      data.push(newItem);
    }

    return saveArray("SHAYARI", data);
  }

  /* -------------------------------------------------------
     Stories & Poetry
     ------------------------------------------------------- */

  function getStories() {
    return getArray("STORIES");
  }

  function saveStory(item) {
    if (!item) return false;

    const data = getStories();

    const newItem = {
      id: item.id || generateId("ARS-STORY"),
      title: item.title || "",
      content: item.content || "",
      type: item.type || "story",
      category: item.category || "general",
      author: item.author || "Adarsh Raj Shayar",
      status: item.status || "published",
      createdAt: item.createdAt || timestamp(),
      updatedAt: timestamp(),
    };

    const index = data.findIndex((x) => x.id === newItem.id);

    if (index >= 0) {
      data[index] = {
        ...data[index],
        ...newItem,
      };
    } else {
      data.push(newItem);
    }

    return saveArray("STORIES", data);
  }

  /* -------------------------------------------------------
     Education content
     ------------------------------------------------------- */

  function getEducation() {
    return getArray("EDUCATION");
  }

  function saveEducation(item) {
    if (!item) return false;

    const data = getEducation();

    const newItem = {
      id: item.id || generateId("ARS-EDU"),
      classLevel: item.classLevel || "",
      subject: item.subject || "",
      book: item.book || "",
      chapter: item.chapter || "",
      title: item.title || "",
      contentType: item.contentType || "chapter",
      content: item.content || "",
      notes: item.notes || "",
      mcq: Array.isArray(item.mcq) ? item.mcq : [],
      practice: Array.isArray(item.practice) ? item.practice : [],
      status: item.status || "draft",
      createdAt: item.createdAt || timestamp(),
      updatedAt: timestamp(),
    };

    const index = data.findIndex((x) => x.id === newItem.id);

    if (index >= 0) {
      data[index] = {
        ...data[index],
        ...newItem,
      };
    } else {
      data.push(newItem);
    }

    return saveArray("EDUCATION", data);
  }

  /* -------------------------------------------------------
     Joining applications
     ------------------------------------------------------- */

  function getJoiningApplications() {
    return getArray("JOINING_APPLICATIONS");
  }

  function saveJoiningApplication(application) {
    if (!application) return null;

    const applications = getJoiningApplications();

    const newApplication = {
      id: application.id || generateId("ARS-JOIN"),
      name: application.name || "",
      email: application.email || "",
      phone: application.phone || "",
      city: application.city || "",
      state: application.state || "",
      message: application.message || "",
      status: application.status || "pending",
      submittedAt: application.submittedAt || timestamp(),
      updatedAt: timestamp(),
    };

    const index = applications.findIndex(
      (item) => item.id === newApplication.id
    );

    if (index >= 0) {
      applications[index] = {
        ...applications[index],
        ...newApplication,
      };
    } else {
      applications.push(newApplication);
    }

    saveArray("JOINING_APPLICATIONS", applications);

    return newApplication;
  }

  function getJoiningApplication(id) {
    return getJoiningApplications().find(
      (item) => String(item.id) === String(id)
    ) || null;
  }

  function updateJoiningStatus(id, status, extraData = {}) {
    const applications = getJoiningApplications();

    const index = applications.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (index < 0) return false;

    applications[index] = {
      ...applications[index],
      ...extraData,
      status,
      updatedAt: timestamp(),
    };

    return saveArray("JOINING_APPLICATIONS", applications);
  }

  /* -------------------------------------------------------
     Certificates
     ------------------------------------------------------- */

  function getCertificates() {
    return getArray("CERTIFICATES");
  }

  function saveCertificate(certificate) {
    if (!certificate) return null;

    const certificates = getCertificates();

    const newCertificate = {
      id:
        certificate.id ||
        generateId(
          window.ARS_CONFIG?.CERTIFICATE?.ID_PREFIX || "ARS-CERT"
        ),
      type: certificate.type || "other",
      name: certificate.name || "",
      title: certificate.title || "",
      description: certificate.description || "",
      date: certificate.date || timestamp().split("T")[0],
      issuer: certificate.issuer || "ARS Official",
      status: certificate.status || "valid",
      qrData: certificate.qrData || "",
      createdAt: certificate.createdAt || timestamp(),
      updatedAt: timestamp(),
    };

    const index = certificates.findIndex(
      (item) => item.id === newCertificate.id
    );

    if (index >= 0) {
      certificates[index] = {
        ...certificates[index],
        ...newCertificate,
      };
    } else {
      certificates.push(newCertificate);
    }

    saveArray("CERTIFICATES", certificates);

    return newCertificate;
  }

  function getCertificate(id) {
    return getCertificates().find(
      (item) => String(item.id).toUpperCase() === String(id).toUpperCase()
    ) || null;
  }

  /* -------------------------------------------------------
     Joining certificates
     ------------------------------------------------------- */

  function getJoiningCertificates() {
    return getArray("JOINING_CERTIFICATES");
  }

  function saveJoiningCertificate(certificate) {
    if (!certificate) return null;

    const certificates = getJoiningCertificates();

    const newCertificate = {
      id:
        certificate.id ||
        generateId(
          window.ARS_CONFIG?.CERTIFICATE?.JOINING_ID_PREFIX || "ARS-JOIN"
        ),
      applicationId: certificate.applicationId || "",
      name: certificate.name || "",
      title: certificate.title || "ARS Joining Certificate",
      date: certificate.date || timestamp().split("T")[0],
      status: certificate.status || "valid",
      qrData: certificate.qrData || "",
      createdAt: certificate.createdAt || timestamp(),
      updatedAt: timestamp(),
    };

    const index = certificates.findIndex(
      (item) => item.id === newCertificate.id
    );

    if (index >= 0) {
      certificates[index] = {
        ...certificates[index],
        ...newCertificate,
      };
    } else {
      certificates.push(newCertificate);
    }

    saveArray("JOINING_CERTIFICATES", certificates);

    return newCertificate;
  }

  function getJoiningCertificate(id) {
    return getJoiningCertificates().find(
      (item) => String(item.id).toUpperCase() === String(id).toUpperCase()
    ) || null;
  }

  /* -------------------------------------------------------
     Site settings
     ------------------------------------------------------- */

  function getSettings() {
    return get("SETTINGS", {});
  }

  function saveSettings(settings) {
    return set("SETTINGS", {
      ...getSettings(),
      ...settings,
      updatedAt: timestamp(),
    });
  }

  /* -------------------------------------------------------
     User preferences
     ------------------------------------------------------- */

  function getPreferences() {
    return get("PREFERENCES", {});
  }

  function savePreferences(preferences) {
    return set("PREFERENCES", {
      ...getPreferences(),
      ...preferences,
    });
  }

  /* -------------------------------------------------------
     Storage information
     ------------------------------------------------------- */

  function getStorageInfo() {
    let totalKeys = 0;

    if (isStorageAvailable()) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.startsWith(PREFIX)) {
          totalKeys++;
        }
      }
    }

    return {
      prefix: PREFIX,
      version: VERSION,
      totalKeys,
      available: isStorageAvailable(),
    };
  }

  /* -------------------------------------------------------
     Initialize
     ------------------------------------------------------- */

  function initialize() {
    if (!isStorageAvailable()) return false;

    try {
      if (!localStorage.getItem(STORAGE_VERSION_KEY)) {
        localStorage.setItem(STORAGE_VERSION_KEY, VERSION);
      }

      return true;
    } catch (error) {
      console.error("ARS Storage initialization failed:", error);
      return false;
    }
  }

  initialize();

  /* -------------------------------------------------------
     Public API
     ------------------------------------------------------- */

  const ARS_STORAGE = {
    set,
    get,
    remove,
    has,
    clear,

    getArray,
    saveArray,
    addToArray,
    removeFromArray,

    generateId,
    timestamp,

    getLikes,
    hasLiked,
    toggleLike,

    getFavorites,
    isFavorite,
    toggleFavorite,

    getSaved,
    isSaved,
    toggleSaved,

    getShayari,
    saveShayari,

    getStories,
    saveStory,

    getEducation,
    saveEducation,

    getJoiningApplications,
    saveJoiningApplication,
    getJoiningApplication,
    updateJoiningStatus,

    getCertificates,
    saveCertificate,
    getCertificate,

    getJoiningCertificates,
    saveJoiningCertificate,
    getJoiningCertificate,

    getSettings,
    saveSettings,

    getPreferences,
    savePreferences,

    getStorageInfo,
  };

  window.ARS_STORAGE = ARS_STORAGE;
  window.ARSStorage = ARS_STORAGE;

})(window);
