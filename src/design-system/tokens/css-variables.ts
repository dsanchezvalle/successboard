/**
 * Design System: CSS Custom Properties Generator
 *
 * Generates CSS custom properties (variables) from design tokens.
 * These can be injected into your global styles or used with CSS-in-JS.
 *
 * @example
 * // In your global CSS or layout component:
 * import { lightThemeCSS, darkThemeCSS } from '@/design-system/tokens/css-variables';
 */

import {
  gray,
  blue,
  green,
  amber,
  red,
  purple,
  indigo,
  orange,
  semanticLight,
  semanticDark,
} from "./colors";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "./typography";
import { spacing } from "./spacing";
import { radii } from "./radii";
import { shadows, shadowsDark } from "./shadows";
import { duration, easing } from "./motion";
import { focusRing } from "./focus";

// =============================================================================
// CSS VARIABLE GENERATORS
// =============================================================================

/**
 * Convert a nested object to flat CSS custom properties
 */
const flattenToCSSVars = (
  obj: Record<string, unknown>,
  prefix: string = ""
): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenToCSSVars(value as Record<string, unknown>, varName)
      );
    } else if (typeof value === "string" || typeof value === "number") {
      result[`--${varName}`] = String(value);
    }
  }

  return result;
};

/**
 * Convert CSS variable object to CSS string
 */
const toCSSString = (vars: Record<string, string>): string => {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
};

// =============================================================================
// COLOR PALETTE CSS VARIABLES
// =============================================================================

const paletteVars = {
  // Gray scale
  ...Object.fromEntries(
    Object.entries(gray).map(([k, v]) => [`--color-gray-${k}`, v])
  ),
  // Blue scale
  ...Object.fromEntries(
    Object.entries(blue).map(([k, v]) => [`--color-blue-${k}`, v])
  ),
  // Green scale
  ...Object.fromEntries(
    Object.entries(green).map(([k, v]) => [`--color-green-${k}`, v])
  ),
  // Amber scale
  ...Object.fromEntries(
    Object.entries(amber).map(([k, v]) => [`--color-amber-${k}`, v])
  ),
  // Red scale
  ...Object.fromEntries(
    Object.entries(red).map(([k, v]) => [`--color-red-${k}`, v])
  ),
  // Purple scale
  ...Object.fromEntries(
    Object.entries(purple).map(([k, v]) => [`--color-purple-${k}`, v])
  ),
  // Indigo scale
  ...Object.fromEntries(
    Object.entries(indigo).map(([k, v]) => [`--color-indigo-${k}`, v])
  ),
  // Orange scale
  ...Object.fromEntries(
    Object.entries(orange).map(([k, v]) => [`--color-orange-${k}`, v])
  ),
};

// =============================================================================
// SEMANTIC CSS VARIABLES - LIGHT THEME
// =============================================================================

const lightSemanticVars = {
  // Backgrounds
  "--bg-page": semanticLight.bg.page,
  "--bg-surface": semanticLight.bg.surface,
  "--bg-subtle": semanticLight.bg.subtle,
  "--bg-muted": semanticLight.bg.muted,

  // Text
  "--text-primary": semanticLight.text.primary,
  "--text-secondary": semanticLight.text.secondary,
  "--text-muted": semanticLight.text.muted,
  "--text-placeholder": semanticLight.text.placeholder,
  "--text-disabled": semanticLight.text.disabled,
  "--text-inverse": semanticLight.text.inverse,

  // Borders
  "--border-default": semanticLight.border.default,
  "--border-strong": semanticLight.border.strong,
  "--border-focus": semanticLight.border.focus,

  // Primary
  "--primary": semanticLight.primary.default,
  "--primary-hover": semanticLight.primary.hover,
  "--primary-active": semanticLight.primary.active,
  "--primary-subtle": semanticLight.primary.subtle,
  "--primary-muted": semanticLight.primary.muted,
  "--primary-foreground": semanticLight.primary.foreground,

  // Success
  "--success-bg": semanticLight.success.bg,
  "--success-border": semanticLight.success.border,
  "--success-foreground": semanticLight.success.foreground,
  "--success-icon": semanticLight.success.icon,

  // Warning
  "--warning-bg": semanticLight.warning.bg,
  "--warning-border": semanticLight.warning.border,
  "--warning-foreground": semanticLight.warning.foreground,
  "--warning-icon": semanticLight.warning.icon,

  // Error
  "--error-bg": semanticLight.error.bg,
  "--error-border": semanticLight.error.border,
  "--error-foreground": semanticLight.error.foreground,
  "--error-icon": semanticLight.error.icon,

  // Info
  "--info-bg": semanticLight.info.bg,
  "--info-border": semanticLight.info.border,
  "--info-foreground": semanticLight.info.foreground,
  "--info-icon": semanticLight.info.icon,

  // Shadows
  "--shadow-xs": shadows.xs,
  "--shadow-sm": shadows.sm,
  "--shadow-md": shadows.md,
  "--shadow-lg": shadows.lg,
  "--shadow-xl": shadows.xl,
  "--shadow-2xl": shadows["2xl"],
  "--shadow-inner": shadows.inner,

  // Focus
  "--focus-ring-color": focusRing.colorLight,
  "--focus-ring-width": focusRing.width,
  "--focus-ring-offset": focusRing.offset,
};

