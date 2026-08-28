/* =========================================================
   ARS OFFICIAL WEBSITE
   script.js
   Main Website Controller
   ========================================================= */

"use strict";

/* =========================================================
   ARS GLOBAL CONFIG
   ========================================================= */

const ARS_CONFIG = {
    siteName: "ARS Official Website",
    founder: "Adarsh Raj",
    version: "3.0.0",

    storage: {
        theme: "ARS_THEME",
        likes: "ARS_LIKES",
        favorites: "ARS_FAVORITES",
        search: "ARS_SEARCH"
    },

    paths: {
        certificate: "certificate.html",
        joining: "joining.html",
        admin: "admin.html"
    }
};


/* =========================================================
   SAFE DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();
    initializeHeader();
    initializeMobileMenu();
    initializeSmoothNavigation();
    initializeBackToTop();
    initializeSearch();
    initializeLikesAndFavorites();
    initializeQuickActions();
    initializeContactForm();
    initializeModalSystem();
    initializeScrollSpy();
    initializeExternalLinks();

    updateWebsiteStats();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🌹 ARS OFFICIAL WEBSITE");
    console.log("👤 Founder:", ARS_CONFIG.founder);
    console.log("⚙️ Version:", ARS_CONFIG.version);
    console.log("🔎 Search System: READY");
    console.log("❤️ Like System: READY");
    console.log("⭐ Favorite System: READY");
    console.log("🌓 Theme System: READY");
    console.log("📱 Mobile Navigation: READY");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

});


/* =========================================================
   PAGE LOADER
   ========================================================= */

function hidePageLoader() {

    const loader = $("#pageLoader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("loader-hidden");

        document.body.classList.remove("no-scroll");

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 500);
}


/*
 * window load is used instead of a short timer so that
 * images and page resources get a chance to load.
 */

window.addEventListener("load", hidePageLoader);


/* =========================================================
   THEME SYSTEM
   ========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(ARS_CONFIG.storage.theme);

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
    }

    updateThemeButton();

    const themeButton =
        $("#themeToggle");

    if (!themeButton) return;

    themeButton.addEventListener("click", toggleTheme);
}


function toggleTheme() {

    const html = document.documentElement;

    html.classList.toggle("dark-mode");

    const isDark =
        html.classList.contains("dark-mode");

    localStorage.setItem(
        ARS_CONFIG.storage.theme,
        isDark ? "dark" : "light"
    );

    updateThemeButton();

    showToast(
        isDark
            ? "🌙 Dark Mode ON"
            : "☀️ Light Mode ON"
    );
}


function updateThemeButton() {

    const button = $("#themeToggle");

    if (!button) return;

    const isDark =
        document.documentElement.classList
            .contains("dark-mode");

    button.innerHTML =
        isDark ? "☀️" : "🌙";

    button.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}


/* =========================================================
   HEADER
   ========================================================= */

function initializeHeader() {

    const header =
        $(".site-header");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuButton =
        $("#menuToggle");

    const closeButton =
        $("#mobileMenuClose");

    const menu =
        $("#mobileSideMenu");

    const overlay =
        $("#mobileMenuOverlay");

    if (!menuButton || !menu) return;


    function openMenu() {

        menu.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("no-scroll");

    }


    function closeMenu() {

        menu.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("no-scroll");

    }


    menuButton.addEventListener(
        "click",
        openMenu
    );


    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeMenu
        );
    }


    if (overlay) {
        overlay.addEventListener(
            "click",
            closeMenu
        );
    }


    $$(".mobile-nav-link", menu)
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("active")
            ) {
                closeMenu();
            }

        }
    );

}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

function initializeSmoothNavigation() {

    $$('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    history.replaceState(
                        null,
                        "",
                        targetId
                    );

                }
            );

        });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initializeBackToTop() {

    const button =
        $("#backToTop");

    if (!button) return;

    function checkScroll() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }

    checkScroll();

    window.addEventListener(
        "scroll",
        checkScroll,
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
   GLOBAL SEARCH
   ========================================================= */

function initializeSearch() {

    const input =
        $("#globalSearch");

    const clearButton =
        $("#clearSearch");

    const results =
        $("#globalSearchResults");

    const info =
        $("#searchResultsInfo");

    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value.trim().toLowerCase();

            localStorage.setItem(
                ARS_CONFIG.storage.search,
                input.value
            );

            if (clearButton) {

                clearButton.style.display =
                    query ? "block" : "none";

            }

            if (!query) {

                clearSearchResults();

                return;
            }

            performSearch(
                query,
                results,
                info
            );

        }
    );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                input.value = "";

                localStorage.removeItem(
                    ARS_CONFIG.storage.search
                );

                clearSearchResults();

                input.focus();

            }
        );

    }

}


