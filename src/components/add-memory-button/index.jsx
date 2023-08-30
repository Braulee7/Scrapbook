import { useState } from "react";
import "./index.css";
import AddMemory from "../add-memory";

function AddMemoryButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  const close = () => {
    setOpenModal(false);
  };
  return (
    <>
      {openModal && <AddMemory close={close} />}
      <button onClick={handleClick} className="add-memory-button">
        <h1>Add New Memories</h1>
      </button>
    </>
  );
}

export default AddMemoryButton;
