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
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "medium":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "high":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export function CustomerSuccessPanel({ metrics }: CustomerSuccessPanelProps) {
  const healthPercent = Math.max(0, Math.min(100, metrics.healthScore));

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Customer Success Overview</h2>
          </div>
          <p className="text-xs text-gray-500">
            Mocked metrics for development only
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Health score */}
          <div className="space-y-1">
            <MetricLabel
              label="Health score"
              tooltip="Overall account health from 0 to 100, combining product usage, engagement, and support signals."
            />
            <div className="flex items-center justify-between">
              <span className="font-medium">{healthPercent} / 100</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>

          {/* Churn risk */}
          <div className="space-y-1">
            <MetricLabel
              label="Churn risk"
              tooltip="Estimated risk that this customer will cancel or not renew."
            />
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getChurnRiskBadgeClasses(
                metrics.churnRisk
              )}`}
            >
              {getChurnRiskLabel(metrics.churnRisk)}
            </span>
          </div>

          {/* Lifetime value */}
          <div className="space-y-1">
            <MetricLabel
              label="Lifetime value"
              tooltip="Estimated total revenue expected from this customer over the relationship."
            />
            <p className="font-medium">
              {formatCurrency(metrics.lifetimeValue)}
            </p>
          </div>

          {/* Stage */}
          <div className="space-y-1">
            <MetricLabel
              label="Stage"
              tooltip="Current lifecycle stage of the account in the customer journey."
            />
            <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
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
    <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
      <span>{label}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[10px] text-gray-500 hover:bg-gray-50"
            aria-label={tooltip}
          >
            <Info className="h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="start" className="max-w-xs text-xs">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
