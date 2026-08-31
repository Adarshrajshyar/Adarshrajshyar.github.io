/* =========================================================
   ARS OFFICIAL — SHAYARI DATA & INTERACTIONS
   ========================================================= */

"use strict";

(function () {

  const SHAYARI_KEY = "ARS_SHAYARI_DATA";
  const FAVORITE_KEY = "ARS_FAVORITE_SHAYARI";
  const LIKE_KEY = "ARS_LIKED_SHAYARI";

  const categories = [
    "All",
    "Love",
    "Sad",
    "Motivation",
    "Attitude",
    "Friendship",
    "Life",
    "Success",
    "Emotional"
  ];

  const defaultShayari = [

    {
      id: "ARS-SHY-001",
      category: "Love",
      title: "मोहब्बत",
      text: "कुछ रिश्ते शब्दों से नहीं, एहसासों से पहचाने जाते हैं।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-002",
      category: "Sad",
      title: "खामोशी",
      text: "कभी-कभी खामोशी भी उन बातों को कह जाती है, जिन्हें शब्द नहीं कह पाते।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-003",
      category: "Motivation",
      title: "हौसला",
      text: "रास्ते मुश्किल हों तो कदम रोकना नहीं, मंज़िल अक्सर हिम्मत वालों को मिलती है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-004",
      category: "Attitude",
      title: "अपनी पहचान",
      text: "पहचान बनाने के लिए भीड़ का हिस्सा नहीं, अपने रास्ते का मुसाफिर बनना पड़ता है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-005",
      category: "Friendship",
      title: "दोस्ती",
      text: "सच्चा दोस्त वही है जो वक्त बदलने पर अपना साथ नहीं बदलता।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-006",
      category: "Life",
      title: "ज़िंदगी",
      text: "ज़िंदगी छोटी जरूर है, मगर हर दिन को खूबसूरत बनाने का मौका देती है।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-007",
      category: "Success",
      title: "कामयाबी",
      text: "कामयाबी का रास्ता धीरे चलता है, लेकिन मेहनत कभी खाली नहीं जाती।",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-SHY-008",
      category: "Emotional",
      title: "यादें",
      text: "कुछ यादें समय के साथ पुरानी नहीं होतीं, बल्कि और गहरी हो जाती हैं।",
      author: "Adarsh Raj"
    }

  ];


  function loadData() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(SHAYARI_KEY) || "null"
        );

      if (Array.isArray(saved) && saved.length) {
        return saved;
      }

    } catch (error) {}

    return defaultShayari.slice();

  }


  function saveData(data) {

    try {

      localStorage.setItem(
        SHAYARI_KEY,
        JSON.stringify(data)
      );

      return true;

    } catch (error) {

      return false;

    }

  }


  function getFavorites() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(FAVORITE_KEY) || "[]"
        );

      return Array.isArray(data) ? data : [];

    } catch (error) {

      return [];

    }

  }


  function saveFavorites(data) {

    localStorage.setItem(
      FAVORITE_KEY,
      JSON.stringify(data)
    );

  }


  function getLikes() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(LIKE_KEY) || "[]"
        );

      return Array.isArray(data) ? data : [];

    } catch (error) {

      return [];

    }

  }


  function saveLikes(data) {

    localStorage.setItem(
      LIKE_KEY,
      JSON.stringify(data)
    );

  }


  function toggleFavorite(id) {

    const favorites = getFavorites();

    const index =
      favorites.indexOf(id);

    if (index === -1) {

      favorites.push(id);

    } else {

      favorites.splice(index, 1);

    }

    saveFavorites(favorites);

    return index === -1;

  }


  function toggleLike(id) {

    const likes = getLikes();

    const index =
      likes.indexOf(id);

    if (index === -1) {

      likes.push(id);

    } else {

      likes.splice(index, 1);

    }

    saveLikes(likes);

    return index === -1;

  }


  function copyText(text) {

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

    return Promise.resolve();

  }


  async function share(item) {

    const text =
      `${item.text}\n\n— ${item.author}`;

    if (
      navigator.share
    ) {

      try {

        await navigator.share({
          title: item.title,
          text
        });

        return true;

      } catch (error) {

        return false;

      }

    }

    await copyText(text);

    return true;

  }


  function render(container, category) {

    if (!container) return;

    const data = loadData();

    const filtered =
      category === "All"
        ? data
        : data.filter(
            item =>
              String(item.category).toLowerCase() ===
              String(category).toLowerCase()
          );


    if (!filtered.length) {

      container.innerHTML = `
        <div class="empty-state">
          <h3>इस category में अभी Shayari उपलब्ध नहीं है।</h3>
          <p>जल्द ही नई Shayari जोड़ी जाएगी।</p>
        </div>
      `;

      return;

    }


    const favorites = getFavorites();
    const likes = getLikes();


    container.innerHTML =
      filtered.map(item => {

        const favorite =
          favorites.includes(item.id);

        const liked =
          likes.includes(item.id);


        return `

          <article
            class="shayari-card"
            data-shayari-id="${escapeHTML(item.id)}">

            <span class="shayari-category">
              ${escapeHTML(item.category)}
            </span>

            <h3>
              ${escapeHTML(item.title)}
            </h3>

            <p class="shayari-text">
              ${escapeHTML(item.text)}
            </p>

            <div class="shayari-author">
              — ${escapeHTML(item.author)}
            </div>

            <div class="shayari-actions">

              <button
                type="button"
                class="shayari-action favorite-btn ${favorite ? "active" : ""}"
                data-action="favorite"
                data-id="${escapeHTML(item.id)}"
                aria-label="Favorite">
                ${favorite ? "★" : "☆"}
                <span>Favorite</span>
              </button>

              <button
                type="button"
                class="shayari-action like-btn ${liked ? "active" : ""}"
                data-action="like"
                data-id="${escapeHTML(item.id)}"
                aria-label="Like">
                ${liked ? "♥" : "♡"}
                <span>Like</span>
              </button>

              <button
                type="button"
                class="shayari-action"
                data-action="copy"
                data-id="${escapeHTML(item.id)}">
                📋 <span>Copy</span>
              </button>

              <button
                type="button"
                class="shayari-action"
                data-action="share"
                data-id="${escapeHTML(item.id)}">
                ↗ <span>Share</span>
              </button>

            </div>

          </article>

        `;

      }).join("");

  }


  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function setup() {

    const container =
      document.getElementById("shayariList");

    if (!container) return;


    const categoryButtons =
      document.querySelectorAll(
        "[data-shayari-category]"
      );


    let currentCategory = "All";


    render(
      container,
      currentCategory
    );


    categoryButtons.forEach(button => {

      button.addEventListener(
        "click",
        function () {

          currentCategory =
            button.dataset.shayariCategory ||
            "All";


          categoryButtons.forEach(
            item =>
              item.classList.remove("active")
          );


          button.classList.add("active");


          render(
            container,
            currentCategory
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

        const item =
          loadData().find(
            value => value.id === id
          );

        if (!item) return;


        if (action === "favorite") {

          const state =
            toggleFavorite(id);

          button.classList.toggle(
            "active",
            state
          );

          button.firstChild.textContent =
            state ? "★ " : "☆ ";

        }


        if (action === "like") {

          const state =
            toggleLike(id);

          button.classList.toggle(
            "active",
            state
          );

          button.firstChild.textContent =
            state ? "♥ " : "♡ ";

        }


        if (action === "copy") {

          await copyText(
            `${item.text}\n\n— ${item.author}`
          );

          button.classList.add("active");

          const oldHTML =
            button.innerHTML;

          button.innerHTML =
            "✓ <span>Copied</span>";

          setTimeout(
            () => {
              button.innerHTML = oldHTML;
              button.classList.remove("active");
            },
            1500
          );

        }


        if (action === "share") {

          await share(item);

        }

      }
    );

  }


  window.ARS_SHAYARI = {

    categories,

    getAll: loadData,

    saveAll: saveData,

    getFavorites,

    getLikes,

    toggleFavorite,

    toggleLike,

    copyText,

    share,

    render

  };


  document.addEventListener(
    "DOMContentLoaded",
    setup
  );

})();
