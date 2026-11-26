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
      if (!window.matchMedia("(max-width: 1100px)").matches) setNavOpen(false);
    },
    { passive: true }
  );
}

if (!reduceMotion) {
  document.documentElement.classList.add("has-motion");

  // Spotlight só em desktop com mouse fino; throttled
  const canSpotlight = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1101px)").matches;
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
    el.style.setProperty("--delay", `${(index % 2) * 110}ms`);
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

let pinned = null;

function mark(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
}

function sectionFromScroll() {
  const marker = 120;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) current = section.id;
  });
  return current;
}

const setActive = rafThrottle(() => {
  mark(pinned || sectionFromScroll());
});

function releasePin() {
  if (!pinned) return;
  pinned = null;
  setActive();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const section = document.querySelector(href);
    if (!section) return;
    event.preventDefault();
    pinned = href.slice(1);
    mark(pinned);
    const header = parseFloat(getComputedStyle(section).scrollMarginTop) || 96;
    const top = section.getBoundingClientRect().top + window.scrollY - header;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, Math.min(top, max)), behavior: "smooth" });
    history.pushState(null, "", href);
  });
});

window.addEventListener("wheel", releasePin, { passive: true });
window.addEventListener("touchmove", releasePin, { passive: true });
window.addEventListener("keydown", (event) => {
  if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
    releasePin();
  }
});

setActive();
window.addEventListener("scroll", setActive, { passive: true });
