import { Container } from "@/components/ui/container";

/* Muted trusted-by row — flows on the ground, no divider. Swap skeletons for real logos. */
export function LogoWall() {
  return (
    <section className="pb-16 pt-4">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          Trusted by logistics teams moving freight across India
        </p>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 items-center gap-x-10 gap-y-8 opacity-55 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center gap-2">
              <span className="size-5 rounded-md bg-ink-faint/30" />
              <span className="h-3 w-16 rounded-full bg-ink-faint/30" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
