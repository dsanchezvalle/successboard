/**
 * AccountHealthGauge - Premium health score visualization
 *
 * Displays a segmented gauge/speedometer showing customer health score (0-100).
 * Uses semantic color zones matching the Customers table:
 * - Green (Healthy): 70+
 * - Yellow (At Risk): 40-69
 * - Red (Critical): <40
 *
 * @accessibility
 * - Score and status are provided as text, not just color
 * - Good contrast ratios in both light and dark modes
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccountHealthGaugeProps {
  /** Health score from 0-100 */
  score: number;
  /** Optional CSS class */
  className?: string;
  /** Show compact version without label */
  compact?: boolean;
}

/**
 * Get health status based on score
 * Matches the Customers table exactly:
 * - Healthy: 70+
 * - At Risk: 40-69
 * - Critical: <40
 */
function getHealthStatus(score: number): {
  label: string;
  zone: "critical" | "at-risk" | "healthy";
} {
  if (score >= 70) return { label: "Healthy", zone: "healthy" };
  if (score >= 40) return { label: "At Risk", zone: "at-risk" };
  return { label: "Critical", zone: "critical" };
}

/**
 * Zone colors using semantic design tokens
 * These match the Customers table exactly:
 * - Healthy (70+): success/green
 * - At Risk (40-69): warning/amber
 * - Critical (<40): error/red
 */
const zoneColors = {
  critical: {
    fill: "text-error-icon",
    bg: "bg-error-bg",
    text: "text-error-foreground",
  },
  "at-risk": {
    fill: "text-warning-icon",
    bg: "bg-warning-bg",
    text: "text-warning-foreground",
  },
  healthy: {
    fill: "text-success-icon",
    bg: "bg-success-bg",
    text: "text-success-foreground",
  },
};

/**
 * Segment definitions for the gauge arc
 * 3 segments matching the Customers table:
 * - 0-40: Critical (red)
 * - 40-70: At Risk (amber/yellow)
 * - 70-100: Healthy (green)
 */
const segmentStyles = [
  { start: 0, end: 40 }, // Critical (red)
  { start: 40, end: 70 }, // At Risk (amber)
  { start: 70, end: 100 }, // Healthy (green)
];

export function AccountHealthGauge({
  score,
  className,
  compact = false,
}: AccountHealthGaugeProps) {
  // Clamp score to 0-100
  const clampedScore = Math.max(0, Math.min(100, score));
  const { label, zone } = getHealthStatus(clampedScore);
  const colors = zoneColors[zone];

  // SVG gauge dimensions
  const size = compact ? 144 : 160; // 20% larger on mobile (compact mode)
  const strokeWidth = compact ? 14 : 16; // Slightly adjusted stroke width for larger size
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Angle mapping for semicircle:
  // - Start angle: 180° (pointing left, 9 o'clock position)
  // - End angle: 0° (pointing right, 3 o'clock position)
  // - Score 0 maps to 180°, Score 100 maps to 0°
  const START_ANGLE = 180; // degrees
  const END_ANGLE = 0; // degrees
  const ANGLE_SPAN = START_ANGLE - END_ANGLE; // 180 degrees

  // Calculate needle angle from score
  // t = 0 → 180°, t = 1 → 0°
  const t = clampedScore / 100;
  const needleAngleDeg = START_ANGLE - t * ANGLE_SPAN;
  const needleAngleRad = (needleAngleDeg * Math.PI) / 180;

  // Needle geometry - safe zone to avoid overlapping the number
  const needleInnerRadius = compact ? 20 : 28; // Start of needle (safe zone boundary)
  const needleOuterRadius = radius - strokeWidth / 2 - 4; // End of needle (near arc)
  const needleBaseWidth = compact ? 4 : 5; // Width at base

  // Calculate needle points for polygon shape
  const tipX = center + needleOuterRadius * Math.cos(needleAngleRad);
  const tipY = center - needleOuterRadius * Math.sin(needleAngleRad);

  // Perpendicular angle for base width
  const perpAngleRad = needleAngleRad + Math.PI / 2;
  const halfWidth = needleBaseWidth / 2;

  const baseX = center + needleInnerRadius * Math.cos(needleAngleRad);
  const baseY = center - needleInnerRadius * Math.sin(needleAngleRad);

  const base1X = baseX + halfWidth * Math.cos(perpAngleRad);
  const base1Y = baseY - halfWidth * Math.sin(perpAngleRad);
  const base2X = baseX - halfWidth * Math.cos(perpAngleRad);
  const base2Y = baseY + halfWidth * Math.sin(perpAngleRad);

  // Needle polygon points: tip, base1, base2
  const needlePoints = `${tipX},${tipY} ${base1X},${base1Y} ${base2X},${base2Y}`;

  // Helper to create arc path for a segment
  function createArcPath(startPct: number, endPct: number): string {
    // Convert percentage to angle (180° to 0°)
    const startAngleDeg = START_ANGLE - (startPct / 100) * ANGLE_SPAN;
    const endAngleDeg = START_ANGLE - (endPct / 100) * ANGLE_SPAN;

    const startAngleRad = (startAngleDeg * Math.PI) / 180;
    const endAngleRad = (endAngleDeg * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center - radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center - radius * Math.sin(endAngleRad);

    // Large arc flag: 1 if arc spans more than 180°
    const largeArc = 0;
    const sweepFlag = 1;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweepFlag} ${x2} ${y2}`;
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Gauge SVG */}
      <div className="relative">
        <svg
          width={size}
          height={size / 2 + 20}
          viewBox={`0 0 ${size} ${size / 2 + 20}`}
          className="overflow-visible"
        >
          {/* Background track - rounded ends only at the outer edges */}
          <path
            d={createArcPath(0, 100)}
            fill="none"
            className="stroke-border-default"
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
          />

          {/* Colored segments with butt linecap for crisp boundaries */}
          {segmentStyles.map((segment, index) => {
            return (
              <path
                key={index}
                d={createArcPath(segment.start, segment.end)}
                fill="none"
                stroke="currentColor"
                className={cn(
                  // 3 segments matching Customers table
                  segment.start === 0 && "text-error-icon", // Critical: <40
                  segment.start === 40 && "text-warning-icon", // At Risk: 40-69
                  segment.start === 70 && "text-success-icon" // Healthy: 70+
                )}
                strokeWidth={strokeWidth - 2}
                strokeLinecap="butt"
                opacity={0.9}
              />
            );
          })}

          {/* Needle - premium triangular shape */}
          <polygon points={needlePoints} className="fill-text-primary" />

          {/* Center hub circle */}
          {/* <circle
            cx={center}
            cy={center}
            r={hubRadius}
            className="fill-text-primary"
          /> */}

          {/* Score labels at edges */}
          <text
            x={strokeWidth / 2}
            y={center + 16}
            className="fill-text-muted text-[10px] font-medium"
            textAnchor="start"
          >
            0
          </text>
          <text
            x={size - strokeWidth / 2}
            y={center + 16}
            className="fill-text-muted text-[10px] font-medium"
            textAnchor="end"
          >
            100
          </text>
        </svg>

        {/* Center score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span
            className={cn(
              "font-bold tabular-nums",
              compact ? "text-2xl" : "text-3xl",
              colors.text
            )}
          >
            {clampedScore}
          </span>
        </div>
      </div>

      {/* Status label */}
      {!compact && (
        <div
          className={cn(
            "mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
            colors.bg,
            colors.text
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}

AccountHealthGauge.displayName = "AccountHealthGauge";
