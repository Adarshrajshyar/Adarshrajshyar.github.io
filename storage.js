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

    MESSAGES: "ARS_CONTACT_MESSAGES",

    SETTINGS: "ARS_SETTINGS"

  });


  /* =======================================================
     SAFE READ
     ======================================================= */

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
        error
      );

      return fallback;
    }

  }


  /* =======================================================
     SAFE WRITE
     ======================================================= */

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
        error
      );

      return value;
    }

  }


  /* =======================================================
     REMOVE
     ======================================================= */

  function remove(key) {

    try {

      localStorage.removeItem(key);

      return true;

    } catch (error) {

      console.error(
        "ARS Storage Remove Error:",
        error
      );

      return false;
    }

  }


  /* =======================================================
     CLEAR ARS DATA
     ======================================================= */

  function clearKey(key) {

    return remove(key);

  }


  /* =======================================================
     ID GENERATOR
     ======================================================= */

  function makeId(prefix = "ARS") {

    const timestamp =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `${prefix}-${timestamp}-${random}`;

  }


  /* =======================================================
     SHAYARI
     ======================================================= */

  function getShayari() {

    return read(
      KEYS.SHAYARI,
      []
    );

  }


  function saveShayari(data) {

    return write(
      KEYS.SHAYARI,
      Array.isArray(data) ? data : []
    );

  }


  /* =======================================================
     STORIES
     ======================================================= */

  function getStories() {

    return read(
      KEYS.STORIES,
      []
    );

  }


  function saveStories(data) {

    return write(
      KEYS.STORIES,
      Array.isArray(data) ? data : []
    );

  }


  /* =======================================================
     LIKES
     ======================================================= */

  function getLikes() {

    return read(
      KEYS.LIKES,
      []
    );

  }


  function hasLiked(id) {

    const cleanID =
      String(id);

    return getLikes()
      .map(String)
      .includes(cleanID);

  }


  function toggleLike(id) {

    const cleanID =
      String(id);

    const likes =
      getLikes();

    const index =
      likes
        .map(String)
        .indexOf(cleanID);


    if (index === -1) {

      likes.push(cleanID);

      write(
        KEYS.LIKES,
        likes
      );

      return true;
    }


    likes.splice(index, 1);

    write(
      KEYS.LIKES,
      likes
    );

    return false;

  }


  /* =======================================================
     FAVORITES
     ======================================================= */

  function getFavorites() {

    return read(
      KEYS.FAVORITES,
      []
    );

  }


  function isFavorite(id) {

    return getFavorites()
      .map(String)
      .includes(
        String(id)
      );

  }


  function toggleFavorite(id) {

    const cleanID =
      String(id);

    const favorites =
      getFavorites();

    const index =
      favorites
        .map(String)
        .indexOf(cleanID);


    if (index === -1) {

      favorites.push(cleanID);

      write(
        KEYS.FAVORITES,
        favorites
      );

      return true;
    }


    favorites.splice(index, 1);

    write(
      KEYS.FAVORITES,
      favorites
    );

    return false;

  }


  function clearFavorites() {

    return write(
      KEYS.FAVORITES,
      []
    );

  }


  /* =======================================================
     CERTIFICATES
     ======================================================= */

  function certificates() {

    return read(
      KEYS.CERTIFICATES,
      []
    );

  }


  function saveCertificate(certificate) {

    if (
      !certificate ||
      !certificate.id
    ) {

      throw new Error(
        "Certificate ID is required."
      );

    }


    const list =
      certificates();

    const index =
      list.findIndex(
        item =>
          String(item.id).toLowerCase() ===
          String(certificate.id).toLowerCase()
      );


    if (index === -1) {

      list.push(certificate);

    } else {

      list[index] =
        certificate;

    }


    write(
      KEYS.CERTIFICATES,
      list
    );

    return certificate;

  }


  function findCertificate(id) {

    if (!id) {
      return null;
    }


    const cleanID =
      String(id)
        .trim()
        .toLowerCase();


    return certificates()
      .find(
        item =>
          String(item.id)
            .trim()
            .toLowerCase() ===
          cleanID
      ) || null;

  }


  function deleteCertificate(id) {

    const cleanID =
      String(id)
        .trim()
        .toLowerCase();


    const updated =
      certificates()
        .filter(
          item =>
            String(item.id)
              .trim()
              .toLowerCase() !==
            cleanID
        );


    write(
      KEYS.CERTIFICATES,
      updated
    );

    return updated;

  }


  /* =======================================================
     JOIN REQUESTS
     ======================================================= */

  function joins() {

    return read(
      KEYS.JOIN_REQUESTS,
      []
    );

  }


  function saveJoin(data = {}) {

    const now =
      new Date().toISOString();


    const request = {

      ...data,

      id:
        data.id ||
        makeId("ARS-JOIN"),

      status:
        data.status ||
        "pending",

      createdAt:
        data.createdAt ||
        now,

      updatedAt:
        now

    };


    const list =
      joins();

    list.push(request);


    write(
      KEYS.JOIN_REQUESTS,
      list
    );


    return request;

  }


  function findJoin(id) {

    if (!id) {
      return null;
    }


    return joins()
      .find(
        item =>
          String(item.id)
            .trim()
            .toLowerCase() ===
          String(id)
            .trim()
            .toLowerCase()
      ) || null;

  }


  function updateJoin(id, updates = {}) {

    const list =
      joins();


    const index =
      list.findIndex(
        item =>
          String(item.id)
            .trim()
            .toLowerCase() ===
          String(id)
            .trim()
            .toLowerCase()
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
      KEYS.JOIN_REQUESTS,
      list
    );


    return list[index];

  }


  /* =======================================================
     CONTACT MESSAGES
     ======================================================= */

  function messages() {

    return read(
      KEYS.MESSAGES,
      []
    );

  }


  function saveMessage(data = {}) {

    const message = {

      ...data,

      id:
        makeId("ARS-MSG"),

      createdAt:
        new Date().toISOString(),

      status:
        data.status ||
        "unread"

    };


    const list =
      messages();

    list.push(message);


    write(
      KEYS.MESSAGES,
      list
    );


    return message;

  }


  /* =======================================================
     SETTINGS
     ======================================================= */

  function getSettings() {

    return read(
      KEYS.SETTINGS,
      {}
    );

  }


  function saveSettings(data = {}) {

    return write(
      KEYS.SETTINGS,
      data
    );

  }


  /* =======================================================
     DATABASE SUMMARY
     ======================================================= */

  function getSummary() {

    return {

      shayari:
        getShayari().length,

      stories:
        getStories().length,

      likes:
        getLikes().length,

      favorites:
        getFavorites().length,

      certificates:
        certificates().length,

      joins:
        joins().length,

      messages:
        messages().length

    };

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.ARS_STORAGE = {

    KEYS,

    read,
    write,
    remove,
    clearKey,

    newId:
      makeId,

    getShayari,
    saveShayari,

    getStories,
    saveStories,

    likes:
      getLikes,

    hasLiked,
    toggleLike,

    favorites:
      getFavorites,

    isFavorite,
    toggleFavorite,
    clearFavorites,

    certificates,
    saveCertificate,
    findCertificate,
    deleteCertificate,

    joins,
    saveJoin,
    findJoin,
    updateJoin,

    messages,
    saveMessage,

    getSettings,
    saveSettings,

    getSummary

  };


  console.log(
    "✅ ARS Storage System Loaded"
  );

})(window);
