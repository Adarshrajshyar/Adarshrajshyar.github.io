/* =========================================================
   ARS OFFICIAL
   FINAL CERTIFICATE ENGINE
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "ARS_CERTIFICATE_APPLICATIONS";

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveAll(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function makeId(prefix = "ARS") {
    const year = new Date().getFullYear();
    const random = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    return `${prefix}-${year}-${random}`;
  }

  function normalize(value) {
    return String(value || "").trim();
  }

  function createNormalCertificate(details) {

    const data = getAll();

    const certificate = {
      id: makeId("ARS"),
      certificateId: "",
      type: normalize(details.type) || "Education",
      name: normalize(details.name),
      email: normalize(details.email),
      activity: normalize(details.activity),
      description: normalize(details.description),
      className: normalize(details.className),
      subject: normalize(details.subject),

      status: "issued",
      approved: true,

      issueDate: new Date().toISOString(),
      issuer: "ARS Official",
      publisher: "Adarsh Raj Shayar",

      createdAt: new Date().toISOString()
    };

    certificate.certificateId = certificate.id;

    data.push(certificate);
    saveAll(data);

    return certificate;
  }

  function find(id) {

    const searchId = normalize(id).toUpperCase();

    return getAll().find(item => {

      return normalize(
        item.certificateId || item.id
      ).toUpperCase() === searchId;

    }) || null;
  }

  function verify(id) {

    const certificate = find(id);

    if (!certificate) {
      return {
        verified: false,
        message: "Certificate not found."
      };
    }

    if (
      certificate.status !== "issued" &&
      certificate.status !== "approved" &&
      certificate.status !== "valid"
    ) {
      return {
        verified: false,
        certificate,
        message: "Certificate is not valid."
      };
    }

    return {
      verified: true,
      certificate,
      message: "Certificate verified successfully."
    };
  }

  function formatDate(date) {

    if (!date) return "—";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function render(certificate, container) {

    if (!certificate || !container) return;

    container.innerHTML = `
      <div class="ars-certificate-card">

        <div class="ars-certificate-header">
          <img
            src="logo.png"
            alt="ARS Official"
            class="ars-certificate-logo"
          >

          <div>
            <h1>ARS OFFICIAL</h1>
            <p>Certificate of ${certificate.type}</p>
          </div>
        </div>

        <div class="ars-certificate-body">

          <p class="certificate-label">
            This certificate is proudly presented to
          </p>

          <h2 class="certificate-name">
            ${escapeHTML(certificate.name)}
          </h2>

          <p>
            for
            <strong>
              ${escapeHTML(
                certificate.activity || certificate.description || "Achievement"
              )}
            </strong>
          </p>

          ${
            certificate.className
              ? `<p>Class: ${escapeHTML(certificate.className)}</p>`
              : ""
          }

          ${
            certificate.subject
              ? `<p>Subject: ${escapeHTML(certificate.subject)}</p>`
              : ""
          }

        </div>

        <div class="ars-certificate-footer">

          <div>
            <strong>Certificate ID</strong>
            <span>${escapeHTML(certificate.certificateId)}</span>
          </div>

          <div>
            <strong>Issue Date</strong>
            <span>${formatDate(certificate.issueDate)}</span>
          </div>

          <div>
            <img
              src="signature.jpg"
              alt="Authorized Signature"
              class="certificate-signature"
            >
            <strong>Adarsh Raj Shayar</strong>
            <span>Founder — ARS Official</span>
          </div>

        </div>

      </div>
    `;
  }

  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  window.ARS_CERTIFICATE_FINAL = {

    getAll,
    saveAll,

    createNormalCertificate,

    find,

    verify,

    formatDate,

    render

  };

})();
