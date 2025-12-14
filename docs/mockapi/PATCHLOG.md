# MockAPI Integration Patch Log

**Date**: 2025-12-14  
**Branch**: `feature/mockapi-data-audit`

---

## Changes Applied

### 1. Frontend: Handle Metrics Array Response

**File**: `src/modules/api/mockapi.ts`  
**Function**: `getOverviewMetrics()`

**Before**:

```typescript
export async function getOverviewMetrics(): Promise<MetricsSummary> {
  return fetchJson<MetricsSummary>("/metrics");
}
```

**After**:

```typescript
export async function getOverviewMetrics(): Promise<MetricsSummary> {
  const data = await fetchJson<MetricsSummary | MetricsSummary[]>("/metrics");
  // MockAPI returns an array; extract the first (snapshot) record
  if (Array.isArray(data)) {
    if (data.length === 0) {
      throw new MockApiError("No metrics data available", 404, "NO_DATA");
    }
    return data[0];
  }
  return data;
}
```

**Reason**: MockAPI returns metrics as an array `[{...}]` but the frontend type expects a single object `{...}`. This fix extracts the first record as the snapshot.

---

### 2. Frontend: Handle Object-Style Breakdowns

**File**: `src/modules/api/overview-service.ts`

**Added Helper Function**:

```typescript
function getBreakdownCount(
  breakdown: unknown,
  ...keys: string[]
): number | undefined {
  if (!breakdown) return undefined;

  // Handle array format (frontend expected)
  if (Array.isArray(breakdown)) {
    const found = breakdown.find(
      (s) =>
        keys.includes(s.segmentId) ||
        keys.some((k) => s.segmentName?.toLowerCase().includes(k.toLowerCase()))
    );
    return found?.customerCount;
  }

  // Handle object format (MockAPI actual)
  if (typeof breakdown === "object") {
    for (const key of keys) {
      const value = (breakdown as Record<string, unknown>)[key];
      if (typeof value === "number") return value;
    }
  }

  return undefined;
}
```

**Updated Functions**:

- `mapMetricsToKpis()` - Now uses `getBreakdownCount()` instead of `.find()`
- `mapMetricsToHealthDistribution()` - Now uses `getBreakdownCount()` instead of `.find()`

**Reason**: MockAPI returns breakdowns as objects like `{ "active": 22, "atRisk": 8 }` but the frontend type `SegmentMetric[]` expects an array. This adapter handles both formats gracefully.

---

## Phase 2 Data Fixes (APPLIED)

All data fixes have been applied to `_MockapiSnapshots/` files.

### 1. frameworks.json

| Field               | Before                                 | After                                    |
| ------------------- | -------------------------------------- | ---------------------------------------- |
| `color`             | `[0.12, 0.65, 0.88, 0.2]` (RGBA array) | `"#1FA6E0"` (hex string)                 |
| `type`              | `health`, `adoption`, `revenue`, etc.  | `scorecard`, `framework`, `playbook`     |
| `businessDimension` | `product-usage`, `finance`, etc.       | `health`, `adoption`, `churn-risk`, etc. |
| `criteria`          | `[]` (array)                           | `{}` (object)                            |
| `badgeStyle`        | `minimal`                              | `subtle`                                 |

### 2. templates.json

| Field                | Before                              | After                                             |
| -------------------- | ----------------------------------- | ------------------------------------------------- |
| `defaultFrameworkId` | `2` (number)                        | `"2"` (string)                                    |
| `createdById`        | `"system"`, `"user-12"`             | `"1"`, `"12"` (valid user IDs)                    |
| `templateType`       | `review`, `agenda`, `plan`, etc.    | `qbr-deck`, `meeting-notes`, `success-plan`, etc. |
| `category`           | `QBR`, `Onboarding`, `Success Plan` | `qbr`, `onboarding`, `general`, etc.              |

### 3. customers.json

| Field     | Before                     | After                               |
| --------- | -------------------------- | ----------------------------------- |
| `csmId`   | `"csm_1"`, `"csm_2"`, etc. | `"4"`, `"5"`, etc. (valid user IDs) |
| `csmName` | Various names              | Matches actual user names           |

**Distribution**: 25 customers distributed across 10 CS team members (users 4-13).

### 4. documents.json

| Field          | Before                                       | After                                                               |
| -------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| `frameworkId`  | `"11"`, `"12"`, `"13"`, `"14"`, `"15"`       | Remapped to `"1"`-`"10"`                                            |
| `documentType` | `qbr`, `renewal`, `escalation`, `onboarding` | `qbr-deck`, `renewal-proposal`, `internal-brief`, `onboarding-plan` |

**Remapping logic**: `(frameworkId - 1) % 10 + 1`

### 5. interactions.json

| Field         | Before                                 | After                    |
| ------------- | -------------------------------------- | ------------------------ |
| `frameworkId` | `"11"`, `"12"`, `"13"`, `"14"`, `"15"` | Remapped to `"1"`-`"10"` |
| `channel`     | `zoom`, `internal`                     | `video`, `other`         |

### 6. metrics.json (Recalculated)

| Field                | Before                         | After                                                      |
| -------------------- | ------------------------------ | ---------------------------------------------------------- |
| `totalCustomers`     | 52                             | 25                                                         |
| `totalMrr`           | 138,750                        | 556,300                                                    |
| `totalArr`           | 1,665,000                      | 6,675,600                                                  |
| `avgHealthScore`     | (unknown)                      | 70                                                         |
| `atRiskCount`        | (unknown)                      | 4                                                          |
| `vipCount`           | (unknown)                      | 5                                                          |
| `segmentBreakdown`   | `{ "active": 22 }` (object)    | `[{ segmentId, segmentName, customerCount, ... }]` (array) |
| `tierBreakdown`      | `{ "starter": 23 }` (object)   | `[{ segmentId, segmentName, customerCount, ... }]` (array) |
| `lifecycleBreakdown` | `{ "onboarding": 9 }` (object) | `[{ segmentId, segmentName, customerCount, ... }]` (array) |

---

## Environment Configuration

### .env.local Setup

```env
# Copy from .env.example and set:
NEXT_PUBLIC_MOCKAPI_BASE_URL=https://693bc967b762a4f15c3e47ed.mockapi.io/api
```

---

## Testing Checklist

- [ ] Start dev server with `npm run dev`
- [ ] Verify Overview page loads without errors
- [ ] Verify Customers Hub page loads without errors
- [ ] Check browser console for API errors
- [ ] Verify metrics display (may show incorrect totals until data is fixed)

---

## Rollback Instructions

If issues occur, revert the two changed files:

```bash
git checkout HEAD -- src/modules/api/mockapi.ts
git checkout HEAD -- src/modules/api/overview-service.ts
```
