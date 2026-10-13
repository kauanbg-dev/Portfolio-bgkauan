const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function rafThrottle(fn) {
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}

const header = document.querySelector("header");
if (header) {
  let scrolled = false;
  const onScroll = rafThrottle(() => {
    const y = window.scrollY;
    const next = scrolled ? y > 4 : y > 16;
    if (next !== scrolled) {
      scrolled = next;
      header.classList.toggle("is-scrolled", scrolled);
    }
  });
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("#site-nav");
if (header && navToggle && siteNav) {
  const setNavOpen = (open) => {
    header.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    const lang = localStorage.getItem("lang") === "en" ? "en" : "pt";
    const label =
      open
        ? (lang === "en" ? "Close menu" : "Fechar menu")
        : (lang === "en" ? "Open menu" : "Abrir menu");
    navToggle.setAttribute("aria-label", label);
    navToggle.setAttribute("title", label);
  };

  navToggle.addEventListener("click", () => {
    setNavOpen(!header.classList.contains("nav-open"));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNavOpen(false);
  });

  window.addEventListener(
    "resize",
    () => {
      if (!window.matchMedia("(max-width: 860px)").matches) setNavOpen(false);
    },
    { passive: true }
  );
}

if (!reduceMotion) {
  document.documentElement.classList.add("has-motion");

  // Spotlight só em desktop com mouse fino; throttled
  const canSpotlight = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 861px)").matches;
  if (canSpotlight) {
    const onMove = rafThrottle((event) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    });
    window.addEventListener("pointermove", onMove, { passive: true });
  }

  document.querySelectorAll("[data-reveal]").forEach((el, index) => {
    if (el.getAttribute("data-reveal") === "project") return;
    el.style.setProperty("--delay", `${Math.min(index * 50, 200)}ms`);
  });

  document.querySelectorAll('[data-reveal="project"]').forEach((el, index) => {
    el.style.setProperty("--delay", `${index * 80}ms`);
  });

  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    const onTilt = rafThrottle((event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });

    card.addEventListener("pointermove", onTilt, { passive: true });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  const photo = document.querySelector("[data-hero-photo]");
  if (photo && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const hero = photo.closest(".hero");
    const onPhotoMove = rafThrottle((event) => {
      const box = hero.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      photo.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
    });
    hero?.addEventListener("pointermove", onPhotoMove, { passive: true });
    hero?.addEventListener("pointerleave", () => {
      photo.style.transform = "";
    });
  }
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

const setActive = rafThrottle(() => {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
});

setActive();
window.addEventListener("scroll", setActive, { passive: true });
