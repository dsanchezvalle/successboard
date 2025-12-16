"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  RefreshCw,
  Lightbulb,
  BookOpen,
  PenTool,
  X,
  Send,
} from "lucide-react";
import type { AIAction } from "../types";

interface AIAssistantPanelProps {
  actions: AIAction[];
  onActionClick?: (actionId: string) => void;
  onClose?: () => void;
  collapsed?: boolean;
  /** Mobile-only: renders as full workspace takeover instead of side panel */
  mobileWorkspaceTakeover?: boolean;
}

const iconMap: Record<
  AIAction["icon"],
  React.ComponentType<{ className?: string }>
> = {
  summary: FileText,
  rewrite: RefreshCw,
  clarity: Lightbulb,
  framework: BookOpen,
  generate: PenTool,
};

const colorMap: Record<AIAction["color"], string> = {
  blue: "bg-blue-500/10 text-blue-500",
  purple: "bg-purple-500/10 text-purple-500",
  amber: "bg-amber-500/10 text-amber-500",
  red: "bg-red-500/10 text-red-500",
  green: "bg-green-500/10 text-green-500",
};

export function AIAssistantPanel({
  actions,
  onActionClick,
  onClose,
  collapsed = false,
  mobileWorkspaceTakeover = false,
}: AIAssistantPanelProps) {
  if (collapsed) {
    return null;
  }

  // Mobile workspace takeover mode - full width, no border
  if (mobileWorkspaceTakeover) {
    return (
      <MobileTakeoverPanel
        actions={actions}
        onActionClick={onActionClick}
        onClose={onClose}
      />
    );
  }

  // Desktop/tablet side panel mode
  return (
    <DesktopSidePanel
      actions={actions}
      onActionClick={onActionClick}
      onClose={onClose}
    />
  );
}

// =============================================================================
// CHAT INPUT COMPONENT
// =============================================================================

function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log(`[AIAssistant] User message: ${message}`);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border-default bg-bg-surface p-3">
      <div className="flex items-end gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI assistant..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-border-default bg-bg-page px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-primary transition-colors hover:bg-brand-primary-hover cursor-pointer"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// ACTION LIST COMPONENT
// =============================================================================

function ActionList({
  actions,
  onActionClick,
}: {
  actions: AIAction[];
  onActionClick?: (actionId: string) => void;
}) {
  return (
    <div className="space-y-1 px-3">
      {actions.map((action) => {
        const Icon = iconMap[action.icon];
        const colorClass = colorMap[action.color];

        return (
          <button
            key={action.id}
            onClick={() => onActionClick?.(action.id)}
            className="group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-bg-subtle cursor-pointer"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${colorClass}`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-text-primary group-hover:text-brand-primary">
                {action.label}
              </div>
              <div className="mt-0.5 text-xs text-text-muted line-clamp-2">
                {action.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// =============================================================================
// MOBILE TAKEOVER PANEL
// =============================================================================

function MobileTakeoverPanel({
  actions,
  onActionClick,
  onClose,
}: {
  actions: AIAction[];
  onActionClick?: (actionId: string) => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col bg-bg-surface sm:hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-primary" />
          <h2 className="text-sm font-semibold text-text-primary">
            AI Assistant
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
          aria-label="Close AI Assistant"
        >
          <X className="h-4 w-4 cursor-pointer" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto py-4">
        <ActionList actions={actions} onActionClick={onActionClick} />
      </div>

      {/* Chat input - sticky at bottom */}
      <ChatInput />
    </div>
  );
}

// =============================================================================
// DESKTOP SIDE PANEL
// =============================================================================

function DesktopSidePanel({
  actions,
  onActionClick,
  onClose,
}: {
  actions: AIAction[];
  onActionClick?: (actionId: string) => void;
  onClose?: () => void;
}) {
  return (
    <aside className="hidden sm:flex sm:flex-col w-72 shrink-0 border-l border-border-default bg-bg-surface/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-primary" />
          <h2 className="text-sm font-semibold text-text-primary">
            AI Assistant
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
          aria-label="Close AI Assistant"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <ActionList actions={actions} onActionClick={onActionClick} />
      </div>

      {/* Chat input - sticky at bottom */}
      <ChatInput />
    </aside>
  );
}
