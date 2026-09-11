/* =========================================================
   Find Your Campus Steward — Teamsters Local 2024
   ========================================================= */

/* ---------- DATA ----------
   Campus order here drives the chip order and the escalation list.
   Add `unit: "NP"` or `unit: "RN"` to show a badge on the card.
   Add a leader to LEADERSHIP below to surface it in the escalation menu. */

const representatives = {
  "Royal Oak": [
    { name: "Sarah Johnson", phone: "586-604-4432", email: "sarah.johnson7170@gmail.com" },
    { name: "Lori Greenlee", phone: "586-651-1266", email: "lagreenlee71@gmail.com" },
    { name: "Sargon Mikho", phone: "586-567-1995", email: "s.mikho@icloud.com" }
  ],
  "Troy": [
    { name: "Katherine Wallace", phone: "248-404-8084", email: "gr8chi@aol.com" },
    { name: "Suzi Carbone", phone: "586-944-4520", email: "spcarbone3@gmail.com" },
    { name: "Shawn Hills", phone: "586-439-8799", email: "hillisshawn01@gmail.com" },
    { name: "Marley Shook", unit: "NP", phone: "586-567-3122", email: "Marleyshook313@gmail.com" }
  ],
  "Dearborn": [
    { name: "Becky Smola", phone: "734-693-3076", email: "rebeccasmola1984@gmail.com" },
    { name: "Michella Vincent", phone: "313-585-1858", email: "michella.vincent@yahoo.com" }
  ],
  "Farmington Hills": [
    { name: "Misty Croteau", phone: "734-658-0815", email: "mcroteau84@gmail.com" },
    { name: "Debbie Miracle", phone: "313-333-3296", email: "miraclefour@sbcglobal.net" }
  ],
  "Grosse Pointe": [
    { name: "Holly Kowal", phone: "313-418-2405", email: "lonemirage02@gmail.com" },
    { name: "Jody Woodley", phone: "586-212-8398", email: "jlynnwoodley@yahoo.com" }
  ],
  "Wayne": [
    { name: "Natalie Lunsford", phone: "734-250-4073", email: "natrn91@wowway.com" }
  ],
  "Southfield": [
    { name: "Meredith Corseti", phone: "248-376-7712", email: "millermeredith@hotmail.com" },
    { name: "Katie Wilson", unit: "Flex RN", phone: "313-400-6424", email: "kwilso65@emich.edu" }
  ],
  "Taylor": [
    { name: "Kimberly Pavlich", phone: "313-590-5276", email: "kimberly.ann15@ymail.com" },
    { name: "Allison Lorentz", phone: "734-718-5366", email: "jrsice1@gmail.com" }
  ],
  "Trenton": [
    { name: "Keli Wludyka", phone: "313-268-7768", email: "Kwludyka@wowway.com" },
    { name: "Kerri Donovan", phone: "734-925-1162", email: "Kerridonovan5@gmail.com" },
    { name: "Cari York", phone: "313-300-3523", email: "Dougcupcake@sbcglobal.net" },
    { name: "Deb Lyles", phone: "313-549-7249", email: "Deblyles21@yahoo.com" }
  ]
};

/* Union leadership for the escalation menu.
   Example: { name: "Jane Doe", title: "Business Agent", email: "jane@local2024.org" }
   The escalation control stays hidden while this list is empty. */
const LEADERSHIP = [];

/* Script members read aloud when they invoke their Weingarten Rights. */
const WEINGARTEN_SCRIPT =
  "If this discussion could in any way lead to my being disciplined or terminated, " +
  "or affect my personal working conditions, I respectfully request that my union " +
  "steward be present at this meeting. Without union representation, I choose not " +
  "to participate in this discussion.";

/* ---------- HELPERS ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));

const digitsOnly = (phone) => String(phone).replace(/\D/g, "");

const campuses = Object.keys(representatives);

/* Flat list with the campus attached, for search across every campus. */
const allStewards = campuses.flatMap((campus) =>
  representatives[campus].map((rep) => ({ ...rep, campus }))
);

const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* private mode */ }
  }
};

/* ---------- STATE ---------- */

let activeCampus = null;   // null = nothing picked yet
let searchTerm = "";

/* ---------- TOAST ---------- */

let toastTimer;
function toast(message) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2400);
}

async function copyText(text, successMessage) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for http:// and older browsers.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:absolute;left:-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    toast(successMessage);
    return true;
  } catch {
    toast("Couldn't copy — please copy manually.");
    return false;
  }
}

/* ---------- CAMPUS CHIPS ---------- */

function renderChips() {
  const wrap = $("#campus-chips");
  if (!wrap) return;

  wrap.innerHTML = campuses
    .map((campus) => {
      const count = representatives[campus].length;
      return `
        <button type="button"
                class="campus-chip"
                role="tab"
                aria-selected="false"
                data-campus="${escapeHtml(campus)}">
          <span class="chip-label">${escapeHtml(campus)}</span>
          <span class="chip-count">${count}</span>
        </button>`;
    })
    .join("");

  wrap.addEventListener("click", (event) => {
    const chip = event.target.closest(".campus-chip");
    if (!chip) return;
    const campus = chip.dataset.campus;
    selectCampus(campus === activeCampus ? null : campus);
  });

  // Left/right arrows move between campuses, like a real tab strip.
  wrap.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const chips = $$(".campus-chip", wrap);
    const current = chips.indexOf(document.activeElement);
    if (current === -1) return;
    event.preventDefault();

    let next;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = chips.length - 1;
    else if (event.key === "ArrowRight") next = (current + 1) % chips.length;
    else next = (current - 1 + chips.length) % chips.length;

    chips[next].focus();
  });
}

