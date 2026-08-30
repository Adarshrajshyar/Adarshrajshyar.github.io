/* =========================================================
   ARS OFFICIAL
   MAIN WEBSITE SCRIPT
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SAFE HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);


  const $$ = (selector, parent = document) =>
    Array.from(
      parent.querySelectorAll(selector)
    );


  function escapeHTML(value) {

    const div =
      document.createElement("div");

    div.textContent =
      value ?? "";

    return div.innerHTML;

  }


  /* =======================================================
     TOAST
     ======================================================= */

  const toast =
    $("#toast");


  let toastTimer = null;


  function showToast(message) {

    if (!toast) return;


    toast.textContent =
      message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
      setTimeout(
        () => {
          toast.classList.remove("show");
        },
        2200
      );

  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle =
    $("#menuToggle");


  const navLinks =
    $("#navLinks");


  if (menuToggle && navLinks) {

    menuToggle.addEventListener(
      "click",
      function () {

        const isOpen =
          navLinks.classList.toggle("open");


        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    $$(".nav-links a")
      .forEach(
        link => {

          link.addEventListener(
            "click",
            () => {

              navLinks.classList.remove(
                "open"
              );

              menuToggle.setAttribute(
                "aria-expanded",
                "false"
              );

            }
          );

        }
      );

  }


  /* =======================================================
     YEAR
     ======================================================= */

  const currentYear =
    $("#currentYear");


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     SHAYARI DATA
     ======================================================= */

  const defaultShayari = [

    {
      id: "love-001",
      category: "Love",
      text:
        "कुछ रिश्ते शब्दों से नहीं,\nदिल की सच्चाई से पहचाने जाते हैं।"
    },

    {
      id: "love-002",
      category: "Love",
      text:
        "जहाँ सम्मान और भरोसा हो,\nवहीं रिश्ता सबसे खूबसूरत होता है।"
    },


    {
      id: "sad-001",
      category: "Sad",
      text:
        "कभी-कभी खामोशी भी बहुत कुछ कह जाती है,\nबस समझने वाला चाहिए।"
    },

    {
      id: "sad-002",
      category: "Sad",
      text:
        "हर उदासी हमेशा नहीं रहती,\nसमय बदलता है और रास्ते भी।"
    },


    {
      id: "attitude-001",
      category: "Attitude",
      text:
        "अपनी पहचान बनाने निकले हैं,\nभीड़ में खोने नहीं।"
    },

    {
      id: "attitude-002",
      category: "Attitude",
      text:
        "रास्ते अपने चुनते हैं,\nमंज़िल समय के साथ मिलती है।"
    },


    {
      id: "friendship-001",
      category: "Friendship",
      text:
        "सच्ची दोस्ती दूरी नहीं देखती,\nवह भरोसा देखती है।"
    },

    {
      id: "friendship-002",
      category: "Friendship",
      text:
        "दोस्ती छोटी बातों से नहीं,\nमुश्किल समय में साथ देने से बड़ी होती है।"
    },


    {
      id: "motivation-001",
      category: "Motivation",
      text:
        "आज की छोटी मेहनत,\nकल की बड़ी सफलता की शुरुआत हो सकती है।"
    },

    {
      id: "motivation-002",
      category: "Motivation",
      text:
        "रुकना विकल्प हो सकता है,\nलेकिन कोशिश करना हमेशा तुम्हारे हाथ में है।"
    }

  ];


  /* =======================================================
     LOAD SHAYARI
     ======================================================= */

  function getShayariData() {

    let published = [];


    /*
      Publisher system बाद में storage.js के माध्यम से
      published Shayari उपलब्ध करा सकता है।
    */

    try {

      if (
        window.ARS_STORAGE &&
        typeof
          window.ARS_STORAGE.getShayari ===
          "function"
      ) {

        const stored =
          window.ARS_STORAGE.getShayari();


        if (Array.isArray(stored)) {

          published =
            stored;

        }

      }

    } catch (error) {

      console.error(
        "Unable to load stored Shayari:",
        error
      );

    }


    /*
      LocalStorage compatibility fallback
    */

    if (!published.length) {

      try {

        const raw =
          localStorage.getItem(
            "ARS_SHAYARI"
          );


        const parsed =
          JSON.parse(
            raw || "[]"
          );


        if (Array.isArray(parsed)) {

          published =
            parsed;

        }

      } catch (error) {

        console.warn(
          "ARS_SHAYARI storage unavailable."
        );

      }

    }


    /*
      Default content + published content
    */

    return [
      ...defaultShayari,
      ...published
    ];

  }


  /* =======================================================
     USER INTERACTION STORAGE
     ======================================================= */

  function getJSON(key, fallback) {

    try {

      const value =
        localStorage.getItem(key);


      return value
        ? JSON.parse(value)
        : fallback;

    } catch {

      return fallback;

    }

  }


  function saveJSON(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    } catch {

      return false;

    }

  }


  function getLikes() {

    return getJSON(
      "ARS_LIKES",
      {}
    );

  }


  function getFavorites() {

    return getJSON(
      "ARS_FAVORITES",
      {}
    );

  }


  function toggleLike(id) {

    const likes =
      getLikes();


    likes[id] =
      !Boolean(likes[id]);


    saveJSON(
      "ARS_LIKES",
      likes
    );


    return likes[id];

  }


  function toggleFavorite(id) {

    const favorites =
      getFavorites();


    favorites[id] =
      !Boolean(favorites[id]);


    saveJSON(
      "ARS_FAVORITES",
      favorites
    );


    return favorites[id];

  }


  /* =======================================================
     SHARE
     ======================================================= */

  async function shareShayari(item) {

    const shareText =
      `${item.text}\n\n— ARS Official`;


    const shareURL =
      `${window.location.origin}${window.location.pathname}#shayari-${encodeURIComponent(item.id)}`;


    if (
      navigator.share
    ) {

      try {

        await navigator.share({

          title:
            "ARS Official Shayari",

          text:
            shareText,

          url:
            shareURL

        });


        return;

      } catch (error) {

        /*
          User cancelled sharing.
          No error message required.
        */

        if (
          error &&
          error.name === "AbortError"
        ) {

          return;

        }

      }

    }


    /*
      Fallback: copy content
    */

    try {

      await navigator.clipboard.writeText(
        `${shareText}\n${shareURL}`
      );


      showToast(
        "Shayari link और text copy हो गया।"
      );

    } catch {

      showToast(
        "Share करने के लिए browser का share option इस्तेमाल करें।"
      );

    }

  }


  /* =======================================================
     SHAYARI RENDER
     ======================================================= */

  const shayariContainer =
    $("#shayariContainer");


  let activeCategory =
    "Love";


  function renderShayari(category) {

    if (!shayariContainer) {
      return;
    }


    const allShayari =
      getShayariData();


    const filtered =
      allShayari.filter(
        item =>
          String(item.category)
            .toLowerCase() ===
          String(category)
            .toLowerCase()
      );


    if (!filtered.length) {

      shayariContainer.innerHTML = `

        <div class="empty-state">

          <h3>
            अभी इस category में Shayari उपलब्ध नहीं है।
          </h3>

          <p>
            Publisher से नई Shayari publish होने पर
            यहाँ दिखाई देगी।
          </p>

        </div>

      `;

      return;

    }


    const likes =
      getLikes();


    const favorites =
      getFavorites();


    shayariContainer.innerHTML =
      filtered
        .map(
          item => {

            const liked =
              Boolean(
                likes[item.id]
              );


            const saved =
              Boolean(
                favorites[item.id]
              );


            return `

              <article
                class="shayari-card"
                id="shayari-${escapeHTML(item.id)}"
              >

                <div class="shayari-category">
                  ${escapeHTML(item.category)}
                </div>


                <div class="shayari-text">
                  ${escapeHTML(item.text)}
                </div>


                <div class="shayari-actions">

                  <button
                    type="button"
                    class="action-btn ${liked ? "like-active" : ""}"
                    data-action="like"
                    data-id="${escapeHTML(item.id)}"
                    aria-pressed="${liked}"
                  >
                    ${liked ? "❤️ Liked" : "♡ Like"}
                  </button>


                  <button
                    type="button"
                    class="action-btn ${saved ? "active" : ""}"
                    data-action="favorite"
                    data-id="${escapeHTML(item.id)}"
                    aria-pressed="${saved}"
                  >
                    ${saved ? "⭐ Saved" : "☆ Save"}
                  </button>


                  <button
                    type="button"
                    class="action-btn"
                    data-action="share"
                    data-id="${escapeHTML(item.id)}"
                  >
                    ↗ Share
                  </button>

                </div>

              </article>

            `;

          }
        )
        .join("");

  }


  /* =======================================================
     CATEGORY SWITCH
     ======================================================= */

  const categoryButtons =
    $$(".category-btn");


  categoryButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        function () {

          categoryButtons.forEach(
            btn =>
              btn.classList.remove(
                "active"
              )
          );


          this.classList.add(
            "active"
          );


          activeCategory =
            this.dataset.category;


          renderShayari(
            activeCategory
          );

        }
      );

    }
  );


  /* =======================================================
     SHAYARI ACTIONS
     ======================================================= */

  if (shayariContainer) {

    shayariContainer.addEventListener(
      "click",
      async function (event) {

        const button =
          event.target.closest(
            "[data-action]"
          );


        if (!button) {
          return;
        }


        const action =
          button.dataset.action;


        const id =
          button.dataset.id;


        const item =
          getShayariData()
            .find(
              shayari =>
                String(shayari.id) ===
                String(id)
            );


        if (!item) {
          return;
        }


        if (action === "like") {

          const liked =
            toggleLike(id);


          button.classList.toggle(
            "like-active",
            liked
          );


          button.setAttribute(
            "aria-pressed",
            String(liked)
          );


          button.textContent =
            liked
              ? "❤️ Liked"
              : "♡ Like";


          showToast(
            liked
              ? "Shayari liked ❤️"
              : "Like हटाया गया।"
          );

        }


        if (action === "favorite") {

          const saved =
            toggleFavorite(id);


          button.classList.toggle(
            "active",
            saved
          );


          button.setAttribute(
            "aria-pressed",
            String(saved)
          );


          button.textContent =
            saved
              ? "⭐ Saved"
              : "☆ Save";


          showToast(
            saved
              ? "Favorite में save हो गया ⭐"
              : "Favorite से हटाया गया।"
          );

        }


        if (action === "share") {

          await shareShayari(
            item
          );

        }

      }
    );

  }


  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  renderShayari(
    activeCategory
  );


})();
