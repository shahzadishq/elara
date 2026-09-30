/**
 * Inline version of the supplied elara-logo.svg (same geometry), so the
 * wordmark uses the self-hosted Manrope font and can switch to a light variant.
 */
export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const main = variant === "dark" ? "#103f72" : "#ffffff";
  return (
    <svg
      viewBox="0 0 500 120"
      role="img"
      aria-label="Elara Zahnmedizin"
      className={className}
    >
      <g transform="translate(6 6)">
        <path
          d="M84 27C77 20 69 17 59 17 35 17 18 35 18 60s17 43 41 43c13 0 23-5 31-15"
          fill="none"
          stroke={main}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M39 44h43M39 60h33M39 76h43"
          fill="none"
          stroke={main}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="93" cy="76" r="5" fill="#20a8b2" />
      </g>
      <text
        x="140"
        y="68"
        fill={main}
        style={{ fontFamily: "var(--font-manrope), Arial, sans-serif" }}
        fontSize="49"
        fontWeight="800"
        letterSpacing="4"
      >
        ELARA
      </text>
      <text
        x="143"
        y="94"
        fill={main}
        style={{ fontFamily: "var(--font-manrope), Arial, sans-serif" }}
        fontSize="14"
        fontWeight="700"
        letterSpacing="7"
        textLength="176"
        lengthAdjust="spacing"
      >
        ZAHNMEDIZIN
      </text>
    </svg>
  );
}
