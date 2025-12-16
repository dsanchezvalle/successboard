"use client";

import type { DocumentDetail } from "@/features/documents/data/document-detail-service";
import { formatDate } from "@/features/documents/data/document-detail-service";
import { DocumentSection } from "./DocumentSection";
import { DocumentMetadataBar } from "./DocumentMetadataBar";
import { mockDocument } from "@/features/documents/data/mock-document";

interface DocumentContentProps {
  document: DocumentDetail;
}

export function DocumentContent({ document }: DocumentContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Metadata Bar */}
      <div className="mb-8">
        <DocumentMetadataBar
          owner={document.ownerName || "—"}
          lastUpdated={formatDate(document.updatedAt)}
          type={document.type}
          status={document.status}
          framework={document.framework}
          template={document.templateName}
        />
      </div>

      {/* Document Sections */}
      <div className="space-y-10">
        {mockDocument.sections.map((section, index) => (
          <DocumentSection
            key={section.id}
            section={section}
            sectionNumber={index + 1}
            totalSections={mockDocument.sections.length}
          />
        ))}
      </div>
    </div>
  );
}
