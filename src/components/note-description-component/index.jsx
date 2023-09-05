import { useState } from "react";
import Description from "../description";
import NotecardContainer from "../notecard-container";
import { getDescription } from "../../util/firebase";
import Loading from "../loading";
import "./index.css";

function NoteDescriptionComponent({ memory, page }) {
  const [desc, setDesc] = useState();
  getDescription(memory, page).then((res) => {
    setDesc(res);
  });

  while (desc == null) {
    return <Loading />;
  }

  return (
    <>
      <div className="note-desc-comp">
        <NotecardContainer memory={memory} page={page} />
        <Description desc={desc} />
      </div>
    </>
  );
}

export default NoteDescriptionComponent;
