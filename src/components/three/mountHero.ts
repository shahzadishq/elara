import { createToothScene } from "./toothScene";

/**
 * Wires the tooth scene to a hero section: pointer parallax, scroll-linked
 * motion and pausing while off screen. Adds `is-ready` (first frame drawn) or
 * `no-webgl` (fallback) to the section. Returns a cleanup function.
 */
export function mountHero(canvas: HTMLCanvasElement, section: HTMLElement): () => void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = createToothScene(canvas, {
    reducedMotion,
    onReady: () => section.classList.add("is-ready"),
  });
  if (!scene) {
    section.classList.add("no-webgl");
    return () => {};
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };

  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = section.getBoundingClientRect();
      scene.setScroll(-r.top / Math.max(1, r.height));
    });
  };

  const io = new IntersectionObserver(([entry]) => scene.setActive(entry.isIntersecting));
  io.observe(section);
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    scene.dispose();
  };
}
