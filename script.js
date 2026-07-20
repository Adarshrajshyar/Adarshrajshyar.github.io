/* ==========================================
   Adarsh Raj Shayar
   Main JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       Welcome Popup
    -------------------------------- */

    const popup = document.getElementById("welcomePopup");
    const enterBtn = document.getElementById("enterBtn");

    if (popup && enterBtn) {
        enterBtn.onclick = () => {
            popup.style.display = "none";
        };
    }

    /* -------------------------------
       Dark Mode
    -------------------------------- */

    const darkBtn = document.getElementById("darkModeBtn");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    if (darkBtn) {
        darkBtn.onclick = () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }

        };
    }

    /* -------------------------------
       Back To Top
    -------------------------------- */

    const topBtn = document.getElementById("topBtn");

    window.onscroll = () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    };

    topBtn.onclick = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

});
/* ==========================================
   Shayari Data
========================================== */

const loveShayari = [

{
author:"Adarsh Raj",
text:`तेरी मुस्कान मेरी पहचान है,
तू ही मेरी सबसे बड़ी जान है।`
},

{
author:"Adarsh Raj",
text:`तेरे बिना हर खुशी अधूरी लगती है,
तेरी याद हर पल ज़रूरी लगती है।`
},

{
author:"Adarsh Raj",
text:`दिल ने सिर्फ तुझे चुना है,
ये फैसला हमेशा के लिए सुना है।`
},

{
author:"Adarsh Raj",
text:`मोहब्बत की हर राह तुझ तक जाती है,
मेरी हर दुआ तेरा नाम गाती है।`
},

{
author:"Adarsh Raj",
text:`तू साथ रहे तो हर दिन त्योहार है,
तेरे बिना सब कुछ बेकार है।`
}

];

const sadShayari = [

{
author:"Adarsh Raj",
text:`जो अपने थे वही बदल गए,
हम देखते रहे और लोग निकल गए।`
},

{
author:"Adarsh Raj",
text:`आँसू छुपाकर मुस्कुराना सीख लिया,
दर्द को दिल में बसाना सीख लिया।`
},

{
author:"Adarsh Raj",
text:`कुछ रिश्ते अधूरे ही अच्छे लगते हैं,
पूरे होकर अक्सर बदल जाते हैं।`
},

{
author:"Adarsh Raj",
text:`दिल टूटने की आवाज़ नहीं होती,
लेकिन दर्द उम्र भर साथ रहता है।`
},

{
author:"Adarsh Raj",
text:`वक्त ने सब कुछ सिखा दिया,
अपनों ने अकेला रहना सिखा दिया।`
}

];

const attitudeShayari = [

{
author:"Adarsh Raj",
text:`हमारी पहचान हमारे काम से होती है।`
},

{
author:"Adarsh Raj",
text:`जो हमें समझ नहीं पाए,
उन्हें समझाना छोड़ दिया।`
},

{
author:"Adarsh Raj",
text:`हम अपनी दुनिया के बादशाह हैं।`
},

{
author:"Adarsh Raj",
text:`सिर्फ नाम ही काफी है,
बाकी पहचान वक्त बताएगा।`
},

{
author:"Adarsh Raj",
text:`हम वहाँ खड़े होते हैं,
जहाँ Matter बड़े होते हैं।`
}

];

const friendshipShayari = [

{
author:"Adarsh Raj",
text:`दोस्ती हर रिश्ते से खूबसूरत होती है।`
},

{
author:"Adarsh Raj",
text:`सच्चा दोस्त मुश्किल समय में साथ रहता है।`
},

{
author:"Adarsh Raj",
text:`दोस्ती दिल से होती है,
किस्मत से नहीं।`
},

{
author:"Adarsh Raj",
text:`दोस्त वही जो हर खुशी में साथ हो।`
},

{
author:"Adarsh Raj",
text:`हज़ार रिश्तों से बढ़कर दोस्ती होती है।`
}

];

const motivationShayari = [

{
author:"Adarsh Raj",
text:`मेहनत इतनी करो कि किस्मत भी झुक जाए।`
},

{
author:"Adarsh Raj",
text:`हार मानना कभी विकल्प नहीं होता।`
},

{
author:"Adarsh Raj",
text:`सपने वही पूरे होते हैं,
जो नींद उड़ाकर देखे जाते हैं।`
},

{
author:"Adarsh Raj",
text:`जो संघर्ष करता है,
वही इतिहास लिखता है।`
},

{
  /* ==========================================
   Render Shayari Cards
========================================== */

function createCard(item) {

return `

<div class="card">

<p class="shayariText">

${item.text.replace(/\n/g,"<br>")}

</p>

<p style="text-align:right;font-weight:bold;color:#ff9800;">

✍️ ${item.author}

</p>

<div style="text-align:center;">

<button class="copyBtn">📋 Copy</button>

<button class="shareBtn">📤 Share</button>

<button class="likeBtn">🤍 Like</button>

<button class="favBtn">⭐ Favorite</button>

</div>

<p class="likeCount">❤️ Likes: 0</p>

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
author:"Adarsh Raj",
text:`आज की मेहनत,
कल की सफलता है।`
}

];
