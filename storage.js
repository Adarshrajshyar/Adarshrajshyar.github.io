/* =========================================================
   ARS OFFICIAL WEBSITE — STORAGE SYSTEM
   Local data management
   ========================================================= */

(function (window) {
  "use strict";

  const KEYS = {

    SHAYARI: "ARS_SHAYARI_DATA",
    STORIES: "ARS_STORY_DATA",

    LIKES: "ARS_LIKES",
    FAVORITES: "ARS_FAVORITES",

    CERTIFICATES: "ARS_CERTIFICATES",
    JOIN_REQUESTS: "ARS_JOIN_REQUESTS",

    CONTACT_MESSAGES: "ARS_CONTACT_MESSAGES"

  };

  function read(key, fallback = []) {

    try {

      const data = localStorage.getItem(key);

      if (!data) return fallback;

      return JSON.parse(data);

    } catch (error) {

      console.error("ARS Storage Read Error:", error);

      return fallback;

    }

  }

  function write(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return value;

    } catch (error) {

      console.error("ARS Storage Write Error:", error);

      return null;

    }

  }

  function generateId(prefix = "ARS") {

    return (
      prefix +
      "-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()
    );

  }

  /* =========================
     SHAYARI
     ========================= */

  function getShayari() {

    return read(KEYS.SHAYARI, []);

  }

  function saveShayari(data) {

    return write(KEYS.SHAYARI, data);

  }

  /* =========================
     STORIES
     ========================= */

  function getStories() {

    return read(KEYS.STORIES, []);

  }

  function saveStories(data) {

    return write(KEYS.STORIES, data);

  }

  /* =========================
     LIKES
     ========================= */

  function getLikes() {

    return read(KEYS.LIKES, []);

  }

  function hasLiked(id) {

    return getLikes().includes(String(id));

  }

  function toggleLike(id) {

    id = String(id);

    const likes = getLikes();

    const index = likes.indexOf(id);

    if (index === -1) {

      likes.push(id);

      write(KEYS.LIKES, likes);

      return true;

    }

    likes.splice(index, 1);

    write(KEYS.LIKES, likes);

    return false;

  }

  /* =========================
     FAVORITES
     ========================= */

  function getFavorites() {

    return read(KEYS.FAVORITES, []);

  }

  function isFavorite(id) {

    return getFavorites().includes(String(id));

  }

  function toggleFavorite(id) {

    id = String(id);

    const favorites = getFavorites();

    const index = favorites.indexOf(id);

    if (index === -1) {

      favorites.push(id);

      write(KEYS.FAVORITES, favorites);

      return true;

    }

    favorites.splice(index, 1);

    write(KEYS.FAVORITES, favorites);

    return false;

  }

  /* =========================
     CERTIFICATES
     ========================= */

  function getCertificates() {

    return read(KEYS.CERTIFICATES, []);

  }

  function saveCertificate(certificate) {

    const certificates = getCertificates();

    const index = certificates.findIndex(
      item => item.id === certificate.id
    );

    if (index === -1) {

      certificates.push(certificate);

    } else {

      certificates[index] = certificate;

    }

    write(KEYS.CERTIFICATES, certificates);

    return certificate;

  }

  function findCertificate(id) {

    if (!id) return null;

    return getCertificates().find(
      certificate =>
        String(certificate.id).toLowerCase() ===
        String(id).trim().toLowerCase()
    ) || null;

  }

  /* =========================
     JOIN REQUESTS
     ========================= */

  function getJoinRequests() {

    return read(KEYS.JOIN_REQUESTS, []);

  }

  function saveJoinRequest(request) {

    const data = {

      ...request,

      id:
        request.id ||
        generateId("ARS-JOIN"),

      status: "pending",

      createdAt:
        request.createdAt ||
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    };

    const requests = getJoinRequests();

    requests.push(data);

    write(KEYS.JOIN_REQUESTS, requests);

    return data;

  }

  function updateJoinRequest(id, updates) {

    const requests = getJoinRequests();

    const index = requests.findIndex(
      request => request.id === id
    );

    if (index === -1) return null;

    requests[index] = {

      ...requests[index],

      ...updates,

      updatedAt:
        new Date().toISOString()

    };

    write(KEYS.JOIN_REQUESTS, requests);

    return requests[index];

  }

  function findJoinRequest(id) {

    if (!id) return null;

    return getJoinRequests().find(
      request =>
        String(request.id).toLowerCase() ===
        String(id).trim().toLowerCase()
    ) || null;

  }

  /* =========================
     CONTACT MESSAGES
     ========================= */

  function getMessages() {

    return read(KEYS.CONTACT_MESSAGES, []);

  }

  function saveMessage(message) {

    const data = {

      ...message,

      id: generateId("ARS-MSG"),

      createdAt:
        new Date().toISOString(),

      read: false

    };

    const messages = getMessages();

    messages.push(data);

    write(KEYS.CONTACT_MESSAGES, messages);

    return data;

  }

  function markMessageRead(id) {

    const messages = getMessages();

    const index = messages.findIndex(
      message => message.id === id
    );

    if (index === -1) return null;

    messages[index].read = true;

    write(KEYS.CONTACT_MESSAGES, messages);

    return messages[index];

  }

  /* =========================
     PUBLIC API
     ========================= */

  window.ARS_STORAGE = {

    read,
    write,

    generateId,

    getShayari,
    saveShayari,

    getStories,
    saveStories,

    getLikes,
    hasLiked,
    toggleLike,

    getFavorites,
    isFavorite,
    toggleFavorite,

    getCertificates,
    saveCertificate,
    findCertificate,

    getJoinRequests,
    saveJoinRequest,
    updateJoinRequest,
    findJoinRequest,

    getMessages,
    saveMessage,
    markMessageRead

  };

  console.log(
    "💾 ARS Storage System Loaded"
  );

})(window);
