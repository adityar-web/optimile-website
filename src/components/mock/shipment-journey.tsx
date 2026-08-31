"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const milestones = [
  { k: "Booking", s: "Order placed" },
  { k: "LR", s: "Lorry Receipt issued" },
  { k: "E-way bill", s: "Auto-generated" },
  { k: "In transit", s: "Tracked live" },
  { k: "POD", s: "Proof captured" },
  { k: "Settlement", s: "Reconciled & paid" },
];
const fr = [0.08, 0.248, 0.416, 0.584, 0.752, 0.92];

const DOT_DIM = "#2a3856";
const DOT_ON = "#6ba0ff";
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

function lerpColor(a: string, b: string, t: number) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function ShipmentJourney() {
  const wrap = React.useRef<HTMLDivElement>(null);
  const truck = React.useRef<HTMLDivElement>(null);
  const fill = React.useRef<HTMLDivElement>(null);
  const parallax = React.useRef<HTMLDivElement>(null);
  const dots = React.useRef<(HTMLSpanElement | null)[]>([]);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (p: number) => {
      if (truck.current) truck.current.style.left = `${8 + p * 84}%`;
      if (fill.current) fill.current.style.width = `${p * 84}%`;
      if (parallax.current) parallax.current.style.transform = `translateX(${-p * 36}px)`;
      fr.forEach((f, i) => {
        const st = (f - 0.08) / 0.84;
        const lp = easeOut(clamp((p - (st - 0.06)) / 0.14));
        const card = cards.current[i];
        if (card) {
          card.style.opacity = String(lp);
          card.style.transform = `translateY(${(1 - lp) * 22}px) scale(${0.9 + 0.1 * lp}) rotateX(${(1 - lp) * 14}deg)`;
        }
        const dot = dots.current[i];
        if (dot) {
          dot.style.backgroundColor = lerpColor(DOT_DIM, DOT_ON, lp);
          dot.style.transform = `scale(${1 + 0.4 * lp})`;
          dot.style.boxShadow = lp > 0.05 ? `0 0 ${14 * lp}px ${2 * lp}px rgba(107,160,255,${0.7 * lp})` : "none";
        }
      });
    };

    if (reduce) {
      render(1);
      return;
    }

    render(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 14%",
      end: "+=1100",
      pin: true,
      scrub: 1,
      onUpdate: (self) => render(self.progress),
    });
    ScrollTrigger.refresh();
    return () => st.kill();
  }, []);

  return (
    <div ref={wrap} className="relative h-[380px] [perspective:1200px] md:h-[440px]">
      {/* parallax dashed field for depth */}
      <div
        ref={parallax}
        aria-hidden
        className="pointer-events-none absolute -inset-x-12 inset-y-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(var(--grid-line) 1.4px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 90%)",
        }}
      />

      {/* lane */}
      <div className="absolute left-[8%] right-[8%] top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-line" />
      <div
        ref={fill}
        className="absolute left-[8%] top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-accent"
        style={{ width: 0, boxShadow: "0 0 12px 0 rgba(107,160,255,0.5)" }}
      />

      {milestones.map((m, i) => {
        const above = i % 2 === 0;
        return (
          <React.Fragment key={m.k}>
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${fr[i] * 100}%` }}>
              <span
                ref={(node) => {
                  dots.current[i] = node;
                }}
                className="block size-3 rounded-full"
                style={{ backgroundColor: DOT_DIM }}
              />
            </div>

            <div
              className="absolute -translate-x-1/2 [transform-style:preserve-3d]"
              style={{ left: `${fr[i] * 100}%`, [above ? "bottom" : "top"]: "calc(50% + 30px)" }}
            >
              <div
                className={cn(
                  "absolute left-1/2 h-[30px] w-px -translate-x-1/2 bg-line",
                  above ? "top-full" : "bottom-full"
                )}
              />
              <div
                ref={(node) => {
                  cards.current[i] = node;
                }}
                className="w-[156px] origin-center rounded-[10px] border border-line bg-surface p-3.5 shadow-card"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                  <span className="text-[13px] font-semibold">{m.k}</span>
                </div>
                <div className="mt-1 text-[11px] text-ink-faint">{m.s}</div>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* the shipment */}
      <div ref={truck} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: "8%" }}>
        <div className="grid size-10 place-items-center rounded-full bg-accent-solid text-white shadow-[0_0_24px_3px_rgba(107,160,255,0.6)]">
          <Truck size={19} />
        </div>
      </div>
    </div>
  );
}
