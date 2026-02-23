/**
 * QR Code configuration types.
 *
 * These interfaces define the complete shape of QR code generation options.
 * All components and hooks depend on these types — never on the `styled-qr-code`
 * library directly — following the Dependency Inversion Principle.
 */

/** Available dot (module) shapes for the QR code body. */
export type DotType =
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

/** Available corner square (finder pattern outer) shapes. */
export type CornerSquareType = "dot" | "square" | "extra-rounded";

/** Available corner dot (finder pattern inner) shapes. */
export type CornerDotType = "dot" | "square";

/** QR error correction level. Higher = more data redundancy = more scannable with logo overlay. */
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

/** Gradient type for colored fills. */
export type GradientType = "linear" | "radial";

/** Color stop within a gradient. */
export interface GradientColorStop {
  /** Position from 0 to 1. */
  offset: number;
  /** CSS color value. */
  color: string;
}

/** Gradient configuration for dot/corner/background fills. */
export interface GradientConfig {
  /** Direction of the gradient. */
  type: GradientType;
  /** Rotation angle in radians (for linear gradients). */
  rotation?: number;
  /** Color stops defining the gradient. */
  colorStops: GradientColorStop[];
}

/** Styling options for the QR code dot (module) elements. */
export interface DotsOptions {
  /** Shape of each dot. */
  type: DotType;
  /** Solid color (ignored if gradient is set). */
  color: string;
  /** Optional gradient fill. */
  gradient?: GradientConfig;
}

/** Styling options for the corner square (finder pattern outer frame). */
export interface CornersSquareOptions {
  /** Shape of the corner square. */
  type: CornerSquareType;
  /** Solid color. */
  color: string;
  /** Optional gradient fill. */
  gradient?: GradientConfig;
}

/** Styling options for the corner dot (finder pattern inner dot). */
export interface CornersDotOptions {
  /** Shape of the corner dot. */
  type: CornerDotType;
  /** Solid color. */
  color: string;
  /** Optional gradient fill. */
  gradient?: GradientConfig;
}

/** Background styling options. */
export interface BackgroundOptions {
  /** Background color. */
  color: string;
}

/** Logo image embedding options. */
export interface ImageOptions {
  /** Margin around the logo in pixels. */
  margin: number;
  /** Whether to hide dots behind the image. */
  hideBackgroundDots: boolean;
}

/** QR encoding options. */
export interface QROptions {
  /** Error correction level. */
  errorCorrectionLevel: ErrorCorrectionLevel;
}

/**
 * Complete QR code generation configuration.
 * This is the single source of truth for what a QR code looks like.
 */
export interface QRGeneratorOptions {
  /** The data to encode (URL, text, etc.). */
  data: string;
  /** Width in pixels. */
  width: number;
  /** Height in pixels. */
  height: number;
  /** Logo image as a data URL or external URL. */
  image?: string;
  /** Dot (module) styling. */
  dotsOptions: DotsOptions;
  /** Corner square (finder outer) styling. */
  cornersSquareOptions: CornersSquareOptions;
  /** Corner dot (finder inner) styling. */
  cornersDotOptions: CornersDotOptions;
  /** Background styling. */
  backgroundOptions: BackgroundOptions;
  /** Logo embedding options. */
  imageOptions: ImageOptions;
  /** QR encoding options. */
  qrOptions: QROptions;
}

/** Supported download formats. */
export type DownloadFormat = "png" | "svg";
