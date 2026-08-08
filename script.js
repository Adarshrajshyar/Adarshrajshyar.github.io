"use strict";

/* ==========================================================
   Adarsh Raj Shayar
   Professional Script v12
   Part 1 : Foundation
========================================================== */

console.clear();
console.log("🌹 Adarsh Raj Shayar v12 Loading...");

/* ==========================================================
   CONFIG
========================================================== */

const CONFIG = {

    WEBSITE_NAME: "Adarsh Raj Shayar",

    WEBSITE_VERSION: "12.0",

    WEBSITE_AUTHOR: "Adarsh Raj",

    ADMIN_PASSWORD: "ARS2026",

    STORAGE: {

        THEME: "ars_theme",

        VISITED: "ars_visited",

        LIKES: "ars_likes",

        FAVOURITES: "ars_favourites",

        SHAYARI: "ars_custom_shayari",

        STORIES: "ars_stories"

    }

};

/* ==========================================================
   DOM SHORTCUTS
========================================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const body = document.body;

const toast = $("#toast");

const popup = $("#welcomePopup");

const enterBtn = $("#enterBtn");

const darkBtn = $("#darkModeBtn");

const searchInput = $("#search");

const menuBtn = $("#menuBtn");

const nav = $("nav");

const overlay = $("#overlay");

const topBtn = $("#topBtn");

const progressBar = $("#progressBar");

const currentYear = $("#currentYear");

/* ==========================================================
   STORAGE
========================================================== */

const Storage = {

    get(key, fallback = null) {

        try {

            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) : fallback;

        } catch {

            return fallback;

        }

    },

    set(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    },

    remove(key) {

        localStorage.removeItem(key);

    }

};

/* ==========================================================
   GLOBAL DATA
========================================================== */

let likedShayari =
Storage.get(CONFIG.STORAGE.LIKES, []);

let favouriteShayari =
Storage.get(CONFIG.STORAGE.FAVOURITES, []);

let customShayari =
Storage.get(CONFIG.STORAGE.SHAYARI, []);

let stories =
Storage.get(CONFIG.STORAGE.STORIES, []);

let isAdmin =
sessionStorage.getItem("ARS_ADMIN") === "true";

/* ==========================================================
   SAVE ALL DATA
========================================================== */

function saveAllData() {

    Storage.set(CONFIG.STORAGE.LIKES, likedShayari);

    Storage.set(CONFIG.STORAGE.FAVOURITES, favouriteShayari);

    Storage.set(CONFIG.STORAGE.SHAYARI, customShayari);

    Storage.set(CONFIG.STORAGE.STORIES, stories);

}

/* ==========================================================
   TOAST
========================================================== */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}

console.log("✅ Part 1 Loaded");
/* ==========================================================
   PART 2 : UI CORE
========================================================== */

/* =========================
   CURRENT YEAR
========================= */

function initCurrentYear() {

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }

}

/* =========================
   LOADER
========================= */

function initLoader() {

    const loader = $("#loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loader-hide");

        }, 700);

    });

}

/* =========================
   WELCOME POPUP
========================= */

function initPopup() {

    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (!popup || !enterBtn) return;

    if (localStorage.getItem("ars_visited")) {

        popup.style.display = "none";

        return;

    }

    enterBtn.addEventListener("click", function () {

        popup.style.display = "none";

        localStorage.setItem("ars_visited", "true");

        showToast("🌹 Welcome to Adarsh Raj Shayar");

    });

}

/* =========================
   DARK MODE
========================= */

function initTheme() {

    const theme = Storage.get(CONFIG.STORAGE.THEME, "dark");

    if (theme === "light") {

        body.classList.add("light-mode");

    }

    updateThemeIcon();

    if (darkBtn) {

        darkBtn.onclick = toggleTheme;

    }

}

