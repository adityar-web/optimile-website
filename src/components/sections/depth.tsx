import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LifecycleWorkflow } from "@/components/mock/lifecycle-workflow";

const proofs = [
  {
    k: "Configuration, not customization",
    v: "LR formats, numbering series and freight rules vary by tenant through config, never forked code.",
  },
  {
    k: "Auditable by construction",
    v: "Every state change is appended with actor, timestamp and the config in force. Nothing is silently overwritten.",
  },
  {
    k: "One record, PO to POD",
    v: "The movement lives as one chained record, so the system is the source of truth, not a parallel book.",
  },
];

export function Depth() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Built for real freight"
          title="Built the way freight actually works."
          description="A dashboard is the easy part. The hard part is modelling how Indian freight actually runs, and that is what decides whether the software can be your system of record."
        />

        {/* the movement lifecycle, as an animated flowchart on a soft dotted field */}
        <div className="relative mt-16 px-2 py-6 md:px-6 md:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(var(--grid-line) 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse 90% 100% at 50% 50%, #000 35%, transparent 92%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 100% at 50% 50%, #000 35%, transparent 92%)",
            }}
          />
          <div className="relative">
            <LifecycleWorkflow />
          </div>
          <p className="relative mt-6 text-center font-mono text-[11px] text-ink-faint">
            One chained record. Each hop audited, each rule configurable.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {proofs.map((p) => (
            <div key={p.k}>
              <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{p.k}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{p.v}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
