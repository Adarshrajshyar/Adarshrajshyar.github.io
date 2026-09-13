/* =========================================================
   ARS OFFICIAL — MAIN WEBSITE SCRIPT
   Founder: Adarsh Raj
   Website: Adarsh Raj Shayar
   Version: 5.0.0
   ========================================================= */

"use strict";

/* =========================================================
   1. GLOBAL CONFIG
   ========================================================= */

const ARS_APP = {
    name: "ARS Official",
    founder: "Adarsh Raj",
    shortName: "ARS",
    version: "5.0.0",

    storage: {
        theme: "ARS_THEME",
        favorites: "ARS_FAVORITES",
        likes: "ARS_LIKES",
        saves: "ARS_SAVES",
        certificates: "ARS_CERTIFICATES",
        joining: "ARS_JOINING_APPLICATIONS",
        education: "ARS_EDUCATION_CONTENT",
        firstFlight: "ARS_FIRST_FLIGHT"
    }
};


/* =========================================================
   2. SAFE LOCAL STORAGE
   ========================================================= */

function arsGet(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}


function arsSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("ARS Storage Error:", error);
        return false;
    }
}


function arsRemove(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("ARS Remove Error:", error);
    }
}


/* =========================================================
   3. PAGE LOADER
   ========================================================= */

function arsPageLoader() {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

            setTimeout(() => {
                loader.remove();
            }, 500);

        }, 300);

    });
}


/* =========================================================
   4. TOAST MESSAGE
   ========================================================= */

function arsToast(message, type = "success") {

    let toast = document.getElementById("arsToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "arsToast";
        toast.className = "ars-toast";

        document.body.appendChild(toast);
    }

    toast.className = `ars-toast ${type}`;
    toast.textContent = message;

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    clearTimeout(window.arsToastTimer);

    window.arsToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================================================
   5. THEME — LIGHT / DARK
   ========================================================= */

function arsApplyTheme(theme) {

    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
    }

    const buttons = document.querySelectorAll(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    );

    buttons.forEach(button => {

        button.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        button.innerHTML =
            theme === "dark" ? "☀️" : "🌙";

    });
}


function arsInitTheme() {

    let savedTheme = localStorage.getItem(
        ARS_APP.storage.theme
    );

    if (!savedTheme) {

        savedTheme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
    }

    arsApplyTheme(savedTheme);

    document.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-theme-toggle], #themeToggle, .theme-toggle"
        );

        if (!button) return;

        const current =
            document.documentElement.classList.contains("dark")
                ? "dark"
                : "light";

        const next =
            current === "dark" ? "light" : "dark";

        localStorage.setItem(
            ARS_APP.storage.theme,
            next
        );

        arsApplyTheme(next);
    });
}


/* =========================================================
   6. MOBILE NAVIGATION
   ========================================================= */

function arsInitNavigation() {

    const menuButton =
        document.querySelector(
            "#menuToggle, .menu-toggle, [data-menu-toggle]"
        );

    const nav =
        document.querySelector(
            "#mainNav, .main-nav, nav"
        );

    if (!menuButton || !nav) return;

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuButton.classList.toggle("active");

        const expanded =
            menuButton.classList.contains("active");

        menuButton.setAttribute(
            "aria-expanded",
            expanded ? "true" : "false"
        );
    });


    document.addEventListener("click", event => {

        if (
            !nav.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            nav.classList.remove("active");
            menuButton.classList.remove("active");
        }

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuButton.classList.remove("active");

        });

    });
}


/* =========================================================
   7. ACTIVE NAV LINK
   ========================================================= */

function arsSetActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll("nav a, .nav-link").forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const page =
            href.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            page === currentPage ||
            (
                currentPage === "" &&
                page === "index.html"
            )
        ) {
            link.classList.add("active");
        }

    });
}


/* =========================================================
   8. SCROLL EFFECT
   ========================================================= */

function arsScrollEffect() {

    const header =
        document.querySelector(
            "header, .header, .site-header"
        );

    if (!header) return;

    const checkScroll = () => {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        checkScroll,
        { passive: true }
    );

    checkScroll();
}


/* =========================================================
   9. BACK TO TOP
   ========================================================= */

