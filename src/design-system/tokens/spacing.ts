/**
 * Design System: Spacing Tokens
 *
 * Consistent spacing scale based on 4px (0.25rem) base unit.
 * Used for margins, paddings, gaps, and layout spacing.
 */

// =============================================================================
// SPACING SCALE
// =============================================================================

/**
 * Spacing scale in rem units
 *
 * Base unit: 4px (0.25rem)
 * Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64
 */
export const spacing = {
  /** 0px */
  0: "0",
  /** 1px - Hairline spacing */
  px: "1px",
  /** 2px - Micro spacing */
  0.5: "0.125rem",
  /** 4px - Tight spacing */
  1: "0.25rem",
  /** 6px */
  1.5: "0.375rem",
  /** 8px - Small spacing (icon gaps, tight padding) */
  2: "0.5rem",
  /** 10px */
  2.5: "0.625rem",
  /** 12px - Medium-small spacing (button padding-x) */
  3: "0.75rem",
  /** 14px */
  3.5: "0.875rem",
  /** 16px - Base spacing (card padding, standard gaps) */
  4: "1rem",
  /** 20px */
  5: "1.25rem",
  /** 24px - Large spacing (section padding) */
  6: "1.5rem",
  /** 28px */
  7: "1.75rem",
  /** 32px - XL spacing (major section gaps) */
  8: "2rem",
  /** 36px */
  9: "2.25rem",
  /** 40px */
  10: "2.5rem",
  /** 44px */
  11: "2.75rem",
  /** 48px - 2XL spacing (page-level rhythm) */
  12: "3rem",
  /** 56px */
  14: "3.5rem",
  /** 64px - 3XL spacing */
  16: "4rem",
  /** 80px */
  20: "5rem",
  /** 96px - 4XL spacing */
  24: "6rem",
  /** 128px */
  32: "8rem",
  /** 160px */
  40: "10rem",
  /** 192px */
  48: "12rem",
  /** 256px */
  64: "16rem",
} as const;

// =============================================================================
// SEMANTIC SPACING
// =============================================================================

/**
 * Semantic spacing tokens for common use cases
 *
 * These provide meaningful names for spacing values,
 * making it easier to maintain consistency across the design system.
 */
export const semanticSpacing = {
  /** Spacing between inline elements (icons and text) */
  inline: {
    xs: spacing[1], // 4px
    sm: spacing[1.5], // 6px
    md: spacing[2], // 8px
    lg: spacing[3], // 12px
  },

  /** Spacing between stacked elements (vertical rhythm) */
  stack: {
    xs: spacing[1], // 4px
    sm: spacing[2], // 8px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
    "2xl": spacing[12], // 48px
  },

  /** Inset padding (all sides) */
  inset: {
    xs: spacing[1], // 4px
    sm: spacing[2], // 8px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
  },

  /** Squish padding (less vertical than horizontal) */
  squish: {
    sm: { x: spacing[2], y: spacing[1] }, // 8px x 4px
    md: { x: spacing[3], y: spacing[1.5] }, // 12px x 6px
    lg: { x: spacing[4], y: spacing[2] }, // 16px x 8px
    xl: { x: spacing[6], y: spacing[3] }, // 24px x 12px
  },

  /** Stretch padding (more vertical than horizontal) */
  stretch: {
    sm: { x: spacing[1], y: spacing[2] }, // 4px x 8px
    md: { x: spacing[2], y: spacing[4] }, // 8px x 16px
    lg: { x: spacing[4], y: spacing[6] }, // 16px x 24px
  },

  /** Component-specific spacing */
  component: {
    /** Button padding */
    button: {
      sm: { x: spacing[3], y: spacing[1.5] }, // 12px x 6px
      md: { x: spacing[4], y: spacing[2] }, // 16px x 8px
      lg: { x: spacing[6], y: spacing[2.5] }, // 24px x 10px
    },
    /** Card padding */
    card: {
      sm: spacing[4], // 16px
      md: spacing[5], // 20px
      lg: spacing[6], // 24px
    },
    /** Input padding */
    input: {
      x: spacing[3], // 12px
      y: spacing[2], // 8px
    },
    /** Modal padding */
    modal: {
      header: spacing[6], // 24px
      body: spacing[6], // 24px
      footer: spacing[4], // 16px
    },
  },

  /** Layout-level spacing */
  layout: {
    /** Page margins */
    pageMargin: {
      sm: spacing[4], // 16px (mobile)
      md: spacing[6], // 24px (tablet)
      lg: spacing[8], // 32px (desktop)
    },
    /** Section spacing */
    section: {
      sm: spacing[8], // 32px
      md: spacing[12], // 48px
      lg: spacing[16], // 64px
    },
    /** Gap between grid items */
    grid: {
      sm: spacing[4], // 16px
      md: spacing[6], // 24px
      lg: spacing[8], // 32px
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Spacing = typeof spacing;
export type SpacingKey = keyof typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
