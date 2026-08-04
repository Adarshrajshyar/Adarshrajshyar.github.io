"use strict";

/* ==========================================
   Adarsh Raj Shayar
   Professional Script v7.0
========================================== */

console.log("🌹 Adarsh Raj Shayar Started");

/* ==========================================
   GLOBAL VARIABLES
========================================== */

const body = document.body;

const darkBtn = document.getElementById("darkModeBtn");

const popup = document.getElementById("welcomePopup");

const enterBtn = document.getElementById("enterBtn");

const topBtn = document.getElementById("topBtn");

const toast = document.getElementById("toast");

const currentYear = document.getElementById("currentYear");

const search = document.getElementById("search");

const menuBtn = document.getElementById("menuBtn");

const nav = document.querySelector("nav");

const overlay = document.getElementById("overlay");

/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    initTheme();

    initPopup();

    initCurrentYear();

    initBackToTop();

    initSearch();

    initMenu();

    loadAllShayari();

});

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
   YEAR
========================================== */

function initCurrentYear(){

    if(currentYear){

        currentYear.innerHTML =
        new Date().getFullYear();

    }

}

/* ==========================================
   POPUP
========================================== */

function initPopup(){

    if(!popup || !enterBtn) return;

    if(localStorage.getItem("visited")){

        popup.style.display="none";

        return;

    }

    enterBtn.onclick=function(){

        popup.style.display="none";

        localStorage.setItem("visited","yes");

        showToast("❤️ Welcome");

    }

}

/* ==========================================
   THEME
========================================== */

function initTheme(){

    if(localStorage.getItem("theme")=="light"){

        body.classList.add("light-mode");

    }

    updateTheme();

    if(darkBtn){

        darkBtn.onclick=toggleTheme;

    }

}

function toggleTheme(){

    body.classList.toggle("light-mode");

    localStorage.setItem(

        "theme",

        body.classList.contains("light-mode")

        ?"light":"dark"

    );

    updateTheme();

}

function updateTheme(){

    if(!darkBtn) return;

    darkBtn.innerHTML=

    body.classList.contains("light-mode")

    ?"🌙"

    :"☀️";

}
/* ==========================================
   MOBILE MENU
========================================== */

function initMenu(){

    if(!menuBtn || !nav || !overlay) return;

    menuBtn.onclick=()=>{

        nav.classList.toggle("active");

        overlay.classList.toggle("active");

        body.classList.toggle("menu-open");

    };

    overlay.onclick=closeMenu;

    document.querySelectorAll("nav a").forEach(link=>{

        link.onclick=closeMenu;

    });

}

function closeMenu(){

    nav.classList.remove("active");

    overlay.classList.remove("active");

    body.classList.remove("menu-open");

}

/* ==========================================
   SEARCH
========================================== */

function initSearch(){

    if(!search) return;

    search.onkeyup=function(){

        const value=this.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card=>{

            const text=card.innerText.toLowerCase();

            card.style.display=

            text.includes(value)

            ?""

            :"none";

        });

    };

}

/* ==========================================
   BACK TO TOP
========================================== */

function initBackToTop(){

    if(!topBtn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            topBtn.style.display="block";

        }else{

            topBtn.style.display="none";

        }

    });

    topBtn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

}

/* ==========================================
   SCROLL PROGRESS
========================================== */

window.addEventListener("scroll",()=>{

    const bar=document.getElementById("progressBar");

    if(!bar) return;

    const total=

    document.documentElement.scrollHeight-

    document.documentElement.clientHeight;

    const progress=

    (document.documentElement.scrollTop/total)*100;

    bar.style.width=progress+"%";

});

/* ==========================================
   ACTIVE MENU
========================================== */

