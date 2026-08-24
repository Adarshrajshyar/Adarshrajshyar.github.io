/* ==========================================================
   ADARSH RAJ SHAYAR
   OFFICIAL WEBSITE
   script.js
   FINAL CLEAN PROFESSIONAL VERSION
   PART 1 / 2
========================================================== */


/* ==========================================================
   1. GLOBAL HELPERS
========================================================== */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    Array.from(document.querySelectorAll(selector));


/* ==========================================================
   2. WEBSITE CONFIGURATION
========================================================== */

const ARS_CONFIG = {

    VERSION: "3.0.0",

    AUTHOR: "Adarsh Raj",

    WEBSITE_NAME:
        "Adarsh Raj Shayar",

    ADMIN_SESSION:
        "ARS_ADMIN_LOGGED_IN",

    /*
       IMPORTANT:
       Frontend password is NOT secure authentication.
       For a static GitHub Pages website this is only
       a client-side admin gate.
    */

    ADMIN_PASSWORD:
        "Adarsh@2026",

    STORAGE: {

        CUSTOM_SHAYARI:
            "ARS_CUSTOM_SHAYARI",

        STORIES:
            "ARS_STORIES",

        LIKES:
            "ARS_LIKED_SHAYARI",

        FAVOURITES:
            "ARS_FAVOURITE_SHAYARI",

        THEME:
            "ARS_THEME",

        VISITOR:
            "ARS_VISITOR_COUNT",

        VISITOR_SEEN:
            "ARS_VISITOR_SEEN"

    }

};


/* ==========================================================
   3. GLOBAL DATA
========================================================== */

let customShayari = [];

let stories = [];

let likedShayari = [];

let favouriteShayari = [];


/* ==========================================================
   4. SAFE JSON PARSER
========================================================== */

function safeJSONParse(
    value,
    fallback = []
) {

    if (!value) {
        return fallback;
    }

    try {

        const parsed =
            JSON.parse(value);

        return parsed;

    } catch (error) {

        console.error(
            "JSON Parse Error:",
            error
        );

        return fallback;

    }

}


/* ==========================================================
   5. STORAGE SYSTEM
========================================================== */

const ARSStorage = {

    get(key, fallback = null) {

        try {

            const value =
                localStorage.getItem(key);

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {

            console.error(
                "Storage GET Error:",
                error
            );

            return fallback;

        }

    },


    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                "Storage SET Error:",
                error
            );

            return false;

        }

    },


    remove(key) {

        try {

            localStorage.removeItem(key);

            return true;

        } catch (error) {

            console.error(
                "Storage REMOVE Error:",
                error
            );

            return false;

        }

    }

};


/* ==========================================================
   6. LOAD SAVED DATA
========================================================== */

function loadSavedData() {

    const savedShayari =
        ARSStorage.get(
            ARS_CONFIG.STORAGE.CUSTOM_SHAYARI,
            []
        );

    const savedStories =
        ARSStorage.get(
            ARS_CONFIG.STORAGE.STORIES,
            []
        );

    const savedLikes =
        ARSStorage.get(
            ARS_CONFIG.STORAGE.LIKES,
            []
        );

    const savedFavourites =
        ARSStorage.get(
            ARS_CONFIG.STORAGE.FAVOURITES,
            []
        );


    customShayari =
        Array.isArray(savedShayari)
            ? savedShayari
            : [];


    stories =
        Array.isArray(savedStories)
            ? savedStories
            : [];


    likedShayari =
        Array.isArray(savedLikes)
            ? savedLikes
            : [];


    favouriteShayari =
        Array.isArray(savedFavourites)
            ? savedFavourites
            : [];

}


/* ==========================================================
   7. SAVE ALL DATA
========================================================== */

function saveAllData() {

    ARSStorage.set(
        ARS_CONFIG.STORAGE.CUSTOM_SHAYARI,
        customShayari
    );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.STORIES,
        stories
    );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.LIKES,
        likedShayari
    );

    ARSStorage.set(
        ARS_CONFIG.STORAGE.FAVOURITES,
        favouriteShayari
    );

}


/* ==========================================================
   8. TOAST NOTIFICATION
========================================================== */

function showToast(message) {

    let toast =
        document.getElementById(
            "arsToast"
        );

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "arsToast";

        toast.style.position =
            "fixed";

        toast.style.left =
            "50%";

        toast.style.bottom =
            "30px";

        toast.style.transform =
            "translateX(-50%)";

        toast.style.zIndex =
            "999999";

        toast.style.padding =
            "12px 20px";

        toast.style.borderRadius =
            "10px";

        toast.style.background =
            "rgba(20,20,20,.95)";

        toast.style.color =
            "#fff";

        toast.style.fontSize =
            "15px";

        toast.style.fontWeight =
            "600";

        toast.style.boxShadow =
            "0 8px 30px rgba(0,0,0,.25)";

        toast.style.maxWidth =
            "90%";

        toast.style.textAlign =
            "center";

        toast.style.opacity =
            "0";

        toast.style.pointerEvents =
            "none";

        toast.style.transition =
            "opacity .25s ease, transform .25s ease";

        document.body.appendChild(
            toast
        );

    }

    toast.textContent =
        message;

    toast.style.opacity =
        "1";

    toast.style.transform =
        "translateX(-50%) translateY(-5px)";

    clearTimeout(
        toast._timeout
    );

    toast._timeout =
        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateX(-50%) translateY(5px)";

            },
            2500
        );

}


/* ==========================================================
   9. CURRENT YEAR
========================================================== */

function initCurrentYear() {

    const elements =
        $$("[data-current-year]");

    const year =
        new Date().getFullYear();

    elements.forEach(
        element => {

            element.textContent =
                year;

        }
    );

    const footerYear =
        document.getElementById(
            "currentYear"
        );

    if (footerYear) {

        footerYear.textContent =
            year;

    }

}


/* ==========================================================
   10. LOADER
========================================================== */

