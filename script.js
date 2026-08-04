"use strict";

/* ==========================================
   Adarsh Raj Shayar
   Professional Script v8.0
========================================== */

console.clear();
console.log("🌹 Adarsh Raj Shayar v8 Loaded");

/* ==========================================
GLOBAL VARIABLES
========================================== */

const body=document.body;

const toast=document.getElementById("toast");

const popup=document.getElementById("welcomePopup");

const enterBtn=document.getElementById("enterBtn");

const darkBtn=document.getElementById("darkModeBtn");

const search=document.getElementById("search");

const topBtn=document.getElementById("topBtn");

const currentYear=document.getElementById("currentYear");

const menuBtn=document.getElementById("menuBtn");

const nav=document.querySelector("nav");

const overlay=document.getElementById("overlay");

const ADMIN_PASSWORD="ARS2026";

let likedShayari=[];

let favouriteShayari=[];

let likeCounter={};
/* ==========================================
TOAST
========================================== */

function showToast(message){

if(!toast) return;

toast.innerHTML=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}

/* ==========================================
CURRENT YEAR
========================================== */

function initCurrentYear(){

if(currentYear){

currentYear.textContent=new Date().getFullYear();

}

}

/* ==========================================
WELCOME POPUP
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

};

}
/* ==========================================
DARK MODE
========================================== */

function initTheme(){

if(localStorage.getItem("theme")==="light"){

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

? "light"

: "dark"

);

updateTheme();

showToast(

body.classList.contains("light-mode")

? "☀️ Light Mode"

: "🌙 Dark Mode"

);

}

function updateTheme(){

if(!darkBtn) return;

darkBtn.innerHTML=

body.classList.contains("light-mode")

? "🌙"

: "☀️";

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

card.style.display=

card.innerText.toLowerCase().includes(value)

? ""

: "none";

});

};

}
/* ==========================================
   BACK TO TOP
========================================== */

function initBackToTop(){

if(!topBtn) return;

window.addEventListener("scroll",()=>{

topBtn.style.display=
window.scrollY>300
? "block"
: "none";

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}

/* ==========================================
   SCROLL PROGRESS BAR
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

window.addEventListener("scroll",()=>{

const sections=document.querySelectorAll("section[id]");

const navLinks=document.querySelectorAll("nav a");

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

<button class="copyBtn">📋 Copy</button>

<button class="shareBtn">📤 Share</button>

<button class="likeBtn">❤️ Like</button>

<button class="favBtn">⭐ Favourite</button>

</div>

</div>

`;

}

/* ==========================================
COPY
========================================== */

document.addEventListener("click",async(e)=>{

if(!e.target.classList.contains("copyBtn")) return;

const text=e.target.closest(".card")

.querySelector(".shayariText").innerText;

await navigator.clipboard.writeText(text);

showToast("📋 Shayari Copied");

});

/* ==========================================
SHARE
========================================== */

document.addEventListener("click",async(e)=>{

if(!e.target.classList.contains("shareBtn")) return;

const text=e.target.closest(".card")

.querySelector(".shayariText").innerText;

if(navigator.share){

await navigator.share({

title:"Adarsh Raj Shayar",

text:text,

url:location.href

});

}else{

await navigator.clipboard.writeText(text);

showToast("📤 Shayari Copied");

}

});

/* ==========================================
LIKE + FAVOURITE
========================================== */

let likedShayari =
JSON.parse(localStorage.getItem("likedShayari")) || [];

let favouriteShayari =
JSON.parse(localStorage.getItem("favouriteShayari")) || [];

let likeCounter =
JSON.parse(localStorage.getItem("likeCounter")) || {};

/* Like */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("likeBtn")) return;

const btn=e.target;

btn.classList.toggle("active");

btn.innerHTML=

btn.classList.contains("active")

? "💖 Liked"

: "❤️ Like";

});

/* Favourite */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("favBtn")) return;

const btn=e.target;

btn.classList.toggle("active");

btn.innerHTML=

btn.classList.contains("active")

? "🌟 Saved"

: "⭐ Favourite";

});
/* ==========================================
   PUBLISH SHAYARI SYSTEM v8
========================================== */

const loginBtn = document.getElementById("loginBtn");
const publishBtn = document.getElementById("publishBtn");