function performSearch(
    query,
    resultsContainer,
    infoContainer
) {

    if (!resultsContainer) return;


    /*
     * Search all visible cards.
     */

    const cards = $$(
        ".shayari-card, " +
        ".story-card, " +
        ".poetry-card, " +
        ".content-card, " +
        "[data-searchable]"
    );


    const matches = cards.filter(card => {

        const text =
            card.textContent
                .toLowerCase();

        const dataSearch =
            (
                card.dataset.searchable ||
                ""
            ).toLowerCase();

        return (
            text.includes(query) ||
            dataSearch.includes(query)
        );

    });


    /*
     * Search important website sections too.
     */

    const sectionMatches = [];

    $$("section[id]").forEach(section => {

        const text =
            section.textContent
                .toLowerCase();

        if (text.includes(query)) {

            sectionMatches.push(section);

        }

    });


    resultsContainer.innerHTML = "";


    if (
        matches.length === 0 &&
        sectionMatches.length === 0
    ) {

        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>कोई परिणाम नहीं मिला</h3>
                <p>
                    दूसरे शब्द से दोबारा खोजने का प्रयास करें।
                </p>
            </div>
        `;

        if (infoContainer) {

            infoContainer.textContent =
                `"${query}" के लिए 0 परिणाम मिले।`;

        }

        return;

    }


    matches.slice(0, 12)
        .forEach(card => {

            const clone =
                card.cloneNode(true);

            clone.style.display = "";

            resultsContainer.appendChild(
                clone
            );

        });


    /*
     * If cards are not present, show matching sections.
     */

    if (
        matches.length === 0 &&
        sectionMatches.length > 0
    ) {

        sectionMatches
            .slice(0, 8)
            .forEach(section => {

                const title =
                    section.querySelector(
                        "h1,h2,h3"
                    );

                const result =
                    document.createElement("div");

                result.className =
                    "content-card";

                result.innerHTML = `
                    <span class="card-category">
                        SECTION
                    </span>

                    <h3>
                        ${
                            title
                                ? title.textContent
                                : section.id
                        }
                    </h3>

                    <p>
                        इस सेक्शन में आपकी खोज से
                        संबंधित सामग्री उपलब्ध है।
                    </p>

                    <div class="card-actions">
                        <button
                            class="btn btn-primary"
                            type="button"
                            data-scroll-target="#${section.id}">
                            Open Section →
                        </button>
                    </div>
                `;

                resultsContainer.appendChild(
                    result
                );

            });

    }


    if (infoContainer) {

        infoContainer.textContent =
            `${matches.length} परिणाम मिले।`;

    }


    bindDynamicSearchButtons(
        resultsContainer
    );

}


function bindDynamicSearchButtons(container) {

    $$(
        "[data-scroll-target]",
        container
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selector =
                    button.dataset.scrollTarget;

                const target =
                    document.querySelector(selector);

                if (!target) return;

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });

}


function clearSearchResults() {

    const results =
        $("#globalSearchResults");

    const info =
        $("#searchResultsInfo");

    if (results) {
        results.innerHTML = "";
    }

    if (info) {
        info.textContent = "";
    }

}


/* =========================================================
   LIKE + FAVORITE SYSTEM
   ========================================================= */

function initializeLikesAndFavorites() {

    const likes =
        getStorageObject(
            ARS_CONFIG.storage.likes
        );

    const favorites =
        getStorageObject(
            ARS_CONFIG.storage.favorites
        );


    /*
     * Existing buttons can use:
     *
     * data-like-id="..."
     * data-favorite-id="..."
     */

    $$("[data-like-id]")
        .forEach(button => {

            const id =
                button.dataset.likeId;

            updateLikeButton(
                button,
                Boolean(likes[id])
            );

            button.addEventListener(
                "click",
                () => {

                    const current =
                        getStorageObject(
                            ARS_CONFIG.storage.likes
                        );

                    current[id] =
                        !current[id];

                    saveStorageObject(
                        ARS_CONFIG.storage.likes,
                        current
                    );

                    updateLikeButton(
                        button,
                        Boolean(current[id])
                    );

                    showToast(
                        current[id]
                            ? "❤️ Liked"
                            : "💔 Like हटाया गया"
                    );

                }
            );

        });


    $$("[data-favorite-id]")
        .forEach(button => {

            const id =
                button.dataset.favoriteId;

            updateFavoriteButton(
                button,
                Boolean(favorites[id])
            );

            button.addEventListener(
                "click",
                () => {

                    const current =
                        getStorageObject(
                            ARS_CONFIG.storage.favorites
                        );

                    current[id] =
                        !current[id];

                    saveStorageObject(
                        ARS_CONFIG.storage.favorites,
                        current
                    );

                    updateFavoriteButton(
                        button,
                        Boolean(current[id])
                    );

                    showToast(
                        current[id]
                            ? "⭐ Favorite में सेव"
                            : "☆ Favorite से हटाया गया"
                    );

                }
            );

        });

}


function updateLikeButton(
    button,
    liked
) {

    button.classList.toggle(
        "liked",
        liked
    );

    button.setAttribute(
        "aria-pressed",
        String(liked)
    );

    const count =
        Number(button.dataset.likeCount || 0);

    button.innerHTML =
        liked
            ? `❤️ ${count || ""}`
            : `🤍 ${count || ""}`;

}


function updateFavoriteButton(
    button,
    favorited
) {

    button.classList.toggle(
        "favorited",
        favorited
    );

    button.setAttribute(
        "aria-pressed",
        String(favorited)
    );

    button.innerHTML =
        favorited
            ? "⭐ Saved"
            : "☆ Favorite";

}


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

function initializeQuickActions() {

    $$("[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    handleAction(action);

                }
            );

        });

}


function handleAction(action) {

    switch (action) {

        case "certificate":
            goToPage(
                ARS_CONFIG.paths.certificate
            );
            break;


        case "joining":
            goToPage(
                ARS_CONFIG.paths.joining
            );
            break;


        case "admin":
            goToPage(
                ARS_CONFIG.paths.admin
            );
            break;


        case "about":
            scrollToId("about");
            break;


        case "contact":
            scrollToId("contact");
            break;


        case "shayari":
            scrollToId("shayari");
            break;


        case "story":
            scrollToId("stories");
            break;


        default:
            console.warn(
                "Unknown ARS action:",
                action
            );

    }

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function goToPage(path) {

    if (!path) return;

    window.location.href = path;

}


function scrollToId(id) {

    const target =
        document.getElementById(id);

    if (!target) {

        console.warn(
            `ARS: Section #${id} not found.`
        );

        return;
    }

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initializeContactForm() {

    const form =
        $("#contactForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                form.querySelector(
                    '[name="name"]'
                );

            const email =
                form.querySelector(
                    '[name="email"]'
                );

            const message =
                form.querySelector(
                    '[name="message"]'
                );


            if (
                name &&
                !name.value.trim()
            ) {

                showToast(
                    "कृपया अपना नाम भरें।"
                );

                name.focus();

                return;
            }


            if (
                email &&
                email.value.trim() &&
                !isValidEmail(email.value)
            ) {

                showToast(
                    "कृपया सही Email डालें।"
                );

                email.focus();

                return;
            }


            if (
                message &&
                !message.value.trim()
            ) {

                showToast(
                    "कृपया अपना संदेश लिखें।"
                );

                message.focus();

                return;
            }


            /*
             * No fake backend submission.
             * If a real form service is connected,
             * its action will handle submission.
             */

            if (
                form.getAttribute("action") &&
                form.getAttribute("action") !== "#"
            ) {

                form.submit();

                return;
            }


            showToast(
                "✅ आपका संदेश तैयार है।"
            );

            form.reset();

        }
    );

}


