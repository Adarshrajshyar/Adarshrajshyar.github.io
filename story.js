/* =========================================================
   ARS OFFICIAL — STORY SYSTEM
   ========================================================= */

(function () {
  "use strict";

  const stories = [
    {
      id: "ARS-STORY-001",
      title: "एक छोटे सपने से बड़ी शुरुआत",
      category: "Journey",
      author: "Adarsh Raj",
      date: "2026",
      text:
        "हर बड़ी शुरुआत एक छोटे से विचार से होती है। " +
        "ARS Official का उद्देश्य creativity, technology " +
        "और knowledge को एक साथ जोड़कर एक उपयोगी platform बनाना है."
    },

    {
      id: "ARS-STORY-002",
      title: "सीखना और आगे बढ़ना",
      category: "Inspiration",
      author: "ARS Official",
      date: "2026",
      text:
        "सीखने की कोई अंतिम सीमा नहीं होती। " +
        "हर नया अनुभव हमें बेहतर बनने का अवसर देता है."
    },

    {
      id: "ARS-STORY-003",
      title: "Technology के साथ नई सोच",
      category: "Technology",
      author: "ARS Official",
      date: "2026",
      text:
        "Technology केवल सुविधा नहीं है। " +
        "सही सोच के साथ technology नई possibilities को जन्म देती है."
    }
  ];

  function getStories() {
    return [...stories];
  }

  function getStoryById(id) {
    return stories.find(
      story => story.id === id
    ) || null;
  }

  function renderStories(container) {
    if (!container) return;

    container.innerHTML = "";

    stories.forEach(story => {
      const article =
        document.createElement("article");

      article.className = "story-card";

      article.innerHTML = `
        <div class="story-card-top">
          <span class="story-category">
            ${escapeHTML(story.category)}
          </span>

          <span class="story-date">
            ${escapeHTML(story.date)}
          </span>
        </div>

        <h3>${escapeHTML(story.title)}</h3>

        <p>${escapeHTML(story.text)}</p>

        <div class="story-footer">
          <span>
            By ${escapeHTML(story.author)}
          </span>

          <button
            type="button"
            class="story-share"
            data-story-id="${escapeHTML(story.id)}">
            Share
          </button>
        </div>
      `;

      container.appendChild(article);
    });

    bindShareButtons(container);
  }

  function bindShareButtons(container) {
    container
      .querySelectorAll(".story-share")
      .forEach(button => {

        button.addEventListener("click", async () => {

          const story =
            getStoryById(
              button.dataset.storyId
            );

          if (!story) return;

          const shareText =
            `${story.title}\n\n${story.text}`;

          if (window.ARS?.shareContent) {

            await window.ARS.shareContent({
              title: story.title,
              text: shareText
            });

          } else {

            try {
              await navigator.clipboard.writeText(
                shareText
              );

              if (window.ARS?.showToast) {
                window.ARS.showToast(
                  "Story copied ✓"
                );
              }

            } catch (_) {}
          }
        });
      });
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  window.ARS = window.ARS || {};

  window.ARS.stories = {
    all: getStories,
    get: getStoryById,
    render: renderStories
  };

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      const container =
        document.querySelector(
          "[data-story-container]"
        );

      if (container) {
        renderStories(container);
      }

    }
  );

})();
