// Simple include loader for header/footer and other shared partials
document.querySelectorAll("[data-include]").forEach((el) => {
  const file = el.getAttribute("data-include");
  if (!file) return;

  fetch(file)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load include: " + file);
      }
      return res.text();
    })
    .then((html) => {
      el.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
});
