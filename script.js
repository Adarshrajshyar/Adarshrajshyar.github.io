"use strict";

/* ==========================================
   Adarsh Raj Shayar
   Professional Script v10
========================================== */

console.clear();
console.log("🌹 Adarsh Raj Shayar v10 Loaded");

/* ==========================================
   GLOBAL ELEMENTS
========================================== */

const body = document.body;

const toast = document.getElementById("toast");
const popup = document.getElementById("welcomePopup");
const enterBtn = document.getElementById("enterBtn");

const darkBtn = document.getElementById("darkModeBtn");

const searchInput = document.getElementById("search");

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");
const overlay = document.getElementById("overlay");

const topBtn = document.getElementById("topBtn");

const progressBar = document.getElementById("progressBar");

const currentYear = document.getElementById("currentYear");

const ADMIN_PASSWORD = "ARS2026";

/* ==========================================
   LOCAL STORAGE
========================================== */

let likedShayari =
JSON.parse(localStorage.getItem("likedShayari")) || [];

let favouriteShayari =
JSON.parse(localStorage.getItem("favouriteShayari")) || [];

let customShayari =
JSON.parse(localStorage.getItem("customShayari")) || [];

let stories =
JSON.parse(localStorage.getItem("stories")) || [];

/* ==========================================
   SAVE DATA
========================================== */

function saveData(){

localStorage.setItem(
"likedShayari",
JSON.stringify(likedShayari)
);

localStorage.setItem(
"favouriteShayari",
JSON.stringify(favouriteShayari)
);

localStorage.setItem(
"customShayari",
JSON.stringify(customShayari)
);

localStorage.setItem(
"stories",
JSON.stringify(stories)
);

}

/* ==========================================
   TOAST
========================================== */

function showToast(message){

if(!toast) return;

toast.innerHTML = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}
/* ==========================================
   CURRENT YEAR
========================================== */

function initCurrentYear() {

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

}

/* ==========================================
   LOADER
========================================== */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        }, 800);

    });

}

/* ==========================================
   WELCOME POPUP
========================================== */

function initPopup() {

    if (!popup || !enterBtn) return;

    if (localStorage.getItem("visited")) {

        popup.style.display = "none";
        return;

    }

    enterBtn.onclick = function () {

        popup.style.display = "none";

        localStorage.setItem("visited", "yes");

        showToast("❤️ Welcome to Adarsh Raj Shayar");

    };

}

/* ==========================================
   DARK MODE
========================================== */

function initTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        body.classList.add("light-mode");

    }

    updateThemeIcon();

    if (darkBtn) {

        darkBtn.onclick = toggleTheme;

    }

}

function toggleTheme() {

    body.classList.toggle("light-mode");

    const theme = body.classList.contains("light-mode")
        ? "light"
        : "dark";

    localStorage.setItem("theme", theme);

    updateThemeIcon();

    showToast(
        theme === "light"
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

/* ==========================================
   MOBILE MENU
========================================== */

function initMenu() {

    if (!menuBtn || !nav || !overlay) return;

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        overlay.classList.toggle("active");

        body.classList.toggle("menu-open");

    });

    overlay.addEventListener("click", closeMenu);

}

function closeMenu() {

    nav.classList.remove("active");

    overlay.classList.remove("active");

    body.classList.remove("menu-open");

}
/* ==========================================
   SEARCH SYSTEM
========================================== */

function initSearch() {

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value)
                ? ""
                : "none";

        });

    });

}

/* ==========================================
   BACK TO TOP
========================================== */

function initBackToTop() {

    if (!topBtn) return;

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 300
                ? "block"
                : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

function initProgressBar() {

    if (!progressBar) return;

    window.addEventListener("scroll", () => {

        const total =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (document.documentElement.scrollTop / total) * 100;

        progressBar.style.width = progress + "%";

    });

}

/* ==========================================
   ACTIVE MENU
========================================== */

function initActiveMenu() {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================
   SMOOTH NAVIGATION
========================================== */

function initSmoothScroll() {

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

            closeMenu();

        });

    });

}
/* ==========================================
   COPY SHAYARI
========================================== */

