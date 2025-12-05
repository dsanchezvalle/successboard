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

      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          label="Total customers"
          value="--"
          helper="Petclinic owners will appear here"
        />
        <KpiCard
          label="At-risk accounts"
          value="--"
          helper="Churn risk models coming soon"
        />
        <KpiCard
          label="Average health score"
          value="--"
          helper="Mock CS metrics to be wired up"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4">
          <h2 className="text-sm font-medium text-slate-100">
            Getting ready for Petclinic data
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            We&apos;ll map Petclinic owners, pets, and visits into customers,
            subscriptions, and interactions. This panel will eventually show
            recent touchpoints and key events.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4">
          <h2 className="text-sm font-medium text-slate-100">
            What&apos;s next
          </h2>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            <li>Connect Petclinic owners as customers</li>
            <li>Define customer health and churn risk signals</li>
            <li>Build customers list and detail views</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