function toggleTheme() {

    body.classList.toggle("light-mode");

    const mode = body.classList.contains("light-mode")
        ? "light"
        : "dark";

    Storage.set(CONFIG.STORAGE.THEME, mode);

    updateThemeIcon();

    showToast(
        mode === "light"
            ? "☀️ Light Mode Enabled"
            : "🌙 Dark Mode Enabled"
    );

}

function updateThemeIcon() {

    if (!darkBtn) return;

    darkBtn.innerHTML =
        body.classList.contains("light-mode")
            ? "🌙"
            : "☀️";

}

/* =========================
   MOBILE MENU
========================= */

function initMenu() {

    if (!menuBtn || !nav || !overlay) return;

    menuBtn.onclick = () => {

        nav.classList.toggle("active");

        overlay.classList.toggle("active");

        body.classList.toggle("menu-open");

    };

    overlay.onclick = closeMenu;

}

function closeMenu() {

    nav.classList.remove("active");

    overlay.classList.remove("active");

    body.classList.remove("menu-open");

}

/* =========================
   SEARCH
========================= */

function initSearch() {

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value
            .toLowerCase()
            .trim();

        document.querySelectorAll(".card").forEach(card => {

            card.style.display =
                card.innerText.toLowerCase().includes(keyword)
                    ? ""
                    : "none";

        });

    });

}

/* =========================
   BACK TO TOP
========================= */

function initBackToTop() {

    if (!topBtn) return;

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 300
                ? "block"
                : "none";

    });

    topBtn.onclick = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

}

/* =========================
   PROGRESS BAR
========================= */

function initProgressBar() {

    if (!progressBar) return;

    window.addEventListener("scroll", () => {

        const h = document.documentElement;

        const percent =
            (h.scrollTop /
                (h.scrollHeight - h.clientHeight)) * 100;

        progressBar.style.width = percent + "%";

    });

}

/* =========================
   ACTIVE MENU
========================= */

