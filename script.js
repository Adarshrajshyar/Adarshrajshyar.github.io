   <script>

// ==========================
// SEARCH
// ==========================

const search = document.getElementById("search");

search.addEventListener("keyup", function(){

let filter = search.value.toLowerCase();

document.querySelectorAll(".card").forEach(function(card){

if(card.innerText.toLowerCase().includes(filter)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});


// ==========================
// TOP BUTTON
// ==========================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",function(){

if(window.scrollY>200){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});


// ==========================
// DARK MODE
// ==========================

const darkModeBtn=document.getElementById("darkModeBtn");

if(localStorage.getItem("darkMode")=="on"){

document.body.classList.add("dark-mode");

darkModeBtn.innerHTML="☀️ Light Mode";

}

darkModeBtn.addEventListener("click",function(){

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){

localStorage.setItem("darkMode","on");

darkModeBtn.innerHTML="☀️ Light Mode";

}else{

localStorage.setItem("darkMode","off");

darkModeBtn.innerHTML="🌙 Dark Mode";

}

});


// ==========================
// COPY
// ==========================

document.querySelectorAll(".copyBtn").forEach(function(btn){

btn.addEventListener("click",function(){

const text=this.parentElement.querySelector("p").innerText;

navigator.clipboard.writeText(text);

this.innerHTML="✅ Copied";

setTimeout(()=>{

this.innerHTML="📋 Copy";

},1500);

});

});


// ==========================
// PART 4 से आगे
// ==========================
        // ==========================
// SHARE
// ==========================

document.querySelectorAll(".shareBtn").forEach(function(btn){

btn.addEventListener("click",async function(){

const text=this.parentElement.querySelector("p").innerText;

if(navigator.share){

await navigator.share({

title:"Adarsh Raj Shayar",

text:text,

url:window.location.href

});

}else{

navigator.clipboard.writeText(text);

alert("Sharing is not supported.\nShayari copied.");

}

});

});


// ==========================
// LIKE
// ==========================

document.querySelectorAll(".likeBtn").forEach(function(btn,index){

const counter=btn.parentElement.querySelector(".likeCount");

let likes=parseInt(localStorage.getItem("likes"+index)||0);

counter.innerHTML="❤️ Likes: "+likes;

if(localStorage.getItem("liked"+index)=="yes"){

btn.innerHTML="❤️ Liked";

}

btn.addEventListener("click",function(){

let count=parseInt(localStorage.getItem("likes"+index)||0);

if(btn.innerHTML=="🤍 Like"){

btn.innerHTML="❤️ Liked";

count++;

localStorage.setItem("liked"+index,"yes");

}else{

btn.innerHTML="🤍 Like";

count=Math.max(0,count-1);

localStorage.setItem("liked"+index,"no");

}

localStorage.setItem("likes"+index,count);

counter.innerHTML="❤️ Likes: "+count;

});

});


// ==========================
// FAVORITE
// ==========================

const favoriteList=document.getElementById("favoriteList");

document.querySelectorAll(".favBtn").forEach(function(btn,index){

const card=btn.closest(".card");

const title=card.querySelector("h2").innerText;

const shayari=card.querySelector("p").innerHTML;

if(localStorage.getItem("fav"+index)=="yes"){

btn.innerHTML="⭐ Favorited";

favoriteList.innerHTML+=`
<div class="card">
<h3>${title}</h3>
<p>${shayari}</p>
</div>
`;

}

btn.addEventListener("click",function(){

if(localStorage.getItem("fav"+index)=="yes"){

localStorage.removeItem("fav"+index);

btn.innerHTML="⭐ Favorite";

location.reload();

}else{

localStorage.setItem("fav"+index,"yes");

btn.innerHTML="⭐ Favorited";

favoriteList.innerHTML+=`
<div class="card">
<h3>${title}</h3>
<p>${shayari}</p>
</div>
`;

}

});

});

        // ==========================
// WELCOME POPUP
// ==========================

const welcomePopup = document.getElementById("welcomePopup");

// अगर पहले वेबसाइट खुल चुकी है, तो Popup मत दिखाओ
//if(localStorage.getItem("welcomeShown") === "yes"){
  //  welcomePopup.style.display = "none";
//}

function closePopup(){

    welcomePopup.style.display = "none";

  //  localStorage.setItem("welcomeShown","yes");

}

        // ==========================
// EMAILJS CONTACT FORM
// ==========================

document.getElementById("contact-form").addEventListener("submit", function(event){

event.preventDefault();

emailjs.sendForm(
"service_x6aju4h",
"template_r93yuzg",
this
).then(function(){

alert("✅ Message Sent Successfully!");

document.getElementById("contact-form").reset();

}, function(error){

alert("❌ Failed to Send Message");

console.log(error);

});

});
        
</script>
