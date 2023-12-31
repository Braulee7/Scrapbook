import { useEffect, useReducer, useState } from "react";
import { CreateWithEmail } from "../../util/firebase";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ValidationMessage from "../validation";

function CreateAccount({ setErrorMessage }) {
  // focus state
  const [isFocus, setIsFocus] = useState(false);
  // email states
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  // password states
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmpassword] = useState("");
  const [matching, setMatching] = useState(false);
  const [passwordState, dispatch] = useReducer(reducer, {
    length: false,
    lowerCase: false,
    upperCase: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    dispatch({ type: "updateLength", value: password.length > 8 });
    dispatch({ type: "updateLowerCase", value: /^(?=.*[a-z])/.test(password) });
    dispatch({ type: "updateUpperCase", value: /^(?=.*[A-Z])/.test(password) });
    setMatching(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setValidPassword(
      passwordState.length && passwordState.lowerCase && passwordState.upperCase
    );
  }, [passwordState]);

  const redirect = (e = null) => {
    e && e.preventDefault();
    navigate(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validPassword && matching && validEmail) {
      // create account
      console.log("Creating account");
      try {
        await CreateWithEmail(email, password);
        redirect();
      } catch (error) {
        setErrorMessage(`${error}`);
        console.log(`setting error message to ${error}`);
      }
    } else {
      // get message based on components which are invalid
      const message = validationMessage(validPassword, matching, validEmail);
      setErrorMessage(message);
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
        {isFocus && <ValidationMessage passwordState={passwordState} />}
        <input
          data-valid={validPassword}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
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
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "updateLength":
      newState = { ...state, length: action.value };
      break;

    case "updateLowerCase":
      newState = { ...state, lowerCase: action.value };
      break;

    case "updateUpperCase":
      newState = { ...state, upperCase: action.value };
      break;
    default:
      throw new Error("No case found for " + action.type);
  }

  return newState;
}

function validationMessage(validPassword, matching, validEmail) {
  var messages = [];

  if (!validPassword) {
    messages.push(
      <>
        Password is invalid!
        <br />
      </>
    );
  }

  if (!matching) {
    messages.push(
      <>
        Passwords are not matching! <br />
      </>
    );
  }

  if (!validEmail) {
    messages.push(
      <>
        Email is not valid!
        <br />
      </>
    );
  }

  return messages;
}

export default CreateAccount;
