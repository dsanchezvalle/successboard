"use client";

import {
  formatDate,
  formatDateCompact,
} from "@/features/documents/data/document-detail-service";

interface ResponsiveDateProps {
  isoDate: string;
  /** Optional prefix text (e.g., "Last saved") */
  prefix?: string;
  className?: string;
}

/**
 * Displays a date in compact format on mobile and full format on tablet/desktop.
 * Uses CSS to switch between formats without JavaScript viewport detection.
 */
export function ResponsiveDate({
  isoDate,
  prefix,
  className = "",
}: ResponsiveDateProps) {
  const compactDate = formatDateCompact(isoDate);
  const fullDate = formatDate(isoDate);

  return (
    <span className={className}>
      {prefix && `${prefix} `}
      {/* Mobile: compact date */}
      <span className="sm:hidden">{compactDate}</span>
      {/* Desktop/Tablet: full date */}
      <span className="hidden sm:inline">{fullDate}</span>
    </span>
  );
}
