import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "../../components/login-form";
import Welcome from "../../components/welcome-text";
import "./index.css";

function Login() {
  const signin = (
    <>
      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </form>
    </>
  );
  const create_account = (
    <>
      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Sign In</button>
      </form>
    </>
  );

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
          <LoginForm form={creating ? create_account : signin} />
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
