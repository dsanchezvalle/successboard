import type {
  CustomerInteraction,
  InteractionChannel,
} from "@/modules/customers/types";

function seededRandom(seed: number): () => number {
  // Simple LCG for deterministic pseudo-random numbers
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const CHANNELS: InteractionChannel[] = [
  "email",
  "call",
  "meeting",
  "qbr",
  "ticket",
  "note",
];

const BASE_TIME = Date.parse("2024-01-01T00:00:00.000Z");

export function getCustomerInteractionsMock(
  customerId: string | number
): CustomerInteraction[] {
  // Convert string to number for seeding
  const numericId =
    typeof customerId === "string" ? parseInt(customerId, 10) || 1 : customerId;
  const rand = seededRandom(numericId || 1);

  const count = 4 + Math.floor(rand() * 4); // 4–7 interactions

  const interactions: CustomerInteraction[] = [];

  for (let i = 0; i < count; i++) {
    const channel = CHANNELS[Math.floor(rand() * CHANNELS.length)];

    const daysAgo = 5 + Math.floor(rand() * 90); // up to ~3 months back
    const occurredAt = new Date(
      BASE_TIME + (numericId * 13 + i * 7 - daysAgo) * 24 * 60 * 60 * 1000
    ).toISOString();

    const id = `${numericId}-${i + 1}`;

    let title: string;
    let description: string | undefined;

    switch (channel) {
      case "email":
        title = "Outbound email to customer";
        description = "Follow-up on product adoption and next steps.";
        break;
      case "call":
        title = "Check-in call";
        description = "Discussed usage, feedback, and upcoming milestones.";
        break;
      case "meeting":
        title = "Working session";
        description = "Reviewed current workflows and potential improvements.";
        break;
      case "qbr":
        title = "Quarterly Business Review";
        description =
          "Presented outcomes, roadmap alignment, and renewal plan.";
        break;
      case "ticket":
        title = "Support ticket";
        description = "Customer reported an issue that required investigation.";
        break;
      case "note":
      default:
        title = "Internal note";
        description = "CSM added context about the customer account.";
        break;
    }

    const owner = rand() > 0.3 ? "CSM Team" : undefined;

    interactions.push({
      id,
      customerId: numericId,
      occurredAt,
      channel,
      title,
      description,
      owner,
    });
  }

  // Ensure newest first
  return interactions.sort((a, b) => (a.occurredAt < b.occurredAt ? 1 : -1));
}
