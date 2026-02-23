/**
 * QRCodeCanvas Component.
 *
 * The fundamental QR code renderer. Wraps a div ref that the
 * styled-qr-code library appends its canvas/SVG into.
 *
 * Single responsibility: render a QR code from options. Nothing else.
 */

import { useMemo, useEffect } from "react";
import { useQRCodeGenerator } from "@/hooks/useQRCodeGenerator";
import type { QRGeneratorOptions, DownloadFormat } from "@/types/qr";
import { cn } from "@/lib/utils";

interface QRCodeCanvasProps {
  /** Complete QR code configuration. */
  options: QRGeneratorOptions;
  /** Width/height override for the container (CSS value). */
  size?: number;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Expose the download function to parent via callback ref. */
  onDownloadReady?: (download: (format: DownloadFormat, filename: string) => Promise<void>) => void;
}

/**
 * Renders a single QR code into a container div.
 * The styled-qr-code library manages the canvas/SVG internally.
 */
export function QRCodeCanvas({ options, size, className, onDownloadReady }: QRCodeCanvasProps) {
  const displayOptions = useMemo(
    () =>
      size
        ? { ...options, width: size, height: size }
        : options,
    [options, size],
  );

  const { qrRef, download } = useQRCodeGenerator(displayOptions);

  // Expose download function to parent when it becomes available
  useEffect(() => {
    onDownloadReady?.(download);
  }, [download, onDownloadReady]);

  if (!options.data) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-md bg-muted text-muted-foreground text-sm",
          className,
        )}
        style={{ width: size, height: size }}
      >
        Enter content to preview
      </div>
    );
  }

  return (
    <div
      ref={qrRef}
      className={cn("inline-flex items-center justify-center [&>canvas]:rounded-md [&>svg]:rounded-md", className)}
    />
  );
}
