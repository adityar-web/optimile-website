import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard section header — two columns: H2 title on the left, supporting
 * body on the right. Visuals go below this. (Hero is the only exception.)
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 md:items-end md:gap-16", className)}>
      <div>
        {eyebrow && (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-4 max-w-[18ch] text-[clamp(32px,4.6vw,56px)] font-medium leading-[1.02] tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-[54ch] font-sans text-[17px] leading-[1.6] text-ink-soft md:pb-2">
          {description}
        </p>
      )}
    </div>
  );
}
