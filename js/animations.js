/**
 * animations.js
 * Adds `.is-visible` to `.reveal` / `.reveal-scale` elements as they enter
 * the viewport. Respects prefers-reduced-motion (handled purely in CSS).
 */
(function (global) {
  "use strict";

  function initReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-scale");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t) => observer.observe(t));
  }

  function initNavbarShrink() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    let lastScrolled = false;

    function onScroll() {
      const scrolled = window.scrollY > 24;
      if (scrolled !== lastScrolled) {
        navbar.style.boxShadow = scrolled ? "var(--shadow-lg)" : "var(--shadow-md)";
        lastScrolled = scrolled;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function init() {
    initReveal();
    initNavbarShrink();
  }

  global.PortfolioAnimations = { init };
})(window);
