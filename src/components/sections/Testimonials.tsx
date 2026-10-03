import { integrations, testimonials } from "@/content/site";
import { Rich } from "../Rich";

/**
 * Patient reviews. Renders only authentic reviews from site.ts. While none are
 * supplied, the section is hidden – except on the preview build, where clearly
 * labelled placeholder cards show the layout (no invented quotes or ratings).
 */
export function Testimonials() {
  const hasReviews = testimonials.items.length > 0;
  if (!hasReviews && !integrations.showPlaceholders) return null;

  return (
    <section aria-labelledby="stimmen-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 id="stimmen-title" className="heading-lg mt-4 text-balance">
            <Rich text={testimonials.title} />
          </h2>
        </div>

        {hasReviews ? (
          <ul className="mt-12 flex flex-wrap justify-center gap-5">
            {testimonials.items.map((t) => (
              <li key={t.quote} className="w-full md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
                <figure className="flex h-full flex-col rounded-[1.25rem] border border-line bg-white p-7 shadow-soft">
                  <div className="flex items-center justify-between gap-4">
                    <QuoteMark />
                    {t.rating && <Stars rating={t.rating} />}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">
                    „{t.quote}“
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="font-bold text-navy-900">{t.name}</span>
                    {t.source && <span className="text-muted"> · {t.source}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-12 grid gap-5 md:grid-cols-3" aria-label="Platzhalter für Patientenbewertungen">
            {[1, 2, 3].map((n) => (
              <li key={n}>
                <figure className="flex h-full flex-col rounded-[1.25rem] border-2 border-dashed border-teal-500/40 bg-white p-7">
                  <QuoteMark />
                  <p className="mt-4 flex-1 leading-relaxed text-muted">
                    Platzhalter: Hier erscheint eine echte Bewertung einer Patientin oder eines
                    Patienten – mit deren Zustimmung und Quellenangabe (z. B. Google).
                  </p>
                  <figcaption className="mt-6 border-t border-line pt-4 text-sm font-semibold text-teal-700">
                    Bewertung {n} · folgt nach Freigabe
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400" role="img" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4.5 w-4.5 ${n <= rating ? "" : "text-line"}`}
        >
          <path
            fill="currentColor"
            d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z"
          />
        </svg>
      ))}
    </span>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" className="h-6 w-8 text-teal-500">
      <path
        fill="currentColor"
        d="M0 24V14.4C0 6.2 4.4 1.4 13.2 0l1.4 3.6C9.8 4.8 7.4 7.4 7.2 11.2H13V24H0Zm18.6 0V14.4C18.6 6.2 23 1.4 31.8 0l1.4 3.6c-4.8 1.2-7.2 3.8-7.4 7.6h5.8V24H18.6Z"
      />
    </svg>
  );
}
