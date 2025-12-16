/**
 * CustomersHubTabs - Segment tab navigation
 *
 * Accessible tab component for switching between customer segments.
 * Uses proper ARIA roles and keyboard navigation.
 *
 * @accessibility
 * - role="tablist" on container
 * - role="tab" on each tab button
 * - aria-selected for current tab
 * - Keyboard navigation (arrow keys)
 * - Focus-visible styles
 */

"use client";

import * as React from "react";
import { cn } from "@/design-system/utils/cn";
import type {
  CustomerSegmentTab,
  CustomersSegmentationSummary,
} from "@/modules/api";

interface SegmentTabConfig {
  id: CustomerSegmentTab;
  label: string;
  description: string;
  color: "default" | "success" | "warning" | "danger" | "info";
}

export interface CustomersHubTabsProps {
  /** Currently selected segment */
  value: CustomerSegmentTab;
  /** Callback when segment changes */
  onChange: (segment: CustomerSegmentTab) => void;
  /** Segmentation summary for counts */
  summary: CustomersSegmentationSummary;
  /** Additional CSS classes */
  className?: string;
}

const TABS: SegmentTabConfig[] = [
  { id: "all", label: "All", description: "All customers", color: "default" },
  {
    id: "active",
    label: "Active",
    description: "Healthy customers",
    color: "success",
  },
  {
    id: "at-risk",
    label: "At-Risk",
    description: "Need attention",
    color: "danger",
  },
  {
    id: "vip",
    label: "VIP",
    description: "High-value accounts",
    color: "info",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    description: "Recently signed",
    color: "warning",
  },
  {
    id: "trial",
    label: "Trial",
    description: "Evaluating",
    color: "default",
  },
];

/**
 * Tab color styles using DS semantic tokens for proper light/dark theming
 */
const colorStyles: Record<
  SegmentTabConfig["color"],
  { active: string; inactive: string; count: string }
> = {
  default: {
    active: "border-border-strong text-text-primary",
    inactive:
      "border-transparent text-text-muted hover:text-text-secondary hover:border-border-default",
    count: "bg-bg-muted text-text-secondary",
  },
  success: {
    active: "border-success-icon text-success-foreground",
    inactive:
      "border-transparent text-text-muted hover:text-success-foreground hover:border-success-border",
    count: "bg-success-bg text-success-foreground",
  },
  warning: {
    active: "border-warning-icon text-warning-foreground",
    inactive:
      "border-transparent text-text-muted hover:text-warning-foreground hover:border-warning-border",
    count: "bg-warning-bg text-warning-foreground",
  },
  danger: {
    active: "border-error-icon text-error-foreground",
    inactive:
      "border-transparent text-text-muted hover:text-error-foreground hover:border-error-border",
    count: "bg-error-bg text-error-foreground",
  },
  info: {
    active: "border-info-icon text-info-foreground",
    inactive:
      "border-transparent text-text-muted hover:text-info-foreground hover:border-info-border",
    count: "bg-info-bg text-info-foreground",
  },
};

export function CustomersHubTabs({
  value,
  onChange,
  summary,
  className,
}: CustomersHubTabsProps) {
  const tabsRef = React.useRef<HTMLDivElement>(null);

  // Get count for a segment
  const getCount = (segment: CustomerSegmentTab): number => {
    if (segment === "all") return summary.total;
    return summary.segments.find((s) => s.segment === segment)?.count ?? 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const tabs = TABS;
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case "ArrowRight":
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    onChange(tabs[newIndex].id);

    // Focus the new tab
    const tabElements = tabsRef.current?.querySelectorAll('[role="tab"]');
    (tabElements?.[newIndex] as HTMLElement)?.focus();
  };

  return (
    <>
      {/* Mobile Segment Select - visible only on mobile */}
      <div className={cn("sm:hidden", className)}>
        <label htmlFor="mobile-segment-select" className="sr-only">
          Segment
        </label>
        <div className="relative">
          <select
            id="mobile-segment-select"
            value={value}
            onChange={(e) => onChange(e.target.value as CustomerSegmentTab)}
            aria-label="Select customer segment"
            className={cn(
              "block w-full appearance-none rounded-xl border border-border-default bg-bg-surface px-4 py-3 pr-10 text-sm font-medium text-text-primary",
              "focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus",
              "transition-colors shadow-sm"
            )}
          >
            {TABS.map((tab) => {
              const count = getCount(tab.id);
              return (
                <option key={tab.id} value={tab.id}>
                  {tab.label} ({count})
                </option>
              );
            })}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Desktop/Tablet Tabs - hidden on mobile */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Customer segments"
        className={cn(
          "hidden sm:flex gap-1 overflow-x-auto border-b border-border-default pb-px scrollbar-thin scrollbar-thumb-border-muted scrollbar-track-transparent",
          className
        )}
      >
        {TABS.map((tab, index) => {
          const isSelected = value === tab.id;
          const count = getCount(tab.id);
          const styles = colorStyles[tab.color];

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                isSelected ? styles.active : styles.inactive
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs tabular-nums",
                  isSelected ? styles.count : "bg-bg-muted text-text-muted"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

CustomersHubTabs.displayName = "CustomersHubTabs";
