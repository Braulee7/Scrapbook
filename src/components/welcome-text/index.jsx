import "./index.css";
function Welcome() {
  return (
    <>
      <div className="container-welcome">
        <h1>Welcome back!</h1>
        <h1>Sign back in to start creating more memories!</h1>
        <div className="create-container">
          <h1>Don't have an account?</h1>
          <button>Create One</button>
          <h1>to start making memories!</h1>
        </div>
      </div>
    </>
  );
}

export default Welcome;
