import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import "./three-d.css";
import { MobileActionBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/sections/Contact";
import { Logo } from "@/components/Logo";
import { AppointmentLink, PhoneLink } from "@/components/Cta";
import { ArrowIcon, CheckIcon, ClockIcon, ServiceIcon } from "@/components/Icons";
import { Rich } from "@/components/Rich";
import { Tooth3D } from "@/components/three/Tooth3D";
import { Effects3D } from "@/components/three/Effects3D";
import {
  appointmentHref,
  appointmentIsExternal,
  bookingProcess,
  hero,
  images,
  practice,
  reasons,
  seo,
  services,
  withBase,
} from "@/content/site";

export const metadata: Metadata = {
  title: `3D-Erlebnis | ${seo.title}`,
  description: seo.description,
  // Experimental showcase page – keep the classic page as the indexed version.
  robots: { index: false, follow: true },
};

const nav = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Praxis", href: "#praxis" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Kontakt", href: "#kontakt" },
];

const gallery = [images.consultation, images.reception, images.xray, images.teamWalking, images.teamGroup];

function Header3D() {
  return (
    <header className="x3-header">
      <div className="x3-wrap x3-header-inner">
        <a href="#top" className="x3-logo" aria-label="Elara Zahnmedizin – zum Seitenanfang">
          <Logo variant="light" className="x3-logo-svg" />
        </a>
        <nav aria-label="Hauptnavigation" className="x3-nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="x3-header-actions">
          <a href={withBase("/")} className="x3-classic">
            Klassische Ansicht
          </a>
          <AppointmentLink location="3d-header" className="x3-btn x3-btn-primary x3-btn-sm" icon={false} />
        </div>
      </div>
      <div className="x3-progress" aria-hidden="true" />
    </header>
  );
}

