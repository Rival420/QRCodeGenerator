/**
 * InputPanel Component.
 *
 * Composes DataInput and LogoUpload into a single card.
 * Acts as the "input section" of the application.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataInput } from "./DataInput";
import { LogoUpload } from "./LogoUpload";

interface InputPanelProps {
  /** Current QR data text. */
  data: string;
  /** Callback when QR data changes. */
  onDataChange: (value: string) => void;
  /** Current logo as data URL. */
  logo: string | undefined;
  /** Original logo filename. */
  logoFilename: string | undefined;
  /** Whether logo is being processed. */
  isLogoProcessing: boolean;
  /** Logo upload error. */
  logoError: string | undefined;
  /** Callback for logo file drop. */
  onLogoDrop: (files: File[]) => void;
  /** Callback to remove the logo. */
  onLogoRemove: () => void;
}

/** Combined input section with data entry and logo upload. */
export function InputPanel({
  data,
  onDataChange,
  logo,
  logoFilename,
  isLogoProcessing,
  logoError,
  onLogoDrop,
  onLogoRemove,
}: InputPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">QR Code Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DataInput value={data} onChange={onDataChange} />
        <LogoUpload
          logo={logo}
          logoFilename={logoFilename}
          isProcessing={isLogoProcessing}
          error={logoError}
          onDrop={onLogoDrop}
          onRemove={onLogoRemove}
        />
      </CardContent>
    </Card>
  );
}
