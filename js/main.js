const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu-toggle]");

if (nav && toggle) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a, [data-lang]").forEach((item) => {
    item.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 860px)").matches) {
        closeMenu();
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
