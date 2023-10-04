import Image from "../image";
import "./index.css";
import { useRef } from "react";

function ImageCarousel({ images }) {
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    const container = containerRef.current;
    const scrollAmount = e.deltaY * 5;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        onWheel={handleScroll}
        ref={containerRef}
        className="image-carousel"
        data-testid="image-coursel"
      >
        {images.map((image, index) => (
          <Image url={image} key={index} />
        ))}
      </div>
    </>
  );
}

export default ImageCarousel;
