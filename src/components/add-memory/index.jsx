import { AnimatePresence } from "framer-motion";
import AddMemoryForm from "../add-memory-form";
import Backdrop from "../backdrop";
import ErrorMessage from "../error-message";
import { useState } from "react";

function AddMemory({ close }) {
  const [message, setMessage] = useState();

  return (
    <>
      <Backdrop callback={close}>
        <AnimatePresence>
          {message && (
            <ErrorMessage message={message} setMessage={setMessage} />
          )}
        </AnimatePresence>
        <AddMemoryForm close={close} setMessage={setMessage} />
      </Backdrop>
    </>
  );
}

export default AddMemory;
