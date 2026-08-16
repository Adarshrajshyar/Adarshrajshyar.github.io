/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 1
   BASIC INITIALIZATION
===================================================== */

"use strict";

/* =========================
   PAGE LOAD
========================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Adarsh Raj Shayar — Script Loaded");

    /* ===== CURRENT YEAR ===== */

    const yearElements = document.querySelectorAll("#year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* ===== LOADER ===== */

    const loader = document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                loader.classList.add("loader-hide");

            }, 500);

        });

    }


    /* ===== BACK TO TOP BUTTON ===== */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                topBtn.style.display = "flex";
                topBtn.style.alignItems = "center";
                topBtn.style.justifyContent = "center";

            } else {

                topBtn.style.display = "none";

            }

        });


        topBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ===== SCROLL PROGRESS BAR ===== */

    const progressBar = document.getElementById("progressBar");

    if (progressBar) {

        window.addEventListener("scroll", function () {

            const scrollTop = window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            progressBar.style.width = progress + "%";

        });

    }

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 2
   WELCOME POPUP + DARK/LIGHT MODE + MENU
===================================================== */


/* =========================
   WELCOME POPUP
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const welcomePopup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (welcomePopup && enterBtn) {

        // Check whether visitor has already entered
        const alreadyEntered =
            localStorage.getItem("adarshRajEntered");

        if (alreadyEntered === "true") {

            welcomePopup.style.display = "none";

        } else {

            welcomePopup.style.display = "flex";

        }


        enterBtn.addEventListener("click", function () {

            localStorage.setItem(
                "adarshRajEntered",
                "true"
            );

            welcomePopup.style.opacity = "0";

            setTimeout(function () {

                welcomePopup.style.display = "none";

            }, 350);

        });

    }


    /* =========================
       DARK / LIGHT MODE
    ========================= */

    const darkModeBtn =
        document.getElementById("darkModeBtn");

    const savedTheme =
        localStorage.getItem("adarshRajTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    }


    function updateThemeButton() {

        if (!darkModeBtn) return;

        if (document.body.classList.contains("light-mode")) {

            darkModeBtn.textContent = "🌙";

            darkModeBtn.title = "Dark Mode";

        } else {

            darkModeBtn.textContent = "☀️";

            darkModeBtn.title = "Light Mode";

        }

    }


    updateThemeButton();


    if (darkModeBtn) {

        darkModeBtn.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            localStorage.setItem(
                "adarshRajTheme",
                isLight ? "light" : "dark"
            );

            updateThemeButton();

        });

    }


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const nav =
        document.querySelector("nav");

    const overlay =
        document.getElementById("overlay");


    function openMenu() {

        if (nav) {
            nav.classList.add("menu-open");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );
        }

    }


    function closeMenu() {

        if (nav) {
            nav.classList.remove("menu-open");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }


    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            if (
                nav &&
                nav.classList.contains("menu-open")
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =========================
       CLOSE MENU AFTER NAV CLICK
    ========================= */

    if (nav) {

        const navLinks =
            nav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }

});
