import Draggable from "react-draggable";
import "./index.css";

function Image({ image, className }) {
  const handle_stop = () => {
    console.log("Stopped");
  };
  return (
    <>
      <Draggable bounds="parent" onStop={handle_stop}>
        <div className={`single-image-container ${className}`}>
          <img
            draggable={false}
            className="firebase-image"
            src={image.url}
            alt={image.url}
          />
        </div>
      </Draggable>
    </>
  );
}

export default Image;
