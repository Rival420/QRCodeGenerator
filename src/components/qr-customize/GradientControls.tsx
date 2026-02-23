/**
 * GradientControls Component.
 *
 * Toggle gradient on/off, pick two colors, and choose linear vs radial.
 * Only affects the dot (module) fill — corner gradients use the same
 * colors for consistency.
 */

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { GradientConfig, GradientType } from "@/types/qr";

/** Gradient type options. */
const GRADIENT_TYPE_OPTIONS: { value: GradientType; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
];

interface GradientControlsProps {
  /** Whether gradient is enabled. */
  enabled: boolean;
  /** Current gradient config (if enabled). */
  gradient: GradientConfig | undefined;
  /** Callback to toggle gradient on/off. */
  onToggle: (enabled: boolean) => void;
  /** Callback when gradient config changes. */
  onChange: (gradient: GradientConfig) => void;
}

/** Controls for enabling and configuring gradient fills on QR dots. */
export function GradientControls({
  enabled,
  gradient,
  onToggle,
  onChange,
}: GradientControlsProps) {
  const currentGradient: GradientConfig = gradient ?? {
    type: "linear",
    rotation: Math.PI / 4,
    colorStops: [
      { offset: 0, color: "#000000" },
      { offset: 1, color: "#555555" },
    ],
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="gradient-toggle"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="h-4 w-4 rounded border-input accent-primary cursor-pointer"
        />
        <Label htmlFor="gradient-toggle">Use Gradient</Label>
      </div>

      {enabled && (
        <div className="space-y-3 pl-6 border-l-2 border-border">
          <Select
            value={currentGradient.type}
            onChange={(e) =>
              onChange({ ...currentGradient, type: e.target.value as GradientType })
            }
            options={GRADIENT_TYPE_OPTIONS}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="grad-start">Start Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="grad-start"
                  value={currentGradient.colorStops[0]?.color ?? "#000000"}
                  onChange={(e) =>
                    onChange({
                      ...currentGradient,
                      colorStops: [
                        { offset: 0, color: e.target.value },
                        currentGradient.colorStops[1] ?? { offset: 1, color: "#555555" },
                      ],
                    })
                  }
                  className="h-8 w-8 cursor-pointer rounded border border-input p-0.5"
                />
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {currentGradient.colorStops[0]?.color}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="grad-end">End Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="grad-end"
                  value={currentGradient.colorStops[1]?.color ?? "#555555"}
                  onChange={(e) =>
                    onChange({
                      ...currentGradient,
                      colorStops: [
                        currentGradient.colorStops[0] ?? { offset: 0, color: "#000000" },
                        { offset: 1, color: e.target.value },
                      ],
                    })
                  }
                  className="h-8 w-8 cursor-pointer rounded border border-input p-0.5"
                />
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {currentGradient.colorStops[1]?.color}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
