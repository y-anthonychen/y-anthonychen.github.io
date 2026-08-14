/** Renders data/presentations.json as a photo collage (mixed aspect ratios, no cropping). */
Site.load("./data/presentations.json", "presentations-container", (container, photos) => {
  photos.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    container.appendChild(img);
  });
});
