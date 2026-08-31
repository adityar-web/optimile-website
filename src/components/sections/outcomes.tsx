import { Container } from "@/components/ui/container";

const stats = [
  { v: "5–8%", l: "of freight spend recovered through automated audit" },
  { v: "60%", l: "faster carrier placement with AI indenting" },
  { v: "70–90%", l: "less manual effort across yard and docs" },
  { v: "4–8 wks", l: "to go live, in phases, on your ERP" },
];

export function Outcomes() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="grid gap-10 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-mono text-[clamp(34px,5vw,52px)] font-semibold leading-none tracking-[-0.02em]">
                {s.v}
              </div>
              <div className="mt-3 max-w-[26ch] text-[14px] leading-snug text-ink-soft">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
