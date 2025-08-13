
"use client";

import { useMemo, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { exportCsv } from "@/lib/csv";
import { currency } from "@/lib/format";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TBody, TD, TH, THead, TR } from "./ui/table";

export function DataTable() {
  const { rows } = useDataStore();
  const [team, setTeam] = useState<string>("ALL");
  const [pg, setPg] = useState<string>("ALL");
  const [period, setPeriod] = useState<string>("ALL");
  const [q, setQ] = useState("");

  const teams = useMemo(() => Array.from(new Set(rows.map(r => r.teamMember))).sort(), [rows]);
  const pgs = useMemo(() => Array.from(new Set(rows.map(r => r.productGroup))).sort(), [rows]);
  const months = useMemo(() => Array.from(new Set(rows.map(r => r.month))).sort(), [rows]);

  const filtered = rows.filter(r => {
    if (team !== "ALL" && r.teamMember !== team) return false;
    if (pg !== "ALL" && r.productGroup !== pg) return false;
    if (period !== "ALL") {
      const [s, e] = period.split("..");
      if (r.month < s || r.month > e) return false;
    }
    const text = `${r.month} ${r.teamMember} ${r.productGroup} ${r.premiumType}`.toLowerCase();
    if (q && !text.includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-2">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <Select value={team} onValueChange={setTeam}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="팀원" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">팀원: 전체</SelectItem>
            {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={pg} onValueChange={setPg}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="상품군" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">상품군: 전체</SelectItem>
            {pgs.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="기간" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">기간: 전체</SelectItem>
            <SelectItem value="2025-06..2025-08">2025-06 ~ 2025-08</SelectItem>
            {months.map(m => <SelectItem key={m} value={`${m}..${m}`}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input className="w-[200px]" placeholder="검색(팀원/상품군/월)" value={q} onChange={e=>setQ(e.target.value)} />
        <Button className="ml-auto" onClick={() => exportCsv(filtered)}>CSV 내보내기</Button>
      </div>
      <Table aria-label="원천 데이터 테이블">
        <THead>
          <TR>
            <TH>월</TH><TH>팀원</TH><TH>상품군</TH><TH>초회/계속</TH>
            <TH className="text-right">보험료</TH>
            <TH className="text-right">미팅</TH>
            <TH className="text-right">제안</TH>
            <TH className="text-right">청약</TH>
          </TR>
        </THead>
        <TBody>
          {filtered.map((r, i) => (
            <TR key={i}>
              <TD>{r.month}</TD>
              <TD>{r.teamMember}</TD>
              <TD>{r.productGroup}</TD>
              <TD>{r.premiumType}</TD>
              <TD className="text-right">{currency(r.premium)}</TD>
              <TD className="text-right">{r.meetings}</TD>
              <TD className="text-right">{r.proposals}</TD>
              <TD className="text-right" aria-label="contracts">{r.contracts}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
