/* =========================================================
   ARS OFFICIAL — SHAYARI SYSTEM
   ========================================================= */

(function () {
  "use strict";

  const shayariData = [
    {
      category: "Motivation",
      title: "सपनों की उड़ान",
      text: "मंज़िल उन्हीं को मिलती है,\nजो रास्तों से हार नहीं मानते।"
    },
    {
      category: "Life",
      title: "ज़िंदगी",
      text: "ज़िंदगी एक सफ़र है,\nहर कदम कुछ नया सिखाता है।"
    },
    {
      category: "Success",
      title: "कामयाबी",
      text: "मेहनत की रोशनी में,\nकामयाबी का रास्ता दिखाई देता है।"
    },
    {
      category: "Inspiration",
      title: "नई शुरुआत",
      text: "हर सुबह एक नया अवसर है,\nबस शुरुआत करने की देर है।"
    },
    {
      category: "Dream",
      title: "सपने",
      text: "सपने वही सच होते हैं,\nजिनके लिए इंसान मेहनत करता है।"
    },
    {
      category: "Friendship",
      title: "दोस्ती",
      text: "सच्ची दोस्ती शब्दों की मोहताज नहीं,\nवक़्त आने पर खुद पहचान में आ जाती है।"
    }
  ];

  function getShayari() {
    return [...shayariData];
  }

  function randomShayari() {
    return shayariData[
      Math.floor(Math.random() * shayariData.length)
    ];
  }

  function renderShayari(container, items = shayariData) {
    if (!container) return;

    container.innerHTML = "";

    items.forEach((item, index) => {
      const card = document.createElement("article");

      card.className = "shayari-card";

      card.innerHTML = `
        <span class="shayari-category">
          ${escapeHTML(item.category)}
        </span>

        <h3>${escapeHTML(item.title)}</h3>

        <p>${escapeHTML(item.text).replace(/\n/g, "<br>")}</p>

        <div class="shayari-actions">
          <button
            type="button"
            class="ars-shayari-copy"
            data-shayari-index="${index}">
            Copy
          </button>

          <button
            type="button"
            class="ars-shayari-share"
            data-shayari-index="${index}">
            Share
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    bindActions(container);
  }

  function bindActions(container) {
    container
      .querySelectorAll(".ars-shayari-copy")
      .forEach(button => {
        button.addEventListener("click", async () => {
          const item =
            shayariData[
              Number(button.dataset.shayariIndex)
            ];

          if (!item) return;

          try {
            await navigator.clipboard.writeText(item.text);

            if (window.ARS?.showToast) {
              window.ARS.showToast("Shayari copied ✓");
            }
          } catch (_) {
            if (window.ARS?.showToast) {
              window.ARS.showToast("Copy failed");
            }
          }
        });
      });

    container
      .querySelectorAll(".ars-shayari-share")
      .forEach(button => {
        button.addEventListener("click", async () => {
          const item =
            shayariData[
              Number(button.dataset.shayariIndex)
            ];

          if (!item) return;

          if (window.ARS?.shareContent) {
            await window.ARS.shareContent({
              title: item.title,
              text: item.text
            });
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

  window.ARS.shayari = {
    data: getShayari,
    random: randomShayari,
    render: renderShayari
  };

  document.addEventListener("DOMContentLoaded", () => {
    const container =
      document.querySelector("[data-shayari-container]");

    if (container) {
      renderShayari(container);
    }
  });

})();
