/** Renders data/latest_publications.json (a short highlight list for the About page). */
Site.load("./data/latest_publications.json", "latest-publications-container", (container, papers) => {
  papers.forEach((paper) => container.appendChild(Site.paperCard(paper)));
});
