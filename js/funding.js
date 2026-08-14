/** Renders data/funding.json: funder name + linked award/grant title, one per line. */
Site.load("./data/funding.json", "funding-container", (container, funders) => {
  funders.forEach(({ name, title, url }) => {
    const item = Site.el("div", "item");
    item.appendChild(Site.el("p", "item-title", name));
    const award = Site.el("p", "item-meta");
    if (url) award.appendChild(Site.link(url, title));
    else award.textContent = title;
    item.appendChild(award);
    container.appendChild(item);
  });
});
