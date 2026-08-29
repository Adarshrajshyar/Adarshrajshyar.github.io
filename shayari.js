/* =========================================================
   ARS SHAYARI SYSTEM
   ========================================================= */
(function (window) {
  "use strict";

  const DEFAULT_SHAYARI = [
    {
      id: "ARS-S-001",
      text: "मेहनत की राहों में कदम बढ़ाते रहो,\nअपने सपनों को हर दिन सजाते रहो।",
      category: "motivation",
      author: "Adarsh Raj",
      createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
      id: "ARS-S-002",
      text: "अंदाज़ अपना ऐसा रखो कि पहचान बन जाए,\nमेहनत इतनी करो कि मिसाल बन जाए।",
      category: "attitude",
      author: "Adarsh Raj",
      createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
      id: "ARS-S-003",
      text: "यारी में हिसाब नहीं, एहसास होता है,\nसच्चा दोस्त हर मौसम में पास होता है।",
      category: "friendship",
      author: "Adarsh Raj",
      createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
      id: "ARS-S-004",
      text: "दिल की बात शब्दों में कम ही आती है,\nसच्ची भावना आँखों से नज़र आती है।",
      category: "love",
      author: "Adarsh Raj",
      createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
      id: "ARS-S-005",
      text: "जो आज कठिन है, कल वही कहानी होगी,\nमेहनत के आगे हर मुश्किल पानी होगी।",
      category: "motivation",
      author: "Adarsh Raj",
      createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
      id: "ARS-S-006",
      text: "हार से मत डरना, यही जीत की शुरुआत है,\nचलते रहना ही मंज़िल की असली बात है।",
      category: "inspiration",
      author: "Adarsh Raj",
      createdAt: "2026-01-01T00:00:00.000Z"
    }
  ];

  function getAll() {
    if (!window.ARS_STORAGE) return DEFAULT_SHAYARI;

    let data = window.ARS_STORAGE.getShayari();

    if (!Array.isArray(data) || data.length === 0) {
      window.ARS_STORAGE.saveShayari(DEFAULT_SHAYARI);
      data = DEFAULT_SHAYARI;
    }

    return data;
  }

  function publish(data) {
    const item = {
      id:
        data.id ||
        window.ARS_STORAGE.newId("ARS-S"),
      text: String(data.text || "").trim(),
      category: String(data.category || "general").trim(),
      author: String(data.author || "Adarsh Raj").trim(),
      createdAt: new Date().toISOString()
    };

    if (!item.text) {
      throw new Error("Shayari text is required.");
    }

    const all = getAll();
    all.unshift(item);

    window.ARS_STORAGE.saveShayari(all);

    return item;
  }

  function remove(id) {
    const all = getAll().filter(
      item => String(item.id) !== String(id)
    );

    window.ARS_STORAGE.saveShayari(all);
  }

  function update(id, changes) {
    const all = getAll();
    const index = all.findIndex(
      item => String(item.id) === String(id)
    );

    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...changes,
      updatedAt: new Date().toISOString()
    };

    window.ARS_STORAGE.saveShayari(all);

    return all[index];
  }

  window.ARS_SHAYARI = {
    all: getAll,
    publish,
    remove,
    update
  };

  console.log("🌹 ARS Shayari System Loaded");
})(window);
