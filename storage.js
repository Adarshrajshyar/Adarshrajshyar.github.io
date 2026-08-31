"use strict";

/* =========================================================
   ARS STORAGE SYSTEM
   Adarsh Raj Shayar Official
   Central localStorage helper
   ========================================================= */

window.ARSStorage = (function () {

  const PREFIX = "ARS_";

  function read(key, fallback = []) {
    try {
      const raw = localStorage.getItem(PREFIX + key);

      if (!raw) return fallback;

      const data = JSON.parse(raw);

      return data ?? fallback;

    } catch (error) {
      console.error("ARS Storage Read Error:", error);
      return fallback;
    }
  }


  function write(key, value) {
    try {
      localStorage.setItem(
        PREFIX + key,
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
      localStorage.removeItem(PREFIX + key);
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

        const key =
          localStorage.key(i);

        if (
          key &&
          key.startsWith(PREFIX)
        ) {
          keys.push(key);
        }
      }

      keys.forEach(key =>
        localStorage.removeItem(key)
      );

      return true;

    } catch (error) {

      console.error(
        "ARS Storage Clear Error:",
        error
      );

      return false;
    }
  }


  function exists(key) {
    return localStorage.getItem(
      PREFIX + key
    ) !== null;
  }


  return {
    read,
    write,
    remove,
    clearARS,
    exists
  };

})();
