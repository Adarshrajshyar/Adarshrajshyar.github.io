/* ==========================================================
   ADARSH RAJ SHAYAR
   FINAL SCRIPT.JS — PART 1
   Base Setup + Global Data
========================================================== */

"use strict";

/* ==========================================================
   1. GLOBAL CONFIGURATION
========================================================== */

const ARS_CONFIG = {

    siteName: "Adarsh Raj Shayar",

    storage: {
        shayari: "ars_shayari",
        stories: "ars_stories",
        favourites: "ars_favourites",
        likes: "ars_likes",
        certificates: "ars_certificates",
        visitorCount: "ars_visitor_count",
        settings: "ars_settings"
    },

    certificate: {
        prefix: "ARS",
        defaultTitle: "Certificate of Appreciation"
    }

};


/* ==========================================================
   2. GLOBAL STATE
========================================================== */

let shayariData = [];

let storyData = [];

let currentSearch = "";

let currentCategory = "all";

let isAdminLoggedIn = false;


/* ==========================================================
   3. SAFE LOCAL STORAGE HELPERS
========================================================== */

function getStorage(key, fallback = null) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error("LocalStorage read error:", key, error);

        return fallback;

    }

}


function setStorage(key, value) {

    try {

        localStorage.setItem(key, JSON.stringify(value));

        return true;

    } catch (error) {

        console.error("LocalStorage save error:", key, error);

        return false;

    }

}


function removeStorage(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error("LocalStorage remove error:", key, error);

        return false;

    }

}


/* ==========================================================
   4. UNIQUE ID GENERATOR
========================================================== */

function generateUniqueId(prefix = "ARS") {

    const time = Date.now().toString(36).toUpperCase();

    const random = Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    return `${prefix}-${time}-${random}`;

}


/* ==========================================================
   5. SAFE TEXT HELPER
========================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================================
   6. DATE & TIME HELPERS
========================================================== */

function getCurrentDate() {

    return new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

}


function getCurrentDateISO() {

    return new Date().toISOString().split("T")[0];

}


/* ==========================================================
   7. TOAST MESSAGE
========================================================== */

function showToast(message, duration = 2500) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast._timer);

    toast._timer = setTimeout(() => {

        toast.classList.remove("show");

    }, duration);

}


/* ==========================================================
   8. DOM READY CHECK
========================================================== */

function onDOMReady(callback) {

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            callback,
            { once: true }
        );

    } else {

        callback();

    }

}


/* ==========================================================
   9. INITIAL DATA LOAD
========================================================== */

function loadInitialData() {

    const savedShayari = getStorage(
        ARS_CONFIG.storage.shayari,
        []
    );

    const savedStories = getStorage(
        ARS_CONFIG.storage.stories,
        []
    );

    const savedFavourites = getStorage(
        ARS_CONFIG.storage.favourites,
        []
    );

    const savedLikes = getStorage(
        ARS_CONFIG.storage.likes,
        []
    );

    const savedCertificates = getStorage(
        ARS_CONFIG.storage.certificates,
        []
    );

    shayariData = Array.isArray(savedShayari)
        ? savedShayari
        : [];

    storyData = Array.isArray(savedStories)
        ? savedStories
        : [];

    if (!Array.isArray(savedFavourites)) {

        setStorage(
            ARS_CONFIG.storage.favourites,
            []
        );

    }

    if (!Array.isArray(savedLikes)) {

        setStorage(
            ARS_CONFIG.storage.likes,
            []
        );

    }

    if (!Array.isArray(savedCertificates)) {

        setStorage(
            ARS_CONFIG.storage.certificates,
            []
        );

    }

}


/* ==========================================================
   10. BASIC ERROR HANDLER
========================================================== */

window.addEventListener("error", function (event) {

    console.error(
        "Adarsh Raj Shayar Error:",
        event.error || event.message
    );

});


/* ==========================================================
   11. PART 1 INITIALIZATION
========================================================== */

onDOMReady(function () {

    loadInitialData();

    console.log(
        "Adarsh Raj Shayar — Part 1 loaded successfully."
    );

    console.log(
        "Shayari:",
        shayariData.length
    );

    console.log(
        "Stories:",
        storyData.length
    );

});
/* ==========================================================
   ADARSH RAJ SHAYAR
   FINAL SCRIPT.JS — PART 2
   Shayari Data + Display System
========================================================== */


