import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CustomerDetailCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

export function CustomerDetailCard({
  title,
  children,
  className,
  subtitle,
}: CustomerDetailCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl border border-slate-800/80 bg-slate-900/80 text-slate-50 shadow-sm backdrop-blur-sm",
        className
      )}
    >
      <CardHeader className="pb-3 flex flex-row items-baseline justify-between gap-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
          {title}
        </CardTitle>
        {subtitle ? (
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0 text-sm text-slate-100">
        {children}
      </CardContent>
    </Card>
  );
}
