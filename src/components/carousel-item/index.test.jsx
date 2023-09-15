import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CarouselItem from ".";

test("Carousel Item has active class", () => {
  // ARRANGE
  const { container } = render(<CarouselItem active={true} />);
  // ACT
  const carouselItem = container.firstChild;
  // ASSERT
  expect(carouselItem).toHaveClass("carousel-item");
  expect(carouselItem).toHaveClass("active");
});

test("Carousel Item has disabled class", () => {
  // ARRANGE
  const { container } = render(<CarouselItem active={false} />);
  // ACT
  const carouselItem = container.firstChild;
  // ASSERT
  expect(carouselItem).toHaveClass("carousel-item");
  expect(carouselItem).toHaveClass("disabled");
});
