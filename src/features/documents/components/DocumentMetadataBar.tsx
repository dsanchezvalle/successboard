"use client";

import { User, Calendar, Tag } from "lucide-react";
import type { DocumentMetadata } from "../types";

interface DocumentMetadataBarProps {
  metadata: DocumentMetadata;
}

export function DocumentMetadataBar({ metadata }: DocumentMetadataBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
      <div className="flex items-center gap-1.5">
        <User className="h-4 w-4 text-text-muted" />
        <span>{metadata.owner}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Calendar className="h-4 w-4 text-text-muted" />
        <span>{metadata.lastUpdated}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Tag className="h-4 w-4 text-text-muted" />
        <span className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-2.5 py-0.5 text-xs font-medium text-brand-primary">
          {metadata.framework}
        </span>
      </div>
    </div>
  );
}
