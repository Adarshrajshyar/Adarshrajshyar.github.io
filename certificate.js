/* =========================================================
   ARS OFFICIAL — CERTIFICATE ENGINE
   Adarsh Raj Shayar
   ========================================================= */

(function (window) {

  "use strict";


  /* =======================================================
     CONFIG HELPERS
     ======================================================= */

  function getConfig() {

    return window.ARS_CONFIG || {};

  }


  function getPublisher() {

    const config =
      getConfig();

    return (
      config.publisher &&
      config.publisher.name
    ) || "Adarsh Raj";

  }


  function getPublisherTitle() {

    const config =
      getConfig();

    return (
      config.publisher &&
      config.publisher.title
    ) || "Founder & Publisher";

  }


  function getOrganization() {

    const config =
      getConfig();

    return (
      config.publisher &&
      config.publisher.organization
    ) || "ARS Official";

  }


  function getLogo() {

    const config =
      getConfig();

    return (
      config.certificate &&
      config.certificate.logo
    ) ||
    (
      config.assets &&
      config.assets.logo
    ) ||
    "logo.png";

  }


  function getSignature() {

    const config =
      getConfig();

    return (
      config.certificate &&
      config.certificate.signature
    ) ||
    (
      config.assets &&
      config.assets.signature
    ) ||
    "signature.jpg";

  }


  function getVerificationPage() {

    const config =
      getConfig();

    return (
      config.certificate &&
      config.certificate.verificationPage
    ) || "verify.html";

  }


  /* =======================================================
     CERTIFICATE ID
     ======================================================= */

  function createCertificateID() {

    const config =
      getConfig();

    const prefix =
      (
        config.certificate &&
        config.certificate.idPrefix
      ) || "ARS-CERT";


    const timestamp =
      Date.now()
        .toString(36)
        .toUpperCase();


    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();


    return `${prefix}-${timestamp}-${random}`;

  }


  /* =======================================================
     DATE
     ======================================================= */

  function getDate() {

    return new Date()
      .toISOString();

  }


  /* =======================================================
     NORMALIZE TYPE
     ======================================================= */

  function normalizeType(type) {

    const allowed = [

      "Professional",

      "Business",

      "Achievement",

      "Participation"

    ];


    const value =
      String(type || "")
        .trim();


    const found =
      allowed.find(function (item) {

        return item.toLowerCase() ===
          value.toLowerCase();

      });


    return found || "Achievement";

  }


  /* =======================================================
     CREATE CERTIFICATE OBJECT
     ======================================================= */

  function create(data = {}) {

    if (!window.ARS_STORAGE) {

      throw new Error(
        "ARS Storage System is not loaded."
      );

    }


    const name =
      String(
        data.name || ""
      ).trim();


    if (!name) {

      throw new Error(
        "Certificate recipient name is required."
      );

    }


    const type =
      normalizeType(
        data.type
      );


    const issuedAt =
      data.issuedAt ||
      getDate();


    const certificate = {

      id:
        data.id ||
        createCertificateID(),

      name,

      type,

      issuedAt,

      publisher:
        data.publisher ||
        getPublisher(),

      publisherTitle:
        data.publisherTitle ||
        getPublisherTitle(),

      organization:
        data.organization ||
        getOrganization(),

      logo:
        data.logo ||
        getLogo(),

      signature:
        data.signature ||
        getSignature(),

      verificationPage:
        data.verificationPage ||
        getVerificationPage(),

      businessName:
        type === "Business"
          ? String(
              data.businessName || ""
            ).trim()
          : "",

      businessOwner:
        type === "Business"
          ? String(
              data.businessOwner || ""
            ).trim()
          : "",

      description:
        String(
          data.description || ""
        ).trim(),

      createdAt:
        data.createdAt ||
        issuedAt,

      updatedAt:
        getDate()

    };


    if (type === "Business") {

      if (!certificate.businessName) {

        throw new Error(
          "Business Name is required for Business Certificate."
        );

      }

      if (!certificate.businessOwner) {

        throw new Error(
          "Owner / Founder Name is required for Business Certificate."
        );

      }

    }


    return window.ARS_STORAGE
      .saveCertificate(
        certificate
      );

  }


  /* =======================================================
     FIND
     ======================================================= */

  function find(id) {

    if (!id) {
      return null;
    }


    return window.ARS_STORAGE
      .findCertificate(
        id
      );

  }


  /* =======================================================
     ALL CERTIFICATES
     ======================================================= */

  function all() {

    return window.ARS_STORAGE
      .certificates();

  }


  /* =======================================================
     DELETE
     ======================================================= */

  function remove(id) {

    return window.ARS_STORAGE
      .deleteCertificate(
        id
      );

  }


  /* =======================================================
     VERIFICATION URL
     ======================================================= */

  function getVerificationURL(id) {

    const page =
      getVerificationPage();


    const cleanID =
      encodeURIComponent(
        String(id || "").trim()
      );


    if (!cleanID) {
      return "";
    }


    const origin =
      window.location.origin;


    const basePath =
      window.location.pathname
        .split("/")
        .slice(0, -1)
        .join("/");


    const root =
      origin +
      (
        basePath
          ? basePath + "/"
          : "/"
      );


    return (
      root +
      page +
      "?id=" +
      cleanID
    );

  }


  /* =======================================================
     CERTIFICATE DATA FOR RENDERING
     ======================================================= */

  function getDisplayData(certificate) {

    if (!certificate) {
      return null;
    }


    const issued =
      new Date(
        certificate.issuedAt
      );


    let issueDate = "—";


    if (
      !Number.isNaN(
        issued.getTime()
      )
    ) {

      issueDate =
        issued.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }
        );

    }


    return {

      ...certificate,

      issueDate,

      verificationURL:
        getVerificationURL(
          certificate.id
        )

    };

  }


  /* =======================================================
     ESCAPE HTML
     ======================================================= */

  function escapeHTML(value) {

    const div =
      document.createElement(
        "div"
      );


    div.textContent =
      value ?? "";


    return div.innerHTML;

  }


  /* =======================================================
     CERTIFICATE HTML
     ======================================================= */

  function renderHTML(certificate) {

    const data =
      getDisplayData(
        certificate
      );


    if (!data) {
      return "";
    }


    const businessSection =
      data.type === "Business"

        ? `

          <div class="certificate-detail">

            <span>
              Business Name
            </span>

            <strong>
              ${escapeHTML(
                data.businessName
              )}
            </strong>

          </div>


          <div class="certificate-detail">

            <span>
              Owner / Founder
            </span>

            <strong>
              ${escapeHTML(
                data.businessOwner
              )}
            </strong>

          </div>

        `

        : "";


    return `

      <article class="ars-certificate">

        <div class="certificate-top">

          <img
            class="certificate-logo"
            src="${escapeHTML(
              data.logo
            )}"
            alt="ARS Official Logo"
          >

          <div>

            <div class="certificate-brand">
              ${escapeHTML(
                data.organization
              )}
            </div>

            <div class="certificate-publisher">
              ${escapeHTML(
                data.publisher
              )}
            </div>

          </div>

        </div>


        <div class="certificate-heading">

          <span>
            OFFICIAL CERTIFICATE
          </span>

          <h1>
            Certificate of ${escapeHTML(
              data.type
            )}
          </h1>

          <p>
            This certificate is proudly presented to
          </p>

        </div>


        <div class="certificate-recipient">

          ${escapeHTML(
            data.name
          )}

        </div>


        <div class="certificate-description">

          ${escapeHTML(
            data.description ||
            "This certificate is issued in recognition of the recipient and their contribution."
          )}

        </div>


        ${businessSection}


        <div class="certificate-meta">

          <div>

            <span>
              Certificate ID
            </span>

            <strong>
              ${escapeHTML(
                data.id
              )}
            </strong>

          </div>


          <div>

            <span>
              Issue Date
            </span>

            <strong>
              ${escapeHTML(
                data.issueDate
              )}
            </strong>

          </div>

        </div>


        <div class="certificate-footer">

          <div class="certificate-signature">

            <img
              src="${escapeHTML(
                data.signature
              )}"
              alt="Authorized Signature"
            >

            <strong>
              ${escapeHTML(
                data.publisher
              )}
            </strong>

            <span>
              ${escapeHTML(
                data.publisherTitle
              )}
            </span>

          </div>


          <div class="certificate-qr">

            <div
              class="certificate-qr-code"
              data-certificate-id="${escapeHTML(
                data.id
              )}"
              data-verification-url="${escapeHTML(
                data.verificationURL
              )}"
            ></div>

            <small>
              Scan to Verify
            </small>

          </div>

        </div>


        <div class="certificate-bottom">

          ${escapeHTML(
            data.organization
          )}

          •

          Certificate ID:

          ${escapeHTML(
            data.id
          )}

        </div>

      </article>

    `;

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.ARS_CERTIFICATE =
    Object.freeze({

      create,

      find,

      all,

      remove,

      createID:
        createCertificateID,

      verificationURL:
        getVerificationURL,

      displayData:
        getDisplayData,

      render:
        renderHTML,

      logo:
        getLogo,

      signature:
        getSignature,

      publisher:
        getPublisher,

      publisherTitle:
        getPublisherTitle

    });


  console.log(
    "🏆 ARS Certificate Engine Loaded"
  );


})(window);
