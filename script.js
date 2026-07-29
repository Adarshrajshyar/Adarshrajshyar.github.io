/* ==========================================
   Adarsh Raj Shayar
   Script Version 4.0
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // Welcome Popup
    // ==========================

    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (popup && enterBtn) {

        enterBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });

    }

    // ==========================
    // Current Year
    // ==========================

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ==========================
    // Dark / Light Mode
    // ==========================

    const darkBtn = document.getElementById("darkModeBtn");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }

    if (darkBtn) {

        updateThemeButton();

        darkBtn.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

            updateThemeButton();

        });

    }

    function updateThemeButton() {

        if (!darkBtn) return;

        darkBtn.innerHTML =
            document.body.classList.contains("light-mode")
                ? "🌙 Dark Mode"
                : "☀️ Light Mode";

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

            if (card.innerText.toLowerCase().includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}
// ==========================
// Copy & Share
// ==========================

document.addEventListener("click", function (e) {

    // Copy Button
    if (e.target.classList.contains("copyBtn")) {

        const text = e.target
            .closest(".card")
            .querySelector(".shayariText")
            .innerText;

        navigator.clipboard.writeText(text)
            .then(() => {
                showToast("✅ Shayari Copied");
            });

    }

    // Share Button
    if (e.target.classList.contains("shareBtn")) {

        const text = e.target
            .closest(".card")
            .querySelector(".shayariText")
            .innerText;

        if (navigator.share) {

            navigator.share({
                title: "Adarsh Raj Shayar",
                text: text,
                url: window.location.href
            });

        } else {

            navigator.clipboard.writeText(text);

            alert("Share Supported नहीं है, Shayari Copy कर दी गई।");

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

function updateFavoriteSection() {

    const list = document.getElementById("favoriteList");

    if (!list) return;

    if (favoriteShayari.length === 0) {

        list.innerHTML =
        "<p>अभी कोई Favourite Shayari नहीं है।</p>";

        return;

    }

    list.innerHTML = favoriteShayari.map(text => `

<div class="card">
<p class="shayariText">${text.replace(/\n/g,"<br>")}</p>
</div>

`).join("");

}

document.addEventListener("click", function (e) {

    // LIKE
    if (e.target.classList.contains("likeBtn")) {

        const btn = e.target;
       
const likeCount =
btn.closest(".card").querySelector(".likeCount");
       
        const text = btn.closest(".card")
            .querySelector(".shayariText")
            .innerText;

        if (likedShayari.includes(text)) {

            likedShayari =
            likedShayari.filter(item => item !== text);

            btn.innerHTML = "❤️ Like";

        } else {

            likedShayari.push(text);

            btn.innerHTML = "💖 Liked";
           
let count =
parseInt(likeCount.innerText.replace(/\D/g,"")) || 0;

count++;

likeCount.innerHTML =
"❤️ Likes: " + count;
           
        }

        localStorage.setItem(
            "likedShayari",
            JSON.stringify(likedShayari)
        );

    }

    // FAVOURITE
    if (e.target.classList.contains("favBtn")) {

        const btn = e.target;

        const text = btn.closest(".card")
            .querySelector(".shayariText")
            .innerText;

        if (favoriteShayari.includes(text)) {

            favoriteShayari =
            favoriteShayari.filter(item => item !== text);

            btn.innerHTML = "⭐ Favorite";

        } else {

            favoriteShayari.push(text);

            btn.innerHTML = "🌟 Saved";

        }

        localStorage.setItem(
            "favoriteShayari",
            JSON.stringify(favoriteShayari)
        );

        updateFavoriteSection();

    }

});
// ==========================
// Shayari Loader
// ==========================

function <button class="favBtn ${isFavourite(id) ? 'active' : ''}" data-id="${id}"> ${isFavourite(id) ? "🌟 Favourite" : "⭐ Favourite"} </button>{

const id = btoa(item.text);

return `
<div class="card">

    <p class="shayariText">
        ${item.text.replace(/\n/g, "<br>")}
    </p>

    <p style="text-align:right;color:gold;font-weight:bold;">
        ✍️ ${item.author}
    </p>

    <div class="actionButtons">

        <button class="copyBtn">📋 Copy</button>

        <button class="shareBtn">📤 Share</button>

        <button class="likeBtn">❤️ Like</button>
  <button
class="favBtn ${isFavourite(id) ? 'active' : ''}"
data-id="${id}">
${isFavourite(id) ? "🌟 Favourite" : "⭐ Favourite"}
</button>
        
         <p class="likeCount">❤️ Likes: 0</p>

    </div>

</div>

`;

}

function loadSection(id, data) {

    const box = document.getElementById(id);

    if (!box) return;

    box.innerHTML = data.map(createCard).join("");

}

document.addEventListener("DOMContentLoaded", function () {

    if (typeof loveShayari !== "undefined") {

        loadSection("loveContainer", loveShayari);

    }

    if (typeof sadShayari !== "undefined") {

        loadSection("sadContainer", sadShayari);

    }

    if (typeof attitudeShayari !== "undefined") {

        loadSection("attitudeContainer", attitudeShayari);

    }

    if (typeof friendshipShayari !== "undefined") {

        loadSection("friendshipContainer", friendshipShayari);

    }

    if (typeof motivationShayari !== "undefined") {

        loadSection("motivationContainer", motivationShayari);

    }

    updateFavoriteSection();

});
// ==========================
// Back To Top
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (!topBtn) return;

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", function () {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ==========================
// Current Year
// ==========================

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}
// ==========================
// EmailJS Contact Form
// ==========================

if (typeof emailjs !== "undefined") {

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                this
            )

            .then(function () {

                showToast("✅ Message Successfully Sent");

                contactForm.reset();

            })

            .catch(function (error) {

                console.error(error);

                showToast("❌ Message Sending Failed");

            });

        });

    }

}

// ==========================
// Toast Message
// ==========================

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}

/* ===========================
   PERMANENT FAVOURITE SYSTEM
=========================== */

let favourites = JSON.parse(localStorage.getItem("ars_favourites")) || [];

// Check Favourite
function isFavourite(id){
    return favourites.includes(id);
}

// Toggle Favourite
function toggleFavourite(id, btn){

    if(isFavourite(id)){
        favourites = favourites.filter(x => x !== id);

        btn.innerHTML = "⭐ Favourite";
        btn.classList.remove("active");

    }else{

        favourites.push(id);

        btn.innerHTML = "🌟 Favourite";
        btn.classList.add("active");
    }

    localStorage.setItem(
        "ars_favourites",
        JSON.stringify(favourites)
    );

}
