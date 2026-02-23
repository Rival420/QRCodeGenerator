/**
 * SizeSlider Component.
 *
 * Range slider for controlling the QR code output dimensions.
 */

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MIN_QR_SIZE, MAX_QR_SIZE } from "@/config/constants";

interface SizeSliderProps {
  /** Current size in pixels. */
  value: number;
  /** Callback when size changes. */
  onChange: (size: number) => void;
}

/** Slider for QR code output dimensions with live value display. */
export function SizeSlider({ value, onChange }: SizeSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="qr-size">Uitvoergrootte</Label>
        <span className="text-sm text-muted-foreground font-mono">
          {value} x {value}px
        </span>
      </div>
      <Slider
        id="qr-size"
        min={MIN_QR_SIZE}
        max={MAX_QR_SIZE}
        step={50}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{MIN_QR_SIZE}px</span>
        <span>{MAX_QR_SIZE}px</span>
      </div>
    </div>
  );
}
