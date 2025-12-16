"use client";

import { useState } from "react";
import type { AIAction } from "../types";
import type { DocumentDetail } from "@/features/documents/data/document-detail-service";
import { formatRelativeDate } from "@/features/documents/data/document-detail-service";
import { mockDocument } from "@/features/documents/data/mock-document";
import { DocumentTopBar } from "./DocumentTopBar";
import { DocumentOutlinePanel } from "./DocumentOutlinePanel";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { DocumentContent } from "./DocumentContent";

interface DocumentDetailViewProps {
  document: DocumentDetail;
  aiActions: AIAction[];
  outlineItems: { id: string; title: string }[];
  /** Back navigation href (defaults to /documents) */
  backHref?: string;
}

export function DocumentDetailView({
  document,
  aiActions,
  outlineItems,
  backHref,
}: DocumentDetailViewProps) {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [isOutlineOpen, setIsOutlineOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>(
    outlineItems[0]?.id
  );

  console.log(document.title);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = window.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAIAction = (actionId: string) => {
    // Presentational only - no actual AI logic
    console.log(`AI Action clicked: ${actionId}`);
  };

  return (
    <div className="flex h-full flex-col">
      <DocumentTopBar
        title={document.title}
        subtitle={document.ownerName || undefined}
        metadata={{
          owner: document.ownerName || "—",
          lastUpdated: formatRelativeDate(document.updatedAt),
          framework: document.type || "—",
          template: document.templateName || "—",
        }}
        description={document.description || undefined}
        backHref={backHref}
        onToggleAI={() => setIsAIPanelOpen(!isAIPanelOpen)}
        isAIPanelOpen={isAIPanelOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Document Outline */}
        <DocumentOutlinePanel
          items={outlineItems}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          collapsed={!isOutlineOpen}
        />

        {/* Center: Main Content */}
        <main className="flex-1 overflow-auto bg-bg-page">
          <DocumentContent document={document} />
        </main>

        {/* Right: AI Assistant */}
        <AIAssistantPanel
          actions={aiActions}
          onActionClick={handleAIAction}
          onClose={() => setIsAIPanelOpen(false)}
          collapsed={!isAIPanelOpen}
        />
      </div>
    </div>
  );
}