/* ==========================================================
   1. DEFAULT SHAYARI DATA
========================================================== */

const DEFAULT_SHAYARI = [

    {
        id: "shayari-001",
        title: "मोहब्बत",
        text: "मोहब्बत वो नहीं जो हर किसी से हो जाए,\nमोहब्बत वो है जो एक से हो और उम्रभर निभ जाए।",
        author: "Adarsh Raj",
        category: "love",
        date: getCurrentDateISO()
    },

    {
        id: "shayari-002",
        title: "दोस्ती",
        text: "दोस्ती में हिसाब नहीं रखा जाता,\nदोस्त हो तो दिल से निभाया जाता है।",
        author: "Adarsh Raj",
        category: "friendship",
        date: getCurrentDateISO()
    },

    {
        id: "shayari-003",
        title: "ज़िंदगी",
        text: "ज़िंदगी में रास्ते चाहे कितने भी कठिन हों,\nहौसला हो तो मंज़िल हमेशा करीब होती है।",
        author: "Adarsh Raj",
        category: "motivation",
        date: getCurrentDateISO()
    }

];


/* ==========================================================
   2. INITIALIZE SHAYARI DATA
========================================================== */

function initializeShayariData() {

    const saved = getStorage(
        ARS_CONFIG.storage.shayari,
        null
    );

    /*
       अगर LocalStorage में पहले से Shayari मौजूद है,
       तो उसे ही इस्तेमाल करेंगे।
    */

    if (Array.isArray(saved) && saved.length > 0) {

        shayariData = saved;

        return;

    }

    /*
       पहली बार website चलने पर
       default Shayari save होगी।
    */

    shayariData = [...DEFAULT_SHAYARI];

    setStorage(
        ARS_CONFIG.storage.shayari,
        shayariData
    );

}


/* ==========================================================
   3. FIND SHAYARI CONTAINER
========================================================== */

function getShayariContainer() {

    const possibleSelectors = [

        "#shayariContainer",

        "#shayari-container",

        ".shayari-container",

        "#shayariList",

        ".cards"

    ];

    for (const selector of possibleSelectors) {

        const element = document.querySelector(selector);

        if (element) {

            return element;

        }

    }

    return null;

}


/* ==========================================================
   4. CREATE SHAYARI CARD
========================================================== */

function createShayariCard(shayari) {

    const card = document.createElement("article");

    card.className = "card";

    card.dataset.id = shayari.id || "";

    card.dataset.category = shayari.category || "all";

    const title = escapeHTML(
        shayari.title || "Shayari"
    );

    const text = escapeHTML(
        shayari.text || ""
    );

    const author = escapeHTML(
        shayari.author || "Adarsh Raj"
    );

    card.innerHTML = `

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
                class="likeBtn"
                data-action="like"
                data-id="${escapeHTML(shayari.id || "")}"
            >
                ❤️ Like
            </button>

            <button
                type="button"
                class="favBtn"
                data-action="favorite"
                data-id="${escapeHTML(shayari.id || "")}"
            >
                ⭐ Favourite
            </button>

            <button
                type="button"
                data-action="copy"
                data-id="${escapeHTML(shayari.id || "")}"
            >
                📋 Copy
            </button>

            <button
                type="button"
                data-action="share"
                data-id="${escapeHTML(shayari.id || "")}"
            >
                📤 Share
            </button>

        </div>

    `;

    return card;

}


/* ==========================================================
   5. RENDER ALL SHAYARI
========================================================== */

function renderShayari(list = shayariData) {

    const container = getShayariContainer();

    if (!container) {

        console.warn(
            "Shayari container not found."
        );

        return;

    }

    container.innerHTML = "";

    if (!Array.isArray(list) || list.length === 0) {

        container.innerHTML = `

            <div class="card">

                <h3>No Shayari Found</h3>

                <p class="shayariText">
                    अभी कोई Shayari उपलब्ध नहीं है।
                </p>

            </div>

        `;

        return;

    }

    list.forEach(function (shayari) {

        container.appendChild(
            createShayariCard(shayari)
        );

    });

}


/* ==========================================================
   6. CATEGORY FILTER
========================================================== */

function filterShayariByCategory(category = "all") {

    currentCategory = category;

    if (category === "all") {

        renderShayari(shayariData);

        return;

    }

    const filtered = shayariData.filter(
        function (shayari) {

            return (
                String(shayari.category || "")
                    .toLowerCase()
                ===
                String(category)
                    .toLowerCase()
            );

        }
    );

    renderShayari(filtered);

}


