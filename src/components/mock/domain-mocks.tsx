/* Hand-built light mockups from real freight data — used in the Platform section.
   Composited floating cards, crisp corners, iris accents. No screenshots. */

const card =
  "rounded-[10px] border border-line bg-surface shadow-card";
const chip =
  "rounded-[8px] border border-line bg-surface px-3 py-2 text-[12px] shadow-soft";

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 70" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-iris-500)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-iris-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,52 L26,46 L52,50 L78,34 L104,40 L130,24 L156,30 L182,18 L208,26 L234,14 L260,20 L260,70 L0,70 Z"
        fill="url(#sparkFill)"
      />
      <path
        d="M0,52 L26,46 L52,50 L78,34 L104,40 L130,24 L156,30 L182,18 L208,26 L234,14 L260,20"
        fill="none"
        stroke="var(--color-iris-500)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* 1 — Control Tower / Visibility */
export function ControlTowerMock() {
  const tiles = [
    { l: "In transit", v: "189", c: "text-ink" },
    { l: "At loading", v: "22", c: "text-ink" },
    { l: "Exceptions", v: "0", c: "text-ok" },
  ];
  return (
    <div className="relative pb-8 pr-6">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <span className="size-2 rounded-full bg-ok" />
            Operations Control Tower
          </div>
          <span className="font-mono text-[11px] text-ink-faint tabular">10:34</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {tiles.map((t) => (
            <div key={t.l} className="rounded-[8px] bg-surface-2 px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">{t.l}</div>
              <div className={`mt-1 font-mono text-[22px] font-semibold tabular ${t.c}`}>{t.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] text-ink-soft">
            <span>On-time delivery</span>
            <span className="font-mono text-ink tabular">94.2%</span>
          </div>
          <Spark className="h-16 w-full" />
        </div>
      </div>
      <div className={`${chip} absolute bottom-0 right-0 flex items-center gap-2`}>
        <span className="size-1.5 rounded-full bg-ok" />
        <span className="text-ink-soft">Vehicle WD72HT7394 back on route</span>
      </div>
    </div>
  );
}

/* 2 — Reverse Auctions */
export function AuctionMock() {
  const ranks = [
    { r: "1", you: false, p: "•••••" },
    { r: "2", you: true, p: "₹48,500" },
    { r: "3", you: false, p: "•••••" },
  ];
  return (
    <div className="relative pb-8 pr-6">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">Mumbai → Delhi · 32T FTL</div>
          <span className="rounded-full bg-danger-soft px-2 py-0.5 font-mono text-[11px] text-danger tabular">
            02:41
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {ranks.map((row) => (
            <div
              key={row.r}
              className={`flex items-center justify-between rounded-[8px] px-3 py-2.5 text-[13px] ${
                row.you ? "bg-accent-solid/10 ring-1 ring-inset ring-accent-solid/30" : "bg-surface-2"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-ink-faint">#{row.r}</span>
                <span className={row.you ? "font-semibold text-accent" : "text-ink-soft"}>
                  {row.you ? "Your bid" : "Carrier"}
                </span>
              </span>
              <span className={`font-mono tabular ${row.you ? "text-ink" : "text-ink-faint"}`}>{row.p}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 rounded-[8px] border border-line px-3 py-2 font-mono text-[13px] text-ink-faint tabular">
            ₹ 47,900
          </div>
          <button className="rounded-[8px] bg-cta px-4 py-2 text-[13px] font-semibold text-cta-ink">
            Lower bid
          </button>
        </div>
      </div>
      <div className={`${chip} absolute bottom-0 right-0`}>Anti-sniping · window +2:00</div>
    </div>
  );
}

/* 3 — Bookings & LR */
export function BookingLRMock() {
  const chain = [
    { k: "Booking", done: true },
    { k: "LR", done: true },
    { k: "Invoice", done: true },
    { k: "E-way", done: true },
    { k: "POD", done: false },
  ];
  return (
    <div className="relative pb-8 pr-6">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">Lorry Receipt</div>
          <span className="font-mono text-[12px] text-ink-faint">MH04 / 0007421</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-3 text-[12px]">
          <div>
            <div className="text-ink-faint">Consignor</div>
            <div className="mt-0.5 text-ink">Bharat Steel Ltd</div>
          </div>
          <div>
            <div className="text-ink-faint">Consignee</div>
            <div className="mt-0.5 text-ink">Nagpur Distributors</div>
          </div>
          <div>
            <div className="text-ink-faint">Freight term</div>
            <div className="mt-0.5 font-mono text-ink">To-Pay</div>
          </div>
          <div>
            <div className="text-ink-faint">Chargeable wt</div>
            <div className="mt-0.5 font-mono text-ink tabular">9,250 kg</div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {chain.map((c) => (
            <span
              key={c.k}
              className={`rounded-[6px] px-2 py-1 font-mono text-[11px] ${
                c.done ? "bg-ok-soft text-ok" : "bg-surface-2 text-ink-faint"
              }`}
            >
              {c.k}
            </span>
          ))}
        </div>
      </div>
      <div className={`${chip} absolute bottom-0 right-0 flex items-center gap-2`}>
        <span className="size-1.5 rounded-full bg-ok" />
        E-way bill generated
      </div>
    </div>
  );
}

/* Operator's reality — one consolidated movement record */
export function MovementRecordMock() {
  const rows = [
    { l: "Vehicle", v: "MH04 · SIM tracked", ok: true },
    { l: "Lorry Receipt", v: "0007421", ok: true },
    { l: "POD", v: "Pending", ok: false },
    { l: "Invoice", v: "Matched to contract", ok: true },
  ];
  return (
    <div className="relative pb-8 pr-6">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">Movement · Mumbai → Nagpur</div>
          <span className="rounded-full bg-accent-solid/10 px-2 py-0.5 font-mono text-[11px] text-accent">
            In transit
          </span>
        </div>
        <div className="mt-4 flex flex-col divide-y divide-line">
          {rows.map((r) => (
            <div key={r.l} className="flex items-center justify-between py-2.5 text-[13px]">
              <span className="text-ink-faint">{r.l}</span>
              <span className="flex items-center gap-2">
                <span className={`font-mono ${r.ok ? "text-ink" : "text-warn"}`}>{r.v}</span>
                <span className={`size-1.5 rounded-full ${r.ok ? "bg-ok" : "bg-warn"}`} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={`${chip} absolute bottom-0 right-0 flex items-center gap-2`}>
        <span className="size-1.5 rounded-full bg-accent-solid" />
        One record · no parallel book
      </div>
    </div>
  );
}

/* Intelligence — cognitive routing */
export function RoutingMock() {
  const routes = [
    { k: "Fastest", t: "26h", p: "₹52,400", sel: false },
    { k: "Balanced", t: "28h", p: "₹48,500", sel: true },
    { k: "Cheapest", t: "34h", p: "₹44,900", sel: false },
  ];
  return (
    <div className={`${card} p-6`}>
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold">Mumbai → Delhi · 32T</div>
        <span className="font-mono text-[11px] text-ink-faint">route options</span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {routes.map((r) => (
          <div
            key={r.k}
            className={`flex items-center justify-between rounded-[8px] px-3 py-2.5 text-[13px] ${
              r.sel ? "bg-accent-solid/10 ring-1 ring-inset ring-accent-solid/30" : "bg-surface-2"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={r.sel ? "font-semibold text-accent" : "text-ink-soft"}>{r.k}</span>
              {r.sel && (
                <span className="rounded-full bg-accent-solid/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  Chosen
                </span>
              )}
            </span>
            <span className="flex items-center gap-3 font-mono tabular text-ink-faint">
              <span>{r.t}</span>
              <span className={r.sel ? "text-ink" : ""}>{r.p}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Intelligence — anomaly detection */
export function AnomalyMock() {
  const rows = [
    { id: "INV-88231", s: "Matched to contract", tag: "OK", tone: "ok" },
    { id: "INV-88240", s: "Detention mismatch +₹4,200", tag: "Flagged", tone: "warn" },
    { id: "INV-88255", s: "Rate above contract +₹7,100", tag: "Blocked", tone: "danger" },
  ];
  return (
    <div className={`${card} p-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="size-2 rounded-full bg-ok" />
          Invoice checks
        </div>
        <span className="font-mono text-[11px] text-ink-faint">live</span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {rows.map((r) => {
          const tone =
            r.tone === "ok"
              ? "bg-ok-soft text-ok"
              : r.tone === "warn"
                ? "bg-warn-soft text-warn"
                : "bg-danger-soft text-danger";
          const dot =
            r.tone === "ok" ? "bg-ok" : r.tone === "warn" ? "bg-warn" : "bg-danger";
          return (
            <div key={r.id} className="flex items-center justify-between rounded-[8px] bg-surface-2 px-3 py-2.5">
              <span className="flex items-center gap-2.5">
                <span className={`size-1.5 rounded-full ${dot}`} />
                <span className="text-[13px]">
                  <span className="font-mono text-ink">{r.id}</span>
                  <span className="ml-2 text-ink-faint">{r.s}</span>
                </span>
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone}`}>{r.tag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Intelligence — predictive exceptions */
export function PredictiveMock() {
  return (
    <div className={`${card} p-6`}>
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold">Lane risk · next 48h</div>
        <span className="rounded-full bg-warn-soft px-2 py-0.5 font-mono text-[11px] text-warn">High</span>
      </div>
      <div className="mt-4">
        <div className="text-[13px] font-semibold">Nagpur → Hyderabad</div>
        <div className="mt-0.5 text-[12px] text-ink-faint">Heavy rain forecast on NH44</div>
      </div>
      <Spark className="mt-3 h-12 w-full" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[8px] bg-surface-2 px-3 py-2">
          <div className="text-[10px] uppercase tracking-wide text-ink-faint">Predicted delay</div>
          <div className="font-mono text-[16px] font-semibold tabular text-ink">+8h</div>
        </div>
        <div className="rounded-[8px] bg-surface-2 px-3 py-2">
          <div className="text-[10px] uppercase tracking-wide text-ink-faint">Cost impact</div>
          <div className="font-mono text-[16px] font-semibold tabular text-ink">₹3,400</div>
        </div>
      </div>
    </div>
  );
}

/* Intelligence layer — conversational control (Navigator) */
export function NavigatorMock() {
  const actions = [
    { l: "Reroute via Surat", d: "+₹1,900 · saves 6h", good: true },
    { l: "Hold and consolidate", d: "−₹3,200 · +1 day", good: false },
  ];
  return (
    <div className="relative pb-8 pr-6">
      <div className={`${card} p-6`}>
        <div className="rounded-[8px] border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink-soft">
          <span className="mr-2 font-mono text-accent">›</span>
          Find at-risk shipments and the re-routing cost
        </div>
        <div className="mt-4 text-[13px] font-semibold">3 shipments at risk on the Delhi lane</div>
        <div className="mt-3 flex flex-col gap-2">
          {actions.map((a) => (
            <div key={a.l} className="flex items-center justify-between rounded-[8px] bg-surface-2 px-3 py-2.5">
              <span className="text-[13px]">{a.l}</span>
              <span className="flex items-center gap-3">
                <span className={`font-mono text-[12px] tabular ${a.good ? "text-ok" : "text-ink-faint"}`}>
                  {a.d}
                </span>
                <span className="rounded-[6px] border border-line px-2 py-1 text-[11px] font-semibold text-accent">
                  Apply
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={`${chip} absolute bottom-0 right-0`}>Reasoned over 189 live trips</div>
    </div>
  );
}

/* 4 — Finance & Settlement */
export function SettlementMock() {
  const lines = [
    { l: "Base freight", v: "₹48,500", ok: true },
    { l: "Detention (2 days)", v: "+₹4,200", ok: false },
    { l: "Fuel surcharge", v: "₹1,900", ok: true },
  ];
  return (
    <div className="relative pb-8 pr-6">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">Invoice INV-88231</div>
          <span className="font-mono text-[11px] text-ink-faint">vs contract + POD</span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {lines.map((row) => (
            <div key={row.l} className="flex items-center justify-between rounded-[8px] bg-surface-2 px-3 py-2.5 text-[13px]">
              <span className="flex items-center gap-2">
                <span className={`size-1.5 rounded-full ${row.ok ? "bg-ok" : "bg-danger"}`} />
                <span className="text-ink-soft">{row.l}</span>
              </span>
              <span className={`font-mono tabular ${row.ok ? "text-ink" : "text-danger"}`}>{row.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[12px]">
          <span className="text-ink-soft">Flagged before close</span>
          <span className="font-mono font-semibold text-ink tabular">₹4,200 recovered</span>
        </div>
      </div>
      <div className={`${chip} absolute bottom-0 right-0 flex items-center gap-2`}>
        <span className="size-1.5 rounded-full bg-danger" />
        Detention mismatch flagged
      </div>
    </div>
  );
}
