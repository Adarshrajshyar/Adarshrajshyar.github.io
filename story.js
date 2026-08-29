/* =========================================================
   ARS OFFICIAL — STORY & POETRY DATABASE
   ========================================================= */

(function (window) {
  "use strict";

  const DEFAULT_STORIES = [
    {
      id: "ARS-ST001",
      title: "एक कदम और",
      type: "story",
      category: "motivation",
      author: "Adarsh Raj",
      content:
        "जब रास्ता कठिन लगे, तब रुकने के बजाय एक कदम और आगे बढ़ना चाहिए। " +
        "छोटी-छोटी कोशिशें मिलकर बड़ी उपलब्धि बनाती हैं।"
    },

    {
      id: "ARS-ST002",
      title: "सच्ची दोस्ती",
      type: "story",
      category: "friendship",
      author: "Adarsh Raj",
      content:
        "सच्चा मित्र वही है जो खुशी में मुस्कुराए और कठिन समय में हिम्मत बढ़ाए। " +
        "दोस्ती विश्वास, सम्मान और साथ का नाम है।"
    },

    {
      id: "ARS-ST003",
      title: "नई शुरुआत",
      type: "story",
      category: "life",
      author: "Adarsh Raj",
      content:
        "हर नया दिन अपने साथ एक नया अवसर लेकर आता है। " +
        "बीती बातों से सीखकर आज को बेहतर बनाना ही आगे बढ़ने का सही रास्ता है।"
    },

    {
      id: "ARS-ST004",
      title: "सपनों की उड़ान",
      type: "story",
      category: "inspiration",
      author: "Adarsh Raj",
      content:
        "सपने केवल देखने के लिए नहीं होते। उन्हें पूरा करने के लिए " +
        "मेहनत, धैर्य और लगातार प्रयास की जरूरत होती है।"
    },

    {
      id: "ARS-ST005",
      title: "ज्ञान की रोशनी",
      type: "story",
      category: "education",
      author: "Adarsh Raj",
      content:
        "ज्ञान ऐसी रोशनी है जो अंधेरे रास्तों में भी दिशा दिखाती है। " +
        "सीखने वाला व्यक्ति हर अनुभव से कुछ नया प्राप्त करता है।"
    },

    {
      id: "ARS-ST006",
      title: "हिम्मत",
      type: "story",
      category: "inspiration",
      author: "Adarsh Raj",
      content:
        "मुश्किलें जीवन का हिस्सा हैं। उनसे डरने के बजाय समझदारी से " +
        "उनका सामना करना और समाधान खोजना ही असली हिम्मत है।"
    },

    {
      id: "ARS-ST007",
      title: "समय का मूल्य",
      type: "story",
      category: "life",
      author: "Adarsh Raj",
      content:
        "समय एक ऐसी संपत्ति है जिसे वापस नहीं पाया जा सकता। " +
        "इसलिए हर दिन का सही उपयोग भविष्य को बेहतर बनाने में मदद करता है।"
    },

    {
      id: "ARS-ST008",
      title: "मेहनत की जीत",
      type: "story",
      category: "motivation",
      author: "Adarsh Raj",
      content:
        "सफलता हमेशा तुरंत नहीं मिलती। लगातार मेहनत करते रहने वाला व्यक्ति " +
        "धीरे-धीरे अपनी मंज़िल के करीब पहुँचता है।"
    },

    {
      id: "ARS-P001",
      title: "उम्मीद",
      type: "poem",
      category: "inspiration",
      author: "Adarsh Raj",
      content:
        "उम्मीद रखो, कदम बढ़ाओ,\n" +
        "मेहनत से सपने सजाओ।\n" +
        "राह कठिन हो, फिर भी चलो,\n" +
        "हर दिन खुद को बेहतर बनाओ।"
    },

    {
      id: "ARS-P002",
      title: "मंज़िल",
      type: "poem",
      category: "motivation",
      author: "Adarsh Raj",
      content:
        "राहों में चाहे धूप मिले,\n" +
        "कदमों को फिर भी रुकना नहीं।\n" +
        "मेहनत से जो रिश्ता रखे,\n" +
        "उसको कभी झुकना नहीं।"
    }
  ];

  function database() {
    return window.ARS_STORAGE.getStories();
  }

  /* First installation */

  if (database().length === 0) {
    const prepared = DEFAULT_STORIES.map(item => ({
      ...item,
      createdAt: new Date().toISOString(),
      likes: 0
    }));

    window.ARS_STORAGE.saveStories(prepared);
  }

  /* =========================
     PUBLISH
     ========================= */

  function publish(data) {
    if (!data || !data.title || !data.content) {
      throw new Error(
        "Story title and content are required."
      );
    }

    const item = {
      id:
        data.id ||
        window.ARS_STORAGE.generateId("ARS-ST"),

      title: String(data.title).trim(),

      content: String(data.content).trim(),

      type: data.type || "story",

      category: data.category || "general",

      author: data.author || "Adarsh Raj",

      createdAt: new Date().toISOString(),

      likes: 0
    };

    const all = database();

    all.unshift(item);

    window.ARS_STORAGE.saveStories(all);

    return item;
  }

  /* =========================
     DELETE
     ========================= */

  function remove(id) {
    const filtered = database().filter(
      item => item.id !== id
    );

    window.ARS_STORAGE.saveStories(filtered);
  }

  /* =========================
     UPDATE
     ========================= */

  function update(id, changes) {
    const all = database();

    const index = all.findIndex(
      item => item.id === id
    );

    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...changes,
      id: all[index].id
    };

    window.ARS_STORAGE.saveStories(all);

    return all[index];
  }

  /* =========================
     SEARCH
     ========================= */

  function search(query) {
    const q = String(query || "")
      .trim()
      .toLowerCase();

    if (!q) return database();

    return database().filter(item =>
      (
        item.title +
        " " +
        item.content +
        " " +
        item.author +
        " " +
        item.category
      )
        .toLowerCase()
        .includes(q)
    );
  }

  window.ARS_STORY = {
    all: database,
    publish,
    remove,
    update,
    search
  };

  console.log(
    "📖 ARS Story & Poetry Database Loaded"
  );

  console.log(
    "📚 Total Entries:",
    database().length
  );

})(window);
