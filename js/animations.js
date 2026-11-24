/* ==========================================================================
   THAMEEN — GSAP + ScrollTrigger animations
   Loaded last on every page. Uses gsap.matchMedia so phones get lighter
   motion and visitors with "reduce motion" switched on get none.
   Hooks: [data-reveal] (fade up), [data-reveal-card] (staggered cards),
          [data-parallax] (image drift), .section-title (heading reveal).
   ========================================================================== */
(function () {
  if (!window.gsap) return;            // CDN blocked: the site still works, just without motion
  gsap.registerPlugin(ScrollTrigger);

  const header = document.getElementById("siteHeader");

  /* Sticky header compacts after scrolling (runs for everyone, it's layout not motion) */
  if (header) {
    ScrollTrigger.create({
      start: 140, end: "max",
      onToggle: (self) => header.classList.toggle("is-compact", self.isActive)
    });
  }

  const mm = gsap.matchMedia();

  mm.add({
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 1024px)",
    mobile: "(max-width: 1023px)"
  }, (ctx) => {
    const { motion, desktop } = ctx.conditions;
    if (!motion) return;

    /* ---- Hero intro (first slide) ---- */
    const hero = document.querySelector(".hero");
    if (hero) {
      gsap.from(".hero__slide.is-active img", { scale: 1.12, duration: 1.8, ease: "power2.out" });
      gsap.from(".hero__slide.is-active .hero__content > *", { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2 });
    }

    /* ---- Section headings ---- */
    gsap.utils.toArray(".section-head").forEach((head) => {
      gsap.from(head.children, {
        y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: head, start: "top 88%", once: true }
      });
    });

    /* ---- Generic reveal ---- */
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    /* ---- Product cards: staggered batches as they scroll in ---- */
    ScrollTrigger.batch("[data-reveal-card]", {
      start: "top 92%", once: true,
      onEnter: (batch) => gsap.from(batch, { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true })
    });

    /* ---- Collection tiles: lift in, then images drift inside their frames ---- */
    const tiles = gsap.utils.toArray(".tile");
    if (tiles.length) {
      gsap.from(tiles, { y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".collections", start: "top 85%", once: true } });
      tiles.forEach((t) => {
        gsap.fromTo(t.querySelector(".tile__img"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }

    /* ---- Get the look: image wipes open, hotspots pop ---- */
    const look = document.querySelector(".look__media");
    if (look) {
      gsap.from(look, { clipPath: "inset(0 100% 0 0)", duration: 1.3, ease: "power4.inOut", scrollTrigger: { trigger: look, start: "top 80%", once: true } });
      gsap.from(look.querySelectorAll(".hotspot"), { scale: 0, duration: 0.5, stagger: 0.15, ease: "back.out(3)", delay: 0.9, scrollTrigger: { trigger: look, start: "top 80%", once: true } });
    }

    /* ---- Our story: background parallax + panel slides in ---- */
    const story = document.querySelector(".story");
    if (story) {
      gsap.fromTo(".story__bg", { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: story, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".story__box", { x: desktop ? -80 : 0, y: desktop ? 0 : 40, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: story, start: "top 70%", once: true } });
    }

    /* ---- Generic parallax images ---- */
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ---- Reviews ---- */
    if (document.querySelector(".review")) {
      gsap.from(".review", { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".reviews", start: "top 80%", once: true } });
    }

    /* ---- Footer columns ---- */
    gsap.from(".footer__col, .footer__brand", { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 92%", once: true } });

  });

  /* Images and fonts change heights; recalc trigger positions once they settle */
  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.ThameenMotion = {
    refresh: () => ScrollTrigger.refresh(),
    // used by the hero slideshow for each slide change
    slideIn(slide) {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(slide.querySelector("img"), { scale: 1.1 }, { scale: 1, duration: 1.6, ease: "power2.out" });
      gsap.fromTo(slide.querySelectorAll(".hero__content > *"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.15 });
    }
  };
})();
