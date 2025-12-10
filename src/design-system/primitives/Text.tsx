/**
 * Text Primitive
 *
 * Renders text content with Design System typography and color tokens.
 * Provides semantic variants for different text purposes.
 *
 * @accessibility
 * - Uses appropriate semantic elements based on variant
 * - Color tokens are validated for WCAG AA contrast
 * - Label variant enforces htmlFor when used as <label>
 *
 * @example
 * <Text>Default body text</Text>
 *
 * <Text variant="small" color="muted">
 *   Helper text
 * </Text>
 *
 * <Text variant="label" as="label" htmlFor="email">
 *   Email address
 * </Text>
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content to render
   */
  children: React.ReactNode;

  /**
   * Text variant determining size and weight
   * @default 'body'
   */
  variant?: "body" | "body-lg" | "small" | "caption" | "label" | "overline";

  /**
   * Text color variant
   * @default 'secondary'
   */
  color?:
    | "primary"
    | "secondary"
    | "muted"
    | "error"
    | "success"
    | "warning"
    | "info"
    | "inherit";

  /**
   * The HTML element to render
   * @default 'p' for body variants, 'span' for others
   */
  as?: "p" | "span" | "div" | "label" | "small" | "strong" | "em";

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right" | "justify";

  /**
   * Font weight override
   */
  weight?: "normal" | "medium" | "semibold" | "bold";

  /**
   * For label variant: the ID of the form element this label is for
   */
  htmlFor?: string;
}

/**
 * Typography classes for each text variant
 * Based on DS typography tokens
 */
const variantClasses: Record<NonNullable<TextProps["variant"]>, string> = {
  body: "text-[0.9375rem] leading-relaxed", // 15px, line-height 1.6
  "body-lg": "text-base leading-relaxed", // 16px, line-height 1.6
  small: "text-sm leading-normal", // 14px, line-height 1.43
  caption: "text-[0.8125rem] font-medium leading-normal", // 13px, medium weight
  label: "text-sm font-medium leading-normal", // 14px, medium weight
  overline: "text-xs font-semibold uppercase tracking-wider leading-normal", // 12px, uppercase
};

/**
 * Color classes mapped to semantic color tokens
 * All colors validated for WCAG AA contrast
 */
const colorClasses: Record<NonNullable<TextProps["color"]>, string> = {
  primary: "text-gray-900 dark:text-gray-50",
  secondary: "text-gray-700 dark:text-gray-200",
  muted: "text-gray-500 dark:text-gray-400",
  error: "text-red-700 dark:text-red-400",
  success: "text-green-700 dark:text-green-400",
  warning: "text-amber-700 dark:text-amber-400",
  info: "text-blue-700 dark:text-blue-400",
  inherit: "text-inherit",
};

/**
 * Text alignment classes
 */
const alignClasses: Record<NonNullable<TextProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Font weight classes
 */
const weightClasses: Record<NonNullable<TextProps["weight"]>, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

/**
 * Default element for each variant
 */
const defaultElements: Record<
  NonNullable<TextProps["variant"]>,
  TextProps["as"]
> = {
  body: "p",
  "body-lg": "p",
  small: "span",
  caption: "span",
  label: "label",
  overline: "span",
};

export function Text({
  children,
  variant = "body",
  color = "secondary",
  as,
  truncate = false,
  align = "left",
  weight,
  htmlFor,
  className,
  ...props
}: TextProps) {
  const Component = as ?? defaultElements[variant] ?? "span";

  // Development warning for label without htmlFor
  if (process.env.NODE_ENV === "development") {
    if (Component === "label" && !htmlFor) {
      console.warn(
        "[Text] Label elements should have an htmlFor prop for accessibility."
      );
    }
  }

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        weight && weightClasses[weight],
        truncate && "truncate",
        className
      )}
      {...(Component === "label" && htmlFor ? { htmlFor } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

Text.displayName = "Text";
