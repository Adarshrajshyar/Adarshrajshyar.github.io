"use strict";

/*
========================================================
ARS OFFICIAL
Shayari Data & Dynamic Rendering Engine
Version: 6.0.0
========================================================

Purpose:
- Store ARS Shayari content
- Render Shayari dynamically
- Category filtering
- Search
- Like / Favorite / Save
- Copy / Share
- Publisher-ready structure
========================================================
*/


/* ======================================================
   SHAYARI DATA
====================================================== */

const ARS_SHAYARI = [

  /* =========================
     LOVE
  ========================= */

  {
    id: "love-001",
    category: "love",
    title: "तेरा एहसास",
    text: `तेरी यादों का असर आज भी रहता है,
तेरा नाम दिल के पास ही रहता है।
दूर होकर भी तू दूर नहीं लगता,
क्योंकि तेरा एहसास मेरे साथ ही रहता है।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "love-002",
    category: "love",
    title: "शब्द और एहसास",
    text: `कहने को तो शब्द बहुत हैं,
पर तेरे लिए कम पड़ जाते हैं।
जब भी लिखता हूँ तेरा नाम,
मेरे जज़्बात शायरी बन जाते हैं।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "love-003",
    category: "love",
    title: "दिल की बात",
    text: `दिल की बात जुबाँ से कहाँ कही जाती है,
कुछ बातें आँखों से भी समझी जाती हैं।
जिसे दिल अपना मान ले एक बार,
उसकी याद उम्र भर साथ चली जाती है।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },


  /* =========================
     SAD
  ========================= */

  {
    id: "sad-001",
    category: "sad",
    title: "कुछ रिश्ते",
    text: `कुछ रिश्ते आवाज़ नहीं करते,
फिर भी दिल में बहुत शोर करते हैं।
लोग दूर होकर भी याद रहते हैं,
और कुछ पास होकर भी दूर लगते हैं।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "sad-002",
    category: "sad",
    title: "खामोशी",
    text: `खामोशी भी कभी-कभी बहुत कुछ कह जाती है,
आँखों की नमी दिल की बात बता जाती है।
हर दर्द को शब्द मिलें ये जरूरी तो नहीं,
कुछ कहानी बिना कहे ही रह जाती है।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "sad-003",
    category: "sad",
    title: "यादें",
    text: `वक्त गुजर जाता है मगर यादें नहीं जातीं,
कुछ बातें दिल से कभी मिट नहीं पातीं।
हम मुस्कुराकर दुनिया को सब बता देते हैं,
पर अंदर की बातें सबसे छुपी रह जाती हैं।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },


  /* =========================
     MOTIVATIONAL
  ========================= */

  {
    id: "motivational-001",
    category: "motivational",
    title: "हिम्मत",
    text: `रास्ते कठिन हैं तो चलना सीख,
गिर जाएँ तो फिर संभलना सीख।
मंज़िल उन्हीं को मिलती है आखिर,
जो हार के बाद भी लड़ना सीख।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "motivational-002",
    category: "motivational",
    title: "मेहनत",
    text: `मेहनत का कोई रास्ता छोटा नहीं होता,
सच्चे इरादों का कोई तोड़ नहीं होता।
आज अगर वक्त थोड़ा मुश्किल है,
तो कल सफलता से बेहतर कुछ नहीं होता।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "motivational-003",
    category: "motivational",
    title: "मंज़िल",
    text: `मंज़िल पाने का जुनून बनाए रखना,
मुश्किलों में भी खुद को संभाले रखना।
लोग क्या कहते हैं इसकी फिक्र मत करना,
बस अपने सपनों को हमेशा जिंदा रखना।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },


  /* =========================
     FRIENDSHIP
  ========================= */

  {
    id: "friendship-001",
    category: "friendship",
    title: "सच्ची दोस्ती",
    text: `दोस्ती नाम है उस रिश्ते का,
जहाँ हिसाब नहीं होता।
सच्चा दोस्त वही होता है,
जो साथ हो तो कोई डर नहीं होता।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "friendship-002",
    category: "friendship",
    title: "दोस्त",
    text: `दोस्त वही जो मुश्किल में काम आए,
बिना कहे दिल की बात समझ जाए।
दुनिया चाहे कितनी भी बदल जाए,
सच्चा दोस्त फिर भी साथ निभाए।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "friendship-003",
    category: "friendship",
    title: "यारी",
    text: `यारी में कोई शर्त नहीं होती,
सच्चे दोस्तों में दूरी नहीं होती।
वक्त बदल सकता है हालात बदल सकते हैं,
पर सच्ची दोस्ती कभी कम नहीं होती।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },


  /* =========================
     ATTITUDE
  ========================= */

  {
    id: "attitude-001",
    category: "attitude",
    title: "पहचान",
    text: `हमारी पहचान किसी नाम की मोहताज नहीं,
हमारी मेहनत ही हमारी पहचान है।
जो समझते हैं हमें कमज़ोर,
उन्हें वक्त देगा असली जवाब।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "attitude-002",
    category: "attitude",
    title: "अपना रास्ता",
    text: `भीड़ में चलना हमारी आदत नहीं,
हम अपना रास्ता खुद बनाते हैं।
जो हमें रोकने की कोशिश करते हैं,
हम उन्हें देखकर और आगे बढ़ जाते हैं।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  },

  {
    id: "attitude-003",
    category: "attitude",
    title: "स्वाभिमान",
    text: `झुकना हमें आता है मगर हर किसी के सामने नहीं,
रिश्ते निभाते हैं मगर अपने सम्मान के बिना नहीं।
हमारी खामोशी को कमजोरी मत समझना,
जरूरत पड़े तो जवाब देने में देर नहीं।`,
    author: "Adarsh Raj Shayar",
    status: "published"
  }

];


