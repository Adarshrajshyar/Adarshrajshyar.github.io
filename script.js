/* ==========================================
   Adarsh Raj Shayar
   Script Version 2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Welcome Popup
    ========================== */

    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (popup && enterBtn) {
        enterBtn.addEventListener("click", () => {
            popup.style.opacity = "0";

            setTimeout(() => {
                popup.style.display = "none";
            }, 400);
        });
    }

    /* ==========================
       Dark Mode
    ========================== */

    const darkBtn = document.getElementById("darkModeBtn");

    if (darkBtn) {

        darkBtn.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("light-mode")
                    ? "light"
                    : "dark"
            );

        });

    }

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }

});
/* ==========================
   Live Search
========================== */

const searchBox = document.getElementById("search");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value) ? "" : "none";

        });

    });

}

/* ==========================
   Back To Top
========================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/* ==========================
   Copy • Share • Like • Favorite
========================== */

let favoriteShayari = JSON.parse(localStorage.getItem("favoriteShayari")) || [];

function updateFavoriteSection() {

    const list = document.getElementById("favoriteList");
    if (!list) return;

    if (favoriteShayari.length === 0) {
        list.innerHTML = "<p>अभी तक कोई Favorite Shayari नहीं है।</p>";
        return;
    }

    list.innerHTML = favoriteShayari.map(item => `
        <div class="card">
            <p>${item.replace(/\n/g,"<br>")}</p>
        </div>
    `).join("");

    localStorage.setItem("favoriteShayari", JSON.stringify(favoriteShayari));
}

document.addEventListener("click", function(e){

    /* Copy */

    if(e.target.classList.contains("copyBtn")){

        const text = e.target.closest(".card").querySelector(".shayariText").innerText;

        navigator.clipboard.writeText(text);

        alert("✅ Shayari Copied");

    }

    /* Share */

    if(e.target.classList.contains("shareBtn")){

        const text = e.target.closest(".card").querySelector(".shayariText").innerText;

        if(navigator.share){

            navigator.share({
                title:"Adarsh Raj Shayar",
                text:text
            });

        }else{

            navigator.clipboard.writeText(text);

            alert("Share supported नहीं है। Shayari Copy कर दी गई है।");

        }

    }

    /* Like */

    if(e.target.classList.contains("likeBtn")){

       const btn = e.target;

if(btn.classList.contains("liked")){

    btn.classList.remove("liked");
    btn.innerHTML = "❤️ Like";

}else{

    btn.classList.add("liked");
    btn.innerHTML = "💖 Liked";

    }

    /* Favorite */

    if(e.target.classList.contains("favBtn")){

        const text = e.target.closest(".card").querySelector(".shayariText").innerText;

      if(favoriteShayari.includes(text)){

    favoriteShayari = favoriteShayari.filter(item => item !== text);

    e.target.innerHTML = "⭐ Favorite";

    alert("❌ Favorite से हटा दिया गया।");

}else{

    favoriteShayari.push(text);

    e.target.innerHTML = "🌟 Saved";

    alert("✅ Favorite में जोड़ दिया गया।");

}

updateFavoriteSection();


});

document.addEventListener("DOMContentLoaded", updateFavoriteSection);
/* ==========================================
   EmailJS Initialize
========================================== */

emailjs.init(EMAILJS_PUBLIC_KEY);

/* ==========================================
   Contact Form
========================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            this
        )

        .then(() => {

            alert("✅ आपका संदेश सफलतापूर्वक भेज दिया गया।");

            contactForm.reset();

        })

        .catch((error) => {

            console.error(error);

            alert("❌ Message भेजने में समस्या हुई।");

        });

    });

}

/* ==========================================
   Shayari Loader
========================================== */

function createCard(item){

return `

<div class="card">

<p class="shayariText">
${item.text.replace(/\n/g,"<br>")}
</p>

<p style="text-align:right;font-weight:bold;color:gold;">
✍️ ${item.author}
</p>

<div style="text-align:center;margin-top:15px;">

<button class="copyBtn">📋 Copy</button>

<button class="shareBtn">📤 Share</button>

<button class="likeBtn">❤️ Like</button>

<button class="favBtn">⭐ Favorite</button>

</div>

<p class="likeCount" data-count="0">
❤️ Likes: 0
</p>

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

});                          
