/* =========================================================
   ARS STORY ENGINE
   Categories + Like + Favourite + Save + Copy + Share
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "ARS_STORY_DATA_V2";

  const categories = [
    "All",
    "Motivation",
    "Friendship",
    "Life",
    "Inspiration",
    "Success",
    "Emotional",
    "Education"
  ];

  const stories = [
    {
      id: "story-001",
      category: "Motivation",
      title: "एक कदम और",
      text:
        "कभी-कभी मंज़िल दिखाई नहीं देती, " +
        "लेकिन इसका मतलब यह नहीं कि रास्ता खत्म हो गया। " +
        "बस एक कदम और बढ़ाइए।"
    },
    {
      id: "story-002",
      category: "Friendship",
      title: "सच्ची दोस्ती",
      text:
        "सच्चा दोस्त वही होता है जो आपकी सफलता में खुश हो " +
        "और आपकी परेशानी में आपका साथ दे।"
    },
    {
      id: "story-003",
      category: "Life",
      title: "वक्त की सीख",
      text:
        "जिंदगी हर दिन हमें कुछ नया सिखाती है। " +
        "जरूरत सिर्फ इतनी है कि हम हर अनुभव से सीखने की कोशिश करें।"
    },
    {
      id: "story-004",
      category: "Inspiration",
      title: "छोटी शुरुआत",
      text:
        "हर बड़ी सफलता की शुरुआत एक छोटे कदम से होती है। " +
        "छोटी शुरुआत को कभी छोटा मत समझिए।"
    },
    {
      id: "story-005",
      category: "Success",
      title: "लगातार प्रयास",
      text:
        "सफलता एक दिन में नहीं मिलती। " +
        "लेकिन रोज़ की मेहनत एक दिन सफलता जरूर बनाती है।"
    },
    {
      id: "story-006",
      category: "Education",
      title: "ज्ञान की ताकत",
      text:
        "ज्ञान वह संपत्ति है जिसे कोई आपसे छीन नहीं सकता। " +
        "सीखते रहिए और आगे बढ़ते रहिए।"
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
      new CustomEvent("arsStoryUpdated", {
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

  async function share(story) {
    const text =
      story.title +
      "\n\n" +
      story.text;

    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share({
          title: "ARS Story",
          text,
          url: window.location.href
        });

        return true;
      } catch {
        return false;
      }
    }

    return copy(
      text +
      "\n\n— ARS Story\n" +
      window.location.href
    );
  }

  function filter(category) {
    if (
      !category ||
      category.toLowerCase() === "all"
    ) {
      return [...stories];
    }

    return stories.filter(
      story =>
        story.category.toLowerCase() ===
        category.toLowerCase()
    );
  }

  function getFavorites() {
    const state = getState();

    return stories.filter(
      story => state.favorites[story.id]
    );
  }

  function getLiked() {
    const state = getState();

    return stories.filter(
      story => state.likes[story.id]
    );
  }

  function getSaved() {
    const state = getState();

    return stories.filter(
      story => state.saves[story.id]
    );
  }

  window.ARSStory = {
    data: stories,
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
