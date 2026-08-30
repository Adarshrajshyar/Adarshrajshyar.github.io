/* =========================================================
   ARS SHAYARI SYSTEM — FINAL
   Categories:
   Love | Sad | Motivational | Friendship | Attitude
   ========================================================= */

(function (window) {

  "use strict";


  /* -------------------------------------------------------
     CATEGORIES
     ------------------------------------------------------- */

  const CATEGORIES = [

    "love",

    "sad",

    "motivational",

    "friendship",

    "attitude"

  ];


  /* -------------------------------------------------------
     DEFAULT SHAYARI
     ------------------------------------------------------- */

  const DEFAULT_SHAYARI = [

    {

      id: "ARS-S-001",

      text:
        "दिल की बात हर किसी से कही नहीं जाती,\n" +
        "सच्ची मोहब्बत हर किसी से की नहीं जाती।",

      category: "love",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-002",

      text:
        "कुछ दर्द खामोशी में भी सुनाई देते हैं,\n" +
        "कुछ लोग दूर होकर भी दिल के पास रहते हैं।",

      category: "sad",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-003",

      text:
        "राह मुश्किल हो तो हौसला बढ़ाते रहो,\n" +
        "गिरो अगर कभी तो फिर से उठते रहो।\n" +
        "मंज़िल मिलेगी एक दिन मेहनत के साथ,\n" +
        "बस अपने सपनों पर विश्वास रखते रहो।",

      category: "motivational",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-004",

      text:
        "दोस्ती नाम है साथ निभाने का,\n" +
        "मुश्किल वक्त में हाथ थामने का।\n" +
        "सच्चा दोस्त वही कहलाता है,\n" +
        "जो बिना कहे दिल को समझ जाता है।",

      category: "friendship",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-005",

      text:
        "अंदाज़ अपना अलग रखते हैं,\n" +
        "जो कहते हैं वो करके दिखाते हैं।\n" +
        "भीड़ में चलना हमें पसंद नहीं,\n" +
        "हम अपनी पहचान खुद बनाते हैं।",

      category: "attitude",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-006",

      text:
        "तेरी यादों का मौसम आज भी खास है,\n" +
        "दिल के किसी कोने में तेरा एहसास है।",

      category: "love",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-007",

      text:
        "आँखों में नमी थी, चेहरे पर मुस्कान,\n" +
        "कुछ रिश्ते दे जाते हैं ऐसी पहचान।",

      category: "sad",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-008",

      text:
        "आज की मेहनत ही कल की पहचान बनेगी,\n" +
        "छोटी सी कोशिश एक दिन बड़ी उड़ान बनेगी।",

      category: "motivational",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-009",

      text:
        "यारी में कोई हिसाब नहीं होता,\n" +
        "सच्ची दोस्ती में कोई नकाब नहीं होता।",

      category: "friendship",

      author: "Adarsh Raj"

    },


    {

      id: "ARS-S-010",

      text:
        "नाम छोटा हो सकता है,\n" +
        "लेकिन पहचान बड़ी होनी चाहिए।\n" +
        "लोग क्या कहते हैं छोड़ दो,\n" +
        "अपनी कहानी खुद लिखनी चाहिए।",

      category: "attitude",

      author: "Adarsh Raj"

    }

  ];


  /* -------------------------------------------------------
     GET ALL
     ------------------------------------------------------- */

  function getAll() {

    const data =
      window.ARS_STORAGE.getShayari();

    return Array.isArray(data)
      ? data
      : [];

  }


  /* -------------------------------------------------------
     SAVE ALL
     ------------------------------------------------------- */

  function saveAll(data) {

    return window.ARS_STORAGE.saveShayari(
      Array.isArray(data)
        ? data
        : []
    );

  }


  /* -------------------------------------------------------
     CREATE ID
     ------------------------------------------------------- */

  function createId() {

    return window.ARS_STORAGE.newId(
      "ARS-S"
    );

  }


  /* -------------------------------------------------------
     NORMALIZE
     ------------------------------------------------------- */

  function normalize(item) {

    item =
      item || {};


    const category =
      String(
        item.category || ""
      )
        .trim()
        .toLowerCase();


    return {

      id:
        item.id ||
        createId(),


      text:
        String(
          item.text || ""
        ).trim(),


      category:
        CATEGORIES.includes(category)
          ? category
          : "motivational",


      author:
        String(
          item.author || ""
        ).trim() ||
        "Adarsh Raj",


      createdAt:
        item.createdAt ||
        new Date().toISOString()

    };

  }


  /* -------------------------------------------------------
     INITIALIZE DEFAULT DATA
     ------------------------------------------------------- */

  function initialize() {

    const current =
      getAll();


    if (
      !Array.isArray(current) ||
      current.length === 0
    ) {

      saveAll(
        DEFAULT_SHAYARI.map(
          normalize
        )
      );

    }

  }


  /* -------------------------------------------------------
     PUBLISH
     ------------------------------------------------------- */

  function publish(data) {

    if (
      !data ||
      !String(
        data.text || ""
      ).trim()
    ) {

      throw new Error(
        "Shayari text is required."
      );

    }


    const item =
      normalize(data);


    const list =
      getAll();


    list.unshift(item);


    saveAll(list);


    return item;

  }


  /* -------------------------------------------------------
     UPDATE
     ------------------------------------------------------- */

  function update(
    id,
    data
  ) {

    const list =
      getAll();


    const index =
      list.findIndex(
        item =>
          String(item.id) ===
          String(id)
      );


    if (index === -1) {
      return null;
    }


    list[index] =
      normalize({

        ...list[index],

        ...(data || {}),

        id:
          list[index].id

      });


    saveAll(list);


    return list[index];

  }


  /* -------------------------------------------------------
     REMOVE
     ------------------------------------------------------- */

  function remove(id) {

    const list =
      getAll();


    const filtered =
      list.filter(
        item =>
          String(item.id) !==
          String(id)
      );


    saveAll(filtered);


    return true;

  }


  /* -------------------------------------------------------
     GET BY CATEGORY
     ------------------------------------------------------- */

  function getByCategory(
    category
  ) {

    if (
      !category ||
      String(category)
        .toLowerCase() ===
      "all"
    ) {

      return getAll();

    }


    const cleanCategory =
      String(category)
        .trim()
        .toLowerCase();


    return getAll().filter(
      item =>
        String(item.category)
          .toLowerCase() ===
        cleanCategory
    );

  }


  /* -------------------------------------------------------
     SEARCH
     ------------------------------------------------------- */

  function search(query) {

    const q =
      String(
        query || ""
      )
        .trim()
        .toLowerCase();


    if (!q) {
      return getAll();
    }


    return getAll().filter(
      item => {

        return (

          String(item.text)
            .toLowerCase()
            .includes(q)

          ||

          String(item.author)
            .toLowerCase()
            .includes(q)

          ||

          String(item.category)
            .toLowerCase()
            .includes(q)

        );

      }
    );

  }


  /* -------------------------------------------------------
     CATEGORIES
     ------------------------------------------------------- */

  function getCategories() {

    return [
      ...CATEGORIES
    ];

  }


  /* =======================================================
     PUBLIC ARS SHAYARI API
     ======================================================= */

  window.ARS_SHAYARI = {

    all: getAll,

    categories:
      getCategories,

    byCategory:
      getByCategory,

    search,

    publish,

    update,

    remove,

    initialize

  };


  /* -------------------------------------------------------
     START
     ------------------------------------------------------- */

  initialize();


  console.log(
    "🌹 ARS Shayari System Loaded"
  );


})(window);
