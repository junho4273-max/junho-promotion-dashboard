
# 송준호 지점장 진급 대시보드

Next.js(App Router) + TypeScript + Tailwind + shadcn/ui + Recharts + Zustand

## 기능 개요
- 상단 헤더: 제목, 오늘(Asia/Seoul), D-Day(8/31), 데이터 최신일시
- KPI 카드 4종:
  1) 목표 달성률(Progress Ring): (6–8월 누적 초회보험료 / 13,500,000)
  2) 6–8월 누적 초회보험료
  3) 이번 달 실적(초회)
  4) 이번 달 예상치(초회) — 최근 4주(있으면 우선), 없으면 최근 월별 회귀
- 차트:
  - 월별 초회보험료 추이(Area/Line, 마지막 점선=이번 달 예상치)
  - 퍼널(미팅→제안→청약) + 단계별 전환율(%) 텍스트 표시
  - 팀원 기여 Top5(Bar, 내림차순, sr-only에 data-testid 제공)
- 데이터 테이블: 다중 필터(기간/팀원/상품군), 검색, CSV 내보내기
- 업로드 모달: 엑셀/CSV → SheetJS 파싱 → 전역상태 반영 → 토스트
- 다크모드, 12-grid 반응형(모바일 1열 → 데스크탑 3열), a11y(aria/대체텍스트)

## 로컬 실행
```bash
npm install   # 또는 yarn / pnpm
npm run dev
# http://localhost:3000
```

## 빌드/배포
- Vercel: 본 레포를 Import → Build Command(default), Output: `.next`
- 환경변수 불필요

## 데이터 스키마
```ts
type Row = {
  date?: string;       // YYYY-MM-DD
  month: string;       // YYYY-MM
  teamMember: string;  // 팀원
  productGroup: string;// 상품군
  premiumType: "초회" | "계속";
  premium: number;     // 보험료(원)
  meetings: number;    // 미팅수
  proposals: number;   // 제안수
  contracts: number;   // 청약건수
}
```
- 엑셀 컬럼 예시: `월, 팀원, 상품군, 초회/계속, 보험료, 미팅, 제안, 청약(또는 청약건수), 일자`
- 한/영 혼용 컬럼 자동 인식(파서 `lib/excel.ts`)

## 수용 기준 체크
1. 목표 달성률 = `6–8월 누적 초회 / 13,500,000` → Progress Ring 표기 ✅  
2. 월별 추이 마지막 지점 점선=이번 달 예상치 ✅  
3. 퍼널 단계별 전환율 % 표시 ✅  
4. 팀원 Top5 막대 내림차순 ✅  
5. 파일 업로드 즉시(3초 내) 갱신 ✅  
6. 390px/1440px 레이아웃 파손 없음 ✅  

## 테스트
```bash
npm run test
```