// =============================================================================
// SEMANTIC CSS VARIABLES - DARK THEME
// =============================================================================

const darkSemanticVars = {
  // Backgrounds
  "--bg-page": semanticDark.bg.page,
  "--bg-surface": semanticDark.bg.surface,
  "--bg-subtle": semanticDark.bg.subtle,
  "--bg-muted": semanticDark.bg.muted,

  // Text
  "--text-primary": semanticDark.text.primary,
  "--text-secondary": semanticDark.text.secondary,
  "--text-muted": semanticDark.text.muted,
  "--text-placeholder": semanticDark.text.placeholder,
  "--text-disabled": semanticDark.text.disabled,
  "--text-inverse": semanticDark.text.inverse,

  // Borders
  "--border-default": semanticDark.border.default,
  "--border-strong": semanticDark.border.strong,
  "--border-focus": semanticDark.border.focus,

  // Primary
  "--primary": semanticDark.primary.default,
  "--primary-hover": semanticDark.primary.hover,
  "--primary-active": semanticDark.primary.active,
  "--primary-subtle": semanticDark.primary.subtle,
  "--primary-muted": semanticDark.primary.muted,
  "--primary-foreground": semanticDark.primary.foreground,

  // Success
  "--success-bg": semanticDark.success.bg,
  "--success-border": semanticDark.success.border,
  "--success-foreground": semanticDark.success.foreground,
  "--success-icon": semanticDark.success.icon,

  // Warning
  "--warning-bg": semanticDark.warning.bg,
  "--warning-border": semanticDark.warning.border,
  "--warning-foreground": semanticDark.warning.foreground,
  "--warning-icon": semanticDark.warning.icon,

  // Error
  "--error-bg": semanticDark.error.bg,
  "--error-border": semanticDark.error.border,
  "--error-foreground": semanticDark.error.foreground,
  "--error-icon": semanticDark.error.icon,

  // Info
  "--info-bg": semanticDark.info.bg,
  "--info-border": semanticDark.info.border,
  "--info-foreground": semanticDark.info.foreground,
  "--info-icon": semanticDark.info.icon,

  // Shadows (dark theme)
  "--shadow-xs": shadowsDark.xs,
  "--shadow-sm": shadowsDark.sm,
  "--shadow-md": shadowsDark.md,
  "--shadow-lg": shadowsDark.lg,
  "--shadow-xl": shadowsDark.xl,
  "--shadow-2xl": shadowsDark["2xl"],
  "--shadow-inner": shadowsDark.inner,

  // Focus
  "--focus-ring-color": focusRing.colorDark,
  "--focus-ring-width": focusRing.width,
  "--focus-ring-offset": focusRing.offset,
};

// =============================================================================
// SHARED CSS VARIABLES (Theme-independent)
// =============================================================================

