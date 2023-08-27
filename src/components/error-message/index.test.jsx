import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessage from "./index";

test("Error Message has message", () => {
  // ARRANGE
  const message = "This is a test message.";
  render(<ErrorMessage message={message} />);

  // ACT

  // ASSERT
  expect(screen.getByTestId("message")).toHaveTextContent(message);
});

test("Clear error message with button", () => {
  // ARRANGE
  var message = "test message";
  const setMessage = (param) => {
    message = null;
  };
  render(<ErrorMessage message={message} setMessage={setMessage} />);

  // ACT
  fireEvent.click(screen.getByAltText("close message"));

  // ASSERT
  expect(message).toBe(null);
});

test("Clear error message with back drop", () => {
  // ARRANGE
  var message = "test message";
  const setMessage = (param) => {
    message = null;
  };
  render(<ErrorMessage message={message} setMessage={setMessage} />);

  // ACT
  fireEvent.click(screen.getByTestId("back-drop"));

  // ASSERT
  expect(message).toBe(null);
});
