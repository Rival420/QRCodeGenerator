/**
 * QR code style presets.
 *
 * Each preset defines a distinct visual appearance. Adding a new preset
 * requires only appending an object to this array — no other files change.
 * This follows the Open/Closed Principle.
 */

import type { QRStylePreset } from "@/types/styles";

export const STYLE_PRESETS: QRStylePreset[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional black-and-white QR code",
    options: {
      dotsOptions: { type: "square", color: "#000000" },
      cornersSquareOptions: { type: "square", color: "#000000" },
      cornersDotOptions: { type: "square", color: "#000000" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "rounded",
    name: "Rounded",
    description: "Modern and soft with rounded modules",
    options: {
      dotsOptions: { type: "rounded", color: "#000000" },
      cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
      cornersDotOptions: { type: "dot", color: "#000000" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "dots",
    name: "Dots",
    description: "Circular dot pattern throughout",
    options: {
      dotsOptions: { type: "dots", color: "#000000" },
      cornersSquareOptions: { type: "dot", color: "#000000" },
      cornersDotOptions: { type: "dot", color: "#000000" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "classy",
    name: "Classy",
    description: "Elegant angled edges with dark navy tones",
    options: {
      dotsOptions: { type: "classy", color: "#1a1a2e" },
      cornersSquareOptions: { type: "square", color: "#1a1a2e" },
      cornersDotOptions: { type: "square", color: "#1a1a2e" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool blue gradient with rounded shapes",
    options: {
      dotsOptions: {
        type: "rounded",
        color: "#0077b6",
        gradient: {
          type: "linear",
          rotation: Math.PI / 4,
          colorStops: [
            { offset: 0, color: "#0077b6" },
            { offset: 1, color: "#00b4d8" },
          ],
        },
      },
      cornersSquareOptions: { type: "extra-rounded", color: "#0077b6" },
      cornersDotOptions: { type: "dot", color: "#023e8a" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm red-orange gradient with smooth shapes",
    options: {
      dotsOptions: {
        type: "extra-rounded",
        color: "#e63946",
        gradient: {
          type: "linear",
          rotation: Math.PI / 3,
          colorStops: [
            { offset: 0, color: "#e63946" },
            { offset: 1, color: "#f4a261" },
          ],
        },
      },
      cornersSquareOptions: { type: "extra-rounded", color: "#e63946" },
      cornersDotOptions: { type: "dot", color: "#d62828" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "forest",
    name: "Forest",
    description: "Natural green gradient with classy-rounded dots",
    options: {
      dotsOptions: {
        type: "classy-rounded",
        color: "#2d6a4f",
        gradient: {
          type: "linear",
          rotation: Math.PI / 4,
          colorStops: [
            { offset: 0, color: "#2d6a4f" },
            { offset: 1, color: "#95d5b2" },
          ],
        },
      },
      cornersSquareOptions: { type: "extra-rounded", color: "#2d6a4f" },
      cornersDotOptions: { type: "dot", color: "#1b4332" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Inverted dark background with light dots",
    options: {
      dotsOptions: { type: "rounded", color: "#e0e0e0" },
      cornersSquareOptions: { type: "dot", color: "#e0e0e0" },
      cornersDotOptions: { type: "dot", color: "#ffffff" },
      backgroundOptions: { color: "#1a1a2e" },
    },
  },
  {
    id: "neon",
    name: "Neon",
    description: "Futuristic neon green on dark background",
    options: {
      dotsOptions: { type: "dots", color: "#39ff14" },
      cornersSquareOptions: { type: "dot", color: "#39ff14" },
      cornersDotOptions: { type: "dot", color: "#00ff00" },
      backgroundOptions: { color: "#0d0d0d" },
    },
  },
  {
    id: "royal",
    name: "Royal Purple",
    description: "Regal purple radial gradient",
    options: {
      dotsOptions: {
        type: "classy-rounded",
        color: "#7b2ff7",
        gradient: {
          type: "radial",
          colorStops: [
            { offset: 0, color: "#7b2ff7" },
            { offset: 1, color: "#c471f5" },
          ],
        },
      },
      cornersSquareOptions: { type: "extra-rounded", color: "#7b2ff7" },
      cornersDotOptions: { type: "dot", color: "#5a0fcf" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "coral",
    name: "Coral",
    description: "Playful coral tone with extra-rounded shapes",
    options: {
      dotsOptions: { type: "extra-rounded", color: "#ff6b6b" },
      cornersSquareOptions: { type: "square", color: "#ff6b6b" },
      cornersDotOptions: { type: "square", color: "#ee5a5a" },
      backgroundOptions: { color: "#FFFFFF" },
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Subtle gray on off-white for minimalist designs",
    options: {
      dotsOptions: { type: "square", color: "#333333" },
      cornersSquareOptions: { type: "square", color: "#333333" },
      cornersDotOptions: { type: "square", color: "#222222" },
      backgroundOptions: { color: "#f5f5f5" },
    },
  },
];
