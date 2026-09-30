"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bookingProcess as process, images } from "@/content/site";
import { AppointmentLink, PhoneLink } from "../Cta";
import { Rich } from "../Rich";

/**
 * Scroll story: on large screens the image column stays pinned while the steps
 * scroll past; the step in the middle of the viewport becomes active, its image
 * cross-fades in and the progress line fills. On small screens every step shows
 * its own image inline. Without JS / with reduced motion everything stays readable.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = ((active + 1) / process.steps.length) * 100;

  return (
    <section aria-labelledby="ablauf-title" className="bg-sand py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="ablauf-title" className="heading-lg mt-4 text-balance">
            <Rich text={process.title} />
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{process.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-12 lg:gap-16">
          {/* Pinned image column (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 py-10">
              <div className="relative aspect-[4/5] max-h-[calc(100vh-10rem)] overflow-hidden rounded-[2rem] shadow-lift">
                {process.steps.map((step, i) => {
                  const img = images[step.image];
                  return (
                    <Image
                      key={step.title}
                      src={img.src}
                      alt={i === active ? img.alt : ""}
                      aria-hidden={i !== active}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      sizes="(min-width: 1216px) 540px, 45vw"
                      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                        i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                      }`}
                    />
                  );
                })}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/70 to-transparent p-6 pt-20">
                  <p className="text-sm font-bold tracking-[0.14em] text-white/80 uppercase" aria-hidden="true">
                    Schritt {active + 1} von {process.steps.length}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-white" aria-hidden="true">
                    {process.steps[active].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative lg:col-span-6">
            {/* progress line */}
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-[1.6rem] w-0.5 rounded bg-navy-800/10" />
            <span
              aria-hidden="true"
              style={{ height: `${progress}%` }}
              className="absolute top-0 left-[1.6rem] hidden w-0.5 rounded bg-teal-500 transition-[height] duration-700 ease-out lg:block"
            />
            <ol className="relative">
              {process.steps.map((step, i) => {
                const img = images[step.image];
                const isActive = i === active;
                return (
                  <li
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    data-index={i}
                    className="flex gap-6 pb-12 last:pb-0 lg:min-h-[70vh] lg:items-center lg:pb-0"
                  >
                    <span
                      className={`relative z-10 inline-flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border-2 text-lg font-extrabold transition-colors duration-500 ${
                        isActive
                          ? "border-teal-500 bg-navy-800 text-white"
                          : "border-line bg-white text-navy-800 lg:text-navy-800/50"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div
                      className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "lg:opacity-40"}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        sizes="(min-width: 640px) 560px, 85vw"
                        className="mb-5 aspect-[16/10] h-auto w-full rounded-2xl object-cover shadow-soft lg:hidden"
                      />
                      <p className="text-xs font-bold tracking-[0.14em] text-teal-700 uppercase">
                        Schritt {i + 1}
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:mt-6 lg:justify-end">
          <AppointmentLink location="process" />
          <PhoneLink location="process" />
        </div>
      </div>
    </section>
  );
}
