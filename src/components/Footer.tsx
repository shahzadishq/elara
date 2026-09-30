import { directionsUrl, legal, navigation, practice, withBase } from "@/content/site";
import { Logo } from "./Logo";
import { ConsentSettingsButton } from "./ConsentManager";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 pt-16 pb-28 text-white/75 lg:pb-12">
      <div className="container-page">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="light" className="h-11 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Zahnarztpraxis in Augsburg – an sieben Tagen in der Woche für Sie geöffnet.
            </p>
          </div>

          <nav aria-label="Footer-Navigation" className="md:col-span-2">
            <h2 className="text-xs font-bold tracking-[0.16em] text-white uppercase">Seite</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={withBase(`/${item.href}`)} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-xs font-bold tracking-[0.16em] text-white uppercase">Kontakt</h2>
            <address className="mt-4 space-y-2.5 text-sm not-italic">
              <p>
                {practice.address.street}
                <br />
                {practice.address.postalCode} {practice.address.city}
                <br />
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener"
                  data-track="directions_click"
                  data-track-location="footer"
                  className="font-semibold text-teal-300 hover:text-white"
                >
                  Route planen →<span className="sr-only"> (öffnet Google Maps in neuem Tab)</span>
                </a>
              </p>
              <p>
                <a href={practice.phone.href} data-track-location="footer" className="hover:text-white">
                  {practice.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${practice.email}`} data-track-location="footer" className="break-all hover:text-white">
                  {practice.email}
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-bold tracking-[0.16em] text-white uppercase">Öffnungszeiten</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {practice.openingHours.map((row) => (
                <li key={row.label} className="flex justify-between gap-4">
                  <span>{row.short}</span>
                  <span className="text-white">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {practice.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={legal.impressumHref} className="hover:text-white">
                Impressum
              </a>
            </li>
            <li>
              <a href={legal.datenschutzHref} className="hover:text-white">
                Datenschutz
              </a>
            </li>
            <ConsentSettingsButton className="hover:text-white" />
          </ul>
        </div>
      </div>
    </footer>
  );
}
