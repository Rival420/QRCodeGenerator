/**
 * Application-wide constants.
 * Centralizes magic numbers and limits for easy maintenance.
 */

/** Maximum logo file size in bytes (2 MB). */
export const MAX_LOGO_FILE_SIZE = 2 * 1024 * 1024;

/** Accepted image MIME types for logo upload. */
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];

/** Maximum dimension (width or height) to resize uploaded logos to. */
export const MAX_LOGO_DIMENSION = 300;

/** Minimum QR code output size in pixels. */
export const MIN_QR_SIZE = 200;

/** Maximum QR code output size in pixels. */
export const MAX_QR_SIZE = 1200;

/** Default QR code output size in pixels. */
export const DEFAULT_QR_SIZE = 400;

/** Size of QR code previews in the preset grid (pixels). */
export const PRESET_PREVIEW_SIZE = 180;

/** Default placeholder text shown in the data input. */
export const DEFAULT_PLACEHOLDER = "https://example.com";

/** Default filename prefix for downloaded QR codes. */
export const DOWNLOAD_FILENAME_PREFIX = "qrcode";
