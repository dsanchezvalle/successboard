/**
 * Design System: Shadow (Elevation) Tokens
 *
 * Box shadow scale for creating depth and visual hierarchy.
 * Shadows are designed to work in both light and dark themes.
 */

// =============================================================================
// SHADOW SCALE
// =============================================================================

/**
 * Shadow scale for elevation levels
 *
 * Uses layered shadows for more natural depth perception.
 * Each level represents increasing elevation from the surface.
 */
export const shadows = {
  /** No shadow */
  none: "none",

  /**
   * Level 1 - Subtle lift
   * Use for: cards at rest, subtle separation
   */
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",

  /**
   * Level 2 - Low elevation
   * Use for: cards, buttons at rest
   */
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",

  /**
   * Level 3 - Medium elevation
   * Use for: dropdowns, hover states
   */
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

  /**
   * Level 4 - High elevation
   * Use for: modals, dialogs, popovers
   */
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",

  /**
   * Level 5 - Highest elevation
   * Use for: notifications, tooltips, floating elements
   */
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",

  /**
   * Level 6 - Maximum elevation
   * Use for: full-screen overlays, command palettes
   */
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  /**
   * Inner shadow
   * Use for: inset effects, pressed states
   */
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// =============================================================================
// DARK THEME SHADOWS
// =============================================================================

/**
 * Shadow scale for dark theme
 *
 * Darker shadows with slightly higher opacity for visibility
 * against dark backgrounds.
 */
export const shadowsDark = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.6)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.3)",
} as const;

// =============================================================================
// SEMANTIC SHADOWS
// =============================================================================

/**
 * Semantic shadow tokens for component-specific use
 */
export const semanticShadows = {
  /** Card shadows */
  card: {
    default: shadows.sm,
    hover: shadows.md,
    active: shadows.xs,
  },

  /** Button shadows */
  button: {
    default: shadows.xs,
    hover: shadows.sm,
    active: shadows.none,
  },

  /** Dropdown/menu shadows */
  dropdown: {
    default: shadows.lg,
  },

  /** Modal/dialog shadows */
  modal: {
    default: shadows.xl,
  },

  /** Tooltip shadows */
  tooltip: {
    default: shadows.md,
  },

  /** Toast/notification shadows */
  toast: {
    default: shadows.lg,
  },

  /** Input focus shadow (ring effect) */
  focus: {
    default: "0 0 0 3px rgb(37 99 235 / 0.2)", // blue-600 at 20%
    error: "0 0 0 3px rgb(220 38 38 / 0.2)", // red-600 at 20%
    success: "0 0 0 3px rgb(22 163 74 / 0.2)", // green-600 at 20%
  },
} as const;

/**
 * Semantic shadow tokens for dark theme
 */
export const semanticShadowsDark = {
  card: {
    default: shadowsDark.sm,
    hover: shadowsDark.md,
    active: shadowsDark.xs,
  },
  button: {
    default: shadowsDark.xs,
    hover: shadowsDark.sm,
    active: shadowsDark.none,
  },
  dropdown: {
    default: shadowsDark.lg,
  },
  modal: {
    default: shadowsDark.xl,
  },
  tooltip: {
    default: shadowsDark.md,
  },
  toast: {
    default: shadowsDark.lg,
  },
  focus: {
    default: "0 0 0 3px rgb(96 165 250 / 0.3)", // blue-400 at 30%
    error: "0 0 0 3px rgb(248 113 113 / 0.3)", // red-400 at 30%
    success: "0 0 0 3px rgb(74 222 128 / 0.3)", // green-400 at 30%
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Shadows = typeof shadows;
export type ShadowKey = keyof typeof shadows;
export type SemanticShadows = typeof semanticShadows;
