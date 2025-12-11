/**
 * SuccessBoard API Domain Types
 *
 * Type definitions for the mockapi.io backend.
 * These types represent a realistic B2B Customer Success domain model.
 *
 * @module api/types
 */

// =============================================================================
// COMMON TYPES
// =============================================================================

/**
 * ISO 8601 date string (e.g., "2024-01-15T10:30:00Z")
 */
export type ISODateString = string;

/**
 * Currency codes (ISO 4217)
 */
export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

/**
 * Trend direction for metrics
 */
export type TrendDirection = "up" | "down" | "flat";

/**
 * Sentiment analysis result
 */
export type Sentiment = "positive" | "neutral" | "negative";

// =============================================================================
// CUSTOMER TYPES
// =============================================================================

/**
 * Customer type classification
 *
 * - trial: Evaluating the product
 * - paying: Active paying customer
 * - enterprise: Large enterprise account
 * - strategic: High-touch strategic account
 * - partner: Partner or reseller account
 * - churned: Former customer
 */
export type CustomerType =
  | "trial"
  | "paying"
  | "enterprise"
  | "strategic"
  | "partner"
  | "churned";

/**
 * Customer tier/segment based on revenue and strategic value
 *
 * - smb: Small/Medium Business ($0-$5k MRR)
 * - mid-market: Mid-Market ($5k-$25k MRR)
 * - enterprise: Enterprise ($25k-$100k MRR)
 * - strategic: Strategic Accounts ($100k+ MRR)
 */
export type CustomerTier = "smb" | "mid-market" | "enterprise" | "strategic";

/**
 * Customer lifecycle stage
 *
 * - prospect: Pre-sale, evaluating
 * - trial: Active trial period
 * - onboarding: Recently signed, in implementation
 * - active: Healthy, engaged customer
 * - expanding: Growth opportunity identified
 * - at-risk: Churn risk detected
 * - churned: No longer a customer
 */
export type LifecycleStage =
  | "prospect"
  | "trial"
  | "onboarding"
  | "active"
  | "expanding"
  | "at-risk"
  | "churned";

/**
 * Risk flags that can be applied to a customer
 */
export type RiskFlag =
  | "low-adoption"
  | "billing-issue"
  | "champion-left"
  | "support-escalation"
  | "contract-dispute"
  | "competitor-threat"
  | "budget-cut"
  | "no-engagement"
  | "delayed-renewal"
  | "negative-nps";

/**
 * Key contact at a customer organization
 */
export interface CustomerContact {
  /** Contact's full name */
  name: string;
  /** Role/title at the company */
  role: string;
  /** Email address */
  email: string;
  /** Phone number (optional) */
  phone?: string;
  /** Whether this is the primary contact */
  isPrimary?: boolean;
  /** Whether this person is an executive sponsor */
  isExecutiveSponsor?: boolean;
  /** Whether this person is a product champion */
  isChampion?: boolean;
}

/**
 * Customer entity
 *
 * Represents a B2B customer account in the Customer Success platform.
 * This is the central entity that most other entities relate to.
 *
 * @example
 * ```json
 * {
 *   "id": "cust_abc123",
 *   "name": "Acme Corporation",
 *   "companyName": "Acme Corp",
 *   "customerType": "enterprise",
 *   "tier": "enterprise",
 *   "mrr": 25000,
 *   "arr": 300000,
 *   "currency": "USD",
 *   "lifecycleStage": "active",
 *   "healthScore": 78,
 *   "healthTrend": "up"
 * }
 * ```
 */
export interface Customer {
  /** Unique identifier */
  id: string;

  /** Display name for the customer */
  name: string;

  /** Legal company name */
  companyName: string;

  /** Customer classification type */
  customerType: CustomerType;

  /** Revenue-based tier/segment */
  tier: CustomerTier;

  /**
   * Monthly Recurring Revenue in cents
   * @example 2500000 = $25,000.00
   */
  mrr: number;

  /**
   * Annual Recurring Revenue in cents
   * @example 30000000 = $300,000.00
   */
  arr: number;

  /** Currency for revenue figures */
  currency: CurrencyCode;

  /** Current lifecycle stage */
  lifecycleStage: LifecycleStage;

  /**
   * Health score (0-100)
   * - 0-39: Critical/At-Risk
   * - 40-69: Needs Attention
   * - 70-84: Healthy
   * - 85-100: Thriving
   */
  healthScore: number;

  /** Health score trend direction */
  healthTrend: TrendDirection;

  /**
   * ID of the primary CS framework used with this account
   * @see Framework
   */
  primaryFrameworkId?: string;

  /** ID of the assigned Customer Success Manager */
  csmId: string;

  /** Name of the assigned CSM (denormalized for display) */
  csmName: string;

