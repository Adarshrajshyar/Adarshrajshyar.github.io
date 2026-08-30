/* =========================================================
   ARS OFFICIAL — STORY & POETRY DATABASE
   ========================================================= */

(function (window) {

  "use strict";


  /* -------------------------------------------------------
     DEFAULT STORIES
     ------------------------------------------------------- */

  const DEFAULT_STORIES = [

    {

      id: "ST-M01",

      title: "आखिरी रहस्य",

      type: "story",

      category: "mystery",

      author: "Adarsh Raj",

      content:
        "पुराने घर के बंद कमरे से हर रात एक आवाज़ आती थी। " +
        "एक दिन हिम्मत करके दरवाज़ा खोला गया, लेकिन अंदर कोई नहीं था। " +
        "मेज़ पर सिर्फ एक पुरानी डायरी थी, जिसके पहले पन्ने पर लिखा था—" +
        "सच हमेशा सामने आता है।"

    },


    {

      id: "ST-H01",

      title: "पुराना कमरा",

      type: "story",

      category: "horror",

      author: "Adarsh Raj",

      content:
        "गाँव के पुराने घर में एक कमरा वर्षों से बंद था। " +
        "लोग उसके बारे में तरह-तरह की बातें करते थे। " +
        "एक सुबह दरवाज़ा खुला मिला और अंदर केवल धूल, पुरानी तस्वीरें " +
        "और बीते समय की यादें थीं।"

    },


    {

      id: "ST-B01",

      title: "एक प्रेरणादायक जीवन",

      type: "biography",

      category: "biography",

      author: "Adarsh Raj",

      content:
        "हर सफल व्यक्ति की कहानी में संघर्ष, सीख और निरंतर प्रयास " +
        "शामिल होते हैं। कठिन परिस्थितियाँ व्यक्ति को मजबूत बनाती हैं " +
        "और छोटे-छोटे कदम बड़े सपनों की ओर ले जाते हैं।"

    },


    {

      id: "ST-L01",

      title: "ज़िंदगी की राह",

      type: "story",

      category: "life",

      author: "Adarsh Raj",

      content:
        "ज़िंदगी हमेशा एक जैसी नहीं रहती। कभी रास्ते आसान होते हैं " +
        "और कभी कठिन। लेकिन हर अनुभव हमें कुछ नया सिखाता है और " +
        "आगे बढ़ने की ताकत देता है।"

    },


    {

      id: "ST-I01",

      title: "नई उम्मीद",

      type: "story",

      category: "inspiration",

      author: "Adarsh Raj",

      content:
        "जब रास्ता कठिन लगे, तब रुकने के बजाय एक छोटा कदम और आगे " +
        "बढ़ाना चाहिए। उम्मीद और मेहनत मिलकर असंभव लगने वाले काम को " +
        "भी संभव बना सकती हैं।"

    },


    {

      id: "ST-E01",

      title: "ज्ञान की शक्ति",

      type: "story",

      category: "education",

      author: "Adarsh Raj",

      content:
        "ज्ञान वह शक्ति है जो इंसान को सही निर्णय लेने और अपने सपनों " +
        "को समझदारी से पूरा करने में मदद करती है। सीखना कभी समाप्त नहीं होता।"

    },


    {

      id: "ST-F01",

      title: "सच्ची दोस्ती",

      type: "story",

      category: "friendship",

      author: "Adarsh Raj",

      content:
        "सच्चा मित्र वही होता है जो अच्छे समय में खुशी बाँटे और कठिन " +
        "समय में हिम्मत बढ़ाए। दोस्ती विश्वास और सम्मान से मजबूत होती है।"

    },


    {

      id: "ST-P01",

      title: "एक नई सुबह",

      type: "poem",

      category: "poetry",

      author: "Adarsh Raj",

      content:
        "नई सुबह नई आशा लाए,\n" +
        "हर मन में विश्वास जगाए।\n" +
        "मेहनत से आगे बढ़ते चलो,\n" +
        "सपनों को सच करते चलो।"

    },


    {

      id: "ST-P02",

      title: "सपनों की उड़ान",

      type: "poem",

      category: "poetry",

      author: "Adarsh Raj",

      content:
        "सपनों को पंख लगाओ,\n" +
        "मेहनत से उन्हें सजाओ।\n" +
        "राह कठिन हो चाहे जितनी,\n" +
        "हिम्मत से आगे बढ़ते जाओ।"

    }

  ];


  /* -------------------------------------------------------
     GET DATABASE
     ------------------------------------------------------- */

  function getDatabase() {

    const data =
      window.ARS_STORAGE.getStories();

    return Array.isArray(data)
      ? data
      : [];

  }


  /* -------------------------------------------------------
     SAVE DATABASE
     ------------------------------------------------------- */

  function saveDatabase(
    data
  ) {

    return window.ARS_STORAGE.saveStories(
      Array.isArray(data)
        ? data
        : []
    );

  }


  /* -------------------------------------------------------
     NORMALIZE STORY
     ------------------------------------------------------- */

  function normalize(
    data
  ) {

    data =
      data || {};


    return {

      id:
        data.id ||
        window.ARS_STORAGE.newId(
          "ARS-STORY"
        ),


      title:
        String(
          data.title || ""
        ).trim(),


      type:
        String(
          data.type || "story"
        ).trim(),


      category:
        String(
          data.category || "life"
        ).trim(),


      author:
        String(
          data.author ||
          "Adarsh Raj"
        ).trim(),


      content:
        String(
          data.content || ""
        ).trim(),


      createdAt:
        data.createdAt ||
        new Date().toISOString()

    };

  }


  /* -------------------------------------------------------
     INITIALIZE
     ------------------------------------------------------- */

  function initialize() {

    const current =
      getDatabase();


    if (
      !Array.isArray(current) ||
      current.length === 0
    ) {

      saveDatabase(

        DEFAULT_STORIES.map(
          normalize
        )

      );

    }

  }


  /* -------------------------------------------------------
     PUBLISH
     ------------------------------------------------------- */

  function publish(
    data
  ) {

    const item =
      normalize(data);


    if (!item.title) {

      throw new Error(
        "Title is required."
      );

    }


    if (!item.content) {

      throw new Error(
        "Content is required."
      );

    }


    const stories =
      getDatabase();


    stories.unshift(
      item
    );


    saveDatabase(
      stories
    );


    return item;

  }


  /* -------------------------------------------------------
     UPDATE
     ------------------------------------------------------- */

  function update(
    id,
    data
  ) {

    const stories =
      getDatabase();


    const index =
      stories.findIndex(
        item =>
          String(item.id) ===
          String(id)
      );


    if (index === -1) {

      return null;

    }


    const updated =
      normalize({

        ...stories[index],

        ...(data || {}),

        id:
          stories[index].id,

        createdAt:
          stories[index].createdAt

      });


    if (
      !updated.title ||
      !updated.content
    ) {

      throw new Error(
        "Title and content are required."
      );

    }


    stories[index] =
      updated;


    saveDatabase(
      stories
    );


    return updated;

  }


  /* -------------------------------------------------------
     REMOVE
     ------------------------------------------------------- */

  function remove(
    id
  ) {

    const stories =
      getDatabase();


    const updated =
      stories.filter(
        item =>
          String(item.id) !==
          String(id)
      );


    saveDatabase(
      updated
    );


    return true;

  }


  /* -------------------------------------------------------
     GET BY CATEGORY
     ------------------------------------------------------- */

  function byCategory(
    category
  ) {

    if (
      !category ||
      String(category)
        .toLowerCase() ===
      "all"
    ) {

      return getDatabase();

    }


    return getDatabase().filter(
      item =>
        String(item.category)
          .toLowerCase() ===
        String(category)
          .trim()
          .toLowerCase()
    );

  }


  /* -------------------------------------------------------
     SEARCH
     ------------------------------------------------------- */

  function search(
    query
  ) {

    const q =
      String(
        query || ""
      )
        .trim()
        .toLowerCase();


    if (!q) {

      return getDatabase();

    }


    return getDatabase().filter(
      item => {

        return (

          String(item.title)
            .toLowerCase()
            .includes(q)

          ||

          String(item.content)
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


  /* =======================================================
     PUBLIC ARS STORY API
     ======================================================= */

  window.ARS_STORY =
    Object.freeze({

      all:
        getDatabase,

      publish,

      update,

      remove,

      byCategory,

      search,

      initialize

    });


  /* -------------------------------------------------------
     START
     ------------------------------------------------------- */

  initialize();


  console.log(
    "📖 ARS Story & Poetry System Loaded"
  );


})(window);
