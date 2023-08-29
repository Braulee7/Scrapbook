import cross from "../../assets/svg/cross.svg";
import check from "../../assets/svg/check-mark.svg";
import Backdrop from "../backdrop";
import "./index.css";
function ConfirmMessage({ message, confirmCallback, closeCallback }) {
  return (
    <>
      <div className="confirm-container">
        <h1>Confirm {message}</h1>
        <div className="buttons">
          <button onClick={closeCallback}>
            <img src={cross} alt="Cancel" />
          </button>
          <button onClick={confirmCallback}>
            <img src={check} alt="Confirm" />
          </button>
        </div>
      </div>
      <Backdrop callback={closeCallback} />
    </>
  );
}

export default ConfirmMessage;
