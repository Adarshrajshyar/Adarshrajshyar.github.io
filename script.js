/* =========================================================
   ADARSH RAJ SHAYAR — MASTER SCRIPT
   CLEAN SINGLE-SOURCE VERSION
   PART 1
   Compatible with existing index.html + style.css + config.js
========================================================= */

"use strict";

/* =========================================================
   1. WEBSITE CONFIGURATION
========================================================= */

const ARS = {
    name: "Adarsh Raj Shayar",
    version: "15.0",
    author: "Adarsh Raj",

    defaultAdminPassword: "ARS2026",

    storage: {
        theme: "ars_theme",
        visited: "ars_visited",
        likes: "ars_likes",
        favourites: "ars_favourites",
        shayari: "ars_custom_shayari",
        stories: "ars_stories",
        shayariDraft: "ars_draft_shayari",
        storyDraft: "ars_draft_story"
    },

    adminSession: "ARS_ADMIN_SESSION"
};


/* =========================================================
   2. DOM SHORTCUTS
========================================================= */

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


/* =========================================================
   3. SAFE HTML FUNCTIONS
========================================================= */

function escapeHTML(value = "") {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatText(value = "") {

    return escapeHTML(value)
        .replace(/\r?\n/g, "<br>");

}


/* =========================================================
   4. STORAGE SYSTEM
========================================================= */

const ARSStorage = {

    get(key, fallback = null) {

        try {

            const raw =
                localStorage.getItem(key);

            if (raw === null) {
                return fallback;
            }

            return JSON.parse(raw);

        } catch (error) {

            console.error(
                "Storage Read Error:",
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

        } catch (error) {

            console.error(
                "Storage Save Error:",
                error
            );
        }
    },


    remove(key) {

        try {

            localStorage.removeItem(key);

        } catch (error) {

            console.error(
                "Storage Remove Error:",
                error
            );
        }
    }
};


/* =========================================================
   5. GLOBAL DATA
========================================================= */

let likedShayari =
    ARSStorage.get(
        ARS.storage.likes,
        []
    );

let favouriteShayari =
    ARSStorage.get(
        ARS.storage.favourites,
        []
    );

let customShayari =
    ARSStorage.get(
        ARS.storage.shayari,
        []
    );

let stories =
    ARSStorage.get(
        ARS.storage.stories,
        []
    );


/* =========================================================
   6. DATA VALIDATION
========================================================= */

if (!Array.isArray(likedShayari)) {
    likedShayari = [];
}

if (!Array.isArray(favouriteShayari)) {
    favouriteShayari = [];
}

if (!Array.isArray(customShayari)) {
    customShayari = [];
}

if (!Array.isArray(stories)) {
    stories = [];
}


/* =========================================================
   7. TEMPORARY EDIT STATES
========================================================= */

let editingShayariId = null;
let editingStoryId = null;


/* =========================================================
   8. SAVE ALL DATA
========================================================= */

function saveAllData() {

    ARSStorage.set(
        ARS.storage.likes,
        likedShayari
    );

    ARSStorage.set(
        ARS.storage.favourites,
        favouriteShayari
    );

    ARSStorage.set(
        ARS.storage.shayari,
        customShayari
    );

    ARSStorage.set(
        ARS.storage.stories,
        stories
    );
}


/*
   Backward-compatible name.
*/

function saveAll() {
    saveAllData();
}


/* =========================================================
   9. TOAST SYSTEM
========================================================= */

function showToast(message) {

    const toast =
        $("#toast");

    if (!toast) return;

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        showToast.timer
    );

    showToast.timer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2400);
}


/* =========================================================
   10. EXTERNAL CONFIG
   Compatible with config.js
========================================================= */

function getExternalConfig() {

    let cfg = {};

    try {

        if (
            typeof CONFIG !== "undefined" &&
            CONFIG
        ) {

            cfg = CONFIG;
        }

    } catch (_) {
        cfg = {};
    }


    return {

        adminPassword:
            cfg.ADMIN_PASSWORD ||
            cfg.adminPassword ||
            ARS.defaultAdminPassword,

        emailPublicKey:
            cfg.EMAILJS_PUBLIC_KEY ||
            cfg.emailjsPublicKey ||
            cfg.PUBLIC_KEY ||
            "",

        emailServiceId:
            cfg.EMAILJS_SERVICE_ID ||
            cfg.emailjsServiceId ||
            cfg.SERVICE_ID ||
            "",

        emailTemplateId:
            cfg.EMAILJS_TEMPLATE_ID ||
            cfg.emailjsTemplateId ||
            cfg.TEMPLATE_ID ||
            ""
    };
}


