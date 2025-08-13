
import { groupBy, sumBy } from "./utils-lite";
import { endOfMonthKey, formatYYYYMM, getCurrentYYYYMM, isBetweenYYYYMM } from "./date";
import { predictCurrentMonth } from "./predict";

export type PremiumType = "초회" | "계속";

export type Row = {
  date?: string;             // optional YYYY-MM-DD
  month: string;             // YYYY-MM
  teamMember: string;        // 팀원
  productGroup: string;      // 상품군
  premiumType: PremiumType;  // 초회/계속
  premium: number;           // 보험료(원)
  meetings: number;          // 미팅수
  proposals: number;         // 제안수
  contracts: number;         // 청약건수
};

export type MonthlyPoint = { month: string; value: number };

export const PROMOTION_TARGET = 13_500_000;

export function computeKpis(rows: Row[]) {
  const currentMonth = getCurrentYYYYMM(); // Asia/Seoul 기준
  const year = Number(currentMonth.slice(0, 4));

  // 6–8월 범위 키
  const jun = `${year}-06`, jul = `${year}-07`, aug = `${year}-08`;

  const sumJunToAugInitial = rows
    .filter(r => r.premiumType === "초회" && isBetweenYYYYMM(r.month, jun, aug))
    .reduce((acc, r) => acc + r.premium, 0);

  const promotionProgress = sumJunToAugInitial / PROMOTION_TARGET;

  // 월별 초회 시리즈 (해당 연도만 표시)
  const monthly = groupBy(
    rows.filter(r => r.premiumType === "초회" && r.month.startsWith(String(year))),
    r => r.month
  );

  const monthsSorted = Object.keys(monthly).sort();
  const monthlySeries: MonthlyPoint[] = monthsSorted.map(m => ({
    month: m, value: monthly[m].reduce((a,c)=>a+c.premium,0)
  }));

  // 이번 달 실적
  const currentMonthInitial = monthlySeries.find(p => p.month === currentMonth)?.value ?? 0;

  // 파이프라인 집계 (최근 월 기준)
  const currentRows = rows.filter(r => r.month === currentMonth);
  const meetings = currentRows.reduce((a,c)=>a+c.meetings,0);
  const proposals = currentRows.reduce((a,c)=>a+c.proposals,0);
  const contracts = currentRows.reduce((a,c)=>a+c.contracts,0);
  const convMeetToProp = meetings > 0 ? proposals / meetings : 0;
  const convPropToCont = proposals > 0 ? contracts / proposals : 0;

  // 팀원 기여 Top5 (연간 초회 합계 기준)
  const memberMap = new Map<string, number>();
  rows.filter(r => r.premiumType==="초회" && r.month.startsWith(String(year)))
      .forEach(r => memberMap.set(r.teamMember || "미상", (memberMap.get(r.teamMember || "미상")||0)+r.premium));
  const top5 = Array.from(memberMap.entries()).map(([name, value])=>({name, value}))
    .sort((a,b)=>b.value-a.value).slice(0,5);

  // 예측
  const predictedCurrentMonthInitial = predictCurrentMonth(rows, monthlySeries);
  const predictedPoint = { month: currentMonth, value: predictedCurrentMonthInitial };

  // 인사이트
  const insights = buildInsights(monthlySeries, { meetings, proposals, contracts, convMeetToProp, convPropToCont });

  return {
    target: PROMOTION_TARGET,
    promotionProgress,
    sumJunToAugInitial,
    currentMonthInitial,
    currentMonth,
    monthlySeries,
    predictedCurrentMonthInitial,
    predictedPoint,
    pipeline: { meetings, proposals, contracts, convMeetToProp, convPropToCont },
    top5,
    insights
  };
}

function buildInsights(series: MonthlyPoint[], pipe: {
  meetings: number; proposals: number; contracts: number;
  convMeetToProp: number; convPropToCont: number;
}) {
  const last = series.at(-1)?.value ?? 0;
  const prev = series.at(-2)?.value ?? 0;
  const mom = prev > 0 ? (last - prev) / prev : 0;

  const warnings: string[] = [];
  if (pipe.convMeetToProp < 0.4) warnings.push("미팅→제안 전환율이 40% 미만입니다. 초기 니즈 환기 스크립트를 점검하세요.");
  if (pipe.convPropToCont < 0.5) warnings.push("제안→청약 전환율이 50% 미만입니다. 클로징 구간(가치·비용·리스크) 보완이 필요합니다.");
  if (pipe.meetings < 8) warnings.push("이번 주 미팅수가 8건 미만입니다. 상단 퍼널 유입이 부족합니다.");

  const insights = [
    `월간 초회보험료 MoM: ${(mom>=0?"+":"")}${(mom*100).toFixed(1)}%`,
    `현재 퍼널: 미팅 ${pipe.meetings} → 제안 ${pipe.proposals} → 청약 ${pipe.contracts}`,
  ];
  return { lines: insights, warnings: warnings.slice(0, 3) };
}
