import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="hero-surface overflow-hidden">
      <Container className="relative pb-0 pt-24 md:pt-28">
        <div className="relative z-10 mx-auto max-w-[56rem] text-center">
          <p className="rise font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Freight OS · for shippers &amp; carriers
          </p>
          <h1
            className="rise mx-auto mt-6 max-w-[15ch] text-[clamp(44px,7vw,88px)] font-medium leading-[1.0] tracking-[-0.02em]"
            style={{ animationDelay: "60ms" }}
          >
            The operating system for intelligent freight.
          </h1>
          <p
            className="rise mx-auto mt-7 max-w-[50ch] font-sans text-[clamp(17px,2vw,20px)] leading-[1.5] text-ink-soft"
            style={{ animationDelay: "120ms" }}
          >
            Optimile sits on top of your ERP and runs the freight lifecycle from
            PO to POD, from live tracking to final settlement, without the manual
            work in between.
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <Button size="lg">Request a demo</Button>
            <Button variant="ghost" size="lg" className="gap-2">
              <Play size={16} className="fill-current" />
              Watch the 2-min tour
            </Button>
          </div>
          <p
            className="rise mt-7 font-mono text-[11px] tracking-wide text-ink-faint"
            style={{ animationDelay: "240ms" }}
          >
            Live in 4–8 weeks · No rip-and-replace · SAP · Oracle · Dynamics
          </p>
        </div>

        {/* product on the first screen — bleeds into the page */}
        <div
          className="rise relative z-10 mx-auto mt-16 max-w-[1000px] md:mt-20"
          style={{ animationDelay: "320ms" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -top-16 bottom-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--accent-solid) 20%, transparent), transparent 70%)",
            }}
          />
          <div className="bleed-mask relative overflow-hidden rounded-[10px] border border-line bg-surface shadow-card">
            <Image
              src="/product/control-tower.png"
              alt="Optimile Operations Control Tower — live shipment stages, exceptions and on-time delivery"
              width={2054}
              height={1458}
              priority
              sizes="(max-width: 1040px) 100vw, 1000px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
