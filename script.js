const mobileMenu = document.getElementById("mobileMenu");
const navToggle = document.querySelector(".nav-toggle");
const typewriterEl = document.getElementById("typewriter");
const revealElements = document.querySelectorAll(".reveal");
const statCounters = document.querySelectorAll(".stat-num[data-target]");

const typewriterPhrases = [
  "Fullstack developer in training",
  "Building clean user experiences",
  "Learning JavaScript, React & Node.js",
];

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

function typewriter() {
  let phraseIndex = 0;
  let charIndex = 0;
  let forward = true;

  const update = () => {
    const phrase = typewriterPhrases[phraseIndex];
    typewriterEl.textContent = phrase.slice(0, charIndex);

    if (forward) {
      if (charIndex < phrase.length) {
        charIndex += 1;
      } else {
        forward = false;
        setTimeout(update, 1200);
        return;
      }
    } else {
      if (charIndex > 0) {
        charIndex -= 1;
      } else {
        forward = true;
        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
      }
    }

    setTimeout(update, forward ? 90 : 30);
  };

  update();
}

function animateCounters() {
  statCounters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / target), 12);

    const timer = setInterval(() => {
      current += 1;
      counter.textContent = `${current}${suffix}`;

      if (current >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  });
}

function observeReveals() {
  const options = {
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (entry.target.closest("#about")) {
          animateCounters();
        }
      }
    });
  }, options);

  revealElements.forEach((item) => observer.observe(item));
}

window.addEventListener("DOMContentLoaded", () => {
  typewriter();
  observeReveals();
});
