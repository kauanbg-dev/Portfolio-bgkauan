const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector("header");
if (header) {
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 10);

    // No topo mais sólido; descendo fica mais transparente (no mobile, menos extremo)
    const t = Math.min(Math.max(y / 220, 0), 1);
    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    const minAlpha = isMobile ? 0.78 : 0.38;
    const alpha = (0.9 - t * (0.9 - minAlpha)).toFixed(3);
    header.style.setProperty("--header-alpha", alpha);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
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

  const spotlight = () => {
    window.addEventListener(
      "pointermove",
      (event) => {
        document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
        document.documentElement.style.setProperty("--my", `${event.clientY}px`);
      },
      { passive: true }
    );
  };
  spotlight();

  document.querySelectorAll("[data-reveal]").forEach((el, index) => {
    if (el.getAttribute("data-reveal") === "project") return;
    el.style.setProperty("--delay", `${Math.min(index * 60, 240)}ms`);
  });

  document.querySelectorAll('[data-reveal="project"]').forEach((el, index) => {
    el.style.setProperty("--delay", `${index * 110}ms`);
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
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    card.addEventListener("pointermove", (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateY(-6px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  const photo = document.querySelector("[data-hero-photo]");
  if (photo && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const hero = photo.closest(".hero");
    hero?.addEventListener("pointermove", (event) => {
      const box = hero.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      photo.style.transform = `translate(${x * 12}px, ${y * 10}px)`;
    });
    hero?.addEventListener("pointerleave", () => {
      photo.style.transform = "";
    });
  }
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

const setActive = () => {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};

setActive();
window.addEventListener("scroll", setActive, { passive: true });
