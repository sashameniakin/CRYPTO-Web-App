import {render, screen} from "@testing-library/react";
import Funds from "../pages/funds";
import "@testing-library/jest-dom";

describe("Funds", () => {
  it("render text", () => {
    render(<Funds />);

    expect(
      screen.getByText("Page Funds is under construction")
    ).toBeInTheDocument();
  });
});
