import { useEffect } from "react";
import { useState } from "react";

function AddMemoryForm() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(name);
  }, [name]);
  return (
    <>
      <div className="add-memory-container">
        <h1>New Memory</h1>
        <form className="add-memory">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button>Create</button>
        </form>
      </div>
    </>
  );
}

export default AddMemoryForm;
