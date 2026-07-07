/**
 * renderer.js
 * Pure render functions: (data) -> DOM. Nothing here fetches data or
 * manages state — see main.js for orchestration.
 *
 * Most sections (Skills / Career / Projects / Education / Certifications /
 * Activities) share one visual building block: `.list-row` — an icon,
 * a title/subtitle body, and an optional chevron that reveals more detail.
 * `buildListRow()` is the single place that markup is assembled, so every
 * section stays visually consistent and new list-based sections can reuse it.
 */
(function (global) {
  "use strict";

  const ICONS = {
    home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"/>',
    chart: '<path d="M4 19V9M11 19V4M18 19v-7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 4 6 4 9s-1.4 6.4-4 9c-2.6-2.6-4-6-4-9s1.4-6.4 4-9Z"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.2 13.7-1.7 6.8 5.5-2.9 5.5 2.9-1.7-6.8"/>',
    school: '<path d="m12 3 10 5.5-10 5.5L2 8.5 12 3Z"/><path d="M6 11v5.5c0 1.5 2.7 3 6 3s6-1.5 6-3V11"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>',
    flag: '<path d="M6 3v18"/><path d="M6 4h11l-2.5 4L17 12H6"/>',
  };

  function icon(name, size = 18) {
    const body = ICONS[name] || "";
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  const ICON_COLOR_CLASSES = ["list-row__icon--a", "list-row__icon--b", "list-row__icon--c", "list-row__icon--d"];
  function iconColorClass(i) {
    return ICON_COLOR_CLASSES[i % ICON_COLOR_CLASSES.length];
  }

  function initials(text, len = 2) {
    return escapeHtml(String(text).trim().slice(0, len).toUpperCase());
  }

  /**
   * Builds one `.list-row`. `variant` controls the grid layout:
   *  - "icon-chev": leading icon + trailing chevron toggle (Career/Projects)
   *  - "icon-only": leading icon, no toggle (Education/Certifications/Activities)
   *  - "chev-only": no icon, trailing chevron toggle (Skills with extra detail)
   *  - "plain":     no icon, no toggle (Skills without extra detail)
   */
  function buildListRow({
    variant = "icon-only",
    iconHtml = "",
    iconColor = "a",
    title = "",
    badgeHtml = "",
    meta = "",
    rightHtml = "",
    subtitle = "",
    extra = "",
    detailHtml = "",
    openByDefault = false,
  }) {
    const hasChevron = variant === "icon-chev" || variant === "chev-only";
    const hasIcon = variant === "icon-chev" || variant === "icon-only";

    return `
      <div class="list-row list-row--${variant}${openByDefault ? " is-open" : ""}">
        ${hasIcon ? `<div class="list-row__icon ${iconColorClass(typeof iconColor === "number" ? iconColor : 0)}">${iconHtml}</div>` : ""}
        <div class="list-row__body">
          <div class="list-row__title-line">
            <span class="list-row__title">${title}${badgeHtml}</span>
            <span class="list-row__right">
              ${meta ? `<span class="list-row__meta">${meta}</span>` : ""}
              ${rightHtml}
            </span>
          </div>
          ${subtitle ? `<div class="list-row__subtitle">${subtitle}</div>` : ""}
          ${extra ? `<div class="list-row__extra">${extra}</div>` : ""}
          ${detailHtml ? `<div class="list-row__detail"><div class="list-row__detail-inner">${detailHtml}</div></div>` : ""}
        </div>
        ${hasChevron ? `<button class="list-row__chevron-btn" type="button" data-row-toggle aria-expanded="${openByDefault}" aria-label="자세히 보기">${icon("chevron", 14)}</button>` : ""}
      </div>`;
  }

  function wireRowToggles() {
    document.querySelectorAll("[data-row-toggle]").forEach((btn) => {
      if (btn.dataset.wired) return;
      btn.dataset.wired = "1";
      btn.addEventListener("click", () => {
        const row = btn.closest(".list-row");
        if (!row) return;
        const isOpen = row.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  /* ---------------- Navigation ---------------- */
  function renderNav(nav) {
    // Desktop: icon-only pills. Mobile drawer / tab bar: icon + label.
    const linksHtml = nav
      .filter((item) => item.id !== "contact") // contact has its own CTA button in the navbar
      .map((item, i) =>
        `<a class="navbar__link${i === 0 ? " is-active" : ""}" href="#${item.id}" data-nav-link="${item.id}" title="${escapeHtml(item.label)}" aria-label="${escapeHtml(item.label)}">${icon(item.icon, 18)}</a>`
      ).join("");
    document.getElementById("navLinks").innerHTML = linksHtml;

    const drawerHtml = nav.map((item) =>
      `<a class="mobile-drawer__link" href="#${item.id}" data-drawer-link="${item.id}">${icon(item.icon, 18)}<span>${escapeHtml(item.label)}</span></a>`
    ).join("");
    document.getElementById("mobileDrawerLinks").innerHTML = drawerHtml;

    const tabHtml = nav.map((item, i) =>
      `<a class="tabbar__item${i === 0 ? " is-active" : ""}" href="#${item.id}" data-tab-link="${item.id}">${icon(item.icon, 20)}<span>${escapeHtml(item.label)}</span></a>`
    ).join("");
    document.getElementById("tabbar").innerHTML = tabHtml;
  }

  /* ---------------- Hero ---------------- */
  function renderHero(profile, quickFacts) {
    document.getElementById("heroStatusText").textContent = profile.status;
    document.getElementById("heroRole").textContent = profile.role;
    document.getElementById("heroRoleSub").textContent = profile.roleSub;
    document.getElementById("heroTagline").textContent = profile.tagline;
    document.getElementById("heroAvatar").textContent = profile.initials;

    const factsHtml = quickFacts.map((f) => `
      <div class="fact-chip">
        <div class="fact-chip__label">${escapeHtml(f.label)}</div>
        <div class="fact-chip__value">${escapeHtml(f.value)}</div>
      </div>`).join("");
    document.getElementById("heroFacts").innerHTML = factsHtml;

    wireCopyEmail(profile.email);
  }

  function wireCopyEmail(email) {
    const btn = document.getElementById("copyEmailBtn");
    const label = document.querySelector("[data-copy-email-label]");
    if (!btn || !label || btn.dataset.wired) return;
    btn.dataset.wired = "1";

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e2) { /* clipboard unavailable */ }
        document.body.removeChild(ta);
      }
      const original = label.textContent;
      label.textContent = "복사됨 ✓";
      btn.disabled = true;
      setTimeout(() => {
        label.textContent = original;
        btn.disabled = false;
      }, 1800);
    });
  }

  /* ---------------- About ---------------- */
  function renderAbout(about, profile) {
    document.getElementById("aboutHeading").textContent = about.heading;
    document.getElementById("aboutParagraphs").innerHTML =
      about.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");

    const facts = [
      { icon: "briefcase", label: "총 경력", value: profile.yearsOfExperience },
      { icon: "globe", label: "거점", value: profile.location },
      { icon: "target", label: "현재 역할", value: profile.role },
    ];
    document.getElementById("aboutFacts").innerHTML = facts.map((f, i) => `
      <div class="mini-fact card reveal" style="--reveal-delay:${i * 90}ms">
        <div class="mini-fact__icon">${icon(f.icon, 20)}</div>
        <div>
          <div class="mini-fact__label mono">${escapeHtml(f.label)}</div>
          <div class="mini-fact__value">${escapeHtml(f.value)}</div>
        </div>
      </div>`).join("");
  }

  /* ---------------- Skills ---------------- */
  function renderSkills(skillGroups) {
    const html = skillGroups.map((group) => {
      const rows = group.skills.map((s) => {
        const hasDetail = Boolean(s.details && s.details.length);
        const detailHtml = hasDetail
          ? `<ul>${s.details.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>`
          : "";
        return buildListRow({
          variant: hasDetail ? "chev-only" : "plain",
          title: escapeHtml(s.name),
          rightHtml: s.level ? `<span class="list-row__level">${escapeHtml(s.level)}</span>` : "",
          detailHtml,
        });
      }).join("");

      return `
        <div class="skill-group reveal">
          <div class="skill-group__head">
            <div class="skill-group__icon">${icon(group.icon, 15)}</div>
            <h3 class="skill-group__title">${escapeHtml(group.title)}</h3>
          </div>
          <div class="skill-group__rows">${rows}</div>
        </div>`;
    }).join("");
    document.getElementById("skillsGrid").innerHTML = html;
  }

  /* ---------------- Working style ---------------- */
  function renderWorkingStyle(workingStyle) {
    document.getElementById("styleHeading").textContent = workingStyle.heading;
    document.getElementById("styleGrid").innerHTML = workingStyle.items.map((item, i) => `
      <div class="card card--hover style-card reveal" style="--reveal-delay:${i * 70}ms">
        <div class="style-card__title">${escapeHtml(item.title)}</div>
        <p>${escapeHtml(item.desc)}</p>
      </div>`).join("");
  }

  /* ---------------- Career ---------------- */
  function renderCareer(career) {
    const html = career.map((job, i) => {
      const badgeHtml =
        ` <span class="mono" style="font-size:0.72rem;color:var(--text-muted);font-weight:500;">${escapeHtml(job.companyEn)}</span>` +
        (job.current ? ` <span class="badge-current">현재</span>` : "");
      const detailHtml =
        `<ul>${job.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>` +
        `<div class="chip-row">${job.tags.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}</div>`;

      return buildListRow({
        variant: "icon-chev",
        iconHtml: initials(job.companyEn),
        iconColor: i,
        title: escapeHtml(job.company),
        badgeHtml,
        meta: `${escapeHtml(job.period)} · ${escapeHtml(job.duration)}`,
        subtitle: escapeHtml(job.role),
        extra: escapeHtml(job.summary),
        detailHtml,
        openByDefault: Boolean(job.current),
      });
    }).join("");
    document.getElementById("careerTimeline").innerHTML = html;
  }

  /* ---------------- Projects ---------------- */
  function renderProjects(projects) {
    const html = projects.map((p, i) => {
      const detailHtml =
        `<p>${escapeHtml(p.desc)}</p>` +
        `<div class="chip-row">${p.tags.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}</div>`;

      return buildListRow({
        variant: "icon-chev",
        iconHtml: initials(p.org),
        iconColor: i,
        title: escapeHtml(p.name),
        meta: escapeHtml(p.period),
        subtitle: escapeHtml(p.org),
        detailHtml,
      });
    }).join("");
    document.getElementById("projectsGrid").innerHTML = html;
  }

  /* ---------------- Education ---------------- */
  function renderEducation(education) {
    const html = education.map((e, i) => buildListRow({
      variant: "icon-only",
      iconHtml: icon("school", 19),
      iconColor: i + 1,
      title: escapeHtml(e.school),
      meta: escapeHtml(e.period),
      subtitle: escapeHtml(e.major),
      extra: e.detail ? escapeHtml(e.detail) : "",
    })).join("");
    document.getElementById("educationGrid").innerHTML = html;
  }

  /* ---------------- Certifications ---------------- */
  function renderCertifications(certifications) {
    const html = certifications.map((c, i) => buildListRow({
      variant: "icon-only",
      iconHtml: icon("award", 18),
      iconColor: i + 2,
      title: escapeHtml(c.name),
      meta: escapeHtml(c.date),
      subtitle: escapeHtml(c.issuer),
    })).join("");
    document.getElementById("certGrid").innerHTML = html;
  }

  /* ---------------- Activities ---------------- */
  function renderActivities(activities) {
    const html = activities.map((a, i) => buildListRow({
      variant: "icon-only",
      iconHtml: icon("flag", 18),
      iconColor: i + 3,
      title: escapeHtml(a.title),
      meta: escapeHtml(a.period),
      subtitle: escapeHtml(a.desc),
    })).join("");
    document.getElementById("activityList").innerHTML = html;
  }

  /* ---------------- Contact / footer ---------------- */
  function renderContact(profile) {
    const emailBtn = document.getElementById("contactEmailBtn");
    if (emailBtn) emailBtn.href = `mailto:${profile.email}`;

    const phoneBtn = document.getElementById("contactPhoneBtn");
    if (phoneBtn) phoneBtn.href = `tel:${profile.phone.replace(/[^0-9+]/g, "")}`;

    const infoEl = document.getElementById("contactInfo");
    if (infoEl) {
      infoEl.innerHTML = `
        <span class="contact-info__item">${icon("mail", 15)}${escapeHtml(profile.email)}</span>
        <span class="contact-info__item">${icon("phone", 15)}${escapeHtml(profile.phone)}</span>`;
    }

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------- Orchestrator ---------------- */
  function renderAll(data) {
    renderNav(data.nav);
    renderHero(data.profile, data.quickFacts);
    renderAbout(data.about, data.profile);
    renderSkills(data.skillGroups);
    renderWorkingStyle(data.workingStyle);
    renderCareer(data.career);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderCertifications(data.certifications);
    renderActivities(data.activities);
    renderContact(data.profile);
    wireRowToggles();
  }

  global.PortfolioRenderer = { renderAll, icon, escapeHtml };
})(window);
