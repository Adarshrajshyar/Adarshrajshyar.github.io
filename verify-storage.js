/* =========================================================
   ARS VERIFY STORAGE
   Joining Certificate + Normal Certificate
   ========================================================= */

(function () {
  "use strict";

  const CERTIFICATE_KEY = "ARS_CERTIFICATES";
  const JOINING_KEY = "ARS_JOINING_CERTIFICATES";

  function read(key) {
    try {
      const data = JSON.parse(
        localStorage.getItem(key) || "[]"
      );

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function normalize(value) {
    return String(value || "")
      .trim()
      .toUpperCase();
  }

  function verify(type, value) {

    const id = normalize(value);

    if (!id) {
      return null;
    }

    const records =
      type === "joining"
        ? read(JOINING_KEY)
        : read(CERTIFICATE_KEY);

    return (
      records.find(record => {

        const possibleIds = [
          record.id,
          record.applicationNumber,
          record.applicationId,
          record.certificateId
        ];

        return possibleIds.some(
          item => normalize(item) === id
        );

      }) || null
    );
  }

  function getAll(type) {
    return type === "joining"
      ? read(JOINING_KEY)
      : read(CERTIFICATE_KEY);
  }

  function save(type, record) {

    const key =
      type === "joining"
        ? JOINING_KEY
        : CERTIFICATE_KEY;

    const records = read(key);

    const id =
      record.id ||
      record.applicationNumber ||
      record.certificateId;

    if (!id) {
      return false;
    }

    const index =
      records.findIndex(
        item =>
          normalize(
            item.id ||
            item.applicationNumber ||
            item.certificateId
          ) === normalize(id)
      );

    if (index >= 0) {
      records[index] = {
        ...records[index],
        ...record
      };
    } else {
      records.push(record);
    }

    localStorage.setItem(
      key,
      JSON.stringify(records)
    );

    return true;
  }

  window.ARSVerifyStorage = {
    verify,
    getAll,
    save,

    keys: {
      certificate: CERTIFICATE_KEY,
      joining: JOINING_KEY
    }
  };

})();
