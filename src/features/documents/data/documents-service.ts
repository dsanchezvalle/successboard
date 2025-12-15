/**
 * Documents Service
 *
 * Facade for fetching and transforming Documents Hub data.
 * Provides a clean interface between the Documents UI and the mockapi backend.
 */

import {
  mockapi,
  type Document,
  type DocumentType,
  type DocumentStatus,
} from "@/modules/api";

// =============================================================================
// VIEW MODEL TYPES
// =============================================================================

export interface DocumentListItem {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  customerHealthScore: number;
  documentType: DocumentType;
  documentTypeLabel: string;
  frameworkId?: string;
  frameworkName: string;
  status: DocumentStatus;
  statusLabel: string;
  ownerName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface DocumentsHubData {
  documents: DocumentListItem[];
  totalCount: number;
  documentTypes: { value: DocumentType; label: string; count: number }[];
  statuses: { value: DocumentStatus; label: string; count: number }[];
  frameworks: { value: string; label: string; count: number }[];
  customers: { value: string; label: string; count: number }[];
  fetchedAt: string;
  isFallback: boolean;
}

export type SortField = "createdAt" | "title" | "customerName" | "documentType";
export type SortOrder = "asc" | "desc";

export interface DocumentFilters {
  search?: string;
  documentType?: DocumentType;
  status?: DocumentStatus;
  frameworkId?: string;
  customerId?: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
}

// =============================================================================
// LABEL MAPPINGS
// =============================================================================

const documentTypeLabels: Record<DocumentType, string> = {
  "success-plan": "Success Plan",
  "qbr-deck": "QBR Deck",
  "ebr-deck": "EBR Deck",
  "onboarding-plan": "Onboarding Plan",
  "implementation-plan": "Implementation Plan",
  "internal-brief": "Internal Brief",
  playbook: "Playbook",
  "health-report": "Health Report",
  "renewal-proposal": "Renewal Proposal",
  "expansion-proposal": "Expansion Proposal",
  "executive-summary": "Executive Summary",
  "meeting-notes": "Meeting Notes",
  other: "Other",
};

const statusLabels: Record<DocumentStatus, string> = {
  draft: "Draft",
  "in-review": "In Review",
  approved: "Approved",
  shared: "Shared",
  signed: "Signed",
  archived: "Archived",
  superseded: "Superseded",
};

const frameworkLabels: Record<string, string> = {
  "1": "At-Risk Accounts",
  "2": "Growth Opportunities",
  "3": "Onboarding",
  "4": "Enterprise",
  "5": "Strategic",
  "6": "Renewal",
  "7": "Adoption",
  "8": "Health Review",
  "9": "Churn Playbook",
  "10": "Expansion Playbook",
};

const customerNames: Record<string, { name: string; healthScore: number }> = {
  "1": { name: "Acme Corporation", healthScore: 82 },
  "2": { name: "TechStart Inc", healthScore: 68 },
  "3": { name: "Global Finance Partners", healthScore: 91 },
  "4": { name: "RetailMax", healthScore: 45 },
  "5": { name: "HealthFirst Medical", healthScore: 76 },
  "6": { name: "CloudNine Solutions", healthScore: 58 },
  "7": { name: "Meridian Logistics", healthScore: 72 },
  "8": { name: "Apex Industries", healthScore: 85 },
  "9": { name: "Quantum Dynamics", healthScore: 94 },
  "10": { name: "GreenEnergy Corp", healthScore: 79 },
  "11": { name: "DataFlow Systems", healthScore: 63 },
  "12": { name: "PharmaCore Labs", healthScore: 88 },
  "13": { name: "Urban Mobility", healthScore: 41 },
  "14": { name: "SecureNet Pro", healthScore: 77 },
  "15": { name: "MediaWave Studios", healthScore: 69 },
  "16": { name: "FoodChain Global", healthScore: 83 },
};

// =============================================================================
// TRANSFORM FUNCTIONS
// =============================================================================

function transformDocument(doc: Document): DocumentListItem {
  const customer = customerNames[doc.customerId] || {
    name: "Unknown Customer",
    healthScore: 0,
  };

  return {
    id: doc.id,
    title: doc.title,
    customerId: doc.customerId,
    customerName: customer.name,
    customerHealthScore: customer.healthScore,
    documentType: doc.documentType,
    documentTypeLabel: documentTypeLabels[doc.documentType] || doc.documentType,
    frameworkId: doc.frameworkId,
    frameworkName: doc.frameworkId
      ? frameworkLabels[doc.frameworkId] || "Custom"
      : "None",
    status: doc.status,
    statusLabel: statusLabels[doc.status] || doc.status,
    ownerName: doc.ownerName,
    description: doc.description,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    tags: doc.tags || [],
  };
}

function computeFilterOptions(documents: DocumentListItem[]) {
  const typeCounts = new Map<DocumentType, number>();
  const statusCounts = new Map<DocumentStatus, number>();
  const frameworkCounts = new Map<string, number>();
  const customerCounts = new Map<string, string>();

  for (const doc of documents) {
    typeCounts.set(
      doc.documentType,
      (typeCounts.get(doc.documentType) || 0) + 1
    );
    statusCounts.set(doc.status, (statusCounts.get(doc.status) || 0) + 1);
    if (doc.frameworkId) {
      frameworkCounts.set(
        doc.frameworkId,
        (frameworkCounts.get(doc.frameworkId) || 0) + 1
      );
    }
    customerCounts.set(doc.customerId, doc.customerName);
  }

  return {
    documentTypes: Array.from(typeCounts.entries()).map(([value, count]) => ({
      value,
      label: documentTypeLabels[value] || value,
      count,
    })),
    statuses: Array.from(statusCounts.entries()).map(([value, count]) => ({
      value,
      label: statusLabels[value] || value,
      count,
    })),
    frameworks: Array.from(frameworkCounts.entries()).map(([value, count]) => ({
      value,
      label: frameworkLabels[value] || "Custom",
      count,
    })),
    customers: Array.from(customerCounts.entries()).map(([value, label]) => ({
      value,
      label,
      count: documents.filter((d) => d.customerId === value).length,
    })),
  };
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

function isApiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL);
}

