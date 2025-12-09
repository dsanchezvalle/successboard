import {
  Mail,
  Phone,
  Calendar,
  FileText,
  Ticket,
  StickyNote,
} from "lucide-react";
import type {
  CustomerInteraction,
  InteractionChannel,
} from "@/modules/customers/types";
import { Badge } from "@/components/ui/badge";

interface CustomerInteractionsTimelineProps {
  interactions: CustomerInteraction[];
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function channelConfig(channel: InteractionChannel) {
  switch (channel) {
    case "email":
      return {
        label: "Email",
        icon: Mail,
        variant: "outline" as const,
        className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
      };
    case "call":
      return {
        label: "Call",
        icon: Phone,
        variant: "outline" as const,
        className: "border-sky-500/40 bg-sky-500/10 text-sky-200",
      };
    case "meeting":
      return {
        label: "Meeting",
        icon: Calendar,
        variant: "outline" as const,
        className: "border-violet-500/40 bg-violet-500/10 text-violet-200",
      };
    case "qbr":
      return {
        label: "QBR",
        icon: FileText,
        variant: "outline" as const,
        className: "border-amber-500/40 bg-amber-500/10 text-amber-200",
      };
    case "ticket":
      return {
        label: "Ticket",
        icon: Ticket,
        variant: "outline" as const,
        className: "border-rose-500/40 bg-rose-500/10 text-rose-200",
      };
    case "note":
    default:
      return {
        label: "Note",
        icon: StickyNote,
        variant: "outline" as const,
        className: "border-slate-500/40 bg-slate-500/10 text-slate-200",
      };
  }
}

export function CustomerInteractionsTimeline({
  interactions,
}: CustomerInteractionsTimelineProps) {
  if (!interactions.length) {
    return (
      <p className="text-sm text-slate-400">No recent interactions recorded.</p>
    );
  }

  return (
    <ol className="space-y-4">
      {interactions.map((interaction, index) => {
        const {
          label,
          icon: Icon,
          variant,
          className,
        } = channelConfig(interaction.channel);

        return (
          <li key={interaction.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="mt-1 h-2 w-2 rounded-full bg-slate-500" />
              {index !== interactions.length - 1 && (
                <span className="mt-1 h-full w-px flex-1 bg-slate-800" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={variant}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs ${className}`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{label}</span>
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {formatDate(interaction.occurredAt)}
                  </span>
                </div>
                {interaction.owner && (
                  <span className="text-xs text-slate-400">
                    Owner:{" "}
                    <span className="font-medium text-slate-100">
                      {interaction.owner}
                    </span>
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-50">
                  {interaction.title}
                </p>
                {interaction.description && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {interaction.description}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
