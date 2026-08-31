import { cn } from "@/lib/utils";

/**
 * The "intelligence" signature — a glassy iris orb with orbiting shards.
 * Decorative; rendered behind hero/AI content. Ambient drift respects
 * prefers-reduced-motion (handled in globals.css).
 */
export function IntelligenceMotif({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      {/* ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(99,85,238,0.32), rgba(37,99,235,0.10) 40%, transparent 68%)",
        }}
      />

      {/* orbit ring */}
      <div
        className="drift-slow absolute left-1/2 top-1/2 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: "1px solid rgba(99,85,238,0.18)" }}
      />

      {/* the orb */}
      <div
        className="drift absolute left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 26%, #ffffff 0%, #d7d2fb 16%, #8f86f5 50%, #5a49e6 82%, #3a2c9e 100%)",
          boxShadow:
            "0 50px 110px -40px rgba(99,85,238,0.65), inset 0 -26px 60px rgba(47,38,124,0.45), inset 14px 16px 44px rgba(255,255,255,0.35)",
        }}
      >
        {/* specular highlight */}
        <div
          className="absolute left-[20%] top-[14%] size-[26%] rounded-full blur-md"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)" }}
        />
        {/* rim light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "inset -8px -6px 22px rgba(159,152,247,0.55)" }}
        />
      </div>

      {/* glass shards */}
      <div
        className="drift-slow absolute left-[8%] top-[24%] h-[16%] w-[42%] -rotate-[24deg] rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(159,152,247,0.12))",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 24px 50px -24px rgba(99,85,238,0.5)",
          backdropFilter: "blur(2px)",
        }}
      />
      <div
        className="drift absolute right-[6%] top-[46%] h-[13%] w-[36%] rotate-[18deg] rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(128,120,243,0.10))",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: "0 24px 50px -24px rgba(99,85,238,0.45)",
          backdropFilter: "blur(2px)",
        }}
      />
    </div>
  );
}
