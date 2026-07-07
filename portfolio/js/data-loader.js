/**
 * data-loader.js
 * Fetches data/portfolio.json once and exposes it through window.PortfolioData.
 * Keeping content in JSON means Career/Projects/etc. can be edited without
 * touching any markup or logic.
 */
(function (global) {
  "use strict";

  const DATA_URL = "data/portfolio.json";
  let cachedData = null;

  async function load() {
    if (cachedData) return cachedData;

    try {
      const res = await fetch(DATA_URL, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cachedData = await res.json();
      return cachedData;
    } catch (err) {
      console.error(
        "[portfolio] data/portfolio.json을 불러오지 못했습니다. " +
          "GitHub Pages 또는 로컬 서버(예: `npx serve` / `python -m http.server`) 환경에서 실행 중인지 확인하세요.",
        err
      );
      throw err;
    }
  }

  global.PortfolioData = { load };
})(window);
