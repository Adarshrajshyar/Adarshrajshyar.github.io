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
   MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

if(menuBtn && nav){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

    document.addEventListener("click",(e)=>{

        if(
            !nav.contains(e.target) &&
            !menuBtn.contains(e.target)
        ){

            nav.classList.remove("active");

        }

    });

}

/* ==========================================
   END OF SCRIPT
========================================== */

