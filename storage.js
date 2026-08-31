/* =========================================================
   ARS OFFICIAL — CENTRAL STORAGE SYSTEM
   ========================================================= */

(function () {
  "use strict";

  const PREFIX = "ARS_";

  function key(name) {
    return PREFIX + String(name);
  }

  function set(name, value) {
    try {
      localStorage.setItem(
        key(name),
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error("ARS Storage Set Error:", error);
      return false;
    }
  }

  function get(name, fallback = null) {
    try {
      const value =
        localStorage.getItem(key(name));

      if (value === null) {
        return fallback;
      }

      return JSON.parse(value);

    } catch (error) {
      console.error("ARS Storage Get Error:", error);
      return fallback;
    }
  }

  function remove(name) {
    try {
      localStorage.removeItem(key(name));
      return true;
    } catch (error) {
      console.error("ARS Storage Remove Error:", error);
      return false;
    }
  }

  function clearARS() {
    try {
      const keys = [];

      for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.key(i);

        if (item && item.startsWith(PREFIX)) {
          keys.push(item);
        }
      }

      keys.forEach(item => {
        localStorage.removeItem(item);
      });

      return true;

    } catch (error) {
      console.error("ARS Storage Clear Error:", error);
      return false;
    }
  }

  function exists(name) {
    return localStorage.getItem(key(name)) !== null;
  }

  function update(name, updater, fallback = null) {
    const current = get(name, fallback);

    const updated = updater(current);

    set(name, updated);

    return updated;
  }

  function push(name, value) {
    const list = get(name, []);

    if (!Array.isArray(list)) {
      return false;
    }

    list.push(value);

    return set(name, list);
  }

  function removeFromArray(name, predicate) {
    const list = get(name, []);

    if (!Array.isArray(list)) {
      return false;
    }

    const filtered = list.filter(
      item => !predicate(item)
    );

    return set(name, filtered);
  }

  function getAllARSData() {
    const result = {};

    for (let i = 0; i < localStorage.length; i++) {
      const item = localStorage.key(i);

      if (!item || !item.startsWith(PREFIX)) {
        continue;
      }

      const cleanName =
        item.substring(PREFIX.length);

      try {
        result[cleanName] =
          JSON.parse(
            localStorage.getItem(item)
          );
      } catch (_) {
        result[cleanName] =
          localStorage.getItem(item);
      }
    }

    return result;
  }

  window.ARS = window.ARS || {};

  window.ARS.storage = {
    set,
    get,
    remove,
    clear: clearARS,
    exists,
    update,
    push,
    removeFromArray,
    getAll: getAllARSData
  };

})();
