console.log("Script Started");

/* ==========================================
   Adarsh Raj Shayar
   Professional Script v6.0
========================================== */
"use strict";

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

/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();

    initPopup();

    initCurrentYear();

    initBackToTop();

});

/* ==========================================
   TOAST MESSAGE
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

function initCurrentYear(){

    if(currentYear){

        currentYear.textContent =
        new Date().getFullYear();

    }

}
/* ==========================================
   WELCOME POPUP
========================================== */

function initPopup(){

    if(!popup || !enterBtn) return;

    const visited = localStorage.getItem("visited");

    if(visited === "yes"){

        popup.style.display = "none";

        return;

    }

    enterBtn.addEventListener("click",()=>{

        popup.style.display="none";

        localStorage.setItem("visited","yes");

        showToast("❤️ Welcome Adarsh Raj Shayar");

    });

}

/* ==========================================
   DARK / LIGHT MODE
========================================== */

function initTheme(){

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme==="light"){

        body.classList.add("light-mode");

    }

    updateThemeButton();

    if(!darkBtn) return;

    darkBtn.addEventListener("click",toggleTheme);

}

function toggleTheme(){

    body.classList.toggle("light-mode");

    const isLight =
    body.classList.contains("light-mode");

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();

    showToast(
        isLight
        ? "☀️ Light Mode Enabled"
        : "🌙 Dark Mode Enabled"
    );

}

function updateThemeButton(){

    if(!darkBtn) return;

    darkBtn.innerHTML =
    body.classList.contains("light-mode")
    ? "🌙 Dark"
    : "☀️ Light";

}
/* ==========================================
   LIVE SEARCH
========================================== */

const search = document.getElementById("search");

function initSearch(){

    if(!search) return;

    search.addEventListener("keyup",()=>{

        const value = search.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card=>{

            const text = card.innerText.toLowerCase();

            card.style.display =
            text.includes(value)
            ? ""
            : "none";

        });

    });

}

/* ==========================================
   BACK TO TOP
========================================== */

function initBackToTop(){

    if(!topBtn) return;

    window.addEventListener("scroll",()=>{

        topBtn.style.display =
        window.scrollY > 300
        ? "block"
        : "none";

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================
   START SEARCH
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    initSearch();

});
/* ==========================================
   LIKE SYSTEM (PERMANENT)
========================================== */

let likedShayari =
JSON.parse(localStorage.getItem("likedShayari")) || [];

/* Like Restore */

function restoreLikes(){

    document.querySelectorAll(".card").forEach(card=>{

        const text = card
        .querySelector(".shayariText")
        ?.innerText;

        const btn =
        card.querySelector(".likeBtn");

        if(!text || !btn) return;

        if(likedShayari.includes(text)){

            btn.classList.add("active");

            btn.innerHTML="💖 Liked";

        }

    });

}

/* Like Click */

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("likeBtn"))
        return;

    const btn=e.target;

    const card=btn.closest(".card");

    const text=card
    .querySelector(".shayariText")
    .innerText;

    if(likedShayari.includes(text)){

        likedShayari=
        likedShayari.filter(item=>item!==text);

        btn.classList.remove("active");

        btn.innerHTML="❤️ Like";

        showToast("❌ Like Removed");

    }else{

        likedShayari.push(text);

        btn.classList.add("active");

        btn.innerHTML="💖 Liked";

        showToast("❤️ Liked");

    }

    localStorage.setItem(

        "likedShayari",

        JSON.stringify(likedShayari)

    );

});

/* Restore After Loading */

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(restoreLikes,300);

});
/* ==========================================
   LIKE COUNTER SYSTEM
========================================== */

let likeCounter =
JSON.parse(localStorage.getItem("likeCounter")) || {};

/* Restore Like Counter */

function restoreLikeCounter(){

    document.querySelectorAll(".card").forEach(card=>{

        const text = card
        .querySelector(".shayariText")
        ?.innerText;

        if(!text) return;

        let counter =
        card.querySelector(".likeCount");

        if(!counter){

            counter=document.createElement("p");

            counter.className="likeCount";

            counter.style.marginTop="10px";
            counter.style.color="gold";
            counter.style.fontWeight="bold";
            counter.style.fontSize="15px";

            card.appendChild(counter);

        }

        counter.innerHTML =
        "❤️ Likes : " + (likeCounter[text] || 0);

    });

}

/* Update Counter */

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("likeBtn"))
        return;

    const card=e.target.closest(".card");

    const text=card
        .querySelector(".shayariText")
        .innerText;

    if(likedShayari.includes(text)){

        likeCounter[text]=(likeCounter[text] || 0)+1;

    }else{

        likeCounter[text]=Math.max(
            0,
            (likeCounter[text] || 1)-1
        );

    }

    localStorage.setItem(
        "likeCounter",
        JSON.stringify(likeCounter)
    );

    restoreLikeCounter();

});

