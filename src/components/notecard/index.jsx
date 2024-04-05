import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";
import { updateNotecardPos } from "../../util/firebase";
import "./index.css";

function Notecard({ memory, page, notecard }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
  const nodeRef = useRef(null);

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
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={getInitialPosition()}
        bounds=".page-container"
        onStop={handle_stop}
      >
        <div
          ref={nodeRef}
          className={
            notecard.text % 2 === 0
              ? "notecard-container purple"
              : "notecard-container pink"
          }
        >
          <p data-testid="notecard-text" className="text">
            {notecard.text}
          </p>
        </div>
      </Draggable>
    </>
  );
}

export default Notecard;