async function copyText(text){

    try{

        await navigator.clipboard.writeText(text);

        showToast("📋 Shayari Copied");

    }catch{

        showToast("❌ Copy Failed");

    }

}

/* ==========================================
   SHARE SHAYARI
========================================== */

async function shareText(text){

    if(navigator.share){

        try{

            await navigator.share({

                title:"Adarsh Raj Shayar",

                text:text,

                url:location.href

            });

        }catch(e){}

    }else{

        copyText(text);

    }

}

/* ==========================================
   BUTTON EVENTS
========================================== */

document.addEventListener("click",(e)=>{

    const card=e.target.closest(".card");

    if(!card) return;

    const textElement=card.querySelector(".shayariText");

    if(!textElement) return;

    const text=textElement.innerText;

    /* COPY */

    if(e.target.classList.contains("copyBtn")){

        copyText(text);

    }

    /* SHARE */

    if(e.target.classList.contains("shareBtn")){

        shareText(text);

    }

});

/* ==========================================
   LIKE SYSTEM
========================================== */

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("likeBtn")) return;

    const btn=e.target;

    btn.classList.toggle("active");

    if(btn.classList.contains("active")){

        btn.innerHTML="💖 Liked";

    }else{

        btn.innerHTML="❤️ Like";

    }

});

/* ==========================================
   FAVOURITE SYSTEM
========================================== */

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("favBtn")) return;

    const btn=e.target;

    const card=btn.closest(".card");

    const text=card.querySelector(".shayariText").innerText;

    btn.classList.toggle("active");

    if(btn.classList.contains("active")){

        btn.innerHTML="🌟 Saved";

        if(!favouriteShayari.includes(text)){

            favouriteShayari.push(text);

        }

    }else{

        btn.innerHTML="⭐ Favourite";

        favouriteShayari=favouriteShayari.filter(item=>item!==text);

    }

    saveData();

});
/* ==========================================
   ADMIN + USER ACTION SYSTEM
========================================== */

let isAdmin =
sessionStorage.getItem("ARS_ADMIN")==="true";

/* ==========================================
   ADMIN LOGIN
========================================== */

function initAdmin(){

const loginBtn=document.getElementById("loginBtn");

if(!loginBtn) return;

loginBtn.onclick=function(){

const password=
document.getElementById("adminPassword")
.value
.trim();

if(password!==ADMIN_PASSWORD){

showToast("❌ Wrong Password");

return;

}

isAdmin=true;

sessionStorage.setItem(
"ARS_ADMIN",
"true"
);

document.getElementById("adminLogin").style.display="none";

document.getElementById("publisherPanel").style.display="block";

showToast("✅ Admin Login Success");

};

}

/* ==========================================
   CHECK ADMIN
========================================== */

function checkAdmin(){

if(!isAdmin){

showToast("🔒 Please Login First");

return false;

}

return true;

}

/* ==========================================
   COPY
========================================== */

async function copyText(text){

try{

await navigator.clipboard.writeText(text);

showToast("📋 Shayari Copied");

}catch{

showToast("❌ Copy Failed");

}

}

/* ==========================================
   SHARE
========================================== */

async function shareText(text){

if(navigator.share){

try{

await navigator.share({

title:"Adarsh Raj Shayar",

text:text,

url:location.href

});

}catch(e){}

}else{

copyText(text);

}

}

/* ==========================================
   BUTTON EVENTS
========================================== */

document.addEventListener("click",function(e){

const card=e.target.closest(".card");

if(!card) return;

const shayari=card.querySelector(".shayariText");

if(!shayari) return;

const text=shayari.innerText;

/* COPY */

if(e.target.classList.contains("copyBtn")){

copyText(text);

}

/* SHARE */

if(e.target.classList.contains("shareBtn")){

shareText(text);

}

});

/* ==========================================
   LIKE SYSTEM
========================================== */

