/* =========================================================
   ARS OFFICIAL WEBSITE — STORAGE SYSTEM
   Version: 3.0.0
   Safe LocalStorage Manager
   ========================================================= */

(function (window) {
  "use strict";

  /* ---------------------------------------------------------
     CONFIG SAFETY
     --------------------------------------------------------- */

  var CONFIG = window.ARS_CONFIG || {};

  var STORAGE = CONFIG.storage || {
    prefix: "ARS_",
    likes: "ARS_LIKES",
    favorites: "ARS_FAVORITES",
    shayari: "ARS_SHAYARI",
    stories: "ARS_STORIES",
    certificates: "ARS_CERTIFICATES",
    joiningRequests: "ARS_JOINING_REQUESTS",
    publishedPosts: "ARS_PUBLISHED_POSTS",
    publisherSession: "ARS_PUBLISHER_SESSION",
    theme: "ARS_THEME"
  };

  /* ---------------------------------------------------------
     STORAGE AVAILABILITY
     --------------------------------------------------------- */

  function storageAvailable() {
    try {
      var testKey = "__ARS_STORAGE_TEST__";

      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);

      return true;
    } catch (error) {
      console.warn("⚠️ ARS Storage unavailable:", error);
      return false;
    }
  }

  var AVAILABLE = storageAvailable();

  /* ---------------------------------------------------------
     KEY HELPER
     --------------------------------------------------------- */

  function getKey(key) {
    if (!key) return null;

    if (STORAGE[key]) {
      return STORAGE[key];
    }

    return String(key);
  }

  /* ---------------------------------------------------------
     READ
     --------------------------------------------------------- */

  function get(key, defaultValue) {
    if (!AVAILABLE) {
      return defaultValue;
    }

    var storageKey = getKey(key);

    try {
      var value = window.localStorage.getItem(storageKey);

      if (value === null) {
        return defaultValue;
      }

      return JSON.parse(value);
    } catch (error) {
      console.warn("⚠️ ARS Storage Read Error:", storageKey);

      return defaultValue;
    }
  }

  /* ---------------------------------------------------------
     SAVE
     --------------------------------------------------------- */

  function set(key, value) {
    if (!AVAILABLE) {
      return false;
    }

    var storageKey = getKey(key);

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error("❌ ARS Storage Save Error:", error);

      return false;
    }
  }

  /* ---------------------------------------------------------
     REMOVE
     --------------------------------------------------------- */

  function remove(key) {
    if (!AVAILABLE) {
      return false;
    }

    var storageKey = getKey(key);

    try {
      window.localStorage.removeItem(storageKey);

      return true;
    } catch (error) {
      console.error("❌ ARS Storage Remove Error:", error);

      return false;
    }
  }

  /* ---------------------------------------------------------
     CLEAR ARS DATA ONLY
     --------------------------------------------------------- */

  function clearARSData() {
    if (!AVAILABLE) return false;

    try {
      var keysToRemove = [
        STORAGE.likes,
        STORAGE.favorites,
        STORAGE.shayari,
        STORAGE.stories,
        STORAGE.certificates,
        STORAGE.joiningRequests,
        STORAGE.publishedPosts,
        STORAGE.publisherSession,
        STORAGE.theme
      ];

      keysToRemove.forEach(function (key) {
        if (key) {
          window.localStorage.removeItem(key);
        }
      });

      return true;

    } catch (error) {
      console.error("❌ ARS Clear Error:", error);

      return false;
    }
  }

  /* =========================================================
     LIKE SYSTEM
     ========================================================= */

  function getLikes() {
    return get("likes", []);
  }

  function hasLiked(itemID) {
    if (!itemID) return false;

    var likes = getLikes();

    return likes.indexOf(String(itemID)) !== -1;
  }

  function toggleLike(itemID) {
    if (!itemID) return false;

    itemID = String(itemID);

    var likes = getLikes();

    var index = likes.indexOf(itemID);

    if (index === -1) {
      likes.push(itemID);
    } else {
      likes.splice(index, 1);
    }

    set("likes", likes);

    return index === -1;
  }

  /* =========================================================
     FAVORITE SYSTEM
     ========================================================= */

  function getFavorites() {
    return get("favorites", []);
  }

  function isFavorite(itemID) {
    if (!itemID) return false;

    var favorites = getFavorites();

    return favorites.indexOf(String(itemID)) !== -1;
  }

  function toggleFavorite(itemID) {
    if (!itemID) return false;

    itemID = String(itemID);

    var favorites = getFavorites();

    var index = favorites.indexOf(itemID);

    if (index === -1) {
      favorites.push(itemID);
    } else {
      favorites.splice(index, 1);
    }

    set("favorites", favorites);

    return index === -1;
  }

  /* =========================================================
     SHAYARI
     ========================================================= */

  function getShayari() {
    return get("shayari", []);
  }

  function saveShayari(data) {
    if (!Array.isArray(data)) {
      return false;
    }

    return set("shayari", data);
  }

  function addShayari(item) {
    if (!item || typeof item !== "object") {
      return null;
    }

    var shayari = getShayari();

    if (!item.id) {
      item.id =
        "shayari-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .substring(2, 8);
    }

    item.type = "shayari";

    item.createdAt =
      item.createdAt || new Date().toISOString();

    shayari.push(item);

    set("shayari", shayari);

    return item;
  }

  /* =========================================================
     STORIES
     ========================================================= */

  function getStories() {
    return get("stories", []);
  }

  function saveStories(data) {
    if (!Array.isArray(data)) {
      return false;
    }

    return set("stories", data);
  }

  function addStory(item) {
    if (!item || typeof item !== "object") {
      return null;
    }

    var stories = getStories();

    if (!item.id) {
      item.id =
        "story-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .substring(2, 8);
    }

    item.type =
      item.type === "poem"
        ? "poem"
        : "story";

    item.createdAt =
      item.createdAt || new Date().toISOString();

    stories.push(item);

    set("stories", stories);

    return item;
  }

  /* =========================================================
     PUBLISHED POSTS
     ========================================================= */

  function getPublishedPosts() {
    return get("publishedPosts", []);
  }

  function savePublishedPosts(posts) {
    if (!Array.isArray(posts)) {
      return false;
    }

    return set("publishedPosts", posts);
  }

  function addPublishedPost(post) {
    if (!post || typeof post !== "object") {
      return null;
    }

    var posts = getPublishedPosts();

    if (!post.id) {
      post.id =
        "post-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .substring(2, 8);
    }

    post.createdAt =
      post.createdAt || new Date().toISOString();

    post.status =
      post.status || "published";

    posts.unshift(post);

    set("publishedPosts", posts);

    return post;
  }

  function deletePublishedPost(postID) {
    if (!postID) return false;

    var posts = getPublishedPosts();

    var updated = posts.filter(function (post) {
      return String(post.id) !== String(postID);
    });

    set("publishedPosts", updated);

    return updated.length !== posts.length;
  }

  /* =========================================================
     NORMAL CERTIFICATES
     ========================================================= */

  function getCertificates() {
    return get("certificates", []);
  }

  function saveCertificates(certificates) {
    if (!Array.isArray(certificates)) {
      return false;
    }

    return set("certificates", certificates);
  }

  function addCertificate(certificate) {
    if (!certificate || typeof certificate !== "object") {
      return null;
    }

    var certificates = getCertificates();

    if (!certificate.id) {
      certificate.id =
        "ARS-CERT-" +
        Date.now()
          .toString(36)
          .toUpperCase();
    }

    certificate.type =
      certificate.type || "normal";

    certificate.createdAt =
      certificate.createdAt ||
      new Date().toISOString();

    certificates.push(certificate);

    set("certificates", certificates);

    return certificate;
  }

  function findCertificate(id) {
    if (!id) return null;

    var certificates = getCertificates();

    return certificates.find(function (certificate) {
      return String(certificate.id) === String(id);
    }) || null;
  }

  /* =========================================================
     JOINING REQUESTS
     ========================================================= */

  function getJoiningRequests() {
    return get("joiningRequests", []);
  }

  function saveJoiningRequests(requests) {
    if (!Array.isArray(requests)) {
      return false;
    }

    return set("joiningRequests", requests);
  }

  function addJoiningRequest(request) {
    if (!request || typeof request !== "object") {
      return null;
    }

    var requests = getJoiningRequests();

    if (!request.id) {
      request.id =
        "ARS-JOIN-" +
        Date.now()
          .toString(36)
          .toUpperCase();
    }

    /*
     * Joining certificate always starts pending.
     */
    request.status = "pending";

    request.approved = false;

    request.createdAt =
      request.createdAt ||
      new Date().toISOString();

    requests.push(request);

    set("joiningRequests", requests);

    return request;
  }

  function findJoiningRequest(id) {
    if (!id) return null;

    var requests = getJoiningRequests();

    return requests.find(function (request) {
      return String(request.id) === String(id);
    }) || null;
  }

  function approveJoiningRequest(id) {
    if (!id) return null;

    var requests = getJoiningRequests();

    var found = null;

    requests.forEach(function (request) {

      if (String(request.id) === String(id)) {

        request.status = "approved";

        request.approved = true;

        request.approvedAt =
          new Date().toISOString();

        found = request;
      }

    });

    set("joiningRequests", requests);

    return found;
  }

  function rejectJoiningRequest(id) {
    if (!id) return null;

    var requests = getJoiningRequests();

    var found = null;

    requests.forEach(function (request) {

      if (String(request.id) === String(id)) {

        request.status = "rejected";

        request.approved = false;

        request.rejectedAt =
          new Date().toISOString();

        found = request;
      }

    });

    set("joiningRequests", requests);

    return found;
  }

  /* =========================================================
     PUBLISHER SESSION
     ========================================================= */

  function createPublisherSession(username) {

    var session = {
      username:
        username || "Publisher",

      loggedIn: true,

      createdAt:
        Date.now(),

      expiresAt:
        Date.now() +
        (
          CONFIG.publisher &&
          CONFIG.publisher.sessionDuration
            ? CONFIG.publisher.sessionDuration
            : 86400000
        )
    };

    set("publisherSession", session);

    return session;
  }

  function getPublisherSession() {
    var session = get(
      "publisherSession",
      null
    );

    if (!session) {
      return null;
    }

    if (
      session.expiresAt &&
      Date.now() > session.expiresAt
    ) {
      remove("publisherSession");

      return null;
    }

    return session;
  }

  function isPublisherLoggedIn() {
    var session =
      getPublisherSession();

    return Boolean(
      session &&
      session.loggedIn === true
    );
  }

  function logoutPublisher() {
    return remove("publisherSession");
  }

  /* =========================================================
     THEME
     ========================================================= */

  function getTheme() {
    return get("theme", "light");
  }

  function setTheme(theme) {
    if (
      theme !== "light" &&
      theme !== "dark"
    ) {
      return false;
    }

    return set("theme", theme);
  }

  /* =========================================================
     GENERIC ID
     ========================================================= */

  function generateID(prefix) {

    return String(prefix || "ARS") +
      "-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
  }

  /* =========================================================
     EXPORT ARS STORAGE
     ========================================================= */

  var ARS_STORAGE = {

    available: AVAILABLE,

    get: get,

    set: set,

    remove: remove,

    clearARSData: clearARSData,

    getLikes: getLikes,

    hasLiked: hasLiked,

    toggleLike: toggleLike,

    getFavorites: getFavorites,

    isFavorite: isFavorite,

    toggleFavorite: toggleFavorite,

    getShayari: getShayari,

    saveShayari: saveShayari,

    addShayari: addShayari,

    getStories: getStories,

    saveStories: saveStories,

    addStory: addStory,

    getPublishedPosts: getPublishedPosts,

    savePublishedPosts: savePublishedPosts,

    addPublishedPost: addPublishedPost,

    deletePublishedPost: deletePublishedPost,

    getCertificates: getCertificates,

    saveCertificates: saveCertificates,

    addCertificate: addCertificate,

    findCertificate: findCertificate,

    getJoiningRequests: getJoiningRequests,

    saveJoiningRequests: saveJoiningRequests,

    addJoiningRequest: addJoiningRequest,

    findJoiningRequest: findJoiningRequest,

    approveJoiningRequest: approveJoiningRequest,

    rejectJoiningRequest: rejectJoiningRequest,

    createPublisherSession: createPublisherSession,

    getPublisherSession: getPublisherSession,

    isPublisherLoggedIn: isPublisherLoggedIn,

    logoutPublisher: logoutPublisher,

    getTheme: getTheme,

    setTheme: setTheme,

    generateID: generateID
  };

  /*
   * ONE global variable only.
   */
  window.ARS_STORAGE = ARS_STORAGE;

  console.log(
    "💾 ARS Storage System Loaded"
  );

})(window);
