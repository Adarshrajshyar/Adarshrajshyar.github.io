/* =========================================================
   ARS OFFICIAL — STORIES
   ========================================================= */

"use strict";

(function () {

  const STORY_KEY = "ARS_STORIES";
  const FAVORITE_KEY = "ARS_FAVORITE_STORIES";
  const LIKE_KEY = "ARS_LIKED_STORIES";


  const categories = [
    "All",
    "Motivation",
    "Life",
    "Inspiration",
    "Friendship",
    "Success",
    "Emotional",
    "Education",
    "Reality",
    "Dreams"
  ];


  const defaultStories = [

    {
      id: "ARS-STORY-001",
      title: "एक कदम और",
      category: "Motivation",
      excerpt: "मुश्किल रास्ते अक्सर मजबूत इंसान बनाते हैं।",
      content:
        "हर मंज़िल की शुरुआत एक छोटे कदम से होती है। रास्ते में मुश्किलें आएँ तो रुकना नहीं चाहिए। कोशिश जारी रखने वाला व्यक्ति हर अनुभव से कुछ नया सीखता है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-STORY-002",
      title: "सपनों की उड़ान",
      category: "Dreams",
      excerpt: "सपने तभी सच होते हैं जब उनके लिए मेहनत की जाए।",
      content:
        "सपने देखना आसान है, लेकिन उन्हें पूरा करने के लिए धैर्य, मेहनत और निरंतर प्रयास चाहिए। छोटी सफलता भी आगे बढ़ने की प्रेरणा बन सकती है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-STORY-003",
      title: "सच्ची दोस्ती",
      category: "Friendship",
      excerpt: "सच्चे दोस्त समय के साथ नहीं बदलते।",
      content:
        "अच्छी दोस्ती भरोसे और सम्मान पर बनी होती है। सच्चा दोस्त आपकी सफलता में खुश होता है और मुश्किल समय में आपका हौसला बढ़ाता है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-STORY-004",
      title: "नई शुरुआत",
      category: "Life",
      excerpt: "हर सुबह एक नई शुरुआत का मौका देती है।",
      content:
        "बीता हुआ कल हमें अनुभव देता है, लेकिन आज हमें आगे बढ़ने का अवसर देता है। अपनी गलतियों से सीखकर बेहतर शुरुआत करना ही जीवन की खूबसूरती है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-STORY-005",
      title: "कामयाबी का रास्ता",
      category: "Success",
      excerpt: "लगातार प्रयास ही सफलता की सबसे मजबूत नींव है।",
      content:
        "कामयाबी हमेशा तुरंत नहीं मिलती। कई बार असफलताएँ हमें वह सिखाती हैं जो सफलता नहीं सिखा सकती। इसलिए मेहनत और धैर्य को अपना साथी बनाए रखें।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-STORY-006",
      title: "सीखने की आदत",
      category: "Education",
      excerpt: "सीखना कभी बंद नहीं होना चाहिए।",
      content:
        "ज्ञान केवल किताबों तक सीमित नहीं है। हर व्यक्ति, हर अनुभव और हर चुनौती हमें कुछ नया सिखा सकती है। सीखते रहना ही विकास का रास्ता है।",
      author: "Adarsh Raj"
    }

  ];


  function loadStories() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(STORY_KEY) || "null"
        );

      if (
        Array.isArray(saved) &&
        saved.length
      ) {
        return saved;
      }

    } catch (error) {}

    return defaultStories.slice();

  }


  function saveStories(stories) {

    try {

      localStorage.setItem(
        STORY_KEY,
        JSON.stringify(stories)
      );

      return true;

    } catch (error) {

      return false;

    }

  }


  function getArray(key) {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(key) || "[]"
        );

      return Array.isArray(data)
        ? data
        : [];

    } catch (error) {

      return [];

    }

  }


  function toggle(key, id) {

    const list =
      getArray(key);

    const index =
      list.indexOf(id);


    if (index === -1) {

      list.push(id);

    } else {

      list.splice(index, 1);

    }


    localStorage.setItem(
      key,
      JSON.stringify(list)
    );


    return index === -1;

  }


  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function render(
    container,
    category = "All"
  ) {

    if (!container) return;


    const stories =
      loadStories();


    const filtered =
      category === "All"
        ? stories
        : stories.filter(
            story =>
              String(story.category)
                .toLowerCase() ===
              String(category)
                .toLowerCase()
          );


    if (!filtered.length) {

      container.innerHTML = `
        <div class="empty-state">
          <h3>इस category में अभी Story उपलब्ध नहीं है।</h3>
          <p>नई stories जल्द ही प्रकाशित की जाएँगी।</p>
        </div>
      `;

      return;

    }


    const favorites =
      getArray(FAVORITE_KEY);

    const likes =
      getArray(LIKE_KEY);


    container.innerHTML =
      filtered.map(story => {

        const favorite =
          favorites.includes(story.id);

        const liked =
          likes.includes(story.id);


        return `

          <article
            class="story-card"
            data-story-id="${escapeHTML(story.id)}">

            <div class="story-card-top">

              <span class="story-category">
                ${escapeHTML(story.category)}
              </span>

              <span class="story-id">
                ${escapeHTML(story.id)}
              </span>

            </div>

            <h3>
              ${escapeHTML(story.title)}
            </h3>

            <p class="story-excerpt">
              ${escapeHTML(story.excerpt)}
            </p>

            <div class="story-content"
                 hidden>
              ${escapeHTML(story.content)}
            </div>

            <p class="story-author">
              — ${escapeHTML(story.author)}
            </p>

            <div class="story-actions">

              <button
                type="button"
                class="story-read"
                data-action="read"
                data-id="${escapeHTML(story.id)}">
                Read More
              </button>

              <button
                type="button"
                class="${favorite ? "active" : ""}"
                data-action="favorite"
                data-id="${escapeHTML(story.id)}">
                ${favorite ? "★" : "☆"}
                Favorite
              </button>

              <button
                type="button"
                class="${liked ? "active" : ""}"
                data-action="like"
                data-id="${escapeHTML(story.id)}">
                ${liked ? "♥" : "♡"}
                Like
              </button>

              <button
                type="button"
                data-action="copy"
                data-id="${escapeHTML(story.id)}">
                📋 Copy
              </button>

              <button
                type="button"
                data-action="share"
                data-id="${escapeHTML(story.id)}">
                ↗ Share
              </button>

            </div>

          </article>

        `;

      }).join("");

  }


  async function copyStory(story) {

    const text =
      `${story.title}\n\n${story.content}\n\n— ${story.author}`;


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      return navigator.clipboard.writeText(text);

    }


    const area =
      document.createElement("textarea");

    area.value = text;

    area.style.position = "fixed";
    area.style.opacity = "0";

    document.body.appendChild(area);

    area.focus();
    area.select();

    try {
      document.execCommand("copy");
    } catch (error) {}

    area.remove();

  }


  async function shareStory(story) {

    const text =
      `${story.title}\n\n${story.content}\n\n— ${story.author}`;


    if (navigator.share) {

      try {

        await navigator.share({
          title: story.title,
          text
        });

        return;

      } catch (error) {

        return;

      }

    }


    await copyStory(story);

  }


  function setup() {

    const container =
      document.getElementById(
        "storyList"
      );


    if (!container) return;


    const buttons =
      document.querySelectorAll(
        "[data-story-category]"
      );


    let category = "All";


    render(
      container,
      category
    );


    buttons.forEach(button => {

      button.addEventListener(
        "click",
        function () {

          category =
            button.dataset.storyCategory ||
            "All";


          buttons.forEach(
            item =>
              item.classList.remove("active")
          );


          button.classList.add("active");


          render(
            container,
            category
          );

        }
      );

    });


    container.addEventListener(
      "click",
      async function (event) {

        const button =
          event.target.closest(
            "[data-action]"
          );

        if (!button) return;


        const action =
          button.dataset.action;

        const id =
          button.dataset.id;


        const story =
          loadStories().find(
            item => item.id === id
          );


        if (!story) return;


        if (action === "read") {

          const card =
            button.closest(".story-card");

          const content =
            card?.querySelector(
              ".story-content"
            );


          if (content) {

            content.hidden =
              !content.hidden;

            button.textContent =
              content.hidden
                ? "Read More"
                : "Read Less";

          }

        }


        if (action === "favorite") {

          const state =
            toggle(
              FAVORITE_KEY,
              id
            );

          button.classList.toggle(
            "active",
            state
          );

          button.innerHTML =
            state
              ? "★ Favorite"
              : "☆ Favorite";

        }


        if (action === "like") {

          const state =
            toggle(
              LIKE_KEY,
              id
            );

          button.classList.toggle(
            "active",
            state
          );

          button.innerHTML =
            state
              ? "♥ Like"
              : "♡ Like";

        }


        if (action === "copy") {

          await copyStory(story);

          const old =
            button.innerHTML;

          button.innerHTML =
            "✓ Copied";

          setTimeout(
            () => {
              button.innerHTML = old;
            },
            1500
          );

        }


        if (action === "share") {

          await shareStory(story);

        }

      }
    );

  }


  window.ARS_STORY = {

    categories,

    getAll: loadStories,

    saveAll: saveStories,

    toggleFavorite: id =>
      toggle(FAVORITE_KEY, id),

    toggleLike: id =>
      toggle(LIKE_KEY, id),

    render,

    copy: copyStory,

    share: shareStory

  };


  document.addEventListener(
    "DOMContentLoaded",
    setup
  );

})();
