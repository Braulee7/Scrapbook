import "./index.css";

function Backdrop({ children, callback }) {
  return (
    <>
      <div className="parent">
        <div className="back-drop" onClick={callback}></div>
        <div className="children">{children}</div>
      </div>
    </>
  );
}

export default Backdrop;
