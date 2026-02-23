import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Minimum slider value. */
  min?: number;
  /** Maximum slider value. */
  max?: number;
  /** Step increment. */
  step?: number;
}

/** Range slider input styled with accent color. */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        className={cn(
          "w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary",
          className,
        )}
        {...props}
      />
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
