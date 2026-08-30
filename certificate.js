/* =========================================================
   ARS OFFICIAL — CERTIFICATE ENGINE
========================================================= */

(function () {

  "use strict";


  const form =
    document.getElementById("certificateForm");

  if (!form) return;


  const output =
    document.getElementById("certificateOutput");


  function generateID() {

    const year =
      new Date().getFullYear();


    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();


    return `ARS-CERT-${year}-${random}`;
  }


  function escapeHTML(value) {

    const div =
      document.createElement("div");

    div.textContent =
      value ?? "";

    return div.innerHTML;
  }


  function getDate() {

    return new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );
  }


  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const name =
        document
          .getElementById("certificateName")
          .value.trim();


      const type =
        document
          .getElementById("certificateType")
          .value;


      const businessName =
        document
          .getElementById("businessName")
          ?.value.trim() || "";


      const businessOwner =
        document
          .getElementById("businessOwner")
          ?.value.trim() || "";


      if (!name || !type) {

        alert("कृपया आवश्यक जानकारी भरें।");

        return;
      }


      if (
        type === "Business" &&
        (!businessName || !businessOwner)
      ) {

        alert(
          "Business Certificate के लिए Business Name और Owner / Founder आवश्यक है।"
        );

        return;
      }


      const id =
        generateID();


      const certificate = {

        id,

        name,

        type,

        businessName:
          type === "Business"
            ? businessName
            : "",

        businessOwner:
          type === "Business"
            ? businessOwner
            : "",

        issuedAt:
          new Date().toISOString(),

        issuedBy:
          "Adarsh Raj — Founder, ARS Official"

      };


      if (window.ARSStorage) {

        window.ARSStorage.saveCertificate(
          certificate
        );

      }


      renderCertificate(
        certificate
      );

    }
  );


  function renderCertificate(certificate) {

    const verifyURL =
      `${window.location.origin}${window.location.pathname.replace(
        "certificate.html",
        "verify.html"
      )}?id=${encodeURIComponent(certificate.id)}`;


    output.innerHTML = `

      <div
        id="printCertificate"
        style="
          max-width:900px;
          margin:auto;
          padding:45px;
          background:#fff;
          border:10px solid #8b1e3f;
          outline:2px solid #b88932;
          outline-offset:-20px;
          text-align:center;
          box-shadow:0 15px 45px rgba(0,0,0,.12);
        "
      >

        <img
          src="logo.png"
          alt="ARS Logo"
          style="
            width:85px;
            height:85px;
            object-fit:contain;
            margin:0 auto 12px;
          "
        >


        <div
          style="
            color:#b88932;
            font-size:12px;
            font-weight:900;
            letter-spacing:3px;
          "
        >
          ARS OFFICIAL
        </div>


        <h1
          style="
            margin:10px 0;
            color:#8b1e3f;
            font-size:42px;
          "
        >
          CERTIFICATE
        </h1>


        <p
          style="
            color:#666;
            font-size:15px;
          "
        >
          This certificate is proudly presented to
        </p>


        <h2
          style="
            margin:15px 0;
            font-size:34px;
            color:#171717;
          "
        >
          ${escapeHTML(certificate.name)}
        </h2>


        <p>
          for
          <strong>
            ${escapeHTML(certificate.type)}
          </strong>
          recognition by ARS Official.
        </p>


        ${
          certificate.type === "Business"
            ? `

              <p>
                <strong>Business:</strong>
                ${escapeHTML(certificate.businessName)}
              </p>

              <p>
                <strong>Owner / Founder:</strong>
                ${escapeHTML(certificate.businessOwner)}
              </p>

            `
            : ""
        }


        <div
          style="
            display:flex;
            justify-content:space-between;
            align-items:end;
            gap:20px;
            margin-top:45px;
            text-align:left;
          "
        >

          <div>

            <img
              src="signature.jpg"
              alt="Founder Signature"
              style="
                width:130px;
                height:55px;
                object-fit:contain;
              "
            >

            <div
              style="
                border-top:1px solid #555;
                padding-top:5px;
              "
            >
              Founder
            </div>

            <strong>
              Adarsh Raj
            </strong>

          </div>


          <div style="text-align:center;">

            <canvas
              id="certificateQR"
              width="110"
              height="110"
              style="
                border:5px solid white;
              "
            ></canvas>

            <small>
              Scan to Verify
            </small>

          </div>

        </div>


        <div
          style="
            margin-top:25px;
            padding-top:15px;
            border-top:1px solid #ddd;
            font-size:12px;
            color:#666;
          "
        >

          Certificate ID:
          <strong>
            ${escapeHTML(certificate.id)}
          </strong>

          <br>

          Issue Date:
          ${getDate()}

        </div>

      </div>


      <div
        style="
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
          margin-top:20px;
        "
      >

        <button
          class="primary-btn"
          onclick="window.print()"
        >
          🖨️ Print Certificate
        </button>


        <a
          class="outline-btn"
          href="${verifyURL}"
          target="_blank"
        >
          🔎 Verify Certificate
        </a>

      </div>
    `;


    createQR(
      document.getElementById("certificateQR"),
      verifyURL
    );

  }


  function createQR(canvas, text) {

    if (!canvas) return;


    const ctx =
      canvas.getContext("2d");


    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    /*
      Simple built-in visual QR placeholder.
      If qrcode.min.js is loaded in the project,
      use it through the global QRCode object.
    */

    if (
      window.QRCode &&
      typeof window.QRCode.toCanvas === "function"
    ) {

      window.QRCode.toCanvas(
        canvas,
        text,
        {
          width:110,
          margin:1
        }
      );

      return;
    }


    /*
      Fallback:
      clearly displays the verification ID
      instead of breaking the certificate.
    */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.fillStyle = "#111";

    ctx.font = "bold 11px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
      "VERIFY",
      canvas.width / 2,
      35
    );

    ctx.font = "9px Arial";

    const shortText =
      text.length > 20
        ? text.substring(text.length - 20)
        : text;


    ctx.fillText(
      shortText,
      canvas.width / 2,
      58
    );

    ctx.fillText(
      "ARS",
      canvas.width / 2,
      82
    );

  }


})();
