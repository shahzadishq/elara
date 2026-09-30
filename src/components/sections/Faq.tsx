import { integrations, practice, visibleFaqs } from "@/content/site";
import { ReviewBadge } from "../Cta";
import { Disclosure } from "../Disclosure";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="heading-lg mt-4 text-balance">
            Häufige Fragen
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Ihre Frage ist nicht dabei? Rufen Sie uns gern an unter{" "}
            <a
              href={practice.phone.href}
              data-track-location="faq"
              className="font-semibold whitespace-nowrap text-navy-800 link-underline"
            >
              {practice.phone.display}
            </a>
            .
          </p>
        </div>
        <div className="border-t border-line lg:col-span-8">
          {visibleFaqs.map((faq) => (
            <Disclosure
              key={faq.q}
              className="border-b border-line"
              align="center"
              buttonClassName="py-5 sm:py-6"
              panelClassName="pb-6 pr-12"
              heading={
                <span className="block text-[1.07rem] leading-snug font-semibold text-navy-900 sm:text-lg">
                  {faq.q}
                  <ReviewBadge show={integrations.reviewMode && !faq.confirmed} note={faq.note} />
                </span>
              }
            >
              <p className="leading-relaxed text-muted">{faq.a}</p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
