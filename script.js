/* =========================================================
   ADARSH RAJ SHAYAR
   OFFICIAL WEBSITE
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   1. GLOBAL CONFIGURATION
   ========================================================= */

const WEBSITE_URL =
  "https://adarshrajshyar.github.io/";

const STORAGE_KEYS = {
  favorites: "ARS_FAVOURITES",
  likes: "ARS_LIKES",
  shayari: "ARS_SHAYARI_DATA",
  stories: "ARS_STORY_DATA",
  visitor: "ARS_VISITOR_COUNT",
  adminSession: "ARS_ADMIN_SESSION",
  darkMode: "ARS_DARK_MODE",
  joining: "ARS_JOINING_DATA"
};


/* =========================================================
   2. DEFAULT DATA
   ========================================================= */

const defaultShayari = [
  {
    id: "ARS-S-001",
    title: "खूबसूरत एहसास",
    category: "Love",
    text: "कुछ एहसास शब्दों के मोहताज नहीं होते,\nबस दिल में उतर जाते हैं।",
    author: "Adarsh Raj",
    publisher: "Adarsh Raj",
    likes: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-S-002",
    title: "खामोशी",
    category: "Sad",
    text: "कभी-कभी खामोशी भी बहुत कुछ कह जाती है,\nबस सुनने वाला दिल चाहिए।",
    author: "Adarsh Raj",
    publisher: "Adarsh Raj",
    likes: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-S-003",
    title: "अपना अंदाज़",
    category: "Attitude",
    text: "हम अपनी पहचान खुद बनाते हैं,\nकिसी के नाम से नहीं।",
    author: "Adarsh Raj",
    publisher: "Adarsh Raj",
    likes: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-S-004",
    title: "सच्ची दोस्ती",
    category: "Friendship",
    text: "सच्चा दोस्त वही है,\nजो वक्त बदलने पर भी साथ नहीं बदलता।",
    author: "Adarsh Raj",
    publisher: "Adarsh Raj",
    likes: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-S-005",
    title: "हौसला",
    category: "Motivation",
    text: "रास्ते मुश्किल जरूर हैं,\nलेकिन मंज़िल नामुमकिन नहीं।",
    author: "Adarsh Raj",
    publisher: "Adarsh Raj",
    likes: 0,
    date: new Date().toISOString()
  }
];


/*
   IMPORTANT:
   Love Story intentionally removed.

   Story categories:
   Motivation
   Friendship
   Horror
   Funny
   Biography
   Reallife
   Moral
   Mystery
   Poem
*/

const defaultStories = [
  {
    id: "ARS-ST-001",
    title: "हौसले की उड़ान",
    category: "Motivation",
    text: "मुश्किल रास्ते अक्सर हमें मजबूत बनाते हैं।\nजो व्यक्ति लगातार प्रयास करता है, वह एक दिन अपनी मंज़िल जरूर पाता है।",
    author: "Adarsh Raj",
    views: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-ST-002",
    title: "एक सच्चा दोस्त",
    category: "Friendship",
    text: "सच्ची दोस्ती वक्त की परीक्षा में और मजबूत होती है।",
    author: "Adarsh Raj",
    views: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-ST-003",
    title: "रात का रहस्य",
    category: "Mystery",
    text: "उस रात पुराने घर से आती आवाज़ ने सबको सोचने पर मजबूर कर दिया।",
    author: "Adarsh Raj",
    views: 0,
    date: new Date().toISOString()
  },

  {
    id: "ARS-ST-004",
    title: "एक छोटी कविता",
    category: "Poem",
    text: "चलते रहो तुम,\nरुकना नहीं,\nसपनों से कभी,\nझुकना नहीं।",
    author: "Adarsh Raj",
    views: 0,
    date: new Date().toISOString()
  }
];


/* =========================================================
   3. STATE
   ========================================================= */

let shayariData = [];
let storyData = [];

let favourites = [];
let likedShayari = [];

let editingShayariId = null;
let editingStoryId = null;

let currentQR = null;


/* =========================================================
   4. DOM HELPER
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================================
   5. SAFE STORAGE
   ========================================================= */

function getStorage(key, fallback) {

  try {

    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);

  } catch (error) {

    console.warn("Storage read error:", error);

    return fallback;
  }
}


function setStorage(key, value) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.warn("Storage save error:", error);
  }
}


/* =========================================================
   6. INITIAL DATA
   ========================================================= */

function initializeData() {

  const savedShayari =
    getStorage(
      STORAGE_KEYS.shayari,
      null
    );

  const savedStories =
    getStorage(
      STORAGE_KEYS.stories,
      null
    );

  shayariData =
    Array.isArray(savedShayari)
      ? savedShayari
      : [...defaultShayari];

  storyData =
    Array.isArray(savedStories)
      ? savedStories
      : [...defaultStories];

  favourites =
    getStorage(
      STORAGE_KEYS.favorites,
      []
    );

  likedShayari =
    getStorage(
      STORAGE_KEYS.likes,
      []
    );
}


/* =========================================================
   7. SAVE DATA
   ========================================================= */

function saveShayari() {

  setStorage(
    STORAGE_KEYS.shayari,
    shayariData
  );
}


function saveStories() {

  setStorage(
    STORAGE_KEYS.stories,
    storyData
  );
}


