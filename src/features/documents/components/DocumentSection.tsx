"use client";

import type { DocumentSection as DocumentSectionType } from "../types";

interface DocumentSectionProps {
  section: DocumentSectionType;
  sectionNumber: number;
  totalSections: number;
}

export function DocumentSection({
  section,
  sectionNumber,
  totalSections,
}: DocumentSectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-20"
      aria-labelledby={`section-title-${section.id}`}
    >
      <div className="mb-4">
        <span className="text-xs font-medium text-text-muted">
          Section {sectionNumber} of {totalSections}
        </span>
        <h2
          id={`section-title-${section.id}`}
          className="mt-1 text-xl font-semibold text-text-primary"
        >
          {section.title}
        </h2>
      </div>

      {section.content && (
        <div className="rounded-lg border border-border-default bg-bg-surface p-5">
          <p className="text-sm leading-relaxed text-text-secondary">
            {section.content}
          </p>
        </div>
      )}

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-4 space-y-4">
          {section.subsections.map((subsection) => (
            <div
              key={subsection.id}
              className="rounded-lg border border-border-default bg-bg-surface p-5"
            >
              <h3 className="mb-2 text-base font-semibold text-text-primary">
                {subsection.title}
              </h3>
              {subsection.content && (
                <p className="text-sm leading-relaxed text-text-secondary">
                  {subsection.content}
                </p>
              )}
              {subsection.items && subsection.items.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {subsection.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