function initActiveMenu() {

    const sections = $$("section[id]");

    const links = $$("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(sec => {

            if (window.scrollY >= sec.offsetTop - 150) {

                current = sec.id;

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* =========================
   SMOOTH SCROLL
========================= */

function initSmoothScroll() {

    $$('nav a[href^="#"]').forEach(link => {

        link.onclick = function (e) {

            e.preventDefault();

            const target = $(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

            closeMenu();

        };

    });

}

console.log("✅ Part 2 Loaded");
/* ==========================================================
   PART 3A : SHAYARI ENGINE
========================================================== */

/* =========================
   CREATE SHAYARI CARD
========================= */

function createCard(item) {

    return `
    <div class="card">

        <h3>${item.title}</h3>

        <p class="shayariText">
            ${item.text.replace(/\n/g, "<br>")}
        </p>

        <div class="meta">

            <span>✍️ ${item.author}</span>

            <span>📅 ${item.date || ""}</span>

        </div>

        <div class="actionButtons">

            <button class="copyBtn">
                📋 Copy
            </button>

            <button class="shareBtn">
                📤 Share
            </button>

            <button class="likeBtn">
                ❤️ Like
            </button>

            <button class="favBtn">
                ⭐ Favourite
            </button>

        </div>

    </div>
    `;

}

/* =========================
   CATEGORY RENDER
========================= */

function renderCategory(category, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    const list = [

        ...(typeof shayariData !== "undefined"

            ? shayariData.filter(s => s.category === category)

            : []),

        ...customShayari.filter(s => s.category === category)

    ];

    if (list.length === 0) {

        container.innerHTML = `
        <div class="card">
            <h3>No Shayari Available</h3>
        </div>`;

        return;

    }

    list.forEach(item => {

        container.innerHTML += createCard(item);

    });

}

/* =========================
   LOAD ALL SHAYARI
========================= */

function loadAllShayari() {

    renderCategory("Love", "loveContainer");

    renderCategory("Sad", "sadContainer");

    renderCategory("Attitude", "attitudeContainer");

    renderCategory("Friendship", "friendshipContainer");

    renderCategory("Motivation", "motivationContainer");

}

/* =========================
   COPY
========================= */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast("📋 Copied Successfully");

    } catch {

        showToast("❌ Copy Failed");

    }

}

/* =========================
   SHARE
========================= */

async function shareText(text) {

    if (navigator.share) {

        try {

            await navigator.share({

                title: CONFIG.WEBSITE_NAME,

                text,

                url: location.href

            });

        } catch (err) {}

    } else {

        copyText(text);

    }

}

console.log("✅ Part 3A Loaded");
/* ==========================================================
   PART 3B : LIKE • FAVOURITE • BUTTONS
========================================================== */

/* =========================
   LIKE
========================= */

function toggleLike(text){

    const index = likedShayari.indexOf(text);

    if(index === -1){

        likedShayari.push(text);

        showToast("❤️ Liked");

    }else{

        likedShayari.splice(index,1);

        showToast("💔 Like Removed");

    }

    saveAllData();

}

/* =========================
   FAVOURITE
========================= */

function toggleFavourite(text){

    const index = favouriteShayari.indexOf(text);

    if(index === -1){

        favouriteShayari.push(text);

        showToast("⭐ Added to Favourite");

    }else{

        favouriteShayari.splice(index,1);

        showToast("❌ Favourite Removed");

    }

    saveAllData();

    loadFavourite();

}

/* =========================
   BUTTON EVENTS
========================= */

document.addEventListener("click",function(e){

    const card=e.target.closest(".card");

    if(!card) return;

    const text=card.querySelector(".shayariText")?.innerText;

    if(!text) return;

    if(e.target.classList.contains("copyBtn")){

        copyText(text);

    }

    if(e.target.classList.contains("shareBtn")){

        shareText(text);

    }

    if(e.target.classList.contains("likeBtn")){

        toggleLike(text);

        e.target.classList.toggle("active");

        e.target.innerHTML=

            likedShayari.includes(text)

            ? "💖 Liked"

            : "❤️ Like";

    }

    if(e.target.classList.contains("favBtn")){

        toggleFavourite(text);

        e.target.classList.toggle("active");

        e.target.innerHTML=

            favouriteShayari.includes(text)

            ? "🌟 Saved"

            : "⭐ Favourite";

    }

});

/* =========================
   RESTORE BUTTONS
========================= */

function restoreButtons(){

    document.querySelectorAll(".card").forEach(card=>{

        const text=card.querySelector(".shayariText")?.innerText;

        if(!text) return;

        const likeBtn=card.querySelector(".likeBtn");

        const favBtn=card.querySelector(".favBtn");

        if(likeBtn){

            if(likedShayari.includes(text)){

                likeBtn.classList.add("active");

                likeBtn.innerHTML="💖 Liked";

            }

        }

        if(favBtn){

            if(favouriteShayari.includes(text)){

                favBtn.classList.add("active");

                favBtn.innerHTML="🌟 Saved";

            }

        }

    });

}

/* =========================
   LOAD FAVOURITE
========================= */

function loadFavourite(){

    const container=document.getElementById("favoriteList");

    if(!container) return;

    container.innerHTML="";

    if(favouriteShayari.length===0){

        container.innerHTML="<p>No Favourite Shayari</p>";

        return;

    }

    favouriteShayari.forEach(text=>{

        container.innerHTML+=`

        <div class="card">

            <p class="shayariText">${text}</p>

        </div>

        `;

    });

}

console.log("✅ Part 3B Loaded");
/* ==========================================================
   PART 3C : SEARCH • RANDOM • STATISTICS
========================================================== */

/* =========================
   SEARCH SYSTEM
========================= */

function initSearch() {

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display =

                text.includes(keyword)

                ? ""

                : "none";

        });

    });

}

/* =========================
   GET ALL SHAYARI
========================= */

