/* =========================================================
   ARS OFFICIAL — VERIFY STORAGE
   Handles certificate + joining certificate verification
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_PREFIX = "ARS_";

  /* ---------------------------------------------------------
     STORAGE HELPERS
     --------------------------------------------------------- */

  function makeKey(id) {
    return STORAGE_PREFIX + String(id).trim();
  }

  function getStoredRecord(id) {
    if (!id) return null;

    const cleanId = String(id).trim();

    /* Direct ARS key */
    try {
      const direct =
        localStorage.getItem(makeKey(cleanId));

      if (direct) {
        return parseRecord(direct);
      }
    } catch (_) {}

    /* Search all ARS records */
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key || !key.startsWith(STORAGE_PREFIX)) {
          continue;
        }

        const raw = localStorage.getItem(key);
        const record = parseRecord(raw);

        if (!record) continue;

        const possibleIds = [
          record.id,
          record.certificateId,
          record.certificateID,
          record.certificate_id,
          record.joiningId,
          record.joiningID,
          record.joining_id,
          record.uniqueId,
          record.uniqueID
        ];

        if (
          possibleIds.some(
            value =>
              value &&
              String(value).trim().toLowerCase() ===
                cleanId.toLowerCase()
          )
        ) {
          return record;
        }
      }
    } catch (_) {}

    return null;
  }

  function parseRecord(raw) {
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);

      if (
        parsed &&
        typeof parsed === "object"
      ) {
        return parsed;
      }

      return null;

    } catch (_) {
      return null;
    }
  }

  /* ---------------------------------------------------------
     NORMALIZE RECORD
     --------------------------------------------------------- */

  function normalizeRecord(record, searchedId) {
    if (!record) return null;

    const typeText = String(
      record.type ||
      record.certificateType ||
      record.documentType ||
      record.kind ||
      ""
    ).toLowerCase();

    const isJoining =
      typeText.includes("joining") ||
      typeText.includes("join");

    return {
      id:
        record.id ||
        record.certificateId ||
        record.certificateID ||
        record.joiningId ||
        record.joiningID ||
        searchedId,

      name:
        record.name ||
        record.fullName ||
        record.recipientName ||
        record.studentName ||
        record.ownerName ||
        "—",

      type:
        isJoining
          ? "Joining Certificate"
          : (
              record.type ||
              record.certificateType ||
              "Certificate"
            ),

      category:
        record.category ||
        record.certificateCategory ||
        record.position ||
        "—",

      issuer:
        record.issuer ||
        record.issuedBy ||
        record.organization ||
        "ARS Official",

      issueDate:
        record.issueDate ||
        record.date ||
        record.issuedOn ||
        record.createdAt ||
        "—",

      status:
        record.status ||
        "VALID",

      message:
        record.message ||
        record.description ||
        "",

      raw: record
    };
  }

  /* ---------------------------------------------------------
     VERIFY
     --------------------------------------------------------- */

  function verify(id) {
    const cleanId =
      String(id || "").trim();

    if (!cleanId) {
      return {
        success: false,
        valid: false,
        message: "Please enter a valid ID."
      };
    }

    const record =
      getStoredRecord(cleanId);

    if (!record) {
      return {
        success: true,
        valid: false,
        id: cleanId,
        message:
          "No certificate or joining certificate found for this ID."
      };
    }

    const normalized =
      normalizeRecord(
        record,
        cleanId
      );

    return {
      success: true,
      valid: true,
      id: cleanId,
      data: normalized,
      message:
        "Document verified successfully."
    };
  }

  /* ---------------------------------------------------------
     DISPLAY RESULT
     --------------------------------------------------------- */

  function displayResult(result, container) {
    if (!container) return;

    if (!result.valid) {

      container.innerHTML = `
        <div class="verify-result verify-invalid">
          <div class="verify-icon">✕</div>

          <h3>Verification Failed</h3>

          <p>
            ${escapeHTML(result.message)}
          </p>

          ${
            result.id
              ? `
                <small>
                  ID: ${escapeHTML(result.id)}
                </small>
              `
              : ""
          }
        </div>
      `;

      return;
    }

    const data = result.data;

    container.innerHTML = `
      <div class="verify-result verify-valid">

        <div class="verify-icon">✓</div>

        <h3>Verified Successfully</h3>

        <p class="verify-status">
          This document is registered with ARS Official.
        </p>

        <div class="verify-details">

          <div class="verify-row">
            <span>Document ID</span>
            <strong>
              ${escapeHTML(data.id)}
            </strong>
          </div>

          <div class="verify-row">
            <span>Name</span>
            <strong>
              ${escapeHTML(data.name)}
            </strong>
          </div>

          <div class="verify-row">
            <span>Document Type</span>
            <strong>
              ${escapeHTML(data.type)}
            </strong>
          </div>

          <div class="verify-row">
            <span>Category</span>
            <strong>
              ${escapeHTML(data.category)}
            </strong>
          </div>

          <div class="verify-row">
            <span>Issued By</span>
            <strong>
              ${escapeHTML(data.issuer)}
            </strong>
          </div>

          <div class="verify-row">
            <span>Issue Date</span>
            <strong>
              ${escapeHTML(data.issueDate)}
            </strong>
          </div>

          <div class="verify-row">
            <span>Status</span>
            <strong class="verify-valid-text">
              ${escapeHTML(data.status)}
            </strong>
          </div>

        </div>

        ${
          data.message
            ? `
              <p class="verify-message">
                ${escapeHTML(data.message)}
              </p>
            `
            : ""
        }

      </div>
    `;
  }

  /* ---------------------------------------------------------
     FORM INITIALIZATION
     --------------------------------------------------------- */

  function initVerification() {

    const form =
      document.querySelector(
        "[data-verify-form]"
      ) ||
      document.getElementById(
        "verifyForm"
      );

    const input =
      document.querySelector(
        "[data-verify-id]"
      ) ||
      document.getElementById(
        "verifyId"
      ) ||
      document.getElementById(
        "certificateId"
      );

    const resultBox =
      document.querySelector(
        "[data-verify-result]"
      ) ||
      document.getElementById(
        "verifyResult"
      );

    if (!form || !input) return;

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const id =
          input.value.trim();

        const result =
          verify(id);

        if (resultBox) {
          displayResult(
            result,
            resultBox
          );
        }

        if (window.ARS?.showToast) {
          window.ARS.showToast(
            result.valid
              ? "Document verified ✓"
              : "Document not found"
          );
        }
      }
    );

    /* -------------------------------------------------------
       Auto verify from URL:
       verify.html?id=ARS-CERT-XXXX
       ------------------------------------------------------- */

    try {

      const params =
        new URLSearchParams(
          window.location.search
        );

      const urlId =
        params.get("id") ||
        params.get("certificate") ||
        params.get("certificateId");

      if (urlId) {

        input.value = urlId;

        const result =
          verify(urlId);

        if (resultBox) {
          displayResult(
            result,
            resultBox
          );
        }
      }

    } catch (_) {}
  }

  /* ---------------------------------------------------------
     ESCAPE HTML
     --------------------------------------------------------- */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ---------------------------------------------------------
     GLOBAL ARS API
     --------------------------------------------------------- */

  window.ARS = window.ARS || {};

  window.ARS.verifyStorage = {
    verify,
    find: getStoredRecord,
    normalize: normalizeRecord,
    display: displayResult
  };

  /* ---------------------------------------------------------
     START
     --------------------------------------------------------- */

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initVerification
    );
  } else {
    initVerification();
  }

})();
