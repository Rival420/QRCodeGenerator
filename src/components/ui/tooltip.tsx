import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  /** The tooltip text to display on hover. */
  content: string;
  /** The element that triggers the tooltip. */
  children: React.ReactNode;
  /** Additional classes for the wrapper. */
  className?: string;
}

/** Simple CSS-only tooltip that appears on hover. */
function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <div className={cn("group relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
      >
        {content}
      </span>
    </div>
  );
}

export { Tooltip };
