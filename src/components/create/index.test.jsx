import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CreateAccount from ".";
import { CreateWithEmail } from "../../util/firebase";

jest.mock("../../util/firebase");
test("Create Account creates account with valid inputs", async () => {
  // ARRANGE
  CreateWithEmail.mockResolvedValueOnce({});
  const { getByPlaceholderText, getByText } = render(<CreateAccount />);
  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const confirmPasswordInput = getByPlaceholderText("Confirm Password");
  const createButton = getByText("Sign In");

  // ACT
  fireEvent.change(emailInput, { target: { value: "test@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(CreateWithEmail).toHaveBeenCalledTimes(1));
  expect(CreateWithEmail).toHaveBeenCalledWith("test@email.com", "Password123");
});

test("Create Account fails with invalid passwords", async () => {
  // ARRANGE
  const setErrorMessage = jest.fn();
  CreateWithEmail.mockResolvedValueOnce({});
  const { getByPlaceholderText, getByText } = render(
    <CreateAccount setErrorMessage={setErrorMessage} />
  );
  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const confirmPasswordInput = getByPlaceholderText("Confirm Password");
  const createButton = getByText("Sign In");

  // what we expect to receive as the error message
  const errorMessage = [
    <>
      Password is invalid!
      <br />
    </>,
    <>
      Passwords are not matching! <br />
    </>,
  ];

  // ACT
  fireEvent.change(emailInput, { target: { value: "test@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "Pass" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(CreateWithEmail).toHaveBeenCalledTimes(0));
  expect(setErrorMessage).toHaveBeenCalledTimes(1);
  expect(setErrorMessage).toHaveBeenCalledWith(errorMessage);
});

test("Create Account fails with invalid email", async () => {
  // ARRANGE
  const setErrorMessage = jest.fn();
  CreateWithEmail.mockResolvedValueOnce({});
  const { getByPlaceholderText, getByText } = render(
    <CreateAccount setErrorMessage={setErrorMessage} />
  );
  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const confirmPasswordInput = getByPlaceholderText("Confirm Password");
  const createButton = getByText("Sign In");

  // what we expect to receive as the error message
  const errorMessage = [
    <>
      Email is not valid!
      <br />
    </>,
  ];

  // ACT
  fireEvent.change(emailInput, { target: { value: "testemail.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(CreateWithEmail).toHaveBeenCalledTimes(0));
  expect(setErrorMessage).toHaveBeenCalledTimes(1);
  expect(setErrorMessage).toHaveBeenCalledWith(errorMessage);
});

test("Create Account catches errors", async () => {
  // ARRANGE
  CreateWithEmail.mockRejectedValueOnce(new Error("Error"));
  const setErrorMessage = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <CreateAccount setErrorMessage={setErrorMessage} />
  );
  const emailInput = getByPlaceholderText("Email");
  const passwordInput = getByPlaceholderText("Password");
  const confirmPasswordInput = getByPlaceholderText("Confirm Password");
  const createButton = getByText("Sign In");
  // ACT
  fireEvent.change(emailInput, { target: { value: "test@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
  fireEvent.click(createButton);

  // ASSERT
  await waitFor(() => expect(CreateWithEmail).toHaveBeenCalledTimes(1));
  expect(CreateWithEmail).toHaveBeenCalledWith("test@email.com", "Password123");
  await waitFor(() => expect(setErrorMessage).toHaveBeenCalledTimes(1));
  expect(setErrorMessage).toHaveBeenCalledWith("Error: Error");
});
