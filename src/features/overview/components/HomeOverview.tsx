import React from "react";

interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
}

function KpiCard({ label, value, helper }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-slate-50">{value}</div>
      {helper ? (
        <div className="mt-1 text-xs text-slate-400">{helper}</div>
      ) : null}
    </div>
  );
}

export function HomeOverview() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Welcome to SuccessBoard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          This is your customer success command center. As we connect more data
          sources, you&apos;ll see live customers, interactions, and health
          metrics here.
        </p>
      </section>
    </div>
  );
}
