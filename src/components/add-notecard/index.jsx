import { useEffect, useState } from "react";
import { addNotecard } from "../../util/firebase";
import "./index.css";
import ErrorMessage from "../error-message";

function AddNotcard({ memory, page, exit }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setText(text);
  }, [text]);

  const clearError = () => {
    setMessage(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    // check text length to make
    // sure it's not empty
    if (text.length < 1) {
      setMessage("Text cannot be empty");
    } else {
      try {
        await addNotecard(memory, page, text);
        exit();
      } catch (error) {
        setMessage(error);
      }
    }
  };

  return (
    <>
      {message && <ErrorMessage message={message} setMessage={clearError} />}
      <form className="add-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Note"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Add Notecard</button>
      </form>
    </>
  );
}

export default AddNotcard;
