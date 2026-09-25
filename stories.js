"use strict";

/*
 * ARS Official
 * Stories & Poetry Module
 *
 * सभी demo content मौलिक है।
 */

(function () {

  const STORIES = [
    {
      id: "story-001",
      type: "story",
      category: "life",
      title: "छोटे कदम",
      excerpt:
        "कभी-कभी मंज़िल बहुत दूर नहीं होती, बस पहला कदम उठाने की जरूरत होती है। एक छोटे से प्रयास ने एक बच्चे को अपने डर से आगे बढ़ना सिखाया।",
      content:
        "एक बच्चा हमेशा सोचता था कि वह बड़े काम नहीं कर सकता। एक दिन उसने तय किया कि वह रोज़ केवल एक छोटा काम पूरा करेगा। कुछ दिनों बाद उसे एहसास हुआ कि छोटे-छोटे कदम मिलकर बड़ी यात्रा बनाते हैं। उसने अपने डर को खत्म नहीं किया, बल्कि डर के साथ आगे बढ़ना सीख लिया।",
      author: "ARS Original"
    },

    {
      id: "story-002",
      type: "story",
      category: "friendship",
      title: "सच्ची दोस्ती",
      excerpt:
        "सच्चा दोस्त वह नहीं जो हर बात में हाँ कहे, बल्कि वह है जो सही समय पर सही बात कहने का साहस रखता है।",
      content:
        "दो दोस्तों के विचार अक्सर अलग होते थे, लेकिन दोनों एक-दूसरे की बात सुनते थे। एक दिन एक दोस्त ने गलती की। दूसरा उसे चुपचाप छोड़ने के बजाय समझाने आया। पहले दोस्त को बुरा लगा, लेकिन बाद में उसने समझा कि सच्ची दोस्ती केवल साथ रहने का नाम नहीं है।",
      author: "ARS Original"
    },

    {
      id: "story-003",
      type: "story",
      category: "mystery",
      title: "पुरानी डायरी",
      excerpt:
        "एक पुरानी डायरी के कुछ पन्नों ने एक छात्र को अपने ही परिवार की एक अनसुनी कहानी तक पहुँचा दिया।",
      content:
        "कमरे की सफाई करते समय उसे एक पुरानी डायरी मिली। उसमें कई अधूरे वाक्य और कुछ तारीखें लिखी थीं। उसने घर के बड़े लोगों से उन तारीखों के बारे में पूछा। धीरे-धीरे उसे पता चला कि डायरी उसके परिवार के एक पुराने संघर्ष की गवाही थी। आखिरी पन्ने पर केवल एक संदेश था—सच को जानना जरूरी है, लेकिन उससे सीखना उससे भी जरूरी है।",
      author: "ARS Original"
    },

    {
      id: "story-004",
      type: "story",
      category: "inspiration",
      title: "एक और कोशिश",
      excerpt:
        "हार के बाद लिया गया अगला प्रयास ही कई बार सफलता की शुरुआत बन जाता है।",
      content:
        "एक प्रतियोगिता में लगातार दो बार असफल होने के बाद उसने तीसरी बार तैयारी शुरू की। इस बार उसने अपनी पुरानी गलतियों की सूची बनाई और एक-एक करके उन पर काम किया। परिणाम चाहे जैसा हो, इस बार उसने खुद को पहले से बेहतर पाया। उसे समझ आया कि कोशिश का मूल्य केवल परिणाम से नहीं मापा जाता।",
      author: "ARS Original"
    },

    {
      id: "story-005",
      type: "story",
      category: "education",
      title: "एक सवाल",
      excerpt:
        "कक्षा में पूछा गया एक छोटा-सा सवाल एक विद्यार्थी के लिए सीखने की पूरी दिशा बदल देता है।",
      content:
        "कक्षा में शिक्षक ने पूछा—'तुम यह क्यों सीखना चाहते हो?' विद्यार्थी के पास कोई स्पष्ट उत्तर नहीं था। उस दिन उसने केवल परीक्षा के लिए पढ़ने के बजाय विषय को समझने की कोशिश शुरू की। कुछ समय बाद पढ़ाई उसके लिए केवल अंक पाने का माध्यम नहीं रही, बल्कि सवाल पूछने और उत्तर खोजने की प्रक्रिया बन गई।",
      author: "ARS Original"
    },

    {
      id: "story-006",
      type: "story",
      category: "dream",
      title: "सपने की पहली सीढ़ी",
      excerpt:
        "सपना बड़ा हो सकता है, लेकिन उसकी शुरुआत हमेशा एक छोटे और वास्तविक कदम से होती है।",
      content:
        "वह रोज़ अपने सपने के बारे में सोचता था, लेकिन शुरुआत नहीं कर पाता था। एक दिन उसने अपने सपने को छोटे-छोटे कामों में बाँट दिया। पहला काम पूरा हुआ, फिर दूसरा। कुछ महीनों बाद उसके पास केवल सपना नहीं था, बल्कि उसे पूरा करने की दिशा भी थी।",
      author: "ARS Original"
    },

    {
      id: "poem-001",
      type: "poetry",
      category: "motivation",
      title: "चलते रहना",
      excerpt:
        "रास्ते कठिन हों तो कदम रोकना जरूरी नहीं,\nधीरे चलना भी आगे बढ़ना है।",
      content:
        "रास्ते कठिन हों तो कदम रोकना जरूरी नहीं,\nधीरे चलना भी आगे बढ़ना है।\nआज अगर मंज़िल दूर दिखाई दे,\nतो कल के लिए एक कदम बढ़ाना है।",
      author: "ARS Original"
    },

    {
      id: "poem-002",
      type: "poetry",
      category: "life",
      title: "ज़िंदगी की सीख",
      excerpt:
        "हर दिन कुछ नया सिखाता है,\nहर अनुभव हमें थोड़ा बदल जाता है।",
      content:
        "हर दिन कुछ नया सिखाता है,\nहर अनुभव हमें थोड़ा बदल जाता है।\nजो कल समझ नहीं आया,\nवही आज जीवन की सीख बन जाता है।",
      author: "ARS Original"
    },

    {
      id: "poem-003",
      type: "poetry",
      category: "friendship",
      title: "दोस्ती का मतलब",
      excerpt:
        "दोस्ती केवल हँसी की बात नहीं,\nकभी खामोशी को समझना भी दोस्ती है।",
      content:
        "दोस्ती केवल हँसी की बात नहीं,\nकभी खामोशी को समझना भी दोस्ती है।\nदूर रहकर भी साथ महसूस हो,\nवही रिश्ते की सच्ची खूबसूरती है।",
      author: "ARS Original"
    },

    {
      id: "poem-004",
      type: "poetry",
      category: "education",
      title: "किताब",
      excerpt:
        "किताब के पन्नों में केवल शब्द नहीं,\nकई नए रास्तों की शुरुआत होती है।",
      content:
        "किताब के पन्नों में केवल शब्द नहीं,\nकई नए रास्तों की शुरुआत होती है।\nएक सवाल से खुलता है नया अध्याय,\nऔर सीखने से सोच बड़ी होती है।",
      author: "ARS Original"
    }
  ];

  const CATEGORIES = [
    { id: "all", name: "सभी" },
    { id: "mystery", name: "Mystery" },
    { id: "horror", name: "Horror" },
    { id: "biography", name: "Biography" },
    { id: "life", name: "Life" },
    { id: "inspiration", name: "Inspiration" },
    { id: "motivation", name: "Motivation" },
    { id: "friendship", name: "Friendship" },
    { id: "dream", name: "Dream" },
    { id: "education", name: "Education" },
    { id: "general", name: "General" }
  ];

  const TYPE_NAMES = {
    story: "📖 कहानी",
    poetry: "📝 कविता"
  };

  let currentCategory = "all";
  let currentSearch = "";

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .trim();
  }

  function getCategoryName(category) {
    const item = CATEGORIES.find(
      item => item.id === normalize(category)
    );

    return item ? item.name : category;
  }

  function getAll() {
    return [...STORIES];
  }

  function getById(id) {
    return STORIES.find(item => item.id === id) || null;
  }

  function search(query) {
    const q = normalize(query);

    if (!q) {
      return getAll();
    }

    return STORIES.filter(item => {
      return [
        item.title,
        item.excerpt,
        item.content,
        item.category,
        item.author
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }

  function filterStories() {
    let result = getAll();

    if (currentCategory !== "all") {
      result = result.filter(
        item => normalize(item.category) === currentCategory
      );
    }

    const q = normalize(currentSearch);

    if (q) {
      result = result.filter(item => {
        return [
          item.title,
          item.excerpt,
          item.content,
          item.category,
          item.author
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
    }

    return result;
  }

  function isFavorite(id) {
    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.isFavorite === "function"
    ) {
      return window.ARS_STORAGE.isFavorite(id);
    }

    return false;
  }

  function toggleFavorite(id) {
    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.toggleFavorite === "function"
    ) {
      return window.ARS_STORAGE.toggleFavorite(id);
    }

    return false;
  }

  function isLiked(id) {
    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.hasLiked === "function"
    ) {
      return window.ARS_STORAGE.hasLiked(id);
    }

    return false;
  }

  function toggleLike(id) {
    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.toggleLike === "function"
    ) {
      return window.ARS_STORAGE.toggleLike(id);
    }

    return false;
  }

  function showToast(message) {
    if (
      window.ARS_APP &&
      typeof window.ARS_APP.toast === "function"
    ) {
      window.ARS_APP.toast(message);
      return;
    }

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  function renderFilters() {
    const container = document.getElementById("storyFilters");

    if (!container) return;

    container.innerHTML = CATEGORIES.map(category => {
      const active =
        category.id === currentCategory ? "active" : "";

      return `
        <button
          type="button"
          class="story-filter ${active}"
          data-category="${category.id}">
          ${category.name}
        </button>
      `;
    }).join("");

    container.querySelectorAll(".story-filter").forEach(button => {
      button.addEventListener("click", () => {
        currentCategory = button.dataset.category || "all";
        renderFilters();
        renderStories();
      });
    });
  }

  function renderStories() {
    const container = document.getElementById("storiesGrid");

    if (!container) return;

    const stories = filterStories();

    if (!stories.length) {
      container.innerHTML = `
        <div class="story-empty">
          <div style="font-size:2rem;margin-bottom:8px;">🔎</div>
          <h3>कोई रचना नहीं मिली</h3>
          <p>कृपया दूसरा शब्द या category चुनकर देखें।</p>
        </div>
      `;
      return;
    }

    container.innerHTML = stories.map(item => {
      const favorite = isFavorite(item.id);
      const liked = isLiked(item.id);

      return `
        <article class="story-card">

          <span class="story-type">
            ${TYPE_NAMES[item.type] || "📖 रचना"}
          </span>

          <h2>${escapeHTML(item.title)}</h2>

          <div class="story-category">
            ${escapeHTML(getCategoryName(item.category))}
          </div>

          <div class="story-excerpt">
            ${formatText(item.excerpt)}
          </div>

          <div class="story-actions">

            <button
              type="button"
              class="story-action ${liked ? "active" : ""}"
              data-action="like"
              data-id="${item.id}">
              ${liked ? "❤️ Liked" : "🤍 Like"}
            </button>

            <button
              type="button"
              class="story-action ${favorite ? "active" : ""}"
              data-action="favorite"
              data-id="${item.id}">
              ${favorite ? "⭐ Saved" : "☆ Favorite"}
            </button>

            <button
              type="button"
              class="story-action"
              data-action="copy"
              data-id="${item.id}">
              📋 Copy
            </button>

            <button
              type="button"
              class="story-action"
              data-action="open"
              data-id="${item.id}">
              📖 Read
            </button>

          </div>

        </article>
      `;
    }).join("");

    container.querySelectorAll(".story-action").forEach(button => {
      button.addEventListener("click", handleAction);
    });
  }

  function handleAction(event) {
    const button = event.currentTarget;
    const id = button.dataset.id;
    const action = button.dataset.action;

    const item = getById(id);

    if (!item) return;

    if (action === "like") {
      toggleLike(id);
      renderStories();
      return;
    }

    if (action === "favorite") {
      const result = toggleFavorite(id);

      showToast(
        result
          ? "रचना Favorite में सेव हो गई।"
          : "Favorite update हो गया।"
      );

      renderStories();
      return;
    }

    if (action === "copy") {
      const text =
        `${item.title}\n\n${item.content}\n\n— ${item.author}`;

      copyText(text);
      return;
    }

    if (action === "open") {
      window.location.href =
        `story-view.html?id=${encodeURIComponent(id)}`;
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("रचना copy हो गई।");
    } catch (error) {
      showToast("Copy नहीं हो सका।");
    }
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatText(value) {
    return escapeHTML(value)
      .replace(/\n/g, "<br>");
  }

  function init() {
    renderFilters();
    renderStories();

    const searchInput =
      document.getElementById("storySearch");

    if (searchInput) {
      searchInput.addEventListener("input", event => {
        currentSearch = event.target.value;
        renderStories();
      });
    }
  }

  window.ARS_STORIES = {
    getAll,
    getById,
    search,
    filterStories,
    getCategoryName,
    categories: CATEGORIES
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
