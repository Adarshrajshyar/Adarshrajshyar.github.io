"use strict";

/* ==========================================
   CONFIG LOADER
========================================== */

const CONFIG = {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,

    WEBSITE_NAME,
    WEBSITE_VERSION,
    WEBSITE_AUTHOR,

    ADMIN_PASSWORD,

    CONTACT_EMAIL,

    GITHUB_URL,
    WEBSITE_URL,

    ENABLE_DARK_MODE,
    ENABLE_VISITOR_COUNTER,
    ENABLE_CONTACT_FORM,
    ENABLE_CERTIFICATE,
    ENABLE_STORY,
    ENABLE_SHAYARI
};

console.log("⚙ Config Loaded");

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

   const ADMIN_PASSWORD = CONFIG.ADMIN_PASSWORD;

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
/* ==========================================================
   PART 4B : PROFESSIONAL SHAYARI PUBLISHER
========================================================== */

/* =========================
   AUTO DRAFT
========================= */

function loadDraft(){

    document.getElementById("pubTitle").value =
        localStorage.getItem("draft_title") || "";

    document.getElementById("pubText").value =
        localStorage.getItem("draft_text") || "";

    document.getElementById("pubAuthor").value =
        localStorage.getItem("draft_author") || "";

}

function saveDraft(){

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

function publishShayari(){

    if(!checkAdmin()) return;

    const title=document.getElementById("pubTitle").value.trim();
    const category=document.getElementById("pubCategory").value;
    const text=document.getElementById("pubText").value.trim();
    const author=document.getElementById("pubAuthor").value.trim();
    const publisher=document.getElementById("pubPublisher").value.trim() || "Adarsh Raj";

    if(title.length<3){

        showToast("⚠ Title Too Short");
        return;

    }

    if(text.length<10){

        showToast("⚠ Shayari Too Short");
        return;

    }

    const item={

        id:Date.now(),

        title,

        category,

        text,

        author:author || "Unknown",

        publisher,

        date:new Date().toLocaleString()

    };

    customShayari.unshift(item);

    saveData();

    loadPublishedShayari();

    loadAllShayari();

    localStorage.removeItem("draft_title");
    localStorage.removeItem("draft_text");
    localStorage.removeItem("draft_author");

    document.getElementById("pubTitle").value="";
    document.getElementById("pubText").value="";
    document.getElementById("pubAuthor").value="";

    showToast("✅ Shayari Published");

}

/* =========================
   INIT
========================= */

function initPublishButton(){

    const btn=document.getElementById("publishBtn");

    if(!btn) return;

    loadDraft();

    ["pubTitle","pubText","pubAuthor"].forEach(id=>{

        const el=document.getElementById(id);

        if(el){

            el.addEventListener("input",saveDraft);

        }

    });

    btn.addEventListener("click",publishShayari);

}

console.log("✅ Publisher Ready");
/* ==========================================================
   PART 4C : EDIT • DELETE • LIVE UPDATE
========================================================== */

/* =========================
   EDIT SHAYARI
========================= */

function editShayari(index){

    if(!checkAdmin()) return;

    const item = customShayari[index];

    if(!item) return;

    document.getElementById("pubTitle").value = item.title;
    document.getElementById("pubCategory").value = item.category;
    document.getElementById("pubText").value = item.text;
    document.getElementById("pubAuthor").value = item.author;
    document.getElementById("pubPublisher").value = item.publisher;

    customShayari.splice(index,1);

    saveAllData();

    loadPublishedShayari();
    loadAllShayari();

    showToast("✏️ Edit Mode Enabled");

}

/* =========================
   DELETE SHAYARI
========================= */

function deleteShayari(index){

    if(!checkAdmin()) return;

    if(!confirm("Delete this Shayari?")) return;

    customShayari.splice(index,1);

    saveAllData();

    loadPublishedShayari();
    loadAllShayari();

    showToast("🗑️ Shayari Deleted");

}

/* =========================
   DELETE STORY
========================= */

function deleteStory(index){

    if(!checkAdmin()) return;

    if(!confirm("Delete this Story?")) return;

    stories.splice(index,1);

    saveAllData();

    loadStories();

    showToast("🗑️ Story Deleted");

}

/* =========================
   BUTTON EVENTS
========================= */

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("editShayariBtn")){

        editShayari(Number(e.target.dataset.id));

    }

    if(e.target.classList.contains("deleteShayariBtn")){

        deleteShayari(Number(e.target.dataset.id));

    }

    if(e.target.classList.contains("storyDeleteBtn")){

        deleteStory(Number(e.target.dataset.id));

    }

});