export async function getDocumentsHubData(
  filters?: DocumentFilters
): Promise<DocumentsHubData> {
  try {
    if (!isApiConfigured()) {
      console.log(
        "[documents-service] API not configured, using fallback data"
      );
      return getFallbackData(filters);
    }

    const response = await mockapi.getDocuments({ limit: 100 });
    let documents = response.data.map(transformDocument);

    // Apply filters
    documents = applyFilters(documents, filters);

    const filterOptions = computeFilterOptions(
      response.data.map(transformDocument)
    );

    return {
      documents,
      totalCount: documents.length,
      ...filterOptions,
      fetchedAt: new Date().toISOString(),
      isFallback: false,
    };
  } catch (error) {
    console.error("[documents-service] Failed to fetch documents:", error);
    return getFallbackData(filters);
  }
}

function applyFilters(
  documents: DocumentListItem[],
  filters?: DocumentFilters
): DocumentListItem[] {
  if (!filters) return documents;

  let result = [...documents];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchLower) ||
        doc.customerName.toLowerCase().includes(searchLower) ||
        (doc.description?.toLowerCase().includes(searchLower) ?? false)
    );
  }

  // Document type filter
  if (filters.documentType) {
    result = result.filter((doc) => doc.documentType === filters.documentType);
  }

  // Status filter
  if (filters.status) {
    result = result.filter((doc) => doc.status === filters.status);
  }

  // Framework filter
  if (filters.frameworkId) {
    result = result.filter((doc) => doc.frameworkId === filters.frameworkId);
  }

  // Customer filter
  if (filters.customerId) {
    result = result.filter((doc) => doc.customerId === filters.customerId);
  }

  // Sorting
  const sortField = filters.sortField || "createdAt";
  const sortOrder = filters.sortOrder || "desc";

  result.sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "createdAt":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "customerName":
        comparison = a.customerName.localeCompare(b.customerName);
        break;
      case "documentType":
        comparison = a.documentTypeLabel.localeCompare(b.documentTypeLabel);
        break;
    }
    return sortOrder === "desc" ? -comparison : comparison;
  });

  return result;
}

// =============================================================================
// FALLBACK DATA
// =============================================================================

