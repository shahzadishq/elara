"use client";

import { useEffect } from "react";
import { initEffects } from "./effects";

/** Activates tilt cards, scroll reveals, the 3D carousel and the progress bar. */
export function Effects3D() {
  useEffect(() => initEffects(document), []);
  return null;
}
