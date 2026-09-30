import { contact, directionsUrl, practice } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { ArrowIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "../Icons";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="bg-navy-900 py-20 text-white sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="eyebrow text-teal-300 before:bg-teal-300">{contact.eyebrow}</p>
          <h2 id="kontakt-title" className="mt-4 font-serif text-[2.2rem] leading-[1.1] text-balance sm:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/75">{contact.intro}</p>

          <a
            href={practice.phone.href}
            data-track-location="contact"
            className="group mt-8 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:border-white/40 hover:bg-white/10"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500 text-navy-950">
              <PhoneIcon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span>
              <span className="block text-sm text-white/70">Am schnellsten per Telefon</span>
              <span className="block text-xl font-semibold tracking-wide">{practice.phone.display}</span>
            </span>
          </a>

          <dl className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex gap-4">
              <dt>
                <PinIcon className="mt-0.5 h-5 w-5 text-teal-300" />
                <span className="sr-only">Adresse</span>
              </dt>
              <dd>
                <address className="leading-relaxed not-italic">
                  {practice.name}
                  <br />
                  {practice.address.street}
                  <br />
                  {practice.address.postalCode} {practice.address.city}
                </address>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener"
                  data-track="directions_click"
                  data-track-location="contact"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-white"
                >
                  Route planen <ArrowIcon className="h-4 w-4" />
                  <span className="sr-only">(öffnet Google Maps in neuem Tab)</span>
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <MailIcon className="mt-0.5 h-5 w-5 text-teal-300" />
                <span className="sr-only">E-Mail</span>
              </dt>
              <dd>
                <a
                  href={`mailto:${practice.email}`}
                  data-track-location="contact"
                  className="break-all underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {practice.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-4 sm:col-span-2 lg:col-span-1">
              <dt>
                <ClockIcon className="mt-0.5 h-5 w-5 text-teal-300" />
                <span className="sr-only">Öffnungszeiten</span>
              </dt>
              <dd className="w-full max-w-sm">
                <table className="w-full text-left">
                  <caption className="sr-only">Öffnungszeiten</caption>
                  <tbody>
                    {practice.openingHours.map((row) => (
                      <tr key={row.label} className="border-b border-white/10 last:border-0">
                        <th scope="row" className="py-1.5 pr-4 font-normal text-white/70">
                          {row.label}
                        </th>
                        <td className="py-1.5 text-right font-semibold whitespace-nowrap">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>
        </div>

        <div className="text-ink lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