function initLoader() {

    const loader =
        document.getElementById(
            "loader"
        );

    if (!loader) return;

    const hideLoader =
        () => {

            loader.classList.add(
                "hide"
            );

            setTimeout(
                () => {

                    loader.style.display =
                        "none";

                },
                500
            );

        };

    if (
        document.readyState ===
        "complete"
    ) {

        setTimeout(
            hideLoader,
            300
        );

    } else {

        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    hideLoader,
                    300
                );

            },
            {
                once: true
            }
        );

    }

}


/* ==========================================================
   11. WELCOME POPUP — FINAL
========================================================== */

function closeWelcomePopup() {

    const popup =
        document.getElementById(
            "welcomePopup"
        );

    if (!popup) return;

    popup.classList.remove(
        "show"
    );

    popup.style.display =
        "none";

    popup.hidden =
        true;

    document.body.classList.remove(
        "popup-open"
    );

    try {

        localStorage.setItem(
            "ars_visited",
            "true"
        );

    } catch (error) {

        console.warn(
            "Welcome popup storage error:",
            error
        );

    }

}


/* ==========================================================
   INITIALIZE WELCOME POPUP
========================================================== */

function initWelcomePopup() {

    const popup =
        document.getElementById(
            "welcomePopup"
        );

    if (!popup) {

        console.warn(
            "⚠️ Welcome Popup not found."
        );

        return;

    }


    /* ------------------------------------------------------
       ENTER WEBSITE BUTTON
    ------------------------------------------------------ */

    const enterButton =
        popup.querySelector(
            "#enterBtn, #enterWebsiteBtn, .enterWebsiteBtn"
        );


    /* ------------------------------------------------------
       CLOSE BUTTONS
    ------------------------------------------------------ */

    const closeButtons =
        popup.querySelectorAll(
            ".closePopup, #closeWelcomePopup, #closeWelcomeBtn, [data-close-popup]"
        );


    /* ------------------------------------------------------
       ENTER BUTTON CLICK
    ------------------------------------------------------ */

    if (enterButton) {

        enterButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "🚀 Enter Website clicked"
                );

                closeWelcomePopup();

            }
        );

    } else {

        console.warn(
            "⚠️ Enter Website button not found."
        );

    }


    /* ------------------------------------------------------
       CLOSE BUTTON CLICK
    ------------------------------------------------------ */

    closeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    closeWelcomePopup();

                }
            );

        }
    );


    /* ------------------------------------------------------
       CLICK OUTSIDE POPUP
    ------------------------------------------------------ */

    popup.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                popup
            ) {

                closeWelcomePopup();

            }

        }
    );


    /* ------------------------------------------------------
       SHOW POPUP
    ------------------------------------------------------ */

    let visited =
        false;

    try {

        visited =
            localStorage.getItem(
                "ars_visited"
            ) === "true";

    } catch (error) {

        visited =
            false;

    }


    if (visited) {

        popup.style.display =
            "none";

        popup.hidden =
            true;

        popup.classList.remove(
            "show"
        );

        document.body.classList.remove(
            "popup-open"
        );

        return;

    }


    /* ------------------------------------------------------
       FIRST VISIT
    ------------------------------------------------------ */

    popup.hidden =
        false;

    popup.style.display =
        "flex";

    popup.classList.add(
        "show"
    );

    document.body.classList.add(
        "popup-open"
    );

}

/* ==========================================================
   DARK / LIGHT MODE
   CLEAN PROFESSIONAL THEME SYSTEM
========================================================== */

function initTheme() {

    const themeButton =
        document.getElementById("themeToggle") ||
        document.getElementById("themeBtn") ||
        document.querySelector(
            "[data-theme-toggle], .themeToggle, .theme-btn"
        );

    const STORAGE_KEY =
        "ars_theme";

    function applyTheme(theme) {

        const isDark =
            theme === "dark";

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        document.body.classList.toggle(
            "dark-mode",
            isDark
        );

        document.body.classList.toggle(
            "light-mode",
            !isDark
        );

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );

        if (themeButton) {

            themeButton.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
            );

            themeButton.setAttribute(
                "title",
                isDark
                    ? "Light Mode"
                    : "Dark Mode"
            );

            themeButton.innerHTML =
                isDark
                    ? "☀️"
                    : "🌙";

        }

    }

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEY
        );

    const initialTheme =
        savedTheme === "dark"
            ? "dark"
            : "light";

    applyTheme(
        initialTheme
    );

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const current =
                    document.documentElement
                        .getAttribute(
                            "data-theme"
                        );

                applyTheme(
                    current === "dark"
                        ? "light"
                        : "dark"
                );

            }
        );

    }

}

/* ==========================================================
   13. MOBILE MENU
========================================================== */

function openMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );

    const toggle =
        document.getElementById(
            "menuToggle"
        );

    if (menu) {

        menu.classList.add(
            "open"
        );

        menu.classList.add(
            "active"
        );

    }

    if (overlay) {

        overlay.classList.add(
            "show"
        );

        overlay.classList.add(
            "active"
        );

    }

    if (toggle) {

        toggle.classList.add(
            "active"
        );

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    document.body.classList.add(
        "menu-open"
    );

}


function closeMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );

    const toggle =
        document.getElementById(
            "menuToggle"
        );

    if (menu) {

        menu.classList.remove(
            "open"
        );

        menu.classList.remove(
            "active"
        );

    }

    if (overlay) {

        overlay.classList.remove(
            "show"
        );

        overlay.classList.remove(
            "active"
        );

    }

    if (toggle) {

        toggle.classList.remove(
            "active"
        );

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    document.body.classList.remove(
        "menu-open"
    );

}


function initMobileMenu() {

    const toggle =
        document.getElementById(
            "menuToggle"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );

    if (toggle) {

        toggle.addEventListener(
            "click",
            () => {

                const menu =
                    document.getElementById(
                        "mobileMenu"
                    );

                const isOpen =
                    menu &&
                    (
                        menu.classList.contains(
                            "open"
                        ) ||
                        menu.classList.contains(
                            "active"
                        )
                    );

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "#mobileMenu a"
                );

            if (link) {

                closeMobileMenu();

            }

        }
    );

}


/* ==========================================================
   14. SMOOTH NAVIGATION
========================================================== */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            "a[href^='#']"
        );

    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !href ||
                        href === "#" ||
                        href === "#!"
                    ) {

                        return;

                    }

                    const target =
                        document.querySelector(
                            href
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                    closeMobileMenu();

                }
            );

        }
    );

}


