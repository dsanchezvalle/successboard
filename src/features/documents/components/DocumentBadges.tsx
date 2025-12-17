"use client";

import { FileText, Layers, CheckCircle } from "lucide-react";
import type { DocumentType, DocumentStatus } from "@/modules/api";

interface StatusBadgeProps {
  status: DocumentStatus;
  label: string;
}

const statusStyles: Record<DocumentStatus, string> = {
  draft:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "in-review":
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  approved:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  shared:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  signed:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  archived:
    "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  superseded:
    "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      <CheckCircle className="h-3 w-3" />
      {label}
    </span>
  );
}

interface TypeBadgeProps {
  type: DocumentType;
  label: string;
}

export function TypeBadge({ label }: TypeBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-bg-subtle px-2 py-0.5 text-xs font-medium text-text-secondary border border-border-default/50">
      <FileText className="h-3 w-3" />
      {label}
    </span>
  );
}

interface FrameworkBadgeProps {
  name: string;
}

export function FrameworkBadge({ name }: FrameworkBadgeProps) {
  if (name === "None") return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-brand-primary/10 px-2 py-0.5 text-xs font-medium text-brand-primary border border-brand-primary/20">
      <Layers className="h-3 w-3" />
      {name}
    </span>
  );
}

interface HealthScoreBadgeProps {
  score: number;
}

export function HealthScoreBadge({ score }: HealthScoreBadgeProps) {
  const getScoreStyle = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <span className={`text-xs font-medium ${getScoreStyle(score)}`}>
      {score}/100
    </span>
  );
}