/* =========================================================
   11. LOADER
========================================================= */

function initLoader() {

    const loader =
        $("#loader");

    if (!loader) return;


    const hideLoader = () => {

        setTimeout(() => {

            loader.classList.add(
                "loader-hide"
            );

        }, 450);
    };


    if (
        document.readyState ===
        "complete"
    ) {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );
    }
}


/* =========================================================
   12. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        $("#currentYear");

    if (!year) return;

    year.textContent =
        new Date().getFullYear();
}


/* =========================================================
   13. WELCOME POPUP
========================================================= */

function initWelcomePopup() {

    const popup =
        $("#welcomePopup");

    const enterBtn =
        $("#enterBtn");

    const closeBtn =
        $("#closeWelcomeBtn");

    if (!popup) return;


    if (
        localStorage.getItem(
            ARS.storage.visited
        ) === "true"
    ) {

        popup.hidden = true;

        return;
    }


    const closePopup = () => {

        popup.hidden = true;

        localStorage.setItem(
            ARS.storage.visited,
            "true"
        );

        showToast(
            "🌹 Welcome to Adarsh Raj Shayar"
        );
    };


    enterBtn?.addEventListener(
        "click",
        closePopup
    );

    closeBtn?.addEventListener(
        "click",
        closePopup
    );
}


/* =========================================================
   14. THEME SYSTEM
========================================================= */

function updateThemeIcon() {

    const button =
        $("#darkModeBtn");

    if (!button) return;

    button.textContent =
        document.body.classList.contains(
            "light-mode"
        )
            ? "🌙"
            : "☀️";
}


function initTheme() {

    const savedTheme =
        ARSStorage.get(
            ARS.storage.theme,
            "dark"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-mode"
        );
    }


    updateThemeIcon();


    const button =
        $("#darkModeBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );


            const lightMode =
                document.body.classList.contains(
                    "light-mode"
                );


            ARSStorage.set(
                ARS.storage.theme,
                lightMode
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();


            showToast(
                lightMode
                    ? "☀️ Light Mode Enabled"
                    : "🌙 Dark Mode Enabled"
            );

        }
    );
}


/* =========================================================
   15. MOBILE MENU
========================================================= */

function closeMobileMenu() {

    const nav =
        $("#mainNav") ||
        $("nav");

    const overlay =
        $("#overlay");

    if (nav) {

        nav.classList.remove(
            "active"
        );
    }

    if (overlay) {

        overlay.classList.remove(
            "active"
        );
    }

    document.body.classList.remove(
        "menu-open"
    );
}


function initMobileMenu() {

    const menuBtn =
        $("#menuBtn");

    const nav =
        $("#mainNav") ||
        $("nav");

    const overlay =
        $("#overlay");

    if (!menuBtn || !nav) return;


    const openMenu = () => {

        nav.classList.add(
            "active"
        );

        overlay?.classList.add(
            "active"
        );

        document.body.classList.add(
            "menu-open"
        );
    };


    menuBtn.addEventListener(
        "click",
        () => {

            if (
                nav.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            } else {

                openMenu();
            }
        }
    );


    overlay?.addEventListener(
        "click",
        closeMobileMenu
    );


    $$("#mainNav a, nav a").forEach(
        link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );
        }
    );
}


/* =========================================================
   16. SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    $$(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    event.preventDefault();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                closeMobileMenu();

            }
        );

    });
}


/* =========================================================
   17. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        $$("main section[id]");

    const links =
        $$("#mainNav a, nav a");

    if (
        !sections.length ||
        !links.length
    ) return;


    const updateActiveNav = () => {

        let current =
            sections[0]?.id || "";


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

                link.classList.toggle(
                    "active",
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                );
            }
        );
    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();
}


/* =========================================================
   18. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        $("#topBtn");

    if (!button) return;


    button.style.display =
        "none";


    window.addEventListener(
        "scroll",
        () => {

            button.style.display =
                window.scrollY > 400
                    ? "block"
                    : "none";

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* =========================================================
   19. PAGE PROGRESS BAR
========================================================= */

