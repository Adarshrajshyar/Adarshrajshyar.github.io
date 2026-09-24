"use strict";

/*
 * ARS Official
 * Education Module
 *
 * वर्तमान में framework/demo data.
 * Actual chapters/subjects को verified source के अनुसार
 * बाद में publisher/admin system से manage किया जा सकेगा।
 */

(function () {

  const CLASSES = [
    {
      id: "class-5",
      number: 5,
      name: "कक्षा 5",
      icon: "📘",
      description: "कक्षा 5 के लिए learning resources.",
      subjects: [
        "गणित",
        "विज्ञान",
        "हिंदी",
        "अंग्रेज़ी",
        "सामान्य ज्ञान"
      ]
    },

    {
      id: "class-6",
      number: 6,
      name: "कक्षा 6",
      icon: "📗",
      description: "कक्षा 6 के लिए learning resources.",
      subjects: [
        "गणित",
        "विज्ञान",
        "हिंदी",
        "अंग्रेज़ी",
        "सामाजिक विज्ञान"
      ]
    },

    {
      id: "class-7",
      number: 7,
      name: "कक्षा 7",
      icon: "📕",
      description: "कक्षा 7 के लिए learning resources.",
      subjects: [
        "गणित",
        "विज्ञान",
        "हिंदी",
        "अंग्रेज़ी",
        "सामाजिक विज्ञान"
      ]
    },

    {
      id: "class-8",
      number: 8,
      name: "कक्षा 8",
      icon: "📙",
      description: "कक्षा 8 के लिए learning resources.",
      subjects: [
        "गणित",
        "विज्ञान",
        "हिंदी",
        "अंग्रेज़ी",
        "सामाजिक विज्ञान"
      ]
    }
  ];

  let searchText = "";

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .trim();
  }

  function getAllClasses() {
    return [...CLASSES];
  }

  function getClassById(id) {
    return CLASSES.find(item => item.id === id) || null;
  }

  function search(query) {
    const q = normalize(query);

    if (!q) {
      return getAllClasses();
    }

    return CLASSES.filter(item => {

      const searchableText = [
        item.id,
        item.name,
        item.number,
        item.description,
        ...item.subjects
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }

  function renderClasses() {

    const grid =
      document.getElementById("classGrid");

    const empty =
      document.getElementById("educationEmpty");

    if (!grid) return;

    const results = search(searchText);

    if (!results.length) {

      grid.innerHTML = "";

      if (empty) {
        empty.style.display = "block";
      }

      return;
    }

    if (empty) {
      empty.style.display = "none";
    }

    grid.innerHTML = results.map(item => {

      return `
        <article class="class-card">

          <div class="class-icon">
            ${item.icon}
          </div>

          <h2>${escapeHTML(item.name)}</h2>

          <p>
            ${escapeHTML(item.description)}
          </p>

          <div
            style="
              color:#64748b;
              font-size:.88rem;
              line-height:1.6;
              margin-bottom:16px;
            ">
            ${item.subjects
              .map(subject => escapeHTML(subject))
              .join(" • ")}
          </div>

          <a
            href="chapter.html?class=${encodeURIComponent(item.number)}"
            class="class-btn">
            Explore Class
          </a>

        </article>
      `;

    }).join("");
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function init() {

    const input =
      document.getElementById("educationSearch");

    if (input) {

      input.addEventListener("input", event => {

        searchText = event.target.value;

        renderClasses();

      });

    }

    renderClasses();
  }

  window.ARS_EDUCATION = {
    classes: CLASSES,
    getAllClasses,
    getClassById,
    search
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
