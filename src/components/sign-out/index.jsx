import { SignOutUser } from "../../util/firebase";
import { motion } from "framer-motion";
import avi from "../../assets/svg/avi-icon.svg";
import "./index.css";
import { useState } from "react";
import ConfirmMessage from "../confirm-message";

function SignOut() {
  const [hover, setHover] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    setConfirm(true);
  };

  const close = () => {
    setConfirm(false);
  };
  return (
    <>
      {confirm && (
        <ConfirmMessage
          message={"Sign out"}
          confirmCallback={SignOutUser}
          closeCallback={close}
        />
      )}
      <motion.button
        layout
        whileHover={{
          scale: 1,
        }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        transition={{ ease: "linear", stiffness: 400, damping: 10 }}
        id="sign-out"
        onClick={handleClick}
      >
        {hover ? (
          <h1 className="sign-out">Sign out</h1>
        ) : (
          <img src={avi} alt="sign out button" />
        )}
      </motion.button>
    </>
  );
}

export default SignOut;
