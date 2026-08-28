/* =========================================================
   ARS STORIES & POETRY
   ========================================================= */

"use strict";

window.ARS_STORIES = [

    {
        id: "story-01",
        type: "story",
        title: "नई शुरुआत",
        text: "हर नई सुबह अपने साथ एक नई शुरुआत लेकर आती है।"
    },

    {
        id: "story-02",
        type: "story",
        title: "सपनों का सफर",
        text: "सपनों को पूरा करने के लिए पहला कदम हमेशा खुद पर विश्वास करना होता है।"
    },

    {
        id: "story-03",
        type: "story",
        title: "दोस्ती",
        text: "एक सच्चा दोस्त मुश्किल रास्तों को भी आसान बना देता है।"
    },

    {
        id: "story-04",
        type: "story",
        title: "उम्मीद",
        text: "जब रास्ते बंद लगें, तब उम्मीद नया रास्ता दिखाती है।"
    },

    {
        id: "story-05",
        type: "story",
        title: "मेहनत",
        text: "छोटे-छोटे प्रयास एक दिन बड़ी सफलता की कहानी लिखते हैं।"
    },

    {
        id: "story-06",
        type: "story",
        title: "समय",
        text: "समय की कीमत समझने वाला व्यक्ति अपने लक्ष्य के करीब जरूर पहुंचता है।"
    },

    {
        id: "story-07",
        type: "story",
        title: "विश्वास",
        text: "खुद पर विश्वास हो तो कठिन रास्ते भी आसान लगने लगते हैं।"
    },

    {
        id: "story-08",
        type: "story",
        title: "सफलता",
        text: "सफलता एक दिन में नहीं मिलती, लेकिन हर दिन की मेहनत उसे करीब लाती है।"
    },

    {
        id: "poetry-01",
        type: "poetry",
        title: "कुछ शब्द",
        text: "कुछ शब्द दिल में रह जाते हैं, कुछ यादें उम्र भर साथ चलती हैं।"
    }

];


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const container =
            document.getElementById(
                "storyContainer"
            );

        if (!container) return;

        renderStories("all");

        document.querySelectorAll(
            "[data-story-category]"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document.querySelectorAll(
                        "[data-story-category]"
                    ).forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );

                    button.classList.add(
                        "active"
                    );

                    renderStories(
                        button.dataset.storyCategory
                    );

                }
            );

        });

        console.log(
            "📖 ARS Story & Poetry Database Loaded"
        );

        console.log(
            "📖 Total Entries:",
            ARS_STORIES.length
        );

    }
);


function renderStories(type) {

    const container =
        document.getElementById(
            "storyContainer"
        );

    if (!container) return;

    const data =
        type === "all"
            ? ARS_STORIES
            : ARS_STORIES.filter(
                item =>
                    item.type === type
            );


    container.innerHTML =
        data.map(item => `

            <article
                class="content-card story-card"
                data-category="${item.type}"
                data-searchable="${item.title} ${item.text}">

                <span class="card-category">
                    ${item.type}
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
