"use client";

import Link from "next/link";
import { FileText, Calendar, User } from "lucide-react";
import type { DocumentListItem } from "../data/documents-service";
import { DocumentActionsMenu } from "./DocumentActionsMenu";
import {
  StatusBadge,
  TypeBadge,
  FrameworkBadge,
  HealthScoreBadge,
} from "./DocumentBadges";

interface DocumentCardProps {
  document: DocumentListItem;
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border-default bg-bg-surface transition-all duration-200 hover:border-brand-primary/30 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 text-brand-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/documents/${document.id}`}
              className="block font-semibold text-text-primary leading-snug hover:text-brand-primary transition-colors line-clamp-2"
            >
              {document.title}
            </Link>
            <div className="mt-1 flex items-center gap-2 text-sm text-text-muted">
              <span className="truncate">{document.customerName}</span>
              <span className="text-border-default">·</span>
              <HealthScoreBadge score={document.customerHealthScore} />
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DocumentActionsMenu documentId={document.id} />
        </div>
      </div>

      {/* Card Body */}
      {document.description && (
        <div className="px-4 pb-3">
          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
            {document.description}
          </p>
        </div>
      )}

      {/* Badges Row */}
      <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
        <TypeBadge
          type={document.documentType}
          label={document.documentTypeLabel}
        />
        <FrameworkBadge name={document.frameworkName} />
        <StatusBadge status={document.status} label={document.statusLabel} />
      </div>

      {/* Card Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border-default/50 px-4 py-3 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          <span>{document.ownerName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(document.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
