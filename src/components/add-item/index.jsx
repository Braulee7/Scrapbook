import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import plus from "../../assets/svg/plus.svg";
import AddNotcard from "../add-notecard";
import ErrorMessage from "../error-message";
import UploadFile from "../upload-file";
import Backdrop from "../backdrop";
import "./index.css";

function AddItem({ memory, page }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [message, setMessage] = useState("");

  const itemVariants = {
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
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="create-item-container"
      >
        <motion.ul
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          className="create-items"
        >
          <motion.li variants={itemVariants}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setAddImage(!addImage)}
            >
              image
            </motion.button>
          </motion.li>
          <motion.li variants={itemVariants}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setAddNote(!addNote)}
            >
              notecard
            </motion.button>
          </motion.li>
        </motion.ul>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={plus} alt="Button to open create menu" />
        </motion.button>
      </motion.nav>

      {addImage && (
        <Backdrop callback={() => setAddImage(!addImage)}>
          <UploadFile
            setMessage={setMessage}
            memory={memory}
            page={page}
            clear={() => setAddImage(!addImage)}
          />
        </Backdrop>
      )}

      {addNote && (
        <Backdrop callback={() => setAddNote(!addNote)}>
          <AddNotcard
            memory={memory}
            page={page}
            exit={() => setAddNote(!addNote)}
          />
        </Backdrop>
      )}

      {message && (
        <AnimatePresence>
          <ErrorMessage message={message} setMessage={setMessage} />
        </AnimatePresence>
      )}
    </>
  );
}

export default AddItem;
