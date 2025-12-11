#!/usr/bin/env npx ts-node

/**
 * Seed Data Validation Script
 *
 * Validates the JSON seed files against the TypeScript domain types.
 * This script performs structural validation without making network calls.
 *
 * Usage:
 *   npx ts-node tools/validate-seeds.ts
 *
 * Or with tsx (faster):
 *   npx tsx tools/validate-seeds.ts
 */

import * as fs from "fs";
import * as path from "path";

// =============================================================================
// TYPE DEFINITIONS (subset for validation)
// =============================================================================

type CustomerType =
  | "trial"
  | "paying"
  | "enterprise"
  | "strategic"
  | "partner"
  | "churned";

type CustomerTier = "smb" | "mid-market" | "enterprise" | "strategic";

type LifecycleStage =
  | "prospect"
  | "trial"
  | "onboarding"
  | "active"
  | "expanding"
  | "at-risk"
  | "churned";

type TrendDirection = "up" | "down" | "flat";

type RiskFlag =
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

type FrameworkType = "segment" | "framework" | "playbook" | "scorecard";

type BusinessDimension =
  | "churn-risk"
  | "growth"
  | "adoption"
  | "expansion"
  | "onboarding"
  | "renewal"
  | "health"
  | "engagement";

type InteractionType =
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

type InteractionChannel =
  | "email"
  | "phone"
  | "video"
  | "in-person"
  | "chat"
  | "support-portal"
  | "slack"
  | "other";

type Sentiment = "positive" | "neutral" | "negative";

type DocumentType =
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

type DocumentStatus =
  | "draft"
  | "in-review"
  | "approved"
  | "shared"
  | "signed"
  | "archived"
  | "superseded";

type TemplateCategory =
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

type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

interface ValidationError {
  file: string;
  index: number;
  field: string;
  message: string;
  value?: unknown;
}

const errors: ValidationError[] = [];

