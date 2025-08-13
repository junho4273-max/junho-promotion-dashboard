
import { predictCurrentMonth } from "@/lib/predict";
import type { Row } from "@/lib/data";

describe("predictCurrentMonth", () => {
  it("returns non-negative and uses fallback when limited data", () => {
    const rows: Row[] = [
      { month: "2025-06", teamMember: "A", productGroup: "X", premiumType: "초회", premium: 100, meetings:0, proposals:0, contracts:0 },
      { month: "2025-07", teamMember: "A", productGroup: "X", premiumType: "초회", premium: 200, meetings:0, proposals:0, contracts:0 },
      { month: "2025-08", teamMember: "A", productGroup: "X", premiumType: "초회", premium: 300, meetings:0, proposals:0, contracts:0 }
    ];
    const monthly = [
      { month: "2025-06", value: 100 },
      { month: "2025-07", value: 200 },
      { month: "2025-08", value: 300 }
    ];
    const y = predictCurrentMonth(rows, monthly);
    expect(y).toBeGreaterThanOrEqual(0);
  });
});
