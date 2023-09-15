import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CarouselSelector from ".";

test("Carousel Selector renders children", () => {
  // ARRANGE
  const { container } = render(<CarouselSelector numberOfPages={4} />);
  const carouselItem = container.querySelectorAll(".carousel-item");

  // ACT
  // ASSERT
  expect(carouselItem).toHaveLength(4);
});

test("Carousel Selector has correct classes", () => {
  // ARRANGE
  const { container } = render(
    <CarouselSelector numberOfPages={4} pageNumber={1} />
  );
  const carouselItem = container.querySelectorAll(".carousel-item");
  const activeCarouselItem = container.querySelectorAll(".active");
  const disabledCarouselItems = container.querySelectorAll(".disabled");
  // ACT
  // ASSERT
  expect(activeCarouselItem).toHaveLength(1);
  expect(carouselItem[1]).toBe(activeCarouselItem[0]);
  expect(disabledCarouselItems).toHaveLength(3);
  for (let i = 0; i < carouselItem.length; i++) {
    if (i !== 1) {
      expect(carouselItem[i]).toHaveClass("disabled");
    }
  }
});