/* =========================
   REFRESH
========================= */

function refreshAll(){

    loadPublishedShayari();

    loadAllShayari();

    loadStories();

    loadFavourite();

    restoreButtons();

    updateStatistics();

}

console.log("✅ Admin Tools Ready");
<option value="Love">❤️ Love Story</option>
<option value="Funny">😂 Funny Story</option>
<option value="Horror">👻 Horror Story</option>
<option value="Friendship">🤝 Friendship Story</option>
<option value="Biography">📚 Biography</option>
<option value="Historical">👑 Historical</option>
<option value="Emotional">😢 Emotional</option>
<option value="Real Life">🌍 Real Life</option>
/* ==========================================================
   PART 5A : PROFESSIONAL STORY SYSTEM
========================================================== */

function publishStory(){

    if(!checkAdmin()) return;

    const title=document.getElementById("storyTitle").value.trim();

    const category=document.getElementById("storyCategory").value;

    const text=document.getElementById("storyText").value.trim();

    const author=document.getElementById("storyAuthor").value.trim();

    if(title.length<3){

        showToast("⚠ Story title too short");

        return;

    }

    if(text.length<50){

        showToast("⚠ Story must contain at least 50 characters");

        return;

    }

    stories.unshift({

        id:Date.now(),

        title,

        category,

        text,

        author:author||"Unknown",

        publisher:"Adarsh Raj",

        date:new Date().toLocaleString()

    });

    saveAllData();

    loadStories();

    document.getElementById("storyTitle").value="";

    document.getElementById("storyText").value="";

    document.getElementById("storyAuthor").value="";

    showToast("📖 Story Published Successfully");

}
/* ==========================================================
   PART 5B : STORY SEARCH • FILTER • ACTIONS
========================================================== */

/* =========================
   LOAD STORIES
========================= */

