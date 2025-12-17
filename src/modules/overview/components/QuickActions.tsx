/**
 * QuickActions - Primary dashboard actions
 *
 * Provides quick access to common CS workflows.
 * Links to key areas of the application.
 *
 * @accessibility
 * - Uses semantic button/link elements
 * - Focus-visible styles for keyboard navigation
 * - Descriptive labels for screen readers
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/design-system/utils/cn";

interface QuickActionProps {
  /** Action label */
  label: string;
  /** Action description */
  description: string;
  /** Link href */
  href: string;
  /** Visual variant */
  variant?: "primary" | "secondary" | "warning";
  /** Optional icon */
  icon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "border-info-border bg-info-bg hover:bg-ds-primary-subtle hover:border-ds-primary",
  secondary:
    "border-border-default bg-bg-surface hover:bg-bg-subtle hover:border-border-strong",
  warning:
    "border-warning-border bg-warning-bg hover:bg-warning-bg hover:border-warning-icon",
};

function QuickAction({
  label,
  description,
  href,
  variant = "secondary",
  icon,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-start gap-3 rounded-xl border p-4 transition-all duration-200",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        variantStyles[variant]
      )}
    >
      {icon && (
        <div
          className="flex-shrink-0 text-text-muted group-hover:text-text-secondary"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-text-primary group-hover:text-text-primary">
          {label}
        </h3>
        <p className="mt-0.5 text-xs text-text-muted group-hover:text-text-secondary">
          {description}
        </p>
      </div>
      <div
        className="flex-shrink-0 text-text-disabled group-hover:text-text-muted transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        →
      </div>
    </Link>
  );
}

export interface QuickActionsProps {
  /** Additional CSS classes */
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <section
      className={cn("space-y-3", className)}
      aria-labelledby="quick-actions-heading"
    >
      <h2
        id="quick-actions-heading"
        className="text-base font-semibold tracking-tight text-text-primary"
      >
        Quick Actions
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <QuickAction
          label="View All Customers"
          description="Browse and search your customer portfolio"
          href="/customers"
          variant="primary"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          }
        />

        <QuickAction
          label="View Documents"
          description="Browse customer success documents"
          href="/documents"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          }
        />
      </div>
    </section>
  );
}

QuickActions.displayName = "QuickActions";