function arsBackToTop() {

    let button =
        document.querySelector(
            "#backToTop, .back-to-top"
        );

    if (!button) {

        button = document.createElement("button");

        button.id = "backToTop";
        button.className = "back-to-top";
        button.innerHTML = "↑";
        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(button);
    }

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }

    }, { passive: true });


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================================================
   10. SMOOTH ANCHOR SCROLL
   ========================================================= */

function arsSmoothScroll() {

    document.addEventListener("click", event => {

        const link =
            event.target.closest('a[href^="#"]');

        if (!link) return;

        const id =
            link.getAttribute("href");

        if (!id || id === "#") return;

        const target =
            document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });
}


/* =========================================================
   11. FAVORITES
   ========================================================= */

function getFavorites() {

    return arsGet(
        ARS_APP.storage.favorites,
        []
    );
}


function isFavorite(id) {

    if (!id) return false;

    return getFavorites()
        .map(String)
        .includes(String(id));
}


function toggleFavorite(id) {

    if (!id) return false;

    let favorites = getFavorites();

    const value = String(id);

    const index =
        favorites.map(String).indexOf(value);

    if (index >= 0) {

        favorites.splice(index, 1);

        arsSet(
            ARS_APP.storage.favorites,
            favorites
        );

        arsUpdateFavoriteButtons();

        arsToast(
            "Removed from Favorites",
            "info"
        );

        return false;

    } else {

        favorites.push(id);

        arsSet(
            ARS_APP.storage.favorites,
            favorites
        );

        arsUpdateFavoriteButtons();

        arsToast(
            "Added to Favorites ❤️",
            "success"
        );

        return true;
    }
}


function arsUpdateFavoriteButtons() {

    document.querySelectorAll(
        "[data-favorite], .favorite-btn"
    ).forEach(button => {

        const id =
            button.dataset.favorite ||
            button.dataset.id;

        if (!id) return;

        const active =
            isFavorite(id);

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            active ? "true" : "false"
        );

        const icon =
            button.querySelector(
                ".favorite-icon"
            );

        if (icon) {
            icon.textContent =
                active ? "❤️" : "🤍";
        }

    });
}


/* =========================================================
   12. LIKES
   ========================================================= */

function getLikes() {

    return arsGet(
        ARS_APP.storage.likes,
        {}
    );
}


function hasLiked(id) {

    if (!id) return false;

    const likes = getLikes();

    return !!likes[String(id)];
}


function toggleLike(id) {

    if (!id) return false;

    const likes = getLikes();
    const key = String(id);

    likes[key] = !likes[key];

    arsSet(
        ARS_APP.storage.likes,
        likes
    );

    arsUpdateLikeButtons();

    if (likes[key]) {
        arsToast("Liked ❤️", "success");
    } else {
        arsToast("Like removed", "info");
    }

    return likes[key];
}


function arsUpdateLikeButtons() {

    const likes = getLikes();

    document.querySelectorAll(
        "[data-like], .like-btn"
    ).forEach(button => {

        const id =
            button.dataset.like ||
            button.dataset.id;

        if (!id) return;

        const active =
            !!likes[String(id)];

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            active ? "true" : "false"
        );

    });
}


/* =========================================================
   13. SAVES
   ========================================================= */

function getSaves() {

    return arsGet(
        ARS_APP.storage.saves,
        []
    );
}


function isSaved(id) {

    return getSaves()
        .map(String)
        .includes(String(id));
}


function toggleSave(id) {

    if (!id) return false;

    let saves = getSaves();

    const value = String(id);

    const index =
        saves.map(String).indexOf(value);

    if (index >= 0) {

        saves.splice(index, 1);

        arsToast(
            "Removed from Saved",
            "info"
        );

        arsSet(
            ARS_APP.storage.saves,
            saves
        );

        return false;

    } else {

        saves.push(id);

        arsSet(
            ARS_APP.storage.saves,
            saves
        );

        arsToast(
            "Saved successfully 🔖",
            "success"
        );

        return true;
    }
}


/* =========================================================
   14. GLOBAL LIKE/FAVORITE/SAVE CLICK HANDLER
   ========================================================= */

function arsInitContentActions() {

    document.addEventListener("click", event => {

        const favorite =
            event.target.closest(
                "[data-favorite], .favorite-btn"
            );

        if (favorite)