if(loginBtn){

loginBtn.onclick=function(){

const pass=document.getElementById("adminPassword").value.trim();

if(pass!=="ARS2026"){

showToast("❌ Wrong Password");

return;

}

document.getElementById("adminLogin").style.display="none";
document.getElementById("publisherPanel").style.display="block";

showToast("✅ Admin Login Success");

};

}

if(publishBtn){

publishBtn.onclick=function(){

const title=document.getElementById("pubTitle").value.trim();

const category=document.getElementById("pubCategory").value;

const text=document.getElementById("pubText").value.trim();

const author=document.getElementById("pubAuthor").value.trim();

const publisher=document.getElementById("pubPublisher").value.trim() || "Adarsh Raj";

if(title==="" || text===""){

showToast("⚠ Fill Required Fields");

return;

}

const shayari={

id:Date.now(),

title,

category,

text,

author,

publisher,

date:new Date().toLocaleDateString()

};

let all=

JSON.parse(localStorage.getItem("customShayari")) || [];

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

let all=

JSON.parse(localStorage.getItem("customShayari")) || [];

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

<p>✍️ <b>Original Author:</b> ${item.author||"Unknown"}</p>

<p>👑 <b>Published By:</b> ${item.publisher}</p>

<p>📅 ${item.date}</p>

<div class="actionButtons">

<button class="editShayariBtn" data-id="${index}">
✏ Edit
</button>

<button class="deleteShayariBtn" data-id="${index}">
🗑 Delete
</button>

</div>

</div>

`;

});

restoreButtons();

}
/* ==========================================
   EDIT SHAYARI
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("editShayariBtn")) return;

const id=e.target.dataset.id;

let all=JSON.parse(localStorage.getItem("customShayari")) || [];

const item=all[id];

document.getElementById("pubTitle").value=item.title;

document.getElementById("pubCategory").value=item.category;

document.getElementById("pubText").value=item.text;

document.getElementById("pubAuthor").value=item.author;

document.getElementById("pubPublisher").value=item.publisher;

all.splice(id,1);

localStorage.setItem(

"customShayari",

JSON.stringify(all)

);

loadPublishedShayari();

showToast("✏ Edit Mode Enabled");

});

/* ==========================================
   DELETE SHAYARI
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("deleteShayariBtn")) return;

if(!confirm("Delete this Shayari?")) return;

const id=e.target.dataset.id;

let all=JSON.parse(localStorage.getItem("customShayari")) || [];

all.splice(id,1);

localStorage.setItem(

"customShayari",

JSON.stringify(all)

);

loadPublishedShayari();

showToast("🗑 Shayari Deleted");

});

/* ==========================================
   STORY PUBLISH
========================================== */

const storyPublishBtn=document.getElementById("storyPublishBtn");

if(storyPublishBtn){

storyPublishBtn.onclick=function(){

const title=document.getElementById("storyTitle").value.trim();

const text=document.getElementById("storyText").value.trim();

const author=document.getElementById("storyAuthor").value.trim();

if(title==="" || text===""){

showToast("⚠ Fill Story Details");

return;

}

const story={

id:Date.now(),

title,

text,

author,

publisher:"Adarsh Raj",

date:new Date().toLocaleDateString()

};

let stories=

JSON.parse(localStorage.getItem("stories")) || [];

stories.unshift(story);

localStorage.setItem(

"stories",

JSON.stringify(stories)

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

let stories=JSON.parse(localStorage.getItem("stories")) || [];

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

<p>✍️ ${story.author || "Unknown"}</p>

<p>👑 Published By : ${story.publisher}</p>

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
DELETE STORY
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("storyDeleteBtn")) return;

if(!confirm("Delete this Story?")) return;

const id=e.target.dataset.id;

let stories=JSON.parse(localStorage.getItem("stories")) || [];

stories.splice(id,1);

localStorage.setItem(

"stories",

JSON.stringify(stories)

);

loadStories();

showToast("🗑 Story Deleted");

});

/* ==========================================
INITIALIZE WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

initTheme();

initPopup();

initCurrentYear();

initBackToTop();

initSearch();

initMenu();

loadAllShayari();

loadPublishedShayari();

loadStories();

restoreButtons();

console.log("✅ Website Ready");

});

console.log("🌹 Adarsh Raj Shayar v8 Loaded Successfully");
