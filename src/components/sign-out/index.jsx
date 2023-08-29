import { SignOutUser } from "../../util/firebase";
import { motion } from "framer-motion";
import avi from "../../assets/svg/avi-icon.svg";
import "./index.css";
import { useState } from "react";

function SignOut() {
  const [hover, setHover] = useState(false);

  return (
    <>
      <motion.button
        layout
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        transition={{ ease: "linear", type: "tween" }}
        id="sign-out"
        onClick={SignOutUser}
      >
        {hover ? <h1>Sign out</h1> : <img src={avi} alt="sign out button" />}
      </motion.button>
    </>
  );
}

export default SignOut;
