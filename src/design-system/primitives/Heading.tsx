/**
 * Heading Primitive
 *
 * Renders semantic heading elements (h1-h6) with Design System typography.
 * Enforces proper heading hierarchy and accessibility.
 *
 * @accessibility
 * - Uses semantic <h1>–<h6> elements
 * - Visual style can differ from semantic level via `visualLevel`
 * - Warns in development about heading hierarchy issues
 *
 * @example
 * <Heading level={1}>Page Title</Heading>
 *
 * <Heading level={2} visualLevel={3}>
 *   Semantically h2, styled as h3
 * </Heading>
 *
 * <Heading level={3} color="muted">
 *   Muted heading
 * </Heading>
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The semantic heading level (determines the HTML tag)
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Visual style level (defaults to semantic level)
   * Use when you need a heading to look like a different level
   */
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The content of the heading
   */
  children: React.ReactNode;

  /**
   * Text color variant
   * @default 'primary'
   */
  color?: "primary" | "secondary" | "muted" | "inherit";

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right";
}

/**
 * Typography classes for each heading level
 * Based on DS typography tokens
 */
const levelClasses: Record<number, string> = {
  1: "text-3xl font-bold leading-tight tracking-tight", // 30px
  2: "text-2xl font-semibold leading-snug tracking-tight", // 24px
  3: "text-xl font-semibold leading-normal", // 20px
  4: "text-lg font-semibold leading-relaxed", // 16px
  5: "text-base font-medium leading-relaxed", // 14px (0.875rem)
  6: "text-sm font-medium leading-relaxed", // 13px (0.8125rem)
};

/**
 * Color classes mapped to semantic color tokens
 */
const colorClasses: Record<NonNullable<HeadingProps["color"]>, string> = {
  primary: "text-gray-900 dark:text-gray-50",
  secondary: "text-gray-700 dark:text-gray-200",
  muted: "text-gray-500 dark:text-gray-400",
  inherit: "text-inherit",
};

/**
 * Text alignment classes
 */
const alignClasses: Record<NonNullable<HeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * Heading element map
 */
const headingElements = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function Heading({
  level,
  visualLevel,
  children,
  color = "primary",
  truncate = false,
  align = "left",
  className,
  ...props
}: HeadingProps) {
  const Component = headingElements[level];
  const styleLevel = visualLevel ?? level;

  return (
    <Component
      className={cn(
        levelClasses[styleLevel],
        colorClasses[color],
        alignClasses[align],
        truncate && "truncate",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

Heading.displayName = "Heading";