/* ======================================================
   CATEGORY HELPERS
====================================================== */

const ARS_SHAYARI_CATEGORIES = {
  love: {
    name: "प्रेम",
    icon: "❤️"
  },

  sad: {
    name: "दर्द",
    icon: "💔"
  },

  motivational: {
    name: "प्रेरणादायक",
    icon: "🔥"
  },

  friendship: {
    name: "दोस्ती",
    icon: "🤝"
  },

  attitude: {
    name: "एटीट्यूड",
    icon: "👑"
  }
};


/* ======================================================
   GET SHAYARI
====================================================== */

function arsGetShayari() {

  let publisherData = [];

  try {

    if (
      typeof ARS_STORAGE !== "undefined" &&
      typeof ARS_STORAGE.getArray === "function"
    ) {
      publisherData =
        ARS_STORAGE.getArray("ARS_PUBLISHED_SHAYARI") || [];
    }

  } catch (error) {

    console.warn(
      "ARS published Shayari could not be loaded.",
      error
    );

  }


  const combined = [
    ...ARS_SHAYARI,
    ...publisherData
  ];


  const unique = [];
  const ids = new Set();


  combined.forEach(item => {

    if (!item || !item.id) return;

    if (ids.has(item.id)) return;

    ids.add(item.id);

    if (
      item.status === "draft" ||
      item.status === "unpublished"
    ) {
      return;
    }

    unique.push(item);

  });


  return unique;
}


/* ======================================================
   FIND SHAYARI
====================================================== */

function arsFindShayari(id) {

  if (!id) return null;

  return arsGetShayari().find(
    item => String(item.id) === String(id)
  ) || null;
}


/* ======================================================
   CATEGORY NAME
====================================================== */

function arsShayariCategoryName(category) {

  const key =
    String(category || "").toLowerCase();

  return (
    ARS_SHAYARI_CATEGORIES[key]?.name ||
    category ||
    "शायरी"
  );
}


/* ======================================================
   CATEGORY ICON
====================================================== */

function arsShayariCategoryIcon(category) {

  const key =
    String(category || "").toLowerCase();

  return (
    ARS_SHAYARI_CATEGORIES[key]?.icon ||
    "✍️"
  );
}


/* ======================================================
   ESCAPE HTML
====================================================== */

function arsEscapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ======================================================
   RENDER SHAYARI CARD
====================================================== */

