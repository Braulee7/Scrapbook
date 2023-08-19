function CreateAccount() {
  return (
    <>
      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Sign In</button>
      </form>
    </>
  );
}

export default CreateAccount;
