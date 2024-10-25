import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Quiz from "./page";


describe("Quiz Component", () => {
  it("renders", () => {
    render(
    
    <Quiz />);


expect(screen.getByText("Please go back and select a category.")).toBeInTheDocument()

  });
});
