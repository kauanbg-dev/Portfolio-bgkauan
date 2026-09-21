const themeRoot = document.documentElement;
const THEME_KEY = "theme";
const themeMeta = document.querySelector('meta[name="theme-color"]');

function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {}
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  const isLight = theme === "light";

  if (isLight) themeRoot.setAttribute("data-theme", "light");
  else themeRoot.removeAttribute("data-theme");

  if (themeMeta) themeMeta.setAttribute("content", isLight ? "#eef2f8" : "#0b0f19");

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(isLight));
  });

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

applyTheme(getStoredTheme());

document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = themeRoot.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
  });
});
