import Image from "next/image";
import { images, integrations, intro } from "@/content/site";
import { CheckIcon } from "../Icons";
import { ReviewBadge } from "../Cta";
import { Rich } from "../Rich";

export function Intro() {
  const img = images.teamWalking;
  return (
    <section id="praxis" aria-labelledby="praxis-title" className="py-20 sm:py-24 lg:py-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 h-2/3 w-2/3 rounded-[2rem] bg-navy-100 sm:-top-6 sm:-left-6"
          />
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw"
            className="relative aspect-[4/5] h-auto w-full rounded-[1.75rem] object-cover shadow-soft"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">{intro.eyebrow}</p>
          <h2 id="praxis-title" className="heading-lg mt-4 text-balance">
            <Rich text={intro.title} />
            <ReviewBadge show={integrations.reviewMode && !intro.confirmed} />
          </h2>
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted">
            {intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {intro.points.map((point) => (
              <li key={point} className="flex items-start gap-3 font-medium text-ink">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <a
            href="#leistungen"
            className="mt-9 inline-flex items-center gap-2 font-semibold text-navy-800 link-underline"
          >
            Unsere Leistungen ansehen
          </a>
        </div>
      </div>
    </section>
  );
}
