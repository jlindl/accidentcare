type Tone = "light" | "dark";
type MarkProps = { tone?: Tone; className?: string; animate?: boolean };

/**
 * Crash mark: a car rear-ends a motorbike, the bike rears up, impact spark at the
 * contact point, the brand's green road underneath. Redrawn from the client's logo.
 * Spark colours live only in this mark.
 */
export function Mark({ tone = "light", className = "", animate = false }: MarkProps) {
  const ink = tone === "light" ? "#0f1f3d" : "#ffffff";
  const cut = tone === "light" ? "#f5f8fe" : "#0f1f3d";
  const a = animate ? " mark-animate" : "";
  return (
    <svg viewBox="0 0 72 38" aria-hidden="true" className={`overflow-visible${a} ${className}`}>
      <path d="M3 35.2H69" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" />
      <g className="mark-car">
        <g stroke={ink} strokeWidth="1.7" strokeLinecap="round" opacity="0.4">
          <path d="M2 17h5" />
          <path d="M1 22.5h4" />
        </g>
        <g transform="rotate(2.5 24 31)">
          <path
            fill={ink}
            d="M7 29.5V24c0-1.6 1-2.6 2.6-2.9l5.4-1 5-5.4c.9-1 2.1-1.5 3.4-1.5h7c1.4 0 2.6.6 3.5 1.6l3.6 4.4 3.3.8c1.7.4 2.7 1.7 2.7 3.4v6.1Z"
          />
          <path fill={cut} d="M19.6 20 23 16.3c.4-.4.9-.7 1.5-.7h3.6V20Zm10.2 0v-4.4h1.4c.6 0 1.2.3 1.6.8l2.9 3.6Z" />
          <circle cx="14.5" cy="29.5" r="4.2" fill={ink} stroke={cut} strokeWidth="1.8" />
          <circle cx="35.5" cy="29.5" r="4.2" fill={ink} stroke={cut} strokeWidth="1.8" />
        </g>
      </g>
      <g transform="rotate(12 67.4 33.4)">
        <g className="mark-bike">
          <circle cx="50" cy="29" r="4.4" fill="none" stroke={ink} strokeWidth="2.3" />
          <circle cx="63" cy="29" r="4.4" fill="none" stroke={ink} strokeWidth="2.3" />
          <path fill={ink} d="M52.6 20 55.2 17.4l3.8.9 1.8 1.8 5.6-1.5.8 1.3-2.8 3-4.4.4-3 3.6h-3.3Z" />
          <path
            d="M50 29 53.6 18.2l-1.4-1.6h-1.8M63 29l-5.2-5.4"
            fill="none"
            stroke={ink}
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g className="mark-spark">
        <path
          fill="#ff5a2e"
          d="M46.2 4.5l1.4 5.4 4.6-2.8-2.2 5 5.3 1-5.1 1.8 3.2 4.3-5.2-1.7-.5 5.4-2.7-4.8-3.8 3.8 1-5.3-5.3.5 4.4-3.2-4-3.5 5.3.5Z"
        />
        <path
          fill="#ffd23f"
          d="M46.6 10.1l.7 2.4 2.1-.9-1 2.1 2.3.6-2.3.7 1.3 2.1-2.2-.8-.5 2.3-1-2.2-1.9 1.5.6-2.3-2.3-.1 2-1.3-1.7-1.7 2.3.3Z"
        />
      </g>
    </svg>
  );
}

export default function Wordmark({ tone = "light", className = "", animate = false }: MarkProps) {
  return (
    <span className={`wordmark inline-flex items-center gap-2.5 ${className}`}>
      <Mark tone={tone} animate={animate} className="h-9 w-auto shrink-0" />
      <span
        className={`whitespace-nowrap font-display text-[1.3125rem] font-bold leading-none tracking-[-0.04em] ${
          tone === "light" ? "text-ink" : "text-white"
        }`}
      >
        Accident <span className={tone === "light" ? "text-go" : "text-go-bright"}>Care</span>
      </span>
    </span>
  );
}
