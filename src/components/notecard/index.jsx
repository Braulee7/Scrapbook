import "./index.css";

function Notecard({ text }) {
  return (
    <>
      <div
        className={
          text % 2 === 0
            ? "notecard-container purple"
            : "notecard-container pink"
        }
      >
        <p data-testid="notecard-text" className="text">
          {text}
        </p>
      </div>
    </>
  );
}

export default Notecard;
