/**
 * VisuallyHidden Primitive
 *
 * Hides content visually while keeping it accessible to screen readers.
 * Use for skip links, form labels, or any content that should be
 * announced but not displayed.
 *
 * @accessibility
 * - Content remains in the accessibility tree
 * - Focusable elements become visible when focused (optional)
 *
 * @example
 * <VisuallyHidden>Skip to main content</VisuallyHidden>
 *
 * <label>
 *   <VisuallyHidden>Search</VisuallyHidden>
 *   <input type="search" placeholder="Search..." />
 * </label>
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to hide visually
   */
  children: React.ReactNode;

  /**
   * If true, content becomes visible when focused (useful for skip links)
   * @default false
   */
  focusable?: boolean;

  /**
   * The HTML element to render
   * @default 'span'
   */
  as?: "span" | "div" | "label";
}

/**
 * CSS for visually hiding content while keeping it accessible
 * Based on the standard "sr-only" pattern
 */
const visuallyHiddenStyles = [
  "absolute",
  "w-px",
  "h-px",
  "p-0",
  "-m-px",
  "overflow-hidden",
  "whitespace-nowrap",
  "border-0",
  "[clip:rect(0,0,0,0)]",
].join(" ");

/**
 * Additional styles for focusable variant
 * Makes content visible when focused
 */
const focusableStyles = [
  "focus:static",
  "focus:w-auto",
  "focus:h-auto",
  "focus:p-2",
  "focus:m-0",
  "focus:overflow-visible",
  "focus:whitespace-normal",
  "focus:[clip:auto]",
  "focus:bg-white",
  "focus:text-gray-900",
  "focus:z-50",
  "dark:focus:bg-gray-900",
  "dark:focus:text-gray-50",
].join(" ");

export function VisuallyHidden({
  children,
  focusable = false,
  as: Component = "span",
  className,
  ...props
}: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        visuallyHiddenStyles,
        focusable && focusableStyles,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

VisuallyHidden.displayName = "VisuallyHidden";
