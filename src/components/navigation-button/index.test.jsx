import { render, fireEvent } from "@testing-library/react";
import NavigationButton from ".";

test("NavigationButton is facing right", () => {
  // ARRANGE
  const orientation = 1; // facing right
  const { getByTestId } = render(
    <NavigationButton orientation={orientation} />
  );
  const navigationButton = getByTestId("navigation-button");

  // ACT
  // ASSERT
  expect(navigationButton.className).toBe("right navigation");
});

test("NavigationButton is facing left", () => {
  // ARRANGE
  const orientation = 0; // facing left
  const { getByTestId } = render(
    <NavigationButton orientation={orientation} />
  );
  const navigationButton = getByTestId("navigation-button");

  // ACT
  // ASSERT
  expect(navigationButton.className).toBe("navigation");
});

test("NavigationButton calls handleClick", () => {
  // ARRANGE
  const callback = jest.fn();
  const { getByTestId } = render(<NavigationButton handleClick={callback} />);
  const navigationButton = getByTestId("navigation-button");

  // ACT
  fireEvent.click(navigationButton);
  // ASSERT
  expect(callback).toHaveBeenCalledTimes(1);
});
