"use strict";

/*
 * ARS Official
 * Dictionary Module
 *
 * यह starter dictionary structure है।
 * Large dictionary data को बाद में verified/source-controlled
 * dataset या secure backend से जोड़ा जा सकता है।
 */

(function () {

  const WORDS = [

    {
      word: "ability",
      pronunciation: "uh-BIL-uh-tee",
      partOfSpeech: "Noun",
      meaning: "किसी कार्य को करने की क्षमता या योग्यता।",
      example: "She has the ability to solve difficult problems.",
      synonym: "capacity",
      antonym: "inability",
      related: "skill, talent"
    },

    {
      word: "brave",
      pronunciation: "brayv",
      partOfSpeech: "Adjective",
      meaning: "कठिन या डरावनी परिस्थिति में साहस दिखाने वाला।",
      example: "The brave student spoke confidently.",
      synonym: "courageous",
      antonym: "cowardly",
      related: "courage, fearless"
    },

    {
      word: "create",
      pronunciation: "kree-AYT",
      partOfSpeech: "Verb",
      meaning: "किसी नई वस्तु, विचार या रचना को बनाना।",
      example: "Artists create new ideas through their work.",
      synonym: "make",
      antonym: "destroy",
      related: "creation, creative"
    },

    {
      word: "dream",
      pronunciation: "dreem",
      partOfSpeech: "Noun / Verb",
      meaning: "भविष्य में कुछ पाने या करने की कल्पना या इच्छा।",
      example: "Every student can dream of a better future.",
      synonym: "aspiration",
      antonym: "reality",
      related: "goal, hope"
    },

    {
      word: "education",
      pronunciation: "ej-oo-KAY-shun",
      partOfSpeech: "Noun",
      meaning: "ज्ञान, कौशल और समझ प्राप्त करने की प्रक्रिया।",
      example: "Education helps people understand the world.",
      synonym: "learning",
      antonym: "ignorance",
      related: "school, knowledge"
    },

    {
      word: "friend",
      pronunciation: "frend",
      partOfSpeech: "Noun",
      meaning: "वह व्यक्ति जिसके साथ स्नेह और विश्वास का संबंध हो।",
      example: "A good friend supports you in difficult times.",
      synonym: "companion",
      antonym: "enemy",
      related: "friendship, companion"
    },

    {
      word: "hope",
      pronunciation: "hohp",
      partOfSpeech: "Noun / Verb",
      meaning: "भविष्य में किसी अच्छे परिणाम की अपेक्षा या विश्वास।",
      example: "Hope gives people strength during difficult times.",
      synonym: "expectation",
      antonym: "despair",
      related: "optimism, dream"
    },

    {
      word: "knowledge",
      pronunciation: "NOL-ij",
      partOfSpeech: "Noun",
      meaning: "किसी विषय के बारे में प्राप्त जानकारी और समझ।",
      example: "Knowledge grows when we keep learning.",
      synonym: "understanding",
      antonym: "ignorance",
      related: "learning, education"
    },

    {
      word: "learn",
      pronunciation: "lurn",
      partOfSpeech: "Verb",
      meaning: "अध्ययन, अनुभव या अभ्यास से ज्ञान या कौशल प्राप्त करना।",
      example: "Students learn through study and practice.",
      synonym: "study",
      antonym: "forget",
      related: "learning, education"
    },

    {
      word: "motivation",
      pronunciation: "moh-tuh-VAY-shun",
      partOfSpeech: "Noun",
      meaning: "किसी कार्य को करने के लिए प्रेरित करने वाली भावना या कारण।",
      example: "Motivation helps us continue working toward our goals.",
      synonym: "inspiration",
      antonym: "discouragement",
      related: "inspiration, effort"
    },

    {
      word: "respect",
      pronunciation: "ri-SPEKT",
      partOfSpeech: "Noun / Verb",
      meaning: "किसी व्यक्ति या वस्तु के प्रति सम्मान और उचित व्यवहार।",
      example: "We should respect our teachers and parents.",
      synonym: "honour",
      antonym: "disrespect",
      related: "honour, dignity"
    },

    {
      word: "success",
      pronunciation: "suk-SESS",
      partOfSpeech: "Noun",
      meaning: "किसी लक्ष्य या उद्देश्य को प्राप्त करने की स्थिति।",
      example: "Consistent effort can lead to success.",
      synonym: "achievement",
      antonym: "failure",
      related: "goal, achievement"
    },

    {
      word: "teacher",
      pronunciation: "TEE-cher",
      partOfSpeech: "Noun",
      meaning: "वह व्यक्ति जो विद्यार्थियों को ज्ञान और कौशल सिखाता है।",
      example: "A teacher can guide students toward better learning.",
      synonym: "educator",
      antonym: "student",
      related: "school, education"
    },

    {
      word: "truth",
      pronunciation: "trooth",
      partOfSpeech: "Noun",
      meaning: "जो तथ्य या वास्तविकता के अनुरूप हो।",
      example: "Speaking the truth builds trust.",
      synonym: "fact",
      antonym: "falsehood",
      related: "honesty, fact"
    },

    {
      word: "wisdom",
      pronunciation: "WIZ-dum",
      partOfSpeech: "Noun",
      meaning: "ज्ञान और अनुभव का समझदारी से उपयोग करने की क्षमता।",
      example: "Wisdom often develops through experience.",
      synonym: "insight",
      antonym: "foolishness",
      related: "knowledge, experience"
    }

  ];

  let currentWords = [...WORDS];
  let selectedWord = null;

  function getWords() {
    return [...WORDS];
  }

  function getWord(word) {

    const target =
      String(word || "")
        .trim()
        .toLowerCase();

    return WORDS.find(
      item =>
        item.word.toLowerCase() === target
    ) || null;
  }

  function searchWords(query) {

    const target =
      String(query || "")
        .trim()
        .toLowerCase();

    if (!target) {
      return [...WORDS];
    }

    return WORDS.filter(item => {

      return (
        item.word.toLowerCase().includes(target) ||
        item.meaning.toLowerCase().includes(target) ||
        item.synonym.toLowerCase().includes(target)
      );

    });
  }

  function getWordsByLetter(letter) {

    const target =
      String(letter || "")
        .trim()
        .toLowerCase();

    return WORDS.filter(
      item =>
        item.word
          .toLowerCase()
          .startsWith(target)
    );
  }

  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderAlphabet() {

    const container =
      document.getElementById("alphabet");

    if (!container) return;

    const letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    container.innerHTML =
      letters.map(letter => {

        return `
          <button
            type="button"
            data-letter="${letter}"
            aria-label="Words starting with ${letter}">
            ${letter}
          </button>
        `;

      }).join("");

    container
      .querySelectorAll("button")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            container
              .querySelectorAll("button")
              .forEach(item =>
                item.classList.remove("active")
              );

            button.classList.add("active");

            currentWords =
              getWordsByLetter(
                button.dataset.letter
              );

            renderWordList();

          }
        );

      });
  }

  function renderWordList() {

    const container =
      document.getElementById("wordItems");

    if (!container) return;

    if (!currentWords.length) {

      container.innerHTML = `
        <div style="
          padding:20px;
          color:#94a3b8;
          text-align:center;
          line-height:1.7;">
          इस search के लिए कोई word नहीं मिला।
        </div>
      `;

      return;
    }

    container.innerHTML =
      currentWords.map(item => {

        const active =
          selectedWord &&
          selectedWord.word === item.word
            ? "active"
            : "";

        return `
          <button
            type="button"
            class="word-item ${active}"
            data-word="${escapeHTML(item.word)}">
            ${escapeHTML(item.word)}
          </button>
        `;

      }).join("");

    container
      .querySelectorAll(".word-item")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const word =
              getWord(button.dataset.word);

            if (word) {
              selectWord(word);
            }

          }
        );

      });
  }

  function selectWord(word) {

    selectedWord = word;

    renderWordList();
    renderDetail();

    const detail =
      document.getElementById("wordDetail");

    if (detail) {
      detail.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

  function renderDetail() {

    const container =
      document.getElementById("wordDetail");

    if (!container) return;

    if (!selectedWord) {

      container.innerHTML = `
        <div class="word-placeholder">
          कोई word select करें।
        </div>
      `;

      return;
    }

    const item = selectedWord;

    container.innerHTML = `
      <div class="word-heading">

        <h2>
          ${escapeHTML(item.word)}
        </h2>

        <span class="word-pos">
          ${escapeHTML(item.partOfSpeech)}
        </span>

      </div>

      <div class="word-meaning">

        <strong>अर्थ:</strong>

        <br>

        ${escapeHTML(item.meaning)}

      </div>

      <div class="word-info-grid">

        <div class="word-info">
          <strong>🔊 Pronunciation</strong>
          <span>
            ${escapeHTML(item.pronunciation)}
          </span>
        </div>

        <div class="word-info">
          <strong>📝 Example</strong>
          <span>
            ${escapeHTML(item.example)}
          </span>
        </div>

        <div class="word-info">
          <strong>🔄 Synonym</strong>
          <span>
            ${escapeHTML(item.synonym)}
          </span>
        </div>

        <div class="word-info">
          <strong>↔️ Antonym</strong>
          <span>
            ${escapeHTML(item.antonym)}
          </span>
        </div>

        <div class="word-info">
          <strong>🔗 Related Words</strong>
          <span>
            ${escapeHTML(item.related)}
          </span>
        </div>

      </div>
    `;
  }

  function performSearch(query) {

    currentWords =
      searchWords(query);

    selectedWord = null;

    renderWordList();
    renderDetail();

    if (currentWords.length === 1) {
      selectWord(currentWords[0]);
    }
  }

  function initSearch() {

    const form =
      document.getElementById(
        "dictionarySearchForm"
      );

    const input =
      document.getElementById(
        "dictionarySearch"
      );

    if (!form || !input) return;

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        performSearch(input.value);

      }
    );
  }

  function init() {

    renderAlphabet();

    currentWords =
      [...WORDS];

    renderWordList();

    initSearch();

  }

  window.ARS_DICTIONARY = {
    data: WORDS,
    getWords,
    getWord,
    searchWords,
    getWordsByLetter
  };

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
