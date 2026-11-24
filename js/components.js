/* ==========================================================================
   THAMEEN — shared components
   Header, footer, mobile menu, search, cart drawer, product card, carousel,
   toast and Web3Forms handling. Every page includes:
     <div id="site-header"></div>  ...page...  <div id="site-footer"></div>
   ========================================================================== */
(function () {
  const C = window.THAMEEN_CONFIG;
  const P = window.THAMEEN_PRODUCTS;

  /* ---------- Icons (inline SVG, inherit currentColor) ---------- */
  const I = {
    search: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    cart: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L20.5 8H6.2"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>',
    menu: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5"/></svg>',
    left: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    truck: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 6h11v9H2zM13 9h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>',
    pin: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    phone: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    clock: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3a4.6 4.6 0 0 0 4 4v3.2a7.8 7.8 0 0 1-4-1.2v6.6A6.4 6.4 0 1 1 10 9.2v3.3a3.1 3.1 0 1 0 3.2 3.1V3z"/></svg>',
    shield: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    store: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 9h16l-1-5H5zM5 9v11h14V9M9 20v-6h6v6"/></svg>'
  };

  /* ---------- Helpers ---------- */
  const money = (n) => C.currencySymbol + Number(n).toFixed(2);
  const byId = (id) => P.find((p) => p.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const productUrl = (p) => "product.html#" + p.id;
  const waLink = (text) => "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text);
  const page = (document.querySelector("main") || document.body).dataset.page || "";

  /* ---------- Cart (kept in this browser only) ---------- */
  const store = {
    get() { try { return JSON.parse(localStorage.getItem("thameen-cart") || "[]"); } catch (e) { return store._mem || []; } },
    set(v) { store._mem = v; try { localStorage.setItem("thameen-cart", JSON.stringify(v)); } catch (e) { /* storage blocked: keep in memory */ } }
  };
  const cart = {
    items() { return store.get().filter((i) => byId(i.id)); },
    count() { return cart.items().reduce((n, i) => n + i.qty, 0); },
    total() { return cart.items().reduce((n, i) => n + byId(i.id).price * i.qty, 0); },
    add(id, qty = 1) {
      const items = cart.items(); const f = items.find((i) => i.id === id);
      if (f) f.qty += qty; else items.push({ id, qty });
      store.set(items); renderCart(); bumpCount();
      toast(byId(id).name + " added to your cart");
    },
    setQty(id, qty) { let items = cart.items(); items = qty <= 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { id, qty } : i)); store.set(items); renderCart(); }
  };

  /* ---------- Product card ---------- */
  function card(p) {
    const badge = p.tags.includes("new") ? '<span class="card__badge">New</span>' : p.tags.includes("best") ? '<span class="card__badge card__badge--best">Best seller</span>' : "";
    return `<article class="card" data-reveal-card>
      <a class="card__media" href="${productUrl(p)}" aria-label="${esc(p.name)}">
        ${badge}<img src="${p.img}" alt="${esc(p.name)} ${esc(p.type)} ${esc(p.size)}" loading="lazy" width="700" height="700">
        <span class="card__quick">View details</span>
      </a>
      <a class="card__title" href="${productUrl(p)}">${esc(p.name)}</a>
      <span class="card__size">${esc(p.type)} · ${esc(p.size)}</span>
      <span class="card__price">${money(p.price)}</span>
      <button class="btn btn-accent card__btn" type="button" data-add="${p.id}">Add to cart</button>
    </article>`;
  }

  /* ---------- Carousel (native scroll + arrows + progress) ---------- */
  function carousel(items, extraTrackClass = "") {
    return `<div class="carousel" data-carousel>
      <button class="carousel__btn carousel__btn--prev" type="button" aria-label="Previous">${I.left}</button>
      <div class="carousel__track ${extraTrackClass}" tabindex="0">${items}</div>
      <button class="carousel__btn carousel__btn--next" type="button" aria-label="Next">${I.right}</button>
      <div class="carousel__progress" aria-hidden="true"><span></span></div>
    </div>`;
  }
  function initCarousels(root = document) {
    root.querySelectorAll("[data-carousel]:not([data-ready])").forEach((el) => {
      el.dataset.ready = "1";
      const track = el.querySelector(".carousel__track");
      const prev = el.querySelector(".carousel__btn--prev");
      const next = el.querySelector(".carousel__btn--next");
      const bar = el.querySelector(".carousel__progress span");
      const step = () => { const first = track.children[0]; return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
      const update = () => {
        const max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft >= max - 2;
        const w = track.scrollWidth ? (track.clientWidth / track.scrollWidth) * 100 : 100;
        bar.style.width = w + "%"; bar.style.left = max > 0 ? (track.scrollLeft / max) * (100 - w) + "%" : "0";
        el.querySelector(".carousel__progress").hidden = max <= 2;
      };
      prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
      track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    });
  }

  /* ---------- Navigation data (one place for header, drawer and footer) ---------- */
  const NAV = [
    { label: "Minis", href: "shop.html#mini" },
    { label: "Gift sets", href: "shop.html#gift" },
    { label: "New launches", href: "shop.html#new" },
    { label: "Best sellers", href: "shop.html#best", children: [
      { label: "Best sellers for him", href: "shop.html#best-men" },
      { label: "Best sellers for her", href: "shop.html#best-women" },
      { label: "All best sellers", href: "shop.html#best" } ] },
    { label: "Perfumes", href: "shop.html#all", children: [
      { label: "Perfumes for him", href: "shop.html#men" },
      { label: "Perfumes for her", href: "shop.html#women" },
      { label: "Unisex perfumes", href: "shop.html#unisex" },
      { label: "All perfumes", href: "shop.html#all" } ] },
    { label: "Trending", href: "shop.html#trending" },
    { label: "More links", href: "about.html", children: [
      { label: "About us", href: "about.html" },
      { label: "Contact us", href: "contact.html" },
      { label: "Visit our shop", href: "contact.html#visit" } ] }
  ];

  /* ---------- Header ---------- */
  function renderHeader() {
    const host = document.getElementById("site-header"); if (!host) return;
    const navItems = NAV.map((n) => `<li class="nav-item">
        <a class="nav-link" href="${n.href}">${n.label}${n.children ? I.chev : ""}</a>
        ${n.children ? `<div class="nav-dropdown">${n.children.map((c) => `<a href="${c.href}">${c.label}</a>`).join("")}</div>` : ""}
      </li>`).join("");
    const msgs = C.announcements.map((m, i) => `<p class="announce__msg${i === 0 ? " is-active" : ""}">${esc(m)}</p>`).join("");
    host.outerHTML = `
    <div class="announce" role="region" aria-label="Announcements"><div class="announce__track">${msgs}</div></div>
    <header class="site-header" id="siteHeader">
      <div class="header-main">
        <div class="container header-main__inner">
          <div class="header-left">
            <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" data-open="menu">${I.menu}</button>
            <button class="icon-btn search-toggle-mobile" type="button" aria-label="Search" data-open="search">${I.search}</button>
            <button class="header-search" type="button" data-open="search">${I.search}<span>What are you looking for?</span></button>
          </div>
          <a class="logo" href="index.html" aria-label="${esc(C.brand)} home"><img src="assets/logo.svg" alt="${esc(C.brand)}" width="250" height="50"></a>
          <div class="header-right">
            <span class="header-region" title="Prices in US dollars">Zimbabwe · ${C.currency}</span>
            <a class="icon-btn" href="contact.html#visit" aria-label="Visit our shop" title="Visit our shop">${I.truck}</a>
            <button class="icon-btn" type="button" aria-label="Open cart" data-open="cart">${I.cart}<span class="cart-count" data-cart-count>0</span></button>
          </div>
        </div>
      </div>
      <nav class="header-nav" aria-label="Main">
        <div class="container header-nav__inner">
          <div class="header-nav__compact header-nav__compact--left"><button class="icon-btn" type="button" aria-label="Search" data-open="search">${I.search}</button></div>
          <ul class="nav-list">${navItems}</ul>
          <div class="header-nav__compact header-nav__compact--right"><button class="icon-btn" type="button" aria-label="Open cart" data-open="cart">${I.cart}<span class="cart-count" data-cart-count>0</span></button></div>
        </div>
      </nav>
    </header>

    <div class="scrim" data-scrim></div>

    <aside class="drawer drawer--left" id="menuDrawer" aria-label="Menu" aria-hidden="true">
      <div class="drawer__head"><img src="assets/logo.svg" alt="${esc(C.brand)}" width="150" height="30"><button class="icon-btn" type="button" aria-label="Close menu" data-close>${I.close}</button></div>
      <div class="drawer__body mnav">
        <a href="index.html">Home</a>
        ${NAV.map((n) => n.children
          ? `<details><summary>${n.label}${I.chev}</summary>${n.children.map((c) => `<a href="${c.href}">${c.label}</a>`).join("")}</details>`
          : `<a href="${n.href}">${n.label}</a>`).join("")}
        <div class="mnav__extra">
          <a href="${waLink("Hello Thameen Ware, I'd like to place an order.")}" target="_blank" rel="noopener" style="padding:0;border:0;text-transform:none;justify-content:flex-start;gap:8px">${I.phone} ${esc(C.phoneDisplay)}</a>
          <span style="display:flex;gap:8px">${I.pin} ${esc(C.address)}</span>
        </div>
      </div>
    </aside>

    <aside class="drawer drawer--right" id="cartDrawer" aria-label="Cart" aria-hidden="true">
      <div class="drawer__head"><span class="drawer__title">Your cart</span><button class="icon-btn" type="button" aria-label="Close cart" data-close>${I.close}</button></div>
      <div class="drawer__body" data-cart-body></div>
      <div class="drawer__foot" data-cart-foot></div>
    </aside>

    <div class="search-panel" id="searchPanel" role="dialog" aria-label="Search products" aria-hidden="true">
      <div class="search-panel__bar">${I.search}<label class="sr-only" for="searchInput">Search products</label><input id="searchInput" type="search" placeholder="Search perfumes, e.g. oud, vanilla, Yaraa" autocomplete="off"><button class="icon-btn" type="button" aria-label="Close search" data-close>${I.close}</button></div>
      <p class="search-hint" data-search-hint>Popular: <a href="#" data-q="oud">Oud</a><a href="#" data-q="vanilla">Vanilla</a><a href="#" data-q="rose">Rose</a><a href="#" data-q="men">For him</a><a href="#" data-q="women">For her</a></p>
      <div class="search-results" data-search-results></div>
    </div>`;
    // highlight current section
    const here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .mnav a").forEach((a) => { if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page"); });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const host = document.getElementById("site-footer"); if (!host) return;
    const col = (title, body) => `<div class="footer__col"><details open><summary>${title}${I.chev}</summary>${body}</details></div>`;
    host.outerHTML = `
    <section class="newsletter" aria-labelledby="nl-title">
      <div class="container newsletter__inner" data-reveal>
        <h2 id="nl-title">Subscribe to our newsletter</h2>
        <p>Be the first to hear about new arrivals, restocks and in-store offers.</p>
        <form data-web3form="newsletter" novalidate>
          <label class="sr-only" for="nlEmail">Email address</label>
          <input id="nlEmail" type="email" name="email" placeholder="Email address" required autocomplete="email">
          <input type="hidden" name="subject" value="New newsletter sign-up: Thameen Ware website">
          <input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" autocomplete="off">
          <button type="submit">Sign up</button>
        </form>
        <p class="form-status" role="status" data-form-status></p>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="footer__brand">
          <img class="footer-logo" src="assets/logo-white.svg" alt="${esc(C.brand)}" width="220" height="44">
          <p>Arabian and designer-inspired perfumes, home and beauty essentials. Find your signature scent.</p>
        </div>
        <div class="footer__cols">
          ${col("Shop", `<ul>
            <li><a href="shop.html#all">All perfumes</a></li><li><a href="shop.html#men">Men's perfumes</a></li>
            <li><a href="shop.html#women">Women's perfumes</a></li><li><a href="shop.html#unisex">Unisex perfumes</a></li>
            <li><a href="shop.html#mini">Minis</a></li><li><a href="shop.html#gift">Gift sets</a></li></ul>`)}
          ${col("Services", `<ul>
            <li><a href="contact.html#faq">Delivery & collection</a></li><li><a href="contact.html#faq">Exchanges & returns</a></li>
            <li><a href="contact.html#faq">Payment options</a></li><li><a href="contact.html">Contact us</a></li></ul>`)}
          ${col("More links", `<ul>
            <li><a href="about.html">About us</a></li><li><a href="contact.html#faq">FAQs</a></li>
            <li><a href="contact.html#visit">Visit our shop</a></li><li><a href="${waLink("Hello Thameen Ware!")}" target="_blank" rel="noopener">Chat on WhatsApp</a></li></ul>`)}
          ${col("Visit & follow us", `<div class="footer__contact">
              <span style="display:flex;gap:8px">${I.pin}<span>${esc(C.address)}</span></span>
              <a style="display:flex;gap:8px" href="${waLink("Hello Thameen Ware!")}" target="_blank" rel="noopener">${I.phone}<span>${esc(C.phoneDisplay)}</span></a>
            </div>
            <div class="social">
              <a href="${C.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${I.tiktok}</a>
              <a href="${C.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram}</a>
              <a href="${C.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${I.facebook}</a>
            </div>`)}
        </div>
        <div class="footer__bottom">
          <span>Copyright © ${new Date().getFullYear()} ${esc(C.brand)}. All rights reserved.</span>
          <div class="payments" aria-label="Payment methods accepted"><span>CASH</span><span>VISA</span><span>MASTERCARD</span><span>ECOCASH</span><span>INNBUCKS</span></div>
        </div>
      </div>
    </footer>
    <div class="chat-float">
      <span class="chat-float__label">Chat with us</span>
      <a class="chat-float__btn" href="${waLink("Hello Thameen Ware, I have a question.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${I.whatsapp}</a>
    </div>
    <div class="toast" role="status" aria-live="polite" data-toast></div>`;
    // footer columns: open on tablet/laptop, collapsible accordions on phones
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => document.querySelectorAll(".footer__col details").forEach((d) => { d.open = mq.matches; });
    sync(); mq.addEventListener ? mq.addEventListener("change", sync) : mq.addListener(sync);
  }

  /* ---------- Cart drawer ---------- */
  function renderCart() {
    const body = document.querySelector("[data-cart-body]"); const foot = document.querySelector("[data-cart-foot]");
    document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = cart.count(); });
    if (!body) return;
    const items = cart.items();
    if (!items.length) {
      body.innerHTML = `<div class="cart-empty"><p>Your cart is empty.</p><a class="btn btn-accent" href="shop.html#all">Shop perfumes</a></div>`;
      foot.innerHTML = ""; return;
    }
    body.innerHTML = `<div class="cart-items">${items.map((i) => { const p = byId(i.id); return `
      <div class="cart-item">
        <img src="${p.img}" alt="" width="76" height="76">
        <div><p class="cart-item__name">${esc(p.name)}</p><p class="cart-item__meta">${esc(p.size)} · ${money(p.price)}</p>
          <div class="qty"><button type="button" aria-label="Decrease quantity" data-qty="${p.id}" data-d="-1">−</button><span>${i.qty}</span><button type="button" aria-label="Increase quantity" data-qty="${p.id}" data-d="1">+</button></div>
          <div><button class="cart-item__remove" type="button" data-remove="${p.id}">Remove</button></div></div>
        <strong>${money(p.price * i.qty)}</strong>
      </div>`; }).join("")}</div>`;
    const lines = items.map((i) => { const p = byId(i.id); return `• ${p.name} (${p.size}) x${i.qty} = ${money(p.price * i.qty)}`; }).join("\n");
    const msg = `Hello Thameen Ware, I'd like to order:\n${lines}\nTotal: ${money(cart.total())}`;
    foot.innerHTML = `<div class="cart-subtotal"><span>Subtotal</span><strong>${money(cart.total())}</strong></div>
      <p class="cart-note">Send your order on WhatsApp and we'll confirm stock, delivery or collection, and payment.</p>
      <a class="btn btn-accent btn-block" href="${waLink(msg)}" target="_blank" rel="noopener">Checkout on WhatsApp</a>`;
  }
  function bumpCount() {
    if (!window.gsap) return;
    gsap.fromTo("[data-cart-count]", { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = document.querySelector("[data-toast]"); if (!t) return;
    t.textContent = msg; t.classList.add("is-show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-show"), 2400);
  }

  /* ---------- Overlays: menu, cart, search ---------- */
  function openPanel(name) {
    closeAll();
    const el = { menu: "#menuDrawer", cart: "#cartDrawer", search: "#searchPanel" }[name];
    const node = document.querySelector(el); if (!node) return;
    node.classList.add("is-open"); node.setAttribute("aria-hidden", "false");
    document.querySelector("[data-scrim]").classList.add("is-open");
    document.body.classList.add("is-locked");
    if (name === "search") setTimeout(() => document.getElementById("searchInput").focus(), 200);
    if (name === "cart") renderCart();
  }
  function closeAll() {
    document.querySelectorAll(".drawer.is-open, .search-panel.is-open").forEach((n) => { n.classList.remove("is-open"); n.setAttribute("aria-hidden", "true"); });
    const s = document.querySelector("[data-scrim]"); if (s) s.classList.remove("is-open");
    document.body.classList.remove("is-locked");
  }
  function runSearch(q) {
    const out = document.querySelector("[data-search-results]"); const hint = document.querySelector("[data-search-hint]");
    q = q.trim().toLowerCase();
    if (!q) { out.innerHTML = ""; hint.hidden = false; return; }
    hint.hidden = true;
    const words = q.split(/\s+/);
    const hits = P.filter((p) => { const hay = [p.name, p.type, p.gender, p.gender === "men" ? "him" : p.gender === "women" ? "her" : "", p.notes.top, p.notes.heart, p.notes.base, p.tags.join(" ")].join(" ").toLowerCase(); return words.every((w) => hay.includes(w)); });
    out.innerHTML = hits.length ? hits.slice(0, 8).map(card).join("") : `<p style="grid-column:1/-1;color:var(--color-muted)">No perfumes match "${esc(q)}". Try another note or name, or <a style="text-decoration:underline" href="${waLink("Hello, do you have " + q + "?")}" target="_blank" rel="noopener">ask us on WhatsApp</a>.</p>`;
  }

  /* ---------- Web3Forms ---------- */
  function initForms(root = document) {
    root.querySelectorAll("form[data-web3form]:not([data-ready])").forEach((form) => {
      form.dataset.ready = "1";
      const status = form.parentElement.querySelector("[data-form-status]") || form.querySelector("[data-form-status]");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const say = (msg, ok) => { if (status) { status.textContent = msg; status.className = "form-status " + (ok ? "is-ok" : "is-error"); } };
        const email = form.querySelector('[type="email"]');
        if (!form.checkValidity()) { say(email && !email.validity.valid ? "Please enter a valid email address." : "Please fill in the required fields.", false); return; }
        if (!C.web3formsKey || C.web3formsKey.startsWith("YOUR_")) { say("Form not connected yet: add the Web3Forms access key in js/config.js.", false); return; }
        const data = new FormData(form);
        data.append("access_key", C.web3formsKey);
        data.append("from_name", C.brand + " website");
        const btn = form.querySelector('[type="submit"]'); const label = btn.textContent;
        btn.disabled = true; btn.textContent = "Sending…";
        try {
          const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: data });
          const json = await res.json();
          if (json.success) { form.reset(); say(form.dataset.web3form === "newsletter" ? "Thank you, you're on the list." : "Thank you, your message has been sent. We'll reply soon.", true); }
          else say(json.message || "Something went wrong. Please try again or message us on WhatsApp.", false);
        } catch (err) {
          say("We couldn't send that right now. Please try again or message us on WhatsApp.", false);
        } finally { btn.disabled = false; btn.textContent = label; }
      });
    });
  }

  /* ---------- Announcement rotator ---------- */
  function initAnnouncements() {
    const msgs = [...document.querySelectorAll(".announce__msg")]; if (msgs.length < 2) return;
    let i = 0;
    setInterval(() => {
      const cur = msgs[i]; i = (i + 1) % msgs.length; const nxt = msgs[i];
      if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(cur, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "power2.in", onComplete: () => cur.classList.remove("is-active") });
        gsap.fromTo(nxt, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, delay: 0.3, ease: "power2.out", onStart: () => nxt.classList.add("is-active") });
      } else { cur.classList.remove("is-active"); nxt.classList.add("is-active"); }
    }, 4000);
  }

  /* ---------- Global click handling ---------- */
  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-open],[data-close],[data-scrim],[data-add],[data-qty],[data-remove],[data-q]");
      if (!t) return;
      if (t.dataset.open) { e.preventDefault(); openPanel(t.dataset.open); }
      else if (t.hasAttribute("data-close") || t.hasAttribute("data-scrim")) closeAll();
      else if (t.dataset.add) { cart.add(t.dataset.add, Number(t.dataset.qtyAdd || 1)); }
      else if (t.dataset.qty) { const it = cart.items().find((i) => i.id === t.dataset.qty); if (it) cart.setQty(it.id, it.qty + Number(t.dataset.d)); }
      else if (t.dataset.remove) cart.setQty(t.dataset.remove, 0);
      else if (t.dataset.q) { e.preventDefault(); const inp = document.getElementById("searchInput"); inp.value = t.dataset.q; runSearch(t.dataset.q); }
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
    document.addEventListener("input", (e) => { if (e.target.id === "searchInput") runSearch(e.target.value); });
    // close the mobile menu when a link inside it is followed (same-page hash links)
    document.addEventListener("click", (e) => { if (e.target.closest(".mnav a, .search-results a")) setTimeout(closeAll, 50); });
    window.addEventListener("resize", () => { if (innerWidth >= 1024 && document.querySelector("#menuDrawer.is-open")) closeAll(); });
  }

  /* ---------- Public API ---------- */
  window.Thameen = { I, money, byId, esc, card, carousel, initCarousels, initForms, productUrl, waLink, cart, toast, page };

  renderHeader();
  renderFooter();
  renderCart();
  bindGlobal();
  initAnnouncements();
  initForms();
})();
