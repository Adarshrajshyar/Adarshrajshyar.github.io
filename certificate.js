/* =========================================================
   ARS CERTIFICATE SYSTEM
   File: certificate.js
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "ARS_CERTIFICATE_APPLICATIONS";
  const CERT_PREFIX = "ARS-CERT-";


  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */

  function getApplications() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
    } catch (error) {
      return [];
    }
  }


  function saveApplications(applications) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(applications)
    );
  }


  function createCertificateId() {
    const time = Date.now().toString().slice(-8);

    const random = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    return `${CERT_PREFIX}${time}-${random}`;
  }


  function today() {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }


  function typeTitle(type) {
    switch (type) {
      case "education":
        return "CERTIFICATE OF EDUCATION";

      case "achievement":
        return "CERTIFICATE OF ACHIEVEMENT";

      case "participation":
        return "CERTIFICATE OF PARTICIPATION";

      default:
        return "ARS CERTIFICATE";
    }
  }


  /* ---------------------------------------------------------
     Create application
  --------------------------------------------------------- */

  function createApplication(data) {

    const application = {
      id: createCertificateId(),

      name: String(data.name || "").trim(),

      email: String(data.email || "").trim(),

      type: data.type || "",

      activity: String(data.activity || "").trim(),

      description:
        String(data.description || "").trim(),

      className:
        String(data.className || "").trim(),

      subject:
        String(data.subject || "").trim(),

      status: "pending",

      approved: false,

      certificateIssued: false,

      joiningCertificateIssued: false,

      createdAt: new Date().toISOString(),

      approvedAt: null,

      approvedBy: null
    };


    const applications = getApplications();

    applications.push(application);

    saveApplications(applications);

    return application;
  }


  /* ---------------------------------------------------------
     Find certificate
  --------------------------------------------------------- */

  function findCertificate(id) {

    if (!id) return null;

    const applications = getApplications();

    return applications.find(function (item) {
      return item.id === id;
    }) || null;
  }


  /* ---------------------------------------------------------
     Approval
     
     Only authorized admin code should call this function.
     Frontend approval is NOT treated as secure production
     approval. Final approval belongs to backend/database.
  --------------------------------------------------------- */

  function approveCertificate(id, adminName) {

    const applications = getApplications();

    const index = applications.findIndex(
      function (item) {
        return item.id === id;
      }
    );


    if (index === -1) {
      return {
        success: false,
        message: "Certificate application not found."
      };
    }


    applications[index].status = "approved";

    applications[index].approved = true;

    applications[index].approvedAt =
      new Date().toISOString();

    applications[index].approvedBy =
      adminName || "ARS Admin";

    applications[index].certificateIssued = true;


    saveApplications(applications);


    return {
      success: true,
      certificate: applications[index]
    };
  }


  /* ---------------------------------------------------------
     Reject application
  --------------------------------------------------------- */

  function rejectCertificate(id, adminName, reason) {

    const applications = getApplications();

    const index = applications.findIndex(
      function (item) {
        return item.id === id;
      }
    );


    if (index === -1) {
      return {
        success: false,
        message: "Certificate application not found."
      };
    }


    applications[index].status = "rejected";

    applications[index].approved = false;

    applications[index].certificateIssued = false;

    applications[index].approvedBy =
      adminName || "ARS Admin";

    applications[index].rejectionReason =
      String(reason || "Not specified");


    saveApplications(applications);


    return {
      success: true,
      certificate: applications[index]
    };
  }


  /* ---------------------------------------------------------
     Joining Certificate
     
     IMPORTANT:
     Joining Certificate can be issued ONLY after approval.
  --------------------------------------------------------- */

  function issueJoiningCertificate(id) {

    const applications = getApplications();

    const index = applications.findIndex(
      function (item) {
        return item.id === id;
      }
    );


    if (index === -1) {
      return {
        success: false,
        message: "Application not found."
      };
    }


    const application = applications[index];


    if (
      application.status !== "approved" ||
      application.approved !== true
    ) {

      return {
        success: false,
        message:
          "Joining Certificate cannot be issued before approval."
      };
    }


    application.joiningCertificateIssued = true;

    application.joiningCertificateId =
      "ARS-JOIN-" +
      Date.now().toString().slice(-8) +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();


    application.joiningCertificateIssuedAt =
      new Date().toISOString();


    saveApplications(applications);


    return {
      success: true,
      certificate: application
    };
  }


  /* ---------------------------------------------------------
     Generate certificate preview
  --------------------------------------------------------- */

  function renderCertificate(application) {

    if (!application) return;


    const paper =
      document.getElementById("certificatePaper");

    if (!paper) return;


    const typeElement =
      document.getElementById("previewType");

    const nameElement =
      document.getElementById("previewName");

    const descriptionElement =
      document.getElementById("previewDescription");

    const idElement =
      document.getElementById("previewId");

    const dateElement =
      document.getElementById("previewDate");


    if (typeElement) {
      typeElement.textContent =
        typeTitle(application.type);
    }


    if (nameElement) {
      nameElement.textContent =
        application.name;
    }


    if (descriptionElement) {

      let text =
        application.description ||
        application.activity ||
        "For participation in ARS Education.";

      if (
        application.type === "education" &&
        application.className
      ) {

        text +=
          " | " + application.className;

      }

      if (
        application.type === "education" &&
        application.subject
      ) {

        text +=
          " | Subject: " +
          application.subject;

      }


      descriptionElement.textContent = text;
    }


    if (idElement) {
      idElement.textContent =
        application.id;
    }


    if (dateElement) {

      dateElement.textContent =
        application.approvedAt
          ? new Date(
              application.approvedAt
            ).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric"
              }
            )
          : today();
    }


    paper.classList.add("show");
  }


  /* ---------------------------------------------------------
     Form integration
  --------------------------------------------------------- */

  function connectForm() {

    const form =
      document.getElementById("certificateForm");

    if (!form) return;


    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const data = {

          type:
            document.getElementById(
              "certificateType"
            )?.value,

          name:
            document.getElementById(
              "studentName"
            )?.value,

          email:
            document.getElementById(
              "email"
            )?.value,

          activity:
            document.getElementById(
              "activity"
            )?.value,

          description:
            document.getElementById(
              "description"
            )?.value,

          className:
            document.getElementById(
              "className"
            )?.value,

          subject:
            document.getElementById(
              "subject"
            )?.value
        };


        if (
          !data.type ||
          !data.name ||
          !data.email ||
          !data.activity
        ) {

          alert(
            "Please fill all required fields."
          );

          return;
        }


        const application =
          createApplication(data);


        renderCertificate(application);


        const statusBox =
          document.getElementById(
            "statusBox"
          );


        if (statusBox) {

          statusBox.innerHTML = `
            <strong>✅ Application Submitted</strong><br><br>

            Application ID:
            <strong>${application.id}</strong><br>

            Status:
            <strong>Pending Approval</strong><br><br>

            आपका application admin approval के लिए भेज दिया गया है।
            Approval के बाद ही official certificate और
            joining certificate issue किया जाएगा।
          `;

          statusBox.classList.add("show");
        }

      }
    );
  }


  /* ---------------------------------------------------------
     Certificate verification helper
  --------------------------------------------------------- */

  function verifyCertificate(id) {

    const certificate =
      findCertificate(id);


    if (!certificate) {

      return {
        valid: false,
        message: "Certificate not found."
      };

    }


    if (
      certificate.status !== "approved" ||
      certificate.certificateIssued !== true
    ) {

      return {
        valid: false,
        pending: true,
        message:
          "Certificate is not approved yet.",
        certificate: certificate
      };

    }


    return {
      valid: true,
      message:
        "Certificate verified successfully.",
      certificate: certificate
    };
  }


  /* ---------------------------------------------------------
     Public API
  --------------------------------------------------------- */

  window.ARS_Certificate = {

    getApplications:
      getApplications,

    createApplication:
      createApplication,

    findCertificate:
      findCertificate,

    approveCertificate:
      approveCertificate,

    rejectCertificate:
      rejectCertificate,

    issueJoiningCertificate:
      issueJoiningCertificate,

    verifyCertificate:
      verifyCertificate,

    renderCertificate:
      renderCertificate

  };


  /* ---------------------------------------------------------
     Start
  --------------------------------------------------------- */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      connectForm
    );

  } else {

    connectForm();

  }

})();
