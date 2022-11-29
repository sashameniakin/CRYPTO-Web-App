import {render, screen} from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("render text", () => {
    render(<Home />);

    expect(
      screen.getByText("Page Home is under construction")
    ).toBeInTheDocument();
  });
});
