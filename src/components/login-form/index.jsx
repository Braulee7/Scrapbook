import google_logo from "../../assets/svg/google.svg";
import { SignInWithGoogle } from "../../util/firebase";
import "./index.css";

function LoginForm({ form, setErrorMessage }) {
  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      await SignInWithGoogle();
    } catch (error) {
      console.log(`error: ${error}`);
      setErrorMessage(`${error}`);
    }
  };

  return (
    <>
      <div className="container-login">
        <h2 className="title">Scrapbook</h2>
        <div className="login_box">{form}</div>
        <div className="other_providers">
          <h3>Or</h3>
          <button className="google" onClick={handleGoogleClick}>
            <span className="logo">
              <img src={google_logo} alt="Google Logo" />
            </span>
            <p>Sign in with Google</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
