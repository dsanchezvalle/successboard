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
    <>
      {/* Tablet-down: Icon-only vertical stepper */}
      <aside className="lg:hidden shrink-0 border-r border-border-default bg-bg-surface/50 py-4 px-2">
        <nav aria-label="Document sections">
          <ul className="flex flex-col items-center">
            {items.map((item, index) => {
              const Icon = sectionIcons[item.id] || FileText;
              const isActive = activeSection === item.id;
              const isLast = index === items.length - 1;

              return (
                <li key={item.id} className="flex flex-col items-center">
                  <button
                    onClick={() => onSectionClick?.(item.id)}
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-text-muted hover:bg-bg-subtle hover:text-text-primary"
                    }`}
                    aria-label={item.title}
                    title={item.title}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  {/* Vertical connector line */}
                  {!isLast && <div className="w-px h-4 bg-border-default" />}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Desktop only: Full outline with title and labels */}
      <aside className="hidden lg:block w-52 shrink-0 border-r border-border-default bg-bg-surface/50 py-4">
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
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "bg-bg-subtle text-brand-primary font-medium"
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
    </>
  );
}
