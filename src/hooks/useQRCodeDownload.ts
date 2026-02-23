/**
 * Hook: useQRCodeDownload
 *
 * Manages download state: format selection, loading indicator,
 * and filename generation. Delegates actual download to the
 * QR code instance's download method.
 */

import { useState, useCallback } from "react";
import type { DownloadFormat } from "@/types/qr";
import { DOWNLOAD_FILENAME_PREFIX } from "@/config/constants";

interface UseQRCodeDownloadReturn {
  /** Currently selected download format. */
  format: DownloadFormat;
  /** Update the download format. */
  setFormat: (format: DownloadFormat) => void;
  /** Whether a download is in progress. */
  isDownloading: boolean;
  /** Trigger the download using the provided download function. */
  triggerDownload: (downloadFn: (format: DownloadFormat, filename: string) => Promise<void>) => Promise<void>;
}

/**
 * Handles download format selection and triggering.
 *
 * @returns Download state and trigger function
 *
 * @example
 * ```tsx
 * const { format, setFormat, triggerDownload, isDownloading } = useQRCodeDownload();
 * const { download } = useQRCodeGenerator(options);
 * <Button onClick={() => triggerDownload(download)}>Download</Button>
 * ```
 */
export function useQRCodeDownload(): UseQRCodeDownloadReturn {
  const [format, setFormat] = useState<DownloadFormat>("png");
  const [isDownloading, setIsDownloading] = useState(false);

  const triggerDownload = useCallback(
    async (downloadFn: (format: DownloadFormat, filename: string) => Promise<void>) => {
      setIsDownloading(true);
      try {
        const timestamp = Date.now();
        const filename = `${DOWNLOAD_FILENAME_PREFIX}-${timestamp}`;
        await downloadFn(format, filename);
      } finally {
        setIsDownloading(false);
      }
    },
    [format],
  );

  return { format, setFormat, isDownloading, triggerDownload };
}
