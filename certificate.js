/* =========================================================
   ARS OFFICIAL
   CERTIFICATE ENGINE
   Version 6.0
   ========================================================= */

(function (window) {

  "use strict";


  const STORAGE_KEY = "ARS_CERTIFICATES";


  /* ---------------------------------------------------------
     SAFE TEXT
     --------------------------------------------------------- */

  function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
  }


  /* ---------------------------------------------------------
     CREATE UNIQUE CERTIFICATE ID
     --------------------------------------------------------- */

  function generateCertificateID() {

    const now = new Date();

    const year = now.getFullYear();

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `ARS-CERT-${year}-${random}`;
  }


  /* ---------------------------------------------------------
     GET SAVED CERTIFICATES
     --------------------------------------------------------- */

  function getCertificates() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );

      return Array.isArray(data) ? data : [];

    } catch (error) {

      console.error(
        "ARS Certificate Storage Error:",
        error
      );

      return [];

    }

  }


  /* ---------------------------------------------------------
     SAVE CERTIFICATE
     --------------------------------------------------------- */

  function saveCertificate(certificate) {

    let certificates = getCertificates();

    const existingIndex =
      certificates.findIndex(
        item => item.id === certificate.id
      );


    if (existingIndex >= 0) {

      certificates[existingIndex] = certificate;

    } else {

      certificates.unshift(certificate);

    }


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(certificates)
    );


    /* Also connect with ARS storage system if available */

    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.saveCertificate === "function"
    ) {

      try {

        window.ARS_STORAGE.saveCertificate(certificate);

      } catch (error) {

        console.warn(
          "ARS_STORAGE certificate sync skipped:",
          error
        );

      }

    }


    return certificate;

  }


  /* ---------------------------------------------------------
     CREATE CERTIFICATE
     --------------------------------------------------------- */

  function createCertificate(data) {

    const certificate = {

      id:
        data.id ||
        generateCertificateID(),

      name:
        String(data.name || "").trim(),

      type:
        data.type ||
        "Achievement",

      businessName:
        String(data.businessName || "").trim(),

      businessOwner:
        String(data.businessOwner || "").trim(),

      issuedAt:
        data.issuedAt ||
        new Date().toISOString(),

      status:
        data.status ||
        "approved",

      issuer:
        "Adarsh Raj",

      organization:
        "ARS Official",

      verificationPage:
        "verify.html"

    };


    return saveCertificate(certificate);

  }


  /* ---------------------------------------------------------
     DATE FORMAT
     --------------------------------------------------------- */

  function formatDate(dateString) {

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {

      return "";

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


  /* ---------------------------------------------------------
     CERTIFICATE TITLE
     --------------------------------------------------------- */

  function getCertificateTitle(type) {

    const titles = {

      Achievement:
        "CERTIFICATE OF ACHIEVEMENT",

      Participation:
        "CERTIFICATE OF PARTICIPATION",

      Professional:
        "PROFESSIONAL CERTIFICATE",

      Business:
        "BUSINESS CERTIFICATE",

      Membership:
        "CERTIFICATE OF MEMBERSHIP"

    };


    return titles[type] ||
      "CERTIFICATE OF RECOGNITION";

  }


  /* ---------------------------------------------------------
     CERTIFICATE MESSAGE
     --------------------------------------------------------- */

  function getCertificateMessage(type) {

    const messages = {

      Achievement:
        "यह प्रमाणपत्र आपके उत्कृष्ट प्रयास, उपलब्धि और समर्पण के सम्मान में प्रदान किया जाता है।",

      Participation:
        "यह प्रमाणपत्र आपकी सक्रिय सहभागिता और उत्साहपूर्ण योगदान के सम्मान में प्रदान किया जाता है।",

      Professional:
        "यह प्रमाणपत्र आपके व्यावसायिक प्रयास, कौशल और समर्पण के सम्मान में प्रदान किया जाता है।",

      Business:
        "यह प्रमाणपत्र आपके व्यवसायिक प्रयास, नेतृत्व और रचनात्मक योगदान के सम्मान में प्रदान किया जाता है।",

      Membership:
        "ARS Official परिवार में आपके स्वागत एवं सदस्यता के सम्मान में यह प्रमाणपत्र प्रदान किया जाता है।"

    };


    return messages[type] ||
      "यह प्रमाणपत्र आपके सराहनीय प्रयास और योगदान के सम्मान में प्रदान किया जाता है।";

  }


  /* ---------------------------------------------------------
     VERIFICATION URL
     --------------------------------------------------------- */

  function getVerificationURL(id) {

    const base =
      window.location.href
        .split("?")[0]
        .split("#")[0]
        .replace(
          /certificate\.html.*$/i,
          ""
        );


    return (
      base +
      "verify.html?id=" +
      encodeURIComponent(id)
    );

  }


  /* ---------------------------------------------------------
     RENDER CERTIFICATE
     --------------------------------------------------------- */

  function renderCertificate(certificate, target) {

    if (!target || !certificate) {

      return;

    }


    const verificationURL =
      getVerificationURL(certificate.id);


    target.innerHTML = `

      <div class="certificate-preview">

        <div class="certificate-paper">


          <!-- TOP LOGOS -->

          <div class="certificate-top">

            <img
              class="certificate-logo certificate-logo-left"
              src="logo.png"
              alt="ARS Logo"
            >


            <div class="certificate-brand">

              <div class="certificate-small-brand">
                ARS OFFICIAL
              </div>

              <h1>
                ${getCertificateTitle(certificate.type)}
              </h1>

              <div class="certificate-line"></div>

            </div>


            <img
              class="certificate-logo certificate-logo-right"
              src="logo.png"
              alt="ARS Logo"
            >

          </div>


          <!-- INTRO -->

          <p class="certificate-presented">
            यह प्रमाणपत्र गर्वपूर्वक प्रदान किया जाता है
          </p>


          <!-- NAME -->

          <h2 class="certificate-recipient">
            ${escapeHTML(certificate.name)}
          </h2>


          <p class="certificate-message">

            ${getCertificateMessage(certificate.type)}

          </p>


          <!-- BUSINESS -->

          ${
            certificate.type === "Business"
              ? `

                <div class="certificate-business">

                  <p>
                    <strong>Business Name:</strong>
                    ${escapeHTML(certificate.businessName)}
                  </p>

                  <p>
                    <strong>Owner / Founder:</strong>
                    ${escapeHTML(certificate.businessOwner)}
                  </p>

                </div>

              `
              : ""
          }


          <!-- DETAILS -->

          <div class="certificate-details">

            <div>

              <span>
                Certificate ID
              </span>

              <strong>
                ${escapeHTML(certificate.id)}
              </strong>

            </div>


            <div>

              <span>
                Issue Date
              </span>

              <strong>
                ${formatDate(certificate.issuedAt)}
              </strong>

            </div>

          </div>


          <!-- BOTTOM -->

          <div class="certificate-bottom">


            <!-- SIGNATURE -->

            <div class="certificate-signature-box">

              <img
                src="signature.jpeg"
                alt="Adarsh Raj Signature"
                class="certificate-signature"
              >

              <div class="signature-line"></div>

              <strong>
                Adarsh Raj
              </strong>

              <span>
                Founder, ARS Official
              </span>

            </div>


            <!-- QR -->

            <div class="certificate-verification">

              <div
                id="qr-${certificate.id}"
                class="certificate-qr"
              ></div>

              <strong>
                Scan to Verify
              </strong>

              <span>
                QR Verification
              </span>

            </div>


          </div>


          <!-- WEBSITE -->

          <div class="certificate-website">

            ARS Official • Adarsh Raj Shayar

            <br>

            <span>
              ${escapeHTML(
                window.ARS_CONFIG?.SITE_URL ||
                window.location.origin
              )}
            </span>

          </div>


        </div>


        <!-- ACTION BUTTONS -->

        <div class="certificate-actions">

          <button
            type="button"
            class="btn"
            onclick="window.print()"
          >
            🖨 Print / Save PDF
          </button>


          <a
            class="btn"
            href="verify.html?id=${encodeURIComponent(certificate.id)}"
          >
            🔎 Verify Certificate
          </a>

        </div>


        <div class="certificate-success">

          ✅ Certificate successfully generated.

          <br>

          <small>
            Certificate ID:
            <strong>
              ${escapeHTML(certificate.id)}
            </strong>
          </small>

        </div>

      </div>

    `;


    /* -------------------------------------------------------
       GENERATE QR
       ------------------------------------------------------- */

    const qrContainer =
      document.getElementById(
        `qr-${certificate.id}`
      );


    if (!qrContainer) {

      return;

    }


    qrContainer.innerHTML = "";


    if (
      typeof window.QRCode !== "undefined"
    ) {

      new QRCode(
        qrContainer,
        {

          text: verificationURL,

          width: 120,

          height: 120,

          colorDark: "#111111",

          colorLight: "#ffffff",

          correctLevel:
            QRCode.CorrectLevel.H

        }
      );

    } else {

      qrContainer.innerHTML = `

        <div class="qr-error">

          QR loading...

        </div>

      `;

    }

  }


  /* ---------------------------------------------------------
     FIND CERTIFICATE
     --------------------------------------------------------- */

  function findCertificate(id) {

    const cleanID =
      String(id || "")
        .trim()
        .toLowerCase();


    if (!cleanID) {

      return null;

    }


    const certificates =
      getCertificates();


    return (
      certificates.find(
        certificate =>
          String(certificate.id)
            .toLowerCase() === cleanID
      ) ||
      null
    );

  }


  /* ---------------------------------------------------------
     PUBLIC API
     --------------------------------------------------------- */

  window.ARS_CERTIFICATE = {

    create:
      createCertificate,

    render:
      renderCertificate,

    find:
      findCertificate,

    getAll:
      getCertificates,

    generateID:
      generateCertificateID

  };


  console.log(
    "🏆 ARS Certificate Engine Loaded"
  );


})(window);
