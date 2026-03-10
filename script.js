const counters = document.querySelectorAll("[data-count]");
const revealItems = document.querySelectorAll(".reveal");
const header = document.querySelector("[data-header]");

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
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
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
        const duration = 1400;

        const animate = (time) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          entry.target.textContent = Math.floor(target * eased);

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
    { threshold: 0.45 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

window.addEventListener(
  "scroll",
  () => {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 10);
  },
  { passive: true }
);
