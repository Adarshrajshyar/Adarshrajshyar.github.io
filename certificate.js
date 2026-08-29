/* =========================================================
   ARS CERTIFICATE SYSTEM — FINAL
   ========================================================= */
(function (window) {
  "use strict";

  const CONFIG = window.ARS_CONFIG || {};
  const STORAGE = window.ARS_STORAGE;

  function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  }

  function createCertificate(data = {}) {

    if (!data.name || !String(data.name).trim()) {
      throw new Error("Name is required.");
    }

    const isJoining =
      data.type === "Membership" ||
      data.type === "Joining";

    const certificate = {
      id:
        data.id ||
        STORAGE.newId(
          isJoining ? "ARS-MEMBER" : "ARS-CERT"
        ),

      name: String(data.name).trim(),

      type:
        isJoining
          ? "Membership"
          : String(data.type || "Achievement"),

      businessName:
        String(data.businessName || "").trim(),

      businessOwner:
        String(data.businessOwner || "").trim(),

      status:
        data.status || "approved",

      issuedAt:
        data.issuedAt ||
        new Date().toISOString(),

      issuer:
        data.issuer || "Adarsh Raj",

      organization:
        data.organization || "ARS Official",

      website:
        CONFIG.WEBSITE_URL ||
        "https://adarshrajshyar.github.io/"
    };

    STORAGE.saveCertificate(certificate);

    return certificate;
  }

  function getMessage(certificate) {

    if (certificate.type === "Membership") {
      return `
        Congratulations, <strong>${escapeHTML(certificate.name)}</strong>!
        <br><br>
        You are now a proud <strong>Member of ARS</strong>.
        May your journey with ARS be filled with creativity,
        learning, confidence and wonderful achievements.
      `;
    }

    if (certificate.type === "Business") {
      return `
        This certificate is proudly presented to
        <strong>${escapeHTML(certificate.name)}</strong>
        in recognition of their valuable contribution,
        dedication and achievement.
      `;
    }

    if (certificate.type === "Participation") {
      return `
        This certificate is proudly presented to
        <strong>${escapeHTML(certificate.name)}</strong>
        for active participation and valuable involvement
        in ARS activities.
      `;
    }

    if (certificate.type === "Professional") {
      return `
        This certificate is proudly presented to
        <strong>${escapeHTML(certificate.name)}</strong>
        in recognition of professional contribution,
        dedication and excellence.
      `;
    }

    return `
      This certificate is proudly presented to
      <strong>${escapeHTML(certificate.name)}</strong>
      in recognition of valuable effort, creativity,
      dedication and achievement.
    `;
  }

  function getTitle(certificate) {

    if (certificate.type === "Membership") {
      return "CERTIFICATE OF MEMBERSHIP";
    }

    return (
      "CERTIFICATE OF " +
      String(certificate.type)
        .toUpperCase()
    );
  }

  function getVerificationURL(id) {

    const base =
      CONFIG.WEBSITE_URL ||
      window.location.origin + "/";

    return (
      base.replace(/\/+$/, "") +
      "/verify.html?id=" +
      encodeURIComponent(id)
    );
  }

  function render(certificate, target) {

    if (!target || !certificate) {
      return;
    }

    const verificationURL =
      getVerificationURL(certificate.id);

    const logo =
      "logo.png";

    const signature =
      "signature.jpeg";

    const websiteImage =
      "website.jpeg";

    const banner =
      "banner.png";

    const qrURL =
      "https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=" +
      encodeURIComponent(verificationURL);

    target.innerHTML = `

      <div class="certificate-wrapper">

        <div class="certificate-sheet">

          <!-- TOP DECORATION -->

          <div class="certificate-top-image">
            <img
              src="${banner}"
              alt="ARS Banner"
              onerror="this.style.display='none'"
            >
          </div>

          <!-- HEADER -->

          <div class="certificate-header">

            <img
              class="certificate-logo left-logo"
              src="${logo}"
              alt="ARS Logo"
              onerror="this.style.display='none'"
            >

            <div class="certificate-heading">

              <div class="certificate-small-title">
                ARS OFFICIAL
              </div>

              <h1>
                ${getTitle(certificate)}
              </h1>

              <div class="certificate-line"></div>

            </div>

            <img
              class="certificate-logo right-logo"
              src="${logo}"
              alt="ARS Logo"
              onerror="this.style.display='none'"
            >

          </div>

          <!-- MAIN CONTENT -->

          <div class="certificate-content">

            <p class="certificate-presented">
              This certificate is proudly presented to
            </p>

            <h2 class="certificate-name">
              ${escapeHTML(certificate.name)}
            </h2>

            <div class="certificate-name-line"></div>

            <p class="certificate-message">
              ${getMessage(certificate)}
            </p>

            ${
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
                : ""
            }

            ${
              certificate.type === "Membership"
                ? `
                  <div class="member-highlight">
                    🌹 Proud Member of ARS 🌹
                  </div>
                `
                : ""
            }

            <p class="certificate-quote">
              "Keep creating, keep learning,
              and keep moving forward."
            </p>

          </div>

          <!-- DETAILS -->

          <div class="certificate-details">

            <div>
              <span>Certificate ID</span>
              <strong>
                ${escapeHTML(certificate.id)}
              </strong>
            </div>

            <div>
              <span>Issue Date</span>
              <strong>
                ${new Date(
                  certificate.issuedAt
                ).toLocaleDateString("en-IN")}
              </strong>
            </div>

          </div>

          <!-- FOOTER -->

          <div class="certificate-footer">

            <div class="certificate-signature">

              <img
                src="${signature}"
                alt="Adarsh Raj Signature"
                onerror="
                  this.style.display='none';
                  this.nextElementSibling.style.display='block';
                "
              >

              <div
                class="signature-fallback"
                style="display:none"
              >
                Adarsh Raj
              </div>

              <div class="signature-line"></div>

              <strong>
                Adarsh Raj
              </strong>

              <span>
                Founder, ARS
              </span>

            </div>

            <div class="certificate-website">

              <img
                src="${websiteImage}"
                alt="ARS Website"
                onerror="
                  this.style.display='none';
                  this.nextElementSibling.style.display='block';
                "
              >

              <span style="display:none">
                ${escapeHTML(
                  CONFIG.SITE_NAME ||
                  "Adarsh Raj Shayar"
                )}
              </span>

            </div>

            <div class="certificate-verification">

              <img
                src="${qrURL}"
                alt="Certificate Verification QR"
              >

              <small>
                Scan to Verify
              </small>

            </div>

          </div>

        </div>

        <!-- ACTIONS -->

        <div class="certificate-actions">

          <button
            type="button"
            onclick="window.print()"
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

  window.ARS_CERTIFICATE = {
    create: createCertificate,
    render: render,
    getVerificationURL
  };

  console.log(
    "🏆 ARS Certificate System Loaded"
  );

})(window);
