/**
 * Documents Page - Placeholder
 *
 * This is a foundation page for the future Documents module.
 * The layout supports:
 * - Main content area (center)
 * - Future collapsible left panel (document outline)
 * - Future collapsible right panel (AI assistant/contextual tools)
 *
 * NO double sidebar pattern - contextual panels are within the main content area.
 *
 * @accessibility
 * - Semantic heading structure
 * - Proper landmark regions
 * - Good color contrast with DS tokens
 */

import { Heading, Text } from "@/design-system/primitives";

export const metadata = {
  title: "Documents | SuccessBoard",
  description: "Manage your customer success documents and plans",
};

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
          {/* Future: Action buttons (New Document, etc.) */}
        </div>
      </header>

      {/* Main Content Area - supports future contextual panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* 
          Future: Left Contextual Panel (Document Outline)
          This will be a collapsible panel, NOT a second sidebar.
          It lives within the main content area and can be toggled.
          
          <DocumentOutlinePanel collapsed={isOutlineCollapsed} />
        */}

        {/* Center Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-6 py-12">
            {/* Coming Soon State */}
            <div className="rounded-xl border border-border-default bg-bg-surface p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-info-bg">
                <svg
                  className="h-8 w-8 text-info-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <Heading level={2} className="text-text-primary">
                Coming Soon
              </Heading>
              <Text
                variant="body"
                color="muted"
                className="mx-auto mt-2 max-w-md text-text-muted"
              >
                The Documents module is under development. You&apos;ll be able
                to create success plans, playbooks, and collaborative documents
                for your customers.
              </Text>

              {/* Feature Preview */}
              <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
                <FeaturePreview
                  title="Success Plans"
                  description="Create structured plans with objectives, metrics, and action items."
                />
                <FeaturePreview
                  title="Playbooks"
                  description="Build reusable templates for common customer scenarios."
                />
                <FeaturePreview
                  title="AI Assistant"
                  description="Get intelligent suggestions to improve your documents."
                />
              </div>
            </div>
          </div>
        </main>

        {/* 
          Future: Right Contextual Panel (AI Assistant)
          This will be a collapsible panel for contextual tools.
          It lives within the main content area and can be toggled.
          
          <AIAssistantPanel collapsed={isAssistantCollapsed} />
        */}
      </div>
    </div>
  );
}

/**
 * Feature preview card for the coming soon state
 */
function FeaturePreview({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border-default bg-bg-subtle p-4">
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      <p className="mt-1 text-xs text-text-muted">{description}</p>
    </div>
  );
}
