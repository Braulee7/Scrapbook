<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
>>>>>>> 5cb10e1 (Made notecards draggable and removed description component)
import NotecardContainer from "../notecard-container";
import "./index.css";

function NoteDescriptionComponent({ memory, page }) {
  return (
    <>
<<<<<<< HEAD
      {desc == null ? (
        <Loading />
      ) : (
        <div className="note-desc-placeholder-container">
          <div data-testid="note-description-div" className="note-desc-comp">
            <NotecardContainer memory={memory} page={page} />
          </div>
=======
      <div className="note-desc-placeholder-container">
        <div data-testid="note-description-div" className="note-desc-comp">
          <NotecardContainer memory={memory} page={page} />
>>>>>>> 5cb10e1 (Made notecards draggable and removed description component)
        </div>
      </div>
    </>
  );
}

export default NoteDescriptionComponent;
