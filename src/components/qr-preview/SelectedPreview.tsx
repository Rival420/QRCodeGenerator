/**
 * SelectedPreview Component.
 *
 * Large preview of the currently selected preset with customizations applied.
 * Shows the full-size QR code that will be downloaded.
 */

import { QRCodeCanvas } from "./QRCodeCanvas";
import type { QRGeneratorOptions, DownloadFormat } from "@/types/qr";

interface SelectedPreviewProps {
  /** Fully merged QR options (defaults + preset + customizations + data). */
  options: QRGeneratorOptions;
  /** Callback to receive the download function from QRCodeCanvas. */
  onDownloadReady?: (download: (format: DownloadFormat, filename: string) => Promise<void>) => void;
}

/** Large QR code preview of the selected and customized style. */
export function SelectedPreview({ options, onDownloadReady }: SelectedPreviewProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
        <QRCodeCanvas
          options={options}
          onDownloadReady={onDownloadReady}
        />
      </div>
      {!options.data && (
        <p className="text-sm text-muted-foreground">
          Enter content above to generate your QR code
        </p>
      )}
    </div>
  );
}
