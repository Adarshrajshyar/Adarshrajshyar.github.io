"use strict";

/*
========================================================
ARS OFFICIAL
Stories & Poetry Data Engine
Version: 6.0.0
========================================================
*/


/* ======================================================
   STORIES & POETRY DATA
====================================================== */

const ARS_STORY = [

  /* =========================
     STORY 001
  ========================= */

  {
    id: "story-001",
    type: "story",
    category: "inspiration",
    title: "सपनों की पहली सीढ़ी",
    text: `एक छोटे से गाँव का एक विद्यार्थी बड़े सपने देखा करता था।
उसके पास साधन कम थे, लेकिन सीखने की इच्छा बहुत बड़ी थी।

हर दिन वह अपने लक्ष्य के लिए थोड़ा-थोड़ा प्रयास करता।
कभी पढ़ाई कठिन लगती, कभी परिस्थितियाँ रास्ता रोकतीं,
लेकिन उसने अपनी कोशिश बंद नहीं की।

समय के साथ उसकी मेहनत रंग लाई और उसे समझ आया कि
बड़ी मंज़िल तक पहुँचने के लिए सबसे जरूरी पहला कदम
उठाना होता है।

उसने जाना कि सपनों की पहली सीढ़ी किसी और के सहारे
नहीं, बल्कि अपने विश्वास और मेहनत से बनती है।`,
    author: "Adarsh Raj Shayar",
    moral: "छोटी शुरुआत भी बड़े सपनों की ओर ले जा सकती है।",
    status: "published"
  },


  /* =========================
     POEM 001
  ========================= */

  {
    id: "poem-001",
    type: "poem",
    category: "motivation",
    title: "फिर से शुरुआत",
    text: `जब रास्ता मुश्किल हो जाए,
तब कदम रोकना नहीं।
एक बार गिर जाने से,
अपने सपनों को छोड़ना नहीं।

आज अगर मंज़िल दूर लगे,
तो मेहनत कम करना नहीं।
हर सुबह एक नई उम्मीद है,
बस खुद पर विश्वास खोना नहीं।`,
    author: "Adarsh Raj Shayar",
    moral: "लगातार प्रयास ही आगे बढ़ने का रास्ता बनाता है।",
    status: "published"
  },


  /* =========================
     STORY 002
  ========================= */

  {
    id: "story-002",
    type: "story",
    category: "friendship",
    title: "एक सच्चा दोस्त",
    text: `दो दोस्त बचपन से एक-दूसरे के साथ थे।
समय के साथ दोनों की पढ़ाई और जिम्मेदारियाँ बढ़ती गईं।

एक दिन उनमें से एक दोस्त कठिन परिस्थिति में फँस गया।
उसे किसी ऐसे व्यक्ति की जरूरत थी जो उसकी बात समझ सके।

दूसरे दोस्त ने बिना किसी स्वार्थ के उसका साथ दिया।
उसने समस्या को तुरंत खत्म नहीं किया,
लेकिन मुश्किल समय में उसके साथ खड़ा रहा।

तभी दोनों को समझ आया कि सच्ची दोस्ती केवल साथ हँसने में
नहीं, बल्कि कठिन समय में साथ खड़े रहने में भी होती है।`,
    author: "Adarsh Raj Shayar",
    moral: "सच्चा मित्र वही है जो कठिन समय में साथ दे।",
    status: "published"
  },


  /* =========================
     POEM 002
  ========================= */

  {
    id: "poem-002",
    type: "poem",
    category: "life",
    title: "जिंदगी का सफर",
    text: `जिंदगी हर दिन कुछ सिखाती है,
कभी हँसाती है, कभी रुलाती है।
जो सीखकर आगे बढ़ता रहता है,
वही अपनी राह बनाता है।

कल की चिंता छोड़कर आज को जीना,
हर अनुभव से कुछ नया सीखना।
रास्ते चाहे जैसे भी हों,
अपने विश्वास को हमेशा रखना।`,
    author: "Adarsh Raj Shayar",
    moral: "हर अनुभव जीवन में एक नई सीख देता है।",
    status: "published"
  },


  /* =========================
     STORY 003
  ========================= */

  {
    id: "story-003",
    type: "story",
    category: "education",
    title: "किताब का महत्व",
    text: `एक विद्यार्थी को एक दिन घर के पुराने सामान में
एक किताब मिली।

किताब बहुत पुरानी थी, लेकिन उसके अंदर ज्ञान से भरे
कई पन्ने थे।

विद्यार्थी ने उसे पढ़ना शुरू किया और धीरे-धीरे उसकी
सोच बदलने लगी।

उसे समझ आया कि किताब केवल परीक्षा में अच्छे अंक
लाने का साधन नहीं होती।

किताब इंसान को प्रश्न पूछना, समझना और अपने आसपास
की दुनिया को नए दृष्टिकोण से देखना भी सिखाती है।

उस दिन से उसने पढ़ाई को केवल परीक्षा की तैयारी
नहीं माना, बल्कि सीखने की यात्रा मान लिया।`,
    author: "Adarsh Raj Shayar",
    moral: "ज्ञान जीवन को देखने का दृष्टिकोण बदल सकता है।",
    status: "published"
  },


  /* =========================
     POEM 003
  ========================= */

  {
    id: "poem-003",
    type: "poem",
    category: "dream",
    title: "मेरा सपना",
    text: `सपना छोटा हो या बड़ा,
उसकी शुरुआत छोटी ही होती है।
एक कदम आज बढ़ाओ,
तो मंज़िल कल करीब होती है।

रास्ते में मुश्किल आए,
तो हिम्मत को कम मत होने देना।
अपने सपनों को वक्त देना,
और कोशिश करना कभी बंद मत करना।`,
    author: "Adarsh Raj Shayar",
    moral: "सपनों को पूरा करने के लिए विश्वास और प्रयास जरूरी है।",
    status: "published"
  },


  /* =========================
     STORY 004
  ========================= */

  {
    id: "story-004",
    type: "story",
    category: "life",
    title: "समय की सीख",
    text: `एक विद्यार्थी हमेशा सोचता था कि उसके पास बहुत समय है।
वह अपने जरूरी काम अक्सर अगले दिन के लिए छोड़ देता था।

एक दिन उसे एक महत्वपूर्ण काम समय पर पूरा करना था,
लेकिन आखिरी समय तक इंतजार करने के कारण उसे परेशानी हुई।

उसने उस दिन समझा कि समय किसी के लिए रुकता नहीं।

उसके बाद उसने अपने दिन को छोटे-छोटे कामों में बाँटना शुरू
किया और हर काम समय पर पूरा करने की कोशिश करने लगा।

कुछ समय बाद उसकी पढ़ाई और दैनिक जीवन दोनों पहले से
बेहतर हो गए।`,
    author: "Adarsh Raj Shayar",
    moral: "समय का सही उपयोग सफलता की दिशा में महत्वपूर्ण कदम है।",
    status: "published"
  },


  /* =========================
     POEM 004
  ========================= */

  {
    id: "poem-004",
    type: "poem",
    category: "inspiration",
    title: "नई सुबह",
    text: `हर रात के बाद सुबह आती है,
हर ठहराव के बाद राह बनती है।
बस उम्मीद को थामे रखना,
क्योंकि कोशिश से शुरुआत होती है।

आज नहीं तो कल सही,
एक कदम आगे बढ़ाते रहना।
अपने सपनों की राह में,
खुद को हमेशा जगाते रहना।`,
    author: "Adarsh Raj Shayar",
    moral: "हर नई सुबह एक नई शुरुआत का अवसर देती है।",
    status: "published"
  },


  /* =========================
     STORY 005
  ========================= */

  {
    id: "story-005",
    type: "story",
    category: "dream",
    title: "छोटा सपना, बड़ी मेहनत",
    text: `एक विद्यार्थी का सपना था कि वह अपने परिवार के लिए
कुछ अच्छा करे।

उसने अपने सपने को केवल सोचने तक सीमित नहीं रखा।
उसने अपनी पढ़ाई के लिए रोज थोड़ा समय तय किया।

जब कभी उसे परिणाम उम्मीद के अनुसार नहीं मिला,
तो उसने अपनी गलतियों को समझने की कोशिश की।

धीरे-धीरे उसकी तैयारी बेहतर होती गई।

उसने सीखा कि सपने केवल इच्छा करने से पूरे नहीं होते।
उनके लिए सही दिशा में लगातार मेहनत करनी पड़ती है।`,
    author: "Adarsh Raj Shayar",
    moral: "सपने तभी मजबूत बनते हैं जब उनके पीछे लगातार मेहनत हो।",
    status: "published"
  },


  /* =========================
     POEM 005
  ========================= */

  {
    id: "poem-005",
    type: "poem",
    category: "friendship",
    title: "दोस्ती",
    text: `दोस्ती में कोई हिसाब नहीं,
सच्चे रिश्ते में सवाल नहीं।
वक्त बदल जाए चाहे जितना,
सच्ची यारी में बदलाव नहीं।

खुशियों में साथ मुस्कुराना,
मुश्किल में हाथ बढ़ाना।
यही तो दोस्ती की पहचान है,
एक-दूजे का साथ निभाना।`,
    author: "Adarsh Raj Shayar",
    moral: "सच्ची दोस्ती विश्वास और साथ से मजबूत होती है।",
    status: "published"
  },


  /* =========================
     STORY 006
  ========================= */

  {
    id: "story-006",
    type: "story",
    category: "general",
    title: "एक छोटा बदलाव",
    text: `एक गाँव में एक विद्यार्थी रोज अपने आसपास की छोटी
समस्याओं को देखता था।

वह सोचता था कि इन समस्याओं को बदलने के लिए कोई
बहुत बड़ा व्यक्ति आना चाहिए।

एक दिन उसने खुद एक छोटी शुरुआत की।

उसने अपने दोस्तों के साथ मिलकर आसपास की जगह को
साफ रखना शुरू किया और दूसरों को भी इसके लिए
प्रेरित किया।

कुछ दिनों बाद कई लोग उनके साथ जुड़ गए।

तब उसे समझ आया कि बड़ा बदलाव हमेशा बड़े कदम से
नहीं, कभी-कभी एक छोटे कदम से शुरू होता है।`,
    author: "Adarsh Raj Shayar",
    moral: "अच्छे बदलाव की शुरुआत स्वयं से की जा सकती है।",
    status: "published"
  },


  /* =========================
     POEM 006
  ========================= */

  {
    id: "poem-006",
    type: "poem",
    category: "education",
    title: "ज्ञान की रोशनी",
    text: `किताबों के पन्नों में,
कितनी दुनिया बसती है।
ज्ञान की छोटी सी किरण,
अंधेरी सोच बदलती है।

सीखो, समझो, प्रश्न करो,
हर दिन कुछ नया जानो।
ज्ञान को केवल याद न रखो,
उसे जीवन में अपनाओ।`,
    author: "Adarsh Raj Shayar",
    moral: "सीखने की आदत जीवनभर उपयोगी रहती है।",
    status: "published"
  },


  /* =========================
     STORY 007
  ========================= */

  {
    id: "story-007",
    type: "story",
    category: "mystery",
    title: "पुरानी डायरी",
    text: `एक विद्यार्थी को अपने घर के पुराने कमरे में एक डायरी मिली।
डायरी के कई पन्ने खाली थे, लेकिन कुछ पन्नों पर छोटी-छोटी
पहेलियाँ लिखी थीं।

वह उत्सुक होकर उन पहेलियों को हल करने लगा।

हर उत्तर उसे डायरी के अगले पन्ने तक ले जाता।

अंत में उसे पता चला कि यह डायरी उसके दादा ने अपने
बचपन में लिखी थी।

उसमें कोई खजाना नहीं था, लेकिन उसमें परिवार की पुरानी
यादें और जीवन की कई सीखें थीं।

विद्यार्थी ने महसूस किया कि कभी-कभी सबसे मूल्यवान चीज
वह होती है जो हमें अपने अतीत से जोड़ती है।`,
    author: "Adarsh Raj Shayar",
    moral: "यादें और अनुभव भी जीवन की अनमोल संपत्ति हैं।",
    status: "published"
  },


  /* =========================
     STORY 008
  ========================= */

  {
    id: "story-008",
    type: "story",
    category: "biography",
    title: "संघर्ष से सीख",
    text: `हर सफल व्यक्ति की यात्रा अलग होती है।
किसी की राह आसान होती है तो किसी को अनेक कठिनाइयों
का सामना करना पड़ता है।

एक युवा लेखक ने भी अपनी यात्रा छोटे-छोटे प्रयासों से शुरू की।
उसके पास बहुत अधिक साधन नहीं थे, लेकिन उसके पास
सीखने और लिखने की इच्छा थी।

उसने अपनी गलतियों से सीखा और हर नई रचना के साथ
खुद को बेहतर बनाने की कोशिश की।

समय ने उसे सिखाया कि सफलता केवल परिणाम का नाम नहीं,
बल्कि सीखते रहने की पूरी यात्रा भी है।`,
    author: "Adarsh Raj Shayar",
    moral: "संघर्ष हमें मजबूत और अनुभव हमें बेहतर बनाता है।",
    status: "published"
  },


  /* =========================
     POEM 007
  ========================= */

  {
    id: "poem-007",
    type: "poem",
    category: "general",
    title: "शब्दों की दुनिया",
    text: `शब्द कभी खामोश नहीं होते,
इनमें भाव छिपे होते हैं।
एक छोटी सी रचना में,
कितने संसार बसे होते हैं।

कलम जब दिल से चलती है,
तो एहसास बन जाते हैं।
कुछ शब्द कागज पर उतरकर,
किसी के अपने बन जाते हैं।`,
    author: "Adarsh Raj Shayar",
    moral: "सच्चे शब्द लोगों के दिल तक पहुँच सकते हैं।",
    status: "published"
  },


  /* =========================
     STORY 009
  ========================= */

  {
    id: "story-009",
    type: "story",
    category: "horror",
    title: "खाली कमरा",
    text: `एक पुराने घर में एक कमरा कई वर्षों से बंद था।
घर के लोग उस कमरे को खोलना पसंद नहीं करते थे।

एक दिन घर की सफाई के दौरान कमरे का दरवाजा खोला गया।

अंदर कुछ पुरानी किताबें, एक मेज और दीवार पर टंगी
एक घड़ी थी।

कमरे के बारे में फैली डरावनी बातें धीरे-धीरे एक
पुरानी गलतफहमी निकलीं।

उस दिन परिवार ने समझा कि कई बार डर अज्ञात चीजों
से पैदा होता है, जबकि सच्चाई उससे बिल्कुल अलग हो सकती है।`,
    author: "Adarsh Raj Shayar",
    moral: "बिना जाने किसी बात से डरने के बजाय सत्य को समझना चाहिए।",
    status: "published"
  }

];


