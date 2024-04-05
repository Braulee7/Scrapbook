import { useEffect, useState } from "react";
import NotecardContainer from "../notecard-container";
import "./index.css";

function NoteDescriptionComponent({ memory, page }) {
  return (
    <>
      <div className="note-desc-placeholder-container">
        <div data-testid="note-description-div" className="note-desc-comp">
          <NotecardContainer memory={memory} page={page} />
        </div>
      </div>
    </>
  );
}

export default NoteDescriptionComponent;
