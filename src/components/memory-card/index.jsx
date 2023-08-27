import "./index.css";

function MemoryCard({ title }) {
  return (
    <>
      <div className="card-container">
        <h1 className="title">{title}</h1>
      </div>
    </>
  );
}

export default MemoryCard;
