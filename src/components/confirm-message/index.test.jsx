import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ConfirmMessage from ".";

test("Confirm Message has message", () => {
  // ARRANGE
  // mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const message = "This is a test message.";
  const { getByTestId } = render(<ConfirmMessage message={message} />);
  const messageElement = getByTestId("confirm-message");
  // ACT
  // ASSERT
  expect(messageElement).toHaveTextContent(message);
});

test("Confirm message calls callbacks", () => {
  //ARRANGE
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const confirmCallback = jest.fn();
  const cancelCallback = jest.fn();
  const { getByAltText } = render(
    <ConfirmMessage
      confirmCallback={confirmCallback}
      closeCallback={cancelCallback}
    />
  );
  const confirmButton = getByAltText("Confirm");
  const cancelButton = getByAltText("Cancel");

  // ACT
  fireEvent.click(confirmButton);
  fireEvent.click(cancelButton);

  // ASSERT
  expect(confirmCallback).toHaveBeenCalledTimes(1);
  expect(cancelCallback).toHaveBeenCalledTimes(1);
});
