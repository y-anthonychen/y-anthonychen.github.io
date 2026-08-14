/**
 * Places photos from data/scenery.json wherever an accent-photo container
 * exists on the current page. Each container is optional and independent —
 * a page only gets the slots it has markup for.
 *   - #scenery-divider (index.html): a wide divider band, uses photos[0]
 *   - #research-accent-photo (research.html): a small side crop, photos[1]
 *   - #funding-accent-photo (research.html): a small side crop, photos[2]
 */
(async () => {
  const photos = await Site.fetchJSON("./data/scenery.json");
  if (!photos || !photos.length) return;

  const setPhoto = (containerId, photo, imgClass) => {
    const container = document.getElementById(containerId);
    if (!container || !photo) return;
    const img = document.createElement("img");
    if (imgClass) img.className = imgClass;
    img.src = photo.src;
    img.alt = photo.alt || "";
    container.appendChild(img);
    container.hidden = false;
  };

  setPhoto("scenery-divider", photos[0], "scenery-divider-img");
  setPhoto("research-accent-photo", photos[1]);
  setPhoto("funding-accent-photo", photos[2]);
})();
