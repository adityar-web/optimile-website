"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MenuItem = { label: string; desc: string; href: string };

const platform: MenuItem[] = [
  { label: "Platform overview", desc: "The intelligence layer over your ERP", href: "/platform" },
  { label: "Control Tower", desc: "GPS, SIM & FASTag in one glass pane", href: "/platform/control-tower" },
  { label: "Transport (TMS)", desc: "Indent, auctions, freight audit", href: "/platform/tms" },
  { label: "Fleet (FMS)", desc: "eDVIR, compliance wallet, uptime", href: "/platform/fms" },
  { label: "Freight Audit", desc: "Recover 5–8% of freight spend", href: "/platform/freight-audit" },
  { label: "Yard & Railyard", desc: "OCR & ANPR gate automation", href: "/platform/yard" },
  { label: "The AI Layer", desc: "The 7 pillars of autonomous logistics", href: "/platform/ai" },
  { label: "Integrations", desc: "SAP, Oracle, Dynamics & more", href: "/integrations" },
];

const solutions: MenuItem[] = [
  { label: "For Shippers", desc: "Plan, track and settle every load", href: "/solutions/shippers" },
  { label: "For Carriers & 3PLs", desc: "Win freight and scale without chaos", href: "/solutions/carriers" },
  { label: "By Industry", desc: "Pharma, automotive, FMCG & 10 more", href: "/industries" },
];

function Dropdown({
  label,
  items,
  open,
  onToggle,
  wide,
}: {
  label: string;
  items: MenuItem[];
  open: boolean;
  onToggle: () => void;
  wide?: boolean;
}) {
  return (
    <div className="relative" onMouseLeave={() => open && onToggle()}>
      <button
        onMouseEnter={() => !open && onToggle()}
        onClick={onToggle}
        className="flex items-center gap-1 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 pt-2",
            wide ? "w-[560px]" : "w-[320px]"
          )}
        >
          <div
            className={cn(
              "grid gap-1 rounded-xl border border-line bg-surface p-2 shadow-card",
              wide ? "grid-cols-2" : "grid-cols-1"
            )}
          >
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
              >
                <div className="text-sm font-semibold">{it.label}</div>
                <div className="mt-0.5 text-[13px] leading-snug text-ink-faint">
                  {it.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggle = (name: string) =>
    setOpenMenu((cur) => (cur === name ? null : name));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/80 backdrop-blur-lg">
      <Container className="flex h-15 items-center gap-6 py-3">
        <Link href="/" className="flex items-center" aria-label="Optimile home">
          <Image
            src="/brand/optimile-wordmark.png"
            alt="Optimile"
            width={512}
            height={180}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <Dropdown
            label="Platform"
            items={platform}
            wide
            open={openMenu === "platform"}
            onToggle={() => toggle("platform")}
          />
          <Dropdown
            label="Solutions"
            items={solutions}
            open={openMenu === "solutions"}
            onToggle={() => toggle("solutions")}
          />
          <Link href="/customers" className="py-2 text-sm text-ink-soft transition-colors hover:text-ink">
            Customers
          </Link>
          <Link href="/blog" className="py-2 text-sm text-ink-soft transition-colors hover:text-ink">
            Resources
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            Request demo
          </Button>
          <button
            className="grid size-9 place-items-center rounded-md border border-line text-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-line bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[...platform.slice(0, 1), ...solutions].map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
                onClick={() => setMobileOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            <Link href="/customers" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-surface-2">
              Customers
            </Link>
            <Button className="mt-3">Request demo</Button>
          </Container>
        </div>
      )}
    </header>
  );
}
