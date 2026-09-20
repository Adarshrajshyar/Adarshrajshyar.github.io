/* =========================================================
   ARS OFFICIAL — STORAGE LAYER
   Frontend storage helper
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_PREFIX = "ARS_";

  const KEYS = {
    likes: "likes",
    favorites: "favorites",
    saved: "saved",
    user: "user",
    session: "session",
    joining: "joining",
    notifications: "notifications",
    settings: "settings",
    history: "history",
    cache: "cache"
  };

  function fullKey(key) {
    return `${STORAGE_PREFIX}${key}`;
  }

  function read(key, fallback = null) {
    try {
      const raw = localStorage.getItem(fullKey(key));

      if (raw === null) {
        return fallback;
      }

      return JSON.parse(raw);
    } catch (error) {
      console.error("ARS Storage Read Error:", error);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(
        fullKey(key),
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error("ARS Storage Write Error:", error);
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(fullKey(key));
      return true;
    } catch (error) {
      console.error("ARS Storage Remove Error:", error);
      return false;
    }
  }

  function clearAll() {
    try {
      Object.values(KEYS).forEach(key => {
        localStorage.removeItem(fullKey(key));
      });

      return true;
    } catch (error) {
      console.error("ARS Storage Clear Error:", error);
      return false;
    }
  }

  function ensureArray(key) {
    const value = read(key, []);

    if (!Array.isArray(value)) {
      write(key, []);
      return [];
    }

    return value;
  }

  function addToArray(key, value) {
    const list = ensureArray(key);

    if (!list.includes(value)) {
      list.push(value);
      write(key, list);
    }

    return list;
  }

  function removeFromArray(key, value) {
    const list = ensureArray(key);
    const updated = list.filter(item => item !== value);

    write(key, updated);

    return updated;
  }

  function hasInArray(key, value) {
    return ensureArray(key).includes(value);
  }

  function toggleArrayItem(key, value) {
    if (hasInArray(key, value)) {
      return {
        active: false,
        items: removeFromArray(key, value)
      };
    }

    return {
      active: true,
      items: addToArray(key, value)
    };
  }


  /* =======================================================
     LIKE SYSTEM
     ======================================================= */

  function hasLiked(id) {
    return hasInArray(KEYS.likes, id);
  }

  function toggleLike(id) {
    return toggleArrayItem(KEYS.likes, id);
  }


  /* =======================================================
     FAVORITE SYSTEM
     ======================================================= */

  function isFavorite(id) {
    return hasInArray(KEYS.favorites, id);
  }

  function toggleFavorite(id) {
    return toggleArrayItem(KEYS.favorites, id);
  }


  /* =======================================================
     SAVE SYSTEM
     ======================================================= */

  function isSaved(id) {
    return hasInArray(KEYS.saved, id);
  }

  function toggleSaved(id) {
    return toggleArrayItem(KEYS.saved, id);
  }


  /* =======================================================
     USER
     ======================================================= */

  function getUser() {
    return read(KEYS.user, null);
  }

  function setUser(user) {
    return write(KEYS.user, user);
  }

  function removeUser() {
    return remove(KEYS.user);
  }

  function isLoggedIn() {
    return Boolean(getUser());
  }


  /* =======================================================
     SESSION
     ======================================================= */

  function getSession() {
    return read(KEYS.session, null);
  }

  function setSession(session) {
    return write(KEYS.session, session);
  }

  function clearSession() {
    return remove(KEYS.session);
  }


  /* =======================================================
     JOINING
     ======================================================= */

  function getJoiningApplication() {
    return read(KEYS.joining, null);
  }

  function saveJoiningApplication(application) {
    return write(KEYS.joining, application);
  }

  function clearJoiningApplication() {
    return remove(KEYS.joining);
  }


  /* =======================================================
     NOTIFICATIONS
     ======================================================= */

  function getNotifications() {
    return read(KEYS.notifications, []);
  }

  function saveNotifications(notifications) {
    return write(KEYS.notifications, notifications);
  }

  function addNotification(notification) {
    const list = getNotifications();

    list.unshift({
      id:
        notification.id ||
        (typeof makeARSId === "function"
          ? makeARSId("NOTIFY")
          : `NOTIFY-${Date.now()}`),

      title: notification.title || "ARS Notification",
      message: notification.message || "",
      type: notification.type || "info",
      read: false,
      createdAt:
        notification.createdAt ||
        new Date().toISOString()
    });

    return saveNotifications(list);
  }


  /* =======================================================
     HISTORY
     ======================================================= */

  function getHistory() {
    return read(KEYS.history, []);
  }

  function addHistory(item) {
    const history = getHistory();

    history.unshift({
      ...item,
      timestamp:
        item.timestamp ||
        new Date().toISOString()
    });

    return write(KEYS.history, history.slice(0, 100));
  }

  function clearHistory() {
    return remove(KEYS.history);
  }


  /* =======================================================
     SETTINGS
     ======================================================= */

  function getSettings() {
    return read(KEYS.settings, {});
  }

  function saveSettings(settings) {
    return write(KEYS.settings, settings);
  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  const ARS_STORAGE = {
    KEYS,

    read,
    write,
    remove,
    clearAll,

    hasLiked,
    toggleLike,

    isFavorite,
    toggleFavorite,

    isSaved,
    toggleSaved,

    getUser,
    setUser,
    removeUser,
    isLoggedIn,

    getSession,
    setSession,
    clearSession,

    getJoiningApplication,
    saveJoiningApplication,
    clearJoiningApplication,

    getNotifications,
    saveNotifications,
    addNotification,

    getHistory,
    addHistory,
    clearHistory,

    getSettings,
    saveSettings
  };


  if (typeof window !== "undefined") {
    window.ARS_STORAGE = ARS_STORAGE;
    window.ARSStorage = ARS_STORAGE;
  }

})();
