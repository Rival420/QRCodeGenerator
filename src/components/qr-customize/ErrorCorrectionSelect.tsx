/**
 * ErrorCorrectionSelect Component.
 *
 * Dropdown for QR error correction level selection.
 * Shows a warning when correction is too low for logo usage.
 */

import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import type { ErrorCorrectionLevel } from "@/types/qr";

/** Error correction options with descriptions. */
const EC_OPTIONS: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: "L", label: "L - Laag (7%)" },
  { value: "M", label: "M - Gemiddeld (15%)" },
  { value: "Q", label: "Q - Kwartiel (25%)" },
  { value: "H", label: "H - Hoog (30%)" },
];

interface ErrorCorrectionSelectProps {
  /** Current error correction level. */
  value: ErrorCorrectionLevel;
  /** Callback when level changes. */
  onChange: (level: ErrorCorrectionLevel) => void;
  /** Whether a logo is currently set (triggers warning for low levels). */
  hasLogo: boolean;
}

/** Error correction level selector with logo-aware warnings. */
export function ErrorCorrectionSelect({
  value,
  onChange,
  hasLogo,
}: ErrorCorrectionSelectProps) {
  const isLowForLogo = hasLogo && (value === "L" || value === "M");

  return (
    <div className="space-y-1.5">
      <Label htmlFor="error-correction">Foutcorrectie</Label>
      <Select
        id="error-correction"
        value={value}
        onChange={(e) => onChange(e.target.value as ErrorCorrectionLevel)}
        options={EC_OPTIONS}
      />
      {isLowForLogo && (
        <div className="flex items-start gap-1.5 text-xs text-amber-600">
          <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>
            Met een logo: gebruik Q of H voor betrouwbaar scannen. Het logo bedekt een deel van de QR-gegevens.
          </span>
        </div>
      )}
    </div>
  );
}
