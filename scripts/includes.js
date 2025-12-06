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
