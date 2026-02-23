/**
 * Hook: useLogoUpload
 *
 * Manages logo file upload state: validation, conversion to data URL,
 * optional resizing, and error handling. Integrates with react-dropzone
 * via the returned onDrop callback.
 */

import { useState, useCallback } from "react";
import { validateImage, fileToDataURL, resizeImage } from "@/services/imageService";

interface UseLogoUploadReturn {
  /** The logo as a data URL, or undefined if no logo is set. */
  logo: string | undefined;
  /** The original filename of the uploaded logo. */
  logoFilename: string | undefined;
  /** Whether a logo is currently being processed. */
  isProcessing: boolean;
  /** Error message from the last failed upload attempt. */
  error: string | undefined;
  /** Callback for react-dropzone's onDrop. Accepts an array of files. */
  onDrop: (acceptedFiles: File[]) => void;
  /** Removes the current logo. */
  removeLogo: () => void;
}

/**
 * Handles logo upload lifecycle: validate, read, resize, and store.
 *
 * @returns Logo state and handlers for dropzone integration
 *
 * @example
 * ```tsx
 * const { logo, onDrop, removeLogo, error } = useLogoUpload();
 * const { getRootProps, getInputProps } = useDropzone({ onDrop });
 * ```
 */
export function useLogoUpload(): UseLogoUploadReturn {
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [logoFilename, setLogoFilename] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type and size
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError(undefined);
    setIsProcessing(true);

    fileToDataURL(file)
      .then((dataURL) => resizeImage(dataURL))
      .then((resizedDataURL) => {
        setLogo(resizedDataURL);
        setLogoFilename(file.name);
      })
      .catch(() => {
        setError("Failed to process image. Please try another file.");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  const removeLogo = useCallback(() => {
    setLogo(undefined);
    setLogoFilename(undefined);
    setError(undefined);
  }, []);

  return { logo, logoFilename, isProcessing, error, onDrop, removeLogo };
}
