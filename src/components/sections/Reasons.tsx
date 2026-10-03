import { integrations, reasons } from "@/content/site";
import { AppointmentLink, ReviewBadge } from "../Cta";
import { Rich } from "../Rich";

export function Reasons() {
  return (
    <section
      aria-labelledby="gruende-title"
      className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28"
    >
      {/* the logo's tooth icon, as a quiet background motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-24 -bottom-28 h-[30rem] w-[30rem] text-white/[0.04]"
      >
        <path
          d="M60 25C49 25 42 16 31 19C16 23 17 40 22 53C26 63 29 72 31 85C33 99 39 104 44 94L53 74C56 68 64 68 67 74L76 94C81 104 87 99 89 85C91 72 94 63 98 53C103 40 104 23 89 19C78 16 71 25 60 25Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow-dark">{reasons.eyebrow}</p>
          <h2 id="gruende-title" className="heading-lg mt-4 text-balance text-white!">
            <Rich text={reasons.title} />
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
              <span className="text-sm font-extrabold tracking-[0.14em] text-teal-300" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-extrabold">
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
