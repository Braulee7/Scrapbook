import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from ".";
import { SignInWithEmail } from "../../util/firebase";

jest.mock("../../util/firebase");

test("Sign in with valid email and password calls function", async () => {
  // ARRANGE

  // mock the sign in function
  SignInWithEmail.mockResolvedValueOnce({});
  const { getByPlaceholderText, getByText } = render(<SignIn />);

  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const signInButton = getByText("Sign In");

  // ACT

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password" } });
  fireEvent.click(signInButton);

  // ASSERT
  await waitFor(() => expect(SignInWithEmail).toHaveBeenCalledTimes(1));
  expect(SignInWithEmail).toHaveBeenCalledWith("test@example.com", "Password");
});

test("Failed sign in with invalid password shows error message", async () => {
  // ARRANGE

  // mock the error message function
  const setErrorMessage = jest.fn();

  // mock the sign in function
  SignInWithEmail.mockRejectedValueOnce("Error");
  const { getByPlaceholderText, getByText } = render(
    <SignIn setErrorMessage={setErrorMessage} />
  );

  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const signInButton = getByText("Sign In");

  // ACT

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "pword" } });
  fireEvent.click(signInButton);

  // ASSERT

  // invalid password so sign in function should not be called
  await waitFor(() => expect(SignInWithEmail).toHaveBeenCalledTimes(0));
  // error message should be called once with the error message
  expect(setErrorMessage).toHaveBeenCalledTimes(1);
  expect(setErrorMessage).toHaveBeenCalledWith("Password is not valid");
});

test("Failed to sign in with invalid email shows error message", async () => {
  // ARRANGE
  // mock the error message function
  const setErrorMessage = jest.fn();
  // mock the sign in function
  SignInWithEmail.mockRejectedValueOnce(new Error("Error"));
  const { getByPlaceholderText, getByText } = render(
    <SignIn setErrorMessage={setErrorMessage} />
  );
  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const signInButton = getByText("Sign In");

  // ACT
  fireEvent.change(emailInput, { target: { value: "test@test" } });
  fireEvent.change(passwordInput, { target: { value: "Password" } });
  fireEvent.click(signInButton);

  // ASSERT
  // sign in function should be called once with the email and password
  await waitFor(() => expect(SignInWithEmail).toHaveBeenCalledTimes(1));
  expect(SignInWithEmail).toHaveBeenCalledWith("test@test", "Password");
  await waitFor(() => expect(setErrorMessage).toHaveBeenCalledTimes(1));
  expect(setErrorMessage).toHaveBeenCalledWith("Error: Error");
});
