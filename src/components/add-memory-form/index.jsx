import { useEffect } from "react";
import { useState } from "react";
import { addMemory } from "../../util/firebase";
import "./index.css";
function AddMemoryForm({ close, setMessage }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(name);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // verify name length
    if (name.length < 3 || name.length > 75) {
      setMessage("Name must be greater than 3 characters and less than 75!");
    } else {
      try {
        await addMemory(name);
        close();
      } catch (error) {
        setMessage(error);
      }
    }
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
