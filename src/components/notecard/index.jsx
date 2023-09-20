import "./index.css";

function Notecard({ text }) {
  return (
    <>
      <div className="notecard-container purple">
        <p data-testid="notecard-text" className="text">
          {text}
        </p>
      </div>
    </>
  );
}

export default Notecard;