function initProgressBar() {

    const bar =
        $("#progressBar");

    if (!bar) return;


    const updateProgress = () => {

        const doc =
            document.documentElement;


        const total =
            doc.scrollHeight -
            doc.clientHeight;


        const percent =
            total > 0
                ? (
                    doc.scrollTop /
                    total
                ) * 100
                : 0;


        bar.style.width =
            `${percent}%`;
    };


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();
}


/* =========================================================
   20. SHAYARI DATA SOURCE
========================================================= */

function getBuiltInShayari() {

    try {

        if (
            typeof shayariData !==
            "undefined" &&
            Array.isArray(
                shayariData
            )
        ) {

            return shayariData;
        }

    } catch (_) {
        return [];
    }


    return [];
}


function getAllShayari() {

    return [
        ...getBuiltInShayari(),
        ...customShayari
    ];
}


/* =========================================================
   21. RANDOM SHAYARI
========================================================= */

function getRandomShayari() {

    const list =
        getAllShayari();

    if (!list.length) {
        return null;
    }


    return list[
        Math.floor(
            Math.random() *
            list.length
        )
    ];
}


/* =========================================================
   22. TODAY SHAYARI
========================================================= */

function getTodayShayari() {

    const list =
        getAllShayari();

    if (!list.length) {
        return null;
    }


    const day =
        new Date().getDate();


    return list[
        day % list.length
    ];
}


/* =========================================================
   23. SHAYARI CARD
========================================================= */

function createShayariCard(
    item,
    options = {}
) {

    const title =
        escapeHTML(
            item.title ||
            "Untitled Shayari"
        );


    const text =
        formatText(
            item.text || ""
        );


    const author =
        escapeHTML(
            item.author ||
            "Adarsh Raj"
        );


    const date =
        escapeHTML(
            item.date || ""
        );


    const rawId =
        item.id ??
        `${item.title || ""}-${item.text || ""}`;


    const id =
        escapeHTML(
            String(rawId)
        );


    const liked =
        likedShayari.includes(
            item.text
        );


    const favourite =
        favouriteShayari.includes(
            item.text
        );


    const adminButtons =
        options.admin
            ? `

                <button
                    type="button"
                    class="editShayariBtn"
                    data-id="${id}"
                >
                    ✏️ Edit
                </button>

                <button
                    type="button"
                    class="deleteShayariBtn"
                    data-id="${id}"
                >
                    🗑️ Delete
                </button>

            `
            : "";


    return `

        <article
            class="card shayari-card"
            data-shayari-id="${id}"
        >

            <h3>
                ${title}
            </h3>

            <p class="shayariText">
                ${text}
            </p>

            <div class="meta">

                <span>
                    ✍️ ${author}
                </span>

                ${
                    date
                        ? `
                            <span>
                                📅 ${date}
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
                    class="likeBtn ${
                        liked ? "active" : ""
                    }"
                >
                    ${
                        liked
                            ? "💖 Liked"
                            : "❤️ Like"
                    }
                </button>

                <button
                    type="button"
                    class="favBtn ${
                        favourite ? "active" : ""
                    }"
                >
                    ${
                        favourite
                            ? "🌟 Saved"
                            : "⭐ Favourite"
                    }
                </button>

                ${adminButtons}

            </div>

        </article>

    `;
}


/* =========================================================
   24. RENDER SHAYARI CATEGORY
========================================================= */

function renderCategory(
    category,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );

    if (!container) return;


    const normalizedCategory =
        String(category)
            .toLowerCase()
            .trim();


    const builtIn =
        getBuiltInShayari()
            .filter(item =>
                String(
                    item.category || ""
                )
                .toLowerCase()
                .trim() ===
                normalizedCategory
            );


    const custom =
        customShayari
            .filter(item =>
                String(
                    item.category || ""
                )
                .toLowerCase()
                .trim() ===
                normalizedCategory
            );


    const list = [
        ...builtIn,
        ...custom
    ];


    if (!list.length) {

        container.innerHTML = `

            <div class="card empty-card">

                <h3>
                    📖 No Shayari Available
                </h3>

                <p>
                    इस category में अभी कोई
                    Shayari प्रकाशित नहीं हुई है।
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        list
            .map(item =>
                createShayariCard(item)
            )
            .join("");
}


/* =========================================================
   25. LOAD ALL SHAYARI
========================================================= */

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


/* =========================================================
   26. COPY TEXT
========================================================= */

