"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import {
  ControlTowerMock,
  BookingLRMock,
  AuctionMock,
  SettlementMock,
} from "@/components/mock/domain-mocks";

const domains = [
  {
    label: "Control Tower",
    desc: "Track GPS, SIM and FASTag vehicles in one view, with stage-wise SLAs and an alert the moment a trip goes off plan.",
    cta: "See the Control Tower",
    href: "/platform/control-tower",
    Mock: ControlTowerMock,
  },
  {
    label: "Bookings & LR",
    desc: "The Lorry Receipt runs the movement, so Optimile gives it a proper record: its own number series, sub-hire legs, freight terms and chargeable-weight rules.",
    cta: "See Bookings & LR",
    href: "/platform/tms",
    Mock: BookingLRMock,
  },
  {
    label: "Reverse Auctions",
    desc: "Post a lane to your approved carriers and let them bid it down. Carriers see their own rank, not each other's prices, and every bid stays on the record.",
    cta: "See Auctions",
    href: "/platform/tms",
    Mock: AuctionMock,
  },
  {
    label: "Finance & Settlement",
    desc: "Optimile checks every invoice against the contract, the route and the POD, then flags the gaps before you pay. Most teams recover 5–8% of freight spend.",
    cta: "See Settlement",
    href: "/platform/freight-audit",
    Mock: SettlementMock,
  },
];

export function Platform() {
  const [active, setActive] = React.useState(0);
  const Active = domains[active].Mock;

  return (
    <section className="py-20 md:py-28">
      <Container>
        {/* 2-col header */}
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Platform</span>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(32px,4.6vw,56px)] font-medium leading-[1.02] tracking-[-0.03em]">
              One system for the whole movement.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink-soft md:pb-2">
            Optimile runs on top of your ERP, so there is no migration. Each module
            handles a real part of how freight moves in India, starting with the
            Lorry Receipt.
          </p>
        </div>

        {/* list + mock */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="flex flex-col">
            {domains.map((d, i) => (
              <div
                key={d.label}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "cursor-pointer border-l-2 py-5 pl-6 transition-colors duration-200",
                  i === active ? "border-accent" : "border-line hover:border-line-strong"
                )}
              >
                <div
                  className={cn(
                    "text-[19px] font-semibold tracking-[-0.01em] transition-colors",
                    i === active ? "text-ink" : "text-ink-faint"
                  )}
                >
                  {d.label}
                </div>
                {i === active && (
                  <>
                    <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-ink-soft">{d.desc}</p>
                    <Link
                      href={d.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent"
                    >
                      {d.cta}
                      <ArrowRight size={14} />
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[16px] border border-line bg-surface-2/50 p-6 md:p-8">
            <div key={active} className="mock-in">
              <Active />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
