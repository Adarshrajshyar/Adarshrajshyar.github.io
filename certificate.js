/* =========================================================
   ARS OFFICIAL
   CERTIFICATE GENERATOR
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (id) =>
    document.getElementById(id);


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const typeSelect =
    $("certificateType");

  const businessFields =
    $("businessFields");

  const generateButton =
    $("generateCertificate");

  const printButton =
    $("printCertificate");

  const output =
    $("certificateOutput");


  /* =======================================================
     STORAGE
     ======================================================= */

  const CERTIFICATE_KEY =
    "ARS_CERTIFICATES";


  function readCertificates() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(
            CERTIFICATE_KEY
          ) || "[]"
        );

      return Array.isArray(data)
        ? data
        : [];

    } catch (_) {

      return [];

    }
  }


  function saveCertificates(list) {

    localStorage.setItem(
      CERTIFICATE_KEY,
      JSON.stringify(list)
    );
  }


  /* =======================================================
     CERTIFICATE ID
     ======================================================= */

  function generateCertificateId() {

    const now =
      new Date();

    const stamp =
      now.getTime()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .slice(2, 7)
        .toUpperCase();

    return (
      "ARS-CERT-" +
      stamp +
      "-" +
      random
    );
  }


  /* =======================================================
     BUSINESS FIELDS
     ======================================================= */

  function updateBusinessFields() {

    if (!typeSelect || !businessFields) {
      return;
    }

    const isBusiness =
      typeSelect.value === "Business";

    businessFields.classList.toggle(
      "show",
      isBusiness
    );

  }


  if (typeSelect) {

    typeSelect.addEventListener(
      "change",
      updateBusinessFields
    );

    updateBusinessFields();

  }


  /* =======================================================
     GENERATE
     ======================================================= */

  function generateCertificate() {

    const name =
      $("recipientName")?.value.trim();

    const type =
      typeSelect?.value || "Achievement";

    const description =
      $("certificateDescription")
        ?.value.trim();


    if (!name) {

      if (window.ARS?.showToast) {

        window.ARS.showToast(
          "Please enter the recipient name."
        );

      } else {

        alert(
          "Please enter the recipient name."
        );

      }

      return;

    }


    const id =
      generateCertificateId();


    const businessName =
      $("businessName")
        ?.value.trim() || "";

    const ownerName =
      $("ownerName")
        ?.value.trim() || "";


    $("outputName").textContent =
      name;

    $("outputType").textContent =
      type.toUpperCase();

    $("outputDescription").textContent =
      description ||
      "This certificate is proudly presented in recognition of excellence and achievement.";

    $("outputId").textContent =
      id;


    const businessOutput =
      $("outputBusiness");


    if (type === "Business") {

      businessOutput.style.display =
        "block";

      businessOutput.textContent =
        businessName
          ? "Business: " + businessName +
            (ownerName
              ? " | Owner / Founder: " +
                ownerName
              : "")
          : ownerName
            ? "Owner / Founder: " +
              ownerName
            : "";

    } else {

      businessOutput.style.display =
        "none";

      businessOutput.textContent =
        "";

    }


    /* Save local verification record */

    const certificates =
      readCertificates();


    certificates.push({

      id: id,

      name: name,

      type: type,

      description:
        description || "",

      businessName:
        businessName,

      ownerName:
        ownerName,

      createdAt:
        new Date().toISOString()

    });


    saveCertificates(
      certificates
    );


    output.classList.add(
      "show"
    );


    output.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    if (window.ARS?.showToast) {

      window.ARS.showToast(
        "Certificate generated successfully."
      );

    }

  }


  /* =======================================================
     PRINT
     ======================================================= */

  function printCertificate() {

    if (!output.classList.contains("show")) {

      if (window.ARS?.showToast) {

        window.ARS.showToast(
          "Generate a certificate first."
        );

      }

      return;
    }


    window.print();

  }


  /* =======================================================
     EVENTS
     ======================================================= */

  if (generateButton) {

    generateButton.addEventListener(
      "click",
      generateCertificate
    );

  }


  if (printButton) {

    printButton.addEventListener(
      "click",
      printCertificate
    );

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.ARS =
    window.ARS || {};


  window.ARS.certificates = {

    read: readCertificates,

    save: saveCertificates,

    generateId:
      generateCertificateId

  };


})();
