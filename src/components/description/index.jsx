import "./index.css";

function Description({ desc }) {
  return (
    <>
      <div className="description-container">
        <p className="desc">{desc}</p>
      </div>
    </>
  );
}

export default Description;
