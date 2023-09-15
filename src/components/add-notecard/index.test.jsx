import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import AddNoteCard from ".";
import { addNotecard } from "../../util/firebase";

jest.mock("../../util/firebase");
test("Add Note Card creates note card", async () => {
  // ARRANGE
  const close = jest.fn();
  const memory = { id: "1234" };
  const page = { id: "5678" };
  addNotecard.mockResolvedValueOnce({});
  const { getByPlaceholderText, getByText } = render(
    <AddNoteCard memory={memory} page={page} exit={close} />
  );
  const nameInput = getByPlaceholderText("Note");
  const createButton = getByText("Add Notecard");

  // ACT
  fireEvent.change(nameInput, { target: { value: "Test Note Card" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(addNotecard).toHaveBeenCalledTimes(1));
  expect(addNotecard).toHaveBeenCalledWith(memory, page, "Test Note Card");
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1));
});

test("Add Notecard does not create note card with empty text", async () => {
  // ARRANGE
  // mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const { getByText, getByTestId } = render(<AddNoteCard />);
  const createButton = getByText("Add Notecard");

  // ACT
  fireEvent.click(createButton);
  const message = getByTestId("message");
  // ASSERT
  expect(message.textContent).toBe("Text cannot be empty");
});
