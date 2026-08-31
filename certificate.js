/* =========================================================
   ARS OFFICIAL
   Certificate Generator
   ========================================================= */

(function () {

  "use strict";


  const NAME_KEY = "ARS_CERTIFICATES";


  function getCertificates() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(NAME_KEY) || "[]"
        );

      return Array.isArray(data)
        ? data
        : [];

    } catch (error) {

      return [];

    }

  }


  function saveCertificates(list) {

    try {

      localStorage.setItem(
        NAME_KEY,
        JSON.stringify(list)
      );

      return true;

    } catch (error) {

      return false;

    }

  }


  function generateCertificateId() {

    const timestamp =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    return `ARS-${timestamp}-${random}`;

  }


  function formatDate(value) {

    const date =
      value
        ? new Date(value)
        : new Date();

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

  }


  function getValue(id) {

    const element =
      document.getElementById(id);

    return element
      ? element.value.trim()
      : "";

  }


  function setText(id, value) {

    const element =
      document.getElementById(id);

    if (element) {
      element.textContent = value;
    }

  }


  function showMessage(message) {

    const element =
      document.getElementById(
        "certificateMessage"
      );

    if (element) {
      element.textContent = message;
    }

  }


  function showCertificate() {

    const certificate =
      document.getElementById(
        "certificate"
      );

    const printButton =
      document.getElementById(
        "printCertificate"
      );

    if (certificate) {
      certificate.hidden = false;
    }

    if (printButton) {
      printButton.hidden = false;
    }

  }


  function generate() {

    const name =
      getValue(
        "certificateNameInput"
      );

    const type =
      getValue(
        "certificateType"
      );

    const purpose =
      getValue(
        "certificatePurpose"
      );

    const businessName =
      getValue(
        "businessName"
      );

    const ownerName =
      getValue(
        "ownerName"
      );


    if (!name) {

      showMessage(
        "कृपया Name दर्ज करें।"
      );

      return null;

    }


    if (!type) {

      showMessage(
        "कृपया Certificate Type चुनें।"
      );

      return null;

    }


    if (
      type === "Business" &&
      !businessName
    ) {

      showMessage(
        "Business Certificate के लिए Business Name दर्ज करें।"
      );

      return null;

    }


    if (
      type === "Business" &&
      !ownerName
    ) {

      showMessage(
        "Business Certificate के लिए Owner / Founder Name दर्ज करें।"
      );

      return null;

    }


    const id =
      generateCertificateId();

    const createdAt =
      new Date().toISOString();


    const certificateData = {

      id,

      name,

      type,

      purpose,

      businessName,

      ownerName,

      createdAt,

      issuer: "ARS Official",

      status: "valid"

    };


    const certificates =
      getCertificates();


    certificates.push(
      certificateData
    );


    saveCertificates(
      certificates
    );


    setText(
      "certificateNameDisplay",
      name
    );

    setText(
      "certificateTypeDisplay",
      `${type} Certificate`
    );

    setText(
      "certificateIdDisplay",
      id
    );

    setText(
      "certificateDateDisplay",
      formatDate(createdAt)
    );


    const defaultText =
      `This certificate is proudly presented to ${name} in recognition of their ${type.toLowerCase()} association, contribution and achievement with ARS Official.`;

    setText(
      "certificateText",
      purpose || defaultText
    );


    const businessDisplay =
      document.getElementById(
        "businessDisplay"
      );


    if (type === "Business") {

      setText(
        "businessNameDisplay",
        businessName
      );

      setText(
        "ownerNameDisplay",
        ownerName
      );

      if (businessDisplay) {
        businessDisplay.hidden = false;
      }

    } else {

      if (businessDisplay) {
        businessDisplay.hidden = true;
      }

    }


    showCertificate();

    showMessage(
      `Certificate generated successfully. ID: ${id}`
    );


    const certificateElement =
      document.getElementById(
        "certificate"
      );

    if (certificateElement) {

      certificateElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }


    return certificateData;

  }


  window.ARS_CERTIFICATE = {

    getAll: getCertificates,

    saveAll: saveCertificates,

    generateId: generateCertificateId,

    generate: generate,

    formatDate: formatDate

  };


  document.addEventListener(
    "DOMContentLoaded",
    function () {

      const generateButton =
        document.getElementById(
          "generateCertificate"
        );


      if (generateButton) {

        generateButton.addEventListener(
          "click",
          generate
        );

      }


      const nameInput =
        document.getElementById(
          "certificateNameInput"
        );


      if (nameInput) {

        nameInput.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter"
            ) {

              event.preventDefault();

              generate();

            }

          }
        );

      }

    }
  );

})();
