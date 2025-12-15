"use client";

import {
  Sparkles,
  FileText,
  RefreshCw,
  Lightbulb,
  BookOpen,
  PenTool,
  X,
} from "lucide-react";
import type { AIAction } from "../types";

interface AIAssistantPanelProps {
  actions: AIAction[];
  onActionClick?: (actionId: string) => void;
  onClose?: () => void;
  collapsed?: boolean;
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
}: AIAssistantPanelProps) {
  if (collapsed) {
    return null;
  }

  return (
    <aside className="w-64 shrink-0 border-l border-border-default bg-bg-surface/50 py-4">
      <div className="flex items-center justify-between px-4 pb-3">
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

      <div className="space-y-1 px-3">
        {actions.map((action) => {
          const Icon = iconMap[action.icon];
          const colorClass = colorMap[action.color];

          return (
            <button
              key={action.id}
              onClick={() => onActionClick?.(action.id)}
              className="group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-bg-subtle"
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
    </aside>
  );
}
