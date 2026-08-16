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
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 3
   SHAYARI DISPLAY + SEARCH
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTS
    ========================= */

    const shayariContainer =
        document.getElementById("shayariContainer");

    const searchInput =
        document.getElementById("search");


    /* =========================
       CHECK DATABASE
    ========================= */

    if (
        typeof shayariData === "undefined" ||
        !Array.isArray(shayariData)
    ) {

        console.error(
            "❌ shayariData not found."
        );

        return;
    }


    /* =========================
       DISPLAY SHAYARI
    ========================= */

    function displayShayari(data) {

        if (!shayariContainer) {
            console.warn(
                "⚠️ #shayariContainer not found in HTML."
            );
            return;
        }


        shayariContainer.innerHTML = "";


        /* ===== NO RESULT ===== */

        if (!data.length) {

            shayariContainer.innerHTML = `
                <div class="card">
                    <h3>😔 कोई Shayari नहीं मिली</h3>

                    <p class="shayariText">
                        अपनी search बदलकर फिर कोशिश करें।
                    </p>
                </div>
            `;

            return;
        }


        /* ===== CREATE CARDS ===== */

        data.forEach(function (item, index) {

            const card =
                document.createElement("div");

            card.className = "card";


            card.innerHTML = `

                <h3>
                    ${escapeHTML(item.title || "✨ Shayari")}
                </h3>

                <p class="shayariText">
                    ${formatShayariText(item.text || "")}
                </p>

                <p class="author">
                    — ${escapeHTML(item.author || "Adarsh Raj")}
                </p>

                <div class="actionButtons">

                    <button
                        class="copyBtn"
                        data-index="${index}">
                        📋 Copy
                    </button>

                    <button
                        class="shareBtn"
                        data-index="${index}">
                        📤 Share
                    </button>

                </div>

            `;


            shayariContainer.appendChild(card);

        });


        /* ===== BUTTON EVENTS ===== */

        attachShayariButtons(data);

    }


    /* =========================
       FORMAT SHAYARI TEXT
    ========================= */

    function formatShayariText(text) {

        return escapeHTML(text)
            .replace(/\n/g, "<br>");
    }


    /* =========================
       ESCAPE HTML
    ========================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================
       COPY + SHARE BUTTONS
    ========================= */

    function attachShayariButtons(data) {

        const copyButtons =
            shayariContainer.querySelectorAll(
                ".copyBtn"
            );

        const shareButtons =
            shayariContainer.querySelectorAll(
                ".shareBtn"
            );


        /* ===== COPY ===== */

        copyButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const index =
                        Number(button.dataset.index);

                    const item = data[index];

                    if (!item) return;


                    const copyText =
                        `${item.text}\n\n— ${item.author || "Adarsh Raj"}`;


                    try {

                        await navigator.clipboard.writeText(
                            copyText
                        );

                        showToast(
                            "📋 Shayari copied!"
                        );

                    } catch (error) {

                        console.error(
                            "Copy failed:",
                            error
                        );

                        showToast(
                            "❌ Copy नहीं हो पाया"
                        );

                    }

                }
            );

        });


        /* ===== SHARE ===== */

        shareButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const index =
                        Number(button.dataset.index);

                    const item = data[index];

                    if (!item) return;


                    const shareText =
                        `${item.text}\n\n— ${item.author || "Adarsh Raj"}`;


                    if (
                        navigator.share
                    ) {

                        try {

                            await navigator.share({

                                title:
                                    item.title ||
                                    "Adarsh Raj Shayar",

                                text:
                                    shareText,

                                url:
                                    window.location.href

                            });

                        } catch (error) {

                            if (
                                error.name !==
                                "AbortError"
                            ) {

                                console.error(
                                    "Share failed:",
                                    error
                                );

                            }

                        }

                    } else {

                        try {

                            await navigator.clipboard.writeText(
                                shareText
                            );

                            showToast(
                                "📋 Share text copied!"
                            );

                        } catch (error) {

                            showToast(
                                "❌ Share नहीं हो पाया"
                            );

                        }

                    }

                }
            );

        });

    }


    /* =========================
       SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (!query) {

                    displayShayari(
                        shayariData
                    );

                    return;

                }


                const filtered =
                    shayariData.filter(
                        function (item) {

                            const text =
                                String(
                                    item.text || ""
                                ).toLowerCase();

                            const title =
                                String(
                                    item.title || ""
                                ).toLowerCase();

                            const author =
                                String(
                                    item.author || ""
                                ).toLowerCase();

                            const category =
                                String(
                                    item.category || ""
                                ).toLowerCase();


                            return (
                                text.includes(query) ||
                                title.includes(query) ||
                                author.includes(query) ||
                                category.includes(query)
                            );

                        }
                    );


                displayShayari(filtered);

            }
        );

    }


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        let toast =
            document.querySelector(".toast");


        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            setTimeout(function () {

                toast.classList.remove(
                    "show"
                );

            }, 2200);

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    displayShayari(
        shayariData
    );


    console.log(
        "🌹 Shayari Display Connected"
    );

    console.log(
        "📖 Shayari Loaded:",
        shayariData.length
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 4
   LIKE + FAVOURITE SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       STORAGE KEYS
    ========================= */

    const LIKE_KEY = "ars_like_shayari";
    const FAV_KEY = "ars_favourite_shayari";


    /* =========================
       GET SAVED DATA
    ========================= */

    function getStorage(key) {

        try {

            const data =
                localStorage.getItem(key);

            return data
                ? JSON.parse(data)
                : [];

        } catch (error) {

            console.error(
                "Storage read error:",
                error
            );

            return [];

        }

    }


    /* =========================
       SAVE DATA
    ========================= */

    function saveStorage(key, data) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "Storage save error:",
                error
            );

        }

    }


    /* =========================
       SHAYARI ID
    ========================= */

    function getShayariId(item, index) {

        return (
            item.category +
            "_" +
            index
        );

    }


    /* =========================
       ADD LIKE/FAV BUTTONS
    ========================= */

    function addInteractionButtons() {

        const cards =
            document.querySelectorAll(
                "#shayariContainer .card"
            );


        cards.forEach(function (card, index) {

            if (
                card.querySelector(
                    ".likeBtn"
                )
            ) {
                return;
            }


            const buttons =
                card.querySelector(
                    ".actionButtons"
                );

            if (!buttons) return;


            const likeBtn =
                document.createElement("button");

            likeBtn.className =
                "likeBtn";

            likeBtn.type = "button";

            likeBtn.innerHTML =
                "❤️ Like";


            const favBtn =
                document.createElement("button");

            favBtn.className =
                "favBtn";

            favBtn.type = "button";

            favBtn.innerHTML =
                "⭐ Favourite";


            buttons.appendChild(likeBtn);
            buttons.appendChild(favBtn);


            updateButtonState(
                card,
                index
            );


            /* =====================
               LIKE
            ===================== */

            likeBtn.addEventListener(
                "click",
                function () {

                    toggleLike(
                        index,
                        likeBtn
                    );

                }
            );


            /* =====================
               FAVOURITE
            ===================== */

            favBtn.addEventListener(
                "click",
                function () {

                    toggleFavourite(
                        index,
                        favBtn
                    );

                }
            );

        });

    }


    /* =========================
       LIKE
    ========================= */

    function toggleLike(index, button) {

        const likes =
            getStorage(LIKE_KEY);

        const position =
            likes.indexOf(index);


        if (position === -1) {

            likes.push(index);

            button.classList.add(
                "active"
            );

            button.innerHTML =
                "❤️ Liked";

            showInteractionToast(
                "❤️ Shayari liked!"
            );

        } else {

            likes.splice(
                position,
                1
            );

            button.classList.remove(
                "active"
            );

            button.innerHTML =
                "❤️ Like";

            showInteractionToast(
                "💔 Like removed"
            );

        }


        saveStorage(
            LIKE_KEY,
            likes
        );

    }


    /* =========================
       FAVOURITE
    ========================= */

    function toggleFavourite(
        index,
        button
    ) {

        const favourites =
            getStorage(FAV_KEY);

        const position =
            favourites.indexOf(index);


        if (position === -1) {

            favourites.push(index);

            button.classList.add(
                "active"
            );

            button.innerHTML =
                "⭐ Favourite";

            showInteractionToast(
                "⭐ Added to Favourite!"
            );

        } else {

            favourites.splice(
                position,
                1
            );

            button.classList.remove(
                "active"
            );

            button.innerHTML =
                "☆ Favourite";

            showInteractionToast(
                "☆ Removed from Favourite"
            );

        }


        saveStorage(
            FAV_KEY,
            favourites
        );

    }


    /* =========================
       UPDATE BUTTON STATE
    ========================= */

    function updateButtonState(
        card,
        index
    ) {

        const likes =
            getStorage(LIKE_KEY);

        const favourites =
            getStorage(FAV_KEY);


        const likeBtn =
            card.querySelector(
                ".likeBtn"
            );

        const favBtn =
            card.querySelector(
                ".favBtn"
            );


        if (
            likeBtn &&
            likes.includes(index)
        ) {

            likeBtn.classList.add(
                "active"
            );

            likeBtn.innerHTML =
                "❤️ Liked";

        }


        if (
            favBtn &&
            favourites.includes(index)
        ) {

            favBtn.classList.add(
                "active"
            );

            favBtn.innerHTML =
                "⭐ Favourite";

        }

    }


    /* =========================
       TOAST
    ========================= */

    function showInteractionToast(
        message
    ) {

        let toast =
            document.querySelector(
                ".toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.className =
                "toast";

            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );


        clearTimeout(
            toast._arsTimer
        );


        toast._arsTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                1800
            );

    }


    /* =========================
       CONNECT WITH SHAYARI
    ========================= */

    function connectInteractionSystem() {

        addInteractionButtons();


        const container =
            document.getElementById(
                "shayariContainer"
            );


        if (!container) return;


        const observer =
            new MutationObserver(
                function () {

                    addInteractionButtons();

                }
            );


        observer.observe(
            container,
            {
                childList: true,
                subtree: true
            }
        );

    }


    /* =========================
       START
    ========================= */

    connectInteractionSystem();


    console.log(
        "❤️ Like System Connected"
    );

    console.log(
        "⭐ Favourite System Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 5
   STORY & POETRY SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const storyContainer =
        document.getElementById("storyContainer");

    if (!storyContainer) {
        console.warn("⚠️ #storyContainer not found.");
        return;
    }

    if (
        typeof storyData === "undefined" ||
        !Array.isArray(storyData)
    ) {
        console.error("❌ storyData not found.");
        return;
    }


    /* =========================
       DISPLAY STORIES
    ========================= */

    function displayStories(data) {

        storyContainer.innerHTML = "";

        if (!data.length) {

            storyContainer.innerHTML = `
                <div class="card">
                    <h3>📖 कोई Story नहीं मिली</h3>

                    <p>
                        अभी यहाँ कोई Story या Poetry उपलब्ध नहीं है।
                    </p>
                </div>
            `;

            return;
        }


        data.forEach(function (story) {

            const card =
                document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <h3>
                    ${escapeHTML(
                        story.title || "📖 Story"
                    )}
                </h3>

                <p class="author">
                    — ${escapeHTML(
                        story.author || "Adarsh Raj"
                    )}
                </p>

                <p>
                    ${escapeHTML(
                        story.text || ""
                    ).replace(/\n/g, "<br>")}
                </p>

            `;

            storyContainer.appendChild(card);

        });

    }


    /* =========================
       SAFE TEXT
    ========================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    displayStories(storyData);


    console.log(
        "📖 Story & Poetry System Connected"
    );

    console.log(
        "📚 Stories Loaded:",
        storyData.length
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 6
   UI CONTROLS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTS
    ========================= */

    const darkModeBtn =
        document.getElementById("darkModeBtn");

    const menuBtn =
        document.getElementById("menuBtn");

    const overlay =
        document.getElementById("overlay");

    const nav =
        document.querySelector("nav");

    const topBtn =
        document.getElementById("topBtn");

    const progressBar =
        document.getElementById("progressBar");


    /* =================================================
       DARK MODE / LIGHT MODE
    ================================================= */

    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add(
                "light-mode"
            );

            if (darkModeBtn) {
                darkModeBtn.textContent =
                    "🌙 Dark";
            }

        } else {

            document.body.classList.remove(
                "light-mode"
            );

            if (darkModeBtn) {
                darkModeBtn.textContent =
                    "☀️ Light";
            }

        }

    }


    /* =========================
       LOAD SAVED THEME
    ========================= */

    let savedTheme =
        localStorage.getItem(
            "ars_theme"
        );


    if (
        savedTheme !== "light" &&
        savedTheme !== "dark"
    ) {

        savedTheme = "dark";

    }


    applyTheme(savedTheme);


    /* =========================
       THEME BUTTON
    ========================= */

    if (darkModeBtn) {

        darkModeBtn.addEventListener(
            "click",
            function () {

                const isLight =
                    document.body.classList.contains(
                        "light-mode"
                    );


                const newTheme =
                    isLight
                        ? "dark"
                        : "light";


                applyTheme(newTheme);


                localStorage.setItem(
                    "ars_theme",
                    newTheme
                );

            }
        );

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    function openMenu() {

        if (nav) {
            nav.classList.add("active");
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
            nav.classList.remove("active");
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

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        menuBtn.addEventListener(
            "click",
            function () {

                if (
                    nav &&
                    nav.classList.contains(
                        "active"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    /* =========================
       OVERLAY CLICK
    ========================= */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    }


    /* =========================
       NAV LINK CLICK
    ========================= */

    if (nav) {

        const navLinks =
            nav.querySelectorAll("a");


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMenu();

                    }
                );

            }
        );

    }


    /* =================================================
       SCROLL PROGRESS
    ================================================= */

    function updateProgress() {

        if (!progressBar) return;


        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const windowHeight =
            window.innerHeight;


        const scrollable =
            documentHeight -
            windowHeight;


        let progress = 0;


        if (scrollable > 0) {

            progress =
                (scrollTop / scrollable) *
                100;

        }


        progress =
            Math.min(
                100,
                Math.max(
                    0,
                    progress
                )
            );


        progressBar.style.width =
            progress + "%";

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

    function updateTopButton() {

        if (!topBtn) return;


        if (window.scrollY > 400) {

            topBtn.style.display =
                "flex";

            topBtn.style.alignItems =
                "center";

            topBtn.style.justifyContent =
                "center";

        } else {

            topBtn.style.display =
                "none";

        }

    }


    if (topBtn) {

        topBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =========================
       SCROLL EVENT
    ========================= */

    window.addEventListener(
        "scroll",
        function () {

            updateProgress();

            updateTopButton();

        },
        { passive: true }
    );


    /* =========================
       INITIAL STATE
    ========================= */

    updateProgress();

    updateTopButton();


    console.log(
        "🎨 Theme System Connected"
    );

    console.log(
        "📱 Mobile Menu System Connected"
    );

    console.log(
        "📊 Scroll Progress Connected"
    );

    console.log(
        "⬆️ Back To Top Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 7
   ADMIN LOGIN + LOGOUT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ADMIN SETTINGS
    ========================= */

    const ADMIN_PASSWORD = "ARS2026";
    const ADMIN_SESSION_KEY = "ars_admin_logged_in";


    /* =========================
       ELEMENTS
    ========================= */

    const adminLogin =
        document.getElementById("adminLogin");

    const adminPassword =
        document.getElementById("adminPassword");

    const loginBtn =
        document.getElementById("loginBtn");


    /* =========================
       CREATE ADMIN STATUS
       (HTML बाद में जोड़ेंगे)
    ========================= */

    function createAdminControls() {

        if (!adminLogin) {
            console.warn(
                "⚠️ #adminLogin not found."
            );
            return;
        }


        let logoutBtn =
            document.getElementById(
                "adminLogoutBtn"
            );


        if (!logoutBtn) {

            logoutBtn =
                document.createElement(
                    "button"
                );

            logoutBtn.id =
                "adminLogoutBtn";

            logoutBtn.type =
                "button";

            logoutBtn.textContent =
                "🚪 Logout";

            logoutBtn.style.display =
                "none";

            adminLogin.appendChild(
                logoutBtn
            );

        }


        updateAdminState(
            logoutBtn
        );


        logoutBtn.addEventListener(
            "click",
            function () {

                logoutAdmin();

            }
        );

    }


    /* =========================
       LOGIN
    ========================= */

    function loginAdmin() {

        if (!adminPassword) {
            console.warn(
                "⚠️ #adminPassword not found."
            );
            return;
        }


        const enteredPassword =
            adminPassword.value.trim();


        if (!enteredPassword) {

            showAdminMessage(
                "⚠️ Password डालें।"
            );

            return;

        }


        if (
            enteredPassword ===
            ADMIN_PASSWORD
        ) {

            sessionStorage.setItem(
                ADMIN_SESSION_KEY,
                "true"
            );


            adminPassword.value =
                "";


            showAdminMessage(
                "✅ Admin Login Successful!"
            );


            updateAdminUI();

        } else {

            showAdminMessage(
                "❌ गलत Password!"
            );


            adminPassword.value =
                "";


            adminPassword.focus();

        }

    }


    /* =========================
       LOGOUT
    ========================= */

    function logoutAdmin() {

        sessionStorage.removeItem(
            ADMIN_SESSION_KEY
        );


        showAdminMessage(
            "🚪 Admin Logout Successful!"
        );


        updateAdminUI();

    }


    /* =========================
       LOGIN STATE
    ========================= */

    function isAdminLoggedIn() {

        return (
            sessionStorage.getItem(
                ADMIN_SESSION_KEY
            ) === "true"
        );

    }


    /* =========================
       UPDATE ADMIN UI
    ========================= */

    function updateAdminUI() {

        const loggedIn =
            isAdminLoggedIn();


        if (!adminLogin) return;


        const passwordInput =
            document.getElementById(
                "adminPassword"
            );

        const loginButton =
            document.getElementById(
                "loginBtn"
            );

        const logoutButton =
            document.getElementById(
                "adminLogoutBtn"
            );


        if (passwordInput) {

            passwordInput.style.display =
                loggedIn
                    ? "none"
                    : "";

        }


        if (loginButton) {

            loginButton.style.display =
                loggedIn
                    ? "none"
                    : "";

        }


        if (logoutButton) {

            logoutButton.style.display =
                loggedIn
                    ? "block"
                    : "none";

        }


        /* =====================
           ADMIN STATUS
        ===================== */

        let status =
            document.getElementById(
                "adminStatus"
            );


        if (!status) {

            status =
                document.createElement(
                    "p"
                );

            status.id =
                "adminStatus";

            adminLogin.appendChild(
                status
            );

        }


        if (loggedIn) {

            status.textContent =
                "🔐 Admin Mode Active";

            status.style.color =
                "#00c853";

        } else {

            status.textContent =
                "🔒 Admin Login Required";

            status.style.color =
                "#ffd700";

        }

    }


    /* =========================
       UPDATE STATE
    ========================= */

    function updateAdminState(
        logoutBtn
    ) {

        const loggedIn =
            isAdminLoggedIn();


        logoutBtn.style.display =
            loggedIn
                ? "block"
                : "none";

    }


    /* =========================
       ADMIN MESSAGE
    ========================= */

    function showAdminMessage(
        message
    ) {

        let messageBox =
            document.getElementById(
                "adminMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "p"
                );

            messageBox.id =
                "adminMessage";

            if (adminLogin) {

                adminLogin.appendChild(
                    messageBox
                );

            }

        }


        messageBox.textContent =
            message;


        messageBox.style.marginTop =
            "12px";

        messageBox.style.fontWeight =
            "600";

    }


    /* =========================
       LOGIN BUTTON
    ========================= */

    if (loginBtn) {

        loginBtn.addEventListener(
            "click",
            function () {

                loginAdmin();

            }
        );

    }


    /* =========================
       ENTER KEY LOGIN
    ========================= */

    if (adminPassword) {

        adminPassword.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    loginAdmin();

                }

            }
        );

    }


    /* =========================
       INITIAL STATE
    ========================= */

    updateAdminUI();


    console.log(
        "🔐 Admin Login System Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 8
   PUBLISHER PANEL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       STORAGE
    ========================= */

    const PUBLISHED_SHAYARI_KEY =
        "ars_published_shayari";


    /* =========================
       ELEMENTS
    ========================= */

    const publisherBox =
        document.querySelector(
            ".publisher-box"
        );

    const publishBtn =
        document.getElementById(
            "publishBtn"
        );


    /* =========================
       GET PUBLISHED SHAYARI
    ========================= */

    function getPublishedShayari() {

        try {

            const saved =
                localStorage.getItem(
                    PUBLISHED_SHAYARI_KEY
                );

            return saved
                ? JSON.parse(saved)
                : [];

        } catch (error) {

            console.error(
                "❌ Publisher storage error:",
                error
            );

            return [];

        }

    }


    /* =========================
       SAVE PUBLISHED SHAYARI
    ========================= */

    function savePublishedShayari(
        data
    ) {

        try {

            localStorage.setItem(
                PUBLISHED_SHAYARI_KEY,
                JSON.stringify(data)
            );

            return true;

        } catch (error) {

            console.error(
                "❌ Publisher save error:",
                error
            );

            return false;

        }

    }


    /* =========================
       ADMIN CHECK
    ========================= */

    function isAdminLoggedIn() {

        return (
            sessionStorage.getItem(
                "ars_admin_logged_in"
            ) === "true"
        );

    }


    /* =========================
       GET FORM VALUES
    ========================= */

    function getPublisherFields() {

        if (!publisherBox) {
            return null;
        }


        const inputs =
            publisherBox.querySelectorAll(
                "input"
            );

        const textarea =
            publisherBox.querySelector(
                "textarea"
            );

        const select =
            publisherBox.querySelector(
                "select"
            );


        return {

            title:
                inputs[0]
                    ? inputs[0].value.trim()
                    : "",

            author:
                inputs[1]
                    ? inputs[1].value.trim()
                    : "Adarsh Raj",

            text:
                textarea
                    ? textarea.value.trim()
                    : "",

            category:
                select
                    ? select.value
                    : "Love"

        };

    }


    /* =========================
       CLEAR FORM
    ========================= */

    function clearPublisherForm() {

        if (!publisherBox) return;


        publisherBox
            .querySelectorAll(
                "input, textarea"
            )
            .forEach(
                function (element) {

                    element.value = "";

                }
            );


        const select =
            publisherBox.querySelector(
                "select"
            );


        if (select) {

            select.selectedIndex = 0;

        }

    }


    /* =========================
       MESSAGE
    ========================= */

    function showPublisherMessage(
        message,
        success = true
    ) {

        let messageBox =
            document.getElementById(
                "publisherMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "p"
                );

            messageBox.id =
                "publisherMessage";


            if (publisherBox) {

                publisherBox.appendChild(
                    messageBox
                );

            }

        }


        messageBox.textContent =
            message;


        messageBox.style.marginTop =
            "15px";

        messageBox.style.textAlign =
            "center";

        messageBox.style.fontWeight =
            "600";

        messageBox.style.color =
            success
                ? "#00c853"
                : "#ff5252";

    }


    /* =========================
       PUBLISH SHAYARI
    ========================= */

    function publishShayari() {

        /* ADMIN CHECK */

        if (!isAdminLoggedIn()) {

            showPublisherMessage(
                "🔒 पहले Admin Login करें।",
                false
            );

            return;

        }


        const fields =
            getPublisherFields();


        if (!fields) {

            console.warn(
                "⚠️ Publisher panel not found."
            );

            return;

        }


        /* VALIDATION */

        if (!fields.text) {

            showPublisherMessage(
                "⚠️ Shayari लिखें।",
                false
            );

            return;

        }


        if (!fields.author) {

            fields.author =
                "Adarsh Raj";

        }


        /* CREATE OBJECT */

        const newShayari = {

            id:
                "ARS-" +
                Date.now(),

            title:
                fields.title ||
                "✨ New Shayari",

            author:
                fields.author,

            text:
                fields.text,

            category:
                fields.category ||
                "Love",

            publishedAt:
                new Date().toISOString()

        };


        /* GET OLD DATA */

        const published =
            getPublishedShayari();


        /* ADD NEW */

        published.push(
            newShayari
        );


        /* SAVE */

        const saved =
            savePublishedShayari(
                published
            );


        if (!saved) {

            showPublisherMessage(
                "❌ Shayari save नहीं हुई।",
                false
            );

            return;

        }


        /* SUCCESS */

        showPublisherMessage(
            "✅ Shayari Successfully Published!"
        );


        clearPublisherForm();


        console.log(
            "📝 New Shayari Published:",
            newShayari
        );

    }


    /* =========================
       PUBLISH BUTTON
    ========================= */

    if (publishBtn) {

        publishBtn.addEventListener(
            "click",
            function () {

                publishShayari();

            }
        );

    } else {

        console.warn(
            "⚠️ #publishBtn not found."
        );

    }


    /* =========================
       ADMIN STATE CHECK
    ========================= */

    function updatePublisherState() {

        if (!publisherBox) {
            return;
        }


        const loggedIn =
            isAdminLoggedIn();


        publisherBox.style.opacity =
            loggedIn
                ? "1"
                : "0.65";


        publisherBox.dataset.admin =
            loggedIn
                ? "active"
                : "locked";

    }


    updatePublisherState();


    /* =========================
       WATCH LOGIN CHANGES
    ========================= */

    setInterval(
        updatePublisherState,
        500
    );


    /* =========================
       CONSOLE
    ========================= */

    console.log(
        "📝 Publisher Panel Connected"
    );

    console.log(
        "💾 Saved Published Shayari:",
        getPublishedShayari().length
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 9
   CONNECT PUBLISHED SHAYARI WITH MAIN DATABASE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const STORAGE_KEY = "ars_published_shayari";

    /* =========================
       GET PUBLISHED DATA
    ========================= */

    function getPublishedShayari() {

        try {

            const data =
                localStorage.getItem(STORAGE_KEY);

            if (!data) {
                return [];
            }

            const parsed = JSON.parse(data);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "❌ Published Shayari read error:",
                error
            );

            return [];

        }

    }


    /* =========================
       CONNECT WITH SHAYARI DATA
    ========================= */

    function connectPublishedShayari() {

        const published =
            getPublishedShayari();

        if (
            typeof shayariData === "undefined"
        ) {

            console.warn(
                "⚠️ shayariData not found."
            );

            return;

        }


        /* =====================
           PREVENT DUPLICATES
        ===================== */

        const existingIds =
            new Set(
                shayariData
                    .map(item => item.id)
                    .filter(Boolean)
            );


        /* =====================
           ADD PUBLISHED ITEMS
        ===================== */

        published.forEach(
            function (item) {

                if (
                    item.id &&
                    existingIds.has(item.id)
                ) {

                    return;

                }


                shayariData.push({

                    id:
                        item.id ||
                        "ARS-" + Date.now(),

                    title:
                        item.title ||
                        "✨ Shayari",

                    author:
                        item.author ||
                        "Adarsh Raj",

                    text:
                        item.text ||
                        "",

                    category:
                        item.category ||
                        "Love",

                    publishedAt:
                        item.publishedAt ||
                        new Date().toISOString(),

                    source:
                        "publisher"

                });

            }
        );


        console.log(
            "🔗 Published Shayari Connected:",
            published.length
        );

        console.log(
            "📖 Total Shayari Available:",
            shayariData.length
        );

    }


    /* =========================
       CATEGORY HELPER
    ========================= */

    function getShayariByCategory(
        category
    ) {

        if (
            typeof shayariData === "undefined"
        ) {
            return [];
        }


        return shayariData.filter(
            function (item) {

                return (
                    String(item.category)
                        .toLowerCase() ===
                    String(category)
                        .toLowerCase()
                );

            }
        );

    }


    /* =========================
       SEARCH HELPER
    ========================= */

    function searchShayari(
        keyword
    ) {

        if (
            typeof shayariData === "undefined"
        ) {
            return [];
        }


        const searchText =
            String(keyword || "")
                .trim()
                .toLowerCase();


        if (!searchText) {

            return [
                ...shayariData
            ];

        }


        return shayariData.filter(
            function (item) {

                const text =
                    String(
                        item.text || ""
                    ).toLowerCase();

                const title =
                    String(
                        item.title || ""
                    ).toLowerCase();

                const author =
                    String(
                        item.author || ""
                    ).toLowerCase();

                const category =
                    String(
                        item.category || ""
                    ).toLowerCase();


                return (
                    text.includes(searchText) ||
                    title.includes(searchText) ||
                    author.includes(searchText) ||
                    category.includes(searchText)
                );

            }
        );

    }


    /* =========================
       MAKE HELPERS AVAILABLE
       ========================= */

    window.ARS = window.ARS || {};

    window.ARS.getShayariByCategory =
        getShayariByCategory;

    window.ARS.searchShayari =
        searchShayari;


    /* =========================
       CONNECT DATABASE
    ========================= */

    connectPublishedShayari();


    /* =========================
       CONSOLE TEST
    ========================= */

    console.log(
        "🔎 Search system connected."
    );

    console.log(
        "📂 Category system connected."
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 10
   SEARCH SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("search");

    if (!searchInput) {

        console.warn(
            "⚠️ Search input #search not found."
        );

        return;

    }


    /* =========================
       GET MAIN SHAYARI CONTAINER
    ========================= */

    const shayariContainer =
        document.querySelector(".cards");


    if (!shayariContainer) {

        console.warn(
            "⚠️ .cards container not found."
        );

        return;

    }


    /* =========================
       ORIGINAL CONTENT BACKUP
    ========================= */

    const originalContent =
        shayariContainer.innerHTML;


    /* =========================
       GET DATABASE
    ========================= */

    function getDatabase() {

        if (
            typeof shayariData !== "undefined" &&
            Array.isArray(shayariData)
        ) {

            return shayariData;

        }

        return [];

    }


    /* =========================
       ESCAPE HTML
    ========================= */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================
       CREATE CARD
    ========================= */

    function createSearchCard(item) {

        const title =
            escapeHTML(
                item.title ||
                "✨ Shayari"
            );

        const text =
            escapeHTML(
                item.text ||
                ""
            );

        const author =
            escapeHTML(
                item.author ||
                "Adarsh Raj"
            );

        const category =
            escapeHTML(
                item.category ||
                "Shayari"
            );


        return `
            <div class="card">

                <h3>${title}</h3>

                <p class="shayariText">
                    ${text.replace(/\n/g, "<br>")}
                </p>

                <p class="author">
                    — ${author}
                </p>

                <div class="actionButtons">

                    <button
                        type="button"
                        onclick="copyShayari(this)"
                    >
                        📋 Copy
                    </button>

                    <button
                        type="button"
                        onclick="shareShayari(this)"
                    >
                        📤 Share
                    </button>

                </div>

                <small
                    style="
                        display:block;
                        text-align:center;
                        margin-top:12px;
                        color:#aaa;
                    "
                >
                    ${category}
                </small>

            </div>
        `;

    }


    /* =========================
       NO RESULT
    ========================= */

    function showNoResult(keyword) {

        shayariContainer.innerHTML = `

            <div
                class="card"
                style="
                    grid-column:1/-1;
                    text-align:center;
                "
            >

                <h3>😔 Shayari नहीं मिली</h3>

                <p class="shayariText">
                    "${escapeHTML(keyword)}"
                    के लिए कोई Shayari नहीं मिली।
                </p>

                <button
                    type="button"
                    class="gold-btn"
                    onclick="
                        document.getElementById('search').value='';
                        document.getElementById('search').dispatchEvent(new Event('input'));
                    "
                >
                    🔄 सभी Shayari देखें
                </button>

            </div>

        `;

    }


    /* =========================
       SEARCH
    ========================= */

    function performSearch() {

        const keyword =
            searchInput.value
                .trim()
                .toLowerCase();


        /* EMPTY SEARCH */

        if (!keyword) {

            shayariContainer.innerHTML =
                originalContent;

            return;

        }


        const database =
            getDatabase();


        /* SEARCH */

        const results =
            database.filter(
                function (item) {

                    const text =
                        String(
                            item.text || ""
                        ).toLowerCase();

                    const title =
                        String(
                            item.title || ""
                        ).toLowerCase();

                    const author =
                        String(
                            item.author || ""
                        ).toLowerCase();

                    const category =
                        String(
                            item.category || ""
                        ).toLowerCase();


                    return (
                        text.includes(keyword) ||
                        title.includes(keyword) ||
                        author.includes(keyword) ||
                        category.includes(keyword)
                    );

                }
            );


        /* NO RESULT */

        if (!results.length) {

            showNoResult(
                searchInput.value.trim()
            );

            return;

        }


        /* SHOW RESULTS */

        shayariContainer.innerHTML =
            results
                .map(createSearchCard)
                .join("");


        console.log(
            "🔎 Search:",
            keyword,
            "| Results:",
            results.length
        );

    }


    /* =========================
       INPUT EVENT
    ========================= */

    searchInput.addEventListener(
        "input",
        performSearch
    );


    /* =========================
       ENTER KEY
    ========================= */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                performSearch();

            }

        }
    );


    /* =========================
       CLEAR SEARCH
    ========================= */

    searchInput.addEventListener(
        "search",
        function () {

            if (!searchInput.value) {

                performSearch();

            }

        }
    );


    console.log(
        "🔎 Part 10 Search System Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 11
   SHAYARI ACTION SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       TOAST SYSTEM
    ========================= */

    function showToast(message) {

        let toast =
            document.querySelector(".toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(
            window.arsToastTimer
        );

        window.arsToastTimer =
            setTimeout(function () {

                toast.classList.remove(
                    "show"
                );

            }, 2200);

    }


    /* =========================
       GET SHAYARI FROM CARD
    ========================= */

    function getCardShayari(button) {

        const card =
            button.closest(".card");

        if (!card) {
            return null;
        }


        const textElement =
            card.querySelector(
                ".shayariText"
            );

        const authorElement =
            card.querySelector(
                ".author"
            );


        if (!textElement) {
            return null;
        }


        const text =
            textElement.innerText.trim();

        const author =
            authorElement
                ? authorElement.innerText.trim()
                : "Adarsh Raj";


        return {
            text: text,
            author: author
        };

    }


    /* =========================
       COPY SHAYARI
    ========================= */

    window.copyShayari =
        async function (button) {

            const data =
                getCardShayari(button);

            if (!data) {

                showToast(
                    "❌ Shayari नहीं मिली"
                );

                return;

            }


            const copyText =
                data.text +
                "\n\n— " +
                data.author;


            try {

                await navigator.clipboard
                    .writeText(copyText);

                showToast(
                    "📋 Shayari Copied!"
                );

            } catch (error) {

                /* Fallback */

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.value =
                    copyText;

                document.body.appendChild(
                    textarea
                );

                textarea.select();

                try {

                    document.execCommand(
                        "copy"
                    );

                    showToast(
                        "📋 Shayari Copied!"
                    );

                } catch (err) {

                    showToast(
                        "❌ Copy नहीं हो पाया"
                    );

                }

                textarea.remove();

            }

        };


    /* =========================
       SHARE SHAYARI
    ========================= */

    window.shareShayari =
        async function (button) {

            const data =
                getCardShayari(button);

            if (!data) {

                showToast(
                    "❌ Shayari नहीं मिली"
                );

                return;

            }


            const shareText =
                data.text +
                "\n\n— " +
                data.author +
                "\n\n🌹 Adarsh Raj Shayar";


            /* MOBILE / SUPPORTED BROWSERS */

            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "Adarsh Raj Shayar",

                        text:
                            shareText,

                        url:
                            window.location.href

                    });

                    return;

                } catch (error) {

                    if (
                        error.name ===
                        "AbortError"
                    ) {

                        return;

                    }

                }

            }


            /* FALLBACK */

            try {

                await navigator.clipboard
                    .writeText(shareText);

                showToast(
                    "📋 Share text copied!"
                );

            } catch (error) {

                showToast(
                    "📤 Share उपलब्ध नहीं है"
                );

            }

        };


    /* =========================
       LIKE SYSTEM
    ========================= */

    document.addEventListener(
        "click",
        function (event) {

            const likeButton =
                event.target.closest(
                    ".likeBtn"
                );


            if (!likeButton) {
                return;
            }


            likeButton.classList.toggle(
                "active"
            );


            const liked =
                likeButton.classList.contains(
                    "active"
                );


            likeButton.textContent =
                liked
                    ? "❤️ Liked"
                    : "🤍 Like";


            showToast(
                liked
                    ? "❤️ Liked!"
                    : "🤍 Like removed"
            );

        }
    );


    /* =========================
       FAVOURITE SYSTEM
    ========================= */

    document.addEventListener(
        "click",
        function (event) {

            const favButton =
                event.target.closest(
                    ".favBtn"
                );


            if (!favButton) {
                return;
            }


            favButton.classList.toggle(
                "active"
            );


            const favourite =
                favButton.classList.contains(
                    "active"
                );


            favButton.textContent =
                favourite
                    ? "⭐ Favourite"
                    : "☆ Favourite";


            showToast(
                favourite
                    ? "⭐ Added to Favourite"
                    : "☆ Removed from Favourite"
            );

        }
    );


    /* =========================
       INITIAL ACTION BUTTONS
    ========================= */

    document
        .querySelectorAll(
            ".likeBtn"
        )
        .forEach(
            function (button) {

                if (
                    !button.textContent.trim()
                ) {

                    button.textContent =
                        "🤍 Like";

                }

            }
        );


    document
        .querySelectorAll(
            ".favBtn"
        )
        .forEach(
            function (button) {

                if (
                    !button.textContent.trim()
                ) {

                    button.textContent =
                        "☆ Favourite";

                }

            }
        );


    /* =========================
       GLOBAL TOAST
    ========================= */

    window.ARS =
        window.ARS || {};

    window.ARS.showToast =
        showToast;


    console.log(
        "❤️ Part 11 Action System Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 12
   LIKE & FAVOURITE SAVE SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const LIKE_KEY = "ars_liked_shayari";
    const FAV_KEY = "ars_favourite_shayari";


    /* =========================
       LOAD SAVED DATA
    ========================= */

    function loadData(key) {

        try {

            const data =
                localStorage.getItem(key);

            if (!data) {
                return [];
            }

            const parsed =
                JSON.parse(data);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "❌ Saved data error:",
                error
            );

            return [];

        }

    }


    /* =========================
       SAVE DATA
    ========================= */

    function saveData(key, data) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "❌ Save error:",
                error
            );

        }

    }


    /* =========================
       CREATE CARD ID
    ========================= */

    function getCardId(card) {

        if (!card) {
            return null;
        }


        const textElement =
            card.querySelector(
                ".shayariText"
            );


        const authorElement =
            card.querySelector(
                ".author"
            );


        if (!textElement) {
            return null;
        }


        const text =
            textElement.innerText
                .trim();

        const author =
            authorElement
                ? authorElement.innerText
                    .trim()
                : "Adarsh Raj";


        return btoa(
            unescape(
                encodeURIComponent(
                    text + "|" + author
                )
            )
        );

    }


    /* =========================
       RESTORE LIKE STATUS
    ========================= */

    function restoreLikes() {

        const liked =
            loadData(LIKE_KEY);


        document
            .querySelectorAll(
                ".card"
            )
            .forEach(
                function (card) {

                    const id =
                        getCardId(card);

                    if (!id) {
                        return;
                    }


                    const button =
                        card.querySelector(
                            ".likeBtn"
                        );

                    if (!button) {
                        return;
                    }


                    if (
                        liked.includes(id)
                    ) {

                        button.classList.add(
                            "active"
                        );

                        button.textContent =
                            "❤️ Liked";

                    }

                }
            );

    }


    /* =========================
       RESTORE FAVOURITES
    ========================= */

    function restoreFavourites() {

        const favourites =
            loadData(FAV_KEY);


        document
            .querySelectorAll(
                ".card"
            )
            .forEach(
                function (card) {

                    const id =
                        getCardId(card);

                    if (!id) {
                        return;
                    }


                    const button =
                        card.querySelector(
                            ".favBtn"
                        );

                    if (!button) {
                        return;
                    }


                    if (
                        favourites.includes(id)
                    ) {

                        button.classList.add(
                            "active"
                        );

                        button.textContent =
                            "⭐ Favourite";

                    }

                }
            );

    }


    /* =========================
       LIKE CLICK
    ========================= */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".likeBtn"
                );


            if (!button) {
                return;
            }


            const card =
                button.closest(".card");

            const id =
                getCardId(card);

            if (!id) {
                return;
            }


            let liked =
                loadData(LIKE_KEY);


            if (
                button.classList.contains(
                    "active"
                )
            ) {

                if (
                    !liked.includes(id)
                ) {

                    liked.push(id);

                }

            } else {

                liked =
                    liked.filter(
                        function (item) {

                            return item !== id;

                        }
                    );

            }


            saveData(
                LIKE_KEY,
                liked
            );

        }
    );


    /* =========================
       FAVOURITE CLICK
    ========================= */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".favBtn"
                );


            if (!button) {
                return;
            }


            const card =
                button.closest(".card");

            const id =
                getCardId(card);

            if (!id) {
                return;
            }


            let favourites =
                loadData(FAV_KEY);


            if (
                button.classList.contains(
                    "active"
                )
            ) {

                if (
                    !favourites.includes(id)
                ) {

                    favourites.push(id);

                }

            } else {

                favourites =
                    favourites.filter(
                        function (item) {

                            return item !== id;

                        }
                    );

            }


            saveData(
                FAV_KEY,
                favourites
            );

        }
    );


    /* =========================
       RESTORE AFTER LOAD
    ========================= */

    setTimeout(
        function () {

            restoreLikes();
            restoreFavourites();

        },
        100
    );


    /* =========================
       RESTORE AFTER SEARCH
    ========================= */

    const searchInput =
        document.getElementById("search");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                setTimeout(
                    function () {

                        restoreLikes();
                        restoreFavourites();

                    },
                    50
                );

            }
        );

    }


    console.log(
        "💾 Part 12 Like & Favourite Save System Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 13
   STORY & POETRY SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const STORY_KEY = "ars_published_stories";


    /* =========================
       LOAD STORIES
    ========================= */

    function loadStories() {

        try {

            const saved =
                localStorage.getItem(STORY_KEY);

            if (!saved) {
                return [];
            }

            const data =
                JSON.parse(saved);

            return Array.isArray(data)
                ? data
                : [];

        } catch (error) {

            console.error(
                "❌ Story loading error:",
                error
            );

            return [];

        }

    }


    /* =========================
       SAVE STORIES
    ========================= */

    function saveStories(stories) {

        try {

            localStorage.setItem(
                STORY_KEY,
                JSON.stringify(stories)
            );

            return true;

        } catch (error) {

            console.error(
                "❌ Story save error:",
                error
            );

            return false;

        }

    }


    /* =========================
       ESCAPE HTML
    ========================= */

    function escapeStoryHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================
       GET STORY CONTAINER
    ========================= */

    function getStoryContainer() {

        return document.getElementById(
            "storyContainer"
        );

    }


    /* =========================
       CREATE STORY CARD
    ========================= */

    function createStoryCard(story) {

        const title =
            escapeStoryHTML(
                story.title ||
                "Untitled Story"
            );

        const text =
            escapeStoryHTML(
                story.text ||
                ""
            );

        const author =
            escapeStoryHTML(
                story.author ||
                "Adarsh Raj"
            );

        const type =
            escapeStoryHTML(
                story.type ||
                "Story"
            );


        return `

            <article class="card story-card">

                <h3>
                    ${title}
                </h3>

                <p
                    style="
                        text-align:center;
                        color:#ffd700;
                        font-weight:600;
                        margin-bottom:12px;
                    "
                >
                    ${type}
                </p>

                <p>
                    ${text.replace(
                        /\n/g,
                        "<br>"
                    )}
                </p>

                <p
                    class="author"
                    style="margin-top:18px;"
                >
                    — ${author}
                </p>

            </article>

        `;

    }


    /* =========================
       DISPLAY STORIES
    ========================= */

    function renderStories() {

        const container =
            getStoryContainer();

        if (!container) {

            console.warn(
                "⚠️ #storyContainer not found."
            );

            return;

        }


        let stories =
            loadStories();


        /* =========================
           DATABASE STORIES
        ========================= */

        if (
            typeof storyData !==
            "undefined" &&
            Array.isArray(storyData)
        ) {

            stories = [
                ...storyData,
                ...stories
            ];

        }


        /* =========================
           NO STORIES
        ========================= */

        if (!stories.length) {

            container.innerHTML = `

                <div
                    class="card"
                    style="
                        grid-column:1/-1;
                        text-align:center;
                    "
                >

                    <h3>
                        📖 अभी कोई Story नहीं है
                    </h3>

                    <p>
                        जल्द ही Original Stories
                        और Poems यहाँ प्रकाशित होंगी।
                    </p>

                </div>

            `;

            return;

        }


        /* =========================
           SHOW STORIES
        ========================= */

        container.innerHTML =
            stories
                .map(createStoryCard)
                .join("");


        console.log(
            "📖 Stories displayed:",
            stories.length
        );

    }


    /* =========================
       PUBLISH STORY FUNCTION
    ========================= */

    window.publishStory =
        function (story) {

            if (
                !story ||
                typeof story !==
                "object"
            ) {

                console.warn(
                    "⚠️ Invalid story data."
                );

                return false;

            }


            const title =
                String(
                    story.title || ""
                ).trim();

            const text =
                String(
                    story.text || ""
                ).trim();


            if (!title || !text) {

                console.warn(
                    "⚠️ Story title/text missing."
                );

                return false;

            }


            const newStory = {

                id:
                    "STORY-" +
                    Date.now(),

                title:
                    title,

                text:
                    text,

                author:
                    String(
                        story.author ||
                        "Adarsh Raj"
                    ).trim(),

                type:
                    String(
                        story.type ||
                        "Story"
                    ).trim(),

                publishedAt:
                    new Date().toISOString()

            };


            const stories =
                loadStories();


            stories.unshift(
                newStory
            );


            if (
                saveStories(stories)
            ) {

                renderStories();

                console.log(
                    "📖 Story Published:",
                    newStory
                );

                return true;

            }


            return false;

        };


    /* =========================
       DELETE PUBLISHED STORY
    ========================= */

    window.deletePublishedStory =
        function (storyId) {

            if (!storyId) {
                return false;
            }


            let stories =
                loadStories();


            const before =
                stories.length;


            stories =
                stories.filter(
                    function (story) {

                        return story.id !==
                            storyId;

                    }
                );


            if (
                stories.length === before
            ) {

                return false;

            }


            saveStories(stories);

            renderStories();

            return true;

        };


    /* =========================
       STORY SEARCH
    ========================= */

    const storySearch =
        document.getElementById(
            "storySearch"
        );


    if (storySearch) {

        storySearch.addEventListener(
            "input",
            function () {

                const keyword =
                    storySearch.value
                        .trim()
                        .toLowerCase();


                const container =
                    getStoryContainer();


                if (!container) {
                    return;
                }


                let stories =
                    loadStories();


                if (
                    typeof storyData !==
                    "undefined" &&
                    Array.isArray(storyData)
                ) {

                    stories = [
                        ...storyData,
                        ...stories
                    ];

                }


                if (!keyword) {

                    renderStories();

                    return;

                }


                const results =
                    stories.filter(
                        function (story) {

                            return (

                                String(
                                    story.title ||
                                    ""
                                )
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                                ||

                                String(
                                    story.text ||
                                    ""
                                )
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                                ||

                                String(
                                    story.author ||
                                    ""
                                )
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                                ||

                                String(
                                    story.type ||
                                    ""
                                )
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                            );

                        }
                    );


                if (!results.length) {

                    container.innerHTML = `

                        <div
                            class="card"
                            style="
                                grid-column:1/-1;
                                text-align:center;
                            "
                        >

                            <h3>
                                😔 Story नहीं मिली
                            </h3>

                            <p>
                                "${escapeStoryHTML(
                                    storySearch.value
                                )}"
                                के लिए कोई result नहीं मिला।
                            </p>

                        </div>

                    `;

                    return;

                }


                container.innerHTML =
                    results
                        .map(createStoryCard)
                        .join("");

            }
        );

    }


    /* =========================
       INITIAL DISPLAY
    ========================= */

    renderStories();


    /* =========================
       GLOBAL STORY SYSTEM
    ========================= */

    window.ARS =
        window.ARS || {};

    window.ARS.stories = {

        load:
            loadStories,

        save:
            saveStories,

        render:
            renderStories,

        publish:
            window.publishStory,

        delete:
            window.deletePublishedStory

    };


    console.log(
        "📖 Part 13 Story & Poetry System Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 14
   DARK / LIGHT MODE SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const THEME_KEY = "ars_theme";

    const darkModeBtn =
        document.getElementById("darkModeBtn");


    /* =========================
       APPLY THEME
    ========================= */

    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add(
                "light-mode"
            );

            updateButton("light");

        } else {

            document.body.classList.remove(
                "light-mode"
            );

            updateButton("dark");

        }

    }


    /* =========================
       UPDATE BUTTON
    ========================= */

    function updateButton(theme) {

        if (!darkModeBtn) {
            return;
        }


        if (theme === "light") {

            darkModeBtn.innerHTML =
                "🌙 Dark Mode";

            darkModeBtn.setAttribute(
                "aria-label",
                "Switch to Dark Mode"
            );

        } else {

            darkModeBtn.innerHTML =
                "☀️ Light Mode";

            darkModeBtn.setAttribute(
                "aria-label",
                "Switch to Light Mode"
            );

        }

    }


    /* =========================
       SAVE THEME
    ========================= */

    function saveTheme(theme) {

        try {

            localStorage.setItem(
                THEME_KEY,
                theme
            );

        } catch (error) {

            console.error(
                "❌ Theme save error:",
                error
            );

        }

    }


    /* =========================
       GET SAVED THEME
    ========================= */

    function getSavedTheme() {

        try {

            const saved =
                localStorage.getItem(
                    THEME_KEY
                );

            if (
                saved === "light" ||
                saved === "dark"
            ) {

                return saved;

            }

        } catch (error) {

            console.error(
                "❌ Theme load error:",
                error
            );

        }


        return "dark";

    }


    /* =========================
       TOGGLE THEME
    ========================= */

    function toggleTheme() {

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );


        const newTheme =
            isLight
                ? "dark"
                : "light";


        applyTheme(newTheme);

        saveTheme(newTheme);


        if (
            window.ARS &&
            typeof window.ARS.showToast ===
            "function"
        ) {

            window.ARS.showToast(
                newTheme === "light"
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"
            );

        }

    }


    /* =========================
       BUTTON CLICK
    ========================= */

    if (darkModeBtn) {

        darkModeBtn.addEventListener(
            "click",
            toggleTheme
        );

    } else {

        console.warn(
            "⚠️ #darkModeBtn not found."
        );

    }


    /* =========================
       INITIAL THEME
    ========================= */

    const savedTheme =
        getSavedTheme();

    applyTheme(savedTheme);


    /* =========================
       GLOBAL THEME SYSTEM
    ========================= */

    window.ARS =
        window.ARS || {};

    window.ARS.theme = {

        apply:
            applyTheme,

        toggle:
            toggleTheme,

        get:
            getSavedTheme

    };


    console.log(
        "🌙 Part 14 Dark / Light Mode Connected"
    );

});
/* =====================================================
   ADARSH RAJ SHAYAR
   SCRIPT.JS — PART 15
   ADMIN LOGIN + LOGOUT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const ADMIN_PASSWORD = "ARS2026";
    const ADMIN_LOGIN_KEY = "ars_admin_logged_in";


    /* =========================
       ELEMENTS
    ========================= */

    const adminLogin =
        document.getElementById("adminLogin");

    const adminPassword =
        document.getElementById("adminPassword");

    const loginBtn =
        document.getElementById("loginBtn");


    /*
       These IDs will be added/used
       by the Admin Panel HTML later.
    */

    const adminPanel =
        document.getElementById("adminPanel");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =========================
       CHECK LOGIN
    ========================= */

    function isAdminLoggedIn() {

        try {

            return (
                localStorage.getItem(
                    ADMIN_LOGIN_KEY
                ) === "true"
            );

        } catch (error) {

            console.error(
                "❌ Admin login check error:",
                error
            );

            return false;

        }

    }


    /* =========================
       SAVE LOGIN
    ========================= */

    function saveLogin() {

        try {

            localStorage.setItem(
                ADMIN_LOGIN_KEY,
                "true"
            );

        } catch (error) {

            console.error(
                "❌ Admin login save error:",
                error
            );

        }

    }


    /* =========================
       CLEAR LOGIN
    ========================= */

    function clearLogin() {

        try {

            localStorage.removeItem(
                ADMIN_LOGIN_KEY
            );

        } catch (error) {

            console.error(
                "❌ Admin logout error:",
                error
            );

        }

    }


    /* =========================
       SHOW ADMIN PANEL
    ========================= */

    function showAdminPanel() {

        if (adminLogin) {

            adminLogin.style.display =
                "none";

        }


        if (adminPanel) {

            adminPanel.style.display =
                "block";

        }

    }


    /* =========================
       SHOW LOGIN
    ========================= */

    function showAdminLogin() {

        if (adminLogin) {

            adminLogin.style.display =
                "block";

        }


        if (adminPanel) {

            adminPanel.style.display =
                "none";

        }


        if (adminPassword) {

            adminPassword.value = "";

            adminPassword.focus();

        }

    }


    /* =========================
       LOGIN
    ========================= */

    function adminLoginFunction() {

        if (!adminPassword) {

            console.warn(
                "⚠️ #adminPassword not found."
            );

            return;

        }


        const enteredPassword =
            adminPassword.value.trim();


        if (!enteredPassword) {

            alert(
                "⚠️ Please enter admin password."
            );

            adminPassword.focus();

            return;

        }


        if (
            enteredPassword ===
            ADMIN_PASSWORD
        ) {

            saveLogin();

            showAdminPanel();


            if (
                window.ARS &&
                typeof window.ARS.showToast ===
                "function"
            ) {

                window.ARS.showToast(
                    "🔓 Admin Login Successful"
                );

            } else {

                alert(
                    "✅ Admin Login Successful"
                );

            }


            console.log(
                "🔓 Admin logged in"
            );

        } else {

            alert(
                "❌ Incorrect Admin Password"
            );

            adminPassword.value = "";

            adminPassword.focus();

            console.warn(
                "⚠️ Incorrect admin password"
            );

        }

    }


    /* =========================
       LOGOUT
    ========================= */

    function adminLogoutFunction() {

        clearLogin();

        showAdminLogin();


        if (
            window.ARS &&
            typeof window.ARS.showToast ===
            "function"
        ) {

            window.ARS.showToast(
                "🚪 Admin Logged Out"
            );

        } else {

            alert(
                "🚪 Admin Logged Out"
            );

        }


        console.log(
            "🚪 Admin logged out"
        );

    }


    /* =========================
       LOGIN BUTTON
    ========================= */

    if (loginBtn) {

        loginBtn.addEventListener(
            "click",
            adminLoginFunction
        );

    }


    /* =========================
       ENTER KEY LOGIN
    ========================= */

    if (adminPassword) {

        adminPassword.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    adminLoginFunction();

                }

            }
        );

    }


    /* =========================
       LOGOUT BUTTON
    ========================= */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            adminLogoutFunction
        );

    }


    /* =========================
       INITIAL STATE
    ========================= */

    if (isAdminLoggedIn()) {

        showAdminPanel();

    } else {

        showAdminLogin();

    }


    /* =========================
       GLOBAL ADMIN SYSTEM
    ========================= */

    window.ARS =
        window.ARS || {};

    window.ARS.admin = {

        login:
            adminLoginFunction,

        logout:
            adminLogoutFunction,

        isLoggedIn:
            isAdminLoggedIn

    };


    console.log(
        "🔐 Part 15 Admin Login System Connected"
    );

});
