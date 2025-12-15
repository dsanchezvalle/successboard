"use client";

import Link from "next/link";
import type { DocumentListItem } from "../data/documents-service";
import { DocumentActionsMenu } from "./DocumentActionsMenu";
import {
  StatusBadge,
  TypeBadge,
  FrameworkBadge,
  HealthScoreBadge,
} from "./DocumentBadges";

interface DocumentTableRowProps {
  document: DocumentListItem;
}

export function DocumentTableRow({ document }: DocumentTableRowProps) {
  return (
    <tr className="group border-b border-border-default/50 last:border-b-0 transition-colors hover:bg-bg-subtle/50">
      {/* Title & Customer */}
      <td className="py-3 pl-4 pr-3">
        <div className="flex flex-col gap-0.5">
          <Link
            href={`/documents/${document.id}`}
            className="font-medium text-text-primary hover:text-brand-primary transition-colors line-clamp-1"
          >
            {document.title}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span>{document.customerName}</span>
            <span className="text-border-default">·</span>
            <HealthScoreBadge score={document.customerHealthScore} />
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="py-3 px-3">
        <TypeBadge
          type={document.documentType}
          label={document.documentTypeLabel}
        />
      </td>

      {/* Framework */}
      <td className="py-3 px-3">
        {document.frameworkName !== "None" ? (
          <FrameworkBadge name={document.frameworkName} />
        ) : (
          <span className="text-xs text-text-muted">—</span>
        )}
      </td>

      {/* Status */}
      <td className="py-3 px-3">
        <StatusBadge status={document.status} label={document.statusLabel} />
      </td>

      {/* Created */}
      <td className="py-3 px-3 text-sm text-text-muted whitespace-nowrap">
        {formatDate(document.createdAt)}
      </td>

      {/* Owner */}
      <td className="py-3 px-3 text-sm text-text-secondary whitespace-nowrap">
        {document.ownerName}
      </td>

      {/* Actions */}
      <td className="py-3 pl-3 pr-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
          <DocumentActionsMenu documentId={document.id} />
        </div>
      </td>
    </tr>
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
