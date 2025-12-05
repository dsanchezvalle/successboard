import type {
  CustomerSuccessMetrics,
  ChurnRiskLevel,
  CustomerStage,
} from "@/modules/customers/types";

function getChurnRiskLevel(score: number): ChurnRiskLevel {
  if (score >= 80) return "low";
  if (score >= 50) return "medium";
  return "high";
}

function getStage(score: number): CustomerStage {
  if (score < 30) return "onboarding";
  if (score < 60) return "active";
  if (score < 85) return "expanding";
  return "at-risk";
}

export function getCustomerSuccessMetricsMock(
  customerId: number
): CustomerSuccessMetrics {
  // Simple deterministic pseudo-random generator based on customerId
  const base = (customerId * 37) % 101; // 0–100
  const healthScore = Math.max(10, Math.min(95, base));

  const churnRisk = getChurnRiskLevel(healthScore);
  const stage = getStage(healthScore);

  // Lifetime value in a rough range, deterministic from id
  const lifetimeValueBase = (customerId * 12345) % 50000; // up to 50k
  const lifetimeValue = 5000 + lifetimeValueBase; // 5k–55k

  return {
    healthScore,
    churnRisk,
    lifetimeValue,
    stage,
  };
}
