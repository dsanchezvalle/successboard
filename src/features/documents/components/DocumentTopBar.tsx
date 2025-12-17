"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Sparkles,
  MoreHorizontal,
  Pencil,
  RefreshCw,
  Download,
  Copy,
  Share2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import type { DocumentMetadata } from "../types";

// Unified actions matching DocumentActionsMenu in the table
const documentActions = [
  { id: "edit", label: "Edit", icon: Pencil },
  { id: "regenerate", label: "Regenerate", icon: RefreshCw },
  { id: "download", label: "Download PDF", icon: Download },
  { id: "duplicate", label: "Duplicate", icon: Copy },
  { id: "share", label: "Share", icon: Share2 },
  { id: "delete", label: "Delete", icon: Trash2, danger: true },
];

interface DocumentTopBarProps {
  title: string;
  subtitle?: string;
  metadata: DocumentMetadata;
  lastSaved?: string;
  /** Document description (shown on desktop/tablet, hidden on mobile) */
  description?: string;
  /** Back navigation href (defaults to /documents) */
  backHref?: string;
  onToggleAI?: () => void;
  isAIPanelOpen?: boolean;
}

export function DocumentTopBar({
  title,
  subtitle,
  metadata,
  lastSaved = "2 minutes ago",
  description,
  backHref = "/documents",
  onToggleAI,
  isAIPanelOpen,
}: DocumentTopBarProps) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleAction = (actionId: string) => {
    console.log(`[DocumentTopBar] Action: ${actionId}`);
    setIsActionsOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border-default bg-bg-surface">
      <div className="flex min-h-14 items-center justify-between gap-4 px-4 py-2">
        {/* Left: Back + Title + Last Saved + Description */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Link
            href={backHref}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-semibold text-text-primary leading-tight">
                {title}
              </h1>
              {/* Last saved - positioned right after title */}
              <span className="text-xs text-text-muted">
                {/* Desktop with labels: full format */}
                <span className="hidden xl:inline">
                  Last saved{" "}
                  {lastSaved
                    .replace(/ minutes/, " min")
                    .replace(/ seconds/, " sec")}
                </span>
                {/* Tablet/icon-only: compact format */}
                <span className="xl:inline">
                  (
                  {lastSaved
                    .replace(/ minutes/, " min")
                    .replace(/ seconds/, " sec")}
                  )
                </span>
              </span>
            </div>
            {/* Description - desktop/tablet only */}
            {description && (
              <p className="hidden sm:block text-xs text-text-muted mt-0.5 truncate max-w-md">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Large desktop: Expanded action buttons with labels */}
          <div className="hidden xl:flex items-center gap-2">
            {documentActions.map((action) => (
              <ActionButton
                key={action.id}
                icon={action.icon}
                label={action.label}
                onClick={() => handleAction(action.id)}
              />
            ))}
          </div>

          {/* Tablet: Icon-only action buttons */}
          <div className="hidden md:flex xl:hidden items-center gap-2">
            {documentActions.map((action) => (
              <IconActionButton
                key={action.id}
                icon={action.icon}
                onClick={() => handleAction(action.id)}
                ariaLabel={action.label}
              />
            ))}
          </div>

          {/* Visual separator for tablet view */}
          <div className="hidden md:flex xl:hidden w-px h-6 bg-border-default" />

          {/* AI Assistant toggle - large desktop with label */}
          <div className="hidden xl:flex items-center gap-1.5">
            <button
              onClick={onToggleAI}
              className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors ${
                isAIPanelOpen
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
              }`}
              aria-label="Toggle AI Assistant"
              aria-pressed={isAIPanelOpen}
            >
              <Sparkles className="h-4 w-4 cursor-pointer text-warning-icon dark:text-warning-600" />
              <span>AI Assistant</span>
            </button>
          </div>

          {/* AI Assistant toggle - tablet/mobile icon-only */}
          <div className="xl:hidden">
            <button
              onClick={onToggleAI}
              className={`flex h-10 w-10 md:h-8 md:w-8 items-center justify-center rounded-md transition-colors ${
                isAIPanelOpen
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-text-muted hover:bg-bg-subtle hover:text-text-primary"
              }`}
              aria-label="Toggle AI Assistant"
              title="AI Assistant"
              aria-pressed={isAIPanelOpen}
            >
              <Sparkles className="h-5 w-5 cursor-pointer text-warning-icon dark:text-warning-600" />
            </button>
          </div>

          {/* Actions menu (kebab) - mobile and vertical tablet only */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary cursor-pointer"
              aria-label="More options"
              aria-expanded={isActionsOpen}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {isActionsOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsActionsOpen(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border-default bg-bg-surface py-1 shadow-lg shadow-black/10 dark:shadow-black/30">
                  {documentActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.id)}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                        action.danger
                          ? "text-error-foreground hover:bg-error-bg"
                          : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                      }`}
                    >
                      <action.icon className="h-4 w-4" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary cursor-pointer"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function IconActionButton({
  icon: Icon,
  onClick,
  ariaLabel,
}: {
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary cursor-pointer"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon className="h-4.5 w-4.5" />
    </button>
  );
}
