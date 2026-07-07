/**
 * main.js
 * Orchestrates the page: load JSON -> render sections -> wire up
 * navigation, theme toggle, and scroll animations.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", async () => {
    // Theme toggle doesn't depend on data, wire it up immediately.
    PortfolioTheme.init();

    try {
      const data = await PortfolioData.load();

      document.title = data.meta.siteTitle;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", data.meta.description);

      PortfolioRenderer.renderAll(data);

      const navIds = data.nav.map((n) => n.id);
      // Sections rendered without their own top-level nav entry still
      // participate in scroll behavior; scrollspy only needs the ids
      // that actually appear in the nav bar.
      PortfolioNav.init(navIds);
      PortfolioAnimations.init();
    } catch (err) {
      // Data failed to load (e.g. opened via file:// without a local server).
      const main = document.getElementById("main");
      if (main) {
        const notice = document.createElement("div");
        notice.className = "container";
        notice.style.padding = "48px 0";
        notice.innerHTML =
          '<div class="card" style="padding:24px;">콘텐츠를 불러오지 못했습니다. ' +
          "이 사이트는 정적 서버(GitHub Pages, <code>npx serve</code>, <code>python -m http.server</code> 등)에서 실행해야 " +
          "<code>data/portfolio.json</code>을 불러올 수 있습니다.</div>";
        main.prepend(notice);
      }
    }
  });
})();
