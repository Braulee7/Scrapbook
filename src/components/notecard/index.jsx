import "./index.css";

function Notecard({ text }) {
  return (
    <>
      <div className="notecard-container purple">
        <p className="text">{text}</p>
      </div>
    </>
  );
}

export default Notecard;
