/**
 * theme.js
 * Light/dark theme toggle. The initial theme is already applied by the
 * inline script in <head> (to avoid a flash of the wrong theme); this
 * module just wires up the toggle button and keeps localStorage in sync.
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;

  function getTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) — theme just won't persist */
    }
  }

  function toggleTheme() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }

  function init() {
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
    }

    // Follow OS-level changes only if the user hasn't chosen explicitly.
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        mq.addEventListener("change", (e) => setTheme(e.matches ? "dark" : "light"));
      }
    } catch (e) {}
  }

  global.PortfolioTheme = { init, toggleTheme, setTheme, getTheme };
})(window);
