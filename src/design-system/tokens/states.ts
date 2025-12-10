/**
 * Design System: Interaction State Tokens
 *
 * Tokens for interactive element states: hover, active, selected, disabled.
 * Designed to provide multi-signal differentiation (not color-only).
 *
 * @accessibility
 * - States are distinguishable by multiple signals (color + border + icon)
 * - Disabled states use reduced opacity + cursor change
 * - Selected states include border/background + optional icon indicator
 */

import { gray, blue, red, green, amber } from "./colors";

// =============================================================================
// STATE OVERLAY TOKENS
// =============================================================================

/**
 * Semi-transparent overlays for state indication
 *
 * These are applied on top of the base color to indicate state changes.
 * Using overlays ensures consistent state appearance across different
 * base colors.
 */
export const stateOverlay = {
  light: {
    /** Hover state overlay */
    hover: "rgba(0, 0, 0, 0.04)",
    /** Active/pressed state overlay */
    active: "rgba(0, 0, 0, 0.08)",
    /** Selected state overlay */
    selected: "rgba(0, 0, 0, 0.06)",
    /** Dragging state overlay */
    dragging: "rgba(0, 0, 0, 0.12)",
  },
  dark: {
    /** Hover state overlay */
    hover: "rgba(255, 255, 255, 0.06)",
    /** Active/pressed state overlay */
    active: "rgba(255, 255, 255, 0.10)",
    /** Selected state overlay */
    selected: "rgba(255, 255, 255, 0.08)",
    /** Dragging state overlay */
    dragging: "rgba(255, 255, 255, 0.14)",
  },
} as const;

// =============================================================================
// INTERACTIVE STATE TOKENS
// =============================================================================

/**
 * Complete state token sets for interactive elements
 */
export const interactiveStates = {
  light: {
    /** Default/rest state */
    default: {
      background: "transparent",
      border: "transparent",
      text: gray[700],
    },

    /** Hover state */
    hover: {
      background: gray[50],
      border: "transparent",
      text: gray[900],
      cursor: "pointer",
    },

    /** Active/pressed state */
    active: {
      background: gray[100],
      border: "transparent",
      text: gray[900],
      transform: "scale(0.98)",
    },

    /** Selected state */
    selected: {
      background: blue[50],
      border: blue[200],
      text: blue[700],
      /** Additional indicator: left border or checkmark */
      indicator: blue[600],
    },

    /** Disabled state */
    disabled: {
      background: gray[100],
      border: gray[200],
      text: gray[400],
      opacity: "0.5",
      cursor: "not-allowed",
      /** Pointer events disabled */
      pointerEvents: "none" as const,
    },

    /** Loading state */
    loading: {
      background: gray[50],
      border: gray[200],
      text: gray[500],
      cursor: "wait",
      /** Shows spinner, content may be hidden */
      opacity: "0.7",
    },

    /** Focus state (see focus.ts for ring styles) */
    focus: {
      /** Focus adds outline, doesn't change background */
      background: "transparent",
      border: "transparent",
      text: gray[900],
    },

    /** Error state */
    error: {
      background: red[50],
      border: red[300],
      text: red[700],
      icon: red[600],
    },

    /** Success state */
    success: {
      background: green[50],
      border: green[300],
      text: green[700],
      icon: green[600],
    },

    /** Warning state */
    warning: {
      background: amber[50],
      border: amber[300],
      text: amber[700],
      icon: amber[600],
    },
  },

  dark: {
    default: {
      background: "transparent",
      border: "transparent",
      text: gray[300],
    },

    hover: {
      background: gray[800],
      border: "transparent",
      text: gray[100],
      cursor: "pointer",
    },

    active: {
      background: gray[700],
      border: "transparent",
      text: gray[50],
      transform: "scale(0.98)",
    },

    selected: {
      background: blue[950],
      border: blue[800],
      text: blue[300],
      indicator: blue[400],
    },

    disabled: {
      background: gray[800],
      border: gray[700],
      text: gray[500],
      opacity: "0.5",
      cursor: "not-allowed",
      pointerEvents: "none" as const,
    },

    loading: {
      background: gray[800],
      border: gray[700],
      text: gray[400],
      cursor: "wait",
      opacity: "0.7",
    },

    focus: {
      background: "transparent",
      border: "transparent",
      text: gray[100],
    },

    error: {
      background: red[950],
      border: red[800],
      text: red[300],
      icon: red[400],
    },

    success: {
      background: green[950],
      border: green[800],
      text: green[300],
      icon: green[400],
    },

    warning: {
      background: amber[950],
      border: amber[800],
      text: amber[300],
      icon: amber[400],
    },
  },
} as const;

// =============================================================================
// BUTTON STATE TOKENS
// =============================================================================

/**
 * State tokens specifically for buttons
 */
