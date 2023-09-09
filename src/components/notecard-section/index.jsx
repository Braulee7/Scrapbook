import Notecard from "../notecard";
import "./index.css";
function NoteCardSection({ notecards }) {
  return (
    <>
      <div className="notecard-list">
        {notecards.map((notecard, index) => (
          <Notecard key={index} text={notecard.text} />
        ))}
      </div>
    </>
  );
}

export default NoteCardSection;
