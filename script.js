// ==========================================
// Adarsh Raj Shayar
// script.js Part 1
// ==========================================

"use strict";

// ==========================
// SEARCH
// ==========================

const search = document.getElementById("search");

if (search) {
  search.addEventListener("keyup", function () {

    const filter = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(function (card) {

      if (card.innerText.toLowerCase().includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });
}

// ==========================
// DARK MODE
// ==========================

const darkBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("darkMode") === "on") {

  document.body.classList.add("dark-mode");

  if (darkBtn) {
    darkBtn.innerHTML = "☀️ Light Mode";
  }

}

if (darkBtn) {

  darkBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

      localStorage.setItem("darkMode", "on");
      darkBtn.innerHTML = "☀️ Light Mode";

    } else {

      localStorage.setItem("darkMode", "off");
      darkBtn.innerHTML = "🌙 Dark Mode";

    }

  });

}

// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

  if (!topBtn) return;

  if (window.scrollY > 250) {

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
// COPY BUTTON
// ==========================

document.querySelectorAll(".copyBtn").forEach(function (btn) {

  btn.addEventListener("click", function () {

    const card = this.closest(".card");

    if (!card) return;

    const text = card.querySelector("p").innerText;

    navigator.clipboard.writeText(text);

    const oldText = this.innerHTML;

    this.innerHTML = "✅ Copied";

    setTimeout(() => {

      this.innerHTML = oldText;

    }, 1500);

  });

});

// ==========================
// SHARE BUTTON
// ==========================

document.querySelectorAll(".shareBtn").forEach(function (btn) {

  btn.addEventListener("click", async function () {

    const card = this.closest(".card");

    if (!card) return;

    const text = card.querySelector("p").innerText;

    if (navigator.share) {

      await navigator.share({

        title: "Adarsh Raj Shayar",

        text: text,

        url: location.href

      });

    } else {

      navigator.clipboard.writeText(text);

      alert("Sharing supported नहीं है। Shayari Copy हो गई है।");

    }

  });

});

// ==========================================
// End of Part 1
// ==========================================
// ==========================================
// Part 2
// Like + Favorite System
// ==========================================

// ==========================
// LIKE SYSTEM
// ==========================

document.querySelectorAll(".likeBtn").forEach(function(btn,index){

const counter=btn.parentElement.querySelector(".likeCount");

let likes=Number(localStorage.getItem("likes_"+index)||0);

counter.innerHTML="❤️ Likes: "+likes;

if(localStorage.getItem("liked_"+index)=="yes"){

btn.innerHTML="❤️ Liked";

}

btn.addEventListener("click",function(){

let liked=localStorage.getItem("liked_"+index);

let count=Number(localStorage.getItem("likes_"+index)||0);

if(liked=="yes"){

count--;

if(count<0) count=0;

localStorage.setItem("liked_"+index,"no");

btn.innerHTML="🤍 Like";

}else{

count++;

localStorage.setItem("liked_"+index,"yes");

btn.innerHTML="❤️ Liked";

}

localStorage.setItem("likes_"+index,count);

counter.innerHTML="❤️ Likes: "+count;

});

});

// ==========================
// FAVORITE SYSTEM
// ==========================

const favoriteList=document.getElementById("favoriteList");

function loadFavorites(){

if(!favoriteList) return;

favoriteList.innerHTML="";

document.querySelectorAll(".favBtn").forEach(function(btn,index){

const card=btn.closest(".card");

const title=card.querySelector("h2").innerHTML;

const text=card.querySelector("p").innerHTML;

if(localStorage.getItem("fav_"+index)=="yes"){

btn.innerHTML="⭐ Saved";

favoriteList.innerHTML+=`

<div class="card">

<h3>${title}</h3>

<p>${text}</p>

</div>

`;

}else{

btn.innerHTML="⭐ Favorite";

}

});

}

loadFavorites();

// ==========================
// FAVORITE BUTTON
// ==========================

document.querySelectorAll(".favBtn").forEach(function(btn,index){

btn.addEventListener("click",function(){

if(localStorage.getItem("fav_"+index)=="yes"){

localStorage.removeItem("fav_"+index);

}else{

localStorage.setItem("fav_"+index,"yes");

}

loadFavorites();

});

});

// ==========================================
// END PART 2
// ==========================================
// ==========================================
// Part 3
// Welcome Popup + EmailJS
// ==========================================

// ==========================
// WELCOME POPUP
// ==========================

const welcomePopup = document.getElementById("welcomePopup");

function closePopup() {

    if (welcomePopup) {
        welcomePopup.style.display = "none";
    }

}

// ==========================
// EMAILJS CONTACT FORM
// ==========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = this.querySelector("button");

        submitBtn.disabled = true;
        submitBtn.innerHTML = "⏳ Sending...";

        emailjs.sendForm(

            SERVICE_ID,
            TEMPLATE_ID,
            this

        ).then(function () {

            alert("✅ Message Sent Successfully!");

            contactForm.reset();

            submitBtn.disabled = false;
            submitBtn.innerHTML = "📩 Send Message";

        }).catch(function (error) {

            console.log(error);

            alert("❌ Message Send Failed!");

            submitBtn.disabled = false;
            submitBtn.innerHTML = "📩 Send Message";

        });

    });

}

