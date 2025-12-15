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
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page Header */}
      <header className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <Heading level={1} className="text-text-primary">
              Documents
            </Heading>
            <Text
              variant="body"
              color="muted"
              className="max-w-2xl text-text-muted"
            >
              Create and manage customer success plans, playbooks, and
              documentation.
            </Text>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-bg-page mt-6">
        <DocumentsHub initialData={data} />
      </main>
    </div>
  );
}
