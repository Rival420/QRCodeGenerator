/**
 * DataInput Component.
 *
 * Controlled text input for the QR code data (URL, text, etc.).
 * Single responsibility: handles text input only. Does not know about QR codes.
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_PLACEHOLDER } from "@/config/constants";

interface DataInputProps {
  /** Current input value. */
  value: string;
  /** Callback when the input value changes. */
  onChange: (value: string) => void;
}

/** Text/URL input field for QR code data. */
export function DataInput({ value, onChange }: DataInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="qr-data">Te encoderen inhoud</Label>
      <Input
        id="qr-data"
        type="text"
        placeholder={DEFAULT_PLACEHOLDER}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      <p className="text-xs text-muted-foreground">
        Voer een URL, tekst, e-mail, telefoonnummer of andere gegevens in.
      </p>
    </div>
  );
}
