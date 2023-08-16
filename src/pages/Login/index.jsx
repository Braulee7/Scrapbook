import SignIn from "../../components/sign-in";
import Welcome from "../../components/welcome-text";
import './index.css'

function Login() {
  return (
    <>
    <div className="container-login">
      <SignIn />
      <Welcome />
    </div>
    </>
  );
}

export default Login;
