/* =========================================================
   ARS OFFICIAL
   VERIFY STORAGE ENGINE
   Version: 5.0.0
   ========================================================= */

(function () {
  "use strict";

  const CERT_KEY = "ARS_CERTIFICATE_APPLICATIONS";
  const JOIN_KEY = "ARS_JOINING_APPLICATIONS";

  /* ---------------------------------------------------------
     Safe JSON helpers
     --------------------------------------------------------- */

  function read(key, fallback = []) {
    try {
      const value = localStorage.getItem(key);

      if (!value) return fallback;

      const parsed = JSON.parse(value);

      return parsed ?? fallback;
    } catch (error) {
      console.error("ARS Storage Read Error:", error);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("ARS Storage Write Error:", error);
      return false;
    }
  }


  /* ---------------------------------------------------------
     Normalize ID
     --------------------------------------------------------- */

  function normalizeId(id) {
    return String(id || "")
      .trim()
      .toUpperCase();
  }


  /* ---------------------------------------------------------
     Get Certificate Applications
     --------------------------------------------------------- */

  function getCertificates() {
    const data = read(CERT_KEY, []);

    return Array.isArray(data) ? data : [];
  }


  /* ---------------------------------------------------------
     Get Joining Applications
     --------------------------------------------------------- */

  function getJoiningApplications() {
    const data = read(JOIN_KEY, []);

    return Array.isArray(data) ? data : [];
  }


  /* ---------------------------------------------------------
     Find Normal Certificate
     --------------------------------------------------------- */

  function findNormalCertificate(id) {

    const searchId = normalizeId(id);

    if (!searchId) return null;

    const certificates = getCertificates();

    return certificates.find(item => {

      const certificateId = normalizeId(
        item.certificateId ||
        item.certificateID ||
        item.id ||
        item.verifyId
      );

      return certificateId === searchId;

    }) || null;
  }


  /* ---------------------------------------------------------
     Find Joining Application
     --------------------------------------------------------- */

  function findJoiningApplication(id) {

    const searchId = normalizeId(id);

    if (!searchId) return null;

    const applications = getJoiningApplications();

    return applications.find(item => {

      const joiningId = normalizeId(
        item.joiningId ||
        item.joiningID ||
        item.applicationId ||
        item.id ||
        item.verifyId
      );

      return joiningId === searchId;

    }) || null;
  }


  /* ---------------------------------------------------------
     Certificate Status
     --------------------------------------------------------- */

  function isCertificateApproved(certificate) {

    if (!certificate) return false;

    const status = String(
      certificate.status || ""
    ).toLowerCase();

    /*
      Normal certificates should be immediately valid.
      Older records with approved/issued status are also valid.
    */

    if (
      status === "approved" ||
      status === "issued" ||
      status === "valid" ||
      status === "active"
    ) {
      return true;
    }

    /*
      If certificate is a normal certificate and has no
      explicit pending/rejected status, treat it as issued.
    */

    const type = String(
      certificate.type ||
      certificate.certificateType ||
      "normal"
    ).toLowerCase();

    if (
      type !== "joining" &&
      type !== "joining certificate"
    ) {
      if (
        status !== "pending" &&
        status !== "rejected" &&
        status !== "declined"
      ) {
        return true;
      }
    }

    return false;
  }


  /* ---------------------------------------------------------
     Joining Status
     --------------------------------------------------------- */

  function isJoiningApproved(application) {

    if (!application) return false;

    const status = String(
      application.status || ""
    ).toLowerCase();

    return (
      status === "approved" ||
      status === "issued" ||
      status === "valid" ||
      status === "active"
    );
  }


  /* ---------------------------------------------------------
     Verify Normal Certificate
     --------------------------------------------------------- */

  function verifyNormalCertificate(id) {

    const certificate = findNormalCertificate(id);

    if (!certificate) {

      return {
        success: false,
        found: false,
        type: "normal",
        message: "Certificate not found."
      };

    }

    if (!isCertificateApproved(certificate)) {

      return {
        success: false,
        found: true,
        type: "normal",
        status: certificate.status || "pending",
        data: certificate,
        message: "Certificate is not currently valid."
      };

    }

    return {
      success: true,
      found: true,
      verified: true,
      type: "normal",
      status: certificate.status || "issued",
      data: certificate,
      message: "Certificate verified successfully."
    };
  }


  /* ---------------------------------------------------------
     Verify Joining Certificate
     --------------------------------------------------------- */

  function verifyJoiningCertificate(id) {

    const application = findJoiningApplication(id);

    if (!application) {

      return {
        success: false,
        found: false,
        type: "joining",
        message: "Joining certificate not found."
      };

    }

    /*
      Joining certificates require admin approval.
    */

    if (!isJoiningApproved(application)) {

      return {
        success: false,
        found: true,
        verified: false,
        type: "joining",
        status: application.status || "pending",
        data: application,
        message:
          "Joining certificate is awaiting approval."
      };

    }

    return {
      success: true,
      found: true,
      verified: true,
      type: "joining",
      status: application.status || "approved",
      data: application,
      message:
        "Joining certificate verified successfully."
    };
  }


  /* ---------------------------------------------------------
     AUTO VERIFY
     --------------------------------------------------------- */

  function verifyAny(id) {

    const searchId = normalizeId(id);

    if (!searchId) {

      return {
        success: false,
        found: false,
        message: "Please enter a certificate ID."
      };

    }


    /* First: Normal Certificate */

    const normal = verifyNormalCertificate(searchId);

    if (normal.found) {
      return normal;
    }


    /* Second: Joining Certificate */

    const joining = verifyJoiningCertificate(searchId);

    if (joining.found) {
      return joining;
    }


    /* Nothing found */

    return {
      success: false,
      found: false,
      verified: false,
      type: "unknown",
      message:
        "No certificate or joining record was found for this ID."
    };
  }


  /* ---------------------------------------------------------
     Format Date
     --------------------------------------------------------- */

  function formatDate(value) {

    if (!value) return "—";

    try {

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return String(value);
      }

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

    } catch (error) {
      return String(value);
    }
  }


  /* ---------------------------------------------------------
     Public API
     --------------------------------------------------------- */

  window.ARS_VERIFY_STORAGE = {

    read,

    write,

    normalizeId,

    getCertificates,

    getJoiningApplications,

    findNormalCertificate,

    findJoiningApplication,

    verifyNormalCertificate,

    verifyJoiningCertificate,

    verifyAny,

    formatDate

  };


  /* ---------------------------------------------------------
     Compatibility API
     --------------------------------------------------------- */

  window.ARS_VERIFY = {

    verify: verifyAny,

    verifyAny: verifyAny,

    normal: verifyNormalCertificate,

    joining: verifyJoiningCertificate,

    findCertificate: findNormalCertificate,

    findJoining: findJoiningApplication

  };


})();
