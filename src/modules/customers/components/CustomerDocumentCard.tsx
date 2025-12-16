"use client";

import Link from "next/link";
import {
  FileText,
  Calendar,
  ClipboardList,
  Presentation,
  BookOpen,
  FileCheck,
  ScrollText,
  Activity,
  RefreshCw,
  TrendingUp,
  FileBarChart,
  StickyNote,
  File,
} from "lucide-react";
import type { DocumentType, DocumentStatus } from "@/modules/api";

export interface CustomerDocumentCardData {
  id: string;
  title: string;
  documentType: DocumentType;
  documentTypeLabel: string;
  status: DocumentStatus;
  statusLabel: string;
  updatedAt: string;
}

interface CustomerDocumentCardProps {
  document: CustomerDocumentCardData;
}

const documentTypeIcons: Record<DocumentType, typeof FileText> = {
  "success-plan": ClipboardList,
  "qbr-deck": Presentation,
  "ebr-deck": Presentation,
  "onboarding-plan": BookOpen,
  "implementation-plan": FileCheck,
  "internal-brief": ScrollText,
  playbook: BookOpen,
  "health-report": Activity,
  "renewal-proposal": RefreshCw,
  "expansion-proposal": TrendingUp,
  "executive-summary": FileBarChart,
  "meeting-notes": StickyNote,
  other: File,
};

const statusStyles: Record<DocumentStatus, string> = {
  draft:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "in-review":
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  approved:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  shared:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  signed:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  archived:
    "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  superseded:
    "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CustomerDocumentCard({ document }: CustomerDocumentCardProps) {
  const Icon = documentTypeIcons[document.documentType] || FileText;

  return (
    <Link
      href={`/documents/${document.id}`}
      className="group flex flex-col rounded-xl border border-border-default bg-bg-surface p-4 transition-all duration-200 hover:border-brand-primary/30 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
    >
      {/* Header with icon and title */}
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 text-brand-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-text-primary leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors">
            {document.title}
          </h4>
        </div>
      </div>

      {/* Badges and metadata */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {/* Type badge */}
        <span className="inline-flex items-center gap-1 rounded-md bg-bg-subtle px-2 py-0.5 text-xs font-medium text-text-secondary border border-border-default/50">
          <FileText className="h-3 w-3" />
          {document.documentTypeLabel}
        </span>

        {/* Status badge */}
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
            statusStyles[document.status]
          }`}
        >
          {document.statusLabel}
        </span>
      </div>

      {/* Footer with date */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
        <Calendar className="h-3 w-3" />
        <span>Updated {formatRelativeDate(document.updatedAt)}</span>
      </div>
    </Link>
  );
}

export function CustomerDocumentCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border-default bg-bg-surface p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-bg-subtle" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-bg-subtle" />
          <div className="h-4 w-1/2 rounded bg-bg-subtle" />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-20 rounded-md bg-bg-subtle" />
        <div className="h-5 w-16 rounded-full bg-bg-subtle" />
      </div>
      <div className="mt-3 h-3 w-24 rounded bg-bg-subtle" />
    </div>
  );
}
