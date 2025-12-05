import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {title}
      </div>
      <div className="mt-1 text-2xl font-semibold text-slate-50">{value}</div>
      {description ? (
        <div className="mt-1 text-xs text-slate-400">{description}</div>
      ) : null}
    </div>
  );
}
