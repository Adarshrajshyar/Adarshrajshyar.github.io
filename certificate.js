/* =========================================================
   ARS OFFICIAL WEBSITE — CERTIFICATE SYSTEM
   Version: 3.0.0
   ========================================================= */

(function (window) {
  "use strict";

  var CONFIG = window.ARS_CONFIG || {};
  var STORAGE = window.ARS_STORAGE || null;

  var CERT_PREFIX =
    (CONFIG.certificate &&
      CONFIG.certificate.normal &&
      CONFIG.certificate.normal.prefix) ||
    "ARS-CERT-";

  var JOIN_PREFIX =
    (CONFIG.certificate &&
      CONFIG.certificate.joining &&
      CONFIG.certificate.joining.prefix) ||
    "ARS-JOIN-";

  /* ---------------------------------------------------------
     HELPERS
     --------------------------------------------------------- */

  function makeID(prefix) {
    return (
      prefix +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()
    );
  }

  function escapeHTML(value) {
    var div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
  }

  function getValue(id) {
    var element = document.getElementById(id);
    return element ? element.value.trim() : "";
  }

  function notify(message, type) {
    if (typeof window.ARS_SHOW_POPUP === "function") {
      window.ARS_SHOW_POPUP(message, type || "info");
      return;
    }

    alert(message);
  }

  /* =========================================================
     NORMAL CERTIFICATE
     User can generate it directly.
     ========================================================= */

  function generateCertificate(data) {
    data = data || {};

    var name =
      data.name ||
      getValue("certificateName") ||
      getValue("certName") ||
      getValue("name");

    var type =
      data.type ||
      getValue("certificateType") ||
      "Achievement";

    var purpose =
      data.purpose ||
      getValue("certificatePurpose") ||
      "Achievement";

    if (!name) {
      notify("कृपया अपना नाम दर्ज करें।", "warning");
      return null;
    }

    var certificate = {
      id: makeID(CERT_PREFIX),

      name: name,

      certificateType: type,

      purpose: purpose,

      type: "normal",

      status: "valid",

      approved: true,

      createdAt: new Date().toISOString(),

      author:
        data.author ||
        "Adarsh Raj"
    };

    if (
      STORAGE &&
      typeof STORAGE.addCertificate === "function"
    ) {
      STORAGE.addCertificate(certificate);
    }

    renderCertificate(certificate);

    return certificate;
  }

  /* =========================================================
     RENDER NORMAL CERTIFICATE
     ========================================================= */

  function renderCertificate(certificate) {
    if (!certificate) return;

    var container =
      document.getElementById("certificateResult") ||
      document.getElementById("certificatePreview") ||
      document.getElementById("generatedCertificate");

    if (!container) {
      console.warn(
        "⚠️ Certificate result container not found."
      );
      return;
    }

    var verifyURL =
      window.location.origin +
      window.location.pathname.replace(
        /[^/]*$/,
        ""
      ) +
      "verify.html?id=" +
      encodeURIComponent(certificate.id);

    container.innerHTML = `
      <div class="ars-certificate-card">

        <div class="ars-certificate-header">

          <img
            src="${
              escapeHTML(
                (CONFIG.certificate &&
                  CONFIG.certificate.logo) ||
                "logo.png"
              )
            }"
            alt="ARS Logo"
            class="ars-certificate-logo"
          >

          <div>
            <h2>ARS OFFICIAL</h2>
            <p>Certificate of ${escapeHTML(
              certificate.certificateType
            )}</p>
          </div>

        </div>

        <div class="ars-certificate-body">

          <p>This certificate is proudly presented to</p>

          <h1>${escapeHTML(
            certificate.name
          )}</h1>

          <p>
            for ${
              escapeHTML(
                certificate.purpose
              )
            }.
          </p>

          <p class="ars-certificate-id">
            Certificate ID:
            <strong>${escapeHTML(
              certificate.id
            )}</strong>
          </p>

        </div>

        <div class="ars-certificate-footer">

          <div>
            <strong>Adarsh Raj</strong>
            <br>
            Author
          </div>

          <div>
            <strong>ARS</strong>
            <br>
            Official
          </div>

        </div>

        <div class="ars-certificate-actions">

          <button
            type="button"
            onclick="window.ARS_CERTIFICATE.print()"
          >
            🖨️ Print Certificate
          </button>

          <button
            type="button"
            onclick="window.ARS_CERTIFICATE.verify('${escapeHTML(
              certificate.id
            )}')"
          >
            🔎 Verify Certificate
          </button>

        </div>

      </div>
    `;

    container.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  /* =========================================================
     FIND CERTIFICATE
     ========================================================= */

  function findCertificate(id) {
    if (!id || !STORAGE) return null;

    if (
      typeof STORAGE.findCertificate ===
      "function"
    ) {
      return STORAGE.findCertificate(id);
    }

    return null;
  }

  /* =========================================================
     VERIFY
     ========================================================= */

  function verify(id) {
    if (!id) {
      notify(
        "Certificate ID नहीं मिला।",
        "warning"
      );
      return null;
    }

    var certificate =
      findCertificate(id);

    if (!certificate) {
      notify(
        "Certificate नहीं मिला।",
        "error"
      );
      return null;
    }

    var result =
      document.getElementById(
        "verificationResult"
      );

    if (result) {
      result.innerHTML = `
        <div class="ars-verification-success">

          <h2>✅ Certificate Verified</h2>

          <p>
            <strong>Name:</strong>
            ${escapeHTML(
              certificate.name
            )}
          </p>

          <p>
            <strong>Certificate ID:</strong>
            ${escapeHTML(
              certificate.id
            )}
          </p>

          <p>
            <strong>Type:</strong>
            ${escapeHTML(
              certificate.certificateType ||
              "Certificate"
            )}
          </p>

          <p>
            <strong>Status:</strong>
            Valid
          </p>

        </div>
      `;
    }

    return certificate;
  }

  /* =========================================================
     JOINING CERTIFICATE REQUEST
     Approval is REQUIRED.
     ========================================================= */

  function submitJoiningRequest(data) {
    data = data || {};

    var name =
      data.name ||
      getValue("joiningName") ||
      getValue("joinName");

    var email =
      data.email ||
      getValue("joiningEmail") ||
      getValue("joinEmail");

    var reason =
      data.reason ||
      getValue("joiningReason") ||
      getValue("joinReason");

    if (!name) {
      notify(
        "कृपया अपना नाम दर्ज करें।",
        "warning"
      );
      return null;
    }

    var request = {
      id: makeID(JOIN_PREFIX),

      name: name,

      email: email,

      reason: reason,

      type: "joining",

      status: "pending",

      approved: false,

      createdAt:
        new Date().toISOString()
    };

    if (
      STORAGE &&
      typeof STORAGE.addJoiningRequest ===
      "function"
    ) {
      STORAGE.addJoiningRequest(request);
    }

    notify(
      "Joining request successfully submitted. Approval के बाद certificate दिखाई देगा।",
      "success"
    );

    return request;
  }

  /* =========================================================
     CHECK JOINING CERTIFICATE
     ========================================================= */

  function getJoiningCertificate(id) {
    if (!id || !STORAGE) return null;

    if (
      typeof STORAGE.findJoiningRequest ===
      "function"
    ) {
      var request =
        STORAGE.findJoiningRequest(id);

      if (!request) return null;

      /*
       * VERY IMPORTANT:
       * Certificate cannot be shown until approved.
       */
      if (
        request.approved !== true ||
        request.status !== "approved"
      ) {
        return null;
      }

      return request;
    }

    return null;
  }

  /* =========================================================
     APPROVE JOINING REQUEST
     Publisher/Admin panel can call this.
     ========================================================= */

  function approveJoining(id) {
    if (!id || !STORAGE) return null;

    if (
      typeof STORAGE.approveJoiningRequest !==
      "function"
    ) {
      return null;
    }

    var request =
      STORAGE.approveJoiningRequest(id);

    if (!request) {
      notify(
        "Joining request नहीं मिली।",
        "error"
      );
      return null;
    }

    notify(
      "Joining request approved successfully.",
      "success"
    );

    return request;
  }

  /* =========================================================
     SHOW APPROVED JOINING CERTIFICATE
     ========================================================= */

  function showJoiningCertificate(id) {
    var request =
      getJoiningCertificate(id);

    if (!request) {
      notify(
        "यह Joining Certificate अभी approved नहीं है।",
        "warning"
      );
      return null;
    }

    var certificate = {
      id: request.id,

      name: request.name,

      certificateType:
        "ARS Joining Certificate",

      purpose:
        "Joining ARS",

      type: "joining",

      status: "valid",

      approved: true,

      createdAt:
        request.approvedAt ||
        request.createdAt,

      author: "Adarsh Raj"
    };

    renderJoiningCertificate(
      certificate
    );

    return certificate;
  }

  /* =========================================================
     RENDER JOINING CERTIFICATE
     ========================================================= */

  function renderJoiningCertificate(
    certificate
  ) {
    var container =
      document.getElementById(
        "joiningCertificateResult"
      ) ||
      document.getElementById(
        "certificateResult"
      );

    if (!container) {
      console.warn(
        "⚠️ Joining certificate container not found."
      );
      return;
    }

    container.innerHTML = `
      <div class="ars-certificate-card joining-certificate">

        <div class="ars-certificate-header">

          <img
            src="${
              escapeHTML(
                (CONFIG.certificate &&
                  CONFIG.certificate.logo) ||
                "logo.png"
              )
            }"
            alt="ARS Logo"
            class="ars-certificate-logo"
          >

          <div>
            <h2>ARS OFFICIAL</h2>
            <p>Joining Certificate</p>
          </div>

        </div>

        <div class="ars-certificate-body">

          <p>This certificate confirms that</p>

          <h1>${escapeHTML(
            certificate.name
          )}</h1>

          <p>
            has been approved for joining
            <strong>ARS</strong>.
          </p>

          <p class="ars-certificate-id">
            Certificate ID:
            <strong>${escapeHTML(
              certificate.id
            )}</strong>
          </p>

          <p>
            Status:
            <strong>Approved ✓</strong>
          </p>

        </div>

        <div class="ars-certificate-footer">

          <div>
            <strong>Adarsh Raj</strong>
            <br>
            Author
          </div>

          <div>
            <strong>ARS</strong>
            <br>
            Official
          </div>

        </div>

        <div class="ars-certificate-actions">

          <button
            type="button"
            onclick="window.ARS_CERTIFICATE.print()"
          >
            🖨️ Print Certificate
          </button>

          <button
            type="button"
            onclick="window.ARS_CERTIFICATE.verify('${escapeHTML(
              certificate.id
            )}')"
          >
            🔎 Verify Certificate
          </button>

        </div>

      </div>
    `;

    container.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  /* =========================================================
     PRINT
     ========================================================= */

  function print() {
    window.print();
  }

  /* =========================================================
     AUTO VERIFY FROM URL
     ========================================================= */

  function autoVerify() {
    var params =
      new URLSearchParams(
        window.location.search
      );

    var id = params.get("id");

    if (!id) return;

    var input =
      document.getElementById(
        "certificateID"
      ) ||
      document.getElementById(
        "verifyID"
      );

    if (input) {
      input.value = id;
    }

    verify(id);
  }

  /* =========================================================
     PUBLIC API
     ========================================================= */

  window.ARS_CERTIFICATE = {

    generate:
      generateCertificate,

    render:
      renderCertificate,

    find:
      findCertificate,

    verify:
      verify,

    submitJoining:
      submitJoiningRequest,

    approveJoining:
      approveJoining,

    getJoining:
      getJoiningCertificate,

    showJoining:
      showJoiningCertificate,

    print:
      print,

    autoVerify:
      autoVerify
  };

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      console.log(
        "🏆 ARS Certificate System Loaded"
      );

      if (
        window.location.pathname
          .toLowerCase()
          .includes("verify")
      ) {
        setTimeout(
          autoVerify,
          100
        );
      }

    }
  );

})(window);
