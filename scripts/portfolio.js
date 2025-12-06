// === Portfolio internal dropdown (Overview / Animations / Images / Protocols) ===
(function () {
  const dropdown = document.querySelector(".portfolio-dropdown");
  if (!dropdown) return;

  const toggle = dropdown.querySelector(".portfolio-dropdown-toggle");
  const menu = dropdown.querySelector(".portfolio-dropdown-menu");
  const items = menu.querySelectorAll("li");

  // Dropdown starts closed
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

      items.forEach((x) => x.classList.remove("active"));
      li.classList.add("active");
      toggle.textContent = li.textContent + " ▾";

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

    const video = carousel.querySelector("video.carousel-video");
    const playButton = carousel.querySelector(".video-playpause");

    // Helper: show slide at index i
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

      // Only show the play button when the video slide is actually visible
      if (video && playButton) {
        if (slides[i] === video) {
          playButton.style.display = "flex";
        } else {
          playButton.style.display = "none";
        }
      }
    };

    // Initial state: first slide visible
    show(index);

    const prevBtn = carousel.querySelector(".carousel-arrow.prev");
    const nextBtn = carousel.querySelector(".carousel-arrow.next");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        show(index);
      });

      nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        show(index);
      });
    }

    // Play/pause overlay button for the video (if present)
    if (video && playButton) {
      // Ensure correct initial visibility (in case video isn't the first slide)
      playButton.style.display = slides[index] === video ? "flex" : "none";

      playButton.addEventListener("click", (event) => {
        // Don't accidentally trigger anything else
        event.stopPropagation();
        event.preventDefault();

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
