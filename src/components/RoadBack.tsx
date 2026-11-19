"use client";

import { useRef } from "react";
import { steps } from "@/content/site";
import { ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import RevealText from "./RevealText";
import CallButton from "./CallButton";

/**
 * Signature moment: the road from the logo draws itself down the page, and each
 * step lights up the moment the road reaches it. The path is built from the real
 * positions of the step nodes, so it passes exactly through them at every width.
 */
export default function RoadBack() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const zone = zoneRef.current;
      const svg = svgRef.current;
      if (!zone || !svg) return;

      const nodes = Array.from(zone.querySelectorAll<HTMLElement>("[data-node]"));
      const items = Array.from(zone.querySelectorAll<HTMLElement>("[data-step]"));
      const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-road]"));
      const maskPath = svg.querySelector<SVGPathElement>("path[data-mask]");
      if (!maskPath) return;

      let total = 0;
      let samples: { len: number; y: number }[] = [];
      let nodeYs: number[] = [];

      const build = () => {
        const zr = zone.getBoundingClientRect();
        const w = zr.width;
        const h = zone.scrollHeight;
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        svg.setAttribute("width", String(w));
        svg.setAttribute("height", String(h));

        const pts = nodes.map((n) => {
          const r = n.getBoundingClientRect();
          return { x: r.left - zr.left + r.width / 2, y: r.top - zr.top + r.height / 2 };
        });
        nodeYs = pts.map((p) => p.y);
        const first = pts[0];
        const last = pts[pts.length - 1];
        let d = `M ${first.x} ${Math.max(0, first.y - 72)} L ${first.x} ${first.y}`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const k = (b.y - a.y) * 0.85;
          d += ` C ${a.x} ${a.y + k} ${b.x} ${b.y - k} ${b.x} ${b.y}`;
        }
        d += ` L ${last.x} ${last.y + 56}`;
        paths.forEach((p) => p.setAttribute("d", d));
        maskPath.setAttribute("d", d);

        total = maskPath.getTotalLength();
        samples = [];
        const N = 600;
        for (let i = 0; i <= N; i++) {
          const len = (total * i) / N;
          samples.push({ len, y: maskPath.getPointAtLength(len).y });
        }
        maskPath.style.strokeDasharray = `${total} ${total}`;
      };

      const lengthAtY = (y: number) => {
        if (y <= 0) return 0;
        for (let i = 1; i < samples.length; i++) {
          if (samples[i].y >= y) {
            const a = samples[i - 1];
            const b = samples[i];
            const t = b.y === a.y ? 0 : (y - a.y) / (b.y - a.y);
            return a.len + (b.len - a.len) * t;
          }
        }
        return total;
      };

      const render = (headY: number) => {
        maskPath.style.strokeDashoffset = String(total - lengthAtY(headY));
        nodeYs.forEach((ny, i) => {
          items[i]?.setAttribute("data-active", headY >= ny - 2 ? "true" : "false");
        });
      };

      build();

      if (prefersReducedMotion()) {
        render(Number.POSITIVE_INFINITY);
        const ro = new ResizeObserver(() => {
          build();
          render(Number.POSITIVE_INFINITY);
        });
        ro.observe(zone);
        return () => ro.disconnect();
      }

      render(0);
      const st = ScrollTrigger.create({
        trigger: zone,
        start: "top 62%",
        end: "bottom 62%",
        onUpdate: (self) => render(self.progress * zone.scrollHeight),
        onRefresh: (self) => {
          build();
          render(self.progress * zone.scrollHeight);
        },
      });

      return () => st.kill();
    },
    { scope: zoneRef },
  );

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="on-dark px-2 sm:px-4">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-ink text-white">
        <div className="container-x pt-24 sm:pt-32 lg:pt-40">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-go">How it works</p>
              <RevealText id="how-title" className="mt-5 text-h2 text-white">
                The road back, <span className="text-on-dark-muted">in four steps.</span>
              </RevealText>
            </div>
            <p className="max-w-[42ch] text-body-l text-on-dark-muted lg:col-span-4 lg:col-start-9">
              Here is what happens, from the first call to a settled claim.
            </p>
          </div>
        </div>

        <div ref={zoneRef} className="container-x relative mt-16 pb-8 lg:mt-24">
          <svg ref={svgRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 overflow-visible">
            <defs>
              <mask id="road-back-mask" maskUnits="userSpaceOnUse">
                <path data-mask fill="none" stroke="#fff" strokeWidth="40" strokeLinecap="round" />
              </mask>
            </defs>
            {/* Faint full route so the whole journey is visible before it is travelled */}
            <path data-road fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="22" strokeLinecap="round" />
            <g mask="url(#road-back-mask)">
              <path data-road fill="none" stroke="#3fd15a" strokeWidth="22" strokeLinecap="round" />
              <path data-road fill="none" stroke="#0b1a30" strokeWidth="2" strokeDasharray="14 14" />
            </g>
          </svg>

          <ol className="relative">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={s.title}
                  data-step
                  data-active="false"
                  className="group relative grid min-h-[200px] grid-cols-[48px_1fr] items-center gap-x-5 py-6 md:min-h-[260px] md:grid-cols-12 md:gap-x-6"
                >
                  <span
                    data-node
                    className={`relative z-10 grid size-12 place-items-center rounded-full border-2 border-white/20 bg-ink font-mono text-sm tabular-nums text-on-dark-muted transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-soft)] group-data-[active=true]:scale-110 group-data-[active=true]:border-go group-data-[active=true]:bg-go group-data-[active=true]:text-ink md:row-start-1 ${
                      right ? "md:col-start-12 md:justify-self-end" : "md:col-start-1"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={`md:row-start-1 ${
                      right ? "md:col-span-5 md:col-start-6 md:text-right" : "md:col-span-5 md:col-start-2"
                    }`}
                  >
                    <h3 className="text-h3 text-on-dark-muted transition-colors duration-500 group-data-[active=true]:text-white md:text-[clamp(1.75rem,1.2rem+1.4vw,2.5rem)]">
                      {s.title}
                    </h3>
                    <p className={`mt-3 max-w-[40ch] text-[1rem] leading-[1.6] text-on-dark-muted ${right ? "md:ml-auto" : ""}`}>
                      {s.line}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="container-x relative pb-24 pt-10 sm:pb-32 lg:pb-40">
          <div className="flex flex-col items-start gap-8 border-t border-line-dark pt-12 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display text-h2 font-bold tracking-[-0.035em]">
              Back on the road. <span className="text-go">Stress free.</span>
            </p>
            <CallButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
