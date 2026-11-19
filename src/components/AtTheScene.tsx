import { sceneChecklist } from "@/content/site";
import RevealText from "./RevealText";
import Reveal from "./Reveal";
import CallButton from "./CallButton";

export default function AtTheScene() {
  return (
    <section id="at-the-scene" aria-labelledby="scene-title" className="section-y border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="label text-go-deep">At the scene</p>
            <RevealText id="scene-title" className="mt-5 text-h2">
              Just had an accident? Start here.
            </RevealText>
            <p className="mt-6 max-w-[36ch] text-body-l text-muted">
              Take a breath. Work through these in order, and call us once everyone is safe.
            </p>
          </div>
        </div>

        <Reveal as="ol" stagger={0.06} className="lg:col-span-7 lg:col-start-6">
          {sceneChecklist.map((item, i) => {
            const isLast = i === sceneChecklist.length - 1;
            return (
              <li
                key={item.title}
                data-reveal-item
                className={`grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-line py-8 sm:grid-cols-[5rem_1fr] sm:gap-x-6 ${
                  isLast ? "border-b" : ""
                }`}
              >
                <span
                  className={`font-display text-[2rem] font-bold leading-none tracking-[-0.04em] tabular-nums sm:text-[2.5rem] ${
                    isLast ? "text-go-deep" : "text-ink/50"
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-h3">{item.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[1rem] leading-[1.6] text-muted">{item.line}</p>
                  {isLast && <CallButton size="md" className="mt-6" />}
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
