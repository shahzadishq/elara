/**
 * Inline version of the supplied elara-logo.svg (tooth icon, updated brand assets) (same geometry), so the
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
          d="M60 25C49 25 42 16 31 19C16 23 17 40 22 53C26 63 29 72 31 85C33 99 39 104 44 94L53 74C56 68 64 68 67 74L76 94C81 104 87 99 89 85C91 72 94 63 98 53C103 40 104 23 89 19C78 16 71 25 60 25Z"
          fill="none"
          stroke={main}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M78 32C85 30 91 34 91 42" fill="none" stroke="#20a8b2" strokeWidth="6" strokeLinecap="round" />
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
