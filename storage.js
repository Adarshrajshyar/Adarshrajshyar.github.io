"use strict";

/*
 * ============================================================
 * ARS OFFICIAL — STORAGE ENGINE
 * ============================================================
 *
 * Central localStorage manager for:
 *
 * • Certificates
 * • Joining Certificates
 * • Favorites
 * • Likes
 * • Saved items
 * • Theme
 *
 * इसमें कोई external database required नहीं है।
 * ============================================================
 */

(function () {

  const CONFIG =
    window.ARS_CONFIG || {};


  const STORAGE =
    CONFIG.storage || {

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
        "ARS_THEME"

    };


  /* ==========================================================
     BASIC STORAGE HELPERS
     ========================================================== */

  function read(key, fallback) {

    try {

      const value =
        localStorage.getItem(key);

      if (value === null) {
        return fallback;
      }

      return JSON.parse(value);

    } catch (error) {

      return fallback;

    }

  }


  function write(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    } catch (error) {

      console.error(
        "ARS Storage Error:",
        error
      );

      return false;

    }

  }


  function remove(key) {

    try {

      localStorage.removeItem(key);

      return true;

    } catch (error) {

      return false;

    }

  }


  function getArray(key) {

    const value =
      read(key, []);

    return Array.isArray(value)
      ? value
      : [];

  }


  /* ==========================================================
     UNIQUE ARRAY HELPERS
     ========================================================== */

  function normalizeId(id) {

    return String(id || "")
      .trim();

  }


  function contains(key, id) {

    const target =
      normalizeId(id);

    if (!target) return false;

    return getArray(key)
      .map(normalizeId)
      .includes(target);

  }


  function addToArray(key, id) {

    const target =
      normalizeId(id);

    if (!target) return false;

    const list =
      getArray(key);

    if (!list.includes(target)) {

      list.push(target);

      return write(key, list);

    }

    return true;

  }


  function removeFromArray(key, id) {

    const target =
      normalizeId(id);

    const list =
      getArray(key);

    const updated =
      list.filter(
        item =>
          normalizeId(item) !== target
      );

    return write(
      key,
      updated
    );

  }


  function toggleArray(key, id) {

    if (contains(key, id)) {

      removeFromArray(
        key,
        id
      );

      return false;

    }

    addToArray(
      key,
      id
    );

    return true;

  }


  /* ==========================================================
     FAVORITES
     ========================================================== */

  function isFavorite(id) {

    return contains(
      STORAGE.favorites,
      id
    );

  }


  function toggleFavorite(id) {

    return toggleArray(
      STORAGE.favorites,
      id
    );

  }


  function getFavorites() {

    return getArray(
      STORAGE.favorites
    );

  }


  /* ==========================================================
     LIKES
     ========================================================== */

  function isLiked(id) {

    return contains(
      STORAGE.likes,
      id
    );

  }


  function toggleLike(id) {

    return toggleArray(
      STORAGE.likes,
      id
    );

  }


  function getLikes() {

    return getArray(
      STORAGE.likes
    );

  }


  /* ==========================================================
     SAVED ITEMS
     ========================================================== */

  function isSaved(id) {

    return contains(
      STORAGE.saved,
      id
    );

  }


  function toggleSaved(id) {

    return toggleArray(
      STORAGE.saved,
      id
    );

  }


  function getSaved() {

    return getArray(
      STORAGE.saved
    );

  }


  /* ==========================================================
     COPIED CONTENT
     ========================================================== */

  function markCopied(id) {

    return addToArray(
      STORAGE.copied,
      id
    );

  }


  function getCopied() {

    return getArray(
      STORAGE.copied
    );

  }


  /* ==========================================================
     CERTIFICATES
     ========================================================== */

  function getCertificates() {

    return getArray(
      STORAGE.certificates
    );

  }


  function saveCertificate(data) {

    if (
      !data ||
      typeof data !== "object"
    ) {
      return false;
    }


    const list =
      getCertificates();


    const id =
      normalizeId(
        data.id ||
        data.certificateId
      );


    if (!id) {

      return false;

    }


    const index =
      list.findIndex(
        item =>
          normalizeId(
            item.id ||
            item.certificateId
          ) === id
      );


    if (index >= 0) {

      list[index] = {
        ...list[index],
        ...data
      };

    } else {

      list.push({
        ...data,
        id
      });

    }


    return write(
      STORAGE.certificates,
      list
    );

  }


  function findCertificate(id) {

    const target =
      normalizeId(id);

    if (!target) return null;


    return getCertificates()
      .find(
        item =>
          normalizeId(
            item.id ||
            item.certificateId
          ) === target
      ) || null;

  }


  /* ==========================================================
     JOINING CERTIFICATES
     ========================================================== */

  function getJoiningCertificates() {

    return getArray(
      STORAGE.joiningCertificates
    );

  }


  function saveJoiningCertificate(data) {

    if (
      !data ||
      typeof data !== "object"
    ) {
      return false;
    }


    const list =
      getJoiningCertificates();


    const id =
      normalizeId(
        data.applicationNumber ||
        data.applicationNo ||
        data.applicationId ||
        data.id
      );


    if (!id) {

      return false;

    }


    const index =
      list.findIndex(
        item =>
          normalizeId(
            item.applicationNumber ||
            item.applicationNo ||
            item.applicationId ||
            item.id
          ) === id
      );


    if (index >= 0) {

      list[index] = {
        ...list[index],
        ...data
      };

    } else {

      list.push({
        ...data,
        applicationNumber: id
      });

    }


    return write(
      STORAGE.joiningCertificates,
      list
    );

  }


  function findJoiningCertificate(id) {

    const target =
      normalizeId(id);

    if (!target) return null;


    return getJoiningCertificates()
      .find(
        item =>
          normalizeId(
            item.applicationNumber ||
            item.applicationNo ||
            item.applicationId ||
            item.id
          ) === target
      ) || null;

  }


  /* ==========================================================
     THEME
     ========================================================== */

  function getTheme() {

    return (
      localStorage.getItem(
        STORAGE.theme
      ) || "light"
    );

  }


  function setTheme(theme) {

    const value =
      theme === "dark"
        ? "dark"
        : "light";


    try {

      localStorage.setItem(
        STORAGE.theme,
        value
      );

    } catch (_) {}


    document.documentElement
      .setAttribute(
        "data-theme",
        value
      );


    document.body?.classList.toggle(
      "dark-mode",
      value === "dark"
    );


    return value;

  }


  function toggleTheme() {

    return setTheme(
      getTheme() === "dark"
        ? "light"
        : "dark"
    );

  }


  /* ==========================================================
     CLEAR FUNCTIONS
     ========================================================== */

  function clearCertificates() {

    return remove(
      STORAGE.certificates
    );

  }


  function clearJoiningCertificates() {

    return remove(
      STORAGE.joiningCertificates
    );

  }


  function clearInteractions() {

    [
      STORAGE.favorites,
      STORAGE.likes,
      STORAGE.saved,
      STORAGE.copied
    ].forEach(remove);


    return true;

  }


  /* ==========================================================
     COUNTS
     ========================================================== */

  function counts() {

    return {

      certificates:
        getCertificates().length,

      joiningCertificates:
        getJoiningCertificates().length,

      favorites:
        getFavorites().length,

      likes:
        getLikes().length,

      saved:
        getSaved().length,

      copied:
        getCopied().length

    };

  }


  /* ==========================================================
     PUBLIC ARS STORAGE API
     ========================================================== */

  window.ARS_STORAGE = {

    read,
    write,
    remove,

    getArray,

    /* Favorites */
    isFavorite,
    toggleFavorite,
    getFavorites,

    /* Likes */
    isLiked,
    toggleLike,
    getLikes,

    /* Saved */
    isSaved,
    toggleSaved,
    getSaved,

    /* Copy */
    markCopied,
    getCopied,

    /* Certificates */
    getCertificates,
    saveCertificate,
    findCertificate,

    /* Joining */
    getJoiningCertificates,
    saveJoiningCertificate,
    findJoiningCertificate,

    /* Theme */
    getTheme,
    setTheme,
    toggleTheme,

    /* Maintenance */
    clearCertificates,
    clearJoiningCertificates,
    clearInteractions,

    /* Statistics */
    counts

  };


  /* ==========================================================
     APPLY SAVED THEME
     ========================================================== */

  function applyInitialTheme() {

    const theme =
      getTheme();

    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );

    if (document.body) {

      document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
      );

    }

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      applyInitialTheme,
      { once: true }
    );

  } else {

    applyInitialTheme();

  }

})();
