
import { render, screen } from "@testing-library/react";
import TeamTop5 from "@/charts/TeamTop5";

describe("TeamTop5 chart order", () => {
  it("shows bars in descending order (via sr-only list)", () => {
    const data = [
      { name: "B", value: 100 },
      { name: "A", value: 300 },
      { name: "C", value: 200 }
    ];
    render(<TeamTop5 data={data} />);
    expect(screen.getByTestId("team-0")).toHaveTextContent("A:300");
    expect(screen.getByTestId("team-1")).toHaveTextContent("C:200");
    expect(screen.getByTestId("team-2")).toHaveTextContent("B:100");
  });
});
