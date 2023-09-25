import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import NotecardSection from ".";

// mock the notecard objects
const notecards = [
  { text: "Message 1" },
  { text: "Message 2" },
  { text: "Message 3" },
  { text: "Message 4" },
];

test("NotecardSection renders all object", () => {
  // ARRANGE
  const { getAllByTestId } = render(<NotecardSection notecards={notecards} />);
  const notecards_comp = getAllByTestId("notecard-text");
  // ACT

  // ASSERT
  expect(notecards_comp).toHaveLength(4);
  expect(notecards_comp[0]).toHaveTextContent("Message 1");
});
