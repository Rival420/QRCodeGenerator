/**
 * LogoUpload Component.
 *
 * Drag-and-drop zone for uploading a logo image.
 * Uses react-dropzone for the drop interaction and displays a preview.
 * Single responsibility: handles file upload UI only.
 */

import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ACCEPTED_IMAGE_TYPES } from "@/config/constants";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
  /** Current logo as a data URL. */
  logo: string | undefined;
  /** Original filename of the uploaded logo. */
  logoFilename: string | undefined;
  /** Whether the logo is being processed. */
  isProcessing: boolean;
  /** Error message from validation or processing. */
  error: string | undefined;
  /** Callback for dropped files. */
  onDrop: (files: File[]) => void;
  /** Callback to remove the current logo. */
  onRemove: () => void;
}

/** Drag-and-drop logo upload with preview thumbnail and remove button. */
export function LogoUpload({
  logo,
  logoFilename,
  isProcessing,
  error,
  onDrop,
  onRemove,
}: LogoUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {} as Record<string, string[]>,
    ),
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="space-y-2">
      <Label>Logo (optioneel)</Label>

      {logo ? (
        /* Preview state: show thumbnail + filename + remove button */
        <div className="flex items-center gap-3 rounded-md border border-border p-3">
          <img
            src={logo}
            alt="Logo-voorvertoning"
            className="h-12 w-12 rounded object-contain bg-muted"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{logoFilename}</p>
            <p className="text-xs text-muted-foreground">
              Het logo verschijnt in het midden van de QR-code
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label="Logo verwijderen"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        /* Upload state: dropzone */
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50",
            error && "border-destructive",
          )}
        >
          <input {...getInputProps()} />
          {isProcessing ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground text-center">
            {isDragActive
              ? "Laat je logo hier los"
              : "Sleep een logo naar hier of klik om te bladeren"}
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPEG, SVG of WebP (max. 2 MB)
          </p>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
