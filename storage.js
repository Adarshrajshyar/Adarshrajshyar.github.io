/* =========================================================
   ARS OFFICIAL
   Secure Client Storage Helper
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_PREFIX = "ars_";

  const KEYS = {
    preferences: `${STORAGE_PREFIX}preferences`,
    favorites: `${STORAGE_PREFIX}favorites`,
    likes: `${STORAGE_PREFIX}likes`,
    saved: `${STORAGE_PREFIX}saved`,
    searchHistory: `${STORAGE_PREFIX}search_history`,
    recentPages: `${STORAGE_PREFIX}recent_pages`
  };

  function safeParse(value, fallback = null) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn("ARS Storage parse error:", error);
      return fallback;
    }
  }

  function get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : safeParse(value, fallback);
    } catch (error) {
      console.warn("ARS Storage read error:", error);
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("ARS Storage write error:", error);
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn("ARS Storage remove error:", error);
      return false;
    }
  }

  function getArray(key) {
    const data = get(key, []);
    return Array.isArray(data) ? data : [];
  }

  function addToArray(key, value) {
    const items = getArray(key);

    if (!items.includes(value)) {
      items.push(value);
      set(key, items);
    }

    return items;
  }

  function removeFromArray(key, value) {
    const items = getArray(key);
    const updated = items.filter(item => item !== value);

    set(key, updated);

    return updated;
  }

  function toggleArrayItem(key, value) {
    const items = getArray(key);

    if (items.includes(value)) {
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

  function hasItem(key, value) {
    return getArray(key).includes(value);
  }

  /* -------------------------
     Favorites
     ------------------------- */

  function isFavorite(id) {
    return hasItem(KEYS.favorites, String(id));
  }

  function toggleFavorite(id) {
    return toggleArrayItem(KEYS.favorites, String(id));
  }

  function getFavorites() {
    return getArray(KEYS.favorites);
  }

  /* -------------------------
     Likes
     ------------------------- */

  function hasLiked(id) {
    return hasItem(KEYS.likes, String(id));
  }

  function toggleLike(id) {
    return toggleArrayItem(KEYS.likes, String(id));
  }

  function getLikes() {
    return getArray(KEYS.likes);
  }

  /* -------------------------
     Saved Items
     ------------------------- */

  function isSaved(id) {
    return hasItem(KEYS.saved, String(id));
  }

  function toggleSaved(id) {
    return toggleArrayItem(KEYS.saved, String(id));
  }

  function getSaved() {
    return getArray(KEYS.saved);
  }

  /* -------------------------
     Preferences
     ------------------------- */

  function getPreferences() {
    return get(KEYS.preferences, {});
  }

  function savePreference(name, value) {
    const preferences = getPreferences();

    preferences[name] = value;

    set(KEYS.preferences, preferences);

    return preferences;
  }

  function getPreference(name, fallback = null) {
    const preferences = getPreferences();

    return Object.prototype.hasOwnProperty.call(preferences, name)
      ? preferences[name]
      : fallback;
  }

  /* -------------------------
     Search History
     ------------------------- */

  function addSearch(query) {
    const cleanQuery = String(query || "").trim();

    if (!cleanQuery) {
      return [];
    }

    let history = getArray(KEYS.searchHistory);

    history = history.filter(
      item => item.toLowerCase() !== cleanQuery.toLowerCase()
    );

    history.unshift(cleanQuery);

    history = history.slice(0, 10);

    set(KEYS.searchHistory, history);

    return history;
  }

  function getSearchHistory() {
    return getArray(KEYS.searchHistory);
  }

  function clearSearchHistory() {
    return remove(KEYS.searchHistory);
  }

  /* -------------------------
     Recent Pages
     ------------------------- */

  function addRecentPage(page) {
    const cleanPage = String(page || "").trim();

    if (!cleanPage) {
      return [];
    }

    let pages = getArray(KEYS.recentPages);

    pages = pages.filter(item => item !== cleanPage);
    pages.unshift(cleanPage);

    pages = pages.slice(0, 10);

    set(KEYS.recentPages, pages);

    return pages;
  }

  function getRecentPages() {
    return getArray(KEYS.recentPages);
  }

  /* -------------------------
     Clear Non-Auth Data
     ------------------------- */

  function clearUserContent() {
    [
      KEYS.favorites,
      KEYS.likes,
      KEYS.saved,
      KEYS.searchHistory,
      KEYS.recentPages,
      KEYS.preferences
    ].forEach(remove);
  }

  /* -------------------------
     Public API
     ------------------------- */

  window.ARS_STORAGE = {
    keys: KEYS,

    get,
    set,
    remove,

    isFavorite,
    toggleFavorite,
    getFavorites,

    hasLiked,
    toggleLike,
    getLikes,

    isSaved,
    toggleSaved,
    getSaved,

    getPreferences,
    savePreference,
    getPreference,

    addSearch,
    getSearchHistory,
    clearSearchHistory,

    addRecentPage,
    getRecentPages,

    clearUserContent
  };

})();
