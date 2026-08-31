import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  RoutingMock,
  AnomalyMock,
  PredictiveMock,
  NavigatorMock,
} from "@/components/mock/domain-mocks";

const cells = [
  {
    title: "Cognitive routing",
    desc: "Balance cost against speed on every lane. Optimile picks the route an operator would, and shows why.",
    href: "/platform/ai",
    Mock: RoutingMock,
  },
  {
    title: "Anomaly detection",
    desc: "Every invoice is scored against the contract, route and POD. Overbilling is flagged the moment it appears.",
    href: "/platform/freight-audit",
    Mock: AnomalyMock,
  },
  {
    title: "Predictive exceptions",
    desc: "Weather, traffic and lane risk are read before the trip, with the cost of each disruption priced up front.",
    href: "/platform/ai",
    Mock: PredictiveMock,
  },
  {
    title: "Conversational control",
    desc: "Ask in plain language and get back options with their impact, not another dashboard to read.",
    href: "/platform/ai",
    Mock: NavigatorMock,
  },
];

export function Intelligence() {
  return (
    <section className="bg-surface-2/60 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="The intelligence layer"
          title={
            <>
              Intelligence that runs on the{" "}
              <span className="text-accent">record</span>.
            </>
          }
          description="Because every movement is one clean record, the models work from what actually happened, not from guesses."
        />

        <div className="mt-14 overflow-hidden rounded-[14px] border border-line">
          <div className="grid gap-px bg-line md:grid-cols-2">
            {cells.map((c) => (
              <div key={c.title} className="flex flex-col bg-surface p-6 md:p-8">
                <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-ink-soft">
                  {c.desc}
                </p>
                <Link
                  href={c.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent"
                >
                  Learn more
                  <ArrowRight size={14} />
                </Link>
                <div className="mt-7">
                  <c.Mock />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
