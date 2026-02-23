/**
 * PresetCard Component.
 *
 * Displays a single style preset as a small QR code preview with
 * a label and selection highlight. Clicking selects the preset.
 */

import { QRCodeCanvas } from "./QRCodeCanvas";
import type { QRGeneratorOptions } from "@/types/qr";
import type { QRStylePreset } from "@/types/styles";
import { PRESET_PREVIEW_SIZE } from "@/config/constants";
import { cn } from "@/lib/utils";

interface PresetCardProps {
  /** The preset to display. */
  preset: QRStylePreset;
  /** Merged options for this preset (with current data/image). */
  options: QRGeneratorOptions;
  /** Whether this preset is currently selected. */
  isSelected: boolean;
  /** Callback when this preset is clicked. */
  onSelect: (id: string) => void;
}

/** Small QR code preview card for a single style preset. */
export function PresetCard({ preset, options, isSelected, onSelect }: PresetCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(preset.id)}
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all cursor-pointer hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/30",
      )}
    >
      <QRCodeCanvas
        options={options}
        size={PRESET_PREVIEW_SIZE}
        className="pointer-events-none"
      />
      <div className="text-center">
        <p className="text-sm font-medium">{preset.name}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {preset.description}
        </p>
      </div>
    </button>
  );
}
