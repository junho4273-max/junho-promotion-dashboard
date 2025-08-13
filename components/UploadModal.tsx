
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { parseFileToRows } from "@/lib/excel";
import sample from "@/data/sample.json";
import { useDataStore } from "@/store/useDataStore";

export function UploadModal() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const update = useDataStore(s => s.updateRows);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast({ title: "파일 용량 초과", description: "5MB 이하만 업로드 가능합니다.", variant: "destructive" });
      return;
    }
    const t0 = performance.now();
    try {
      const { rows } = await parseFileToRows(f);
      update(rows);
      const dt = Math.max(300, 1000 - (performance.now() - t0));
      setTimeout(() => {
        toast({ title: "업로드 완료", description: `총 ${rows.length}행 반영되었습니다.` });
        setOpen(false);
      }, dt);
    } catch (err:any) {
      toast({ title: "파싱 실패", description: err?.message || "파일 형식을 확인해 주세요.", variant: "destructive" });
    }
  };

  const loadDemo = () => {
    update(sample as any);
    toast({ title: "데모 로드 완료", description: "sample.json을 반영했습니다." });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button aria-label="데이터 업로드">데이터 업로드</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>엑셀/CSV 업로드 → JSON 변환</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input type="file" accept=".xlsx,.xls,.csv" onChange={onFile} aria-label="파일 선택" />
          <div className="text-xs opacity-70">5MB 이하 · 1시트 사용 · 컬럼 예시: 월, 팀원, 상품군, 초회/계속, 보험료, 미팅, 제안, 청약</div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={loadDemo}>샘플 불러오기</Button>
            <a href="/data/sample.csv" download className="text-sm underline">샘플 CSV 받기</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