document.addEventListener("click",function(e){

if(!e.target.classList.contains("likeBtn")) return;

const btn=e.target;

btn.classList.toggle("active");

if(btn.classList.contains("active")){

btn.innerHTML="💖 Liked";

}else{

btn.innerHTML="❤️ Like";

}

});

/* ==========================================
   FAVOURITE SYSTEM
========================================== */

document.addEventListener("click",function(e){

if(!e.target.classList.contains("favBtn")) return;

const btn=e.target;

const card=btn.closest(".card");

const text=
card.querySelector(".shayariText").innerText;

btn.classList.toggle("active");

if(btn.classList.contains("active")){

btn.innerHTML="🌟 Saved";

if(!favouriteShayari.includes(text)){

favouriteShayari.push(text);

}

}else{

btn.innerHTML="⭐ Favourite";

favouriteShayari=favouriteShayari.filter(

item=>item!==text

);

}

saveData();

});
/* ==========================================
   SHAYARI PUBLISH SYSTEM
========================================== */

function publishShayari(){

if(!checkAdmin()) return;

const title=document.getElementById("pubTitle").value.trim();

const category=document.getElementById("pubCategory").value;

const text=document.getElementById("pubText").value.trim();

const author=document.getElementById("pubAuthor").value.trim();

const publisher=document.getElementById("pubPublisher").value.trim() || "Adarsh Raj";

if(title==="" || text===""){

showToast("⚠ Please Fill Required Fields");

return;

}

const shayari={

id:Date.now(),

title:title,

category:category,

text:text,

author:author || "Unknown",

publisher:publisher,

date:new Date().toLocaleDateString()

};

customShayari.unshift(shayari);

saveData();

loadPublishedShayari();

showToast("✅ Shayari Published Successfully");

document.getElementById("pubTitle").value="";

document.getElementById("pubText").value="";

document.getElementById("pubAuthor").value="";

}

/* ==========================================
   PUBLISH BUTTON
========================================== */

function initPublishButton(){

const publishBtn=document.getElementById("publishBtn");

if(!publishBtn) return;

publishBtn.addEventListener("click",publishShayari);

}
/* ==========================================
   STORY PUBLISH SYSTEM
========================================== */

function publishStory(){

if(!checkAdmin()) return;

const title=document.getElementById("storyTitle").value.trim();
const text=document.getElementById("storyText").value.trim();
const author=document.getElementById("storyAuthor").value.trim();

if(title==="" || text===""){

showToast("⚠ Please Fill Story Details");
return;

}

const story={

id:Date.now(),

title,

text,

author:author || "Unknown",

publisher:"Adarsh Raj",

date:new Date().toLocaleDateString()

};

stories.unshift(story);

saveData();

loadStories();

showToast("📖 Story Published Successfully");

document.getElementById("storyTitle").value="";
document.getElementById("storyText").value="";
document.getElementById("storyAuthor").value="";

}

/* ==========================================
   STORY BUTTON
========================================== */

function initStoryButton(){

const btn=document.getElementById("storyPublishBtn");

if(!btn) return;

btn.addEventListener("click",publishStory);

}

/* ==========================================
   EDIT / DELETE SHAYARI
========================================== */

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("editShayariBtn")){

if(!checkAdmin()) return;

const id=Number(e.target.dataset.id);

const item=customShayari[id];

if(!item) return;

document.getElementById("pubTitle").value=item.title;
document.getElementById("pubCategory").value=item.category;
document.getElementById("pubText").value=item.text;
document.getElementById("pubAuthor").value=item.author;
document.getElementById("pubPublisher").value=item.publisher;

customShayari.splice(id,1);

saveData();

loadPublishedShayari();

showToast("✏ Edit Mode Enabled");

}

if(e.target.classList.contains("deleteShayariBtn")){

if(!checkAdmin()) return;

const id=Number(e.target.dataset.id);

if(!confirm("Delete this Shayari?")) return;

customShayari.splice(id,1);

saveData();

loadPublishedShayari();

showToast("🗑 Shayari Deleted");

}

});

