/**
 * SuccessBoard Design System
 *
 * A WCAG 2.1 AA compliant design system with support for light and dark themes.
 *
 * @example
 * // Import tokens
 * import { semanticLight, fontSize, spacing } from '@/design-system';
 *
 * // Import primitives
 * import { Container, Section, Heading, Text } from '@/design-system/primitives';
 *
 * // Import CSS variables
 * import { completeCSS } from '@/design-system/tokens/css-variables';
 */

// Re-export all tokens
export * from "./tokens";

// Re-export primitives
export * from "./primitives";

// Re-export utilities
export { cn } from "./utils/cn";

// Re-export CSS variable generators
export {
  paletteCSS,
  sharedCSS,
  lightThemeCSS,
  darkThemeCSS,
  systemDarkCSS,
  completeCSS,
  paletteVars,
  sharedVars,
  lightSemanticVars,
  darkSemanticVars,
} from "./tokens/css-variables";
