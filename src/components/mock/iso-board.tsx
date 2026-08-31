"use client";

import * as React from "react";
import { gsap } from "gsap";
import { Radar, ScrollText, Gavel, Wallet, Truck, Warehouse } from "lucide-react";

/* ---- isometric projection (2:1) ---- */
const OX = 370;
const OY = 190;
const TW = 46;
const TH = 23;
const ZH = 30;

type Pt = [number, number];
const P = (gx: number, gy: number, gz = 0): Pt => [OX + (gx - gy) * TW, OY + (gx + gy) * TH - gz * ZH];
const pts = (a: Pt[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

function faces(cx: number, cy: number, s: number, h: number, z0 = 0) {
  return {
    top: [P(cx - s, cy - s, z0 + h), P(cx + s, cy - s, z0 + h), P(cx + s, cy + s, z0 + h), P(cx - s, cy + s, z0 + h)],
    right: [P(cx + s, cy - s, z0 + h), P(cx + s, cy + s, z0 + h), P(cx + s, cy + s, z0), P(cx + s, cy - s, z0)],
    left: [P(cx - s, cy + s, z0 + h), P(cx + s, cy + s, z0 + h), P(cx + s, cy + s, z0), P(cx - s, cy + s, z0)],
  };
}

type Mod = { gx: number; gy: number; label: string; Icon: React.ComponentType<{ x?: number; y?: number; width?: number; height?: number; color?: string; strokeWidth?: number }> };
const R = 2.7;
const MODS: Mod[] = [
  { gx: 0, gy: -R, label: "Control Tower", Icon: Radar },
  { gx: R, gy: -R / 2, label: "Bookings & LR", Icon: ScrollText },
  { gx: R, gy: R / 2, label: "Auctions", Icon: Gavel },
  { gx: 0, gy: R, label: "Settlement", Icon: Wallet },
  { gx: -R, gy: R / 2, label: "Fleet", Icon: Truck },
  { gx: -R, gy: -R / 2, label: "Yard", Icon: Warehouse },
];

const MS = 0.72;
const MH = 0.46;

// paint back-to-front
const order = MODS.map((_, i) => i).sort((a, b) => MODS[a].gx + MODS[a].gy - (MODS[b].gx + MODS[b].gy));

export function IsoBoard({ active }: { active: number }) {
  const svg = React.useRef<SVGSVGElement>(null);
  const floor = React.useRef<SVGGElement>(null);
  const core = React.useRef<SVGGElement>(null);
  const nodes = React.useRef<(SVGGElement | null)[]>([]);
  const conns = React.useRef<(SVGLineElement | null)[]>([]);

  React.useEffect(() => {
    const el = svg.current;
    if (!el) return;
    gsap.registerPlugin();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    conns.current.forEach((c) => {
      if (!c) return;
      const len = c.getTotalLength();
      c.style.strokeDasharray = String(len);
      c.style.strokeDashoffset = reduce ? "0" : String(len);
    });
    if (reduce) return;

    gsap.set(floor.current, { opacity: 0 });
    gsap.set(core.current, { opacity: 0, y: 24 });
    nodes.current.forEach((n) => n && gsap.set(n, { opacity: 0, y: 26 }));

    const tl = gsap.timeline({ paused: true });
    tl.to(floor.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
    tl.to(core.current, { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.5)" }, 0.15);
    order.forEach((idx, k) => {
      const t = 0.45 + k * 0.11;
      tl.to(conns.current[idx], { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }, t);
      tl.to(nodes.current[idx], { opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.6)" }, t + 0.06);
    });

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          tl.play();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tl.kill();
    };
  }, []);

  const coreF = faces(0, 0, 0.95, 1.25);
  const coreTopMid = P(0, 0, 1.25);

  const drawn = [
    { core: true as const, depth: 0 },
    ...MODS.map((m, i) => ({ i, depth: m.gx + m.gy })),
  ].sort((a, b) => a.depth - b.depth);

  return (
    <svg
      ref={svg}
      viewBox="0 0 740 470"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Optimile platform — modules unified on one core, over your ERP"
    >
      <defs>
        <linearGradient id="cTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a8bff" />
          <stop offset="1" stopColor="#2f6ef6" />
        </linearGradient>
        <linearGradient id="cRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a63e6" />
          <stop offset="1" stopColor="#1a48bd" />
        </linearGradient>
        <linearGradient id="cLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c47b4" />
          <stop offset="1" stopColor="#123184" />
        </linearGradient>
        <linearGradient id="mTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3c4e76" />
          <stop offset="1" stopColor="#2d3c5c" />
        </linearGradient>
        <linearGradient id="mRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#273659" />
          <stop offset="1" stopColor="#1b2743" />
        </linearGradient>
        <linearGradient id="mLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c2742" />
          <stop offset="1" stopColor="#131c33" />
        </linearGradient>
        <filter id="isoGlow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="softShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* floor grid */}
      <g ref={floor} stroke="var(--color-line)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => {
          const g = i - 4;
          return <line key={`x${i}`} x1={P(g, -4)[0]} y1={P(g, -4)[1]} x2={P(g, 4)[0]} y2={P(g, 4)[1]} />;
        })}
        {Array.from({ length: 9 }).map((_, i) => {
          const g = i - 4;
          return <line key={`y${i}`} x1={P(-4, g)[0]} y1={P(-4, g)[1]} x2={P(4, g)[0]} y2={P(4, g)[1]} />;
        })}
      </g>

      {/* ground shadows */}
      {MODS.map((m, i) => {
        const c = P(m.gx, m.gy, 0);
        return <ellipse key={`sh${i}`} cx={c[0]} cy={c[1] + 6} rx="42" ry="20" fill="rgba(0,0,0,0.32)" filter="url(#softShadow)" />;
      })}
      <ellipse cx={P(0, 0, 0)[0]} cy={P(0, 0, 0)[1] + 8} rx="60" ry="28" fill="rgba(0,0,0,0.4)" filter="url(#softShadow)" />

      {/* connectors */}
      <g>
        {MODS.map((m, i) => {
          const a = P(0, 0, 0.02);
          const b = P(m.gx, m.gy, 0.02);
          const on = i === active;
          return (
            <line
              key={`c${i}`}
              ref={(node) => {
                conns.current[i] = node;
              }}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke={on ? "#6ba0ff" : "rgba(140,160,200,0.30)"}
              strokeWidth={on ? 2.5 : 1.5}
              style={{ transition: "stroke .25s, stroke-width .25s", filter: on ? "drop-shadow(0 0 5px rgba(107,160,255,0.85))" : "none" }}
            />
          );
        })}
      </g>

      {/* active glow halo */}
      {active >= 0 && active < MODS.length && (
        <ellipse
          cx={P(MODS[active].gx, MODS[active].gy, MH)[0]}
          cy={P(MODS[active].gx, MODS[active].gy, MH)[1]}
          rx="60"
          ry="34"
          fill="rgba(107,160,255,0.30)"
          filter="url(#isoGlow)"
          style={{ transition: "cx .25s, cy .25s" }}
        />
      )}

      {/* cubes, back-to-front */}
      {drawn.map((d) => {
        if ("core" in d) {
          return (
            <g key="core" ref={core}>
              <polygon points={pts(coreF.left)} fill="url(#cLeft)" />
              <polygon points={pts(coreF.right)} fill="url(#cRight)" />
              <polygon points={pts(coreF.top)} fill="url(#cTop)" />
              <text x={coreTopMid[0]} y={coreTopMid[1] + 4} textAnchor="middle" fontSize="14" fontWeight="600" fontFamily="var(--font-sans)" fill="#eaf1ff" style={{ letterSpacing: "-0.01em" }}>
                Optimile
              </text>
            </g>
          );
        }
        const m = MODS[d.i];
        const on = d.i === active;
        const f = faces(m.gx, m.gy, MS, MH);
        const top = P(m.gx, m.gy, MH);
        const base = P(m.gx, m.gy, 0);
        const Icon = m.Icon;
        return (
          <g
            key={`m${d.i}`}
            ref={(node) => {
              nodes.current[d.i] = node;
            }}
          >
            <polygon points={pts(f.left)} fill={on ? "url(#cLeft)" : "url(#mLeft)"} style={{ transition: "fill .25s" }} />
            <polygon points={pts(f.right)} fill={on ? "url(#cRight)" : "url(#mRight)"} style={{ transition: "fill .25s" }} />
            <polygon points={pts(f.top)} fill={on ? "url(#cTop)" : "url(#mTop)"} style={{ transition: "fill .25s" }} />
            <Icon x={top[0] - 9} y={top[1] - 11} width={18} height={18} color={on ? "#ffffff" : "#aebfdf"} strokeWidth={2} />
            <text
              x={base[0]}
              y={base[1] + 30}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="600"
              fontFamily="var(--font-sans)"
              fill={on ? "#eaf1ff" : "#9fb0cf"}
              style={{ transition: "fill .25s", letterSpacing: "-0.01em" }}
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
