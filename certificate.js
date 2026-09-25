(function () {
  "use strict";

  const form = document.getElementById("certificateForm");
  const preview = document.getElementById("certificatePreview");
  const message = document.getElementById("certificateFormMessage");
  const clearButton = document.getElementById("clearCertificate");
  const printButton = document.getElementById("printCertificate");

  if (!form) return;

  const fields = {
    recipientName: document.getElementById("recipientName"),
    certificateType: document.getElementById("certificateType"),
    activity: document.getElementById("activity"),
    certificateDate: document.getElementById("certificateDate"),
    certificateId: document.getElementById("certificateId"),
    issuer: document.getElementById("issuer"),
    description: document.getElementById("description")
  };

  const output = {
    type: document.getElementById("previewType"),
    name: document.getElementById("previewName"),
    activity: document.getElementById("previewActivity"),
    description: document.getElementById("previewDescription"),
    date: document.getElementById("previewDate"),
    id: document.getElementById("previewId"),
    issuer: document.getElementById("previewIssuer")
  };

  function clean(value, maxLength) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showMessage(text, type) {
    if (!message) return;

    message.hidden = false;
    message.textContent = text;
    message.className = "notice " + (type || "info");
  }

  function hideMessage() {
    if (!message) return;

    message.hidden = true;
    message.textContent = "";
  }

  function formatDate(dateValue) {
    if (!dateValue) return "—";

    const date = new Date(dateValue + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function generateCertificateId() {
    const year = new Date().getFullYear();

    const randomPart =
      Math.floor(100000 + Math.random() * 900000);

    return `ARS-CERT-${year}-${randomPart}`;
  }

  function createDefaultStatement(type, name, activity) {
    const statements = {
      Participation:
        `${name} is hereby recognized for participating in ${activity}.`,

      Achievement:
        `${name} is hereby recognized for achievement in ${activity}.`,

      Appreciation:
        `${name} is hereby appreciated for valuable contribution to ${activity}.`,

      Completion:
        `${name} has successfully completed ${activity}.`
    };

    return statements[type] ||
      `${name} is hereby recognized for ${activity}.`;
  }

  function updatePreview(data) {
    output.type.textContent =
      `${data.certificateType} CERTIFICATE`;

    output.name.textContent =
      data.recipientName;

    output.activity.textContent =
      data.activity;

    output.description.textContent =
      data.description;

    output.date.textContent =
      `Date: ${formatDate(data.certificateDate)}`;

    output.id.textContent =
      `Certificate ID: ${data.certificateId}`;

    output.issuer.textContent =
      data.issuer;

    preview.hidden = false;
  }

  function getFormData() {
    const recipientName =
      clean(fields.recipientName.value, 100);

    const certificateType =
      clean(fields.certificateType.value, 40);

    const activity =
      clean(fields.activity.value, 160);

    const certificateDate =
      clean(fields.certificateDate.value, 20);

    const certificateId =
      clean(fields.certificateId.value, 60);

    const issuer =
      clean(fields.issuer.value, 100);

    let description =
      clean(fields.description.value, 500);

    if (!description) {
      description = createDefaultStatement(
        certificateType,
        recipientName,
        activity
      );
    }

    return {
      recipientName,
      certificateType,
      activity,
      certificateDate,
      certificateId,
      issuer,
      description
    };
  }

  function validate(data) {
    if (!data.recipientName) {
      return "Please enter the recipient name.";
    }

    if (!data.certificateType) {
      return "Please select a certificate type.";
    }

    if (!data.activity) {
      return "Please enter the activity or program name.";
    }

    if (!data.certificateDate) {
      return "Please select the certificate date.";
    }

    if (!data.issuer) {
      return "Please enter the issuer name.";
    }

    return "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    hideMessage();

    const data = getFormData();

    const validationError = validate(data);

    if (validationError) {
      showMessage(validationError, "warning");
      return;
    }

    if (!data.certificateId) {
      data.certificateId = generateCertificateId();
      fields.certificateId.value = data.certificateId;
    }

    updatePreview(data);

    showMessage(
      "Certificate preview generated successfully.",
      "success"
    );

    if (window.ARS_STORAGE) {
      try {
        ARS_STORAGE.set(
          "ars_last_certificate_preview",
          {
            certificateType: data.certificateType,
            activity: data.activity,
            certificateDate: data.certificateDate,
            certificateId: data.certificateId,
            issuer: data.issuer
          }
        );
      } catch (error) {
        // Local storage is optional.
      }
    }
  });

  clearButton?.addEventListener("click", function () {
    form.reset();

    fields.issuer.value = "ARS Official";

    preview.hidden = true;

    hideMessage();
  });

  printButton?.addEventListener("click", function () {
    if (preview.hidden) {
      showMessage(
        "Generate the certificate before printing.",
        "warning"
      );
      return;
    }

    window.print();
  });

  /*
   * The following helper is intentionally exposed so that future
   * backend/admin modules can reuse the certificate preview logic.
   */
  window.ARS_CERTIFICATE = {
    generateCertificateId,
    createDefaultStatement,
    getFormData,
    updatePreview,
    validate
  };

})();
