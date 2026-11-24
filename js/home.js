/* ==========================================================================
   THAMEEN — home page: hero slideshow, product rows, collections,
   get-the-look, reviews.
   ========================================================================== */
(function () {
  const T = window.Thameen; const P = window.THAMEEN_PRODUCTS;
  const pick = (tag) => P.filter((p) => p.tags.includes(tag));

  /* ---------- Product rows (same pattern as the reference site) ---------- */
  document.querySelectorAll("[data-row]").forEach((el) => {
    const items = pick(el.dataset.row);
    el.innerHTML = T.carousel(items.map(T.card).join(""));
  });

  /* ---------- Get the look ---------- */
  const look = document.querySelector("[data-look]");
  if (look) {
    const ids = look.dataset.look.split(",");
    look.innerHTML = T.carousel(ids.map((id) => T.card(T.byId(id))).join(""));
  }

  /* ---------- Reviews ---------- */
  // SAMPLE REVIEWS: replace with real customer quotes and names before launch
  const reviews = [
    { q: "I came in for one perfume and left with three. The staff helped me find a scent that actually lasts all day.", n: "Sample review" },
    { q: "Yaraa is my everyday scent now. I get compliments every single time I wear it.", n: "Sample review" },
    { q: "Great prices for the quality. Ordering on WhatsApp was quick and my parcel was ready the same day.", n: "Sample review" },
    { q: "Oud Mood Satin is pure luxury. Beautiful bottle, beautiful scent, and it lasts.", n: "Sample review" }
  ];
  const rv = document.querySelector("[data-reviews]");
  if (rv) rv.innerHTML = T.carousel(reviews.map((r) => `<figure class="review" style="margin:0"><span class="review__stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote class="review__quote" style="margin:0">“${T.esc(r.q)}”</blockquote><figcaption class="review__name">${T.esc(r.n)}</figcaption></figure>`).join(""), "reviews__track");

  T.initCarousels();

  /* ---------- Hero slideshow ---------- */
  const hero = document.querySelector(".hero");
  if (hero) {
    const slides = [...hero.querySelectorAll(".hero__slide")];
    const dots = hero.querySelector(".hero__dots");
    dots.innerHTML = slides.map((_, i) => `<span class="hero__dot${i === 0 ? " is-active" : ""}"><button type="button" aria-label="Show slide ${i + 1}"></button></span>`).join("");
    const dotEls = [...dots.children];
    let cur = 0, timer;
    const show = (n) => {
      n = (n + slides.length) % slides.length; if (n === cur) return;
      const out = slides[cur], inn = slides[n];
      if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(inn, { autoAlpha: 0 }); inn.classList.add("is-active");
        gsap.to(inn, { autoAlpha: 1, duration: 0.9, ease: "power2.out" });
        gsap.to(out, { autoAlpha: 0, duration: 0.9, ease: "power2.out", onComplete: () => { out.classList.remove("is-active"); gsap.set(out, { clearProps: "opacity,visibility" }); } });
        window.ThameenMotion && ThameenMotion.slideIn(inn);
      } else { out.classList.remove("is-active"); inn.classList.add("is-active"); }
      dotEls[cur].classList.remove("is-active"); dotEls[n].classList.add("is-active");
      cur = n; restart();
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => show(cur + 1), 6000); };
    hero.querySelector(".hero__arrow--prev").addEventListener("click", () => show(cur - 1));
    hero.querySelector(".hero__arrow--next").addEventListener("click", () => show(cur + 1));
    dotEls.forEach((d, i) => d.addEventListener("click", () => show(i)));
    // swipe on touch screens
    let x0 = null;
    hero.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
    document.addEventListener("visibilitychange", () => (document.hidden ? clearInterval(timer) : restart()));
    restart();
  }
})();
