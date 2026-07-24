import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500 shadow-sm hover:shadow-md border border-blue-700/40 dark:border-indigo-500/30",
        secondary:
          "border border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100 hover:border-slate-400 dark:border-white/12 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] shadow-sm",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.07] dark:hover:text-white font-bold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { buttonVariants };
