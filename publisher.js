/* =========================================================
   ARS OFFICIAL — PUBLISHER CONTROLLER
   File: publisher.js
   ========================================================= */

(() => {
  "use strict";

  const CONFIG = window.ARS_CONFIG || {};
  const API_BASE =
    CONFIG.backend?.baseUrl ||
    CONFIG.apiBaseUrl ||
    "https://ars-backend-hbbk.onrender.com";

  const state = {
    authenticated: false,
    module: "",
    editingId: null
  };

  const $ = (selector) => document.querySelector(selector);

  function showMessage(message, type = "info") {
    const box = $("#publisherMessage");
    if (!box) return;

    box.textContent = message;
    box.dataset.type = type;
    box.hidden = false;
  }

  function hideMessage() {
    const box = $("#publisherMessage");
    if (box) box.hidden = true;
  }

  function openEditor(moduleName, item = null) {
    const editor = $("#publisherEditor");
    const title = $("#editorTitle");
    const form = $("#publisherForm");

    if (!editor || !title || !form) return;

    state.module = moduleName;
    state.editingId = item?.id || null;

    const names = {
      shayari: "Shayari",
      stories: "Stories / Poetry",
      education: "Education",
      dictionary: "Dictionary"
    };

    title.textContent = item
      ? `Edit ${names[moduleName] || "Content"}`
      : `Add ${names[moduleName] || "Content"}`;

    const contentTitle = $("#contentTitle");
    const contentCategory = $("#contentCategory");
    const contentStatus = $("#contentStatus");
    const contentBody = $("#contentBody");

    if (contentTitle) contentTitle.value = item?.title || "";
    if (contentCategory) contentCategory.value = item?.category || "";
    if (contentStatus) contentStatus.value = item?.status || "draft";
    if (contentBody) contentBody.value = item?.body || "";

    editor.hidden = false;
    editor.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function closeEditor() {
    const editor = $("#publisherEditor");
    const form = $("#publisherForm");

    if (editor) editor.hidden = true;
    if (form) form.reset();

    state.module = "";
    state.editingId = null;
  }

  async function request(url, options = {}) {
    const response = await fetch(`${API_BASE}${url}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Publisher request failed."
      );
    }

    return data;
  }

  async function checkPublisherAccess() {
    const notice = $("#publisherAuthNotice");

    try {
      const data = await request("/api/publisher/me", {
        method: "GET"
      });

      if (!data.success || !data.authenticated) {
        throw new Error("Publisher authentication required.");
      }

      state.authenticated = true;

      if (notice) {
        notice.textContent =
          data.message || "Publisher access verified.";
        notice.dataset.type = "success";
      }

      document
        .querySelectorAll(".publisher-action")
        .forEach((button) => {
          button.disabled = false;
        });

      return true;
    } catch (error) {
      state.authenticated = false;

      if (notice) {
        notice.textContent =
          "Publisher access is not available. Please sign in with an authorized publisher account.";
        notice.dataset.type = "warning";
      }

      document
        .querySelectorAll(".publisher-action")
        .forEach((button) => {
          button.disabled = true;
        });

      return false;
    }
  }

  async function loadModule(moduleName) {
    if (!state.authenticated) {
      showMessage(
        "Publisher authentication is required before managing content.",
        "warning"
      );
      return;
    }

    try {
      showMessage("Loading publisher content...", "info");

      const data = await request(
        `/api/publisher/content?module=${encodeURIComponent(moduleName)}`,
        {
          method: "GET"
        }
      );

      hideMessage();

      const items = Array.isArray(data.items)
        ? data.items
        : [];

      renderItems(moduleName, items);
    } catch (error) {
      showMessage(
        error.message ||
          "Unable to load publisher content.",
        "error"
      );
    }
  }

  function renderItems(moduleName, items) {
    const container = $("#publisherContentList");
    if (!container) return;

    container.innerHTML = "";

    if (!items.length) {
      container.innerHTML = `
        <div class="ars-card">
          <p>No content found for this section.</p>
        </div>
      `;
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "ars-card publisher-item";

      card.innerHTML = `
        <h3></h3>
        <p class="publisher-item-category"></p>
        <p class="publisher-item-status"></p>
        <div class="publisher-item-actions">
          <button type="button" class="ars-btn publisher-edit">
            Edit
          </button>
          <button type="button" class="ars-btn publisher-toggle">
            ${item.status === "published" ? "Unpublish" : "Publish"}
          </button>
          <button type="button" class="ars-btn publisher-delete">
            Delete
          </button>
        </div>
      `;

      card.querySelector("h3").textContent =
        item.title || "Untitled";

      card.querySelector(".publisher-item-category").textContent =
        `Category: ${item.category || "General"}`;

      card.querySelector(".publisher-item-status").textContent =
        `Status: ${item.status || "draft"}`;

      card
        .querySelector(".publisher-edit")
        .addEventListener("click", () => {
          openEditor(moduleName, item);
        });

      card
        .querySelector(".publisher-toggle")
        .addEventListener("click", () => {
          togglePublish(item);
        });

      card
        .querySelector(".publisher-delete")
        .addEventListener("click", () => {
          deleteContent(item);
        });

      container.appendChild(card);
    });
  }

  async function saveContent(event) {
    event.preventDefault();

    if (!state.authenticated) {
      showMessage(
        "Publisher authentication is required.",
        "warning"
      );
      return;
    }

    const title = $("#contentTitle")?.value.trim();
    const category = $("#contentCategory")?.value.trim();
    const status = $("#contentStatus")?.value;
    const body = $("#contentBody")?.value.trim();

    if (!title || !body) {
      showMessage(
        "Title and content are required.",
        "warning"
      );
      return;
    }

    const payload = {
      module: state.module,
      title,
      category,
      status,
      body
    };

    try {
      showMessage("Saving content...", "info");

      const endpoint = state.editingId
        ? `/api/publisher/content/${encodeURIComponent(
            state.editingId
          )}`
        : "/api/publisher/content";

      const method = state.editingId ? "PUT" : "POST";

      const data = await request(endpoint, {
        method,
        body: JSON.stringify(payload)
      });

      showMessage(
        data.message || "Content saved successfully.",
        "success"
      );

      closeEditor();

      if (state.module) {
        await loadModule(state.module);
      }
    } catch (error) {
      showMessage(
        error.message || "Unable to save content.",
        "error"
      );
    }
  }

  async function togglePublish(item) {
    if (!state.authenticated || !item?.id) return;

    const nextStatus =
      item.status === "published"
        ? "draft"
        : "published";

    try {
      const data = await request(
        `/api/publisher/content/${encodeURIComponent(
          item.id
        )}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: nextStatus
          })
        }
      );

      showMessage(
        data.message || "Content status updated.",
        "success"
      );

      await loadModule(state.module);
    } catch (error) {
      showMessage(
        error.message || "Unable to update status.",
        "error"
      );
    }
  }

  async function deleteContent(item) {
    if (!state.authenticated || !item?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this content?"
    );

    if (!confirmed) return;

    try {
      const data = await request(
        `/api/publisher/content/${encodeURIComponent(
          item.id
        )}`,
        {
          method: "DELETE"
        }
      );

      showMessage(
        data.message || "Content deleted.",
        "success"
      );

      await loadModule(state.module);
    } catch (error) {
      showMessage(
        error.message || "Unable to delete content.",
        "error"
      );
    }
  }

  function init() {
    document
      .querySelectorAll(".publisher-action")
      .forEach((button) => {
        button.disabled = true;

        button.addEventListener("click", () => {
          const moduleName = button.dataset.module;

          if (!moduleName) return;

          openEditor(moduleName);
          loadModule(moduleName);
        });
      });

    $("#publisherForm")?.addEventListener(
      "submit",
      saveContent
    );

    $("#closeEditor")?.addEventListener(
      "click",
      closeEditor
    );

    checkPublisherAccess();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.ARS_PUBLISHER = {
    checkPublisherAccess,
    loadModule,
    openEditor,
    closeEditor
  };
})();
