/* =========================================================
   ARS OFFICIAL — STORAGE.JS
   Central LocalStorage Data Layer
   ========================================================= */

"use strict";

(function (window) {

  /* -------------------------------------------------------
     STORAGE KEYS
     ------------------------------------------------------- */

  const KEYS = Object.freeze({

    SHAYARI: "ARS_SHAYARI_DATA",

    STORIES: "ARS_STORY_DATA",

    LIKES: "ARS_LIKES",

    FAVORITES: "ARS_FAVORITES",

    CERTIFICATES: "ARS_CERTIFICATES",

    JOIN_REQUESTS: "ARS_JOIN_REQUESTS",

    MESSAGES: "ARS_CONTACT_MESSAGES"

  });


  /* -------------------------------------------------------
     SAFE READ
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     SAFE WRITE
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     UNIQUE ID GENERATOR
     ------------------------------------------------------- */

  function makeId(prefix) {

    const time =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `${prefix}-${time}${random}`;

  }


  /* =======================================================
     SHAYARI
     ======================================================= */

  function getShayari() {

    const data =
      read(
        KEYS.SHAYARI,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

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

    const data =
      read(
        KEYS.STORIES,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

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

    const data =
      read(
        KEYS.LIKES,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

  }


  function hasLiked(id) {

    return getLikes().includes(
      String(id)
    );

  }


  function toggleLike(id) {

    id = String(id);

    const likes =
      getLikes();

    const index =
      likes.indexOf(id);


    if (index === -1) {

      likes.push(id);

      write(
        KEYS.LIKES,
        likes
      );

      return true;

    }


    likes.splice(
      index,
      1
    );

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

    const data =
      read(
        KEYS.FAVORITES,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

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


    if (index === -1) {

      favorites.push(id);

      write(
        KEYS.FAVORITES,
        favorites
      );

      return true;

    }


    favorites.splice(
      index,
      1
    );

    write(
      KEYS.FAVORITES,
      favorites
    );

    return false;

  }


  function clearFavorites() {

    write(
      KEYS.FAVORITES,
      []
    );

  }


  /* =======================================================
     CERTIFICATES
     ======================================================= */

  function certificates() {

    const data =
      read(
        KEYS.CERTIFICATES,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

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
          String(item.id) ===
          String(certificate.id)
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


    return certificates().find(
      item =>
        String(item.id)
          .trim()
          .toLowerCase() ===
        String(id)
          .trim()
          .toLowerCase()
    ) || null;

  }


  /* =======================================================
     JOIN REQUESTS
     ======================================================= */

  function joins() {

    const data =
      read(
        KEYS.JOIN_REQUESTS,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

  }


  function saveJoin(data) {

    data =
      data || {};


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
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

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


    return joins().find(
      item =>
        String(item.id)
          .trim()
          .toLowerCase() ===
        String(id)
          .trim()
          .toLowerCase()
    ) || null;

  }


  function updateJoin(
    id,
    updates
  ) {

    const list =
      joins();


    const index =
      list.findIndex(
        item =>
          String(item.id)
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

      ...(updates || {}),

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

    const data =
      read(
        KEYS.MESSAGES,
        []
      );

    return Array.isArray(data)
      ? data
      : [];

  }


  function saveMessage(data) {

    const message = {

      ...(data || {}),

      id:
        makeId("ARS-MSG"),

      createdAt:
        new Date().toISOString()

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
     PUBLIC ARS STORAGE API
     ======================================================= */

  window.ARS_STORAGE = {

    KEYS,

    read,

    write,

    newId: makeId,


    /* Shayari */

    getShayari,

    saveShayari,


    /* Stories */

    getStories,

    saveStories,


    /* Likes */

    likes: getLikes,

    hasLiked,

    toggleLike,


    /* Favorites */

    favorites: getFavorites,

    isFavorite,

    toggleFavorite,

    clearFavorites,


    /* Certificates */

    certificates,

    saveCertificate,

    findCertificate,


    /* Joining */

    joins,

    saveJoin,

    findJoin,

    updateJoin,


    /* Contact */

    messages,

    saveMessage

  };


  console.log(
    "✅ ARS Storage System Loaded"
  );


})(window);
