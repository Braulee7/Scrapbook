import { useRef } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import "./index.css";

function DraggableWrapper({
  children,
  handle_stop,
  getInitialPosition,
  edit,
  containerClass,
}) {
  const ref = useRef(null);

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
    <Draggable
      nodeRef={ref}
      defaultPosition={getInitialPosition()}
      bounds=".page-container"
      onStop={handle_stop}
      disabled={!edit}
      handle=".drag-handle"
    >
      <motion.div ref={ref} className={containerClass || "draggable-wrapper"}>
        <>
          <motion.p
            variants={variants}
            animate={edit ? "open" : "closed"}
            className="drag-handle"
          >
            {edit && <p>. . .</p>}
          </motion.p>
        </>
        {children}
      </motion.div>
    </Draggable>
  );
}

export default DraggableWrapper;
