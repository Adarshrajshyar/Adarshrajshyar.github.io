/* =========================================================
   ARS SHAYARI SYSTEM — FINAL
   Categories:
   Love | Sad | Motivational | Friendship | Attitude
   ========================================================= */

(function (window) {
  "use strict";

  const CATEGORIES = [
    "love",
    "sad",
    "motivational",
    "friendship",
    "attitude"
  ];

  const DEFAULT_SHAYARI = [

    {
      id: "ARS-S-001",
      text: "दिल की बात हर किसी से कही नहीं जाती,\nसच्ची मोहब्बत हर किसी से की नहीं जाती।",
      category: "love",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-002",
      text: "कुछ दर्द खामोशी में भी सुनाई देते हैं,\nकुछ लोग दूर होकर भी दिल के पास रहते हैं।",
      category: "sad",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-003",
      text: "राह मुश्किल हो तो हौसला बढ़ाते रहो,\nगिरो अगर कभी तो फिर से उठते रहो।\nमंज़िल मिलेगी एक दिन मेहनत के साथ,\nबस अपने सपनों पर विश्वास रखते रहो।",
      category: "motivational",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-004",
      text: "दोस्ती नाम है साथ निभाने का,\nमुश्किल वक्त में हाथ थामने का।\nसच्चा दोस्त वही कहलाता है,\nजो बिना कहे दिल को समझ जाता है।",
      category: "friendship",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-005",
      text: "अंदाज़ अपना अलग रखते हैं,\nजो कहते हैं वो करके दिखाते हैं।\nभीड़ में चलना हमें पसंद नहीं,\nहम अपनी पहचान खुद बनाते हैं।",
      category: "attitude",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-006",
      text: "तेरी यादों का मौसम आज भी खास है,\nदिल के किसी कोने में तेरा एहसास है।",
      category: "love",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-007",
      text: "आँखों में नमी थी, चेहरे पर मुस्कान,\nकुछ रिश्ते दे जाते हैं ऐसी पहचान।",
      category: "sad",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-008",
      text: "आज की मेहनत ही कल की पहचान बनेगी,\nछोटी सी कोशिश एक दिन बड़ी उड़ान बनेगी।",
      category: "motivational",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-009",
      text: "यारी में कोई हिसाब नहीं होता,\nसच्चे दोस्ती में कोई नकाब नहीं होता।",
      category: "friendship",
      author: "Adarsh Raj"
    },

    {
      id: "ARS-S-010",
      text: "नाम छोटा हो सकता है,\nलेकिन पहचान बड़ी होनी चाहिए।\nलोग क्या कहते हैं छोड़ दो,\nअपनी कहानी खुद लिखनी चाहिए।",
      category: "attitude",
      author: "Adarsh Raj"
    }

  ];


  function getAll() {
    return window.ARS_STORAGE.getShayari();
  }


  function saveAll(data) {
    return window.ARS_STORAGE.saveShayari(data);
  }


  function createId() {
    return window.ARS_STORAGE.newId("ARS-S");
  }


  function normalize(item) {

    return {
      id: item.id || createId(),

      text: String(item.text || "").trim(),

      category: CATEGORIES.includes(
        String(item.category || "").toLowerCase()
      )
        ? String(item.category).toLowerCase()
        : "motivational",

      author:
        String(item.author || "").trim() ||
        "Adarsh Raj",

      createdAt:
        item.createdAt ||
        new Date().toISOString()
    };

  }


  /* Add default Shayari only if database is empty */
  function initialize() {

    const current = getAll();

    if (!Array.isArray(current) || current.length === 0) {

      saveAll(
        DEFAULT_SHAYARI.map(normalize)
      );

    }

  }


  function publish(data) {

    if (!data || !String(data.text || "").trim()) {
      throw new Error("Shayari text is required.");
    }

    const item = normalize(data);

    const list = getAll();

    list.unshift(item);

    saveAll(list);

    return item;

  }


  function update(id, data) {

    const list = getAll();

    const index = list.findIndex(
      item => String(item.id) === String(id)
    );

    if (index === -1) return null;

    list[index] = normalize({
      ...list[index],
      ...data,
      id: list[index].id
    });

    saveAll(list);

    return list[index];

  }


  function remove(id) {

    const list = getAll();

    const filtered = list.filter(
      item => String(item.id) !== String(id)
    );

    saveAll(filtered);

    return true;

  }


  function getByCategory(category) {

    if (!category || category === "all") {
      return getAll();
    }

    return getAll().filter(
      item =>
        String(item.category).toLowerCase() ===
        String(category).toLowerCase()
    );

  }


  function search(query) {

    const q =
      String(query || "").trim().toLowerCase();

    if (!q) return getAll();

    return getAll().filter(item => {

      return (
        String(item.text)
          .toLowerCase()
          .includes(q) ||

        String(item.author)
          .toLowerCase()
          .includes(q) ||

        String(item.category)
          .toLowerCase()
          .includes(q)
      );

    });

  }


  function getCategories() {
    return [...CATEGORIES];
  }


  /* Public ARS Shayari API */
  window.ARS_SHAYARI = {

    all: getAll,

    categories: getCategories,

    byCategory: getByCategory,

    search,

    publish,

    update,

    remove,

    initialize

  };


  initialize();

  console.log("🌹 ARS Shayari System Loaded");

})(window);
