import {render, screen} from "@testing-library/react";
import Help from "../components/Help";
import "@testing-library/jest-dom";

describe("Help", () => {
  it("render text", () => {
    render(<Help />);

    expect(screen.getByText("Hey, there!")).toBeInTheDocument();
  });
});