function addError(
  file: string,
  index: number,
  field: string,
  message: string,
  value?: unknown
): void {
  errors.push({ file, index, field, message, value });
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOneOf<T extends string>(value: unknown, options: T[]): value is T {
  return isString(value) && options.includes(value as T);
}

function validateRequired(
  file: string,
  index: number,
  obj: Record<string, unknown>,
  field: string,
  validator: (v: unknown) => boolean,
  typeName: string
): boolean {
  if (!(field in obj)) {
    addError(file, index, field, `Missing required field`);
    return false;
  }
  if (!validator(obj[field])) {
    addError(file, index, field, `Expected ${typeName}`, obj[field]);
    return false;
  }
  return true;
}

function validateOptional(
  file: string,
  index: number,
  obj: Record<string, unknown>,
  field: string,
  validator: (v: unknown) => boolean,
  typeName: string
): boolean {
  if (field in obj && obj[field] !== undefined && obj[field] !== null) {
    if (!validator(obj[field])) {
      addError(file, index, field, `Expected ${typeName}`, obj[field]);
      return false;
    }
  }
  return true;
}

function validateEnum<T extends string>(
  file: string,
  index: number,
  obj: Record<string, unknown>,
  field: string,
  options: T[],
  required: boolean = true
): boolean {
  if (required) {
    if (!(field in obj)) {
      addError(file, index, field, `Missing required field`);
      return false;
    }
  } else if (!(field in obj) || obj[field] === undefined) {
    return true;
  }

  if (!isOneOf(obj[field], options)) {
    addError(
      file,
      index,
      field,
      `Expected one of: ${options.join(", ")}`,
      obj[field]
    );
    return false;
  }
  return true;
}

// =============================================================================
// ENTITY VALIDATORS
// =============================================================================

function validateCustomer(
  obj: unknown,
  index: number,
  customerIds: Set<string>
): void {
  const file = "customers.json";
  if (!isObject(obj)) {
    addError(file, index, "", "Expected object");
    return;
  }

  validateRequired(file, index, obj, "id", isString, "string");
  validateRequired(file, index, obj, "name", isString, "string");
  validateRequired(file, index, obj, "companyName", isString, "string");
  validateEnum(file, index, obj, "customerType", [
    "trial",
    "paying",
    "enterprise",
    "strategic",
    "partner",
    "churned",
  ] as CustomerType[]);
  validateEnum(file, index, obj, "tier", [
    "smb",
    "mid-market",
    "enterprise",
    "strategic",
  ] as CustomerTier[]);
  validateRequired(file, index, obj, "mrr", isNumber, "number");
  validateRequired(file, index, obj, "arr", isNumber, "number");
  validateEnum(file, index, obj, "currency", [
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "AUD",
  ] as CurrencyCode[]);
  validateEnum(file, index, obj, "lifecycleStage", [
    "prospect",
    "trial",
    "onboarding",
    "active",
    "expanding",
    "at-risk",
    "churned",
  ] as LifecycleStage[]);
  validateRequired(file, index, obj, "healthScore", isNumber, "number");
  validateEnum(file, index, obj, "healthTrend", [
    "up",
    "down",
    "flat",
  ] as TrendDirection[]);
  validateRequired(file, index, obj, "csmId", isString, "string");
  validateRequired(file, index, obj, "csmName", isString, "string");
  validateRequired(file, index, obj, "keyContacts", isArray, "array");
  validateRequired(file, index, obj, "riskFlags", isArray, "array");
  validateRequired(file, index, obj, "createdAt", isString, "ISO date string");
  validateRequired(file, index, obj, "updatedAt", isString, "ISO date string");

  // Validate risk flags
  if (isArray(obj.riskFlags)) {
    const validFlags: RiskFlag[] = [
      "low-adoption",
      "billing-issue",
      "champion-left",
      "support-escalation",
      "contract-dispute",
      "competitor-threat",
      "budget-cut",
      "no-engagement",
      "delayed-renewal",
      "negative-nps",
    ];
    obj.riskFlags.forEach((flag, i) => {
      if (!isOneOf(flag, validFlags)) {
        addError(file, index, `riskFlags[${i}]`, "Invalid risk flag", flag);
      }
    });
  }

  // Track customer ID
  if (isString(obj.id)) {
    customerIds.add(obj.id);
  }

  // Validate health score range
  if (isNumber(obj.healthScore)) {
    if (obj.healthScore < 0 || obj.healthScore > 100) {
      addError(
        file,
        index,
        "healthScore",
        "Must be between 0 and 100",
        obj.healthScore
      );
    }
  }
}

function validateFramework(obj: unknown, index: number): void {
  const file = "frameworks.json";
  if (!isObject(obj)) {
    addError(file, index, "", "Expected object");
    return;
  }

  validateRequired(file, index, obj, "id", isString, "string");
  validateRequired(file, index, obj, "name", isString, "string");
  validateRequired(file, index, obj, "description", isString, "string");
  validateEnum(file, index, obj, "type", [
    "segment",
    "framework",
    "playbook",
    "scorecard",
  ] as FrameworkType[]);
  validateRequired(file, index, obj, "criteria", isObject, "object");
  validateEnum(file, index, obj, "businessDimension", [
    "churn-risk",
    "growth",
    "adoption",
    "expansion",
    "onboarding",
    "renewal",
    "health",
    "engagement",
  ] as BusinessDimension[]);
  validateRequired(file, index, obj, "color", isString, "string");
  validateRequired(file, index, obj, "isDefault", isBoolean, "boolean");
  validateRequired(file, index, obj, "isRecommended", isBoolean, "boolean");
  validateRequired(file, index, obj, "createdAt", isString, "ISO date string");
  validateRequired(file, index, obj, "updatedAt", isString, "ISO date string");
}

function validateInteraction(
  obj: unknown,
  index: number,
  customerIds: Set<string>
): void {
  const file = "interactions.json";
  if (!isObject(obj)) {
    addError(file, index, "", "Expected object");
    return;
  }

  validateRequired(file, index, obj, "id", isString, "string");
  validateRequired(file, index, obj, "customerId", isString, "string");
  validateEnum(file, index, obj, "type", [
    "email",
    "call",
    "meeting",
    "qbr",
    "ebr",
    "onboarding-call",
    "training",
    "support-ticket",
    "implementation",
    "renewal-discussion",
    "escalation",
    "executive-briefing",
    "product-feedback",
    "note",
  ] as InteractionType[]);
  validateEnum(file, index, obj, "channel", [
    "email",
    "phone",
    "video",
    "in-person",
    "chat",
    "support-portal",
    "slack",
    "other",
  ] as InteractionChannel[]);
  validateRequired(file, index, obj, "date", isString, "ISO date string");
  validateRequired(file, index, obj, "summary", isString, "string");
  validateRequired(file, index, obj, "ownerId", isString, "string");
  validateRequired(file, index, obj, "ownerName", isString, "string");
  validateRequired(file, index, obj, "createdAt", isString, "ISO date string");
  validateRequired(file, index, obj, "updatedAt", isString, "ISO date string");

  validateEnum(
    file,
    index,
    obj,
    "sentiment",
    ["positive", "neutral", "negative"] as Sentiment[],
    false
  );

  // Validate customer reference
  if (isString(obj.customerId) && !customerIds.has(obj.customerId)) {
    addError(
      file,
      index,
      "customerId",
      "References non-existent customer",
      obj.customerId
    );
  }
}

function validateDocument(
  obj: unknown,
  index: number,
  customerIds: Set<string>
): void {
  const file = "documents.json";
  if (!isObject(obj)) {
    addError(file, index, "", "Expected object");
    return;
  }

  validateRequired(file, index, obj, "id", isString, "string");
  validateRequired(file, index, obj, "customerId", isString, "string");
  validateRequired(file, index, obj, "title", isString, "string");
  validateEnum(file, index, obj, "documentType", [
    "success-plan",
    "qbr-deck",
    "ebr-deck",
    "onboarding-plan",
    "implementation-plan",
    "internal-brief",
    "playbook",
    "health-report",
    "renewal-proposal",
    "expansion-proposal",
    "executive-summary",
    "meeting-notes",
    "other",
  ] as DocumentType[]);
  validateEnum(file, index, obj, "status", [
    "draft",
    "in-review",
    "approved",
    "shared",
    "signed",
    "archived",
    "superseded",
  ] as DocumentStatus[]);
  validateRequired(file, index, obj, "ownerId", isString, "string");
  validateRequired(file, index, obj, "ownerName", isString, "string");
  validateRequired(file, index, obj, "createdAt", isString, "ISO date string");
  validateRequired(file, index, obj, "updatedAt", isString, "ISO date string");

  // Validate customer reference
  if (isString(obj.customerId) && !customerIds.has(obj.customerId)) {
    addError(
      file,
      index,
      "customerId",
      "References non-existent customer",
      obj.customerId
    );
  }
}

function validateTemplate(obj: unknown, index: number): void {
  const file = "templates.json";
  if (!isObject(obj)) {
    addError(file, index, "", "Expected object");
    return;
  }

  validateRequired(file, index, obj, "id", isString, "string");
  validateRequired(file, index, obj, "name", isString, "string");
  validateEnum(file, index, obj, "templateType", [
    "success-plan",
    "qbr-deck",
    "ebr-deck",
    "onboarding-plan",
    "implementation-plan",
    "internal-brief",
    "playbook",
    "health-report",
    "renewal-proposal",
    "expansion-proposal",
    "executive-summary",
    "meeting-notes",
    "other",
  ] as DocumentType[]);
  validateRequired(file, index, obj, "description", isString, "string");
  validateEnum(file, index, obj, "category", [
    "qbr",
    "ebr",
    "onboarding",
    "implementation",
    "renewal",
    "expansion",
    "health-review",
    "executive-briefing",
    "playbook",
    "general",
  ] as TemplateCategory[]);
  validateRequired(file, index, obj, "usageCount", isNumber, "number");
  validateRequired(file, index, obj, "isSystemTemplate", isBoolean, "boolean");
  validateRequired(file, index, obj, "isRecommended", isBoolean, "boolean");
  validateRequired(file, index, obj, "createdById", isString, "string");
  validateRequired(file, index, obj, "createdAt", isString, "ISO date string");
  validateRequired(file, index, obj, "updatedAt", isString, "ISO date string");
}

function validateMetrics(obj: unknown, index: number): void {
  const file = "metrics.json";
  if (!isObject(obj)) {
    addError(file, index, "", "Expected object");
    return;
  }

  validateRequired(file, index, obj, "totalCustomers", isNumber, "number");
  validateRequired(file, index, obj, "totalMrr", isNumber, "number");
  validateRequired(file, index, obj, "totalArr", isNumber, "number");
  validateEnum(file, index, obj, "currency", [
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "AUD",
  ] as CurrencyCode[]);
  validateRequired(file, index, obj, "churnRate", isNumber, "number");
  validateEnum(file, index, obj, "churnTrend", [
    "up",
    "down",
    "flat",
  ] as TrendDirection[]);
  validateRequired(file, index, obj, "atRiskCount", isNumber, "number");
  validateRequired(file, index, obj, "vipCount", isNumber, "number");
  validateRequired(file, index, obj, "avgHealthScore", isNumber, "number");
  validateEnum(file, index, obj, "healthTrend", [
    "up",
    "down",
    "flat",
  ] as TrendDirection[]);
  validateRequired(file, index, obj, "netRevenueRetention", isNumber, "number");
  validateRequired(
    file,
    index,
    obj,
    "grossRevenueRetention",
    isNumber,
    "number"
  );
  validateRequired(file, index, obj, "segmentBreakdown", isArray, "array");
  validateRequired(file, index, obj, "tierBreakdown", isArray, "array");
  validateRequired(file, index, obj, "lifecycleBreakdown", isArray, "array");
  validateRequired(
    file,
    index,
    obj,
    "lastUpdatedAt",
    isString,
    "ISO date string"
  );
}

// =============================================================================
// MAIN
// =============================================================================

function loadJson(filename: string): unknown[] {
  const filepath = path.join(__dirname, "mockapi-seeds", filename);
  try {
    const content = fs.readFileSync(filepath, "utf-8");
    const data = JSON.parse(content);
    if (!isArray(data)) {
      console.error(`❌ ${filename}: Expected array at root`);
      process.exit(1);
    }
    return data;
  } catch (err) {
    console.error(`❌ Failed to load ${filename}:`, err);
    process.exit(1);
  }
}

function main(): void {
  console.log("🔍 Validating seed data...\n");

  const customerIds = new Set<string>();

  // Load and validate customers first (to collect IDs)
  console.log("📋 Validating customers.json...");
  const customers = loadJson("customers.json");
  customers.forEach((c, i) => validateCustomer(c, i, customerIds));
  console.log(`   Found ${customers.length} customers`);

  // Validate frameworks
  console.log("📋 Validating frameworks.json...");
  const frameworks = loadJson("frameworks.json");
  frameworks.forEach((f, i) => validateFramework(f, i));
  console.log(`   Found ${frameworks.length} frameworks`);

  // Validate interactions (with customer reference check)
  console.log("📋 Validating interactions.json...");
  const interactions = loadJson("interactions.json");
  interactions.forEach((int, i) => validateInteraction(int, i, customerIds));
  console.log(`   Found ${interactions.length} interactions`);

  // Validate documents (with customer reference check)
  console.log("📋 Validating documents.json...");
  const documents = loadJson("documents.json");
  documents.forEach((d, i) => validateDocument(d, i, customerIds));
  console.log(`   Found ${documents.length} documents`);

  // Validate templates
  console.log("📋 Validating templates.json...");
  const templates = loadJson("templates.json");
  templates.forEach((t, i) => validateTemplate(t, i));
  console.log(`   Found ${templates.length} templates`);

  // Validate metrics
  console.log("📋 Validating metrics.json...");
  const metrics = loadJson("metrics.json");
  metrics.forEach((m, i) => validateMetrics(m, i));
  console.log(`   Found ${metrics.length} metrics records`);

  // Report results
  console.log("\n" + "=".repeat(60));

  if (errors.length === 0) {
    console.log("✅ All seed data is valid!\n");
    console.log("Summary:");
    console.log(`  - Customers:    ${customers.length}`);
    console.log(`  - Frameworks:   ${frameworks.length}`);
    console.log(`  - Interactions: ${interactions.length}`);
    console.log(`  - Documents:    ${documents.length}`);
    console.log(`  - Templates:    ${templates.length}`);
    console.log(`  - Metrics:      ${metrics.length}`);
    process.exit(0);
  } else {
    console.log(`❌ Found ${errors.length} validation error(s):\n`);
    errors.forEach((err, i) => {
      console.log(`${i + 1}. ${err.file} [${err.index}].${err.field}`);
      console.log(`   ${err.message}`);
      if (err.value !== undefined) {
        console.log(`   Value: ${JSON.stringify(err.value)}`);
      }
      console.log();
    });
    process.exit(1);
  }
}

main();
