/* =========================================================
   ARS OFFICIAL — CERTIFICATE SYSTEM
   Certificate Create / Save / Find / Verify
   ========================================================= */

"use strict";

(function (window) {

  if (!window.ARS_STORAGE) {
    console.error("ARS_STORAGE is required before certificate.js");
    return;
  }

  const CONFIG = window.ARS_CONFIG || {};

  const CERTIFICATE_TYPES = Object.freeze([
    "Professional",
    "Business",
    "Achievement",
    "Participation"
  ]);

  /* =======================================================
     HELPERS
  ======================================================= */

  function clean(value) {
    return String(value || "").trim();
  }

  function createCertificateId() {

    const time =
      new Date()
        .toISOString()
        .replace(/\D/g, "")
        .slice(0, 14);

    const random =
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    return `${CONFIG.certificatePrefix || "ARS-CERT"}-${time}-${random}`;
  }

  function normalize(data) {

    data = data || {};

    const type =
      CERTIFICATE_TYPES.includes(clean(data.type))
        ? clean(data.type)
        : "Achievement";

    return {

      id:
        clean(data.id) ||
        createCertificateId(),

      name:
        clean(data.name),

      type:

        type,

      publisher:
        clean(data.publisher) ||
        CONFIG.publisherName ||
        "Adarsh Raj",

      issuer:
        clean(data.issuer) ||
        CONFIG.certificateIssuer ||
        "Adarsh Raj — Founder, ARS Official",

      issuedAt:
        data.issuedAt ||
        new Date().toISOString(),

      businessName:
        clean(data.businessName),

      businessOwner:
        clean(data.businessOwner),

      achievement:
        clean(data.achievement),

      description:
        clean(data.description),

      logo:
        data.logo ||
        CONFIG.logo ||
        "logo.png",

      signature:
        data.signature ||
        CONFIG.signature ||
        "signature.jpg"

    };

  }

  /* =======================================================
     VALIDATION
     ======================================================= */

  function validate(data) {

    const item = normalize(data);

    if (!item.name) {
      throw new Error("Certificate holder name is required.");
    }

    if (!CERTIFICATE_TYPES.includes(item.type)) {
      throw new Error("Invalid certificate type.");
    }

    if (
      item.type === "Business" &&
      !item.businessName
    ) {
      throw new Error("Business name is required.");
    }

    if (
      item.type === "Business" &&
      !item.businessOwner
    ) {
      throw new Error("Business owner/founder name is required.");
    }

    return item;
  }

  /* =======================================================
     CREATE CERTIFICATE
     ======================================================= */

  function create(data) {

    const certificate =
      validate(data);

    return window.ARS_STORAGE.saveCertificate(
      certificate
    );

  }

  /* =======================================================
     UPDATE CERTIFICATE
     ======================================================= */

  function update(id, data) {

    const existing =
      find(id);

    if (!existing) {
      return null;
    }

    const merged = {

      ...existing,
      ...data,

      id:
        existing.id,

      issuedAt:
        existing.issuedAt

    };

    return create(merged);

  }

  /* =======================================================
     FIND CERTIFICATE
     ======================================================= */

  function find(id) {

    if (!id) {
      return null;
    }

    return window.ARS_STORAGE.findCertificate(
      clean(id)
    );

  }

  /* =======================================================
     GET ALL
     ======================================================= */

  function all() {

    return window.ARS_STORAGE.certificates();

  }

  /* =======================================================
     DELETE
     ======================================================= */

  function remove(id) {

    if (!id) {
      return false;
    }

    const list =
      all().filter(function (item) {

        return String(item.id).toLowerCase() !==
          String(id).trim().toLowerCase();

      });

    window.ARS_STORAGE.write(
      window.ARS_STORAGE.KEYS.CERTIFICATES,
      list
    );

    return true;

  }

  /* =======================================================
     VERIFICATION URL
     ======================================================= */

  function verificationURL(id) {

    const page =
      CONFIG.certificateVerificationPage ||
      "verify.html";

    return new URL(
      `${page}?id=${encodeURIComponent(id)}`,
      window.location.href
    ).href;

  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.ARS_CERTIFICATE = Object.freeze({

    types:
      function () {
        return [...CERTIFICATE_TYPES];
      },

    create,

    update,

    find,

    all,

    remove,

    verificationURL,

    normalize,

    validate

  });

  console.log("🏆 ARS Certificate System Loaded");

})(window);
