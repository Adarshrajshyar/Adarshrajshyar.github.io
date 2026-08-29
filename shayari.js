/* =========================================================
   ARS OFFICIAL WEBSITE — SHAYARI DATABASE
   ========================================================= */

(function (window) {

  "use strict";

  const DEFAULT_SHAYARI = [

    {
      id: "ARS-S001",
      text:
        "मेहनत की राहों में कदम बढ़ाते रहो,\n" +
        "अपने सपनों को हर दिन सजाते रहो।",
      category: "motivation",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S002",
      text:
        "दोस्ती वो नहीं जो वक्त के साथ बदल जाए,\n" +
        "दोस्ती वो है जो वक्त बदल दे फिर भी साथ निभाए।",
      category: "friendship",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S003",
      text:
        "दिल साफ हो तो हर राह आसान लगती है,\n" +
        "सच्ची कोशिश हो तो हर जीत महान लगती है।",
      category: "motivation",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S004",
      text:
        "खामोशी में भी कुछ बातें खास होती हैं,\n" +
        "सच्चे रिश्तों की अलग ही पहचान होती है।",
      category: "love",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S005",
      text:
        "अंदाज़ अपना ऐसा रखो कि पहचान बन जाए,\n" +
        "मेहनत इतनी करो कि मिसाल बन जाए।",
      category: "attitude",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S006",
      text:
        "हार से मत डरना, यही जीत की शुरुआत है,\n" +
        "चलते रहना ही तो मंज़िल की बात है।",
      category: "motivation",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S007",
      text:
        "यारी में हिसाब नहीं, एहसास होता है,\n" +
        "सच्चा दोस्त हर मौसम में पास होता है।",
      category: "friendship",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S008",
      text:
        "दिल की बात शब्दों में कम ही आती है,\n" +
        "सच्ची भावना आँखों से नज़र आती है।",
      category: "love",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S009",
      text:
        "जो आज कठिन है, कल वही कहानी होगी,\n" +
        "मेहनत के आगे हर मुश्किल पानी होगी।",
      category: "motivation",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S010",
      text:
        "वक्त बदलता है, इंसान की मेहनत नहीं,\n" +
        "जीत उसी की होती है जिसकी हिम्मत सही।",
      category: "attitude",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S011",
      text:
        "रास्ते चाहे कितने भी मुश्किल क्यों न हों,\n" +
        "हौसले बुलंद हों तो मंज़िल दूर नहीं।",
      category: "inspiration",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S012",
      text:
        "आज की मेहनत कल की पहचान बनेगी,\n" +
        "छोटी सी कोशिश एक दिन महान बनेगी।",
      category: "motivation",
      author: "Adarsh Raj"
    }

  ];

  function database() {

    return window.ARS_STORAGE.getShayari();

  }

  /* First installation */

  if (database().length === 0) {

    const prepared =
      DEFAULT_SHAYARI.map(item => ({

        ...item,

        createdAt:
          new Date().toISOString(),

        likes: 0

      }));

    window.ARS_STORAGE.saveShayari(
      prepared
    );

  }

  /* =========================
     PUBLISH SHAYARI
     ========================= */

  function publish(data) {

    if (!data || !data.text) {

      throw new Error(
        "Shayari text is required."
      );

    }

    const item = {

      id:
        data.id ||
        window.ARS_STORAGE.generateId(
          "ARS-S"
        ),

      text:
        String(data.text).trim(),

      category:
        data.category ||
        "general",

      author:
        data.author ||
        "Adarsh Raj",

      createdAt:
        new Date().toISOString(),

      likes: 0

    };

    const all = database();

    all.unshift(item);

    window.ARS_STORAGE.saveShayari(
      all
    );

    return item;

  }

  /* =========================
     DELETE
     ========================= */

  function remove(id) {

    const filtered =
      database().filter(
        item => item.id !== id
      );

    window.ARS_STORAGE.saveShayari(
      filtered
    );

  }

  /* =========================
     UPDATE
     ========================= */

  function update(id, changes) {

    const all = database();

    const index =
      all.findIndex(
        item => item.id === id
      );

    if (index === -1) return null;

    all[index] = {

      ...all[index],

      ...changes,

      id: all[index].id

    };

    window.ARS_STORAGE.saveShayari(
      all
    );

    return all[index];

  }

  /* =========================
     SEARCH
     ========================= */

  function search(query) {

    const q =
      String(query || "")
        .trim()
        .toLowerCase();

    if (!q) return database();

    return database().filter(item =>

      (
        item.text +
        " " +
        item.author +
        " " +
        item.category
      )
        .toLowerCase()
        .includes(q)

    );

  }

  window.ARS_SHAYARI = {

    all: database,

    publish,

    remove,

    update,

    search

  };

  console.log(
    "🌹 ARS Shayari Database Loaded"
  );

  console.log(
    "📖 Total Shayari:",
    database().length
  );

})(window);
