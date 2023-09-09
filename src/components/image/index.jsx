import "./index.css";

function Image({ url, className }) {
  return (
    <>
      <div className={`single-image-container ${className}`}>
        <img className="firebase-image" src={url} alt="firebase" />
      </div>
    </>
  );
}

export default Image;
