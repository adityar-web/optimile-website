import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Control Tower", href: "/platform/control-tower" },
      { label: "Transport (TMS)", href: "/platform/tms" },
      { label: "Fleet (FMS)", href: "/platform/fms" },
      { label: "Freight Audit", href: "/platform/freight-audit" },
      { label: "The AI Layer", href: "/platform/ai" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Shippers", href: "/solutions/shippers" },
      { label: "For Carriers & 3PLs", href: "/solutions/carriers" },
      { label: "Industries", href: "/industries" },
      { label: "Customers", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center" aria-label="Optimile home">
              <Image
                src="/brand/optimile-wordmark.png"
                alt="Optimile"
                width={512}
                height={180}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
              The operating system for intelligent freight — automating the
              lifecycle from PO to POD across India&rsquo;s supply chains.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {col.title}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} Optimile. Backed by Turbostart.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <Link href="/security" className="hover:text-ink">Security</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