function getAllShayari() {

    return [

        ...(typeof shayariData !== "undefined"

            ? shayariData

            : []),

        ...customShayari

    ];

}

/* =========================
   RANDOM SHAYARI
========================= */

function getRandomShayari() {

    const list = getAllShayari();

    if (list.length === 0) return null;

    return list[Math.floor(Math.random() * list.length)];

}

/* =========================
   TODAY SHAYARI
========================= */

function getTodayShayari() {

    const list = getAllShayari();

    if (list.length === 0) return null;

    const day = new Date().getDate();

    return list[day % list.length];

}

/* =========================
   STATISTICS
========================= */

function getStatistics() {

    return {

        totalShayari: getAllShayari().length,

        totalStories: stories.length,

        totalLikes: likedShayari.length,

        totalFavourite: favouriteShayari.length

    };

}

/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics() {

    const stats = getStatistics();

    console.table(stats);

}

/* =========================
   RANDOM CONSOLE MESSAGE
========================= */

(function () {

    const item = getRandomShayari();

    if (item) {

        console.log("🌹 Random Shayari");

        console.log(item.title);

    }

})();

/* =========================
   PRELOAD IMAGES
========================= */

function preloadImages() {

    [

        "logo.png",

        "banner.png"

    ].forEach(src => {

        const img = new Image();

        img.src = src;

    });

}

/* =========================
   PAGE SHOW
========================= */

window.addEventListener("pageshow", () => {

    restoreButtons();

    updateStatistics();

});

/* =========================
   START
========================= */

preloadImages();

console.log("✅ Part 3C Loaded");
/* ==========================================================
   PART 4A : ADMIN LOGIN & SECURITY
========================================================== */

const ADMIN_SESSION_KEY = "ARS_ADMIN_SESSION";

/* =========================
   ADMIN STATUS
========================= */

function isLoggedIn() {

    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";

}

function setAdminLogin(status) {

    sessionStorage.setItem(

        ADMIN_SESSION_KEY,

        status ? "true" : "false"

    );

    isAdmin = status;

}

/* =========================
   ADMIN LOGIN
========================= */

function initAdmin() {

    const loginBox = document.getElementById("adminLogin");

    const panel = document.getElementById("publisherPanel");

    const loginBtn = document.getElementById("loginBtn");

    const passwordInput = document.getElementById("adminPassword");

    if (!loginBtn) return;

    if (isLoggedIn()) {

        isAdmin = true;

        if (loginBox) loginBox.style.display = "none";

        if (panel) panel.style.display = "block";

    } else {

        isAdmin = false;

        if (loginBox) loginBox.style.display = "block";

        if (panel) panel.style.display = "none";

    }

    loginBtn.onclick = function () {

        const password = passwordInput.value.trim();

        if (password !== CONFIG.ADMIN_PASSWORD) {

            showToast("❌ Wrong Password");

            passwordInput.focus();

            return;

        }

        setAdminLogin(true);

        if (loginBox) loginBox.style.display = "none";

        if (panel) panel.style.display = "block";

        passwordInput.value = "";

        showToast("✅ Admin Login Success");

    };

}

/* =========================
   LOGOUT
========================= */

function logoutAdmin() {

    setAdminLogin(false);

    const loginBox = document.getElementById("adminLogin");

    const panel = document.getElementById("publisherPanel");

    if (loginBox) loginBox.style.display = "block";

    if (panel) panel.style.display = "none";

    showToast("👋 Logged Out");

}

/* =========================
   ADMIN CHECK
========================= */

function checkAdmin() {

    if (!isLoggedIn()) {

        showToast("🔒 Admin Login Required");

        return false;

    }

    return true;

}

console.log("✅ Part 4A Loaded");
/* ==========================================================
   PART 4B : PROFESSIONAL SHAYARI PUBLISHER
========================================================== */

/* =========================
   AUTO DRAFT
========================= */

