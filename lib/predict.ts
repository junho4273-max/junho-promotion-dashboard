
import { Row, MonthlyPoint } from "./data";
import { getCurrentYYYYMM } from "./date";

function linearRegression(y: number[]) {
  const n = y.length;
  const x = Array.from({ length: n }, (_, i) => i + 1);
  const xbar = x.reduce((a, c) => a + c, 0) / n;
  const ybar = y.reduce((a, c) => a + c, 0) / n;
  const b = x.reduce((acc, xi, i) => acc + (xi - xbar) * (y[i] - ybar), 0) /
            x.reduce((acc, xi) => acc + Math.pow(xi - xbar, 2), 0);
  const a = ybar - b * xbar;
  const nextX = n + 1;
  const yhat = a + b * nextX;
  return Math.max(0, yhat);
}

export function predictCurrentMonth(rows: Row[], monthlySeries: MonthlyPoint[]): number {
  const current = getCurrentYYYYMM();

  const weekly = groupWeekly(rows);
  const recent4 = weekly.slice(-4).map(w => w.value).filter(v => v >= 0);
  if (recent4.length >= 3) {
    const reg = linearRegression(recent4);
    const avg = recent4.reduce((a,c)=>a+c,0)/recent4.length;
    return Math.round((reg + avg) / 2);
    }

  const y = monthlySeries
    .filter(p => p.month <= current)
    .slice(-6)
    .map(p => p.value);

  if (y.length >= 3) {
    return Math.round(linearRegression(y));
  }
  return monthlySeries.find(p => p.month === current)?.value ?? 0;
}

function groupWeekly(rows: Row[]) {
  const weeklyMap = new Map<string, number>();
  for (const r of rows) {
    if (!r.date) continue;
    if (r.premiumType !== "초회") continue;
    const key = toWeekKey(r.date);
    weeklyMap.set(key, (weeklyMap.get(key) ?? 0) + (r.premium || 0));
  }
  const arr = Array.from(weeklyMap.entries())
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([week, value]) => ({ week, value }));
  return arr;
}

function toWeekKey(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const ts = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (ts.getUTCDay() + 6) % 7;
  ts.setUTCDate(ts.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(ts.getUTCFullYear(),0,4));
  const week = 1 + Math.round(((+ts - +firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay()+6)%7)) / 7);
  return `${y}-W${String(week).padStart(2,"0")}`;
}
