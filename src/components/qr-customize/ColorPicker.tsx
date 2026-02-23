/**
 * ColorPicker Component.
 *
 * A labeled color input using the browser's native color picker.
 * Single responsibility: pick a color, emit the value.
 */

import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  /** Label displayed above the picker. */
  label: string;
  /** Current color value (hex). */
  value: string;
  /** Callback when color changes. */
  onChange: (color: string) => void;
  /** Unique identifier for accessibility. */
  id: string;
}

/** Native color input with label. */
export function ColorPicker({ label, value, onChange, id }: ColorPickerProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded border border-input p-0.5"
        />
        <span className="text-sm text-muted-foreground font-mono uppercase">
          {value}
        </span>
      </div>
    </div>
  );
}
