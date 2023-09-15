import Image from "../image";
import "./index.css";

function ImageCarousel({ images }) {
  return (
    <>
      <div className="image-carousel" data-testid="image-coursel">
        {images.map((image, index) => (
          <Image url={image} key={index} />
        ))}
      </div>
    </>
  );
}

export default ImageCarousel;
