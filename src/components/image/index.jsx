import "./index.css";

function Image({ url }) {
  return (
    <>
      <div className="image-container">
        <img className="firebase-image" src={url} alt="firebase" />
      </div>
    </>
  );
}

export default Image;
