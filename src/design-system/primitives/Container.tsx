/**
 * Container Primitive
 *
 * A responsive container that handles max-width, horizontal padding,
 * and centering. Uses Design System spacing tokens.
 *
 * @accessibility
 * - Pure layout component, no semantic requirements
 * - Can render as different elements via `as` prop
 *
 * @example
 * <Container>
 *   <Heading level={1}>Page Title</Heading>
 *   <Text>Content goes here</Text>
 * </Container>
 *
 * <Container maxWidth="sm" padding="lg">
 *   <p>Narrow container with larger padding</p>
 * </Container>
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content to wrap
   */
  children: React.ReactNode;

  /**
   * Maximum width of the container
   * @default 'lg'
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "prose";

  /**
   * Horizontal padding size
   * @default 'md'
   */
  padding?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * Whether to center the container horizontally
   * @default true
   */
  centered?: boolean;

  /**
   * The HTML element to render
   * @default 'div'
   */
  as?: "div" | "main" | "section" | "article" | "aside";
}

/**
 * Max-width classes mapped to container sizes
 * Based on common breakpoints and content widths
 */
const maxWidthClasses: Record<
  NonNullable<ContainerProps["maxWidth"]>,
  string
> = {
  xs: "max-w-xs", // 320px
  sm: "max-w-xl", // 576px
  md: "max-w-3xl", // 768px
  lg: "max-w-5xl", // 1024px
  xl: "max-w-6xl", // 1152px
  "2xl": "max-w-7xl", // 1280px
  full: "max-w-full", // 100%
  prose: "max-w-prose", // 65ch (optimal reading width)
};

/**
 * Horizontal padding classes using DS spacing tokens
 * Responsive: smaller on mobile, larger on desktop
 */
const paddingClasses: Record<NonNullable<ContainerProps["padding"]>, string> = {
  none: "px-0",
  sm: "px-3 sm:px-4", // 12px -> 16px
  md: "px-4 sm:px-6 lg:px-8", // 16px -> 24px -> 32px
  lg: "px-6 sm:px-8 lg:px-12", // 24px -> 32px -> 48px
  xl: "px-8 sm:px-12 lg:px-16", // 32px -> 48px -> 64px
};

export function Container({
  children,
  maxWidth = "lg",
  padding = "md",
  centered = true,
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centered && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

Container.displayName = "Container";
