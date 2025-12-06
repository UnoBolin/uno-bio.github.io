// Load header and footer into pages that use data-include attributes
document.querySelectorAll("[data-include]").forEach(el => {
  const file = el.getAttribute("data-include");
  fetch(file)
    .then(res => res.text())
    .then(html => (el.innerHTML = html))
    .catch(err => console.error("Include load error:", err));
});
