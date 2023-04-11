import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../firebase/Auth";
import Login from "./Login";

describe("Login", () => {
  test("should render login form", () => {
    const { getByLabelText, getByText } = render(<Login />);

    expect(getByLabelText("Email:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();
    expect(getByText("Log In")).toBeInTheDocument();
  });

  test("should call handleSubmit on form submit", async () => {
    const doSignInWithEmailAndPasswordMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <Login />
      </AuthContext.Provider>
    );
    const emailInput = getByLabelText("Email:");
    const passwordInput = getByLabelText("Password:");
    const submitButton = getByText("Log In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(doSignInWithEmailAndPasswordMock).toHaveBeenCalledWith(
        "test@example.com",
        "password"
      )
    );
  });

  test("should navigate to home page if user is logged in", () => {
    const { container } = render(
      <AuthContext.Provider value={{ currentUser: {} }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(container.querySelector("h1")).toBeNull();
  });
});