function loadDraft() {

    const title = document.getElementById("pubTitle");
    const text = document.getElementById("pubText");
    const author = document.getElementById("pubAuthor");

    if (title) title.value = localStorage.getItem("draft_title") || "";
    if (text) text.value = localStorage.getItem("draft_text") || "";
    if (author) author.value = localStorage.getItem("draft_author") || "";

}

function saveDraft() {

    localStorage.setItem(
        "draft_title",
        document.getElementById("pubTitle").value
    );

    localStorage.setItem(
        "draft_text",
        document.getElementById("pubText").value
    );

    localStorage.setItem(
        "draft_author",
        document.getElementById("pubAuthor").value
    );

}

/* =========================
   PUBLISH SHAYARI
========================= */

function publishShayari() {

    if (!checkAdmin()) return;

    const title =
        document.getElementById("pubTitle").value.trim();

    const category =
        document.getElementById("pubCategory").value;

    const text =
        document.getElementById("pubText").value.trim();

    const author =
        document.getElementById("pubAuthor").value.trim();

    const publisher =
        document.getElementById("pubPublisher").value.trim()
        || "Adarsh Raj";

    if (title.length < 3) {

        showToast("⚠ Title Too Short");

        return;

    }

    if (text.length < 10) {

        showToast("⚠ Shayari Too Short");

        return;

    }

    const item = {

        id: Date.now(),

        title,

        category,

        text,

        author: author || "Unknown",

        publisher,

        date: new Date().toLocaleString()

    };

    customShayari.unshift(item);

    saveAllData();

    loadPublishedShayari();

    loadAllShayari();

    localStorage.removeItem("draft_title");
    localStorage.removeItem("draft_text");
    localStorage.removeItem("draft_author");

    document.getElementById("pubTitle").value = "";
    document.getElementById("pubText").value = "";
    document.getElementById("pubAuthor").value = "";

    showToast("✅ Shayari Published Successfully");

}

/* =========================
   INIT
========================= */

function initPublishButton() {

    const btn = document.getElementById("publishBtn");

    if (!btn) return;

    loadDraft();

    ["pubTitle", "pubText", "pubAuthor"].forEach(id => {

        const input = document.getElementById(id);

        if (input) {

            input.addEventListener("input", saveDraft);

        }

    });

    btn.addEventListener("click", publishShayari);

}

console.log("✅ Part 4B Loaded");
/* ==========================================================
   PART 4C : EDIT • DELETE • LIVE UPDATE
========================================================== */

/* =========================
   EDIT SHAYARI
========================= */

function editShayari(index) {

    if (!checkAdmin()) return;

    const item = customShayari[index];

    if (!item) return;

    document.getElementById("pubTitle").value = item.title;
    document.getElementById("pubCategory").value = item.category;
    document.getElementById("pubText").value = item.text;
    document.getElementById("pubAuthor").value = item.author;
    document.getElementById("pubPublisher").value = item.publisher;

    customShayari.splice(index, 1);

    saveAllData();

    refreshAll();

    showToast("✏️ Edit Mode Enabled");

}

/* =========================
   DELETE SHAYARI
========================= */

function deleteShayari(index) {

    if (!checkAdmin()) return;

    if (!confirm("Delete this Shayari?")) return;

    customShayari.splice(index, 1);

    saveAllData();

    refreshAll();

    showToast("🗑️ Shayari Deleted");

}

/* =========================
   DELETE STORY
========================= */

function deleteStory(index) {

    if (!checkAdmin()) return;

    if (!confirm("Delete this Story?")) return;

    stories.splice(index, 1);

    saveAllData();

    refreshAll();

    showToast("🗑️ Story Deleted");

}

