/**
 * Design System: Focus Tokens
 *
 * Focus state tokens for accessible keyboard navigation.
 * All focus indicators meet WCAG 2.1 AA contrast requirements.
 *
 * @accessibility
 * - Focus rings have minimum 3:1 contrast against adjacent colors
 * - Focus indicators are visible in both light and dark themes
 * - Uses :focus-visible for keyboard-only focus indication
 */

import { blue } from "./colors";

// =============================================================================
// FOCUS RING TOKENS
// =============================================================================

/**
 * Focus ring configuration
 */
export const focusRing = {
  /** Focus ring width */
  width: "2px",

  /** Focus ring offset from element */
  offset: "2px",

  /** Focus ring style */
  style: "solid",

  /** Light theme focus color - blue-600 @contrast 4.7:1 vs white */
  colorLight: blue[600],

  /** Dark theme focus color - blue-400 @contrast 5.2:1 vs gray-900 */
  colorDark: blue[400],
} as const;

// =============================================================================
// FOCUS STYLES
// =============================================================================

/**
 * Pre-composed focus style values
 *
 * These can be applied directly to elements or used as references
 * for building component styles.
 */
export const focusStyles = {
  /**
   * Default focus ring
   * Use for most interactive elements (buttons, links, inputs)
   */
  default: {
    outline: `${focusRing.width} ${focusRing.style} ${focusRing.colorLight}`,
    outlineOffset: focusRing.offset,
  },

  /**
   * Default focus ring for dark theme
   */
  defaultDark: {
    outline: `${focusRing.width} ${focusRing.style} ${focusRing.colorDark}`,
    outlineOffset: focusRing.offset,
  },

  /**
   * Inset focus ring
   * Use for elements where outline would be clipped (overflow: hidden)
   */
  inset: {
    outline: "none",
    boxShadow: `inset 0 0 0 ${focusRing.width} ${focusRing.colorLight}`,
  },

  /**
   * Inset focus ring for dark theme
   */
  insetDark: {
    outline: "none",
    boxShadow: `inset 0 0 0 ${focusRing.width} ${focusRing.colorDark}`,
  },

  /**
   * Ring focus (shadow-based)
   * Use for elements that need a softer focus appearance
   */
  ring: {
    outline: "none",
    boxShadow: `0 0 0 ${focusRing.offset} white, 0 0 0 calc(${focusRing.offset} + ${focusRing.width}) ${focusRing.colorLight}`,
  },

  /**
   * Ring focus for dark theme
   */
  ringDark: {
    outline: "none",
    boxShadow: `0 0 0 ${focusRing.offset} #18181B, 0 0 0 calc(${focusRing.offset} + ${focusRing.width}) ${focusRing.colorDark}`,
  },

  /**
   * No visible focus
   * Use ONLY for elements with alternative focus indication
   * (e.g., custom focus states, focus within containers)
   *
   * @accessibility Ensure alternative focus indication is provided
   */
  none: {
    outline: "none",
  },
} as const;

// =============================================================================
// FOCUS CSS UTILITIES
// =============================================================================

/**
 * CSS class utilities for focus states
 *
 * These are Tailwind-compatible class strings that can be used
 * in className props.
 */
export const focusClasses = {
  /**
   * Default focus ring using Tailwind classes
   * Applies focus-visible for keyboard-only focus
   */
  default:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400",

  /**
   * Focus ring with background highlight
   */
  withBackground:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 focus-visible:bg-blue-50 dark:focus-visible:outline-blue-400 dark:focus-visible:bg-blue-950",

  /**
   * Inset focus for contained elements
   */
  inset:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400",

  /**
   * Focus ring (shadow-based)
   */
  ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900",
} as const;

// =============================================================================
// FOCUS WITHIN TOKENS
// =============================================================================

/**
 * Focus-within styles for container elements
 *
 * Use when a container should show focus state when any
 * child element is focused.
 */
export const focusWithinStyles = {
  /**
   * Container border highlight
   */
  border: {
    light: `1px solid ${focusRing.colorLight}`,
    dark: `1px solid ${focusRing.colorDark}`,
  },

  /**
   * Container shadow highlight
   */
  shadow: {
    light: `0 0 0 3px rgba(37, 99, 235, 0.2)`,
    dark: `0 0 0 3px rgba(96, 165, 250, 0.3)`,
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type FocusRing = typeof focusRing;
export type FocusStyles = typeof focusStyles;
export type FocusClasses = typeof focusClasses;