function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   MODAL SYSTEM
   ========================================================= */

function initializeModalSystem() {

    $$("[data-modal-open]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.modalOpen;

                    openModal(id);

                }
            );

        });


    $$("[data-modal-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.modalClose;

                    closeModal(id);

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            const modal =
                event.target.closest(
                    ".content-modal"
                );

            if (!modal) return;

            if (
                event.target.classList
                    .contains("modal-overlay")
            ) {

                modal.classList.remove("active");

                document.body.classList
                    .remove("no-scroll");

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            $$(".content-modal.active")
                .forEach(modal => {

                    modal.classList.remove(
                        "active"
                    );

                });

            document.body.classList
                .remove("no-scroll");

        }
    );

}


function openModal(id) {

    if (!id) return;

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("active");

    document.body.classList.add(
        "no-scroll"
    );

}


function closeModal(id) {

    if (!id) return;

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove(
        "no-scroll"
    );

}


/* =========================================================
   SCROLL SPY
   ========================================================= */

function initializeScrollSpy() {

    const navLinks =
        $$(
            ".nav-link[href^='#'], " +
            ".mobile-nav-link[href^='#']"
        );

    if (!navLinks.length) return;


    const sections =
        $$("section[id]");

    if (!sections.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach(link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   EXTERNAL LINKS
   ========================================================= */

function initializeExternalLinks() {

    $$("a[href]")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            if (
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });

}


/* =========================================================
   WEBSITE STATISTICS
   ========================================================= */

function updateWebsiteStats() {

    const shayariCount =
        document.querySelectorAll(
            ".shayari-card"
        ).length;

    const storyCount =
        document.querySelectorAll(
            ".story-card"
        ).length;

    const certificateCount =
        document.querySelectorAll(
            ".certificate-card"
        ).length;


    updateStat(
        "[data-stat='shayari']",
        shayariCount
    );

    updateStat(
        "[data-stat='stories']",
        storyCount
    );

    updateStat(
        "[data-stat='certificates']",
        certificateCount
    );

}


function updateStat(
    selector,
    value
) {

    const element =
        $(selector);

    if (!element) return;

    /*
     * Do not replace a manually configured
     * statistic with zero.
     */

    if (value > 0) {
        element.textContent = value;
    }

}


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function getStorageObject(key) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) return {};

        const parsed =
            JSON.parse(value);

        if (
            typeof parsed !== "object" ||
            parsed === null ||
            Array.isArray(parsed)
        ) {
            return {};
        }

        return parsed;

    } catch (error) {

        console.warn(
            `ARS Storage Error [${key}]`,
            error
        );

        return {};

    }

}