function getFallbackData(filters?: DocumentFilters): DocumentsHubData {
  const fallbackDocuments: DocumentListItem[] = [
    {
      id: "1",
      title: "Acme Corporation Success Plan 2024",
      customerId: "1",
      customerName: "Acme Corporation",
      customerHealthScore: 82,
      documentType: "success-plan",
      documentTypeLabel: "Success Plan",
      frameworkId: "4",
      frameworkName: "Enterprise",
      status: "approved",
      statusLabel: "Approved",
      ownerName: "Sarah Chen",
      description:
        "Annual success plan outlining key objectives and milestones",
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-01-25T14:00:00Z",
      tags: ["enterprise", "manufacturing"],
    },
    {
      id: "2",
      title: "Acme Q4 2024 QBR Deck",
      customerId: "1",
      customerName: "Acme Corporation",
      customerHealthScore: 82,
      documentType: "qbr-deck",
      documentTypeLabel: "QBR Deck",
      frameworkId: "4",
      frameworkName: "Enterprise",
      status: "draft",
      statusLabel: "Draft",
      ownerName: "Sarah Chen",
      description: "Quarterly Business Review presentation for Q4 2024",
      createdAt: "2024-12-01T09:00:00Z",
      updatedAt: "2024-12-05T15:00:00Z",
      tags: ["qbr", "q4-2024"],
    },
    {
      id: "3",
      title: "Global Finance Partners Expansion Proposal",
      customerId: "3",
      customerName: "Global Finance Partners",
      customerHealthScore: 91,
      documentType: "expansion-proposal",
      documentTypeLabel: "Expansion Proposal",
      frameworkId: "5",
      frameworkName: "Strategic",
      status: "in-review",
      statusLabel: "In Review",
      ownerName: "Sarah Chen",
      description:
        "Proposal for expanding platform usage to additional business units",
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-12-10T11:00:00Z",
      tags: ["strategic", "expansion"],
    },
    {
      id: "4",
      title: "TechStart Onboarding Plan",
      customerId: "2",
      customerName: "TechStart Inc",
      customerHealthScore: 68,
      documentType: "onboarding-plan",
      documentTypeLabel: "Onboarding Plan",
      frameworkId: "3",
      frameworkName: "Onboarding",
      status: "shared",
      statusLabel: "Shared",
      ownerName: "Michael Torres",
      description:
        "30-60-90 day onboarding plan with implementation milestones",
      createdAt: "2024-11-18T10:00:00Z",
      updatedAt: "2024-11-20T09:00:00Z",
      tags: ["onboarding", "smb"],
    },
    {
      id: "5",
      title: "RetailMax Risk Mitigation Plan",
      customerId: "4",
      customerName: "RetailMax",
      customerHealthScore: 45,
      documentType: "internal-brief",
      documentTypeLabel: "Internal Brief",
      frameworkId: "1",
      frameworkName: "At-Risk Accounts",
      status: "approved",
      statusLabel: "Approved",
      ownerName: "Jennifer Park",
      description: "Internal action plan for addressing adoption issues",
      createdAt: "2024-11-22T14:00:00Z",
      updatedAt: "2024-11-25T10:00:00Z",
      tags: ["at-risk", "retail"],
    },
    {
      id: "6",
      title: "HealthFirst Medical Health Report Q4",
      customerId: "5",
      customerName: "HealthFirst Medical",
      customerHealthScore: 76,
      documentType: "health-report",
      documentTypeLabel: "Health Report",
      status: "shared",
      statusLabel: "Shared",
      ownerName: "Michael Torres",
      frameworkName: "None",
      description: "Quarterly health assessment report with usage analytics",
      createdAt: "2024-11-28T09:00:00Z",
      updatedAt: "2024-12-02T14:00:00Z",
      tags: ["health-report", "healthcare"],
    },
    {
      id: "7",
      title: "Meridian Logistics Billing Resolution Summary",
      customerId: "7",
      customerName: "Meridian Logistics",
      customerHealthScore: 72,
      documentType: "meeting-notes",
      documentTypeLabel: "Meeting Notes",
      status: "draft",
      statusLabel: "Draft",
      ownerName: "Jennifer Park",
      frameworkName: "None",
      description: "Summary of billing dispute and resolution steps",
      createdAt: "2024-11-28T16:00:00Z",
      updatedAt: "2024-11-28T16:00:00Z",
      tags: ["billing", "escalation"],
    },
    {
      id: "8",
      title: "Quantum Dynamics Strategic Partnership Proposal",
      customerId: "9",
      customerName: "Quantum Dynamics",
      customerHealthScore: 94,
      documentType: "executive-summary",
      documentTypeLabel: "Executive Summary",
      frameworkId: "5",
      frameworkName: "Strategic",
      status: "in-review",
      statusLabel: "In Review",
      ownerName: "Sarah Chen",
      description: "Executive summary for strategic partnership opportunity",
      createdAt: "2024-12-02T10:00:00Z",
      updatedAt: "2024-12-04T14:00:00Z",
      tags: ["strategic", "partnership"],
    },
    {
      id: "9",
      title: "Quantum Dynamics EBR Deck Q4 2024",
      customerId: "9",
      customerName: "Quantum Dynamics",
      customerHealthScore: 94,
      documentType: "ebr-deck",
      documentTypeLabel: "EBR Deck",
      frameworkId: "5",
      frameworkName: "Strategic",
      status: "shared",
      statusLabel: "Shared",
      ownerName: "Sarah Chen",
      description: "Executive Business Review presentation for Q4 2024",
      createdAt: "2024-11-25T09:00:00Z",
      updatedAt: "2024-12-04T10:00:00Z",
      tags: ["ebr", "strategic"],
    },
    {
      id: "10",
      title: "GreenEnergy Expansion Proposal",
      customerId: "10",
      customerName: "GreenEnergy Corp",
      customerHealthScore: 79,
      documentType: "expansion-proposal",
      documentTypeLabel: "Expansion Proposal",
      frameworkId: "2",
      frameworkName: "Growth Opportunities",
      status: "draft",
      statusLabel: "Draft",
      ownerName: "Michael Torres",
      description: "Proposal for expanding to sustainability departments",
      createdAt: "2024-12-08T09:00:00Z",
      updatedAt: "2024-12-08T09:00:00Z",
      tags: ["expansion", "energy"],
    },
    {
      id: "11",
      title: "Urban Mobility Cost Optimization Proposal",
      customerId: "13",
      customerName: "Urban Mobility",
      customerHealthScore: 41,
      documentType: "renewal-proposal",
      documentTypeLabel: "Renewal Proposal",
      frameworkId: "1",
      frameworkName: "At-Risk Accounts",
      status: "draft",
      statusLabel: "Draft",
      ownerName: "Jennifer Park",
      description: "Renewal proposal with cost-reduction options",
      createdAt: "2024-11-18T10:00:00Z",
      updatedAt: "2024-11-18T10:00:00Z",
      tags: ["renewal", "at-risk"],
    },
    {
      id: "12",
      title: "PharmaCore Labs Q4 QBR Deck",
      customerId: "12",
      customerName: "PharmaCore Labs",
      customerHealthScore: 88,
      documentType: "qbr-deck",
      documentTypeLabel: "QBR Deck",
      frameworkId: "4",
      frameworkName: "Enterprise",
      status: "shared",
      statusLabel: "Shared",
      ownerName: "Sarah Chen",
      description: "Quarterly Business Review with compliance focus",
      createdAt: "2024-11-28T10:00:00Z",
      updatedAt: "2024-12-03T10:30:00Z",
      tags: ["qbr", "enterprise", "compliance"],
    },
    {
      id: "13",
      title: "SecureNet Pro Implementation Plan",
      customerId: "14",
      customerName: "SecureNet Pro",
      customerHealthScore: 77,
      documentType: "implementation-plan",
      documentTypeLabel: "Implementation Plan",
      frameworkId: "3",
      frameworkName: "Onboarding",
      status: "approved",
      statusLabel: "Approved",
      ownerName: "Alex Rivera",
      description: "Detailed implementation plan with technical requirements",
      createdAt: "2024-11-02T09:00:00Z",
      updatedAt: "2024-11-08T14:00:00Z",
      tags: ["implementation", "cybersecurity"],
    },
    {
      id: "14",
      title: "Global Finance Partners Success Plan 2024",
      customerId: "3",
      customerName: "Global Finance Partners",
      customerHealthScore: 91,
      documentType: "success-plan",
      documentTypeLabel: "Success Plan",
      frameworkId: "5",
      frameworkName: "Strategic",
      status: "signed",
      statusLabel: "Signed",
      ownerName: "Sarah Chen",
      description: "Comprehensive success plan for strategic account",
      createdAt: "2024-01-05T09:00:00Z",
      updatedAt: "2024-01-22T16:00:00Z",
      tags: ["strategic", "success-plan"],
    },
  ];

  const filtered = applyFilters(fallbackDocuments, filters);
  const filterOptions = computeFilterOptions(fallbackDocuments);

  return {
    documents: filtered,
    totalCount: filtered.length,
    ...filterOptions,
    fetchedAt: new Date().toISOString(),
    isFallback: true,
  };
}
