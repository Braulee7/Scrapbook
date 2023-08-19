import "./index.css";

function SignIn() {
  return (
    <>
      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
