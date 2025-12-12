/**
 * OverviewHeader - Dashboard page header
 *
 * Displays the page title, subtitle, and optional quick actions.
 * Uses Design System primitives for typography.
 *
 * @accessibility
 * - H1 for page title (single H1 per page)
 * - Good color contrast for all text
 */

import * as React from "react";
import { Heading, Text } from "@/design-system/primitives";
import { cn } from "@/design-system/utils/cn";

export interface OverviewHeaderProps {
  /** Page title */
  title: string;
  /** Page subtitle/description */
  subtitle?: string;
  /** Optional right-side content (actions, filters) */
  actions?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function OverviewHeader({
  title,
  subtitle,
  actions,
  className,
}: OverviewHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <Heading level={1} className="text-text-primary">
          {title}
        </Heading>
        {subtitle && (
          <Text
            variant="body"
            color="muted"
            className="max-w-2xl text-text-muted"
          >
            {subtitle}
          </Text>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 sm:flex-shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
}

OverviewHeader.displayName = "OverviewHeader";