function arsRenderShayariCard(item) {

  if (!item) return "";

  const text =
    String(item.text || "").trim();

  const category =
    String(item.category || "").toLowerCase();

  const categoryName =
    arsShayariCategoryName(category);

  const categoryIcon =
    arsShayariCategoryIcon(category);

  const searchText =
    `${item.title || ""}
     ${categoryName}
     ${text}
     ${item.author || ""}`
    .replace(/\s+/g, " ")
    .trim();


  return `
    <article
      class="shayari-card reveal"
      data-shayari-card
      data-category="${arsEscapeHTML(category)}"
      data-search="${arsEscapeHTML(searchText)}"
      data-shayari-id="${arsEscapeHTML(item.id)}"
    >

      <span class="shayari-category">
        ${categoryIcon} ${arsEscapeHTML(categoryName)}
      </span>

      ${
        item.title
          ? `<h3>${arsEscapeHTML(item.title)}</h3>`
          : ""
      }

      <p class="shayari-text">${arsEscapeHTML(text)}</p>

      <div class="shayari-author">
        — ${arsEscapeHTML(item.author || "Adarsh Raj Shayar")}
      </div>

      <div class="shayari-actions">

        <button
          class="shayari-action"
          type="button"
          data-like-id="${arsEscapeHTML(item.id)}"
          aria-label="Like Shayari"
        >
          ❤️ Like
        </button>

        <button
          class="shayari-action"
          type="button"
          data-favorite-id="${arsEscapeHTML(item.id)}"
          aria-label="Add to favorites"
        >
          ⭐ Favorite
        </button>

        <button
          class="shayari-action"
          type="button"
          data-save-id="${arsEscapeHTML(item.id)}"
          aria-label="Save Shayari"
        >
          🔖 Save
        </button>

        <button
          class="shayari-action"
          type="button"
          data-copy="${arsEscapeHTML(text)}"
          aria-label="Copy Shayari"
        >
          📋 Copy
        </button>

        <button
          class="shayari-action"
          type="button"
          data-share-text="${arsEscapeHTML(text)}"
          aria-label="Share Shayari"
        >
          ↗️ Share
        </button>

      </div>

    </article>
  `;
}


/* ======================================================
   RENDER ALL SHAYARI
====================================================== */

function arsRenderShayari(options = {}) {

  const selector =
    options.container ||
    "#shayariGrid";

  const container =
    document.querySelector(selector);

  if (!container) return;


  const items =
    arsGetShayari();


  if (!items.length) {

    container.innerHTML = "";

    const empty =
      document.getElementById("shayariEmpty");

    if (empty) {
      empty.classList.add("show");
    }

    return;
  }


  container.innerHTML =
    items.map(
      arsRenderShayariCard
    ).join("");


  if (
    typeof window.ARS_APP !== "undefined" &&
    typeof window.ARS_APP.init === "function"
  ) {
    try {
      window.ARS_APP.init();
    } catch (error) {
      console.warn(
        "ARS app refresh failed.",
        error
      );
    }
  }

}


/* ======================================================
   GET CATEGORY LIST
====================================================== */

function arsGetShayariCategories() {

  return Object.keys(
    ARS_SHAYARI_CATEGORIES
  );

}


/* ======================================================
   GET CATEGORY SHAYARI
====================================================== */

function arsGetShayariByCategory(category) {

  const key =
    String(category || "")
      .toLowerCase()
      .trim();

  if (!key || key === "all") {
    return arsGetShayari();
  }

  return arsGetShayari().filter(
    item =>
      String(item.category || "")
        .toLowerCase() === key
  );

}


/* ======================================================
   SEARCH SHAYARI
====================================================== */

function arsSearchShayari(query) {

  const search =
    String(query || "")
      .toLowerCase()
      .trim();

  if (!search) {
    return arsGetShayari();
  }


  return arsGetShayari().filter(item => {

    const searchable =
      `
      ${item.title || ""}
      ${item.category || ""}
      ${item.text || ""}
      ${item.author || ""}
      `
      .toLowerCase();


    return searchable.includes(search);

  });

}


/* ======================================================
   ADD SHAYARI
====================================================== */

function arsAddShayari(data) {

  if (!data || !data.text) {
    return {
      success: false,
      message: "Shayari text is required."
    };
  }


  const item = {

    id:
      data.id ||
      `shayari-${Date.now()}`,

    category:
      data.category ||
      "general",

    title:
      data.title ||
      "",

    text:
      String(data.text).trim(),

    author:
      data.author ||
      "Adarsh Raj Shayar",

    status:
      data.status ||
      "draft",

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString()

  };


  try {

    if (
      typeof ARS_STORAGE !== "undefined" &&
      typeof ARS_STORAGE.getArray === "function"
    ) {

      const current =
        ARS_STORAGE.getArray(
          "ARS_PUBLISHED_SHAYARI"
        ) || [];


      current.push(item);


      ARS_STORAGE.set(
        "ARS_PUBLISHED_SHAYARI",
        current
      );


      return {
        success: true,
        item
      };

    }

  } catch (error) {

    console.error(
      "Could not save Shayari.",
      error
    );

  }


  return {
    success: false,
    message: "Storage unavailable."
  };

}


