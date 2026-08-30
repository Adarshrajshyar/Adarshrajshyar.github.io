/* =========================================================
   ARS OFFICIAL — SHAYARI DATABASE
   Adarsh Raj Shayar
   ========================================================= */

(function (window) {

  "use strict";


  /* =======================================================
     DEFAULT SHAYARI
     ======================================================= */

  const defaultShayari = [

    {
      id: "SH-M01",
      title: "खामोशी",
      category: "life",
      author: "Adarsh Raj",
      content:
        "खामोशी भी बहुत कुछ कह जाती है,\nजब दिल की बात जुबां तक नहीं आती है।"
    },


    {
      id: "SH-I01",
      title: "उम्मीद",
      category: "inspiration",
      author: "Adarsh Raj",
      content:
        "रास्ते चाहे कितने भी कठिन क्यों न हों,\nउम्मीद का एक कदम मंज़िल के करीब ले जाता है।"
    },


    {
      id: "SH-L01",
      title: "ज़िंदगी",
      category: "life",
      author: "Adarsh Raj",
      content:
        "ज़िंदगी हर दिन एक नया सबक सिखाती है,\nबस सीखने की नज़र होनी चाहिए।"
    },


    {
      id: "SH-F01",
      title: "दोस्ती",
      category: "friendship",
      author: "Adarsh Raj",
      content:
        "दोस्ती नाम है विश्वास का,\nसाथ हो तो हर रास्ता आसान लगता है।"
    },


    {
      id: "SH-E01",
      title: "ज्ञान",
      category: "education",
      author: "Adarsh Raj",
      content:
        "ज्ञान की रोशनी जहाँ होती है,\nवहाँ अज्ञान की अंधेरी राह छोटी होती है।"
    },


    {
      id: "SH-M02",
      title: "यादें",
      category: "emotions",
      author: "Adarsh Raj",
      content:
        "कुछ यादें वक्त के साथ पुरानी नहीं होतीं,\nवे दिल के किसी कोने में हमेशा जिंदा रहती हैं।"
    },


    {
      id: "SH-I02",
      title: "नई शुरुआत",
      category: "inspiration",
      author: "Adarsh Raj",
      content:
        "कल चाहे जैसा भी रहा हो,\nआज एक नई शुरुआत करने का दिन है।"
    },


    {
      id: "SH-S01",
      title: "सपने",
      category: "dreams",
      author: "Adarsh Raj",
      content:
        "सपने वही नहीं जो नींद में दिखाई दें,\nसपने वो हैं जो जागकर पूरे किए जाएँ।"
    }

  ];


  /* =======================================================
     DATABASE
     ======================================================= */

  function getDatabase() {

    return window.ARS_STORAGE
      .getShayari();

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initialize() {

    const current =
      getDatabase();


    if (
      !Array.isArray(current) ||
      current.length === 0
    ) {

      const now =
        new Date().toISOString();


      const prepared =
        defaultShayari.map(
          function (item) {

            return {

              ...item,

              createdAt:
                now,

              updatedAt:
                now

            };

          }
        );


      window.ARS_STORAGE
        .saveShayari(
          prepared
        );

    }

  }


  /* =======================================================
     PUBLISH
     ======================================================= */

  function publish(data = {}) {

    const title =
      String(
        data.title || ""
      ).trim();


    const content =
      String(
        data.content || ""
      ).trim();


    if (!title) {

      throw new Error(
        "Shayari title is required."
      );

    }


    if (!content) {

      throw new Error(
        "Shayari content is required."
      );

    }


    const now =
      new Date().toISOString();


    const item = {

      id:
        data.id ||
        window.ARS_STORAGE
          .newId("ARS-SHAYARI"),

      title,

      category:
        String(
          data.category ||
          "life"
        ).trim(),

      author:
        String(
          data.author ||
          (
            window.ARS_CONFIG &&
            window.ARS_CONFIG.publisher &&
            window.ARS_CONFIG.publisher.name
          ) ||
          "Adarsh Raj"
        ).trim(),

      content,

      createdAt:
        data.createdAt ||
        now,

      updatedAt:
        now

    };


    const shayari =
      getDatabase();


    /* Update existing item */

    const existingIndex =
      shayari.findIndex(
        function (entry) {

          return String(entry.id) ===
            String(item.id);

        }
      );


    if (existingIndex !== -1) {

      shayari[existingIndex] =
        item;

    } else {

      shayari.unshift(item);

    }


    window.ARS_STORAGE
      .saveShayari(
        shayari
      );


    return item;

  }


  /* =======================================================
     REMOVE
     ======================================================= */

  function remove(id) {

    const cleanID =
      String(id);


    const updated =
      getDatabase()
        .filter(
          function (item) {

            return String(item.id) !==
              cleanID;

          }
        );


    window.ARS_STORAGE
      .saveShayari(
        updated
      );


    return updated;

  }


  /* =======================================================
     FIND
     ======================================================= */

  function find(id) {

    if (!id) {
      return null;
    }


    return getDatabase()
      .find(
        function (item) {

          return String(item.id) ===
            String(id);

        }
      ) || null;

  }


  /* =======================================================
     SEARCH
     ======================================================= */

  function search(query = "") {

    const keyword =
      String(query)
        .trim()
        .toLowerCase();


    if (!keyword) {

      return getDatabase();

    }


    return getDatabase()
      .filter(
        function (item) {

          const text = [

            item.title,

            item.content,

            item.author,

            item.category

          ]
            .join(" ")
            .toLowerCase();


          return text.includes(
            keyword
          );

        }
      );

  }


  /* =======================================================
     CATEGORY FILTER
     ======================================================= */

  function byCategory(category) {

    const cleanCategory =
      String(category)
        .trim()
        .toLowerCase();


    if (
      !cleanCategory ||
      cleanCategory === "all"
    ) {

      return getDatabase();

    }


    return getDatabase()
      .filter(
        function (item) {

          return String(
            item.category
          )
            .trim()
            .toLowerCase() ===
            cleanCategory;

        }
      );

  }


  /* =======================================================
     INITIALIZE DATABASE
     ======================================================= */

  initialize();


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.ARS_SHAYARI =
    Object.freeze({

      all:
        getDatabase,

      publish,

      remove,

      find,

      search,

      byCategory

    });


  console.log(
    "✍️ ARS Shayari System Loaded"
  );


})(window);
