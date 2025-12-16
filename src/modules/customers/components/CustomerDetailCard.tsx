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
        "rounded-xl border border-border-default bg-bg-surface shadow-sm",
        className
      )}
    >
      <CardHeader className="pb-3 flex flex-row items-baseline justify-between gap-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          {title}
        </CardTitle>
        {subtitle ? (
          <p className="text-[11px] text-text-muted/70">{subtitle}</p>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0 text-sm text-text-primary">
        {children}
      </CardContent>
    </Card>
  );
}
