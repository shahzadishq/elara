import { integrations, reasons } from "@/content/site";
import { AppointmentLink, ReviewBadge } from "../Cta";

export function Reasons() {
  return (
    <section
      aria-labelledby="gruende-title"
      className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28"
    >
      {/* the three bars of the logo, as a quiet background motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-24 -bottom-28 h-[30rem] w-[30rem] text-white/[0.04]"
      >
        <path
          d="M84 27C77 20 69 17 59 17 35 17 18 35 18 60s17 43 41 43c13 0 23-5 31-15"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M39 44h43M39 60h33M39 76h43"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-teal-300 before:bg-teal-300">{reasons.eyebrow}</p>
          <h2 id="gruende-title" className="mt-4 font-serif text-[2rem] leading-[1.12] text-balance sm:text-[2.6rem] lg:text-[2.9rem]">
            {reasons.title}
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/75">
            {reasons.intro}
          </p>
          <AppointmentLink location="reasons" className="btn-light mt-8" />
        </div>

        <ol className="grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2 lg:col-span-7">
          {reasons.items.map((item, i) => (
            <li
              key={item.title}
              className="bg-navy-900 p-7 transition-colors duration-300 hover:bg-navy-800 sm:p-8"
            >
              <span className="font-serif text-lg text-teal-300 italic" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold">
                {item.title}
                <ReviewBadge show={integrations.reviewMode && !item.confirmed} />
              </h3>
              <p className="mt-2 leading-relaxed text-white/70">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
