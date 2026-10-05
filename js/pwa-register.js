document.addEventListener("DOMContentLoaded", function () {

    /*
     * ARS PWA Service Worker Registration
     *
     * This file only registers the Service Worker.
     * No passwords, API keys or private credentials
     * should ever be stored here.
     */

    if (!("serviceWorker" in navigator)) {
        console.warn("Service Worker is not supported by this browser.");
        return;
    }

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("./service-worker.js", { scope: "./" })
            .then(function (registration) {

                console.log(
                    "ARS Service Worker registered successfully:",
                    registration.scope
                );

                registration.addEventListener(
                    "updatefound",
                    function () {

                        const newWorker =
                            registration.installing;

                        if (!newWorker) return;

                        newWorker.addEventListener(
                            "statechange",
                            function () {

                                if (
                                    newWorker.state === "installed" &&
                                    navigator.serviceWorker.controller
                                ) {

                                    console.log(
                                        "A new ARS website version is available."
                                    );

                                }

                            }
                        );

                    }
                );

            })
            .catch(function (error) {

                console.error(
                    "ARS Service Worker registration failed:",
                    error
                );

            });

    });

});
