
"use client";

import { Card } from "./ui/card";

export function SideInsights({ insights }: { insights: { lines: string[]; warnings: string[] } }) {
  return (
    <Card className="p-4" role="complementary" aria-label="이번 주 인사이트">
      <h2 className="text-lg font-semibold mb-2">이번 주 인사이트</h2>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {insights.lines.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
      {insights.warnings.length > 0 && (
        <>
          <h3 className="mt-3 font-semibold text-red-600 dark:text-red-400">경고 신호</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {insights.warnings.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </>
      )}
    </Card>
  );
}
