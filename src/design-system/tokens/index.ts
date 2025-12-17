/**
 * Design System: Token Index
 *
 * Central re-export for all design tokens.
 * Import from this file for convenient access to all tokens.
 *
 * @example
 * import { semanticLight, fontSize, spacing } from '@/design-system/tokens';
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export {
  // Raw palette
  gray,
  blue,
  green,
  amber,
  red,
  purple,
  indigo,
  orange,
  // Semantic mappings
  semanticLight,
  semanticDark,
  // Contrast documentation
  contrastReference,
  // Types
  type GrayScale,
  type BlueScale,
  type GreenScale,
  type AmberScale,
  type RedScale,
  type PurpleScale,
  type IndigoScale,
  type OrangeScale,
  type SemanticLightColors,
  type SemanticDarkColors,
} from "./colors";

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  // Types
  type FontFamily,
  type FontSize,
  type FontWeight,
  type LineHeight,
  type LetterSpacing,
  type TextStyles,
  type TextStyleKey,
} from "./typography";

// =============================================================================
// SPACING TOKENS
// =============================================================================

export {
  spacing,
  semanticSpacing,
  // Types
  type Spacing,
  type SpacingKey,
  type SemanticSpacing,
} from "./spacing";

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export {
  radii,
  semanticRadii,
  // Types
  type Radii,
  type RadiiKey,
  type SemanticRadii,
} from "./radii";

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export {
  shadows,
  shadowsDark,
  semanticShadows,
  semanticShadowsDark,
  // Types
  type Shadows,
  type ShadowKey,
  type SemanticShadows,
} from "./shadows";

// =============================================================================
// MOTION TOKENS
// =============================================================================

export {
  duration,
  easing,
  transitions,
  keyframes,
  reducedMotionQuery,
  reducedMotionStyles,
  getMotionSafeTransition,
  // Types
  type Duration,
  type DurationKey,
  type Easing,
  type EasingKey,
  type Transitions,
  type TransitionKey,
} from "./motion";

// =============================================================================
// FOCUS TOKENS
// =============================================================================

export {
  focusRing,
  focusStyles,
  focusClasses,
  focusWithinStyles,
  // Types
  type FocusRing,
  type FocusStyles,
  type FocusClasses,
} from "./focus";

// =============================================================================
// STATE TOKENS
// =============================================================================

export {
  stateOverlay,
  interactiveStates,
  buttonStates,
  inputStates,
  // Types
  type StateOverlay,
  type InteractiveStates,
  type ButtonStates,
  type InputStates,
} from "./states";

// =============================================================================
// THEME HELPERS
// =============================================================================

/**
 * Get semantic colors for a specific theme
 */
export const getSemanticColors = (theme: "light" | "dark") => {
  return theme === "dark" ? semanticDark : semanticLight;
};

/**
 * Get shadows for a specific theme
 */
export const getShadows = (theme: "light" | "dark") => {
  return theme === "dark" ? shadowsDark : shadows;
};

/**
 * Get interactive states for a specific theme
 */
export const getInteractiveStates = (theme: "light" | "dark") => {
  return theme === "dark" ? interactiveStates.dark : interactiveStates.light;
};
