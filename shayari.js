/* =========================================================
   ARS SHAYARI ENGINE
   Categories:
   Love, Sad, Motivation, Attitude, Friendship
   Features:
   Like • Favourite • Save • Copy • Share
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "ARS_SHAYARI_DATA_V2";

  const categories = [
    "All",
    "Love",
    "Sad",
    "Motivation",
    "Attitude",
    "Friendship"
  ];

  const shayariData = [
    {
      id: "love-001",
      category: "Love",
      text: "मोहब्बत नाम नहीं सिर्फ़ साथ रहने का,\nमोहब्बत तो नाम है हर हाल में साथ निभाने का।"
    },
    {
      id: "love-002",
      category: "Love",
      text: "तेरी मुस्कान की वजह बनना चाहता हूँ,\nतेरी हर खुशी में शामिल होना चाहता हूँ।"
    },
    {
      id: "sad-001",
      category: "Sad",
      text: "कुछ खामोशियाँ भी बहुत कुछ कह जाती हैं,\nजब दिल की बातें होंठों तक नहीं आ पाती हैं।"
    },
    {
      id: "sad-002",
      category: "Sad",
      text: "वक्त बदलता है, लोग बदल जाते हैं,\nकुछ रिश्ते बस यादों में रह जाते हैं।"
    },
    {
      id: "motivation-001",
      category: "Motivation",
      text: "रास्ते मुश्किल हैं तो क्या हुआ,\nहौसला मजबूत हो तो मंज़िल दूर नहीं।"
    },
    {
      id: "motivation-002",
      category: "Motivation",
      text: "गिरकर संभलना ही असली जीत है,\nकोशिश करते रहना ही सबसे बड़ी उम्मीद है।"
    },
    {
      id: "attitude-001",
      category: "Attitude",
      text: "हम अपनी पहचान खुद बनाते हैं,\nलोग क्या कहते हैं, इससे रास्ते नहीं बदलते।"
    },
    {
      id: "attitude-002",
      category: "Attitude",
      text: "खामोश हूँ, कमजोर नहीं,\nअपना वक्त आने का इंतज़ार है।"
    },
    {
      id: "friendship-001",
      category: "Friendship",
      text: "दोस्ती वो नहीं जो हर दिन मिले,\nदोस्ती वो है जो दूर रहकर भी दिल के करीब रहे।"
    },
    {
      id: "friendship-002",
      category: "Friendship",
      text: "सच्चे दोस्त जिंदगी की खूबसूरत कहानी होते हैं,\nजो मुश्किल समय में भी हमारे साथ खड़े होते हैं।"
    }
  ];

  function getState() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ||
        '{"likes":{},"favorites":{},"saves":{}}'
      );
    } catch {
      return {
        likes: {},
        favorites: {},
        saves: {}
      };
    }
  }

  function saveState(state) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  }

  function toggle(type, id) {
    const state = getState();

    if (!state[type]) {
      state[type] = {};
    }

    state[type][id] = !state[type][id];

    if (!state[type][id]) {
      delete state[type][id];
    }

    saveState(state);

    document.dispatchEvent(
      new CustomEvent("arsShayariUpdated", {
        detail: {
          type,
          id,
          active: !!state[type][id]
        }
      })
    );

    return !!state[type][id];
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea =
        document.createElement("textarea");

      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();

      const success =
        document.execCommand("copy");

      textarea.remove();

      return success;
    }
  }

  async function share(item) {
    const shareData = {
      title: "ARS Shayari",
      text: item.text,
      url: window.location.href
    };

    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share(shareData);
        return true;
      } catch {
        return false;
      }
    }

    return copy(
      item.text +
      "\n\n— ARS Shayari\n" +
      window.location.href
    );
  }

  function filter(category) {
    if (
      !category ||
      category.toLowerCase() === "all"
    ) {
      return [...shayariData];
    }

    return shayariData.filter(
      item =>
        item.category.toLowerCase() ===
        category.toLowerCase()
    );
  }

  function getFavorites() {
    const state = getState();

    return shayariData.filter(
      item => state.favorites[item.id]
    );
  }

  function getLiked() {
    const state = getState();

    return shayariData.filter(
      item => state.likes[item.id]
    );
  }

  function getSaved() {
    const state = getState();

    return shayariData.filter(
      item => state.saves[item.id]
    );
  }

  window.ARSShayari = {
    data: shayariData,
    categories,
    getState,
    filter,
    toggle,
    copy,
    share,
    getFavorites,
    getLiked,
    getSaved
  };

})();
