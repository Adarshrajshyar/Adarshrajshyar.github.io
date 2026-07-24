/* ==========================================
   Adarsh Raj Shayar
   Script Version 3.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Welcome Popup
    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (popup && enterBtn) {
        enterBtn.onclick = () => {
            popup.style.display = "none";
        };
    }

});
// ==========================
// Dark Mode
// ==========================

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    darkBtn.onclick = () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    };

}
// ==========================
// Live Search
// ==========================

const search = document.getElementById("search");

if (search) {

    search.onkeyup = function () {

        let value = this.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            if (card.innerText.toLowerCase().includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    };

}
// ==========================
// Copy & Share
// ==========================

document.addEventListener("click", function(e){

    // Copy
    if(e.target.classList.contains("copyBtn")){

        const text = e.target.closest(".card")
            .querySelector(".shayariText").innerText;

        navigator.clipboard.writeText(text);

        alert("✅ Shayari Copied");

    }

    // Share
    if(e.target.classList.contains("shareBtn")){

        const text = e.target.closest(".card")
            .querySelector(".shayariText").innerText;

        if(navigator.share){

            navigator.share({
                title:"Adarsh Raj Shayar",
                text:text
            });

        }else{

            navigator.clipboard.writeText(text);

            alert("Share Supported नहीं है। Shayari Copy कर दी गई।");

        }

    }

});
// ==========================
// Like System
// ==========================

let likedShayari =
JSON.parse(localStorage.getItem("likedShayari")) || [];

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("likeBtn")) return;

    const btn = e.target;

    const text = btn.closest(".card")
        .querySelector(".shayariText").innerText;

    if(likedShayari.includes(text)){

        likedShayari =
        likedShayari.filter(item => item !== text);

        btn.innerHTML = "❤️ Like";

    }else{

        likedShayari.push(text);

        btn.innerHTML = "💖 Liked";

    }

    localStorage.setItem(
        "likedShayari",
        JSON.stringify(likedShayari)
    );

});
// ==========================
// Favourite System
// ==========================

let favoriteShayari =
JSON.parse(localStorage.getItem("favoriteShayari")) || [];

function updateFavoriteSection(){

    const list = document.getElementById("favoriteList");

    if(!list) return;

    if(favoriteShayari.length===0){

        list.innerHTML="<p>अभी कोई Favorite Shayari नहीं है।</p>";

        return;

    }

    list.innerHTML=favoriteShayari.map(text=>`

<div class="card">
<p>${text.replace(/\n/g,"<br>")}</p>
</div>

`).join("");

}

document.addEventListener("click",function(e){

    if(!e.target.classList.contains("favBtn")) return;

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

    localStorage.setItem(
        "favoriteShayari",
        JSON.stringify(favoriteShayari)
    );

    updateFavoriteSection();

});
// ==========================
// EmailJS Contact Form
// ==========================

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit",function(e){

        e.preventDefault();

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            this
        ).then(()=>{

            alert("✅ Message Successfully Sent");

            contactForm.reset();

        }).catch((err)=>{

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
