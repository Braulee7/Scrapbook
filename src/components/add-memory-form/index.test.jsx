import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddMemoryForm from ".";
import { addMemory } from "../../util/firebase";

jest.mock("../../util/firebase");
test("Add Memory Form creates memory", async () => {
  // ARRANGE
  addMemory.mockResolvedValueOnce({});
  const close = jest.fn();
  const setMessage = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <AddMemoryForm close={close} setMessage={setMessage} />
  );
  const nameInput = getByPlaceholderText("Name");
  const createButton = getByText("Create");

  // ACT
  fireEvent.change(nameInput, { target: { value: "Test Memory" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(addMemory).toHaveBeenCalledTimes(1));
  expect(addMemory).toHaveBeenCalledWith("Test Memory");
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1));
});

test("Add Memory closes on cancel", async () => {
  // ARRANGE
  const close = jest.fn();
  const setMessage = jest.fn();
  const { getByText } = render(
    <AddMemoryForm close={close} setMessage={setMessage} />
  );
  const cancelButton = getByText("Cancel");

  // ACT
  fireEvent.click(cancelButton);

  // ASSERT
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1));
});

test("Add memory fails with invalid name", async () => {
  // ARRANGE
  const setMessage = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <AddMemoryForm setMessage={setMessage} />
  );
  const nameInput = getByPlaceholderText("Name");
  const createButton = getByText("Create");

  // ACT
  fireEvent.change(nameInput, { target: { value: "T" } });
  fireEvent.click(createButton);
  fireEvent.change(nameInput, {
    target: {
      value:
        "this is a really long string that should be longer than 75 characters and cause a fail in the create memory function",
    },
  });
  fireEvent.click(createButton);

  // ASSERT
  expect(setMessage).toHaveBeenCalledTimes(2);
  expect(setMessage).toHaveBeenCalledWith(
    "Name must be greater than 3 characters and less than 75!"
  );
});

test("Add memory catches error", async () => {
  // ARRANGE
  const setMessage = jest.fn();
  addMemory.mockRejectedValueOnce(new Error("Error"));
  const { getByPlaceholderText, getByText } = render(
    <AddMemoryForm setMessage={setMessage} />
  );
  const nameInput = getByPlaceholderText("Name");
  const createButton = getByText("Create");

  // ACT
  fireEvent.change(nameInput, { target: { value: "Test Memory" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(addMemory).toHaveBeenCalledTimes(1));
  expect(addMemory).toHaveBeenCalledWith("Test Memory");
  await waitFor(() => expect(setMessage).toHaveBeenCalledTimes(1));
  expect(setMessage).toHaveBeenCalledWith("Error: Error");
});
