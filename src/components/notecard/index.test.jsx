import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Notecard from ".";

test("Notecard has text", () => {
  // ARRANGE
  const text = "This is a test message";
  const { getByTestId } = render(<Notecard text={text} />);
  const notecardText = getByTestId("notecard-text");
  // ACT

  // ASSERT
  expect(notecardText).toHaveTextContent(text);
});
