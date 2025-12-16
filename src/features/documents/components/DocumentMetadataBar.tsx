"use client";

import { User, Calendar } from "lucide-react";
import { StatusBadge, TypeBadge, FrameworkBadge } from "./DocumentBadges";
import type { DocumentType, DocumentStatus } from "@/modules/api";

// Map status labels back to status values for proper color styling
const labelToStatus: Record<string, DocumentStatus> = {
  Draft: "draft",
  "In Review": "in-review",
  Approved: "approved",
  Shared: "shared",
  Signed: "signed",
  Archived: "archived",
  Superseded: "superseded",
};

interface DocumentMetadataBarProps {
  owner: string;
  lastUpdated: string;
  /** Compact date for mobile display */
  lastUpdatedCompact?: string;
  type?: string | null;
  status?: string | null;
  framework?: string | null;
  template?: string | null;
}

export function DocumentMetadataBar({
  owner,
  lastUpdated,
  lastUpdatedCompact,
  type,
  status,
  framework,
  template,
}: DocumentMetadataBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {/* Owner */}
      <div className="flex items-center gap-1.5 text-text-secondary">
        <User className="h-4 w-4 text-text-muted" />
        <span>{owner}</span>
      </div>

      {/* Date - compact on mobile, full on desktop */}
      <div className="flex items-center gap-1.5 text-text-secondary">
        <Calendar className="h-4 w-4 text-text-muted" />
        {lastUpdatedCompact ? (
          <>
            <span className="sm:hidden">{lastUpdatedCompact}</span>
            <span className="hidden sm:inline">{lastUpdated}</span>
          </>
        ) : (
          <span>{lastUpdated}</span>
        )}
      </div>

      {/* Type Badge */}
      {type && <TypeBadge type={"success-plan" as DocumentType} label={type} />}

      {/* Framework Badge */}
      {framework && framework !== "None" && <FrameworkBadge name={framework} />}

      {/* Status Badge */}
      {status && (
        <StatusBadge status={labelToStatus[status] || "draft"} label={status} />
      )}

      {/* Template Badge (fallback if no framework/status) */}
      {template && !framework && !status && (
        <span className="inline-flex items-center gap-1 rounded-md bg-bg-subtle px-2 py-0.5 text-xs font-medium text-text-secondary border border-border-default/50">
          {template}
        </span>
      )}
    </div>
  );
}
