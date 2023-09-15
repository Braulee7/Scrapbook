import { useEffect, useRef } from "react";
import "./index.css";

function Backdrop({ children, callback }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  return (
    <>
      <div className="parent">
        <div
          className="back-drop"
          data-testid="backdrop"
          onClick={callback}
        ></div>
        <div className="children" ref={ref}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Backdrop;
