"use client";

import { FileText, Target, Users, BarChart3, CheckSquare } from "lucide-react";

interface OutlineItem {
  id: string;
  title: string;
}

interface DocumentOutlinePanelProps {
  items: OutlineItem[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
  collapsed?: boolean;
}

const sectionIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "executive-summary": FileText,
  "business-objectives": Target,
  "metrics-decision-criteria": BarChart3,
  "stakeholder-map": Users,
  "action-items": CheckSquare,
};

export function DocumentOutlinePanel({
  items,
  activeSection,
  onSectionClick,
  collapsed = false,
}: DocumentOutlinePanelProps) {
  if (collapsed) {
    return null;
  }

  return (
    <aside className="w-52 shrink-0 border-r border-border-default bg-bg-surface/50 py-4">
      <div className="px-4 pb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Document Outline
        </h2>
      </div>
      <nav aria-label="Document sections">
        <ul className="space-y-0.5 px-2">
          {items.map((item) => {
            const Icon = sectionIcons[item.id] || FileText;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionClick?.(item.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary font-medium"
                      : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
