import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        // Attio-style near-black (inverts in dark) — the primary CTA
        primary:
          "bg-cta text-cta-ink shadow-soft hover:bg-cta-hover hover:shadow-card",
        // Brand iris — used sparingly for a colored emphasis
        accent:
          "bg-accent-solid text-white shadow-[0_8px_22px_-12px_var(--color-iris-500)] hover:bg-iris-600",
        secondary:
          "bg-surface text-ink border border-line-strong hover:border-ink-soft",
        ghost: "bg-transparent text-ink-soft hover:text-ink",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-[18px] text-[14.5px]",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