  /** Key contacts at the customer organization */
  keyContacts: CustomerContact[];

  /** Timestamp of the last recorded interaction */
  lastInteractionAt?: ISODateString;

  /** Due date for the next scheduled action */
  nextActionDueAt?: ISODateString;

  /** Description of the next action */
  nextActionDescription?: string;

  /** Active risk flags for this customer */
  riskFlags: RiskFlag[];

  /** Industry vertical */
  industry?: string;

  /** Company website */
  website?: string;

  /** Number of employees (for firmographics) */
  employeeCount?: number;

  /** Customer's logo URL */
  logoUrl?: string;

  /** Contract renewal date */
  renewalDate?: ISODateString;

  /** Days until renewal (computed, may be negative if overdue) */
  daysUntilRenewal?: number;

  /** Net Promoter Score (-100 to 100) */
  npsScore?: number;

  /** Record creation timestamp */
  createdAt: ISODateString;

  /** Last update timestamp */
  updatedAt: ISODateString;
}

// =============================================================================
// FRAMEWORK TYPES
// =============================================================================

/**
 * Framework type classification
 *
 * - segment: Customer grouping/segment definition
 * - framework: CS methodology or success framework
 * - playbook: Tactical playbook for specific scenarios
 * - scorecard: Health scoring methodology
 */
export type FrameworkType = "segment" | "framework" | "playbook" | "scorecard";

/**
 * Business dimension the framework addresses
 */
export type BusinessDimension =
  | "churn-risk"
  | "growth"
  | "adoption"
  | "expansion"
  | "onboarding"
  | "renewal"
  | "health"
  | "engagement";

/**
 * Criteria for framework/segment membership
 * This is a flexible structure that can represent various filter conditions
 */
export interface FrameworkCriteria {
  /** Health score range */
  healthScoreRange?: { min: number; max: number };
  /** MRR range in cents */
  mrrRange?: { min: number; max: number };
  /** Included lifecycle stages */
  lifecycleStages?: LifecycleStage[];
  /** Included customer tiers */
  tiers?: CustomerTier[];
  /** Required risk flags (any match) */
  riskFlags?: RiskFlag[];
  /** Days since last interaction threshold */
  daysSinceInteraction?: number;
  /** Days until renewal threshold */
  daysUntilRenewal?: number;
  /** Custom filter expression (for advanced use) */
  customExpression?: string;
}

/**
 * Framework/Segment entity
 *
 * Represents CS frameworks, customer segments, playbooks, or scoring methodologies.
 * Used to organize customers and guide CS activities.
 *
 * @example
 * ```json
 * {
 *   "id": "fw_atrisk",
 *   "name": "At-Risk Accounts",
 *   "type": "segment",
 *   "businessDimension": "churn-risk",
 *   "criteria": {
 *     "healthScoreRange": { "min": 0, "max": 49 }
 *   }
 * }
 * ```
 */
export interface Framework {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Detailed description */
  description: string;

  /** Type of framework */
  type: FrameworkType;

  /** Criteria for customer membership/applicability */
  criteria: FrameworkCriteria;

  /** Primary business dimension addressed */
  businessDimension: BusinessDimension;

  /** Display color (hex or named color) */
  color: string;

  /** Badge/label style for UI */
  badgeStyle?: "solid" | "outline" | "subtle";

  /** Whether this is a system default */
  isDefault: boolean;

  /** Whether this is recommended for new users */
  isRecommended: boolean;

  /** Number of customers currently matching this framework */
  customerCount?: number;

  /** Sort order for display */
  sortOrder?: number;

  /** Record creation timestamp */
  createdAt: ISODateString;

  /** Last update timestamp */
  updatedAt: ISODateString;
}

// =============================================================================
// INTERACTION TYPES
// =============================================================================

/**
 * Interaction type classification
 */
export type InteractionType =
  | "email"
  | "call"
  | "meeting"
  | "qbr"
  | "ebr"
  | "onboarding-call"
  | "training"
  | "support-ticket"
  | "implementation"
  | "renewal-discussion"
  | "escalation"
  | "executive-briefing"
  | "product-feedback"
  | "note";

/**
 * Communication channel
 */
export type InteractionChannel =
  | "email"
  | "phone"
  | "video"
  | "in-person"
  | "chat"
  | "support-portal"
  | "slack"
  | "other";

/**
 * Interaction entity
 *
 * Represents a touchpoint or interaction with a customer.
 * Used to track engagement history and inform health scoring.
 *
 * @example
 * ```json
 * {
 *   "id": "int_xyz789",
 *   "customerId": "cust_abc123",
 *   "type": "qbr",
 *   "channel": "video",
 *   "date": "2024-01-15T14:00:00Z",
 *   "summary": "Q4 2023 QBR - discussed expansion opportunities"
 * }
 * ```
 */