const sharedVars = {
  // Typography
  "--font-sans": fontFamily.sans,
  "--font-mono": fontFamily.mono,

  "--font-size-xs": fontSize.xs,
  "--font-size-sm": fontSize.sm,
  "--font-size-base": fontSize.base,
  "--font-size-md": fontSize.md,
  "--font-size-lg": fontSize.lg,
  "--font-size-xl": fontSize.xl,
  "--font-size-2xl": fontSize["2xl"],
  "--font-size-3xl": fontSize["3xl"],
  "--font-size-4xl": fontSize["4xl"],
  "--font-size-5xl": fontSize["5xl"],

  "--font-weight-normal": fontWeight.normal,
  "--font-weight-medium": fontWeight.medium,
  "--font-weight-semibold": fontWeight.semibold,
  "--font-weight-bold": fontWeight.bold,

  "--line-height-tight": lineHeight.tight,
  "--line-height-snug": lineHeight.snug,
  "--line-height-normal": lineHeight.normal,
  "--line-height-relaxed": lineHeight.relaxed,
  "--line-height-loose": lineHeight.loose,
  "--line-height-prose": lineHeight.prose,

  "--letter-spacing-tight": letterSpacing.tight,
  "--letter-spacing-normal": letterSpacing.normal,
  "--letter-spacing-wide": letterSpacing.wide,
  "--letter-spacing-wider": letterSpacing.wider,

  // Spacing
  "--spacing-0": spacing[0],
  "--spacing-px": spacing.px,
  "--spacing-0-5": spacing[0.5],
  "--spacing-1": spacing[1],
  "--spacing-1-5": spacing[1.5],
  "--spacing-2": spacing[2],
  "--spacing-2-5": spacing[2.5],
  "--spacing-3": spacing[3],
  "--spacing-3-5": spacing[3.5],
  "--spacing-4": spacing[4],
  "--spacing-5": spacing[5],
  "--spacing-6": spacing[6],
  "--spacing-7": spacing[7],
  "--spacing-8": spacing[8],
  "--spacing-9": spacing[9],
  "--spacing-10": spacing[10],
  "--spacing-11": spacing[11],
  "--spacing-12": spacing[12],
  "--spacing-14": spacing[14],
  "--spacing-16": spacing[16],
  "--spacing-20": spacing[20],
  "--spacing-24": spacing[24],
  "--spacing-32": spacing[32],
  "--spacing-40": spacing[40],
  "--spacing-48": spacing[48],
  "--spacing-64": spacing[64],

  // Border radius
  "--radius-none": radii.none,
  "--radius-xs": radii.xs,
  "--radius-sm": radii.sm,
  "--radius-md": radii.md,
  "--radius-lg": radii.lg,
  "--radius-xl": radii.xl,
  "--radius-2xl": radii["2xl"],
  "--radius-3xl": radii["3xl"],
  "--radius-4xl": radii["4xl"],
  "--radius-full": radii.full,

  // Motion
  "--duration-instant": duration.instant,
  "--duration-fastest": duration.fastest,
  "--duration-fast": duration.fast,
  "--duration-normal": duration.normal,
  "--duration-slow": duration.slow,
  "--duration-slower": duration.slower,
  "--duration-slowest": duration.slowest,

  "--ease-default": easing.default,
  "--ease-in": easing.in,
  "--ease-out": easing.out,
  "--ease-in-out": easing.inOut,
  "--ease-linear": easing.linear,
  "--ease-bounce": easing.bounce,
};

// =============================================================================
// EXPORTED CSS STRINGS
// =============================================================================

/**
 * CSS string for color palette variables
 * Apply to :root for global access
 */
export const paletteCSS = `:root {\n${toCSSString(paletteVars)}\n}`;

/**
 * CSS string for shared (theme-independent) variables
 * Apply to :root for global access
 */
export const sharedCSS = `:root {\n${toCSSString(sharedVars)}\n}`;

/**
 * CSS string for light theme semantic variables
 * Apply to :root or [data-theme="light"]
 */
export const lightThemeCSS = `:root, [data-theme="light"] {\n${toCSSString(
  lightSemanticVars
)}\n}`;

/**
 * CSS string for dark theme semantic variables
 * Apply to [data-theme="dark"] or @media (prefers-color-scheme: dark)
 */
export const darkThemeCSS = `[data-theme="dark"] {\n${toCSSString(
  darkSemanticVars
)}\n}`;

/**
 * CSS string for system preference dark mode
 */
export const systemDarkCSS = `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${toCSSString(
  darkSemanticVars
)
  .split("\n")
  .map((line) => "  " + line)
  .join("\n")}\n  }\n}`;

/**
 * Complete CSS with all variables
 * Includes palette, shared, light theme, dark theme, and system preference
 */
export const completeCSS = `
/* Design System CSS Custom Properties */
/* Generated from design tokens */

/* Color Palette */
${paletteCSS}

/* Shared Variables (Theme-independent) */
${sharedCSS}

/* Light Theme (Default) */
${lightThemeCSS}

/* Dark Theme */
${darkThemeCSS}

/* System Preference Dark Mode */
${systemDarkCSS}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

// =============================================================================
// EXPORTED VARIABLE OBJECTS
// =============================================================================

export { paletteVars, sharedVars, lightSemanticVars, darkSemanticVars };
