"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/site";
import { ArrowIcon } from "../Icons";
import { Rich } from "../Rich";

/**
 * Patient reviews as a carousel: native horizontal scroll with snap points
 * (swipe on touch, trackpad on desktop), plus previous/next buttons and dots.
 * No autoplay – visitors move through the reviews at their own pace.
 * Shows 1 card on phones, 2 on tablets, 3 on desktop.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const items = testimonials.items;

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = [...track.children] as HTMLElement[];
    const left = track.scrollLeft;
    const idx = slides.reduce(
      (best, el, i) =>
        Math.abs(slideLeft(track, el) - left) < Math.abs(slideLeft(track, slides[best]) - left)
          ? i
          : best,
      0,
    );
    setActive(idx);
    setCanPrev(left > 4);
    setCanNext(left + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const track = trackRef.current;
    track?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function goTo(i: number) {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slideLeft(track, slide), behavior: "smooth" });
  }

  function step(dir: 1 | -1) {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    track.scrollBy({ left: dir * (first.offsetWidth + 20), behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="stimmen-title"
      aria-roledescription="Karussell"
      className="overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{testimonials.eyebrow}</p>
            <h2 id="stimmen-title" className="heading-lg mt-4 text-balance">
              <Rich text={testimonials.title} />
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Vorherige Bewertungen"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy-800/20 bg-white text-navy-800 transition hover:border-navy-800 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Nächste Bewertungen"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-white transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto scroll-smooth px-5 sm:scroll-px-8 lg:scroll-px-0 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <li
              key={t.quote}
              role="group"
              aria-roledescription="Folie"
              aria-label={`${i + 1} von ${items.length}`}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <figure className="flex h-full flex-col rounded-[1.25rem] border border-line bg-white p-7 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <QuoteMark />
                  {t.rating && <Stars rating={t.rating} />}
                </div>
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">
                  „{t.quote}“
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="font-bold text-navy-900">{t.name}</span>
                  {t.source && <span className="text-muted"> · {t.source}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-1">
          {items.map((t, i) => (
            <button
              key={t.quote}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Bewertung ${i + 1} anzeigen`}
              aria-current={i === active ? "true" : undefined}
              className="group inline-flex h-6 items-center px-1"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-navy-800" : "w-2 bg-navy-800/20 group-hover:bg-navy-800/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Scroll position at which a slide sits flush with the track's padded start edge. */
function slideLeft(track: HTMLElement, slide: HTMLElement) {
  const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  return slide.offsetLeft - track.offsetLeft - pad;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400" role="img" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4.5 w-4.5 ${n <= rating ? "" : "text-line"}`}
        >
          <path
            fill="currentColor"
            d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z"
          />
        </svg>
      ))}
    </span>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" className="h-6 w-8 text-teal-500">
      <path
        fill="currentColor"
        d="M0 24V14.4C0 6.2 4.4 1.4 13.2 0l1.4 3.6C9.8 4.8 7.4 7.4 7.2 11.2H13V24H0Zm18.6 0V14.4C18.6 6.2 23 1.4 31.8 0l1.4 3.6c-4.8 1.2-7.2 3.8-7.4 7.6h5.8V24H18.6Z"
      />
    </svg>
  );
}
