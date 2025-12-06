// scripts/includes.js
// Simple partial loader for elements with data-include="/path/to/file.html"

document.addEventListener("DOMContentLoaded", () => {
  const includeTargets = document.querySelectorAll("[data-include]");

  includeTargets.forEach((el) => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        el.innerHTML = html;
      })
      .catch((err) => {
        console.error(err);
        el.innerHTML = "";
      });
  });
});
