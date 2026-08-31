import Image from "next/image";
import { cn } from "@/lib/utils";

/** A browser-style window frame around a product screenshot. */
export function ProductFrame({
  src,
  alt,
  width,
  height,
  priority,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface shadow-card",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-ink-faint/40" />
        <span className="size-2.5 rounded-full bg-ink-faint/40" />
        <span className="size-2.5 rounded-full bg-ink-faint/40" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 900px) 100vw, 900px"
        className="h-auto w-full"
      />
    </div>
  );
}
