import cross from "../../assets/svg/cross.svg";
import check from "../../assets/svg/check-mark.svg";
import Backdrop from "../backdrop";
import "./index.css";
function ConfirmMessage({ message, confirmCallback, closeCallback }) {
  return (
    <>
      <Backdrop callback={closeCallback}>
        <div className="confirm-container">
          <h1 data-testid="confirm-message">Confirm {message}</h1>
          <div className="buttons">
            <button onClick={closeCallback}>
              <img src={cross} alt="Cancel" />
            </button>
            <button onClick={confirmCallback}>
              <img src={check} alt="Confirm" />
            </button>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default ConfirmMessage;
