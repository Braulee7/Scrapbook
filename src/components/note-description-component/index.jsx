import NotecardContainer from "../notecard-container";
import "./index.css";

function NoteDescriptionComponent({ memory, page }) {
  return (
    <>
      <div data-testid="note-description-div" className="note-desc-comp">
        <NotecardContainer memory={memory} page={page} />
      </div>
    </>
  );
}

export default NoteDescriptionComponent;