/* =========================
   BUTTON EVENTS
========================= */

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("editShayariBtn")) {

        editShayari(Number(e.target.dataset.id));

    }

    if (e.target.classList.contains("deleteShayariBtn")) {

        deleteShayari(Number(e.target.dataset.id));

    }

    if (e.target.classList.contains("storyDeleteBtn")) {

        deleteStory(Number(e.target.dataset.id));

    }

});

/* =========================
   REFRESH
========================= */

function refreshAll() {

    loadPublishedShayari();

    loadAllShayari();

    loadStories();

    loadFavourite();

    restoreButtons();

    updateStatistics();

}

console.log("✅ Part 4C Loaded");
/* ==========================================================
   PART 5A : PROFESSIONAL STORY PUBLISHER
========================================================== */

/* =========================
   PUBLISH STORY
========================= */

function publishStory() {

    if (!checkAdmin()) return;

    const title =
        document.getElementById("storyTitle").value.trim();

    const category =
        document.getElementById("storyCategory").value;

    const text =
        document.getElementById("storyText").value.trim();

    const author =
        document.getElementById("storyAuthor").value.trim();

    if (title.length < 3) {

        showToast("⚠ Story Title Too Short");

        return;

    }

    if (text.length < 50) {

        showToast("⚠ Story Must Contain At Least 50 Characters");

        return;

    }

    const story = {

        id: Date.now(),

        title,

        category,

        text,

        author: author || "Unknown",

        publisher: "Adarsh Raj",

        date: new Date().toLocaleString()

    };

    stories.unshift(story);

    saveAllData();

    loadStories();

    updateStatistics();

    document.getElementById("storyTitle").value = "";
    document.getElementById("storyText").value = "";
    document.getElementById("storyAuthor").value = "";

    showToast("📖 Story Published Successfully");

}

/* =========================
   INIT STORY BUTTON
========================= */

function initStoryButton() {

    const btn =
        document.getElementById("storyPublishBtn");

    if (!btn) return;

    btn.addEventListener("click", publishStory);

}

console.log("✅ Part 5A Loaded");
/* ==========================================================
   PART 5B : STORY SEARCH • FILTER • ACTIONS
========================================================== */

/* =========================
   LOAD STORIES
========================= */

function loadStories(filter = "All") {

    const container = document.getElementById("storyContainer");

    if (!container) return;

    container.innerHTML = "";

    let data = [...stories];

    if (filter !== "All") {

        data = data.filter(item => item.category === filter);

    }

    if (data.length === 0) {

        container.innerHTML = `
        <div class="card">
            <h3>📖 No Story Found</h3>
            <p>Coming Soon...</p>
        </div>
        `;

        return;

    }

    data.forEach((story, index) => {

        container.innerHTML += `

<div class="card">

<h3>${story.title}</h3>

<p class="shayariText">
${story.text.replace(/\n/g,"<br>")}
</p>

<p>✍️ ${story.author}</p>

<p>📅 ${story.date}</p>

<div class="actionButtons">

<button class="storyCopyBtn">📋 Copy</button>

<button class="storyShareBtn">📤 Share</button>

<button class="storyDeleteBtn"
data-id="${index}">
🗑 Delete
</button>

</div>

</div>

`;

    });

}

/* =========================
   STORY SEARCH
========================= */

function initStorySearch() {

    const search = document.getElementById("storySearch");

    if (!search) return;

    search.addEventListener("input", () => {

        const keyword = search.value.toLowerCase().trim();

        document
            .querySelectorAll("#storyContainer .card")
            .forEach(card => {

                card.style.display =
                    card.innerText.toLowerCase().includes(keyword)
                        ? ""
                        : "none";

            });

    });

}

/* =========================
   STORY COPY
========================= */

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("storyCopyBtn")) return;

    const text =
        e.target.closest(".card")
        .querySelector(".shayariText").innerText;

    copyText(text);

});

/* =========================
   STORY SHARE
========================= */

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("storyShareBtn")) return;

    const text =
        e.target.closest(".card")
        .querySelector(".shayariText").innerText;

    shareText(text);

});

