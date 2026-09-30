import Image from "next/image";
import { gallery, images } from "@/content/site";

export function Gallery() {
  const [first, second] = gallery.items;
  const a = images[first.image];
  const b = images[second.image];
  return (
    <section aria-labelledby="galerie-title" className="bg-sand pt-20 pb-20 sm:pt-24 lg:py-28">
      <div className="container-page grid items-end gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4 lg:self-center lg:pr-6">
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h2 id="galerie-title" className="heading-lg mt-4 text-balance">
            {gallery.title}
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{gallery.text}</p>
        </div>

        <figure className="group lg:col-span-4">
          <div className="overflow-hidden rounded-[1.5rem] shadow-soft">
            <Image
              src={a.src}
              alt={a.alt}
              width={a.width}
              height={a.height}
              loading="lazy"
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover object-[65%_center] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-3 text-sm font-semibold text-navy-900">{first.caption}</figcaption>
        </figure>

        <figure className="group lg:col-span-4 lg:mb-16">
          <div className="overflow-hidden rounded-[1.5rem] shadow-soft">
            <Image
              src={b.src}
              alt={b.alt}
              width={b.width}
              height={b.height}
              loading="lazy"
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-3 text-sm font-semibold text-navy-900">{second.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
