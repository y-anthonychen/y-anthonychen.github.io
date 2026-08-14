/**
 * Shared site chrome: page title, nav name, footer, CV nav link.
 * Runs on every page (index.html, research.html, ...), independent of
 * whatever section-specific content that page renders.
 */
(async () => {
  const profile = await Site.fetchJSON("./data/profile.json");
  if (!profile) return;

  if (profile.name) {
    const pageTitle = document.body.dataset.pageTitle;
    document.title = pageTitle ? `${pageTitle} — ${profile.name}` : profile.name;

    const navName = document.getElementById("nav-name");
    if (navName) navName.textContent = profile.name;

    const footer = document.getElementById("footer-text");
    if (footer) {
      footer.textContent = `© ${new Date().getFullYear()} ${profile.name}`;
    }
  }

  if (profile.links && profile.links.length) {
    const cvLink = profile.links.find(
      ({ label }) => (label || "").trim().toLowerCase() === "cv"
    );
    const navCvItem = document.getElementById("nav-cv-item");
    const navCv = document.getElementById("nav-cv");
    if (cvLink && navCvItem && navCv) {
      navCv.href = cvLink.url;
      navCvItem.hidden = false;
    }
  }
})();