/* ==========================================================
   7. ADD NEW SHAYARI
========================================================== */

function addShayari(data) {

    if (!data || typeof data !== "object") {

        return false;

    }

    const newShayari = {

        id:
            data.id ||
            generateUniqueId("SHAYARI"),

        title:
            String(data.title || "Untitled"),

        text:
            String(data.text || ""),

        author:
            String(data.author || "Adarsh Raj"),

        category:
            String(data.category || "general"),

        date:
            data.date ||
            getCurrentDateISO()

    };

    shayariData.push(newShayari);

    setStorage(
        ARS_CONFIG.storage.shayari,
        shayariData
    );

    renderShayari();

    return newShayari;

}


/* ==========================================================
   8. DELETE SHAYARI
========================================================== */

function deleteShayari(id) {

    const index = shayariData.findIndex(
        function (item) {

            return item.id === id;

        }
    );

    if (index === -1) {

        return false;

    }

    shayariData.splice(index, 1);

    setStorage(
        ARS_CONFIG.storage.shayari,
        shayariData
    );

    renderShayari();

    return true;

}


/* ==========================================================
   9. UPDATE SHAYARI
========================================================== */

function updateShayari(id, updates) {

    const index = shayariData.findIndex(
        function (item) {

            return item.id === id;

        }
    );

    if (index === -1) {

        return false;

    }

    shayariData[index] = {

        ...shayariData[index],

        ...updates,

        id: shayariData[index].id

    };

    setStorage(
        ARS_CONFIG.storage.shayari,
        shayariData
    );

    renderShayari();

    return true;

}


/* ==========================================================
   10. PART 2 INITIALIZATION
========================================================== */

onDOMReady(function () {

    initializeShayariData();

    renderShayari();

    console.log(
        "Adarsh Raj Shayar — Part 2 loaded successfully."
    );

    console.log(
        "Total Shayari:",
        shayariData.length
    );

});
/* ==========================================================
   ADARSH RAJ SHAYAR
   FINAL SCRIPT.JS — PART 3
   Like + Favourite + Copy + Share
========================================================== */


/* ==========================================================
   1. GET LIKE DATA
========================================================== */

function getLikeData() {

    const data = getStorage(
        ARS_CONFIG.storage.likes,
        []
    );

    return Array.isArray(data) ? data : [];

}


/* ==========================================================
   2. GET FAVOURITE DATA
========================================================== */

function getFavouriteData() {

    const data = getStorage(
        ARS_CONFIG.storage.favourites,
        []
    );

    return Array.isArray(data) ? data : [];

}


/* ==========================================================
   3. SAVE LIKE DATA
========================================================== */

function saveLikeData(data) {

    setStorage(
        ARS_CONFIG.storage.likes,
        data
    );

}


/* ==========================================================
   4. SAVE FAVOURITE DATA
========================================================== */

function saveFavouriteData(data) {

    setStorage(
        ARS_CONFIG.storage.favourites,
        data
    );

}


/* ==========================================================
   5. LIKE / UNLIKE
========================================================== */

function toggleLike(id) {

    if (!id) {
        return;
    }

    let likes = getLikeData();

    const index = likes.indexOf(id);

    if (index === -1) {

        likes.push(id);

        saveLikeData(likes);

        showToast("❤️ Shayari liked");

    } else {

        likes.splice(index, 1);

        saveLikeData(likes);

        showToast("Like removed");

    }

    updateButtonStates();

}


/* ==========================================================
   6. FAVOURITE / REMOVE FAVOURITE
========================================================== */

function toggleFavourite(id) {

    if (!id) {
        return;
    }

    let favourites = getFavouriteData();

    const index = favourites.indexOf(id);

    if (index === -1) {

        favourites.push(id);

        saveFavouriteData(favourites);

        showToast("⭐ Added to favourites");

    } else {

        favourites.splice(index, 1);

        saveFavouriteData(favourites);

        showToast("Favourite removed");

    }

    updateButtonStates();

}


/* ==========================================================
   7. FIND SHAYARI BY ID
========================================================== */

function findShayariById(id) {

    return shayariData.find(
        function (item) {

            return item.id === id;

        }
    );

}


/* ==========================================================
   8. COPY SHAYARI
========================================================== */

