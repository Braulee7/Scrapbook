import { useEffect, useState } from "react";
import { SignInWithEmail } from "../../util/firebase";
import "./index.css";

function SignIn({ setErrorMessage }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setPassword(password);
  }, [password]);

  useEffect(() => {
    setEmail(email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if values are valid (have characters)
    if (password < 8) {
      setErrorMessage("Password is not valid");
      return;
    }

    // try to sign in user
    try {
      await SignInWithEmail(email, password);
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
