/* =========================================================
   ARS CENTRAL STORAGE ENGINE
   ---------------------------------------------------------
   Likes
   Favorites
   Saves
   Shayari
   Stories
   Published Content
   Certificates
   Joining Records
   ========================================================= */

(function () {

  "use strict";


  const KEYS = {

    likes:
      "ARS_LIKES",

    favorites:
      "ARS_FAVORITES",

    saves:
      "ARS_SAVES",

    shayari:
      "ARS_SHAYARI",

    stories:
      "ARS_STORIES",

    published:
      "ARS_PUBLISHED_CONTENT",

    certificates:
      "ARS_CERTIFICATES",

    joining:
      "ARS_JOINING_CERTIFICATES"

  };


  function read(key) {

    try {

      const value =
        localStorage.getItem(key);

      if (!value) return [];

      const parsed =
        JSON.parse(value);

      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch {

      return [];

    }

  }


  function write(
    key,
    value
  ) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    } catch {

      return false;

    }

  }


  function normalizeId(id) {

    return String(id || "")
      .trim();

  }


  function contains(
    key,
    id
  ) {

    const target =
      normalizeId(id);

    return read(key)
      .map(normalizeId)
      .includes(target);

  }


  function add(
    key,
    id
  ) {

    const target =
      normalizeId(id);

    if (!target) return false;

    const data =
      read(key);

    if (!data.includes(target)) {

      data.push(target);

      write(key,data);

    }

    return true;

  }


  function remove(
    key,
    id
  ) {

    const target =
      normalizeId(id);

    const data =
      read(key);

    const filtered =
      data.filter(
        item =>
          normalizeId(item) !== target
      );

    return write(
      key,
      filtered
    );

  }


  function toggle(
    key,
    id
  ) {

    if (contains(key,id)) {

      remove(key,id);

      return false;

    }

    add(key,id);

    return true;

  }


  /* =========================
     LIKE
     ========================= */

  function toggleLike(id) {

    return toggle(
      KEYS.likes,
      id
    );

  }


  function isLiked(id) {

    return contains(
      KEYS.likes,
      id
    );

  }


  /* =========================
     FAVORITE
     ========================= */

  function toggleFavorite(id) {

    return toggle(
      KEYS.favorites,
      id
    );

  }


  function isFavorite(id) {

    return contains(
      KEYS.favorites,
      id
    );

  }


  /* =========================
     SAVE
     ========================= */

  function toggleSave(id) {

    return toggle(
      KEYS.saves,
      id
    );

  }


  function isSaved(id) {

    return contains(
      KEYS.saves,
      id
    );

  }


  /* =========================
     PUBLISHED CONTENT
     ========================= */

  function getPublished() {

    return read(
      KEYS.published
    );

  }


  function savePublished(
    record
  ) {

    if (!record) return false;

    const data =
      getPublished();

    const id =
      record.id ||
      (
        "ARS-CONTENT-" +
        Date.now()
      );

    const item = {
      ...record,
      id
    };

    const index =
      data.findIndex(
        x =>
          String(x.id) ===
          String(id)
      );

    if (index >= 0) {

      data[index] =
        item;

    } else {

      data.unshift(item);

    }

    return write(
      KEYS.published,
      data
    );

  }


  function deletePublished(
    id
  ) {

    return removeObject(
      KEYS.published,
      id
    );

  }


  /* =========================
     CERTIFICATES
     ========================= */

  function getCertificates() {

    return read(
      KEYS.certificates
    );

  }


  function saveCertificate(
    record
  ) {

    return saveObject(
      KEYS.certificates,
      record,
      "certificateId"
    );

  }


  function getCertificate(
    id
  ) {

    return findObject(
      KEYS.certificates,
      id,
      [
        "id",
        "certificateId"
      ]
    );

  }


  /* =========================
     JOINING
     ========================= */

  function getJoiningRecords() {

    return read(
      KEYS.joining
    );

  }


  function saveJoining(
    record
  ) {

    return saveObject(
      KEYS.joining,
      record,
      "applicationNumber"
    );

  }


  function getJoining(
    id
  ) {

    return findObject(
      KEYS.joining,
      id,
      [
        "id",
        "applicationNumber",
        "applicationId"
      ]
    );

  }


  /* =========================
     OBJECT STORAGE
     ========================= */

  function saveObject(
    key,
    record,
    fallbackField
  ) {

    if (!record) return false;

    const data =
      read(key);

    const id =
      record.id ||
      record[fallbackField] ||
      (
        "ARS-" +
        Date.now()
      );

    const item = {
      ...record,
      id
    };

    const index =
      data.findIndex(
        x => {

          const xId =
            x.id ||
            x[fallbackField];

          return String(xId) ===
            String(id);

        }
      );


    if (index >= 0) {

      data[index] =
        {
          ...data[index],
          ...item
        };

    } else {

      data.push(item);

    }


    return write(
      key,
      data
    );

  }


  function removeObject(
    key,
    id
  ) {

    const target =
      normalizeId(id);

    const data =
      read(key);

    const filtered =
      data.filter(
        item =>
          normalizeId(
            item.id ||
            item.certificateId ||
            item.applicationNumber
          ) !== target
      );

    return write(
      key,
      filtered
    );

  }


  function findObject(
    key,
    id,
    fields
  ) {

    const target =
      normalizeId(id);

    if (!target) return null;

    const data =
      read(key);

    return (
      data.find(
        item => {

          return fields.some(
            field =>
              normalizeId(
                item[field]
              ).toUpperCase() ===
              target.toUpperCase()
          );

        }
      ) || null
    );

  }


  /* =========================
     CLEAR USER INTERACTION
     ========================= */

  function clearInteractions() {

    [
      KEYS.likes,
      KEYS.favorites,
      KEYS.saves
    ].forEach(
      key =>
        localStorage.removeItem(key)
    );

  }


  /* =========================
     EXPORT PUBLIC API
     ========================= */

  window.ARSStorage = {

    keys: KEYS,

    read,
    write,

    contains,
    add,
    remove,
    toggle,

    toggleLike,
    isLiked,

    toggleFavorite,
    isFavorite,

    toggleSave,
    isSaved,

    getPublished,
    savePublished,
    deletePublished,

    getCertificates,
    saveCertificate,
    getCertificate,

    getJoiningRecords,
    saveJoining,
    getJoining,

    clearInteractions

  };


})();