async function copyShayari(id) {

    const shayari = findShayariById(id);

    if (!shayari) {

        showToast("Shayari not found");

        return;

    }

    const text =

        `${shayari.title || "Shayari"}\n\n` +

        `${shayari.text || ""}\n\n` +

        `— ${shayari.author || "Adarsh Raj"}`;


    try {

        await navigator.clipboard.writeText(text);

        showToast("📋 Shayari copied");

    } catch (error) {

        console.error(
            "Copy error:",
            error
        );

        /*
           Fallback method
           पुराने/कुछ browsers के लिए
        */

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";

        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();

        textarea.select();

        try {

            document.execCommand("copy");

            showToast("📋 Shayari copied");

        } catch (fallbackError) {

            console.error(
                "Fallback copy error:",
                fallbackError
            );

            showToast("Copy failed");

        }

        textarea.remove();

    }

}


/* ==========================================================
   9. SHARE SHAYARI
========================================================== */

async function shareShayari(id) {

    const shayari = findShayariById(id);

    if (!shayari) {

        showToast("Shayari not found");

        return;

    }

    const shareText =

        `${shayari.title || "Shayari"}\n\n` +

        `${shayari.text || ""}\n\n` +

        `— ${shayari.author || "Adarsh Raj"}`;


    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    shayari.title ||
                    "Adarsh Raj Shayar",

                text: shareText,

                url: window.location.href

            });

        } catch (error) {

            /*
               User द्वारा share popup बंद करने पर
               error को visible नहीं करेंगे।
            */

            if (error.name !== "AbortError") {

                console.error(
                    "Share error:",
                    error
                );

                showToast("Share failed");

            }

        }

        return;

    }


    /*
       अगर browser native sharing support नहीं करता,
       तो text copy कर देंगे।
    */

    try {

        await navigator.clipboard.writeText(
            shareText
        );

        showToast(
            "📤 Sharing unavailable — text copied"
        );

    } catch (error) {

        console.error(
            "Share fallback error:",
            error
        );

        showToast(
            "Sharing is not supported"
        );

    }

}


/* ==========================================================
   10. UPDATE BUTTON STATES
========================================================== */

function updateButtonStates() {

    const likes = getLikeData();

    const favourites = getFavouriteData();


    /*
       LIKE BUTTONS
    */

    document
        .querySelectorAll(".likeBtn")
        .forEach(function (button) {

            const id = button.dataset.id;

            if (likes.includes(id)) {

                button.classList.add("active");

                button.innerHTML =
                    "❤️ Liked";

            } else {

                button.classList.remove("active");

                button.innerHTML =
                    "❤️ Like";

            }

        });


    /*
       FAVOURITE BUTTONS
    */

    document
        .querySelectorAll(".favBtn")
        .forEach(function (button) {

            const id = button.dataset.id;

            if (favourites.includes(id)) {

                button.classList.add("active");

                button.innerHTML =
                    "⭐ Favourite";

            } else {

                button.classList.remove("active");

                button.innerHTML =
                    "⭐ Favourite";

            }

        });

}


/* ==========================================================
   11. BUTTON EVENT DELEGATION
========================================================== */

function initializeShayariActions() {

    const container = getShayariContainer();

    if (!container) {

        console.warn(
            "Shayari action container not found."
        );

        return;

    }


    /*
       पहले से listener लगा हो तो duplicate
       listener रोकने के लिए marker इस्तेमाल करेंगे।
    */

    if (
        container.dataset.actionsInitialized === "true"
    ) {

        return;

    }


    container.dataset.actionsInitialized = "true";


    container.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest("button[data-action]");

            if (!button) {
                return;
            }

            const action =
                button.dataset.action;

            const id =
                button.dataset.id;


            if (!id) {
                return;
            }


            switch (action) {

                case "like":

                    toggleLike(id);

                    break;


                case "favorite":

                    toggleFavourite(id);

                    break;


                case "copy":

                    copyShayari(id);

                    break;


                case "share":

                    shareShayari(id);

                    break;


                default:

                    console.warn(
                        "Unknown Shayari action:",
                        action
                    );

            }

        }
    );

}


/* ==========================================================
   12. PART 3 INITIALIZATION
========================================================== */

onDOMReady(function () {

    initializeShayariActions();

    updateButtonStates();

    console.log(
        "Adarsh Raj Shayar — Part 3 loaded successfully."
    );

});

