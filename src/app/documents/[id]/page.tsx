/**
 * Document Detail Page
 *
 * Displays a single document with sectioned layout, outline panel, and AI assistant.
 * Frameworks and Templates are presentational metadata only.
 */

import { DocumentDetailView } from "@/features/documents/components/DocumentDetailView";
import {
  mockDocument,
  aiActions,
  documentOutline,
} from "@/features/documents/data/mock-document";

export const metadata = {
  title: "Document | SuccessBoard",
  description: "View and edit your customer success document",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DocumentDetailPage({ params }: PageProps) {
  const { id } = await params;

  // For MVP, we use mock data regardless of ID
  // In production, this would fetch from API based on ID
  console.log(`[documents/[id]] Loading document: ${id}`);

  return (
    <div className="h-[calc(100vh-3.5rem)] -mx-4 -my-6 sm:-mx-6 lg:-mx-8 xl:-mx-10">
      <DocumentDetailView
        document={mockDocument}
        aiActions={aiActions}
        outlineItems={documentOutline}
      />
    </div>
  );
}
