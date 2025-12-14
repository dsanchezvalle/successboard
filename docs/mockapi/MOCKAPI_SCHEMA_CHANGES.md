# MockAPI Schema Alignment Requirements

**Date**: 2025-12-14  
**Purpose**: List of changes required in MockAPI to match the corrected snapshots

---

## Overview

The `_MockapiSnapshots/` folder now contains normalized, validated data that passes all audits. To align MockAPI with these snapshots, the following schema changes must be applied manually in the MockAPI dashboard.

---

## 1. Frameworks Resource (`/frameworks`)

### Field Type Changes

| Field      | Current Type | Required Type      |
| ---------- | ------------ | ------------------ |
| `color`    | Array (RGBA) | String (hex color) |
| `criteria` | Array        | Object             |

### Enum Constraints

| Field               | Valid Values                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `type`              | `segment`, `framework`, `playbook`, `scorecard`                                                  |
| `businessDimension` | `churn-risk`, `growth`, `adoption`, `expansion`, `onboarding`, `renewal`, `health`, `engagement` |
| `badgeStyle`        | `solid`, `outline`, `subtle`                                                                     |

---

## 2. Templates Resource (`/templates`)

### Field Type Changes

| Field                | Current Type               | Required Type          |
| -------------------- | -------------------------- | ---------------------- |
| `defaultFrameworkId` | Number                     | String                 |
| `createdById`        | Mixed (`system`, `user-N`) | String (valid user ID) |

### Enum Constraints

| Field          | Valid Values                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `templateType` | `success-plan`, `qbr-deck`, `ebr-deck`, `onboarding-plan`, `implementation-plan`, `internal-brief`, `playbook`, `health-report`, `renewal-proposal`, `expansion-proposal`, `executive-summary`, `meeting-notes`, `other` |
| `category`     | `qbr`, `ebr`, `onboarding`, `implementation`, `renewal`, `expansion`, `health-review`, `executive-briefing`, `playbook`, `general`                                                                                       |

---

## 3. Customers Resource (`/customers`)

### Field Format Changes

| Field   | Current Format | Required Format                    |
| ------- | -------------- | ---------------------------------- |
| `csmId` | `csm_N`        | Valid user ID (e.g., `"4"`, `"5"`) |

### Enum Constraints

| Field            | Valid Values                                                                   |
| ---------------- | ------------------------------------------------------------------------------ |
| `customerType`   | `trial`, `paying`, `enterprise`, `strategic`, `partner`, `churned`             |
| `tier`           | `smb`, `mid-market`, `enterprise`, `strategic`                                 |
| `lifecycleStage` | `prospect`, `trial`, `onboarding`, `active`, `expanding`, `at-risk`, `churned` |
| `healthTrend`    | `up`, `down`, `flat`                                                           |
| `currency`       | `USD`, `EUR`, `GBP`, `CAD`, `AUD`                                              |

---

## 4. Documents Resource (`/documents`)

### Foreign Key Constraints

| Field         | Constraint                                            |
| ------------- | ----------------------------------------------------- |
| `frameworkId` | Must reference existing framework ID (`"1"` - `"10"`) |
| `customerId`  | Must reference existing customer ID                   |

### Enum Constraints

| Field          | Valid Values                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `documentType` | `success-plan`, `qbr-deck`, `ebr-deck`, `onboarding-plan`, `implementation-plan`, `internal-brief`, `playbook`, `health-report`, `renewal-proposal`, `expansion-proposal`, `executive-summary`, `meeting-notes`, `other` |
| `status`       | `draft`, `in-review`, `approved`, `shared`, `signed`, `archived`, `superseded`                                                                                                                                           |

---

## 5. Interactions Resource (`/interactions`)

### Foreign Key Constraints

| Field         | Constraint                                            |
| ------------- | ----------------------------------------------------- |
| `frameworkId` | Must reference existing framework ID (`"1"` - `"10"`) |
| `customerId`  | Must reference existing customer ID                   |

### Enum Constraints

| Field       | Valid Values                                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`      | `email`, `call`, `meeting`, `qbr`, `ebr`, `onboarding-call`, `training`, `support-ticket`, `implementation`, `renewal-discussion`, `escalation`, `executive-briefing`, `product-feedback`, `note` |
| `channel`   | `email`, `phone`, `video`, `in-person`, `chat`, `support-portal`, `slack`, `other`                                                                                                                |
| `sentiment` | `positive`, `neutral`, `negative`                                                                                                                                                                 |

---

## 6. Metrics Resource (`/metrics`)

### Field Structure Changes

| Field                | Current Structure            | Required Structure       |
| -------------------- | ---------------------------- | ------------------------ |
| `segmentBreakdown`   | Object `{ "active": 22 }`    | Array of `SegmentMetric` |
| `tierBreakdown`      | Object `{ "starter": 23 }`   | Array of `SegmentMetric` |
| `lifecycleBreakdown` | Object `{ "onboarding": 9 }` | Array of `SegmentMetric` |

### SegmentMetric Structure

```json
{
  "segmentId": "active",
  "segmentName": "Active",
  "customerCount": 12,
  "percentage": 48.0,
  "totalMrr": 250000,
  "avgHealthScore": 75
}
```

### Enum Constraints

| Field         | Valid Values                      |
| ------------- | --------------------------------- |
| `currency`    | `USD`, `EUR`, `GBP`, `CAD`, `AUD` |
| `churnTrend`  | `up`, `down`, `flat`              |
| `healthTrend` | `up`, `down`, `flat`              |

---

## 7. Users Resource (`/users`)

### Enum Constraints

| Field  | Valid Values                      |
| ------ | --------------------------------- |
| `role` | `admin`, `cs_manager`, `cs_agent` |

---

## 8. Tasks Resource (`/tasks`)

### Foreign Key Constraints

| Field          | Constraint                          |
| -------------- | ----------------------------------- |
| `customerId`   | Must reference existing customer ID |
| `assignedToId` | Must reference existing user ID     |
| `createdById`  | Must reference existing user ID     |

---

## Import Instructions

1. **Backup current MockAPI data** before making changes

2. **Delete all records** from each resource (or use bulk update)

3. **Import corrected snapshots** from `_MockapiSnapshots/`:

   - `customers.json` → `/customers`
   - `frameworks.json` → `/frameworks`
   - `documents.json` → `/documents`
   - `interactions.json` → `/interactions`
   - `templates.json` → `/templates`
   - `metrics.json` → `/metrics`
   - `users.json` → `/users`
   - `segments.json` → `/segments`
   - `tasks.json` → `/tasks`

4. **Verify import** by running:
   ```bash
   npm run mockapi:audit
   ```

---

## Notes

- MockAPI.io does not enforce schema constraints at the API level
- The audit script (`npm run mockapi:audit`) validates data consistency
- Re-run the audit after any MockAPI data changes
- Keep `_MockapiSnapshots/` updated as the source of truth
