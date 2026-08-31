"use client";

import * as React from "react";
import {
  ClipboardList,
  Truck,
  ScrollText,
  ReceiptText,
  FileCheck2,
  PackageCheck,
  Wallet,
  Check,
  Play,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { k: "Booking", d: "Order becomes a booking", Icon: ClipboardList },
  { k: "Trip", d: "Vehicle and driver assigned", Icon: Truck },
  { k: "LR", d: "Lorry Receipt issued", Icon: ScrollText },
  { k: "Invoice", d: "Freight invoiced", Icon: ReceiptText },
  { k: "E-way bill", d: "Generated automatically", Icon: FileCheck2 },
  { k: "ePOD", d: "Captured on delivery", Icon: PackageCheck },
  { k: "Settlement", d: "Reconciled and paid", Icon: Wallet },
];

function Spinner() {
  return (
    <svg className="wf-spin size-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" stroke="var(--color-line-strong)" />
      <path d="M6 1.5a4.5 4.5 0 0 1 0 9" stroke="var(--color-accent)" strokeLinecap="round" />
    </svg>
  );
}

function StatusPill({ kind }: { kind: "start" | "running" | "done" }) {
  if (kind === "done")
    return (
      <span className="wf-check-pop inline-flex items-center gap-1 rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-semibold text-ok">
        <Check size={10} strokeWidth={3} />
        Completed
      </span>
    );
  if (kind === "running")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-accent-solid/12 px-2 py-0.5 text-[10px] font-semibold text-accent">
        <Spinner />
        Running
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
      <Play size={9} className="fill-current" />
      Start
    </span>
  );
}

function StepCard({ i, active }: { i: number; active: number }) {
  const s = steps[i];
  const isDone = i < active;
  const isRunning = i === active;
  return (
    <div className="relative grow basis-0 min-w-0">
      {i === 0 && (
        <div className="absolute -top-2.5 left-3 z-10">
          <StatusPill kind="start" />
        </div>
      )}
      <div className="absolute -top-2.5 right-3 z-10">
        {isDone ? <StatusPill kind="done" /> : isRunning ? <StatusPill kind="running" /> : null}
      </div>
      <div
        className={cn(
          "rounded-[10px] border bg-surface p-4 transition-all duration-300",
          isRunning
            ? "border-accent shadow-card wf-run-glow"
            : isDone
              ? "border-line shadow-soft"
              : "border-line opacity-70"
        )}
      >
        <span
          className={cn(
            "grid size-8 place-items-center rounded-[7px]",
            isDone || isRunning ? "bg-accent-solid/12 text-accent" : "bg-surface-2 text-ink-faint"
          )}
        >
          <s.Icon size={16} strokeWidth={2} />
        </span>
        <div className="mt-3 text-[14px] font-semibold tracking-[-0.01em]">{s.k}</div>
        <div className="mt-1 text-[12px] leading-snug text-ink-faint">{s.d}</div>
      </div>
    </div>
  );
}

function HConn({ drawn }: { drawn: boolean }) {
  return (
    <div className="relative flex w-8 shrink-0 items-center self-center md:w-12">
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-line">
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]",
            drawn ? "scale-x-100" : "scale-x-0"
          )}
        />
      </div>
      {drawn && (
        <span className="wf-pulse-dot pointer-events-none absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]" />
      )}
    </div>
  );
}

function WrapConn({ drawn }: { drawn: boolean }) {
  const d = "M875 2 V32 Q875 48 859 48 H141 Q125 48 125 64 V76";
  return (
    <div className="relative hidden h-14 w-full md:block">
      <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="h-full w-full" fill="none">
        <path d={d} stroke="var(--color-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path
          className={cn("wf-path", drawn && "is-drawn")}
          pathLength={1}
          d={d}
          stroke="var(--color-accent)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ChevronDown
        size={16}
        className={cn(
          "absolute bottom-[-7px] -translate-x-1/2 text-accent transition-opacity duration-300",
          drawn ? "opacity-100" : "opacity-0"
        )}
        style={{ left: "12.5%" }}
      />
    </div>
  );
}

function VConn({ drawn }: { drawn: boolean }) {
  return (
    <div className="flex h-7 items-center justify-center md:hidden">
      <div className="relative h-full w-[2px] overflow-hidden rounded-full bg-line">
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-full origin-top rounded-full bg-accent transition-transform duration-500",
            drawn ? "scale-y-100" : "scale-y-0"
          )}
        />
      </div>
    </div>
  );
}

export function LifecycleWorkflow() {
  const [active, setActive] = React.useState(-1);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let i = 0;
        setActive(0);
        const id = setInterval(() => {
          i += 1;
          if (i >= steps.length) {
            clearInterval(id);
            return;
          }
          setActive(i);
        }, 800);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* desktop: two rows (4 + 3) with routed connectors */}
      <div className="hidden md:block">
        <div className="flex items-stretch">
          <StepCard i={0} active={active} />
          <HConn drawn={active > 0} />
          <StepCard i={1} active={active} />
          <HConn drawn={active > 1} />
          <StepCard i={2} active={active} />
          <HConn drawn={active > 2} />
          <StepCard i={3} active={active} />
        </div>
        <WrapConn drawn={active > 3} />
        <div className="flex items-stretch">
          <StepCard i={4} active={active} />
          <HConn drawn={active > 4} />
          <StepCard i={5} active={active} />
          <HConn drawn={active > 5} />
          <StepCard i={6} active={active} />
          <div className="grow basis-0" />
        </div>
      </div>

      {/* mobile: single column */}
      <div className="flex flex-col md:hidden">
        {steps.map((s, i) => (
          <React.Fragment key={s.k}>
            <StepCard i={i} active={active} />
            {i < steps.length - 1 && <VConn drawn={active > i} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
