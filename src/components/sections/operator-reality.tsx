import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const truths = [
  {
    k: "Blind spots",
    v: "Traditional GPS leaves gaps and market vehicles go dark, so you're guessing where the freight is.",
  },
  {
    k: "Leaking margins",
    v: "Manual audits miss up to 15% of billing errors, while detention and fuel theft quietly add up.",
  },
  {
    k: "Manual chaos",
    v: "Lost PODs, delayed payments and hand-typed E-way bills keep the real work in spreadsheets and WhatsApp.",
  },
];

export function OperatorReality() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="The operator's reality"
          title={
            <>
              Run enough freight and the{" "}
              <span className="text-accent">paper LR book</span> becomes your record.
            </>
          }
          description="When the software can't hold a movement end to end, someone keeps a second copy on paper. That copy becomes the truth, and the gaps in it cost you visibility, margin and time."
        />

        {/* slanted product shot */}
        <div className="mt-20 [perspective:2000px]">
          <div className="relative mx-auto max-w-[940px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-24 -inset-y-16"
              style={{
                background:
                  "radial-gradient(ellipse 55% 60% at 55% 45%, color-mix(in srgb, var(--accent-solid) 16%, transparent), transparent 70%)",
              }}
            />
            <div
              className="relative overflow-hidden rounded-[12px] border border-line bg-surface shadow-card"
              style={{
                transform: "rotateX(7deg) rotateY(-15deg) rotate(0.6deg)",
                transformOrigin: "center",
              }}
            >
              <Image
                src="/product/control-tower.png"
                alt="Optimile — the whole movement on one live record"
                width={2054}
                height={1458}
                sizes="(max-width: 940px) 100vw, 940px"
                className="h-auto w-full"
              />
            </div>

            {/* floating callout, above the slanted plane */}
            <div className="absolute -right-2 bottom-6 rounded-[10px] border border-line bg-surface px-4 py-3 shadow-card md:right-6">
              <div className="flex items-center gap-2 text-[13px] font-semibold">
                <span className="size-2 rounded-full bg-accent-solid" />
                One record · no parallel book
              </div>
              <div className="mt-1 font-mono text-[11px] text-ink-faint">
                LR → invoice → E-way → POD
              </div>
            </div>
          </div>
        </div>

        {/* the three failures */}
        <div className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
          {truths.map((t) => (
            <div key={t.k}>
              <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink">
                {t.k}
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{t.v}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
