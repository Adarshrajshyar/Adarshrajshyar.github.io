/* =========================================================
   ARS MAIN SCRIPT
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initHeader();
    initMobileMenu();
    initNavigation();
    initBackTop();
    initSearch();
    initReactions();
    initContact();
    initYear();

    console.log("🌹 ARS Official Website Loaded");

});


/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    loader.classList.add("loader-hidden");

    setTimeout(() => {
        loader.style.display = "none";
    }, 600);

});


/* ================= THEME ================= */

function initTheme() {

    const button =
        document.getElementById("themeToggle");

    const saved =
        localStorage.getItem(
            ARS_CONFIG.storage.theme
        );

    if (saved === "dark") {
        document.documentElement
            .classList.add("dark-mode");
    }

    updateThemeIcon();

    if (!button) return;

    button.addEventListener("click", () => {

        document.documentElement
            .classList.toggle("dark-mode");

        const dark =
            document.documentElement
                .classList.contains("dark-mode");

        localStorage.setItem(
            ARS_CONFIG.storage.theme,
            dark ? "dark" : "light"
        );

        updateThemeIcon();

    });

}


function updateThemeIcon() {

    const button =
        document.getElementById("themeToggle");

    if (!button) return;

    button.textContent =
        document.documentElement
            .classList.contains("dark-mode")
            ? "☀️"
            : "🌙";

}


/* ================= HEADER ================= */

function initHeader() {

    const header =
        document.querySelector(".site-header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }, { passive: true });

}


/* ================= MOBILE MENU ================= */

function initMobileMenu() {

    const menu =
        document.getElementById("mobileSideMenu");

    const overlay =
        document.getElementById("mobileMenuOverlay");

    const open =
        document.getElementById("menuToggle");

    const close =
        document.getElementById("mobileMenuClose");

    if (!menu || !open) return;


    function openMenu() {

        menu.classList.add("active");

        if (overlay)
            overlay.classList.add("active");

        document.body.classList.add("no-scroll");

    }


    function closeMenu() {

        menu.classList.remove("active");

        if (overlay)
            overlay.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    open.addEventListener(
        "click",
        openMenu
    );

    if (close)
        close.addEventListener(
            "click",
            closeMenu
        );

    if (overlay)
        overlay.addEventListener(
            "click",
            closeMenu
        );

    document.querySelectorAll(
        ".mobile-nav-link"
    ).forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });

}


/* ================= NAVIGATION ================= */

function initNavigation() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#")
                    return;

                const target =
                    document.querySelector(id);

                if (!target)
                    return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* ================= BACK TOP ================= */

function initBackTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener(
        "scroll",
        () => {

            button.classList.toggle(
                "show",
                window.scrollY > 500
            );

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


/* ================= SEARCH ================= */

function initSearch() {

    const input =
        document.getElementById("globalSearch");

    const clear =
        document.getElementById("clearSearch");

    const results =
        document.getElementById(
            "globalSearchResults"
        );

    const info =
        document.getElementById(
            "searchResultsInfo"
        );

    if (!input || !results)
        return;


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();

            clear.style.display =
                query ? "block" : "none";

            results.innerHTML = "";

            if (!query) {

                info.textContent = "";

                return;

            }


            const searchable =
                document.querySelectorAll(
                    ".content-card, .feature-card"
                );

            let count = 0;


            searchable.forEach(card => {

                const text =
                    card.textContent
                        .toLowerCase();

                if (!text.includes(query))
                    return;


                const copy =
                    card.cloneNode(true);

                results.appendChild(copy);

                count++;

            });


            info.textContent =
                `${count} परिणाम मिले।`;


            if (!count) {

                results.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">🔍</div>
                        <h3>कोई परिणाम नहीं मिला</h3>
                        <p>दूसरा keyword try करें।</p>
                    </div>
                `;

            }

        }
    );


    clear.addEventListener(
        "click",
        () => {

            input.value = "";
            results.innerHTML = "";
            info.textContent = "";
            clear.style.display = "none";
            input.focus();

        }
    );

}


/* ================= LIKE / FAVORITE ================= */

function initReactions() {

    document.addEventListener(
        "click",
        event => {

            const like =
                event.target.closest(
                    "[data-like-id]"
                );

            if (like) {

                toggleReaction(
                    "likes",
                    like.dataset.likeId,
                    like
                );

                return;

            }


            const favorite =
                event.target.closest(
                    "[data-favorite-id]"
                );

            if (favorite) {

                toggleReaction(
                    "favorites",
                    favorite.dataset.favoriteId,
                    favorite
                );

            }

        }
    );

}


function toggleReaction(
    type,
    id,
    button
) {

    const key =
        type === "likes"
            ? ARS_CONFIG.storage.likes
            : ARS_CONFIG.storage.favorites;


    let data = {};

    try {

        data =
            JSON.parse(
                localStorage.getItem(key)
            ) || {};

    } catch {

        data = {};

    }


    data[id] = !data[id];

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );


    if (type === "likes") {

        button.classList.toggle(
            "liked",
            data[id]
        );

        button.textContent =
            data[id]
                ? "❤️ Liked"
                : "🤍 Like";

    } else {

        button.classList.toggle(
            "favorited",
            data[id]
        );

        button.textContent =
            data[id]
                ? "⭐ Saved"
                : "☆ Favorite";

    }

    showToast(
        data[id]
            ? "Saved successfully"
            : "Removed"
    );

}


/* ================= CONTACT ================= */

function initContact() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                form.elements.name.value.trim();

            const message =
                form.elements.message.value.trim();

            if (!name || !message) {

                showToast(
                    "कृपया सभी जरूरी जानकारी भरें।"
                );

                return;

            }

            showToast(
                "✅ Message तैयार है।"
            );

            form.reset();

        }
    );

}


/* ================= YEAR ================= */

function initYear() {

    const year =
        document.getElementById(
            "currentYear"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "arsToast"
        );

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.arsToastTimer
    );

    window.arsToastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2300);

}


/* ================= GLOBAL API ================= */

window.ARS = {

    toast: showToast,

    scrollTo: id => {

        const target =
            document.getElementById(id);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    }

};