function syncChips() {
  $$(".campus-chip").forEach((chip) => {
    const isActive = chip.dataset.campus === activeCampus;
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-selected", String(isActive));
  });
}

/* ---------- CARDS ---------- */

function unitClass(unit) {
  return /np/i.test(unit) ? "unit-np" : "unit-rn";
}

function repCard(rep, { showCampus = false } = {}) {
  const tel = digitsOnly(rep.phone);
  const name = escapeHtml(rep.name);
  const email = escapeHtml(rep.email);

  const badges = `
    <div class="unit-badge-wrapper">
      ${rep.unit ? `<span class="unit-badge ${unitClass(rep.unit)}">${escapeHtml(rep.unit)}</span>` : ""}
      ${showCampus ? `<span class="rep-site">${escapeHtml(rep.campus)}</span>` : ""}
    </div>`;

  // Contact details are never printed as text — each route is a button, split
  // into an urgent column (call/text) and a non-urgent column (email).
  return `
    <article class="rep-card" tabindex="-1">
      ${badges}
      <h3 class="rep-name">${name}</h3>
      <p class="rep-title">Campus Steward</p>

      <div class="rep-contact-cols">
        <div class="contact-col contact-col-urgent">
          <span class="contact-col-label">Urgent</span>
          <a class="phone-button" href="tel:${tel}" aria-label="Call ${name} — urgent">
            <svg class="ico" aria-hidden="true"><use href="#i-phone"></use></svg>Call
          </a>
          <a class="text-button" href="sms:${tel}" aria-label="Text ${name} — urgent">
            <svg class="ico" aria-hidden="true"><use href="#i-chat"></use></svg>Text
          </a>
        </div>

        <div class="contact-col contact-col-routine">
          <span class="contact-col-label">Non-Urgent</span>
          <a class="email-button" href="mailto:${email}" aria-label="Email ${name} — non-urgent">
            <svg class="ico" aria-hidden="true"><use href="#i-mail"></use></svg>Email
          </a>
        </div>
      </div>
    </article>`;
}

/* ---------- RENDER ---------- */

function render() {
  const campusName = $("#campus-name");
  const repInfo = $("#rep-info");
  const repList = $("#rep-name");
  const status = $("#results-status");
  const empty = $("#empty-state");
  const share = $("#share-campus");

  syncChips();

  const query = searchTerm.trim().toLowerCase();
  let matches;
  let heading;
  let showCampus;

  if (query) {
    // Searching looks across every campus at once.
    matches = allStewards.filter((rep) =>
      rep.name.toLowerCase().includes(query) ||
      rep.campus.toLowerCase().includes(query) ||
      (rep.unit || "").toLowerCase().includes(query)
    );
    heading = `Results for “${searchTerm.trim()}”`;
    showCampus = true;
  } else if (activeCampus) {
    matches = representatives[activeCampus].map((rep) => ({ ...rep, campus: activeCampus }));
    heading = activeCampus;
    showCampus = false;
  } else {
    matches = [];
    heading = "";
    showCampus = false;
  }

  const hasQuery = Boolean(query || activeCampus);

  campusName.textContent = heading;
  campusName.hidden = !hasQuery;
  // Only a campus produces a stable shareable link, so a search hides the button.
  if (share) share.hidden = !activeCampus;
  repInfo.hidden = !hasQuery || matches.length === 0;
  empty.hidden = !(hasQuery && matches.length === 0);

  repList.innerHTML = matches.map((rep) => repCard(rep, { showCampus })).join("");

  // Stagger the entrance so the cards cascade in instead of popping.
  $$(".rep-card", repList).forEach((card, index) => {
    card.style.animationDelay = `${Math.min(index * 60, 400)}ms`;
  });

  if (!hasQuery) {
    status.textContent = "";
  } else if (matches.length === 0) {
    status.textContent = `No stewards found for “${searchTerm.trim()}”.`;
  } else {
    const noun = matches.length === 1 ? "steward" : "stewards";
    status.textContent = `${matches.length} ${noun} found${showCampus ? "" : ` at ${heading}`}.`;
  }
}