/* Restore on Page Load */

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(restoreLikeCounter,500);

});
/* ==========================================
   FAVOURITE SYSTEM (PERMANENT)
========================================== */

let favoriteShayari =
JSON.parse(localStorage.getItem("favoriteShayari")) || [];

/* Update Favourite Section */

function updateFavoriteSection(){

    const list = document.getElementById("favoriteList");

    if(!list) return;

    if(favoriteShayari.length===0){

        list.innerHTML=
        "<p>अभी कोई Favourite Shayari नहीं है।</p>";

        return;

    }

    list.innerHTML = favoriteShayari.map(text=>`

<div class="card">

<p class="shayariText">
${text.replace(/\n/g,"<br>")}
</p>

</div>

`).join("");

}

/* Restore Favourite Buttons */

function restoreFavouriteButtons(){

    document.querySelectorAll(".card").forEach(card=>{

        const text=card
        .querySelector(".shayariText")
        ?.innerText;

        const btn=card.querySelector(".favBtn");

        if(!text || !btn) return;

        if(favoriteShayari.includes(text)){

            btn.classList.add("active");

            btn.innerHTML="🌟 Saved";

        }

    });

}

/* Favourite Click */

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("favBtn"))
        return;

    const btn=e.target;

    const text=btn.closest(".card")
    .querySelector(".shayariText")
    .innerText;

    if(favoriteShayari.includes(text)){

        favoriteShayari =
        favoriteShayari.filter(item=>item!==text);

        btn.classList.remove("active");

        btn.innerHTML="⭐ Favourite";

        showToast("❌ Favourite Removed");

    }else{

        favoriteShayari.push(text);

        btn.classList.add("active");

        btn.innerHTML="🌟 Saved";

        showToast("⭐ Added To Favourite");

    }

    localStorage.setItem(

        "favoriteShayari",

        JSON.stringify(favoriteShayari)

    );

    updateFavoriteSection();

});

/* Restore */

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(()=>{

        updateFavoriteSection();

        restoreFavouriteButtons();

    },500);

});
/* ==========================================
   COPY & SHARE SYSTEM (PROFESSIONAL)
========================================== */

/* Copy & Share Click */

document.addEventListener("click", async (e) => {

    /* ================= COPY ================= */

    if(e.target.classList.contains("copyBtn")){

        const text = e.target
            .closest(".card")
            .querySelector(".shayariText")
            .innerText;

        try{

            await navigator.clipboard.writeText(text);

            showToast("📋 Shayari Copied Successfully");

        }catch{

            showToast("❌ Copy Failed");

        }

    }

    /* ================= SHARE ================= */

    if(e.target.classList.contains("shareBtn")){

        const text = e.target
            .closest(".card")
            .querySelector(".shayariText")
            .innerText;

        if(navigator.share){

            try{

                await navigator.share({

                    title:"Adarsh Raj Shayar",

                    text:text,

                    url:window.location.href

                });

                showToast("📤 Shayari Shared");

            }catch{

                showToast("❌ Share Cancelled");

            }

        }else{

            try{

                await navigator.clipboard.writeText(text);

                showToast("📋 Share not supported. Shayari Copied.");

            }catch{

                showToast("❌ Share Failed");

            }

        }

    }

});
/* ==========================================
   EMAILJS CONTACT FORM
========================================== */

const contactForm = document.getElementById("contact-form");

function initContactForm(){

    if(typeof emailjs==="undefined") return;

    if(!contactForm) return;

    emailjs.init(EMAILJS_PUBLIC_KEY);

    contactForm.addEventListener("submit",async function(e){

        e.preventDefault();

        const submitBtn =
        contactForm.querySelector("button");

        const oldText = submitBtn.innerHTML;

        submitBtn.disabled = true;

        submitBtn.innerHTML = "⏳ Sending...";

        try{

            await emailjs.sendForm(

                EMAILJS_SERVICE_ID,

                EMAILJS_TEMPLATE_ID,

                contactForm

            );

            showToast("✅ Message Sent Successfully");

            contactForm.reset();

        }catch(error){

            console.error(error);

            showToast("❌ Message Sending Failed");

        }

        submitBtn.disabled = false;

        submitBtn.innerHTML = oldText;

    });

}

/* Start Contact Form */

document.addEventListener("DOMContentLoaded",()=>{

    initContactForm();

   console.log("Loader Code Running");
});
/* ==========================================
   SHAYARI LOADER
========================================== */

