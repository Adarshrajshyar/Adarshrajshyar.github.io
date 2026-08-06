"use strict";

/* ==========================================================
   Adarsh Raj Shayar
   Professional Script v11
   Part 1 : Foundation
========================================================== */

console.clear();
console.log("🌹 Adarsh Raj Shayar v11 Loading...");

/* ==========================================================
   CONFIG
========================================================== */

const CONFIG = {

    ADMIN_PASSWORD: "ARS2026",

    STORAGE: {

        THEME: "ars_theme",

        VISITED: "ars_visited",

        LIKES: "ars_likes",

        FAVOURITES: "ars_favourites",

        SHAYARI: "ars_custom_shayari",

        STORIES: "ars_stories",

        DRAFT: "ars_draft"

    }

};

/* ==========================================================
   DOM CACHE
========================================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

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

let likedShayari = Storage.get(CONFIG.STORAGE.LIKES, []);

let favouriteShayari = Storage.get(CONFIG.STORAGE.FAVOURITES, []);

let customShayari = Storage.get(CONFIG.STORAGE.SHAYARI, []);

let stories = Storage.get(CONFIG.STORAGE.STORIES, []);

let isAdmin = sessionStorage.getItem("ARS_ADMIN") === "true";

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

/* ==========================================================
   READY
========================================================== */

console.log("✅ Foundation Loaded");
/* ==========================================================
   PART 2 : UI CORE
========================================================== */

/* =========================
   CURRENT YEAR
========================= */

function initCurrentYear(){

    if(currentYear){

        currentYear.textContent=new Date().getFullYear();

    }

}

/* =========================
   LOADER
========================= */

function initLoader(){

    const loader=$("#loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("loader-hide");

        },700);

    });

}

/* =========================
   WELCOME POPUP
========================= */

function initPopup(){

    if(!popup || !enterBtn) return;

    if(localStorage.getItem(CONFIG.STORAGE.VISITED)){

        popup.remove();

        return;

    }

    enterBtn.onclick=()=>{

        popup.remove();

        localStorage.setItem(CONFIG.STORAGE.VISITED,"yes");

        showToast("❤️ Welcome");

    };

}

/* =========================
   DARK MODE
========================= */

function initTheme(){

    const theme=Storage.get(CONFIG.STORAGE.THEME,"dark");

    if(theme==="light"){

        body.classList.add("light-mode");

    }

    updateThemeIcon();

    if(darkBtn){

        darkBtn.onclick=toggleTheme;

    }

}

function toggleTheme(){

    body.classList.toggle("light-mode");

    const mode=

    body.classList.contains("light-mode")

    ?"light"

    :"dark";

    Storage.set(CONFIG.STORAGE.THEME,mode);

    updateThemeIcon();

}

function updateThemeIcon(){

    if(!darkBtn) return;

    darkBtn.innerHTML=

    body.classList.contains("light-mode")

    ?"🌙"

    :"☀️";

}

/* =========================
   MOBILE MENU
========================= */

function initMenu(){

    if(!menuBtn || !nav || !overlay) return;

    menuBtn.onclick=()=>{

        nav.classList.toggle("active");

        overlay.classList.toggle("active");

        body.classList.toggle("menu-open");

    };

    overlay.onclick=closeMenu;

}

function closeMenu(){

    nav.classList.remove("active");

    overlay.classList.remove("active");

    body.classList.remove("menu-open");

}

/* =========================
   BACK TO TOP
========================= */

function initBackToTop(){

    if(!topBtn) return;

    window.addEventListener("scroll",()=>{

        topBtn.style.display=

        window.scrollY>300

        ?"block"

        :"none";

    });

    topBtn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

}

/* =========================
   PROGRESS BAR
========================= */

function initProgressBar(){

    if(!progressBar) return;

    window.addEventListener("scroll",()=>{

        const h=

        document.documentElement;

        const percent=

        h.scrollTop/

        (h.scrollHeight-h.clientHeight)

        *100;

        progressBar.style.width=

        percent+"%";

    });

}

/* =========================
   ACTIVE MENU
========================= */

