/**
 * DownloadButton Component.
 *
 * Combined format selector and download trigger.
 * Shows the selected format and triggers download on click.
 */

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { DownloadFormat } from "@/types/qr";

/** Available download format options. */
const FORMAT_OPTIONS: { value: DownloadFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "svg", label: "SVG" },
];

interface DownloadButtonProps {
  /** Currently selected download format. */
  format: DownloadFormat;
  /** Callback when format changes. */
  onFormatChange: (format: DownloadFormat) => void;
  /** Callback to trigger the download. */
  onDownload: () => void;
  /** Whether a download is in progress. */
  isDownloading: boolean;
  /** Whether the download button should be disabled (no data). */
  disabled: boolean;
}

/** Format selector + download button combination. */
export function DownloadButton({
  format,
  onFormatChange,
  onDownload,
  isDownloading,
  disabled,
}: DownloadButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={format}
        onChange={(e) => onFormatChange(e.target.value as DownloadFormat)}
        options={FORMAT_OPTIONS}
        className="w-24"
      />
      <Button
        onClick={onDownload}
        disabled={disabled || isDownloading}
        className="flex-1"
        size="lg"
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {isDownloading ? "Bezig met downloaden…" : "QR-code downloaden"}
      </Button>
    </div>
  );
}
