"use strict";

window.ARS_STORIES = {
  categories: {
    "Poem": [],
    "Horror": [],
    "Friendship": [],
    "Emotional": [],
    "Story": [],
    "Moral": [],
    "Mystery": [],
    "Biography": [],
    "Motivation": []
  },

  get(category) {
    return this.categories[category] || [];
  },

  add(category, story) {
    if (!category || !story) return false;

    if (!Array.isArray(this.categories[category])) {
      this.categories[category] = [];
    }

    this.categories[category].push({
      id: "ARS-STORY-" + Date.now(),
      title: story.title || "Untitled Story",
      content: story.content || "",
      author: story.author || "ARS Official",
      createdAt: new Date().toISOString()
    });

    return true;
  },

  all() {
    return Object.entries(this.categories).flatMap(
      ([category, stories]) =>
        stories.map(story => ({
          ...story,
          category
        }))
    );
  }
};
