import { useEffect, useState } from "react";
import "./index.css";
import ErrorMessage from "../error-message";
import { addPage } from "../../util/firebase";

function AddPage({ memory, close }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    setName(name);
  }, [name]);

  useEffect(() => {
    setDesc(desc);
  }, [desc]);

  const submit = (e) => {
    e.preventDefault();
    // make sure name is valid
    if (name.length < 1) {
      setMessage("Name cannot be empty");
      return;
    }

    if (desc.length < 5) {
      setMessage("Description must be at least 5 characters long");
      return;
    }

    // add the page
    try {
      addPage(memory, name, desc);
      close();
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <>
      {message && <ErrorMessage message={message} setMessage={setMessage} />}
      <form className="add-page" onSubmit={submit}>
        <input
          type="text"
          name="page-name"
          id="page-name"
          placeholder="Page Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          name="page-description"
          id="page-description"
          cols="30"
          rows="5"
          placeholder="Page Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="add-page-btn" type="submit">
          Add Page
        </button>
      </form>
    </>
  );
}

export default AddPage;
