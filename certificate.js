/* =========================================================
   ARS CERTIFICATE SYSTEM
   Search • Display • Print • Local Storage Support
   ========================================================= */

(function () {
  "use strict";

  const form =
    document.getElementById("certificateForm");

  const input =
    document.getElementById("certificateId");

  const message =
    document.getElementById("certificateMessage");

  const preview =
    document.getElementById("certificatePreview");

  const printButton =
    document.getElementById("printCertificate");

  const STORAGE_KEY =
    "ARS_CERTIFICATES";

  function readCertificates() {
    try {
      const data =
        JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function getCertificate(id) {

    const certificates =
      readCertificates();

    return certificates.find(
      certificate =>
        String(
          certificate.id ||
          certificate.certificateId ||
          ""
        ).toUpperCase() ===
        String(id).trim().toUpperCase()
    );
  }

  function setMessage(text, success) {

    if (!message) return;

    message.textContent = text;

    message.className =
      "form-message " +
      (success ? "success" : "error");
  }

  function showCertificate(certificate) {

    if (!preview) return;

    const name =
      certificate.name ||
      certificate.fullName ||
      "ARS Member";

    const type =
      certificate.type ||
      certificate.certificateType ||
      "Achievement";

    const profession =
      certificate.profession ||
      certificate.achievement ||
      "";

    const business =
      certificate.businessName ||
      "";

    const id =
      certificate.id ||
      certificate.certificateId ||
      "";

    const date =
      certificate.date ||
      certificate.issueDate ||
      new Date().toLocaleDateString("en-IN");

    const nameElement =
      document.getElementById("previewName");

    const typeElement =
      document.getElementById("previewType");

    const professionElement =
      document.getElementById("previewProfession");

    const businessElement =
      document.getElementById("previewBusiness");

    const idElement =
      document.getElementById("previewId");

    const dateElement =
      document.getElementById("previewDate");

    if (nameElement)
      nameElement.textContent = name;

    if (typeElement)
      typeElement.textContent = type;

    if (professionElement) {
      professionElement.textContent =
        profession;
    }

    if (businessElement) {
      businessElement.textContent =
        business;
      businessElement.style.display =
        business ? "block" : "none";
    }

    if (idElement)
      idElement.textContent = id;

    if (dateElement)
      dateElement.textContent = date;

    preview.style.display = "block";

    preview.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function openCertificateFromURL() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const id =
      params.get("id") ||
      params.get("certificate") ||
      params.get("certificateId");

    if (id && input) {

      input.value =
        decodeURIComponent(id);

      const certificate =
        getCertificate(id);

      if (certificate) {
        showCertificate(certificate);
        setMessage(
          "Certificate मिल गया।",
          true
        );
      }
    }
  }

  if (form) {

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const id =
          input.value.trim();

        if (!id) {
          setMessage(
            "कृपया Certificate ID डालें।",
            false
          );
          return;
        }

        const certificate =
          getCertificate(id);

        if (!certificate) {

          if (preview) {
            preview.style.display =
              "none";
          }

          setMessage(
            "Certificate नहीं मिला। ID दोबारा जाँचें।",
            false
          );

          return;
        }

        setMessage(
          "Certificate सफलतापूर्वक मिल गया।",
          true
        );

        showCertificate(certificate);

      }
    );

  }

  if (printButton) {

    printButton.addEventListener(
      "click",
      function () {

        if (
          !preview ||
          preview.style.display === "none"
        ) {
          return;
        }

        window.print();

      }
    );

  }

  /* Theme */

  const themeToggle =
    document.getElementById(
      "themeToggle"
    );

  function applyTheme(theme) {

    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      "ars-theme",
      theme
    );

    if (themeToggle) {

      themeToggle.textContent =
        theme === "dark"
          ? "☀️"
          : "🌙";

    }

  }

  applyTheme(
    localStorage.getItem("ars-theme") ||
    "light"
  );

  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      function () {

        const current =
          document.documentElement.dataset.theme ||
          "light";

        applyTheme(
          current === "dark"
            ? "light"
            : "dark"
        );

      }
    );

  }

  /* Back to top */

  const backToTop =
    document.getElementById(
      "backToTop"
    );

  window.addEventListener(
    "scroll",
    function () {

      if (!backToTop) return;

      backToTop.style.display =
        window.scrollY > 350
          ? "flex"
          : "none";

    }
  );

  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }

  openCertificateFromURL();

})();
