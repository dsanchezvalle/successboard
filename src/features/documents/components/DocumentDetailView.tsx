"use client";

import { useState } from "react";
import type { Document, AIAction } from "../types";
import { DocumentTopBar } from "./DocumentTopBar";
import { DocumentOutlinePanel } from "./DocumentOutlinePanel";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { DocumentContent } from "./DocumentContent";

interface DocumentDetailViewProps {
  document: Document;
  aiActions: AIAction[];
  outlineItems: { id: string; title: string }[];
}

export function DocumentDetailView({
  document,
  aiActions,
  outlineItems,
}: DocumentDetailViewProps) {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [isOutlineOpen, setIsOutlineOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>(
    outlineItems[0]?.id
  );

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
        subtitle={document.subtitle}
        metadata={document.metadata}
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
