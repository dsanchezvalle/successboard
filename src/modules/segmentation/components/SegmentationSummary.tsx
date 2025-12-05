import type {
  CustomerSegmentationEntry,
  CustomerSegment,
} from "@/modules/segmentation/types";

interface SegmentationSummaryProps {
  segmentation: CustomerSegmentationEntry[];
}

function countBySegment(
  segmentation: CustomerSegmentationEntry[],
  segment: CustomerSegment
): number {
  return segmentation.filter((entry) => entry.segment === segment).length;
}

export function SegmentationSummary({
  segmentation,
}: SegmentationSummaryProps) {
  const activeCount = countBySegment(segmentation, "active");
  const atRiskCount = countBySegment(segmentation, "at-risk");
  const vipCount = countBySegment(segmentation, "vip");

  const total = activeCount + atRiskCount + vipCount;

  const activeRatio = total > 0 ? activeCount / total : 0;
  const atRiskRatio = total > 0 ? atRiskCount / total : 0;
  const vipRatio = total > 0 ? vipCount / total : 0;

  const radius = 40;
  const center = 50;

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function arcPath(startAngle: number, endAngle: number) {
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      center,
      center,
      "Z",
    ].join(" ");
  }

  return (
    <section className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Customer segmentation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          High-level view of your customer base split into Active, At-risk, and
          VIP segments using mocked success metrics.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Active customers
            </div>
            <div className="mt-1 text-2xl font-semibold text-slate-50">
              {activeCount}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Healthy accounts with good engagement.
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              At-risk customers
            </div>
            <div className="mt-1 text-2xl font-semibold text-slate-50">
              {atRiskCount}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Accounts that may need intervention soon.
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              VIP customers
            </div>
            <div className="mt-1 text-2xl font-semibold text-slate-50">
              {vipCount}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              High-value accounts to nurture and expand.
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm flex flex-col items-center justify-center gap-3">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Segment distribution
          </div>
          {total === 0 ? (
            <p className="text-xs text-slate-500">
              No customers available yet.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg viewBox="0 0 100 100" className="h-48 w-48">
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  className="fill-slate-900"
                />
                {/* Active slice */}
                {activeRatio > 0 && (
                  <path
                    d={arcPath(0, activeRatio * 360)}
                    className="fill-emerald-400/80"
                  />
                )}
                {/* At-risk slice */}
                {atRiskRatio > 0 && (
                  <path
                    d={arcPath(
                      activeRatio * 360,
                      (activeRatio + atRiskRatio) * 360
                    )}
                    className="fill-amber-400/80"
                  />
                )}
                {/* VIP slice */}
                {vipRatio > 0 && (
                  <path
                    d={arcPath((activeRatio + atRiskRatio) * 360, 360)}
                    className="fill-sky-400/80"
                  />
                )}
              </svg>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Active
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  At-risk
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  VIP
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
