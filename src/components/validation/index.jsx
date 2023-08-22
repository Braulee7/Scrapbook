import cross from "../../assets/svg/cross.svg";
import check from "../../assets/svg/check-mark.svg";
import { motion } from "framer-motion";
import "./index.css";
function ValidationMessage({ passwordState, isDisabled }) {
  return (
    <>
      <motion.div
        transition={{
          ease: "linear",
          x: { duration: 0.25 },
          type: "spring",
          stiffness: 250,
          damping: 50,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="validation-container"
        disabled={isDisabled}
      >
        <ul className="requirements">
          <li className="requirement">
            <span>
              <img
                src={passwordState.length ? check : cross}
                alt={
                  passwordState.length
                    ? "current validation: wrong"
                    : "current validation: correct"
                }
              />
            </span>
            <p>Longer than 8 characters</p>
          </li>
          <li className="requirement">
            <span>
              <img
                src={passwordState.upperCase ? check : cross}
                alt={
                  passwordState.upperCase
                    ? "current validation: wrong"
                    : "current validation: correct"
                }
              />
            </span>
            <p>Contains one uppercase letter</p>
          </li>
          <li className="requirement">
            <span>
              <img
                src={passwordState.lowerCase ? check : cross}
                alt={
                  passwordState.lowerCase
                    ? "current validation: wrong"
                    : "current validation: correct"
                }
              />
            </span>
            <p>Contains one lowercase letter</p>
          </li>
        </ul>
      </motion.div>
    </>
  );
}

export default ValidationMessage;
