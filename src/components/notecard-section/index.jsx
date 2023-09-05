import Notecard from "../notecard";
import "./index.css";
function NoteCardSection({ notecards }) {
  return (
    <>
      <div className="notecard-list">
        {notecards.map((notecard) => (
          <Notecard key={notecard.idField} text={notecard.text} />
        ))}
      </div>
    </>
  );
}

export default NoteCardSection;
