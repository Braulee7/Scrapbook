import { useEffect, useState } from "react";
import Description from "../description";
import NotecardContainer from "../notecard-container";
import { getDescription } from "../../util/firebase";
import Loading from "../loading";
import "./index.css";

function NoteDescriptionComponent({ memory, page }) {
  const [desc, setDesc] = useState();

  useEffect(() => {
    const loadDesc = async () => {
      const res = await getDescription(memory, page);

      if (res == null) setDesc("");
      else setDesc(res);
    };

    loadDesc();
  }, [memory, page]);

  return (
    <>
      {desc == null ? (
        <Loading />
      ) : (
        <div className="note-desc-placeholder-container">
          <div data-testid="note-description-div" className="note-desc-comp">
            <NotecardContainer memory={memory} page={page} />
            <Description desc={desc} />
          </div>
        </div>
      )}
    </>
  );
}

export default NoteDescriptionComponent;
