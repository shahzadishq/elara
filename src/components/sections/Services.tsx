import { appointmentHref, appointmentIsExternal, integrations, services } from "@/content/site";
import { AppointmentLink, PhoneLink, ReviewBadge } from "../Cta";
import { ArrowIcon, ServiceIcon } from "../Icons";
import { Rich } from "../Rich";

export function Services() {
  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-title"
      className="border-y border-line bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Leistungen</p>
            <h2 id="leistungen-title" className="heading-lg mt-4 text-balance">
              <Rich text="Unsere *Behandlungen* im Überblick." />
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Von der Vorsorge bis zum Zahnersatz: Hier finden Sie unsere Schwerpunkte. Welche
              Behandlung für Sie sinnvoll ist, besprechen wir nach einer Untersuchung persönlich
              mit Ihnen.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <AppointmentLink location="services-intro" />
            <PhoneLink location="services-intro">Anrufen</PhoneLink>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.id}>
              <article className="group relative flex h-full flex-col rounded-[1.25rem] border border-line bg-ivory p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:bg-white hover:shadow-lift">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy-800 shadow-soft transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[1.12rem] leading-snug font-extrabold tracking-tight text-navy-900">
                  {service.name}
                  <ReviewBadge
                    show={integrations.reviewMode && !service.confirmed}
                    note={`Quelle: ${service.source.join(", ")}`}
                  />
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{service.summary}</p>
                {service.includes && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Dazu gehören">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-white px-2.5 py-0.5 text-xs font-semibold text-navy-900"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={appointmentHref}
                  data-track="appointment_cta_click"
                  data-track-location="service"
                  data-track-service={service.id}
                  {...(appointmentIsExternal && { target: "_blank", rel: "noopener" })}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-navy-800 after:absolute after:inset-0 after:rounded-[1.25rem] after:content-['']"
                >
                  Termin anfragen
                  <span className="sr-only">: {service.name}</span>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
