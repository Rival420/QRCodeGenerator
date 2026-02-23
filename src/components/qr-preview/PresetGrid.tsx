/**
 * PresetGrid Component.
 *
 * Displays all style presets in a responsive grid.
 * Each preset shows a small QR code preview that the user can click to select.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PresetCard } from "./PresetCard";
import type { QRGeneratorOptions } from "@/types/qr";
import type { QRStylePreset } from "@/types/styles";

interface PresetGridProps {
  /** All available presets. */
  presets: QRStylePreset[];
  /** ID of the currently selected preset. */
  selectedPresetId: string;
  /** Callback when a preset is selected. */
  onSelectPreset: (id: string) => void;
  /** Function to get merged options for a specific preset. */
  getOptionsForPreset: (presetId: string, data: string, image?: string) => QRGeneratorOptions;
  /** Current QR data text. */
  data: string;
  /** Current logo data URL. */
  image?: string;
}

/** Responsive grid of all style preset previews. */
export function PresetGrid({
  presets,
  selectedPresetId,
  onSelectPreset,
  getOptionsForPreset,
  data,
  image,
}: PresetGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Style Presets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {presets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              options={getOptionsForPreset(preset.id, data, image)}
              isSelected={preset.id === selectedPresetId}
              onSelect={onSelectPreset}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
