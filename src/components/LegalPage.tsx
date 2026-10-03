import Link from "next/link";
import type { LegalSection } from "@/content/legal";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-[4.25rem] items-center justify-between">
          <Link href="/" className="-ml-1 rounded-md p-1" aria-label="Elara Zahnmedizin – zur Startseite">
            <Logo className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-navy-800 link-underline">
            Zur Startseite
          </Link>
        </div>
      </header>
      <main id="inhalt" className="container-page max-w-3xl py-16 sm:py-20">
        <h1 className="heading-lg">{title}</h1>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-extrabold tracking-tight text-navy-900 sm:text-xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed text-ink/85">
                {section.blocks.map((block, i) => {
                  switch (block.type) {
                    case "p":
                      return <p key={i}>{block.text}</p>;
                    case "lines":
                      return (
                        <p key={i}>
                          {block.lines.map((line, j) => (
                            <span key={j} className="block">
                              {line}
                            </span>
                          ))}
                        </p>
                      );
                    case "list":
                      return (
                        <ul key={i} className="list-disc space-y-1 pl-5">
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    case "link":
                      return (
                        <p key={i}>
                          <a
                            href={block.href}
                            target="_blank"
                            rel="noopener"
                            className="font-semibold break-all text-navy-800 link-underline"
                          >
                            {block.label ?? block.href}
                          </a>
                        </p>
                      );
                  }
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
