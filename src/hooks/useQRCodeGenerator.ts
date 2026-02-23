/**
 * Hook: useQRCodeGenerator
 *
 * Manages the lifecycle of a qr-code-styling instance within React's
 * declarative model. Uses useRef for the imperative QR instance and
 * useEffect for creation/update/cleanup.
 *
 * This is the bridge between the QR service layer and React components.
 */

import { useRef, useEffect, useCallback } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { QRGeneratorOptions, DownloadFormat } from "@/types/qr";
import { createQRCode, updateQRCode, downloadQRCode } from "@/services/qrCodeService";

interface UseQRCodeGeneratorReturn {
  /** Ref to attach to the container div where the QR code renders. */
  qrRef: React.RefObject<HTMLDivElement | null>;
  /** Trigger a file download of the current QR code. */
  download: (format: DownloadFormat, filename: string) => Promise<void>;
}

/**
 * Safely removes all child nodes from a DOM element.
 * Uses DOM API (removeChild) instead of innerHTML to avoid XSS concerns.
 */
function clearElement(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Creates and manages a QR code instance that renders into a DOM ref.
 *
 * The instance is created once and updated on subsequent option changes.
 * If `data` becomes empty, the QR code is cleared from the DOM.
 *
 * @param options - Complete QR code configuration
 * @returns Object with the container ref and download function
 *
 * @example
 * ```tsx
 * const { qrRef, download } = useQRCodeGenerator(options);
 * return <div ref={qrRef} />;
 * ```
 */
export function useQRCodeGenerator(
  options: QRGeneratorOptions,
): UseQRCodeGeneratorReturn {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    // No data: clear the container and bail
    if (!options.data) {
      if (qrRef.current) clearElement(qrRef.current);
      return;
    }

    // If no instance exists yet, create and append
    if (!instanceRef.current) {
      const instance = createQRCode(options);
      instanceRef.current = instance;

      if (qrRef.current) {
        clearElement(qrRef.current);
        instance.append(qrRef.current);
      }
    } else {
      // Instance exists: just update with new options
      updateQRCode(instanceRef.current, options);
    }
  }, [options]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (qrRef.current) {
        clearElement(qrRef.current);
      }
      instanceRef.current = null;
    };
  }, []);

  const download = useCallback(
    async (format: DownloadFormat, filename: string) => {
      if (!instanceRef.current) return;
      await downloadQRCode(instanceRef.current, format, filename);
    },
    [],
  );

  return { qrRef, download };
}
