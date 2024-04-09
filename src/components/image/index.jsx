import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { updateImagePosition } from "../../util/firebase";
import SliderInput from "../slider-input";

import "./index.css";

function Image({ image, memory, page }) {
  const { nodeRef } = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState(false);
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

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={getInitialPosition()}
        bounds=".page-container"
        onStop={handle_stop}
        cancel=".img-edit-container"
      >
        <motion.div
          ref={nodeRef}
          className="single-image-container"
          onHoverEnd={() => {
            setHover(!hover);
          }}
          onHoverStart={() => {
            setHover(!hover);
          }}
        >
          <motion.button
            onClick={() => {
              setEdit(!edit);
            }}
            variants={variants}
            animate={hover ? "open" : "closed"}
          >
            edit
          </motion.button>

          <motion.img
            animate={{ rotate, scale }}
            draggable={false}
            className="firebase-image"
            src={image.url}
            alt={image.url}
          />
          <motion.div
            className="img-edit-container"
            animate={edit ? "open" : "closed"}
            variants={variants}
          >
            <SliderInput min={0.1} max={10} value={scale} set={setScale}>
              Scale
            </SliderInput>
            <SliderInput min={-180} max={180} value={rotate} set={setRotate}>
              Rotation
            </SliderInput>
          </motion.div>
        </motion.div>
      </Draggable>
    </>
  );
}

export default Image;
