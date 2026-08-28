/* =========================================================
   ARS SHAYARI DATABASE
   ========================================================= */

"use strict";

window.ARS_SHAYARI = [

    {
        id: "love-01",
        category: "love",
        title: "मोहब्बत",
        text: "मोहब्बत शब्दों की मोहताज नहीं होती, दिल से निकले तो हर बात खास होती।"
    },

    {
        id: "love-02",
        category: "love",
        title: "याद",
        text: "तेरी यादों का भी अपना अंदाज़ है, दूर होकर भी तू मेरे पास है।"
    },

    {
        id: "love-03",
        category: "love",
        title: "दिल",
        text: "दिल ने जिसे अपना माना, उसके बिना हर पल अधूरा जाना।"
    },

    {
        id: "love-04",
        category: "love",
        title: "ख्वाब",
        text: "ख्वाबों में भी वही चेहरा नजर आता है, दिल उसे ही अपना कह जाता है।"
    },

    {
        id: "love-05",
        category: "love",
        title: "इश्क",
        text: "इश्क अगर सच्चा हो तो दूरी भी हार जाती है, याद किसी की हो तो रात भी गुजर जाती है।"
    },


    {
        id: "sad-01",
        category: "sad",
        title: "खामोशी",
        text: "कुछ दर्द ऐसे होते हैं जिन्हें शब्द नहीं, सिर्फ खामोशी समझती है।"
    },

    {
        id: "sad-02",
        category: "sad",
        title: "यादें",
        text: "यादें कभी खत्म नहीं होतीं, बस इंसान उन्हें छुपाना सीख जाता है।"
    },

    {
        id: "sad-03",
        category: "sad",
        title: "अकेलापन",
        text: "भीड़ में भी अकेला हूँ, क्योंकि जिसे ढूंढता हूँ वो साथ नहीं।"
    },

    {
        id: "sad-04",
        category: "sad",
        title: "दर्द",
        text: "दर्द अपना हो तो सहना आसान लगता है, किसी अपने का हो तो दिल रोता है।"
    },

    {
        id: "sad-05",
        category: "sad",
        title: "वक्त",
        text: "वक्त बदलता है, लोग बदलते हैं, मगर कुछ यादें हमेशा साथ रहती हैं।"
    },


    {
        id: "attitude-01",
        category: "attitude",
        title: "पहचान",
        text: "नाम छोटा हो सकता है, पहचान नहीं।"
    },

    {
        id: "attitude-02",
        category: "attitude",
        title: "हौसला",
        text: "रास्ते मुश्किल हों तो क्या, हौसला मजबूत होना चाहिए।"
    },

    {
        id: "attitude-03",
        category: "attitude",
        title: "अंदाज़",
        text: "हमारा अंदाज़ ही हमारी पहचान है।"
    },

    {
        id: "attitude-04",
        category: "attitude",
        title: "जवाब",
        text: "हर बात का जवाब शब्दों से नहीं, काम से दिया जाता है।"
    },

    {
        id: "attitude-05",
        category: "attitude",
        title: "खुद पर भरोसा",
        text: "दुनिया क्या कहती है छोड़ो, खुद पर भरोसा रखो।"
    },


    {
        id: "friendship-01",
        category: "friendship",
        title: "दोस्ती",
        text: "सच्ची दोस्ती वक्त नहीं देखती, बस साथ निभाना जानती है।"
    },

    {
        id: "friendship-02",
        category: "friendship",
        title: "यार",
        text: "यार वही जो मुश्किल वक्त में साथ खड़ा रहे।"
    },

    {
        id: "friendship-03",
        category: "friendship",
        title: "साथ",
        text: "अच्छे दोस्तों का साथ जिंदगी की खूबसूरत सौगात है।"
    },

    {
        id: "friendship-04",
        category: "friendship",
        title: "यादें",
        text: "दोस्तों के साथ बिताया वक्त हमेशा यादगार रहता है।"
    },

    {
        id: "friendship-05",
        category: "friendship",
        title: "भरोसा",
        text: "दोस्ती की सबसे बड़ी ताकत भरोसा है।"
    },


    {
        id: "motivation-01",
        category: "motivation",
        title: "सपना",
        text: "सपना वही जो आपको हर सुबह मेहनत करने के लिए प्रेरित करे।"
    },

    {
        id: "motivation-02",
        category: "motivation",
        title: "मेहनत",
        text: "मेहनत कभी बेकार नहीं जाती, वक्त जरूर लगता है।"
    },

    {
        id: "motivation-03",
        category: "motivation",
        title: "जीत",
        text: "हार से मत डरिए, हार के बाद ही जीत की असली कीमत समझ आती है।"
    },

    {
        id: "motivation-04",
        category: "motivation",
        title: "लक्ष्य",
        text: "लक्ष्य बड़ा हो तो कदम भी मजबूत होने चाहिए।"
    },

    {
        id: "motivation-05",
        category: "motivation",
        title: "सफलता",
        text: "सफलता इंतजार करने से नहीं, लगातार प्रयास करने से मिलती है।"
    }

];


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const container =
            document.getElementById(
                "shayariContainer"
            );

        if (!container) return;

        renderShayari("all");

        document.querySelectorAll(
            "[data-category]"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document.querySelectorAll(
                        "[data-category]"
                    ).forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );

                    button.classList.add(
                        "active"
                    );

                    renderShayari(
                        button.dataset.category
                    );

                }
            );

        });

        console.log(
            "🌹 ARS Shayari Database Loaded"
        );

        console.log(
            "📖 Total Shayari:",
            ARS_SHAYARI.length
        );

    }
);


function renderShayari(category) {

    const container =
        document.getElementById(
            "shayariContainer"
        );

    if (!container) return;

    const data =
        category === "all"
            ? ARS_SHAYARI
            : ARS_SHAYARI.filter(
                item =>
                    item.category === category
            );


    container.innerHTML =
        data.map(item => `

            <article
                class="content-card shayari-card"
                data-category="${item.category}"
                data-searchable="${item.title} ${item.text}">

                <span class="card-category">
                    ${item.category}
                </span>

                <h3>${item.title}</h3>

                <p>${item.text}</p>

                <div class="card-actions">

                    <button
                        type="button"
                        class="like-btn"
                        data-like-id="${item.id}">
                        🤍 Like
                    </button>

                    <button
                        type="button"
                        class="favorite-btn"
                        data-favorite-id="${item.id}">
                        ☆ Favorite
                    </button>

                </div>

            </article>

        `).join("");

}
