// === Portfolio internal dropdown (Overview / Animations / Images / Protocols) ===
(function () {
  const dropdown = document.querySelector(".portfolio-dropdown");
  if (!dropdown) return;

  const toggle = dropdown.querySelector(".portfolio-dropdown-toggle");
  const menu = dropdown.querySelector(".portfolio-dropdown-menu");
  const items = menu.querySelectorAll("li");

  // Dropdown starts closed
  menu.style.display = "none";

  // Open/close when clicking the toggle
  toggle.addEventListener("click", () => {
    const open = menu.style.display === "block";
    menu.style.display = open ? "none" : "block";
  });

  // Click on item → scroll + highlight + rename toggle
  items.forEach((li) => {
    li.addEventListener("click", () => {
      const targetSelector = li.getAttribute("data-target");
      const section = document.querySelector(targetSelector);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Update active status
      items.forEach((x) => x.classList.remove("active"));
      li.classList.add("active");

      // Update dropdown button label
      toggle.textContent = li.textContent + " ▾";

      // Close menu
      menu.style.display = "none";
    });
  });

  // Close dropdown when clicking outside it
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
    // Both images and videos count as slides
    const slides = carousel.querySelectorAll(
      ".carousel-window img, .carousel-window video.carousel-video"
    );
    if (!slides.length) return;

    let index = 0;

    // Make the first slide visible
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === 0);
    });

    // Function to update visible slide
    const show = (i) => {
      slides.forEach((slide, idx) => {
        const isActive = idx === i;
        slide.classList.toggle("active", isActive);

        // Reset videos when hidden
        if (slide.tagName === "VIDEO" && !isActive) {
          slide.pause();
          try {
            slide.currentTime = 0;
          } catch (err) {}
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

    // Play/pause button for video slide (only if present)
    const video = carousel.querySelector("video.carousel-video");
    const playButton = carousel.querySelector(".video-playpause");

    if (video && playButton) {
      playButton.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          playButton.textContent = "❚❚"; // pause icon
        } else {
          video.pause();
          playButton.textContent = "▶"; // play icon
        }
      });
    }
  });
})();
