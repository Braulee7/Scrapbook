import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";
import { updateImagePosition } from "../../util/firebase";
import "./index.css";

function Image({ image, memory, page }) {
  const { nodeRef } = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
  useEffect(() => {
    const handleResize = () => {
      // if the page goes from row to column set
      setIsMobile(window.innerWidth < 1400);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // update the position of the image
  const handle_stop = async (e, ui) => {
    try {
      // update depending on the responsive design of the website
      let x = ui.x;
      let y = ui.y;
      if (isMobile) {
        // calculate the relaive values (%)
        const container = document.querySelector(".page-container");
        const container_width = container.offsetWidth;
        x = x / container_width;
      }
      await updateImagePosition(memory, page, image, x, y, isMobile);
      console.log("updated");
    } catch (e) {
      console.log(e);
    }
  };

  const getInitialPosition = () => {
    // initial position depends on the window width
    const container = document.querySelector(".page-container");
    let pos = { x: image.x, y: image.y };
    if (isMobile) {
      pos.x = image.mobileX * container.offsetWidth;
      pos.y = image.mobileY;
    }
    return pos;
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={getInitialPosition()}
        bounds=".page-container"
        onStop={handle_stop}
      >
        <div ref={nodeRef} className="single-image-container">
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