export interface Interaction {
  /** Unique identifier */
  id: string;

  /**
   * ID of the related customer
   * @see Customer
   */
  customerId: string;

  /** Type of interaction */
  type: InteractionType;

  /** Communication channel used */
  channel: InteractionChannel;

  /** Date and time of the interaction */
  date: ISODateString;

  /** Brief summary of the interaction */
  summary: string;

  /** Detailed notes (optional) */
  notes?: string;

  /** Sentiment analysis result (optional) */
  sentiment?: Sentiment;

  /** Duration in minutes (for calls/meetings) */
  durationMinutes?: number;

  /** ID of the team member who conducted the interaction */
  ownerId: string;

  /** Name of the owner (denormalized for display) */
  ownerName: string;

  /** Attendees from the customer side */
  customerAttendees?: string[];

  /** Follow-up action items */
  actionItems?: string[];

  /** Whether follow-up is required */
  requiresFollowUp?: boolean;

  /** Related document IDs */
  relatedDocumentIds?: string[];

  /** Record creation timestamp */
  createdAt: ISODateString;

  /** Last update timestamp */
  updatedAt: ISODateString;
}

// =============================================================================
// DOCUMENT TYPES
// =============================================================================

/**
 * Document type classification
 */
export type DocumentType =
  | "success-plan"
  | "qbr-deck"
  | "ebr-deck"
  | "onboarding-plan"
  | "implementation-plan"
  | "internal-brief"
  | "playbook"
  | "health-report"
  | "renewal-proposal"
  | "expansion-proposal"
  | "executive-summary"
  | "meeting-notes"
  | "other";

/**
 * Document status
 */
export type DocumentStatus =
  | "draft"
  | "in-review"
  | "approved"
  | "shared"
  | "signed"
  | "archived"
  | "superseded";

/**
 * Document entity
 *
 * Represents CS artifacts and documents associated with customers.
 * Includes success plans, QBR decks, implementation plans, etc.
 *
 * @example
 * ```json
 * {
 *   "id": "doc_def456",
 *   "customerId": "cust_abc123",
 *   "title": "Q1 2024 QBR Deck",
 *   "documentType": "qbr-deck",
 *   "status": "shared"
 * }
 * ```
 */
export interface Document {
  /** Unique identifier */
  id: string;

  /**
   * ID of the related customer
   * @see Customer
   */
  customerId: string;

  /** Document title */
  title: string;

  /** Type of document */
  documentType: DocumentType;

  /**
   * ID of the framework this document follows (optional)
   * @see Framework
   */
  frameworkId?: string;

  /** Current status */
  status: DocumentStatus;

  /** Document description or summary */
  description?: string;

  /** URL to the document (external storage) */
  documentUrl?: string;

  /** File size in bytes */
  fileSizeBytes?: number;

  /** MIME type */
  mimeType?: string;

  /** Version number */
  version?: number;

  /** ID of the document owner */
  ownerId: string;

  /** Name of the owner (denormalized for display) */
  ownerName: string;

  /** IDs of collaborators */
  collaboratorIds?: string[];

  /** Tags for categorization */
  tags?: string[];

  /** Date the document was shared with customer */
  sharedAt?: ISODateString;

  /** Date the document was signed/approved by customer */
  signedAt?: ISODateString;

  /** Record creation timestamp */
  createdAt: ISODateString;

  /** Last update timestamp */
  updatedAt: ISODateString;
}

// =============================================================================
// TEMPLATE TYPES
// =============================================================================

/**
 * Template category
 */
export type TemplateCategory =
  | "qbr"
  | "ebr"
  | "onboarding"
  | "implementation"
  | "renewal"
  | "expansion"
  | "health-review"
  | "executive-briefing"
  | "playbook"
  | "general";

/**
 * Template entity
 *
 * Represents reusable blueprints for CS documents.
 * Used to standardize and accelerate document creation.
 *
 * @example
 * ```json
 * {
 *   "id": "tpl_qbr001",
 *   "name": "Standard QBR Template",
 *   "templateType": "qbr-deck",
 *   "category": "qbr",
 *   "usageCount": 47
 * }
 * ```
 */
export interface Template {
  /** Unique identifier */
  id: string;

  /** Template name */
  name: string;

  /** Type of document this template creates */
  templateType: DocumentType;

  /** Detailed description */
  description: string;

  /** Category for organization */
  category: TemplateCategory;

  /**
   * Default framework to apply when using this template
   * @see Framework
   */
  defaultFrameworkId?: string;

  /** Number of times this template has been used */
  usageCount: number;

  /** Last time this template was used */
  lastUsedAt?: ISODateString;

  /** URL to the template file */
  templateUrl?: string;