function saveFavourites() {

  setStorage(
    STORAGE_KEYS.favorites,
    favourites
  );
}


function saveLikes() {

  setStorage(
    STORAGE_KEYS.likes,
    likedShayari
  );
}


/* =========================================================
   8. ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   9. FORMAT TEXT
   ========================================================= */

function formatText(text) {

  return escapeHTML(text)
    .replace(/\n/g, "<br>");
}


/* =========================================================
   10. TOAST
   ========================================================= */

function showToast(message) {

  const toast = $("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);
}


/* =========================================================
   11. SHAYARI CARD
   ========================================================= */

function createShayariCard(item) {

  const isFavourite =
    favourites.includes(item.id);

  const isLiked =
    likedShayari.includes(item.id);

  return `
    <article
      class="shayari-card"
      data-id="${escapeHTML(item.id)}"
      data-category="${escapeHTML(item.category)}"
    >

      <div class="card-top">

        <span class="category-badge">
          ${escapeHTML(item.category)}
        </span>

        <span class="card-id">
          ${escapeHTML(item.id)}
        </span>

      </div>

      <h3>
        ${escapeHTML(item.title)}
      </h3>

      <div class="shayari-text">
        ${formatText(item.text)}
      </div>

      <div class="card-author">

        ✍️
        ${escapeHTML(item.author || "Adarsh Raj")}

      </div>

      <div class="card-actions">

        <button
          type="button"
          class="card-btn favourite-btn ${isFavourite ? "active" : ""}"
          data-action="favorite"
          data-id="${escapeHTML(item.id)}"
        >
          ${isFavourite ? "⭐ Saved" : "☆ Favourite"}
        </button>

        <button
          type="button"
          class="card-btn like-btn ${isLiked ? "active" : ""}"
          data-action="like"
          data-id="${escapeHTML(item.id)}"
        >
          ${isLiked ? "❤️ Liked" : "🤍 Like"}
          <span>${Number(item.likes || 0)}</span>
        </button>

        <button
          type="button"
          class="card-btn share-btn"
          data-action="share"
          data-id="${escapeHTML(item.id)}"
        >
          🔗 Share
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   12. RENDER SHAYARI
   ========================================================= */

function renderShayari() {

  const categories = [
    "Love",
    "Sad",
    "Attitude",
    "Friendship",
    "Motivation"
  ];

  categories.forEach(category => {

    const container =
      $(
        category.toLowerCase() +
        "Container"
      );

    if (!container) return;

    const filtered =
      shayariData.filter(
        item =>
          item.category === category
      );

    if (!filtered.length) {

      container.innerHTML = `
        <div class="empty-state">
          अभी कोई Shayari उपलब्ध नहीं है।
        </div>
      `;

      return;
    }

    container.innerHTML =
      filtered
        .map(createShayariCard)
        .join("");
  });

  renderFavourites();
  renderLatestPublished();
  updateAdminStats();
}


/* =========================================================
   13. FAVOURITE SYSTEM
   ========================================================= */

function toggleFavourite(id) {

  const index =
    favourites.indexOf(id);

  if (index === -1) {

    favourites.push(id);

    showToast(
      "⭐ Shayari Favourite में जोड़ दी गई।"
    );

  } else {

    favourites.splice(index, 1);

    showToast(
      "Shayari Favourite से हटाई गई।"
    );
  }

  saveFavourites();

  renderShayari();
  renderFavourites();
}


/* =========================================================
   14. RENDER FAVOURITES
   ========================================================= */

function renderFavourites() {

  const container =
    $("favoriteList");

  if (!container) return;

  const favouriteItems =
    shayariData.filter(
      item =>
        favourites.includes(item.id)
    );

  const count =
    $("favoriteCount");

  const adminCount =
    $("totalFavourite");

  if (count) {
    count.textContent =
      favouriteItems.length;
  }

  if (adminCount) {
    adminCount.textContent =
      favouriteItems.length;
  }

  const totalLikes =
    favouriteItems.reduce(
      (sum, item) =>
        sum + Number(item.likes || 0),
      0
    );

  const likesElement =
    $("favoriteLikes");

  if (likesElement) {
    likesElement.textContent =
      totalLikes;
  }

  if (!favouriteItems.length) {

    container.innerHTML = `
      <div class="empty-state">
        ⭐ अभी Favourite Shayari नहीं है।
      </div>
    `;

    return;
  }

  container.innerHTML =
    favouriteItems
      .map(createShayariCard)
      .join("");
}


/* =========================================================
   15. LIKE SYSTEM
   ========================================================= */

function toggleLike(id) {

  const item =
    shayariData.find(
      shayari =>
        shayari.id === id
    );

  if (!item) return;

  const index =
    likedShayari.indexOf(id);

  if (index === -1) {

    item.likes =
      Number(item.likes || 0) + 1;

    likedShayari.push(id);

    showToast(
      "❤️ Like किया गया।"
    );

  } else {

    item.likes =
      Math.max(
        0,
        Number(item.likes || 0) - 1
      );

    likedShayari.splice(index, 1);

    showToast(
      "Like हटाया गया।"
    );
  }

  saveLikes();
  saveShayari();

  renderShayari();
}


/* =========================================================
   16. SHARE SYSTEM
   ========================================================= */

async function shareShayari(id) {

  const item =
    shayariData.find(
      shayari =>
        shayari.id === id
    );

  if (!item) return;

  const text =
    `${item.title}\n\n${item.text}\n\n— ${item.author}`;

  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title: item.title,
        text: text,
        url: WEBSITE_URL
      });

    } else {

      await navigator.clipboard.writeText(
        text + "\n" + WEBSITE_URL
      );

      showToast(
        "🔗 Shayari copy हो गई।"
      );
    }

  } catch (error) {

    console.log(
      "Share cancelled/error:",
      error
    );
  }
}


/* =========================================================
   17. CARD EVENT HANDLER
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-action]"
      );

    if (!button) return;

    const action =
      button.dataset.action;

    const id =
      button.dataset.id;

    if (action === "favorite") {

      toggleFavourite(id);

    }

    if (action === "like") {

      toggleLike(id);

    }

    if (action === "share") {

      shareShayari(id);
    }
  }
);


/* =========================================================
   18. SEARCH SHAYARI
   ========================================================= */

function searchShayari(query) {

  const value =
    query
      .trim()
      .toLowerCase();

  const info =
    $("searchResultInfo");

  const containers = [
    "loveContainer",
    "sadContainer",
    "attitudeContainer",
    "friendshipContainer",
    "motivationContainer"
  ];

  if (!value) {

    renderShayari();

    if (info) {
      info.textContent = "";
    }

    return;
  }

  let total = 0;

  containers.forEach(
    containerId => {

      const container =
        $(containerId);

      if (!container) return;

      const results =
        shayariData.filter(
          item => {

            const searchable =
              [
                item.title,
                item.text,
                item.author,
                item.category
              ]
                .join(" ")
                .toLowerCase();

            return searchable.includes(
              value
            );
          }
        );

      total += results.length;

      container.innerHTML =
        results.length
          ? results
              .map(createShayariCard)
              .join("")
          : "";
    }
  );

  if (info) {

    info.textContent =
      `${total} Shayari मिली।`;
  }
}


/* =========================================================
   19. SEARCH EVENTS
   ========================================================= */

function setupSearch() {

  const search =
    $("search");

  const clear =
    $("clearSearchBtn");

  if (search) {

    search.addEventListener(
      "input",
      () =>
        searchShayari(
          search.value
        )
    );
  }

  if (clear) {

    clear.addEventListener(
      "click",
      () => {

        if (search) {
          search.value = "";
        }

        searchShayari("");
      }
    );
  }
}


/* =========================================================
   20. STORY CARD
   ========================================================= */

function createStoryCard(item) {

  return `
    <article
      class="story-card"
      data-id="${escapeHTML(item.id)}"
    >

      <div class="card-top">

        <span class="category-badge">
          ${escapeHTML(item.category)}
        </span>

        <span>
          👁️ ${Number(item.views || 0)}
        </span>

      </div>

      <h3>
        ${escapeHTML(item.title)}
      </h3>

      <div class="story-text">
        ${formatText(item.text)}
      </div>

      <div class="card-author">

        ✍️
        ${escapeHTML(item.author || "Adarsh Raj")}

      </div>

      <div class="card-actions">

        <button
          type="button"
          class="card-btn story-share-btn"
          data-story-share="${escapeHTML(item.id)}"
        >
          🔗 Share
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   21. RENDER STORIES
   ========================================================= */

function renderStories() {

  const container =
    $("storyContainer");

  if (!container) return;

  const searchInput =
    $("storySearch");

  const filter =
    $("storyFilter");

  const query =
    searchInput
      ? searchInput.value
          .trim()
          .toLowerCase()
      : "";

  const category =
    filter
      ? filter.value
      : "All";

  let results =
    [...storyData];

  if (category !== "All") {

    results =
      results.filter(
        item =>
          item.category === category
      );
  }

  if (query) {

    results =
      results.filter(
        item => {

          const searchable =
            [
              item.title,
              item.text,
              item.author,
              item.category
            ]
              .join(" ")
              .toLowerCase();

          return searchable.includes(
            query
          );
        }
      );
  }

  if (!results.length) {

    container.innerHTML = `
      <div class="empty-state">
        📖 कोई Story / Poetry नहीं मिली।
      </div>
    `;

  } else {

    container.innerHTML =
      results
        .map(createStoryCard)
        .join("");
  }

  updateStoryStats();

  const info =
    $("storyResultInfo");

  if (info) {

    info.textContent =
      `${results.length} रचना मिली।`;
  }
}


/* =========================================================
   22. STORY STATS
   ========================================================= */

function updateStoryStats() {

  const storyCount =
    $("storyCount");

  const poemCount =
    $("poemCount");

  const storyViews =
    $("storyViews");

  if (storyCount) {

    storyCount.textContent =
      storyData.length;
  }

  if (poemCount) {

    poemCount.textContent =
      storyData.filter(
        item =>
          item.category === "Poem"
      ).length;
  }

  if (storyViews) {

    storyViews.textContent =
      storyData.reduce(
        (sum, item) =>
          sum + Number(item.views || 0),
        0
      );
  }
}


/* =========================================================
   23. STORY SEARCH/FILTER
   ========================================================= */

function setupStorySearch() {

  const search =
    $("storySearch");

  const filter =
    $("storyFilter");

  if (search) {

    search.addEventListener(
      "input",
      renderStories
    );
  }

  if (filter) {

    filter.addEventListener(
      "change",
      renderStories
    );
  }
}


/* =========================================================
   24. STORY SHARE
   ========================================================= */

document.addEventListener(
  "click",
  async event => {

    const button =
      event.target.closest(
        "[data-story-share]"
      );

    if (!button) return;

    const id =
      button.dataset.storyShare;

    const item =
      storyData.find(
        story =>
          story.id === id
      );

    if (!item) return;

    const text =
      `${item.title}\n\n${item.text}\n\n— ${item.author}`;

    try {

      if (navigator.share) {

        await navigator.share({
          title: item.title,
          text: text,
          url: WEBSITE_URL
        });

      } else {

        await navigator.clipboard.writeText(
          text + "\n" + WEBSITE_URL
        );

        showToast(
          "🔗 Story copy हो गई।"
        );
      }

    } catch (error) {

      console.log(error);
    }
  }
);


/* =========================================================
   25. ADMIN LOGIN
   ========================================================= */

/*
   IMPORTANT SECURITY NOTE:

   यह frontend-only demo/admin system है।

   Real secure admin:
   Firebase / Supabase / backend authentication
   में बाद में करना होगा।
*/

function getAdminPassword() {

  if (
    typeof CONFIG !== "undefined" &&
    CONFIG.ADMIN_PASSWORD
  ) {

    return CONFIG.ADMIN_PASSWORD;
  }

  return "CHANGE_THIS_PASSWORD";
}


function isAdminLoggedIn() {

  return (
    localStorage.getItem(
      STORAGE_KEYS.adminSession
    ) === "true"
  );
}


function updateAdminUI() {

  const login =
    $("adminLogin");

  const panel =
    $("publisherPanel");

  if (!login || !panel) return;

  if (isAdminLoggedIn()) {

    login.hidden = true;
    panel.hidden = false;

  } else {

    login.hidden = false;
    panel.hidden = true;
  }

  updateAdminStats();
  renderAdminHistory();
}


function adminLogin() {

  const passwordInput =
    $("adminPassword");

  const status =
    $("adminStatus");

  if (!passwordInput) return;

  const password =
    passwordInput.value;

  if (
    password ===
    getAdminPassword()
  ) {

    localStorage.setItem(
      STORAGE_KEYS.adminSession,
      "true"
    );

    passwordInput.value = "";

    if (status) {
      status.textContent =
        "✅ Login successful.";
    }

    showToast(
      "🔓 Admin Login Successful"
    );

    updateAdminUI();

  } else {

    if (status) {
      status.textContent =
        "❌ गलत Admin Password.";
    }

    showToast(
      "❌ Password गलत है।"
    );
  }
}


function adminLogout() {

  localStorage.removeItem(
    STORAGE_KEYS.adminSession
  );

  updateAdminUI();

  showToast(
    "🚪 Admin Logout हो गया।"
  );
}


/* =========================================================
   26. ADMIN STATS
   ========================================================= */

function updateAdminStats() {

  const shayari =
    $("totalShayari");

  const stories =
    $("totalStories");

  const favourite =
    $("totalFavourite");

  const likes =
    $("totalLikes");

  if (shayari) {
    shayari.textContent =
      shayariData.length;
  }

  if (stories) {
    stories.textContent =
      storyData.length;
  }

  if (favourite) {
    favourite.textContent =
      favourites.length;
  }

  if (likes) {

    likes.textContent =
      shayariData.reduce(
        (sum, item) =>
          sum + Number(item.likes || 0),
        0
      );
  }
}


/* =========================================================
   27. GENERATE ID
   ========================================================= */

function generateId(prefix) {

  const time =
    Date.now().toString(36);

  const random =
    Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

  return `${prefix}-${time}-${random}`;
}


/* =========================================================
   28. PUBLISH SHAYARI
   ========================================================= */

function publishShayari() {

  if (!isAdminLoggedIn()) {

    showToast(
      "🔒 पहले Admin Login करें।"
    );

    return;
  }

  const title =
    $("pubTitle")?.value.trim();

  const category =
    $("pubCategory")?.value;

  const text =
    $("pubText")?.value.trim();

  const author =
    $("pubAuthor")?.value.trim()
    || "Adarsh Raj";

  const publisher =
    $("pubPublisher")?.value.trim()
    || "Adarsh Raj";

  const status =
    $("shayariPublishStatus");

  if (!title || !text) {

    if (status) {
      status.textContent =
        "⚠️ Title और Shayari जरूरी है।";
    }

    return;
  }

  if (editingShayariId) {

    const item =
      shayariData.find(
        shayari =>
          shayari.id ===
          editingShayariId
      );

    if (item) {

      item.title = title;
      item.category = category;
      item.text = text;
      item.author = author;
      item.publisher = publisher;
    }

    showToast(
      "✅ Shayari updated."
    );

  } else {

    const newItem = {

      id: generateId("ARS-S"),

      title,
      category,
      text,
      author,
      publisher,

      likes: 0,

      date:
        new Date().toISOString()
    };

    shayariData.unshift(
      newItem
    );

    showToast(
      "🚀 Shayari Published!"
    );
  }

  saveShayari();

  clearShayariForm();

  renderShayari();
  renderAdminHistory();
}


/* =========================================================
   29. CLEAR SHAYARI FORM
   ========================================================= */

function clearShayariForm() {

  if ($("pubTitle"))
    $("pubTitle").value = "";

  if ($("pubText"))
    $("pubText").value = "";

  if ($("pubAuthor"))
    $("pubAuthor").value =
      "Adarsh Raj";

  if ($("pubPublisher"))
    $("pubPublisher").value =
      "Adarsh Raj";

  editingShayariId = null;

  const cancel =
    $("cancelShayariEdit");

  if (cancel)
    cancel.hidden = true;

  const button =
    $("publishBtn");

  if (button)
    button.textContent =
      "🚀 Publish Shayari";
}


/* =========================================================
   30. EDIT SHAYARI
   ========================================================= */

function editShayari(id) {

  const item =
    shayariData.find(
      shayari =>
        shayari.id === id
    );

  if (!item) return;

  if ($("pubTitle"))
    $("pubTitle").value =
      item.title;

  if ($("pubCategory"))
    $("pubCategory").value =
      item.category;

  if ($("pubText"))
    $("pubText").value =
      item.text;

  if ($("pubAuthor"))
    $("pubAuthor").value =
      item.author;

  if ($("pubPublisher"))
    $("pubPublisher").value =
      item.publisher || "Adarsh Raj";

  editingShayariId = id;

  const cancel =
    $("cancelShayariEdit");

  if (cancel)
    cancel.hidden = false;

  const button =
    $("publishBtn");

  if (button)
    button.textContent =
      "💾 Update Shayari";

  $("pubTitle")?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================================
   31. DELETE SHAYARI
   ========================================================= */

function deleteShayari(id) {

  if (!isAdminLoggedIn()) return;

  const item =
    shayariData.find(
      shayari =>
        shayari.id === id
    );

  if (!item) return;

  const confirmed =
    confirm(
      `क्या "${item.title}" को delete करना है?`
    );

  if (!confirmed) return;

  shayariData =
    shayariData.filter(
      shayari =>
        shayari.id !== id
    );

  favourites =
    favourites.filter(
      fav =>
        fav !== id
    );

  likedShayari =
    likedShayari.filter(
      like =>
        like !== id
    );

  saveShayari();
  saveFavourites();
  saveLikes();

  renderShayari();
  renderAdminHistory();

  showToast(
    "🗑️ Shayari deleted."
  );
}


/* =========================================================
   32. PUBLISH STORY
   ========================================================= */

function publishStory() {

  if (!isAdminLoggedIn()) {

    showToast(
      "🔒 पहले Admin Login करें।"
    );

    return;
  }

  const title =
    $("storyTitle")?.value.trim();

  const category =
    $("storyCategory")?.value;

  const text =
    $("storyText")?.value.trim();

  const author =
    $("storyAuthor")?.value.trim()
    || "Adarsh Raj";

  const status =
    $("storyPublishStatus");

  if (!title || !text) {

    if (status) {

      status.textContent =
        "⚠️ Title और Story/Poem जरूरी है।";
    }

    return;
  }

  /*
     Love Story intentionally not allowed.
  */

  if (category === "Love") {

    showToast(
      "❌ Love Story category उपलब्ध नहीं है।"
    );

    return;
  }

  if (editingStoryId) {

    const item =
      storyData.find(
        story =>
          story.id ===
          editingStoryId
      );

    if (item) {

      item.title = title;
      item.category = category;
      item.text = text;
      item.author = author;
    }

    showToast(
      "✅ Story/Poem updated."
    );

  } else {

    const newItem = {

      id: generateId("ARS-ST"),

      title,
      category,
      text,
      author,

      views: 0,

      date:
        new Date().toISOString()
    };

    storyData.unshift(
      newItem
    );

    showToast(
      "📚 Story/Poem Published!"
    );
  }

  saveStories();

  clearStoryForm();

  renderStories();
  renderAdminHistory();
}


/* =========================================================
   33. CLEAR STORY FORM
   ========================================================= */

function clearStoryForm() {

  if ($("storyTitle"))
    $("storyTitle").value = "";

  if ($("storyText"))
    $("storyText").value = "";

  if ($("storyAuthor"))
    $("storyAuthor").value =
      "Adarsh Raj";

  editingStoryId = null;

  const cancel =
    $("cancelStoryEdit");

  if (cancel)
    cancel.hidden = true;

  const button =
    $("storyPublishBtn");

  if (button)
    button.textContent =
      "📚 Publish Story / Poem";
}


/* =========================================================
   34. EDIT STORY
   ========================================================= */

function editStory(id) {

  const item =
    storyData.find(
      story =>
        story.id === id
    );

  if (!item) return;

  if ($("storyTitle"))
    $("storyTitle").value =
      item.title;

  if ($("storyCategory"))
    $("storyCategory").value =
      item.category;

  if ($("storyText"))
    $("storyText").value =
      item.text;

  if ($("storyAuthor"))
    $("storyAuthor").value =
      item.author;

  editingStoryId = id;

  const cancel =
    $("cancelStoryEdit");

  if (cancel)
    cancel.hidden = false;

  const button =
    $("storyPublishBtn");

  if (button)
    button.textContent =
      "💾 Update Story / Poem";

  $("storyTitle")?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================================
   35. DELETE STORY
   ========================================================= */

function deleteStory(id) {

  if (!isAdminLoggedIn()) return;

  const item =
    storyData.find(
      story =>
        story.id === id
    );

  if (!item) return;

  const confirmed =
    confirm(
      `क्या "${item.title}" को delete करना है?`
    );

  if (!confirmed) return;

  storyData =
    storyData.filter(
      story =>
        story.id !== id
    );

  saveStories();

  renderStories();
  renderAdminHistory();

  showToast(
    "🗑️ Story/Poem deleted."
  );
}


/* =========================================================
   36. ADMIN HISTORY
   ========================================================= */

function renderAdminHistory() {

  const shayariContainer =
    $("adminShayariList");

  const storyContainer =
    $("adminStoryList");

  if (shayariContainer) {

    if (!shayariData.length) {

      shayariContainer.innerHTML =
        `<p class="muted">
          कोई Shayari नहीं।
        </p>`;

    } else {

      shayariContainer.innerHTML =
        shayariData
          .map(
            item => `
              <div class="admin-history-item">

                <div>
                  <strong>
                    ${escapeHTML(item.title)}
                  </strong>

                  <small>
                    ${escapeHTML(item.category)}
                    •
                    ${escapeHTML(item.id)}
                  </small>
                </div>

                <div class="admin-item-actions">

                  <button
                    type="button"
                    class="secondary-btn"
                    onclick="editShayari('${escapeHTML(item.id)}')"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    class="secondary-btn"
                    onclick="deleteShayari('${escapeHTML(item.id)}')"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>
            `
          )
          .join("");
    }
  }

  if (storyContainer) {

    if (!storyData.length) {

      storyContainer.innerHTML =
        `<p class="muted">
          कोई Story / Poem नहीं।
        </p>`;

    } else {

      storyContainer.innerHTML =
        storyData
          .map(
            item => `
              <div class="admin-history-item">

                <div>

                  <strong>
                    ${escapeHTML(item.title)}
                  </strong>

                  <small>
                    ${escapeHTML(item.category)}
                    •
                    ${escapeHTML(item.id)}
                  </small>

                </div>

                <div class="admin-item-actions">

                  <button
                    type="button"
                    class="secondary-btn"
                    onclick="editStory('${escapeHTML(item.id)}')"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    class="secondary-btn"
                    onclick="deleteStory('${escapeHTML(item.id)}')"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>
            `
          )
          .join("");
    }
  }
}


/* =========================================================
   37. LATEST PUBLISHED
   ========================================================= */

function renderLatestPublished() {

  const container =
    $("publishedContainer");

  if (!container) return;

  const latest =
    [...shayariData]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 6);

  if (!latest.length) {

    container.innerHTML =
      `<div class="empty-state">
        अभी कोई नई Shayari नहीं है।
      </div>`;

    return;
  }

  container.innerHTML =
    latest
      .map(createShayariCard)
      .join("");
}


/* =========================================================
   38. CONTACT FORM - EMAILJS
   ========================================================= */

function setupContactForm() {

  const form =
    $("contact-form");

  if (!form) return;

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const button =
        $("contactSubmitBtn");

      const status =
        $("contactStatus");

      if (
        typeof emailjs ===
        "undefined"
      ) {

        if (status) {

          status.textContent =
            "❌ Email service load नहीं हुई।";
        }

        return;
      }

      if (
        typeof CONFIG ===
          "undefined" ||
        !CONFIG.EMAILJS_PUBLIC_KEY ||
        !CONFIG.EMAILJS_SERVICE_ID ||
        !CONFIG.EMAILJS_TEMPLATE_ID
      ) {

        if (status) {

          status.textContent =
            "⚠️ EmailJS configuration missing है।";
        }

        return;
      }

      try {

        if (button) {

          button.disabled = true;
          button.textContent =
            "📨 Sending...";
        }

        emailjs.init({
          publicKey:
            CONFIG.EMAILJS_PUBLIC_KEY
        });

        await emailjs.sendForm(
          CONFIG.EMAILJS_SERVICE_ID,
          CONFIG.EMAILJS_TEMPLATE_ID,
          form
        );

        if (status) {

          status.textContent =
            "✅ Message successfully sent.";
        }

        form.reset();

        showToast(
          "📩 Message भेज दिया गया।"
        );

      } catch (error) {

        console.error(
          "EmailJS error:",
          error
        );

        if (status) {

          status.textContent =
            "❌ Message send नहीं हुआ।";
        }

        showToast(
          "❌ Message send failed."
        );

      } finally {

        if (button) {

          button.disabled = false;
          button.textContent =
            "📨 Send Message";
        }
      }
    }
  );
}


/* =========================================================
   39. QR CODE
   ========================================================= */

function generateQR(url = WEBSITE_URL) {

  const box =
    $("qrCode");

  if (!box) return;

  if (
    typeof QRCode ===
    "undefined"
  ) {

    showToast(
      "❌ QR Code library load नहीं हुई।"
    );

    return;
  }

  box.innerHTML = "";

  currentQR =
    new QRCode(
      box,
      {
        text: url,
        width: 220,
        height: 220,
        correctLevel:
          QRCode.CorrectLevel.H
      }
    );

  showToast(
    "📱 QR Code generated."
  );
}


/* =========================================================
   40. DOWNLOAD QR
   ========================================================= */

function downloadQR() {

  const box =
    $("qrCode");

  if (!box) return;

  const canvas =
    box.querySelector(
      "canvas"
    );

  const image =
    box.querySelector(
      "img"
    );

  let source = null;

  if (canvas) {

    source =
      canvas.toDataURL(
        "image/png"
      );

  } else if (image) {

    source =
      image.src;
  }

  if (!source) {

    showToast(
      "पहले QR Generate करें।"
    );

    return;
  }

  const link =
    document.createElement(
      "a"
    );

  link.href = source;

  link.download =
    "ARS-Website-QR.png";

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

  showToast(
    "📥 QR Code download शुरू हो गया।"
  );
}


/* =========================================================
   41. COPY WEBSITE
   ========================================================= */

async function copyWebsite() {

  try {

    await navigator.clipboard.writeText(
      WEBSITE_URL
    );

    showToast(
      "🔗 Website link copied."
    );

  } catch {

    showToast(
      "❌ Link copy नहीं हुआ।"
    );
  }
}


/* =========================================================
   42. CUSTOM QR
   ========================================================= */

function setupCustomQR() {

  const button =
    $("customQRBtn");

  const box =
    $("customQRBox");

  const generate =
    $("customQRGenerate");

  const clear =
    $("customQRClear");

  const input =
    $("customQRInput");

  const status =
    $("customQRStatus");

  if (button && box) {

    button.addEventListener(
      "click",
      () => {

        box.hidden =
          !box.hidden;
      }
    );
  }

  if (generate) {

    generate.addEventListener(
      "click",
      () => {

        const url =
          input?.value.trim();

        if (!url) {

          if (status)
            status.textContent =
              "⚠️ URL डालें।";

          return;
        }

        try {

          new URL(url);

        } catch {

          if (status)
            status.textContent =
              "❌ Valid URL डालें।";

          return;
        }

        generateQR(url);

        if (status)
          status.textContent =
            "✅ Custom QR generated.";
      }
    );
  }

  if (clear) {

    clear.addEventListener(
      "click",
      () => {

        if (input)
          input.value = "";

        if (status)
          status.textContent = "";

        generateQR(
          WEBSITE_URL
        );
      }
    );
  }
}


/* =========================================================
   43. DARK MODE
   ========================================================= */

function setupDarkMode() {

  const button =
    $("darkModeBtn");

  if (!button) return;

  const saved =
    localStorage.getItem(
      STORAGE_KEYS.darkMode
    );

  if (saved === "true") {

    document.body.classList.add(
      "dark-mode"
    );

    button.textContent =
      "🌙";
  }

  button.addEventListener(
    "click",
    () => {

      const dark =
        document.body.classList.toggle(
          "dark-mode"
        );

      localStorage.setItem(
        STORAGE_KEYS.darkMode,
        dark
      );

      button.textContent =
        dark
          ? "🌙"
          : "☀️";
    }
  );
}


/* =========================================================
   44. WELCOME POPUP
   ========================================================= */

function setupWelcomePopup() {

  const popup =
    $("welcomePopup");

  const close =
    $("closeWelcomeBtn");

  const enter =
    $("enterBtn");

  if (!popup) return;

  const alreadyEntered =
    sessionStorage.getItem(
      "ARS_WELCOME_SHOWN"
    );

  if (!alreadyEntered) {

    popup.classList.add(
      "show"
    );
  }

  function closePopup() {

    popup.classList.remove(
      "show"
    );

    sessionStorage.setItem(
      "ARS_WELCOME_SHOWN",
      "true"
    );
  }

  close?.addEventListener(
    "click",
    closePopup
  );

  enter?.addEventListener(
    "click",
    closePopup
  );

  popup.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        popup
      ) {

        closePopup();
      }
    }
  );
}