console.log("✅ Part 5B Loaded");
/* ==========================================================
   PART 5C : STORY PREMIUM FEATURES
========================================================== */

/* =========================
   STORY COUNTER
========================= */

function updateStoryCounter() {

    const counter = document.getElementById("storyCount");

    if (counter) {

        counter.textContent = stories.length;

    }

}

/* =========================
   RANDOM STORY
========================= */

function getRandomStory() {

    if (stories.length === 0) return null;

    return stories[Math.floor(Math.random() * stories.length)];

}

/* =========================
   TODAY STORY
========================= */

function getTodayStory() {

    if (stories.length === 0) return null;

    const day = new Date().getDate();

    return stories[day % stories.length];

}

/* =========================
   STORY STATISTICS
========================= */

function updateStoryStatistics() {

    console.log("📖 Total Stories :", stories.length);

}

/* =========================
   REFRESH STORIES
========================= */

function refreshStories() {

    loadStories();

    updateStoryCounter();

    updateStoryStatistics();

}

/* =========================
   AUTO REFRESH
========================= */

window.addEventListener("pageshow", refreshStories);

console.log("✅ Part 5C Loaded");
/* ==========================================================
   PART 6A : WEBSITE DASHBOARD & STATISTICS
========================================================== */

/* =========================
   UPDATE DASHBOARD
========================= */
function updateStatistics() {

    const totalShayari =
        document.getElementById("totalShayari");

    const totalStories =
        document.getElementById("totalStories");

    const totalFavourite =
        document.getElementById("totalFavourite");

    const totalLikes =
        document.getElementById("totalLikes");

    const builtIn =
        typeof shayariData !== "undefined"
            ? shayariData.length
            : 0;

    if (totalShayari)
        totalShayari.textContent =
            builtIn + customShayari.length;

    if (totalStories)
        totalStories.textContent =
            stories.length;

    if (totalFavourite)
        totalFavourite.textContent =
            favouriteShayari.length;

    if (totalLikes)
        totalLikes.textContent =
            likedShayari.length;
}

}

/* =========================
   RANDOM SHAYARI
========================= */

function getRandomShayari() {

    const all = [
        ...(typeof shayariData !== "undefined"
            ? shayariData
            : []),
        ...customShayari
    ];

    if (all.length === 0) return null;

    return all[
        Math.floor(Math.random() * all.length)
    ];

}

/* =========================
   TODAY SHAYARI
========================= */

function getTodayShayari() {

    const all = [
        ...(typeof shayariData !== "undefined"
            ? shayariData
            : []),
        ...customShayari
    ];

    if (all.length === 0) return null;

    const day = new Date().getDate();

    return all[day % all.length];

}

/* =========================
   WEBSITE INFO
========================= */

function websiteInfo() {

    console.group("🌹 Adarsh Raj Shayar");

    console.log("📖 Shayari :", customShayari.length);

    console.log("📚 Stories :", stories.length);

    console.log("⭐ Favourite :", favouriteShayari.length);

    console.log("❤️ Likes :", likedShayari.length);

    console.groupEnd();

}

/* =========================
   AUTO UPDATE
========================= */

window.addEventListener("load", () => {

    updateStatistics();

    websiteInfo();

});

console.log("✅ Part 6A Loaded");
/* ==========================================================
   PART 6B : CONTACT • EMAILJS • CERTIFICATE • SECURITY
========================================================== */

/* =========================
   EMAILJS
========================= */

function initContactForm() {

    const form = document.getElementById("contact-form");

    if (!form) return;

    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const btn = form.querySelector("button");

        if (btn) {

            btn.disabled = true;
            btn.innerHTML = "📤 Sending...";

        }

        emailjs.sendForm(

            CONFIG.EMAILJS_SERVICE_ID,

            CONFIG.EMAILJS_TEMPLATE_ID,

            this

        ).then(() => {

            showToast("✅ Message Sent Successfully");

            form.reset();

        }).catch(() => {

            showToast("❌ Message Failed");

        }).finally(() => {

            if (btn) {

                btn.disabled = false;

                btn.innerHTML = "📩 Send Message";

            }

        });

    });

}

