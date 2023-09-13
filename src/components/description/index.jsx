import "./index.css";

function Description({ desc }) {
  return (
    <>
      <div className="description-container">
        <p className="desc">
          {desc === "" ? "Description will be set when page is created" : desc}
        </p>
      </div>
    </>
  );
}

export default Description;
