
"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function TeamTop5({ data }: { data: { name: string; value: number }[] }) {
  const sorted = [...data].sort((a,b)=>b.value-a.value);
  return (
    <div role="img" aria-label="팀원별 기여 Top5 막대 차트">
      <div className="sr-only">팀원 기여 상위 5명을 내림차순으로 표시합니다.</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} margin={{ left: 12, right: 12 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(v:number)=>`₩${v.toLocaleString("ko-KR")}`} />
          <Bar dataKey="value">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <ul className="sr-only">
        {sorted.map((d,i)=><li key={d.name} data-testid={`team-${i}`}>{d.name}:{d.value}</li>)}
      </ul>
    </div>
  );
}
