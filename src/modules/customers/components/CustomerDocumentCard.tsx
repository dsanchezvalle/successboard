"use client";

import Link from "next/link";
import {
  FileText,
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
  /** Customer ID for back navigation context */
  customerId?: string;
  /** Variant for different viewport sizes */
  variant?: "default" | "desktop";
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
  draft: "bg-warning-bg text-warning-foreground border-warning-border",
  "in-review": "bg-info-bg text-info-foreground border-info-border",
  approved: "bg-success-bg text-success-foreground border-success-border",
  shared: "bg-primary-subtle text-primary-foreground border-primary-muted",
  signed: "bg-success-bg text-success-foreground border-success-border",
  archived: "bg-bg-subtle text-text-muted border-border-default",
  superseded: "bg-bg-subtle text-text-muted border-border-default",
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

export function CustomerDocumentCard({
  document,
  customerId,
  variant = "default",
}: CustomerDocumentCardProps) {
  const isDesktop = variant === "desktop";
  const Icon = documentTypeIcons[document.documentType] || FileText;
  const href = customerId
    ? `/documents/${document.id}?fromCustomerId=${customerId}`
    : `/documents/${document.id}`;

  return (
    <Link
      href={href}
      className={`group flex items-start rounded-lg border border-border-default bg-bg-surface transition-all duration-150 hover:border-border-strong hover:bg-bg-subtle hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus active:scale-[0.99] ${
        isDesktop ? "gap-4 p-4" : "gap-3 p-3"
      }`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 flex items-center justify-center rounded-md bg-primary-subtle text-text-secondary ${
          isDesktop ? "h-10 w-10" : "h-8 w-8"
        }`}
      >
        <Icon className={isDesktop ? "h-5 w-5" : "h-4 w-4"} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Title */}
        <h4
          className={`font-medium text-text-primary leading-tight line-clamp-1 group-hover:text-text-secondary transition-colors ${
            isDesktop ? "text-base" : "text-sm"
          }`}
        >
          {document.title}
        </h4>

        {/* Metadata row: type · status · date */}
        <div
          className={`mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 ${
            isDesktop ? "text-sm" : "text-xs"
          }`}
        >
          {/* Type */}
          <span className="text-text-muted">{document.documentTypeLabel}</span>

          <span className="text-text-disabled">·</span>

          {/* Status badge */}
          <span
            className={`inline-flex items-center rounded-full border font-medium leading-none ${
              statusStyles[document.status]
            } ${isDesktop ? "px-2 py-1 text-sm" : "px-1.5 py-0.5 text-xs"}`}
          >
            {document.statusLabel}
          </span>

          <span className="text-text-disabled">·</span>

          {/* Date */}
          <span className="text-text-muted">
            {formatRelativeDate(document.updatedAt)}
          </span>
        </div>
      </div>

      {/* Chevron indicator for clickability */}
      <div
        className={`flex items-center text-text-disabled group-hover:text-text-muted transition-colors ${
          isDesktop ? "h-10" : "h-8"
        }`}
      >
        <svg
          className={isDesktop ? "h-5 w-5" : "h-4 w-4"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export function CustomerDocumentCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border-default bg-bg-surface p-3 animate-pulse">
      <div className="h-8 w-8 shrink-0 rounded-md bg-bg-subtle" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-bg-subtle" />
        <div className="h-3 w-1/2 rounded bg-bg-subtle" />
      </div>
      <div className="h-8 w-4 rounded bg-bg-subtle" />
    </div>
  );
}
