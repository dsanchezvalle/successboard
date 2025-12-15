/**
 * Documents Page
 *
 * Lists all documents with quick access to create new ones.
 * Documents are the main entity - Frameworks and Templates are metadata only.
 *
 * @accessibility
 * - Semantic heading structure
 * - Proper landmark regions
 * - Good color contrast with DS tokens
 */

import Link from "next/link";
import { FileText, Plus, Calendar, User, Tag } from "lucide-react";
import { Heading, Text } from "@/design-system/primitives";

export const metadata = {
  title: "Documents | SuccessBoard",
  description: "Manage your customer success documents and plans",
};

const mockDocuments = [
  {
    id: "1",
    title: "Q1 2024 Success Plan",
    customer: "Acme Corporation",
    owner: "Sarah Chen",
    lastUpdated: "March 15, 2024",
    framework: "MEDDICC",
    template: "Enterprise Success Plan",
  },
  {
    id: "2",
    title: "Onboarding Playbook",
    customer: "TechStart Inc",
    owner: "Michael Torres",
    lastUpdated: "March 12, 2024",
    framework: "SPICED",
    template: "Onboarding Template",
  },
  {
    id: "3",
    title: "Renewal Strategy",
    customer: "Global Finance Partners",
    owner: "Sarah Chen",
    lastUpdated: "March 10, 2024",
    framework: "MEDDICC",
    template: "Custom",
  },
];

export default function DocumentsPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <header className="border-b border-border-default bg-bg-surface px-6 py-4">
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
          <button className="flex h-9 items-center gap-2 rounded-md bg-brand-primary px-4 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover">
            <Plus className="h-4 w-4" />
            <span>New Document</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* Document List */}
          <div className="space-y-3">
            {mockDocuments.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="group flex items-start gap-4 rounded-lg border border-border-default bg-bg-surface p-4 transition-all hover:border-brand-primary/30 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-text-primary group-hover:text-brand-primary">
                        {doc.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-text-muted">
                        {doc.customer}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-2.5 py-0.5 text-xs font-medium text-brand-primary">
                      {doc.framework}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {doc.owner}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {doc.lastUpdated}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {doc.template}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
