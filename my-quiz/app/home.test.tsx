import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("testin home page here", () => {
  render(<Home />);
  const element = screen.getByText("  Pick a Subject to get started");
  expect(element).toBeInTheDocument();
});