function createCard(item){

    return `

<div class="card">

<p class="shayariText">
${item.text.replace(/\n/g,"<br>")}
</p>

<p class="author">
✍️ ${item.author}
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

function loadSection(id,data){

    const container =
    document.getElementById(id);

    if(!container) return;

    container.innerHTML =
    data.map(createCard).join("");

}

/* ==========================================
   LOAD ALL SHAYARI
========================================== */

function loadAllShayari(){

    loadSection("loveContainer",loveShayari);

    loadSection("sadContainer",sadShayari);

    loadSection("attitudeContainer",attitudeShayari);

    loadSection("friendshipContainer",friendshipShayari);

    loadSection("motivationContainer",motivationShayari);

}

/* ==========================================
   RESTORE EVERYTHING
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    loadAllShayari();

    setTimeout(()=>{

        restoreLikes();

        restoreLikeCounter();

        restoreFavouriteButtons();

        updateFavoriteSection();

    },300);

});
/* ==========================================
   FINAL INITIALIZER
   Adarsh Raj Shayar Professional v6.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.clear();

    console.log("%c🌹 Adarsh Raj Shayar 🌹",
        "color:gold;font-size:24px;font-weight:bold;");

    console.log("%cProfessional Version Loaded Successfully",
        "color:lime;font-size:16px;");

    /* Disable Right Click (Optional) */
    document.addEventListener("contextmenu",(e)=>{
        // e.preventDefault();
    });

    /* Disable Drag */
    document.querySelectorAll("img").forEach(img=>{
        img.setAttribute("draggable","false");
    });

    /* Lazy Loading */
    document.querySelectorAll("img").forEach(img=>{
        img.loading="lazy";
    });

    /* Smooth Anchor Scroll */
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

    console.log("✅ Website Ready");

});


/* ==========================================
   MOBILE MENU OVERLAY
========================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");
const overlay = document.getElementById("overlay");

if (menuBtn && nav && overlay) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

    overlay.addEventListener("click", () => {

        nav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");

    });

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

}

/* ==========================================
   ACTIVE MENU
========================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


async function loadVisitorCount() {
    try {
        const response = await fetch("https://api.counterapi.dev/v2/adarsh-rajs-team-4891/first-counter-4891/")
        const data = await response.json();

        const counter = document.getElementById("visitor-count");
        if (counter) {
            counter.textContent = data.value;
        }
    } catch (error) {
        console.error("Visitor Counter Error:", error);
    }
}

loadVisitorCount();

/* ==========================================
   SCROLL PROGRESS
========================================== */

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(scrollTop/scrollHeight)*100;

const bar=document.getElementById("progressBar");

if(bar){

bar.style.width=progress+"%";

}

});

/* ===== LOADER ===== */

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").classList.add("loader-hide");

},800);

});

/* ==========================
ADMIN LOGIN
========================== */

const ADMIN_PASSWORD = "ARS2026";

document.getElementById("loginBtn").addEventListener("click",()=>{

const pass=document.getElementById("adminPassword").value;

if(pass===ADMIN_PASSWORD){

document.getElementById("adminLogin").style.display="none";

document.getElementById("publisherPanel").style.display="block";

alert("✅ Login Successful");

}else{

alert("❌ Wrong Password");

}

});

/* ==========================================
PUBLISH SHAYARI
========================================== */

document.getElementById("publishBtn").addEventListener("click", () => {

const title = document.getElementById("pubTitle").value.trim();

const category = document.getElementById("pubCategory").value;

const text = document.getElementById("pubText").value.trim();

const author = document.getElementById("pubAuthor").value.trim();

const publisher = document.getElementById("pubPublisher").value.trim();

if(title==="" || text===""){

alert("Please fill all required fields.");

return;

}

const shayari = {

title,

category,

text,

author,

publisher,

date:new Date().toLocaleDateString()

};

let all = JSON.parse(localStorage.getItem("customShayari")) || [];

all.unshift(shayari);

localStorage.setItem("customShayari",JSON.stringify(all));

alert("✅ Shayari Published Successfully");

   loadPublishedShayari();
   
document.getElementById("pubTitle").value="";

document.getElementById("pubText").value="";

document.getElementById("pubAuthor").value="";

});

/* ==========================================
LOAD PUBLISHED SHAYARI
========================================== */

function loadPublishedShayari(){

const container=document.getElementById("publishedContainer");

if(!container) return;

container.innerHTML="";

let all=JSON.parse(localStorage.getItem("customShayari")) || [];

all.forEach(item=>{

container.innerHTML += `

<div class="card">

<h3>${item.title}</h3>

<p class="shayariText">

${item.text.replace(/\n/g,"<br>")}

</p>

<p>

✍️ <b>Original Author:</b> ${item.author || "Unknown"}

</p>

<p>

👑 <b>Published By:</b> ${item.publisher}

</p>

<p>

📅 ${item.date}

</p>

</div>

`;

});

}

loadPublishedShayari();

console.log("Script Finished");

/* ==========================================
   END OF SCRIPT
========================================== */

