/* =========================================================
   ARS OFFICIAL — STORY & POETRY DATABASE
   ========================================================= */
(function (w) {
  "use strict";

  const defaultStories = [
    {
      id: "ST-M01",
      title: "आखिरी रहस्य",
      type: "story",
      category: "mystery",
      author: "Adarsh Raj",
      content:
        "पुराने घर के बंद कमरे से हर रात एक आवाज़ आती थी। एक दिन हिम्मत करके दरवाज़ा खोला गया, लेकिन अंदर कोई नहीं था। मेज़ पर सिर्फ एक पुरानी डायरी थी, जिसके पहले पन्ने पर लिखा था—सच हमेशा सामने आता है।"
    },
    {
      id: "ST-H01",
      title: "पुराना कमरा",
      type: "story",
      category: "horror",
      author: "Adarsh Raj",
      content:
        "गाँव के पुराने घर में एक कमरा वर्षों से बंद था। लोग उसके बारे में तरह-तरह की बातें करते थे। एक सुबह दरवाज़ा खुला मिला और अंदर केवल धूल, पुरानी तस्वीरें और बीते समय की यादें थीं।"
    },
    {
      id: "ST-B01",
      title: "एक प्रेरणादायक जीवन",
      type: "biography",
      category: "biography",
      author: "Adarsh Raj",
      content:
        "हर सफल व्यक्ति की कहानी में संघर्ष, सीख और निरंतर प्रयास शामिल होते हैं। कठिन परिस्थितियाँ व्यक्ति को मजबूत बनाती हैं और छोटे-छोटे कदम बड़े सपनों की ओर ले जाते हैं।"
    },
    {
      id: "ST-L01",
      title: "ज़िंदगी की राह",
      type: "story",
      category: "life",
      author: "Adarsh Raj",
      content:
        "ज़िंदगी हमेशा एक जैसी नहीं रहती। कभी रास्ते आसान होते हैं और कभी कठिन। लेकिन हर अनुभव हमें कुछ नया सिखाता है और आगे बढ़ने की ताकत देता है।"
    },
    {
      id: "ST-I01",
      title: "नई उम्मीद",
      type: "story",
      category: "inspiration",
      author: "Adarsh Raj",
      content:
        "जब रास्ता कठिन लगे, तब रुकने के बजाय एक छोटा कदम और आगे बढ़ाना चाहिए। उम्मीद और मेहनत मिलकर असंभव लगने वाले काम को भी संभव बना सकती हैं।"
    },
    {
      id: "ST-E01",
      title: "ज्ञान की शक्ति",
      type: "story",
      category: "education",
      author: "Adarsh Raj",
      content:
        "ज्ञान वह शक्ति है जो इंसान को सही निर्णय लेने और अपने सपनों को समझदारी से पूरा करने में मदद करती है। सीखना कभी समाप्त नहीं होता।"
    },
    {
      id: "ST-F01",
      title: "सच्ची दोस्ती",
      type: "story",
      category: "friendship",
      author: "Adarsh Raj",
      content:
        "सच्चा मित्र वही होता है जो अच्छे समय में खुशी बाँटे और कठिन समय में हिम्मत बढ़ाए। दोस्ती विश्वास और सम्मान से मजबूत होती है।"
    },
    {
      id: "ST-P01",
      title: "एक नई सुबह",
      type: "poem",
      category: "poetry",
      author: "Adarsh Raj",
      content:
        "नई सुबह नई आशा लाए,\nहर मन में विश्वास जगाए।\nमेहनत से आगे बढ़ते चलो,\nसपनों को सच करते चलो।"
    },
    {
      id: "ST-P02",
      title: "सपनों की उड़ान",
      type: "poem",
      category: "poetry",
      author: "Adarsh Raj",
      content:
        "सपनों को पंख लगाओ,\nमेहनत से उन्हें सजाओ।\nराह कठिन हो चाहे जितनी,\nहिम्मत से आगे बढ़ते जाओ।"
    }
  ];

  function getDatabase() {
    return w.ARS_STORAGE.getStories();
  }

  function initialize() {
    const current = getDatabase();

    if (!Array.isArray(current) || current.length === 0) {
      w.ARS_STORAGE.saveStories(
        defaultStories.map(function (item) {
          return {
            ...item,
            createdAt: new Date().toISOString()
          };
        })
      );
    }
  }

  function publish(data) {
    const stories = getDatabase();

    const item = {
      id: data.id || w.ARS_STORAGE.newId("ARS-STORY"),
      title: String(data.title || "").trim(),
      type: data.type || "story",
      category: data.category || "life",
      author: String(data.author || "Adarsh Raj").trim(),
      content: String(data.content || "").trim(),
      createdAt: new Date().toISOString()
    };

    if (!item.title || !item.content) {
      throw new Error("Title and content are required.");
    }

    stories.unshift(item);
    w.ARS_STORAGE.saveStories(stories);

    return item;
  }

  function remove(id) {
    const updated = getDatabase().filter(function (item) {
      return String(item.id) !== String(id);
    });

    w.ARS_STORAGE.saveStories(updated);
  }

  initialize();

  w.ARS_STORY = Object.freeze({
    all: getDatabase,
    publish: publish,
    remove: remove
  });

  console.log("📖 ARS Story & Poetry System Loaded");
})(window);
