"use strict";

/*
 * ARS Official
 * Education Chapter Module
 *
 * यह अभी educational framework/demo structure है।
 * Detailed verified chapters बाद में publisher/admin system
 * से manage किए जा सकेंगे।
 */

(function () {

  const CHAPTERS = {
    5: {
      "गणित": [
        {
          id: "c5-math-1",
          title: "संख्याओं की समझ",
          description: "संख्याओं को समझने और उनके साथ कार्य करने की मूल अवधारणाएँ।"
        },
        {
          id: "c5-math-2",
          title: "जोड़ और घटाव",
          description: "जोड़ और घटाव की मूल प्रक्रिया तथा अभ्यास।"
        },
        {
          id: "c5-math-3",
          title: "गुणा और भाग",
          description: "गुणा और भाग की अवधारणाओं को उदाहरणों के साथ समझें।"
        }
      ],
      "विज्ञान": [
        {
          id: "c5-science-1",
          title: "विज्ञान की शुरुआत",
          description: "अपने आसपास की वस्तुओं और घटनाओं को वैज्ञानिक दृष्टि से समझना।"
        },
        {
          id: "c5-science-2",
          title: "जीव-जगत",
          description: "जीवित वस्तुओं की सामान्य विशेषताओं का परिचय।"
        }
      ]
    },

    6: {
      "गणित": [
        {
          id: "c6-math-1",
          title: "संख्याओं का परिचय",
          description: "संख्याओं से जुड़े मूल विचार और गणितीय समझ।"
        },
        {
          id: "c6-math-2",
          title: "पूर्णांक",
          description: "पूर्णांकों को समझने और उनका उपयोग करने का अभ्यास।"
        }
      ],
      "विज्ञान": [
        {
          id: "c6-science-1",
          title: "विज्ञान और हमारा जीवन",
          description: "दैनिक जीवन में विज्ञान की भूमिका को समझें।"
        },
        {
          id: "c6-science-2",
          title: "हमारे आसपास के पदार्थ",
          description: "पदार्थ और उनके सामान्य गुणों का परिचय।"
        }
      ]
    },

    7: {
      "गणित": [
        {
          id: "c7-math-1",
          title: "संख्यात्मक अवधारणाएँ",
          description: "संख्याओं से जुड़े महत्वपूर्ण गणितीय विचार।"
        },
        {
          id: "c7-math-2",
          title: "भिन्न और दशमलव",
          description: "भिन्न और दशमलव को समझने का अभ्यास।"
        }
      ],
      "विज्ञान": [
        {
          id: "c7-science-1",
          title: "जीवन की विविधता",
          description: "जीवों और उनके आसपास की विविधता का परिचय।"
        },
        {
          id: "c7-science-2",
          title: "पदार्थ और परिवर्तन",
          description: "पदार्थों में होने वाले सामान्य परिवर्तनों को समझें।"
        }
      ]
    },

    8: {
      "गणित": [
        {
          id: "c8-math-1",
          title: "परिमेय संख्याएँ",
          description: "परिमेय संख्याओं की मूल अवधारणाएँ और अभ्यास।"
        },
        {
          id: "c8-math-2",
          title: "बीजीय अवधारणाएँ",
          description: "बीजगणितीय सोच और मूल अभिव्यक्तियों का परिचय।"
        }
      ],
      "विज्ञान": [
        {
          id: "c8-science-1",
          title: "वैज्ञानिक सोच",
          description: "प्रश्न पूछने, निरीक्षण करने और निष्कर्ष तक पहुँचने की प्रक्रिया।"
        },
        {
          id: "c8-science-2",
          title: "प्रकृति और संसाधन",
          description: "प्राकृतिक संसाधनों और उनके जिम्मेदार उपयोग की समझ।"
        }
      ]
    }
  };

  let selectedClass = 5;
  let selectedSubject = "";

  function getClassData(classNumber) {
    return CHAPTERS[classNumber] || {};
  }

  function getSubjects(classNumber) {
    return Object.keys(getClassData(classNumber));
  }

  function getChapters(classNumber, subject) {
    const data = getClassData(classNumber);
    return data[subject] || [];
  }

  function getChapterById(id) {
    for (const classNumber of Object.keys(CHAPTERS)) {
      const subjects = CHAPTERS[classNumber];

      for (const subject of Object.keys(subjects)) {
        const chapter = subjects[subject].find(
          item => item.id === id
        );

        if (chapter) {
          return {
            ...chapter,
            classNumber: Number(classNumber),
            subject
          };
        }
      }
    }

    return null;
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readClassFromURL() {
    const params =
      new URLSearchParams(window.location.search);

    const value =
      Number(params.get("class"));

    if (CHAPTERS[value]) {
      return value;
    }

    return 5;
  }

  function renderSubjects() {

    const container =
      document.getElementById("subjectFilters");

    if (!container) return;

    const subjects =
      getSubjects(selectedClass);

    if (!subjects.length) {
      container.innerHTML = "";
      selectedSubject = "";
      renderChapters();
      return;
    }

    if (!subjects.includes(selectedSubject)) {
      selectedSubject = subjects[0];
    }

    container.innerHTML = subjects.map(subject => {

      const active =
        subject === selectedSubject
          ? "active"
          : "";

      return `
        <button
          type="button"
          class="subject-filter ${active}"
          data-subject="${escapeHTML(subject)}">
          ${escapeHTML(subject)}
        </button>
      `;

    }).join("");

    container
      .querySelectorAll(".subject-filter")
      .forEach(button => {

        button.addEventListener("click", () => {

          selectedSubject =
            button.dataset.subject || "";

          renderSubjects();
          renderChapters();

        });

      });
  }

  function renderChapters() {

    const grid =
      document.getElementById("chapterGrid");

    const empty =
      document.getElementById("chapterEmpty");

    if (!grid) return;

    const chapters =
      getChapters(
        selectedClass,
        selectedSubject
      );

    if (!chapters.length) {

      grid.innerHTML = "";

      if (empty) {
        empty.style.display = "block";
      }

      return;
    }

    if (empty) {
      empty.style.display = "none";
    }

    grid.innerHTML = chapters.map(
      (chapter, index) => {

        return `
          <article class="chapter-card">

            <div class="chapter-number">
              ${index + 1}
            </div>

            <h2>
              ${escapeHTML(chapter.title)}
            </h2>

            <p>
              ${escapeHTML(chapter.description)}
            </p>

            <a
              href="chapter.html?class=${selectedClass}&subject=${encodeURIComponent(selectedSubject)}&chapter=${encodeURIComponent(chapter.id)}"
              class="chapter-btn">
              Open Chapter
            </a>

          </article>
        `;

      }
    ).join("");
  }

  function updateHero() {

    const title =
      document.getElementById("chapterTitle");

    const description =
      document.getElementById("chapterDescription");

    if (title) {
      title.textContent =
        `📚 Class ${selectedClass} — Chapters`;
    }

    if (description) {
      description.textContent =
        selectedSubject
          ? `${selectedSubject} के उपलब्ध learning chapters`
          : "विषय चुनें और उपलब्ध chapters देखें।";
    }
  }

  function init() {

    selectedClass =
      readClassFromURL();

    const params =
      new URLSearchParams(window.location.search);

    const requestedSubject =
      params.get("subject");

    const subjects =
      getSubjects(selectedClass);

    if (
      requestedSubject &&
      subjects.includes(requestedSubject)
    ) {
      selectedSubject = requestedSubject;
    } else {
      selectedSubject =
        subjects[0] || "";
    }

    updateHero();
    renderSubjects();
    renderChapters();

    const requestedChapter =
      params.get("chapter");

    if (requestedChapter) {

      const chapter =
        getChapterById(requestedChapter);

      if (chapter) {
        showChapterPreview(chapter);
      }
    }
  }

  function showChapterPreview(chapter) {

    const grid =
      document.getElementById("chapterGrid");

    if (!grid) return;

    const current =
      grid.querySelector(
        `[href*="${encodeURIComponent(chapter.id)}"]`
      );

    if (current) {
      current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  window.ARS_CHAPTERS = {
    data: CHAPTERS,
    getClassData,
    getSubjects,
    getChapters,
    getChapterById
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
