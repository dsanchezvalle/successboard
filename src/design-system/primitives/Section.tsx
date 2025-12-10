/**
 * Section Primitive
 *
 * A semantic container for grouping related content with consistent
 * vertical spacing. Enforces accessible naming when appropriate.
 *
 * @accessibility
 * - Uses semantic HTML elements (section, article, aside, nav, etc.)
 * - Requires accessible name via aria-label or aria-labelledby for
 *   landmark regions (section, aside, nav)
 * - Warns in development if landmark lacks accessible name
 *
 * @example
 * <Section aria-label="Customer overview">
 *   <Heading level={2}>Overview</Heading>
 *   <Text>Content here</Text>
 * </Section>
 *
 * <Section as="article" spacing="lg">
 *   <Heading level={2} id="metrics-heading">Metrics</Heading>
 *   <Text>Article content</Text>
 * </Section>
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content to wrap
   */
  children: React.ReactNode;

  /**
   * The semantic HTML element to render
   * @default 'section'
   */
  as?:
    | "section"
    | "article"
    | "aside"
    | "nav"
    | "header"
    | "footer"
    | "main"
    | "div";

  /**
   * Vertical spacing (padding/margin) size
   * @default 'md'
   */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Gap between child elements (uses flex/grid gap)
   * @default 'md'
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Accessible label for the section (required for landmarks without visible heading)
   */
  "aria-label"?: string;

  /**
   * ID of the element that labels this section
   */
  "aria-labelledby"?: string;
}

/**
 * Vertical spacing classes (applied as padding-y)
 */
const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "py-0",
  xs: "py-2", // 8px
  sm: "py-4", // 16px
  md: "py-6", // 24px
  lg: "py-8", // 32px
  xl: "py-12", // 48px
  "2xl": "py-16", // 64px
};

/**
 * Gap classes for child element spacing
 */
const gapClasses: Record<NonNullable<SectionProps["gap"]>, string> = {
  none: "gap-0",
  xs: "gap-2", // 8px
  sm: "gap-3", // 12px
  md: "gap-4", // 16px
  lg: "gap-6", // 24px
  xl: "gap-8", // 32px
};

/**
 * Elements that are landmark regions and should have accessible names
 */
const landmarkElements = ["section", "aside", "nav"];

export function Section({
  children,
  as: Component = "section",
  spacing = "md",
  gap = "md",
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: SectionProps) {
  // Development warning for landmarks without accessible names
  if (process.env.NODE_ENV === "development") {
    const isLandmark = landmarkElements.includes(Component);
    const hasAccessibleName = ariaLabel || ariaLabelledby;

    if (isLandmark && !hasAccessibleName) {
      console.warn(
        `[Section] The <${Component}> element should have an accessible name. ` +
          `Add aria-label or aria-labelledby prop for better accessibility.`
      );
    }
  }

  return (
    <Component
      className={cn(
        "flex flex-col",
        spacingClasses[spacing],
        gapClasses[gap],
        className
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...props}
    >
      {children}
    </Component>
  );
}

Section.displayName = "Section";
