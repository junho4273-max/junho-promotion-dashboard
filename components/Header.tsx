
"use client";

import { Card } from "./ui/card";
import { ddayTo, getTodayKR } from "@/lib/date";
import { useMemo } from "react";

export function Header({ lastUpdated }: { lastUpdated?: Date | null }) {
  const today = getTodayKR();
  const dday = useMemo(() => {
    const target = new Date(today.getFullYear(), 7, 31);
    return ddayTo(target);
  }, [today]);

  const updatedText = lastUpdated
    ? new Date(lastUpdated).toLocaleString("ko-KR")
    : "샘플 데이터 (미업로드)";

  return (
    <Card className="w-full p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold">송준호의 지점장 진급 목표 달성 대시보드</h1>
        <p className="text-sm opacity-80">
          오늘: {today.toLocaleDateString("ko-KR")} · D-{dday >= 0 ? dday : 0} (8월 31일까지)
        </p>
      </div>
      <div className="text-sm">데이터 최신일시: <span className="font-medium">{updatedText}</span></div>
    </Card>
  );
}
