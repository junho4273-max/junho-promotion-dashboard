
import { render, screen } from "@testing-library/react";
import { KpiCard } from "@/components/KpiCard";

describe("KpiCard", () => {
  it("renders progress ring with correct aria-label value", () => {
    render(<KpiCard title="목표 달성률" value="50%" ringValue={50} ariaLabel="progress-50" />);
    expect(screen.getByLabelText("progress-50")).toBeInTheDocument();
  });
});
