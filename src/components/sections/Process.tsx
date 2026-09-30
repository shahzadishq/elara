import { bookingProcess as process } from "@/content/site";
import { AppointmentLink, PhoneLink } from "../Cta";

export function Process() {
  return (
    <section aria-labelledby="ablauf-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{process.eyebrow}</p>
          <h2 id="ablauf-title" className="heading-lg mt-4 text-balance">
            {process.title}
          </h2>
        </div>

        <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connecting line */}
          <span
            aria-hidden="true"
            className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-teal-500/10 via-teal-500/50 to-teal-500/10 md:block"
          />
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white font-serif text-2xl text-navy-800 shadow-soft">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-navy-900 md:mt-5">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted md:mx-auto md:max-w-xs">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <AppointmentLink location="process" />
          <PhoneLink location="process" />
        </div>
      </div>
    </section>
  );
}
