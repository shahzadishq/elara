"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, practice } from "@/content/site";
import { Logo } from "./Logo";
import { AppointmentLink, PhoneLink } from "./Cta";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        // Keep keyboard focus inside the open menu (toggle button + panel).
        const items = [
          toggleRef.current,
          ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        // No backdrop-filter while the menu is open: it would become the containing
        // block for the fixed-position menu panel and clip it to the header.
        open
          ? "border-b border-line bg-white"
          : scrolled
            ? "border-b border-line/80 bg-white/95 shadow-[0_6px_24px_-18px_rgb(16_63_114/0.5)] backdrop-blur-md"
            : "border-b border-transparent bg-white"
      }`}
    >
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Zum Inhalt springen
      </a>
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
        <a href="#top" className="-ml-1 shrink-0 rounded-md p-1" aria-label="Elara Zahnmedizin – zum Seitenanfang">
          <Logo className="h-11 w-auto lg:h-12" />
        </a>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.93rem] font-medium text-ink/80 transition-colors hover:bg-sand hover:text-navy-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <PhoneLink
            location="header"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.93rem] font-semibold text-navy-800 transition-colors hover:bg-sand"
          />
          <AppointmentLink location="header" className="btn-primary min-h-11 px-5" icon={false} />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={practice.phone.href}
            data-track-location="header-mobile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-800 hover:bg-sand"
            aria-label={`Anrufen: ${practice.phone.display}`}
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-800 hover:bg-sand"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.25rem] bottom-0 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile Navigation" className="container-page py-6">
          <ul className="divide-y divide-line border-y border-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => close(false)}
                  className="flex items-center justify-between py-4 text-2xl font-extrabold tracking-tight text-navy-900"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-teal-500">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <AppointmentLink location="mobile-menu" onClick={() => close(false)} />
            <PhoneLink location="mobile-menu">Anrufen: {practice.phone.display}</PhoneLink>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted">
            {practice.address.street}, {practice.address.postalCode} {practice.address.city}
            <br />
            Mo–Fr 7–21 Uhr · Sa, So & Feiertage 9–18 Uhr
          </p>
        </nav>
      </div>
    </header>
  );
}

export function MobileActionBar() {
  // Hide while the contact section is on screen so the bar never covers form fields.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("kontakt");
    if (!target || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${hidden ? "translate-y-full" : ""} border-t border-line bg-white/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden`}
      aria-label="Schnellaktionen"
      role="region"
    >
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-2">
        <AppointmentLink location="mobile-bar" className="btn-primary min-h-12 px-3 text-[0.9rem] whitespace-nowrap" />
        <a
          href={practice.phone.href}
          data-track-location="mobile-bar"
          className="btn-outline min-h-12 bg-white px-4 text-[0.9rem] whitespace-nowrap"
        >
          <PhoneIcon className="h-[1.1em] w-[1.1em]" />
          Anrufen
        </a>
      </div>
    </div>
  );
}
