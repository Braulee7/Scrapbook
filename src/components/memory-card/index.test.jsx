import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MemoryCard from ".";

// mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

test("Memorycard redirects to the correct route", () => {
  // ARRANGE
  const navMock = jest.fn();
  require("react-router-dom").useNavigate.mockImplementation(() => navMock);
  const { getByTestId } = render(<MemoryCard title={"test"} />);
  const memoryCard = getByTestId("memory-card");
  const memoryTitle = getByTestId("memory-title");

  // ACT
  fireEvent.click(memoryCard);

  // ASSERT
  expect(navMock).toHaveBeenCalledWith("/memory/test");
  expect(memoryTitle.textContent).toBe("test");
});
