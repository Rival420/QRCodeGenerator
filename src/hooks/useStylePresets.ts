/**
 * Hook: useStylePresets
 *
 * Manages preset selection and merging with user customizations.
 * When a preset is selected, its options are merged on top of defaults.
 * User customizations are then layered on top of the preset.
 */

import type React from "react";
import { useState, useMemo, useCallback } from "react";
import type { QRGeneratorOptions } from "@/types/qr";
import type { QRStylePreset } from "@/types/styles";
import { STYLE_PRESETS } from "@/config/presets";
import { DEFAULT_QR_OPTIONS } from "@/config/defaults";

interface UseStylePresetsReturn {
  /** All available presets. */
  presets: QRStylePreset[];
  /** ID of the currently selected preset. */
  selectedPresetId: string;
  /** Select a preset by ID. Resets custom overrides. */
  selectPreset: (id: string) => void;
  /** User's custom overrides on top of the selected preset. */
  customOverrides: Partial<QRGeneratorOptions>;
  /** Update a custom override value. Accepts direct value or updater function. */
  setCustomOverrides: React.Dispatch<React.SetStateAction<Partial<QRGeneratorOptions>>>;
  /** Merged options: defaults + preset + custom overrides. Ready for QR generation. */
  mergedOptions: QRGeneratorOptions;
  /** Build merged options for a specific preset (used for preview grid). */
  getOptionsForPreset: (presetId: string, data: string, image?: string) => QRGeneratorOptions;
}

/**
 * Deep merges QR options objects. Only goes one level deep into known
 * sub-objects (dotsOptions, cornersSquareOptions, etc.).
 */
function mergeQROptions(
  base: QRGeneratorOptions,
  overrides: Partial<QRGeneratorOptions>,
): QRGeneratorOptions {
  return {
    ...base,
    ...overrides,
    dotsOptions: { ...base.dotsOptions, ...overrides.dotsOptions },
    cornersSquareOptions: { ...base.cornersSquareOptions, ...overrides.cornersSquareOptions },
    cornersDotOptions: { ...base.cornersDotOptions, ...overrides.cornersDotOptions },
    backgroundOptions: { ...base.backgroundOptions, ...overrides.backgroundOptions },
    imageOptions: { ...base.imageOptions, ...overrides.imageOptions },
    qrOptions: { ...base.qrOptions, ...overrides.qrOptions },
  };
}

/**
 * Manages preset selection and configuration merging.
 *
 * @param data - The current text/URL to encode
 * @param image - The current logo data URL
 * @returns Preset state, selection handler, and merged options
 */
export function useStylePresets(
  data: string,
  image?: string,
): UseStylePresetsReturn {
  const [selectedPresetId, setSelectedPresetId] = useState(STYLE_PRESETS[0].id);
  const [customOverrides, setCustomOverrides] = useState<Partial<QRGeneratorOptions>>({});

  const selectPreset = useCallback((id: string) => {
    setSelectedPresetId(id);
    setCustomOverrides({}); // Reset customizations when switching presets
  }, []);

  const selectedPreset = useMemo(
    () => STYLE_PRESETS.find((p) => p.id === selectedPresetId) ?? STYLE_PRESETS[0],
    [selectedPresetId],
  );

  const mergedOptions = useMemo(() => {
    // Layer 1: defaults
    // Layer 2: selected preset overrides
    // Layer 3: user custom overrides
    // Layer 4: current data + image
    const withPreset = mergeQROptions(DEFAULT_QR_OPTIONS, selectedPreset.options);
    const withCustom = mergeQROptions(withPreset, customOverrides);
    return { ...withCustom, data, image };
  }, [selectedPreset, customOverrides, data, image]);

  const getOptionsForPreset = useCallback(
    (presetId: string, presetData: string, presetImage?: string): QRGeneratorOptions => {
      const preset = STYLE_PRESETS.find((p) => p.id === presetId) ?? STYLE_PRESETS[0];
      const options = mergeQROptions(DEFAULT_QR_OPTIONS, preset.options);
      return { ...options, data: presetData, image: presetImage };
    },
    [],
  );

  return {
    presets: STYLE_PRESETS,
    selectedPresetId,
    selectPreset,
    customOverrides,
    setCustomOverrides,
    mergedOptions,
    getOptionsForPreset,
  };
}
