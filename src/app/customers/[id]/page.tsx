"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCustomerById } from "@/modules/api/customers-service";
import { getCustomerInteractionsMock } from "@/modules/customers/mocks/getCustomerInteractionsMock";
import { CustomerInteractionsTimeline } from "@/modules/customers/components/CustomerInteractionsTimeline";
import { CustomerDetailCard } from "@/modules/customers/components/CustomerDetailCard";
import { AccountHealthGauge } from "@/modules/customers/components/AccountHealthGauge";
import { CustomerDocumentsSection } from "@/modules/customers/components/CustomerDocumentsSection";
import type { Customer } from "@/modules/api";
import { Heading, Text } from "@/design-system/primitives";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageParams = {
  id: string;
};

interface PageProps {
  params: Promise<PageParams>;
}

export default function Page({ params }: PageProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "timeline" | "documents"
  >("overview");
  const router = useRouter();

  useEffect(() => {
    const resolveParamsAndFetch = async () => {
      const resolved = await params;

      try {
        const customerData = await getCustomerById(resolved.id);
        if (!customerData) {
          router.push("/customers");
          return;
        }
        setCustomer(customerData);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        router.push("/customers");
      } finally {
        setLoading(false);
      }
    };

    resolveParamsAndFetch();
  }, [params, router]);

  if (loading || !customer) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center">
        <Text color="muted">Loading customer details...</Text>
      </main>
    );
  }

  const interactions = getCustomerInteractionsMock(customer.id);

  // Helper to format currency
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: customer.currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  // Mobile tab navigation
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "documents", label: "Documents" },
  ] as const;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page Header with Back Navigation */}
      <header className="flex items-start gap-3 sm:gap-4 mb-8">
        {/* Back Button - left of title */}
        <Link
          href="/customers"
          className="shrink-0 mt-1 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus rounded-lg"
        >
          {/* Mobile: Icon-only with large tap target */}
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-muted hover:text-text-primary hover:bg-bg-subtle transition-colors"
            aria-label="Back to Customers"
          >
            <ChevronLeft className="h-6 w-6" />
          </span>
        </Link>

        {/* Title */}
        <div className="space-y-1 min-w-0">
          <Heading level={1} className="text-foreground">
            {customer.name}
          </Heading>
          <Text variant="body" color="muted">
            {customer.companyName}
          </Text>
        </div>
      </header>

      {/* Mobile Tab Navigation - Hidden on tablet and desktop */}
      <div className="md:hidden border-b border-border mb-6">
        <nav className="flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Content - Tab-controlled */}
      <div className="md:hidden">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Customer Success Overview */}
            <CustomerDetailCard title="Account Health">
              <div className="space-y-6">
                {/* Health Gauge */}
                <div className="flex justify-center">
                  <AccountHealthGauge score={customer.healthScore} compact />
                </div>

                {/* Trend indicator */}
                {customer.healthTrend && (
                  <div className="text-center">
                    <Text variant="small" color="muted" className="capitalize">
                      Trending {customer.healthTrend}
                    </Text>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-border-default" />

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Text variant="small" color="muted" className="block mb-1">
                      MRR
                    </Text>
                    <div className="text-xl font-semibold text-text-primary">
                      {formatCurrency(customer.mrr)}
                    </div>
                  </div>
                  <div>
                    <Text variant="small" color="muted" className="block mb-1">
                      ARR
                    </Text>
                    <div className="text-xl font-semibold text-text-primary">
                      {formatCurrency(customer.arr)}
                    </div>
                  </div>
                </div>

                {/* Lifecycle & Tier */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Text variant="small" color="muted" className="block mb-1">
                      Lifecycle
                    </Text>
                    <div className="text-sm font-medium text-text-primary capitalize">
                      {customer.lifecycleStage}
                    </div>
                  </div>
                  <div>
                    <Text variant="small" color="muted" className="block mb-1">
                      Tier
                    </Text>
                    <div className="text-sm font-medium text-text-primary capitalize">
                      {customer.tier}
                    </div>
                  </div>
                </div>
              </div>
            </CustomerDetailCard>

            {/* Account & Ownership */}
            <CustomerDetailCard title="Account Details">
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs text-text-muted uppercase tracking-wide mb-1">
                    Customer Success Manager
                  </dt>
                  <dd className="text-sm font-medium text-text-primary">
                    {customer.csmName}
                  </dd>
                </div>
                <div className="border-t border-border-default pt-4">
                  <dt className="text-xs text-text-muted uppercase tracking-wide mb-1">
                    Customer Type
                  </dt>
                  <dd className="text-sm font-medium text-text-primary capitalize">
                    {customer.customerType}
                  </dd>
                </div>
                {customer.industry && (
                  <div>
                    <dt className="text-xs text-text-muted uppercase tracking-wide mb-1">
                      Industry
                    </dt>
                    <dd className="text-sm font-medium text-text-primary">
                      {customer.industry}
                    </dd>
                  </div>
                )}
                {customer.renewalDate && (
                  <div>
                    <dt className="text-xs text-text-muted uppercase tracking-wide mb-1">
                      Renewal Date
                    </dt>
                    <dd className="text-sm font-medium text-text-primary">
                      {new Date(customer.renewalDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      {customer.daysUntilRenewal !== undefined && (
                        <span className="text-text-muted ml-2">
                          ({customer.daysUntilRenewal} days)
                        </span>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </CustomerDetailCard>

            {/* Risk Flags - Only if present */}
            {customer.riskFlags && customer.riskFlags.length > 0 && (
              <CustomerDetailCard title="Risk Indicators">
                <ul className="space-y-2">
                  {customer.riskFlags.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-error-icon"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-error-icon" />
                      <span className="capitalize">
                        {flag.replace(/-/g, " ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </CustomerDetailCard>
            )}
          </div>
        )}

        {activeTab === "timeline" && (
          <CustomerDetailCard title="Recent Activity">
            <CustomerInteractionsTimeline interactions={interactions} />
          </CustomerDetailCard>
        )}

        {activeTab === "documents" && (
          <CustomerDocumentsSection customerId={customer.id} wrapInCard />
        )}
      </div>

      {/* Desktop/Tablet Layout - Natural flow without tabs */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Success Overview - Full width on main column */}
            <CustomerDetailCard title="Account Health">
              <div className="flex flex-wrap items-center gap-8">
                {/* Health Gauge */}
                <div className="flex-shrink-0">
                  <AccountHealthGauge score={customer.healthScore} />
                </div>

                {/* Vertical divider */}
                <div className="hidden sm:block w-px bg-border-default self-stretch min-h-[80px]" />

                {/* Key Metrics */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-2xl font-semibold text-text-primary">
                      {formatCurrency(customer.mrr)}
                    </div>
                    <Text variant="small" color="muted">
                      MRR
                    </Text>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-text-primary">
                      {formatCurrency(customer.arr)}
                    </div>
                    <Text variant="small" color="muted">
                      ARR
                    </Text>
                  </div>
                </div>

                {/* Vertical divider */}
                <div className="hidden sm:block w-px bg-border-default self-stretch min-h-[80px]" />

                {/* Status */}
                <div className="flex gap-6">
                  <div>
                    <div className="text-sm font-medium text-text-primary capitalize">
                      {customer.lifecycleStage}
                    </div>
                    <Text variant="small" color="muted">
                      Lifecycle
                    </Text>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary capitalize">
                      {customer.tier}
                    </div>
                    <Text variant="small" color="muted">
                      Tier
                    </Text>
                  </div>
                  {customer.healthTrend && (
                    <div>
                      <div className="text-sm font-medium text-text-primary capitalize">
                        {customer.healthTrend}
                      </div>
                      <Text variant="small" color="muted">
                        Trend
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </CustomerDetailCard>

            {/* Timeline */}
            <section>
              <Heading
                level={2}
                visualLevel={4}
                className="text-foreground mb-4"
              >
                Recent Activity
              </Heading>
              <CustomerDetailCard title="Interactions">
                <CustomerInteractionsTimeline interactions={interactions} />
              </CustomerDetailCard>
            </section>

            {/* Documents Section */}
            <section>
              <Heading
                level={2}
                visualLevel={4}
                className="text-foreground mb-4"
              >
                Documents
              </Heading>
              <CustomerDetailCard title="Customer Documents">
                <CustomerDocumentsSection customerId={customer.id} />
              </CustomerDetailCard>
            </section>
          </div>

          {/* Sidebar - Account Details */}
          <div className="space-y-6">
            {/* Ownership */}
            <CustomerDetailCard title="Ownership">
              <div>
                <Text variant="small" color="muted" className="block mb-1">
                  Customer Success Manager
                </Text>
                <div className="text-sm font-medium text-foreground">
                  {customer.csmName}
                </div>
              </div>
            </CustomerDetailCard>

            {/* Account Details */}
            <CustomerDetailCard title="Account Details">
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Customer Type
                  </dt>
                  <dd className="text-sm font-medium text-foreground capitalize">
                    {customer.customerType}
                  </dd>
                </div>
                {customer.industry && (
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Industry
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {customer.industry}
                    </dd>
                  </div>
                )}
                {customer.employeeCount && (
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Company Size
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {customer.employeeCount.toLocaleString()} employees
                    </dd>
                  </div>
                )}
                {customer.website && (
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Website
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      <a
                        href={customer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {customer.website.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </CustomerDetailCard>

            {/* Renewal */}
            {customer.renewalDate && (
              <CustomerDetailCard title="Renewal">
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {new Date(customer.renewalDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </div>
                  {customer.daysUntilRenewal !== undefined && (
                    <Text variant="small" color="muted">
                      {customer.daysUntilRenewal > 0
                        ? `${customer.daysUntilRenewal} days remaining`
                        : customer.daysUntilRenewal === 0
                        ? "Due today"
                        : `${Math.abs(customer.daysUntilRenewal)} days overdue`}
                    </Text>
                  )}
                </div>
              </CustomerDetailCard>
            )}

            {/* Risk Flags */}
            {customer.riskFlags && customer.riskFlags.length > 0 && (
              <CustomerDetailCard title="Risk Indicators">
                <ul className="space-y-2">
                  {customer.riskFlags.map((flag, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-error-icon"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-error-icon flex-shrink-0" />
                      <span className="capitalize">
                        {flag.replace(/-/g, " ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </CustomerDetailCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