/* ==========================================================
   15. SEARCH
========================================================== */

function initSearch() {

    const search =
        document.getElementById(
            "search"
        );

    if (!search) return;

    search.addEventListener(
        "input",
        () => {

            const keyword =
                search.value
                    .toLowerCase()
                    .trim();

            document
                .querySelectorAll(
                    ".card"
                )
                .forEach(card => {

                    const text =
                        card.innerText
                            .toLowerCase();

                    card.style.display =
                        text.includes(keyword)
                            ? ""
                            : "none";

                });

        }
    );

}


/* ==========================================================
   16. PROGRESS BAR
========================================================== */

function initProgressBar() {

    const bar =
        document.getElementById(
            "progressBar"
        );

    if (!bar) return;

    window.addEventListener(
        "scroll",
        () => {

            const documentHeight =
                document.documentElement
                    .scrollHeight;

            const windowHeight =
                document.documentElement
                    .clientHeight;

            const scrollTop =
                document.documentElement
                    .scrollTop;

            const total =
                documentHeight -
                windowHeight;

            const percent =
                total > 0
                    ? (scrollTop / total) * 100
                    : 0;

            bar.style.width =
                percent + "%";

        }
    );

}


/* ==========================================================
   17. BACK TO TOP
========================================================== */

function initBackToTop() {

    const btn =
        document.getElementById(
            "topBtn"
        );

    if (!btn) return;

    window.addEventListener(
        "scroll",
        () => {

            btn.style.display =
                window.scrollY > 350
                    ? "block"
                    : "none";

        }
    );

    btn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ==========================================================
   18. ACTIVE NAVIGATION
========================================================== */

function initActiveNavigation() {

    const sections =
        $$("section[id]");

    const links =
        $$("nav a");

    if (
        !sections.length ||
        !links.length
    ) return;

    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(
                section => {

                    if (
                        window.scrollY >=
                        section.offsetTop - 180
                    ) {

                        current =
                            section.id;

                    }

                }
            );

            links.forEach(
                link => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}


/* ==========================================================
   19. SHAYARI HELPERS
========================================================== */

function getBuiltInShayari() {

    return typeof shayariData !==
        "undefined"
        ? shayariData
        : [];

}


function getAllShayari() {

    return [
        ...getBuiltInShayari(),
        ...customShayari
    ];

}


/* ==========================================================
   20. ESCAPE HTML
========================================================== */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function formatText(value) {

    return escapeHTML(value)
        .replace(
            /\n/g,
            "<br>"
        );

}


/* ==========================================================
   21. SHAYARI CARD
========================================================== */

function createShayariCard(item) {

    const text =
        item.text || "";

    const title =
        item.title ||
        "Untitled Shayari";

    const author =
        item.author ||
        "Adarsh Raj";

    const date =
        item.date ||
        "";

    return `

        <div
            class="card shayari-card"
            data-shayari-text="${escapeHTML(text)}"
        >

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p class="shayariText">
                ${formatText(text)}
            </p>

            <div class="meta">

                <span>
                    ✍️ ${escapeHTML(author)}
                </span>

                ${
                    date
                    ? `
                    <span>
                        📅 ${escapeHTML(date)}
                    </span>
                    `
                    : ""
                }

            </div>

            <div class="actionButtons">

                <button
                    type="button"
                    class="copyBtn"
                >
                    📋 Copy
                </button>

                <button
                    type="button"
                    class="shareBtn"
                >
                    📤 Share
                </button>

                <button
                    type="button"
                    class="likeBtn"
                >
                    ❤️ Like
                </button>

                <button
                    type="button"
                    class="favBtn"
                >
                    ⭐ Favourite
                </button>

            </div>

        </div>

    `;

}


/* ==========================================================
   22. RENDER SHAYARI CATEGORY
========================================================== */

function renderCategory(
    category,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );

    if (!container) return;

    const list = [

        ...getBuiltInShayari()
            .filter(
                item =>
                    item.category ===
                    category
            ),

        ...customShayari
            .filter(
                item =>
                    item.category ===
                    category
            )

    ];

    container.innerHTML = "";

    if (!list.length) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    📖 No Shayari Available
                </h3>

            </div>

        `;

        return;

    }

    list.forEach(item => {

        container.insertAdjacentHTML(
            "beforeend",
            createShayariCard(item)
        );

    });

}


function loadAllShayari() {

    renderCategory(
        "Love",
        "loveContainer"
    );

    renderCategory(
        "Sad",
        "sadContainer"
    );

    renderCategory(
        "Attitude",
        "attitudeContainer"
    );

    renderCategory(
        "Friendship",
        "friendshipContainer"
    );

    renderCategory(
        "Motivation",
        "motivationContainer"
    );

    restoreShayariButtons();

}


/* ==========================================================
   23. COPY
========================================================== */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(
            text
        );

        showToast(
            "📋 Copied Successfully"
        );

    } catch {

        showToast(
            "❌ Copy Failed"
        );

    }

}


/* ==========================================================
   24. SHARE
========================================================== */

async function shareText(text) {

    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    ARS_CONFIG.WEBSITE_NAME,

                text: text,

                url:
                    window.location.href

            });

        } catch {

            /*
               User cancelled share.
            */

        }

    } else {

        copyText(text);

    }

}


/* ==========================================================
   25. LIKE
========================================================== */

function toggleLike(text) {

    const index =
        likedShayari.indexOf(
            text
        );

    if (index === -1) {

        likedShayari.push(
            text
        );

        showToast(
            "❤️ Liked"
        );

    } else {

        likedShayari.splice(
            index,
            1
        );

        showToast(
            "💔 Like Removed"
        );

    }

    ARSStorage.set(
        ARS_CONFIG.STORAGE.LIKES,
        likedShayari
    );

    updateStatistics();

}


/* ==========================================================
   26. FAVOURITE
========================================================== */

function toggleFavourite(text) {

    const index =
        favouriteShayari.indexOf(
            text
        );

    if (index === -1) {

        favouriteShayari.push(
            text
        );

        showToast(
            "⭐ Added to Favourite"
        );

    } else {

        favouriteShayari.splice(
            index,
            1
        );

        showToast(
            "❌ Favourite Removed"
        );

    }

    ARSStorage.set(
        ARS_CONFIG.STORAGE.FAVOURITES,
        favouriteShayari
    );

    loadFavourite();

    updateStatistics();

}


/* ==========================================================
   27. RESTORE SHAYARI BUTTONS
========================================================== */

function restoreShayariButtons() {

    document
        .querySelectorAll(
            ".shayari-card"
        )
        .forEach(card => {

            const text =
                card.querySelector(
                    ".shayariText"
                )?.innerText;

            if (!text) return;

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
                likedShayari.includes(
                    text
                )
            ) {

                likeBtn.classList.add(
                    "active"
                );

                likeBtn.innerHTML =
                    "💖 Liked";

            }

            if (
                favBtn &&
                favouriteShayari.includes(
                    text
                )
            ) {

                favBtn.classList.add(
                    "active"
                );

                favBtn.innerHTML =
                    "🌟 Saved";

            }

        });

}


/* ==========================================================
   28. FAVOURITE LIST
========================================================== */

function loadFavourite() {

    const container =
        document.getElementById(
            "favoriteList"
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        favouriteShayari.length === 0
    ) {

        container.innerHTML = `

            <div class="card">

                <p>
                    अभी कोई Favourite Shayari नहीं है।
                </p>

            </div>

        `;

        return;

    }

    favouriteShayari.forEach(
        text => {

            container.insertAdjacentHTML(
                "beforeend",
                `

                <div class="card">

                    <p class="shayariText">
                        ${formatText(text)}
                    </p>

                </div>

                `
            );

        }
    );

}


/* ==========================================================
   29. PUBLISHED SHAYARI
========================================================== */

function loadPublishedShayari() {

    const container =
        document.getElementById(
            "publishedContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        customShayari.length === 0
    ) {

        container.innerHTML = `

            <div class="card">

                <p>
                    अभी कोई Shayari Published नहीं है।
                </p>

            </div>

        `;

        return;

    }

    customShayari.forEach(
        (item, index) => {

            container.insertAdjacentHTML(
                "beforeend",

                `

                <div class="card">

                    <h3>
                        ${escapeHTML(
                            item.title
                        )}
                    </h3>

                    <p class="shayariText">
                        ${formatText(
                            item.text
                        )}
                    </p>

                    <div class="meta">

                        <span>
                            ✍️ ${escapeHTML(
                                item.author ||
                                "Unknown"
                            )}
                        </span>

                        <span>
                            📅 ${escapeHTML(
                                item.date ||
                                ""
                            )}
                        </span>

                    </div>

                    <div class="actionButtons">

                        <button
                            type="button"
                            class="editShayariBtn"
                            data-id="${index}"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            type="button"
                            class="deleteShayariBtn"
                            data-id="${index}"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

                `

            );

        }
    );

}


/* ==========================================================
   30. ADMIN LOGIN
========================================================== */

function isAdminLoggedIn() {

    return (
        sessionStorage.getItem(
            ARS_CONFIG.ADMIN_SESSION
        ) === "true"
    );

}


function setAdminSession(status) {

    sessionStorage.setItem(
        ARS_CONFIG.ADMIN_SESSION,
        status
            ? "true"
            : "false"
    );

}


function initAdmin() {

    const loginBox =
        document.getElementById(
            "adminLogin"
        );

    const panel =
        document.getElementById(
            "publisherPanel"
        );

    const password =
        document.getElementById(
            "adminPassword"
        );

    const loginBtn =
        document.getElementById(
            "loginBtn"
        );

    if (!loginBtn) return;

    updateAdminUI();

    loginBtn.addEventListener(
        "click",
        () => {

            const entered =
                password
                    ? password.value.trim()
                    : "";

            if (
                entered !==
                ARS_CONFIG.ADMIN_PASSWORD
            ) {

                showToast(
                    "❌ Wrong Password"
                );

                if (password) {
                    password.focus();
                }

                return;

            }

            setAdminSession(
                true
            );

            updateAdminUI();

            if (password) {
                password.value = "";
            }

            showToast(
                "✅ Admin Login Success"
            );

        }
    );

}


function updateAdminUI() {

    const loginBox =
        document.getElementById(
            "adminLogin"
        );

    const panel =
        document.getElementById(
            "publisherPanel"
        );

    if (
        isAdminLoggedIn()
    ) {

        if (loginBox) {

            loginBox.style.display =
                "none";

        }

        if (panel) {

            panel.style.display =
                "block";

        }

    } else {

        if (loginBox) {

            loginBox.style.display =
                "block";

        }

        if (panel) {

            panel.style.display =
                "none";

        }

    }

}


function checkAdmin() {

    if (
        !isAdminLoggedIn()
    ) {

        showToast(
            "🔒 Admin Login Required"
        );

        return false;

    }

    return true;

}


function logoutAdmin() {

    setAdminSession(
        false
    );

    updateAdminUI();

    showToast(
        "👋 Admin Logged Out"
    );

}


/* ==========================================================
   31. ADMIN INPUT HELPER
========================================================== */

function getAdminElement(id) {

    const adminPanel =
        document.getElementById(
            "adminPanel"
        );

    if (adminPanel) {

        const element =
            adminPanel.querySelector(
                "#" + id
            );

        if (element) {

            return element;

        }

    }

    return document.getElementById(
        id
    );

}


/* ==========================================================
   32. PUBLISH SHAYARI
========================================================== */

function publishShayari() {

    if (!checkAdmin()) return;

    const titleInput =
        getAdminElement(
            "publisherTitle"
        );

    const categoryInput =
        getAdminElement(
            "publisherCategory"
        );

    const textInput =
        getAdminElement(
            "publisherText"
        );

    const authorInput =
        getAdminElement(
            "publisherAuthor"
        );

    if (
        !titleInput ||
        !categoryInput ||
        !textInput ||
        !authorInput
    ) {

        showToast(
            "❌ Shayari Publisher Form Not Found"
        );

        return;

    }

    const title =
        titleInput.value.trim();

    const category =
        categoryInput.value;

    const text =
        textInput.value.trim();

    const author =
        authorInput.value.trim() ||
        "Adarsh Raj";

    if (
        title.length < 3
    ) {

        showToast(
            "⚠️ Title Too Short"
        );

        return;

    }

    if (
        text.length < 10
    ) {

        showToast(
            "⚠️ Shayari Too Short"
        );

        return;

    }

    const item = {

        id:
            Date.now(),

        title,

        category,

        text,

        author,

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };

    customShayari.unshift(
        item
    );

    saveAllData();

    loadAllShayari();

    loadPublishedShayari();

    updateStatistics();

    titleInput.value = "";

    textInput.value = "";

    authorInput.value =
        "Adarsh Raj";

    showToast(
        "✅ Shayari Published Successfully"
    );

}


/* ==========================================================
   33. EDIT SHAYARI
========================================================== */

function editShayari(index) {

    if (!checkAdmin()) return;

    const item =
        customShayari[index];

    if (!item) return;

    const title =
        getAdminElement(
            "publisherTitle"
        );

    const category =
        getAdminElement(
            "publisherCategory"
        );

    const text =
        getAdminElement(
            "publisherText"
        );

    const author =
        getAdminElement(
            "publisherAuthor"
        );

    if (
        title &&
        category &&
        text &&
        author
    ) {

        title.value =
            item.title;

        category.value =
            item.category;

        text.value =
            item.text;

        author.value =
            item.author ||
            "Adarsh Raj";

    }

    customShayari.splice(
        index,
        1
    );

    saveAllData();

    loadPublishedShayari();

    loadAllShayari();

    showToast(
        "✏️ Shayari Edit Mode"
    );

}


/* ==========================================================
   34. DELETE SHAYARI
========================================================== */

function deleteShayari(index) {

    if (!checkAdmin()) return;

    if (
        !confirm(
            "क्या आप इस Shayari को Delete करना चाहते हैं?"
        )
    ) return;

    customShayari.splice(
        index,
        1
    );

    saveAllData();

    loadPublishedShayari();

    loadAllShayari();

    updateStatistics();

    showToast(
        "🗑️ Shayari Deleted"
    );

}


/* ==========================================================
   35. STORY CARD
========================================================== */

function createStoryCard(story) {

    return `

        <div
            class="card story-card"
            data-story-id="${story.id}"
        >

            <h3>
                📖 ${escapeHTML(
                    story.title
                )}
            </h3>

            <p>
                📚 ${escapeHTML(
                    story.category ||
                    "Story"
                )}
            </p>

            <div class="meta">

                <span>
                    ✍️ ${escapeHTML(
                        story.author ||
                        "Unknown"
                    )}
                </span>

                ${
                    story.date
                    ? `
                    <span>
                        📅 ${escapeHTML(
                            story.date
                        )}
                    </span>
                    `
                    : ""
                }

            </div>

            <button
                type="button"
                class="storyOpenBtn"
                data-story-id="${story.id}"
            >
                📖 Read Full Story
            </button>

        </div>

    `;

}


/* ==========================================================
   36. STORY READER
========================================================== */

function createStoryReader() {

    if (
        document.getElementById(
            "storyReader"
        )
    ) return;

    const reader =
        document.createElement(
            "div"
        );

    reader.id =
        "storyReader";

    reader.style.display =
        "none";

    reader.innerHTML = `

        <div class="story-reader-box">

            <button
                type="button"
                id="closeStoryReader"
            >
                ✕ Close
            </button>

            <h2 id="readerStoryTitle"></h2>

            <p id="readerStoryMeta"></p>

            <div
                id="readerStoryText"
                class="story-reader-text"
            ></div>

        </div>

    `;

    document.body.appendChild(
        reader
    );

    const closeBtn =
        document.getElementById(
            "closeStoryReader"
        );

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeStoryReader
        );

    }

}


function openStoryReader(id) {

    const story =
        stories.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!story) {

        showToast(
            "❌ Story Not Found"
        );

        return;

    }

    createStoryReader();

    const reader =
        document.getElementById(
            "storyReader"
        );

    const title =
        document.getElementById(
            "readerStoryTitle"
        );

    const meta =
        document.getElementById(
            "readerStoryMeta"
        );

    const text =
        document.getElementById(
            "readerStoryText"
        );

    if (
        !reader ||
        !title ||
        !meta ||
        !text
    ) return;

    title.textContent =
        story.title;

    meta.textContent =
        `✍️ ${story.author || "Unknown"} • 📚 ${
            story.category || "Story"
        }`;

    text.innerHTML =
        formatText(
            story.text
        );

    reader.style.display =
        "flex";

    document.body.classList.add(
        "story-reader-open"
    );

}


function closeStoryReader() {

    const reader =
        document.getElementById(
            "storyReader"
        );

    if (!reader) return;

    reader.style.display =
        "none";

    document.body.classList.remove(
        "story-reader-open"
    );

}


/* ==========================================================
   37. LOAD STORIES
========================================================== */

function loadStories() {

    const container =
        document.getElementById(
            "storyContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        stories.length === 0
    ) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    📚 जल्द आ रहा है...
                </h3>

                <p>
                    यहाँ Original Stories और Poems प्रकाशित होंगी।
                </p>

            </div>

        `;

        return;

    }

    stories.forEach(
        story => {

            container.insertAdjacentHTML(
                "beforeend",
                createStoryCard(story)
            );

        }
    );

}


