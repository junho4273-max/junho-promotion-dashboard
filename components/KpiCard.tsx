"use client";

import { cn } from "@/components/ui/utils";
import { Card } from "@/components/ui/card";

export function KpiCard({
  title, value, sub, ringValue, ariaLabel, tone = "success", staticRing=false, className
}: {
  title: string;
  value: string;
  sub?: string;
  ringValue: number; // 0-100
  ariaLabel?: string;
  tone?: "success" | "warn" | "alert";
  staticRing?: boolean;
  className?: string;
}) {
  const ringColor =
    tone === "success" ? "text-green-600"
    : tone === "warn" ? "text-yellow-600"
    : "text-red-600";

  return (
    <Card className={cn("p-4 flex items-center gap-4", className)} aria-label={ariaLabel}>
      <ProgressRing value={ringValue} className={ringColor} staticRing={staticRing} />
      <div className="flex-1">
        <div className="text-sm opacity-80">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
        {sub && <div className="text-xs opacity-70">{sub}</div>}
      </div>
    </Card>
  );
}

function ProgressRing({
  value,
  className = "",
  staticRing
}: {
  value: number;
  className?: string;
  staticRing?: boolean;
}) {
  const size = 56, stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;

  const ringClass = cn(className, staticRing && "opacity-60");

  return (
    <svg width={size} height={size} role="img" aria-label={`progress-ring ${pct}%`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={stroke}
        className="opacity-20"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="round"
        className={ringClass}
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
      >
        {Math.round(pct)}%
      </text>
    </svg>
  );
}