/* ======================================================
   CATEGORY DEFINITIONS
====================================================== */

const ARS_STORY_CATEGORIES = {

  mystery: {
    name: "Mystery",
    hindi: "रहस्य",
    icon: "🕵️"
  },

  horror: {
    name: "Horror",
    hindi: "रोमांचक",
    icon: "🌙"
  },

  biography: {
    name: "Biography",
    hindi: "जीवनी",
    icon: "👤"
  },

  life: {
    name: "Life",
    hindi: "जीवन",
    icon: "🌱"
  },

  inspiration: {
    name: "Inspiration",
    hindi: "प्रेरणा",
    icon: "✨"
  },

  motivation: {
    name: "Motivation",
    hindi: "प्रेरणादायक",
    icon: "🔥"
  },

  friendship: {
    name: "Friendship",
    hindi: "दोस्ती",
    icon: "🤝"
  },

  dream: {
    name: "Dream",
    hindi: "सपने",
    icon: "🌌"
  },

  education: {
    name: "Education",
    hindi: "शिक्षा",
    icon: "📚"
  },

  general: {
    name: "General",
    hindi: "सामान्य",
    icon: "📖"
  }

};


/* ======================================================
   GET STORIES
====================================================== */

function arsGetStories() {

  let publisherData = [];

  try {

    if (
      typeof ARS_STORAGE !== "undefined" &&
      typeof ARS_STORAGE.getArray === "function"
    ) {

      publisherData =
        ARS_STORAGE.getArray(
          "ARS_PUBLISHED_STORIES"
        ) || [];

    }

  } catch (error) {

    console.warn(
      "ARS published stories could not be loaded.",
      error
    );

  }


  const combined = [
    ...ARS_STORY,
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
   FIND STORY
====================================================== */

function arsFindStory(id) {

  if (!id) return null;


  return arsGetStories().find(
    item =>
      String(item.id) === String(id)
  ) || null;

}


/* ======================================================
   GET STORIES BY TYPE
====================================================== */

function arsGetStoriesByType(type) {

  const key =
    String(type || "")
      .toLowerCase()
      .trim();


  if (!key || key === "all") {
    return arsGetStories();
  }


  return arsGetStories().filter(
    item =>
      String(item.type || "")
        .toLowerCase() === key
  );

}


/* ======================================================
   GET STORIES BY CATEGORY
====================================================== */

function arsGetStoriesByCategory(category) {

  const key =
    String(category || "")
      .toLowerCase()
      .trim();


  if (!key || key === "all") {
    return arsGetStories();
  }


  return arsGetStories().filter(
    item =>
      String(item.category || "")
        .toLowerCase() === key
  );

}


/* ======================================================
   SEARCH STORIES
====================================================== */

function arsSearchStories(query) {

  const search =
    String(query || "")
      .toLowerCase()
      .trim();


  if (!search) {
    return arsGetStories();
  }


  return arsGetStories().filter(item => {

    const searchable = `
      ${item.title || ""}
      ${item.type || ""}
      ${item.category || ""}
      ${item.text || ""}
      ${item.author || ""}
      ${item.moral || ""}
    `.toLowerCase();


    return searchable.includes(search);

  });

}


/* ======================================================
   GET CATEGORY INFO
====================================================== */

function arsStoryCategoryInfo(category) {

  const key =
    String(category || "")
      .toLowerCase()
      .trim();


  return (
    ARS_STORY_CATEGORIES[key] || {
      name: category || "General",
      hindi: category || "सामान्य",
      icon: "📖"
    }
  );

}


/* ======================================================
   ESCAPE HTML
====================================================== */

function arsStoryEscapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ======================================================
   EXCERPT
====================================================== */

function arsStoryExcerpt(text, length = 190) {

  const value =
    String(text || "")
      .replace(/\s+/g, " ")
      .trim();


  if (value.length <= length) {
    return value;
  }


  return (
    value.substring(0, length).trim() +
    "..."
  );

}


/* ======================================================
   RENDER STORY CARD
====================================================== */

function arsRenderStoryCard(item) {

  if (!item) return "";


  const type =
    String(item.type || "story")
      .toLowerCase();


  const category =
    String(item.category || "general")
      .toLowerCase();


  const info =
    arsStoryCategoryInfo(category);


  const typeLabel =
    type === "poem"
      ? "📝 कविता"
      : "📖 कहानी";


  const excerpt =
    arsStoryExcerpt(item.text);


  const shareText =
    `${item.title || "ARS रचना"} — ARS Stories & Poetry`;


  return `
    <article
      class="story-card reveal"
      data-story-card
      data-story-id="${arsStoryEscapeHTML(item.id)}"
      data-story-type="${arsStoryEscapeHTML(type)}"
      data-category="${arsStoryEscapeHTML(category)}"
      data-search="${arsStoryEscapeHTML(
        `${item.title || ""}
         ${info.name}
         ${info.hindi}
         ${item.text || ""}
         ${item.author || ""}`
      )}"
    >

      <span class="story-type">
        ${typeLabel}
      </span>

      <div class="story-category">
        ${info.icon}
        ${arsStoryEscapeHTML(info.name)}
        •
        ${arsStoryEscapeHTML(info.hindi)}
      </div>

      <h3 class="story-title">
        ${arsStoryEscapeHTML(item.title || "Untitled")}
      </h3>

      <p class="story-excerpt">
        ${arsStoryEscapeHTML(excerpt)}
      </p>

      <a
        href="chapter.html?type=${encodeURIComponent(type)}&id=${encodeURIComponent(item.id)}"
        class="story-read"
      >
        पूरी रचना पढ़ें →
      </a>

      <div class="story-author">
        —
        ${arsStoryEscapeHTML(
          item.author || "Adarsh Raj Shayar"
        )}
      </div>

      <div class="story-actions">

        <button
          class="story-action"
          type="button"
          data-like-id="${arsStoryEscapeHTML(item.id)}"
        >
          ❤️ Like
        </button>

        <button
          class="story-action"
          type="button"
          data-favorite-id="${arsStoryEscapeHTML(item.id)}"
        >
          ⭐ Favorite
        </button>

        <button
          class="story-action"
          type="button"
          data-save-id="${arsStoryEscapeHTML(item.id)}"
        >
          🔖 Save
        </button>

        <button
          class="story-action"
          type="button"
          data-share-text="${arsStoryEscapeHTML(shareText)}"
        >
          ↗️ Share
        </button>

      </div>

    </article>
  `;

}


/* ======================================================
   RENDER ALL STORIES
====================================================== */

function arsRenderStories(
  options = {}
) {

  const selector =
    options.container ||
    "#storyGrid";


  const container =
    document.querySelector(selector);


  if (!container) return;


  const items =
    arsGetStories();


  if (!items.length) {

    container.innerHTML = "";


    const empty =
      document.getElementById(
        "storyEmpty"
      );


    if (empty) {
      empty.classList.add("show");
    }


    return;

  }


  container.innerHTML =
    items
      .map(arsRenderStoryCard)
      .join("");


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
   ADD STORY / POEM
====================================================== */

function arsAddStory(data) {

  if (!data || !data.title || !data.text) {

    return {
      success: false,
      message: "Title and content are required."
    };

  }


  const item = {

    id:
      data.id ||
      `${data.type === "poem" ? "poem" : "story"}-${Date.now()}`,

    type:
      data.type === "poem"
        ? "poem"
        : "story",

    category:
      data.category ||
      "general",

    title:
      String(data.title).trim(),

    text:
      String(data.text).trim(),

    author:
      data.author ||
      "Adarsh Raj Shayar",

    moral:
      data.moral ||
      "",

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
          "ARS_PUBLISHED_STORIES"
        ) || [];


      current.push(item);


      ARS_STORAGE.set(
        "ARS_PUBLISHED_STORIES",
        current
      );


      return {
        success: true,
        item
      };

    }

  } catch (error) {

    console.error(
      "Could not save story.",
      error
    );

  }


  return {
    success: false,
    message: "Storage unavailable."
  };

}


/* ======================================================
   UPDATE STORY
====================================================== */

function arsUpdateStory(
  id,
  updates = {}
) {

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
        "ARS_PUBLISHED_STORIES"
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

      id:
        items[index].id,

      updatedAt:
        new Date().toISOString()

    };


    ARS_STORAGE.set(
      "ARS_PUBLISHED_STORIES",
      items
    );


    return true;

  } catch (error) {

    console.error(
      "Could not update story.",
      error
    );

    return false;

  }

}


