/* =========================================================
   ARS CERTIFICATE SYSTEM
   ========================================================= */

"use strict";


window.ARS_CERTIFICATES = [];


function getCertificates() {

    try {

        return JSON.parse(
            localStorage.getItem(
                ARS_CONFIG.storage.certificates
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveCertificates(data) {

    localStorage.setItem(
        ARS_CONFIG.storage.certificates,
        JSON.stringify(data)
    );

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


function createCertificate(data) {

    const certificates =
        getCertificates();

    const certificate = {

        id: generateCertificateId(),

        name: data.name,

        type: data.type,

        businessName:
            data.businessName || "",

        ownerName:
            data.ownerName || "",

        approved: false,

        createdAt:
            new Date().toISOString()

    };


    certificates.push(certificate);

    saveCertificates(certificates);

    return certificate;

}


function findCertificate(id) {

    const certificates =
        getCertificates();

    return certificates.find(
        certificate =>
            certificate.id.toUpperCase() ===
            String(id).trim().toUpperCase()
    );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "certificateForm"
            );

        if (!form) return;


        const type =
            document.getElementById(
                "certificateType"
            );

        const businessFields =
            document.getElementById(
                "businessFields"
            );


        if (type && businessFields) {

            type.addEventListener(
                "change",
                () => {

                    businessFields.style.display =
                        type.value === "Business"
                            ? "grid"
                            : "none";

                }
            );

        }


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "certificateName"
                    )?.value.trim();


                const certificateType =
                    type?.value;


                if (!name || !certificateType) {

                    alert(
                        "कृपया Name और Certificate Type भरें।"
                    );

                    return;

                }


                const certificate =
                    createCertificate({

                        name,

                        type:
                            certificateType,

                        businessName:
                            document.getElementById(
                                "businessName"
                            )?.value.trim(),

                        ownerName:
                            document.getElementById(
                                "ownerName"
                            )?.value.trim()

                    });


                const result =
                    document.getElementById(
                        "certificateResult"
                    );


                if (result) {

                    result.innerHTML = `

                        <div class="content-card">

                            <h3>
                                Certificate Application Created
                            </h3>

                            <p>
                                आपका Certificate ID:
                            </p>

                            <strong>
                                ${certificate.id}
                            </strong>

                            <p>
                                Approval के बाद certificate
                                उपलब्ध होगा।
                            </p>

                        </div>

                    `;

                }

            }
        );


        console.log(
            "🏆 ARS Certificate System Loaded"
        );

    }
);


window.ARS_CERTIFICATE_API = {

    create: createCertificate,

    find: findCertificate,

    getAll: getCertificates

};