async function copyText(text) {

    if (!text) return;


    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                text
            );

        } else {

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value =
                text;

            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";

            document.body.appendChild(
                textarea
            );

            textarea.select();

            document.execCommand(
                "copy"
            );

            textarea.remove();
        }


        showToast(
            "📋 Copied Successfully"
        );

    } catch (error) {

        console.error(
            "Copy Error:",
            error
        );

        showToast(
            "❌ Copy Failed"
        );
    }
}


/* =========================================================
   27. SHARE TEXT
========================================================= */

async function shareText(
    text,
    title = ARS.name
) {

    if (!text) return;


    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title,

                text,

                url:
                    window.location.href

            });

        } catch (error) {

            if (
                error?.name !==
                "AbortError"
            ) {

                console.error(
                    "Share Error:",
                    error
                );
            }
        }

        return;
    }


    await copyText(text);

    showToast(
        "📋 Share unavailable — Text copied"
    );
}


/* =========================================================
   28. LIKE SYSTEM
========================================================= */

function toggleLike(text) {

    if (!text) return;


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
        ARS.storage.likes,
        likedShayari
    );


    updateStatistics();
}


/* =========================================================
   29. FAVOURITE SYSTEM
========================================================= */

function toggleFavourite(text) {

    if (!text) return;


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
        ARS.storage.favourites,
        favouriteShayari
    );


    loadFavourite();

    updateStatistics();
}


/* =========================================================
   30. RESTORE LIKE / FAVOURITE BUTTONS
========================================================= */

function restoreShayariButtons() {

    $$(".shayari-card")
        .forEach(card => {

            const text =
                $(".shayariText", card)
                    ?.innerText
                    ?.trim();


            if (!text) return;


            const likeBtn =
                $(".likeBtn", card);


            const favBtn =
                $(".favBtn", card);


            const liked =
                likedShayari.includes(
                    text
                );


            const favourite =
                favouriteShayari.includes(
                    text
                );


            if (likeBtn) {

                likeBtn.classList.toggle(
                    "active",
                    liked
                );

                likeBtn.textContent =
                    liked
                        ? "💖 Liked"
                        : "❤️ Like";
            }


            if (favBtn) {

                favBtn.classList.toggle(
                    "active",
                    favourite
                );

                favBtn.textContent =
                    favourite
                        ? "🌟 Saved"
                        : "⭐ Favourite";
            }

        });
}


/* =========================================================
   31. FAVOURITE LIST
========================================================= */