function saveStorageObject(
    key,
    object
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(object)
        );

    } catch (error) {

        console.warn(
            `ARS Storage Save Error [${key}]`,
            error
        );

    }

}


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */

function showToast(message) {

    let toast =
        $("#arsToast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "arsToast";

        toast.className =
            "ars-toast";

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(
        window.arsToastTimer
    );


    window.arsToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   COPY TO CLIPBOARD
   ========================================================= */

async function copyText(text) {

    if (!text) return false;

    try {

        await navigator.clipboard.writeText(
            text
        );

        showToast(
            "📋 Copied!"
        );

        return true;

    } catch (error) {

        /*
         * Fallback for older browsers.
         */

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value = text;

        textarea.style.position =
            "fixed";

        textarea.style.opacity = "0";

        document.body.appendChild(
            textarea
        );

        textarea.select();

        try {

            document.execCommand("copy");

            showToast(
                "📋 Copied!"
            );

            textarea.remove();

            return true;

        } catch {

            textarea.remove();

            showToast(
                "Copy नहीं हो पाया।"
            );

            return false;

        }

    }

}


/* =========================================================
   SHARE SYSTEM
   ========================================================= */

async function shareARS(
    title = "ARS Official Website",
    text = "ARS Official Website"
) {

    const url =
        window.location.href;


    if (
        navigator.share
    ) {

        try {

            await navigator.share({
                title,
                text,
                url
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


    await copyText(url);

}


/* =========================================================
   DYNAMIC LIKE/FAVORITE SUPPORT
   ========================================================= */

function createReactionButtons(id) {

    const likes =
        getStorageObject(
            ARS_CONFIG.storage.likes
        );

    const favorites =
        getStorageObject(
            ARS_CONFIG.storage.favorites
        );


    const liked =
        Boolean(likes[id]);

    const favorited =
        Boolean(favorites[id]);


    return `
        <div class="card-actions">

            <button
                type="button"
                class="like-btn ${
                    liked ? "liked" : ""
                }"
                data-like-id="${escapeHTML(id)}"
                aria-pressed="${liked}">

                ${
                    liked
                        ? "❤️"
                        : "🤍"
                }
                Like
            </button>


            <button
                type="button"
                class="favorite-btn ${
                    favorited ? "favorited" : ""
                }"
                data-favorite-id="${escapeHTML(id)}"
                aria-pressed="${favorited}">

                ${
                    favorited
                        ? "⭐ Saved"
                        : "☆ Favorite"
                }

            </button>

        </div>
    `;

}


/* =========================================================
   EVENT DELEGATION FOR DYNAMIC CARDS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const likeButton =
            event.target.closest(
                "[data-like-id]"
            );

        if (
            likeButton &&
            !likeButton.dataset.arsBound
        ) {

            likeButton.dataset.arsBound =
                "true";

            const id =
                likeButton.dataset.likeId;

            const likes =
                getStorageObject(
                    ARS_CONFIG.storage.likes
                );

            likes[id] =
                !likes[id];

            saveStorageObject(
                ARS_CONFIG.storage.likes,
                likes
            );

            updateLikeButton(
                likeButton,
                likes[id]
            );

            showToast(
                likes[id]
                    ? "❤️ Liked"
                    : "💔 Like हटाया गया"
            );

            return;
        }


        const favoriteButton =
            event.target.closest(
                "[data-favorite-id]"
            );

        if (
            favoriteButton &&
            !favoriteButton.dataset.arsBound
        ) {

            favoriteButton.dataset.arsBound =
                "true";

            const id =
                favoriteButton.dataset.favoriteId;

            const favorites =
                getStorageObject(
                    ARS_CONFIG.storage.favorites
                );

            favorites[id] =
                !favorites[id];

            saveStorageObject(
                ARS_CONFIG.storage.favorites,
                favorites
            );

            updateFavoriteButton(
                favoriteButton,
                favorites[id]
            );

            showToast(
                favorites[id]
                    ? "⭐ Favorite में सेव"
                    : "☆ Favorite से हटाया गया"
            );

        }

    }
);


/* =========================================================
   CATEGORY FILTER SUPPORT
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const tab =
            event.target.closest(
                ".category-tab"
            );

        if (!tab) return;

        const category =
            (
                tab.dataset.category ||
                tab.textContent ||
                ""
            )
            .trim()
            .toLowerCase();


        const container =
            tab.closest(
                "section, .section-container"
            );


        if (!container) return;


        const cards =
            $$(
                ".shayari-card, " +
                ".story-card, " +
                ".poetry-card, " +
                ".content-card",
                container
            );


        /*
         * "all" shows everything.
         */

        $$(".category-tab", container)
            .forEach(item => {

                item.classList.toggle(
                    "active",
                    item === tab
                );

            });


        if (
            category === "all" ||
            category === "सभी"
        ) {

            cards.forEach(card => {

                card.style.display = "";

            });

            return;
        }


        cards.forEach(card => {

            const cardCategory =
                (
                    card.dataset.category ||
                    card.querySelector(
                        ".card-category"
                    )?.textContent ||
                    ""
                )
                .trim()
                .toLowerCase();


            const searchable =
                card.textContent
                    .toLowerCase();


            const match =
                cardCategory.includes(category) ||
                searchable.includes(category);


            card.style.display =
                match ? "" : "none";

        });

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
    "error",
    event => {

        const image =
            event.target;

        if (
            image &&
            image.tagName === "IMG"
        ) {

            image.classList.add(
                "image-load-error"
            );

            /*
             * Do not replace user assets automatically.
             */

            console.warn(
                "ARS image could not load:",
                image.src
            );

        }

    },
    true
);


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * "/" focuses global search.
         */

        if (
            event.key === "/" &&
            !isTypingField(event.target)
        ) {

            event.preventDefault();

            const search =
                $("#globalSearch");

            if (search) {
                search.focus();
            }

        }


        /*
         * Escape clears search.
         */

        if (
            event.key === "Escape" &&
            document.activeElement?.id ===
            "globalSearch"
        ) {

            const search =
                $("#globalSearch");

            if (search) {

                search.value = "";

                clearSearchResults();

                search.blur();

            }

        }

    }
);


function isTypingField(element) {

    if (!element) return false;

    const tag =
        element.tagName;

    return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        element.isContentEditable
    );

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   PUBLIC ARS API
   Other files can safely use these functions.
   ========================================================= */

window.ARS = {

    config: ARS_CONFIG,

    toast: showToast,

    search: performSearch,

    openModal,

    closeModal,

    goToPage,

    scrollToId,

    copyText,

    share: shareARS,

    getStorage: getStorageObject,

    saveStorage: saveStorageObject,

    escapeHTML

};


/* =========================================================
   FINAL LOAD MESSAGE
   ========================================================= */

console.log(
    "🌹 ARS Official Website Loaded"
);
