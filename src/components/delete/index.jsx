import "./index.css";
import trash from "../../assets/svg/trash.svg";
import { deleteContent } from "../../util/firebase";
import { useState } from "react";
import ConfirmMessage from "../confirm-message";
import { AnimatePresence } from "framer-motion";
// function to delete any content from the firestore database
// @param {string} type - type of content to delete
//                  (e.g. "page", "notecard", "image")
// @param {object} options - options to delete content
//                  (e.g. { memory: "memory name", page: "page name", "notecard", "img url" })
function Delete({ type, options }) {
  const [confirm, setConfirm] = useState(false);
  const handleClick = () => {
    setConfirm(true);
  };
  return (
    <>
      {confirm && (
        <div className="confirm-message-placeholder">
          <AnimatePresence>
            <ConfirmMessage
              message={`Delete ${type}?`}
              confirmCallback={() => {
                deleteContent(type, options);
                setConfirm(false);
              }}
              closeCallback={() => setConfirm(false)}
            />
          </AnimatePresence>
        </div>
      )}
      <button onClick={handleClick} className="delete-icon">
        <img src={trash} alt="delete content" />
      </button>
    </>
  );
}

export default Delete;
