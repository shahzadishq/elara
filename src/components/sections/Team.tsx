import Image from "next/image";
import { images, integrations, team } from "@/content/site";
import { AppointmentLink } from "../Cta";
import { Rich } from "../Rich";

export function Team() {
  const img = images.teamGroup;
  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-24 lg:py-32">
      <div className="container-page">
        <div className="relative">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            sizes="(min-width: 1216px) 1136px, 100vw"
            className="aspect-[4/3] h-auto w-full rounded-[1.75rem] object-cover object-[62%_center] shadow-soft sm:aspect-[16/9] lg:rounded-[2.25rem]"
          />
          <div className="relative -mt-16 mx-3 rounded-[1.5rem] border border-line bg-white p-7 shadow-lift sm:mx-8 sm:p-9 lg:absolute lg:bottom-10 lg:left-10 lg:mx-0 lg:mt-0 lg:max-w-md">
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 id="team-title" className="heading-lg mt-3 text-balance">
              <Rich text={team.title} />
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{team.text}</p>
            <AppointmentLink location="team" className="btn-primary mt-6" />
          </div>
        </div>

        {team.members.length > 0 && (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.members.map((m) => (
              <li key={m.name}>
                <h3 className="text-xl font-extrabold text-navy-900">{m.name}</h3>
                <p className="text-sm font-semibold text-teal-700">{m.role}</p>
                {m.bio && <p className="mt-2 text-muted">{m.bio}</p>}
              </li>
            ))}
          </ul>
        )}

        {integrations.reviewMode && team.members.length === 0 && (
          <p className="mt-8 rounded-xl border border-dashed border-amber-600 bg-amber-50 p-4 text-sm text-amber-900">
            Entwurf: Namen, Funktionen und Kurzprofile des Teams wurden noch nicht geliefert und
            werden nach Freigabe ergänzt.
          </p>
        )}
      </div>
    </section>
  );
}
