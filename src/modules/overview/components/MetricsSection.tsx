/**
 * MetricsSection - Section wrapper for grouped metrics
 *
 * Provides consistent heading structure and spacing for metric groups.
 * Uses Design System primitives.
 *
 * @accessibility
 * - Uses semantic <section> with aria-labelledby
 * - Proper heading hierarchy (H2 for section titles)
 */

import * as React from "react";
import { cn } from "@/design-system/utils/cn";

export interface MetricsSectionProps {
  /** Section title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Grid columns configuration */
  columns?: 2 | 3 | 4;
  /** Children (typically MetricCard components) */
  children: React.ReactNode;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the grid */
  gridClassName?: string;
}

const columnStyles: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function MetricsSection({
  title,
  subtitle,
  columns = 4,
  children,
  className,
  gridClassName,
}: MetricsSectionProps) {
  const headingId = React.useId();

  return (
    <section className={cn("space-y-3", className)} aria-labelledby={headingId}>
      <div className="space-y-1">
        <h2
          id={headingId}
          className="text-base font-semibold tracking-tight text-gray-100"
        >
          {title}
        </h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className={cn("grid gap-3", columnStyles[columns], gridClassName)}>
        {children}
      </div>
    </section>
  );
}

MetricsSection.displayName = "MetricsSection";
