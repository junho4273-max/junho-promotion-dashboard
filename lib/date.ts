
// Asia/Seoul 기준 날짜 유틸
export function getTodayKR(): Date {
  const now = new Date();
  return now;
}

export function getCurrentYYYYMM(): string {
  const d = getTodayKR();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function formatYYYYMM(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function ddayTo(target: Date): number {
  const today = new Date();
  const ms = target.setHours(23,59,59,999) - today.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function endOfMonthKey(yyyyMM: string) {
  const [y, m] = yyyyMM.split("-").map(Number);
  const last = new Date(y, m, 0);
  return `${last.getFullYear()}-${String(last.getMonth()+1).padStart(2,"0")}-${String(last.getDate()).padStart(2,"0")}`;
}

export function isBetweenYYYYMM(x: string, start: string, end: string) {
  return x >= start && x <= end;
}
