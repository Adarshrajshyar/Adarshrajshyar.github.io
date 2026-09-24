"use strict";

/*
 * ARS Official
 * ARS AI Frontend Controller
 *
 * Important:
 * Production AI request backend के माध्यम से जाएगा।
 * API key frontend में नहीं रखी जाएगी।
 */

(function () {

  let currentShayari = "";
  let lastRequest = null;

  const DEMO_TEMPLATES = {

    hi: {
      love: [
        "{name}, तुम्हारी मुस्कान में एक अलग सी बात है,\nतुम्हारा साथ हो तो हर पल खास है।",
        "जिसके लिए दिल में सम्मान और अपनापन रहे,\nउसके साथ बिताया हर पल यादगार रहे।"
      ],

      sad: [
        "कुछ बातें शब्दों में नहीं कही जातीं,\nकुछ यादें दिल से कभी नहीं जातीं।",
        "खामोशी भी कभी-कभी बहुत कुछ कहती है,\nयादों की दुनिया चुपचाप साथ रहती है।"
      ],

      motivational: [
        "रास्ते कठिन हैं तो कदम और मजबूत कर,\nआज नहीं तो कल अपने सपनों को पूरा कर।",
        "छोटी शुरुआत से बड़ी कहानी बनती है,\nलगातार कोशिश से नई पहचान बनती है।"
      ],

      friendship: [
        "दोस्ती वह रिश्ता है जो दूरी में भी साथ रहे,\nमुश्किल समय में बिना कहे दिल की बात समझे।",
        "कुछ रिश्ते नाम से नहीं, एहसास से पहचाने जाते हैं,\nसच्चे दोस्त दूर रहकर भी पास नजर आते हैं।"
      ],

      attitude: [
        "रास्ते अपने हैं, मंज़िल भी अपनी होगी,\nमेहनत सच्ची हो तो पहचान भी अपनी होगी।",
        "भीड़ का हिस्सा बनना जरूरी नहीं,\nअपनी राह बनाना भी एक खूबसूरत बात है।"
      ],

      teachers: [
        "शब्दों से जो ज्ञान की राह दिखाते हैं,\nवही शिक्षक जीवन को बेहतर बनाते हैं।",
        "किताबों से आगे जीवन समझाते हैं,\nशिक्षक हमारे सपनों को राह दिखाते हैं।"
      ]
    },

    en: {
      love: [
        "{name}, some moments become special when shared,\nAnd some memories stay because someone cared."
      ],

      sad: [
        "Some memories quietly stay behind,\nLeaving little lessons for the heart to find."
      ],

      motivational: [
        "Take one more step when the road feels long,\nSmall efforts can slowly make you strong."
      ],

      friendship: [
        "A true friend stays when the days are tough,\nSometimes silent support is more than enough."
      ],

      attitude: [
        "Walk your path and build your own way,\nLet your honest effort speak every day."
      ],

      teachers: [
        "A teacher gives more than lessons to learn,\nThey help us find the paths we choose to earn."
      ]
    }

  };

  const LENGTH_MAP = {
    2: 2,
    4: 4,
    6: 6
  };

  function get(id) {
    return document.getElementById(id);
  }

  function showToast(message) {

    if (
      window.ARS_APP &&
      typeof window.ARS_APP.toast === "function"
    ) {
      window.ARS_APP.toast(message);
      return;
    }

    const toast = get("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  function cleanInput(value, maxLength) {

    return String(value || "")
      .replace(/[<>]/g, "")
      .trim()
      .slice(0, maxLength);
  }

  function collectRequest() {

    return {
      name: cleanInput(
        get("aiName")?.value,
        60
      ),

      forWhom: cleanInput(
        get("aiFor")?.value,
        60
      ),

      category:
        get("aiCategory")?.value || "motivational",

      mood:
        get("aiMood")?.value || "positive",

      style:
        get("aiStyle")?.value || "simple",

      length:
        Number(get("aiLength")?.value || 4),

      language:
        get("aiLanguage")?.value || "hi"
    };
  }

  function personalize(text, request) {

    let result = text;

    if (request.name) {
      result = result.replace(
        /\{name\}/g,
        request.name
      );
    } else {
      result = result.replace(
        /\{name\},?\s*/g,
        ""
      );
    }

    if (request.forWhom) {

      if (request.language === "hi") {

        result +=
          `\n${request.forWhom} के लिए ये शब्द दिल से निकले हैं।`;

      } else {

        result +=
          `\nThese words are written especially for ${request.forWhom}.`;

      }

    }

    return result;
  }

  function createDemoShayari(request) {

    const language =
      request.language === "en"
        ? "en"
        : "hi";

    const category =
      DEMO_TEMPLATES[language][request.category]
        ? request.category
        : "motivational";

    const templates =
      DEMO_TEMPLATES[language][category];

    let selected =
      templates[
        Math.floor(Math.random() * templates.length)
      ];

    selected =
      personalize(selected, request);

    const targetLength =
      LENGTH_MAP[request.length] || 4;

    const lines =
      selected.split("\n");

    if (lines.length < targetLength) {

      while (lines.length < targetLength) {

        if (language === "hi") {
          lines.push(
            "हर नई कोशिश अपने भीतर एक नई उम्मीद जगाती है।"
          );
        } else {
          lines.push(
            "Every new effort can bring a little more hope."
          );
        }

      }

    }

    return lines
      .slice(0, targetLength)
      .join("\n");
  }

  async function requestFromBackend(request) {

    const apiBase =
      window.CONFIG?.backend?.baseUrl ||
      window.CONFIG?.backendUrl ||
      "";

    if (!apiBase) {
      return null;
    }

    try {

      const response = await fetch(
        `${apiBase}/api/ai/shayari`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(request)
        }
      );

      if (!response.ok) {
        return null;
      }

      const data =
        await response.json();

      if (
        data &&
        data.success &&
        typeof data.shayari === "string"
      ) {
        return data.shayari.trim();
      }

      return null;

    } catch (error) {

      return null;

    }
  }

  async function generate(request) {

    /*
     * पहले backend endpoint try होगा।
     * Endpoint उपलब्ध नहीं होने पर demo mode चलेगा।
     */
    const backendResult =
      await requestFromBackend(request);

    if (backendResult) {
      return backendResult;
    }

    return createDemoShayari(request);
  }

  function renderResult(text) {

    const output =
      get("aiOutput");

    const actions =
      get("aiActions");

    if (!output) return;

    output.innerHTML = `
      <div class="generated-shayari">
        ${escapeHTML(text)}
      </div>
    `;

    if (actions) {
      actions.style.display = "flex";
    }
  }

  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>");
  }

  async function handleGenerate(event) {

    event.preventDefault();

    const button =
      get("generateAiBtn");

    const output =
      get("aiOutput");

    if (button) {
      button.disabled = true;
      button.textContent = "⏳ Creating...";
    }

    if (output) {

      output.innerHTML = `
        <div class="ai-placeholder">
          ✨ आपकी Shayari तैयार की जा रही है...
        </div>
      `;
    }

    try {

      lastRequest =
        collectRequest();

      currentShayari =
        await generate(lastRequest);

      renderResult(currentShayari);

    } catch (error) {

      currentShayari = "";

      if (output) {

        output.innerHTML = `
          <div class="ai-placeholder">
            Shayari तैयार नहीं हो सकी।
            कृपया फिर से कोशिश करें।
          </div>
        `;
      }

      showToast(
        "कुछ समस्या हुई। कृपया फिर कोशिश करें।"
      );

    } finally {

      if (button) {
        button.disabled = false;
        button.textContent = "✨ Generate Shayari";
      }

    }
  }

  async function copyCurrent() {

    if (!currentShayari) {
      showToast("पहले Shayari generate करें।");
      return;
    }

    try {

      await navigator.clipboard.writeText(
        currentShayari
      );

      showToast("Shayari copy हो गई।");

    } catch (error) {

      showToast("Copy नहीं हो सका।");

    }
  }

  function saveCurrent() {

    if (!currentShayari) {
      showToast("पहले Shayari generate करें।");
      return;
    }

    if (
      window.ARS_STORAGE &&
      typeof window.ARS_STORAGE.set === "function"
    ) {

      const existing =
        window.ARS_STORAGE.get(
          "ars_ai_saved",
          []
        );

      const items =
        Array.isArray(existing)
          ? existing
          : [];

      items.unshift({
        id:
          `ai-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        text: currentShayari,
        request: lastRequest,
        createdAt: new Date().toISOString()
      });

      window.ARS_STORAGE.set(
        "ars_ai_saved",
        items.slice(0, 50)
      );

      showToast("Shayari save हो गई।");

      return;
    }

    showToast("Save service अभी उपलब्ध नहीं है।");
  }

  async function shareCurrent() {

    if (!currentShayari) {
      showToast("पहले Shayari generate करें।");
      return;
    }

    if (navigator.share) {

      try {

        await navigator.share({
          title: "ARS AI Shayari",
          text: currentShayari,
          url: window.location.href
        });

      } catch (error) {
        // User cancelled sharing.
      }

      return;
    }

    await copyCurrent();

    showToast("Shayari copy हो गई।");
  }

  async function regenerate() {

    if (!lastRequest) {

      lastRequest =
        collectRequest();

    }

    const button =
      get("regenerateAiBtn");

    if (button) {
      button.disabled = true;
      button.textContent = "⏳";
    }

    try {

      currentShayari =
        await generate(lastRequest);

      renderResult(currentShayari);

    } finally {

      if (button) {
        button.disabled = false;
        button.textContent = "🔄 Regenerate";
      }

    }
  }

  function init() {

    const form =
      get("aiForm");

    if (form) {
      form.addEventListener(
        "submit",
        handleGenerate
      );
    }

    get("copyAiBtn")?.addEventListener(
      "click",
      copyCurrent
    );

    get("saveAiBtn")?.addEventListener(
      "click",
      saveCurrent
    );

    get("shareAiBtn")?.addEventListener(
      "click",
      shareCurrent
    );

    get("regenerateAiBtn")?.addEventListener(
      "click",
      regenerate
    );

  }

  window.ARS_AI = {
    generate,
    createDemoShayari,
    getCurrent: () => currentShayari
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
