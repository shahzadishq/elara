import { integrations, practice, services } from "@/content/site";
import { AppointmentLink, PhoneLink, ReviewBadge } from "../Cta";
import { Disclosure } from "../Disclosure";
import { ServiceIcon } from "../Icons";

export function Services() {
  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-title"
      className="border-y border-line bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Leistungen</p>
            <h2 id="leistungen-title" className="heading-lg mt-4 text-balance">
              Unsere Behandlungen im Überblick.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Von der Vorsorge bis zum Zahnersatz: Hier finden Sie unsere Schwerpunkte. Welche
              Behandlung für Sie sinnvoll ist, besprechen wir nach einer Untersuchung persönlich
              mit Ihnen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <AppointmentLink location="services-intro" />
              <PhoneLink location="services-intro">Anrufen</PhoneLink>
            </div>
          </div>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {services.map((service) => (
            <li key={service.id} className="border-b border-line">
              <Disclosure
                buttonClassName="py-6 sm:py-7"
                panelClassName="pb-7 sm:pl-[4.75rem]"
                heading={
                  <span className="flex gap-4 sm:gap-5">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand text-navy-800 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white group-aria-expanded:bg-navy-800 group-aria-expanded:text-white sm:h-14 sm:w-14">
                      <ServiceIcon name={service.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                    <span className="block">
                      <span className="block font-serif text-[1.35rem] leading-snug text-navy-900 sm:text-[1.55rem]">
                        {service.name}
                        <ReviewBadge
                          show={integrations.reviewMode && !service.confirmed}
                          note={`Quelle: ${service.source.join(", ")}`}
                        />
                      </span>
                      <span className="mt-1.5 block text-[0.98rem] leading-relaxed text-muted">
                        {service.summary}
                      </span>
                    </span>
                  </span>
                }
              >
                <p className="max-w-2xl leading-relaxed text-ink/85">{service.details}</p>
                {service.includes && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Dazu gehören">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-ivory px-3 py-1 text-sm font-medium text-navy-900"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <AppointmentLink
                    location="service"
                    service={service.id}
                    className="btn-primary min-h-11 px-5 text-sm"
                  >
                    Termin für {shortName(service.name)} anfragen
                  </AppointmentLink>
                  <a
                    href={practice.phone.href}
                    data-track-location={`service-${service.id}`}
                    className="text-sm font-semibold text-navy-800 link-underline"
                  >
                    oder anrufen
                  </a>
                </div>
              </Disclosure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Prophylaxe & professionelle Zahnreinigung" → "Prophylaxe" for compact CTA labels. */
function shortName(name: string) {
  return name.split(" & ")[0];
}