  /** Preview image URL */
  previewImageUrl?: string;

  /** Whether this is a system-provided template */
  isSystemTemplate: boolean;

  /** Whether this template is recommended */
  isRecommended: boolean;

  /** Tags for categorization */
  tags?: string[];

  /** ID of the template creator */
  createdById: string;

  /** Record creation timestamp */
  createdAt: ISODateString;

  /** Last update timestamp */
  updatedAt: ISODateString;
}

// =============================================================================
// METRICS / SUMMARY TYPES
// =============================================================================

/**
 * Segment metric summary
 */
export interface SegmentMetric {
  /** Segment identifier */
  segmentId: string;
  /** Segment name */
  segmentName: string;
  /** Number of customers in segment */
  customerCount: number;
  /** Percentage of total customers */
  percentage: number;
  /** Total MRR for segment (in cents) */
  totalMrr: number;
  /** Average health score for segment */
  avgHealthScore: number;
}

/**
 * Metrics summary entity
 *
 * Pre-aggregated metrics for dashboard display.
 * Updated periodically by the backend.
 *
 * @example
 * ```json
 * {
 *   "totalCustomers": 150,
 *   "totalMrr": 125000000,
 *   "churnRate": 0.035,
 *   "avgHealthScore": 72
 * }
 * ```
 */
export interface MetricsSummary {
  /** Total number of active customers */
  totalCustomers: number;

  /** Total MRR across all customers (in cents) */
  totalMrr: number;

  /** Total ARR across all customers (in cents) */
  totalArr: number;

  /** Currency for revenue figures */
  currency: CurrencyCode;

  /**
   * Monthly churn rate (0-1)
   * @example 0.035 = 3.5%
   */
  churnRate: number;

  /** Churn rate trend */
  churnTrend: TrendDirection;

  /** Number of at-risk customers */
  atRiskCount: number;

  /** Number of VIP/strategic customers */
  vipCount: number;

  /** Number of customers in trial */
  trialCount: number;

  /** Number of customers in onboarding */
  onboardingCount: number;

  /**
   * Average health score across all customers (0-100)
   */
  avgHealthScore: number;

  /** Average health score trend */
  healthTrend: TrendDirection;

  /** Expansion pipeline MRR (in cents) */
  expansionPipelineMrr: number;

  /** Net Revenue Retention rate (0-2, where 1 = 100%) */
  netRevenueRetention: number;

  /** Gross Revenue Retention rate (0-1) */
  grossRevenueRetention: number;

  /** Average NPS score (-100 to 100) */
  avgNpsScore?: number;

  /** Breakdown by segment */
  segmentBreakdown: SegmentMetric[];

  /** Breakdown by tier */
  tierBreakdown: SegmentMetric[];

  /** Breakdown by lifecycle stage */
  lifecycleBreakdown: SegmentMetric[];

  /** Timestamp when metrics were last computed */
  lastUpdatedAt: ISODateString;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Paginated list response
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  data: T[];
  /** Total number of items (across all pages) */
  total: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Whether there are more pages */
  hasMore: boolean;
}

/**
 * API error response
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

// =============================================================================
// QUERY PARAMETER TYPES
// =============================================================================

/**
 * Common query parameters for list endpoints
 */
export interface ListQueryParams {
  /** Page number (1-indexed) */
  page?: number;
  /** Items per page */
  limit?: number;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: "asc" | "desc";
  /** Search query */
  search?: string;
}

/**
 * Customer-specific query parameters
 */
export interface CustomerQueryParams extends ListQueryParams {
  /** Filter by customer type */
  customerType?: CustomerType;
  /** Filter by tier */
  tier?: CustomerTier;
  /** Filter by lifecycle stage */
  lifecycleStage?: LifecycleStage;
  /** Filter by minimum health score */
  minHealthScore?: number;
  /** Filter by maximum health score */
  maxHealthScore?: number;
  /** Filter by CSM ID */
  csmId?: string;
  /** Filter by framework ID */
  frameworkId?: string;
  /** Filter by risk flag */
  riskFlag?: RiskFlag;
}

/**
 * Interaction-specific query parameters
 */
export interface InteractionQueryParams extends ListQueryParams {
  /** Filter by customer ID */
  customerId?: string;
  /** Filter by interaction type */
  type?: InteractionType;
  /** Filter by date range start */
  dateFrom?: ISODateString;
  /** Filter by date range end */
  dateTo?: ISODateString;
}

/**
 * Document-specific query parameters
 */
export interface DocumentQueryParams extends ListQueryParams {
  /** Filter by customer ID */
  customerId?: string;
  /** Filter by document type */
  documentType?: DocumentType;
  /** Filter by status */
  status?: DocumentStatus;
  /** Filter by framework ID */
  frameworkId?: string;
}
