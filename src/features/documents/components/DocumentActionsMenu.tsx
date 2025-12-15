"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  RefreshCw,
  Download,
  Copy,
  Share2,
  Trash2,
} from "lucide-react";

interface DocumentActionsMenuProps {
  documentId: string;
}

const actions = [
  { id: "edit", label: "Edit", icon: Pencil },
  { id: "regenerate", label: "Regenerate", icon: RefreshCw },
  { id: "download", label: "Download PDF", icon: Download },
  { id: "duplicate", label: "Duplicate", icon: Copy },
  { id: "share", label: "Share", icon: Share2 },
  { id: "delete", label: "Delete", icon: Trash2, danger: true },
];

export function DocumentActionsMenu({ documentId }: DocumentActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (actionId: string) => {
    console.log(
      `[DocumentActionsMenu] Action: ${actionId} for document: ${documentId}`
    );
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
        aria-label="Document actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border-default bg-bg-surface py-1 shadow-lg shadow-black/10 dark:shadow-black/30">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                  action.danger
                    ? "text-red-600 dark:text-red-400 hover:bg-red-500/10"
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
  );
}
