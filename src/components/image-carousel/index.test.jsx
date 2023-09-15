import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCarousel from ".";

test("Image Carousel has images", () => {
  // ARRANGE
  const images = ["image1.png", "image2.png", "image3.png"];
  render(<ImageCarousel images={images} />);

  // ACT
  const imageElement1 = screen.getByAltText("image1.png");
  const imageElement2 = screen.getByAltText("image2.png");
  const imageElement3 = screen.getByAltText("image3.png");
  // ASSERT
  expect(imageElement1).toBeInTheDocument();
  expect(imageElement2).toBeInTheDocument();
  expect(imageElement3).toBeInTheDocument();
});

test("Image Carousel has no images", () => {
  // ARRANGE
  const images = [];
  const { queryByTestId } = render(<ImageCarousel images={images} />);
  const ImageCarouselDiv = queryByTestId("image-coursel");
  // ACT

  // ASSERT
  expect(ImageCarouselDiv).toBeEmptyDOMElement();
});

jest.mock("../../assets/svg/arrow-button.svg", () => ({
  default: "image1.png",
}));
jest.mock("../../assets/svg/avi-icon.svg", () => ({ default: "image2.png" }));
jest.mock("../../assets/svg/google.svg", () => ({ default: "image3.png" }));