/* ==========================================================
   38. PUBLISH STORY
========================================================== */

function publishStory() {

    if (!checkAdmin()) return;

    const titleInput =
        getAdminElement(
            "storyTitle"
        );

    const textInput =
        getAdminElement(
            "storyText"
        );

    const authorInput =
        getAdminElement(
            "storyAuthor"
        );

    const categoryInput =
        getAdminElement(
            "storyCategory"
        );

    const typeInput =
        getAdminElement(
            "storyType"
        );

    if (
        !titleInput ||
        !textInput
    ) {

        showToast(
            "❌ Story Publisher Form Not Found"
        );

        return;

    }

    const title =
        titleInput.value.trim();

    const text =
        textInput.value.trim();

    const author =
        authorInput
            ? (
                authorInput.value.trim() ||
                "Adarsh Raj"
            )
            : "Adarsh Raj";

    let category =
        categoryInput
            ? categoryInput.value
            : "Story";

    if (
        typeInput &&
        typeInput.value
    ) {

        category =
            typeInput.value;

    }

    if (
        title.length < 3
    ) {

        showToast(
            "⚠️ Story Title Too Short"
        );

        return;

    }

    if (
        text.length < 20
    ) {

        showToast(
            "⚠️ Story बहुत छोटी है"
        );

        return;

    }

    const story = {

        id:
            Date.now(),

        title,

        category,

        text,

        author,

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };

    stories.unshift(
        story
    );

    saveAllData();

    loadStories();

    updateStatistics();

    titleInput.value = "";

    textInput.value = "";

    if (authorInput) {

        authorInput.value =
            "Adarsh Raj";

    }

    showToast(
        "📖 Story Published Successfully"
    );

}


