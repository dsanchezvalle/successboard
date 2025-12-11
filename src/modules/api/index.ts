/**
 * SuccessBoard API Module
 *
 * Provides typed access to the mockapi.io backend.
 *
 * @module api
 *
 * @example
 * ```ts
 * import { mockapi, type Customer, type MetricsSummary } from "@/modules/api";
 *
 * // Fetch customers
 * const { data: customers } = await mockapi.getCustomers();
 *
 * // Fetch overview metrics
 * const metrics = await mockapi.getOverviewMetrics();
 *
 * // Fetch with filters
 * const atRisk = await mockapi.getCustomers({
 *   lifecycleStage: "at-risk",
 *   sortBy: "healthScore"
 * });
 * ```
 *
 * ## Configuration
 *
 * Set the `NEXT_PUBLIC_MOCKAPI_BASE_URL` environment variable to your
 * mockapi.io project URL:
 *
 * ```env
 * NEXT_PUBLIC_MOCKAPI_BASE_URL=https://64abc123def456.mockapi.io/api/v1
 * ```
 *
 * ## Integration TODOs
 *
 * The following UI components need to be updated to use this API:
 *
 * - [ ] Overview page (`src/app/page.tsx`)
 *   - Replace `getOverviewKpis()` with `mockapi.getOverviewMetrics()`
 *   - Update `OverviewKpisGrid` to use `MetricsSummary` type
 *   - Update `AccountsNeedingAttention` to use `mockapi.getCustomers({ lifecycleStage: "at-risk" })`
 *
 * - [ ] Customers Hub (`src/app/customers/page.tsx`)
 *   - Replace `getCustomersFromPetclinic()` with `mockapi.getCustomers()`
 *   - Replace `enrichCustomers()` with API-provided enriched data
 *   - Update `CustomersHubTable` to use `Customer` type
 *
 * - [ ] Customer Detail (`src/app/customers/[id]/page.tsx`)
 *   - Replace `getCustomerDetail()` with `mockapi.getCustomerById()`
 *   - Add `mockapi.getInteractionsByCustomer()` for timeline
 *   - Add `mockapi.getDocumentsByCustomer()` for documents
 *
 * - [ ] Segmentation (`src/app/segmentation/page.tsx`)
 *   - Replace frontend segmentation with `mockapi.getFrameworks()`
 *   - Use `mockapi.getCustomersByFramework()` for segment members
 */

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
  // Common types
  ISODateString,
  CurrencyCode,
  TrendDirection,
  Sentiment,

  // Customer types
  CustomerType,
  CustomerTier,
  LifecycleStage,
  RiskFlag,
  CustomerContact,
  Customer,

  // Framework types
  FrameworkType,
  BusinessDimension,
  FrameworkCriteria,
  Framework,

  // Interaction types
  InteractionType,
  InteractionChannel,
  Interaction,

  // Document types
  DocumentType,
  DocumentStatus,
  Document,

  // Template types
  TemplateCategory,
  Template,

  // Metrics types
  SegmentMetric,
  MetricsSummary,

  // API response types
  PaginatedResponse,
  ApiError,

  // Query parameter types
  ListQueryParams,
  CustomerQueryParams,
  InteractionQueryParams,
  DocumentQueryParams,
} from "./types";

// =============================================================================
// CLIENT EXPORTS
// =============================================================================

export {
  // Default export
  mockapi,
  default as mockapiClient,

  // Individual functions
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getFrameworks,
  getFrameworkById,
  getCustomersByFramework,
  getInteractions,
  getInteractionsByCustomer,
  getInteractionById,
  createInteraction,
  getDocuments,
  getDocumentsByCustomer,
  getDocumentById,
  createDocument,
  updateDocument,
  getTemplates,
  getTemplateById,
  getOverviewMetrics,

  // Error class
  MockApiError,
} from "./mockapi";

// =============================================================================
// MAPPER EXPORTS
// =============================================================================

export {
  // Formatting utilities
  formatCurrency,
  formatCurrencyCompact,
  formatPercent,

  // Health utilities
  getHealthStatus,
  getHealthColor,
  getHealthBgColor,
  type HealthStatus,

  // Lifecycle utilities
  getLifecycleLabel,
  getLifecycleColor,

  // Tier utilities
  getTierLabel,
  getTierColor,

  // Trend utilities
  getTrendIcon,
  getTrendColor,

  // View model mappers
  mapCustomerToListItem,
  mapMetricsToOverview,
  mapFrameworkToViewModel,
  type CustomerListItem,
  type OverviewMetricsViewModel,
  type FrameworkViewModel,
} from "./mappers";

// =============================================================================
// SERVICE EXPORTS
// =============================================================================

export {
  // Overview service
  getOverviewDashboardData,
  getMockOverviewData,
  isApiConfigured,
  type OverviewDashboardData,
  type OverviewKpisViewModel,
  type HealthDistributionViewModel,
  type AtRiskAccountViewModel,
} from "./overview-service";
