
"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function FunnelChart({
  meetings, proposals, contracts, conv1, conv2
}: {
  meetings: number; proposals: number; contracts: number;
  conv1: number; conv2: number;
}) {
  const data = [
    { stage: "미팅", value: meetings, conv: "" },
    { stage: "제안", value: proposals, conv: `${Math.round(conv1*100)}%` },
    { stage: "청약", value: contracts, conv: `${Math.round(conv2*100)}%` }
  ];
  return (
    <div role="img" aria-label="파이프라인 퍼널 차트">
      <div className="sr-only">미팅→제안→청약 단계별 전환율을 나타냅니다.</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="stage" />
          <Tooltip />
          <Bar dataKey="value">
            <LabelList dataKey="value" position="right" />
            <LabelList dataKey="conv" position="insideLeft" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs opacity-70 mt-1">전환율은 퍼센트로 표기됩니다.</div>
    </div>
  );
}
