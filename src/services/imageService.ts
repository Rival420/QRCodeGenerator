/**
 * Image Service.
 *
 * Handles logo image processing: validation, conversion to data URL,
 * and resizing. Keeps image logic out of components (Single Responsibility).
 */

import { MAX_LOGO_FILE_SIZE, ACCEPTED_IMAGE_TYPES, MAX_LOGO_DIMENSION } from "@/config/constants";

/** Result of image validation. */
export interface ValidationResult {
  /** Whether the file passed all checks. */
  valid: boolean;
  /** Error message if validation failed. */
  error?: string;
}

/**
 * Validates a file for use as a QR code logo.
 * Checks file type and size constraints.
 * @param file - The file to validate
 * @returns Validation result with error message if invalid
 */
export function validateImage(file: File): ValidationResult {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Accepted: PNG, JPEG, SVG, WebP.`,
    };
  }

  if (file.size > MAX_LOGO_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File too large (${sizeMB} MB). Maximum size: ${MAX_LOGO_FILE_SIZE / (1024 * 1024)} MB.`,
    };
  }

  return { valid: true };
}

/**
 * Converts a File to a data URL string using FileReader.
 * @param file - The file to convert
 * @returns Promise resolving to a base64 data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("FileReader did not return a string"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Resizes an image to fit within a maximum dimension while preserving aspect ratio.
 * Uses an offscreen canvas for the resize operation.
 * @param dataURL - Source image as a data URL
 * @param maxDimension - Maximum width or height in pixels
 * @returns Promise resolving to the resized image as a data URL
 */
export function resizeImage(
  dataURL: string,
  maxDimension: number = MAX_LOGO_DIMENSION,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      // Skip resize if already within bounds
      if (width <= maxDimension && height <= maxDimension) {
        resolve(dataURL);
        return;
      }

      const scale = maxDimension / Math.max(width, height);
      const newWidth = Math.round(width * scale);
      const newHeight = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas 2D context"));
        return;
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image for resizing"));
    img.src = dataURL;
  });
}
