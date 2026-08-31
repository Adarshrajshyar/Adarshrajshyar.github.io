"use strict";

/*
 * ARS OFFICIAL
 * Verification Storage
 *
 * Supports:
 * 1. Normal Certificate → ARS-CERT-...
 * 2. Joining Certificate → Application Number
 *
 * Works with localStorage and the existing certificate/storage systems.
 */

(function () {

  const CERTIFICATE_KEYS = [
    "ARS_CERTIFICATES",
    "ARS_CERTIFICATE_STORAGE",
    "ARS_CERTIFICATE_DATA",
    "certificates"
  ];

  const JOINING_KEYS = [
    "ARS_JOINING_CERTIFICATES",
    "ARS_JOINING_CERTIFICATE",
    "ARS_JOINING_DATA",
    "joiningCertificates",
    "ARS_JOINING_APPLICATIONS"
  ];

  function safeParse(value) {
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function readKey(key) {
    return safeParse(localStorage.getItem(key));
  }

  function normalizeList(data) {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data;
    }

    if (typeof data === "object") {
      if (Array.isArray(data.items)) return data.items;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.certificates)) return data.certificates;
      if (Array.isArray(data.records)) return data.records;

      return Object.values(data).filter(
        item => item && typeof item === "object"
      );
    }

    return [];
  }

  function getAllFromKeys(keys) {
    const result = [];

    keys.forEach(key => {
      const data = readKey(key);

      normalizeList(data).forEach(item => {
        if (
          item &&
          typeof item === "object" &&
          !result.some(existing =>
            JSON.stringify(existing) === JSON.stringify(item)
          )
        ) {
          result.push(item);
        }
      });
    });

    return result;
  }

  function clean(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase();
  }

  function findValue(record, keys) {
    for (const key of keys) {
      if (
        record &&
        record[key] !== undefined &&
        record[key] !== null &&
        String(record[key]).trim() !== ""
      ) {
        return record[key];
      }
    }

    return "";
  }

  function findCertificate(id) {
    const target = clean(id);

    if (!target) return null;

    const records =
      getAllFromKeys(CERTIFICATE_KEYS);

    return records.find(record => {

      const recordId = findValue(record, [
        "id",
        "certificateId",
        "certificateID",
        "certId",
        "certificate_id"
      ]);

      return clean(recordId) === target;

    }) || null;
  }

  function findJoiningCertificate(applicationNumber) {
    const target = clean(applicationNumber);

    if (!target) return null;

    const records =
      getAllFromKeys(JOINING_KEYS);

    return records.find(record => {

      const appNo = findValue(record, [
        "applicationNumber",
        "applicationNo",
        "application",
        "application_id",
        "applicationId",
        "joiningApplicationNumber",
        "joiningId",
        "id"
      ]);

      return clean(appNo) === target;

    }) || null;
  }

  function verifyCertificate(id) {
    const record = findCertificate(id);

    if (!record) return null;

    return {
      ...record,
      id:
        findValue(record, [
          "id",
          "certificateId",
          "certificateID",
          "certId"
        ]) || id,

      type:
        findValue(record, [
          "type",
          "certificateType"
        ]) || "Certificate",

      name:
        findValue(record, [
          "name",
          "fullName",
          "recipientName"
        ])
    };
  }

  function verifyJoining(id) {
    const record =
      findJoiningCertificate(id);

    if (!record) return null;

    return {
      ...record,

      id:
        findValue(record, [
          "applicationNumber",
          "applicationNo",
          "application",
          "applicationId",
          "joiningApplicationNumber",
          "joiningId",
          "id"
        ]) || id,

      type:
        findValue(record, [
          "type",
          "certificateType"
        ]) || "Joining Certificate",

      name:
        findValue(record, [
          "name",
          "fullName",
          "applicantName",
          "candidateName",
          "recipientName"
        ])
    };
  }

  function verify(type, id) {

    const cleanId = String(id || "").trim();

    if (!cleanId) return null;

    if (type === "joining") {
      return verifyJoining(cleanId);
    }

    return verifyCertificate(cleanId);
  }

  /*
   * Helpful automatic detection:
   *
   * ARS-CERT-... → normal certificate
   * Otherwise → joining application number
   */
  function autoVerify(id) {

    const cleanId =
      String(id || "").trim();

    if (!cleanId) return null;

    if (
      cleanId
        .toUpperCase()
        .startsWith("ARS-CERT-")
    ) {
      return verifyCertificate(cleanId);
    }

    return (
      verifyJoining(cleanId) ||
      verifyCertificate(cleanId)
    );
  }

  window.ARS_VERIFY = {
    verify,
    verifyCertificate,
    verifyJoining,
    autoVerify,
    findCertificate,
    findJoiningCertificate
  };

})();
