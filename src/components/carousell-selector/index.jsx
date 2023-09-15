import CarouselItem from "../carousel-item";
import "./index.css";

function CarouselSelector({ numberOfPages, pageNumber }) {
  const pages = new Array(numberOfPages);
  for (let i = 0; i < numberOfPages; i++) {
    pages[i] = i;
  }
  const carousel = pages.map((page) => (
    <CarouselItem key={page} active={page === pageNumber ? true : false} />
  ));
  return (
    <>
      <div className="carousel">{carousel}</div>
    </>
  );
}

export default CarouselSelector;
