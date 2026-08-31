import { Container } from "@/components/ui/container";

/* Placeholder — swap for a real, approved customer quote + metrics. */
export function Testimonial() {
  return (
    <section className="bg-surface-2/60 py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16">
          <figure>
            <blockquote className="max-w-[24ch] text-[clamp(22px,3vw,32px)] font-medium leading-[1.3] tracking-[-0.015em]">
              &ldquo;We went from chasing drivers on WhatsApp to a single control
              tower. Month-end reconciliation that took a week now closes in a
              day.&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm">
              <span className="size-9 rounded-full bg-ink-faint/20" />
              <span>
                <span className="font-semibold text-ink">Head of Supply Chain</span>
                <span className="text-ink-faint"> · enterprise manufacturer</span>
              </span>
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-[10px] border border-line bg-surface p-5 shadow-soft">
              <div className="font-mono text-[30px] font-semibold leading-none tracking-[-0.02em] text-accent">
                6×
              </div>
              <div className="mt-2 text-[13px] leading-snug text-ink-soft">
                faster month-end reconciliation
              </div>
            </div>
            <div className="rounded-[10px] border border-line bg-surface p-5 shadow-soft">
              <div className="font-mono text-[30px] font-semibold leading-none tracking-[-0.02em] text-accent">
                100%
              </div>
              <div className="mt-2 text-[13px] leading-snug text-ink-soft">
                of trips on one record
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
