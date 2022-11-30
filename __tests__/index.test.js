import {render, screen} from "@testing-library/react";
import Home from "../pages/home";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("render text", () => {
    render(<Home />);

    expect(
      screen.getByText("Page Home is under construction")
    ).toBeInTheDocument();
  });
});
