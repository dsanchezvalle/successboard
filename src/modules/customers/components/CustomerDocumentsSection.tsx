"use client";

import { useState, useEffect } from "react";
import { AlertCircle, FileText } from "lucide-react";
import { getDocumentsByCustomer } from "@/modules/api";
import type { Document } from "@/modules/api";
import {
  CustomerDocumentCard,
  CustomerDocumentCardSkeleton,
  type CustomerDocumentCardData,
} from "./CustomerDocumentCard";
import { CustomerDetailCard } from "./CustomerDetailCard";

interface CustomerDocumentsSectionProps {
  customerId: string | number;
  /** Whether to wrap in a CustomerDetailCard (used for mobile tab) */
  wrapInCard?: boolean;
  /** Variant for different viewport sizes */
  variant?: "default" | "desktop";
}

const documentTypeLabels: Record<string, string> = {
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

const statusLabels: Record<string, string> = {
  draft: "Draft",
  "in-review": "In Review",
  approved: "Approved",
  shared: "Shared",
  signed: "Signed",
  archived: "Archived",
  superseded: "Superseded",
};

function transformToCardData(doc: Document): CustomerDocumentCardData {
  return {
    id: doc.id,
    title: doc.title,
    documentType: doc.documentType,
    documentTypeLabel: documentTypeLabels[doc.documentType] || doc.documentType,
    status: doc.status,
    statusLabel: statusLabels[doc.status] || doc.status,
    updatedAt: doc.updatedAt,
  };
}

export function CustomerDocumentsSection({
  customerId,
  wrapInCard = false,
  variant = "default",
}: CustomerDocumentsSectionProps) {
  const isDesktop = variant === "desktop";
  const [documents, setDocuments] = useState<CustomerDocumentCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getDocumentsByCustomer(String(customerId));
        setDocuments(response.data.map(transformToCardData));
      } catch (err) {
        console.error("Failed to fetch customer documents:", err);
        setError("Unable to load documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [customerId]);

  const gridClasses = isDesktop
    ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    : "grid gap-4 sm:grid-cols-2";

  const content = (
    <>
      {/* Loading state */}
      {loading && (
        <div className={gridClasses}>
          <CustomerDocumentCardSkeleton />
          <CustomerDocumentCardSkeleton />
          <CustomerDocumentCardSkeleton />
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          className={`flex items-center gap-2 rounded-lg border border-error-border bg-error-bg/50 p-3 text-error-icon ${
            isDesktop ? "text-base" : "text-sm"
          }`}
        >
          <AlertCircle
            className={isDesktop ? "h-5 w-5 shrink-0" : "h-4 w-4 shrink-0"}
          />
          <span>{error}</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && documents.length === 0 && (
        <div
          className={`flex flex-col items-center justify-center text-center ${
            isDesktop ? "py-12" : "py-8"
          }`}
        >
          <div
            className={`flex items-center justify-center rounded-full bg-bg-subtle text-text-muted ${
              isDesktop ? "h-16 w-16" : "h-12 w-12"
            }`}
          >
            <FileText className={isDesktop ? "h-8 w-8" : "h-6 w-6"} />
          </div>
          <p
            className={`mt-3 text-text-muted ${
              isDesktop ? "text-base" : "text-sm"
            }`}
          >
            No documents for this customer
          </p>
        </div>
      )}

      {/* Documents grid */}
      {!loading && !error && documents.length > 0 && (
        <div className={gridClasses}>
          {documents.map((doc) => (
            <CustomerDocumentCard
              key={doc.id}
              document={doc}
              customerId={String(customerId)}
              variant={variant}
            />
          ))}
        </div>
      )}
    </>
  );

  if (wrapInCard) {
    return <CustomerDetailCard title="Documents">{content}</CustomerDetailCard>;
  }

  return content;
}
