"use client";

import type { Document } from "../types";
import { DocumentSection } from "./DocumentSection";
import { DocumentMetadataBar } from "./DocumentMetadataBar";

interface DocumentContentProps {
  document: Document;
}

export function DocumentContent({ document }: DocumentContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Metadata Bar */}
      <div className="mb-8">
        <DocumentMetadataBar metadata={document.metadata} />
      </div>

      {/* Document Sections */}
      <div className="space-y-10">
        {document.sections.map((section, index) => (
          <DocumentSection
            key={section.id}
            section={section}
            sectionNumber={index + 1}
            totalSections={document.sections.length}
          />
        ))}
      </div>
    </div>
  );
}
