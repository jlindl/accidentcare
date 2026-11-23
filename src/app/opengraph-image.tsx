import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Accident Care: Not your fault. Not your cost. Call 07864 920248.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");

export default async function Image() {
  const [display, body] = await Promise.all([
    readFile(join(fontDir, "bricolage-grotesque-latin-800-normal.woff")),
    readFile(join(fontDir, "geist-sans-latin-500-normal.woff")),
  ]);
  const road = "M1290 -60C1130 30 1210 220 1060 300C930 370 900 450 960 700";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f8fe",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "Geist",
          color: "#0f1f3d",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={road} fill="none" stroke="#2563eb" strokeWidth="56" strokeLinecap="round" />
          <path d={road} fill="none" stroke="#f5f8fe" strokeWidth="3" strokeDasharray="26 26" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="84" height="44" viewBox="0 0 72 38">
            <path d="M3 35.2H69" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" />
            <g transform="rotate(2.5 24 31)">
              <path fill="#0f1f3d" d="M7 29.5V24c0-1.6 1-2.6 2.6-2.9l5.4-1 5-5.4c.9-1 2.1-1.5 3.4-1.5h7c1.4 0 2.6.6 3.5 1.6l3.6 4.4 3.3.8c1.7.4 2.7 1.7 2.7 3.4v6.1Z" />
              <path fill="#f5f8fe" d="M19.6 20 23 16.3c.4-.4.9-.7 1.5-.7h3.6V20Zm10.2 0v-4.4h1.4c.6 0 1.2.3 1.6.8l2.9 3.6Z" />
              <circle cx="14.5" cy="29.5" r="4.2" fill="#0f1f3d" stroke="#f5f8fe" strokeWidth="1.8" />
              <circle cx="35.5" cy="29.5" r="4.2" fill="#0f1f3d" stroke="#f5f8fe" strokeWidth="1.8" />
            </g>
            <g transform="rotate(12 67.4 33.4)">
              <circle cx="50" cy="29" r="4.4" fill="none" stroke="#0f1f3d" strokeWidth="2.3" />
              <circle cx="63" cy="29" r="4.4" fill="none" stroke="#0f1f3d" strokeWidth="2.3" />
              <path fill="#0f1f3d" d="M52.6 20 55.2 17.4l3.8.9 1.8 1.8 5.6-1.5.8 1.3-2.8 3-4.4.4-3 3.6h-3.3Z" />
              <path d="M50 29 53.6 18.2l-1.4-1.6h-1.8M63 29l-5.2-5.4" fill="none" stroke="#0f1f3d" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path fill="#ff5a2e" d="M46.2 4.5l1.4 5.4 4.6-2.8-2.2 5 5.3 1-5.1 1.8 3.2 4.3-5.2-1.7-.5 5.4-2.7-4.8-3.8 3.8 1-5.3-5.3.5 4.4-3.2-4-3.5 5.3.5Z" />
            <path fill="#ffd23f" d="M46.6 10.1l.7 2.4 2.1-.9-1 2.1 2.3.6-2.3.7 1.3 2.1-2.2-.8-.5 2.3-1-2.2-1.9 1.5.6-2.3-2.3-.1 2-1.3-1.7-1.7 2.3.3Z" />
          </svg>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 38, letterSpacing: -1.5 }}>
            Accident<span style={{ color: "#2563eb", marginLeft: 10 }}>Care</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 68, lineHeight: 1.04, letterSpacing: -2.4, maxWidth: 780 }}>
          <div>{"Had an accident that wasn't your fault?"}</div>
          <div style={{ color: "#2563eb" }}>{"We'll take it from here."}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28 }}>
          <div
            style={{
              display: "flex",
              background: "#2563eb",
              color: "#ffffff",
              borderRadius: 999,
              padding: "14px 28px",
              fontSize: 30,
            }}
          >
            Call 07864 920248
          </div>
          <div style={{ color: "#55657f" }}>Non-fault accidents, UK-wide</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Geist", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
