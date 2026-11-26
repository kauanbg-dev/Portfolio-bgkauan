(function () {
  const overlay = document.querySelector("[data-intro]");
  if (!overlay) return;

  const root = document.documentElement;
  const enter = overlay.querySelector("[data-intro-enter]");
  const resume = overlay.querySelector("[data-intro-resume]");
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

  function reveal(hash) {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    root.style.scrollBehavior = previous;
    history.replaceState(null, "", hash);
  }

  function dismiss(hash) {
    if (!root.classList.contains("intro-pending")) return;
    markSeen();
    if (reduceMotion) {
      unlock();
      reveal(hash);
      return;
    }
    root.classList.add("intro-leaving");
    window.setTimeout(() => {
      unlock();
      reveal(hash);
    }, 560);
  }

  if (!shouldPlay) {
    unlock();
    return;
  }

  overlay.removeAttribute("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  enter?.focus();
  enter?.addEventListener("click", () => dismiss());
  resume?.addEventListener("click", () => dismiss("#curriculo"));
})();
