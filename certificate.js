```javascript
/* =========================================================
   ADARSH RAJ SHAYAR
   ARS OFFICIAL CERTIFICATE SYSTEM
   Version 2.0
   ========================================================= */


/* =========================================================
   ⚙️ CERTIFICATE CONFIGURATION
   ========================================================= */

const ARS_CERTIFICATE_CONFIG = {

  prefix: "ARS-CERT",

  idPrefix: "ARSID",

  storageKey: "ARS_CERTIFICATES",

  currentYear: new Date().getFullYear(),

  validStatuses: [
    "Valid",
    "Revoked",
    "Expired"
  ],

  certificateTypes: [
    "Professional",
    "Business",
    "Achievement",
    "Participation"
  ]

};


/* =========================================================
   🗃️ CERTIFICATE DATABASE
   ========================================================= */

let certificateData = [];


/* =========================================================
   💾 LOAD CERTIFICATES
   ========================================================= */

function loadCertificates() {

  try {

    const savedData =
      localStorage.getItem(
        ARS_CERTIFICATE_CONFIG.storageKey
      );

    if (!savedData) {

      certificateData = [];

      return certificateData;

    }

    const parsedData =
      JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {

      certificateData = [];

      return certificateData;

    }

    certificateData = parsedData;

    return certificateData;

  } catch (error) {

    console.error(
      "❌ Certificate data load failed:",
      error
    );

    certificateData = [];

    return certificateData;

  }

}


/* =========================================================
   💾 SAVE CERTIFICATES
   ========================================================= */

function saveCertificates() {

  try {

    localStorage.setItem(
      ARS_CERTIFICATE_CONFIG.storageKey,
      JSON.stringify(certificateData)
    );

    return true;

  } catch (error) {

    console.error(
      "❌ Certificate data save failed:",
      error
    );

    return false;

  }

}


/* =========================================================
   🔢 GENERATE CERTIFICATE NUMBER
   ========================================================= */

function generateCertificateNumber() {

  const year =
    new Date().getFullYear();

  const number =
    String(certificateData.length + 1)
      .padStart(4, "0");

  return `${ARS_CERTIFICATE_CONFIG.prefix}-${year}-${number}`;

}


/* =========================================================
   🔐 GENERATE UNIQUE CERTIFICATE ID
   ========================================================= */

function generateUniqueCertificateId() {

  let id;

  do {

    const randomPart =
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    id =
      `${ARS_CERTIFICATE_CONFIG.idPrefix}-${randomPart}`;

  } while (
    certificateData.some(
      certificate =>
        certificate.uniqueId === id
    )
  );

  return id;

}


/* =========================================================
   📅 FORMAT DATE
   ========================================================= */

function formatCertificateDate(date = new Date()) {

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  ).format(date);

}


/* =========================================================
   🏆 CREATE CERTIFICATE
   ========================================================= */

function createCertificate(data = {}) {

  const name =
    String(data.name || "").trim();

  const type =
    String(data.type || "").trim();

  if (!name) {

    throw new Error(
      "Certificate holder name is required."
    );

  }

  if (
    !ARS_CERTIFICATE_CONFIG.certificateTypes
      .includes(type)
  ) {

    throw new Error(
      "Invalid certificate type."
    );

  }

  const certificate = {

    certificateNo:
      generateCertificateNumber(),

    uniqueId:
      generateUniqueCertificateId(),

    name,

    type,

    issueDate:
      formatCertificateDate(),

    status:
      "Valid",

    createdAt:
      new Date().toISOString()

  };


  certificateData.push(certificate);

  saveCertificates();

  return certificate;

}


/* =========================================================
   🔎 FIND CERTIFICATE
   ========================================================= */

function findCertificate(value) {

  const searchValue =
    String(value || "")
      .trim()
      .toLowerCase();

  if (!searchValue) {
    return null;
  }

  return certificateData.find(
    certificate =>

      String(certificate.certificateNo)
        .toLowerCase() === searchValue

      ||

      String(certificate.uniqueId)
        .toLowerCase() === searchValue

  ) || null;

}


/* =========================================================
   ✅ VERIFY CERTIFICATE
   ========================================================= */

function verifyCertificate(value) {

  const certificate =
    findCertificate(value);

  if (!certificate) {

    return {

      verified: false,

      status: "Not Found",

      certificate: null

    };

  }


  return {

    verified:
      certificate.status === "Valid",

    status:
      certificate.status,

    certificate

  };

}


/* =========================================================
   🔄 UPDATE CERTIFICATE STATUS
   ========================================================= */

function updateCertificateStatus(
  uniqueId,
  newStatus
) {

  if (
    !ARS_CERTIFICATE_CONFIG.validStatuses
      .includes(newStatus)
  ) {

    return false;

  }


  const certificate =
    certificateData.find(
      item =>
        item.uniqueId === uniqueId
    );


  if (!certificate) {

    return false;

  }


  certificate.status =
    newStatus;


  certificate.updatedAt =
    new Date().toISOString();


  saveCertificates();

  return true;

}


/* =========================================================
   📊 CERTIFICATE STATISTICS
   ========================================================= */

function getCertificateStats() {

  return {

    total:
      certificateData.length,

    valid:
      certificateData.filter(
        item =>
          item.status === "Valid"
      ).length,

    revoked:
      certificateData.filter(
        item =>
          item.status === "Revoked"
      ).length,

    expired:
      certificateData.filter(
        item =>
          item.status === "Expired"
      ).length

  };

}


/* =========================================================
   🌐 GLOBAL ARS CERTIFICATE API
   ========================================================= */

window.ARS_CERTIFICATES = {

  config:
    ARS_CERTIFICATE_CONFIG,

  getAll:
    () => [...certificateData],

  create:
    createCertificate,

  find:
    findCertificate,

  verify:
    verifyCertificate,

  updateStatus:
    updateCertificateStatus,

  stats:
    getCertificateStats

};


/* =========================================================
   🚀 INITIALIZE
   ========================================================= */

loadCertificates();


console.log(
  "🏆 ARS Certificate System Loaded"
);

console.log(
  "📜 Certificates:",
  certificateData.length
);
```
