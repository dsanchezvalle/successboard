"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import type { DocumentListItem } from "../data/documents-service";
import type { SortField, SortOrder } from "../data/documents-service";
import { DocumentTableRow } from "./DocumentTableRow";

interface DocumentsTableProps {
  documents: DocumentListItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

interface ColumnDef {
  id: SortField | "actions";
  label: string;
  sortable: boolean;
  className?: string;
}

const columns: ColumnDef[] = [
  { id: "title", label: "Document", sortable: true, className: "w-[35%]" },
  { id: "documentType", label: "Type", sortable: true },
  { id: "title", label: "Framework", sortable: false },
  { id: "title", label: "Status", sortable: false },
  { id: "createdAt", label: "Created", sortable: true },
  { id: "customerName", label: "Owner", sortable: false },
  { id: "actions", label: "", sortable: false, className: "w-12" },
];

export function DocumentsTable({
  documents,
  sortField,
  sortOrder,
  onSort,
}: DocumentsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-default bg-bg-surface">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-default bg-bg-subtle/50">
            {columns.map((col, idx) => (
              <th
                key={`${col.id}-${idx}`}
                className={`py-3 px-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted first:pl-4 last:pr-4 ${
                  col.className || ""
                }`}
              >
                {col.sortable && col.id !== "actions" ? (
                  <button
                    onClick={() => onSort(col.id as SortField)}
                    className="flex items-center gap-1 hover:text-text-primary transition-colors"
                  >
                    <span>{col.label}</span>
                    <SortIndicator
                      active={sortField === col.id}
                      order={sortOrder}
                    />
                  </button>
                ) : (
                  <span>{col.label}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <DocumentTableRow key={doc.id} document={doc} />
          ))}
        </tbody>
      </table>

      {documents.length === 0 && (
        <div className="py-12 text-center text-sm text-text-muted">
          No documents found matching your filters.
        </div>
      )}
    </div>
  );
}

function SortIndicator({
  active,
  order,
}: {
  active: boolean;
  order: SortOrder;
}) {
  return (
    <span
      className={`flex flex-col ${
        active ? "text-brand-primary" : "text-text-muted/50"
      }`}
    >
      <ChevronUp
        className={`h-3 w-3 -mb-1 ${
          active && order === "asc" ? "opacity-100" : "opacity-30"
        }`}
      />
      <ChevronDown
        className={`h-3 w-3 ${
          active && order === "desc" ? "opacity-100" : "opacity-30"
        }`}
      />
    </span>
  );
}
