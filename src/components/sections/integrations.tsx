import Link from "next/link";
import { ArrowRight, Check, Boxes } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const topNodes = ["SAP", "Oracle", "Dynamics", "Tally", "Zoho"];
const bottomNodes = ["FASTag", "GPS", "SIM", "E-way", "GST"];

const hubRows = [
  { l: "ERP sync", s: "SAP · Oracle · Dynamics" },
  { l: "Telematics & GPS", s: "Live location, unified" },
  { l: "FASTag & tolls", s: "Movement without a device" },
  { l: "E-way & GST", s: "Compliant by default" },
];

function Tile({ label }: { label: string }) {
  return (
    <div className="grid h-14 w-16 place-items-center rounded-[10px] border border-line bg-surface shadow-soft">
      <span className="font-mono text-[11px] font-semibold text-ink-soft">{label}</span>
    </div>
  );
}

function Bracket({ dir }: { dir: "in" | "out" }) {
  // in: tiles (top) converge into the card below. out: card diverges to tiles below.
  const stubs = [80, 240, 400, 560, 720]; // x of each of 5 tiles (viewBox 800 wide)
  const cx = 400;
  const d =
    dir === "in"
      ? [
          ...stubs.map((x) => `M${x} 2 V22`),
          `M80 22 H720`,
          `M${cx} 22 V46`,
        ].join(" ")
      : [
          `M${cx} 2 V22`,
          `M80 22 H720`,
          ...stubs.map((x) => `M${x} 22 V46`),
        ].join(" ");
  return (
    <svg viewBox="0 0 800 48" preserveAspectRatio="none" className="h-10 w-full" fill="none">
      <path
        d={d}
        stroke="var(--color-line-strong)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IntegrationsHub() {
  return (
    <div className="mx-auto max-w-[620px]">
      <div className="flex justify-between">
        {topNodes.map((n) => (
          <Tile key={n} label={n} />
        ))}
      </div>
      <Bracket dir="in" />
      <div className="overflow-hidden rounded-[14px] border border-line bg-surface shadow-card">
        <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
          <span className="grid size-7 place-items-center rounded-[7px] bg-accent-solid/12 text-accent">
            <Boxes size={16} />
          </span>
          <span className="text-[14px] font-semibold">Optimile · one integration layer</span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line">
          {hubRows.map((r) => (
            <div key={r.l} className="flex items-start gap-2.5 bg-surface px-5 py-4">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-ok text-white">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold">{r.l}</span>
                <span className="mt-0.5 block text-[12px] text-ink-faint">{r.s}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <Bracket dir="out" />
      <div className="flex justify-between">
        {bottomNodes.map((n) => (
          <Tile key={n} label={n} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Integrations"
          title="Connects to the stack your teams already run."
          description="API-first and read-only by default. Sync purchase orders and invoices in real time, and add a provider without writing a line of code. Automation is opt-in, scoped and logged."
        />
        <div className="mt-16">
          <IntegrationsHub />
        </div>
        <p className="mt-12 text-center text-[14px] text-ink-faint">
          <Link href="/integrations" className="text-accent underline-offset-4 hover:underline">
            View all integrations →
          </Link>
        </p>
      </Container>
    </section>
  );
}
