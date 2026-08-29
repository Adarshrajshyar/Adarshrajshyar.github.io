/* =========================================================
   ARS OFFICIAL — STORAGE.JS
   Central LocalStorage Data Layer
   ========================================================= */

"use strict";

(function (window) {

  const KEYS = Object.freeze({
    SHAYARI: "ARS_SHAYARI_DATA",
    STORIES: "ARS_STORY_DATA",
    LIKES: "ARS_LIKES",
    FAVORITES: "ARS_FAVORITES",
    CERTIFICATES: "ARS_CERTIFICATES",
    JOIN_REQUESTS: "ARS_JOIN_REQUESTS",
    MESSAGES: "ARS_CONTACT_MESSAGES"
  });

  function read(key, fallback = []) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return fallback;

      const parsed = JSON.parse(value);
      return parsed ?? fallback;
    } catch (error) {
      console.error("ARS Storage Read Error:", error);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (error) {
      console.error("ARS Storage Write Error:", error);
      return value;
    }
  }

  function makeId(prefix) {
    const time = Date.now().toString(36).toUpperCase();
    const random = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    return `${prefix}-${time}${random}`;
  }

  /* ---------------- SHAYARI ---------------- */

  function getShayari() {
    return read(KEYS.SHAYARI, []);
  }

  function saveShayari(data) {
    return write(KEYS.SHAYARI, data);
  }

  /* ---------------- STORIES ---------------- */

  function getStories() {
    return read(KEYS.STORIES, []);
  }

  function saveStories(data) {
    return write(KEYS.STORIES, data);
  }

  /* ---------------- LIKES ---------------- */

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

  /* ---------------- FAVORITES ---------------- */

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

  function clearFavorites() {
    write(KEYS.FAVORITES, []);
  }

  /* ---------------- CERTIFICATES ---------------- */

  function certificates() {
    return read(KEYS.CERTIFICATES, []);
  }

  function saveCertificate(certificate) {

    const list = certificates();

    const index = list.findIndex(
      item => String(item.id) === String(certificate.id)
    );

    if (index === -1) {
      list.push(certificate);
    } else {
      list[index] = certificate;
    }

    write(KEYS.CERTIFICATES, list);

    return certificate;
  }

  function findCertificate(id) {

    if (!id) return null;

    return certificates().find(
      item =>
        String(item.id).toLowerCase() ===
        String(id).trim().toLowerCase()
    ) || null;
  }

  /* ---------------- JOINING REQUESTS ---------------- */

  function joins() {
    return read(KEYS.JOIN_REQUESTS, []);
  }

  function saveJoin(data) {

    const request = {
      ...data,

      id: data.id || makeId("ARS-JOIN"),

      status: data.status || "pending",

      createdAt:
        data.createdAt ||
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()
    };

    const list = joins();

    list.push(request);

    write(KEYS.JOIN_REQUESTS, list);

    return request;
  }

  function findJoin(id) {

    if (!id) return null;

    return joins().find(
      item =>
        String(item.id).toLowerCase() ===
        String(id).trim().toLowerCase()
    ) || null;
  }

  function updateJoin(id, updates) {

    const list = joins();

    const index = list.findIndex(
      item =>
        String(item.id).toLowerCase() ===
        String(id).toLowerCase()
    );

    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    write(KEYS.JOIN_REQUESTS, list);

    return list[index];
  }

  /* ---------------- CONTACT MESSAGES ---------------- */

  function messages() {
    return read(KEYS.MESSAGES, []);
  }

  function saveMessage(data) {

    const message = {
      ...data,

      id: makeId("ARS-MSG"),

      createdAt:
        new Date().toISOString()
    };

    const list = messages();

    list.push(message);

    write(KEYS.MESSAGES, list);

    return message;
  }

  /* ---------------- PUBLIC API ---------------- */

  window.ARS_STORAGE = {

    KEYS,

    read,
    write,
    newId: makeId,

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
    clearFavorites,

    certificates,
    saveCertificate,
    findCertificate,

    joins,
    saveJoin,
    findJoin,
    updateJoin,

    messages,
    saveMessage
  };

  console.log("✅ ARS Storage System Loaded");

})(window);