function selectCampus(campus, { scroll = true, updateHash = true } = {}) {
  activeCampus = campus;

  if (campus) {
    store.set("preferredCampus", campus);
    if (updateHash) history.replaceState(null, "", `#${slugify(campus)}`);
  } else if (updateHash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  // A campus pick clears an in-progress search so the two controls never conflict.
  const search = $("#steward-search");
  if (campus && searchTerm) {
    searchTerm = "";
    if (search) search.value = "";
    $("#search-clear").hidden = true;
  }

  render();

  if (campus && scroll) {
    const target = $("#campus-name");
    if (target && !prefersReducedMotion()) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- SEARCH ---------- */

function initSearch() {
  const input = $("#steward-search");
  const clear = $("#search-clear");
  if (!input) return;

  input.addEventListener("input", () => {
    searchTerm = input.value;
    clear.hidden = searchTerm.length === 0;
    if (searchTerm) {
      activeCampus = null;   // searching supersedes the chip selection
      syncChips();
    }
    render();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && input.value) {
      event.preventDefault();
      resetSearch();
    }
  });

  clear.addEventListener("click", () => {
    resetSearch();
    input.focus();
  });

  // "/" from anywhere jumps to the search box.
  document.addEventListener("keydown", (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (event.key === "/" && !typing) {
      event.preventDefault();
      input.focus();
      input.select();
    }
  });

  function resetSearch() {
    input.value = "";
    searchTerm = "";
    clear.hidden = true;
    render();
  }
}

/* ---------- FAQ ACCORDION ---------- */

function initAccordion() {
  $$(".qa-item").forEach((item, index) => {
    const trigger = $(".qa-trigger", item);
    const panel = $(".qa-panel", item);
    if (!trigger || !panel) return;

    const panelId = `qa-panel-${index}`;
    panel.id = panelId;
    trigger.setAttribute("aria-controls", panelId);
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!isOpen));
      item.classList.toggle("is-open", !isOpen);
    });
  });

  const expandAll = $("#qa-expand-all");
  if (!expandAll) return;

  expandAll.addEventListener("click", () => {
    const shouldOpen = expandAll.dataset.state !== "open";
    $$(".qa-item").forEach((item) => {
      item.classList.toggle("is-open", shouldOpen);
      $(".qa-trigger", item)?.setAttribute("aria-expanded", String(shouldOpen));
    });
    expandAll.dataset.state = shouldOpen ? "open" : "closed";
    expandAll.textContent = shouldOpen ? "Collapse all" : "Expand all";
  });
}

/* ---------- ESCALATION ---------- */

function initEscalation() {
  const wrapper = $(".escalation-dropdown");
  const dropdown = $("#leadership-dropdown");
  if (!wrapper || !dropdown) return;

  // Hide the control entirely rather than showing an empty menu.
  if (LEADERSHIP.length === 0) {
    wrapper.hidden = true;
    return;
  }

  LEADERSHIP.forEach((leader) => {
    const option = document.createElement("option");
    option.value = leader.email;
    option.textContent = leader.title ? `${leader.name} (${leader.title})` : leader.name;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener("change", function () {
    if (this.value) window.location.href = `mailto:${this.value}`;
  });
}

/* ---------- THEME ---------- */

function initTheme() {
  const toggle = $("#theme-toggle");
  const saved = store.get("theme");
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
  }

  if (!toggle) return;
  const sync = () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.hasAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  };
  sync();

  toggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.hasAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("theme", next);
    sync();
  });
}

/* ---------- COPY BUTTONS + BACK TO TOP ---------- */

function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const value = button.dataset.copy;
    const label = button.dataset.copyLabel || "Copied to clipboard";
    copyText(value, label).then((ok) => {
      if (!ok) return;
      button.classList.add("just-copied");
      setTimeout(() => button.classList.remove("just-copied"), 1200);
    });
  });

  const rightsCopy = $("#copy-weingarten");
  if (rightsCopy) rightsCopy.dataset.copy = WEINGARTEN_SCRIPT;
}

function initBackToTop() {
  const button = $("#back-to-top");
  if (!button) return;

  const onScroll = () => button.classList.toggle("is-visible", window.scrollY > 600);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  });
}

/* ---------- DEEP LINKS ---------- */

function campusFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  return campuses.find((campus) => slugify(campus) === hash) || null;
}

function initDeepLink() {
  const fromHash = campusFromHash();
  const remembered = store.get("preferredCampus");

  if (fromHash) {
    selectCampus(fromHash, { scroll: false, updateHash: false });
  } else if (remembered && representatives[remembered]) {
    selectCampus(remembered, { scroll: false, updateHash: false });
  }

  window.addEventListener("hashchange", () => {
    const campus = campusFromHash();
    if (campus && campus !== activeCampus) selectCampus(campus, { updateHash: false });
  });
}

function initShare() {
  const button = $("#share-campus");
  if (!button) return;

  button.addEventListener("click", async () => {
    const url = activeCampus
      ? `${window.location.origin}${window.location.pathname}#${slugify(activeCampus)}`
      : window.location.href;
    const title = activeCampus ? `${activeCampus} campus stewards` : "Find Your Campus Steward";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return; // user dismissed the share sheet
      }
    }
    copyText(url, "Link copied — paste it anywhere.");
  });
}

/* ---------- BOOT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderChips();
  initSearch();
  initAccordion();
  initEscalation();
  initTheme();
  initCopyButtons();
  initBackToTop();
  initShare();
  initDeepLink();
  render();

  const script = $("#weingarten-script");
  if (script) script.textContent = `“${WEINGARTEN_SCRIPT}”`;

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
});
