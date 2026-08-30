/* =========================================================
   ARS OFFICIAL — STORAGE ENGINE
   Certificate + Joining Data
========================================================= */

(function () {

  "use strict";


  const CERT_KEY = "ARS_CERTIFICATES";
  const JOIN_KEY = "ARS_JOIN_REQUESTS";


  function read(key) {

    try {

      return JSON.parse(
        localStorage.getItem(key) || "[]"
      );

    } catch (error) {

      console.error("ARS Storage Read Error:", error);

      return [];
    }
  }


  function write(key, data) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(data)
      );

      return true;

    } catch (error) {

      console.error("ARS Storage Write Error:", error);

      return false;
    }
  }


  /* =======================================================
     CERTIFICATES
  ======================================================= */

  function getCertificates() {

    return read(CERT_KEY);
  }


  function saveCertificate(certificate) {

    const certificates =
      getCertificates();


    const existing =
      certificates.findIndex(
        item =>
          String(item.id).toLowerCase() ===
          String(certificate.id).toLowerCase()
      );


    if (existing >= 0) {

      certificates[existing] = certificate;

    } else {

      certificates.push(certificate);

    }


    write(CERT_KEY, certificates);

    return certificate;
  }


  function findCertificate(id) {

    const cleanID =
      String(id || "").trim().toLowerCase();


    if (!cleanID) return null;


    return getCertificates().find(
      certificate =>
        String(certificate.id)
          .trim()
          .toLowerCase() === cleanID
    ) || null;
  }


  function deleteCertificate(id) {

    const certificates =
      getCertificates().filter(
        certificate =>
          String(certificate.id).toLowerCase() !==
          String(id).toLowerCase()
      );


    write(CERT_KEY, certificates);
  }


  /* =======================================================
     JOINING REQUESTS
  ======================================================= */

  function getJoinRequests() {

    return read(JOIN_KEY);
  }


  function saveJoinRequest(request) {

    const requests =
      getJoinRequests();


    requests.push(request);


    write(JOIN_KEY, requests);

    return request;
  }


  function updateJoinStatus(id, status) {

    const requests =
      getJoinRequests();


    const index =
      requests.findIndex(
        item => String(item.id) === String(id)
      );


    if (index === -1) return false;


    requests[index].status = status;

    requests[index].updatedAt =
      new Date().toISOString();


    write(JOIN_KEY, requests);

    return true;
  }


  /* =======================================================
     CLEAR — ADMIN USE
  ======================================================= */

  function clearCertificates() {

    localStorage.removeItem(CERT_KEY);

  }


  function clearJoinRequests() {

    localStorage.removeItem(JOIN_KEY);

  }


  /* =======================================================
     PUBLIC API
  ======================================================= */

  window.ARSStorage = {

    getCertificates,
    saveCertificate,
    findCertificate,
    deleteCertificate,

    getJoinRequests,
    saveJoinRequest,
    updateJoinStatus,

    clearCertificates,
    clearJoinRequests

  };


  /* =======================================================
     BACKWARD COMPATIBILITY
  ======================================================= */

  window.ARS_CERTIFICATE = {

    find: findCertificate,

    save: saveCertificate,

    all: getCertificates

  };


})();
