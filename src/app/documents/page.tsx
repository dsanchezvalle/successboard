/**
 * Documents Page
 *
 * Global Documents hub listing all documents across customers.
 * Features search, filtering, and Table/Card view switching.
 *
 * @accessibility
 * - Semantic heading structure
 * - Proper landmark regions
 * - Good color contrast with DS tokens
 */

import { Plus } from "lucide-react";
import { Heading, Text } from "@/design-system/primitives";
import { DocumentsHub } from "@/features/documents/components/DocumentsHub";
import { getDocumentsHubData } from "@/features/documents/data/documents-service";

export const metadata = {
  title: "Documents | SuccessBoard",
  description: "Manage your customer success documents and plans",
};

export default async function DocumentsPage() {
  const data = await getDocumentsHubData();

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <header className="border-b border-border-default bg-bg-surface px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Heading level={1} className="text-text-primary">
              Documents
            </Heading>
            <Text variant="body" color="muted" className="text-text-muted">
              Create and manage customer success plans, playbooks, and
              documentation.
            </Text>
          </div>
          <button className="flex h-9 items-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-primary-hover">
            <Plus className="h-4 w-4" />
            <span>New Document</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-bg-page">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <DocumentsHub initialData={data} />
        </div>
      </main>
    </div>
  );
}