function initActiveMenu(){

    const sections=$$("section[id]");

    const links=$$("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(sec=>{

            if(window.scrollY>=sec.offsetTop-150){

                current=sec.id;

            }

        });

        links.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

}

/* =========================
   SMOOTH SCROLL
========================= */

function initSmoothScroll(){

    $$('nav a[href^="#"]').forEach(link=>{

        link.onclick=function(e){

            e.preventDefault();

            const target=

            $(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

            closeMenu();

        };

    });

}

console.log("✅ UI Core Loaded");
/* ==========================================================
   PART 3A : SHAYARI ENGINE
========================================================== */

/* =========================
   CREATE SHAYARI CARD
========================= */

function createCard(item){

return `

<div class="card" data-category="${item.category}">

<h3>${item.title}</h3>

<p class="shayariText">

${item.text.replace(/\n/g,"<br>")}

</p>

<p class="author">

✍ ${item.author}

</p>

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
   RENDER CATEGORY
========================= */

function renderCategory(categoryName,containerId){

const container=document.getElementById(containerId);

if(!container) return;

container.innerHTML="";

const data=[

...shayariData.filter(

item=>item.category===categoryName

),

...customShayari.filter(

item=>item.category===categoryName

)

];

if(data.length===0){

container.innerHTML=

`

<div class="card">

<h3>No Shayari</h3>

<p>Coming Soon...</p>

</div>

`;

return;

}

data.forEach(item=>{

container.innerHTML+=createCard(item);

});

}

/* =========================
   LOAD ALL SHAYARI
========================= */

function loadAllShayari(){

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

restoreButtons();

}

/* =========================
   COPY
========================= */

async function copyText(text){

try{

await navigator.clipboard.writeText(text);

showToast("📋 Copied");

}catch{

showToast("❌ Copy Failed");

}

}

/* =========================
   SHARE
========================= */

async function shareText(text){

if(navigator.share){

try{

await navigator.share({

title:"Adarsh Raj Shayar",

text,

url:location.href

});

}catch{}

}else{

copyText(text);

}

}

/* =========================
   CARD BUTTONS
========================= */

document.addEventListener(

"click",

function(e){

const card=

e.target.closest(".card");

if(!card) return;

const text=

card.querySelector(

".shayariText"

).innerText;

/* COPY */

if(

e.target.classList.contains(

"copyBtn"

)

){

copyText(text);

}

/* SHARE */

if(

e.target.classList.contains(

"shareBtn"

)

){

shareText(text);

}

}

);

console.log("✅ Shayari Engine Loaded");
/* ==========================================================
   PART 3B : LIKE • FAVOURITE • SEARCH
========================================================== */

/* =========================
   LIKE SYSTEM
========================= */

function toggleLike(text){

    const index=likedShayari.indexOf(text);

    if(index===-1){

        likedShayari.push(text);

        showToast("❤️ Liked");

    }else{

        likedShayari.splice(index,1);

        showToast("💔 Like Removed");

    }

    saveAllData();

}

/* =========================
   FAVOURITE SYSTEM
========================= */

function toggleFavourite(text){

    const index=favouriteShayari.indexOf(text);

    if(index===-1){

        favouriteShayari.push(text);

        showToast("⭐ Added to Favourite");

    }else{

        favouriteShayari.splice(index,1);

        showToast("❌ Removed Favourite");

    }

    saveAllData();

    loadFavourite();

}

/* =========================
   BUTTON EVENTS
========================= */

document.addEventListener("click",(e)=>{

    const card=e.target.closest(".card");

    if(!card) return;

    const text=card.querySelector(".shayariText")?.innerText;

    if(!text) return;

    if(e.target.classList.contains("likeBtn")){

        toggleLike(text);

        e.target.classList.toggle("active");

        e.target.innerHTML=

        likedShayari.includes(text)

        ?"💖 Liked"

        :"❤️ Like";

    }

    if(e.target.classList.contains("favBtn")){

        toggleFavourite(text);

        e.target.classList.toggle("active");

        e.target.innerHTML=

        favouriteShayari.includes(text)

        ?"🌟 Saved"

        :"⭐ Favourite";

    }

});

/* =========================
   RESTORE BUTTONS
========================= */

function restoreButtons(){

    document.querySelectorAll(".card").forEach(card=>{

        const text=

        card.querySelector(".shayariText")?.innerText;

        if(!text) return;

        const likeBtn=

        card.querySelector(".likeBtn");

        const favBtn=

        card.querySelector(".favBtn");

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
   SEARCH
========================= */

function initSearch(){

    if(!searchInput) return;

    searchInput.addEventListener("input",()=>{

        const keyword=

        searchInput.value

        .toLowerCase()

        .trim();

        document.querySelectorAll(".card").forEach(card=>{

            const text=

            card.innerText.toLowerCase();

            card.style.display=

            text.includes(keyword)

            ?""

            :"none";

        });

    });

}

/* =========================
   LOAD FAVOURITE
========================= */

function loadFavourite(){

    const container=

    document.getElementById("favoriteList");

    if(!container) return;

    container.innerHTML="";

    if(favouriteShayari.length===0){

        container.innerHTML=

        "<p>अभी कोई Favourite Shayari नहीं है।</p>";

        return;

    }

    favouriteShayari.forEach(text=>{

        container.innerHTML+=`

<div class="card">

<p class="shayariText">

${text}

</p>

</div>

`;

    });

}

console.log("✅ Like & Favourite Ready");
/* ==========================================================
   PART 3C : PREMIUM FEATURES
========================================================== */

/* =========================
   RANDOM SHAYARI
========================= */

function getAllShayari(){

    return [

        ...(typeof shayariData !== "undefined" ? shayariData : []),

        ...customShayari

    ];

}

function getRandomShayari(){

    const list = getAllShayari();

    if(list.length===0) return null;

    return list[Math.floor(Math.random()*list.length)];

}

/* =========================
   TODAY'S SHAYARI
========================= */

function getTodayShayari(){

    const list=getAllShayari();

    if(list.length===0) return null;

    const day=new Date().getDate();

    return list[day % list.length];

}

/* =========================
   STATISTICS
========================= */

function getStatistics(){

    return{

        totalShayari:getAllShayari().length,

        totalStories:stories.length,

        totalLikes:likedShayari.length,

        totalFavourite:favouriteShayari.length

    };

}

/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics(){

    const stats=getStatistics();

    console.table(stats);

}

/* =========================
   RANDOM CONSOLE MESSAGE
========================= */

(function(){

    const random=getRandomShayari();

    if(random){

        console.log("🌹 Today's Random Shayari");

        console.log(random.title);

    }

})();

/* =========================
   PERFORMANCE
========================= */

window.addEventListener("pageshow",()=>{

    restoreButtons();

    updateStatistics();

});

/* =========================
   PRELOAD IMAGES
========================= */

function preloadImages(){

    ["logo.png","banner.png"]

    .forEach(src=>{

        const img=new Image();

        img.src=src;

    });

}

preloadImages();

console.log("✅ Premium Features Loaded");
/* ==========================================================
   PART 4A : ADMIN LOGIN & SECURITY
========================================================== */

const ADMIN_SESSION_KEY = "ARS_ADMIN_SESSION";

function isLoggedIn() {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function setAdminLogin(status) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, status ? "true" : "false");
    isAdmin = status;
}

function initAdmin() {

    const loginBox = document.getElementById("adminLogin");
    const panel = document.getElementById("publisherPanel");
    const loginBtn = document.getElementById("loginBtn");
    const passwordInput = document.getElementById("adminPassword");

    if (!loginBtn) return;

    if (isLoggedIn()) {

        if (loginBox) loginBox.style.display = "none";
        if (panel) panel.style.display = "block";

        isAdmin = true;

    } else {

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

function logoutAdmin() {

    setAdminLogin(false);

    const loginBox = document.getElementById("adminLogin");
    const panel = document.getElementById("publisherPanel");

    if (loginBox) loginBox.style.display = "block";
    if (panel) panel.style.display = "none";

    showToast("👋 Logged Out");

}

function checkAdmin() {

    if (!isLoggedIn()) {

        showToast("🔒 Admin Login Required");
        return false;

    }

    return true;

}

console.log("✅ Admin Security Ready");
