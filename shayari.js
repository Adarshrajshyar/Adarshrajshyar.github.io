/* =========================================================
   ARS OFFICIAL
   Shayari Data & Utilities
   ========================================================= */

(function () {
  "use strict";

  const SHAYARI_CATEGORIES = [
    {
      id: "love",
      name: "Love",
      icon: "❤️"
    },
    {
      id: "sad",
      name: "Sad",
      icon: "💙"
    },
    {
      id: "motivational",
      name: "Motivational",
      icon: "🔥"
    },
    {
      id: "friendship",
      name: "Friendship",
      icon: "🤝"
    },
    {
      id: "attitude",
      name: "Attitude",
      icon: "✨"
    },
    {
      id: "teachers",
      name: "Teachers Shayari",
      icon: "📚"
    }
  ];

  const TEACHER_CATEGORIES = [
    {
      id: "general-teacher",
      name: "General Teacher"
    },
    {
      id: "favourite-teacher",
      name: "Favourite Teacher"
    },
    {
      id: "maths-teacher",
      name: "Maths Teacher"
    },
    {
      id: "english-teacher",
      name: "English Teacher"
    },
    {
      id: "hindi-teacher",
      name: "Hindi Teacher"
    },
    {
      id: "science-teacher",
      name: "Science Teacher"
    },
    {
      id: "social-science-teacher",
      name: "Social Science Teacher"
    },
    {
      id: "class-teacher",
      name: "Class Teacher"
    },
    {
      id: "teacher-appreciation",
      name: "Teacher Appreciation"
    },
    {
      id: "teachers-day",
      name: "Teacher's Day"
    }
  ];

  const SHAYARI_ACTIONS = [
    "like",
    "favorite",
    "save",
    "copy",
    "share"
  ];

  function normalizeCategory(category) {

    const value =
      String(category || "")
        .trim()
        .toLowerCase();

    const aliases = {
      motivation: "motivational",
      motivational: "motivational",
      love: "love",
      sad: "sad",
      friendship: "friendship",
      attitude: "attitude",
      teacher: "teachers",
      teachers: "teachers"
    };

    return aliases[value] || value;

  }

  function getCategoryName(category) {

    const normalized =
      normalizeCategory(category);

    const categoryObject =
      SHAYARI_CATEGORIES.find(
        item => item.id === normalized
      );

    return categoryObject
      ? categoryObject.name
      : category;

  }

  function filterByCategory(items, category) {

    if (!Array.isArray(items)) {
      return [];
    }

    if (!category || category === "all") {
      return items;
    }

    const normalized =
      normalizeCategory(category);

    return items.filter(item => {

      return normalizeCategory(
        item.category
      ) === normalized;

    });

  }

  function search(items, query) {

    if (!Array.isArray(items)) {
      return [];
    }

    const cleanQuery =
      String(query || "")
        .trim()
        .toLowerCase();

    if (!cleanQuery) {
      return items;
    }

    return items.filter(item => {

      const text =
        String(item.text || "")
          .toLowerCase();

      const category =
        String(item.category || "")
          .toLowerCase();

      const title =
        String(item.title || "")
          .toLowerCase();

      return (
        text.includes(cleanQuery) ||
        category.includes(cleanQuery) ||
        title.includes(cleanQuery)
      );

    });

  }

  function getItemById(items, id) {

    if (!Array.isArray(items)) {
      return null;
    }

    return items.find(
      item => String(item.id) === String(id)
    ) || null;

  }

  function getCategories() {
    return SHAYARI_CATEGORIES.map(
      item => ({ ...item })
    );
  }

  function getTeacherCategories() {
    return TEACHER_CATEGORIES.map(
      item => ({ ...item })
    );
  }

  function getActions() {
    return [...SHAYARI_ACTIONS];
  }

  window.ARS_SHAYARI = {

    categories: getCategories(),

    teacherCategories:
      getTeacherCategories(),

    actions:
      getActions(),

    normalizeCategory,

    getCategoryName,

    filterByCategory,

    search,

    getItemById

  };

})();