/* ==========================================
   DELETE STORY
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("storyDeleteBtn")) return;

if(!checkAdmin()) return;

const id=Number(e.target.dataset.id);

if(!confirm("Delete this Story?")) return;

stories.splice(id,1);

saveData();

loadStories();

showToast("🗑 Story Deleted");

});
/* ==========================================
   LOAD PUBLISHED SHAYARI
========================================== */

function loadPublishedShayari(){

const container=document.getElementById("publishedContainer");

if(!container) return;

container.innerHTML="";

if(customShayari.length===0){

container.innerHTML=`
<div class="card">
<h3>📝 No Shayari Published Yet</h3>
<p>नई Shayari जल्द प्रकाशित होगी।</p>
</div>
`;

return;

}

customShayari.forEach((item,index)=>{

container.innerHTML+=createCard(item)+`

<div class="actionButtons adminButtons">

<button class="editShayariBtn"
data-id="${index}">
✏ Edit
</button>

<button class="deleteShayariBtn"
data-id="${index}">
🗑 Delete
</button>

</div>

`;

});

}

/* ==========================================
   LOAD STORIES
========================================== */

function loadStories(){

const container=document.getElementById("storyContainer");

if(!container) return;

container.innerHTML="";

if(stories.length===0){

container.innerHTML=`
<div class="card">
<h3>📖 No Story Published Yet</h3>
<p>नई Story जल्द प्रकाशित होगी।</p>
</div>
`;

return;

}

stories.forEach((story,index)=>{

container.innerHTML+=`

<div class="card">

<h3>${story.title}</h3>

<p class="shayariText">
${story.text.replace(/\n/g,"<br>")}
</p>

<p>✍️ ${story.author}</p>

<p>📅 ${story.date}</p>

<div class="actionButtons">

<button class="storyDeleteBtn"
data-id="${index}">
🗑 Delete
</button>

</div>

</div>

`;

});

}

/* ==========================================
   RESTORE USER BUTTONS
========================================== */

function restoreButtons(){

document.querySelectorAll(".likeBtn").forEach(btn=>{

btn.innerHTML="❤️ Like";

});

document.querySelectorAll(".favBtn").forEach(btn=>{

btn.innerHTML="⭐ Favourite";

});

}

/* ==========================================
   FINAL INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

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

initAdmin();

initPublishButton();

initStoryButton();

loadAllShayari();

loadPublishedShayari();

loadStories();

restoreButtons();

initVisitorCounter();
   
initContactForm();
   
initCertificate();
   
loadFavourite();
   
console.log("✅ Adarsh Raj Shayar v10 Ready");

});

console.log("🌹 Professional Script Loaded");
/* ==========================================
   VISITOR COUNTER
========================================== */

function initVisitorCounter(){

let count=Number(localStorage.getItem("visitorCount"))||0;

count++;

localStorage.setItem("visitorCount",count);

const visitor=document.getElementById("visitor-count");

if(visitor){

visitor.textContent=count.toLocaleString();

}

}

/* ==========================================
   EMAIL JS CONTACT
========================================== */

function initContactForm(){

const form=document.getElementById("contact-form");

if(!form) return;

emailjs.init("YOUR_PUBLIC_KEY");

form.addEventListener("submit",function(e){

e.preventDefault();

emailjs.sendForm(

"YOUR_SERVICE_ID",

"YOUR_TEMPLATE_ID",

this

).then(()=>{

showToast("📩 Message Sent");

form.reset();

}).catch(()=>{

showToast("❌ Failed");

});

});

}

/* ==========================================
   CERTIFICATE
========================================== */

function initCertificate(){

const btn=document.getElementById("certificateBtn");

if(!btn) return;

btn.onclick=function(){

showToast("🏆 Certificate Coming Soon");

};

}

/* ==========================================
   FAVOURITE LOADER
========================================== */

function loadFavourite(){

const container=document.getElementById("favoriteList");

if(!container) return;

container.innerHTML="";

if(favouriteShayari.length===0){

container.innerHTML="<p>अभी कोई Favourite Shayari नहीं है।</p>";

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
