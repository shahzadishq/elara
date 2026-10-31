/**
 * Framework-free interaction effects for the 3D page (tilt cards, scroll reveal,
 * 3D carousel, scroll progress). Shared by <Effects3D> and the static preview.
 * Every init returns a cleanup function.
 */

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Cards with [data-tilt] lean towards the pointer and get a moving glare. */
export function initTilt(root: ParentNode): () => void {
  if (reducedMotion() || !finePointer()) return () => {};
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
  const offs = cards.map((card) => {
    const max = Number(card.dataset.tilt) || 10;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
        card.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      });
    };
    const enter = () => card.classList.add("is-tilting");
    const leave = () => {
      cancelAnimationFrame(raf);
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  });
  return () => offs.forEach((off) => off());
}

/** Elements with [data-reveal] swing into place when they scroll into view. */
export function initReveal(root: ParentNode): () => void {
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (reducedMotion() || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return () => {};
  }
  document.documentElement.classList.add("x3-js");
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/**
 * [data-carousel] holds .x3-ring > .x3-slide items arranged on a 3D cylinder.
 * Auto-rotates, can be dragged, and has prev/next buttons ([data-carousel-prev|next]).
 */
export function initCarousel(root: ParentNode): () => void {
  const el = root.querySelector<HTMLElement>("[data-carousel]");
  const ring = el?.querySelector<HTMLElement>(".x3-ring");
  if (!el || !ring) return () => {};
  const slides = Array.from(ring.querySelectorAll<HTMLElement>(".x3-slide"));
  const n = slides.length;
  const step = 360 / n;
  const reduced = reducedMotion();

  let angle = 0;
  let target = 0;
  let dragging = false;
  let hover = false;
  let visible = true;
  let lastX = 0;
  let raf = 0;
  let last = performance.now();

  const layout = () => {
    const w = slides[0]?.offsetWidth || 260;
    const radius = Math.round(w / 2 / Math.tan(Math.PI / n)) + 70;
    el.style.setProperty("--radius", `${radius}px`);
    slides.forEach((s, i) => s.style.setProperty("--a", `${i * step}deg`));
  };

  const apply = () => {
    ring.style.setProperty("--spin", `${angle}deg`);
    const front = ((Math.round(-angle / step) % n) + n) % n;
    slides.forEach((s, i) => s.classList.toggle("is-front", i === front));
  };

  const tick = (now: number) => {
    const dt = Math.min(64, now - last);
    last = now;
    if (!dragging && !hover && !reduced) target -= dt * 0.012;
    angle += (target - angle) * (dragging ? 0.5 : 0.08);
    apply();
    raf = visible ? requestAnimationFrame(tick) : 0;
  };

  const down = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    target += (e.clientX - lastX) * 0.3;
    lastX = e.clientX;
  };
  const up = () => {
    if (!dragging) return;
    dragging = false;
    el.classList.remove("is-dragging");
    target = Math.round(target / step) * step;
  };
  const go = (dir: number) => {
    target = Math.round(target / step) * step - dir * step;
  };
  const prev = el.querySelector<HTMLElement>("[data-carousel-prev]");
  const next = el.querySelector<HTMLElement>("[data-carousel-next]");
  const onPrev = () => go(-1);
  const onNext = () => go(1);
  const onEnter = () => (hover = true);
  const onLeave = () => (hover = false);

  layout();
  apply();
  const stage = el.querySelector<HTMLElement>(".x3-stage") ?? el;
  stage.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  stage.addEventListener("pointerenter", onEnter);
  stage.addEventListener("pointerleave", onLeave);
  prev?.addEventListener("click", onPrev);
  next?.addEventListener("click", onNext);
  window.addEventListener("resize", layout);

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  });
  io.observe(el);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    stage.removeEventListener("pointerdown", down);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    stage.removeEventListener("pointerenter", onEnter);
    stage.removeEventListener("pointerleave", onLeave);
    prev?.removeEventListener("click", onPrev);
    next?.removeEventListener("click", onNext);
    window.removeEventListener("resize", layout);
  };
}

/** Writes page scroll progress (0..1) to --x3-progress for the top progress bar. */
export function initProgress(): () => void {
  let raf = 0;
  const update = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty("--x3-progress", String(max > 0 ? window.scrollY / max : 0));
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

export function initEffects(root: ParentNode = document): () => void {
  const offs = [initTilt(root), initReveal(root), initCarousel(root), initProgress()];
  return () => offs.forEach((off) => off());
}
