
"use client";

import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceDot } from "recharts";
import { useMemo } from "react";

export default function MonthlyTrend({ data, predicted }: {
  data: { month: string; value: number }[];
  predicted: { month: string; value: number };
}) {
  const series = useMemo(() => data.map(d => ({ ...d })), [data]);

  return (
    <div aria-label="월별 초회보험료 추이 차트" role="img">
      <div className="sr-only">
        월별 초회보험료 추이. 마지막 지점은 이번 달 예상치 점선으로 표시됩니다.
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={series} margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v:number)=>`₩${v.toLocaleString("ko-KR")}`} />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="url(#g)" />
          <Line type="monotone" dataKey={() => null} stroke="#8884d8" strokeDasharray="4 4" isAnimationActive={false}
            data={[{ month: predicted.month, y: predicted.value }]} />
          <ReferenceDot x={predicted.month} y={predicted.value} r={4} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="text-xs opacity-70 mt-1">점선: 이번 달 예상치</div>
    </div>
  );
}
