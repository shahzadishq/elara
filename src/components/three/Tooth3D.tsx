"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL tooth for the 3D hero. three.js is loaded lazily so it never weighs on
 * the classic landing page. Must be rendered inside the hero <section>.
 */
export function Tooth3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    if (!canvas || !section) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("./mountHero")
      .then(({ mountHero }) => {
        if (!cancelled) cleanup = mountHero(canvas, section);
      })
      .catch(() => section.classList.add("no-webgl"));
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="x3-canvas" aria-hidden="true" />;
}
