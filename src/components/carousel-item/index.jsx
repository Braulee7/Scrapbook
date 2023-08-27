import "./index.css";

function CarouselItem({ active }) {
  return (
    <>
      <div
        className={active ? "active carousel-item" : "disabled carousel-item"}
      />
    </>
  );
}

export default CarouselItem;
