"use client";

import {
  ChevronLeft,
  Share2,
  Download,
  Save,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import type { DocumentMetadata } from "../types";

interface DocumentTopBarProps {
  title: string;
  subtitle?: string;
  metadata: DocumentMetadata;
  lastSaved?: string;
  onToggleAI?: () => void;
  isAIPanelOpen?: boolean;
}

export function DocumentTopBar({
  title,
  subtitle,
  metadata,
  lastSaved = "2 minutes ago",
  onToggleAI,
  isAIPanelOpen,
}: DocumentTopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border-default bg-bg-surface">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/documents"
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
            aria-label="Back to documents"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-text-primary leading-tight">
              {title}
            </h1>
            <span className="text-xs text-text-muted">
              Last saved {lastSaved}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ActionButton icon={Share2} label="Share" />
          <ActionButton icon={Download} label="Export" />
          <button
            className="flex h-8 items-center gap-1.5 rounded-md bg-brand-primary px-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
            onClick={() => {}}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button
            onClick={onToggleAI}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              isAIPanelOpen
                ? "bg-brand-primary/10 text-brand-primary"
                : "text-text-muted hover:bg-bg-subtle hover:text-text-primary"
            }`}
            aria-label="Toggle AI Assistant"
            aria-pressed={isAIPanelOpen}
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
            aria-label="More options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
      onClick={() => {}}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
