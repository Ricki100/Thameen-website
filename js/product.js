/* ==========================================================================
   THAMEEN — product detail page. Product id comes from the hash:
   product.html#yaraa
   ========================================================================== */
(function () {
  const T = window.Thameen; const P = window.THAMEEN_PRODUCTS; const C = window.THAMEEN_CONFIG;
  const root = document.querySelector("[data-pdp]");
  const related = document.querySelector("[data-related]");
  const genderLabel = { men: "For him", women: "For her", unisex: "Unisex" };

  function render() {
    const p = T.byId(location.hash.slice(1)) || P[0];
    document.title = p.name + " | Thameen Ware";
    let qty = 1;
    root.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb" style="justify-content:flex-start;grid-column:1/-1"><a href="index.html">Home</a><span>/</span><a href="shop.html#${p.gender}">${genderLabel[p.gender]}</a><span>/</span><span>${T.esc(p.name)}</span></nav>
      <div class="pdp__media" data-zoom><img src="${p.img}" alt="${T.esc(p.name)} ${T.esc(p.type)} ${T.esc(p.size)}" width="900" height="900"></div>
      <div class="pdp__info">
        <div><p class="pdp__sub">${genderLabel[p.gender]} · ${T.esc(p.type)}</p><h1 class="pdp__title">${T.esc(p.name)}</h1></div>
        <div><p class="pdp__price">${T.money(p.price)}</p><p class="pdp__tax">${p.priceConfirmed ? "Price in US dollars." : "Price to be confirmed in store."}</p></div>
        <div><p class="pdp__label">Size</p><span class="chip is-active">${T.esc(p.size)}</span></div>
        <div><p class="pdp__label">Fragrance notes</p>
          <div class="notes"><div class="note"><b>Top</b><span>${T.esc(p.notes.top)}</span></div><div class="note"><b>Heart</b><span>${T.esc(p.notes.heart)}</span></div><div class="note"><b>Base</b><span>${T.esc(p.notes.base)}</span></div></div></div>
        <div class="pdp__actions">
          <div class="pdp__row">
            <div class="qty" aria-label="Quantity"><button type="button" data-step="-1" aria-label="Decrease quantity">−</button><span data-qty-val>1</span><button type="button" data-step="1" aria-label="Increase quantity">+</button></div>
            <button class="btn btn-accent" type="button" data-pdp-add>Add to cart</button>
          </div>
          <a class="btn btn-outline btn-block" data-buy target="_blank" rel="noopener" href="#">Buy it now on WhatsApp</a>
        </div>
        <div class="trust">
          <div>${T.I.store}<span>Collect in Belvedere</span></div>
          <div>${T.I.phone}<span>Order on WhatsApp</span></div>
          <div>${T.I.shield}<span>Prices in US dollars</span></div>
        </div>
        <div class="acc">
          <details open><summary>Description${T.I.chev}</summary><div class="acc__body"><p>${T.esc(p.desc)}</p><p>${T.esc(p.type)}, ${T.esc(p.size)}.</p></div></details>
          <details><summary>How to wear it${T.I.chev}</summary><div class="acc__body"><p>Spray on pulse points: wrists, neck and behind the ears. For longer wear, apply after a shower onto moisturised skin and spritz lightly on clothing.</p></div></details>
          <details><summary>Delivery & collection${T.I.chev}</summary><div class="acc__body"><p>Collect from Shop 13, Longcheng Plaza, Belvedere, or ask us about delivery in Harare when you order on WhatsApp.</p></div></details>
        </div>
      </div>`;
    const qv = root.querySelector("[data-qty-val]");
    const buy = root.querySelector("[data-buy]");
    const setBuy = () => { buy.href = T.waLink(`Hello Thameen Ware, I'd like to buy ${qty} x ${p.name} (${p.size}) at ${T.money(p.price)} each.`); };
    setBuy();
    root.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => { qty = Math.max(1, qty + Number(b.dataset.step)); qv.textContent = qty; setBuy(); }));
    root.querySelector("[data-pdp-add]").addEventListener("click", () => T.cart.add(p.id, qty));
    // tap / click to zoom, follows the pointer on laptops
    const z = root.querySelector("[data-zoom]"); const img = z.querySelector("img");
    z.addEventListener("click", () => { z.classList.toggle("is-zoom"); if (!z.classList.contains("is-zoom")) img.style.transformOrigin = ""; });
    z.addEventListener("mousemove", (e) => { if (!z.classList.contains("is-zoom")) return; const r = z.getBoundingClientRect(); img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`; });

    // "You may also like": same gender first, then others
    const rel = P.filter((x) => x.id !== p.id).sort((a, b) => (b.gender === p.gender) - (a.gender === p.gender)).slice(0, 10);
    related.innerHTML = T.carousel(rel.map(T.card).join(""));
    related.querySelector("[data-carousel]").removeAttribute("data-ready");
    T.initCarousels(related);

    if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(".pdp__media", { autoAlpha: 0, scale: 0.97, duration: 0.8, ease: "power3.out" });
      gsap.from(".pdp__info > *", { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: "power2.out", delay: 0.1 });
    }
    window.ThameenMotion && ThameenMotion.refresh();
  }
  window.addEventListener("hashchange", () => { render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  render();
})();
