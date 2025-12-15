"use client";

import type { DocumentListItem } from "../data/documents-service";
import { DocumentCard } from "./DocumentCard";

interface DocumentsGridProps {
  documents: DocumentListItem[];
}

export function DocumentsGrid({ documents }: DocumentsGridProps) {
  if (documents.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-text-muted">
        No documents found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
