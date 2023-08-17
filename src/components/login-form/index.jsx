import google_logo from "../../assets/svg/google.svg";
import "./index.css";

function LoginForm({ form }) {
  return (
    <>
      <div className="container-login">
        <h2 className="title">Scrapbook</h2>
        <div className="login_box">{form}</div>
        <div className="other_providers">
          <h3>Or</h3>
          <button className="google">
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
