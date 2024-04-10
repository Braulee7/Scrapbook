import { motion } from "framer-motion";
import SliderInput from "../slider-input";
import "./index.css";

function Edit({ children, rotate, setRotate, scale, setScale, edit }) {
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
      {children}

      <motion.div
        className="img-edit-container"
        animate={edit ? "open" : "closed"}
        variants={variants}
      >
        {edit && (
          <>
            <SliderInput min={0.1} max={10} value={scale} set={setScale}>
              Scale
            </SliderInput>
            <SliderInput min={-180} max={180} value={rotate} set={setRotate}>
              Rotation
            </SliderInput>
          </>
        )}
      </motion.div>
    </>
  );
}

export default Edit;
