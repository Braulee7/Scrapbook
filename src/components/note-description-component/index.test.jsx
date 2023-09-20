import { render, waitFor } from "@testing-library/react";
import NoteDescriptionComponent from ".";
import { getDescription } from "../../util/firebase";
import React from "react";

jest.mock("../../util/firebase");

test("NoteDescriptionComponent renders", async () => {
  // ARRANGE
  const memory = "test";
  const page = "test";
  getDescription.mockResolvedValue("test");
  const { getByTestId } = render(
    <NoteDescriptionComponent memory={memory} page={page} />
  );
  // ACT
  // ASSERT
  await waitFor(() =>
    expect(getByTestId("note-description-div")).toBeDefined()
  );
});

test("NoteDescriptionComponent is loading", async () => {
  // ARRANGE
  const memory = "test";
  const page = "test";
  getDescription.mockResolvedValue(null);
  const { getByTestId } = render(
    <NoteDescriptionComponent memory={memory} page={page} />
  );
  // ACT
  // ASSERT
  await waitFor(() => expect(getByTestId("loading")).toBeDefined());
});

test("NoteDescriptionComponent is setting descipriton", async () => {
  // ARRANGE
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const memory = "test";
  const page = "test";
  const setDesc = jest.fn();
  jest.spyOn(React, "useState").mockReturnValue([, setDesc]);
  render(<NoteDescriptionComponent memory={memory} page={page} />);

  // ACT
  // ASSERT
  await waitFor(() => expect(setDesc).toBeCalled());
  expect(setDesc).toHaveBeenCalledWith("");
});
