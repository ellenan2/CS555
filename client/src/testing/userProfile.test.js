import React from "react";
import { render } from "@testing-library/react";
import UserProfile from "../UserProfile";

describe("UserProfile component", () => {
  it("renders the user profile information", async () => {
    const currentUser = {
      displayName: "John Doe",
      email: "john.doe@example.com",
    };

    const { getByText } = render(<UserProfile currentUser={currentUser} />);

    expect(getByText("User Profile")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Customer")).toBeInTheDocument();
    expect(getByText("Phone: 123-123-1234")).toBeInTheDocument();
    expect(getByText("john.doe@example.com")).toBeInTheDocument();
  });
});