const sections=document.querySelectorAll("section[id]");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        if(window.scrollY>=top){

            current=section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
/* ==========================================
   CREATE SHAYARI CARD
========================================== */

function createCard(item){

return `

<div class="card">

<h3>${item.title || ""}</h3>

<p class="shayariText">

${item.text.replace(/\n/g,"<br>")}

</p>

<p class="author">

✍️ ${item.author || "Adarsh Raj"}

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

/* ==========================================
   LOAD SECTION
========================================== */

function loadSection(containerId,data){

const container=document.getElementById(containerId);

if(!container) return;

container.innerHTML=data.map(createCard).join("");

}

/* ==========================================
   LOAD ALL SHAYARI
========================================== */

function loadAllShayari(){

if(typeof loveShayari!=="undefined"){

loadSection("loveContainer",loveShayari);

}

if(typeof sadShayari!=="undefined"){

loadSection("sadContainer",sadShayari);

}

if(typeof attitudeShayari!=="undefined"){

loadSection("attitudeContainer",attitudeShayari);

}

if(typeof friendshipShayari!=="undefined"){

loadSection("friendshipContainer",friendshipShayari);

}

if(typeof motivationShayari!=="undefined"){

loadSection("motivationContainer",motivationShayari);

}

/* Load Published Shayari */

loadPublishedShayari();

}

/* ==========================================
   COPY SHAYARI
========================================== */

document.addEventListener("click",async(e)=>{

if(!e.target.classList.contains("copyBtn")) return;

const text=e.target

.closest(".card")

.querySelector(".shayariText")

.innerText;

try{

await navigator.clipboard.writeText(text);

showToast("📋 Shayari Copied");

}catch{

showToast("❌ Copy Failed");

}

});

/* ==========================================
   SHARE SHAYARI
========================================== */

document.addEventListener("click",async(e)=>{

if(!e.target.classList.contains("shareBtn")) return;

const text=e.target

.closest(".card")

.querySelector(".shayariText")

.innerText;

if(navigator.share){

await navigator.share({

title:"Adarsh Raj Shayar",

text:text,

url:location.href

});

}else{

await navigator.clipboard.writeText(text);

showToast("📋 Shayari Copied");

}

});
/* ==========================================
   LIKE + FAVOURITE SYSTEM v7.0
========================================== */

let likedShayari =
JSON.parse(localStorage.getItem("likedShayari")) || [];

let favoriteShayari =
JSON.parse(localStorage.getItem("favoriteShayari")) || [];

let likeCounter =
JSON.parse(localStorage.getItem("likeCounter")) || {};

/* ==========================================
   RESTORE BUTTONS
========================================== */

function restoreButtons(){

document.querySelectorAll(".card").forEach(card=>{

const text=card.querySelector(".shayariText")?.innerText;

if(!text) return;

const likeBtn=card.querySelector(".likeBtn");

const favBtn=card.querySelector(".favBtn");

if(likedShayari.includes(text)){

likeBtn.classList.add("active");

likeBtn.innerHTML="💖 Liked";

}

if(favoriteShayari.includes(text)){

favBtn.classList.add("active");

favBtn.innerHTML="🌟 Saved";

}

});

restoreLikeCounter();

updateFavourite();

}

/* ==========================================
   LIKE CLICK
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("likeBtn")) return;

const btn=e.target;

const card=btn.closest(".card");

const text=card.querySelector(".shayariText").innerText;

if(likedShayari.includes(text)){

likedShayari=likedShayari.filter(x=>x!==text);

btn.innerHTML="❤️ Like";

btn.classList.remove("active");

showToast("❌ Like Removed");

}else{

likedShayari.push(text);

btn.innerHTML="💖 Liked";

btn.classList.add("active");

showToast("❤️ Liked");

}

localStorage.setItem(

"likedShayari",

JSON.stringify(likedShayari)

);

likeCounter[text]=(likeCounter[text]||0)+1;

localStorage.setItem(

"likeCounter",

JSON.stringify(likeCounter)

);

restoreLikeCounter();

});

/* ==========================================
   LIKE COUNTER
========================================== */

function restoreLikeCounter(){

document.querySelectorAll(".card").forEach(card=>{

const text=card.querySelector(".shayariText")?.innerText;

if(!text) return;

let counter=card.querySelector(".likeCount");

if(!counter){

counter=document.createElement("p");

counter.className="likeCount";

counter.style.color="gold";

counter.style.fontWeight="bold";

counter.style.marginTop="10px";

card.appendChild(counter);

}

counter.innerHTML="❤️ Likes : "+(likeCounter[text]||0);

});

}

/* ==========================================
   FAVOURITE
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("favBtn")) return;

const btn=e.target;

const text=btn.closest(".card")

.querySelector(".shayariText")

.innerText;

if(favoriteShayari.includes(text)){

favoriteShayari=

favoriteShayari.filter(x=>x!==text);

btn.innerHTML="⭐ Favourite";

btn.classList.remove("active");

showToast("❌ Removed");

}else{

favoriteShayari.push(text);

btn.innerHTML="🌟 Saved";

btn.classList.add("active");

showToast("⭐ Added");

}

localStorage.setItem(

"favoriteShayari",

JSON.stringify(favoriteShayari)

);

updateFavourite();

});

/* ==========================================
   UPDATE FAVOURITE PAGE
========================================== */

function updateFavourite(){

const list=document.getElementById("favoriteList");

if(!list) return;

if(favoriteShayari.length===0){

list.innerHTML="<p>अभी कोई Favourite Shayari नहीं है।</p>";

return;

}

list.innerHTML=favoriteShayari.map(text=>`

<div class="card">

<p class="shayariText">

${text.replace(/\n/g,"<br>")}

</p>

</div>

`).join("");

}

setTimeout(restoreButtons,500);
/* ==========================================
   ADMIN LOGIN
========================================== */

const ADMIN_PASSWORD = "ARS2026";

const loginBtn = document.getElementById("loginBtn");

if(loginBtn){

loginBtn.onclick=function(){

const pass=document.getElementById("adminPassword").value;

if(pass===ADMIN_PASSWORD){

document.getElementById("adminLogin").style.display="none";

document.getElementById("publisherPanel").style.display="block";

showToast("✅ Admin Login Success");

}else{

showToast("❌ Wrong Password");

}

};

}

/* ==========================================
   SHAYARI PUBLISH
========================================== */

const publishBtn=document.getElementById("publishBtn");

if(publishBtn){

publishBtn.onclick=function(){

const title=document.getElementById("pubTitle").value.trim();

const category=document.getElementById("pubCategory").value;

const text=document.getElementById("pubText").value.trim();

const author=document.getElementById("pubAuthor").value.trim();

const publisher=document.getElementById("pubPublisher").value.trim();

if(title===""||text===""){

showToast("⚠ Fill Required Fields");

return;

}

const shayari={

title,

category,

text,

author,

publisher,

date:new Date().toLocaleDateString()

};

let all=

JSON.parse(localStorage.getItem("customShayari"))

||[];

all.unshift(shayari);

localStorage.setItem(

"customShayari",

JSON.stringify(all)

);

loadPublishedShayari();

showToast("✅ Shayari Published");

document.getElementById("pubTitle").value="";

document.getElementById("pubText").value="";

document.getElementById("pubAuthor").value="";

};

}

/* ==========================================
   LOAD PUBLISHED SHAYARI
========================================== */

function loadPublishedShayari(){

const container=document.getElementById("publishedContainer");

if(!container) return;

container.innerHTML="";

const all=

JSON.parse(localStorage.getItem("customShayari"))

||[];

all.forEach(item=>{

container.innerHTML+=`

<div class="card">

<h3>${item.title}</h3>

<p class="shayariText">

${item.text.replace(/\n/g,"<br>")}

</p>

<p>

✍️ ${item.author}

</p>

<p>

👑 Published By :

${item.publisher}

</p>

<p>

📅 ${item.date}

</p>

</div>

`;

});

}

loadPublishedShayari();
/* ==========================================
   STORY PUBLISHER
========================================== */

const storyPublishBtn =
document.getElementById("storyPublishBtn");

if(storyPublishBtn){

storyPublishBtn.onclick=function(){

const title=
document.getElementById("storyTitle").value.trim();

const text=
document.getElementById("storyText").value.trim();

const author=
document.getElementById("storyAuthor").value.trim();

if(title==="" || text===""){

showToast("⚠ Please Fill Story");

return;

}

const story={

title,

text,

author,

publisher:"Adarsh Raj",

date:new Date().toLocaleDateString()

};

let allStories=

JSON.parse(localStorage.getItem("stories"))

||[];

allStories.unshift(story);

localStorage.setItem(

"stories",

JSON.stringify(allStories)

);

loadStories();

showToast("📖 Story Published");

document.getElementById("storyTitle").value="";

document.getElementById("storyText").value="";

document.getElementById("storyAuthor").value="";

};

}

/* ==========================================
   LOAD STORIES
========================================== */

function loadStories(){

const container=document.getElementById("storyContainer");

if(!container) return;

container.innerHTML="";

const stories=

JSON.parse(localStorage.getItem("stories"))

||[];

stories.forEach((story,index)=>{

container.innerHTML+=`

<div class="card">

<h3>${story.title}</h3>

<p class="shayariText">

${story.text.replace(/\n/g,"<br>")}

</p>

<p>

✍️ ${story.author || "Unknown"}

</p>

<p>

👑 Published By :
${story.publisher}

</p>

<p>

📅 ${story.date}

</p>

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

loadStories();

/* ==========================================
   DELETE STORY
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("storyDeleteBtn"))

return;

const id=e.target.dataset.id;

let stories=

JSON.parse(localStorage.getItem("stories"))

||[];

stories.splice(id,1);

localStorage.setItem(

"stories",

JSON.stringify(stories)

);

loadStories();

showToast("🗑 Story Deleted");

});
/* ==========================================
   DELETE SHAYARI
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("deleteShayariBtn")) return;

const id=e.target.dataset.id;

let all=

JSON.parse(localStorage.getItem("customShayari")) || [];

all.splice(id,1);

localStorage.setItem(

"customShayari",

JSON.stringify(all)

);

loadPublishedShayari();

showToast("🗑 Shayari Deleted");

});

/* ==========================================
   EDIT SHAYARI
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("editShayariBtn")) return;

const id=e.target.dataset.id;

let all=

JSON.parse(localStorage.getItem("customShayari")) || [];

const item=all[id];

document.getElementById("pubTitle").value=item.title;

document.getElementById("pubText").value=item.text;

document.getElementById("pubAuthor").value=item.author;

all.splice(id,1);

localStorage.setItem(

"customShayari",

JSON.stringify(all)

);

loadPublishedShayari();

showToast("✏️ Edit Mode");

});
/* ==========================================
   LOAD PUBLISHED SHAYARI (NEW VERSION)
========================================== */

function loadPublishedShayari(){

const container=document.getElementById("publishedContainer");

if(!container) return;

container.innerHTML="";

let all=JSON.parse(localStorage.getItem("customShayari")) || [];

if(all.length===0){

container.innerHTML="<p>No Published Shayari Yet.</p>";

return;

}

all.forEach((item,index)=>{

container.innerHTML+=`

<div class="card">

<h3>${item.title}</h3>

<p class="shayariText">

${item.text.replace(/\n/g,"<br>")}

</p>

<p>

✍️ <b>Original Author :</b>

${item.author || "Unknown"}

</p>

<p>

👑 <b>Published By :</b>

${item.publisher || "Adarsh Raj"}

</p>

<p>

📅 ${item.date}

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

<button

class="editShayariBtn"

data-id="${index}">

✏ Edit

</button>

<button

class="deleteShayariBtn"

data-id="${index}">

🗑 Delete

</button>

</div>

</div>

`;

});

restoreButtons();

}

loadPublishedShayari();
