/**
 * Mirrors the palette defined in `src/app/globals.css` (`@theme` block).
 * three.js materials need raw hex, which isn't consumable from CSS custom
 * properties, so this must be kept in sync manually when the palette changes.
 */
export const COLORS = {
  bg: "#0a0a0a",
  primary: "#d4af37",
  accent: "#ffd700",
  success: "#ffc300",
  text: "#ffffff",
} as const;