/* =========================================================
   45. MOBILE MENU
   ========================================================= */

function setupMenu() {

  const button =
    $("menuBtn");

  const nav =
    $("mainNav");

  const overlay =
    $("overlay");

  if (!button || !nav)
    return;

  function openMenu() {

    nav.classList.add(
      "open"
    );

    overlay?.classList.add(
      "show"
    );
  }

  function closeMenu() {

    nav.classList.remove(
      "open"
    );

    overlay?.classList.remove(
      "show"
    );
  }

  button.addEventListener(
    "click",
    () => {

      if (
        nav.classList.contains(
          "open"
        )
      ) {

        closeMenu();

      } else {

        openMenu();
      }
    }
  );

  overlay?.addEventListener(
    "click",
    closeMenu
  );

  nav
    .querySelectorAll("a")
    .forEach(
      link => {

        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );
}


/* =========================================================
   46. PROGRESS BAR
   ========================================================= */

function setupProgressBar() {

  const bar =
    $("progressBar");

  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {

      const top =
        window.scrollY;

      const height =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const progress =
        height > 0
          ? (top / height) * 100
          : 0;

      bar.style.width =
        `${progress}%`;
    }
  );
}


/* =========================================================
   47. BACK TO TOP
   ========================================================= */

function setupBackToTop() {

  const button =
    $("topBtn");

  if (!button) return;

  window.addEventListener(
    "scroll",
    () => {

      button.classList.toggle(
        "show",
        window.scrollY > 500
      );
    }
  );

  button.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );
}


