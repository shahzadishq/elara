import type { ReactNode } from "react";
import { appointmentHref, appointmentIsExternal, practice } from "@/content/site";
import { CalendarIcon, PhoneIcon } from "./Icons";

/** Primary "Termin vereinbaren" action – routes to booking URL or the enquiry form. */
export function AppointmentLink({
  location,
  service,
  className = "btn-primary",
  children = "Termin vereinbaren",
  icon = true,
  onClick,
}: {
  location: string;
  service?: string;
  className?: string;
  children?: ReactNode;
  icon?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={appointmentHref}
      className={className}
      data-track="appointment_cta_click"
      data-track-location={location}
      data-track-service={service}
      onClick={onClick}
      {...(appointmentIsExternal && { target: "_blank", rel: "noopener" })}
    >
      {icon && <CalendarIcon className="h-[1.1em] w-[1.1em] shrink-0" />}
      {children}
    </a>
  );
}

export function PhoneLink({
  location,
  className = "btn-outline",
  children,
  icon = true,
}: {
  location: string;
  className?: string;
  children?: ReactNode;
  icon?: boolean;
}) {
  return (
    <a href={practice.phone.href} className={className} data-track-location={location}>
      {icon && <PhoneIcon className="h-[1.1em] w-[1.1em] shrink-0" />}
      {children ?? practice.phone.display}
    </a>
  );
}

export function ReviewBadge({ show, note }: { show: boolean; note?: string }) {
  if (!show) return null;
  return (
    <span
      title={note}
      className="ml-2 inline-flex rounded-full border border-dashed border-amber-600 bg-amber-50 px-2 py-0.5 align-middle font-sans text-[0.7rem] font-semibold tracking-normal text-amber-800 normal-case"
    >
      Zu bestätigen
    </span>
  );
}
