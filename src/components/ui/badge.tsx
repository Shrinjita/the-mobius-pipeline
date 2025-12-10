import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Möbius confidence badges
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        risk: "border-transparent bg-risk text-risk-foreground",
        // Agent type badges
        literature: "border-transparent bg-secondary text-secondary-foreground",
        clinical: "border-transparent bg-accent text-accent-foreground",
        patent: "border-primary/20 bg-primary/10 text-primary",
        bioactivity: "border-transparent bg-success/10 text-success",
        safety: "border-transparent bg-warning/10 text-warning",
        // Status badges
        active: "border-success bg-success/10 text-success animate-pulse",
        pending: "border-warning bg-warning/10 text-warning",
        complete: "border-success bg-success/10 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
