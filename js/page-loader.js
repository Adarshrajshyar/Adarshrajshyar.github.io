/*
 * =========================================================
 * ARS — Adarsh Ke Alfaz
 * Global Page Loader
 * =========================================================
 */

(function () {

    "use strict";

    function createLoader() {

        if (document.getElementById("arsPageLoader")) {
            return;
        }

        const loader = document.createElement("div");

        loader.id = "arsPageLoader";

        loader.innerHTML = `
            <div class="ars-loader-overlay">
                <div class="ars-loader-box">

                    <img
                        src="assets/logo.png"
                        alt="ARS Logo"
                        class="ars-loader-logo"
                    >

                    <div class="ars-loader-spinner"></div>

                    <p>ARS — Adarsh Ke Alfaz</p>

                </div>
            </div>
        `;

        document.body.prepend(loader);

        const style = document.createElement("style");

        style.textContent = `
            .ars-loader-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255,255,255,0.97);
                backdrop-filter: blur(4px);
            }

            .ars-loader-box {
                text-align: center;
                padding: 25px;
            }

            .ars-loader-logo {
                width: 75px;
                height: 75px;
                object-fit: contain;
                margin-bottom: 18px;
            }

            .ars-loader-spinner {
                width: 34px;
                height: 34px;
                margin: 0 auto 15px;
                border: 4px solid #d7e8e5;
                border-top-color: #0f766e;
                border-radius: 50%;
                animation: arsLoaderSpin 0.9s linear infinite;
            }

            .ars-loader-box p {
                margin: 0;
                font-weight: 600;
                font-size: 14px;
            }

            @keyframes arsLoaderSpin {
                from {
                    transform: rotate(0deg);
                }

                to {
                    transform: rotate(360deg);
                }
            }

            body.ars-page-ready
            #arsPageLoader {
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
        `;

        document.head.appendChild(style);
    }

    function hideLoader() {

        document.body.classList.add("ars-page-ready");

        setTimeout(function () {

            const loader =
                document.getElementById("arsPageLoader");

            if (loader) {
                loader.remove();
            }

        }, 350);
    }

    document.addEventListener("DOMContentLoaded", function () {

        createLoader();

        /*
         * Small delay prevents a flash on extremely fast
         * page loads while keeping navigation responsive.
         */
        setTimeout(hideLoader, 250);

    });

})();
