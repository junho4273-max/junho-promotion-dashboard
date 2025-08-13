
"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { KpiCard } from "@/components/KpiCard";
import { UploadModal } from "@/components/UploadModal";
import { SideInsights } from "@/components/SideInsights";
import { DataTable } from "@/components/DataTable";
import { Card } from "@/components/ui/card";
import { useDataStore } from "@/store/useDataStore";
import { currency, percent } from "@/lib/format";
import { computeKpis } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";

const MonthlyTrend = dynamic(() => import("@/charts/MonthlyTrend"), { ssr: false });
const FunnelChart = dynamic(() => import("@/charts/FunnelChart"), { ssr: false });
const TeamTop5 = dynamic(() => import("@/charts/TeamTop5"), { ssr: false });

export default function Page() {
  const { rows, lastUpdated } = useDataStore();
  const k = useMemo(() => computeKpis(rows), [rows]);

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Header lastUpdated={lastUpdated} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UploadModal />
        </div>
      </div>

      {/* KPI Grid */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-label="핵심 KPI"
      >
        <KpiCard
          title="목표 달성률"
          value={percent(k.promotionProgress)}
          sub={currency(k.target)}
          ringValue={Math.min(100, Math.round(k.promotionProgress * 100))}
          ariaLabel={`progress-${Math.round(k.promotionProgress * 100)}`}
          tone={k.promotionProgress >= 1 ? "success" : k.promotionProgress >= 0.7 ? "warn" : "alert"}
        />
        <KpiCard
          title="6–8월 누적 초회보험료"
          value={currency(k.sumJunToAugInitial)}
          sub="목표 대비 누적"
          ringValue={100}
          ariaLabel="kpi-cum-initial"
          tone="success"
          staticRing
        />
        <KpiCard
          title="이번 달 실적(초회)"
          value={currency(k.currentMonthInitial)}
          sub={k.currentMonth}
          ringValue={100}
          ariaLabel="kpi-this-month"
          staticRing
          tone="success"
        />
        <KpiCard
          title="이번 달 예상치(초회)"
          value={currency(k.predictedCurrentMonthInitial)}
          sub="최근 추세 기반 예측"
          ringValue={100}
          staticRing
          ariaLabel="kpi-forecast"
          tone="warn"
          className="lg:col-span-2"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card className="p-4" role="region" aria-label="월별 초회보험료 추이">
          <MonthlyTrend data={k.monthlySeries} predicted={k.predictedPoint} />
        </Card>

        <Card className="p-4" role="region" aria-label="파이프라인 퍼널">
          <FunnelChart
            meetings={k.pipeline.meetings}
            proposals={k.pipeline.proposals}
            contracts={k.pipeline.contracts}
            conv1={k.pipeline.convMeetToProp}
            conv2={k.pipeline.convPropToCont}
          />
        </Card>

        <Card className="p-4" role="region" aria-label="팀원 기여 Top5">
          <TeamTop5 data={k.top5} />
        </Card>
      </section>

      {/* Table + Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="p-2 lg:col-span-2" role="region" aria-label="데이터 테이블">
          <DataTable />
        </Card>
        <SideInsights insights={k.insights} />
      </section>
    </main>
  );
}
