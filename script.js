/* ==========================================
   Adarsh Raj Shayar
   Script Version 4.0 Professional
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Welcome Popup
    // ==========================

    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (popup && enterBtn) {

        enterBtn.onclick = () => {

            popup.style.display = "none";

        };

    }

    // ==========================
    // Dark Mode
    // ==========================

    const darkBtn = document.getElementById("darkModeBtn");

    if (localStorage.getItem("theme") === "light") {

        document.body.classList.add("light-mode");

    }

    if (darkBtn) {

        darkBtn.innerHTML =
        document.body.classList.contains("light-mode")
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";

        darkBtn.onclick = () => {

            document.body.classList.toggle("light-mode");

          const isLight = document.body.classList.contains("light-mode");

localStorage.setItem(
    "theme",
    isLight ? "light" : "dark"
);

darkBtn.innerHTML = isLight
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
           
        }
       
        };

    }

});
// ==========================
// Live Search
// ==========================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            card.style.display =
                card.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });

}

// ==========================
// Copy & Share
// ==========================

document.addEventListener("click", function (e) {

    // Copy
    if (e.target.classList.contains("copyBtn")) {

        const text = e.target
            .closest(".card")
            .querySelector(".shayariText")
            .innerText;

        navigator.clipboard.writeText(text);

        alert("✅ Shayari Copied");

    }

    // Share
    if (e.target.classList.contains("shareBtn")) {

        const text = e.target
            .closest(".card")
            .querySelector(".shayariText")
            .innerText;

        if (navigator.share) {

            navigator.share({

                title: "Adarsh Raj Shayar",

                text: text

            });

        } else {

            navigator.clipboard.writeText(text);

            alert("📋 Shayari Copy कर दी गई।");

        }

    }

});
// ==========================
// Like & Favourite System
// ==========================

let likedShayari =
JSON.parse(localStorage.getItem("likedShayari")) || [];

let favoriteShayari =
JSON.parse(localStorage.getItem("favoriteShayari")) || [];

function saveData(){

    localStorage.setItem(
        "likedShayari",
        JSON.stringify(likedShayari)
    );

    localStorage.setItem(
        "favoriteShayari",
        JSON.stringify(favoriteShayari)
    );

}

function updateFavoriteSection(){

    const list=document.getElementById("favoriteList");

    if(!list) return;

    if(favoriteShayari.length===0){

        list.innerHTML="<p>⭐ अभी कोई Favourite Shayari नहीं है।</p>";

        return;

    }

    list.innerHTML=favoriteShayari.map(text=>`

<div class="card">
<p>${text.replace(/\n/g,"<br>")}</p>
</div>

`).join("");

}

document.addEventListener("click",function(e){

    // Like
    if(e.target.classList.contains("likeBtn")){

        const btn=e.target;

        const text=btn.closest(".card")
        .querySelector(".shayariText").innerText;

        if(likedShayari.includes(text)){

            likedShayari=
            likedShayari.filter(item=>item!==text);

            btn.innerHTML="❤️ Like";

        }else{

            likedShayari.push(text);

            btn.innerHTML="💖 Liked";

        }

        saveData();

    }

    // Favourite
    if(e.target.classList.contains("favBtn")){

        const btn=e.target;

        const text=btn.closest(".card")
        .querySelector(".shayariText").innerText;

        if(favoriteShayari.includes(text)){

            favoriteShayari=
            favoriteShayari.filter(item=>item!==text);

            btn.innerHTML="⭐ Favorite";

        }else{

            favoriteShayari.push(text);

            btn.innerHTML="🌟 Saved";

        }

        saveData();

        updateFavoriteSection();

    }

});
// ==========================
// EmailJS Contact Form
// ==========================

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            this
        ).then(() => {

            alert("✅ Message Successfully Sent");

            this.reset();

        }).catch((err) => {

            console.error(err);

            alert("❌ Message Sending Failed");

        });

    });

}

// ==========================
// Shayari Loader
// ==========================

function createCard(item){

    return `
    <div class="card">

        <p class="shayariText">
            ${item.text.replace(/\n/g,"<br>")}
        </p>

        <p style="text-align:right;font-weight:bold;color:gold;">
            ✍️ ${item.author}
        </p>

        <div class="actionButtons">

            <button class="copyBtn">📋 Copy</button>

            <button class="shareBtn">📤 Share</button>

            <button class="likeBtn">❤️ Like</button>

            <button class="favBtn">⭐ Favorite</button>

        </div>

    </div>
    `;

}

function loadSection(id,data){

    const box=document.getElementById(id);

    if(!box) return;

    box.innerHTML=data.map(createCard).join("");

}

document.addEventListener("DOMContentLoaded",()=>{

    loadSection("loveContainer",loveShayari);

    loadSection("sadContainer",sadShayari);

    loadSection("attitudeContainer",attitudeShayari);

    loadSection("friendshipContainer",friendshipShayari);

    loadSection("motivationContainer",motivationShayari);

    updateFavoriteSection();

});
