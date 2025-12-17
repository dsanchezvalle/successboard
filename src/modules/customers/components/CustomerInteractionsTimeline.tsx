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
  /** Variant for different viewport sizes */
  variant?: "default" | "desktop";
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
        className:
          "border-emerald-600/50 bg-emerald-500/15 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300",
      };
    case "call":
      return {
        label: "Call",
        icon: Phone,
        variant: "outline" as const,
        className:
          "border-sky-600/50 bg-sky-500/15 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-300",
      };
    case "meeting":
      return {
        label: "Meeting",
        icon: Calendar,
        variant: "outline" as const,
        className:
          "border-violet-600/50 bg-violet-500/15 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-300",
      };
    case "qbr":
      return {
        label: "QBR",
        icon: FileText,
        variant: "outline" as const,
        className:
          "border-amber-600/50 bg-amber-500/15 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300",
      };
    case "ticket":
      return {
        label: "Ticket",
        icon: Ticket,
        variant: "outline" as const,
        className:
          "border-rose-600/50 bg-rose-500/15 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300",
      };
    case "note":
    default:
      return {
        label: "Note",
        icon: StickyNote,
        variant: "outline" as const,
        className:
          "border-gray-500/50 bg-gray-500/15 text-gray-700 dark:border-gray-500/40 dark:bg-gray-500/10 dark:text-gray-300",
      };
  }
}

export function CustomerInteractionsTimeline({
  interactions,
  variant = "default",
}: CustomerInteractionsTimelineProps) {
  const isDesktop = variant === "desktop";

  if (!interactions.length) {
    return (
      <p className={`text-text-muted ${isDesktop ? "text-base" : "text-sm"}`}>
        No recent interactions recorded.
      </p>
    );
  }

  return (
    <ol className={isDesktop ? "space-y-6" : "space-y-4"}>
      {interactions.map((interaction, index) => {
        const {
          label,
          icon: Icon,
          variant: badgeVariant,
          className,
        } = channelConfig(interaction.channel);

        return (
          <li
            key={interaction.id}
            className={`flex ${isDesktop ? "gap-4" : "gap-3"}`}
          >
            <div className="flex flex-col items-center">
              <span
                className={`mt-1 rounded-full bg-text-muted ${
                  isDesktop ? "h-3 w-3" : "h-2 w-2"
                }`}
              />
              {index !== interactions.length - 1 && (
                <span className="mt-1 h-full w-px flex-1 bg-text-muted" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div
                className={`flex items-center justify-between ${
                  isDesktop ? "gap-4" : "gap-2"
                }`}
              >
                <div
                  className={`flex items-center ${
                    isDesktop ? "gap-3" : "gap-2"
                  }`}
                >
                  <Badge
                    variant={badgeVariant}
                    className={`inline-flex items-center gap-1 font-medium ${className} ${
                      isDesktop ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"
                    }`}
                  >
                    <Icon className={isDesktop ? "h-4 w-4" : "h-3 w-3"} />
                    <span>{label}</span>
                  </Badge>
                  <span
                    className={`text-text-muted ${
                      isDesktop ? "text-sm" : "text-xs"
                    }`}
                  >
                    {formatDate(interaction.occurredAt)}
                  </span>
                </div>
                {interaction.owner && (
                  <span
                    className={`text-text-muted ${
                      isDesktop ? "text-sm" : "text-xs"
                    }`}
                  >
                    Owner:{" "}
                    <span className="font-medium text-text-primary">
                      {interaction.owner}
                    </span>
                  </span>
                )}
              </div>
              <div>
                <p
                  className={`font-medium text-text-primary ${
                    isDesktop ? "text-base" : "text-sm"
                  }`}
                >
                  {interaction.title}
                </p>
                {interaction.description && (
                  <p
                    className={`text-text-muted mt-0.5 ${
                      isDesktop ? "text-sm" : "text-xs"
                    }`}
                  >
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
