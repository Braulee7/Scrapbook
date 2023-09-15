import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Description from ".";

test("Description has text", () => {
  // ARRANGE
  const text = "This is a test description.";
  const { getByTestId } = render(<Description desc={text} />);
  const description = getByTestId("description");
  // ACT
  // ASSERT
  expect(description).toHaveTextContent(text);
});

test("Description displays default text", () => {
  // ARRANGE
  const text = null;
  const { getByTestId } = render(<Description desc={text} />);
  const description = getByTestId("description");
  // ACT
  // ASSERT
  expect(description).toHaveTextContent("Error: no description found");
});
