"use client";

import type { CustomerSuccessMetrics } from "@/modules/customers/types";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomerSuccessPanelProps {
  metrics: CustomerSuccessMetrics;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getChurnRiskLabel(risk: CustomerSuccessMetrics["churnRisk"]): string {
  switch (risk) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    default:
      return risk;
  }
}

function getChurnRiskBadgeClasses(
  risk: CustomerSuccessMetrics["churnRisk"]
): string {
  switch (risk) {
    case "low":
      return "bg-emerald-500/10 text-emerald-200 border-emerald-500/40";
    case "medium":
      return "bg-amber-500/10 text-amber-200 border-amber-500/40";
    case "high":
      return "bg-red-500/10 text-red-200 border-red-500/40";
    default:
      return "bg-slate-500/10 text-slate-200 border-slate-500/40";
  }
}

export function CustomerSuccessPanel({ metrics }: CustomerSuccessPanelProps) {
  const healthPercent = Math.max(0, Math.min(100, metrics.healthScore));

  return (
    <TooltipProvider>
      <div className="space-y-3 text-sm text-slate-100">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
          {/* Health score */}
          <div className="space-y-2">
            <MetricLabel
              label="Health score"
              tooltip="Overall account health from 0 to 100, combining product usage, engagement, and support signals."
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-50">
                {healthPercent} / 100
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>

          {/* Churn risk */}
          <div className="space-y-2">
            <MetricLabel
              label="Churn risk"
              tooltip="Estimated risk that this customer will cancel or not renew."
            />
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getChurnRiskBadgeClasses(
                metrics.churnRisk
              )}`}
            >
              {getChurnRiskLabel(metrics.churnRisk)}
            </span>
          </div>

          {/* Lifetime value */}
          <div className="space-y-2">
            <MetricLabel
              label="Lifetime value"
              tooltip="Estimated total revenue expected from this customer over the relationship."
            />
            <p className="text-base font-semibold text-slate-50">
              {formatCurrency(metrics.lifetimeValue)}
            </p>
          </div>

          {/* Stage */}
          <div className="space-y-2">
            <MetricLabel
              label="Stage"
              tooltip="Current lifecycle stage of the account in the customer journey."
            />
            <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-sky-200">
              {metrics.stage}
            </span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

interface MetricLabelProps {
  label: string;
  tooltip: string;
}

function MetricLabel({ label, tooltip }: MetricLabelProps) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
      <span>{label}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 text-[10px] text-slate-300 hover:bg-slate-800"
            aria-label={tooltip}
          >
            <Info className="h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="start"
          className="max-w-xs text-[11px] leading-snug text-slate-100"
        >
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
