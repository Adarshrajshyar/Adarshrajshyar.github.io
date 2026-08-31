"use strict";

/* =========================================================
   ARS OFFICIAL — CERTIFICATE ENGINE
   ========================================================= */

(function () {

  const STORAGE_KEY = "ARS_CERTIFICATES";

  const form =
    document.getElementById("certificateForm");

  const type =
    document.getElementById("certificateType");

  const name =
    document.getElementById("certificateName");

  const businessName =
    document.getElementById("businessName");

  const ownerName =
    document.getElementById("ownerName");

  const reason =
    document.getElementById("certificateReason");

  const preview =
    document.getElementById("certificatePreview");

  if (!form) return;


  const previewName =
    document.getElementById("previewName");

  const previewType =
    document.getElementById("previewType");

  const previewMessage =
    document.getElementById("previewMessage");

  const previewDate =
    document.getElementById("previewDate");

  const previewId =
    document.getElementById("previewId");


  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function generateId() {

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    const time =
      Date.now()
        .toString(36)
        .toUpperCase();

    return `ARS-CERT-${time}-${random}`;

  }


  function getCertificates() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );

      return Array.isArray(data)
        ? data
        : [];

    } catch (error) {

      return [];

    }

  }


  function saveCertificate(data) {

    const certificates =
      getCertificates();

    certificates.push(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(certificates)
    );

  }


  function updateBusinessFields() {

    const fields =
      document.querySelectorAll(
        ".business-field"
      );

    const isBusiness =
      type.value === "Business";


    fields.forEach(field => {

      field.style.display =
        isBusiness ? "flex" : "none";

    });


    businessName.required =
      isBusiness;

    ownerName.required =
      isBusiness;

  }


  type.addEventListener(
    "change",
    updateBusinessFields
  );


  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const userName =
        name.value.trim();


      if (!userName) {

        name.focus();

        return;

      }


      if (
        type.value === "Business" &&
        (
          !businessName.value.trim() ||
          !ownerName.value.trim()
        )
      ) {

        alert(
          "Business Name और Owner / Founder Name भरें।"
        );

        return;

      }


      const id =
        generateId();

      const now =
        new Date();


      const certificate = {

        id,

        type:
          type.value,

        name:
          userName,

        businessName:
          businessName.value.trim(),

        ownerName:
          ownerName.value.trim(),

        reason:
          reason.value.trim(),

        date:
          now.toISOString(),

        issuer:
          "Adarsh Raj",

        organization:
          "ARS Official"

      };


      saveCertificate(
        certificate
      );


      previewName.textContent =
        userName;


      previewType.textContent =
        `OF ${type.value.toUpperCase()}`;


      let message =
        reason.value.trim() ||
        "for outstanding achievement and contribution";


      if (type.value === "Business") {

        message +=
          ` | Business: ${businessName.value.trim()} | Owner/Founder: ${ownerName.value.trim()}`;

      }


      previewMessage.textContent =
        `This certificate is proudly presented to ${userName} ${message}.`;


      previewDate.textContent =
        now.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }
        );


      previewId.textContent =
        id;


      preview.style.display =
        "block";


      preview.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      window.ARS_LAST_CERTIFICATE =
        certificate;

    }
  );


  const printButton =
    document.getElementById(
      "printCertificate"
    );


  if (printButton) {

    printButton.addEventListener(
      "click",
      function () {

        window.print();

      }
    );

  }


  const downloadButton =
    document.getElementById(
      "downloadCertificate"
    );


  if (downloadButton) {

    downloadButton.addEventListener(
      "click",
      function () {

        const paper =
          document.querySelector(
            ".certificate-paper"
          );


        if (!paper) return;


        const html =
          `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>ARS Certificate</title>
            <style>
              body {
                margin: 0;
                padding: 30px;
                font-family: Arial, sans-serif;
              }
            </style>
          </head>
          <body>
            ${paper.outerHTML}
          </body>
          </html>
          `;


        const blob =
          new Blob(
            [html],
            { type: "text/html" }
          );


        const url =
          URL.createObjectURL(blob);


        const link =
          document.createElement("a");


        link.href = url;

        link.download =
          `${
            window.ARS_LAST_CERTIFICATE?.id ||
            "ARS-Certificate"
          }.html`;


        document.body.appendChild(link);

        link.click();

        link.remove();

        setTimeout(
          () => URL.revokeObjectURL(url),
          1000
        );

      }
    );

  }


  updateBusinessFields();


  window.ARS_CERTIFICATE = {

    getAll:
      getCertificates,

    save:
      saveCertificate,

    generateId,

    getLast:
      () => window.ARS_LAST_CERTIFICATE || null

  };

})();
