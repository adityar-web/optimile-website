import * as React from "react";
import { cn } from "@/lib/utils";

/** Page container — max-width 1120px, responsive gutters. */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1120px] px-6", className)}
      {...props}
    />
  );
}
