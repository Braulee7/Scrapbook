import "./index.css";

function Description({ desc }) {
  return (
    <>
      <div className="description-container">
        <p data-testid="description" className="desc">
          {desc === "" || !desc ? "Error: no description found" : desc}
        </p>
      </div>
    </>
  );
}

export default Description;
