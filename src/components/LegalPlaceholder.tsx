import Link from "next/link";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

/**
 * Development placeholder for legal pages. No approved legal text has been
 * supplied – this page must be replaced with the practice's approved content
 * before launch. It is excluded from search indexing.
 */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <header className="border-b border-line bg-ivory">
        <div className="container-page flex h-[4.25rem] items-center justify-between">
          <Link href="/" className="-ml-1 rounded-md p-1" aria-label="Elara Zahnmedizin – zur Startseite">
            <Logo className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-navy-800 link-underline">
            Zur Startseite
          </Link>
        </div>
      </header>
      <main id="inhalt" className="container-page max-w-3xl py-20">
        <h1 className="heading-lg">{title}</h1>
        <div className="mt-8 rounded-2xl border border-dashed border-amber-600 bg-amber-50 p-6 text-amber-950">
          <p className="font-semibold">Inhalt in Vorbereitung</p>
          <p className="mt-2 leading-relaxed">
            Diese Seite wird vor der Veröffentlichung mit den freigegebenen Angaben der Praxis
            ergänzt.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
