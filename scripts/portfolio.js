// === Portfolio internal dropdown (Overview / Animations / Images / Protocols) ===
(function () {
  const dropdown = document.querySelector(".portfolio-dropdown");
  if (!dropdown) return;

  const toggle = dropdown.querySelector(".portfolio-dropdown-toggle");
  const menu = dropdown.querySelector(".portfolio-dropdown-menu");
  const items = menu.querySelectorAll("li");

  // Start closed
  menu.style.display = "none";

  // Toggle dropdown open/closed
  toggle.addEventListener("click", () => {
    const isOpen = menu.style.display === "block";
    menu.style.display = isOpen ? "none" : "block";
  });

  // Clicking an item: scroll + update label + active state
  items.forEach((li) => {
    li.addEventListener("click", () => {
      const targetSelector = li.getAttribute("data-target");
      const section = document.querySelector(targetSelector);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Update active item and button label
      items.forEach((x) => x.classList.remove("active"));
      li.classList.add("active");
      toggle.textContent = li.textContent + " ▾";

      // Close the menu
      menu.style.display = "none";
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      menu.style.display = "none";
    }
  });
})();

// === Simple image + video carousels for Protocols / Images / Animations ===
(function () {
  const carousels = document.querySelectorAll(".portfolio-carousel");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    // Treat images + videos as slides
    const slides = carousel.querySelectorAll(
      ".carousel-window img, .carousel-window video.carousel-video"
    );
    if (!slides.length) return;

    let index = 0;

    // Show first slide
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === 0);
    });

    const show = (i) => {
      slides.forEach((slide, idx) => {
        const isActive = idx === i;
        slide.classList.toggle("active", isActive);

        // If a video slide is hidden, pause + reset it
        if (slide.tagName === "VIDEO" && !isActive) {
          slide.pause();
          try {
            slide.currentTime = 0;
          } catch (e) {
            // some browsers might block setting currentTime immediately
          }
        }
      });
    };

    const prevBtn = carousel.querySelector(".carousel-arrow.prev");
    const nextBtn = carousel.querySelector(".carousel-arrow.next");

    if (!prevBtn || !nextBtn) return;

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      show(index);
    });

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      show(index);
    });

    // Optional: hook up the play/pause overlay if present
    const video = carousel.querySelector("video.carousel-video");
    const playButton = carousel.querySelector(".video-playpause");

    if (video && playButton) {
      playButton.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          playButton.textContent = "❚❚";
        } else {
          video.pause();
          playButton.textContent = "▶";
        }
      });
    }
  });
})();
