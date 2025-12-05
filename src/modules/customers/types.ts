export interface CustomerDetail {
  id: number;
  fullName: string;
  address: string | null;
  city: string | null;
  telephone: string | null;
  pets: Array<{
    id: number;
    name: string;
    birthDate: string;
    type: string;
  }>;
}

export interface Customer {
  id: string;
  name: string;
  city?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  petsCount?: number;
  createdFrom: "petclinic" | "mock";
}

export type ChurnRiskLevel = "low" | "medium" | "high";

export type CustomerStage = "onboarding" | "active" | "expanding" | "at-risk";

export interface CustomerSuccessMetrics {
  healthScore: number; // 0–100
  churnRisk: ChurnRiskLevel;
  lifetimeValue: number; // numeric amount, e.g. in USD
  stage: CustomerStage;
}

export type PetsBucket = "all" | "none" | "few" | "many";

export interface CustomerFilterState {
  searchQuery: string;
  city: string | null;
  petsBucket: PetsBucket;
}
