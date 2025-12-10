/**
 * Design System: Border Radius Tokens
 *
 * Consistent border radius scale for rounded corners.
 * Provides both raw values and semantic tokens for common use cases.
 */

// =============================================================================
// RADIUS SCALE
// =============================================================================

/**
 * Border radius scale
 *
 * Uses a geometric progression for visual harmony.
 */
export const radii = {
  /** No rounding */
  none: "0",
  /** 2px - Subtle rounding */
  xs: "0.125rem",
  /** 4px - Small elements (tags, chips) */
  sm: "0.25rem",
  /** 6px - Buttons, inputs */
  md: "0.375rem",
  /** 8px - Cards, panels */
  lg: "0.5rem",
  /** 10px - Large cards */
  xl: "0.625rem",
  /** 12px - Modals, dialogs */
  "2xl": "0.75rem",
  /** 16px - Large containers */
  "3xl": "1rem",
  /** 24px - Extra large elements */
  "4xl": "1.5rem",
  /** Full rounding (pills, avatars) */
  full: "9999px",
} as const;

// =============================================================================
// SEMANTIC RADII
// =============================================================================

/**
 * Semantic radius tokens for component-specific use
 *
 * These provide consistent rounding across similar component types.
 */
export const semanticRadii = {
  /** Interactive elements */
  interactive: {
    /** Buttons */
    button: radii.md,
    /** Form inputs */
    input: radii.md,
    /** Checkboxes */
    checkbox: radii.xs,
    /** Toggle switches */
    toggle: radii.full,
  },

  /** Container elements */
  container: {
    /** Cards */
    card: radii.xl,
    /** Panels, sidebars */
    panel: radii.lg,
    /** Modals, dialogs */
    modal: radii["2xl"],
    /** Dropdown menus */
    dropdown: radii.lg,
    /** Tooltips */
    tooltip: radii.md,
    /** Popovers */
    popover: radii.lg,
  },

  /** Feedback elements */
  feedback: {
    /** Badges, tags */
    badge: radii.sm,
    /** Pills (full rounded badges) */
    pill: radii.full,
    /** Alerts, banners */
    alert: radii.lg,
    /** Toast notifications */
    toast: radii.lg,
  },

  /** Media elements */
  media: {
    /** Avatars */
    avatar: radii.full,
    /** Thumbnails */
    thumbnail: radii.md,
    /** Image containers */
    image: radii.lg,
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Radii = typeof radii;
export type RadiiKey = keyof typeof radii;
export type SemanticRadii = typeof semanticRadii;
