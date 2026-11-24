/* ==========================================================================
   THAMEEN — shop / collection page. Filter is read from the URL hash,
   e.g. shop.html#men, shop.html#best-women, shop.html#mini
   ========================================================================== */
(function () {
  const T = window.Thameen; const P = window.THAMEEN_PRODUCTS;
  const FILTERS = {
    all: { label: "All perfumes", test: () => true },
    men: { label: "For him", test: (p) => p.gender === "men" },
    women: { label: "For her", test: (p) => p.gender === "women" },
    unisex: { label: "Unisex", test: (p) => p.gender === "unisex" },
    new: { label: "New launches", test: (p) => p.tags.includes("new") },
    best: { label: "Best sellers", test: (p) => p.tags.includes("best") },
    trending: { label: "Trending", test: (p) => p.tags.includes("trending") },
    mini: { label: "Minis", test: (p) => p.tags.includes("mini") },
    gift: { label: "Gift sets", test: (p) => p.tags.includes("gift") },
    "best-men": { label: "Best sellers for him", test: (p) => p.tags.includes("best") && p.gender === "men", hidden: true },
    "best-women": { label: "Best sellers for her", test: (p) => p.tags.includes("best") && p.gender === "women", hidden: true }
  };
  const chips = document.querySelector("[data-chips]");
  const grid = document.querySelector("[data-grid]");
  const count = document.querySelector("[data-count]");
  const title = document.querySelector("[data-title]");
  const crumb = document.querySelector("[data-crumb]");
  const sort = document.getElementById("sortSelect");

  chips.innerHTML = Object.entries(FILTERS).filter(([, f]) => !f.hidden).map(([k, f]) => `<a class="chip" href="#${k}" data-chip="${k}">${f.label}</a>`).join("");

  function render() {
    const key = FILTERS[location.hash.slice(1)] ? location.hash.slice(1) : "all";
    const f = FILTERS[key];
    let list = P.filter(f.test);
    const s = sort.value;
    if (s === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (s === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (s === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    title.textContent = f.label; crumb.textContent = f.label;
    document.title = f.label + " | Thameen Ware";
    count.textContent = list.length + (list.length === 1 ? " product" : " products");
    chips.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c.dataset.chip === key || (key.startsWith("best-") && c.dataset.chip === "best")));
    grid.innerHTML = list.length ? list.map(T.card).join("") : `<p style="grid-column:1/-1;text-align:center;color:var(--color-muted)">Nothing here yet. <a class="link-underline" href="#all">See all perfumes</a></p>`;
    if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(grid.children, { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" });
    }
    window.ThameenMotion && ThameenMotion.refresh();
  }
  window.addEventListener("hashchange", () => { render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  sort.addEventListener("change", render);
  render();
})();
