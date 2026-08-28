/* =========================================================
   ARS OFFICIAL WEBSITE — STORAGE SYSTEM
   Version: 3.0.0
   ========================================================= */

(function (window) {
  "use strict";

  const KEYS = {
    shayari: "ARS_SHAYARI_DATA",
    stories: "ARS_STORY_DATA",
    likes: "ARS_LIKED_ITEMS",
    favorites: "ARS_FAVORITE_ITEMS",
    certificates: "ARS_CERTIFICATES",
    joiningRequests: "ARS_JOINING_REQUESTS",
    contactMessages: "ARS_CONTACT_MESSAGES",
    settings: "ARS_USER_SETTINGS"
  };

  /* ---------------------------------------------------------
     SAFE READ
     --------------------------------------------------------- */

  function read(key, fallback) {
    try {
      const value = localStorage.getItem(key);

      if (!value) return fallback;

      const parsed = JSON.parse(value);

      return parsed == null ? fallback : parsed;

    } catch (error) {
      console.warn(
        "ARS Storage Read Error:",
        key,
        error
      );

      return fallback;
    }
  }

  /* ---------------------------------------------------------
     SAFE WRITE
     --------------------------------------------------------- */

  function write(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    } catch (error) {
      console.warn(
        "ARS Storage Write Error:",
        key,
        error
      );

      return false;
    }
  }

  /* ---------------------------------------------------------
     REMOVE
     --------------------------------------------------------- */

  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  /* ---------------------------------------------------------
     SHAYARI
     --------------------------------------------------------- */

  function getShayari() {
    return read(KEYS.shayari, []);
  }

  function addShayari(item) {

    const list = getShayari();

    const index = list.findIndex(
      x => String(x.id) === String(item.id)
    );

    if (index >= 0) {
      list[index] = item;
    } else {
      list.push(item);
    }

    write(KEYS.shayari, list);

    return item;
  }

  function deleteShayari(id) {

    const list = getShayari().filter(
      item =>
        String(item.id) !== String(id)
    );

    return write(
      KEYS.shayari,
      list
    );
  }

  /* ---------------------------------------------------------
     STORIES
     --------------------------------------------------------- */

  function getStories() {
    return read(KEYS.stories, []);
  }

  function addStory(item) {

    const list = getStories();

    const index = list.findIndex(
      x => String(x.id) === String(item.id)
    );

    if (index >= 0) {
      list[index] = item;
    } else {
      list.push(item);
    }

    write(KEYS.stories, list);

    return item;
  }

  function deleteStory(id) {

    const list = getStories().filter(
      item =>
        String(item.id) !== String(id)
    );

    return write(
      KEYS.stories,
      list
    );
  }

  /* ---------------------------------------------------------
     LIKE SYSTEM
     --------------------------------------------------------- */

  function getLikes() {
    return read(KEYS.likes, []);
  }

  function hasLiked(id) {

    return getLikes().includes(
      String(id)
    );
  }

  function toggleLike(id) {

    id = String(id);

    const likes = getLikes();

    const index =
      likes.indexOf(id);

    if (index >= 0) {
      likes.splice(index, 1);
    } else {
      likes.push(id);
    }

    write(KEYS.likes, likes);

    return !(
      index >= 0
    );
  }

  /* ---------------------------------------------------------
     FAVORITE SYSTEM
     --------------------------------------------------------- */

  function getFavorites() {
    return read(KEYS.favorites, []);
  }

  function isFavorite(id) {

    return getFavorites().includes(
      String(id)
    );
  }

  function toggleFavorite(id) {

    id = String(id);

    const favorites =
      getFavorites();

    const index =
      favorites.indexOf(id);

    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }

    write(
      KEYS.favorites,
      favorites
    );

    return !(
      index >= 0
    );
  }

  /* ---------------------------------------------------------
     CERTIFICATES
     --------------------------------------------------------- */

  function getCertificates() {
    return read(
      KEYS.certificates,
      []
    );
  }

  function saveCertificate(certificate) {

    const list =
      getCertificates();

    const index =
      list.findIndex(
        item =>
          String(item.id) ===
          String(certificate.id)
      );

    if (index >= 0) {
      list[index] =
        certificate;
    } else {
      list.push(
        certificate
      );
    }

    write(
      KEYS.certificates,
      list
    );

    return certificate;
  }

  function findCertificate(id) {

    return (
      getCertificates().find(
        item =>
          String(item.id) ===
          String(id)
      ) || null
    );
  }

  /* ---------------------------------------------------------
     JOINING REQUESTS
     --------------------------------------------------------- */

  function getJoiningRequests() {

    return read(
      KEYS.joiningRequests,
      []
    );
  }

  function saveJoiningRequest(request) {

    const list =
      getJoiningRequests();

    if (!request.id) {
      request.id =
        "ARS-JOIN-" +
        Date.now().toString(36);
    }

    if (!request.status) {
      request.status =
        "pending";
    }

    request.updatedAt =
      new Date().toISOString();

    list.push(request);

    write(
      KEYS.joiningRequests,
      list
    );

    return request;
  }

  function updateJoiningRequest(
    id,
    updates
  ) {

    const list =
      getJoiningRequests();

    const index =
      list.findIndex(
        item =>
          String(item.id) ===
          String(id)
      );

    if (index === -1) {
      return null;
    }

    list[index] = {
      ...list[index],
      ...updates,
      updatedAt:
        new Date().toISOString()
    };

    write(
      KEYS.joiningRequests,
      list
    );

    return list[index];
  }

  /* ---------------------------------------------------------
     CONTACT MESSAGES
     --------------------------------------------------------- */

  function getContactMessages() {

    return read(
      KEYS.contactMessages,
      []
    );
  }

  function saveContactMessage(message) {

    const list =
      getContactMessages();

    const item = {
      id:
        message.id ||
        "ARS-MSG-" +
          Date.now().toString(36),

      name:
        message.name || "",

      email:
        message.email || "",

      subject:
        message.subject || "",

      message:
        message.message || "",

      createdAt:
        new Date().toISOString(),

      status:
        "new"
    };

    list.push(item);

    write(
      KEYS.contactMessages,
      list
    );

    return item;
  }

  /* ---------------------------------------------------------
     USER SETTINGS
     --------------------------------------------------------- */

  function getSettings() {

    return read(
      KEYS.settings,
      {}
    );
  }

  function saveSettings(settings) {

    const current =
      getSettings();

    return write(
      KEYS.settings,
      {
        ...current,
        ...settings
      }
    );
  }

  /* ---------------------------------------------------------
     CLEAR USER INTERACTIONS
     --------------------------------------------------------- */

  function clearLikes() {
    return remove(
      KEYS.likes
    );
  }

  function clearFavorites() {
    return remove(
      KEYS.favorites
    );
  }

  /* ---------------------------------------------------------
     EXPORT DATA
     --------------------------------------------------------- */

  function exportData() {

    return {
      shayari:
        getShayari(),

      stories:
        getStories(),

      likes:
        getLikes(),

      favorites:
        getFavorites(),

      certificates:
        getCertificates(),

      joiningRequests:
        getJoiningRequests(),

      contactMessages:
        getContactMessages(),

      settings:
        getSettings()
    };
  }

  /* ---------------------------------------------------------
     IMPORT DATA
     --------------------------------------------------------- */

  function importData(data) {

    if (!data || typeof data !== "object") {
      return false;
    }

    if (Array.isArray(data.shayari)) {
      write(
        KEYS.shayari,
        data.shayari
      );
    }

    if (Array.isArray(data.stories)) {
      write(
        KEYS.stories,
        data.stories
      );
    }

    if (Array.isArray(data.likes)) {
      write(
        KEYS.likes,
        data.likes
      );
    }

    if (Array.isArray(data.favorites)) {
      write(
        KEYS.favorites,
        data.favorites
      );
    }

    if (Array.isArray(data.certificates)) {
      write(
        KEYS.certificates,
        data.certificates
      );
    }

    if (Array.isArray(data.joiningRequests)) {
      write(
        KEYS.joiningRequests,
        data.joiningRequests
      );
    }

    if (Array.isArray(data.contactMessages)) {
      write(
        KEYS.contactMessages,
        data.contactMessages
      );
    }

    if (data.settings) {
      write(
        KEYS.settings,
        data.settings
      );
    }

    return true;
  }

  /* ---------------------------------------------------------
     PUBLIC API
     --------------------------------------------------------- */

  window.ARS_STORAGE = {

    keys: KEYS,

    read,
    write,
    remove,

    getShayari,
    addShayari,
    deleteShayari,

    getStories,
    addStory,
    deleteStory,

    getLikes,
    hasLiked,
    toggleLike,

    getFavorites,
    isFavorite,
    toggleFavorite,

    getCertificates,
    saveCertificate,
    findCertificate,

    getJoiningRequests,
    saveJoiningRequest,
    updateJoiningRequest,

    getContactMessages,
    saveContactMessage,

    getSettings,
    saveSettings,

    clearLikes,
    clearFavorites,

    exportData,
    importData
  };

  console.log(
    "💾 ARS Storage System Loaded"
  );

})(window);
