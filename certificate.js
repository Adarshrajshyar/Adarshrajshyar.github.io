"use strict";

/* =========================================================
   ARS CERTIFICATE SYSTEM
   Adarsh Raj Shayar Official
   ========================================================= */

(function () {

  const STORAGE_KEY = "ARS_NORMAL_CERTIFICATES";


  function getCertificates() {
    try {
      const data =
        JSON.parse(
          localStorage.getItem(STORAGE_KEY)
        );

      return Array.isArray(data) ? data : [];

    } catch (error) {
      console.error(
        "Certificate storage read error:",
        error
      );

      return [];
    }
  }


  function saveCertificates(data) {
    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      return true;

    } catch (error) {

      console.error(
        "Certificate storage save error:",
        error
      );

      return false;
    }
  }


  function generateCertificateId() {

    const time =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    return `ARS-CERT-${time}-${random}`;
  }


  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  function createCertificate(data) {

    if (!data || !data.name) {
      throw new Error(
        "Certificate name is required."
      );
    }


    const certificate = {

      id:
        data.id ||
        generateCertificateId(),

      name:
        String(data.name).trim(),

      type:
        String(
          data.type ||
          "Achievement"
        ).trim(),

      profession:
        String(
          data.profession || ""
        ).trim(),

      businessName:
        String(
          data.businessName || ""
        ).trim(),

      ownerName:
        String(
          data.ownerName || ""
        ).trim(),

      achievement:
        String(
          data.achievement || ""
        ).trim(),

      issuedDate:
        data.issuedDate ||
        new Date().toISOString(),

      issuer:
        "Adarsh Raj Shayar Official"

    };


    const certificates =
      getCertificates();


    const existing =
      certificates.findIndex(
        item =>
          item.id === certificate.id
      );


    if (existing >= 0) {

      certificates[existing] =
        certificate;

    } else {

      certificates.push(
        certificate
      );

    }


    if (!saveCertificates(certificates)) {
      throw new Error(
        "Certificate could not be saved."
      );
    }


    return certificate;
  }


  function getCertificate(id) {

    const cleanId =
      String(id || "")
        .trim()
        .toUpperCase();


    if (!cleanId) {
      return null;
    }


    return (
      getCertificates().find(
        certificate =>
          String(certificate.id)
            .toUpperCase() === cleanId
      ) || null
    );
  }


  function deleteCertificate(id) {

    const cleanId =
      String(id || "")
        .trim()
        .toUpperCase();


    const certificates =
      getCertificates();


    const filtered =
      certificates.filter(
        certificate =>
          String(certificate.id)
            .toUpperCase() !== cleanId
      );


    return saveCertificates(
      filtered
    );
  }


  function getAllCertificates() {
    return getCertificates();
  }


  /* -------------------------------------------------------
     Public ARS Certificate API
     ------------------------------------------------------- */

  window.ARSCertificate = {

    create:
      createCertificate,

    get:
      getCertificate,

    getAll:
      getAllCertificates,

    delete:
      deleteCertificate,

    generateId:
      generateCertificateId,

    escapeHTML:
      escapeHTML

  };


  /* -------------------------------------------------------
     Optional form integration
     ------------------------------------------------------- */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      const form =
        document.getElementById(
          "certificateForm"
        );


      if (!form) {
        return;
      }


      form.addEventListener(
        "submit",
        function (event) {

          event.preventDefault();


          const name =
            document.getElementById(
              "certificateName"
            )?.value.trim();


          const type =
            document.getElementById(
              "certificateType"
            )?.value.trim();


          const profession =
            document.getElementById(
              "profession"
            )?.value.trim();


          const businessName =
            document.getElementById(
              "businessName"
            )?.value.trim();


          const ownerName =
            document.getElementById(
              "ownerName"
            )?.value.trim();


          const achievement =
            document.getElementById(
              "achievement"
            )?.value.trim();


          if (!name) {

            alert(
              "कृपया नाम दर्ज करें।"
            );

            return;
          }


          try {

            const certificate =
              createCertificate({

                name,
                type,
                profession,
                businessName,
                ownerName,
                achievement

              });


            alert(
              "Certificate successfully created!\n\n" +
              "Certificate ID: " +
              certificate.id
            );


            form.reset();


            document.dispatchEvent(
              new CustomEvent(
                "arsCertificateCreated",
                {
                  detail: certificate
                }
              )
            );


          } catch (error) {

            console.error(error);

            alert(
              "Certificate बनाने में समस्या हुई।"
            );

          }

        }
      );

    }
  );

})();
