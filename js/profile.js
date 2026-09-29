/** Renders data/profile.json into the About section (photo, name, role, bio, links). */

// Inline SVGs for profile links, keyed by each link's optional "icon" field.
const PROFILE_ICONS = {
  scholar:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>',
  orcid:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  cv:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
  email:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></svg>',
};

Site.load("./data/profile.json", "profile-container", (container, profile) => {
  const wrapper = Site.el("div", "profile");

  if (profile.photoPath) {
    const img = Site.el("img", "profile-photo");
    img.src = profile.photoPath;
    img.alt = profile.name || "Profile photo";
    wrapper.appendChild(img);
  }

  const body = Site.el("div", "profile-body");
  body.appendChild(Site.el("h1", null, profile.name || ""));

  const role = [profile.title, profile.affiliation].filter(Boolean).join(", ");
  if (role) body.appendChild(Site.el("p", "profile-role", role));

  (profile.bio || []).forEach((paragraph) => {
    const p = Site.el("p", "profile-bio");
    // paragraph is trusted site-owner content from data/profile.json
    p.innerHTML = paragraph;
    p.querySelectorAll("a").forEach((a) => a.setAttribute("rel", "noopener"));
    body.appendChild(p);
  });

  if (profile.links && profile.links.length) {
    const list = Site.el("ul", "profile-links");
    profile.links.forEach(({ label, url, icon }) => {
      const li = document.createElement("li");
      const a = Site.link(url, label);
      if (PROFILE_ICONS[icon]) {
        a.innerHTML = PROFILE_ICONS[icon];
        a.classList.add("profile-icon-link");
        a.setAttribute("aria-label", label);
        a.title = label;
      }
      li.appendChild(a);
      list.appendChild(li);
    });
    body.appendChild(list);
  }

  if (profile.note) {
    const note = Site.el("p", "profile-note");
    note.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>';
    const text = document.createElement("span");
    // note is trusted site-owner content from data/profile.json
    text.innerHTML = profile.note;
    note.appendChild(text);
    body.appendChild(note);
  }

  wrapper.appendChild(body);
  container.appendChild(wrapper);
});
