import { Header, MobileActionBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Reasons } from "@/components/sections/Reasons";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { images, integrations, practice, seo, withBase } from "@/content/site";

/** Dentist structured data – verified practice details only, no ratings/reviews. */
function structuredData() {
  const url = integrations.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: practice.name,
    description: seo.description,
    telephone: practice.phone.e164,
    email: practice.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.address.street,
      postalCode: practice.address.postalCode,
      addressLocality: practice.address.city,
      addressCountry: practice.address.country,
    },
    openingHoursSpecification: practice.openingHoursSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    ...(url && {
      url,
      image: new URL(images.consultation.src, url).href,
      logo: new URL(withBase("/images/elara-logo.svg"), url).href,
    }),
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="inhalt" tabIndex={-1} className="outline-none">
        <Hero />
        <Intro />
        <Services />
        <Process />
        <Reasons />
        <Testimonials />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
