import { useEffect, useState } from "react";
import { updateNotecardPos } from "../../util/firebase";
import "./index.css";
import DraggableWrapper from "../draggable-wrapper";
import Edit from "../edit";

function Notecard({ memory, page, notecard }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
  const [edit, setEdit] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

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
          <p
            data-testid="notecard-text"
            onClick={() => setEdit(!edit)}
            className={"notecard-container pink"}
          >
            {notecard.text}
          </p>
        </Edit>
      </DraggableWrapper>
    </>
  );
}

export default Notecard;
