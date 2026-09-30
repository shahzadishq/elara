import Image from "next/image";
import { hero, images, practice } from "@/content/site";
import { AppointmentLink, PhoneLink } from "../Cta";
import { CheckIcon, ClockIcon } from "../Icons";

export function Hero() {
  const img = images.consultation;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* soft background shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden h-[88%] w-[36%] rounded-bl-[5rem] bg-sand lg:block"
      />
      <div className="container-page relative grid items-center gap-10 pt-8 pb-14 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16 lg:pb-24">
        <div className="animate-rise lg:col-span-6 xl:col-span-7 xl:pr-4">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="heading-xl mt-5 text-balance">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            {hero.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <AppointmentLink location="hero" className="btn-primary px-7" />
            <PhoneLink location="hero" className="btn-outline px-6">
              {practice.phone.display}
            </PhoneLink>
          </div>
          <ul className="mt-9 grid gap-x-6 gap-y-3 border-t border-line pt-6 text-[0.93rem] font-medium text-ink sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-1 xl:grid-cols-3">
            {hero.trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-700">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-5">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift lg:rounded-[2.25rem]">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 460px, (min-width: 1024px) 46vw, 100vw"
              className="aspect-[4/3] h-auto w-full object-cover object-[40%_center] lg:aspect-square lg:object-[45%_center]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 max-w-[17rem] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-soft backdrop-blur sm:left-6 sm:p-5 lg:-left-8">
            <p className="flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] text-teal-700 uppercase">
              <ClockIcon className="h-4 w-4" /> Öffnungszeiten
            </p>
            <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              {practice.openingHours.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="text-muted">{row.short}</dt>
                  <dd className="font-semibold text-navy-900">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