/* ==========================================================
   39. DELETE STORY
========================================================== */

function deleteStory(index) {

    if (!checkAdmin()) return;

    if (
        !confirm(
            "क्या आप इस Story को Delete करना चाहते हैं?"
        )
    ) return;

    stories.splice(
        index,
        1
    );

    saveAllData();

    loadStories();

    updateStatistics();

    showToast(
        "🗑️ Story Deleted"
    );

}


/* ==========================================================
   40. STORY CATEGORY FILTER
========================================================== */

function filterStories(category) {

    const container =
        document.getElementById(
            "storyContainer"
        );

    if (!container) return;

    let filtered =
        stories;

    if (
        category &&
        category !== "All"
    ) {

        filtered =
            stories.filter(
                story =>
                    story.category ===
                    category
            );

    }

    container.innerHTML = "";

    if (!filtered.length) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    📖 No Story Found
                </h3>

            </div>

        `;

        return;

    }

    filtered.forEach(
        story => {

            container.insertAdjacentHTML(
                "beforeend",
                createStoryCard(story)
            );

        }
    );

}


/* ==========================================================
   41. STORY EVENTS
========================================================== */

function initStoryEvents() {

    document.addEventListener(
        "click",
        event => {

            const openBtn =
                event.target.closest(
                    ".storyOpenBtn"
                );

            if (openBtn) {

                openStoryReader(
                    openBtn.dataset.storyId
                );

                return;

            }

            const deleteBtn =
                event.target.closest(
                    ".storyDeleteBtn"
                );

            if (deleteBtn) {

                deleteStory(
                    Number(
                        deleteBtn.dataset.id
                    )
                );

            }

        }
    );

}


/* ==========================================================
   42. STORY PUBLISH BUTTON
========================================================== */

function initStoryPublishButton() {

    const buttons =
        document.querySelectorAll(
            "#storyPublishBtn"
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    publishStory();

                }
            );

        }
    );

}


/* ==========================================================
   43. SHAYARI PUBLISH BUTTON
========================================================== */

function initShayariPublishButtons() {

    const buttons =
        document.querySelectorAll(
            "#publishBtn"
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    if (
                        button.closest(
                            "#adminPanel"
                        )
                    ) {

                        publishShayari();

                    } else {

                        publishLegacyShayari();

                    }

                }
            );

        }
    );

}


/* ==========================================================
   END OF PART 1
   =========================================================

   PART 2 CONTINUES DIRECTLY BELOW.
========================================================== */
/* ==========================================================
   41. SHAYARI PUBLISH BUTTONS
========================================================== */

function initShayariPublishButtons() {

    const buttons =
        document.querySelectorAll("#publishBtn");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                /*
                    MAIN ADMIN PANEL को priority दी जाएगी.
                    अगर button adminPanel के अंदर है तो
                    नया publisher use होगा.
                    वरना legacy publisher.
                */

                if (
                    button.closest("#adminPanel")
                ) {

                    publishShayari();

                } else {

                    publishLegacyShayari();

                }

            }
        );

    });

}


/* ==========================================================
   42. LEGACY SHAYARI PUBLISHER
========================================================== */

function publishLegacyShayari() {

    if (!checkAdmin()) return;

    const title =
        document.getElementById("pubTitle");

    const category =
        document.getElementById("pubCategory");

    const text =
        document.getElementById("pubText");

    const author =
        document.getElementById("pubAuthor");

    if (
        !title ||
        !category ||
        !text
    ) {

        showToast(
            "❌ Shayari Form Not Found"
        );

        return;

    }

    const item = {

        id: Date.now(),

        title:
            title.value.trim(),

        category:
            category.value,

        text:
            text.value.trim(),

        author:
            author
                ? (
                    author.value.trim() ||
                    "Adarsh Raj"
                )
                : "Adarsh Raj",

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString("en-IN")

    };


    if (
        item.title.length < 3
    ) {

        showToast(
            "⚠️ Title Too Short"
        );

        return;

    }


    if (
        item.text.length < 10
    ) {

        showToast(
            "⚠️ Shayari Too Short"
        );

        return;

    }


    customShayari.unshift(item);

    saveAllData();

    loadAllShayari();

    loadPublishedShayari();

    updateStatistics();


    title.value = "";

    text.value = "";

    if (author) {

        author.value = "";

    }


    showToast(
        "✅ Shayari Published Successfully"
    );

}


/* ==========================================================
   43. GLOBAL SHAYARI CARD ACTIONS
========================================================== */

function initCardActions() {

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".shayari-card"
                );

            if (!card) return;


            const textElement =
                card.querySelector(
                    ".shayariText"
                );

            if (!textElement) return;


            const text =
                textElement.innerText.trim();

            if (!text) return;


            /* COPY */

            if (
                event.target.closest(".copyBtn")
            ) {

                copyText(text);

                return;

            }


            /* SHARE */

            if (
                event.target.closest(".shareBtn")
            ) {

                shareText(text);

                return;

            }


            /* LIKE */

            if (
                event.target.closest(".likeBtn")
            ) {

                toggleLike(text);

                const button =
                    event.target.closest(
                        ".likeBtn"
                    );

                const liked =
                    likedShayari.includes(text);


                if (button) {

                    button.classList.toggle(
                        "active",
                        liked
                    );

                    button.innerHTML =
                        liked
                            ? "💖 Liked"
                            : "❤️ Like";

                }

                return;

            }


            /* FAVOURITE */

            if (
                event.target.closest(".favBtn")
            ) {

                toggleFavourite(text);

                const button =
                    event.target.closest(
                        ".favBtn"
                    );

                const favourite =
                    favouriteShayari.includes(
                        text
                    );


                if (button) {

                    button.classList.toggle(
                        "active",
                        favourite
                    );

                    button.innerHTML =
                        favourite
                            ? "🌟 Saved"
                            : "⭐ Favourite";

                }

                return;

            }

        }
    );

}


/* ==========================================================
   44. ADMIN CONTENT EVENTS
========================================================== */

function initAdminContentEvents() {

    document.addEventListener(
        "click",
        event => {

            const editButton =
                event.target.closest(
                    ".editShayariBtn"
                );

            if (editButton) {

                const index =
                    Number(
                        editButton.dataset.id
                    );

                editShayari(index);

                return;

            }


            const deleteButton =
                event.target.closest(
                    ".deleteShayariBtn"
                );

            if (deleteButton) {

                const index =
                    Number(
                        deleteButton.dataset.id
                    );

                deleteShayari(index);

                return;

            }


            const logoutButton =
                event.target.closest(
                    "#logoutBtn"
                );

            if (logoutButton) {

                logoutAdmin();

            }

        }
    );

}


/* ==========================================================
   45. STATISTICS
========================================================== */

function updateStatistics() {

    const totalShayari =
        document.getElementById(
            "totalShayari"
        );

    const totalStories =
        document.getElementById(
            "totalStories"
        );

    const totalFavourite =
        document.getElementById(
            "totalFavourite"
        );

    const totalLikes =
        document.getElementById(
            "totalLikes"
        );


    const total =
        getAllShayari().length;


    if (totalShayari) {

        totalShayari.textContent =
            total;

    }


    if (totalStories) {

        totalStories.textContent =
            stories.length;

    }


    if (totalFavourite) {

        totalFavourite.textContent =
            favouriteShayari.length;

    }


    if (totalLikes) {

        totalLikes.textContent =
            likedShayari.length;

    }

}


/* ==========================================================
   46. RANDOM SHAYARI
========================================================== */

function getRandomShayari() {

    const list =
        getAllShayari();

    if (!list.length) {

        return null;

    }

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ];

}


/* ==========================================================
   47. RANDOM STORY
========================================================== */

function getRandomStory() {

    if (!stories.length) {

        return null;

    }

    return stories[
        Math.floor(
            Math.random() * stories.length
        )
    ];

}


/* ==========================================================
   48. CONTACT FORM / EMAILJS
========================================================== */

function initContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) return;


    /*
        EmailJS configuration
        config.js / global variables से values
        लेने की कोशिश की जाएगी.
    */

    let publicKey =
        window.EMAILJS_PUBLIC_KEY ||
        window.emailjsPublicKey ||
        "";

    let serviceId =
        window.EMAILJS_SERVICE_ID ||
        window.emailjsServiceId ||
        "";

    let templateId =
        window.EMAILJS_TEMPLATE_ID ||
        window.emailjsTemplateId ||
        "";


    /*
        CONFIG object fallback
    */

    try {

        if (
            window.CONFIG &&
            typeof window.CONFIG === "object"
        ) {

            publicKey =
                publicKey ||
                window.CONFIG.EMAILJS_PUBLIC_KEY ||
                "";

            serviceId =
                serviceId ||
                window.CONFIG.EMAILJS_SERVICE_ID ||
                "";

            templateId =
                templateId ||
                window.CONFIG.EMAILJS_TEMPLATE_ID ||
                "";

        }

    } catch (error) {

        console.error(
            "EmailJS config error:",
            error
        );

    }


    /*
        EmailJS library check
    */

    if (
        typeof emailjs === "undefined"
    ) {

        console.error(
            "EmailJS library not loaded."
        );

        return;

    }


    /*
        Configuration check
    */

    if (
        !publicKey ||
        !serviceId ||
        !templateId
    ) {

        console.error(
            "EmailJS configuration missing."
        );

        return;

    }


    /*
        Prevent duplicate initialization
    */

    if (
        form.dataset.emailReady === "true"
    ) {

        return;

    }


    /*
        Initialize EmailJS
    */

    try {

        if (
            typeof emailjs.init === "function"
        ) {

            try {

                emailjs.init({
                    publicKey: publicKey
                });

            } catch {

                emailjs.init(
                    publicKey
                );

            }

        }

    } catch (error) {

        console.error(
            "EmailJS initialization failed:",
            error
        );

        return;

    }


    form.dataset.emailReady =
        "true";


    /*
        Submit event
    */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const button =
                form.querySelector(
                    "button[type='submit']"
                );


            if (button) {

                button.disabled =
                    true;

                button.innerHTML =
                    "📤 Sending...";

            }


            emailjs.sendForm(
                serviceId,
                templateId,
                form
            )
            .then(() => {

                showToast(
                    "✅ Message Sent Successfully"
                );

                form.reset();

            })
            .catch(error => {

                console.error(
                    "EmailJS Error:",
                    error
                );

                showToast(
                    "❌ Message Send Failed"
                );

            })
            .finally(() => {

                if (button) {

                    button.disabled =
                        false;

                    button.innerHTML =
                        "📨 Send Message";

                }

            });

        }
    );

}


/* ==========================================================
   49. WEBSITE QR CODE
========================================================== */

function generateWebsiteQR() {

    const qrBox =
        document.getElementById(
            "qrCode"
        );

    if (!qrBox) return;


    if (
        typeof QRCode === "undefined"
    ) {

        showToast(
            "❌ QR Code Library Not Loaded"
        );

        return;

    }


    qrBox.innerHTML = "";


    try {

        new QRCode(
            qrBox,
            {

                text:
                    window.location.href,

                width:
                    220,

                height:
                    220,

                colorDark:
                    "#000000",

                colorLight:
                    "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );

    } catch (error) {

        console.error(
            "QR generation error:",
            error
        );

        showToast(
            "❌ QR Code Generation Failed"
        );

    }

}


/* ==========================================================
   50. DOWNLOAD QR CODE
========================================================== */

function downloadQRCode() {

    const qrBox =
        document.getElementById(
            "qrCode"
        );

    if (!qrBox) return;


    const canvas =
        qrBox.querySelector(
            "canvas"
        );

    const image =
        qrBox.querySelector(
            "img"
        );


    let url = "";


    if (canvas) {

        try {

            url =
                canvas.toDataURL(
                    "image/png"
                );

        } catch (error) {

            console.error(
                "QR canvas error:",
                error
            );

            showToast(
                "❌ QR Download Failed"
            );

            return;

        }

    } else if (image) {

        url =
            image.src;

    }


    if (!url) {

        showToast(
            "⚠️ Generate QR First"
        );

        return;

    }


    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        "Adarsh-Raj-Shayar-QR.png";


    document.body.appendChild(
        link
    );

    link.click();

    link.remove();


    showToast(
        "✅ QR Downloaded"
    );

}


/* ==========================================================
   51. QR INITIALIZATION
========================================================== */

function initQR() {

    const generateButton =
        document.getElementById(
            "generateQRBtn"
        );

    const downloadButton =
        document.getElementById(
            "downloadQRBtn"
        );


    if (generateButton) {

        generateButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                generateWebsiteQR();

            }
        );

    }


    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                downloadQRCode();

            }
        );

    }

}


/* ==========================================================
   52. COPY WEBSITE LINK
========================================================== */

function initCopyWebsiteLink() {

    const button =
        document.getElementById(
            "copyWebsiteBtn"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        async event => {

            event.preventDefault();


            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                showToast(
                    "🔗 Website Link Copied"
                );

            } catch (error) {

                console.error(
                    "Copy link error:",
                    error
                );

                showToast(
                    "❌ Unable to Copy Link"
                );

            }

        }
    );

}


/* ==========================================================
   53. VISITOR COUNTER
========================================================== */

function initVisitorCounter() {

    const counter =
        document.getElementById(
            "visitor-count"
        );

    if (!counter) return;


    const COUNT_KEY =
        "ars_visitor_count";

    const SEEN_KEY =
        "ars_visitor_seen";


    let count =
        Number(
            localStorage.getItem(
                COUNT_KEY
            )
        );


    if (
        !Number.isFinite(count) ||
        count < 0
    ) {

        count = 0;

    }


    /*
        Current browser को केवल एक बार count किया जाएगा.
    */

    if (
        !localStorage.getItem(
            SEEN_KEY
        )
    ) {

        count++;

        localStorage.setItem(
            COUNT_KEY,
            String(count)
        );

        localStorage.setItem(
            SEEN_KEY,
            "true"
        );

    }


    counter.textContent =
        count.toLocaleString(
            "en-IN"
        );

}


/* ==========================================================
   54. SEO
========================================================== */

function initSEO() {

    document.title =
        "Adarsh Raj Shayar | Official";


    const description =
        document.querySelector(
            "meta[name='description']"
        );


    if (description) {

        description.setAttribute(
            "content",
            "Official Hindi Shayari Website by Adarsh Raj"
        );

    }

}


/* ==========================================================
   55. IMAGE SETTINGS
========================================================== */

function initImages() {

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.draggable =
                false;

        });

}


/* ==========================================================
   56. BASIC WEBSITE PROTECTION
========================================================== */

function initBasicProtection() {

    document.addEventListener(
        "dragstart",
        event => {

            if (
                event.target &&
                event.target.tagName === "IMG"
            ) {

                event.preventDefault();

            }

        }
    );

}


/* ==========================================================
   57. ESCAPE KEY
========================================================== */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

                closeStoryReader();

            }

        }
    );

}


/* ==========================================================
   58. GLOBAL ERROR LOGGER
========================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "❌ Website JS Error:",
            event.message
        );

    }
);


/* ==========================================================
   59. MAIN INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🌹 Adarsh Raj Shayar Starting..."
        );


        /* ==================================================
           CORE
        ================================================== */

        initLoader();

        initCurrentYear();

        initWelcomePopup();

        initTheme();

        initMobileMenu();

        initSmoothNavigation();

        initSearch();

        initProgressBar();

        initBackToTop();

        initActiveNavigation();


        /* ==================================================
           CONTENT
        ================================================== */

        loadAllShayari();

        loadPublishedShayari();

        loadStories();

        loadFavourite();


        /* ==================================================
           ADMIN
        ================================================== */

        initAdmin();

        initShayariPublishButtons();

        initStoryPublishButton();

        initStoryEvents();

        initAdminContentEvents();


        /* ==================================================
           CARD ACTIONS
        ================================================== */

        initCardActions();


        /* ==================================================
           CONTACT
        ================================================== */

        initContactForm();


        /* ==================================================
           QR
        ================================================== */

        initQR();


        /* ==================================================
           OTHER
        ================================================== */

        initCopyWebsiteLink();

        initVisitorCounter();

        initSEO();

        initImages();

        initBasicProtection();

        initEscapeKey();

        createStoryReader();

        updateStatistics();


        /* ==================================================
           CONSOLE INFORMATION
        ================================================== */

        console.log(
            "================================"
        );

        console.log(
            "🌹 Adarsh Raj Shayar"
        );


        if (
            typeof ARS_CONFIG !== "undefined"
        ) {

            console.log(
                "🚀 Version:",
                ARS_CONFIG.VERSION
            );

            console.log(
                "👨‍💻 Author:",
                ARS_CONFIG.AUTHOR
            );

        }


        console.log(
            "📖 Stories:",
            stories.length
        );

        console.log(
            "📚 Shayari:",
            getAllShayari().length
        );


        console.log(
            "================================"
        );

    }
);


/* ==========================================================
   60. PAGE SHOW
========================================================== */

window.addEventListener(
    "pageshow",
    () => {

        loadAllShayari();

        loadPublishedShayari();

        loadStories();

        loadFavourite();

        restoreShayariButtons();

        updateStatistics();

    }
);


/* ==========================================================
   END OF SCRIPT.JS - PART 2
========================================================== */

console.log(
    "✅ Clean Professional script.js Part 2 Loaded"
);