function Hero3D() {
  return (
    <section id="top" className="x3-hero" aria-labelledby="x3-hero-title">
      <div className="x3-hero-glow" aria-hidden="true" />
      <div className="x3-hero-grid" aria-hidden="true" />
      <Tooth3D />
      <div className="x3-wrap x3-hero-inner">
        <div className="x3-hero-copy">
          <p className="x3-eyebrow">{hero.eyebrow}</p>
          <h1 id="x3-hero-title" className="x3-hero-title">
            <Rich text={hero.title} />
          </h1>
          <p className="x3-hero-intro">{hero.intro}</p>
          <div className="x3-hero-ctas">
            <AppointmentLink location="3d-hero" className="x3-btn x3-btn-primary" />
            <PhoneLink location="3d-hero" className="x3-btn x3-btn-ghost">
              {practice.phone.display}
            </PhoneLink>
          </div>
          <ul className="x3-chips">
            {hero.trustPoints.map((point) => (
              <li key={point}>
                <CheckIcon width={16} height={16} strokeWidth={2.4} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <aside className="x3-float-card x3-hours" aria-label="Öffnungszeiten">
          <p className="x3-float-label">
            <ClockIcon width={16} height={16} /> Öffnungszeiten
          </p>
          <dl>
            {practice.openingHours.map((row) => (
              <div key={row.label}>
                <dt>{row.short}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <a href="#leistungen" className="x3-scroll-cue">
        <span aria-hidden="true" />
        Entdecken
      </a>
    </section>
  );
}

function Marquee() {
  const names = services.map((s) => s.name);
  const row = [...names, ...names];
  return (
    <div className="x3-marquee" aria-hidden="true">
      <div className="x3-marquee-band">
        <div className="x3-marquee-track">
          {row.map((name, i) => (
            <span key={i}>
              {name}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
      <div className="x3-marquee-band x3-marquee-band--back">
        <div className="x3-marquee-track x3-marquee-track--reverse">
          {row.map((name, i) => (
            <span key={i}>
              {name}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services3D() {
  return (
    <section id="leistungen" className="x3-section x3-services" aria-labelledby="x3-leistungen-title">
      <div className="x3-wrap">
        <div className="x3-section-head" data-reveal>
          <p className="x3-eyebrow x3-eyebrow--light">Leistungen</p>
          <h2 id="x3-leistungen-title" className="x3-h2">
            <Rich text="Unsere *Behandlungen* im Überblick." />
          </h2>
          <p className="x3-lead">
            Von der Vorsorge bis zum Zahnersatz: Hier finden Sie unsere Schwerpunkte. Welche Behandlung für Sie
            sinnvoll ist, besprechen wir nach einer Untersuchung persönlich mit Ihnen.
          </p>
        </div>

        <ul className="x3-cards">
          {services.map((service, i) => (
            <li key={service.id} data-reveal style={{ "--d": `${(i % 4) * 90}ms` } as CSSProperties}>
              <article className="x3-card" data-tilt="14">
                <span className="x3-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="x3-card-icon">
                  <ServiceIcon name={service.icon} width={26} height={26} />
                </span>
                <h3 className="x3-card-title">{service.name}</h3>
                <p className="x3-card-text">{service.summary}</p>
                <a
                  href={appointmentHref}
                  data-track="appointment_cta_click"
                  data-track-location="3d-service"
                  data-track-service={service.id}
                  {...(appointmentIsExternal && { target: "_blank", rel: "noopener" })}
                  className="x3-card-link"
                >
                  Termin anfragen
                  <span className="sr-only">: {service.name}</span>
                  <ArrowIcon width={16} height={16} />
                </a>
                <span className="x3-card-glare" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Praxis3D() {
  return (
    <section id="praxis" className="x3-section x3-praxis" aria-labelledby="x3-praxis-title">
      <div className="x3-wrap x3-praxis-grid">
        <div data-reveal>
          <p className="x3-eyebrow">{reasons.eyebrow}</p>
          <h2 id="x3-praxis-title" className="x3-h2 x3-h2--light">
            <Rich text={reasons.title} />
          </h2>
          <p className="x3-lead x3-lead--light">{reasons.intro}</p>
          <ul className="x3-reasons">
            {reasons.items.map((item, i) => (
              <li key={item.title} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                <span className="x3-reason-dot" aria-hidden="true">
                  <CheckIcon width={16} height={16} strokeWidth={2.4} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="x3-carousel" data-carousel data-reveal>
          <div className="x3-stage" role="group" aria-roledescription="Karussell" aria-label="Einblicke in die Praxis">
            <div className="x3-ring">
              {gallery.map((img) => (
                <figure key={img.src} className="x3-slide">
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="280px" loading="eager" draggable={false} />
                </figure>
              ))}
            </div>
          </div>
          <div className="x3-carousel-ctrl">
            <button type="button" data-carousel-prev aria-label="Vorheriges Bild">
              <ArrowIcon width={18} height={18} style={{ transform: "scaleX(-1)" }} />
            </button>
            <span>Ziehen zum Drehen</span>
            <button type="button" data-carousel-next aria-label="Nächstes Bild">
              <ArrowIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process3D() {
  return (
    <section id="ablauf" className="x3-section x3-process" aria-labelledby="x3-ablauf-title">
      <div className="x3-wrap">
        <div className="x3-section-head x3-section-head--center" data-reveal>
          <p className="x3-eyebrow x3-eyebrow--light">{bookingProcess.eyebrow}</p>
          <h2 id="x3-ablauf-title" className="x3-h2">
            <Rich text={bookingProcess.title} />
          </h2>
        </div>
        <ol className="x3-steps">
          {bookingProcess.steps.map((step, i) => (
            <li key={step.title} className="x3-step" data-reveal style={{ "--d": `${i * 140}ms` } as CSSProperties}>
              <div className="x3-step-inner" data-tilt="8">
                <span className="x3-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="x3-cta" aria-labelledby="x3-cta-title" data-parallax>
      <div className="x3-cta-ring" aria-hidden="true">
        <div className="x3-cta-gyro">
          <span />
          <span />
          <span />
          <span />
          <i className="x3-cta-core" />
        </div>
      </div>
      <div className="x3-wrap x3-cta-inner" data-reveal>
        <h2 id="x3-cta-title" className="x3-h2 x3-h2--light">
          Termin anfragen – <span className="x3-gradient-text">wir melden uns bei Ihnen.</span>
        </h2>
        <div className="x3-hero-ctas x3-hero-ctas--center">
          <AppointmentLink location="3d-cta" className="x3-btn x3-btn-primary" />
          <PhoneLink location="3d-cta" className="x3-btn x3-btn-ghost">
            {practice.phone.display}
          </PhoneLink>
        </div>
      </div>
    </section>
  );
}

export default function Page3D() {
  return (
    <div className="x3-page">
      <Header3D />
      <main id="inhalt" tabIndex={-1} className="outline-none">
        <Hero3D />
        <Marquee />
        <Services3D />
        <Praxis3D />
        <Process3D />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
      <Effects3D />
    </div>
  );
}