// ==========================================
// IMAGE AUTO FALLBACK
// ==========================================

document.querySelectorAll("img").forEach(function(img){

    img.onerror = function(){

        this.src = "https://placehold.co/400x300?text=Image";

    };

});

// ==========================================
// END PART 3
// ==========================================
// ==========================================
// Part 4
// Extra Features
// ==========================================

// ==========================
// LOADING ANIMATION
// ==========================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// ==========================
// ONLINE / OFFLINE STATUS
// ==========================

function updateNetworkStatus() {

    if (navigator.onLine) {
        console.log("✅ Online");
    } else {
        alert("📡 इंटरनेट कनेक्शन उपलब्ध नहीं है।");
    }

}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

// ==========================
// CURRENT YEAR
// ==========================

const footer = document.querySelector("footer");

if (footer) {
    footer.innerHTML =
        "© " + new Date().getFullYear() + " Adarsh Raj Shayar";
}

// ==========================
// SMOOTH ANIMATION
// ==========================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s";

    observer.observe(card);

});

// ==========================================
// END PART 4
// ==========================================
// ==========================================
// Part 5 (FINAL)
// Performance + Future Ready
// ==========================================

// ==========================
// VISITOR COUNTER (LOCAL)
// ==========================

let visitors = Number(localStorage.getItem("ars_visitors") || 0);

if (!sessionStorage.getItem("visited")) {
    visitors++;
    localStorage.setItem("ars_visitors", visitors);
    sessionStorage.setItem("visited", "yes");
}

const visitorBox = document.getElementById("visitorCount");

if (visitorBox) {
    visitorBox.innerHTML = "👥 Visitors : " + visitors;
}

// ==========================
// RANDOM SHAYARI BUTTON
// ==========================

const randomBtn = document.getElementById("randomShayari");

if (randomBtn) {

    randomBtn.addEventListener("click", function () {

        const cards = document.querySelectorAll(".card");

        const onlyShayari = Array.from(cards).filter(card =>
            card.querySelector(".copyBtn")
        );

        if (onlyShayari.length === 0) return;

        const random =
            onlyShayari[Math.floor(Math.random() * onlyShayari.length)];

        random.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        random.style.boxShadow = "0 0 25px gold";

        setTimeout(() => {
            random.style.boxShadow = "";
        }, 2000);

    });

}

// ==========================
// LAZY IMAGE LOADING
// ==========================

document.querySelectorAll("img").forEach(img => {
    img.loading = "lazy";
});

// ==========================
// KEYBOARD SHORTCUT
// Ctrl + K = Search
// ==========================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "k") {

        e.preventDefault();

        const search = document.getElementById("search");

        if (search) {
            search.focus();
        }

    }

});

// ==========================
// CONSOLE MESSAGE
// ==========================

console.log(
"%c🌹 Adarsh Raj Shayar",
"color:gold;font-size:20px;font-weight:bold;"
);

console.log("Website Loaded Successfully.");

// ==========================================
// END OF SCRIPT.JS
// ==========================================
