import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddMemoryButton from ".";
import React from "react";

test("Add Memory Button opens modal", () => {
  // ARRANGE
  // mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const setOpenModal = jest.fn();
  jest.spyOn(React, "useState").mockReturnValue([false, setOpenModal]);
  const { getByText } = render(<AddMemoryButton />);
  const addMemoryButton = getByText("Add New Memories");

  // ACT
  fireEvent.click(addMemoryButton);

  // ASSERT
  expect(setOpenModal).toHaveBeenCalledTimes(1);
  expect(setOpenModal).toHaveBeenCalledWith(true);
});
