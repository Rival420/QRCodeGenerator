/**
 * Style preset type definitions.
 *
 * A preset is a named, pre-configured set of QR styling options.
 * The preset system is designed for the Open/Closed Principle:
 * add new presets by adding objects to the presets array — no other code changes needed.
 */

import type { QRGeneratorOptions } from "./qr";

/**
 * A named QR code style preset.
 * Contains partial QR options that override defaults when selected.
 */
export interface QRStylePreset {
  /** Unique identifier for this preset. */
  id: string;
  /** Human-readable display name. */
  name: string;
  /** Short description of the visual style. */
  description: string;
  /** QR options that this preset overrides. Merged on top of defaults. */
  options: Partial<Omit<QRGeneratorOptions, "data" | "image">>;
}
