import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "../../components/login-form";
import Welcome from "../../components/welcome-text";
import SignIn from "../../components/sign-in";
import CreateAccount from "../../components/create";
import "./index.css";

function Login() {
  const [creating, setCreating] = useState(false);
  const changeState = () => {
    setCreating(!creating);
  };

  return (
    <>
      <div className="container-login-page" data-creating={creating}>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          <LoginForm form={creating ? <CreateAccount /> : <SignIn />} />
        </motion.div>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Welcome creating={creating} callback={changeState} />
        </motion.div>
      </div>
    </>
  );
}

export default Login;
