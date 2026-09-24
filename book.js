"use strict";

/*
 * ARS Official
 * ARS Book Controller
 *
 * "Meri Pehli Udaan" के लिए basic book/content framework.
 * Final literary content बाद में verified/proofread content से जोड़ा जाएगा.
 */

(function () {

  const BOOK = {
    title: "मेरी पहली उड़ान",
    englishTitle: "Meri Pehli Udaan",
    author: "Adarsh Raj Shayar",
    brand: "ARS Official",

    sections: [
      {
        id: "shayari",
        title: "शायरी",
        icon: "🌹",
        description: "विभिन्न भावनाओं और विषयों पर मौलिक शायरी।"
      },
      {
        id: "poetry",
        title: "कविताएँ",
        icon: "📝",
        description: "विचारों और भावनाओं को कविता के रूप में प्रस्तुत किया गया है।"
      },
      {
        id: "stories",
        title: "कहानियाँ",
        icon: "📖",
        description: "जीवन, प्रेरणा, दोस्ती और सपनों से जुड़ी मौलिक कहानियाँ।"
      },
      {
        id: "journey",
        title: "मेरी यात्रा",
        icon: "✈️",
        description: "लेखन की शुरुआत और रचनात्मक यात्रा से जुड़े अनुभव।"
      }
    ],

    status: "development"
  };

  function getBook() {
    return BOOK;
  }

  function getSection(id) {
    return BOOK.sections.find(
      section => section.id === id
    ) || null;
  }

  function getSections() {
    return [...BOOK.sections];
  }

  function getStatus() {
    return BOOK.status;
  }

  function createSectionCard(section) {

    if (!section) return "";

    return `
      <article class="book-section">
        <div class="book-section-icon">
          ${escapeHTML(section.icon)}
        </div>

        <h3>
          ${escapeHTML(section.title)}
        </h3>

        <p>
          ${escapeHTML(section.description)}
        </p>
      </article>
    `;
  }

  function renderSections(container) {

    if (!container) return;

    container.innerHTML =
      BOOK.sections
        .map(createSectionCard)
        .join("");
  }

  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  window.ARS_BOOK = {
    data: BOOK,
    getBook,
    getSection,
    getSections,
    getStatus,
    renderSections
  };

})();