/* =========================================================
   48. VISITOR COUNT
   ========================================================= */

function setupVisitorCounter() {

  let count =
    Number(
      localStorage.getItem(
        STORAGE_KEYS.visitor
      )
    );

  if (!count) {
    count = 0;
  }

  count++;

  localStorage.setItem(
    STORAGE_KEYS.visitor,
    count
  );

  const element =
    $("visitor-count");

  if (element) {

    element.textContent =
      count.toLocaleString(
        "en-IN"
      );
  }
}


/*
   NOTE:
   यह local visitor counter है।
   सभी visitors का real global count नहीं है।
*/


/* =========================================================
   49. CURRENT YEAR
   ========================================================= */

function setCurrentYear() {

  const element =
    $("currentYear");

  if (element) {

    element.textContent =
      new Date().getFullYear();
  }
}


/* =========================================================
   50. LOADER
   ========================================================= */

function setupLoader() {

  const loader =
    $("loader");

  if (!loader) return;

  window.addEventListener(
    "load",
    () => {

      setTimeout(
        () => {

          loader.classList.add(
            "hidden"
          );

        },
        500
      );
    }
  );
}


/* =========================================================
   51. ARS JOINING SYSTEM
   ========================================================= */

/*
   ARS JOINING को अभी structure में रखा गया है।

   Joining data:
   - Name
   - Email
   - Phone
   - City
   - Interest
   - Date
   - Unique Joining ID

   IMPORTANT:
   Real public membership database के लिए backend
   जरूरी होगा।
*/

