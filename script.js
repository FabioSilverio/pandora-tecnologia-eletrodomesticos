const counters = document.querySelectorAll("[data-count]");
const revealItems = document.querySelectorAll(".reveal");
const header = document.querySelector("[data-header]");
const rotator = document.querySelector("[data-rotator]");
const rotatingWords = [
  "lojas de eletrodomésticos",
  "lojas de ar-condicionado doméstico",
  "lojas de áudio e vídeo",
  "lojas de purificadores e aquecedores"
];

let rotatingIndex = 0;

if (rotator) {
  rotator.textContent = rotatingWords[0];

  window.setInterval(() => {
    rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;

    rotator.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 0, transform: "translateY(-18px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 520,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    );

    rotator.textContent = rotatingWords[rotatingIndex];
  }, 2600);
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
