/**
 * Document Detail Page
 *
 * Displays a single document with sectioned layout, outline panel, and AI assistant.
 * Frameworks and Templates are presentational metadata only.
 */

import { DocumentDetailView } from "@/features/documents/components/DocumentDetailView";
import {
  aiActions,
  documentOutline,
} from "@/features/documents/data/mock-document";
import {
  getDocumentDetail,
  formatRelativeDate,
} from "@/features/documents/data/document-detail-service";
import type { DocumentDetail } from "@/features/documents/data/document-detail-service";

export const metadata = {
  title: "Document | SuccessBoard",
  description: "View and edit your customer success document",
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fromCustomerId?: string }>;
}

export default async function DocumentDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { fromCustomerId } = await searchParams;

  console.log(`[documents/[id]] Loading document: ${id}`);

  // Fetch normalized document detail (API with fallback)
  const documentDetail = await getDocumentDetail(id);

  // Determine back navigation based on context
  const backHref = fromCustomerId
    ? `/customers/${fromCustomerId}`
    : "/documents";

  return (
    <div className="h-[calc(100vh-3.5rem)] -mx-4 -my-6 sm:-mx-6 lg:-mx-8 xl:-mx-10">
      <DocumentDetailView
        document={documentDetail}
        aiActions={aiActions}
        outlineItems={documentOutline}
        backHref={backHref}
      />
    </div>
  );
}
