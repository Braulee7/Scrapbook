import google_logo from "../../assets/svg/google.svg";
import "./index.css";

function SignIn() {
  return (
    <>
      <div className="container">
        <h2 className="title">Scrapbook</h2>
        <div className="signin_box">
          <form>
            <input type="text" placeholder="Email"></input>
            <input type="text" placeholder="Password"></input>
            <button>Sign In</button>
          </form>
        </div>
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

export default SignIn;
