/* =========================================================
   ARS OFFICIAL — ADMIN CONTROLLER
   File: admin.js
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
    activeModule: null
  };

  const $ = (selector) => document.querySelector(selector);

  function showMessage(message, type = "info") {
    const box = $("#adminMessage");

    if (!box) return;

    box.textContent = message;
    box.dataset.type = type;
    box.hidden = false;
  }

  function clearMessage() {
    const box = $("#adminMessage");

    if (box) {
      box.textContent = "";
      box.hidden = true;
    }
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
        data.message || "Admin request failed."
      );
    }

    return data;
  }

  async function checkAdminAccess() {
    const notice = $("#adminAuthNotice");
    const dashboard = $("#adminDashboard");

    try {
      const data = await request("/api/admin/me", {
        method: "GET"
      });

      if (!data.success || !data.authenticated) {
        throw new Error(
          "Administrator authentication required."
        );
      }

      state.authenticated = true;

      if (notice) {
        notice.textContent =
          data.message ||
          "Admin authentication verified.";
        notice.dataset.type = "success";
      }

      if (dashboard) {
        dashboard.hidden = false;
      }

      document
        .querySelectorAll(".admin-action")
        .forEach((button) => {
          button.disabled = false;
        });

      return true;
    } catch (error) {
      state.authenticated = false;

      if (notice) {
        notice.textContent =
          "Admin access is not available. Please sign in with an authorized administrator account.";
        notice.dataset.type = "warning";
      }

      if (dashboard) {
        dashboard.hidden = true;
      }

      return false;
    }
  }

  function setPanelTitle(title) {
    const panelTitle = $("#adminPanelTitle");

    if (panelTitle) {
      panelTitle.textContent = title;
    }
  }

  function showPanel() {
    const panel = $("#adminPanel");

    if (panel) {
      panel.hidden = false;
      panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  function closePanel() {
    const panel = $("#adminPanel");

    if (panel) {
      panel.hidden = true;
    }

    state.activeModule = null;
    clearMessage();
  }

  async function openModule(moduleName) {
    if (!state.authenticated) {
      showMessage(
        "Admin authentication is required.",
        "warning"
      );
      return;
    }

    state.activeModule = moduleName;

    const titles = {
      users: "Users / Students",
      joining: "Joining Applications",
      certificates: "Certificates",
      education: "Education Manager",
      dictionary: "Dictionary Manager",
      exam: "Exam Manager",
      content: "Content Management",
      publishers: "Publisher Management",
      reports: "Reports",
      security: "Security / Activity Logs",
      website: "Website Management"
    };

    setPanelTitle(
      titles[moduleName] || "Admin Module"
    );

    showPanel();
    clearMessage();

    const content = $("#adminPanelContent");

    if (!content) return;

    content.innerHTML = `
      <div class="ars-card">
        <p>Loading ${titles[moduleName] || "module"}...</p>
      </div>
    `;

    try {
      const data = await request(
        `/api/admin/${encodeURIComponent(moduleName)}`,
        {
          method: "GET"
        }
      );

      renderModule(moduleName, data);
    } catch (error) {
      content.innerHTML = "";

      showMessage(
        error.message ||
          "This admin module is currently unavailable.",
        "error"
      );

      content.innerHTML = `
        <div class="ars-card">
          <h3>Module unavailable</h3>
          <p>
            The secure backend did not provide data for this
            module. No demo or fake administrative data has
            been displayed.
          </p>
        </div>
      `;
    }
  }

  function renderModule(moduleName, data) {
    const content = $("#adminPanelContent");

    if (!content) return;

    content.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "ars-card";

    const title = document.createElement("h3");
    title.textContent =
      data.title ||
      moduleName.replace(/^\w/, (c) => c.toUpperCase());

    wrapper.appendChild(title);

    if (Array.isArray(data.items)) {
      if (!data.items.length) {
        const empty = document.createElement("p");
        empty.textContent =
          "No records are available.";
        wrapper.appendChild(empty);
      } else {
        const list = document.createElement("div");
        list.className = "admin-record-list";

        data.items.forEach((item) => {
          const row = document.createElement("div");
          row.className = "admin-record";

          const pre = document.createElement("pre");
          pre.textContent = JSON.stringify(
            item,
            null,
            2
          );

          row.appendChild(pre);
          list.appendChild(row);
        });

        wrapper.appendChild(list);
      }
    } else if (data.data) {
      const pre = document.createElement("pre");
      pre.textContent = JSON.stringify(
        data.data,
        null,
        2
      );

      wrapper.appendChild(pre);
    } else {
      const message = document.createElement("p");

      message.textContent =
        data.message ||
        "Module loaded successfully.";

      wrapper.appendChild(message);
    }

    content.appendChild(wrapper);
  }

  function init() {
    document
      .querySelectorAll(".admin-action")
      .forEach((button) => {
        button.disabled = true;

        button.addEventListener("click", () => {
          const moduleName =
            button.dataset.module;

          if (!moduleName) return;

          openModule(moduleName);
        });
      });

    $("#closeAdminPanel")?.addEventListener(
      "click",
      closePanel
    );

    checkAdminAccess();
  }

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

  window.ARS_ADMIN = {
    checkAdminAccess,
    openModule,
    closePanel
  };
})();