function generateJoiningId() {

  return generateId(
    "ARS-JOIN"
  );
}


function saveJoiningMember(member) {

  const members =
    getStorage(
      STORAGE_KEYS.joining,
      []
    );

  members.push(member);

  setStorage(
    STORAGE_KEYS.joining,
    members
  );
}


function setupJoiningSystem() {

  const form =
    $("joiningForm");

  if (!form) return;

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const formData =
        new FormData(form);

      const name =
        formData.get("name")
          ?.toString()
          .trim();

      const email =
        formData.get("email")
          ?.toString()
          .trim();

      const phone =
        formData.get("phone")
          ?.toString()
          .trim();

      const city =
        formData.get("city")
          ?.toString()
          .trim();

      const interest =
        formData.get("interest")
          ?.toString()
          .trim();

      if (
        !name ||
        !email
      ) {

        showToast(
          "⚠️ Name और Email जरूरी है।"
        );

        return;
      }

      const member = {

        joiningId:
          generateJoiningId(),

        name,
        email,
        phone,
        city,
        interest,

        date:
          new Date().toISOString()
      };

      saveJoiningMember(
        member
      );

      form.reset();

      showToast(
        `🎉 ARS Joining Successful — ${member.joiningId}`
      );

      /*
         आगे इसी Joining ID से:
         - Joining Certificate
         - QR
         - Verification
         - Member Profile

         जोड़े जा सकते हैं।
      */
    }
  );
}


