/**
 * CornerStyleSelect Component.
 *
 * Dropdowns for selecting corner square and corner dot shapes.
 */

import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { CornerSquareType, CornerDotType } from "@/types/qr";

/** Corner square shape options. */
const CORNER_SQUARE_OPTIONS: { value: CornerSquareType; label: string }[] = [
  { value: "square", label: "Vierkant" },
  { value: "dot", label: "Punt" },
  { value: "extra-rounded", label: "Extra afgerond" },
];

/** Corner dot shape options. */
const CORNER_DOT_OPTIONS: { value: CornerDotType; label: string }[] = [
  { value: "square", label: "Vierkant" },
  { value: "dot", label: "Punt" },
];

interface CornerStyleSelectProps {
  /** Current corner square type. */
  cornerSquareType: CornerSquareType;
  /** Current corner dot type. */
  cornerDotType: CornerDotType;
  /** Callback when corner square type changes. */
  onCornerSquareChange: (type: CornerSquareType) => void;
  /** Callback when corner dot type changes. */
  onCornerDotChange: (type: CornerDotType) => void;
}

/** Paired dropdowns for corner square and corner dot shapes. */
export function CornerStyleSelect({
  cornerSquareType,
  cornerDotType,
  onCornerSquareChange,
  onCornerDotChange,
}: CornerStyleSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="corner-square">Hoekkader</Label>
        <Select
          id="corner-square"
          value={cornerSquareType}
          onChange={(e) => onCornerSquareChange(e.target.value as CornerSquareType)}
          options={CORNER_SQUARE_OPTIONS}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="corner-dot">Hoekpunt</Label>
        <Select
          id="corner-dot"
          value={cornerDotType}
          onChange={(e) => onCornerDotChange(e.target.value as CornerDotType)}
          options={CORNER_DOT_OPTIONS}
        />
      </div>
    </div>
  );
}