function loadFavourite() {

    const container =
        $("#favoriteList");

    if (!container) return;


    if (
        !favouriteShayari.length
    ) {

        container.innerHTML = `

            <div class="card empty-card">

                <h3>
                    ⭐ No Favourite Shayari
                </h3>

                <p>
                    किसी Shayari को Favourite
                    करने पर वह यहाँ दिखाई देगी।
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        favouriteShayari
            .map(text => `

                <article
                    class="card shayari-card"
                >

                    <p class="shayariText">
                        ${formatText(text)}
                    </p>

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
                            class="favBtn active"
                        >
                            🌟 Saved
                        </button>

                    </div>

                </article>

            `)
            .join("");
}


/* =========================================================
   32. SEARCH
========================================================= */

function performSearch() {

    const input =
        $("#search");

    if (!input) return;


    const keyword =
        input.value
            .toLowerCase()
            .trim();


    $$(".card").forEach(
        card => {

            const content =
                card.innerText
                    .toLowerCase();


            card.style.display =
                content.includes(
                    keyword
                )
                    ? ""
                    : "none";
        }
    );
}


function initSearch() {

    const input =
        $("#search");

    if (!input) return;


    input.addEventListener(
        "input",
        performSearch
    );
}


/* =========================================================
   33. SHAYARI CARD ACTION EVENTS
========================================================= */

function initCardActions() {

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".shayari-card"
                );


            if (!card) return;


            const text =
                $(".shayariText", card)
                    ?.innerText
                    ?.trim();


            if (!text) return;


            const copyBtn =
                event.target.closest(
                    ".copyBtn"
                );


            const shareBtn =
                event.target.closest(
                    ".shareBtn"
                );


            const likeBtn =
                event.target.closest(
                    ".likeBtn"
                );


            const favBtn =
                event.target.closest(
                    ".favBtn"
                );


            if (copyBtn) {

                copyText(text);

                return;
            }


            if (shareBtn) {

                shareText(text);

                return;
            }


            if (likeBtn) {

                toggleLike(text);

                const liked =
                    likedShayari.includes(
                        text
                    );


                likeBtn.classList.toggle(
                    "active",
                    liked
                );


                likeBtn.textContent =
                    liked
                        ? "💖 Liked"
                        : "❤️ Like";

                return;
            }


            if (favBtn) {

                toggleFavourite(text);

                const favourite =
                    favouriteShayari.includes(
                        text
                    );


                favBtn.classList.toggle(
                    "active",
                    favourite
                );


                favBtn.textContent =
                    favourite
                        ? "🌟 Saved"
                        : "⭐ Favourite";
            }

        }
    );
}


/* =========================================================
   34. IMAGE PRELOAD
========================================================= */

function preloadImages() {

    [
        "logo.png",
        "banner.png"
    ].forEach(src => {

        const image =
            new Image();

        image.src =
            src;
    });
}


/* =========================================================
   PART 1 END
========================================================= */

console.log(
    "✅ Adarsh Raj Shayar — Script Part 1 Loaded"
);
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
            author?.value.trim() ||
            "Adarsh Raj",

        publisher:
            "Adarsh Raj",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

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

    customShayari.unshift(
        item
    );

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
   43. GLOBAL CARD BUTTON EVENTS
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

            const text =
                card.querySelector(
                    ".shayariText"
                )?.innerText;

            if (!text) return;


            if (
                event.target.closest(
                    ".copyBtn"
                )
            ) {

                copyText(text);

            }


            if (
                event.target.closest(
                    ".shareBtn"
                )
            ) {

                shareText(text);

            }


            if (
                event.target.closest(
                    ".likeBtn"
                )
            ) {

                toggleLike(text);

                const btn =
                    event.target.closest(
                        ".likeBtn"
                    );

                btn.classList.toggle(
                    "active",
                    likedShayari.includes(
                        text
                    )
                );

                btn.innerHTML =
                    likedShayari.includes(
                        text
                    )
                        ? "💖 Liked"
                        : "❤️ Like";

            }


            if (
                event.target.closest(
                    ".favBtn"
                )
            ) {

                toggleFavourite(text);

                const btn =
                    event.target.closest(
                        ".favBtn"
                    );

                btn.classList.toggle(
                    "active",
                    favouriteShayari.includes(
                        text
                    )
                );

                btn.innerHTML =
                    favouriteShayari.includes(
                        text
                    )
                        ? "🌟 Saved"
                        : "⭐ Favourite";

            }

        }
    );

}


/* ==========================================================
   44. EDIT / DELETE EVENTS
========================================================== */

function initAdminContentEvents() {

    document.addEventListener(
        "click",
        event => {

            const editBtn =
                event.target.closest(
                    ".editShayariBtn"
                );

            if (editBtn) {

                editShayari(
                    Number(
                        editBtn.dataset.id
                    )
                );

                return;

            }


            const deleteBtn =
                event.target.closest(
                    ".deleteShayariBtn"
                );

            if (deleteBtn) {

                deleteShayari(
                    Number(
                        deleteBtn.dataset.id
                    )
                );

                return;

            }


            const logoutBtn =
                event.target.closest(
                    "#logoutBtn"
                );

            if (logoutBtn) {

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
            Math.random() *
            list.length
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
            Math.random() *
            stories.length
        )
    ];

}


/* ==========================================================
   48. CONTACT FORM
========================================================== */

function initContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) return;

    const publicKey =
        window.EMAILJS_PUBLIC_KEY ||
        window.emailjsPublicKey ||
        "";

    const serviceId =
        window.EMAILJS_SERVICE_ID ||
        window.emailjsServiceId ||
        "";

    const templateId =
        window.EMAILJS_TEMPLATE_ID ||
        window.emailjsTemplateId ||
        "";

    let finalPublicKey =
        publicKey;

    let finalServiceId =
        serviceId;

    let finalTemplateId =
        templateId;

    try {

        if (
            window.CONFIG &&
            typeof window.CONFIG ===
            "object"
        ) {

            finalPublicKey =
                finalPublicKey ||
                window.CONFIG.EMAILJS_PUBLIC_KEY ||
                "";

            finalServiceId =
                finalServiceId ||
                window.CONFIG.EMAILJS_SERVICE_ID ||
                "";

            finalTemplateId =
                finalTemplateId ||
                window.CONFIG.EMAILJS_TEMPLATE_ID ||
                "";

        }

    } catch {

        /* ignore */

    }


    if (
        typeof emailjs ===
        "undefined"
    ) {

        console.error(
            "EmailJS library not loaded."
        );

        return;

    }


    if (
        !finalPublicKey ||
        !finalServiceId ||
        !finalTemplateId
    ) {

        console.error(
            "EmailJS configuration missing."
        );

        return;

    }


    try {

        emailjs.init({
            publicKey:
                finalPublicKey
        });

    } catch {

        try {

            emailjs.init(
                finalPublicKey
            );

        } catch {

            console.error(
                "EmailJS initialization failed."
            );

            return;

        }

    }


    if (
        form.dataset.emailReady ===
        "true"
    ) return;

    form.dataset.emailReady =
        "true";


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
                finalServiceId,
                finalTemplateId,
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
   49. QR CODE
========================================================== */

function generateWebsiteQR() {

    const qrBox =
        document.getElementById(
            "qrCode"
        );

    if (!qrBox) return;

    if (
        typeof QRCode ===
        "undefined"
    ) {

        showToast(
            "❌ QR Code Library Not Loaded"
        );

        return;

    }

    qrBox.innerHTML = "";

    new QRCode(
        qrBox,
        {

            text:
                window.location.href,

            width: 220,

            height: 220,

            colorDark:
                "#000000",

            colorLight:
                "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H

        }
    );

}


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

        } catch {

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


function initQR() {

    const generate =
        document.getElementById(
            "generateQRBtn"
        );

    const download =
        document.getElementById(
            "downloadQRBtn"
        );

    if (generate) {

        generate.addEventListener(
            "click",
            generateWebsiteQR
        );

    }

    if (download) {

        download.addEventListener(
            "click",
            downloadQRCode
        );

    }

}


/* ==========================================================
   50. COPY WEBSITE LINK
========================================================== */

function initCopyWebsiteLink() {

    const button =
        document.getElementById(
            "copyWebsiteBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                showToast(
                    "🔗 Website Link Copied"
                );

            } catch {

                showToast(
                    "❌ Unable to Copy Link"
                );

            }

        }
    );

}


/* ==========================================================
   51. VISITOR COUNTER
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
   52. SEO
========================================================== */

function initSEO() {

    document.title =
        "Adarsh Raj Shayar | Official";

    const description =
        document.querySelector(
            "meta[name='description']"
        );

    if (description) {

        description.content =
            "Official Hindi Shayari Website by Adarsh Raj";

    }

}


/* ==========================================================
   53. IMAGE SETTINGS
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
   54. BASIC WEBSITE PROTECTION
========================================================== */

function initBasicProtection() {

    document.addEventListener(
        "dragstart",
        event => {

            if (
                event.target.tagName ===
                "IMG"
            ) {

                event.preventDefault();

            }

        }
    );

}


/* ==========================================================
   55. KEYBOARD ESC
========================================================== */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMobileMenu();

                closeStoryReader();

            }

        }
    );

}


/* ==========================================================
   56. ERROR LOGGER
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
   57. MAIN INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🌹 Adarsh Raj Shayar Starting..."
        );

        /* CORE */

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


        /* CONTENT */

        loadAllShayari();

        loadPublishedShayari();

        loadStories();

        loadFavourite();


        /* ADMIN */

        initAdmin();

        initShayariPublishButtons();

        initStoryPublishButton();

        initStoryEvents();

        initAdminContentEvents();


        /* ACTIONS */

        initCardActions();


        /* CONTACT */

        initContactForm();


        /* QR */

        initQR();


        /* OTHER */

        initCopyWebsiteLink();

        initVisitorCounter();

        initSEO();

        initImages();

        initBasicProtection();

        initEscapeKey();

        createStoryReader();

        updateStatistics();


        console.log(
            "================================"
        );

        console.log(
            "🌹 Adarsh Raj Shayar"
        );

        console.log(
            "🚀 Version:",
            ARS_CONFIG.VERSION
        );

        console.log(
            "👨‍💻 Author:",
            ARS_CONFIG.AUTHOR
        );

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
   58. PAGE SHOW
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
   END
========================================================== */

console.log(
    "✅ Clean Professional script.js Loaded"
);
