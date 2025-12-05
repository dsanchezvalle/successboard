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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      return { label: "Email", icon: Mail, variant: "outline" as const };
    case "call":
      return { label: "Call", icon: Phone, variant: "outline" as const };
    case "meeting":
      return { label: "Meeting", icon: Calendar, variant: "outline" as const };
    case "qbr":
      return { label: "QBR", icon: FileText, variant: "default" as const };
    case "ticket":
      return { label: "Ticket", icon: Ticket, variant: "secondary" as const };
    case "note":
    default:
      return { label: "Note", icon: StickyNote, variant: "outline" as const };
  }
}

export function CustomerInteractionsTimeline({
  interactions,
}: CustomerInteractionsTimelineProps) {
  if (!interactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            No recent interactions recorded.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent interactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {interactions.map((interaction, index) => {
            const {
              label,
              icon: Icon,
              variant,
            } = channelConfig(interaction.channel);

            return (
              <li key={interaction.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" />
                  {index !== interactions.length - 1 && (
                    <span className="mt-1 h-full w-px flex-1 bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={variant}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs"
                      >
                        <Icon className="h-3 w-3" />
                        <span>{label}</span>
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(interaction.occurredAt)}
                      </span>
                    </div>
                    {interaction.owner && (
                      <span className="text-xs text-gray-500">
                        Owner:{" "}
                        <span className="font-medium text-gray-700">
                          {interaction.owner}
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {interaction.title}
                    </p>
                    {interaction.description && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        {interaction.description}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