/* =========================================================
   52. ADMIN EVENT SETUP
   ========================================================= */

function setupAdminEvents() {

  $("loginBtn")?.addEventListener(
    "click",
    adminLogin
  );

  $("adminPassword")?.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        adminLogin();
      }
    }
  );

  $("logoutBtn")?.addEventListener(
    "click",
    adminLogout
  );

  $("publishBtn")?.addEventListener(
    "click",
    publishShayari
  );

  $("storyPublishBtn")?.addEventListener(
    "click",
    publishStory
  );

  $("cancelShayariEdit")?.addEventListener(
    "click",
    clearShayariForm
  );

  $("cancelStoryEdit")?.addEventListener(
    "click",
    clearStoryForm
  );
}


/* =========================================================
   53. QR EVENTS
   ========================================================= */

function setupQREvents() {

  $("generateQRBtn")?.addEventListener(
    "click",
    () =>
      generateQR(
        WEBSITE_URL
      )
  );

  $("downloadQRBtn")?.addEventListener(
    "click",
    downloadQR
  );

  $("copyWebsiteBtn")?.addEventListener(
    "click",
    copyWebsite
  );
}


/* =========================================================
   54. SMOOTH NAVIGATION
   ========================================================= */

function setupSmoothNavigation() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const targetId =
              link
                .getAttribute("href")
                ?.substring(1);

            if (!targetId) return;

            const target =
              $(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

            history.replaceState(
              null,
              "",
              `#${targetId}`
            );
          }
        );
      }
    );
}


/* =========================================================
   55. INITIALIZE WEBSITE
   ========================================================= */

function initializeWebsite() {

  initializeData();

  renderShayari();

  renderStories();

  renderLatestPublished();

  updateAdminUI();

  setupSearch();

  setupStorySearch();

  setupContactForm();

  setupQREvents();

  setupCustomQR();

  setupDarkMode();

  setupWelcomePopup();

  setupMenu();

  setupProgressBar();

  setupBackToTop();

  setupVisitorCounter();

  setCurrentYear();

  setupLoader();

  setupJoiningSystem();

  setupAdminEvents();

  setupSmoothNavigation();

  /*
     Generate default QR automatically.
  */

  setTimeout(
    () => {

      generateQR(
        WEBSITE_URL
      );

    },
    800
  );
}


/* =========================================================
   56. START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
  );

} else {

  initializeWebsite();
}


/* =========================================================
   57. GLOBAL ADMIN FUNCTIONS
   ========================================================= */

window.editShayari =
  editShayari;

window.deleteShayari =
  deleteShayari;

window.editStory =
  editStory;

window.deleteStory =
  deleteStory;
