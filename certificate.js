/* =========================================================
   ARS OFFICIAL — CERTIFICATE ENGINE
   ========================================================= */

(function (window) {
  "use strict";

  function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : value;
    return div.innerHTML;
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );
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
        window.ARS_STORAGE.generateId(
          window.ARS_CONFIG.CERTIFICATE.PREFIX
        ),

      name:
        String(data.name).trim(),

      type:
        data.type || "Achievement",

      businessName:
        data.businessName || "",

      businessOwner:
        data.businessOwner || "",

      message:
        data.message || "",

      status:
        data.status || "approved",

      issuedAt:
        data.issuedAt ||
        new Date().toISOString(),

      issuer:
        window.ARS_CONFIG.FOUNDER,

      organization:
        window.ARS_CONFIG.SITE_NAME

    };

    window.ARS_STORAGE.saveCertificate(
      certificate
    );

    return certificate;
  }

  function certificateMessage(certificate) {

    if (
      certificate.type === "Membership" ||
      certificate.type === "Joining"
    ) {

      return `
        Congratulations, ${escapeHTML(
          certificate.name
        )}!<br><br>

        We are delighted to welcome you as a
        <strong>Member of ARS</strong>.

        May your journey with ARS be filled with
        creativity, learning, confidence and
        meaningful achievements.
      `;

    }

    if (certificate.type === "Achievement") {

      return `
        This certificate is proudly presented to
        <strong>${escapeHTML(
          certificate.name
        )}</strong>
        in recognition of dedication,
        creativity and achievement.
      `;

    }

    if (certificate.type === "Participation") {

      return `
        This certificate is proudly presented to
        <strong>${escapeHTML(
          certificate.name
        )}</strong>
        for valuable participation and sincere
        contribution.
      `;

    }

    if (certificate.type === "Professional") {

      return `
        This certificate recognizes
        <strong>${escapeHTML(
          certificate.name
        )}</strong>
        for professional effort, dedication and
        contribution.
      `;

    }

    if (certificate.type === "Business") {

      return `
        This certificate is proudly presented to
        <strong>${escapeHTML(
          certificate.name
        )}</strong>
        in recognition of entrepreneurial effort
        and business contribution.
      `;

    }

    return `
      This certificate is proudly presented to
      <strong>${escapeHTML(
        certificate.name
      )}</strong>
      in recognition of valuable contribution.
    `;
  }

  function verificationURL(id) {

    const base =
      window.location.href
        .split("/")
        .slice(0, -1)
        .join("/");

    return (
      base +
      "/verify.html?id=" +
      encodeURIComponent(id)
    );
  }

  function render(certificate, target) {

    if (!target) {
      throw new Error(
        "Certificate target element not found."
      );
    }

    const qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?" +
      "size=180x180&data=" +
      encodeURIComponent(
        verificationURL(certificate.id)
      );

    const websiteName =
      window.ARS_CONFIG.SITE_NAME;

    const logo =
      window.ARS_CONFIG.ASSETS.LOGO;

    const signature =
      window.ARS_CONFIG.ASSETS.SIGNATURE;

    const websiteImage =
      window.ARS_CONFIG.ASSETS.WEBSITE_IMAGE;

    const businessBlock =
      certificate.type === "Business"
        ? `
          <div class="certificate-business">
            <p>
              <strong>Business Name:</strong>
              ${escapeHTML(
                certificate.businessName
              )}
            </p>

            <p>
              <strong>Owner / Founder:</strong>
              ${escapeHTML(
                certificate.businessOwner
              )}
            </p>
          </div>
        `
        : "";

    target.innerHTML = `

      <div class="certificate-wrapper">

        <div
          class="certificate-sheet"
          id="arsCertificatePrint"
        >

          <!-- TOP BRANDING -->

          <div class="certificate-header">

            <img
              src="${logo}"
              class="certificate-logo left"
              alt="ARS Logo"
            >

            <div class="certificate-brand">

              <img
                src="${websiteImage}"
                class="certificate-website-image"
                alt="ARS"
              >

              <div class="certificate-brand-name">
                ${escapeHTML(websiteName)}
              </div>

              <div class="certificate-subtitle">
                OFFICIAL CERTIFICATE
              </div>

            </div>

            <img
              src="${logo}"
              class="certificate-logo right"
              alt="ARS Logo"
            >

          </div>

          <div class="certificate-divider">
            ✦ ✦ ✦
          </div>

          <!-- TITLE -->

          <div class="certificate-title">

            <div class="certificate-small-title">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </div>

            <h1>
              ${escapeHTML(
                certificate.name
              )}
            </h1>

            <div class="certificate-type">
              CERTIFICATE OF
              ${escapeHTML(
                certificate.type
              ).toUpperCase()}
            </div>

          </div>

          <!-- MESSAGE -->

          <div class="certificate-message">
            ${certificateMessage(
              certificate
            )}
          </div>

          ${businessBlock}

          ${
            certificate.message
              ? `
                <div class="certificate-custom-message">
                  ${escapeHTML(
                    certificate.message
                  )}
                </div>
              `
              : ""
          }

          <!-- DETAILS -->

          <div class="certificate-details">

            <span>
              <strong>Certificate ID</strong><br>
              ${escapeHTML(
                certificate.id
              )}
            </span>

            <span>
              <strong>Date of Issue</strong><br>
              ${formatDate(
                certificate.issuedAt
              )}
            </span>

          </div>

          <!-- FOOTER -->

          <div class="certificate-footer">

            <div class="certificate-signature">

              <img
                src="${signature}"
                alt="Adarsh Raj Signature"
                class="signature-image"
              >

              <div class="signature-line"></div>

              <strong>
                ${escapeHTML(
                  window.ARS_CONFIG.FOUNDER
                )}
              </strong>

              <small>
                Founder, ARS
              </small>

            </div>

            <div class="certificate-qr-box">

              <img
                src="${qrURL}"
                class="certificate-qr"
                alt="Certificate Verification QR"
              >

              <small>
                Scan to Verify
              </small>

            </div>

          </div>

          <div class="certificate-website">
            ${escapeHTML(
              websiteName
            )}
          </div>

        </div>

        <div class="certificate-actions">

          <button
            type="button"
            onclick="window.ARS_CERTIFICATE.print()"
          >
            🖨 Print / Save PDF
          </button>

          <a
            href="verify.html?id=${encodeURIComponent(
              certificate.id
            )}"
          >
            🔎 Verify Certificate
          </a>

        </div>

      </div>
    `;

  }

  function print() {

    window.print();

  }

  window.ARS_CERTIFICATE = {

    create: createCertificate,

    render,

    print

  };

  console.log(
    "🏆 ARS Certificate System Loaded"
  );

})(window);