/* =========================
   CERTIFICATE
========================= */

function initCertificate() {

    const btn = document.getElementById("certificateBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        window.open("certificate.pdf", "_blank");

    });

}

/* =========================
   BASIC SECURITY
========================= */

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("dragstart", e => e.preventDefault());

/* =========================
   WEBSITE INFO
========================= */

function initWebsiteInfo() {

    document.title =
        CONFIG.WEBSITE_NAME + " | Official";

    console.log(

        CONFIG.WEBSITE_NAME +

        " " +

        CONFIG.WEBSITE_VERSION +

        " by " +

        CONFIG.WEBSITE_AUTHOR

    );

}

/* =========================
   LAZY IMAGE
========================= */

function initLazyImages() {

    document.querySelectorAll("img").forEach(img => {

        img.loading = "lazy";

        img.draggable = false;

    });

}

/* =========================
   SEO
========================= */

function initSEO() {

    document.title = CONFIG.WEBSITE_NAME;

    const meta = document.querySelector(

        "meta[name='description']"

    );

    if (meta) {

        meta.content =
            "Official Website of Adarsh Raj Shayar";

    }

}

/* =========================
   SAFE ERROR LOGGER
========================= */

window.addEventListener("error", function (event) {

    console.error("❌ JS Error:", event.message);

});

/* =========================
   AUTO INIT
========================= */

window.addEventListener("load", () => {

    initContactForm();

    initCertificate();

    initWebsiteInfo();

    initLazyImages();

    initSEO();

});

console.log("✅ Part 6B Loaded");
/* ==========================================================
   PART 7 : MAIN INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.clear();

    console.log("🌹 Adarsh Raj Shayar Starting...");

    /* CORE */

    initLoader();
    initCurrentYear();
    initPopup();
    initTheme();
    initMenu();
    initSearch();
    initBackToTop();
    initProgressBar();
    initActiveMenu();
    initSmoothScroll();

    /* ADMIN */

    initAdmin();
    initPublishButton();
    initStoryButton();

    /* CONTENT */

    loadAllShayari();
    loadPublishedShayari();
    loadStories();
    loadFavourite();

    /* RESTORE */

    restoreButtons();

    /* PREMIUM */

    if (typeof initVisitorCounter === "function")
        initVisitorCounter();
   
    if (typeof initStorySearch === "function")
        initStorySearch();

    updateStatistics();

    console.log("====================================");

    console.log("🌹 Adarsh Raj Shayar");

    console.log("🚀 Version :", CONFIG.WEBSITE_VERSION);

    console.log("👨‍💻 Author :", CONFIG.WEBSITE_AUTHOR);

    console.log("✅ Website Loaded Successfully");

    console.log("====================================");

});

function loadPublishedShayari() {

    const container = document.getElementById("publishedContainer");

    if (!container) return;

    container.innerHTML = "";

    if (customShayari.length === 0) {
        container.innerHTML = "<p>No Shayari Published Yet.</p>";
        return;
    }

    customShayari.forEach((item, index) => {

        container.innerHTML += `
        <div class="card">
            <h3>${item.title}</h3>

            <p class="shayariText">${item.text.replace(/\n/g,"<br>")}</p>

            <small>✍ ${item.author}</small>

            <br><br>

            <button class="editShayariBtn" data-id="${index}">
                ✏ Edit
            </button>

            <button class="deleteShayariBtn" data-id="${index}">
                🗑 Delete
            </button>
        </div>
        `;

    });

}


/* ==========================================================
   END OF SCRIPT
========================================================== */

console.log("🎉 Professional Script Loaded Successfully");