export const buttonStates = {
  light: {
    primary: {
      default: { bg: blue[600], text: "#FFFFFF", border: blue[600] },
      hover: { bg: blue[700], text: "#FFFFFF", border: blue[700] },
      active: { bg: blue[800], text: "#FFFFFF", border: blue[800] },
      disabled: { bg: gray[200], text: gray[400], border: gray[200] },
    },
    secondary: {
      default: { bg: "transparent", text: gray[700], border: gray[300] },
      hover: { bg: gray[50], text: gray[900], border: gray[400] },
      active: { bg: gray[100], text: gray[900], border: gray[400] },
      disabled: { bg: gray[50], text: gray[400], border: gray[200] },
    },
    ghost: {
      default: { bg: "transparent", text: gray[700], border: "transparent" },
      hover: { bg: gray[100], text: gray[900], border: "transparent" },
      active: { bg: gray[200], text: gray[900], border: "transparent" },
      disabled: { bg: "transparent", text: gray[400], border: "transparent" },
    },
    destructive: {
      default: { bg: red[600], text: "#FFFFFF", border: red[600] },
      hover: { bg: red[700], text: "#FFFFFF", border: red[700] },
      active: { bg: red[800], text: "#FFFFFF", border: red[800] },
      disabled: { bg: gray[200], text: gray[400], border: gray[200] },
    },
  },
  dark: {
    primary: {
      default: { bg: blue[500], text: "#FFFFFF", border: blue[500] },
      hover: { bg: blue[400], text: "#FFFFFF", border: blue[400] },
      active: { bg: blue[300], text: gray[900], border: blue[300] },
      disabled: { bg: gray[700], text: gray[500], border: gray[700] },
    },
    secondary: {
      default: { bg: "transparent", text: gray[300], border: gray[600] },
      hover: { bg: gray[800], text: gray[100], border: gray[500] },
      active: { bg: gray[700], text: gray[50], border: gray[500] },
      disabled: { bg: gray[800], text: gray[500], border: gray[700] },
    },
    ghost: {
      default: { bg: "transparent", text: gray[300], border: "transparent" },
      hover: { bg: gray[800], text: gray[100], border: "transparent" },
      active: { bg: gray[700], text: gray[50], border: "transparent" },
      disabled: { bg: "transparent", text: gray[500], border: "transparent" },
    },
    destructive: {
      default: { bg: red[600], text: "#FFFFFF", border: red[600] },
      hover: { bg: red[500], text: "#FFFFFF", border: red[500] },
      active: { bg: red[400], text: "#FFFFFF", border: red[400] },
      disabled: { bg: gray[700], text: gray[500], border: gray[700] },
    },
  },
} as const;

// =============================================================================
// INPUT STATE TOKENS
// =============================================================================

/**
 * State tokens specifically for form inputs
 */
export const inputStates = {
  light: {
    default: {
      background: "#FFFFFF",
      border: gray[300],
      text: gray[900],
      placeholder: gray[500],
    },
    hover: {
      background: "#FFFFFF",
      border: gray[400],
      text: gray[900],
      placeholder: gray[500],
    },
    focus: {
      background: "#FFFFFF",
      border: blue[600],
      text: gray[900],
      placeholder: gray[400],
      ring: `0 0 0 3px rgba(37, 99, 235, 0.2)`,
    },
    disabled: {
      background: gray[100],
      border: gray[200],
      text: gray[400],
      placeholder: gray[300],
    },
    error: {
      background: "#FFFFFF",
      border: red[500],
      text: gray[900],
      placeholder: gray[500],
      ring: `0 0 0 3px rgba(220, 38, 38, 0.2)`,
    },
    success: {
      background: "#FFFFFF",
      border: green[500],
      text: gray[900],
      placeholder: gray[500],
      ring: `0 0 0 3px rgba(22, 163, 74, 0.2)`,
    },
  },
  dark: {
    default: {
      background: gray[900],
      border: gray[700],
      text: gray[100],
      placeholder: gray[500],
    },
    hover: {
      background: gray[900],
      border: gray[600],
      text: gray[100],
      placeholder: gray[500],
    },
    focus: {
      background: gray[900],
      border: blue[500],
      text: gray[100],
      placeholder: gray[400],
      ring: `0 0 0 3px rgba(96, 165, 250, 0.3)`,
    },
    disabled: {
      background: gray[800],
      border: gray[700],
      text: gray[500],
      placeholder: gray[600],
    },
    error: {
      background: gray[900],
      border: red[500],
      text: gray[100],
      placeholder: gray[500],
      ring: `0 0 0 3px rgba(248, 113, 113, 0.3)`,
    },
    success: {
      background: gray[900],
      border: green[500],
      text: gray[100],
      placeholder: gray[500],
      ring: `0 0 0 3px rgba(74, 222, 128, 0.3)`,
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type StateOverlay = typeof stateOverlay;
export type InteractiveStates = typeof interactiveStates;
export type ButtonStates = typeof buttonStates;
export type InputStates = typeof inputStates;
