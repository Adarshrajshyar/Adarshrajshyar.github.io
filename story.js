/* =========================================================
   ARS OFFICIAL — STORY DATABASE
   Original ARS Stories
   ========================================================= */

(function (window) {
  "use strict";

  const ARS_STORIES = [
    {
      id: "ars-story-001",
      title: "मंज़िल का पहला कदम",
      category: "motivation",
      type: "story",
      author: "Adarsh Raj",
      content:
        "एक छोटे से गाँव में आरव नाम का लड़का रहता था। उसके सपने बड़े थे, लेकिन साधन बहुत कम थे। लोग अक्सर कहते थे कि बड़े सपने देखने से कुछ नहीं होता। आरव ने किसी की बात को अपनी कमजोरी नहीं बनने दिया। वह रोज थोड़ा-थोड़ा सीखता और अपने लक्ष्य की ओर बढ़ता रहा। कई बार असफल हुआ, लेकिन हर असफलता से उसने कुछ नया सीखा। वर्षों बाद वही लड़का अपनी मेहनत के कारण अपने गाँव के बच्चों के लिए प्रेरणा बन गया। उसने सबको समझाया कि मंज़िल तक पहुँचने के लिए सबसे जरूरी चीज पहला कदम उठाना है।",
      tags: ["motivation", "success", "life"]
    },

    {
      id: "ars-story-002",
      title: "समय की कीमत",
      category: "life",
      type: "story",
      author: "Adarsh Raj",
      content:
        "राहुल हमेशा अपने काम को कल पर छोड़ देता था। एक दिन उसने महसूस किया कि जिन लोगों को वह सफल समझता था, वे उससे अधिक प्रतिभाशाली नहीं थे, बल्कि वे अपने समय का बेहतर उपयोग करते थे। राहुल ने उसी दिन से अपनी आदत बदलने का निर्णय लिया। उसने पढ़ाई, आराम और अपने सपनों के लिए समय तय किया। कुछ ही महीनों में उसकी जिंदगी बदलने लगी। उसे समझ आया कि समय लौटकर नहीं आता, इसलिए आज का छोटा प्रयास कल की बड़ी सफलता बन सकता है।",
      tags: ["life", "time", "success"]
    },

    {
      id: "ars-story-003",
      title: "सच्ची दोस्ती",
      category: "friendship",
      type: "story",
      author: "Adarsh Raj",
      content:
        "अमन और विवेक बचपन से दोस्त थे। दोनों की सोच अलग थी, लेकिन एक-दूसरे के प्रति सम्मान बहुत था। एक कठिन समय में अमन परेशान हो गया। विवेक ने उसे कोई बड़ा भाषण नहीं दिया, बस उसके साथ खड़ा रहा। कुछ समय बाद अमन की परेशानी दूर हुई। तब उसे समझ आया कि सच्चा दोस्त वह नहीं जो केवल खुशी में साथ हो, बल्कि वह है जो मुश्किल समय में भी आपका हाथ न छोड़े।",
      tags: ["friendship", "trust", "life"]
    },

    {
      id: "ars-story-004",
      title: "हार के बाद",
      category: "motivation",
      type: "story",
      author: "Adarsh Raj",
      content:
        "एक प्रतियोगिता में निखिल हार गया। उसे लगा कि उसकी सारी मेहनत बेकार हो गई। उसके शिक्षक ने कहा, हार केवल परिणाम है, पहचान नहीं। निखिल ने अपनी गलतियों को लिखा और अगली बार बेहतर तैयारी की। जब अगली प्रतियोगिता आई, उसने पहले से अधिक आत्मविश्वास के साथ भाग लिया। इस बार परिणाम उसके पक्ष में था। निखिल ने सीखा कि हार अंत नहीं, बल्कि अगली कोशिश की शुरुआत हो सकती है।",
      tags: ["motivation", "failure", "success"]
    },

    {
      id: "ars-story-005",
      title: "छोटा सपना, बड़ा सफर",
      category: "dream",
      type: "story",
      author: "Adarsh Raj",
      content:
        "एक बच्चे का सपना था कि वह अपने शहर के लिए कुछ अच्छा करे। शुरुआत बहुत छोटी थी। उसने अपने आसपास के लोगों की मदद करना शुरू किया। धीरे-धीरे दूसरे बच्चे भी उसके साथ जुड़ने लगे। एक छोटी सी कोशिश एक बड़े अभियान में बदल गई। उस बच्चे ने जाना कि बड़ा बदलाव हमेशा बड़े काम से शुरू नहीं होता। कभी-कभी एक छोटा अच्छा कदम ही पूरी दिशा बदल देता है।",
      tags: ["dream", "motivation", "inspiration"]
    },

    {
      id: "ars-story-006",
      title: "विश्वास",
      category: "inspiration",
      type: "story",
      author: "Adarsh Raj",
      content:
        "जब सभी रास्ते बंद दिखाई देते हैं, तब खुद पर विश्वास सबसे बड़ा सहारा बनता है। आर्या ने अपने लक्ष्य के लिए लगातार प्रयास किया। उसे कई बार लगा कि वह सफल नहीं होगी, लेकिन उसने अपनी कोशिश बंद नहीं की। अंत में उसकी मेहनत रंग लाई। उसने समझा कि आत्मविश्वास का अर्थ यह नहीं कि मुश्किलें नहीं आएँगी, बल्कि यह विश्वास है कि मुश्किलों के बावजूद आगे बढ़ा जा सकता है।",
      tags: ["inspiration", "confidence", "success"]
    },

    {
      id: "ars-story-007",
      title: "एक किताब और एक सपना",
      category: "education",
      type: "story",
      author: "Adarsh Raj",
      content:
        "एक पुरानी किताब ने एक बच्चे की सोच बदल दी। किताब पढ़ते-पढ़ते उसने जाना कि ज्ञान केवल परीक्षा में अंक पाने के लिए नहीं होता। ज्ञान इंसान को बेहतर निर्णय लेने और दुनिया को समझने की शक्ति देता है। उसने पढ़ने की आदत बनाई और धीरे-धीरे उसकी दुनिया बड़ी होती गई। एक किताब से शुरू हुआ सफर जीवन भर सीखने की यात्रा बन गया।",
      tags: ["education", "books", "knowledge"]
    },

    {
      id: "ars-story-008",
      title: "उम्मीद की रोशनी",
      category: "inspiration",
      type: "story",
      author: "Adarsh Raj",
      content:
        "कभी-कभी जिंदगी में ऐसा समय आता है जब सब कुछ कठिन लगता है। लेकिन अंधेरे समय में छोटी सी उम्मीद भी रास्ता दिखा सकती है। एक परिवार ने कठिन परिस्थिति में एक-दूसरे का साथ नहीं छोड़ा। उन्होंने समस्या को छोटे-छोटे हिस्सों में बाँटा और हर दिन एक कदम आगे बढ़ाया। धीरे-धीरे परिस्थिति बेहतर हुई। उन्हें समझ आया कि उम्मीद कोई जादू नहीं, बल्कि आगे बढ़ने की वजह है।",
      tags: ["hope", "family", "inspiration"]
    }
  ];

  /* ---------------------------------------------------------
     STORAGE से PUBLISHED STORIES जोड़ें
     --------------------------------------------------------- */

  function getStories() {
    let result = [...ARS_STORIES];

    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.getStories === "function"
    ) {
      const saved = window.ARS_STORAGE.getStories();

      if (Array.isArray(saved)) {
        result = result.concat(saved);
      }
    }

    return result;
  }

  /* ---------------------------------------------------------
     CATEGORY
     --------------------------------------------------------- */

  function getByCategory(category) {
    const stories = getStories();

    if (!category || category === "all") {
      return stories;
    }

    return stories.filter(
      item =>
        String(item.category).toLowerCase() ===
        String(category).toLowerCase()
    );
  }

  /* ---------------------------------------------------------
     SEARCH
     --------------------------------------------------------- */

  function searchStories(query) {
    query = String(query || "").trim().toLowerCase();

    if (!query) {
      return getStories();
    }

    return getStories().filter(item => {
      const text = [
        item.title,
        item.content,
        item.category,
        item.author,
        ...(item.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }

  /* ---------------------------------------------------------
     FIND
     --------------------------------------------------------- */

  function findStory(id) {
    return (
      getStories().find(
        item => String(item.id) === String(id)
      ) || null
    );
  }

  /* ---------------------------------------------------------
     PUBLISH
     --------------------------------------------------------- */

  function publishStory(data) {
    if (!data || !data.title || !data.content) {
      return null;
    }

    const item = {
      id:
        data.id ||
        "ars-story-" +
          Date.now().toString(36),

      title: data.title,

      content: data.content,

      category: data.category || "motivation",

      type: data.type || "story",

      author: data.author || "Adarsh Raj",

      tags: Array.isArray(data.tags)
        ? data.tags
        : [],

      createdAt:
        data.createdAt ||
        new Date().toISOString()
    };

    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.addStory === "function"
    ) {
      window.ARS_STORAGE.addStory(item);
    }

    return item;
  }

  /* ---------------------------------------------------------
     PUBLIC API
     --------------------------------------------------------- */

  window.ARS_STORY = {
    getAll: getStories,
    getByCategory,
    search: searchStories,
    find: findStory,
    publish: publishStory
  };

  console.log("📖 ARS Story System Loaded");
  console.log("📚 Total Stories:", getStories().length);

})(window);
