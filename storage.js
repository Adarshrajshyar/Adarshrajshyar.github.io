/* =========================================================
   ARS STORAGE SYSTEM
   ========================================================= */
(function (window) {
  "use strict";

  const KEYS = Object.freeze({

    SHAYARI: "ARS_SHAYARI_DATA",

    STORIES: "ARS_STORY_DATA",

    LIKES: "ARS_LIKES",

    FAVORITES: "ARS_FAVORITES",

    CERTIFICATES: "ARS_CERTIFICATES",

    JOIN_REQUESTS: "ARS_JOIN_REQUESTS",

    CONTACT_MESSAGES: "ARS_CONTACT_MESSAGES"

  });

  /* -----------------------------------------
     Safe JSON Read
     ----------------------------------------- */
  function read(key, fallback = []) {
    try {
      const value = localStorage.getItem(key);

      if (value === null) {
        return fallback;
      }

      const parsed = JSON.parse(value);

      return parsed ?? fallback;

    } catch (error) {

      console.error(
        "ARS Storage Read Error:",
        key,
        error
      );

      return fallback;
    }
  }

  /* -----------------------------------------
     Safe JSON Write
     ----------------------------------------- */
  function write(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return value;

    } catch (error) {

      console.error(
        "ARS Storage Write Error:",
        key,
        error
      );

      return null;
    }
  }

  /* -----------------------------------------
     Unique ID Generator
     ----------------------------------------- */
  function newId(prefix = "ARS") {

    const time =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `${prefix}-${time}-${random}`;
  }

  /* =======================================================
     SHAYARI
     ======================================================= */

  function getShayari() {
    return read(KEYS.SHAYARI, []);
  }

  function saveShayari(data) {
    return write(KEYS.SHAYARI, data);
  }

  /* =======================================================
     STORIES
     ======================================================= */

  function getStories() {
    return read(KEYS.STORIES, []);
  }

  function saveStories(data) {
    return write(KEYS.STORIES, data);
  }

  /* =======================================================
     LIKES
     ======================================================= */

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

  /* =======================================================
     FAVORITES
     ======================================================= */

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

  /* =======================================================
     CERTIFICATES
     ======================================================= */

  function certificates() {
    return read(KEYS.CERTIFICATES, []);
  }

  function saveCertificate(certificate) {

    const all = certificates();

    const index = all.findIndex(
      item =>
        String(item.id) ===
        String(certificate.id)
    );

    if (index === -1) {

      all.push(certificate);

    } else {

      all[index] = certificate;

    }

    write(KEYS.CERTIFICATES, all);

    return certificate;
  }

  function findCertificate(id) {

    return certificates().find(
      certificate =>
        String(certificate.id).toLowerCase() ===
        String(id).toLowerCase()
    ) || null;
  }

  /* =======================================================
     JOINING REQUESTS
     ======================================================= */

  function joins() {
    return read(KEYS.JOIN_REQUESTS, []);
  }

  function saveJoin(data) {

    const request = {
      ...data,

      id:
        data.id ||
        newId("ARS-JOIN"),

      status: "pending",

      createdAt:
        data.createdAt ||
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()
    };

    const all = joins();

    all.push(request);

    write(KEYS.JOIN_REQUESTS, all);

    return request;
  }

  function updateJoin(id, changes) {

    const all = joins();

    const index = all.findIndex(
      item =>
        String(item.id) ===
        String(id)
    );

    if (index === -1) {
      return null;
    }

    all[index] = {
      ...all[index],
      ...changes,
      updatedAt:
        new Date().toISOString()
    };

    write(KEYS.JOIN_REQUESTS, all);

    return all[index];
  }

  function findJoin(id) {

    return joins().find(
      item =>
        String(item.id).toLowerCase() ===
        String(id).toLowerCase()
    ) || null;
  }

  /* =======================================================
     CONTACT MESSAGES
     ======================================================= */

  function messages() {
    return read(KEYS.CONTACT_MESSAGES, []);
  }

  function saveMessage(data) {

    const message = {
      ...data,

      id: newId("ARS-MSG"),

      createdAt:
        new Date().toISOString(),

      read: false
    };

    const all = messages();

    all.push(message);

    write(
      KEYS.CONTACT_MESSAGES,
      all
    );

    return message;
  }

  function markMessageRead(id) {

    const all = messages();

    const index = all.findIndex(
      item =>
        String(item.id) ===
        String(id)
    );

    if (index === -1) {
      return null;
    }

    all[index].read = true;

    write(
      KEYS.CONTACT_MESSAGES,
      all
    );

    return all[index];
  }

  /* =======================================================
     CLEAR STORAGE — ADMIN DEVELOPMENT USE
     ======================================================= */

  function clearAll() {

    Object.values(KEYS).forEach(
      key => localStorage.removeItem(key)
    );

    console.warn(
      "⚠️ ARS local storage cleared."
    );
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.ARS_STORAGE = {

    KEYS,

    read,
    write,
    newId,

    getShayari,
    saveShayari,

    getStories,
    saveStories,

    likes: getLikes,
    hasLiked,
    toggleLike,

    favorites: getFavorites,
    isFavorite,
    toggleFavorite,

    certificates,
    saveCertificate,
    findCertificate,

    joins,
    saveJoin,
    updateJoin,
    findJoin,

    messages,
    saveMessage,
    markMessageRead,

    clearAll

  };

  console.log(
    "💾 ARS Storage System Loaded"
  );

})(window);
