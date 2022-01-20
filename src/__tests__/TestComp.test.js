import React from "react";
import { TestComp } from "../components/TestComp";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("TestComp should render with expected title passed in", () => {
  render(<TestComp title="Paul" />);

  screen.getByTestId("Paul");
});

test("TestComp counter is incremented by 1 after each click", () => {
  const { getByTestId, getByRole } = render(<TestComp title="Paul" />);

  getByTestId("Paul");
  expect(getByRole("button")).toHaveTextContent("0");
  fireEvent.click(getByRole("button"));
  expect(getByRole("button")).toHaveTextContent("1");
  fireEvent.click(getByRole("button"));
  expect(getByRole("button")).toHaveTextContent("2");
});
