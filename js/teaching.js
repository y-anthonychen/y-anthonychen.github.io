/**
 * Renders data/teaching.json on teaching.html:
 *   courses        -> icon cards (each course lists its roles/terms)
 *   guest_lectures -> simple list: title + department — institution
 * Any group that is missing or empty is skipped.
 */

// Inline SVG icons for course cards, keyed by each course's "icon" field.
const TEACHING_ICONS = {
  // Two chat bubbles, the front one holding a heart.
  relationships:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M9 7h19a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H16l-6 5v-5H9a5 5 0 0 1-5-5v-8a5 5 0 0 1 5-5z"/>' +
    '<circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none"/>' +
    '<circle cx="17.5" cy="16" r="1.3" fill="currentColor" stroke="none"/>' +
    '<circle cx="23" cy="16" r="1.3" fill="currentColor" stroke="none"/>' +
    '<path class="icon-fill-bg" d="M21 19h18a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-1v5l-6-5H21a5 5 0 0 1-5-5v-8a5 5 0 0 1 5-5z"/>' +
    '<path class="icon-fill-accent" stroke="none" d="M30 33.8s-5.2-3.1-5.2-6.6a2.7 2.7 0 0 1 5.2-1.2 2.7 2.7 0 0 1 5.2 1.2c0 3.5-5.2 6.6-5.2 6.6z"/>' +
    "</svg>",
  // Scatter plot with a fitted trend line.
  methods:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M6 5v37h37"/>' +
    '<path class="icon-stroke-accent" d="M11 36L41 11"/>' +
    '<circle cx="14" cy="30" r="2" fill="currentColor" stroke="none"/>' +
    '<circle cx="19" cy="34" r="2" fill="currentColor" stroke="none"/>' +
    '<circle cx="22" cy="25" r="2" fill="currentColor" stroke="none"/>' +
    '<circle cx="28" cy="27" r="2" fill="currentColor" stroke="none"/>' +
    '<circle cx="31" cy="17" r="2" fill="currentColor" stroke="none"/>' +
    '<circle cx="36" cy="20" r="2" fill="currentColor" stroke="none"/>' +
    '<circle cx="39" cy="10" r="2" fill="currentColor" stroke="none"/>' +
    "</svg>",
  // Megaphone with sound waves.
  persuasion:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M9 18h6l17-9v28l-17-9H9a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3z"/>' +
    '<path d="M15 18v10"/>' +
    '<path d="M12 28l3 10h5l-2.6-9"/>' +
    '<path class="icon-stroke-accent" d="M37 18a7 7 0 0 1 0 10"/>' +
    '<path class="icon-stroke-accent" d="M41 13.5a13 13 0 0 1 0 19"/>' +
    "</svg>",
};

Site.load("./data/teaching.json", "teaching-container", (container, data) => {
  const group = (heading, items) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    const section = Site.el("div", "subsection");
    section.appendChild(Site.el("h3", null, heading));
    container.appendChild(section);
    return section;
  };

  const courses = group("Courses", data.courses);
  if (courses) {
    const grid = Site.el("div", "course-cards");
    data.courses.forEach(({ title, institution, icon, roles, description }) => {
      const card = Site.el("article", "course-card");
      if (TEACHING_ICONS[icon]) {
        const badge = Site.el("div", "course-icon");
        badge.innerHTML = TEACHING_ICONS[icon];
        card.appendChild(badge);
      }
      card.appendChild(Site.el("p", "course-title", title));
      if (institution) card.appendChild(Site.el("p", "item-meta", institution));
      if (description) card.appendChild(Site.el("p", "item-description", description));
      if (Array.isArray(roles) && roles.length) {
        const list = Site.el("ul", "course-roles");
        roles.forEach(({ role, term }) => {
          const li = Site.el("li");
          li.appendChild(Site.el("span", "course-role", role));
          if (term) li.appendChild(Site.el("span", "course-term", term));
          list.appendChild(li);
        });
        card.appendChild(list);
      }
      grid.appendChild(card);
    });
    courses.appendChild(grid);
  }

  const guest = group("Guest Lectures", data.guest_lectures);
  if (guest) {
    data.guest_lectures.forEach(({ title, department, institution }) => {
      const item = Site.el("div", "item");
      item.appendChild(Site.el("p", "item-title", title));
      const meta = [department, institution].filter(Boolean).join(" — ");
      if (meta) item.appendChild(Site.el("p", "item-meta", meta));
      guest.appendChild(item);
    });
  }
});
