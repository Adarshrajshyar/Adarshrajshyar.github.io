/* ARS Certificate Engine — Final */
(function (w) {
  "use strict";

  const CONFIG = w.ARS_CONFIG || {};
  const STORAGE = w.ARS_STORAGE;

  const esc = (value) => {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  };

  function createCertificate(data = {}) {
    if (!STORAGE) throw new Error("Storage.js not loaded.");

    const certificate = {
      id:
        data.id ||
        STORAGE.newId(
          data.type === "Membership" ? "ARS-MEMBER" : "ARS-CERT"
        ),
      name: String(data.name || "").trim(),
      type: data.type || "Achievement",
      businessName: String(data.businessName || "").trim(),
      businessOwner: String(data.businessOwner || "").trim(),
      status: data.status || "approved",
      issuedAt: data.issuedAt || new Date().toISOString(),
      issuer: "Adarsh Raj",
      organization: "ARS"
    };

    if (!certificate.name) {
      throw new Error("Certificate name is required.");
    }

    STORAGE.saveCertificate(certificate);
    return certificate;
  }

  function certificateMessage(c) {
    if (c.type === "Membership") {
      return `
        <strong>Congratulations!</strong><br>
        You are now a proud <b>Member of ARS</b>.<br>
        May your journey with ARS be filled with creativity,
        learning, confidence and memorable achievements.
      `;
    }

    if (c.type === "Business") {
      return `
        This certificate is proudly presented in recognition of
        the dedication, creativity and contribution represented by
        <b>${esc(c.businessName || "the business")}</b>.
      `;
    }

    if (c.type === "Professional") {
      return `
        This certificate recognizes your valuable effort,
        professionalism, dedication and contribution.
        Keep learning, keep creating and keep moving forward.
      `;
    }

    if (c.type === "Participation") {
      return `
        This certificate is presented in appreciation of your
        active participation, enthusiasm and valuable contribution.
      `;
    }

    return `
      This certificate is presented in recognition of your
      valuable effort, creativity, dedication and achievement.
      Keep growing and keep creating.
    `;
  }

  function verificationUrl(id) {
    const base = location.href.substring(0, location.href.lastIndexOf("/") + 1);
    return base + "verify.html?id=" + encodeURIComponent(id);
  }

  function render(certificate, target) {
    if (!target || !certificate) return;

    const verifyURL = verificationUrl(certificate.id);
    const date = new Date(certificate.issuedAt).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

    target.innerHTML = `
      <div class="certificate-preview">

        <div class="certificate-sheet">

          <div class="certificate-corner certificate-left">
            <img src="logo.png" alt="ARS Logo"
                 onerror="this.style.display='none'">
          </div>

          <div class="certificate-corner certificate-right">
            <img src="logo.png" alt="ARS Logo"
                 onerror="this.style.display='none'">
          </div>

          <div class="certificate-brand">
            <img src="logo.png"
                 class="certificate-logo"
                 alt="ARS Logo"
                 onerror="this.style.display='none'">

            <div>
              <div class="certificate-org">
                ${esc(CONFIG.SITE_NAME || "Adarsh Raj Shayar")}
              </div>

              <div class="certificate-subtitle">
                ARS OFFICIAL
              </div>
            </div>
          </div>

          <div class="certificate-banner">
            <img src="website.jpeg"
                 alt="ARS Website"
                 onerror="this.style.display='none'">
          </div>

          <div class="certificate-heading">
            <span class="certificate-small-title">
              ${certificate.type === "Membership"
                ? "MEMBERSHIP RECOGNITION"
                : "OFFICIAL RECOGNITION"}
            </span>

            <h1>
              ${
                certificate.type === "Membership"
                  ? "CERTIFICATE OF MEMBERSHIP"
                  : "CERTIFICATE OF " +
                    esc(certificate.type).toUpperCase()
              }
            </h1>

            <div class="certificate-line"></div>
          </div>

          <p class="certificate-presented">
            This certificate is proudly presented to
          </p>

          <h2 class="certificate-name">
            ${esc(certificate.name)}
          </h2>

          <div class="certificate-message">
            ${certificateMessage(certificate)}
          </div>

          ${
            certificate.type === "Business"
              ? `
                <div class="certificate-business">
                  <p>
                    <b>Business Name:</b>
                    ${esc(certificate.businessName)}
                  </p>

                  <p>
                    <b>Owner / Founder:</b>
                    ${esc(certificate.businessOwner)}
                  </p>
                </div>
              `
              : ""
          }

          <div class="certificate-quote">
            “Keep creating. Keep learning. Keep moving forward.”
          </div>

          <div class="certificate-meta">
            <div>
              <span>Certificate ID</span>
              <b>${esc(certificate.id)}</b>
            </div>

            <div>
              <span>Issue Date</span>
              <b>${esc(date)}</b>
            </div>
          </div>

          <div class="certificate-footer">

            <div class="certificate-signature-area">

              <img
                src="signature.jpeg"
                class="certificate-signature-image"
                alt="Adarsh Raj Signature"
                onerror="this.style.display='none'"
              >

              <div class="signature-fallback">
                Adarsh Raj
              </div>

              <div class="signature-line"></div>

              <strong>Adarsh Raj</strong>
              <span>Founder, ARS</span>

            </div>

            <div class="certificate-verification">

              <img
                class="certificate-qr"
                src="https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${encodeURIComponent(
                  verifyURL
                )}"
                alt="Certificate Verification QR"
              >

              <small>Scan to Verify</small>

            </div>

          </div>

          <div class="certificate-website">
            ${esc(
              CONFIG.WEBSITE_NAME ||
              CONFIG.SITE_NAME ||
              "Adarsh Raj Shayar"
            )}
          </div>

        </div>

        <div class="certificate-actions">
          <button type="button" onclick="window.print()">
            🖨 Print / Save PDF
          </button>

          <a href="${esc(verifyURL)}">
            🔎 Verify Certificate
          </a>
        </div>

      </div>
    `;

    const signature = target.querySelector(
      ".certificate-signature-image"
    );

    const fallback = target.querySelector(
      ".signature-fallback"
    );

    if (signature && fallback) {
      signature.addEventListener("load", () => {
        fallback.style.display = "none";
      });

      signature.addEventListener("error", () => {
        signature.style.display = "none";
        fallback.style.display = "block";
      });
    }
  }

  function generateFromForm(form, target) {
    const data = {
      name: form.querySelector("[name='name']")?.value,
      type: form.querySelector("[name='type']")?.value,
      businessName:
        form.querySelector("[name='businessName']")?.value,
      businessOwner:
        form.querySelector("[name='businessOwner']")?.value
    };

    const certificate = createCertificate(data);
    render(certificate, target);

    return certificate;
  }

  w.ARS_CERTIFICATE = {
    create: createCertificate,
    render,
    generateFromForm,
    verificationUrl
  };

  console.log("🏆 ARS Certificate Engine Loaded");
})(window);
