import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../../components/login-form";
import Welcome from "../../components/welcome-text";
import SignIn from "../../components/sign-in";
import CreateAccount from "../../components/create";
import "./index.css";
import ErrorMessage from "../../components/error-message";

function Login() {
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const changeState = () => {
    setCreating(!creating);
  };

  const setMessage = (message) => {
    setErrorMessage(message);
  };

  return (
    <>
      <AnimatePresence>
        {errorMessage && (
          <ErrorMessage message={errorMessage} setMessage={setMessage} />
        )}
      </AnimatePresence>
      <div className="container-login-page" data-creating={creating}>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          <LoginForm
            form={
              creating ? (
                <CreateAccount setErrorMessage={setMessage} />
              ) : (
                <SignIn />
              )
            }
          />
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
