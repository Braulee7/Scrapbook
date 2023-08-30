import { useEffect } from "react";
import { useState } from "react";
import { addMemory } from "../../util/firebase";
import "./index.css";
function AddMemoryForm({ close }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(name);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMemory(name);
    close();
  };
  return (
    <>
      <div className="add-memory-container">
        <h1>New Memory</h1>
        <form onSubmit={handleSubmit} className="add-memory">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="form-buttons">
            <button type="submit" className="create">
              Create
            </button>
            <button onClick={close} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddMemoryForm;
