/** Renders data/talks.json: institution + date, one per line. */
Site.load("./data/talks.json", "talks-container", (container, talks) => {
  talks.forEach(({ institution, date }) => {
    const item = Site.el("div", "item");
    item.appendChild(Site.el("p", "item-title", institution));
    if (date) item.appendChild(Site.el("p", "item-meta", date));
    container.appendChild(item);
  });
});
