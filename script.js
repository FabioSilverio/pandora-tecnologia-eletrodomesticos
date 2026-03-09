document.body.classList.add("js");

const rotatingWords = ["mais ágil", "mais moderna", "mais rápida", "mais segura"];
const rotator = document.querySelector("[data-rotator]");
const counters = document.querySelectorAll("[data-count]");
const reveals = document.querySelectorAll("[data-reveal]");
const header = document.querySelector("[data-header]");
const parallaxItems = document.querySelectorAll("[data-parallax]");

let wordIndex = 0;

if (rotator) {
  rotator.textContent = "mais ágil";

  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % rotatingWords.length;
    rotator.animate(
      [
        { opacity: 1, transform: "translateY(0px)" },
        { opacity: 0, transform: "translateY(16px)" },
        { opacity: 0, transform: "translateY(-16px)" },
        { opacity: 1, transform: "translateY(0px)" }
      ],
      { duration: 520, easing: "ease" }
    );
    rotator.textContent = rotatingWords[wordIndex];
  }, 2200);
}

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
  { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
);

reveals.forEach((item) => {
  const rect = item.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.92) {
    item.classList.add("is-visible");
  } else {
    revealObserver.observe(item);
  }
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done === "true") {
        return;
      }

      const target = Number(entry.target.dataset.count);
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        entry.target.textContent = Math.floor(progress * target);

        if (progress < 1) {
          requestAnimationFrame(tick);
          return;
        }

        entry.target.textContent = target;
        entry.target.dataset.done = "true";
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => countObserver.observe(counter));

window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
});

window.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  parallaxItems.forEach((item) => {
    const depth = Number(item.dataset.parallax);
    item.style.setProperty("--move-x", `${x * depth}px`);
    item.style.setProperty("--move-y", `${y * depth}px`);
  });
});