function loadStories(filter="All"){

    const container=document.getElementById("storyContainer");

    if(!container) return;

    container.innerHTML="";

    let data=[...stories];

    if(filter!=="All"){

        data=data.filter(item=>item.category===filter);

    }

    if(data.length===0){

        container.innerHTML=`
        <div class="card">
            <h3>📖 No Story Found</h3>
            <p>Coming Soon...</p>
        </div>
        `;

        return;

    }

    data.forEach((story,index)=>{

        container.innerHTML+=`

<div class="card">

<h3>${story.title}</h3>

<p><strong>📂 ${story.category}</strong></p>

<p class="shayariText">

${story.text.replace(/\n/g,"<br>")}

</p>

<p class="author">

✍ ${story.author}

</p>

<div class="actionButtons">

<button class="storyCopyBtn">

📋 Copy

</button>

<button class="storyShareBtn">

📤 Share

</button>

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

function initStorySearch(){

    const search=document.getElementById("storySearch");

    if(!search) return;

    search.addEventListener("input",()=>{

        const keyword=

        search.value.toLowerCase();

        document

        .querySelectorAll("#storyContainer .card")

        .forEach(card=>{

            card.style.display=

            card.innerText

            .toLowerCase()

            .includes(keyword)

            ?""

            :"none";

        });

    });

}

/* =========================
   STORY COPY
========================= */

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("storyCopyBtn")){

        const text=

        e.target

        .closest(".card")

        .querySelector(".shayariText")

        .innerText;

        copyText(text);

    }

});

/* =========================
   STORY SHARE
========================= */

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("storyShareBtn")){

        const text=

        e.target

        .closest(".card")

        .querySelector(".shayariText")

        .innerText;

        shareText(text);

    }

});

console.log("✅ Story System Ready");
/* ==========================================================
   PART 5C : STORY PREMIUM FEATURES
========================================================== */

/* =========================
   STORY COUNTER
========================= */

function updateStoryCounter(){

    const counter=document.getElementById("storyCount");

    if(counter){

        counter.textContent=stories.length;

    }

}

/* =========================
   RANDOM STORY
========================= */

function getRandomStory(){

    if(stories.length===0) return null;

    return stories[Math.floor(Math.random()*stories.length)];

}

/* =========================
   TODAY STORY
========================= */

function getTodayStory(){

    if(stories.length===0) return null;

    const day=new Date().getDate();

    return stories[day % stories.length];

}

/* =========================
   STORY STATISTICS
========================= */

function updateStoryStatistics(){

    console.log("📖 Total Stories :",stories.length);

}

/* =========================
   REFRESH STORY
========================= */

function refreshStories(){

    loadStories();

    updateStoryCounter();

    updateStoryStatistics();

}

/* =========================
   AUTO REFRESH
========================= */

window.addEventListener("pageshow",refreshStories);

console.log("✅ Story Premium Ready");
/* ==========================================================
   PART 6A : WEBSITE DASHBOARD & STATISTICS
========================================================== */

/* =========================
   TOTAL STATISTICS
========================= */

function updateStatistics(){

    const totalShayari=document.getElementById("totalShayari");
    const totalStories=document.getElementById("totalStories");
    const totalFavourite=document.getElementById("totalFavourite");

    if(totalShayari){
        totalShayari.textContent=customShayari.length;
    }

    if(totalStories){
        totalStories.textContent=stories.length;
    }

    if(totalFavourite){
        totalFavourite.textContent=favouriteShayari.length;
    }

}

/* =========================
   RANDOM SHAYARI
========================= */

function getRandomShayari(){

    if(customShayari.length===0) return null;

    return customShayari[
        Math.floor(Math.random()*customShayari.length)
    ];

}

/* =========================
   TODAY SHAYARI
========================= */

function getTodayShayari(){

    if(customShayari.length===0) return null;

    const day=new Date().getDate();

    return customShayari[
        day % customShayari.length
    ];

}

/* =========================
   WEBSITE INFO
========================= */

function websiteInfo(){

    console.log("🌹 Adarsh Raj Shayar");
    console.log("📖 Shayari :",customShayari.length);
    console.log("📚 Stories :",stories.length);
    console.log("⭐ Favourite :",favouriteShayari.length);
    console.log("❤️ Likes :",likedShayari.length);

}

/* =========================
   AUTO UPDATE
========================= */

window.addEventListener("load",()=>{

    updateStatistics();

    websiteInfo();

});

console.log("✅ Dashboard Ready");
/* ==========================================================
   PART 6B : CONTACT • EMAILJS • CERTIFICATE • SECURITY
========================================================== */

/* =========================
   EMAILJS INIT
========================= */

const EMAIL_CONFIG = {
    PUBLIC_KEY: CONFIG.EMAIL_PUBLIC_KEY,
    SERVICE_ID: CONFIG.EMAIL_SERVICE_ID,
    TEMPLATE_ID: CONFIG.EMAIL_TEMPLATE_ID
};

function initContactForm(){

    const form=document.getElementById("contact-form");

    if(!form) return;

    emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const submitBtn=form.querySelector("button");

        if(submitBtn){

            submitBtn.disabled=true;
            submitBtn.innerHTML="📤 Sending...";

        }

       emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

emailjs.sendForm(
CONFIG.EMAILJS_SERVICE_ID,
CONFIG.EMAILJS_TEMPLATE_ID,
this
)
        ).then(()=>{

            showToast("✅ Message Sent Successfully");

            form.reset();

        }).catch(()=>{

            showToast("❌ Message Failed");

        }).finally(()=>{

            if(submitBtn){

                submitBtn.disabled=false;
                submitBtn.innerHTML="📩 Send Message";

            }

        });

    });

}

/* =========================
   CERTIFICATE
========================= */

function initCertificate(){

    const btn=document.getElementById("certificateBtn");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        window.open("certificate.pdf","_blank");

    });

}

/* =========================
   SECURITY
========================= */

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="F12"){

        e.preventDefault();

    }

    if(e.ctrlKey && e.shiftKey){

        e.preventDefault();

    }

});

/* =========================
   AUTO INIT
========================= */

window.addEventListener("load",()=>{

    initContactForm();

    initCertificate();

});

console.log("✅ Contact & Security Ready");

/* ==========================================
   SAFE ERROR LOGGER
========================================== */

window.addEventListener("error", function (event) {

    console.error("❌ JS Error:", event.message);

});
/* ==========================================
   WEBSITE INFO
========================================== */

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
/* ==========================================
   SECURITY + PERFORMANCE
========================================== */

(function () {

    "use strict";

    // Disable Right Click
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    // Disable Drag
    document.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });

    // Disable Image Drag
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false");
    });

})();
/* ==========================================
   LAZY LOAD IMAGES
========================================== */

function initLazyImages() {

    document.querySelectorAll("img").forEach(img => {

        if (!img.hasAttribute("loading")) {

            img.loading = "lazy";

        }

    });

}
/* ==========================================
   SEO AUTO
========================================== */

function initSEO() {

    document.title = CONFIG.WEBSITE_NAME;

    const meta = document.querySelector("meta[name='description']");

    if (meta) {

        meta.content =
            "Love Shayari, Sad Shayari, Friendship Shayari, Motivation, Stories, Quotes by Adarsh Raj Shayar.";

    }

}
