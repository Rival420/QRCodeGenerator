/**
 * App Component.
 *
 * Root component that orchestrates all application state and composes
 * the main UI sections: input, preset grid, selected preview,
 * customizer, and download.
 *
 * State is managed with useState hooks (no external state library needed
 * for this scope). Each hook has a single responsibility.
 */

import { useState, useCallback, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InputPanel } from "@/components/qr-input/InputPanel";
import { PresetGrid } from "@/components/qr-preview/PresetGrid";
import { SelectedPreview } from "@/components/qr-preview/SelectedPreview";
import { StyleCustomizer } from "@/components/qr-customize/StyleCustomizer";
import { DownloadButton } from "@/components/qr-download/DownloadButton";
import { useLogoUpload } from "@/hooks/useLogoUpload";
import { useStylePresets } from "@/hooks/useStylePresets";
import { useQRCodeDownload } from "@/hooks/useQRCodeDownload";
import type { QRGeneratorOptions, DownloadFormat } from "@/types/qr";

/** Main application component. */
export default function App() {
  // --- State ---
  const [data, setData] = useState("");

  // Logo upload state
  const {
    logo,
    logoFilename,
    isProcessing: isLogoProcessing,
    error: logoError,
    onDrop: onLogoDrop,
    removeLogo,
  } = useLogoUpload();

  // Preset selection and merging
  const {
    presets,
    selectedPresetId,
    selectPreset,
    setCustomOverrides,
    mergedOptions,
    getOptionsForPreset,
  } = useStylePresets(data, logo);

  // Download state
  const {
    format,
    setFormat,
    isDownloading,
    triggerDownload,
  } = useQRCodeDownload();

  // Reference to the download function from the selected preview's QR instance
  const downloadFnRef = useRef<
    ((format: DownloadFormat, filename: string) => Promise<void>) | null
  >(null);

  const handleDownloadReady = useCallback(
    (download: (format: DownloadFormat, filename: string) => Promise<void>) => {
      downloadFnRef.current = download;
    },
    [],
  );

  const handleDownload = useCallback(() => {
    if (downloadFnRef.current) {
      triggerDownload(downloadFnRef.current);
    }
  }, [triggerDownload]);

  const handleCustomOverrides = useCallback(
    (overrides: Partial<QRGeneratorOptions>) => {
      setCustomOverrides((prev) => {
        const merged: Partial<QRGeneratorOptions> = { ...prev, ...overrides };

        // Deep merge known sub-objects so partial updates don't clobber siblings
        if (overrides.dotsOptions || prev.dotsOptions) {
          merged.dotsOptions = { ...prev.dotsOptions, ...overrides.dotsOptions } as QRGeneratorOptions["dotsOptions"];
        }
        if (overrides.cornersSquareOptions || prev.cornersSquareOptions) {
          merged.cornersSquareOptions = { ...prev.cornersSquareOptions, ...overrides.cornersSquareOptions } as QRGeneratorOptions["cornersSquareOptions"];
        }
        if (overrides.cornersDotOptions || prev.cornersDotOptions) {
          merged.cornersDotOptions = { ...prev.cornersDotOptions, ...overrides.cornersDotOptions } as QRGeneratorOptions["cornersDotOptions"];
        }
        if (overrides.backgroundOptions || prev.backgroundOptions) {
          merged.backgroundOptions = { ...prev.backgroundOptions, ...overrides.backgroundOptions } as QRGeneratorOptions["backgroundOptions"];
        }
        if (overrides.imageOptions || prev.imageOptions) {
          merged.imageOptions = { ...prev.imageOptions, ...overrides.imageOptions } as QRGeneratorOptions["imageOptions"];
        }
        if (overrides.qrOptions || prev.qrOptions) {
          merged.qrOptions = { ...prev.qrOptions, ...overrides.qrOptions } as QRGeneratorOptions["qrOptions"];
        }

        return merged;
      });
    },
    [setCustomOverrides],
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Section 1: Input */}
        <InputPanel
          data={data}
          onDataChange={setData}
          logo={logo}
          logoFilename={logoFilename}
          isLogoProcessing={isLogoProcessing}
          logoError={logoError}
          onLogoDrop={onLogoDrop}
          onLogoRemove={removeLogo}
        />

        {/* Section 2: Preset Grid */}
        <PresetGrid
          presets={presets}
          selectedPresetId={selectedPresetId}
          onSelectPreset={selectPreset}
          getOptionsForPreset={getOptionsForPreset}
          data={data || "https://example.com"}
          image={logo}
        />

        {/* Section 3: Selected Preview + Customizer (side by side on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SelectedPreview
              options={mergedOptions.data ? mergedOptions : { ...mergedOptions, data: "https://example.com" }}
              onDownloadReady={handleDownloadReady}
            />
            <DownloadButton
              format={format}
              onFormatChange={setFormat}
              onDownload={handleDownload}
              isDownloading={isDownloading}
              disabled={!data}
            />
          </div>

          <StyleCustomizer
            options={mergedOptions}
            onOptionsChange={handleCustomOverrides}
            hasLogo={!!logo}
          />
        </div>
      </div>
    </AppLayout>
  );
}