/* ======================================================
   UPDATE SHAYARI
====================================================== */

function arsUpdateShayari(id, updates = {}) {

  if (!id) return false;


  try {

    if (
      typeof ARS_STORAGE === "undefined" ||
      typeof ARS_STORAGE.getArray !== "function"
    ) {
      return false;
    }


    const items =
      ARS_STORAGE.getArray(
        "ARS_PUBLISHED_SHAYARI"
      ) || [];


    const index =
      items.findIndex(
        item =>
          String(item.id) === String(id)
      );


    if (index === -1) {
      return false;
    }


    items[index] = {

      ...items[index],
      ...updates,

      id: items[index].id,

      updatedAt:
        new Date().toISOString()

    };


    ARS_STORAGE.set(
      "ARS_PUBLISHED_SHAYARI",
      items
    );


    return true;

  } catch (error) {

    console.error(
      "Could not update Shayari.",
      error
    );

    return false;

  }

}


/* ======================================================
   DELETE SHAYARI
====================================================== */

function arsDeleteShayari(id) {

  if (!id) return false;


  try {

    if (
      typeof ARS_STORAGE === "undefined" ||
      typeof ARS_STORAGE.getArray !== "function"
    ) {
      return false;
    }


    const items =
      ARS_STORAGE.getArray(
        "ARS_PUBLISHED_SHAYARI"
      ) || [];


    const filtered =
      items.filter(
        item =>
          String(item.id) !== String(id)
      );


    if (filtered.length === items.length) {
      return false;
    }


    ARS_STORAGE.set(
      "ARS_PUBLISHED_SHAYARI",
      filtered
    );


    return true;

  } catch (error) {

    console.error(
      "Could not delete Shayari.",
      error
    );

    return false;

  }

}


/* ======================================================
   SHAYARI STATISTICS
====================================================== */

function arsGetShayariStats() {

  const items =
    arsGetShayari();


  const stats = {

    total: items.length,

    love: 0,

    sad: 0,

    motivational: 0,

    friendship: 0,

    attitude: 0,

    other: 0

  };


  items.forEach(item => {

    const category =
      String(item.category || "")
        .toLowerCase();


    if (
      Object.prototype.hasOwnProperty.call(
        stats,
        category
      )
    ) {

      stats[category]++;

    } else {

      stats.other++;

    }

  });


  return stats;

}


/* ======================================================
   GLOBAL EXPORTS
====================================================== */

window.ARS_SHAYARI =
  ARS_SHAYARI;

window.ARS_SHAYARI_CATEGORIES =
  ARS_SHAYARI_CATEGORIES;

window.arsGetShayari =
  arsGetShayari;

window.arsFindShayari =
  arsFindShayari;

window.arsRenderShayari =
  arsRenderShayari;

window.arsRenderShayariCard =
  arsRenderShayariCard;

window.arsGetShayariCategories =
  arsGetShayariCategories;

window.arsGetShayariByCategory =
  arsGetShayariByCategory;

window.arsSearchShayari =
  arsSearchShayari;

window.arsShayariCategoryName =
  arsShayariCategoryName;

window.arsShayariCategoryIcon =
  arsShayariCategoryIcon;

window.arsAddShayari =
  arsAddShayari;

window.arsUpdateShayari =
  arsUpdateShayari;

window.arsDeleteShayari =
  arsDeleteShayari;

window.arsGetShayariStats =
  arsGetShayariStats;


/* ======================================================
   AUTO INITIALIZATION
====================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    /*
      Current shayari.html already contains
      starter cards, so dynamic rendering is
      intentionally not forced here.

      Publisher/admin pages can call:

      arsRenderShayari();

      whenever they need database/localStorage
      content to be rendered.
    */

    window.ARS_SHAYARI_READY = true;

  }
);
