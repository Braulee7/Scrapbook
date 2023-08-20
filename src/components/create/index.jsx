import { useEffect, useState } from "react";
import "./index.css";
function CreateAccount() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [validLowerCase, setValidLowerCase] = useState(false);
  const [validUpperCase, setValidUpperCase] = useState(false);
  const [confirmPassword, setConfirmpassword] = useState("");
  const [matching, setMatching] = useState(false);

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setValidEmail(emailPattern.test(email));
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  const checkPasswordLength = () => {
    setValidLength(password.length > 8);
  };

  const checkUpperCase = () => {
    const pattern = /.*[A-Z].*/;
    setValidUpperCase(pattern.test(password));
  };

  const checkLowerCase = () => {
    const pattern = /.*[a-z].*/;
    setValidLowerCase(pattern.test(password));
  };

  const validatePassword = () => {
    checkPasswordLength();
    checkUpperCase();
    checkLowerCase();
    setValidPassword(validLength && validLowerCase && validUpperCase);
  };

  const checkMatching = () => {
    setMatching(password === confirmPassword);
  };

  const validatePasswords = () => {
    validatePassword();
    checkMatching();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePasswords();
    validateEmail();
    if (validPassword && matching && validEmail) {
      // create account
      console.log("Creating account");
    } else {
      //error in creating
      console.log("Something is wrong");
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
          data-valid={validPassword}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          data-matching={matching}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmpassword(e.target.value);
          }}
        />
        <button>Sign In</button>
      </form>
    </>
  );
}

export default CreateAccount;
