import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Backdrop from ".";

test("Backdrop renders children", () => {
  // ARRANGE
  // mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const child = <div>Child</div>;
  render(<Backdrop>{child}</Backdrop>);

  // ACT
  // ASSERT
  expect(document.body).toHaveTextContent("Child");
});

test("Backdrop scrolls to children", () => {
  // ARRANGE
  // mock scrollIntoView
  const scrollIntoView = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  render(<Backdrop />);

  // ACT
  // ASSERT
  expect(scrollIntoView).toHaveBeenCalledTimes(1);
  expect(scrollIntoView).toHaveBeenCalledWith({
    behavior: "smooth",
    block: "center",
  });
});

test("Backdrop callback closes backdrop", () => {
  // ARRANGE
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const close = jest.fn();
  const { getByTestId } = render(<Backdrop callback={close} />);
  const backdrop = getByTestId("backdrop");

  // ACT
  fireEvent.click(backdrop);

  // ASSERT
  expect(close).toHaveBeenCalledTimes(1);
});
