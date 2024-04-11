import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { updateImagePosition } from "../../util/firebase";
import useRotation from "../../hooks/useRotation";
import Edit from "../edit";
import DraggableWrapper from "../draggable-wrapper";
import "./index.css";
import useScale from "../../hooks/useScale";

function Image({ image, memory, page }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
  const [rotate, setRotate] = useRotation(image, memory, page, true);
  const [scale, setScale] = useScale(image, memory, page, true);
  const [edit, setEdit] = useState(false);

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
      <DraggableWrapper
        edit={edit}
        handle_stop={handle_stop}
        getInitialPosition={getInitialPosition}
        containerClass={"single-image-container"}
      >
        <Edit
          rotate={rotate}
          setRotate={setRotate}
          scale={scale}
          setScale={setScale}
          edit={edit}
        >
          <motion.img
            animate={{ rotate, scale }}
            draggable={false}
            className="firebase-image"
            onClick={() => setEdit(!edit)}
            src={image.url}
            alt={image.url}
          />
        </Edit>
      </DraggableWrapper>
    </>
  );
}

export default Image;
