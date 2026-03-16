const counters = document.querySelectorAll("[data-count]");
const revealItems = document.querySelectorAll(".reveal");
const rotator = document.querySelector("[data-rotator]");
const videoModal = document.querySelector("[data-video-modal]");
const videoFrame = document.querySelector("[data-video-frame]");
const videoTitle = document.getElementById("video-modal-title");
const videoTriggers = document.querySelectorAll("[data-video-trigger]");
const videoClosers = document.querySelectorAll("[data-video-close]");
const rotatingWords = [
  "geladeiras",
  "micro-ondas",
  "ar-condicionado",
  "equipamentos de som"
];

let rotatingIndex = 0;

const openVideoModal = (source, title) => {
  if (!videoModal || !videoFrame) {
    return;
  }

  videoFrame.src = source;
  videoFrame.title = title || "Video Pandora";
  if (videoTitle) {
    videoTitle.textContent = title || "Veja como o sistema funciona";
  }

  videoModal.hidden = false;
  videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-modal-open");
};

const closeVideoModal = () => {
  if (!videoModal || !videoFrame) {
    return;
  }

  videoModal.hidden = true;
  videoModal.setAttribute("aria-hidden", "true");
  videoFrame.src = "";
  document.body.classList.remove("has-modal-open");
};

const startTypedMessage = (bubble) => {
  if (!bubble || bubble.dataset.typedStarted === "true") {
    return;
  }

  const textNode = bubble.querySelector(".message-button__text");
  if (!textNode) {
    return;
  }

  const finalText = textNode.dataset.fullText || textNode.textContent.trim();
  textNode.dataset.fullText = finalText;
  textNode.textContent = "";
  bubble.dataset.typedStarted = "true";

  let charIndex = 0;
  const tick = () => {
    textNode.textContent = finalText.slice(0, charIndex);
    charIndex += 1;

    if (charIndex <= finalText.length) {
      window.setTimeout(tick, 22);
    }
  };

  window.setTimeout(tick, 140);
};

if (rotator) {
  rotator.textContent = rotatingWords[0];

  window.setInterval(() => {
    rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
    const fadeOut = rotator.animate(
      [
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(8px)" }
      ],
      {
        duration: 220,
        easing: "ease-in-out",
        fill: "forwards"
      }
    );

    fadeOut.onfinish = () => {
      rotator.textContent = rotatingWords[rotatingIndex];
      rotator.animate(
        [
          { opacity: 0, filter: "blur(8px)" },
          { opacity: 1, filter: "blur(0px)" }
        ],
        {
          duration: 360,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards"
        }
      );
    };
  }, 3200);
}

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openVideoModal(trigger.dataset.videoSrc || "", trigger.dataset.videoTitle || "Video Pandora");
  });
});

videoClosers.forEach((closer) => {
  closer.addEventListener("click", closeVideoModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoModal();
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        if (entry.target.matches("[data-typed-message]")) {
          startTypedMessage(entry.target);
        }
        entry.target.querySelectorAll("[data-typed-message]").forEach(startTypedMessage);
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
      if (item.matches("[data-typed-message]")) {
        startTypedMessage(item);
      }
      item.querySelectorAll("[data-typed-message]").forEach(startTypedMessage);
      return;
    }

    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
    if (item.matches("[data-typed-message]")) {
      startTypedMessage(item);
    }
    item.querySelectorAll("[data-typed-message]").forEach(startTypedMessage);
  });
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
