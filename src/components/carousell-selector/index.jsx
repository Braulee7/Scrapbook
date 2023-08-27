import CarouselItem from "../carousel-item";
import "./index.css";

function CarouselSelector({ numberOfPages, pageNumber }) {
  const pages = new Array(numberOfPages);
  for (let i = 0; i < numberOfPages; i++) {
    pages[i] = i === pageNumber ? 1 : 0;
  }
  const carousel = pages.map((page) => (
    <CarouselItem active={page === 0 ? false : true} />
  ));
  return (
    <>
      <div className="carousel">{carousel}</div>
    </>
  );
}

export default CarouselSelector;
