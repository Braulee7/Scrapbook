import "./index.css";
function Welcome({ creating, callback }) {
  const signin_welcome = (
    <>
      <h1>Sign back in to start creating more memories!</h1>
      <h1>Don't have an account?</h1>
      <button onClick={callback}>Create One</button>
      <h1>to start making memories!</h1>
    </>
  );
  const creating_welcome = (
    <>
      <h1>Create an account to start creating memories</h1>
      <h1>Alread have an account?</h1>
      <button onClick={callback}>Sign in</button>
      <h1>to add to your memories!</h1>
    </>
  );

  return (
    <>
      <div className="container-welcome">
        <h1>Welcome back!</h1>
        <div className="create-container">
          {creating ? creating_welcome : signin_welcome}
        </div>
      </div>
    </>
  );
}

export default Welcome;
