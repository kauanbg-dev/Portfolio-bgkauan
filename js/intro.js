(function () {
  const overlay = document.querySelector("[data-intro]");
  if (!overlay) return;

  const root = document.documentElement;
  const enter = overlay.querySelector("[data-intro-enter]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const storageKey = "kb-intro-seen";

  const shouldPlay = root.classList.contains("intro-pending");

  function markSeen() {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch (e) {}
  }

  function unlock() {
    overlay.setAttribute("hidden", "");
    overlay.setAttribute("aria-hidden", "true");
    root.classList.remove("intro-pending", "intro-leaving");
    document.body.style.removeProperty("overflow");
  }

  function dismiss() {
    if (!root.classList.contains("intro-pending")) return;
    markSeen();
    if (reduceMotion) {
      unlock();
      return;
    }
    root.classList.add("intro-leaving");
    window.setTimeout(unlock, 560);
  }

  if (!shouldPlay) {
    unlock();
    return;
  }

  overlay.removeAttribute("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  enter?.focus();
  enter?.addEventListener("click", dismiss);
})();
