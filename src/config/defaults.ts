/**
 * Default QR code configuration values.
 * Used as the base that presets and user customizations override.
 */

import type { QRGeneratorOptions } from "@/types/qr";
import { DEFAULT_QR_SIZE } from "./constants";

/** Base QR code options before any preset or customization is applied. */
export const DEFAULT_QR_OPTIONS: QRGeneratorOptions = {
  data: "",
  width: DEFAULT_QR_SIZE,
  height: DEFAULT_QR_SIZE,
  dotsOptions: {
    type: "square",
    color: "#000000",
  },
  cornersSquareOptions: {
    type: "square",
    color: "#000000",
  },
  cornersDotOptions: {
    type: "square",
    color: "#000000",
  },
  backgroundOptions: {
    color: "#FFFFFF",
  },
  imageOptions: {
    margin: 5,
    hideBackgroundDots: true,
  },
  qrOptions: {
    errorCorrectionLevel: "Q",
  },
};
