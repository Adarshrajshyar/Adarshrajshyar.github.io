/* ==========================================
   Adarsh Raj Shayar
   Script Version 4.0
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // Welcome Popup
    // ==========================

    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (popup && enterBtn) {

        enterBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });

    }

    // ==========================
    // Current Year
    // ==========================

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ==========================
    // Dark / Light Mode
    // ==========================

    const darkBtn = document.getElementById("darkModeBtn");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }

    if (darkBtn) {

        updateThemeButton();

        darkBtn.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

            updateThemeButton();

        });

    }

    function updateThemeButton() {

        if (!darkBtn) return;

        darkBtn.innerHTML =
            document.body.classList.contains("light-mode")
                ? "🌙 Dark Mode"
                : "☀️ Light Mode";

    }

});

