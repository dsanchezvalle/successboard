/**
 * Design System: Typography Tokens
 *
 * WCAG 2.1 AA compliant typography system.
 * - Minimum body size: 15px (0.9375rem)
 * - Line heights: 1.2–1.6 for optimal readability
 * - Semantic heading hierarchy enforced
 */

// =============================================================================
// FONT FAMILIES
// =============================================================================

/**
 * Font family stacks with system fallbacks
 */
export const fontFamily = {
  /** Primary sans-serif font for UI and body text */
  sans: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ].join(", "),

  /** Monospace font for code and technical content */
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ].join(", "),
} as const;

// =============================================================================
// FONT SIZES
// =============================================================================

/**
 * Font size scale in rem units
 *
 * @accessibility
 * - Base size (1rem) = 16px at default browser settings
 * - Minimum body text: 0.9375rem (15px)
 * - All sizes scale with user's browser font settings
 */
export const fontSize = {
  /** 12px - Use sparingly, only for non-essential labels */
  xs: "0.75rem",
  /** 13px - Captions, table headers */
  sm: "0.8125rem",
  /** 14px - Small text, secondary content */
  base: "0.875rem",
  /** 15px - Body text (minimum for main content) */
  md: "0.9375rem",
  /** 16px - Large body text, emphasized content */
  lg: "1rem",
  /** 20px - H4, small headings */
  xl: "1.25rem",
  /** 24px - H3, section headings */
  "2xl": "1.5rem",
  /** 30px - H2, page headings */
  "3xl": "1.875rem",
  /** 36px - H1, display headings */
  "4xl": "2.25rem",
  /** 48px - Hero text, marketing displays */
  "5xl": "3rem",
} as const;

// =============================================================================
// FONT WEIGHTS
// =============================================================================

/**
 * Font weight scale
 */
export const fontWeight = {
  /** Normal body text */
  normal: "400",
  /** Slightly emphasized text */
  medium: "500",
  /** Headings, strong emphasis */
  semibold: "600",
  /** Display headings, maximum emphasis */
  bold: "700",
} as const;

// =============================================================================
// LINE HEIGHTS
// =============================================================================

/**
 * Line height scale
 *
 * @accessibility
 * - Body text uses 1.5–1.6 for optimal readability
 * - Headings use tighter line heights (1.2–1.4)
 * - All values between 1.2–1.6 per WCAG guidelines
 */
export const lineHeight = {
  /** Tight - for large display text */
  tight: "1.2",
  /** Snug - for headings */
  snug: "1.33",
  /** Normal - for subheadings */
  normal: "1.4",
  /** Relaxed - for small text */
  relaxed: "1.43",
  /** Loose - for body text (recommended) */
  loose: "1.5",
  /** Extra loose - for long-form reading */
  prose: "1.6",
} as const;

// =============================================================================
// LETTER SPACING
// =============================================================================

/**
 * Letter spacing (tracking) scale
 */
export const letterSpacing = {
  /** Tighter tracking for large headings */
  tight: "-0.025em",
  /** Normal tracking */
  normal: "0",
  /** Wider tracking for uppercase text, small caps */
  wide: "0.025em",
  /** Extra wide for all-caps labels */
  wider: "0.05em",
} as const;

// =============================================================================
// TEXT STYLES (COMPOSITE TOKENS)
// =============================================================================

/**
 * Pre-composed text styles for consistent typography
 *
 * @accessibility Each style documents:
 * - Recommended semantic HTML element
 * - Minimum contrast requirement
 * - Usage guidelines
 */
export const textStyles = {
  /**
   * Display heading - Hero sections, marketing
   * @element h1
   * @contrast 4.5:1 minimum
   */
  display: {
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },

  /**
   * H1 - Page titles
   * @element h1
   * @contrast 4.5:1 minimum
   */
  h1: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },

  /**
   * H2 - Section headings
   * @element h2
   * @contrast 4.5:1 minimum
   */
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },

  /**
   * H3 - Subsection headings
   * @element h3
   * @contrast 4.5:1 minimum
   */
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * H4 - Card titles, small headings
   * @element h4
   * @contrast 4.5:1 minimum
   */
  h4: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Body - Main content text
   * @element p
   * @contrast 4.5:1 minimum
   * @note Minimum 15px for accessibility
   */
  body: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.prose,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Body large - Emphasized body text
   * @element p
   * @contrast 4.5:1 minimum
   */
  bodyLarge: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.prose,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Small - Secondary content, metadata
   * @element span, small
   * @contrast 4.5:1 minimum
   */
  small: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Caption - Labels, helper text
   * @element span
   * @contrast 4.5:1 minimum
   */
  caption: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Overline - Category labels, section markers
   * @element span
   * @contrast 4.5:1 minimum
   * @note Uses uppercase with wide tracking
   */
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wider,
    textTransform: "uppercase" as const,
  },

  /**
   * Button - Interactive button text
   * @element button, a
   * @contrast 4.5:1 minimum (3:1 for large buttons)
   */
  button: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Table header - Column headers
   * @element th
   * @contrast 4.5:1 minimum
   */
  tableHeader: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.wide,
    textTransform: "uppercase" as const,
  },

  /**
   * Table cell - Table data
   * @element td
   * @contrast 4.5:1 minimum
   */
  tableCell: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Code - Inline code snippets
   * @element code
   * @contrast 4.5:1 minimum
   */
  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.normal,
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
export type TextStyles = typeof textStyles;
export type TextStyleKey = keyof typeof textStyles;
