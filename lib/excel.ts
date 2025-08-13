import * as XLSX from "xlsx";
import { Row, PremiumType } from "./data"; // ⬅️ PremiumType도 import

type Parsed = { rows: Row[] };

export async function parseFileToRows(file: File): Promise<Parsed> {
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const json: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });
  return { rows: normalize(json) };
}

// CSV도 xlsx가 처리 가능
export async function parseCsvToRows(file: File): Promise<Parsed> {
  return parseFileToRows(file);
}

// ---- 핵심: premiumType을 PremiumType으로 확정 ----
export function normalize(input: any[]): Row[] {
  const rows: Row[] = input
    .map((r) => {
      const month = r["월"] || r["month"] || r["Month"] || r["MONTH"];
      const team = r["팀원"] || r["teamMember"] || r["TeamMember"] || r["팀원명"];
      const pg = r["상품군"] || r["productGroup"] || "기타";
      const ptRaw = r["초회/계속"] || r["premiumType"] || r["type"] || "초회";

      const premium =
        toNum(r["보험료"]) ?? toNum(r["premium"]) ?? toNum(r["초회보험료"]) ?? 0;

      const meetings = toNum(r["미팅"]) ?? toNum(r["meetings"]) ?? 0;
      const proposals = toNum(r["제안"]) ?? toNum(r["proposals"]) ?? 0;
      const contracts =
        toNum(r["청약"]) ?? toNum(r["contracts"]) ?? toNum(r["청약건수"]) ?? 0;

      const date: string | undefined = r["일자"] || r["date"] || undefined;

      // ⬇️ 여기서 유니온 타입으로 확정
      const premiumType: PremiumType = String(ptRaw).includes("계속") ? "계속" : "초회";

      const row: Row = {
        date,
        month: (month || inferMonth(date) || "").toString(),
        teamMember: String(team || ""),
        productGroup: String(pg || ""),
        premiumType,
        premium,
        meetings,
        proposals,
        contracts,
      };

      return row;
    })
    .filter((r) => r.month); // month 필수

  return rows;
}

function inferMonth(date?: string) {
  if (!date) return null;
  const m = String(date).slice(0, 7);
  return /^\d{4}-\d{2}$/.test(m) ? m : null;
}

function toNum(v: any): number | null {
  if (v === undefined || v === null || v === "") return null;
  const s = String(v).replace(/,/g, "");
  const n = Number(s);
  return isNaN(n) ? null : n;
}
