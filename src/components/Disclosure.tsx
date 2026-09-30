"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "./Icons";

/**
 * Accessible accordion item: a real <button> with aria-expanded/aria-controls
 * and a labelled region. Height animates via CSS grid rows; the collapsed
 * panel is `inert` so hidden links are not focusable.
 */
export function Disclosure({
  heading,
  headingLevel = 3,
  children,
  className = "",
  buttonClassName = "",
  panelClassName = "",
  iconClassName = "",
  align = "start",
}: {
  align?: "start" | "center";
  heading: ReactNode;
  headingLevel?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  iconClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const H = `h${headingLevel}` as "h3";

  return (
    <div className={className} data-open={open || undefined}>
      <H className="m-0">
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className={`group flex w-full ${align === "center" ? "items-center" : "items-start"} justify-between gap-4 text-left ${buttonClassName}`}
        >
          <span className="min-w-0 flex-1">{heading}</span>
          <span
            aria-hidden="true"
            className={`${align === "center" ? "" : "mt-0.5"} inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-800/20 text-navy-800 transition duration-300 group-hover:border-navy-800 group-hover:bg-white ${
              open ? "rotate-45 border-navy-800 bg-navy-800 text-white group-hover:bg-navy-800" : ""
            } ${iconClassName}`}
          >
            <PlusIcon className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
      </H>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={panelClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}
