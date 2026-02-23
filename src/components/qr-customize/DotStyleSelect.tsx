/**
 * DotStyleSelect Component.
 *
 * Dropdown for selecting the QR code dot (module) shape.
 */

import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { DotType } from "@/types/qr";

/** All available dot types with human-readable labels. */
const DOT_TYPE_OPTIONS: { value: DotType; label: string }[] = [
  { value: "square", label: "Vierkant" },
  { value: "rounded", label: "Afgerond" },
  { value: "dots", label: "Punten" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy afgerond" },
  { value: "extra-rounded", label: "Extra afgerond" },
];

interface DotStyleSelectProps {
  /** Currently selected dot type. */
  value: DotType;
  /** Callback when a new dot type is selected. */
  onChange: (type: DotType) => void;
}

/** Dropdown selector for QR code dot shapes. */
export function DotStyleSelect({ value, onChange }: DotStyleSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="dot-style">Puntstijl</Label>
      <Select
        id="dot-style"
        value={value}
        onChange={(e) => onChange(e.target.value as DotType)}
        options={DOT_TYPE_OPTIONS}
      />
    </div>
  );
}
