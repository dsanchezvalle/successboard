/**
 * Document Detail Service
 *
 * Normalizes API document data into a canonical UI model for the Document Overview page.
 * Handles API fetching with proper fallback behavior.
 */

import type { Document as ApiDocument } from "@/modules/api";
import type { DocumentType, DocumentStatus } from "@/modules/api";
import { mockapi } from "@/modules/api/mockapi";
import { mockDocument } from "./mock-document";

// =============================================================================
// NORMALIZED UI MODEL
// =============================================================================

export interface DocumentDetail {
  id: string;
  title: string;
  description: string | null;
  type: string | null;
  status: string | null;
  framework: string | null;
  templateName: string | null;
  ownerName: string | null;
  createdAt: string;
  updatedAt: string;
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

// =============================================================================
// MAPPING FUNCTIONS
// =============================================================================

function mapApiDocumentToDetail(doc: ApiDocument): DocumentDetail {
  // Use same frameworkLabels as documents-service for consistency with table
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

  return {
    id: doc.id,
    title: doc.title,
    description: doc.description || null,
    type: documentTypeLabels[doc.documentType] || doc.documentType,
    status: statusLabels[doc.status] || doc.status,
    framework: doc.frameworkId
      ? frameworkLabels[doc.frameworkId] || "Custom"
      : null,
    templateName: doc.documentType, // Use documentType as template name for now
    ownerName: doc.ownerName || null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function mapMockDocumentToDetail(): DocumentDetail {
  return {
    id: mockDocument.id,
    title: mockDocument.title,
    description: mockDocument.description || null,
    type: "Success Plan", // Hardcoded for mock
    status: "Approved", // Hardcoded for mock
    framework: mockDocument.metadata.framework || "MEDDICC",
    templateName: "Enterprise Success Plan",
    ownerName: mockDocument.metadata.owner || null,
    createdAt: "2024-01-10T09:00:00Z", // Hardcoded for mock
    updatedAt: "2024-03-15T14:00:00Z", // Hardcoded for mock
  };
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

export async function getDocumentDetail(id: string): Promise<DocumentDetail> {
  try {
    // Try to fetch from API first
    const apiDocument = await mockapi.getDocumentById(id);
    console.log(
      `[document-detail-service] Loaded document from API:`,
      apiDocument.title
    );
    return mapApiDocumentToDetail(apiDocument);
  } catch (error) {
    console.warn(
      `[document-detail-service] Failed to fetch document ${id}:`,
      error
    );
    // Fallback to mock document
    console.log(`[document-detail-service] Using fallback document`);
    return mapMockDocumentToDetail();
  }
}

// =============================================================================
// FORMATTING UTILITIES
// =============================================================================

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Compact date format for mobile (e.g., "Jan 10") */
export function formatDateCompact(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return formatDate(isoDate);
}