/* ======================================================
   DELETE STORY
====================================================== */

function arsDeleteStory(id) {

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
        "ARS_PUBLISHED_STORIES"
      ) || [];


    const filtered =
      items.filter(
        item =>
          String(item.id) !== String(id)
      );


    if (
      filtered.length === items.length
    ) {
      return false;
    }


    ARS_STORAGE.set(
      "ARS_PUBLISHED_STORIES",
      filtered
    );


    return true;

  } catch (error) {

    console.error(
      "Could not delete story.",
      error
    );

    return false;

  }

}


/* ======================================================
   STATISTICS
====================================================== */

function arsGetStoryStats() {

  const items =
    arsGetStories();


  const stats = {

    total: items.length,

    stories: 0,

    poems: 0,

    mystery: 0,

    horror: 0,

    biography: 0,

    life: 0,

    inspiration: 0,

    motivation: 0,

    friendship: 0,

    dream: 0,

    education: 0,

    general: 0

  };


  items.forEach(item => {

    if (
      String(item.type)
        .toLowerCase() === "poem"
    ) {

      stats.poems++;

    } else {

      stats.stories++;

    }


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

    }

  });


  return stats;

}


/* ======================================================
   GLOBAL EXPORTS
====================================================== */

window.ARS_STORY =
  ARS_STORY;

window.ARS_STORY_CATEGORIES =
  ARS_STORY_CATEGORIES;

window.arsGetStories =
  arsGetStories;

window.arsFindStory =
  arsFindStory;

window.arsGetStoriesByType =
  arsGetStoriesByType;

window.arsGetStoriesByCategory =
  arsGetStoriesByCategory;

window.arsSearchStories =
  arsSearchStories;

window.arsStoryCategoryInfo =
  arsStoryCategoryInfo;

window.arsRenderStoryCard =
  arsRenderStoryCard;

window.arsRenderStories =
  arsRenderStories;

window.arsAddStory =
  arsAddStory;

window.arsUpdateStory =
  arsUpdateStory;

window.arsDeleteStory =
  arsDeleteStory;

window.arsGetStoryStats =
  arsGetStoryStats;


/* ======================================================
   READY FLAG
====================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    window.ARS_STORY_READY = true;

  }
);
