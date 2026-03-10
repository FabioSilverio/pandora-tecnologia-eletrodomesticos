const rotatingWords = ["mais agil", "mais moderno", "mais rapido", "mais seguro"];
const rotator = document.querySelector("[data-rotator]");
const counters = document.querySelectorAll("[data-count]");
const revealItems = document.querySelectorAll(".reveal");
const header = document.querySelector("[data-header]");

let wordIndex = 0;

if (rotator) {
  rotator.textContent = rotatingWords[0];

  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % rotatingWords.length;
    rotator.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 0, transform: "translateY(-14px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 460, easing: "ease" }
    );
    rotator.textContent = rotatingWords[wordIndex];
  }, 2200);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      item.classList.add("is-visible");
      return;
    }

    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.done === "true") {
          return;
        }

        const target = Number(entry.target.dataset.count);
        const startedAt = performance.now();
        const duration = 1200;

        const animate = (time) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          entry.target.textContent = Math.floor(target * progress);

          if (progress < 1) {
            requestAnimationFrame(animate);
            return;
          }

          entry.target.textContent = target;
          entry.target.dataset.done = "true";
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 8);
});
