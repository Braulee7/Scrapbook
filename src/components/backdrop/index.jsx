import "./index.css";

function Backdrop({ children, callback }) {
  return (
    <>
      <div className="back-drop" onClick={callback}>
        {children}
      </div>
    </>
  );
}

export default Backdrop;
