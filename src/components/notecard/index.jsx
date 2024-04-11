import { useEffect, useState } from "react";
import { updateNotecardPos } from "../../util/firebase";
import { motion } from "framer-motion";
import useRotation from "../../hooks/useRotation";
import useScale from "../../hooks/useScale";
import DraggableWrapper from "../draggable-wrapper";
import Edit from "../edit";
import "./index.css";

function Notecard({ memory, page, notecard }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
  const [edit, setEdit] = useState(false);
  const [rotate, setRotate] = useRotation(notecard, memory, page, false);
  const [scale, setScale] = useScale(notecard, memory, page, false);

  useEffect(() => {
    const handleResize = () => {
      // if the page goes from row to column set
      setIsMobile(window.innerWidth < 1400);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handle_stop = async (e, ui) => {
    // update depending on mobile or desktop view
    let x = ui.x;
    let y = ui.y;
    if (isMobile) {
      // calculate relative values (%)
      const container_width =
        document.querySelector(".page-container").offsetWidth;
      x = x / container_width;
    }
    await updateNotecardPos(memory, page, notecard, x, y, isMobile);
  };

  const getInitialPosition = () => {
    // initial position depends on the window width
    const container = document.querySelector(".page-container");
    let pos = { x: notecard.x, y: notecard.y };
    if (isMobile) {
      pos.x = notecard.mobileX * container.offsetWidth;
      pos.y = notecard.mobileY;
    }
    return pos;
  };

  return (
    <>
      <DraggableWrapper
        getInitialPosition={getInitialPosition}
        handle_stop={handle_stop}
        edit={edit}
      >
        <Edit
          rotate={rotate}
          setRotate={setRotate}
          scale={scale}
          setScale={setScale}
          edit={edit}
        >
          <motion.p
            animate={{ rotate, scale }}
            data-testid="notecard-text"
            onClick={() => setEdit(!edit)}
            className={"notecard-container pink"}
          >
            {notecard.text}
          </motion.p>
        </Edit>
      </DraggableWrapper>
    </>
  );
}

export default Notecard;
