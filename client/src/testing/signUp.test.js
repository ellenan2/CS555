import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import SignUp from "../SignUp";
import { AuthContext } from "../firebase/Auth";

jest.mock("../firebase/FirebaseFunctions", () => ({
  doCreateUserWithEmailAndPassword: jest.fn(),
}));

describe("SignUp component", () => {
  it("renders the sign-up form", () => {
    const { getByText, getByLabelText } = render(<SignUp />, {
      wrapper: MemoryRouter,
    });

    expect(getByText("Sign Up")).toBeInTheDocument();
    expect(getByLabelText("First Name:")).toBeInTheDocument();
    expect(getByLabelText("Last Name:")).toBeInTheDocument();
    expect(getByLabelText("Email:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  it("creates a new user when the form is submitted", async () => {
    const currentUser = null;
    const { getByLabelText, getByText } = render(
      <AuthContext.Provider value={{ currentUser }}>
        <SignUp />
      </AuthContext.Provider>,
      { wrapper: MemoryRouter }
    );

    const firstNameInput = getByLabelText("First Name:");
    const lastNameInput = getByLabelText("Last Name:");
    const emailInput = getByLabelText("Email:");
    const passwordInput = getByLabelText("Password:");
    const confirmPasswordInput = getByLabelText("Confirm Password:");
    const submitButton = getByText("Sign Up");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(doCreateUserWithEmailAndPassword).toHaveBeenCalled()
    );
  });

  it("displays an error message if passwords do not match", () => {
    const { getByLabelText, getByText } = render(<SignUp />, {
      wrapper: MemoryRouter,
    });

    const passwordInput = getByLabelText("Password:");
    const confirmPasswordInput = getByLabelText("Confirm Password:");
    const submitButton = getByText("Sign Up");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "not matching" },
    });
    fireEvent.click(submitButton);

    expect(getByText("Password fields must match!")).toBeInTheDocument();
  });
});
