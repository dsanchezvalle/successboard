/**
 * Design System: Motion Tokens
 *
 * Animation and transition tokens with accessibility support.
 * Includes prefers-reduced-motion handling per WCAG 2.1.
 *
 * @accessibility
 * - All durations ≤ 200ms for UI transitions
 * - Reduced motion users get instant state changes
 * - No essential information conveyed via animation alone
 */

// =============================================================================
// DURATION
// =============================================================================

/**
 * Duration scale for transitions and animations
 *
 * @accessibility All UI transitions should use 200ms or less
 * to avoid motion sickness and maintain responsiveness.
 */
export const duration = {
  /** 0ms - Instant, no transition */
  instant: "0ms",
  /** 75ms - Ultra fast, micro-interactions */
  fastest: "75ms",
  /** 100ms - Fast, button states */
  fast: "100ms",
  /** 150ms - Normal, most UI transitions */
  normal: "150ms",
  /** 200ms - Slow, larger element transitions */
  slow: "200ms",
  /** 300ms - Slower, page transitions (use sparingly) */
  slower: "300ms",
  /** 500ms - Slowest, complex animations (use sparingly) */
  slowest: "500ms",
} as const;

// =============================================================================
// EASING
// =============================================================================

/**
 * Easing functions for natural motion
 *
 * Based on Material Design motion principles.
 */
export const easing = {
  /** Standard easing - most UI transitions */
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  /** Ease in - elements entering (accelerate) */
  in: "cubic-bezier(0.4, 0, 1, 1)",
  /** Ease out - elements exiting (decelerate) */
  out: "cubic-bezier(0, 0, 0.2, 1)",
  /** Ease in-out - elements moving across screen */
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  /** Linear - progress indicators, continuous motion */
  linear: "linear",
  /** Bounce - playful interactions (use sparingly) */
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

/**
 * Pre-composed transition values for common use cases
 */
export const transitions = {
  /** No transition */
  none: "none",

  /** All properties - standard timing */
  all: `all ${duration.normal} ${easing.default}`,

  /** Color transitions (background, border, text) */
  colors: `color ${duration.normal} ${easing.default}, background-color ${duration.normal} ${easing.default}, border-color ${duration.normal} ${easing.default}`,

  /** Opacity transitions */
  opacity: `opacity ${duration.normal} ${easing.default}`,

  /** Transform transitions (scale, translate, rotate) */
  transform: `transform ${duration.normal} ${easing.default}`,

  /** Shadow transitions */
  shadow: `box-shadow ${duration.normal} ${easing.default}`,

  /** Combined for interactive elements */
  interactive: `color ${duration.fast} ${easing.default}, background-color ${duration.fast} ${easing.default}, border-color ${duration.fast} ${easing.default}, box-shadow ${duration.fast} ${easing.default}, transform ${duration.fast} ${easing.default}`,

  /** Fade in/out */
  fade: `opacity ${duration.normal} ${easing.out}`,

  /** Scale up/down */
  scale: `transform ${duration.fast} ${easing.out}`,

  /** Slide transitions */
  slide: `transform ${duration.slow} ${easing.out}`,
} as const;

// =============================================================================
// ANIMATION KEYFRAMES
// =============================================================================

/**
 * Common animation keyframe definitions
 *
 * These are string representations that can be used in CSS-in-JS
 * or converted to @keyframes in CSS.
 */
export const keyframes = {
  /** Fade in from transparent */
  fadeIn: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },

  /** Fade out to transparent */
  fadeOut: {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },

  /** Scale up from smaller */
  scaleIn: {
    from: { opacity: "0", transform: "scale(0.95)" },
    to: { opacity: "1", transform: "scale(1)" },
  },

  /** Scale down and fade out */
  scaleOut: {
    from: { opacity: "1", transform: "scale(1)" },
    to: { opacity: "0", transform: "scale(0.95)" },
  },

  /** Slide in from top */
  slideInFromTop: {
    from: { opacity: "0", transform: "translateY(-10px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },

  /** Slide in from bottom */
  slideInFromBottom: {
    from: { opacity: "0", transform: "translateY(10px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },

  /** Slide in from left */
  slideInFromLeft: {
    from: { opacity: "0", transform: "translateX(-10px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },

  /** Slide in from right */
  slideInFromRight: {
    from: { opacity: "0", transform: "translateX(10px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },

  /** Pulse animation for loading states */
  pulse: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.5" },
  },

  /** Spin animation for loaders */
  spin: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
} as const;

// =============================================================================
// REDUCED MOTION
// =============================================================================

/**
 * CSS media query for reduced motion preference
 *
 * @accessibility Users who prefer reduced motion should see
 * instant state changes instead of animations.
 *
 * @example
 * ```css
 * .animated-element {
 *   transition: transform 200ms ease;
 * }
 *
 * @media (prefers-reduced-motion: reduce) {
 *   .animated-element {
 *     transition: none;
 *   }
 * }
 * ```
 */
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

/**
 * CSS snippet for disabling motion
 *
 * Apply this to your global styles to respect user preferences.
 */
export const reducedMotionStyles = `
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

/**
 * Helper to get motion-safe transition value
 *
 * Returns the transition for normal users, or 'none' for reduced motion.
 * Use this in JavaScript/React when you need runtime motion detection.
 */
export const getMotionSafeTransition = (transition: string): string => {
  if (typeof window === "undefined") return transition;
  const prefersReducedMotion = window.matchMedia(reducedMotionQuery).matches;
  return prefersReducedMotion ? "none" : transition;
};

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Duration = typeof duration;
export type DurationKey = keyof typeof duration;
export type Easing = typeof easing;
export type EasingKey = keyof typeof easing;
export type Transitions = typeof transitions;
export type TransitionKey = keyof typeof transitions;
