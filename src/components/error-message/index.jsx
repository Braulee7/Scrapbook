import React from "react";
import { motion } from "framer-motion";
import cross from "../../assets/svg/cross.svg";
import "./index.css";
import Backdrop from "../backdrop";

function ErrorMessage({ message, setMessage }) {
  const clear = (e) => {
    e.stopPropagation();
    setMessage(null);
  };

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <motion.div
      className="placeholder"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="error-container">
        <button onClick={clear}>
          <img src={cross} alt="close message" />
        </button>
        <p data-testid="message" className="message">
          {message}
        </p>
      </div>
      <Backdrop callback={clear} />
    </motion.div>
  );
}

export default ErrorMessage;
