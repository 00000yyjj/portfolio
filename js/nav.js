/**
 * nav.js
 * Handles: active-section highlighting (scrollspy) across the desktop
 * pill nav and mobile tab bar, and the mobile drawer menu.
 */
(function (global) {
  "use strict";

  function initDrawer() {
    const drawer = document.getElementById("mobileDrawer");
    const menuBtn = document.getElementById("menuToggle");
    if (!drawer || !menuBtn) return;

    function open() {
      drawer.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
    }
    function close() {
      drawer.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }

    menuBtn.addEventListener("click", () => {
      drawer.classList.contains("is-open") ? close() : open();
    });

    drawer.querySelectorAll("[data-close-drawer]").forEach((elx) => elx.addEventListener("click", close));
    drawer.querySelectorAll("[data-drawer-link]").forEach((linkEl) => linkEl.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
    });
  }

  function initScrollspy(navIds) {
    const sections = navIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const navLinkEls = document.querySelectorAll("[data-nav-link]");
    const tabLinkEls = document.querySelectorAll("[data-tab-link]");

    function setActive(id) {
      navLinkEls.forEach((a) => a.classList.toggle("is-active", a.dataset.navLink === id));
      tabLinkEls.forEach((a) => a.classList.toggle("is-active", a.dataset.tabLink === id));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function init(navIds) {
    initDrawer();
    initScrollspy(navIds);
  }

  global.PortfolioNav = { init };
})(window);
