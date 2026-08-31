import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="section-dark relative overflow-hidden bg-ground py-24 text-ink md:py-32">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, #000 0%, transparent 75%)",
        }}
      />
      {/* iris glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(42, 107, 245,0.35), transparent 70%)",
        }}
      />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-[18ch] text-[clamp(32px,4.6vw,56px)] font-medium leading-[1.03] tracking-[-0.02em]">
          Ready to run freight on one system?
        </h2>
        <p className="mx-auto mt-5 max-w-[48ch] font-sans text-[17px] leading-relaxed text-ink-soft">
          Start with a free pilot on one lane. We&rsquo;ll show you where freight
          spend is leaking and what it takes to fix it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">Start a free pilot</Button>
          <Button variant="secondary" size="lg">
            Request a demo
          </Button>
        </div>
      </Container>
    </section>
  );
}
