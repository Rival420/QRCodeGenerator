/**
 * QR Code Service.
 *
 * Adapter layer wrapping the `qr-code-styling` library.
 * This is the ONLY file in the project that imports `qr-code-styling`.
 * All other modules depend on the {@link QRGeneratorOptions} interface,
 * following the Dependency Inversion Principle.
 *
 * If the underlying QR library is ever replaced, only this file changes.
 */

import QRCodeStyling from "qr-code-styling";
import type { QRGeneratorOptions, DownloadFormat } from "@/types/qr";

/**
 * Maps our QRGeneratorOptions interface to the styled-qr-code Options shape.
 * Handles the translation between our domain types and the library's API.
 */
function toLibraryOptions(options: QRGeneratorOptions): ConstructorParameters<typeof QRCodeStyling>[0] {
  return {
    data: options.data,
    width: options.width,
    height: options.height,
    image: options.image,
    dotsOptions: {
      type: options.dotsOptions.type,
      color: options.dotsOptions.color,
      gradient: options.dotsOptions.gradient
        ? {
            type: options.dotsOptions.gradient.type,
            rotation: options.dotsOptions.gradient.rotation ?? 0,
            colorStops: options.dotsOptions.gradient.colorStops,
          }
        : undefined,
    },
    cornersSquareOptions: {
      type: options.cornersSquareOptions.type,
      color: options.cornersSquareOptions.color,
      gradient: options.cornersSquareOptions.gradient
        ? {
            type: options.cornersSquareOptions.gradient.type,
            rotation: options.cornersSquareOptions.gradient.rotation ?? 0,
            colorStops: options.cornersSquareOptions.gradient.colorStops,
          }
        : undefined,
    },
    cornersDotOptions: {
      type: options.cornersDotOptions.type,
      color: options.cornersDotOptions.color,
      gradient: options.cornersDotOptions.gradient
        ? {
            type: options.cornersDotOptions.gradient.type,
            rotation: options.cornersDotOptions.gradient.rotation ?? 0,
            colorStops: options.cornersDotOptions.gradient.colorStops,
          }
        : undefined,
    },
    backgroundOptions: {
      color: options.backgroundOptions.color,
    },
    imageOptions: {
      hideBackgroundDots: options.imageOptions.hideBackgroundDots,
      imageSize: 0.35,
      margin: options.imageOptions.margin,
    },
    qrOptions: {
      errorCorrectionLevel: options.qrOptions.errorCorrectionLevel,
    },
  };
}

/**
 * Creates a new QRCodeStyling instance with the given options.
 * @param options - QR code configuration
 * @returns A new QRCodeStyling instance ready to append or download
 */
export function createQRCode(options: QRGeneratorOptions): QRCodeStyling {
  return new QRCodeStyling(toLibraryOptions(options));
}

/**
 * Updates an existing QRCodeStyling instance with new options.
 * More efficient than creating a new instance for option changes.
 * @param instance - The existing QR code instance
 * @param options - Updated configuration
 */
export function updateQRCode(instance: QRCodeStyling, options: QRGeneratorOptions): void {
  instance.update(toLibraryOptions(options));
}

/**
 * Downloads the QR code as a file in the specified format.
 * @param instance - The QR code instance to export
 * @param format - Output format (png or svg)
 * @param filename - Name for the downloaded file (without extension)
 */
export async function downloadQRCode(
  instance: QRCodeStyling,
  format: DownloadFormat,
  filename: string,
): Promise<void> {
  await instance.download({
    extension: format,
    name: filename,
  });
}

/**
 * Gets the QR code as a raw Blob for further processing.
 * @param instance - The QR code instance
 * @param format - Output format
 * @returns The QR code image as a Blob
 */
export async function getQRCodeBlob(
  instance: QRCodeStyling,
  format: DownloadFormat,
): Promise<Blob | undefined> {
  const result = await instance.getRawData(format === "png" ? "png" : "svg");
  // In browser context, getRawData always returns a Blob (Buffer is Node-only)
  return (result as Blob) ?? undefined;
}
