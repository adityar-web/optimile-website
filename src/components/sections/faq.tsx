"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does Optimile integrate with existing ERPs?",
    a: "Optimile is API-first and integrates with SAP, Oracle, Microsoft Dynamics and custom ERPs to sync purchase orders and invoices in real time.",
  },
  {
    q: "Does Optimile replace my existing TMS?",
    a: "No. Optimile can be your primary TMS or layer on top of your existing system — improving routing, visibility, POD collection and freight settlement without a migration.",
  },
  {
    q: "Can Optimile track market vehicles without GPS installed?",
    a: "Yes. Optimile uses SIM-based tracking (with driver consent) and smartphone triangulation to track ad-hoc market vehicles.",
  },
  {
    q: "How quickly can Optimile be implemented?",
    a: "Most teams go live in phases within 4–8 weeks. Optimile connects to your ERP via APIs, configures workflows per business unit, and onboards vendors and drivers with minimal disruption.",
  },
  {
    q: "How does Optimile reduce freight billing errors?",
    a: "Optimile validates invoices against contract rules, route data, timestamps and POD evidence — flagging incorrect rates, detention mismatches and missing documents before month-end.",
  },
  {
    q: "Is Optimile compliant with enterprise security standards?",
    a: "Yes. Optimile uses encrypted data pipelines, role-based access control, audit logs and secure ERP integrations that meet enterprise-grade requirements.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[16.5px] font-semibold tracking-[-0.01em]">{q}</span>
        <Plus
          size={18}
          className={cn(
            "shrink-0 text-ink-faint transition-transform duration-300 ease-[var(--ease-out-expo)]",
            open && "rotate-45"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-[var(--ease-out-expo)]",
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-[820px]">
        <SectionHeading eyebrow="FAQ" title="The questions we get asked most." />
        <div className="mt-10">
          {faqs.map((f) => (
            <Item key={f.q} {...f} />
          ))}
        </div>
      </Container>
    </section>
  );
}
